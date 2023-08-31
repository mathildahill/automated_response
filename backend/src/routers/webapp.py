import logging
from typing import List

from db import models
from db.schemas import ChatbotItem, ChatbotMetaRead
from dependencies import get_db
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from services.chatbot_response_service import send_message
from sqlalchemy.orm import Session
from starlette.exceptions import HTTPException as StarletteHTTPException

logging.basicConfig(level=logging.INFO)

router = APIRouter(prefix="/api")


@router.get("/prompt-view")
def get_prompt_view(db: Session = Depends(get_db)):
    prompt_view = db.query(models.PromptView).first()
    if prompt_view is None:
        raise HTTPException(status_code=404, detail="View not found")
    return prompt_view


@router.get("/chatbots", response_model=List[ChatbotMetaRead])
def get_all_chatbot(db: Session = Depends(get_db)):
    try:
        chatbots = db.query(models.ChatbotMeta).all()
        logging.info(f"Here is the length of the chatbots: {len(chatbots)}")
    except Exception as e:
        logging.error(f"Error: {e}")
        raise HTTPException(status_code=404, detail="Could not connect to database")
    return chatbots


@router.post("/chatbot-item")
def new_chatbot(data: ChatbotItem, db: Session = Depends(get_db)):
    try:
        prompt_input = data.dict()
        return StreamingResponse(
            send_message(**prompt_input), media_type="text/event-stream"
        )
    except Exception as e:
        logging.error(f"Error: {e}")
        raise StarletteHTTPException(status_code=500, detail="Internal server error")
