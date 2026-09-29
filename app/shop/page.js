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
      {/* pt-32 দেওয়া হয়েছে যাতে নেভবারের সাথে না মিলে */}
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-32 pb-16">
        
        {/* Header */}
        <div className="mb-16">
          <div className="section-eyebrow mb-4">01 / Digital Shop</div>
          <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">The Arsenal.</h1>
          <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">Software keys, premium subscriptions, and digital goods. Instant delivery upon purchase.</p>
        </div>

        {/* Product Grid */}
        {/* gap-6 দেওয়া হয়েছে যাতে কার্ডের মধ্যে স্পেস ভালো থাকে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-[var(--fg-muted)] font-mono text-sm uppercase tracking-widest col-span-full text-center py-20">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-[var(--fg-muted)] font-mono text-sm uppercase tracking-widest col-span-full text-center py-20">No products available.</p>
          ) : (
            products.map((p) => (
              <div key={p._id} className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-6 flex flex-col transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group">
                <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                
                {/* Badge & Stock (Truncated to prevent layout break) */}
                <div className="flex justify-between items-center mb-6 gap-2">
                  <span className="text-[9px] font-mono px-2 py-1 bg-[var(--accent)] text-black font-bold tracking-widest rounded-sm truncate">
                    {p.category ? p.category.toUpperCase() : 'ITEM'}
                  </span>
                  <span className="text-[9px] font-mono text-[var(--lime)] tracking-widest whitespace-nowrap">IN STOCK</span>
                </div>
                
                {/* Title (Truncated to 1 line) */}
                <h3 className="font-display font-bold text-lg tracking-tight mb-2 text-[var(--fg)] truncate">{p.name}</h3>
                
                {/* Description (Limited to 2 lines) */}
                <p 
                  className="text-xs text-[var(--fg-muted)] mb-8 flex-grow"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '32px'
                  }}
                >
                  {p.description}
                </p>
                
                {/* Price & Button */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-[var(--border)]">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase">Price</span>
                    <span className="font-display font-bold text-xl text-[var(--fg)]">৳{p.price}</span>
                  </div>
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