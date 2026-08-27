def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:

    chunk_number = (len(text) - overlap) // (chunk_size - overlap) + 1

    chunks = []
    for i in range(chunk_number):
        start_index = i * (chunk_size - overlap)
        end_index = start_index + chunk_size
        chunk = text[start_index:end_index]
        if chunk.strip():
            chunks.append(chunk)
    return chunks