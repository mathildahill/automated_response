import logging
from typing import List

from db import models
from db.schemas import ChatbotItem, ChatbotMetaRead
from dependencies import get_db
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from services.chatbot_response_service import send_message
from sqlalchemy.orm import Session

logging.basicConfig(level=logging.INFO)

router = APIRouter(prefix="/api")


@router.get("/prompt-view")
def get_prompt_view(db: Session = Depends(get_db)):
    prompt_view = db.query(models.PromptView).first()
    if prompt_view is None:
        raise HTTPException(status_code=500, detail="Internal server error")
    return prompt_view


@router.get("/chatbots", response_model=List[ChatbotMetaRead])
def get_all_chatbot(db: Session = Depends(get_db)):
    chatbots = db.query(models.ChatbotMeta).all()
    logging.info(f"Here is the length of the chatbots: {len(chatbots)}")
    if len(chatbots) != 2:
        raise HTTPException(status_code=500, detail="Internal server error")
    return chatbots


@router.post("/chatbot-item")
def new_chatbot(data: ChatbotItem, db: Session = Depends(get_db)):
    prompt_input = data.dict()
    return StreamingResponse(
        send_message(**prompt_input), media_type="text/event-stream"
    )
