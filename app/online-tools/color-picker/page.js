'use client';
import { useState, useRef } from 'react';

export default function ColorPicker() {
  const [image, setImage] = useState(null);
  const [hex, setHex] = useState('#4e6ef2');
  const [rgb, setRgb] = useState('rgb(78, 110, 242)');
  const [copied, setCopied] = useState('');
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setHex('#4e6ef2');
      setRgb('rgb(78, 110, 242)');
    };
    reader.readAsDataURL(file);
  };

  const drawImage = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = e.target;
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
  };

  const pickColor = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = e.target.getBoundingClientRect();
    
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    
    const rgbStr = `rgb(${r}, ${g}, ${b})`;
    const hexStr = '#' + [r, g, b].map(x => {
      return x.toString(16).padStart(2, '0');
    }).join('').toUpperCase();

    setRgb(rgbStr);
    setHex(hexStr);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 1500);
  };

  const clearAll = () => {
    setImage(null);
    setHex('#4e6ef2');
    setRgb('rgb(78, 110, 242)');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🎨 Image Color Picker</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি আপলোড করুন এবং ছবির যেকোনো জায়গায় ক্লিক করে কালার কোড (HEX/RGB) বের করে আনুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {!image && (
            <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {image && (
            <>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '30px', cursor: 'crosshair', maxWidth: '100%' }}>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                <img 
                  src={image} 
                  alt="Picker" 
                  onLoad={drawImage} 
                  onClick={pickColor} 
                  style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '12px', 
                  background: hex, 
                  border: '2px solid rgba(255,255,255,0.2)', 
                  boxShadow: `0 0 15px ${hex}`
                }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => copyToClipboard(hex)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 20px', color: 'white', cursor: 'pointer', fontSize: '14px' }}>
                    HEX: {hex} {copied === hex && '✓'}
                  </button>
                  
                  <button onClick={() => copyToClipboard(rgb)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 20px', color: 'white', cursor: 'pointer', fontSize: '14px' }}>
                    RGB: {rgb} {copied === rgb && '✓'}
                  </button>
                </div>
              </div>

              <button onClick={clearAll} className="d-btn-outline" style={{ marginTop: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                🔄 নতুন ছবি আপলোড করুন
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}