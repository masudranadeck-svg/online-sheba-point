'use client';
import { useState, useEffect } from 'react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'shop', 'software', 'subscription', 'remote'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://online-sheba-point.onrender.com/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope', sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '1280px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    header: { marginBottom: '48px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    title: { fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' },
    card: { position: 'relative', background: 'var(--bg-card)', border: '1px solid transparent', borderRadius: '8px', padding: '24px', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' },
    corner: (pos) => ({ position: 'absolute', width: '14px', height: '14px', borderColor: 'var(--accent)', ...pos }),
    btnPrimary: { padding: '10px 16px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' },
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.borderColor = 'var(--accent)';
    e.currentTarget.style.boxShadow = '0 0 25px rgba(255,91,20,0.4)';
    e.currentTarget.style.transform = 'translateY(-4px)';
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.borderColor = 'transparent';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        <div style={styles.header}>
          <div style={styles.eyebrow}>
            <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
            01 / Digital Shop
          </div>
          <h1 style={styles.title}>The Arsenal.</h1>
          <p style={{ maxWidth: '28rem', color: 'var(--fg-dim)', marginTop: '16px' }}>Software keys, premium subscriptions, and digital goods. Instant delivery upon purchase.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px', 
                background: selectedCategory === cat ? 'var(--bg-card)' : 'transparent', 
                color: selectedCategory === cat ? 'var(--accent)' : 'var(--fg-muted)', 
                border: 'none', 
                borderBottom: selectedCategory === cat ? '2px solid var(--accent)' : '2px solid transparent', 
                cursor: 'pointer', 
                fontSize: '12px', 
                textTransform: 'uppercase', 
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {loading ? (
            <p style={{ color: 'var(--fg-muted)', gridColumn: '1 / -1', textAlign: 'center' }}>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p style={{ color: 'var(--fg-muted)', gridColumn: '1 / -1', textAlign: 'center' }}>No products available.</p>
          ) : (
            filteredProducts.map((p) => (
              <div 
                key={p._id} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={styles.card}
              >
                <div style={styles.corner({top: '8px', left: '8px', borderTop: '1px solid', borderLeft: '1px solid'})}></div>
                <div style={styles.corner({top: '8px', right: '8px', borderTop: '1px solid', borderRight: '1px solid'})}></div>
                <div style={styles.corner({bottom: '8px', left: '8px', borderBottom: '1px solid', borderLeft: '1px solid'})}></div>
                <div style={styles.corner({bottom: '8px', right: '8px', borderBottom: '1px solid', borderRight: '1px solid'})}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', background: 'var(--accent)', color: '#0a0a0b', fontWeight: '700' }}>
                    {p.category ? p.category.toUpperCase() : 'ITEM'}
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--lime)', fontFamily: "'JetBrains Mono', monospace" }}>IN STOCK</span>
                </div>

                {/* প্রোডাক্টের একাধিক ছবির প্রথম ছবি এবং গণনা */}
                {p.images && p.images.length > 0 && (
                  <div style={{ position: 'relative', width: '100%', height: '160px', marginBottom: '16px', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg)' }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {p.images.length > 1 && (
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: "'JetBrains Mono', monospace"">
                        +{p.images.length - 1} more
                      </div>
                    )}
                  </div>
                )}

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>{p.name}</h3>
                
                <p style={{ fontSize: '14px', color: 'var(--fg-muted)', marginBottom: '16px', flex: '1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.description}
                </p>

                {p.keyFeatures && p.keyFeatures.length > 0 && (
                  <div style={{ marginBottom: '16px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                    {p.keyFeatures.slice(0, 3).map((f, i) => (
                      <p key={i} style={{ fontSize: '12px', color: 'var(--fg-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--lime)' }}>✓</span> {f}
                      </p>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--lime)', fontFamily: "'Syne', sans-serif" }}>
                    ৳{p.offerPrice || p.price}
                  </span>
                  {p.regularPrice > 0 && (
                    <span style={{ fontSize: '14px', color: 'var(--fg-muted)', textDecoration: 'line-through' }}>
                      ৳{p.regularPrice}
                    </span>
                  )}
                  {p.regularPrice > 0 && p.offerPrice > 0 && (
                    <span style={{ fontSize: '10px', background: 'var(--accent)', color: '#0a0a0b', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                      -{Math.round(((p.regularPrice - p.offerPrice) / p.regularPrice) * 100)}%
                    </span>
                  )}
                </div>

                <button style={styles.btnPrimary}>Add to Cart →</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}