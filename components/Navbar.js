'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false); // Mobile menu state
  const [openMore, setOpenMore] = useState(false); // Dropdown for More links
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
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 relative">
              <div className="absolute inset-0 border border-[var(--accent)] rotate-45"></div>
              <div className="absolute inset-1 bg-[var(--accent)] rotate-45"></div>
            </div>
            <span className="font-display font-bold text-base md:text-lg tracking-tight">ONLINE SHEBA POINT</span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">
                {link.label}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenMore(!openMore)}
                className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition flex items-center gap-1"
              >
                More <i className="fas fa-chevron-down text-[8px] mt-1"></i>
              </button>
              
              {openMore && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[var(--bg-elev)] border border-[var(--border-bright)] shadow-xl py-2 z-50" onMouseLeave={() => setOpenMore(false)}>
                  {moreLinks.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className="block px-4 py-2 text-[13px] text-[var(--fg-dim)] hover:bg-[var(--bg-card)] hover:text-[var(--accent)] transition"
                      onClick={() => setOpenMore(false)}
                    >
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
          
          {/* Mobile Menu Button */}
          <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden text-[var(--fg)] text-xl">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
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