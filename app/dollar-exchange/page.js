'use client';

export default function DollarExchangePage() {
  const whatsappNumber = "8801610205062";
  
  const features = [
    { title: 'Secure Transactions', desc: 'End-to-end encrypted money transfers.', icon: 'fa-solid fa-shield-halved' },
    { title: 'Best Rates', desc: 'Competitive exchange rates in the market.', icon: 'fa-solid fa-chart-line' },
    { title: 'Fast Processing', desc: 'Instant transfer to your preferred wallet.', icon: 'fa-solid fa-bolt' },
    { title: '24/7 Support', desc: 'Dedicated support for every transaction.', icon: 'fa-solid fa-headset' }
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        <div className="mb-16">
          <div className="section-eyebrow mb-4">07 / Dollar Exchange</div>
          <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">Exchange.</h1>
          <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">Secure and fast dollar exchange services for freelancers and businesses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {features.map((f, i) => (
            <div key={i} className="relative bg-[var(--bg-card)] p-8 rounded-lg border border-transparent hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4)] transition-all duration-300 flex items-start gap-6">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--lime)' }}>
                <i className={f.icon}></i>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg tracking-tight mb-2 text-[var(--fg)]">{f.title}</h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Exchange CTA */}
        <div className="relative bg-[var(--bg-card)] p-8 md:p-12 rounded-lg border border-[var(--border)] text-center overflow-hidden">
          <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-[var(--fg)]">Ready to Exchange?</h2>
          <p className="text-[var(--fg-dim)] max-w-xl mx-auto mb-8">Contact us on WhatsApp for current rates and instant processing.</p>
          <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমি ডলার এক্সচেঞ্জ করতে চাই। বর্তমান রেট কত?")}`} target="_blank" rel="noopener noreferrer" className="btn-primary">💬 Contact on WhatsApp</a>
        </div>
      </div>
    </div>
  );
}