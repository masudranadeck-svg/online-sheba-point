'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('লোডিং...');

    try {
      const res = await fetch('https://online-sheba-point.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setMessage('সার্ভারের সাথে কানেক্ট করা যায়নি!');
    }
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '450px', margin: 'auto' }}>
      <div className="d-card glow-card" style={{ padding: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a1a2e' }}>📝 রেজিস্টার করুন</h2>
        
        {/* Google Sign Up Button */}
        <button 
          onClick={() => alert('Google Sign Up শীঘ্রই আসছে!')} 
          style={{ width: '100%', padding: '12px', background: 'white', color: '#444', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}
        >
          <span style={{ fontSize: '18px' }}>🔵</span> Sign up with Google
        </button>

        {/* Phone Sign Up Button */}
        <button 
          onClick={() => alert('Phone OTP Sign Up শীঘ্রই আসছে!')} 
          style={{ width: '100%', padding: '12px', background: '#42b72a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}
        >
          <span style={{ fontSize: '18px' }}>📱</span> Sign up with Phone
        </button>

        {/* Divider */}
        <div style={{ textAlign: 'center', color: '#aaa', marginBottom: '20px', position: 'relative' }}>
          <span style={{ background: 'white', padding: '0 10px', position: 'relative', zIndex: '1' }}>অথবা ইমেইল দিয়ে রেজিস্টার করুন</span>
          <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '1px', background: '#e8ecf1', zIndex: '0' }}></div>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="আপনার নাম" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px' }}
          />
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
            রেজিস্টার
          </button>
        </form>
        
        {message && <p style={{ marginTop: '15px', color: 'green', textAlign: 'center', fontSize: '14px' }}>{message}</p>}

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/login" style={{ color: '#4e6ef2', textDecoration: 'none', fontWeight: '600' }}>লগইন করুন</Link>
        </p>
      </div>
    </div>
  );
}