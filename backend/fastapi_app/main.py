#standard libarires
import os
from typing import Awaitable, AsyncIterable, List
import json
from dotenv import load_dotenv
import logging
#fastapi libaries
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
import asyncio
import uvicorn
from bs4 import BeautifulSoup
## LLM related libaries
from langchain.callbacks.streaming_aiter import AsyncIteratorCallbackHandler
from langchain.docstore.document import Document
import openai
#vdatabase libraries
from qdrant_client import QdrantClient
import qdrant_client.models as models
#File imports
from utils import makechain_period, makechain_school
#database
from db.database import SessionLocal, engine
from db import models, schemas
from sqlalchemy.orm import Session
from pydantic import ValidationError

models.Base.metadata.create_all(bind = engine)

load_dotenv()
logging.basicConfig(level = logging.INFO)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
   "http://localhost:3000",
   'http://localhost:3000/1/update'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
  allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def send_message(input_query: str, ChatbotMeta: str, audience: str, tone: str, contextual_information: str) -> AsyncIterable[str]:
    openai.api_key = os.getenv('OPENAI_API_KEY')
    logging.info(f'OpenAI key: {openai.api_key}')
    client = QdrantClient("localhost", port = 6333)
    EMBEDS = openai.Embedding.create(input = input_query, engine = 'text-embedding-ada-002')
    
    async def wrap_done(fn: Awaitable, event: asyncio.Event):
        """Wrap an awaitable with a event to signal when it's done or an exception is raised."""
        try:
            await fn
        except Exception as e:
            print(f"Caught exception: {e}")
        finally:
            # Signal the aiter to stop.
            event.set()
    callback = AsyncIteratorCallbackHandler()
    
    logging.info(f'Audience: {audience}, Tone: {tone}, Context: {contextual_information}')
    
    if ChatbotMeta == 1:
        chain = makechain_school(callback)
        try:
            resp = client.search(collection_name='schoolBrief',
                                 query_vector=EMBEDS['data'][0]['embedding'],
                                 limit=4)
        except Exception as e:
            raise HTTPException(status_code=503, detail="Unable to connect to the vector store database") from e
    else:
        chain = makechain_period(callback)
        try:
            resp = client.search(query_vector=EMBEDS['data'][0]['embedding'], 
                     limit = 5, 
                     collection_name = 'perprod')
        except Exception as e:
            raise HTTPException(status_code=503, detail="Unable to connect to the vector store database") from e
        
    documents = [Document(page_content = resp[i].payload['text']) for i in range(len(resp))]
    
    try:   
        task = asyncio.create_task(wrap_done(
        chain.arun(input_documents = documents, question = input_query, contextually = contextual_information, audience= audience, tone = tone),
        callback.done),
    )
    except Exception as e:
        raise HTTPException(status_code=408, detail='There is a network error, please try again') from e

    list_docs = [BeautifulSoup(doc.page_content, 'html.parser').contents for doc in documents]

    async for token in callback.aiter():
        logging.warning(f"{token}")
        yield f'{token}'

    yield json.dumps({'sourceDocuments': list_docs})

    await task
 
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(status_code=exc.status_code, content={'error': exc.detail})   

@app.get('/prompt_view')
def get_prompt_view( db:Session = Depends(get_db)):
    prompt_view = db.query(models.PromptView).first()
    if prompt_view is None:
        raise HTTPException(status_code=404, detail='View not found')
    return prompt_view

@app.get("/chatbots", response_model=List[schemas.ChatbotMetaRead])
def get_all_chatbot(db: Session = Depends(get_db)):
    try:
        chatbots = db.query(models.ChatbotMeta).all()
    except Exception:
        raise HTTPException(status_code = 404, detail='Could not connect to database')
    return chatbots

@app.post('/chatbot-item')
def new_chatbot(data: schemas.ChatbotItemCreate, db:Session = Depends(get_db)):
    try:
        chatbot_item = models.ChatbotItem(**data.dict())
        db.add(chatbot_item)
        db.commit()
        db.refresh(chatbot_item)
        prompt_input = data.dict()
        return StreamingResponse(send_message(**prompt_input), media_type='text/event-stream')
    except Exception as e:
         return JSONResponse(status_code=400, content={"error": f"An error occurred: {str(e)}"})

if __name__ == "__main__":
    uvicorn.run(host="0.0.0.0", port=8000, app=app)
