'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('all');
  const [time, setTime] = useState('');

  const products = [
    {id:0, name:'AETHER ORIGIN X1', cat:'neural', catLabel:'Neural', price:4800, rating:4.9, badge:'SIGNATURE', visual:'pv-orb', desc:'256-channel neural-cortex interface'},
    {id:1, name:'PHOTON M2 DISPLAY', cat:'visual', catLabel:'Visual', price:4500, rating:4.8, badge:'NEW', visual:'pv-disc', desc:'32" holographic retinal display'},
    {id:2, name:'ECHO BUDS PRO', cat:'audio', catLabel:'Audio', price:349, rating:4.7, badge:null, visual:'pv-ear', desc:'Bone-conducting spatial earbuds'},
    {id:3, name:'QUANTUM WATCH S9', cat:'neural', catLabel:'Wearable', price:1150, rating:4.9, badge:null, visual:'pv-band', desc:'Biometric quantum smartwatch'},
    {id:4, name:'PRISM LENS AR', cat:'visual', catLabel:'Visual', price:2200, rating:4.6, badge:'LIMITED', visual:'pv-lens', desc:'Augmented reality field glasses'},
    {id:5, name:'NEXUS HUB MINI', cat:'systems', catLabel:'Systems', price:599, rating:4.8, badge:null, visual:'pv-cube', desc:'Photonic compute hub'},
    {id:6, name:'ORBIT CAM 360', cat:'visual', catLabel:'Imager', price:799, rating:4.5, badge:null, visual:'pv-frame', desc:'Spherical 8K spatial camera'},
    {id:7, name:'AETHER POD PRO', cat:'audio', catLabel:'Audio', price:899, rating:4.7, badge:null, visual:'pv-disc', desc:'Room-scale spatial audio system'}
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2,'0');
      const m = String(now.getMinutes()).padStart(2,'0');
      const s = String(now.getSeconds()).padStart(2,'0');
      setTime(`${h}:${m}:${s} UTC`);
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.cat === filter);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, {...product, qty: 1}];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (item.qty + delta <= 0) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? {...i, qty: i.qty + delta} : i);
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden' }}>
      
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-[var(--border)]">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#" className="flex items-center gap-2">
              <div className="w-7 h-7 relative">
                <div className="absolute inset-0 border border-[var(--accent)] rotate-45"></div>
                <div className="absolute inset-1 bg-[var(--accent)] rotate-45"></div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">SHEBA POINT</span>
            </a>
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#catalog" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Catalog</a>
              <a href="#categories" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Collections</a>
              <a href="#technology" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Technology</a>
              <a href="#manifesto" className="text-[13px] tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition">Manifesto</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative h-9 px-3 flex items-center gap-2 border border-[var(--border)] hover:border-[var(--accent)] transition">
              <span className="text-xs font-mono">CART</span>
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--accent)] text-black text-[10px] font-bold flex items-center justify-center rounded-full">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen pt-16 overflow-hidden grid-bg">
        <div className="floor-grid"></div>
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.08] blur-[120px] pointer-events-none"></div>
        
        <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 pt-6 flex items-center justify-between text-[11px] font-mono text-[var(--fg-muted)]">
          <div className="flex items-center gap-3">
            <span className="live-dot"></span>
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>LAT 23.8103° N</span>
            <span>LON 90.4125° E</span>
            <span>{time}</span>
          </div>
        </div>

        <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div className="relative z-10">
            <div className="section-eyebrow mb-8">Catalog 04 / Engineered Futures</div>
            <h1 className="hero-h1 font-display font-bold text-[14vw] sm:text-[10vw] lg:text-[7.2vw] leading-[.92] tracking-tight">
              <span className="word" style={{animationDelay:'.1s'}}>Tomorrow,</span><br/>
              <span className="word" style={{animationDelay:'.3s'}}>engineered</span><br/>
              <span className="word accent-underline" style={{animationDelay:'.5s'}}>today.</span>
            </h1>
            <p className="mt-8 max-w-md text-[var(--fg-dim)] text-base leading-relaxed">
              Sheba Point builds the instruments of the next decade — neural interfaces, holographic displays, and quantum wearables, designed in collaboration with the people who'll use them.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#catalog" className="btn-primary">Explore Catalog →</a>
              <a href="#manifesto" className="btn-ghost">Watch Film</a>
            </div>
          </div>

          <div className="relative">
            <div className="orb-wrap">
              <div className="ring r1"></div>
              <div className="ring r2"></div>
              <div className="ring r3"></div>
              <div className="orb-core"></div>
              <div className="orb-hilight"></div>
              <div className="float-tag" style={{top:'8%',left:'-5%',animationDelay:'0s'}}>
                <div className="text-[var(--fg-muted)] mb-1">[01]</div>
                <div className="font-semibold">Neural Sync</div>
                <div className="text-[var(--accent)] font-mono">98.4% accuracy</div>
              </div>
              <div className="float-tag" style={{top:'42%',right:'-8%',animationDelay:'1.5s'}}>
                <div className="text-[var(--fg-muted)] mb-1">[02]</div>
                <div className="font-semibold">Quantum Battery</div>
                <div className="text-[var(--accent)] font-mono">72h continuous</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-b border-[var(--border)] py-4 overflow-hidden">
          <div className="marquee text-sm font-mono text-[var(--fg-dim)] uppercase tracking-widest">
            <div className="flex gap-12 items-center">
              <span>Neural Interface</span><span className="text-[var(--accent)]">◆</span>
              <span>Holographic Display</span><span className="text-[var(--accent)]">◆</span>
              <span>Quantum Wearables</span><span className="text-[var(--accent)]">◆</span>
              <span>Photonic Computing</span><span className="text-[var(--accent)]">◆</span>
              <span>Edge AI</span><span className="text-[var(--accent)]">◆</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="relative py-24 lg:py-32">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div className="section-eyebrow mb-4">04 / Catalog</div>
              <h2 className="font-display font-bold text-5xl lg:text-7xl leading-none">The full<br/>arsenal.</h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            {['all','neural','visual','audio','systems'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border ${filter === f ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'border-[var(--border-bright)] text-[var(--fg-dim)] hover:border-[var(--accent)]'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
            {filteredProducts.map(p => (
              <article key={p.id} className="product-card group">
                <div className="visual">
                  <div className="glow"></div>
                  <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                  {p.badge && <span className="absolute top-4 left-4 z-10 text-[9px] font-mono px-2 py-1 bg-[var(--accent)] text-black font-bold tracking-widest">{p.badge}</span>}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={p.visual}></div>
                  </div>
                  <button 
                    onClick={() => addToCart(p)}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-[var(--bg-elev)] border border-[var(--border-bright)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition"
                  >
                    +
                  </button>
                </div>
                <div className="p-5 border-t border-[var(--border)]">
                  <h3 className="font-display font-bold text-sm tracking-tight mb-1">{p.name}</h3>
                  <p className="text-xs text-[var(--fg-muted)] mb-4">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg">${p.price.toLocaleString()}</span>
                    <span className="text-[10px] font-mono text-[var(--lime)]">★ {p.rating}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="relative py-32 lg:py-48 border-y border-[var(--border)] overflow-hidden grid-bg grid-fade">
        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <div className="section-eyebrow justify-center mb-8 inline-flex">06 / Manifesto</div>
          <blockquote className="font-display font-bold text-3xl sm:text-4xl lg:text-6xl leading-[1.1] tracking-tight">
            "We are not making <span className="text-[var(--fg-muted)]">consumer electronics</span>.<br/>
            We are making the <span className="accent-underline">instruments</span> that<br/>
            will outlast the decade."
          </blockquote>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-[var(--border)] pt-20 pb-10">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10 text-center text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="live-dot"></span> SYSTEMS OPERATIONAL
          </div>
          <div>© 2025 SHEBA POINT LABORATORIES / ALL RIGHTS RESERVED</div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && <div className="overlay open" onClick={() => setCartOpen(false)}></div>}
      <aside className={`drawer ${cartOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <div>
            <div className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest">Your Cart</div>
            <div className="font-display font-bold text-xl">{cartCount} {cartCount === 1 ? 'item' : 'items'}</div>
          </div>
          <button onClick={() => setCartOpen(false)} className="w-9 h-9 border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)]">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <p className="font-display text-lg font-bold mb-1">Cart is empty</p>
              <p className="text-xs text-[var(--fg-muted)]">Browse the catalog to begin.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-[var(--border)]">
                <div className="w-20 h-20 flex-shrink-0 bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center">
                  <div className={item.visual} style={{transform:'scale(.4)', position:'relative'}}></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-bold text-sm">{item.name}</h4>
                  <p className="text-[10px] font-mono text-[var(--fg-muted)] uppercase mt-1">{item.catLabel}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 border border-[var(--border-bright)] flex items-center justify-center">-</button>
                      <span className="font-mono text-sm w-6 text-center">{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 border border-[var(--border-bright)] flex items-center justify-center">+</button>
                    </div>
                    <span className="font-display font-bold text-sm">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-[var(--fg-muted)] hover:text-[var(--accent)]">✕</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-[var(--border)] p-6 space-y-4">
            <div className="flex items-center justify-between text-base pt-4 border-t border-[var(--border)]">
              <span className="font-semibold">Total</span>
              <span className="font-display font-bold text-xl">${subtotal.toLocaleString()}</span>
            </div>
            <button className="btn-primary w-full justify-center">Checkout →</button>
          </div>
        )}
      </aside>

    </div>
  );
}