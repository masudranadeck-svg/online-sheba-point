'use client';
import { useState } from 'react';

export default function ImageBgRemover() {
  const [originalImage, setOriginalImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [tolerance, setTolerance] = useState(35);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setOriginalImage(ev.target.result);
        setResultUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = () => {
    if (!originalImage) return;
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;
      
      const visited = new Uint8Array(w * h);
      const stack = [];

      for (let x = 0; x < w; x++) { stack.push([x, 0]); stack.push([x, h - 1]); }
      for (let y = 0; y < h; y++) { stack.push([0, y]); stack.push([w - 1, y]); }

      const targetR = data[0];
      const targetG = data[1];
      const targetB = data[2];

      while (stack.length > 0) {
        const [x, y] = stack.pop();
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        
        const idx = y * w + x;
        if (visited[idx]) continue;

        const pIdx = idx * 4;
        const r = data[pIdx];
        const g = data[pIdx + 1];
        const b = data[pIdx + 2];

        if (Math.abs(r - targetR) <= tolerance && Math.abs(g - targetG) <= tolerance && Math.abs(b - targetB) <= tolerance) {
          data[pIdx + 3] = 0; 
          visited[idx] = 1;
          stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        } else {
          visited[idx] = 1;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setResultUrl(canvas.toDataURL('image/png'));
      setProcessing(false);
    };
    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = 'removed-bg.png';
    link.click();
  };

  const clearAll = () => {
    setOriginalImage(null);
    setResultUrl(null);
    setTolerance(35);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🖼️ Image BG Remover</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবির ব্যাকগ্রাউন্ড মুছে ফেলুন এবং ট্রান্সপারেন্ট PNG ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {!originalImage && (
            <div style={{ border: '2px dashed rgba(168,85,247,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {originalImage && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                
                <div>
                  <h4 style={{ color: 'white', marginBottom: '10px' }}>Original</h4>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={originalImage} alt="Original" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'white', marginBottom: '10px' }}>Result (Transparent)</h4>
                  <div style={{ 
                    background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23444' fill-opacity='0.4'%3E%3Cpath d='M0 0h10v10H0z'/%3E%3Cpath d='M10 10h10v10H10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    padding: '10px', borderRadius: '8px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #444'
                  }}>
                    {resultUrl ? (
                      <img src={resultUrl} alt="Transparent" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ color: '#888', fontSize: '14px' }}>অপেক্ষা করা হচ্ছে...</span>
                    )}
                  </div>
                </div>
              </div>

              {!resultUrl ? (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Tolerance (ব্যাকগ্রাউন্ড মুছার পরিমাণ): {tolerance}</label>
                    <input type="range" min="10" max="100" value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} style={{ width: '100%', accentColor: '#a855f7' }} />
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>(মূল ছবি কেটে গেলে স্লাইডার কমিয়ে দিন, সাদা বেশি থাকলে বাড়িয়ে দিন)</p>
                  </div>

                  <button onClick={removeBackground} disabled={processing} className="d-btn-purple glow-btn-purple" style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: processing ? 0.5 : 1 }}>
                    {processing ? '⏳ প্রসেসিং হচ্ছে...' : '✨ Remove Background'}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <button onClick={handleDownload} className="d-btn-green glow-btn-green" style={{ padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer' }}>
                    💾 Download Transparent PNG
                  </button>
                  <button onClick={() => setResultUrl(null)} className="d-btn-outline" style={{ padding: '10px', border: 'none', cursor: 'pointer' }}>
                    🔄 আবার ট্রাই করুন (Tolerance পরিবর্তন করুন)
                  </button>
                </div>
              )}

              <button onClick={clearAll} className="d-btn-outline" style={{ marginTop: '15px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                🔄 নতুন ছবি আপলোড করুন
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}