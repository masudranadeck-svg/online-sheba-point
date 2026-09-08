'use client';
import { useState, useEffect } from 'react';
import JSZip from 'jszip';

export default function PdfToImage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('পিডিএফ প্রসেস করা হচ্ছে...');
  const [zipping, setZipping] = useState(false);
  const [error, setError] = useState('');
  const [isLibReady, setIsLibReady] = useState(false);

  useEffect(() => {
    const scriptId = 'pdfjs-cdn-script';
    if (document.getElementById(scriptId)) {
      if (window.pdfjsLib) setIsLibReady(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        setIsLibReady(true);
      }
    };
    
    script.onerror = () => setError('লাইব্রেরি লোড করতে ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ চেক করুন।');
    
    document.body.appendChild(script);
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPdfFile(file);
    setImages([]);
    setError('');
    
    convertToImages(file);
  };

  const convertToImages = async (file) => {
    if (!isLibReady || !window.pdfjsLib) {
      setError('লাইব্রেরি এখনো লোড হয়নি, একটু পরে চেষ্টা করুন।');
      return;
    }

    setLoading(true);
    setError('');
    setLoadingText('পিডিএফ প্রসেস করা হচ্ছে...');

    try {
      const pdfjsLib = window.pdfjsLib;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const extractedImages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        setLoadingText(`পেজ ${i} এর ছবি তৈরি হচ্ছে... (${i}/${pdf.numPages})`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');

        await page.render({ canvasContext: context, viewport }).promise;
        const imgData = canvas.toDataURL('image/png');
        extractedImages.push(imgData);
      }

      setImages(extractedImages);
    } catch (err) {
      console.error("PDF to Image Error:", err);
      setError('পিডিএফ প্রসেস করতে সমস্যা হয়েছে!');
    }
    setLoading(false);
  };

  const downloadImage = (imgData, index) => {
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `page-${index + 1}.png`;
    link.click();
  };

  // ZIP ডাউনলোডের ফাংশন
  const downloadAllAsZip = async () => {
    if (images.length === 0) return;
    setZipping(true);

    try {
      const zip = new JSZip();
      images.forEach((imgData, i) => {
        // Base64 থেকে শুধু ডাটা অংশটুকু আলাদা করা হচ্ছে
        const base64Data = imgData.split(',')[1];
        zip.file(`page-${i + 1}.png`, base64Data, { base64: true });
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pdf-images.zip';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP Error:", err);
      alert('ZIP ফাইল তৈরি করতে সমস্যা হয়েছে!');
    }
    setZipping(false);
  };

  const clearAll = () => {
    setPdfFile(null);
    setImages([]);
    setError('');
  };

  if (!isLibReady && !error) {
    return (
      <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', marginBottom: '10px' }}>🖼️ PDF to Image Converter</h1>
          <div className="glass-3d" style={{ padding: '40px' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>⏳</div>
            <p style={{ color: 'white', fontSize: '18px' }}>টুল লোড হচ্ছে...</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>(প্রথমবার ৫-১০ সেকেন্ড সময় লাগতে পারে)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🖼️ PDF to Image Converter</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>পিডিএফ আপলোড করুন এবং প্রতিটি পেজের ছবি (PNG) আলাদা করে বা ZIP ফাইলে ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {!pdfFile && !loading && !error && (
            <div style={{ border: '2px dashed rgba(168,85,247,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {loading && (
            <div>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>⏳</div>
              <p style={{ color: 'white', fontSize: '18px' }}>{loadingText}</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>(পেজের সংখ্যা অনুযায়ী সময় লাগতে পারে)</p>
            </div>
          )}

          {error && !loading && (
            <div>
              <div style={{ fontSize: '40px', marginBottom: '20px', color: '#ff6b6b' }}>⚠️</div>
              <p style={{ color: '#ff6b6b', fontSize: '16px', marginBottom: '20px' }}>{error}</p>
              <button onClick={clearAll} className="d-btn-outline" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                🔄 আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {images.length > 0 && !loading && !error && (
            <div>
              <h3 style={{ color: 'white', marginBottom: '20px' }}>সফলভাবে {images.length} টি পেজের ছবি তৈরি হয়েছে!</h3>
              
              {/* ZIP Download Button */}
              <button 
                onClick={downloadAllAsZip} 
                disabled={zipping} 
                className="d-btn-purple glow-btn-purple" 
                style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', marginBottom: '20px', opacity: zipping ? 0.5 : 1 }}
              >
                {zipping ? '⏳ ZIP তৈরি হচ্ছে...' : '🗜️ Download All as ZIP'}
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                {images.map((img, i) => (
                  <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: 'white' }}>
                    <img src={img} alt={`Page ${i + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <button 
                      onClick={() => downloadImage(img, i)} 
                      className="d-btn-green" 
                      style={{ width: '100%', padding: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', borderRadius: '0' }}
                    >
                      💾 Page {i + 1}
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={clearAll} className="d-btn-outline" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                🔄 নতুন পিডিএফ আপলোড করুন
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}