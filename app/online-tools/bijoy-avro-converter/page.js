'use client';
import { useState } from 'react';

export default function BijoyAvroConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [unmapped, setUnmapped] = useState(0);
  const [mode, setMode] = useState('bijoyToAvro');
  const [copied, setCopied] = useState(false);

  // ======== মূল ম্যাপিং টেবিল (Bijoy ↔ Unicode) ========
  // যুক্তবর্ণ আগে (বড়গুলো), তারপর একক অক্ষর
  const BIJOY_MAP = [
    // --- যুক্তবর্ণ / বিশেষ (multi-char) ---
    ['æ', 'ক্ষ'], ['Ü', 'ঞ্জ'], ['˜', 'ণ্ড'], ['ª', 'জ্জ'],
    ['Ê', 'জ্ঞ'], ['Ð', 'চ্চ'], ['Ñ', 'চ্ছ'], ['Ó', 'চ্ঞ'],
    ['‡', 'ত্ত'], ['†', 'ত্ম'], ['…', 'ত্ন'], ['Â', 'দ্দ'],
    ['Ã', 'দ্ধ'], ['Æ', 'দ্ভ'], ['Ï', 'দ্ম'], ['À', 'ন্ক'],
    ['\u0082', 'ন্ট'], ['\u0083', 'ন্ঠ'], ['\u0084', 'ন্ড'],
    ['\u0085', 'ন্ত'], ['\u0086', 'ন্থ'], ['\u0087', 'ন্দ'],
    ['\u0088', 'ন্ধ'], ['\u0089', 'ন্ন'], ['\u008A', 'ন্ম'],
    ['\u008B', 'ন্র'], ['\u0090', 'প্ট'], ['\u0091', 'প্ত'],
    ['\u0092', 'প্ন'], ['\u0093', 'প্প'], ['\u0094', 'প্ল'],
    ['\u0095', 'প্স'], ['\u0096', 'ব্জ'], ['\u0097', 'ব্দ'],
    ['\u0098', 'ব্ধ'], ['\u0099', 'ব্ব'], ['\u009A', 'ব্র'],
    ['\u009B', 'ভ্র'], ['\u009C', 'ভ্ল'], ['\u009D', 'ম্ন'],
    ['\u009E', 'ম্প'], ['\u009F', 'ম্ফ'], ['\u00A0', 'ম্ব'],
    ['\u00A1', 'ম্ভ'], ['\u00A2', 'ম্ম'], ['\u00A3', 'ম্ল'],
    ['\u00A4', 'ল্ক'], ['\u00A5', 'ল্গ'], ['\u00A6', 'ল্ট'],
    ['\u00A7', 'ল্ড'], ['\u00A8', 'ল্প'], ['\u00A9', 'ল্ফ'],
    ['\u00AA', 'ল্ব'], ['\u00AB', 'ল্ভ'], ['\u00AC', 'ল্ম'],
    ['\u00AD', 'ল্ল'], ['\u00AE', 'শ্চ'], ['\u00AF', 'শ্ছ'],
    ['\u00B0', 'শ্ন'], ['\u00B1', 'শ্ব'], ['\u00B2', 'শ্ম'],
    ['\u00B3', 'শ্ল'], ['\u00B4', 'ষ্ক'], ['\u00B5', 'ষ্ট'],
    ['\u00B6', 'ষ্ঠ'], ['\u00B7', 'ষ্ণ'], ['\u00B8', 'ষ্প'],
    ['\u00B9', 'ষ্ফ'], ['\u00BA', 'ষ্ম'], ['\u00BB', 'স্ক'],
    ['\u00BC', 'স্ট'], ['\u00BD', 'স্ত'], ['\u00BE', 'স্থ'],
    ['\u00BF', 'স্ন'], ['\u00C0', 'স্প'], ['\u00C1', 'স্ফ'],
    ['\u00C2', 'স্ব'], ['\u00C3', 'স্ম'], ['\u00C4', 'স্র'],
    ['\u00C5', 'হ্ণ'], ['\u00C6', 'হ্ন'], ['\u00C7', 'হ্ম'],
    ['\u00C8', 'হ্র'], ['\u00C9', 'রু'], ['\u00CA', 'রূ'],
    ['\u00CC', 'গু'], ['\u00CD', 'ক্র'], ['\u00CE', 'ক্ল'],
    ['\u00CF', 'গ্র'], ['\u00D1', 'গ্ল'], ['\u00D2', 'ঘ্র'],
    ['\u00D4', 'ট্র'], ['\u00D5', 'ড্র'], ['\u00D6', 'ণ্ণ'],
    ['\u00D7', 'থ্র'], ['\u00D8', 'দ্র'], ['\u00D9', 'ধ্র'],
    ['\u00DA', 'ফ্র'], ['\u00DB', 'ব্য'], ['\u00DC', 'ম্র'],
    ['\u00DD', 'শ্র'], ['\u00DE', 'ষ্ট্র'], ['\u00DF', 'স্ক্র'],
    ['\u00E0', 'স্ত্র'], ['\u00E1', 'স্প্র'], ['\u00E2', 'স্ল'],
    ['\u00E3', 'ৎ'], ['\u00E4', 'ং'], ['\u00E5', 'ঃ'],

    // --- স্বরবর্ণ ---
    ['D', 'অ'], ['‹', 'আ'], ['E', 'ই'], ['F', 'ঈ'],
    ['G', 'উ'], ['^', 'ঊ'], ['¯', 'ঋ'], ['H', 'এ'],
    ['I', 'ঐ'], ['J', 'ও'], ['K', 'ঔ'],

    // --- ব্যঞ্জনবর্ণ ---
    ['L', 'ক'], ['M', 'খ'], ['N', 'গ'], ['O', 'ঘ'],
    ['P', 'ঙ'], ['Q', 'চ'], ['R', 'ছ'], ['T', 'জ'],
    ['U', 'ঝ'], ['V', 'ট'], ['W', 'ঠ'], ['X', 'ড'],
    ['Y', 'ঢ'], ['Z', 'ণ'], ['[', 'ত'], ['\\', 'থ'],
    [']', 'দ'], ['_', 'ন'], ['`', 'প'], ['a', 'ব'],
    ['b', 'ভ'], ['c', 'ম'], ['d', 'ধ'], ['e', 'র'],
    ['f', 'ল'], ['$', 'শ'], ['%', 'ষ'], [',', 'স'],
    ['-', 'হ'], ['¥', 'ড়'], ['¦', 'ঢ়'], ['©', 'য়'],

    // --- কার চিহ্ন (স্বরচিহ্ন) ---
    ['v', 'া'], ['q', 'ি'], ['w', 'ী'], ['ù', 'ু'],
    ['ú', 'ূ'], ['R\u00FA', 'ৃ'], ['ó', 'ে'], ['ô', 'ো'],
    ['ú', 'ৈ'], ['û', 'ৌ'], ['ü', 'ৗ'], ['ÿ', '্'],
    ['\u00A8', '়'], ['\u00EC', 'ঁ'],

    // --- সংখ্যা ও যতিচিহ্ন ---
    ['¢', '০'], ['£', '১'], ['¤', '২'], ['¥', '৩'],
    ['¦', '৪'], ['§', '৫'], ['¨', '৬'], ['©', '৭'],
    ['ª', '৮'], ['«', '৯'], ['µ', '।'], ['·', '॥']
  ];

  // দুই দিকের ম্যাপ আলাদা করে সাজানো (বড় ম্যাচ আগে — এটাই অ্যাকুরেসির চাবিকাঠি)
  const bijoyToUni = [...BIJOY_MAP].sort((a, b) => b[0].length - a[0].length);
  const uniToBijoy = [...BIJOY_MAP]
    .map(([b, u]) => [u, b])
    .sort((a, b) => b[0].length - a[0].length);

  const convert = (text, map) => {
    let count = 0;
    let result = text;
    map.forEach(([from, to]) => {
      result = result.split(from).join(to);
    });
    // যেগুলো ম্যাপ হয়নি সেগুলো গোনা (বাংলা না হলে)
    if (map === bijoyToUni) {
      const bengaliRe = /[\u0980-\u09FF]/g;
      const hadBengali = /[A-Za-z\x80-\xFF]/.test(text);
      if (hadBengali && !bengaliRe.test(result)) count = text.length;
    }
    setUnmapped(count);
    return result;
  };

  const handleConvert = () => {
    if (!inputText.trim()) return;
    const result = mode === 'bijoyToAvro'
      ? convert(inputText, bijoyToUni)
      : convert(inputText, uniToBijoy);
    setOutputText(result);
  };

  const handleSwap = () => {
    const newMode = mode === 'bijoyToAvro' ? 'avroToBijoy' : 'bijoyToAvro';
    setMode(newMode);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'bijoyToAvro' ? 'avro-unicode.txt' : 'bijoy-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '1100px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    eyebrowLine: { width: '24px', height: '1px', background: 'var(--accent)' },
    title: { fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '800', lineHeight: '1', margin: '0 0 16px 0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    desc: { fontSize: '16px', color: 'var(--fg-dim)', marginBottom: '48px', maxWidth: '600px' },
    modeBtn: (active) => ({ flex: 1, padding: '14px', background: active ? 'var(--accent)' : 'transparent', color: active ? '#0a0a0b' : 'var(--fg-dim)', border: active ? 'none' : '1px solid var(--border-bright)', cursor: 'pointer', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.3s' }),
    textarea: { width: '100%', minHeight: '200px', background: 'var(--bg-card)', border: '1px solid var(--border-bright)', borderRadius: '8px', padding: '20px', color: 'var(--fg)', fontSize: '16px', lineHeight: '1.8', outline: 'none', resize: 'vertical', fontFamily: "'Noto Sans Bengali', sans-serif", boxSizing: 'border-box' },
    btnPrimary: { padding: '14px 32px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' },
    btnSecondary: { padding: '14px 24px', background: 'transparent', color: 'var(--fg-dim)', border: '1px solid var(--border-bright)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' },
    label: { fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", display: 'block', marginBottom: '10px' }
  };

  const hover = (e, on) => {
    e.currentTarget.style.borderColor = on ? 'var(--accent)' : 'var(--border-bright)';
    e.currentTarget.style.color = on ? 'var(--accent)' : 'var(--fg-dim)';
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>

        <div style={styles.eyebrow}>
          <span style={styles.eyebrowLine}></span>
          Bijoy ↔ Avro
        </div>
        <h1 style={styles.title}>Bangla Text Converter.</h1>
        <p style={styles.desc}>Bijoy (Legacy) থেকে Avro/Unicode অথবা Unicode থেকে Bijoy-তে বাংলা টেক্সট কনভার্ট করুন। ১০০% ফ্রি ও নিরাপদ।</p>

        {/* Mode Selector */}
        <div style={{ display: 'flex', marginBottom: '32px', maxWidth: '500px' }}>
          <button onClick={() => setMode('bijoyToAvro')} style={styles.modeBtn(mode === 'bijoyToAvro')}>Bijoy → Avro</button>
          <button onClick={() => setMode('avroToBijoy')} style={styles.modeBtn(mode === 'avroToBijoy')}>Avro → Bijoy</button>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>{mode === 'bijoyToAvro' ? 'Bijoy Text (Input)' : 'Unicode/Avro Text (Input)'}</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'bijoyToAvro' ? 'Bijoy লেখা এখানে পেস্ট করুন...' : 'Unicode বাংলা লেখা এখানে পেস্ট করুন...'}
            style={styles.textarea}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button onClick={handleConvert} style={styles.btnPrimary}>Convert →</button>
          <button onClick={handleSwap} style={styles.btnSecondary} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>⇅ Swap</button>
          <button onClick={() => { setInputText(''); setOutputText(''); setUnmapped(0); }} style={styles.btnSecondary} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>✕ Clear</button>
        </div>

        {/* Output */}
        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>{mode === 'bijoyToAvro' ? 'Unicode/Avro (Output)' : 'Bijoy (Output)'}</label>
          <textarea value={outputText} readOnly placeholder="কনভার্ট করা লেখা এখানে আসবে..." style={{ ...styles.textarea, color: 'var(--lime)' }} />
          {unmapped > 0 && (
            <p style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '8px' }}>
              ⚠ কিছু অংশ সঠিকভাবে কনভার্ট হয়নি — টেক্সটটা চেক করুন।
            </p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={handleCopy} disabled={!outputText} style={{ ...styles.btnSecondary, opacity: outputText ? 1 : 0.4 }} onMouseEnter={(e) => outputText && hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button onClick={handleDownload} disabled={!outputText} style={{ ...styles.btnSecondary, opacity: outputText ? 1 : 0.4 }} onMouseEnter={(e) => outputText && hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
            ⬇ Download .txt
          </button>
        </div>

      </div>
    </div>
  );
}