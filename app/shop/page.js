'use client';
import { useState, useEffect } from 'react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://online-sheba-point.onrender.com/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        {/* Header */}
        <div className="mb-12">
          <div className="section-eyebrow mb-4">01 / Digital Shop</div>
          <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">The Arsenal.</h1>
          <p className="max-w-sm text-[var(--fg-dim)] mt-6">Software keys, premium subscriptions, and digital goods. Instant delivery upon purchase.</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <p className="text-[var(--fg-muted)] font-mono text-sm uppercase tracking-widest col-span-full text-center py-20">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-[var(--fg-muted)] font-mono text-sm uppercase tracking-widest col-span-full text-center py-20">No products available.</p>
          ) : (
            products.map((p) => (
              <div key={p._id} className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-5 flex flex-col transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group">
                <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-mono px-2 py-1 bg-[var(--accent)] text-black font-bold tracking-widest">{p.category ? p.category.toUpperCase() : 'ITEM'}</span>
                  <span className="text-[9px] font-mono text-[var(--lime)] tracking-widest">IN STOCK</span>
                </div>
                
                <h3 className="font-display font-bold text-base tracking-tight mb-1 text-[var(--fg)]">{p.name}</h3>
                <p className="text-xs text-[var(--fg-muted)] mb-6 flex-grow">{p.description}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-[var(--border)]">
                  <span className="font-display font-bold text-xl text-[var(--fg)]">৳{p.price}</span>
                  <button className="btn-primary !py-2 !px-4 text-[10px]">Add to Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}