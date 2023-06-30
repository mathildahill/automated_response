from fastapi.testclient import TestClient
from main import app
from db.database import SessionLocal
from db import models
import json

# Assuming you have already defined your FastAPI application as app
client = TestClient(app)

def test_chatbot_resp():
    response = client.get('/chatbots')
    assert response.status_code == 200
    data = response.json()
    print(data)
    assert isinstance(data, list)
    
    item = data[0]
    
    assert "id" in item
    assert "name" in item
    assert "description" in item
    assert "url" in item
    assert "prompt_info" in item
    
def test_create_chatbot_item():
#    # Arrange
    chatbot_data = {
        "tone": "Informative and finish off on a positive note",
        "audience": "Adults",
        "contextual_information": "Here is the context",
        "ChatbotMeta": 1, 
        "input_query": "Hello"
    }

    # Act
    response = client.post("/chatbot-item", json = chatbot_data)

    # Assert
    #assert response.status_code == 200
    chatbot_item = response.json()
    assert chatbot_item["ChatbotMeta"] == chatbot_data["ChatbotMeta"]
    assert chatbot_item['input_query'] == chatbot_data['input_query']
    assert chatbot_item["tone"] == chatbot_data["tone"]
    assert chatbot_item["audience"] == chatbot_data["audience"]
    assert chatbot_item["contextual_information"] == chatbot_data["contextual_information"]
    
    # cleanup
    db = SessionLocal()
    db_chatbot_item = db.query(models.ChatbotItem).first()
    db.delete(db_chatbot_item)
    db.commit()

