from fastapi import FastAPI
from app.routers import documents

app = FastAPI()

app.include_router(documents.router, prefix="/documents")

@app.get("/")
def read_root():
    return {"message": "Citely API is running"}