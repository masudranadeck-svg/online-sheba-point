'use client';
import { useState } from 'react';

export default function AIPassportPhotoMaker() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transparentImage, setTransparentImage] = useState(null);

  const colors = [
    { name: 'White', hex: '#ffffff' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Red', hex: '#ef4444' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Gray', hex: '#9ca3af' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target.result);
        setProcessedImage(null);
        setTransparentImage(null);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  // ছবির সাইজ কমানোর ফাংশন (AI Crash ঠেকাতে)
  const resizeImage = (dataUrl, maxSize = 1024) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > width && height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.src = dataUrl;
    });
  };

  const handleRemoveBg = async () => {
    if (!originalImage) return;
    setLoading(true);
    setError('');
    
    try {
      // ১. প্রথমে ছবির সাইজ কমানো হচ্ছে
      const resizedImage = await resizeImage(originalImage, 1024);

      // ২. এআই লাইব্রেরি লোড করা হচ্ছে
      const imglyRemoveBackground = (await import('@imgly/background-removal')).default;
      
      // ৩. ব্যাকগ্রাউন্ড মোছা হচ্ছে
      const blob = await imglyRemoveBackground(resizedImage);
      const url = URL.createObjectURL(blob);
      setTransparentImage(url);
      
      // ৪. সাদা ব্যাকগ্রাউন্ড যোগ করা হচ্ছে
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setProcessedImage(canvas.toDataURL('image/png'));
        setLoading(false);
      };
      img.src = url;
    } catch (err) {
      console.error("AI Error:", err);
      setError('এআই প্রসেস করতে ব্যর্থ হয়েছে। ইন্টারনেট স্লো থাকতে পারে অথবা ছবির ফাইল খুব বড়। অনুগ্রহ করে অন্য একটি ছবি দিয়ে চেষ্টা করুন।');
      setLoading(false);
    }
  };

  const handleBgChangeProper = (color) => {
    setBgColor(color);
    if (!transparentImage) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setProcessedImage(canvas.toDataURL('image/png'));
    };
    img.src = transparentImage;
  };

  const handleDownloadPNG = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'ai-passport-photo.png';
    link.click();
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🤖 AI Passport Photo Maker</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি আপলোড করুন, AI স্বয়ংক্রিয়ভাবে ব্যাকগ্রাউন্ড মুছে ফেলবে।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          {!originalImage ? (
            <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
            </div>
          ) : (
            <div>
              <img src={processedImage || originalImage} alt="Preview" style={{ maxWidth: '300px', borderRadius: '8px', marginBottom: '20px', border: '2px solid rgba(255,255,255,0.2)' }} />
              
              {!processedImage ? (
                <button 
                  onClick={handleRemoveBg} 
                  disabled={loading}
                  className="neon-3d-btn" 
                  style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
                >
                  {loading ? '⏳ AI প্রসেসিং হচ্ছে... (১-২ মিনিট সময় লাগতে পারে)' : '✨ AI Background Remove করুন'}
                </button>
              ) : (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', display: 'block', marginBottom: '10px' }}>Background Color:</label>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      {colors.map((c, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleBgChangeProper(c.hex)} 
                          style={{ 
                            background: c.hex, 
                            width: '40px', height: '40px', borderRadius: '50%', 
                            border: bgColor === c.hex ? '3px solid #4e6ef2' : '1px solid #ccc', 
                            cursor: 'pointer' 
                          }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <button onClick={handleDownloadPNG} className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                    💾 Download PNG
                  </button>
                </div>
              )}
              
              {error && <p style={{ color: '#ff6b6b', marginTop: '15px', fontSize: '14px' }}>{error}</p>}
              
              <button onClick={() => { setOriginalImage(null); setProcessedImage(null); setTransparentImage(null); setError(''); }} className="d-btn-outline" style={{ marginTop: '15px', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
                🔄 নতুন ছবি আপলোড করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}