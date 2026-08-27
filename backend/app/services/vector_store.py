import chromadb
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(BASE_DIR, "..", "..", "chroma_data")

client = chromadb.PersistentClient(path=CHROMA_PATH) # persistent client
collection = client.get_or_create_collection(name="documents") # the safe way to create a collection, if already exists wont create

def add_to_collection(chunk_text: str, chunk_embedding: list, id: str):
    return collection.add(documents=[chunk_text], embeddings=[chunk_embedding], ids=[id])

def query_collection(question_embedding: list, n_results: int):
    return collection.query(query_embeddings=[question_embedding], n_results=n_results)