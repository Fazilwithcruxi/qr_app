"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [role, setRole] = useState("");

    useEffect(() => {
        const sRole = localStorage.getItem("role");
        if (!sRole) router.push("/auth/login");
        setRole(sRole || "");
    }, [router]);

    const handleLogout = () => {
        localStorage.clear();
        router.push("/auth/login");
    };

    const navItems = [
        {
            name: 'Products', href: '/dashboard', icon: (
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            )
        },
        {
            name: 'Generate New', href: '/dashboard/products/new', icon: (
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            )
        }
    ];

    if (role === 'ADMIN' || role === 'MANAGER') {
        navItems.push({
            name: 'Team Users', href: '/dashboard/users', icon: (
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )
        });
    }

    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">QRGenius</span>
                <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">{role}</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-400 shadow-[inset_2px_0_0_0_rgba(99,102,241,1)]'
                                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-slate-100'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Sign out
                </button>
            </div>
        </div>
    );
}
