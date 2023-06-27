import fitz
import tiktoken
from langchain.text_splitter import RecursiveCharacterTextSplitter
from tqdm import tqdm
from uuid import uuid4
import pinecone
import openai
import logging
import os


document = fitz.open('files/Downloaded version SCHOOL FOOD CORE BRIEFING PACK.pdf')
tokenizer = tiktoken.get_encoding('p50k_base')

whole_text = []
for page in document:
    text= page.get_text()
    text = text.replace("\n", ' ')
    text = text.replace("\\xc2\\xa3", "£")
    text = text.replace("\\xe2\\x80\\x93", "-")
    whole_text.append(text)

def tiktoken_len(text):
        tokens = tokenizer.encode(
        text,
        disallowed_special=())
        return len(tokens)
    
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 500,
    chunk_overlap=100,
    length_function=tiktoken_len,
    separators=["\n\n", "\n", " ", ""])


chunks = []
for record in tqdm(whole_text):
    text_temp = text_splitter.split_text(record)
    chunks.extend([{
        'id':str(uuid4()),
       'text': text_temp[i],
        'chunk':i} for i in range(len(text_temp))])
    

pinecone.init(api_key=os.getenv('PINECONE_API_KEY'), environment=os.getenv('PINECONE_ENV'))
index = pinecone.Index(index_name='auto-resp')

BATCH_SIZE = 100

for i in tqdm(range(0, len(chunks), BATCH_SIZE)):
    batch_end = min(len(chunks), i + BATCH_SIZE)
    meta_batch = chunks[i:batch_end]
    ids_batch = [x['id'] for x in meta_batch]
    texts = [x['text'] for x in meta_batch]
    embeds = None
    try:
        openai.api_key = os.getenv('OPENAI_API_KEY')
        logging.info(openai.api_key)
        res = openai.Embedding.create(input=texts, engine="text-embedding-ada-002")
    except Exception as e:
            logging.error(f"An error occurred: {e}.")
            break
            
    embeds = [record['embedding'] for record in res['data']]
    meta_batch = [{'text': x['text'], 'chunk': x['chunk']} for x in meta_batch]
    to_upsert = list(zip(ids_batch, embeds, meta_batch))

    # Upsert to Pinecone
    index.upsert(vectors=to_upsert, namespace= 'meals')
    logging.info(f"Embeddings upserted ")