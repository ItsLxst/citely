from fastapi import APIRouter
from app.schemas import Question
from app.services.embeddings import get_embedding
from app.services.vector_store import query_collection
from app.services.llm import ask_llm

router = APIRouter()

@router.post("/ask")
async def ask_question(question: Question):
    embedding = get_embedding(question.question)
    results = query_collection(embedding, n_results=5)
    found_chunks = results["documents"][0]
    answer = ask_llm(question.question, found_chunks)
    return {"answer": answer, "sources": found_chunks}