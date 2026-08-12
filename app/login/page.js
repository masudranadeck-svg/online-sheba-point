'use client'
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('লোডিং...');

    try {
      const res = await fetch('https://online-sheba-point.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        // লগইন সফল হলে ইনপুট বক্স খালি করা
        setEmail('');
        setPassword('');
        // এখানে পরে আমরা ইউজারকে ড্যাশবোর্ডে পাঠানোর কোড দিব
      }
    } catch (error) {
      setMessage('সার্ভারের সাথে কানেক্ট করা যায়নি!');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
      <h2>লগইন করুন</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="ইমেইল" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder="পাসওয়ার্ড" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          লগইন
        </button>
      </form>
      
      {message && <p style={{ marginTop: '15px', color: 'blue', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}