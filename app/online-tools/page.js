'use client';
import { useState } from 'react';

export default function OnlineTools() {
  const [message, setMessage] = useState('');

  const tools = [
    { name: 'ID Card Crop to PDF', icon: '🆔', color: '#4e6ef2' },
    { name: 'Passport Crop to PDF', icon: '🛂', color: '#a855f7' },
    { name: 'NID Front-Back Joiner', icon: '📄', color: '#2dce89' },
    { name: 'Professional CV Maker', icon: '💼', color: '#fb6340' },
    { name: 'AI Passport Photo Maker', icon: '🤖', color: '#4e6ef2' },
    { name: 'Passport Photo Maker', icon: '📸', color: '#a855f7' },
    { name: 'Studio Photo Print Layout', icon: '🖼️', color: '#2dce89' },
    { name: 'Joint Photo Maker', icon: '👥', color: '#fb6340' }
  ];

  const handleClick = (toolName) => {
    setMessage(`"${toolName}" টুলটি শীঘ্রই লাইভ হতে যাচ্ছে! সাথেই থাকুন। 🚀`);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'white', margin: 0, textShadow: '2px 2px 0 #333, 4px 4px 10px rgba(0,0,0,0.8)' }}>🛠️ ফ্রি অনলাইন টুলস</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>আপনার দৈনন্দিন কাজের জন্য সেরা ওয়েব টুলস</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {tools.map((tool, i) => (
            <div 
              key={i} 
              onClick={() => handleClick(tool.name)} 
              className="glass-3d" 
              style={{ cursor: 'pointer', textAlign: 'center' }}
            >
              <div style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: `rgba(${tool.color === '#4e6ef2' ? '78,110,242' : tool.color === '#a855f7' ? '168,85,247' : tool.color === '#2dce89' ? '45,206,137' : '251,99,64'}, 0.1)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                margin: '0 auto 16px auto',
                border: `1px solid ${tool.color}30`
              }}>
                {tool.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', margin: 0 }}>{tool.name}</h3>
              <button className="d-btn-outline" style={{ marginTop: '16px', padding: '8px 16px', fontSize: '12px', width: '100%', boxSizing: 'border-box' }}>
                ব্যবহার করুন →
              </button>
            </div>
          ))}
        </div>

        {message && (
          <div style={{ 
            marginTop: '30px', 
            background: 'rgba(78,110,242,0.1)', 
            border: '1px solid rgba(78,110,242,0.2)', 
            padding: '16px', 
            borderRadius: '12px', 
            textAlign: 'center', 
            color: '#4e6ef2', 
            fontWeight: 600 
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}