'use client';
import { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfPageManager() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pages, setPages] = useState([]); // Array of { originalIndex, thumbnail }
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [isLibReady, setIsLibReady] = useState(false);

  // CDN থেকে লাইব্রেরি লোড করার সিস্টেম (কোনো এরর আসবে না)
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
    setPages([]);
    setError('');
    
    renderPages(file);
  };

  const renderPages = async (file) => {
    if (!isLibReady || !window.pdfjsLib) {
      setError('লাইব্রেরি এখনো লোড হয়নি, একটু পরে চেষ্টা করুন।');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const pdfjsLib = window.pdfjsLib;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const tempPages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 }); // ছোট স্কেলে থাম্বনেইল বানানো হচ্ছে
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');

        await page.render({ canvasContext: context, viewport }).promise;
        tempPages.push({
          originalIndex: i - 1, // pdf-lib এর জন্য 0-based index
          thumbnail: canvas.toDataURL('image/png')
        });
      }

      setPages(tempPages);
    } catch (err) {
      console.error("PDF Render Error:", err);
      setError('পিডিএফ প্রসেস করতে সমস্যা হয়েছে!');
    }
    setLoading(false);
  };

  const deletePage = (index) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  const movePage = (index, direction) => {
    const newPages = [...pages];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= newPages.length) return;

    [newPages[index], newPages[targetIndex]] = [newPages[targetIndex], newPages[index]];
    setPages(newPages);
  };

  const saveNewPdf = async () => {
    if (!pdfFile || pages.length === 0) {
      setError('কোনো পেজ নেই! অন্তত ১টি পেজ রাখুন।');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      // নতুন সিরিয়াল অনুযায়ী পেজগুলো কপি করে নেওয়া হচ্ছে
      for (const page of pages) {
        const [copiedPage] = await newPdf.copyPages(originalPdf, [page.originalIndex]);
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'managed-pdf.pdf';
      link.click();
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Save Error:", err);
      setError('নতুন পিডিএফ তৈরি করতে সমস্যা হয়েছে!');
    }
    setProcessing(false);
  };

  const clearAll = () => {
    setPdfFile(null);
    setPages([]);
    setError('');
  };

  // লাইব্রেরি লোড না হলে রোধ করার জন্য
  if (!isLibReady && !error) {
    return (
      <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', marginBottom: '10px' }}>📑 PDF Page Manager</h1>
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
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📑 PDF Page Manager</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>পেজ ডিলিট করুন, সিরিয়াল পরিবর্তন করুন এবং নতুন পিডিএফ ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {!pdfFile && !loading && !error && (
            <div style={{ border: '2px dashed rgba(251,99,64,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {loading && (
            <div>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>⏳</div>
              <p style={{ color: 'white', fontSize: '18px' }}>পিডিএফ পেজ লোড হচ্ছে...</p>
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

          {pages.length > 0 && !loading && !error && (
            <div>
              <h3 style={{ color: 'white', marginBottom: '20px' }}>মোট {pages.length} টি পেজ রয়েছে</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                {pages.map((page, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
                    <div style={{ height: '200px', background: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
                      <img src={page.thumbnail} alt={`Page ${i + 1}`} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                    </div>
                    
                    <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#333', fontWeight: 'bold', fontSize: '14px' }}>Page {i + 1}</span>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          onClick={() => movePage(i, -1)} 
                          disabled={i === 0}
                          style={{ background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}
                        >↑</button>
                        <button 
                          onClick={() => movePage(i, 1)} 
                          disabled={i === pages.length - 1}
                          style={{ background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: i === pages.length - 1 ? 'not-allowed' : 'pointer', opacity: i === pages.length - 1 ? 0.3 : 1 }}
                        >↓</button>
                        <button 
                          onClick={() => deletePage(i)} 
                          style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: 'pointer' }}
                        >✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <button onClick={saveNewPdf} disabled={processing} className="d-btn-green glow-btn-green" style={{ flex: 1, padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: processing ? 0.5 : 1 }}>
                  {processing ? '⏳ তৈরি হচ্ছে...' : '📑 Save New PDF'}
                </button>
                <button onClick={clearAll} className="d-btn-orange" style={{ padding: '14px 20px', border: 'none', cursor: 'pointer' }}>
                  🔄 Clear
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}