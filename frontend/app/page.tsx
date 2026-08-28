import DocumentUpload from "@/components/DocumentUpload";
import ChatWindow from "@/components/ChatWindow";

export default function Home() {
    return (
        <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold mb-6">Citely</h1>
            <div className="w-full max-w-2xl flex flex-col gap-6">
                <DocumentUpload />
                <ChatWindow />
            </div>
        </main>
    );
}