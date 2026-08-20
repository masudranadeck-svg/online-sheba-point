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

  return (
    <div className="deepin-body" style={{ minHeight:'100vh', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ color: 'white', marginBottom: 32, textAlign: 'center', fontSize: 28, fontWeight: 700 }}>🛒 চেকআউট</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* LEFT SIDE: Cart Items */}
          <div className="glass-3d">
            <h3 style={{ color: 'white', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>অর্ডার করা প্রোডাক্ট</h3>
            
            {cart.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>আপনার কার্ট খালি!</p>
            ) : (
              cart.map((c, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', color:'white', marginBottom:16, paddingBottom:16, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>{c.name}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>পরিমাণ: {c.qty} টি</p>
                  </div>
                  <p style={{ margin: 0, color: '#2dce89', fontWeight: 700, fontSize: 16 }}>৳{c.price * c.qty}</p>
                </div>
              ))
            )}
          </div>

          {/* RIGHT SIDE: Order Summary & Payment */}
          <div className="glass-3d" style={{ alignSelf: 'flex-start' }}>
            <h3 style={{ color: 'white', marginBottom: 24 }}>অর্ডার সারাংশ</h3>
            
            <div style={{ display:'flex', justifyContent:'space-between', color:'rgba(255,255,255,0.6)', marginBottom: 12 }}>
              <span>সাবটোটাল</span>
              <span>৳{total}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', color:'rgba(255,255,255,0.6)', marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
              <span>ডেলিভারি ফ্রি</span>
              <span style={{ color: '#2dce89', fontWeight: 600 }}>ফ্রি</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', color:'white', fontWeight: 700, fontSize: 18, marginBottom: 24 }}>
              <span>সর্বমোট</span>
              <span style={{ color: '#2dce89' }}>৳{total}</span>
            </div>

            {/* Payment Method */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, display: 'block', marginBottom: 8 }}>পেমেন্ট মেথড</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Bkash', 'Nagad', 'Rocket'].map(method => (
                  <button 
                    key={method} 
                    onClick={() => setPaymentMethod(method)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 8,
                      border: paymentMethod === method ? '1px solid #4e6ef2' : '1px solid rgba(255,255,255,0.1)',
                      background: paymentMethod === method ? 'rgba(78,110,242,0.2)' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 13
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions Box */}
            <div style={{ background: 'rgba(78,110,242,0.1)', padding: 12, borderRadius: 8, marginBottom: 20, border: '1px solid rgba(78,110,242,0.2)' }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: 0, textAlign: 'center' }}>
                ⚠️ <span style={{ fontWeight: 'bold', color: '#2dce89' }}>{paymentMethod}</span> এ <span style={{ fontWeight: 'bold', color: 'white' }}>01700000000</span> নম্বরে <span style={{ fontWeight: 'bold', color: '#2dce89' }}>৳{total}</span> পাঠান।
              </p>
            </div>

            {/* Payment Inputs */}
            <div style={{ marginBottom: 12 }}>
              <input 
                type="text" 
                className="d-input"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                placeholder="আপনার সেন্ডার নম্বর"
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <input 
                type="text" 
                className="d-input"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="ট্রানজেকশন আইডি (TrxID)"
              />
            </div>

            <button 
              onClick={placeOrder} 
              disabled={loading}
              className="neon-3d-btn" 
              style={{ width:'100%', opacity: loading ? 0.5 : 1 }}
            >
              চেকআউট করুন
            </button>

            {message && <p style={{ marginTop: 16, color: '#4e6ef2', textAlign: 'center', fontSize: 14 }}>{message}</p>}
          </div>
          
        </div>
      </div>
    </div>
  );
}