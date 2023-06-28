from pydantic import BaseModel, validator
from typing import List, Optional

##Base
class ChatbotItemsBase(BaseModel):
    tone:str = 'Informative and finish off on a positive note'
    audience:str = 'Adults'
    contextual_information: str = ''
    
##Read
class ChatbotItemsRead(ChatbotItemsBase):
    id: int
    
    class Config:
        orm_mode = True

##Inherits from base model       
class ChatbotItemCreate(ChatbotItemsBase):
    ChatbotMeta: Optional[int]
    
    @validator('tone', 'audience')
    def check_word_count(cls, v):
        count = v.split()
        if len(count) > 20:
            raise ValueError('Too many words')
        return v
    
    @validator('contextual_information')
    def validate_context_size(cls, lis):
        count = lis.split()
        if len(count) > 400:
            raise ValueError('Too many words have been used')
        return lis
    
    

#Base Model
class ChatbotMetaBase(BaseModel):
    name: str
    description: str
    url: str
    prompt_info: dict
    #ChatbotItems: Optional[List[ChatbotItemsBase]] = None

#Schema for reading Base model
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


    
    