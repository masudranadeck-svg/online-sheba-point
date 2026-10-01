'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Updated Logo (Soft White & Orange)
const Logo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 5px rgba(255,91,20,0.5))', marginBottom: '4px' }}>
      {/* Outer Hexagon */}
      <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="#ff5b14" strokeWidth="5" strokeLinejoin="round"/>
      {/* Connecting Lines (Soft White) */}
      <line x1="50" y1="50" x2="50" y2="20" stroke="#f1ece1" strokeWidth="4" strokeLinecap="round"/>
      <line x1="50" y1="50" x2="76" y2="65" stroke="#f1ece1" strokeWidth="4" strokeLinecap="round"/>
      <line x1="50" y1="50" x2="24" y2="65" stroke="#f1ece1" strokeWidth="4" strokeLinecap="round"/>
      {/* Center Hub (The Point) */}
      <circle cx="50" cy="50" r="12" fill="#ff5b14"/>
      <circle cx="50" cy="50" r="5" fill="#0a0a0b"/>
      {/* Outer Nodes (Soft White) */}
      <circle cx="50" cy="20" r="7" fill="#f1ece1"/>
      <circle cx="76" cy="65" r="7" fill="#f1ece1"/>
      <circle cx="24" cy="65" r="7" fill="#f1ece1"/>
    </svg>
  </div>
);

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
    setOpenMenu(false);
  };

  const mainLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/online-tools', label: 'Tools' },
    { href: '/properties', label: 'Real Estate' },
    { href: '/dashboard', label: 'Dashboard' }
  ];

  const moreLinks = [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/resell', label: 'Resell' },
    { href: '/remote-jobs', label: 'Remote Jobs' },
    { href: '/dev-services', label: 'Dev Services' },
    { href: '/online-sheba', label: 'Online Sheba' },
    { href: '/dollar-exchange', label: 'Dollar Exchange' },
    { href: '/cards', label: 'Cards' },
    { href: '/accounts', label: 'Accounts' },
    { href: '/company-formation', label: 'Company Formation' },
    { href: '/pc-solution', label: 'PC Solution' },
    { href: '/subscription', label: 'Subscription' },
    { href: '/remote', label: 'Remote Services' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-[var(--border)]">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <div className="flex flex-col">
              <span className="font-display font-bold text-base md:text-lg tracking-tight leading-none">ONLINE SHEBA POINT</span>
              <span className="text-[9px] md:text-[10px] text-[var(--fg-muted)] tracking-[0.2em] uppercase font-mono mt-1">One Point. Infinite Solutions.</span>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {mainLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">
                {link.label}
              </Link>
            ))}
            <div className="relative">
              <button onClick={() => setOpenMore(!openMore)} className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition flex items-center gap-1">
                More <i className="fas fa-chevron-down text-[8px] mt-1"></i>
              </button>
              {openMore && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[var(--bg-elev)] border border-[var(--border-bright)] shadow-xl py-2 z-50" onMouseLeave={() => setOpenMore(false)}>
                  {moreLinks.map(link => (
                    <Link key={link.href} href={link.href} className="block px-4 py-2 text-[13px] text-[var(--fg-dim)] hover:bg-[var(--bg-card)] hover:text-[var(--accent)] transition" onClick={() => setOpenMore(false)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <button onClick={handleLogout} className="btn-primary !py-2 !px-4 text-[11px] hidden sm:block">Logout</button>
          ) : (
            <Link href="/login" className="btn-primary !py-2 !px-4 text-[11px] hidden sm:block">Login / Register</Link>
          )}
          <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden text-[var(--fg)] text-xl">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
      {openMenu && (
        <div className="lg:hidden bg-[var(--bg-elev)] border-t border-[var(--border)] py-4 absolute top-16 left-0 right-0 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col px-6 gap-4">
            {mainLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpenMenu(false)} className="text-sm text-[var(--fg-dim)] hover:text-[var(--accent)]">
                {link.label}
              </Link>
            ))}
            <div className="border-t border-[var(--border)] pt-4 mt-2">
              <p className="text-[10px] font-mono text-[var(--fg-muted)] uppercase mb-2">More Pages</p>
              <div className="grid grid-cols-2 gap-4">
                {moreLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setOpenMenu(false)} className="text-sm text-[var(--fg-dim)] hover:text-[var(--accent)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-[var(--border)] pt-4 mt-2">
              {user ? (
                <button onClick={handleLogout} className="btn-primary w-full justify-center">Logout</button>
              ) : (
                <Link href="/login" onClick={() => setOpenMenu(false)} className="btn-primary w-full justify-center">Login / Register</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}