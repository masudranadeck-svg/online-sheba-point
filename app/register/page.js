'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Creating Access...');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Access Granted! Redirecting...');
      setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
    } catch (error) {
      console.error("Firebase Auth Error:", error); // টার্মিনালে এরর দেখাবে
      
      // নিচের লজিকটা আসল এররটা স্ক্রিনে দেখাবে
      if (error.code === 'auth/weak-password') {
        setMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!');
      } else if (error.code === 'auth/email-already-in-use') {
        setMessage('এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট রেজিস্টার করা হয়েছে!');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('ইমেইল ফরম্যাট সঠিক নয়!');
      } else if (error.code === 'auth/unauthorized-domain') {
        setMessage('এই ডোমেইনটি ফায়ারবেসে অনুমোদিত নয়! (Firebase Console Check)');
      } else {
        setMessage(`এরর: ${error.message}`);
      }
    }
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="relative bg-[var(--bg-card)] border border-[var(--border)] p-8 md:p-12 w-full max-w-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
        <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
        
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto relative mb-4">
            <div className="absolute inset-0 border border-[var(--lime)] rotate-45"></div>
            <div className="absolute inset-1 bg-[var(--lime)] rotate-45"></div>
          </div>
          <h1 className="font-display font-bold text-3xl tracking-tight text-[var(--fg)]">REQUEST ACCESS</h1>
          <p className="text-[var(--fg-muted)] text-sm mt-2 font-mono uppercase tracking-widest">Create new account</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <div>
            <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--lime)] transition-colors"
              placeholder="user@online-sheba.com"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Password (Min 6 characters)</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--lime)] transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn-primary w-full justify-center mt-4" style={{ background: 'var(--lime)', color: 'var(--bg)' }}>Initialize Account →</button>
        </form>

        {message && <p className="mt-6 text-center text-sm text-[var(--lime)] font-mono">{message}</p>}
        
        <p className="mt-8 text-center text-sm text-[var(--fg-muted)]">
          Already have access? <Link href="/login" className="text-[var(--accent)] hover:underline">Login Here</Link>
        </p>
      </div>
    </div>
  );
}