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
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        {/* Header */}
        <div className="mb-16">
          <div className="section-eyebrow mb-4">06 / Dev Services</div>
          <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">Dev Services.</h1>
          <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">From websites to operating systems, we build the instruments of the next decade.</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {services.map((service, i) => (
            <div 
              key={i} 
              // এখানে Tailwind এর hover:shadow ক্লাস ব্যবহার করা হয়েছে নিয়ন গ্লো-র জন্য
              className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-8 flex flex-col transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group cursor-pointer"
            >
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}>
                <i className={service.icon}></i>
              </div>
              
              <h3 className="font-display font-bold text-xl tracking-tight mb-3 text-[var(--fg)]">{service.name}</h3>
              <p className="text-sm text-[var(--fg-muted)] mb-8 flex-grow leading-relaxed">{service.desc}</p>
              
              <div className="mt-auto pt-6 border-t border-[var(--border)]">
                <p className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-2">Starting Price</p>
                <p className="font-display font-bold text-lg text-[var(--lime)] mb-6">{service.price}</p>
                <button onClick={() => handleOrder(service.name)} className="btn-primary w-full justify-center">Request Quote →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Request CTA */}
        <div className="relative bg-[var(--bg-card)] p-8 md:p-12 rounded-lg border border-[var(--border)] text-center overflow-hidden grid-bg grid-fade">
          <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
          
          <div style={{ position: 'relative', zIndex: '2' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💡</div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-[var(--fg)]">Got a custom idea?</h2>
            <p className="text-[var(--fg-dim)] max-w-xl mx-auto mb-8">Game development, AI bots, cybersecurity tools, or any other software idea? Let's build it.</p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমার একটি কাস্টম সফটওয়্যার তৈরির আইডিয়া আছে।")}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              💬 Share on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}