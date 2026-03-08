"use client";
import { useEffect, useState } from "react";
import { fetchApi, API_URL } from "@/lib/api";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description: string;
    content: string;
    type: string;
    created_at: string;
    creator_email: string;
}

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [role, setRole] = useState("");

    const loadProducts = async () => {
        try {
            const data = await fetchApi("/products");
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setRole(localStorage.getItem("role") || "");
        loadProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await fetchApi(`/products/${id}`, { method: "DELETE" });
            setProducts(products.filter(p => p.id !== id));
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    const handleGenerate = async (id: string) => {
        const token = localStorage.getItem("token");
        // Standard fetch can't easily trigger a file download natively without Object URLs
        fetch(`${API_URL}/products/${id}/generate`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Generation failed");
                return res.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `code-${id}.png`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(err => alert("Error: " + err.message));
    };

    if (loading) return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-slate-700 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-slate-700 rounded"></div><div className="h-4 bg-slate-700 rounded w-5/6"></div></div></div></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Products Registry</h1>
                    <p className="text-slate-400">Manage all QR codes and Barcodes for your organization.</p>
                </div>
                <Link
                    href="/dashboard/products/new"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    New Product
                </Link>
            </div>

            {error && <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">{error}</div>}

            {products.length === 0 ? (
                <div className="text-center py-24 bg-slate-900/30 border border-dashed border-slate-700 rounded-2xl backdrop-blur-sm">
                    <svg className="mx-auto h-12 w-12 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    <h3 className="text-lg font-medium text-slate-200">No products yet</h3>
                    <p className="mt-1 text-slate-400">Get started by creating your first product code.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 p-6 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-indigo-500/30 transition-all group flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2.5 py-1 text-xs font-bold rounded-full ${product.type === 'QR' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                                    {product.type}
                                </div>
                                {(role === 'ADMIN' || role === 'MANAGER') && (
                                    <button onClick={() => handleDelete(product.id)} className="text-slate-500 hover:text-red-400 transition-colors" title="Delete Product">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1 truncate" title={product.name}>{product.name}</h3>
                            <p className="text-sm text-slate-400 mb-4 line-clamp-2">{product.description || "No description provided."}</p>

                            <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
                                <div className="text-xs text-slate-500 truncate mr-2" title={`Created by: ${product.creator_email}`}>
                                    By: {product.creator_email?.split('@')[0]}
                                </div>
                                <button
                                    onClick={() => handleGenerate(product.id)}
                                    className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors flex items-center shadow-lg"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Generate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
