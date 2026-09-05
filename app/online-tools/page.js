'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnlineTools() {
  const router = useRouter();

  const tools = [
    { name: 'ID Card Crop to PDF', link: '/online-tools/id-card-crop', icon: '🆔', color: '#4e6ef2' },
    { name: 'Passport Photo Maker', link: '/online-tools/passport-photo-maker', icon: '📸', color: '#a855f7' },
    { name: 'Stamp Photo Maker', link: '/online-tools/stamp-photo-maker', icon: '🟫', color: '#2dce89' },
    { name: 'NID Front-Back Joiner', link: '/online-tools/nid-joiner', icon: '📄', color: '#2dce89' },
    { name: 'Professional CV Maker', link: '/online-tools/cv-builder', icon: '💼', color: '#fb6340' },
    { name: 'AI Passport Photo Maker', link: '#', icon: '🤖', color: '#4e6ef2' },
    { name: 'Studio Photo Print Layout', link: '#', icon: '🖼️', color: '#2dce89' },
    { name: 'Joint Photo Maker', link: '#', icon: '👥', color: '#fb6340' }
  ];

  const handleClick = (tool) => {
    if (tool.link !== '#') {
      router.push(tool.link);
    } else {
      alert(`"${tool.name}" টুলটি শীঘ্রই আসছে! 🚀`);
    }
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
              onClick={() => handleClick(tool)} 
              className="glass-3d" 
              style={{ cursor: 'pointer', textAlign: 'center' }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 16,
                background: `rgba(${tool.color === '#4e6ef2' ? '78,110,242' : tool.color === '#a855f7' ? '168,85,247' : tool.color === '#2dce89' ? '45,206,137' : '251,99,64'}, 0.1)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, margin: '0 auto 16px auto', border: `1px solid ${tool.color}30`
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
      </div>
    </div>
  );
}