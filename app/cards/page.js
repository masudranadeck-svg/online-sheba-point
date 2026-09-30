'use client';

export default function CardsPage() {
  const whatsappNumber = "8801610205062";

  const cards = [
    { name: 'Virtual Mastercard', desc: 'For international online payments and subscriptions.', icon: 'fa-solid fa-credit-card' },
    { name: 'Virtual Visa Card', desc: 'Secure and instant virtual visa card.', icon: 'fa-solid fa-cc-visa' },
    { name: 'Physical Cards', desc: 'Customized physical debit/credit cards.', icon: 'fa-solid fa-wallet' },
    { name: 'Gift Cards', desc: 'Amazon, Google Play, iTunes, Steam and more.', icon: 'fa-solid fa-gift' }
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 24px 64px 24px' }}>
        
        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
            10 / Cards
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' }}>Cards.</h1>
          <p style={{ maxWidth: '28rem', color: 'var(--fg-dim)', marginTop: '24px', fontSize: '1rem', lineHeight: '1.6' }}>Virtual and physical cards for all your digital payment needs.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {cards.map((card, i) => (
            <div 
              key={i} 
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(255,91,20,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ 
                position: 'relative', background: 'var(--bg-card)', padding: '32px', borderRadius: '8px', 
                border: '1px solid transparent', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>

              <div style={{ width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '24px', background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}>
                <i className={card.icon}></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>{card.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--fg-muted)', marginBottom: '24px', flex: '1', lineHeight: '1.6' }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', background: 'var(--bg-card)', padding: '48px 24px', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center', overflow: 'hidden', backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,91,20,0.1) 0%, transparent 60%)' }}>
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>

          <div style={{ position: 'relative', zIndex: '2', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>Get Your Card</h2>
            <p style={{ color: 'var(--fg-dim)', maxWidth: '500px', margin: '0 0 32px 0', fontSize: '16px', lineHeight: '1.6' }}>Order your virtual or physical card today via WhatsApp.</p>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমার একটি ভার্চুয়াল কার্ড দরকার।")}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '14px 28px', background: 'var(--accent)', color: '#0a0a0b', textDecoration: 'none', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>💬 Order Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}