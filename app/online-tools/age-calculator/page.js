'use client';
import { useState } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [calcDate, setCalcDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    setError('');
    setResult(null);

    if (!birthDate) {
      setError('জন্ম তারিখ দিন।');
      return;
    }

    const birth = new Date(birthDate);
    const calc = new Date(calcDate);

    if (birth > calc) {
      setError('জন্ম তারিখ আজকের তারিখের আগে হতে হবে!');
      return;
    }

    // বছর, মাস, দিন হিসাব
    let years = calc.getFullYear() - birth.getFullYear();
    let months = calc.getMonth() - birth.getMonth();
    let days = calc.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // আগের মাসের মোট দিন
      const prevMonth = new Date(calc.getFullYear(), calc.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // মোট দিন
    const totalDays = Math.floor((calc - birth) / (1000 * 60 * 60 * 24));

    // মোট মাস
    const totalMonths = years * 12 + months;

    // মোট সপ্তাহ
    const totalWeeks = Math.floor(totalDays / 7);

    // মোট ঘণ্টা, মিনিট
    const totalHours = totalDays * 24;
    const totalMinutes = totalDays * 24 * 60;

    // পরবর্তী জন্মদিন
    let nextBirthday = new Date(calc.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < calc) {
      nextBirthday = new Date(calc.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToBirthday = Math.ceil((nextBirthday - calc) / (1000 * 60 * 60 * 24));

    // বাংলা বর্ষ (গ্রেগরিয়ান থেকে আনুমানিক)
    const bnMonths = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];

    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const toBnNumber = (num) => String(num).split('').map(d => bnDigits[+d] || d).join('');

    setResult({
      years, months, days,
      totalDays, totalMonths, totalWeeks,
      totalHours, totalMinutes,
      daysToBirthday,
      bn: {
        years: toBnNumber(years), months: toBnNumber(months), days: toBnNumber(days)
      }
    });
  };

  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '800px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    eyebrowLine: { width: '24px', height: '1px', background: 'var(--accent)' },
    title: { fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', lineHeight: '1', margin: '0 0 16px 0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    desc: { fontSize: '15px', color: 'var(--fg-dim)', marginBottom: '40px', lineHeight: '1.7' },
    card: { background: 'var(--bg-card)', border: '1px solid var(--border-bright)', borderRadius: '12px', padding: '28px', marginBottom: '20px' },
    label: { fontSize: '11px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", display: 'block', marginBottom: '10px' },
    input: { width: '100%', background: 'var(--bg)', border: '1px solid var(--border-bright)', borderRadius: '8px', padding: '14px', color: 'var(--fg)', fontSize: '15px', outline: 'none', boxSizing: 'border-box' },
    btnPrimary: { display: 'block', width: '100%', padding: '16px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)', marginTop: '16px' },
    resultBox: { background: 'var(--bg-card)', border: '1px solid var(--lime)', borderRadius: '12px', padding: '28px', marginTop: '20px' },
    bigResult: { fontSize: '42px', fontWeight: '800', fontFamily: "'Syne', sans-serif", color: 'var(--lime)', textAlign: 'center', lineHeight: '1.2', margin: '8px 0' },
    statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '20px' },
    statCard: { background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', textAlign: 'center' },
    statNum: { fontSize: '22px', fontWeight: '800', fontFamily: "'Syne', sans-serif", color: 'var(--accent)' },
    statLabel: { fontSize: '11px', color: 'var(--fg-muted)', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>

        <div style={styles.eyebrow}>
          <span style={styles.eyebrowLine}></span>
          Utility Tool
        </div>
        <h1 style={styles.title}>Age Calculator.</h1>
        <p style={styles.desc}>
          জন্ম তারিখ দিয়ে সঠিক বয়স হিসাব করুন — বছর, মাস, দিন, এমনকি মোট ঘণ্টা পর্যন্ত! বাংলা ও ইংরেজি দুই ফরম্যাটেই ফলাফল।
        </p>

        {/* Input Card */}
        <div style={styles.card}>
          <label style={styles.label}>জন্ম তারিখ (Birth Date)</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={styles.input}
          />

          <label style={{ ...styles.label, marginTop: '20px' }}>কোন তারিখে বয়স হিসাব করবেন? (Age as of Date)</label>
          <input
            type="date"
            value={calcDate}
            onChange={(e) => setCalcDate(e.target.value)}
            style={styles.input}
          />

          <button onClick={calculateAge} style={styles.btnPrimary}>
            বয়স হিসাব করুন →
          </button>

          {error && <p style={{ color: 'var(--accent)', fontSize: '13px', textAlign: 'center', marginTop: '12px' }}>⚠ {error}</p>}
        </div>

        {/* Result */}
        {result && (
          <div style={styles.resultBox}>
            <p style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-muted)', textAlign: 'center' }}>
              আপনার সঠিক বয়স
            </p>
            <p style={styles.bigResult}>
              {result.years} বছর {result.months} মাস {result.days} দিন
            </p>
            <p style={{ fontSize: '18px', fontWeight: '700', textAlign: 'center', color: 'var(--fg-dim)' }}>
              {result.bn.years} বছর {result.bn.months} মাস {result.bn.days} দিন
            </p>

            {/* Stats Grid */}
            <div style={styles.statGrid}>
              <div style={styles.statCard}>
                <p style={styles.statNum}>{result.totalMonths}</p>
                <p style={styles.statLabel}>মোট মাস</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statNum}>{result.totalWeeks}</p>
                <p style={styles.statLabel}>মোট সপ্তাহ</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statNum}>{result.totalDays}</p>
                <p style={styles.statLabel}>মোট দিন</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statNum}>{result.totalHours.toLocaleString()}</p>
                <p style={styles.statLabel}>মোট ঘণ্টা</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statNum}>{result.totalMinutes.toLocaleString()}</p>
                <p style={styles.statLabel}>মোট মিনিট</p>
              </div>
              <div style={styles.statCard}>
                <p style={styles.statNum}>{result.daysToBirthday}</p>
                <p style={styles.statLabel}>জন্মদিন বাকি (দিন)</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '32px', padding: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', color: 'var(--fg-dim)', lineHeight: '1.8' }}>
          <strong style={{ color: 'var(--fg)' }}>📌 টিপস:</strong><br />
          • জন্ম তারিখ দিয়ে নিজের বয়স জানুন — ভর্তি ফরম, NID, পাসপোর্ট সব জায়গায় লাগবে।<br />
          • দ্বিতীয় তারিখের ঘরটা বদলালে যেকোনো ভবিষ্যৎ/অতীত তারিখে বয়স হিসাব করা যাবে।<br />
          • সব হিসাব আপনার ডিভাইসেই হয় — কোনো ডেটা সার্ভারে যায় না।
        </div>

      </div>
    </div>
  );
}