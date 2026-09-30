'use client';

export default function DevServicesPage() {
  const whatsappNumber = "8801610205062";

  const services = [
    { name: 'Website Development', desc: 'E-commerce, Portfolio, Business, Custom Web Application ও হাই-সিকিউরিটি ওয়েবসাইট তৈরি।', price: '১০,০০০ টাকা থেকে শুরু', icon: 'fa-solid fa-laptop-code' },
    { name: 'App Development', desc: 'Android ও iOS এর জন্য প্রফেশনাল মোবাইল অ্যাপ্লিকেশন তৈরি।', price: '১৫,০০০ টাকা থেকে শুরু', icon: 'fa-solid fa-mobile-screen' },
    { name: 'OS & Software Dev', desc: 'নতুন অপারেটিং সিস্টেম, কাস্টম সফটওয়্যার বা সিস্টেম লেভেলের টুল তৈরি।', price: '২৫,০০০ টাকা থেকে শুরু', icon: 'fa-solid fa-microchip' }
  ];

  const handleOrder = (serviceTitle) => {
    const msg = `আসসালামু আলাইকুম। আমি "${serviceTitle}" সার্ভিসটি নিতে আগ্রহী। অনুগ্রহ করে বিস্তারিত এবং কাস্টম কোটেশন জানাবেন।`;
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  // Inline Hover Effect Function (গ্লো ইফেক্ট এর জন্য)
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
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 24px 64px 24px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
            06 / Dev Services
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' }}>Dev Services.</h1>
          <p style={{ maxWidth: '28rem', color: 'var(--fg-dim)', marginTop: '24px', fontSize: '1rem', lineHeight: '1.6' }}>From websites to operating systems, we build the instruments of the next decade.</p>
        </div>

        {/* Services Grid (100% CSS Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {services.map((service, i) => (
            <div 
              key={i} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ 
                position: 'relative',
                background: 'var(--bg-card)', 
                padding: '32px', 
                borderRadius: '8px', 
                border: '1px solid transparent', 
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Corner Markers */}
              <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>

              {/* Icon */}
              <div style={{ 
                width: '64px', height: '64px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '24px',
                background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)'
              }}>
                <i className={service.icon}></i>
              </div>
              
              {/* Content */}
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>{service.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--fg-muted)', marginBottom: '32px', flex: '1', lineHeight: '1.6' }}>{service.desc}</p>
              
              {/* Footer */}
              <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Starting Price</p>
                <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--lime)', marginBottom: '24px' }}>{service.price}</p>
                <button 
                  onClick={() => handleOrder(service.name)} 
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    background: 'var(--accent)', 
                    color: '#0a0a0b', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontWeight: '700', 
                    fontSize: '12px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em', 
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'var(--lime)'}
                  onMouseLeave={(e) => e.target.style.background = 'var(--accent)'}
                >
                  Request Quote →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Request CTA (Fixed Layout) */}
        <div style={{ 
          position: 'relative',
          background: 'var(--bg-card)', 
          padding: '48px 24px', 
          borderRadius: '8px', 
          border: '1px solid var(--border)', 
          textAlign: 'center', 
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,91,20,0.1) 0%, transparent 60%)'
        }}>
          {/* Corner Markers */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>

          <div style={{ position: 'relative', zIndex: '2', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💡</div>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>Got a custom idea?</h2>
            <p style={{ color: 'var(--fg-dim)', maxWidth: '500px', margin: '0 0 32px 0', fontSize: '16px', lineHeight: '1.6' }}>Game development, AI bots, cybersecurity tools, or any other software idea? Let's build it.</p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমার একটি কাস্টম সফটওয়্যার তৈরির আইডিয়া আছে।")}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block',
                padding: '14px 28px', 
                background: 'var(--accent)', 
                color: '#0a0a0b', 
                textDecoration: 'none', 
                fontWeight: '700', 
                fontSize: '12px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.08em',
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'
              }}
            >
              💬 Share on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}