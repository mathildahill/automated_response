import fitz
import tiktoken
from langchain.text_splitter import RecursiveCharacterTextSplitter
import openai
import logging
import os
from qdrant_client import QdrantClient
import qdrant_client.models as models

logging.basicConfig(level = logging.INFO)
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

for record in whole_text:
    text_temp = text_splitter.split_text(record)
    
    chunks.extend([{
        'text': text_temp[i]
    } for i in range(len(text_temp))])

client = QdrantClient("localhost", port = 6333)

collection_names = []
for i in range(len(client.get_collections().collections)):
    collection_names.append(client.get_collections().collections[i].name)
    

if 'schoolBrief' in collection_names:
    collection_info = client.get_collection(collection_name = 'schoolBrief')
else:
    collection_info = client.create_collection(collection_name = 'schoolBrief', vectors_config = models.VectorParams(distance = models.Distance.COSINE,
                                                                                                         size = 1536))
for i, observation in enumerate(chunks):
    id = i 
    text = observation['text']
    
    try:
        openai.api_key = os.getenv('OPENAI_API_KEY')
        res = openai.Embedding.create(input = text, engine = 'text-embedding-ada-002')
    except Exception as e:
        logging.error(f'The following exception has occured. Could not embed texts: {e}')
        
    client.upsert(collection_name='schoolBrief',
                  points = [models.PointStruct(
                      id = i, 
                      payload = {
                          'text': text
                      },
                      vector = res['data'][0]['embedding']
                  )])
    logging.info("Text uploaded")
    
logging.info('Embeddings upserted')