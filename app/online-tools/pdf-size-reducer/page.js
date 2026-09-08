'use client';
import { useState } from 'react';

export default function PdfSizeReducer() {
  const [originalSize, setOriginalSize] = useState(0);
  const [reducedSize, setReducedSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('পিডিএফ সাইজ কমানো হচ্ছে...');
  const [fileName, setFileName] = useState('reduced.pdf');
  const [error, setError] = useState('');
  
  const [compressionType, setCompressionType] = useState('medium_high');
  const [customTarget, setCustomTarget] = useState(500);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize((file.size / 1024).toFixed(2));
    setReducedSize(0);
    setCompressedUrl(null);
    setError('');
    setFileName(file.name.replace('.pdf', '') + '-reduced.pdf');
    
    handleCompress(file);
  };

  const handleCompress = async (file) => {
    if (!file) return;
    setLoading(true);
    setError('');
    setLoadingText('লাইব্রেরি লোড হচ্ছে...');
    
    try {
      // Legacy build ব্যবহার করা হচ্ছে Next.js এর জন্য সবচেয়ে স্টেবল
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
      
      // ওয়ার্কার সম্পূর্ণ বন্ধ করে দেওয়া হয়েছে, তাই CORS বা 404 এরর আসবে না
      pdfjsLib.GlobalWorkerOptions.workerSrc = '';
      
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default;

      setLoadingText('পিডিএফ প্রসেস করা হচ্ছে...');
      const arrayBuffer = await file.arrayBuffer();
      
      // disableWorker: true দেওয়া হয়েছে
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, disableWorker: true, isEvalSupported: false }).promise;
      
      const renderPdf = async (scale, quality) => {
        const newPdf = new jsPDF({ unit: 'pt', format: 'a4' });
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: scale });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
          
          await page.render({ canvasContext: context, viewport }).promise;
          const imgData = canvas.toDataURL('image/jpeg', quality);
          
          if (i > 1) newPdf.addPage([viewport.width, viewport.height], 'pt');
          else { newPdf.internal.pageSize.width = viewport.width; newPdf.internal.pageSize.height = viewport.height; }
          newPdf.addImage(imgData, 'JPEG', 0, 0, viewport.width, viewport.height);
        }
        return newPdf.output('blob');
      };

      let scale = 1.5;
      let quality = 0.6;
      let targetKB = 0;

      if (compressionType === 'ultra_high') { scale = 3.0; quality = 0.95; }
      else if (compressionType === 'high') { scale = 2.0; quality = 0.8; }
      else if (compressionType === 'medium_high') { scale = 1.5; quality = 0.6; }
      else if (compressionType === 'medium_low') { scale = 1.0; quality = 0.4; }
      else if (compressionType === 'extreme') { scale = 0.8; quality = 0.3; }
      else if (compressionType === 'target_300') { targetKB = 300; scale = 1.5; quality = 0.6; }
      else if (compressionType === 'custom') { targetKB = customTarget; scale = 1.5; quality = 0.6; }

      let blob = await renderPdf(scale, quality);

      if (targetKB > 0) {
        let attempts = 0;
        while (blob.size / 1024 > targetKB && attempts < 3) {
          setLoadingText(`টার্গেট সাইজে আনা হচ্ছে... (চেষ্টা ${attempts + 1}/3)`);
          if (quality > 0.3) quality -= 0.15;
          else if (scale > 0.5) scale -= 0.3;
          else break;
          blob = await renderPdf(scale, quality);
          attempts++;
        }
      }

      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
      setReducedSize((blob.size / 1024).toFixed(2));
    } catch (err) {
      console.error("Compression Error:", err);
      setError('পিডিএফ প্রসেস করতে সমস্যা হয়েছে! অনুগ্রহ করে আরেকটি পিডিএফ দিয়ে চেষ্টা করুন।');
    }
    setLoading(false);
  };

  const clearFile = () => {
    setCompressedUrl(null);
    setReducedSize(0);
    setOriginalSize(0);
    setError('');
    setCompressionType('medium_high');
    setCustomTarget(500);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📉 PDF Size Reducer</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>৭টি অপশন থেকে আপনার পছন্দের কোয়ালিটি বা কাস্টম সাইজ নির্বাচন করুন।</p>
        
        <div className="glass-3d" style={{ padding: '40px' }}>
          
          {!compressedUrl && !loading && !error && (
            <>
              <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '8px', fontWeight: '600' }}>Compression Quality (7 Options):</label>
                <select 
                  value={compressionType} 
                  onChange={(e) => setCompressionType(e.target.value)} 
                  className="d-input" 
                  style={{ maxWidth: '100%', margin: '0 auto', marginBottom: '15px' }}
                >
                  <option value="ultra_high" style={{background: '#1a1c2e'}}>Ultra High Quality (Best for Fine Text & Prints)</option>
                  <option value="high" style={{background: '#1a1c2e'}}>High Quality (Sharp Text & Graphics)</option>
                  <option value="medium_high" style={{background: '#1a1c2e'}}>Medium - High Quality (Great Balance)</option>
                  <option value="medium_low" style={{background: '#1a1c2e'}}>Medium - Low Quality (Small Size)</option>
                  <option value="extreme" style={{background: '#1a1c2e'}}>Extreme Compress (Smallest Size / Low Quality)</option>
                  <option value="target_300" style={{background: '#1a1c2e'}}>Target ~300 KB (Highly Optimized)</option>
                  <option value="custom" style={{background: '#1a1c2e'}}>Custom Size (Target KB)</option>
                </select>

                {compressionType === 'custom' && (
                  <div style={{ marginTop: '15px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '5px' }}>Target Size (KB):</label>
                    <input 
                      type="number" 
                      value={customTarget} 
                      onChange={(e) => setCustomTarget(Number(e.target.value))} 
                      className="d-input" 
                      style={{ maxWidth: '150px', margin: '0 auto', textAlign: 'center' }}
                      placeholder="e.g. 500"
                    />
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '5px' }}>(নোট: পিডিএফের পেজ সংখ্যা বেশি হলে কাস্টম সাইজে কোয়ালিটি কিছুটা কমতে পারে)</p>
                  </div>
                )}
              </div>

              <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
              </div>
            </>
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
              <button onClick={clearFile} className="d-btn-outline" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                🔄 আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {compressedUrl && !loading && !error && (
            <div>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
              <h3 style={{ color: 'white', marginBottom: '20px' }}>সাইজ কমানো সফল হয়েছে!</h3>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(255,0,0,0.1)', padding: '15px 25px', borderRadius: '8px', border: '1px solid rgba(255,0,0,0.2)' }}>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Original Size</p>
                  <p style={{ margin: '5px 0 0 0', color: '#ff6b6b', fontSize: '20px', fontWeight: 'bold' }}>{originalSize} KB</p>
                </div>
                <div style={{ background: 'rgba(45,206,137,0.1)', padding: '15px 25px', borderRadius: '8px', border: '1px solid rgba(45,206,137,0.2)' }}>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Reduced Size</p>
                  <p style={{ margin: '5px 0 0 0', color: '#2dce89', fontSize: '20px', fontWeight: 'bold' }}>{reducedSize} KB</p>
                </div>
              </div>

              <a href={compressedUrl} download={fileName} className="d-btn-green glow-btn-green" style={{ display: 'inline-block', padding: '14px 30px', textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                💾 Download Reduced PDF
              </a>
            </div>
          )}

          {(compressedUrl || loading) && !error && (
            <button onClick={clearFile} className="d-btn-outline" style={{ marginTop: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
              🔄 Clear File
            </button>
          )}

        </div>
      </div>
    </div>
  );
}