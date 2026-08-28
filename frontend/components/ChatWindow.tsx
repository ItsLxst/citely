"use client";
import { useState } from "react";

function ChatWindow() {
    const [messages, setMessages] = useState<{role: string, content: string, sources?: string[]}[]>([]);
    const [question, setQuestion] = useState("");

    async function handleAsk() {
        const currentQuestion = question;
        setMessages((prevMessages) => [...prevMessages, {role: "user", content: currentQuestion}]);
        setQuestion("");

        const response = await fetch("http://127.0.0.1:8000/chat/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: currentQuestion }),
        });

        const data = await response.json();

        setMessages((prevMessages) => [...prevMessages, {role: "assistant", content: data.answer, sources: data.sources}]);
    }

    return (
        <div className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`rounded-lg p-3 text-sm ${
                            msg.role === "user"
                                ? "bg-indigo-600 self-end max-w-xs"
                                : "bg-zinc-700 self-start max-w-md"
                        }`}
                    >
                        <p>{msg.content}</p>
                        {msg.sources && (
                            <ul className="mt-2 text-xs text-zinc-400 space-y-1">
                                {msg.sources.map((source, i) => (
                                    <li key={i}>{source.slice(0, 100)}...</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    type="text"
                    placeholder="Ask a question..."
                    className="flex-1 bg-zinc-900 text-white text-sm rounded-lg px-3 py-2 outline-none"
                />
                <button
                    onClick={handleAsk}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
                >
                    Ask
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;