'use client'
import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('লোডিং...');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('রেজিস্ট্রেশন সফল হয়েছে!');
      setEmail(''); 
      setPassword('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '450px', margin: 'auto' }}>
      <div className="d-card glow-card" style={{ padding: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a1a2e' }}>📝 রেজিস্টার করুন</h2>
        
        <div style={{ textAlign: 'center', color: '#aaa', margin: '20px 0' }}>ইমেইল ও পাসওয়ার্ড দিয়ে একাউন্ড তৈরি করুন</div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="ইমেইল" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <input 
            type="password" 
            placeholder="পাসওয়ার্ড" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button 
            type="submit" 
            style={{ padding: '12px', background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
          >
            রেজিস্টার
          </button>
        </form>

        {message && <p style={{ marginTop: '15px', color: 'blue', textAlign: 'center', fontSize: '14px' }}>{message}</p>}
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/login" style={{ color: '#4e6ef2', textDecoration: 'none', fontWeight: '600' }}>লগইন করুন</Link>
        </p>
      </div>
    </div>
  );
}