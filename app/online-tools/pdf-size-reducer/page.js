'use client';
import { useState } from 'react';

export default function PdfSizeReducer() {
  const [originalSize, setOriginalSize] = useState(0);
  const [reducedSize, setReducedSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('reduced.pdf');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize((file.size / 1024 / 1024).toFixed(2)); // MB
    setReducedSize(0);
    setCompressedUrl(null);
    setFileName(file.name.replace('.pdf', '') + '-reduced.pdf');

    setLoading(true);
    try {
      // Dynamically import to avoid SSR issues in Next.js
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const newPdf = new jsPDF({ unit: 'pt', format: 'a4' });

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        // scale 1.5 keeps good quality but reduces size significantly
        const viewport = page.getViewport({ scale: 1.5 }); 
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');

        await page.render({ canvasContext: context, viewport }).promise;

        // 60% JPEG quality is perfect for reducing size without losing text readability
        const imgData = canvas.toDataURL('image/jpeg', 0.6); 

        if (i > 1) {
          newPdf.addPage([viewport.width, viewport.height], 'pt');
        } else {
          newPdf.internal.pageSize.width = viewport.width;
          newPdf.internal.pageSize.height = viewport.height;
        }
        newPdf.addImage(imgData, 'JPEG', 0, 0, viewport.width, viewport.height);
      }

      const blob = newPdf.output('blob');
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
      setReducedSize((blob.size / 1024 / 1024).toFixed(2));
    } catch (err) {
      console.error(err);
      alert('PDF প্রসেস করতে সমস্যা হয়েছে! অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
    setLoading(false);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📉 PDF Size Reducer</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>আপনার বড় পিডিএফ ফাইল আপলোড করুন এবং সেকেন্ডের মধ্যে সাইজ কমিয়ে ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '40px' }}>
          
          {!compressedUrl && !loading && (
            <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {loading && (
            <div>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>⏳</div>
              <p style={{ color: 'white', fontSize: '18px' }}>পিডিএফ সাইজ কমানো হচ্ছে...</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>(পেজের সংখ্যা অনুযায়ী সময় লাগতে পারে)</p>
            </div>
          )}

          {compressedUrl && !loading && (
            <div>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
              <h3 style={{ color: 'white', marginBottom: '20px' }}>সাইজ কমানো সফল হয়েছে!</h3>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(255,0,0,0.1)', padding: '15px 25px', borderRadius: '8px', border: '1px solid rgba(255,0,0,0.2)' }}>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Original Size</p>
                  <p style={{ margin: '5px 0 0 0', color: '#ff6b6b', fontSize: '20px', fontWeight: 'bold' }}>{originalSize} MB</p>
                </div>
                <div style={{ background: 'rgba(45,206,137,0.1)', padding: '15px 25px', borderRadius: '8px', border: '1px solid rgba(45,206,137,0.2)' }}>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Reduced Size</p>
                  <p style={{ margin: '5px 0 0 0', color: '#2dce89', fontSize: '20px', fontWeight: 'bold' }}>{reducedSize} MB</p>
                </div>
              </div>

              <a href={compressedUrl} download={fileName} className="d-btn-green glow-btn-green" style={{ display: 'inline-block', padding: '14px 30px', textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                💾 Download Reduced PDF
              </a>
            </div>
          )}

          {(compressedUrl || loading) && (
            <button onClick={() => { setCompressedUrl(null); setReducedSize(0); setOriginalSize(0); }} className="d-btn-outline" style={{ marginTop: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
              🔄 নতুন পিডিএফ আপলোড করুন
            </button>
          )}

        </div>
      </div>
    </div>
  );
}