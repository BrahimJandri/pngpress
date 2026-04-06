"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState("Connecting to server...");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      // We will send this to NestJS next!
      console.log("Uploading:", file.name);
  };

  useEffect(() => {
    fetch('http://localhost:3000') // Calling your NestJS backend
        .then((res) => res.text())
        .then((data) => setMessage(data))
        .catch(() => setMessage("Server is offline ❌"));
  }, []);

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white">
        <h1 className="text-4xl font-bold mb-4">PNG Compressor AI</h1>
        <div className="p-6 bg-slate-800 rounded-lg shadow-xl">
            <input
                type="file"
                accept="image/png"
                onChange={handleUpload}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
        </div>
      </main>
  );
}