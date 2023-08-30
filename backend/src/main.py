# standard libarires
import logging

from config import Settings

# fastapi libaries
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# File imports
from routers import upsert, webapp

logging.basicConfig(level=logging.INFO)

app = FastAPI()
settings = Settings()

origins = [settings.url_frontend]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(webapp.router)
app.include_router(upsert.router)


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )


@app.get("/")
async def root():
    data = {"message": "Response automater application"}
    return JSONResponse(status_code=200, content=data)
