'use client';
import { useState, useRef } from 'react';

// ✅ আপনার নিজের সার্ভার লিংক বসানো আছে
const API_URL = 'https://pdf-cmyk-converter-q4w0.onrender.com/api/convert-cmyk';

export default function PdfCmykConverter() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [resultUrl, setResultUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const pickFile = (f) => {
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setResultUrl('');
      setErrorMsg('');
      setStatus('idle');
    } else {
      setErrorMsg('শুধুমাত্র PDF ফাইল দিন।');
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus('converting');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(API_URL, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('failed');
      const blob = await res.blob();
      setResultUrl(URL.createObjectURL(blob));
      setStatus('done');
    } catch (e) {
      setErrorMsg('কনভার্সন ব্যর্থ। প্রথমবার সার্ভার জাগতে ১-২ মিনিট লাগে — আবার চেষ্টা করুন।');
      setStatus('error');
    }
  };

  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '800px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    eyebrowLine: { width: '24px', height: '1px', background: 'var(--accent)' },
    title: { fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', lineHeight: '1', margin: '0 0 16px 0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    desc: { fontSize: '15px', color: 'var(--fg-dim)', marginBottom: '40px', lineHeight: '1.7' },
    dropzone: { border: '2px dashed var(--border-bright)', borderRadius: '12px', padding: '56px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: 'var(--bg-card)' },
    btnPrimary: { display: 'block', width: '100%', padding: '16px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)', marginTop: '24px' },
    info: { marginTop: '32px', padding: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', color: 'var(--fg-dim)', lineHeight: '1.8' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>

        <div style={styles.eyebrow}>
          <span style={styles.eyebrowLine}></span>
          Print Ready
        </div>
        <h1 style={styles.title}>RGB to CMYK Converter.</h1>
        <p style={styles.desc}>
          প্রিন্টারের জন্য PDF-এর কালার প্রোফাইল RGB থেকে CMYK-তে কনভার্ট করুন। বিজনেস কার্ড, ব্যানার, CV — সব প্রিন্ট ফাইলের জন্য পারফেক্ট। ১০০% ফ্রি।
        </p>

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files[0]); }}
          style={{ ...styles.dropzone, borderColor: dragOver ? 'var(--accent)' : 'var(--border-bright)' }}
        >
          <i className="fa-solid fa-file-pdf" style={{ fontSize: '48px', color: 'var(--accent)', marginBottom: '16px' }}></i>
          {file ? (
            <>
              <p style={{ fontSize: '15px', fontWeight: '700', margin: '8px 0 4px 0' }}>{file.name}</p>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB — ক্লিক করে বদলাতে পারেন</p>
            </>
          ) : (
            <>
              <p style={{ fontSize: '15px', fontWeight: '700', margin: '8px 0 4px 0' }}>PDF ফাইল ড্র্যাগ করুন বা ক্লিক করুন</p>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>সর্বোচ্চ ৩০ MB</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => pickFile(e.target.files[0])}
          />
        </div>

        {file && status !== 'done' && (
          <button onClick={handleConvert} disabled={status === 'converting'} style={{ ...styles.btnPrimary, opacity: status === 'converting' ? 0.5 : 1 }}>
            {status === 'converting' ? '⏳ Converting... (১-২ মিনিট লাগতে পারে)' : 'Convert to CMYK →'}
          </button>
        )}

        {status === 'done' && (
          <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--lime)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: 'var(--lime)', fontWeight: '700', marginBottom: '16px' }}>✅ কনভার্সন সফল! আপনার CMYK PDF রেডি।</p>
            <a href={resultUrl} download="converted-cmyk.pdf" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--accent)', color: '#0a0a0b', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
              ⬇ Download CMYK PDF
            </a>
          </div>
        )}

        {errorMsg && <p style={{ marginTop: '16px', color: 'var(--accent)', fontSize: '13px', textAlign: 'center' }}>⚠ {errorMsg}</p>}

        <div style={styles.info}>
          <strong style={{ color: 'var(--fg)' }}>📌 জেনে রাখুন:</strong><br />
          • কনভার্ট করার পর রঙ সামান্য নিভে আসবে — এটা স্বাভাবিক, প্রিন্টে ঠিক এভাবেই আসবে।<br />
          • প্রথম ব্যবহারে সার্ভার জাগতে ১-২ মিনিট লাগতে পারে (ফ্রি সার্ভার)।<br />
          • ফাইল কনভার্ট হওয়ার সাথে সাথেই সার্ভার থেকে মুছে যায় — ১০০% প্রাইভেট।
        </div>

      </div>
    </div>
  );
}