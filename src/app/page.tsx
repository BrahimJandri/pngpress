"use client";
import { useState } from 'react';

export default function Home() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/images/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950 text-white">
            <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                PNGPress AI
            </h1>

            <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md">
                <label className="block mb-4 text-sm font-medium text-slate-400">Upload your PNG</label>
                <input
                    type="file"
                    accept="image/png"
                    onChange={handleUpload}
                    className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                />

                {loading && <p className="mt-4 text-blue-400 animate-pulse text-center">Squeezing your pixels...</p>}

                {result && (
                    <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <h3 className="text-green-400 font-bold mb-2">Success!</h3>
                        <p className="text-sm">Original: {(result.originalSize / 1024).toFixed(2)} KB</p>
                        <p className="text-sm">Compressed: {(result.compressedSize / 1024).toFixed(2)} KB</p>
                        <p className="text-sm font-bold text-blue-300 mt-2">
                            Saved: {(((result.originalSize - result.compressedSize) / result.originalSize) * 100).toFixed(1)}%
                        </p>
                        <a
                            href={`data:image/png;base64,${result.data}`}
                            download="compressed.png"
                            className="mt-4 block text-center bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-bold transition"
                        >
                            Download PNG
                        </a>
                    </div>
                )}
            </div>
        </main>
    );
}