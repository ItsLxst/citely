from fastapi import APIRouter, UploadFile
from app.services.chunking import chunk_text
from app.services.embeddings import get_embedding
from app.services.vector_store import add_to_collection
import pypdf
import uuid

router = APIRouter()

@router.post("/upload")
async def upload_document(file: UploadFile):
    pdf_reader = pypdf.PdfReader(file.file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()

    chunks = chunk_text(text)

    for chunk in chunks:
        embedding = get_embedding(chunk)
        chunk_id = str(uuid.uuid4())
        add_to_collection(chunk, embedding, chunk_id)

    return {"message": "Document processed", "num_chunks": len(chunks)}