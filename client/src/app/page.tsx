import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          QRGenius
        </div>
        <div className="space-x-4">
          <Link href="/auth/login" className="text-sm font-medium hover:text-indigo-400 transition-colors">
            Sign In
          </Link>
          <Link href="/auth/register" className="px-4 py-2 text-sm font-medium rounded-full bg-indigo-500/10 border border-indigo-500/50 hover:bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
          Enterprise Microservices Architecture
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto">
          Secure Multi-Tenant <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient">
            QR & Barcode Generation
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Built for scale and utmost security. Role-based access control, organizational segregation, and unlimited high-quality code generation for your products.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/register" className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_rgba(99,102,241,0.8)] hover:-translate-y-1">
            Start Free Trial
          </Link>
          <Link href="/auth/login" className="px-8 py-4 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 backdrop-blur-md text-white font-semibold transition-all hover:border-slate-600">
            Sign In to Dashboard
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto text-left">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-indigo-500/50 transition-colors group">
            <div className="h-12 w-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Bank-Grade Security</h3>
            <p className="text-slate-400">Strict JWT authentication and organizational segregation guarantees your data remains strictly confidential.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/50 transition-colors group">
            <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Role-Based Access</h3>
            <p className="text-slate-400">Granular control with Admin, Manager, and User tiers to structure your team's workflow seamlessly.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500/50 transition-colors group">
            <div className="h-12 w-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Blazing Fast Generation</h3>
            <p className="text-slate-400">Pure functional microservices architecture built to handle massive enterprise generation loads without a sweat.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
