import requests

res = requests.get(url = 'http://localhost:8000/prompt_view')
print(res.json())