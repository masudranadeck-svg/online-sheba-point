'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bkash');
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const placeOrder = async () => {
    if (!senderNumber || !transactionId) {
      setMessage('অনুগ্রহ করে নম্বর এবং ট্রানজেকশন আইডি দিন।');
      return;
    }

    setLoading(true);
    setMessage('অর্ডার সাবমিট হচ্ছে...');

    try {
      const backendUrl = 'https://online-sheba-point.onrender.com/api/orders';
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerEmail: userEmail,
          items: cart.map(c => ({ name: c.name, price: c.price, qty: c.qty })),
          totalAmount: total,
          paymentMethod: paymentMethod,
          senderNumber: senderNumber,
          transactionId: transactionId
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage('অর্ডার সফল! অ্যাডমিন ভেরিফাই করার পর আপনার কী পাবেন।');
        localStorage.removeItem('cart');
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        setMessage('অর্ডার ব্যর্থ হয়েছে!');
      }
    } catch (error) {
      setMessage('সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি!');
    }
    setLoading(false);
  };

  // Inline CSS Styles
  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope', sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '1200px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    header: { marginBottom: '64px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    eyebrowLine: { width: '24px', height: '1px', background: 'var(--accent)' },
    title: { fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' },
    card: { position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px' },
    corner: (pos) => ({ position: 'absolute', width: '14px', height: '14px', borderColor: 'var(--accent)', ...pos }),
    input: { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-bright)', padding: '12px 0', color: 'white', outline: 'none', fontSize: '14px' },
    label: { fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", display: 'block', marginBottom: '8px' },
    btnPrimary: { display: 'block', width: '100%', padding: '14px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' },
    payBtn: (isActive) => ({ flex: 1, padding: '10px', background: isActive ? 'var(--accent)' : 'transparent', color: isActive ? '#0a0a0b' : 'var(--fg-dim)', border: isActive ? 'none' : '1px solid var(--border-bright)', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.3s' })
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowLine}></span>
            05 / Checkout
          </div>
          <h1 style={styles.title}>Secure Checkout.</h1>
        </div>

        <div style={styles.grid}>
          
          {/* Left: Cart Items */}
          <div style={styles.card}>
            <div style={styles.corner({top: '8px', left: '8px', borderTop: '1px solid', borderLeft: '1px solid'})}></div>
            <div style={styles.corner({top: '8px', right: '8px', borderTop: '1px solid', borderRight: '1px solid'})}></div>
            <div style={styles.corner({bottom: '8px', left: '8px', borderBottom: '1px solid', borderLeft: '1px solid'})}></div>
            <div style={styles.corner({bottom: '8px', right: '8px', borderBottom: '1px solid', borderRight: '1px solid'})}></div>

            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', fontFamily: "'Syne', sans-serif" }}>Order Summary</h2>
            {cart.length === 0 ? (
              <p style={{ color: 'var(--fg-muted)', textAlign: 'center', padding: '32px 0' }}>Your cart is empty.</p>
            ) : (
              cart.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--fg)', margin: '0 0 4px 0' }}>{c.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--fg-muted)', margin: '0' }}>Qty: {c.qty}</p>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--lime)', margin: '0' }}>৳{c.price * c.qty}</p>
                </div>
              ))
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--fg)' }}>Total Amount</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent)', fontFamily: "'Syne', sans-serif" }}>৳{total}</span>
            </div>
          </div>

          {/* Right: Payment Details */}
          <div style={styles.card}>
            <div style={styles.corner({top: '8px', left: '8px', borderTop: '1px solid', borderLeft: '1px solid'})}></div>
            <div style={styles.corner({top: '8px', right: '8px', borderTop: '1px solid', borderRight: '1px solid'})}></div>
            <div style={styles.corner({bottom: '8px', left: '8px', borderBottom: '1px solid', borderLeft: '1px solid'})}></div>
            <div style={styles.corner({bottom: '8px', right: '8px', borderBottom: '1px solid', borderRight: '1px solid'})}></div>

            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', fontFamily: "'Syne', sans-serif" }}>Payment Method</h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
              {['Bkash', 'Nagad', 'Rocket'].map(method => (
                <button key={method} onClick={() => setPaymentMethod(method)} style={styles.payBtn(paymentMethod === method)}>
                  {method}
                </button>
              ))}
            </div>

            <div style={{ background: 'rgba(255,91,20,0.05)', border: '1px solid var(--border)', padding: '16px', marginBottom: '32px', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: 'var(--fg-dim)', margin: '0 0 8px 0' }}>Send Money To:</p>
              <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)', margin: '0 0 8px 0', fontFamily: "'JetBrains Mono', monospace" }}>01790242308</p>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', margin: '0' }}>({paymentMethod} Personal)</p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={styles.label}>Your {paymentMethod} Number</label>
              <input type="text" value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)} placeholder="01XXXXXXXXX" style={styles.input} />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={styles.label}>Transaction ID (TrxID)</label>
              <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Enter TrxID" style={styles.input} />
            </div>

            <button onClick={placeOrder} disabled={loading} style={{ ...styles.btnPrimary, opacity: loading ? 0.5 : 1 }}>
              {loading ? 'Processing...' : 'Confirm Order →'}
            </button>

            {message && <p style={{ marginTop: '16px', color: 'var(--lime)', fontSize: '14px', textAlign: 'center' }}>{message}</p>}
          </div>
          
        </div>
      </div>
    </div>
  );
}