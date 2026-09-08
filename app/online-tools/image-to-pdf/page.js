'use client';
import { useState } from 'react';
import jsPDF from 'jspdf';

export default function ImageToPdf() {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState('a4');
  const [orientation, setOrientation] = useState('p'); // p = portrait, l = landscape
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then(loaded => {
      setImages(prev => [...prev, ...loaded]);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setLoading(true);

    try {
      const pdf = new jsPDF({ orientation, unit: 'mm', format: pageSize });
      
      // jsPDF নিজে থেকেই এই সাইজগুলোর ডাইমেনশন বুঝে নেয়
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      
      const margin = 10;
      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2;

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage(pageSize, orientation);
        
        const img = new Image();
        img.src = images[i];
        await new Promise(r => img.onload = r);

        const imgRatio = img.width / img.height;
        let w = maxW;
        let h = w / imgRatio;
        
        if (h > maxH) {
          h = maxH;
          w = h * imgRatio;
        }

        const x = (pageW - w) / 2; 
        const y = (pageH - h) / 2;

        const format = images[i].startsWith('data:image/png') ? 'PNG' : 'JPEG';
        
        pdf.addImage(images[i], format, x, y, w, h);
      }

      pdf.save('images-to-pdf.pdf');
    } catch (err) {
      console.error(err);
      alert('পিডিএফ তৈরি করতে সমস্যা হয়েছে!');
    }
    setLoading(false);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📄 Image to PDF Converter</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>একাধিক ছবি আপলোড করুন এবং এক ক্লিকে পিডিএফ ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          <div style={{ marginBottom: '30px' }}>
            <button onClick={() => document.getElementById('img-input').click()} className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
              ➕ ছবি আপলোড করুন
            </button>
            <input type="file" accept="image/*" multiple id="img-input" style={{ display: 'none' }} onChange={handleFileChange} />
          </div>

          {images.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>আপলোড করা ছবিসমূহ ({images.length})</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '15px' }}>
                {images.map((img, i) => (
                  <div key={i} style={{ position: 'relative', border: '2px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={img} alt={`img-${i}`} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                    <button 
                      onClick={() => removeImage(i)} 
                      style={{ position: 'absolute', top: '5px', right: '5px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Page Size:</label>
                  <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} className="d-input" style={{ marginLeft: '10px' }}>
                    <option value="a4" style={{background: '#1a1c2e'}}>A4 (210 x 297 mm)</option>
                    <option value="a3" style={{background: '#1a1c2e'}}>A3 (297 x 420 mm)</option>
                    <option value="a5" style={{background: '#1a1c2e'}}>A5 (148 x 210 mm)</option>
                    <option value="letter" style={{background: '#1a1c2e'}}>Letter (8.5 x 11 in)</option>
                    <option value="legal" style={{background: '#1a1c2e'}}>Legal (8.5 x 14 in)</option>
                    <option value="tabloid" style={{background: '#1a1c2e'}}>Tabloid (11 x 17 in)</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Orientation:</label>
                  <select value={orientation} onChange={(e) => setOrientation(e.target.value)} className="d-input" style={{ marginLeft: '10px' }}>
                    <option value="p" style={{background: '#1a1c2e'}}>Portrait</option>
                    <option value="l" style={{background: '#1a1c2e'}}>Landscape</option>
                  </select>
                </div>
              </div>

              <button onClick={generatePdf} disabled={loading} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                {loading ? '⏳ পিডিএফ তৈরি হচ্ছে...' : '📄 Download PDF'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}