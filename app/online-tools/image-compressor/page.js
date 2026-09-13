'use client';
import { useState } from 'react';

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [compressType, setCompressType] = useState('medium');
  const [customTarget, setCustomTarget] = useState(100);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize((file.size / 1024).toFixed(2));
    setCompressedUrl(null);
    setCompressedSize(0);
    setError('');

    const reader = new FileReader();
    reader.onload = (ev) => setOriginalImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const compressImage = async () => {
    if (!originalImage) return;
    setLoading(true);
    setError('');

    try {
      const img = new Image();
      img.src = originalImage;
      await new Promise(r => img.onload = r);

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      let quality = 0.8;
      if (compressType === 'high') quality = 0.9;
      else if (compressType === 'medium') quality = 0.6;
      else if (compressType === 'low') quality = 0.4;
      else if (compressType === 'custom') {
        const targetKB = customTarget;
        let attempts = 0;
        let blobSize = 0;
        do {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          const base64 = dataUrl.split(',')[1];
          const binaryString = atob(base64);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
          blobSize = bytes.length;
          
          if (blobSize / 1024 > targetKB && quality > 0.1) {
            quality -= 0.1;
          } else {
            break;
          }
          attempts++;
        } while (attempts < 5);
      }

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      const blob = await (await fetch(dataUrl)).blob();
      
      setCompressedUrl(URL.createObjectURL(blob));
      setCompressedSize((blob.size / 1024).toFixed(2));
    } catch (err) {
      console.error(err);
      setError('ছবি কম্প্রেস করতে সমস্যা হয়েছে!');
    }
    setLoading(false);
  };

  const clearAll = () => {
    setOriginalImage(null);
    setOriginalSize(0);
    setCompressedUrl(null);
    setCompressedSize(0);
    setError('');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🖼️ Image Compressor</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবির সাইজ কমিয়ে ডাউনলোড করুন। কোয়ালিটি বেছে নিন বা কাস্টম সাইজ লিখুন।</p>
        
        <div className="glass-3d" style={{ padding: '40px' }}>
          
          {!originalImage && !loading && (
            <div style={{ border: '2px dashed rgba(251,99,64,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {originalImage && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <img src={originalImage} alt="Original" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
                <p style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '10px' }}>Original Size: {originalSize} KB</p>
              </div>

              {!compressedUrl && !loading && (
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Compression Quality:</label>
                  <select value={compressType} onChange={(e) => setCompressType(e.target.value)} className="d-input" style={{ maxWidth: '300px', margin: '0 auto', marginBottom: '15px' }}>
                    <option value="high" style={{background: '#1a1c2e'}}>High Quality (Best)</option>
                    <option value="medium" style={{background: '#1a1c2e'}}>Medium Quality (Good)</option>
                    <option value="low" style={{background: '#1a1c2e'}}>Low Quality (Smallest)</option>
                    <option value="custom" style={{background: '#1a1c2e'}}>Custom Size (Target KB)</option>
                  </select>

                  {compressType === 'custom' && (
                    <div style={{ marginTop: '15px' }}>
                      <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>Target Size (KB):</label>
                      <input type="number" value={customTarget} onChange={(e) => setCustomTarget(Number(e.target.value))} className="d-input" style={{ maxWidth: '150px', margin: '0 auto', textAlign: 'center' }} placeholder="e.g. 100" />
                    </div>
                  )}

                  <button onClick={compressImage} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '12px', fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                    ✨ Compress Image
                  </button>
                </div>
              )}

              {loading && (
                <div>
                  <div style={{ fontSize: '40px', marginBottom: '20px' }}>⏳</div>
                  <p style={{ color: 'white', fontSize: '18px' }}>ছবি কম্প্রেস করা হচ্ছে...</p>
                </div>
              )}

              {compressedUrl && !loading && (
                <div>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>✅</div>
                  <h3 style={{ color: 'white', marginBottom: '10px' }}>সাইজ কমানো সফল হয়েছে!</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <img src={compressedUrl} alt="Compressed" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
                    <p style={{ color: '#2dce89', fontSize: '14px', marginTop: '10px' }}>Compressed Size: {compressedSize} KB</p>
                  </div>
                  <a href={compressedUrl} download="compressed-image.jpg" className="d-btn-green glow-btn-green" style={{ display: 'inline-block', padding: '14px 30px', textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                    💾 Download Image
                  </a>
                </div>
              )}

              {error && <p style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '15px' }}>{error}</p>}

              <button onClick={clearAll} className="d-btn-outline" style={{ marginTop: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                🔄 Clear File
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}