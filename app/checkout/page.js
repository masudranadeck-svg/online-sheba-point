'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [deliveredKey, setDeliveredKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setDeliveredKey('');

    try {
      // আমরা ধরে নিচ্ছি ইউজার শুধু প্রথম প্রোডাক্টটা কিনছে (ডেমো পেমেন্ট)
      // পরবর্তীতে আমরা কার্ট থেকে ডাটা নিয়ে আসব। এখন আপাতত টেস্ট করার জন্য।
      const res = await fetch('https://online-sheba-point.onrender.com/api/products');
      const products = await res.json();
      
      if (products.length === 0) {
        setMessage("কোনো প্রোডাক্ট নেই!");
        setLoading(false);
        return;
      }

      const productId = products[0]._id; // প্রথম প্রোডাক্টটা নিচ্ছি

      const checkoutRes = await fetch('https://online-sheba-point.onrender.com/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyerEmail: email, productId: productId })
      });

      const data = await checkoutRes.json();

      if (checkoutRes.ok) {
        setMessage(data.message);
        setDeliveredKey(data.key);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('সার্ভারের সাথে কানেক্ট করা যায়নি!');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '50px', maxWidth: '500px', margin: 'auto' }}>
      <h2>💳 চেকআউট (ডেমো পেমেন্ট)</h2>
      
      {!deliveredKey ? (
        <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="আপনার ইমেইল দিন" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '10px', background: loading ? '#ccc' : '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            {loading ? 'প্রসেসিং...' : '৳1500 পেমেন্ট করুন (ডেমো)'}
          </button>
        </form>
      ) : (
        <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '10px', border: '2px solid #28a745', textAlign: 'center' }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>🎉 {message}</h3>
          <p style={{ fontSize: '14px', color: '#555' }}>আপনার সফটওয়্যার কী:</p>
          <h2 style={{ background: 'white', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', letterSpacing: '1px', border: '1px dashed #28a745' }}>
            {deliveredKey}
          </h2>
          <button 
            onClick={() => router.push('/shop')} 
            style={{ marginTop: '20px', padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            আরও কিনুন
          </button>
        </div>
      )}

      {message && !deliveredKey && <p style={{ marginTop: '15px', color: 'red', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}