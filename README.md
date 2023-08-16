# Response Automater Project

This is a project to automate external correspondence for the school meals and period products briefing pack using generate AI and vector embeddings. The proect is built in python on the backend using the FastApi framework and typescript on the frontend using next.js.

# Prerequisites

* [Python](https://www.python.org/downloads/) version 3.11 or higher installed on your machine
* [Pipenv](https://pipenv.pypa.io/en/latest/) for managing package dependencies
* [Docker](https://www.docker.com/get-started/) installed and running on your machine
* [Node.js](https://nodejs.org/en/download/package-manager) installed on your machine

# Installation

1. Clone the repository. On the command line run 
```
git clone <repository url>
```

2. Navigate to the project directory. Now create virtual environment and install project dependencies
``` 
pipenv install --dev
``` 

3. Set up precommit hooks
```
pipenv run pre-commit install
```

4. Navigate to backend directory and create a `.env` file. Navigate to [openai](https://platform.openai.com/) website and sign-up to an account and generate api keys. Then add to the .env file as following
```
OPENAI_API_KEY=<INSERT API KEY>
OPENAI_MODEL=<INSERT MODEL>
```
Note unless you have access to gpt-4 it is likely the model you will have access to is ```gpt-3.5-turbo```

5. Navigate to root of project again and run ```docker-compose up``` in command prompt. This will start database and vector-database. To stop these running then just enter ```docker-compose down``` into command prompt
6. Create another terminal and populate vector database
```
cd backend/upsertion
pipenv run python school_briefing_upsert.py
pipenv run python period_products_upsert.py
```
To check the database is populated on your machine navigate to following [url](http://localhost:6333/dashboard). There should be a school_brief and perprod indexes.

7. Navigate to project root directory and enter the following into command prompt
```
cd chatbot
npm install pnpm -g
pnpm install
pnpm run dev
```
8. Create a new terminal and enter the following
```
cd backend
pipenv run uvicorn src.main:app --reload
```

9. The project should now work!



 
