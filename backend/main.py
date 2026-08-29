from fastapi import FastAPI
from app.routers import documents
from app.routers import chat
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://citely-ecru.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router, prefix="/documents")
app.include_router(chat.router, prefix="/chat")

@app.get("/")
def read_root():
    return {"message": "Citely API is running"}