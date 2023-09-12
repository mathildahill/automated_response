from typing import List, Optional

from pydantic import BaseModel, validator


# Inherits from base model
class ChatbotItemBase(BaseModel):
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
class ChatbotViewBase(BaseModel):
    name: str
    description: str
    is_active: bool


class ChatbotViewRead(ChatbotViewBase):
    id: int

    class Config:
        orm_mode = True


class UpsertView(BaseModel):
    document: str


class PromptViewBase(BaseModel):
    title: str
    description: str
    tone: List[str]
    audience: List[str]
    contextual_information: List[str]


class PromptViewRead(PromptViewBase):
    id: int

    class Config:
        orm_mode = True
