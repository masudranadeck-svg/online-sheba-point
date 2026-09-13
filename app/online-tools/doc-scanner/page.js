'use client';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';

export default function DocScanner() {
  const [image, setImage] = useState(null);
  const [scannedUrl, setScannedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setScannedUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const applyMagicScan = () => {
    if (!image) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Magic Scan Logic: Grayscale + High Contrast (CamScanner effect)
      for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
        // Contrast adjustment factor
        const contrast = 1.5; 
        avg = ((avg - 128) * contrast) + 128;
        
        // Brightness boost
        avg = avg + 20;

        // Clamp values
        avg = Math.max(0, Math.min(255, avg));

        // Make white parts whiter and dark parts blacker
        if (avg > 150) avg = 255;
        else if (avg < 100) avg = 0;

        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }

      ctx.putImageData(imageData, 0, 0);
      setScannedUrl(canvas.toDataURL('image/jpeg', 0.9));
      setLoading(false);
    };
    img.src = image;
  };

  const downloadPdf = () => {
    if (!scannedUrl) return;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(scannedUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(scannedUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('scanned-document.pdf');
  };

  const clearAll = () => {
    setImage(null);
    setScannedUrl(null);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📷 Doc Scanner (Magic PDF)</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>কাগজের ছবি আপলোড করুন, ম্যাজিক স্ক্যান করুন এবং পিডিএফ ডাউনলোড করুন।</p>
        
        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {!image && !loading && (
            <div style={{ border: '2px dashed rgba(45,206,137,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {image && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                
                <div>
                  <h4 style={{ color: 'white', marginBottom: '10px' }}>Original Photo</h4>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={image} alt="Original" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'white', marginBottom: '10px' }}>Scanned Result</h4>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {scannedUrl ? (
                      <img src={scannedUrl} alt="Scanned" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ color: '#888', fontSize: '14px' }}>অপেক্ষা করা হচ্ছে...</span>
                    )}
                  </div>
                </div>
              </div>

              {!scannedUrl ? (
                <button onClick={applyMagicScan} disabled={loading} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                  {loading ? '⏳ স্ক্যান করা হচ্ছে...' : '✨ Magic Scan (Enhance)'}
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <button onClick={downloadPdf} className="d-btn-orange glow-btn-orange" style={{ padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer' }}>
                    📄 Download as PDF
                  </button>
                  <button onClick={() => setScannedUrl(null)} className="d-btn-outline" style={{ padding: '10px', border: 'none', cursor: 'pointer' }}>
                    🔄 আবার স্ক্যান করুন
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