'use client'
import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('লগইন হচ্ছে...');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('লগইন সফল! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...');
      
      // Next.js router er bodole amra direct redirect korlam
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000); // 1 second por redirect hobe jate message ta dekhte paren

    } catch (error) {
      setMessage('ভুল ইমেইল বা পাসওয়ার্ড!');
    }
  };

  return (
    <div className="deepin-body" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div className="glass-3d" style={{ width:'100%', maxWidth:400 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: 'white' }}>🔐 কাস্টমার লগইন</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>আপনার একাউন্টে লগইন করুন</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="ইমেইল" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="d-input"
          />
          <input 
            type="password" 
            placeholder="পাসওয়ার্ড" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="d-input"
          />
          <button type="submit" className="neon-3d-btn" style={{ width:'100%' }}>
            লগইন করুন
          </button>
        </form>

        {message && <p style={{ marginTop: '15px', color: '#4e6ef2', textAlign: 'center', fontSize: '14px' }}>{message}</p>}

        <p style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
          নতুন ইউজার? <Link href="/register" style={{ color: '#4e6ef2', textDecoration: 'none', fontWeight: '600' }}>রেজিস্টার করুন</Link>
        </p>
      </div>
    </div>
  );
}