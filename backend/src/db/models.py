from db.database import Base
from sqlalchemy import ARRAY, Boolean, Column, ForeignKey, Integer, String


class ChatbotView(Base):
    __tablename__ = "chatbotview"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    is_active = Column(Boolean)


class ChatbotItem(Base):
    __tablename__ = "chatbotitem"

    id = Column(Integer, primary_key=True, index=True)
    tone = Column(String, default="Informative and finish off on a positive note")
    audience = Column(String, default="Adults")
    contextual_information = Column(String, default=" ")
    input_query = Column(String)
    chatbot_meta_id = Column(Integer, ForeignKey("chatbotview.id"))


class PromptView(Base):
    __tablename__ = "promptview"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    tone = Column(ARRAY(String))
    audience = Column(ARRAY(String))
    contextual_information = Column(ARRAY(String))
