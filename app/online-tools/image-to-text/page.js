'use client';
import { useState } from 'react';

export default function ImageToText() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lang, setLang] = useState('eng');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setText('');
      setProgress(0);
    };
    reader.readAsDataURL(file);
  };

  const extractText = async () => {
    if (!image) return;
    setLoading(true);
    setText('');
    setProgress(0);

    try {
      // Dynamically import Tesseract to avoid SSR issues
      const { createWorker } = await import('tesseract.js');
      
      // Create worker with selected language (English + Bengali)
      const worker = await createWorker(lang, 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

      const { data: { text } } = await worker.recognize(image);
      setText(text);
      
      await worker.terminate();
    } catch (err) {
      console.error(err);
      setText('টেক্সট বের করতে সমস্যা হয়েছে! অন্য একটি ছবি দিয়ে চেষ্টা করুন।');
    }
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert('টেক্সট কপি হয়েছে!');
  };

  const clearAll = () => {
    setImage(null);
    setText('');
    setProgress(0);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🔠 Image to Text (OCR)</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি আপলোড করুন এবং সেই ছবির লেখা টেক্সট হিসেবে বের করে আনুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {!image && (
            <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {image && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
              </div>

              {!text && !loading && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '10px' }}>Language:</label>
                  <select value={lang} onChange={(e) => setLang(e.target.value)} className="d-input" style={{ maxWidth: '200px', margin: '0 auto' }}>
                    <option value="eng" style={{background: '#1a1c2e'}}>English</option>
                    <option value="ben" style={{background: '#1a1c2e'}}>Bangla (বাংলা)</option>
                    <option value="eng+ben" style={{background: '#1a1c2e'}}>English + Bangla</option>
                  </select>
                </div>
              )}

              {loading && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏳</div>
                  <p style={{ color: 'white', fontSize: '16px' }}>টেক্সট বের করা হচ্ছে... ({progress}%)</p>
                  <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '10px' }}>
                    <div style={{ width: `${progress}%`, background: '#4e6ef2', height: '8px', borderRadius: '10px', transition: 'width 0.3s' }}></div>
                  </div>
                </div>
              )}

              {!text && !loading && (
                <button onClick={extractText} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer' }}>
                  ✨ Extract Text
                </button>
              )}

              {text && (
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ color: 'white', marginBottom: '15px', textAlign: 'center' }}>Extracted Text:</h3>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'pre-wrap', color: '#e0e0e0', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                    {text}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={copyText} className="d-btn glow-btn" style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer' }}>
                      📋 Copy Text
                    </button>
                    <button onClick={clearAll} className="d-btn-outline" style={{ flex: 1, padding: '12px', border: 'none', cursor: 'pointer' }}>
                      🔄 Clear
                    </button>
                  </div>
                </div>
              )}

              {!text && !loading && (
                <button onClick={clearAll} className="d-btn-outline" style={{ marginTop: '15px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                  🔄 নতুন ছবি আপলোড করুন
                </button>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}