'use client'
import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('লোডিং...');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('লগইন সফল হয়েছে!');
      setEmail(''); 
      setPassword('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGoogle = async () => {
    setMessage('Google দিয়ে লগইন হচ্ছে...');
    const provider = new GoogleAuthProvider();
    try {
      // Redirect পদ্ধতি ব্যবহার করা হলো
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '450px', margin: 'auto' }}>
      <div className="d-card glow-card" style={{ padding: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a1a2e' }}>🔐 লগইন করুন</h2>
        
        <button 
          onClick={handleGoogle} 
          style={{ width: '100%', padding: '12px', background: 'white', color: '#444', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}
        >
          <span style={{ fontSize: '18px' }}>🔵</span> Login with Google
        </button>

        <div style={{ textAlign: 'center', color: '#aaa', margin: '20px 0' }}>অথবা ইমেইল দিয়ে</div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="ইমেইল" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px' }}
          />
          <input 
            type="password" 
            placeholder="পাসওয়ার্ড" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px' }}
          />
          <button 
            type="submit" 
            style={{ padding: '12px', background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}
          >
            লগইন
          </button>
        </form>
        
        {message && <p style={{ marginTop: '15px', color: 'blue', textAlign: 'center', fontSize: '14px' }}>{message}</p>}

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          নতুন ইউজার? <Link href="/register" style={{ color: '#4e6ef2', textDecoration: 'none', fontWeight: '600' }}>রেজিস্টার করুন</Link>
        </p>
      </div>
    </div>
  );
}