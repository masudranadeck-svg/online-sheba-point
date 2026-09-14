'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export default function MergePdf() {
  const [mode, setMode] = useState('merge'); // 'merge' or 'split'
  
  // Merge States
  const [mergeFiles, setMergeFiles] = useState([]);
  
  // Split States
  const [splitFile, setSplitFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- Merge Logic ---
  const handleMergeFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
    setMergeFiles(prev => [...prev, ...selectedFiles]);
    setError('');
  };

  const removeMergeFile = (index) => setMergeFiles(mergeFiles.filter((_, i) => i !== index));

  const moveFile = (index, direction) => {
    const newFiles = [...mergeFiles];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newFiles.length) return;
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setMergeFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (mergeFiles.length < 2) { setError('পিডিএফ জোড়া লাগাতে অন্তত ২টি ফাইল দরকার!'); return; }
    setLoading(true); setError('');
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of mergeFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }
      const blob = new Blob([await mergedPdf.save()], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'merged-document.pdf';
      link.click();
    } catch (err) { setError('ফাইল প্রসেস করতে সমস্যা! করাপ্ট ফাইল নাকি চেক করুন।'); }
    setLoading(false);
  };

  // --- Split Logic ---
  const handleSplitFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSplitFile(file);
      setError('');
    } else {
      setError('শুধুমাত্র PDF ফাইল দিন!');
    }
  };

  const splitPdf = async () => {
    if (!splitFile) return;
    setLoading(true); setError('');
    try {
      const arrayBuffer = await splitFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const zip = new JSZip();
      
      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);
        const pdfBytes = await newPdf.save();
        zip.file(`page-${i + 1}.pdf`, pdfBytes);
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'split-pages.zip';
      link.click();
    } catch (err) { setError('পিডিএফ ভাগ করতে সমস্যা! ফাইলটি করাপ্ট নাকি চেক করুন।'); }
    setLoading(false);
  };

  const clearAll = () => {
    setMergeFiles([]); setSplitFile(null); setError('');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📚 PDF Merger & Splitter Pro</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>একই জায়গায় পিডিএফ জোড়া লাগান এবং ভাগ করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {/* Mode Toggle */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '30px', background: 'rgba(0,0,0,0.2)', padding: '5px', borderRadius: '8px' }}>
            <button 
              onClick={() => { setMode('merge'); setError(''); }} 
              style={{ flex: 1, padding: '10px', background: mode === 'merge' ? '#4e6ef2' : 'transparent', color: mode === 'merge' ? 'white' : '#888', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}
            >
              Merge PDF (জোড়া লাগান)
            </button>
            <button 
              onClick={() => { setMode('split'); setError(''); }} 
              style={{ flex: 1, padding: '10px', background: mode === 'split' ? '#a855f7' : 'transparent', color: mode === 'split' ? 'white' : '#888', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}
            >
              Split PDF (ভাগ করুন)
            </button>
          </div>

          {/* Merge Section */}
          {mode === 'merge' && (
            <>
              <div style={{ marginBottom: '30px' }}>
                <button onClick={() => document.getElementById('merge-input').click()} className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                  ➕ পিডিএফ ফাইল আপলোড করুন
                </button>
                <input type="file" accept="application/pdf" multiple id="merge-input" style={{ display: 'none' }} onChange={handleMergeFileChange} />
              </div>

              {mergeFiles.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: 'white', marginBottom: '15px' }}>নির্বাচিত ফাইলসমূহ ({mergeFiles.length})</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {mergeFiles.map((file, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '10px 15px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                          <span style={{ background: '#4e6ef2', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{i + 1}</span>
                          <span style={{ color: 'white', fontSize: '14px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button onClick={() => moveFile(i, -1)} disabled={i === 0} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                          <button onClick={() => moveFile(i, 1)} disabled={i === mergeFiles.length - 1} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: i === mergeFiles.length - 1 ? 'not-allowed' : 'pointer', opacity: i === mergeFiles.length - 1 ? 0.3 : 1 }}>↓</button>
                          <button onClick={() => removeMergeFile(i)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 8px', cursor: 'pointer' }}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {mergeFiles.length > 0 && (
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                  <button onClick={mergePdfs} disabled={loading} className="d-btn-green glow-btn-green" style={{ flex: 1, padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                    {loading ? '⏳ জোড়া লাগানো হচ্ছে...' : '📚 Merge & Download'}
                  </button>
                  <button onClick={clearAll} className="d-btn-orange" style={{ padding: '14px 20px', border: 'none', cursor: 'pointer' }}>🔄 Clear</button>
                </div>
              )}
            </>
          )}

          {/* Split Section */}
          {mode === 'split' && (
            <>
              <div style={{ marginBottom: '30px' }}>
                <button onClick={() => document.getElementById('split-input').click()} className="d-btn-purple glow-btn-purple" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                  📄 সিঙ্গেল পিডিএফ ফাইল আপলোড করুন
                </button>
                <input type="file" accept="application/pdf" id="split-input" style={{ display: 'none' }} onChange={handleSplitFileChange} />
              </div>

              {splitFile && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: 'white', marginBottom: '15px' }}>নির্বাচিত ফাইল:</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                    <span style={{ color: 'white', fontSize: '14px', textAlign: 'left' }}>{splitFile.name}</span>
                    <button onClick={() => setSplitFile(null)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>✕</button>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '15px' }}>💡 পিডিএফের প্রতিটি পেজ আলাদা আলাদা পিডিএফ ফাইল হয়ে ZIP ফোল্ডারে ডাউনলোড হবে।</p>
                </div>
              )}

              {splitFile && (
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                  <button onClick={splitPdf} disabled={loading} className="d-btn-green glow-btn-green" style={{ flex: 1, padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                    {loading ? '⏳ ভাগ করা হচ্ছে...' : '✂️ Split & Download (ZIP)'}
                  </button>
                  <button onClick={clearAll} className="d-btn-orange" style={{ padding: '14px 20px', border: 'none', cursor: 'pointer' }}>🔄 Clear</button>
                </div>
              )}
            </>
          )}

          {error && <p style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '20px' }}>{error}</p>}

        </div>
      </div>
    </div>
  );
}