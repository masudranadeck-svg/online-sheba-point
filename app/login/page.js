'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('অথেনটিকেটিং...');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('লগইন সফল! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...');
      setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
    } catch (error) {
      setMessage('ভুল ইমেইল বা পাসওয়ার্ড!');
    }
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="relative bg-[var(--bg-card)] border border-[var(--border)] p-8 md:p-12 w-full max-w-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
        <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
        
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto relative mb-4">
            <div className="absolute inset-0 border border-[var(--accent)] rotate-45"></div>
            <div className="absolute inset-1 bg-[var(--accent)] rotate-45"></div>
          </div>
          <h1 className="font-display font-bold text-3xl tracking-tight text-[var(--fg)]">SYSTEM ACCESS</h1>
          <p className="text-[var(--fg-muted)] text-sm mt-2 font-mono uppercase tracking-widest">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="user@online-sheba.com"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn-primary w-full justify-center mt-4">Authenticate →</button>
        </form>

        {message && <p className="mt-6 text-center text-sm text-[var(--accent)] font-mono">{message}</p>}
        
        <p className="mt-8 text-center text-sm text-[var(--fg-muted)]">
          No access? <Link href="/register" className="text-[var(--lime)] hover:underline">Request Access</Link>
        </p>
      </div>
    </div>
  );
}