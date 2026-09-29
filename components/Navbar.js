'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-[var(--border)]">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 relative">
              <div className="absolute inset-0 border border-[var(--accent)] rotate-45"></div>
              <div className="absolute inset-1 bg-[var(--accent)] rotate-45"></div>
            </div>
            <span className="font-display font-bold text-base md:text-lg tracking-tight">ONLINE SHEBA POINT</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/shop" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Shop</Link>
            <Link href="/online-tools" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Tools</Link>
            <Link href="/properties" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Real Estate</Link>
            <Link href="/dashboard" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Dashboard</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <button onClick={handleLogout} className="btn-primary !py-2 !px-4 text-[11px]">Logout</button>
          ) : (
            <Link href="/login" className="btn-primary !py-2 !px-4 text-[11px]">Login / Register</Link>
          )}
        </div>
      </div>
    </header>
  );
}