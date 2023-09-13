import requests

r_1 = requests.post(
    "http://127.0.0.1:8000/upsert/vectors", json={"document": "schoolbrief"}
)
if r_1.status_code == 200 or r_1.status_code == 201:
    print("School brief uploaded")

r_2 = requests.post(
    "http://127.0.0.1:8000/upsert/vectors", json={"document": "perprod"}
)
if r_2.status_code == 200 or r_2.status_code == 201:
    print("Period products uploaded")
