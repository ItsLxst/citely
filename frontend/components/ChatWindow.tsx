"use client";
import { useState } from "react";

function ChatWindow() {
    const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
    const [question, setQuestion] = useState("");

    async function handleAsk() {
        const currentQuestion = question;
        setMessages([...messages, {role: "user", content: currentQuestion}]);
        setQuestion("");

        const response = await fetch("http://127.0.0.1:8000/chat/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: currentQuestion }),
        });

        const data = await response.json();

        setMessages((prevMessages) => [...prevMessages, {role: "assistant", content: data.answer}]);
    }

    return (
    <div>
        <div>
            {messages.map((msg, index) => (
                <p key={index}>{msg.role}: {msg.content}</p>
            ))}
        </div>

        <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            placeholder="Ask a question..."
        />
        <button onClick={handleAsk}>Ask</button>
    </div>
);
}

export default ChatWindow;