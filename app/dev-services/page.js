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

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', paddingTop: '96px', paddingBottom: '64px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-eyebrow" style={{ marginBottom: '16px' }}>06 / Dev Services</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '700', lineHeight: '1', margin: '0' }}>Dev Services.</h1>
          <p style={{ maxWidth: '28rem', color: 'var(--fg-dim)', marginTop: '24px', fontSize: '1rem' }}>From websites to operating systems, we build the instruments of the next decade.</p>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '64px' }}>
          {services.map((service, i) => (
            <div 
              key={i} 
              className="relative bg-[var(--bg-card)]" 
              style={{ 
                padding: '32px', 
                borderRadius: '8px', 
                border: '1px solid transparent', 
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(255,91,20,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              
              <div 
                style={{ 
                  width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '24px',
                  background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)'
                }}
              >
                <i className={service.icon}></i>
              </div>
              
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: 'var(--fg)' }}>{service.name}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', marginBottom: '32px', flex: '1', lineHeight: '1.6' }}>{service.desc}</p>
              
              <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Starting Price</p>
                <p style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--lime)', marginBottom: '24px' }}>{service.price}</p>
                <button onClick={() => handleOrder(service.name)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Request Quote →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Request CTA */}
        <div 
          className="relative bg-[var(--bg-card)]" 
          style={{ 
            padding: '48px', 
            borderRadius: '8px', 
            border: '1px solid var(--border)', 
            textAlign: 'center', 
            overflow: 'hidden',
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,91,20,0.05) 0%, transparent 60%)'
          }}
        >
          <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
          
          <div style={{ position: 'relative', zIndex: '2' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💡</div>
            <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px', color: 'var(--fg)' }}>Got a custom idea?</h2>
            <p style={{ color: 'var(--fg-dim)', maxWidth: '36rem', margin: '0 auto 32px auto', fontSize: '1rem', lineHeight: '1.6' }}>Game development, AI bots, cybersecurity tools, or any other software idea? Let's build it.</p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমার একটি কাস্টম সফটওয়্যার তৈরির আইডিয়া আছে।")}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
              style={{ display: 'inline-flex', margin: '0 auto' }}
            >
              💬 Share on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}