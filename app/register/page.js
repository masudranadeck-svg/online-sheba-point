'use client'
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('লোডিং...'); // ক্লিক করার সাথে সাথে লোডিং দেখাবে

    try {
      const res = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      setMessage(data.message);

      // সফল হলে ইনপুট বক্স খালি করে দেওয়া
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
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
      <h2>রেজিস্টার করুন</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="আপনার নাম" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
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
          রেজিস্টার
        </button>
      </form>
      
      {/* মেসেজ দেখানোর জন্য */}
      {message && <p style={{ marginTop: '15px', color: 'green', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}