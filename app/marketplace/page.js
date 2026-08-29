'use client'
import { useState, useEffect } from 'react';

export default function Marketplace() {
  const [gigs, setGigs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Website Development');
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = "https://online-sheba-point.onrender.com/api";

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch(`${API_URL}/gigs`);
        setGigs(await res.json());
      } catch (error) {
        console.log("গিগ আনতে সমস্যা");
      }
    };
    fetchGigs();
  }, []);

  const handlePostGig = async (e) => {
    e.preventDefault();
    setMessage('পোস্ট হচ্ছে...');
    try {
      const res = await fetch(`${API_URL}/gigs/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc, price: Number(price), category, sellerName, sellerEmail })
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setTitle(''); setDesc(''); setPrice(''); setSellerName(''); setSellerEmail('');
        setShowForm(false);
        const resAgain = await fetch(`${API_URL}/gigs`);
        setGigs(await resAgain.json());
      }
    } catch (error) {
      setMessage('সার্ভার এরর!');
    }
  };

  const handleBuy = (gig) => {
    const msg = `আসসালামু আলাইকুম, আমি আপনার "${gig.title}" সার্ভিসটি নিতে চাই। মূল্য: ৳${gig.price}`;
    const waLink = `https://wa.me/8801610205062?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <h1 style={{ color: 'white', margin: 0 }}>🌐 মার্কেটপ্লেস (Buy & Sell)</h1>
          <button onClick={() => setShowForm(!showForm)} className="d-btn glow-btn" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
            {showForm ? '❌ বন্ধ করুন' : '➕ নতুন সার্ভিস পোস্ট করুন'}
          </button>
        </div>

        {showForm && (
          <div className="glass-3d" style={{ marginBottom: '30px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'white' }}>আপনার সার্ভিস বা প্রোডাক্ট পোস্ট করুন</h2>
            <form onSubmit={handlePostGig} style={{ display: 'grid', gap: '15px' }}>
              <input type="text" placeholder="সার্ভিসের শিরোনাম" value={title} onChange={(e) => setTitle(e.target.value)} required className="d-input" />
              <textarea placeholder="বিস্তারিত বিবরণ" value={desc} onChange={(e) => setDesc(e.target.value)} required className="d-input" style={{ minHeight: '80px' }} />
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input type="number" placeholder="মূল্য (টাকা)" value={price} onChange={(e) => setPrice(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="d-input" style={{ flex: 1, minWidth: '200px' }}>
                  <option style={{background: '#1a1c2e'}}>Website Development</option>
                  <option style={{background: '#1a1c2e'}}>Software Development</option>
                  <option style={{background: '#1a1c2e'}}>Remote Job</option>
                  <option style={{background: '#1a1c2e'}}>Digital Product</option>
                  <option style={{background: '#1a1c2e'}}>Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input type="text" placeholder="আপনার নাম" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
                <input type="email" placeholder="আপনার ইমেইল" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
              </div>
              <button type="submit" className="neon-3d-btn" style={{ width: '100%' }}>পোস্ট করুন</button>
            </form>
            {message && <p style={{ color: '#2dce89', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {gigs.map((gig) => (
            <div key={gig._id} className="glass-3d" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ background: 'rgba(78,110,242,0.2)', color: '#4e6ef2', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, alignSelf: 'flex-start', marginBottom: '10px' }}>{gig.category}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: 8, color: 'white' }}>{gig.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: 16, flex: 1 }}>{gig.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                <div>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#2dce89', margin: 0 }}>৳{gig.price}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>By {gig.sellerName}</p>
                </div>
                <button onClick={() => handleBuy(gig)} className="d-btn glow-btn" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                  🛒 Buy Now
                </button>
              </div>
            </div>
          ))}
          
          {gigs.length === 0 && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '18px', gridColumn: '1 / -1' }}>
              এখনো কোনো সার্ভিস পোস্ট করা হয়নি। আপনিই প্রথম হোন!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}