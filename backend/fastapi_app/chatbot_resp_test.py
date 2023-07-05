from main import app
from fastapi.testclient import TestClient
import json

def test_chatbot():
    client = TestClient(app)
    chatbot_data = {
    'tone': 'angry',
    'audience': 'adults',
    'input_query': 'My child is not being served with halal meat and he is a muslim',
    'ChatbotMeta': 1}
    
    response = client.post(
        "/chatbot-item",
        data=json.dumps(chatbot_data),  # send payload as JSON
        headers={"Content-Type": "application/json"},  # specify correct header
    )
    assert response.status_code == 200

