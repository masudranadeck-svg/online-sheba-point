import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] pt-20 pb-10" style={{ background: 'var(--bg-elev)' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-center text-center lg:text-left">
        
        <div>
          <Link href="/" className="flex items-center gap-2 justify-center lg:justify-start mb-4">
            <div className="w-7 h-7 relative">
              <div className="absolute inset-0 border border-[var(--accent)] rotate-45"></div>
              <div className="absolute inset-1 bg-[var(--accent)] rotate-45"></div>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-[var(--fg)]">ONLINE SHEBA POINT</span>
          </Link>
          <p className="text-sm text-[var(--fg-dim)] max-w-xs mx-auto lg:mx-0">
            ডিজিটাল স্টোর, সফটওয়্যার কী এবং রিমোট সার্ভিসের সবচেয়ে নির্ভরযোগ্য প্ল্যাটফর্ম।
          </p>
        </div>
        
        <div className="flex flex-col items-center lg:items-end gap-4">
          <h4 className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest">যোগাযোগ (Contact)</h4>
          <div className="flex flex-col gap-2 text-sm text-[var(--fg-dim)]">
            <a href="tel:01610205062" className="hover:text-[var(--accent)] transition">📞 01610205062</a>
            <a href="mailto:masudranadeck@gmail.com" className="hover:text-[var(--accent)] transition">✉️ masudranadeck@gmail.com</a>
          </div>
          <a href="https://wa.me/8801610205062" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
      
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 mt-10 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="live-dot"></span> SYSTEMS OPERATIONAL
        </div>
        <div>© 2025 ONLINE SHEBA POINT / সমস্ত অধিকার সংরক্ষিত</div>
      </div>
    </footer>
  );
}