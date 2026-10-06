'use client';
import { useState, useRef } from 'react';

const API_BASE = 'https://pdf-cmyk-converter-q4w0.onrender.com';

export default function PdfEditor() {
  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState('');
  const [resultName, setResultName] = useState('');
  const [convertedFileType, setConvertedFileType] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const acceptType = status === 'editing' ? '.docx' : 'application/pdf';

  const pickFile = (f) => {
    if (!f) return;
    const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf');
    const isDocx = f.name.toLowerCase().endsWith('.docx');

    if (isPdf) {
      setFile(f);
      setStatus('pdfReady');
      setResultUrl('');
      setErrorMsg('');
    } else if (isDocx) {
      setFile(f);
      setStatus('docxReady');
      setResultUrl('');
      setErrorMsg('');
    } else {
      setErrorMsg('শুধু PDF বা Word (.docx) ফাইল দিন।');
    }
  };

  // PDF → Word (এডিটের জন্য)
  const convertToWord = async () => {
    if (!file) return;
    setStatus('converting');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/api/pdf-to-word`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultName('edited-document.docx');
      setConvertedFileType('docx');
      setStatus('wordReady');
    } catch (e) {
      setErrorMsg('কনভার্সন ব্যর্থ। প্রথমবার সার্ভার জাগতে ১-২ মিনিট লাগে — আবার চেষ্টা করুন।');
      setStatus('error');
    }
  };

  // Word → PDF (ফাইনাল)
  const convertToPdf = async () => {
    if (!file) return;
    setStatus('converting');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/api/word-to-pdf`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultName('final-document.pdf');
      setConvertedFileType('pdf');
      setStatus('pdfDone');
    } catch (e) {
      setErrorMsg('কনভার্সন ব্যর্থ। আবার চেষ্টা করুন।');
      setStatus('error');
    }
  };

  const resetAll = () => {
    setFile(null);
    setStatus('idle');
    setResultUrl('');
    setErrorMsg('');
  };

  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '800px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    eyebrowLine: { width: '24px', height: '1px', background: 'var(--accent)' },
    title: { fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', lineHeight: '1', margin: '0 0 16px 0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    desc: { fontSize: '15px', color: 'var(--fg-dim)', marginBottom: '40px', lineHeight: '1.7' },
    stepCard: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px', marginBottom: '20px' },
    stepNum: { fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', fontWeight: '700', marginBottom: '8px' },
    dropzone: { border: '2px dashed var(--border-bright)', borderRadius: '12px', padding: '48px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: 'var(--bg-card)' },
    btnPrimary: { display: 'block', width: '100%', padding: '16px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)', marginTop: '20px' },
    btnSecondary: { display: 'block', width: '100%', padding: '16px', background: 'var(--lime)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', textDecoration: 'none', textAlign: 'center', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)', marginTop: '16px' },
    info: { marginTop: '32px', padding: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', color: 'var(--fg-dim)', lineHeight: '1.8' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>

        <div style={styles.eyebrow}>
          <span style={styles.eyebrowLine}></span>
          Bangla + English
        </div>
        <h1 style={styles.title}>PDF Editor.</h1>
        <p style={styles.desc}>
          PDF ফাইল এডিট করুন — <strong>বাংলা ও ইংরেজি</strong> দুটোতেই। তিন ধাপে কাজ শেষ: PDF দিন → Word নিন → এডিট করে PDF ফেরত দিন। ১০০% ফ্রি ও নিরাপদ।
        </p>

        {/* ধাপ ১: PDF আপলোড */}
        <div style={styles.stepCard}>
          <p style={styles.stepNum}>STEP 01 / আপলোড</p>
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files[0]); }}
            style={{ ...styles.dropzone, borderColor: dragOver ? 'var(--accent)' : 'var(--border-bright)' }}
          >
            <i className="fa-solid fa-file-pdf" style={{ fontSize: '42px', color: 'var(--accent)', marginBottom: '12px' }}></i>
            {file ? (
              <>
                <p style={{ fontSize: '14px', fontWeight: '700', margin: '8px 0 4px 0' }}>{file.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB — {file.name.endsWith('.docx') ? 'Word ফাইল' : 'PDF ফাইল'}
                </p>
              </>
            ) : (
              <>
                <p style={{ fontSize: '14px', fontWeight: '700', margin: '8px 0 4px 0' }}>PDF ফাইল ড্র্যাগ করুন বা ক্লিক করুন</p>
                <p style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>সর্বোচ্চ ৩০ MB</p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              style={{ display: 'none' }}
              onChange={(e) => pickFile(e.target.files[0])}
            />
          </div>
        </div>

        {/* ধাপ ২: PDF → Word */}
        {file && status === 'pdfReady' && (
          <div style={styles.stepCard}>
            <p style={styles.stepNum}>STEP 02 / এডিটেবল Word নিন</p>
            <button onClick={convertToWord} style={styles.btnPrimary}>
              Convert to Word →
            </button>
          </div>
        )}

        {/* Word ডাউনলোড + নির্দেশনা */}
        {status === 'wordReady' && (
          <div style={styles.stepCard}>
            <p style={styles.stepNum}>STEP 03 / এডিট করুন</p>
            <p style={{ fontSize: '14px', color: 'var(--fg-dim)', lineHeight: '1.8', margin: '0 0 16px 0' }}>
              নিচের বাটন থেকে <strong style={{ color: 'var(--lime)' }}>Word ফাইল ডাউনলোড</strong> করুন। তারপর:
              <br />• ফোনে — WPS Office / Google Docs-এ খুলে এডিট করুন
              <br />• কম্পিউটারে — MS Word-এ খুলে এডিট করুন
              <br />• বাংলা টাইপ করতে মোবাইলের বাংলা কিবোর্ড বা Bijoy/Avro ব্যবহার করুন
            </p>
            <a href={resultUrl} download={resultName} style={styles.btnSecondary}>
              ⬇ Download Word (.docx)
            </a>
          </div>
        )}

        {/* ধাপ ৪: এডিট করা Word → PDF */}
        {status === 'wordReady' && (
          <div style={styles.stepCard}>
            <p style={styles.stepNum}>STEP 04 / এডিট শেষে PDF নিন</p>
            <p style={{ fontSize: '13px', color: 'var(--fg-dim)', marginBottom: '4px' }}>
              এডিট শেষ করে এখানে ফিরে এসে এডিট করা Word ফাইল আপলোড করুন:
            </p>
            <button onClick={resetAll} style={{ ...styles.btnSecondary, marginTop: '12px' }}>
              📤 Upload Edited Word File
            </button>
          </div>
        )}

        {/* এডিট করা docx আপলোড হলে → PDF কনভার্ট */}
        {file && status === 'docxReady' && (
          <div style={styles.stepCard}>
            <p style={styles.stepNum}>STEP 05 / ফাইনাল PDF</p>
            <button onClick={convertToPdf} style={styles.btnPrimary}>
              Convert to Final PDF →
            </button>
          </div>
        )}

        {/* ফাইনাল PDF রেজাল্ট */}
        {status === 'pdfDone' && (
          <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--lime)', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: 'var(--lime)', fontWeight: '700', marginBottom: '16px' }}>✅ আপনার এডিটেড PDF রেডি!</p>
            <a href={resultUrl} download={resultName} style={styles.btnSecondary}>
              ⬇ Download Final PDF
            </a>
          </div>
        )}

        {errorMsg && <p style={{ marginTop: '16px', color: 'var(--accent)', fontSize: '13px', textAlign: 'center' }}>⚠ {errorMsg}</p>}

        <div style={styles.info}>
          <strong style={{ color: 'var(--fg)' }}>📌 জেনে রাখুন:</strong><br />
          • <strong>বাংলা ও ইংরেজি</strong> — দুই ভাষাতেই টেক্সট ঠিক থাকবে।<br />
          • এডিট করার সময় <strong>ফন্ট বদলাবেন না</strong> — বাংলা ভেঙে যেতে পারে।<br />
          • ফাইল সার্ভারে সেভ হয় না — কনভার্ট হওয়ার সাথে সাথেই মুছে যায়।<br />
          • প্রথম ব্যবহারে সার্ভার জাগতে ১-২ মিনিট লাগতে পারে (ফ্রি সার্ভার)।
        </div>

      </div>
    </div>
  );
}