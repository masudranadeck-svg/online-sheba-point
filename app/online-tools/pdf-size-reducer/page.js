'use client';

import { useState, useRef } from 'react';

const API_URL = 'https://pdf-cmyk-converter-q4w0.onrender.com/api/compress-pdf';

const QUALITY_OPTIONS = [
  {
    id: 'screen',
    title: 'সর্বোচ্চ কম্প্রেশন',
    desc: 'ফাইল সবচেয়ে ছোট হবে, তবে ছবির মান কিছুটা কম থাকবে। ইমেইল / WhatsApp শেয়ারের জন্য পারফেক্ট।',
  },
  {
    id: 'ebook',
    title: 'মাঝারি — প্রস্তাবিত',
    desc: 'সাইজ ও কোয়ালিটির সেরা ভারসাম্য। বেশিরভাগ কাজের জন্য এটাই বেছে নিন।',
  },
  {
    id: 'printer',
    title: 'উন্নত কোয়ালিটি',
    desc: 'প্রিন্টের মতো কোয়ালিটি থাকবে, তবে সাইজ তুলনামূলক কম কমবে।',
  },
];

function formatSize(bytes) {
  if (bytes === null || bytes === undefined) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function PdfSizeReducerPage() {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState('ebook');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const pickFile = (f) => {
    setError('');
    setResult(null);
    if (!f) return;
    const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setError('শুধুমাত্র PDF ফাইল দিয়ে কাজ করা যাবে!');
      return;
    }
    if (f.size > 30 * 1024 * 1024) {
      setError('ফাইল সাইজ ৩০ MB এর কম হতে হবে!');
      return;
    }
    setFile(f);
  };

  const resetAll = () => {
    if (result && result.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleCompress = async () => {
    if (!file || loading) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('level', level);
      const res = await fetch(API_URL, { method: 'POST', body: fd });
      if (!res.ok) {
        let msg = `সার্ভার এরর (${res.status}) — একটু পরে আবার চেষ্টা করুন`;
        try {
          const j = await res.json();
          if (j && j.error) msg = j.error;
        } catch (e) {}
        throw new Error(msg);
      }
      const blob = await res.blob();
      if (!blob.size) throw new Error('খালি ফাইল এসেছে — আবার চেষ্টা করুন');
      const url = URL.createObjectURL(blob);
      const outName = 'compressed-' + file.name;
      const saved = file.size > 0 ? Math.round(((file.size - blob.size) / file.size) * 100) : 0;
      setResult({ url, size: blob.size, name: outName, saved });
      // Automatic download শুরু
      const a = document.createElement('a');
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      setError(err.message || 'কিছু একটা সমস্যা হয়েছে! আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ===== Header ===== */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            PDF Size <span className="text-[var(--accent)]">Reducer</span>
          </h1>
          <p className="text-[var(--fg-muted)]">
            পিডিএফ ফাইলের সাইজ সেকেন্ডেই কমিয়ে নিন — সম্পূর্ণ ফ্রি, কোনো সফটওয়্যার লাগবে না
          </p>
        </div>

        {/* ===== ধাপ ১: ফাইল সিলেক্ট ===== */}
        <div
          onClick={() => inputRef.current && inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files[0]); }}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
            dragOver
              ? 'border-[var(--accent)] bg-[var(--bg-elev)]'
              : 'border-[var(--fg-muted)]/40 hover:border-[var(--accent)] bg-[var(--bg-card)]'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => pickFile(e.target.files && e.target.files[0])}
          />
          {file ? (
            <div>
              <div className="text-4xl mb-3">📄</div>
              <p className="font-medium break-all">{file.name}</p>
              <p className="text-[var(--fg-muted)] text-sm mt-1">সাইজ: {formatSize(file.size)}</p>
              <span className="text-[var(--accent)] text-sm mt-2 inline-block">অন্য ফাইল বাছতে ক্লিক করুন</span>
            </div>
          ) : (
            <div>
              <div className="text-5xl mb-3">🗜️</div>
              <p className="font-medium">PDF ফাইল এখানে টেনে আনুন</p>
              <p className="text-[var(--fg-muted)] text-sm mt-1">অথবা ক্লিক করে সিলেক্ট করুন (সর্বোচ্চ ৩০ MB)</p>
            </div>
          )}
        </div>

        {/* ===== ধাপ ২: কোয়ালিটি ===== */}
        <div className="mt-8">
          <h2 className="font-semibold mb-3">২. কোয়ালিটি বাছুন:</h2>
          <div className="grid gap-3">
            {QUALITY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLevel(opt.id)}
                className={`text-left p-4 rounded-lg border transition-all duration-200 ${
                  level === opt.id
                    ? 'border-[var(--accent)] bg-[var(--bg-elev)] shadow-[0_0_15px_rgba(255,91,20,0.25)]'
                    : 'border-[var(--fg-muted)]/25 bg-[var(--bg-card)] hover:border-[var(--accent)]/60'
                }`}
              >
                <div className="flex items-center gap-2 font-medium">
                  <span>{level === opt.id ? '🟠' : '⚪'}</span>
                  <span>{opt.title}</span>
                </div>
                <p className="text-[var(--fg-muted)] text-sm mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ===== ধাপ ৩: বাটন ===== */}
        <button
          onClick={handleCompress}
          disabled={!file || loading}
          className={`w-full mt-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
            !file || loading
              ? 'bg-[var(--fg-muted)]/20 text-[var(--fg-muted)] cursor-not-allowed'
              : 'bg-[var(--accent)] text-white hover:opacity-90 shadow-[0_0_25px_rgba(255,91,20,0.4)]'
          }`}
        >
          {loading ? '⏳ কম্প্রেস হচ্ছে...' : '🗜️ কম্প্রেস করুন'}
        </button>

        {loading && (
          <p className="text-center text-[var(--fg-muted)] text-sm mt-3">
            প্রথমবার সার্ভার চালু হতে ৩০–৬০ সেকেন্ড লাগতে পারে — পেজ রিফ্রেশ করবেন না!
          </p>
        )}

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 text-sm">
            ❌ {error}
          </div>
        )}

        {/* ===== রেজাল্ট ===== */}
        {result && (
          <div className="mt-6 p-6 rounded-xl bg-[var(--bg-card)] border border-green-500/40">
            <h3 className="font-bold text-lg mb-4 text-green-400">✅ কম্প্রেশন সফল হয়েছে!</h3>
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="p-3 rounded-lg bg-[var(--bg-elev)]">
                <p className="text-[var(--fg-muted)] text-xs">আগে</p>
                <p className="font-bold">{formatSize(file.size)}</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-elev)]">
                <p className="text-[var(--fg-muted)] text-xs">পরে</p>
                <p className="font-bold text-[var(--accent)]">{formatSize(result.size)}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <p className="text-[var(--fg-muted)] text-xs">সাশ্রয়</p>
                <p className="font-bold text-green-400">{result.saved > 0 ? `${result.saved}%` : '—'}</p>
              </div>
            </div>
            {result.saved <= 0 && (
              <p className="text-[var(--fg-muted)] text-sm mb-4">
                ℹ️ এই ফাইলটি আগে থেকেই অপটিমাইজড ছিল, তাই সাইজ খুব একটা কমেনি।
              </p>
            )}
            <div className="flex gap-3">
              <a
                href={result.url}
                download={result.name}
                className="flex-1 text-center py-3 rounded-lg bg-[var(--accent)] text-white font-semibold hover:opacity-90"
              >
                ⬇️ আবার ডাউনলোড করুন
              </a>
              <button
                onClick={resetAll}
                className="px-4 py-3 rounded-lg border border-[var(--fg-muted)]/40 hover:border-[var(--accent)]"
              >
                নতুন ফাইল
              </button>
            </div>
          </div>
        )}

        {/* ===== Back link ===== */}
        <div className="text-center mt-10">
          <a href="/online-tools" className="text-[var(--accent)] hover:underline text-sm">
            ← সব টুলসে ফিরে যান
          </a>
        </div>

      </div>
    </main>
  );
}