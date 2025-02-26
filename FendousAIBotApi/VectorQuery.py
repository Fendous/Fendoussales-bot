import requests
import pymongo
from pymongo import MongoClient
import json
from dotenv import load_dotenv
import os
from openAiModel import getModelResponse
#from deepseekModel import getModelResponse

# Vector Qureay
def get_embedding(query, openai_key):
    url = "https://api.openai.com/v1/embeddings"
    headers = {
        "Authorization": f"Bearer {openai_key}",
        "Content-Type": "application/json"
    }

    data = {
        "input": query,
        "model": "text-embedding-ada-002"
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()["data"][0]["embedding"]
    else:
        raise Exception(f"Failed to get embedding. Status code: {response.status_code}, Response: {response.text}")


def find_similar_documents(embedding, mongo_url, db_name, collection_name):
    client = MongoClient(mongo_url)

    try:
        db = client[db_name]
        collection = db[collection_name]

        pipeline = [
            {"$vectorSearch": {
                "queryVector": embedding,
                "path": "plot_embedding",
                "numCandidates": 100,
                "limit": 1, # how meny files to get
                "index": "Vectorsearch",
            }}
        ]

        documents = list(collection.aggregate(pipeline))
        return documents
    finally:
        client.close()


def queryModel(user_query):
    load_dotenv()
    OPENAI_KEY = os.getenv("OPENAI_KEY")
    URIKEY = os.getenv("MONGO_DB_URI")
    openai_key = OPENAI_KEY
    mongo_url = URIKEY
    db_name = "RAG"
    collection_name = "RAG"

    try:

        keywords = ["database", "databases"]  # keywords for search
        if any(keyword in user_query.lower() for keyword in keywords):
            embedding = get_embedding(user_query, openai_key)
            documents = find_similar_documents(embedding, mongo_url, db_name, collection_name)
            databaseResponse = [doc["plot"] for doc in documents if "plot" in doc]
            file = [doc["file"] for doc in documents if "file" in doc]
            user_query = f"filename \" {file} \",  database information \" {databaseResponse} \", this is the user prompt {user_query}."

        response = getModelResponse(user_query)

        return response

    except Exception as err:
        print(f"Error: {err}")
