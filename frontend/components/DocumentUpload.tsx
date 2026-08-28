"use client";
import { useState } from "react";

function DocumentUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState("");

    async function handleUpload() {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:8000/documents/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setUploadStatus(`✓ Processed ${data.num_chunks} chunks`);
    }

    return (
        <div className="bg-zinc-800 rounded-lg p-4 flex items-center gap-3">
            <input
                onChange={(e) => {
                    if (e.target.files) {
                        setFile(e.target.files[0]);
                    }
                }}
                type="file"
                accept=".pdf"
                className="text-sm text-zinc-300"
            />
            <button
                onClick={handleUpload}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg"
            >
                Upload
            </button>
            {uploadStatus && <span className="text-sm text-green-400">{uploadStatus}</span>}
        </div>
    );
}

export default DocumentUpload;