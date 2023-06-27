import os
from typing import Awaitable, AsyncIterable
import asyncio
import pinecone
import json
from bs4 import BeautifulSoup
import logging
import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from langchain.callbacks.streaming_aiter import AsyncIteratorCallbackHandler
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from pydantic import BaseModel

from dotenv import load_dotenv

from utils import makechain_period, makechain_school
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request

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

async def send_message(message: str, chatbot: str) -> AsyncIterable[str]:
    

    async def wrap_done(fn: Awaitable, event: asyncio.Event):
        """Wrap an awaitable with a event to signal when it's done or an exception is raised."""
        try:
            await fn
        except Exception as e:
            # TODO: handle exception
            print(f"Caught exception: {e}")
        finally:
            # Signal the aiter to stop.
            event.set()
    callback = AsyncIteratorCallbackHandler()
    
    print(chatbot)
    
    if chatbot == 'schoolBriefing':
        chain = makechain_school(callback)
        vector_store = Pinecone.from_existing_index(index_name='auto-resp', 
                                                embedding=OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY')),
                                                text_key='text')
        similar_docs = vector_store.similarity_search(query= message, k = 4, namespace='meals')
    else:
        chain = makechain_period(callback)
        vector_store = Pinecone.from_existing_index(index_name='auto-resp', 
                                                embedding=OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY')),
                                                text_key='text')
        similar_docs = vector_store.similarity_search(query= message, k = 4, namespace='perprod')
        

    
    task = asyncio.create_task(wrap_done(
        chain.arun(input_documents = similar_docs, question = message),
        callback.done),
    )

    list_docs = [BeautifulSoup(doc.page_content, 'html.parser').contents for doc in similar_docs]

    async for token in callback.aiter():
        yield f'{token}'

    yield json.dumps({'sourceDocuments': list_docs})

    await task


class StreamRequest(BaseModel):
    """Request body for streaming."""
    question: str
    chatbot: str


@app.post("/api")
def stream(body: StreamRequest):
    chatbot = body.chatbot
    return StreamingResponse(send_message(body.question, chatbot), media_type="text/event-stream")


if __name__ == "__main__":
    uvicorn.run(host="0.0.0.0", port=8000, app=app)
