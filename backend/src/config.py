from pydantic import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str
    openai_model: str = "gpt-4"
    openai_embedding_model: str = "text-embedding-ada-002"
    host: str = "localhost"
    qdrant_port: int = 6333
    url_frontend: str = "http://localhost:3000"
    perprod_index: str = "perprod"
    schoolbrief_index: str = "schoolbrief"
    backend_ip_address: str = "0.0.0.0"
    backend_port: int = 8000

    class Config:
        env_file = "../../.env"
