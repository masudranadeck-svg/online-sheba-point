'use client'
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  // ১. অ্যাডমিন পাসওয়ার্ড সিস্টেম
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputPass, setInputPass] = useState('');
  const ADMIN_PASSWORD = "Masud890@"; // <-- এখানে আপনার পছন্দমতো পাসওয়ার্ড দিন

  // ২. ড্যাশবোর্ড স্টেট
  const [activeTab, setActiveTab] = useState('add');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // ৩. প্রোডাক্ট ফর্ম স্টেট
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('shop'); // ডিফল্ট ক্যাটাগরি
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = "https://online-sheba-point.onrender.com/api";

  const fetchData = async () => {
    try {
      const prodRes = await fetch(`${API_URL}/products`);
      setProducts(await prodRes.json());
      
      const ordRes = await fetch(`${API_URL}/orders`);
      setOrders(await ordRes.json());
    } catch (error) {
      console.log("ডাটা আনতে সমস্যা");
    }
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPass === ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert("ভুল পাসওয়ার্ড! অ্যাক্সেস ডিনাইড।");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage('যোগ করা হচ্ছে...');
    try {
      const res = await fetch(`${API_URL}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: desc, price: Number(price), category, softwareKey: key })
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setName(''); setDesc(''); setPrice(''); setKey('');
        fetchData(); 
      }
    } catch (error) {
      setMessage('সার্ভার এরর!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি এই প্রোডাক্টটি ডিলিট করতে চান?")) {
      try {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.log("ডিলিট এরর");
      }
    }
  };

  // যদি লগইন না করা থাকে, তবে পাসওয়ার্ড পেজ দেখাবে
  if (!isAdmin) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
        <form onSubmit={handleLogin} className="d-card glow-card" style={{ padding: '40px', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a1a2e' }}>🔐 অ্যাডমিন লগইন</h2>
          <input 
            type="password" 
            placeholder="পাসওয়ার্ড দিন" 
            value={inputPass} 
            onChange={(e) => setInputPass(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '15px', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>অ্যাডমিন প্যানেলে ঢুকুন</button>
        </form>
      </div>
    );
  }

  // লগইন করা থাকলে মূল ড্যাশবোর্ড দেখাবে
  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', paddingTop: '100px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#1a1a2e' }}>🛠️ অ্যাডমিন ড্যাশবোর্ড</h1>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #e8ecf1' }}>
          <button onClick={() => setActiveTab('add')} style={{ padding: '12px 20px', background: activeTab === 'add' ? '#4e6ef2' : 'white', color: activeTab === 'add' ? 'white' : '#888', border: 'none', borderRadius: '8px 8px 0 0', cursor: 'pointer', fontWeight: '600' }}>➕ প্রোডাক্ট অ্যাড করুন</button>
          <button onClick={() => setActiveTab('list')} style={{ padding: '12px 20px', background: activeTab === 'list' ? '#4e6ef2' : 'white', color: activeTab === 'list' ? 'white' : '#888', border: 'none', borderRadius: '8px 8px 0 0', cursor: 'pointer', fontWeight: '600' }}>📋 প্রোডাক্ট লিস্ট ({products.length})</button>
          <button onClick={() => setActiveTab('orders')} style={{ padding: '12px 20px', background: activeTab === 'orders' ? '#4e6ef2' : 'white', color: activeTab === 'orders' ? 'white' : '#888', border: 'none', borderRadius: '8px 8px 0 0', cursor: 'pointer', fontWeight: '600' }}>🛒 অর্ডার হিস্ট্রি ({orders.length})</button>
        </div>

        {activeTab === 'add' && (
          <div className="d-card glow-card" style={{ padding: '30px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>নতুন প্রোডাক্ট অ্যাড করুন</h2>
            <form onSubmit={handleAddProduct} style={{ display: 'grid', gap: '15px' }}>
              <input type="text" placeholder="প্রোডাক্টের নাম" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
              <textarea placeholder="বিবরণ (Description)" value={desc} onChange={(e) => setDesc(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '80px' }} />
              <div style={{ display: 'flex', gap: '15px' }}>
                <input type="number" placeholder="মূল্য (টাকা)" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
                {/* আপনার দেওয়া ফিক্স ক্যাটাগরি এখানে আছে */}
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', background: 'white' }}>
                  <option value="shop">শপ</option>
                  <option value="online-sheba">অনলাইন সেবা</option>
                  <option value="freelancer-hub">ফ্রীলান্সার হাব/দলার এক্সচেঞ্জ</option>
                  <option value="cards">কার্ড সেবা</option>
                  <option value="accounts">একাউন্ট সেবা</option>
                  <option value="company-formation">কম্পানি রেজিস্ত্রাতিওন</option>
                  <option value="pc-solution">পিসিস সলুশন</option>
                  <option value="subscription">সাবসচ্রিপ্তিওন</option>
                  <option value="remote">রিমোট</option>
                </select>
              </div>
              <input type="text" placeholder="সফটওয়্যার কী / সার্ভিস লিংক" value={key} onChange={(e) => setKey(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
              <button type="submit" style={{ padding: '12px', background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>প্রোডাক্ট অ্যাড করুন</button>
            </form>
            {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
          </div>
        )}

        {activeTab === 'list' && (
          <div className="d-card glow-card" style={{ padding: '20px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e8ecf1', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>নাম</th>
                  <th style={{ padding: '12px' }}>মূল্য</th>
                  <th style={{ padding: '12px' }}>ক্যাটাগরি</th>
                  <th style={{ padding: '12px' }}>স্ট্যাটাস</th>
                  <th style={{ padding: '12px' }}>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{p.name}</td>
                    <td style={{ padding: '12px', color: '#2dce89' }}>৳{p.price}</td>
                    <td style={{ padding: '12px' }}>{p.category}</td>
                    <td style={{ padding: '12px' }}>
                      {p.isSold ? <span style={{ color: '#e2136e', fontWeight: '600' }}>বিক্রি হয়েছে</span> : <span style={{ color: '#2dce89', fontWeight: '600' }}>Available</span>}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => handleDelete(p._id)} style={{ padding: '8px 12px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>ডিলিট</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="d-card glow-card" style={{ padding: '20px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e8ecf1', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>কাস্টমার ইমেইল</th>
                  <th style={{ padding: '12px' }}>প্রোডাক্ট</th>
                  <th style={{ padding: '12px' }}>মূল্য</th>
                  <th style={{ padding: '12px' }}>ডেলিভার করা কী</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px' }}>{o.buyerEmail}</td>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{o.productName}</td>
                    <td style={{ padding: '12px', color: '#2dce89' }}>৳{o.price}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace', background: '#f9f9f9' }}>{o.deliveredKey}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}