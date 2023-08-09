import logging
from langchain.chat_models import ChatOpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.callbacks import AsyncIteratorCallbackHandler
from dotenv import load_dotenv
import os
from langchain.prompts.prompt import PromptTemplate


load_dotenv()

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
    template=prompt_template_school_brief, input_variables=["context", "question", "contextually", "tone", "audience"])

QA_PROMPT_PERIOD = PromptTemplate(
    template=prompt_template_period_brief, input_variables=['context', 'question', "contextually", "tone", "audience"]
)

def makechain_school(callback) -> load_qa_chain:
    model = ChatOpenAI(
        streaming=True,
        verbose=True,
        callbacks=[callback],
        model='gpt-4',
        openai_api_key=os.getenv("OPENAI_API_KEY")
    )

    chain = load_qa_chain(llm=model, chain_type='stuff', prompt = QA_PROMPT_SCHOOL)

    return chain


def makechain_period(callback) -> load_qa_chain:
    model = ChatOpenAI(
        streaming=True,
        verbose=True,
        callbacks=[callback],
        model='gpt-4',
        openai_api_key=os.getenv("OPENAI_API_KEY")
    )

    chain = load_qa_chain(llm=model, chain_type='stuff', prompt = QA_PROMPT_PERIOD)

    return chain