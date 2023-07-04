#standard libarires
import os
from typing import Awaitable, AsyncIterable, List
import json
from dotenv import load_dotenv
import logging
#fastapi libaries
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import uvicorn
from bs4 import BeautifulSoup
## LLM related libaries
import pinecone
from langchain.callbacks.streaming_aiter import AsyncIteratorCallbackHandler
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
#File imports
from utils import makechain_period, makechain_school
#database
from db.database import SessionLocal, engine
from db import models, schemas
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind = engine)

load_dotenv()

pinecone.init(api_key=os.getenv('PINECONE_API_KEY'), environment=os.getenv('PINECONE_ENV'))
logging.debug(os.getenv('PINECONE_API_KEY'))

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
   "http://localhost:3000",
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
        vector_store = Pinecone.from_existing_index(index_name='auto-resp', 
                                                embedding=OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY")),
                                                text_key='text')
        try:
            similar_docs = vector_store.similarity_search(query= input_query, k = 4, namespace='meals')
        except Exception as e:
            raise HTTPException(status_code=503, detail="Unable to connect to the vector store database") from e
    else:
        chain = makechain_period(callback)
        vector_store = Pinecone.from_existing_index(index_name='auto-resp', 
                                                embedding=OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY')),
                                                text_key='text')
        try:
            similar_docs = vector_store.similarity_search(query= input_query, k = 4, namespace='perprod')
        except Exception as e:
            raise HTTPException(status_code=503, detail="Unable to connect to the vector store database") from e
        
    task = asyncio.create_task(wrap_done(
        chain.arun(input_documents = similar_docs, question = input_query, contextually = contextual_information, audience= audience, tone = tone),
        callback.done),
    )

    list_docs = [BeautifulSoup(doc.page_content, 'html.parser').contents for doc in similar_docs]

    async for token in callback.aiter():
        logging.warn(f"{token}")
        yield f'{token}'

    yield json.dumps({'sourceDocuments': list_docs})

    await task

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
def new_chatbot(data: schemas.ChatbotItemCreate):
    prompt_input = data.dict()
    logging.error(f"{prompt_input}")
    try:
        return StreamingResponse(send_message(**prompt_input), media_type='text/event-stream')
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={'message': e.detail})
    except Exception as e:
        return JSONResponse(status_code=400, content = {"message": f"An error occurred: {str(e)}"})

if __name__ == "__main__":
    uvicorn.run(host="0.0.0.0", port=8000, app=app)
