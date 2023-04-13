import fitz
import pinecone
import openai
from time import sleep
import tiktoken
from langchain.text_splitter import RecursiveCharacterTextSplitter
from uuid import uuid4
from tqdm.auto import tqdm
from time import sleep
import requests
from bs4 import BeautifulSoup

#document = fitz.open('C:/Users/JSHARRATT/Documents/gpt4-langchain-dfe/backend/docs/Edtech_market_in_England_Nov_2022.pdf')
#pattern = r'(?<=\s)\\.*?\\(?=\s)'

#whole_text = []
#for index, page in enumerate(document):
 #   if (index>90 or index < 6):
 #       continue
 #   text = page.get_text()
 #   whole_text.append(text)

#decoded_text = []
#for ind, page in enumerate(whole_text):
#    page = page.replace("\n", ' ')
#    page = page.replace("\\xc2\\xa3", "£")
#    page = page.replace("\\xe2\\x80\\x93", "-")
###    #decoded_text['id'].append(str(ind))
###    #decoded_text['text'].append(page)
#    decoded_text.append(page)

url = "https://explore-education-statistics.service.gov.uk/find-statistics/pupil-attendance-in-schools"
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.get_text()
    text = " ".join(t.strip() for t in soup.stripped_strings)
    decoded_text = text.replace('\xa0', ' ')

tokenizer = tiktoken.get_encoding('p50k_base')

# create the length function
def tiktoken_len(text):
    tokens = tokenizer.encode(
        text,
        disallowed_special=()
    )
    return len(tokens)



text_splitter = RecursiveCharacterTextSplitter(
    #chunk_size=400,
    chunk_size = 100,
    chunk_overlap=20,
    length_function=tiktoken_len,
    separators=["\n\n", "\n", " ", ""])


chunks = []

for idx, record in enumerate(tqdm(decoded_text)):
    texts = text_splitter.split_text(record)
    chunks.extend([{
        'id': str(uuid4()),
        'text': texts[i],
        'chunk': i
    } for i in range(len(texts))])


openai.api_key = "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" 

embed_model = "text-embedding-ada-002"

res = openai.Embedding.create(
    input=[
        "Sample document text goes here",
        "there will be several phrases in each batch"
    ], engine=embed_model
)


index_name = 'edtech-gpt'

# initialize connection to pinecone
pinecone.init(
    api_key='7f2b5253-e114-42db-8cdf-0327f5651ed9',  # app.pinecone.io (console)
    environment="northamerica-northeast1-gcp"  # next to API key in console
)

# check if index already exists (it shouldn't if this is first time)
if index_name not in pinecone.list_indexes():
    # if does not exist, create index
    pinecone.create_index(
        index_name,
        dimension=len(res['data'][0]['embedding']),
        metric='dotproduct'
    )

index = pinecone.Index(index_name)

batch_size = 100  # how many embeddings we create and insert at once

for i in tqdm(range(0, len(chunks), batch_size)):
    # find end of batch
    i_end = min(len(chunks), i+batch_size)
    meta_batch = chunks[i:i_end]
    # get ids
    ids_batch = [x['id'] for x in meta_batch]
    # get texts to encode
    texts = [x['text'] for x in meta_batch]
    # create embeddings (try-except added to avoid RateLimitError)
    try:
        res = openai.Embedding.create(input=texts, engine=embed_model)
    except:
        done = False
        while not done:
            sleep(5)
            try:
                res = openai.Embedding.create(input=texts, engine=embed_model)
                done = True
            except:
                pass
    embeds = [record['embedding'] for record in res['data']]
    # cleanup metadata
    meta_batch = [{
        'text': x['text'],
        'chunk': x['chunk']
    } for x in meta_batch]
    
    to_upsert = list(zip(ids_batch, embeds, meta_batch))
    # upsert to Pinecone
    index.upsert(vectors=to_upsert)
    print("Embeddings upserted")