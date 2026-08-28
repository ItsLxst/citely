from groq import Groq
import dotenv
import os

dotenv.load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def ask_llm(question: str, found_chunks: list[str]) -> str:
    context = "\n".join(found_chunks)
    prompt = f"Answer the question based on the context below. If the question can't be answered based on the context, say 'I don't know'.\n\nContext: {context}\n\nQuestion: {question}\nAnswer:"

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=1024
    )

    return response.choices[0].message.content