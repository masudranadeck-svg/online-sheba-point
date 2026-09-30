'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-[var(--fg-muted)] font-mono text-sm uppercase tracking-widest">Authenticating Session...</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <div className="section-eyebrow mb-4">01 / Control Center</div>
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">Dashboard.</h1>
            <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">
              Welcome back, <span className="text-[var(--accent)] font-mono">{user.email}</span>
            </p>
          </div>
          <button onClick={handleLogout} className="btn-ghost self-start lg:self-end">
            <i className="fas fa-power-off text-[10px] mr-2"></i> Disconnect
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2">Total Orders</div>
            <div className="font-display text-4xl font-bold text-[var(--fg)]">0</div>
          </div>
          <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2">Active Keys</div>
            <div className="font-display text-4xl font-bold text-[var(--lime)]">0</div>
          </div>
          <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2">Account Status</div>
            <div className="font-display text-xl font-bold text-[var(--accent)] uppercase">ACTIVE</div>
          </div>
        </div>

        {/* Action Grid */}
        <h3 className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-6 pb-2 border-b border-[var(--border)]">Quick Access</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          
          <Link href="/shop" className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group cursor-pointer">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}>
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <h4 className="font-display font-bold text-sm tracking-tight mb-1 text-[var(--fg)]">Digital Shop</h4>
            <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">Buy new keys</p>
          </Link>

          <Link href="/online-tools" className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group cursor-pointer">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}>
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </div>
            <h4 className="font-display font-bold text-sm tracking-tight mb-1 text-[var(--fg)]">Free Tools</h4>
            <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">30+ premium tools</p>
          </Link>

          <Link href="/properties" className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group cursor-pointer">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}>
              <i className="fa-solid fa-house"></i>
            </div>
            <h4 className="font-display font-bold text-sm tracking-tight mb-1 text-[var(--fg)]">Real Estate</h4>
            <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">Buy & rent</p>
          </Link>

        </div>
      </div>
    </div>
  );
}