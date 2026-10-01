import Link from 'next/link';

// Golden & Orange Logo
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 5px rgba(255,91,20,0.5))' }}>
    <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="#ff5b14" strokeWidth="5" strokeLinejoin="round"/>
    <line x1="50" y1="50" x2="50" y2="20" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round"/>
    <line x1="50" y1="50" x2="76" y2="65" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round"/>
    <line x1="50" y1="50" x2="24" y2="65" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="12" fill="#ff5b14"/>
    <circle cx="50" cy="50" r="5" fill="#0a0a0b"/>
    <circle cx="50" cy="20" r="7" fill="#D4AF37"/>
    <circle cx="76" cy="65" r="7" fill="#D4AF37"/>
    <circle cx="24" cy="65" r="7" fill="#D4AF37"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)]" style={{ background: 'var(--bg-elev)' }}>
      
      {/* Top Section: Manifesto Quote */}
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-16 text-center">
        <blockquote className="font-display font-bold text-2xl sm:text-3xl lg:text-5xl leading-[1.1] tracking-tight">
          &quot;We don&apos;t just sell software. <br/>
          We engineer <span className="accent-underline">digital solutions</span> that <br/>
          <span className="text-[var(--accent)]">outlast the decade</span>.&quot;
        </blockquote>
      </div>

      {/* Middle Section: Contact Info */}
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-center pb-12 border-t border-[var(--border)] pt-12">
        
        <div className="text-center md:text-left">
          <Link href="/" className="flex items-center gap-3 justify-center md:justify-start mb-3">
            <Logo />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-[var(--fg)]">ONLINE SHEBA POINT</span>
              <span className="text-[9px] md:text-[10px] text-[var(--fg-muted)] tracking-[0.2em] uppercase font-mono mt-1">One Point. Infinite Solutions.</span>
            </div>
          </Link>
          <p className="text-sm text-[var(--fg-dim)] max-w-md mx-auto md:mx-0 leading-relaxed">
            ই-কমার্স, ফ্রিল্যান্সিং ও মাইক্রোজব কাজে নিরাপদ ও নির্ভরযোগ্য সেবা প্রদান করাই আমাদের লক্ষ্য। জুয়া, অর্থ পাচার, হারাম উৎসের অর্থ লেনদেন সম্পূর্ণ নিষিদ্ধ। Online Sheba Point সর্বদা দেশের আইন ও নৈতিকতার প্রতি শ্রদ্ধাশীল।
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-3">
          <h4 className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest">যোগাযোগ (CONTACT)</h4>
          <a href="tel:01610205062" className="text-sm text-[var(--fg-dim)] hover:text-[var(--accent)] transition flex items-center gap-2">
            <i className="fas fa-phone-alt text-[var(--accent)]"></i> 01610205062
          </a>
          <a href="mailto:masudranadeck@gmail.com" className="text-sm text-[var(--fg-dim)] hover:text-[var(--accent)] transition flex items-center gap-2">
            <i className="fas fa-envelope text-[var(--accent)]"></i> masudranadeck@gmail.com
          </a>
          <a href="https://wa.me/8801610205062" target="_blank" rel="noopener noreferrer" className="btn-primary !text-[11px] mt-2">
            <i className="fab fa-whatsapp"></i> WHATSAPP
          </a>
        </div>
      </div>
      
      {/* Bottom Section: Copyright */}
      <div className="w-full py-6 border-t border-[var(--border)]" style={{ background: 'var(--bg)' }}>
        <p className="text-center text-xs font-mono text-[var(--fg-dim)] uppercase tracking-[0.2em] font-semibold">
          © 2025 ONLINE SHEBA POINT / সমস্ত অধিকার সংরক্ষিত
        </p>
      </div>
    </footer>
  );
}