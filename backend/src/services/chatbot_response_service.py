import asyncio
import json
import logging
from typing import AsyncIterable, Awaitable

import openai
from bs4 import BeautifulSoup
from config import Settings
from langchain.callbacks.streaming_aiter import AsyncIteratorCallbackHandler
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI
from langchain.docstore.document import Document
from langchain.prompts.prompt import PromptTemplate
from qdrant_client import QdrantClient

settings = Settings()

prompt_template_school_brief = """
You are an AI assistant working for the Department for Education providing answers to members of the public questions regarding school meals.
You are given the following pieces of information regarding school meals and a question. Provide a detailed response based on the context provided.
Use any additonal information provided in the input to help optimize the answer.
Please respond according to the tone and audience nce state below, 
tone: {tone}
audience: {audience}
Additional useful information that you must use in answer if non-empty: {contextually}
Make sure not to sound like a robot. Do NOT tell them to contact the DFE since you work there. If the question is not related to the context, you must not answer the question 
and instead say Sorry this is not related to the document. It is very important you only provide information relevant to the report. 

  Question: {question}

  =========

  {context}

  =========

"""

prompt_template_period_brief = """
You are an AI assistant working for the Department for Education providing answers to members of the public questions about the period products scheme.
You are given the following pieces of information regarding period products and a question. Provide a detailed response based on the context provided.
Use any additonal information provided in the input to help optimize the answer. Please respond according to the tone and audience nce state below, 
tone: {tone}
audience: {audience}
Additional useful information that you must use in answer if non-empty: {contextually}
Make sure not to sound like a robot. Do NOT tell them to contact the DFE since you work there. If the question is not related to the context, you must not answer the question 
and instead say Sorry this is not related to the document. It is very important you only provide information relevant to the report. 

  Question: {question}

  =========

  {context}

  =========
"""


QA_PROMPT_SCHOOL = PromptTemplate(
    template=prompt_template_school_brief,
    input_variables=["context", "question", "contextually", "tone", "audience"],
)

QA_PROMPT_PERIOD = PromptTemplate(
    template=prompt_template_period_brief,
    input_variables=["context", "question", "contextually", "tone", "audience"],
)


def makechain_school(callback) -> load_qa_chain:
    model = ChatOpenAI(
        streaming=True,
        verbose=True,
        callbacks=[callback],
        model=settings.openai_model,
        openai_api_key=settings.openai_api_key,
    )

    chain = load_qa_chain(llm=model, chain_type="stuff", prompt=QA_PROMPT_SCHOOL)

    return chain


def makechain_period(callback) -> load_qa_chain:
    model = ChatOpenAI(
        streaming=True,
        verbose=True,
        callbacks=[callback],
        model=settings.openai_model,
        openai_api_key=settings.openai_api_key,
    )

    chain = load_qa_chain(llm=model, chain_type="stuff", prompt=QA_PROMPT_PERIOD)

    return chain


async def send_message(
    input_query: str,
    chatbot_meta_id: int,
    audience: str,
    tone: str,
    contextual_information: str,
) -> AsyncIterable[str]:
    openai.api_key = settings.openai_api_key

    client = QdrantClient(settings.host, port=settings.qdrant_port)
    EMBEDS = openai.Embedding.create(
        input=input_query, engine=settings.openai_embedding_model
    )

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

    logging.info(
        f"Audience: {audience}, Tone: {tone}, Context: {contextual_information}"
    )

    if chatbot_meta_id == 1:
        chain = makechain_school(callback)

        resp = client.search(
            collection_name=settings.schoolbrief_index,
            query_vector=EMBEDS["data"][0]["embedding"],
            limit=4,
        )

    else:
        chain = makechain_period(callback)
        resp = client.search(
            query_vector=EMBEDS["data"][0]["embedding"],
            limit=5,
            collection_name=settings.perprod_index,
        )

    documents = [
        Document(page_content=resp[i].payload["text"]) for i in range(len(resp))
    ]

    task = asyncio.create_task(
        wrap_done(
            chain.arun(
                input_documents=documents,
                question=input_query,
                contextually=contextual_information,
                audience=audience,
                tone=tone,
            ),
            callback.done,
        ),
    )

    list_docs = [
        BeautifulSoup(doc.page_content, "html.parser").contents for doc in documents
    ]

    async for token in callback.aiter():
        logging.info(f"{token}")
        yield f"{token}"

    yield json.dumps({"sourceDocuments": list_docs})

    await task
