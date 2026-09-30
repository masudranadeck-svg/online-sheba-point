'use client';

export default function SubscriptionPage() {
  const whatsappNumber = "8801610205062";

  const plans = [
    { name: 'Basic', price: '১৯৯', duration: '১ মাস', features: ['১টি সাবস্ক্রিপশন', 'ইমেইল সাপোর্ট', 'বেসিক টুলস'], popular: false },
    { name: 'Standard', price: '৪৯৯', duration: '৩ মাস', features: ['৩টি সাবস্ক্রিপশন', 'প্রায়োরিটি সাপোর্ট', 'সব বেসিক', 'ডিসকাউন্ট'], popular: true },
    { name: 'Premium', price: '১৪৯৯', duration: '১২ মাস', features: ['আনলিমিটেড', '২৪/৭ সাপোর্ট', 'সব ফিচার', 'বড় ডিসকাউন্ট'], popular: false }
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 24px 64px 24px' }}>
        
        <div style={{ marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
            13 / Subscription
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' }}>Subscriptions.</h1>
          <p style={{ maxWidth: '28rem', color: 'var(--fg-dim)', marginTop: '24px', fontSize: '1rem', lineHeight: '1.6' }}>Premium streaming and software subscriptions at the best prices.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {plans.map((plan, i) => (
            <div 
              key={i} 
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(255,91,20,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = plan.popular ? 'var(--accent)' : 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ 
                position: 'relative', background: 'var(--bg-card)', padding: '32px', borderRadius: '8px', 
                border: plan.popular ? '1px solid var(--accent)' : '1px solid transparent', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>

              {plan.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#0a0a0b', padding: '4px 16px', borderRadius: '999px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Popular</div>
              )}

              <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>{plan.name}</h3>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', marginBottom: '24px' }}>{plan.duration}</p>
              <p style={{ fontSize: '40px', fontWeight: '800', color: 'var(--lime)', marginBottom: '24px', fontFamily: "'Syne', sans-serif" }}>৳{plan.price}<span style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>/মাস</span></p>
              
              <div style={{ marginBottom: '32px', flex: '1' }}>
                {plan.features.map((f, j) => (
                  <p key={j} style={{ fontSize: '14px', color: 'var(--fg-dim)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--lime)' }}>✓</span> {f}
                  </p>
                ))}
              </div>

              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`আসসালামু আলাইকুম, আমি ${plan.name} প্ল্যান নিতে চাই।`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'block', textAlign: 'center', padding: '14px', 
                  background: plan.popular ? 'var(--accent)' : 'transparent', 
                  color: plan.popular ? '#0a0a0b' : 'var(--accent)', 
                  border: plan.popular ? 'none' : '1px solid var(--accent)', 
                  textDecoration: 'none', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em',
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'
                }}
              >
                Subscribe Now →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}