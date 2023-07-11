from pydantic import BaseModel, validator
from typing import List, Optional

##Inherits from base model       
class ChatbotItemCreate(BaseModel):
    tone: Optional[str] = "Informative and finish off on a positive note"
    audience: Optional[str] = "Adults"
    contextual_information: Optional[str] = ""
    input_query: str
    ChatbotMeta: int
    
    @validator('tone', 'audience')
    def check_word_count(cls, v):
        if v:
            count = v.split()
            if len(count) > 20:
                raise ValueError('Tone or audience inputs are too long. Must be less than 20 words each.')
        return v
    
    #@validator('contextual_information')
    #def validate_context_size(cls, lis):
    #    if lis:
    #        count = lis.split()
    #        if len(count) > 400:
    #            raise ValueError('Too much additional context is added')
    #    return lis
    
    #@validator('input_query')
    #def check_input_query(cls, lis):
    #    count = lis.split()
    #    if len(count > 1200):
    #        raise ValueError("Input query is too long, please try again")
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


    
    