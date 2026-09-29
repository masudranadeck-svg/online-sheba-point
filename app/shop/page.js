'use client';
import { useState, useEffect } from 'react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Digital Products',
    'Men\'s Fashion',
    'Women\'s Fashion',
    'Electronics',
    'Remote Services'
  ];

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

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      {/* এখানে inline style এ paddingTop দেওয়া হয়েছে */}
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        
        {/* Header */}
        <div className="mb-16">
          <div className="section-eyebrow mb-4">01 / Digital Shop</div>
          <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">The Arsenal.</h1>
          <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">Software keys, premium subscriptions, and digital goods. Instant delivery upon purchase.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border)]">Categories</h3>
              <div className="flex flex-col gap-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-sm px-3 py-2 transition-all border-l-2 ${
                      selectedCategory === cat 
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--bg-card)]' 
                        : 'border-transparent text-[var(--fg-dim)] hover:text-[var(--fg)] hover:bg-[var(--bg-card)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <p className="text-[var(--fg-muted)] font-mono text-sm uppercase tracking-widest col-span-full text-center py-20">Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-[var(--fg-muted)] font-mono text-sm uppercase tracking-widest col-span-full text-center py-20">No products in this category.</p>
              ) : (
                filteredProducts.map((p) => (
                  <div key={p._id} className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-6 flex flex-col transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group">
                    <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                    
                    <div className="flex justify-between items-center mb-6 gap-2">
                      <span className="text-[9px] font-mono px-2 py-1 bg-[var(--accent)] text-black font-bold tracking-widest rounded-sm truncate">
                        {p.category ? p.category.toUpperCase() : 'ITEM'}
                      </span>
                      <span className="text-[9px] font-mono text-[var(--lime)] tracking-widest whitespace-nowrap">IN STOCK</span>
                    </div>
                    
                    <h3 className="font-display font-bold text-lg tracking-tight mb-2 text-[var(--fg)] truncate">{p.name}</h3>
                    
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
      </div>
    </div>
  );
}