'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Font Awesome CDN load করার জন্য
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2,'0');
      const m = String(now.getMinutes()).padStart(2,'0');
      const s = String(now.getSeconds()).padStart(2,'0');
      setTime(`${h}:${m}:${s}`);
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();
    
    return () => {
      clearInterval(timer);
      document.head.removeChild(link);
    };
  }, []);

  // সব সার্ভিসের লিস্ট
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

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden' }}>
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-16 overflow-hidden grid-bg flex flex-col justify-center">
        <div className="floor-grid"></div>
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px] pointer-events-none"></div>
        
        {/* Status Bar */}
        <div className="relative max-w-[1480px] mx-auto w-full px-6 lg:px-10 pt-6 flex items-center justify-between text-[11px] font-mono text-[var(--fg-muted)]">
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

        {/* Hero Content Wrapper */}
        <div className="relative max-w-[1480px] mx-auto w-full px-6 lg:px-10 grid lg:grid-cols-2 gap-8 items-center py-10 lg:py-16 flex-1">
          
          {/* Left: Copy */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="section-eyebrow mb-8 justify-center lg:justify-start">01 / Digital Ecosystem</div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[.95] tracking-tight">
              Tomorrow&apos;s<br/>
              digital store,<br/>
              <span className="accent-underline">today.</span>
            </h1>
            
            <p className="mt-8 max-w-md mx-auto lg:mx-0 text-[var(--fg-dim)] text-base leading-relaxed">
              Software keys, premium subscriptions, remote unlock services, and 30+ free professional online tools. Everything you need for your digital life, engineered for speed and security.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <Link href="/shop" className="btn-primary">Explore Shop →</Link>
              <Link href="/online-tools" className="btn-ghost">Access Free Tools</Link>
            </div>
          </div>

          {/* Right: Orb Visual */}
          <div className="relative hidden md:flex justify-center items-center w-full py-10">
            <div className="orb-wrap" style={{maxWidth: '400px', width: '100%'}}>
              <div className="ring r1"></div>
              <div className="ring r2"></div>
              <div className="ring r3"></div>
              <div className="orb-core"></div>
              <div className="orb-hilight"></div>
              
              <div className="float-tag" style={{top:'0%',left:'0%',animationDelay:'0s'}}>
                <div className="text-[var(--fg-muted)] mb-1">[01]</div>
                <div className="font-semibold">Online Tools</div>
                <div className="text-[var(--accent)] font-mono">30+ Free</div>
              </div>
              <div className="float-tag" style={{top:'45%',right:'0%',animationDelay:'1.5s'}}>
                <div className="text-[var(--fg-muted)] mb-1">[02]</div>
                <div className="font-semibold">Instant Delivery</div>
                <div className="text-[var(--accent)] font-mono">Software Keys</div>
              </div>
              <div className="float-tag" style={{bottom:'0%',left:'5%',animationDelay:'3s'}}>
                <div className="text-[var(--fg-muted)] mb-1">[03]</div>
                <div className="font-semibold">Secure Payment</div>
                <div className="text-[var(--accent)] font-mono">bKash / Nagad</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-t border-b border-[var(--border)] py-4 overflow-hidden mt-auto">
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

      {/* HIGHLIGHTED STATS BAR */}
      <section className="relative py-12 border-b border-[var(--border)]" style={{ background: 'var(--bg-elev)' }}>
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="stat-num text-4xl lg:text-5xl mb-2">100%</div>
            <div className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-widest">Customer Satisfaction</div>
          </div>
          <div className="md:border-l md:border-r border-[var(--border)]">
            <div className="stat-num text-4xl lg:text-5xl mb-2">24/7 365</div>
            <div className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-widest">Dedicated Support</div>
          </div>
          <div>
            <div className="stat-num text-4xl lg:text-5xl mb-2">100%</div>
            <div className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-widest">System Uptime</div>
          </div>
        </div>
      </section>

      {/* ALL SERVICES GRID (Icons Fixed) */}
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

          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-[var(--border)]">
            {services.map((service, i) => (
              <Link 
                key={i} 
                href={service.link} 
                className="relative bg-[var(--bg-card)] p-6 flex flex-col items-center text-center transition-all hover:bg-[var(--bg-elev)] group"
              >
                {/* Corner markers */}
                <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                
                {/* Icon Container (Fixed Styling) */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: 'var(--bg)', 
                    border: '1px solid var(--border-bright)',
                    color: 'var(--accent)',
                    boxShadow: 'inset 0 0 10px rgba(255, 91, 20, 0.1)'
                  }}
                >
                  <i className={service.icon}></i>
                </div>
                
                {/* Text */}
                <h3 className="font-display font-bold text-sm tracking-tight mb-1 text-[var(--fg)]">{service.name}</h3>
                <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}