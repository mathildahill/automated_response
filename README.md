# Response Automater Project

This is a project to automate external correspondence for the school meals and period products briefing pack using generate AI and vector embeddings. The proect is built in python on the backend using the FastApi framework and typescript on the frontend using next.js.

# Prerequisites

* [Python](https://www.python.org/downloads/) version 3.11 or higher installed on your machine
* [Pipenv](https://pipenv.pypa.io/en/latest/) for managing package dependencies
* [Docker](https://www.docker.com/get-started/) installed and running on your machine
* [Node.js](https://nodejs.org/en/download/package-manager) installed on your machine. The version this project runs is 18.16.0.

# Installation - Initial setup

1. Clone the repository. On the command line run 
```
git clone https://github.com/joesharratt1229/automated_response.git
```

2. Navigate to the project directory. Now create virtual environment (using pipenv and install project dependencies) and install project dependencies. This will install the packages needed to run the fastapi backend server.
``` 
pipenv install
``` 

3. Set up precommit hooks. This checks if your code changes in python backend adhere to styling guidance. If it does not it will fail to commit and automatically reformat your code which you will then have to recommit.
```
pipenv run pre-commit install
```

6.  In the project's root directory, `.env.example` contains placeholders for environment variables that need to be set. Copy `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```

7.  Edit the `.env` file and customise the environment variables. You will have to generate an openai key which you can do at the following [link](https://platform.openai.com/). Insert your openai key. 

8. Similarly there is an `.env.example` file in the chatbot directory and this needs to be converted into a `.env` file. This is so that endpoints are not hardcoded and will benefit the switch to the production FastAPI server


9. Make sure you have docker desktop running. Navigate to root of project again and run ```docker-compose up -d``` in command prompt. This will run the psotgres, pgadmin and docker containers in detached mode. If you look at the `docker-compose.yaml` file volumes are configured so that data persists even when the containers are shut down. The `docker-compose up -d` will start postgres database and vector-database. To stop these running then just enter ```docker-compose down``` into command prompt. 

10. Start the FastApi backend as following (from root of project directory)
Run either of the following:
```bash
pipenv shell
cd backend/src
uvicorn main:app --reload
```
OR:
```bash
cd backend/src
pipenv run uvicorn main:app --reload
```

11. This will start the backend server. For the next step you need to create the vector embeddings for the standard lines documents for period products and school meals briefing packs within the vector database. To do this you need to send a post request to the **http://localhost:8000/upsert/vectors** endpoint in the vector database. If you are comfortable sending post requests then you can do it with a tool as you wish such as curl or python's request library. If you do not feel comfortable run the **upsert-vectors.sh** script from the root directory as following (use git bash prompt)
```bash
chmod +x upsert-vectors.sh
./upsert-vectors.sh
```
This will automatically populate the vector database with the school briefing and period products vector database. To check the database is populated on your machine navigate to following [url](http://localhost:6333/dashboard).

12. At this point you can remove all the terminals you have open and create a new terminal and navigate to the project directory.
```bash
cd chatbot
npm install pnpm -g
pnpm install
pnpm run dev
```

## Usage

- Access the FastAPI backend sever: [http://localhost:8000](http://localhost:8000)
- Access the FastAPI Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- Access the Qdrant Docker instance dashboard: [http://localhost:6333/dashboard](http://localhost:6333/dashboard)
- Access the Chatbot frontend [http://localhost:3000](http://localhost:3000)


## Running the app:

The previous outlines the initial setup to run the project locally. With this setup to run project each time you only need to do the following.

- Have docker desktop running
- Open two terminals
- In one of the terminals navgiate to root of project and run the following:
```bash
docker-compose up -d
pipenv shell
cd backend/src
uvicorn main:app --reload
```
- In anothet terminal navigate to root of project and run the following
```bash
cd chatbot
pnpm run dev
```

To stop running the frontend and backend close the terminals


# Common Errors

- When installing pnpm using the `npm install pnpm -g` you may need to this as an executable path. Otherwise when you run pnpm from the terminal you may get the following error: `pnpm command not recognised or found`. To set this an executable path on windows in the explorer you need to search to edit environment variables and then create variable called pnpm and sets it path as where you have pnpm installed. Another quick fix to this will be instead of calling pnpm run the command `npm -m pnpm` inplace of `pnpm`

- Incorrectly configured environment variables - you need to make sure the **.env** file's are in the same location as the **.env.example** files else the project will not work. 

- You need to make sure Docker daemon is running to start up the docker containers.
 
