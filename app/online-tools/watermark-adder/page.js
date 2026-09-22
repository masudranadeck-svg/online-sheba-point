'use client';
import { useState, useEffect } from 'react';

export default function WatermarkAdder() {
  const [mode, setMode] = useState('text'); // 'text' or 'image'
  
  const [originalImage, setOriginalImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  // Text Watermark State
  const [watermarkText, setWatermarkText] = useState('© Online Sheba Point');
  const [fontSize, setFontSize] = useState(30);
  const [textColor, setTextColor] = useState('#ffffff');
  
  // Image Watermark State
  const [logoImage, setLogoImage] = useState(null);
  const [logoSize, setLogoSize] = useState(20); // Percentage

  // Common State
  const [opacity, setOpacity] = useState(50);
  const [rotation, setRotation] = useState(-30);
  const [position, setPosition] = useState('center');

  const handleMainFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setOriginalImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Live Preview useEffect: যখনই কোনো সেটিংস বদলাবে, এটি অটো রান হবে
  useEffect(() => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // ১. আসল ছবি বসানো
      ctx.drawImage(img, 0, 0);

      // ২. ওয়াটারমার্ক সেটিংস
      ctx.globalAlpha = opacity / 100;

      if (mode === 'text') {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = textColor;
        
        if (position === 'tile') {
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
          let x, y;
          if (position === 'center') {
            x = canvas.width / 2; y = canvas.height / 2;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          } else if (position === 'bottom-right') {
            x = canvas.width - 20; y = canvas.height - 20;
            ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
          }
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotation * Math.PI / 180);
          ctx.fillText(watermarkText, 0, 0);
          ctx.restore();
        }
        
        ctx.globalAlpha = 1.0;
        setResultUrl(canvas.toDataURL('image/png'));
      } 
      
      // Image Watermark Logic
      else if (mode === 'image' && logoImage) {
        const logo = new Image();
        logo.onload = () => {
          const logoW = (canvas.width * logoSize) / 100;
          const logoH = (logo.height / logo.width) * logoW;

          if (position === 'tile') {
            for (let y = 0; y < canvas.height + 100; y += logoH + 50) {
              for (let x = 0; x < canvas.width + 100; x += logoW + 50) {
                ctx.save();
                ctx.translate(x + logoW/2, y + logoH/2);
                ctx.rotate(rotation * Math.PI / 180);
                ctx.drawImage(logo, -logoW/2, -logoH/2, logoW, logoH);
                ctx.restore();
              }
            }
          } else {
            let x, y;
            if (position === 'center') {
              x = (canvas.width - logoW) / 2; y = (canvas.height - logoH) / 2;
            } else if (position === 'bottom-right') {
              x = canvas.width - logoW - 20; y = canvas.height - logoH - 20;
            }
            ctx.save();
            ctx.translate(x + logoW/2, y + logoH/2);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.drawImage(logo, -logoW/2, -logoH/2, logoW, logoH);
            ctx.restore();
          }

          ctx.globalAlpha = 1.0;
          setResultUrl(canvas.toDataURL('image/png'));
        };
        logo.src = logoImage;
      } else {
        // If image mode but no logo selected, just show original image
        setResultUrl(originalImage);
      }
    };
    img.src = originalImage;
  }, [originalImage, mode, watermarkText, fontSize, textColor, logoImage, logoSize, opacity, rotation, position]);

  const clearAll = () => {
    setOriginalImage(null);
    setResultUrl(null);
    setLogoImage(null);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>💧 Watermark Adder Pro</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>সেটিংস পরিবর্তন করুন, সাথে সাথে লাইভ প্রিভিউ দেখুন।</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Controls */}
          <div className="glass-3d" style={{ padding: '30px', textAlign: 'left' }}>
            
            {/* Mode Toggle */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', background: 'rgba(0,0,0,0.2)', padding: '5px', borderRadius: '8px' }}>
              <button 
                onClick={() => setMode('text')} 
                style={{ flex: 1, padding: '8px', background: mode === 'text' ? '#4e6ef2' : 'transparent', color: mode === 'text' ? 'white' : '#888', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              > Text Watermark </button>
              <button 
                onClick={() => setMode('image')} 
                style={{ flex: 1, padding: '8px', background: mode === 'image' ? '#a855f7' : 'transparent', color: mode === 'image' ? 'white' : '#888', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              > Image Watermark </button>
            </div>

            {/* Text Mode Inputs */}
            {mode === 'text' && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>Watermark Text:</label>
                  <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="d-input" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Font Size: {fontSize}</label>
                    <input type="range" min="10" max="100" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Color:</label>
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={{ width: '100%', height: '40px', background: 'none', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                </div>
              </>
            )}

            {/* Image Mode Inputs */}
            {mode === 'image' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>Upload Logo (PNG best):</label>
                <input type="file" accept="image/*" onChange={handleLogoFileChange} className="d-input" style={{ padding: '10px' }} />
                
                {logoImage && (
                  <div style={{ marginTop: '15px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Logo Size: {logoSize}%</label>
                    <input type="range" min="5" max="50" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} style={{ width: '100%', accentColor: '#a855f7' }} />
                  </div>
                )}
              </div>
            )}

            {/* Common Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Opacity: {opacity}%</label>
                <input type="range" min="10" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
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
          </div>

          {/* Right Side: Live Preview */}
          <div>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '8px', padding: '20px', minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '15px' }}>
              
              {!originalImage && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{color: 'white', marginBottom: '10px'}}>মূল ছবি আপলোড করুন:</p>
                  <input type="file" accept="image/*" onChange={handleMainFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
                </div>
              )}

              {originalImage && (
                <img src={resultUrl || originalImage} alt="Live Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
              )}
            </div>

            {originalImage && (
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