import json

from fastapi.testclient import TestClient

from .main import app


def test_good_request():
    client = TestClient(app)
    chatbot_data = {
        "tone": "angry",
        "audience": "adults",
        "input_query": "Why is my child forced to eat vegan food?",
        "ChatbotMeta": 1,
    }

    response = client.post(
        "/chatbot-item",
        data=json.dumps(chatbot_data),  # send payload as JSON
        headers={"Content-Type": "application/json"},  # specify correct header
    )
    assert response.status_code == 200


def test_bad_request():
    client = TestClient(app)
    chatbot_data = {
        "tone": "angry a a a a a a a a a a a a a a a a a a a a a a a a a a a a  aa a a a a a a a a a a a a  a a a",
        "audience": "adults",
        "input_query": "Is my child entitled to three meals a day?",
        "ChatbotMeta": 1,
    }

    response = client.post(
        "/chatbot-item",
        data=json.dumps(chatbot_data),  # send payload as JSON
        headers={"Content-Type": "application/json"},  # specify correct header
    )

    assert response.status_code == 422
