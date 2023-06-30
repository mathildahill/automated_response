from pydantic import BaseModel, validator
from typing import List, Optional

##Base
class ChatbotItemsBase(BaseModel):
    tone:str
    audience:str 
    contextual_information: str = ''
    input_query: str
    
##Read
class ChatbotItemsRead(ChatbotItemsBase):
    ChatbotMeta: int
    
    class Config:
        orm_mode = True

##Inherits from base model       
class ChatbotItemCreate(BaseModel):
    tone: Optional[str] = "Informative and finish off on a positive note"
    audience: Optional[str] = "Adults"
    contextual_information: Optional[str] = ""
    input_query: str
    ChatbotMeta: int
    
   # @validator('tone', 'audience')
    #def check_word_count(cls, v):
    #    if v:
   #         count = v.split()
   #         if len(count) > 20:
   #             raise ValueError('Too many words')
   #     return v
    
    #@validator('contextual_information')
    #def validate_context_size(cls, lis):
    #    if lis:
    #        count = lis.split()
    ##        if len(count) > 400:
    #            raise ValueError('Too many words have been used')
    #    return lis
    
    #@validator('input_query')
    #def check_input_query(cls, lis):
    #    count = lis.split()
    #    if len(count > 1200):
    #        raise ValueError("This input is too long")
    #    return lis
    
    
    

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


    
    