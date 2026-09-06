'use client';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';

export default function StudioPrintLayout() {
  const [photos, setPhotos] = useState([]);
  const [showBorder, setShowBorder] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  const fileInputRef = useRef(null);

  // Updated Photo Sizes List
  const sizes = [
    { key: 'passport', name: 'Passport (1.5x1.9 in)', wIn: 1.5, hIn: 1.9 },
    { key: 'stamp', name: 'Stamp (2x2.1 cm)', wIn: 0.78, hIn: 0.82 },
    { key: 'square', name: 'Square (2x2 in)', wIn: 2, hIn: 2 },
    { key: 'joint', name: 'Joint (3.5x1.9 in)', wIn: 3.5, hIn: 1.9 },
    { key: '3r', name: '3R (3.5x5 in)', wIn: 3.5, hIn: 5 },
    { key: '4r', name: '4R (4x6 in)', wIn: 4, hIn: 6 },
    { key: '5r', name: '5R (5x7 in)', wIn: 5, hIn: 7 },
    { key: '6r', name: '6R (6x8 in)', wIn: 6, hIn: 8 }
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 10) {
      alert("সর্বোচ্চ ১০ জনের ছবি আপলোড করতে পারবেন!");
      return;
    }

    const newPhotos = files.map(file => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (e) => resolve({ src: e.target.result, sizeKey: 'passport', copies: 1 });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPhotos).then(loadedPhotos => {
      setPhotos([...photos, ...loadedPhotos]);
    });
  };

  const updatePhoto = (index, field, value) => {
    const updated = [...photos];
    updated[index][field] = value;
    setPhotos(updated);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const buildA4Canvas = async () => {
    const dpi = 150; // 150 DPI for A4
    const canvas = document.createElement('canvas');
    canvas.width = 1240; // 8.27in * 150
    canvas.height = 1754; // 11.69in * 150
    const ctx = canvas.getContext('2d');

    // White Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const margin = 20;
    let x = margin;
    let y = margin;
    let rowHeight = 0;

    for (const photo of photos) {
      const size = sizes.find(s => s.key === photo.sizeKey);
      const w = size.wIn * dpi;
      const h = size.hIn * dpi;

      const img = new Image();
      img.src = photo.src;
      await new Promise(r => img.onload = r);

      for (let i = 0; i < photo.copies; i++) {
        // Row break
        if (x + w > canvas.width - margin) {
          x = margin;
          y += rowHeight + 10;
          rowHeight = 0;
        }

        // Page break (stop if page is full)
        if (y + h > canvas.height - margin) {
          return canvas; 
        }

        // Draw Image (Cover fit)
        const imgRatio = img.width / img.height;
        const boxRatio = w / h;
        let dw, dh, dx, dy;

        if (imgRatio > boxRatio) {
          dh = h; dw = h * imgRatio; dx = x - (dw - w) / 2; dy = y;
        } else {
          dw = w; dh = w / imgRatio; dx = x; dy = y - (dh - h) / 2;
        }

        // Clip to box
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.restore();

        // Draw Border
        if (showBorder) {
          ctx.strokeStyle = '#CCCCCC';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, w, h);
        }

        x += w + 10;
        if (h > rowHeight) rowHeight = h;
      }
    }
    return canvas;
  };

  const handleSavePDF = async () => {
    setGenerating(true);
    const canvas = await buildA4Canvas();
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    pdf.save('studio-print-layout.pdf');
    setGenerating(false);
  };

  const handlePrint = async () => {
    setGenerating(true);
    const canvas = await buildA4Canvas();
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    win.document.write(`<img src="${dataUrl}" style="width:100%;" onload="window.print();">`);
    setGenerating(false);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🖼️ Studio Photo Print Layout (A4 Sheet)</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি আপলোড করুন, সাইজ ও কপি বেছে নিন এবং A4 পেজে সাজিয়ে প্রিন্ট করুন।</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Settings & Upload */}
          <div className="glass-3d" style={{ padding: '30px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 style={{ color: '#4e6ef2', marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>UPLOAD PHOTOS & INCREASE COPIES (MAX 10)</h3>
            
            <button onClick={() => fileInputRef.current.click()} className="d-btn glow-btn" style={{ width: '100%', padding: '12px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
              ➕ ছবি আপলোড করুন
            </button>
            <input type="file" accept="image/*" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

            {photos.map((photo, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                <img src={photo.src} alt="Thumb" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <select value={photo.sizeKey} onChange={(e) => updatePhoto(i, 'sizeKey', e.target.value)} className="d-input" style={{ padding: '5px', marginBottom: '5px' }}>
                    {sizes.map(s => <option key={s.key} value={s.key} style={{background: '#1a1c2e'}}>{s.name}</option>)}
                  </select>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Copies:</span>
                    <button onClick={() => updatePhoto(i, 'copies', Math.max(1, photo.copies - 1))} className="d-btn-outline" style={{ padding: '2px 8px', fontSize: '14px', border: 'none', cursor: 'pointer' }}>-</button>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{photo.copies}</span>
                    <button onClick={() => updatePhoto(i, 'copies', photo.copies + 1)} className="d-btn-outline" style={{ padding: '2px 8px', fontSize: '14px', border: 'none', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                
                <button onClick={() => removePhoto(i)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', height: 'fit-content' }}>❌</button>
              </div>
            ))}

            {photos.length > 0 && (
              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <label style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '20px' }}>
                  <input type="checkbox" checked={showBorder} onChange={(e) => setShowBorder(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4e6ef2' }} />
                  Show Photos Border
                </label>
                
                <button onClick={handleSavePDF} disabled={generating} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '12px', border: 'none', cursor: 'pointer', marginBottom: '10px', opacity: generating ? 0.5 : 1 }}>
                  {generating ? '⏳ তৈরি হচ্ছে...' : '💾 Save PDF'}
                </button>
                
                <button onClick={handlePrint} disabled={generating} className="d-btn glow-btn" style={{ width: '100%', padding: '12px', border: 'none', cursor: 'pointer', opacity: generating ? 0.5 : 1 }}>
                  🖨️ Direct Print
                </button>
              </div>
            )}
          </div>

          {/* Right Side: A4 Preview Area */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '20px', minHeight: '80vh' }}>
            <div style={{ width: '300px', height: '424px', background: 'white', boxShadow: '0 0 20px rgba(0,0,0,0.5)', padding: '5px', overflow: 'hidden' }}>
              {photos.length === 0 ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#888' }}>
                  No Image Selected
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                  {photos.map((photo, i) => {
                    const size = sizes.find(s => s.key === photo.sizeKey);
                    // Scale down for preview (e.g., 150dpi to roughly screen size)
                    const w = size.wIn * 30; 
                    const h = size.hIn * 30;
                    return Array.from({ length: photo.copies }).map((_, j) => (
                      <div key={`${i}-${j}`} style={{ width: `${w}px`, height: `${h}px`, overflow: 'hidden', border: showBorder ? '1px solid #ccc' : 'none', boxSizing: 'border-box' }}>
                        <img src={photo.src} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ));
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}