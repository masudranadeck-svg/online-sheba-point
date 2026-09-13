'use client';
import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QrGenerator() {
  const [type, setType] = useState('url');
  const [url, setUrl] = useState('https://onlineshebapoint.it.com');
  const [text, setText] = useState('Hello World!');
  const [email, setEmail] = useState('support@onlineshebapoint.com');
  const [subject, setSubject] = useState('Inquiry');
  const [wifiSsid, setWifiSsid] = useState('MyWiFi');
  const [wifiPass, setWifiPass] = useState('password123');
  const [phone, setPhone] = useState('+8801712345678');
  const [sms, setSms] = useState('+8801712345678');
  const [smsMsg, setSmsMsg] = useState('Hello');
  const [imgData, setImgData] = useState('');
  const [fgColor, setFgColor] = useState('#4e6ef2');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [warning, setWarning] = useState('');
  
  const qrRef = useRef(null);

  // ছবিকে ছোট করে Base64 টেক্সট বানানোর ফাংশন
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // ছবিকে 100x100 পিক্সেলে কমিয়ে আনা হচ্ছে যাতে QR কোড ধারণ করতে পারে
        const canvas = document.createElement('canvas');
        const maxThumbSize = 100;
        let w = img.width;
        let h = img.height;

        if (w > h) {
          if (w > maxThumbSize) { h *= maxThumbSize / w; w = maxThumbSize; }
        } else {
          if (h > maxThumbSize) { w *= maxThumbSize / h; h = maxThumbSize; }
        }

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        
        // 0.5 quality JPEG তে কনভার্ট করা হচ্ছে
        const base64 = canvas.toDataURL('image/jpeg', 0.5);
        
        if (base64.length > 1500) {
          setWarning('ছবিটি এখনও বড়! স্ক্যান করতে সমস্যা হতে পারে। অনুগ্রহ করে ছোট ছবি দিন।');
        } else {
          setWarning('');
        }
        
        setImgData(base64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const getQrValue = () => {
    if (type === 'url') return url;
    if (type === 'text') return text;
    if (type === 'email') return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    if (type === 'wifi') return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`;
    if (type === 'phone') return `tel:${phone}`;
    if (type === 'sms') return `SMSTO:${sms}:${smsMsg}`;
    if (type === 'image') return imgData;
    return '';
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    
    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  const handleReset = () => {
    setType('url');
    setUrl('https://onlineshebapoint.it.com');
    setText('');
    setEmail('');
    setSubject('');
    setWifiSsid('');
    setWifiPass('');
    setPhone('');
    setSms('');
    setSmsMsg('');
    setImgData('');
    setFgColor('#4e6ef2');
    setBgColor('#ffffff');
    setWarning('');
  };

  const types = [
    { key: 'url', label: 'URL' },
    { key: 'text', label: 'TEXT' },
    { key: 'wifi', label: 'WIFI' },
    { key: 'email', label: 'EMAIL' },
    { key: 'phone', label: 'PHONE' },
    { key: 'sms', label: 'SMS' },
    { key: 'image', label: 'IMAGE' }
  ];

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📱 Pro QR Generator</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>URL, Text, WiFi, Email, Phone, SMS বা Image দিয়ে কাস্টম QR কোড তৈরি করুন।</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Controls */}
          <div className="glass-3d" style={{ padding: '30px', textAlign: 'left' }}>
            
            {/* Type Selector */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px', background: 'rgba(0,0,0,0.2)', padding: '5px', borderRadius: '8px' }}>
              {types.map(t => (
                <button 
                  key={t.key} 
                  onClick={() => setType(t.key)} 
                  style={{ 
                    flex: '1 1 30%', 
                    padding: '8px', 
                    background: type === t.key ? '#4e6ef2' : 'transparent', 
                    color: type === t.key ? 'white' : '#888', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontWeight: '600',
                    fontSize: '12px',
                    transition: 'all 0.2s'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {type === 'url' && (
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="d-input" style={{ marginBottom: '15px' }} />
            )}
            {type === 'text' && (
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text here" className="d-input" style={{ marginBottom: '15px', minHeight: '80px' }} />
            )}
            {type === 'email' && (
              <div style={{ marginBottom: '15px' }}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="d-input" style={{ marginBottom: '10px' }} />
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="d-input" />
              </div>
            )}
            {type === 'wifi' && (
              <div style={{ marginBottom: '15px' }}>
                <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="WiFi Name (SSID)" className="d-input" style={{ marginBottom: '10px' }} />
                <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="Password" className="d-input" />
              </div>
            )}
            {type === 'phone' && (
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+8801XXXXXXXXX" className="d-input" style={{ marginBottom: '15px' }} />
            )}
            {type === 'sms' && (
              <div style={{ marginBottom: '15px' }}>
                <input type="text" value={sms} onChange={(e) => setSms(e.target.value)} placeholder="Phone Number" className="d-input" style={{ marginBottom: '10px' }} />
                <textarea value={smsMsg} onChange={(e) => setSmsMsg(e.target.value)} placeholder="Message" className="d-input" style={{ minHeight: '60px' }} />
              </div>
            )}
            {type === 'image' && (
              <div style={{ marginBottom: '15px' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="d-input" style={{ padding: '10px' }} />
                {imgData && <img src={imgData} alt="Thumb" style={{ width: '50px', height: '50px', marginTop: '10px', borderRadius: '4px' }} />}
                {warning && <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px' }}>{warning}</p>}
              </div>
            )}

            {/* Colors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', display: 'block', marginBottom: '5px' }}>Foreground Color</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ width: '100%', height: '40px', background: 'none', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }} />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', display: 'block', marginBottom: '5px' }}>Background Color</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '100%', height: '40px', background: 'none', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }} />
              </div>
            </div>

          </div>

          {/* Right Side: QR Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div ref={qrRef} style={{ background: bgColor, padding: '20px', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.3)', display: 'inline-block' }}>
              <QRCodeCanvas 
                value={getQrValue() || ' '} 
                size={200} 
                fgColor={fgColor} 
                bgColor={bgColor} 
                level="H" 
                includeMargin={true}
              />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '15px', fontWeight: '600', letterSpacing: '1px' }}>SCAN TO CONNECT</p>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', width: '100%' }}>
              <button onClick={handleDownload} className="d-btn-green glow-btn-green" style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer' }}>
                💾 Save PNG
              </button>
              <button onClick={handleReset} className="d-btn-orange" style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer' }}>
                🔄 Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}