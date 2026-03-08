"use client";
import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";

interface User {
    id: string;
    email: string;
    role: string;
    created_at: string;
}

export default function UsersManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [role, setRole] = useState("");

    // New User Form State
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("USER");
    const [creating, setCreating] = useState(false);

    const loadUsers = async () => {
        try {
            const data = await fetchApi("/auth/users");
            setUsers(data.users || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setRole(localStorage.getItem("role") || "");
        loadUsers();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setError("");

        try {
            const data = await fetchApi("/auth/users", {
                method: "POST",
                body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole }),
            });
            setUsers(prev => [data.user, ...prev]);
            setNewEmail("");
            setNewPassword("");
            setNewRole("USER");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setCreating(false);
        }
    };

    if (loading) return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-slate-700 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-slate-700 rounded"></div><div className="h-4 bg-slate-700 rounded w-5/6"></div></div></div></div>;

    if (role !== 'ADMIN' && role !== 'MANAGER') {
        return <div className="text-center py-20 text-red-400">You do not have permission to view this page.</div>;
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Team Management</h1>
                <p className="text-slate-400">Manage users within your organization.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {error && <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">{error}</div>}

                    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/50 text-slate-300 text-sm">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold">Role</th>
                                    <th className="px-6 py-4 font-semibold">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 text-slate-200">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${user.role === 'ADMIN' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                                                    user.role === 'MANAGER' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                                        'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500">No users found in this organization.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800 p-6 sticky top-8">
                        <h3 className="text-xl font-bold text-white mb-6">Add Team Member</h3>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Email <span className="text-red-400">*</span></label>
                                <input
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Temporary Password <span className="text-red-400">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="e.g. ChangeMe123!"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Assign Role <span className="text-red-400">*</span></label>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                >
                                    <option value="USER">User (Can create/view products)</option>
                                    {role === 'ADMIN' && <option value="MANAGER">Manager (Can manage products & users)</option>}
                                    {role === 'ADMIN' && <option value="ADMIN">Admin (Full organization control)</option>}
                                </select>
                                {role === 'MANAGER' && <p className="text-xs text-slate-500 mt-2">Managers can only invite Users.</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={creating}
                                className="w-full flex justify-center py-2.5 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:opacity-50 transition-all"
                            >
                                {creating ? "Sending Invite..." : "Invite User"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
