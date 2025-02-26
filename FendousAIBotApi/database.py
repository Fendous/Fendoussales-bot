import os
from pymongo.mongo_client import MongoClient

# Connect to MongoDB Atlas
mongo_uri = os.getenv("MONGO_URI")  # Store MongoDB URI in environment variable

# Replace <your_connection_string> with the actual connection string from MongoDB Atlas xq0q4u3VYlXl8Q6L
MONGO_URI = os.getenv("MONGO_DB_URI")

# Establish a connection
client = MongoClient(MONGO_URI)

# Choose a database and collection
db = client["RAG"]  # Replace with your database name
collection = db["RAG"]  # Replace with your collection name

def insert_document(text, filename):
    document = {
        "file": filename,
        "plot": text
    }
    collection.insert_one(document)









