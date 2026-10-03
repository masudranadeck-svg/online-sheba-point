'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`https://online-sheba-point.onrender.com/api/products/${id}`);
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.log("Error fetching product details");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.offerPrice || product.regularPrice || 0,
      qty: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    // কার্টে অ্যাড করার পর চেকআউট পেজে নিয়ে যাওয়া হচ্ছে
    router.push('/checkout');
  };

  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope', sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '1200px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' },
    btnPrimary: { padding: '16px 32px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' },
  };

  if (loading) return <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Product not found.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.grid}>
          
          {/* Left: Images */}
          <div>
            <div style={{ width: '100%', aspectRatio: '1', background: 'var(--bg-card)', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
              <img src={product.images && product.images[activeImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.images.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt={`Thumbnail ${i}`} 
                    onClick={() => setActiveImage(i)} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: activeImage === i ? '2px solid var(--accent)' : '1px solid var(--border)', cursor: 'pointer' }} 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div>
            <span style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', background: 'var(--accent)', color: '#0a0a0b', fontWeight: '700' }}>
              {product.category ? product.category.toUpperCase() : 'ITEM'}
            </span>
            <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '16px 0', fontFamily: "'Syne', sans-serif" }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--lime)', fontFamily: "'Syne', sans-serif" }}>৳{product.offerPrice || product.regularPrice}</span>
              {product.regularPrice > 0 && (
                <span style={{ fontSize: '18px', color: 'var(--fg-muted)', textDecoration: 'line-through' }}>৳{product.regularPrice}</span>
              )}
            </div>

            <p style={{ fontSize: '16px', color: 'var(--fg-dim)', lineHeight: '1.8', marginBottom: '32px' }}>{product.description}</p>

            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div style={{ marginBottom: '32px', padding: '24px', background: 'var(--bg-card)', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '16px' }}>Key Features</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {product.keyFeatures.map((f, i) => (
                    <li key={i} style={{ fontSize: '14px', color: 'var(--fg)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--lime)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={handleAddToCart} style={styles.btnPrimary}>
              Add to Cart & Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}