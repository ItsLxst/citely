from fastapi import FastAPI
from app.routers import documents
from app.routers import chat

app = FastAPI()

app.include_router(documents.router, prefix="/documents")
app.include_router(chat.router, prefix="/chat")

@app.get("/")
def read_root():
    return {"message": "Citely API is running"}