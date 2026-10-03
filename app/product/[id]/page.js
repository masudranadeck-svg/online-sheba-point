'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1); // ⬅️ নতুন: quantity state

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

  // ⬅️ নতুন: quantity বাড়ানোর ফাংশন
  const increaseQty = () => {
    const maxStock = product?.stock || 10; // MongoDB-তে stock ফিল্ড থাকলে সেটা, নাহলে max 10
    setQuantity((prev) => (prev < maxStock ? prev + 1 : prev));
  };

  // ⬅️ নতুন: quantity কমানোর ফাংশন
  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ⬅️ বোনাস ফিক্স: একই প্রোডাক্ট আগে থাকলে ডুপ্লিকেট না হয়ে qty বাড়বে
    const existingIndex = cart.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
      cart[existingIndex].qty += quantity;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.offerPrice || product.regularPrice || 0,
        qty: quantity // ⬅️ সিলেক্ট করা quantity যাচ্ছে, আর 1 না
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/checkout');
  };

  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope', sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '1200px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' },
    btnPrimary: { padding: '16px 32px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' },
    // ⬇️ নতুন styles (quantity selector-এর জন্য)
    qtyLabel: { fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-muted)', marginBottom: '12px' },
    qtyBox: { display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
    qtyBtn: { width: '44px', height: '44px', fontSize: '20px', fontWeight: '700', cursor: 'pointer', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--fg)', borderRadius: '6px' },
    qtyInput: { width: '56px', height: '44px', textAlign: 'center', fontSize: '16px', fontWeight: '700', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', borderRadius: '6px' },
    totalPrice: { fontSize: '14px', color: 'var(--lime)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '24px' }
  };

  if (loading) return <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Product not found.</div>;

  const unitPrice = product.offerPrice || product.regularPrice || 0;

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

            {/* ⬇️ নতুন: Quantity Selector সেকশন */}
            <div>
              <p style={styles.qtyLabel}>পরিমাণ (Quantity)</p>
              <div style={styles.qtyBox}>
                <button onClick={decreaseQty} style={styles.qtyBtn}>−</button>
                <input type="text" value={quantity} readOnly style={styles.qtyInput} />
                <button onClick={increaseQty} style={styles.qtyBtn}>+</button>
              </div>
              <p style={styles.totalPrice}>মোট: ৳{unitPrice * quantity}</p>
            </div>

            <button onClick={handleAddToCart} style={styles.btnPrimary}>
              Add to Cart & Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}