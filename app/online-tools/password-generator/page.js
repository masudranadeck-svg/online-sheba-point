'use client';
import { useState } from 'react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (number) charset += '0123456789';
    if (symbol) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (charset === '') {
      alert('অন্তত একটি অপশন সিলেক্ট করুন!');
      return;
    }

    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(pass);
    setCopied(false);
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🔑 Password Generator</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>শক্তিশালী ও নিরাপদ পাসওয়ার্ড তৈরি করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#2dce89', fontSize: '18px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {password || 'Your Password'}
            </span>
            {password && (
              <button onClick={copyPassword} style={{ background: copied ? '#2dce89' : '#4e6ef2', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer', fontSize: '13px', flexShrink: 0 }}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            )}
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ color: 'rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Password Length:</span>
              <span style={{ color: '#4e6ef2', fontWeight: 'bold' }}>{length}</span>
            </label>
            <input type="range" min="6" max="32" value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px', textAlign: 'left' }}>
            <label style={{ color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4e6ef2' }} />
              Uppercase (A-Z)
            </label>
            <label style={{ color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4e6ef2' }} />
              Lowercase (a-z)
            </label>
            <label style={{ color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={number} onChange={(e) => setNumber(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4e6ef2' }} />
              Numbers (0-9)
            </label>
            <label style={{ color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={symbol} onChange={(e) => setSymbol(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4e6ef2' }} />
              Symbols (!@#$)
            </label>
          </div>

          <button onClick={generatePassword} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer' }}>
            ✨ Generate Password
          </button>

        </div>
      </div>
    </div>
  );
}