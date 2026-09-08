'use client';
import { useState } from 'react';

export default function ImageConverter() {
  const [originalImage, setOriginalImage] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [format, setFormat] = useState('image/png');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('converted-image');

  const formats = [
    { label: 'PNG (.png)', value: 'image/png', ext: '.png' },
    { label: 'JPEG (.jpg)', value: 'image/jpeg', ext: '.jpg' },
    { label: 'WebP (.webp)', value: 'image/webp', ext: '.webp' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setOriginalImage(ev.target.result);
      setConvertedUrl(null);
      setFileName(file.name.split('.')[0] || 'converted');
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (!originalImage) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // JPEG ফরম্যাটে কনভার্ট করার সময় ট্রান্সপারেন্ট ব্যাকগ্রাউন্ড কালো হয়ে যায়, 
      // তাই সাদা ব্যাকগ্রাউন্ড দিয়ে দেওয়া হলো।
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
      
      const ext = formats.find(f => f.value === format).ext;
      // 0.95 হলো কোয়ালিটি (95%)
      const url = canvas.toDataURL(format, 0.95); 
      
      setConvertedUrl(url);
      setFileName(fileName + ext);
      setLoading(false);
    };
    img.src = originalImage;
  };

  const clearAll = () => {
    setOriginalImage(null);
    setConvertedUrl(null);
    setFormat('image/png');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🔁 Image Converter</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি আপলোড করুন এবং PNG, JPG বা WebP ফরম্যাটে ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '40px' }}>
          
          {!originalImage && (
            <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {originalImage && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <img src={originalImage} alt="Original" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
              </div>

              {!convertedUrl ? (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '10px' }}>Convert To:</label>
                    <select value={format} onChange={(e) => setFormat(e.target.value)} className="d-input" style={{ maxWidth: '200px', margin: '0 auto' }}>
                      {formats.map((f, i) => (
                        <option key={i} value={f.value} style={{background: '#1a1c2e'}}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  <button onClick={handleConvert} disabled={loading} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '12px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                    {loading ? '⏳ কনভার্ট হচ্ছে...' : '✨ Convert Image'}
                  </button>
                </>
              ) : (
                <div>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>✅</div>
                  <h3 style={{ color: 'white', marginBottom: '20px' }}>কনভার্ট সফল হয়েছে!</h3>
                  
                  <div style={{ marginBottom: '20px', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <img src={convertedUrl} alt="Converted" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} />
                  </div>

                  <a href={convertedUrl} download={fileName} className="d-btn-green glow-btn-green" style={{ display: 'inline-block', padding: '12px 30px', textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                    💾 Download {fileName}
                  </a>
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