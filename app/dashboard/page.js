'use client'
import { useState } from 'react';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchOrders = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      // এখানে আপনার Render এর লাইভ ব্যাকএন্ড লিংক দেওয়া আছে
      const res = await fetch(`https://online-sheba-point.onrender.com/api/orders/my-orders/${email}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', paddingTop: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1a1a2e' }}>📊 আমার ড্যাশবোর্ড</h2>
        
        <div className="d-card glow-card" style={{ padding: '20px', marginBottom: '30px' }}>
          <form onSubmit={fetchOrders} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="আপনার ইমেইল দিন" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <button type="submit" className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
              {loading ? 'লোডিং...' : 'সার্চ করুন'}
            </button>
          </form>
        </div>

        {searched && !loading && (
          orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', fontSize: '18px' }}>আপনার ইমেইলে কোনো অর্ডার পাওয়া যায়নি।</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {orders.map((order, index) => (
                <div key={index} className="d-card glow-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#1a1a2e' }}>{order.productName}</h3>
                    <p style={{ margin: '0', color: '#888', fontSize: '14px' }}>মূল্য: ৳{order.price}</p>
                    <p style={{ margin: '5px 0 0 0', color: '#aaa', fontSize: '12px' }}>তারিখ: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#888' }}>আপনার কী:</p>
                    <p style={{ margin: '0', background: '#e8f5e9', color: '#2dce89', padding: '8px 12px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 'bold' }}>
                      {order.deliveredKey}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
} 