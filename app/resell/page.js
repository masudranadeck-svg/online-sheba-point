'use client';
import { useState, useEffect } from 'react';

export default function ResellPage() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [title, setTitle] = useState('');
  const [condition, setCondition] = useState('নতুনের মতো');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = "https://online-sheba-point.onrender.com/api";

  // সব পণ্য লোড করা
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/resell`);
        setItems(await res.json());
      } catch (error) {}
    };
    fetchItems();
  }, []);

  // নতুন পণ্য পোস্ট করা
  const handlePost = async (e) => {
    e.preventDefault();
    setMessage('পোস্ট হচ্ছে...');
    try {
      const res = await fetch(`${API_URL}/resell/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: details, price: Number(price), condition, sellerName, sellerPhone })
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setTitle(''); setPrice(''); setDetails(''); setSellerName(''); setSellerPhone('');
        setShowForm(false);
        // লিস্ট আপডেট করার জন্য আবার ডাটা আনা
        const resAgain = await fetch(`${API_URL}/resell`);
        setItems(await resAgain.json());
      }
    } catch (error) {
      setMessage('সার্ভার এরর!');
    }
  };

  // ক্রেতা যখন Buy Now এ ক্লিক করবে, তখন বিক্রেতার হোয়াটসঅ্যাপে মেসেজ যাবে
  const handleBuy = (item) => {
    const cleanPhone = item.sellerPhone.replace(/[^0-9]/g, '').replace(/^0/, '880');
    const msg = `আসসালামু আলাইকুম, আমি আপনার "${item.title}" পণ্যটি কিনতে আগ্রহী। মূল্য: ৳${item.price}`;
    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <h1 style={{ color: 'white', margin: 0 }}>♻️ পুরোনো পণ্য ক্রয়-বিক্রয়</h1>
          <button onClick={() => setShowForm(!showForm)} className="d-btn glow-btn" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
            {showForm ? '❌ বন্ধ করুন' : '➕ পণ্য পোস্ট করুন'}
          </button>
        </div>

        {/* পণ্য পোস্ট করার ফর্ম */}
        {showForm && (
          <div className="glass-3d" style={{ marginBottom: '30px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'white' }}>আপনার পণ্য বিক্রি করুন</h2>
            <form onSubmit={handlePost} style={{ display: 'grid', gap: '15px' }}>
              <input type="text" placeholder="পণ্যের নাম (যেমন: iPhone 11)" value={title} onChange={(e) => setTitle(e.target.value)} required className="d-input" />
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <select value={condition} onChange={(e) => setCondition(e.target.value)} className="d-input" style={{ flex: 1, minWidth: '200px' }}>
                  <option style={{background: '#1a1c2e'}}>নতুনের মতো</option>
                  <option style={{background: '#1a1c2e'}}>খুব ভালো</option>
                  <option style={{background: '#1a1c2e'}}>ভালো</option>
                  <option style={{background: '#1a1c2e'}}>মোটামুটি</option>
                </select>
                <input type="number" placeholder="মূল্য (টাকা)" value={price} onChange={(e) => setPrice(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
              </div>
              <textarea placeholder="বিস্তারিত (ব্যাটারি, চার্জার, কোনো সমস্যা আছে কি না)" value={details} onChange={(e) => setDetails(e.target.value)} required className="d-input" style={{ minHeight: '80px' }} />
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input type="text" placeholder="আপনার নাম" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
                <input type="text" placeholder="আপনার হোয়াটসঅ্যাপ নাম্বার" value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
              </div>
              <button type="submit" className="neon-3d-btn" style={{ width: '100%' }}>পোস্ট করুন</button>
            </form>
            {message && <p style={{ color: '#2dce89', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
          </div>
        )}

        {/* সব পণ্যের লিস্ট */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {items.map((item) => (
            <div key={item._id} className="glass-3d" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(45,206,137,0.2)', color: '#2dce89', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>{item.condition}</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: 8, color: 'white' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: 16, flex: 1 }}>{item.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                <div>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#2dce89', margin: 0 }}>৳{item.price}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>By {item.sellerName}</p>
                </div>
                <button onClick={() => handleBuy(item)} className="d-btn glow-btn" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                  🛒 Buy Now
                </button>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '18px', gridColumn: '1 / -1' }}>
              এখনো কোনো পণ্য পোস্ট করা হয়নি। আপনিই প্রথম হোন!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}