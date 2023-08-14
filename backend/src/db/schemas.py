from typing import List, Optional

from pydantic import BaseModel, validator


# Inherits from base model
class ChatbotItem(BaseModel):
    tone: Optional[str] = "Informative and finish off on a positive note"
    audience: Optional[str] = "Adults"
    contextual_information: Optional[str] = ""
    input_query: str
    chatbot_meta_id: int

    @validator("tone", "audience")
    def check_word_count(cls, v):
        if v:
            count = v.split()
            if len(count) > 20:
                raise ValueError(
                    "Tone or audience inputs are too long. Must be less than 20 words each."
                )
        return v


# Base Model
class ChatbotMetaBase(BaseModel):
    name: str
    description: str
    is_active: str
    # ChatbotItems: Optional[List[ChatbotItemsBase]] = None


# Schema for reading Base model
class ChatbotMetaRead(ChatbotMetaBase):
    id: int

    class Config:
        orm_mode = True


class PromptView(BaseModel):
    id: int
    title: str
    description: str
    tone_view: List[str]
    audience_view: List[str]
    contextual_info_view: List[str]

    class Config:
        orm_mode = True
