'use client';
import { useState, useRef } from 'react';

export default function WatermarkAdder() {
  const [originalImage, setOriginalImage] = useState(null);
  const [watermarkText, setWatermarkText] = useState('© Online Sheba Point');
  const [fontSize, setFontSize] = useState(30);
  const [color, setColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(50); // 0 to 100
  const [rotation, setRotation] = useState(-30);
  const [position, setPosition] = useState('center'); // center, bottom-right, tile
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const imgRef = useRef(null);

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

  const applyWatermark = () => {
    if (!originalImage) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // ১. আসল ছবি বসানো
      ctx.drawImage(img, 0, 0);

      // ২. ওয়াটারমার্ক সেটিংস
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity / 100; // 0.0 to 1.0
      
      const textWidth = ctx.measureText(watermarkText).width;

      if (position === 'tile') {
        // সারা ছবিতে গ্রিড আকারে বসানো
        ctx.translate(0, 0);
        for (let y = 0; y < canvas.height + 200; y += 150) {
          for (let x = 0; x < canvas.width + 200; x += 250) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.fillText(watermarkText, 0, 0);
            ctx.restore();
          }
        }
      } else {
        // নির্দিষ্ট স্থানে বসানো (Center বা Bottom-Right)
        let x, y;
        if (position === 'center') {
          x = canvas.width / 2;
          y = canvas.height / 2;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
        } else if (position === 'bottom-right') {
          x = canvas.width - 20;
          y = canvas.height - 20;
          ctx.textAlign = 'right';
          ctx.textBaseline = 'bottom';
        }

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillText(watermarkText, 0, 0);
        ctx.restore();
      }

      // রিসেট সেটিংস
      ctx.globalAlpha = 1.0;
      
      setResultUrl(canvas.toDataURL('image/png'));
      setLoading(false);
    };
    img.src = originalImage;
  };

  const clearAll = () => {
    setOriginalImage(null);
    setResultUrl(null);
    setWatermarkText('© Online Sheba Point');
    setFontSize(30);
    setColor('#ffffff');
    setOpacity(50);
    setRotation(-30);
    setPosition('center');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>💧 Watermark Adder</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবিতে নিজের নাম বা লোগো বসিয়ে নিরাপদ করুন।</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Controls */}
          <div className="glass-3d" style={{ padding: '30px', textAlign: 'left' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>Watermark Text:</label>
              <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="d-input" placeholder="আপনার নাম বা ওয়েবসাইট" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Font Size: {fontSize}</label>
                <input type="range" min="10" max="100" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Opacity: {opacity}%</label>
                <input type="range" min="10" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Color:</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', height: '40px', background: 'none', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }} />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Rotation: {rotation}°</label>
                <input type="range" min="-90" max="90" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2', marginTop: '10px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>Position:</label>
              <select value={position} onChange={(e) => setPosition(e.target.value)} className="d-input">
                <option value="center" style={{background: '#1a1c2e'}}>Center (মাঝখানে)</option>
                <option value="bottom-right" style={{background: '#1a1c2e'}}>Bottom Right (নিচে ডানে)</option>
                <option value="tile" style={{background: '#1a1c2e'}}>Tile (সারা ছবিতে গ্রিড)</option>
              </select>
            </div>

            <button onClick={applyWatermark} disabled={loading || !originalImage} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '12px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading || !originalImage ? 0.5 : 1 }}>
              ✨ Apply Watermark
            </button>
          </div>

          {/* Right Side: Preview */}
          <div>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '8px', padding: '20px', minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '15px' }}>
              
              {!originalImage && (
                <div style={{ textAlign: 'center' }}>
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
                </div>
              )}

              {originalImage && (
                <img src={resultUrl || originalImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
              )}

              {originalImage && !resultUrl && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>সেটিংস ঠিক করে "Apply Watermark" এ ক্লিক করুন</p>
              )}
            </div>

            {resultUrl && (
              <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
                <a href={resultUrl} download="watermarked-image.png" className="d-btn-green glow-btn-green" style={{ flex: 1, padding: '12px', textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
                  💾 Save PNG
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