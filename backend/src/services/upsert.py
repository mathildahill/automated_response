import logging
import pathlib

import fitz
import openai
import qdrant_client.models as models
import tiktoken
from config import Settings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from qdrant_client import QdrantClient

logging.basicConfig(level=logging.INFO)
settings = Settings()


def tiktoken_len(text: str) -> int:
    tokenizer = tiktoken.get_encoding("p50k_base")
    tokens = tokenizer.encode(text, disallowed_special=())
    return len(tokens)


def data_upload(index_name: str, file_name: str) -> None:
    FILE_DIR = pathlib.Path(__file__).parent.parent

    document = fitz.open(f"{FILE_DIR}/files/{file_name}.pdf")
    whole_text = []
    for page in document:
        text = page.get_text()
        text = text.replace("\n", " ")
        text = text.replace("\\xc2\\xa3", "£")
        text = text.replace("\\xe2\\x80\\x93", "-")
        whole_text.append(text)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        length_function=tiktoken_len,
        separators=["\n\n", "\n", " ", ""],
    )

    chunks = []

    for record in whole_text:
        text_temp = text_splitter.split_text(record)
        chunks.extend([{"text": text_temp[i]} for i in range(len(text_temp))])

        client = QdrantClient(settings.host, port=settings.qdrant_port)
        collection_names = []
        for i in range(len(client.get_collections().collections)):
            collection_names.append(client.get_collections().collections[i].name)

        if index_name in collection_names:
            client.get_collection(collection_name=index_name)
        else:
            client.create_collection(
                collection_name=index_name,
                vectors_config=models.VectorParams(
                    distance=models.Distance.COSINE, size=1536
                ),
            )

        for id, observation in enumerate(chunks):
            text = observation["text"]

            try:
                openai.api_key = settings.openai_api_key
                res = openai.Embedding.create(
                    input=text, engine=settings.openai_embedding_model
                )
            except openai.error.AuthenticationError:
                logging.error("Invalid API key")
            except openai.error.ApiConnectionError:
                logging.error(
                    "Issue connecting to open ai service. Check network and configuration settings"
                )
            except openai.error.RateLimitError:
                logging.error("You have exceeded your predefined rate limits")
            except openai.error.ServiceUnavaiableError:
                logging.error("OpenAi service is down")

            client.upsert(
                collection_name=index_name,
                points=[
                    models.PointStruct(
                        id=id,
                        payload={"text": text},
                        vector=res["data"][0]["embedding"],
                    )
                ],
            )
            logging.info("Text uploaded")

        logging.info("Embeddings upserted")
