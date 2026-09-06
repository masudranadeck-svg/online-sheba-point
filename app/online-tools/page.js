'use client';
import { useState, useRef } from 'react';

export default function AIPassportPhotoMaker() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [tolerance, setTolerance] = useState(30); // Color matching tolerance
  const [isErasing, setIsErasing] = useState(false);
  
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

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
      reader.onload = (ev) => {
        setOriginalImage(ev.target.result);
        setProcessedImage(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Magic Eraser Logic (Flood Fill Algorithm)
  const eraseBackground = (e) => {
    if (!imgRef.current || isErasing) return;
    setIsErasing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Set canvas size to image size
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;
    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    const targetIdx = (y * canvas.width + x) * 4;
    const targetR = data[targetIdx];
    const targetG = data[targetIdx + 1];
    const targetB = data[targetIdx + 2];

    // Simple Stack-based Flood Fill
    const stack = [[x, y]];
    const visited = new Uint8Array(canvas.width * canvas.height);

    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      if (cx < 0 || cx >= canvas.width || cy < 0 || cy >= canvas.height) continue;
      
      const idx = cy * canvas.width + cx;
      if (visited[idx]) continue;

      const pIdx = idx * 4;
      const r = data[pIdx];
      const g = data[pIdx + 1];
      const b = data[pIdx + 2];

      // Check color match
      if (Math.abs(r - targetR) <= tolerance && 
          Math.abs(g - targetG) <= tolerance && 
          Math.abs(b - targetB) <= tolerance) {
        
        // Make transparent
        data[pIdx + 3] = 0; 
        visited[idx] = 1;

        stack.push([cx + 1, cy]);
        stack.push([cx - 1, cy]);
        stack.push([cx, cy + 1]);
        stack.push([cx, cy - 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setProcessedImage(canvas.toDataURL('image/png'));
    setIsErasing(false);
  };

  // Apply Solid Color Background
  const applyBackgroundColor = (color) => {
    setBgColor(color);
    if (!processedImage) return;

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
    img.src = processedImage; // Needs the transparent version
  };

  // To keep track of the transparent state before applying color
  const [transparentImage, setTransparentImage] = useState(null);

  const handleErase = (e) => {
    setIsErasing(true);
    // First, we save the transparent image
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;
    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    const targetIdx = (y * canvas.width + x) * 4;
    const targetR = data[targetIdx];
    const targetG = data[targetIdx + 1];
    const targetB = data[targetIdx + 2];

    const stack = [[x, y]];
    const visited = new Uint8Array(canvas.width * canvas.height);

    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      if (cx < 0 || cx >= canvas.width || cy < 0 || cy >= canvas.height) continue;
      
      const idx = cy * canvas.width + cx;
      if (visited[idx]) continue;

      const pIdx = idx * 4;
      if (Math.abs(data[pIdx] - targetR) <= tolerance && 
          Math.abs(data[pIdx + 1] - targetG) <= tolerance && 
          Math.abs(data[pIdx + 2] - targetB) <= tolerance) {
        
        data[pIdx + 3] = 0; 
        visited[idx] = 1;
        stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const transparentUrl = canvas.toDataURL('image/png');
    setTransparentImage(transparentUrl);
    
    // Apply default white background
    const bgImg = new Image();
    bgImg.onload = () => {
      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = img.width;
      bgCanvas.height = img.height;
      const bgCtx = bgCanvas.getContext('2d');
      bgCtx.fillStyle = bgColor;
      bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.drawImage(img, 0, 0);
      setProcessedImage(bgCanvas.toDataURL('image/png'));
      setIsErasing(false);
    };
    bgImg.src = transparentUrl;
  };

  const changeColor = (color) => {
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

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'passport-photo.png';
    link.click();
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🤖 AI Passport Photo Maker</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি আপলোড করুন, ব্যাকগ্রাউন্ডে ক্লিক করে মুছে ফেলুন এবং কালার বেছে নিন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          {!originalImage ? (
            <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
            </div>
          ) : (
            <div>
              {/* Hidden canvas for processing */}
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              
              {/* Image Preview */}
              <div style={{ position: 'relative', display: 'inline-block', cursor: 'crosshair' }} onMouseDown={handleErase}>
                <img 
                  ref={imgRef} 
                  src={processedImage} 
                  alt="Preview" 
                  style={{ maxWidth: '300px', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.2)', opacity: isErasing ? 0.5 : 1 }} 
                />
                {isErasing && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: 'bold' }}>Processing...</div>}
              </div>

              {transparentImage && (
                <div style={{ marginTop: '20px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', display: 'block', marginBottom: '10px' }}>Background Color:</label>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                    {colors.map((c, i) => (
                      <button 
                        key={i} 
                        onClick={() => changeColor(c.hex)} 
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
                  <button onClick={handleDownload} className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                    💾 Download PNG
                  </button>
                </div>
              )}
              
              <div style={{ marginTop: '15px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Tolerance: {tolerance}</label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={tolerance} 
                  onChange={(e) => setTolerance(Number(e.target.value))} 
                  style={{ width: '100%', accentColor: '#4e6ef2' }}
                />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>(টলারেন্স বাড়ালে একই রঙের আরও ছোট অংশ মুছে যাবে)</p>
              </div>

              <button onClick={() => { setOriginalImage(null); setProcessedImage(null); setTransparentImage(null); }} className="d-btn-outline" style={{ marginTop: '15px', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>
                🔄 নতুন ছবি আপলোড করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}