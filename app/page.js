'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2,'0');
      const m = String(now.getMinutes()).padStart(2,'0');
      const s = String(now.getSeconds()).padStart(2,'0');
      setTime(`${h}:${m}:${s}`);
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(timer);
  }, []);

  const services = [
    { name: 'Digital Shop', desc: 'Keys & Subscriptions', link: '/shop', icon: 'fa-solid fa-bag-shopping' },
    { name: 'Online Tools', desc: '30+ Premium Tools', link: '/online-tools', icon: 'fa-solid fa-screwdriver-wrench' },
    { name: 'Real Estate', desc: 'Buy, Sell & Rent', link: '/properties', icon: 'fa-solid fa-house' },
    { name: 'Marketplace', desc: 'Buy & Sell Services', link: '/marketplace', icon: 'fa-solid fa-store' },
    { name: 'Resell', desc: 'Old Products', link: '/resell', icon: 'fa-solid fa-recycle' },
    { name: 'Remote Jobs', desc: 'Find Remote Work', link: '/remote-jobs', icon: 'fa-solid fa-briefcase' },
    { name: 'Dev Services', desc: 'Web & App Dev', link: '/dev-services', icon: 'fa-solid fa-code' },
    { name: 'Online Sheba', desc: 'Digital Solutions', link: '/online-sheba', icon: 'fa-solid fa-headset' },
    { name: 'Dollar Exchange', desc: 'Secure Transfer', link: '/dollar-exchange', icon: 'fa-solid fa-dollar-sign' },
    { name: 'Cards', desc: 'Virtual & Physical', link: '/cards', icon: 'fa-solid fa-credit-card' },
    { name: 'Accounts', desc: 'Verified Accounts', link: '/accounts', icon: 'fa-solid fa-user-shield' },
    { name: 'Company', desc: 'Business Register', link: '/company-formation', icon: 'fa-solid fa-building' },
    { name: 'PC Solution', desc: 'Computer Repair', link: '/pc-solution', icon: 'fa-solid fa-desktop' },
    { name: 'Subscription', desc: 'Streaming & Software', link: '/subscription', icon: 'fa-solid fa-tv' },
    { name: 'Remote Service', desc: 'Phone Unlock', link: '/remote', icon: 'fa-solid fa-satellite-dish' }
  ];

  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden' },
    wrapper: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    title: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' },
    btnGhost: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border-bright)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' },
    card: { position: 'relative', background: 'var(--bg-card)', border: '1px solid transparent', borderRadius: '8px', padding: '24px', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
    corner: (pos) => ({ position: 'absolute', width: '14px', height: '14px', borderColor: 'var(--accent)', ...pos }),
    serviceIcon: { width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px', background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.borderColor = 'var(--accent)';
    e.currentTarget.style.boxShadow = '0 0 25px rgba(255,91,20,0.4)';
    e.currentTarget.style.transform = 'translateY(-4px)';
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.borderColor = 'transparent';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <div style={styles.container}>
      
      {/* HERO SECTION */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', backgroundImage: 'linear-gradient(rgba(255,91,20,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,91,20,0.15) 1px, transparent 1px)', backgroundSize: '60px 60px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'center top', maskImage: 'linear-gradient(to bottom, black, transparent 80%)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 80%)' }}></div>
        
        <div style={styles.wrapper} className="grid lg:grid-cols-2 gap-12 items-center w-full pt-24 pb-12">
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={styles.eyebrow}>
              <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
              01 / Digital Ecosystem
            </div>
            <h1 style={styles.title}>
              Tomorrow&apos;s<br/>
              digital store,<br/>
              <span style={{ backgroundImage: 'linear-gradient(var(--accent), var(--accent))', backgroundSize: '100% 6px', backgroundRepeat: 'no-repeat', backgroundPosition: '0 88%' }}>today.</span>
            </h1>
            <p style={{ marginTop: '24px', maxWidth: '28rem', color: 'var(--fg-dim)', fontSize: '16px', lineHeight: '1.6' }}>
              Software keys, premium subscriptions, remote unlock services, and 30+ free professional online tools. Everything you need for your digital life, engineered for speed and security.
            </p>
            <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/shop" style={styles.btnPrimary}>Explore Shop →</Link>
              <Link href="/online-tools" style={styles.btnGhost}>Access Free Tools</Link>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hidden md:flex">
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: 1 }}>
              <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--border-bright)', borderRadius: '50%', animation: 'spin 20s linear infinite' }}></div>
              <div style={{ position: 'absolute', inset: '10%', border: '1px solid rgba(255,91,20,0.2)', borderRadius: '50%', animation: 'spin 30s linear infinite reverse' }}></div>
              <div style={{ position: 'absolute', inset: '20%', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '50%', animation: 'spin 25s linear infinite' }}></div>
              <div style={{ position: 'absolute', inset: '28%', borderRadius: '50%', background: 'radial-gradient(circle at 32% 28%, #ffb98a 0%, #ff7a3a 25%, #ff5b14 45%, #a8350a 75%, #3a1003 100%)', boxShadow: '0 0 80px rgba(255,91,20,0.4), 0 0 160px rgba(255,91,20,0.4), inset -15px -25px 60px rgba(0,0,0,0.5), inset 8px 12px 30px rgba(255,255,255,0.15)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTED STATS BAR */}
      <section style={{ background: 'var(--bg-elev)', borderBottom: '1px solid var(--border)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>100%</div>
            <div style={{ fontSize: '11px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", marginTop: '8px' }}>Customer Satisfaction</div>
          </div>
          <div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>24/7 365</div>
            <div style={{ fontSize: '11px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", marginTop: '8px' }}>Dedicated Support</div>
          </div>
          <div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>100%</div>
            <div style={{ fontSize: '11px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", marginTop: '8px' }}>System Uptime</div>
          </div>
        </div>
      </section>

      {/* NEW: BRIEF DESCRIPTION (জন্ম থেকে মৃত্যু পর্যন্ত) */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={styles.eyebrow}>
            <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
            02 / Our Vision
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--fg)', fontFamily: "'Syne', sans-serif", marginBottom: '24px' }}>
            এক পয়েন্ট, অসীম সমাধান।
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--fg-dim)', lineHeight: '1.8' }}>
            "Online Sheba Point" একটি সমন্বিত ডিজিটাল ইকোসিস্টেম। <span style={{ color: 'var(--accent)', fontWeight: '600' }}>জন্ম থেকে মৃত্যু পর্যন্ত একজন মানুষের অনলাইন সম্পর্কিত সব ধরনের দরকার পূরণের লক্ষ্যে</span> আমরা এই প্ল্যাটফর্ম তৈরি করেছি। শিশুর জন্ম নিবন্ধন থেকে শুরু করে শিক্ষা, ক্যারিয়ার, বিয়ে, ব্যবসা এবং জীবনের শেষ পর্যন্ত প্রয়োজনীয় সব অনলাইন সেবা এখন এক ঠিকানায়।
          </p>
        </div>
      </section>

      {/* ALL SERVICES GRID */}
      <section style={{ padding: '0 24px 80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={styles.eyebrow}>
              <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
              03 / Services
            </div>
            <h2 style={styles.title}>The Full Arsenal.</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {services.map((service, i) => (
              <Link 
                key={i} 
                href={service.link} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={styles.card}
              >
                <div style={styles.corner({top: '8px', left: '8px', borderTop: '1px solid', borderLeft: '1px solid'})}></div>
                <div style={styles.corner({top: '8px', right: '8px', borderTop: '1px solid', borderRight: '1px solid'})}></div>
                <div style={styles.corner({bottom: '8px', left: '8px', borderBottom: '1px solid', borderLeft: '1px solid'})}></div>
                <div style={styles.corner({bottom: '8px', right: '8px', borderBottom: '1px solid', borderRight: '1px solid'})}></div>
                
                <div style={styles.serviceIcon}>
                  <i className={service.icon}></i>
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--fg)', fontFamily: "'Syne', sans-serif", marginBottom: '4px' }}>{service.name}</h3>
                <p style={{ fontSize: '11px', color: 'var(--fg-muted)' }}>{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}