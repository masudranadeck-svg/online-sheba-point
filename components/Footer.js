import Link from 'next/link';

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

      {/* Middle Section: Brand & Contact Info */}
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-center pb-12 border-t border-[var(--border)] pt-12">
        
        {/* Left: Brand & Disclaimer */}
        <div className="text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 justify-center md:justify-start mb-3">
            <div className="w-7 h-7 relative">
              <div className="absolute inset-0 border border-[var(--accent)] rotate-45"></div>
              <div className="absolute inset-1 bg-[var(--accent)] rotate-45"></div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-[var(--fg)]">ONLINE SHEBA POINT</span>
          </Link>
          <p className="text-sm text-[var(--fg-dim)] max-w-md mx-auto md:mx-0 leading-relaxed">
            ই-কমার্স, ফ্রিল্যান্সিং ও মাইক্রোজব কাজে নিরাপদ ও নির্ভরযোগ্য সেবা প্রদান করাই আমাদের লক্ষ্য। জুয়া, অর্থ পাচার, হারাম উৎসের অর্থ লেনদেন সম্পূর্ণ নিষিদ্ধ। Online Sheba Point সর্বদা দেশের আইন ও নৈতিকতার প্রতি শ্রদ্ধাশীল।
          </p>
        </div>
        
        {/* Right: Contact */}
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
      
      {/* Bottom Section: Copyright (নিচে মাঝখানে) */}
      <div className="w-full py-6 border-t border-[var(--border)]" style={{ background: 'var(--bg)' }}>
        <p className="text-center text-xs font-mono text-[var(--fg-dim)] uppercase tracking-[0.2em] font-semibold">
          © 2025 ONLINE SHEBA POINT / সমস্ত অধিকার সংরক্ষিত
        </p>
      </div>
    </footer>
  );
}