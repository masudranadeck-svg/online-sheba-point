'use client';
import { useState } from 'react';

export default function SocialResizer() {
  const [originalImage, setOriginalImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [selectedSize, setSelectedSize] = useState({ name: 'YouTube Thumbnail', w: 1280, h: 720 });
  const [loading, setLoading] = useState(false);

  const sizes = [
    { name: 'YouTube Thumbnail', w: 1280, h: 720 },
    { name: 'Instagram Post (1:1)', w: 1080, h: 1080 },
    { name: 'Instagram Story (9:16)', w: 1080, h: 1920 },
    { name: 'Facebook Cover', w: 820, h: 312 },
    { name: 'Facebook Post', w: 1200, h: 630 },
    { name: 'WhatsApp DP', w: 640, h: 640 },
    { name: 'Twitter Header', w: 1500, h: 500 }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setOriginalImage(ev.target.result);
      setResultUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = () => {
    if (!originalImage) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = selectedSize.w;
      canvas.height = selectedSize.h;
      const ctx = canvas.getContext('2d');

      // "Cover" Fit Logic (ছবি নষ্ট না করে পুরো ফ্রেম ফিল করবে)
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      
      let sx = 0, sy = 0, sw = img.width, sh = img.height;

      if (imgRatio > canvasRatio) {
        // Image is wider than canvas, crop sides
        sw = img.height * canvasRatio;
        sx = (img.width - sw) / 2;
      } else if (imgRatio < canvasRatio) {
        // Image is taller than canvas, crop top/bottom
        sh = img.width / canvasRatio;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      setResultUrl(canvas.toDataURL('image/png'));
      setLoading(false);
    };
    img.src = originalImage;
  };

  const clearAll = () => {
    setOriginalImage(null);
    setResultUrl(null);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📲 Social Media Image Resizer</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>এক ক্লিকে ইউটিউব, ইন্সটাগ্রাম, ফেসবুকের নিখুঁত সাইজে ছবি রিসাইজ করুন।</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Controls */}
          <div className="glass-3d" style={{ padding: '30px', textAlign: 'left' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px' }}>Select Platform Size:</label>
              <select 
                value={selectedSize.name} 
                onChange={(e) => {
                  const size = sizes.find(s => s.name === e.target.value);
                  setSelectedSize(size);
                  setResultUrl(null);
                }} 
                className="d-input"
              >
                {sizes.map((s, i) => (
                  <option key={i} value={s.name} style={{background: '#1a1c2e'}}>{s.name} ({s.w}x{s.h})</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <button onClick={() => document.getElementById('resize-input').click()} className="d-btn glow-btn" style={{ width: '100%', padding: '12px', border: 'none', cursor: 'pointer' }}>
                ➕ ছবি আপলোড করুন
              </button>
              <input type="file" accept="image/*" id="resize-input" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>

            {originalImage && (
              <button onClick={resizeImage} disabled={loading} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '12px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                ✨ Resize Image
              </button>
            )}
          </div>

          {/* Right Side: Preview */}
          <div>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '8px', padding: '20px', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '15px' }}>
              
              {!originalImage && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>এখানে ছবির প্রিভিউ দেখা যাবে</p>
              )}

              {originalImage && !resultUrl && (
                <img src={originalImage} alt="Original" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
              )}

              {resultUrl && (
                <div style={{ textAlign: 'center' }}>
                  <img src={resultUrl} alt="Resized" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '8px', border: '1px solid #2dce89', boxShadow: '0 0 10px rgba(45,206,137,0.2)' }} />
                  <p style={{ color: '#2dce89', fontSize: '12px', marginTop: '10px' }}>Size: {selectedSize.w} x {selectedSize.h} px</p>
                </div>
              )}
            </div>

            {resultUrl && (
              <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
                <a href={resultUrl} download={`resized-${selectedSize.w}x${selectedSize.h}.png`} className="d-btn-green glow-btn-green" style={{ flex: 1, padding: '12px', textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                  💾 Download PNG
                </a>
                <button onClick={clearAll} className="d-btn-outline" style={{ padding: '12px 20px', border: 'none', cursor: 'pointer' }}>
                  🔄 Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}