"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api";

export default function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("QR");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await fetchApi("/products", {
                method: "POST",
                body: JSON.stringify({ name, description, content, type }),
            });
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-8">
                <Link href="/dashboard" className="text-slate-400 hover:text-white mr-4 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Create New Product</h1>
                    <p className="text-slate-400">Configure parameters for generation.</p>
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl rounded-full pt-8 pb-10 px-8 shadow-[0_0_50px_rgba(99,102,241,0.05)] border border-slate-800 rounded-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Product Name <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="e.g. Summer Collection 2024 Promo"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Code Content (Data to Encode) <span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="https://example.com/promo or 123456789012"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Generator Type <span className="text-red-400">*</span></label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${type === 'QR' ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-950/50 border-slate-700 hover:border-slate-500'}`}
                                    onClick={() => setType('QR')}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-white">QR Code</h4>
                                        <div className={`w-4 h-4 rounded-full border ${type === 'QR' ? 'border-[4px] border-indigo-500 bg-white' : 'border-slate-600'}`}></div>
                                    </div>
                                    <p className="text-xs text-slate-400">Best for URLs and rich data. Scannable by smartphones.</p>
                                </div>

                                <div
                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${type === 'BARCODE' ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-950/50 border-slate-700 hover:border-slate-500'}`}
                                    onClick={() => setType('BARCODE')}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-white">Barcode (Code128)</h4>
                                        <div className={`w-4 h-4 rounded-full border ${type === 'BARCODE' ? 'border-[4px] border-indigo-500 bg-white' : 'border-slate-600'}`}></div>
                                    </div>
                                    <p className="text-xs text-slate-400">Best for retail POS systems and inventory management.</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                placeholder="Internal notes about this code..."
                            />
                        </div>
                    </div>

                    {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">{error}</div>}

                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                        <Link href="/dashboard" className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-white mr-4 transition-colors">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:opacity-50 transition-all"
                        >
                            {loading ? "Saving..." : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
