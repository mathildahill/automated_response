import requests
import json

url = 'http://localhost:8000/chatbot-item'
data = {
    'input_query': "I dont think im getting enough food in my school meals. What legislation you going to implement to sort this out",
    'ChatbotMeta': 1,
    "contextual_information": "We have an obesity crisis amongst young people in the country. Government legislation brought in to reduce food amount",
    "tone": "Angry and very short"
}

response = requests.post(url, json=data, stream=True)

# Verify that we have a good response
if response.status_code == 200:
    for line in response.iter_lines():
        # filter out keep-alive new lines
        if line:
            json_line = json.loads(line)
            print(json_line)
else:
    print(f'Response returned a status code of {response.status_code}')

