'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  // সব সার্ভিসের লিস্ট (হোম পেজের মতো)
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

  if (loading) {
    return (
      <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-[var(--fg-muted)] font-mono text-sm uppercase tracking-widest">Authenticating Session...</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <div className="section-eyebrow mb-4">01 / Control Center</div>
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">Dashboard.</h1>
            <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">
              Welcome back, <span className="text-[var(--accent)] font-mono">{user.email}</span>
            </p>
          </div>
          <button onClick={handleLogout} className="btn-ghost self-start lg:self-end">
            <i className="fas fa-power-off text-[10px] mr-2"></i> Disconnect
          </button>
        </div>

        {/* Quick Stats (Fixed Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg overflow-hidden">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 whitespace-nowrap">Total Orders</div>
            <div className="font-display text-4xl font-bold text-[var(--fg)]">0</div>
          </div>
          <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg overflow-hidden">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 whitespace-nowrap">Active Keys</div>
            <div className="font-display text-4xl font-bold text-[var(--lime)]">0</div>
          </div>
          <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg overflow-hidden">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 whitespace-nowrap">Account Status</div>
            <div className="font-display text-xl font-bold text-[var(--accent)] uppercase">ACTIVE</div>
          </div>
        </div>

        {/* Action Grid (All Services Added) */}
        <h3 className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-6 pb-2 border-b border-[var(--border)]">Quick Access</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, i) => (
            <Link 
              key={i} 
              href={service.link} 
              className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group cursor-pointer"
            >
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--accent-glow)]"
                style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}
              >
                <i className={service.icon}></i>
              </div>
              
              <h4 className="font-display font-bold text-sm tracking-tight mb-1 text-[var(--fg)]">{service.name}</h4>
              <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">{service.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}