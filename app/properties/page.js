'use client';
import { useState, useEffect } from 'react';

export default function PropertiesPage() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('rent');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = "https://online-sheba-point.onrender.com/api";

  // সব প্রপার্টি লোড করা
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/properties`);
        setItems(await res.json());
      } catch (error) {}
    };
    fetchItems();
  }, []);

  // নতুন বিজ্ঞাপন পোস্ট করা
  const handlePost = async (e) => {
    e.preventDefault();
    setMessage('পোস্ট হচ্ছে...');
    try {
      const res = await fetch(`${API_URL}/properties/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc, price: Number(price), location, type, ownerName, ownerPhone })
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setTitle(''); setDesc(''); setPrice(''); setLocation(''); setOwnerName(''); setOwnerPhone('');
        setShowForm(false);
        const resAgain = await fetch(`${API_URL}/properties`);
        setItems(await resAgain.json());
      }
    } catch (error) {
      setMessage('সার্ভার এরর!');
    }
  };

  // ক্রেতা যখন Contact এ ক্লিক করবে
  const handleContact = (item) => {
    const cleanPhone = item.ownerPhone.replace(/[^0-9]/g, '').replace(/^0/, '880');
    const msg = `আসসালামু আলাইকুম, আপনার "${item.title}" (${item.location}) এর বিজ্ঞাপনটি দেখে যোগাযোগ করছি। বিস্তারিত জানাবেন।`;
    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  // ক্যাটাগরি অনুযায়ী ফিল্টার
  const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);

  const typeLabels = {
    rent: { label: 'ফ্ল্যাট ভাড়া', color: '#4e6ef2' },
    house: { label: 'বাড়ি কেনা-বেচা', color: '#a855f7' },
    land: { label: 'জমি বিক্রি', color: '#2dce89' }
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <h1 style={{ color: 'white', margin: 0 }}>🏠 রিয়েল এস্টেট (ফ্ল্যাট, বাড়ি ও জমি)</h1>
          <button onClick={() => setShowForm(!showForm)} className="d-btn glow-btn" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
            {showForm ? '❌ বন্ধ করুন' : '➕ বিজ্ঞাপন দিন'}
          </button>
        </div>

        {/* ফিল্টার বাটন */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {[
            { id: 'all', label: '🎯 সব' },
            { id: 'rent', label: '🏢 ফ্ল্যাট ভাড়া' },
            { id: 'house', label: '🏡 বাড়ি' },
            { id: 'land', label: '🌍 জমি' }
          ].map(cat => (
            <button 
              key={cat.id} 
              onClick={() => setFilter(cat.id)} 
              className={filter === cat.id ? 'd-btn glow-btn' : 'd-btn-outline'}
              style={{ padding: '8px 20px', fontSize: '13px', cursor: 'pointer' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* বিজ্ঞাপন পোস্ট করার ফর্ম */}
        {showForm && (
          <div className="glass-3d" style={{ marginBottom: '30px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'white' }}>আপনার প্রপার্টির বিজ্ঞাপন দিন</h2>
            <form onSubmit={handlePost} style={{ display: 'grid', gap: '15px' }}>
              <input type="text" placeholder="শিরোনাম (যেমন: ৩ বেডরুমের ফ্ল্যাট ভাড়া)" value={title} onChange={(e) => setTitle(e.target.value)} required className="d-input" />
              <textarea placeholder="বিস্তারিত (সাইজ, ফ্লোর, এমেনিটিজ ইত্যাদি)" value={desc} onChange={(e) => setDesc(e.target.value)} required className="d-input" style={{ minHeight: '80px' }} />
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <select value={type} onChange={(e) => setType(e.target.value)} className="d-input" style={{ flex: 1, minWidth: '200px' }}>
                  <option value="rent" style={{background: '#1a1c2e'}}>ফ্ল্যাট ভাড়া</option>
                  <option value="house" style={{background: '#1a1c2e'}}>বাড়ি কেনা-বেচা</option>
                  <option value="land" style={{background: '#1a1c2e'}}>জমি বিক্রি</option>
                </select>
                <input type="text" placeholder="এলাকা (যেমন: মিরপুর, ঢাকা)" value={location} onChange={(e) => setLocation(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
                <input type="number" placeholder="মূল্য (টাকা/মাস)" value={price} onChange={(e) => setPrice(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input type="text" placeholder="মালিকের নাম" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
                <input type="text" placeholder="হোয়াটসঅ্যাপ নাম্বার" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} required className="d-input" style={{ flex: 1, minWidth: '200px' }} />
              </div>
              
              <button type="submit" className="neon-3d-btn" style={{ width: '100%' }}>বিজ্ঞাপন পোস্ট করুন</button>
            </form>
            {message && <p style={{ color: '#2dce89', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
          </div>
        )}

        {/* প্রপার্টির লিস্ট */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredItems.map((item) => (
            <div key={item._id} className="glass-3d" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ background: `rgba(${item.type === 'rent' ? '78,110,242' : item.type === 'house' ? '168,85,247' : '45,206,137'}, 0.2)`, color: typeLabels[item.type]?.color, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                  {typeLabels[item.type]?.label}
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: 8, color: 'white' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: 8, flex: 1 }}>{item.description}</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>📍 {item.location}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                <div>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#2dce89', margin: 0 }}>৳{item.price}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>By {item.ownerName}</p>
                </div>
                <button onClick={() => handleContact(item)} className="d-btn-green glow-btn-green" style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                  💬 যোগাযোগ করুন
                </button>
              </div>
            </div>
          ))}
          
          {filteredItems.length === 0 && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '18px', gridColumn: '1 / -1' }}>
              এই ক্যাটাগরিতে এখনো কোনো বিজ্ঞাপন নেই।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}