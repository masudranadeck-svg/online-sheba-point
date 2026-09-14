'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;
    
    // Filter only PDFs
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    setFiles(prev => [...prev, ...pdfFiles]);
    setError('');
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= newFiles.length) return;

    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('পিডিএফ জোড়া লাগাতে অন্তত ২টি ফাইল দরকার!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        
        // সব পেজ কপি করে নেওয়া হচ্ছে
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        // নতুন পিডিএফে পেজগুলো যোগ করা হচ্ছে
        pages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      
      // Blob বানিয়ে ডাউনলোড করানো হচ্ছে
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged-document.pdf';
      link.click();
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      setError('ফাইলগুলো প্রসেস করতে সমস্যা হয়েছে! কোনো ফাইল করাপ্ট বা পাসওয়ার্ড দেওয়া আছে কিনা চেক করুন।');
    }
    setLoading(false);
  };

  const clearAll = () => {
    setFiles([]);
    setError('');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📚 Merge PDF</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>একাধিক পিডিএফ ফাইল আপলোড করুন এবং সেগুলো এক ক্লিকে একটি ফাইলে জোড়া লাগিয়ে ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          <div style={{ marginBottom: '30px' }}>
            <button onClick={() => document.getElementById('pdf-input').click()} className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
              ➕ PDF ফাইল আপলোড করুন
            </button>
            <input type="file" accept="application/pdf" multiple id="pdf-input" style={{ display: 'none' }} onChange={handleFileChange} />
          </div>

          {files.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>নির্বাচিত ফাইলসমূহ ({files.length})</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {files.map((file, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '10px 15px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                      <span style={{ background: '#4e6ef2', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{i + 1}</span>
                      <span style={{ color: 'white', fontSize: '14px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => moveFile(i, -1)} disabled={i === 0} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                      <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: i === files.length - 1 ? 'not-allowed' : 'pointer', opacity: i === files.length - 1 ? 0.3 : 1 }}>↓</button>
                      <button onClick={() => removeFile(i)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: 'pointer' }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '20px' }}>{error}</p>}

          {files.length > 0 && (
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <button onClick={mergePdfs} disabled={loading} className="d-btn-green glow-btn-green" style={{ flex: 1, padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                {loading ? '⏳ জোড়া লাগানো হচ্ছে...' : '📚 Merge & Download'}
              </button>
              <button onClick={clearAll} className="d-btn-orange" style={{ padding: '14px 20px', border: 'none', cursor: 'pointer' }}>
                🔄 Clear
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}