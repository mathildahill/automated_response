from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY, JSON
from sqlalchemy.orm import relationship

from database import Base

class ChatbotMeta(Base):
    __tablename__ = 'ChatbotMeta'
    
    id = Column(Integer, primary_key=True, index = True)
    name = Column(String) 
    description = Column(String)
    url = Column(String)
    is_active = Column(Boolean, default=True)
    prompt_info = Column(JSON)
    
    ChatbotItems = relationship('ChatbotItem', back_populates='owner')
    
class ChatbotItem(Base):
    __tablename__ = 'ChatbotItem'
    
    id = Column(Integer, primary_key = True, index = True)
    tone = Column(String)
    contextual_information = Column(ARRAY(String))
    ChatbotMeta = Column(Integer, ForeignKey('ChatbotMeta.id'))
    
    owner = relationship('ChatbotMeta', back_populates='ChatbotItems')
    
    