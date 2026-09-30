'use client';

export default function PcSolutionPage() {
  const whatsappNumber = "8801610205062";

  const services = [
    { name: 'OS Installation', desc: 'Windows, Linux, or macOS installation and activation.', icon: 'fa-solid fa-compact-disc' },
    { name: 'Driver & Software', desc: 'All driver setup and essential software installation.', icon: 'fa-solid fa-download' },
    { name: 'Virus Removal', desc: 'Complete virus scan and system optimization.', icon: 'fa-solid fa-shield-virus' },
    { name: 'Data Recovery', desc: 'Recover lost files from hard drives and SSDs.', icon: 'fa-solid fa-database' },
    { name: 'Hardware Upgrade', desc: 'RAM, SSD, GPU installation and optimization.', icon: 'fa-solid fa-microchip' },
    { name: 'Network Setup', desc: 'Internet and LAN configuration and troubleshooting.', icon: 'fa-solid fa-network-wired' }
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        <div className="mb-16">
          <div className="section-eyebrow mb-4">08 / PC Solution</div>
          <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">PC Solution.</h1>
          <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">Complete computer and laptop repair services. Hardware and software solutions.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {services.map((service, i) => (
            <div key={i} className="relative bg-[var(--bg-card)] p-6 rounded-lg border border-transparent hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4)] transition-all duration-300 flex flex-col items-center text-center">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}>
                <i className={service.icon}></i>
              </div>
              <h3 className="font-display font-bold text-base tracking-tight mb-2 text-[var(--fg)]">{service.name}</h3>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="relative bg-[var(--bg-card)] p-8 md:p-12 rounded-lg border border-[var(--border)] text-center overflow-hidden grid-bg grid-fade">
          <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-[var(--fg)]">Need PC Repair?</h2>
          <p className="text-[var(--fg-dim)] max-w-xl mx-auto mb-8">Remote support or onsite visit. Get your PC fixed today.</p>
          <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমার পিসিতে সমস্যা হয়েছে। সার্ভিস দরকার।")}`} target="_blank" rel="noopener noreferrer" className="btn-primary">💬 Get Support</a>
        </div>
      </div>
    </div>
  );
}