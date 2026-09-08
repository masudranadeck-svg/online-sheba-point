'use client';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function BanglaSignMaker() {
  const [text, setText] = useState('মাসুদ রানা');
  const [fontFamily, setFontFamily] = useState("'Galada', cursive");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState('#000000');
  const [tilt, setTilt] = useState(-5);
  const captureRef = useRef(null);

  // গুগল ফন্ট লোড করার জন্য (Handwriting styles)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Galada&family=Hind+Siliguri:wght@500&family=Tangerine:wght@700&family=Dancing+Script:wght@700&family=Pacifico&family=Caveat:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const fonts = [
    { name: 'Galada (Bangla)', value: "'Galada', cursive" },
    { name: 'Hind Siliguri (Bangla)', value: "'Hind Siliguri', sans-serif" },
    { name: 'Tangerine (English)', value: "'Tangerine', cursive" },
    { name: 'Dancing Script (English)', value: "'Dancing Script', cursive" },
    { name: 'Pacifico (English)', value: "'Pacifico', cursive" },
    { name: 'Caveat (English)', value: "'Caveat', cursive" }
  ];

  const handleDownload = async () => {
    if (!captureRef.current) return;
    const btn = document.getElementById('download-btn');
    if (btn) btn.innerText = '⏳ তৈরি হচ্ছে...';

    try {
      // ট্রান্সপারেন্ট ব্যাকগ্রাউন্ডের জন্য backgroundColor: null দেওয়া হয়েছে
      const canvas = await html2canvas(captureRef.current, { 
        scale: 2, 
        backgroundColor: null,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = 'signature.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      alert('সিগনেচার তৈরি করতে সমস্যা হয়েছে!');
    }
    if (btn) btn.innerText = '💾 Download PNG';
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>✍️ Bangla Sign Maker</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>নাম লিখুন, ফন্ট ও কালার বেছে নিন এবং সিগনেচার ডাউনলোড করুন।</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Controls */}
          <div className="glass-3d" style={{ padding: '30px', textAlign: 'left' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>আপনার নাম লিখুন:</label>
              <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                className="d-input" 
                placeholder="যেমন: মাসুদ রানা" 
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>ফন্ট স্টাইল:</label>
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="d-input">
                {fonts.map((f, i) => (
                  <option key={i} value={f.value} style={{background: '#1a1c2e'}}>{f.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>ফন্ট সাইজ: {fontSize}px</label>
              <input type="range" min="20" max="100" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>কালার:</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', height: '40px', background: 'none', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>হেলান (Tilt): {tilt}deg</label>
              <input type="range" min="-30" max="30" value={tilt} onChange={(e) => setTilt(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
            </div>

          </div>

          {/* Right Side: Preview */}
          <div>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '8px', padding: '40px', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Capture Area */}
              <div ref={captureRef} style={{ display: 'inline-block', padding: '10px' }}>
                <p 
                  style={{ 
                    margin: 0, 
                    color: color, 
                    fontFamily: fontFamily, 
                    fontSize: `${fontSize}px`, 
                    transform: `rotate(${tilt}deg)`,
                    whiteSpace: 'nowrap',
                    lineHeight: 1.2
                  }}
                >
                  {text || 'Your Name'}
                </p>
              </div>

            </div>
            
            {/* Checkerboard background hint for transparency */}
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '10px' }}>
              * ডাউনলোড করা ছবিটি সম্পূর্ণ ট্রান্সপারেন্ট (ব্যাকগ্রাউন্ড ফাঁকা) হবে।
            </p>

            <button onClick={handleDownload} id="download-btn" className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '20px' }}>
              💾 Download Signature (PNG)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}