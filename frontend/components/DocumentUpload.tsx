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
        <div>
            <input
                onChange={(e) => {
                    if (e.target.files) {
                        setFile(e.target.files[0]);
                    }
                }}
                type="file"
                accept=".pdf"
            />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}

export default DocumentUpload;