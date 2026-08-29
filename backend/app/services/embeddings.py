from chromadb.utils import embedding_functions

embedding_function = embedding_functions.DefaultEmbeddingFunction()

def get_embedding(text: str):
    return embedding_function([text])[0]