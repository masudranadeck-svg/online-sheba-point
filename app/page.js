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

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden' }}>
      
      {/* TOP NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-[var(--border)]">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 relative">
                <div className="absolute inset-0 border border-[var(--accent)] rotate-45"></div>
                <div className="absolute inset-1 bg-[var(--accent)] rotate-45"></div>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">ONLINE SHEBA POINT</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/shop" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Shop</Link>
              <Link href="/online-tools" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Tools</Link>
              <Link href="/properties" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Real Estate</Link>
              <Link href="/dashboard" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Dashboard</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="btn-primary !py-2 !px-4 text-[11px]">Login / Register</Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-16 overflow-hidden grid-bg">
        <div className="floor-grid"></div>
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px] pointer-events-none"></div>
        
        {/* Status Bar */}
        <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 pt-6 flex items-center justify-between text-[11px] font-mono text-[var(--fg-muted)]">
          <div className="flex items-center gap-3">
            <span className="live-dot"></span>
            <span>SYSTEM ONLINE / 30+ TOOLS ACTIVE</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>LAT 23.8103° N</span>
            <span>LON 90.4125° E</span>
            <span>{time}</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-20">
          
          {/* Left: Copy */}
          <div className="relative z-10">
            <div className="section-eyebrow mb-8">01 / Digital Ecosystem</div>
            <h1 className="hero-h1 font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[.95] tracking-tight">
              <span className="word" style={{animationDelay:'.1s'}}>Tomorrow's</span><br/>
              <span className="word" style={{animationDelay:'.3s'}}>digital store,</span><br/>
              <span className="word accent-underline" style={{animationDelay:'.5s'}}>today.</span>
            </h1>
            <p className="mt-8 max-w-md text-[var(--fg-dim)] text-base leading-relaxed">
              Software keys, premium subscriptions, remote unlock services, and 30+ free professional online tools. Everything you need for your digital life, engineered for speed and security.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/shop" className="btn-primary">Explore Shop →</Link>
              <Link href="/online-tools" className="btn-ghost">Access Free Tools</Link>
            </div>
          </div>

          {/* Right: Orb Visual (Fixed Layout) */}
          <div className="relative hidden md:block mt-10 lg:mt-0">
            <div className="orb-wrap" style={{maxWidth: '450px', margin: '0 auto'}}>
              <div className="ring r1"></div>
              <div className="ring r2"></div>
              <div className="ring r3"></div>
              <div className="orb-core"></div>
              <div className="orb-hilight"></div>
              
              {/* Floating Tech Stats (Repositioned to be fully visible) */}
              <div className="float-tag" style={{top:'5%',left:'0%',animationDelay:'0s'}}>
                <div className="text-[var(--fg-muted)] mb-1">[01]</div>
                <div className="font-semibold">Online Tools</div>
                <div className="text-[var(--accent)] font-mono">30+ Free</div>
              </div>
              <div className="float-tag" style={{top:'40%',right:'0%',animationDelay:'1.5s'}}>
                <div className="text-[var(--fg-muted)] mb-1">[02]</div>
                <div className="font-semibold">Instant Delivery</div>
                <div className="text-[var(--accent)] font-mono">Software Keys</div>
              </div>
              <div className="float-tag" style={{bottom:'5%',left:'5%',animationDelay:'3s'}}>
                <div className="text-[var(--fg-muted)] mb-1">[03]</div>
                <div className="font-semibold">Secure Payment</div>
                <div className="text-[var(--accent)] font-mono">bKash / Nagad</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-t border-b border-[var(--border)] py-4 overflow-hidden">
          <div className="marquee text-sm font-mono text-[var(--fg-dim)] uppercase tracking-widest">
            <div className="flex gap-12 items-center">
              <span>Software Keys</span><span className="text-[var(--accent)]">◆</span>
              <span>Remote Unlock</span><span className="text-[var(--accent)]">◆</span>
              <span>Premium Subscriptions</span><span className="text-[var(--accent)]">◆</span>
              <span>Real Estate</span><span className="text-[var(--accent)]">◆</span>
              <span>30+ Free Tools</span><span className="text-[var(--accent)]">◆</span>
              <span>Doc Scanner</span><span className="text-[var(--accent)]">◆</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div className="section-eyebrow mb-4">02 / Services</div>
              <h2 className="font-display font-bold text-5xl lg:text-7xl leading-none">The full<br/>arsenal.</h2>
            </div>
            <p className="max-w-sm text-[var(--fg-dim)] mt-6 lg:mt-0">
              A complete digital ecosystem designed to accelerate your workflow and secure your digital assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
            
            {/* Card 1: Shop */}
            <Link href="/shop" className="product-card group block">
              <div className="visual">
                <div className="glow"></div>
                <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="pv-orb"></div>
                </div>
              </div>
              <div className="p-5 border-t border-[var(--border)]">
                <h3 className="font-display font-bold text-sm tracking-tight mb-1">Digital Shop</h3>
                <p className="text-xs text-[var(--fg-muted)] mb-4">Software keys, subscriptions & more.</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--lime)]">EXPLORE →</span>
                </div>
              </div>
            </Link>

            {/* Card 2: Tools */}
            <Link href="/online-tools" className="product-card group block">
              <div className="visual">
                <div className="glow"></div>
                <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="pv-cube"></div>
                </div>
              </div>
              <div className="p-5 border-t border-[var(--border)]">
                <h3 className="font-display font-bold text-sm tracking-tight mb-1">Online Tools</h3>
                <p className="text-xs text-[var(--fg-muted)] mb-4">30+ premium tools for free.</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--lime)]">EXPLORE →</span>
                </div>
              </div>
            </Link>

            {/* Card 3: Real Estate */}
            <Link href="/properties" className="product-card group block">
              <div className="visual">
                <div className="glow"></div>
                <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="pv-frame"></div>
                </div>
              </div>
              <div className="p-5 border-t border-[var(--border)]">
                <h3 className="font-display font-bold text-sm tracking-tight mb-1">Real Estate</h3>
                <p className="text-xs text-[var(--fg-muted)] mb-4">Buy, sell, and rent properties.</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--lime)]">EXPLORE →</span>
                </div>
              </div>
            </Link>

            {/* Card 4: Remote Service */}
            <Link href="/remote" className="product-card group block">
              <div className="visual">
                <div className="glow"></div>
                <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="pv-lens"></div>
                </div>
              </div>
              <div className="p-5 border-t border-[var(--border)]">
                <h3 className="font-display font-bold text-sm tracking-tight mb-1">Remote Services</h3>
                <p className="text-xs text-[var(--fg-muted)] mb-4">Phone unlock & remote support.</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--lime)]">EXPLORE →</span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* MANIFESTO / STATS */}
      <section className="relative py-24 lg:py-32 border-t border-[var(--border)] overflow-hidden grid-bg grid-fade">
        <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] mb-20">
            <div className="bg-[var(--bg)] p-8">
              <div className="stat-num text-6xl lg:text-7xl">30+</div>
              <div className="mt-3 text-xs font-mono text-[var(--fg-muted)] uppercase tracking-widest">Free Tools</div>
            </div>
            <div className="bg-[var(--bg)] p-8">
              <div className="stat-num text-6xl lg:text-7xl">100%</div>
              <div className="mt-3 text-xs font-mono text-[var(--fg-muted)] uppercase tracking-widest">Secure Payment</div>
            </div>
            <div className="bg-[var(--bg)] p-8">
              <div className="stat-num text-6xl lg:text-7xl">24/7</div>
              <div className="mt-3 text-xs font-mono text-[var(--fg-muted)] uppercase tracking-widest">Support</div>
            </div>
            <div className="bg-[var(--bg)] p-8">
              <div className="stat-num text-6xl lg:text-7xl">500+</div>
              <div className="mt-3 text-xs font-mono text-[var(--fg-muted)] uppercase tracking-widest">Happy Clients</div>
            </div>
          </div>

          <div className="text-center">
            <div className="section-eyebrow justify-center mb-8 inline-flex">03 / Manifesto</div>
            <blockquote className="font-display font-bold text-3xl sm:text-4xl lg:text-6xl leading-[1.1] tracking-tight">
              "We don't just sell software. <br/>
              We engineer <span className="accent-underline">digital solutions</span> that <br/>
              <span className="text-[var(--accent)]">outlast the decade</span>."
            </blockquote>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-[var(--border)] pt-20 pb-10">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10 text-center text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="live-dot"></span> SYSTEMS OPERATIONAL
          </div>
          <div>© 2025 ONLINE SHEBA POINT / ALL RIGHTS RESERVED</div>
        </div>
      </footer>

    </div>
  );
}