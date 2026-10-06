'use client';
import { useState, useRef } from 'react';

const API_BASE = 'https://pdf-cmyk-converter-q4w0.onrender.com';

export default function PdfVectorConverter() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('eps');
  const [status, setStatus] = useState('idle');
  const [resultUrl, setResultUrl] = useState('');
  const [resultName, setResultName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const formats = [
    { id: 'eps', label: 'EPS', desc: 'প্রিন্টার/প্রেস', icon: '🖨️' },
    { id: 'svg', label: 'SVG', desc: 'ওয়েব/স্ক্রিন', icon: '🌐' },
    { id: 'ai', label: 'AI', desc: 'Illustrator', icon: '🎨' }
  ];

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
      const res = await fetch(`${API_BASE}/api/convert-${format}`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('failed');
      const blob = await res.blob();
      setResultUrl(URL.createObjectURL(blob));
      setResultName(`converted-vector.${format}`);
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
    formatCard: (active) => ({ flex: 1, padding: '20px 12px', background: active ? 'var(--accent)' : 'var(--bg-card)', color: active ? '#0a0a0b' : 'var(--fg-dim)', border: active ? 'none' : '1px solid var(--border-bright)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s', borderRadius: '8px', minWidth: '120px' }),
    dropzone: { border: '2px dashed var(--border-bright)', borderRadius: '12px', padding: '56px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: 'var(--bg-card)' },
    btnPrimary: { display: 'block', width: '100%', padding: '16px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)', marginTop: '24px' },
    info: { marginTop: '32px', padding: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', color: 'var(--fg-dim)', lineHeight: '1.8' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>

        <div style={styles.eyebrow}>
          <span style={styles.eyebrowLine}></span>
          Vector Output
        </div>
        <h1 style={styles.title}>PDF to Vector Converter.</h1>
        <p style={styles.desc}>
          PDF থেকে <strong>EPS</strong>, <strong>SVG</strong>, বা <strong>AI</strong> — তিনটা vector ফরম্যাটেই কনভার্ট করুন। প্রিন্টার, ওয়েব, Illustrator — সব জায়গার জন্য। ১০০% ফ্রি।
        </p>

        {/* Format Selector — ৩টা কার্ড */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {formats.map((f) => (
            <button key={f.id} onClick={() => { setFormat(f.id); setStatus('idle'); setResultUrl(''); }} style={styles.formatCard(format === f.id)}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{f.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: "'Syne', sans-serif" }}>{f.label}</div>
              <div style={{ fontSize: '11px', marginTop: '4px' }}>{f.desc}</div>
            </button>
          ))}
        </div>

        {/* Dropzone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files[0]); }}
          style={{ ...styles.dropzone, borderColor: dragOver ? 'var(--accent)' : 'var(--border-bright)' }}
        >
          <i className="fa-solid fa-bezier-curve" style={{ fontSize: '48px', color: 'var(--accent)', marginBottom: '16px' }}></i>
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

        {/* Convert Button */}
        {file && status !== 'done' && (
          <button onClick={handleConvert} disabled={status === 'converting'} style={{ ...styles.btnPrimary, opacity: status === 'converting' ? 0.5 : 1 }}>
            {status === 'converting' ? '⏳ Converting...' : `Convert to ${format.toUpperCase()} →`}
          </button>
        )}

        {/* Result */}
        {status === 'done' && (
          <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--lime)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: 'var(--lime)', fontWeight: '700', marginBottom: '16px' }}>✅ কনভার্সন সফল! আপনার {format.toUpperCase()} ফাইল রেডি।</p>
            <a href={resultUrl} download={resultName} style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--accent)', color: '#0a0a0b', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
              ⬇ Download {format.toUpperCase()}
            </a>
          </div>
        )}

        {errorMsg && <p style={{ marginTop: '16px', color: 'var(--accent)', fontSize: '13px', textAlign: 'center' }}>⚠ {errorMsg}</p>}

        <div style={styles.info}>
          <strong style={{ color: 'var(--fg)' }}>📌 কোনটা কোথায়?</strong><br />
          • <strong>EPS:</strong> প্রফেশনাল প্রিন্ট প্রেস, ব্যানার/সাইনবোর্ডের দোকান।<br />
          • <strong>SVG:</strong> ওয়েবসাইট, ভিডিও এডিটর, স্ক্রিন ডিজাইন।<br />
          • <strong>AI:</strong> Adobe Illustrator-এ ওপেন করে এডিট করার জন্য।<br />
          • <strong>ভালো ফলের জন্য:</strong> Canva থেকে "PDF Print" ডাউনলোড করুন — টেক্সট/শেপ vector থাকবে।<br />
          • প্রথম ব্যবহারে সার্ভার জাগতে ১-২ মিনিট লাগতে পারে (ফ্রি সার্ভার)।
        </div>

      </div>
    </div>
  );
}