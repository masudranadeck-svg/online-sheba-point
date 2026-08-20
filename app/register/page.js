'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('একাউন্ট তৈরি হচ্ছে...');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('সফল! ড্যাশবোর্ডে যাওয়া হচ্ছে...');
      router.push('/dashboard');
    } catch (error) {
      setMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে বা ইমেইল ব্যবহৃত!');
    }
  };

  return (
    <div className="deepin-body" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div className="glass-3d" style={{ width:'100%', maxWidth:400 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: 'white' }}>📝 নতুন একাউন্ট</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>রেজিস্টার করে শপ করুন</p>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="আপনার ইমেইল" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="d-input"
          />
          <input 
            type="password" 
            placeholder="নতুন পাসওয়ার্ড" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="d-input"
          />
          <button type="submit" className="neon-3d-btn" style={{ width:'100%' }}>
            রেজিস্টার করুন
          </button>
        </form>

        {message && <p style={{ marginTop: '15px', color: '#4e6ef2', textAlign: 'center', fontSize: '14px' }}>{message}</p>}

        <p style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
          একাউন্ট আছে? <Link href="/login" style={{ color: '#4e6ef2', textDecoration: 'none', fontWeight: '600' }}>লগইন করুন</Link>
        </p>
      </div>
    </div>
  );
}