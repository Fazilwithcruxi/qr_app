export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-50 overflow-hidden selection:bg-indigo-500/30">
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-50"></div>

            {/* We need to use dynamic import for Sidebar because it uses localStorage and router, or just render it. It's marked 'use client' so it's fine. */}
            {/* But Next.js server components can import client components! */}
            <SidebarWrapper />

            <main className="flex-1 overflow-y-auto w-full relative">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

// Wrap to avoid importing directly in layout if needed, but direct import is totally fine.
import Sidebar from '@/components/Sidebar';
function SidebarWrapper() {
    return <Sidebar />;
}
