'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  // Support Form State
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

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

  // WhatsApp Submit Function
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportSubject || !supportMessage) {
      alert('সাবজেক্ট এবং মেসেজ দিন!');
      return;
    }
    const adminWhatsApp = '8801610205062'; // আপনার হোয়াটসঅ্যাপ নম্বর
    const messageText = `*Support Ticket from Online Sheba Point*%0A%0A*User:* ${user.email}%0A*Subject:* ${supportSubject}%0A*Message:* ${supportMessage}`;
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${messageText}`;
    
    // নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন করবে
    window.open(whatsappUrl, '_blank');
    
    // ফর্ম ক্লিয়ার করা
    setSupportSubject('');
    setSupportMessage('');
    alert('আপনার মেসেজটি হোয়াটসঅ্যাপে পাঠানো হচ্ছে...');
  };

  const services = [
    { name: 'Digital Shop', desc: 'Keys & Subscriptions', link: '/shop', icon: 'fa-solid fa-bag-shopping' },
    { name: 'Online Tools', desc: '30+ Premium Tools', link: '/online-tools', icon: 'fa-solid fa-screwdriver-wrench' },
    { name: 'Real Estate', desc: 'Buy, Sell & Rent', link: '/properties', icon: 'fa-solid fa-house' },
    { name: 'Marketplace', desc: 'Buy & Sell', link: '/marketplace', icon: 'fa-solid fa-store' },
    { name: 'Resell', desc: 'Old Products', link: '/resell', icon: 'fa-solid fa-recycle' },
    { name: 'Remote Jobs', desc: 'Find Work', link: '/remote-jobs', icon: 'fa-solid fa-briefcase' },
    { name: 'Dev Services', desc: 'Web & App', link: '/dev-services', icon: 'fa-solid fa-code' },
    { name: 'Online Sheba', desc: 'Solutions', link: '/online-sheba', icon: 'fa-solid fa-headset' },
    { name: 'Dollar Exchange', desc: 'Transfer', link: '/dollar-exchange', icon: 'fa-solid fa-dollar-sign' },
    { name: 'Cards', desc: 'Virtual', link: '/cards', icon: 'fa-solid fa-credit-card' },
    { name: 'Accounts', desc: 'Verified', link: '/accounts', icon: 'fa-solid fa-user-shield' },
    { name: 'Company', desc: 'Register', link: '/company-formation', icon: 'fa-solid fa-building' },
    { name: 'PC Solution', desc: 'Repair', link: '/pc-solution', icon: 'fa-solid fa-desktop' },
    { name: 'Subscription', desc: 'Streaming', link: '/subscription', icon: 'fa-solid fa-tv' },
    { name: 'Remote Service', desc: 'Unlock', link: '/remote', icon: 'fa-solid fa-satellite-dish' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fa-solid fa-gauge-high' },
    { id: 'orders', label: 'My Orders', icon: 'fa-solid fa-box' },
    { id: 'keys', label: 'My Keys', icon: 'fa-solid fa-key' },
    { id: 'profile', label: 'Profile', icon: 'fa-solid fa-user' },
    { id: 'support', label: 'Support', icon: 'fa-solid fa-headset' }
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
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
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

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-[var(--border)] pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all border ${
                activeTab === tab.id 
                  ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--bg-card)]' 
                  : 'border-transparent text-[var(--fg-muted)] hover:text-[var(--fg)]'
              }`}
            >
              <i className={tab.icon}></i> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg flex flex-col items-center text-center">
                  <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                  <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2">Total Orders</div>
                  <div className="font-display text-4xl font-bold text-[var(--fg)]">0</div>
                </div>
                <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg flex flex-col items-center text-center">
                  <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                  <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2">Active Keys</div>
                  <div className="font-display text-4xl font-bold text-[var(--lime)]">0</div>
                </div>
                <div className="relative bg-[var(--bg-card)] p-6 border border-[var(--border)] rounded-lg flex flex-col items-center text-center">
                  <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                  <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2">Account Status</div>
                  <div className="font-display text-xl font-bold text-[var(--accent)] uppercase tracking-widest">ACTIVE</div>
                </div>
              </div>

              <h3 className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-6 pb-2 border-b border-[var(--border)]">Quick Access</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {services.map((service, i) => (
                  <Link key={i} href={service.link} className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4)] group cursor-pointer">
                    <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}>
                      <i className={service.icon}></i>
                    </div>
                    <h4 className="font-display font-bold text-sm tracking-tight mb-1 text-[var(--fg)]">{service.name}</h4>
                    <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">{service.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 2. ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="relative bg-[var(--bg-card)] p-8 border border-[var(--border)] rounded-lg">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <div className="flex flex-col items-center text-center py-12">
                <i className="fa-solid fa-box-open text-5xl text-[var(--fg-muted)] mb-4"></i>
                <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-2">No Orders Yet</h3>
                <p className="text-sm text-[var(--fg-muted)] mb-6">You haven't placed any orders yet. Start exploring our digital shop!</p>
                <Link href="/shop" className="btn-primary">Browse Shop →</Link>
              </div>
            </div>
          )}

          {/* 3. KEYS TAB */}
          {activeTab === 'keys' && (
            <div className="relative bg-[var(--bg-card)] p-8 border border-[var(--border)] rounded-lg">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <div className="flex flex-col items-center text-center py-12">
                <i className="fa-solid fa-key text-5xl text-[var(--fg-muted)] mb-4"></i>
                <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-2">No Purchased Keys</h3>
                <p className="text-sm text-[var(--fg-muted)] mb-6">Your purchased software keys will appear here.</p>
                <Link href="/shop" className="btn-primary">Buy Keys →</Link>
              </div>
            </div>
          )}

          {/* 4. PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="relative bg-[var(--bg-card)] p-8 border border-[var(--border)] rounded-lg max-w-2xl mx-auto">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-8">Profile Settings</h3>
              <form className="flex flex-col gap-6">
                <div>
                  <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Phone Number</label>
                  <input type="text" className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" placeholder="01XXXXXXXXX" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Email (Read-only)</label>
                  <input type="email" value={user.email} disabled className="w-full bg-transparent border-b border-[var(--border)] py-3 text-[var(--fg-muted)] outline-none cursor-not-allowed" />
                </div>
                <button type="button" className="btn-primary w-fit mt-4">Update Profile →</button>
              </form>
            </div>
          )}

          {/* 5. SUPPORT TAB (WhatsApp Integration) */}
          {activeTab === 'support' && (
            <div className="relative bg-[var(--bg-card)] p-8 border border-[var(--border)] rounded-lg max-w-2xl mx-auto">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-2">Support Center</h3>
              <p className="text-sm text-[var(--fg-muted)] mb-8">Having trouble? Send us a message directly to our WhatsApp.</p>
              <form onSubmit={handleSupportSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Subject</label>
                  <input 
                    type="text" 
                    value={supportSubject}
                    onChange={(e) => setSupportSubject(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" 
                    placeholder="What's the issue?" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2 block">Message</label>
                  <textarea 
                    rows="4" 
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors resize-none" 
                    placeholder="Describe your problem..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-fit mt-4" style={{ background: '#25D366', color: '#000' }}>
                  <i className="fab fa-whatsapp mr-2"></i> Send to WhatsApp
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}