from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY, JSON
from .database import Base

class ChatbotMeta(Base):
    __tablename__ = 'chatbotmeta'
    
    id = Column(Integer, primary_key=True, index = True)
    name = Column(String) 
    description = Column(String)
    is_active = Column(Boolean)
    
    #ChatbotItems = relationship('ChatbotItem', back_populates='owner')
    
class ChatbotItem(Base):
    __tablename__ = 'chatbotitem'
    
    id = Column(Integer, primary_key = True, index = True)
    tone = Column(String, default='Informative and finish off on a positive note')
    audience = Column(String, default = 'Adults')
    contextual_information = Column(String, default = ' ')
    input_query = Column(String)
    chatbot_meta_id = Column(Integer, ForeignKey('chatbotmeta.id'))
    
    #owner = relationship('ChatbotMeta', back_populates='ChatbotItems')
    
class PromptView(Base):
    __tablename__ = 'promptview'
    
    id = Column(Integer, primary_key=True, index = True)
    title = Column(String)
    description = Column(String)
    tone = Column(ARRAY(String))
    audience = Column(ARRAY(String))
    contextual_information = Column(ARRAY(String))