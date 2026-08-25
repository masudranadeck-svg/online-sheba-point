'use client'
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputPass, setInputPass] = useState('');
  const ADMIN_PASSWORD = "Masud890@"; // আপনার পাসওয়ার্ড এখানে

  const [activeTab, setActiveTab] = useState('add');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('shop');
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');

  // জব পোস্ট করার স্টেট
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobLink, setJobLink] = useState('');

  const API_URL = "https://online-sheba-point.onrender.com/api";

  const fetchData = async () => {
    try {
      const prodRes = await fetch(`${API_URL}/products`);
      setProducts(await prodRes.json());
      const ordRes = await fetch(`${API_URL}/orders`);
      setOrders(await ordRes.json());
    } catch (error) {}
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPass === ADMIN_PASSWORD) setIsAdmin(true);
    else alert("ভুল পাসওয়ার্ড!");
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
      if (res.ok) { setName(''); setDesc(''); setPrice(''); setKey(''); fetchData(); }
    } catch (error) { setMessage('সার্ভার এরর!'); }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setMessage('জব পোস্ট হচ্ছে...');
    try {
      const res = await fetch(`${API_URL}/jobs/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: jobTitle, 
          company: jobCompany, 
          description: "Remote Job Opportunity", 
          salary: jobSalary, 
          location: "Remote", 
          applyLink: jobLink 
        })
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) { setJobTitle(''); setJobCompany(''); setJobSalary(''); setJobLink(''); }
    } catch (error) { setMessage('সার্ভার এরর! (jobRoutes চেক করুন)'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("ডিলিট করতে চান?")) {
      try { await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' }); fetchData(); } catch (error) {}
    }
  };

  if (!isAdmin) {
    return (
      <div className="deepin-body" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <form onSubmit={handleLogin} className="glass-3d" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>🔐 অ্যাডমিন লগইন</h2>
          <input 
            type="password" 
            placeholder="পাসওয়ার্ড দিন" 
            value={inputPass} 
            onChange={(e) => setInputPass(e.target.value)} 
            required 
            className="d-input"
            style={{ marginBottom: '15px' }}
          />
          <button type="submit" className="neon-3d-btn" style={{ width: '100%' }}>অ্যাডমিন প্যানেলে ঢুকুন</button>
        </form>
      </div>
    );
  }

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>🛠️ অ্যাডমিন ড্যাশবোর্ড</h1>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('add')} className={activeTab === 'add' ? 'neon-3d-btn' : 'd-btn-outline'} style={{ marginBottom: '-1px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>➕ প্রোডাক্ট অ্যাড</button>
          <button onClick={() => setActiveTab('list')} className={activeTab === 'list' ? 'neon-3d-btn' : 'd-btn-outline'} style={{ marginBottom: '-1px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>📋 প্রোডাক্ট লিস্ট</button>
          <button onClick={() => setActiveTab('job')} className={activeTab === 'job' ? 'neon-3d-btn' : 'd-btn-outline'} style={{ marginBottom: '-1px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>💼 জব পোস্ট করুন</button>
          <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'neon-3d-btn' : 'd-btn-outline'} style={{ marginBottom: '-1px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>🛒 অর্ডার হিস্ট্রি</button>
        </div>

        {activeTab === 'add' && (
          <div className="glass-3d">
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'white' }}>নতুন প্রোডাক্ট অ্যাড করুন</h2>
            <form onSubmit={handleAddProduct} style={{ display: 'grid', gap: '15px' }}>
              <input type="text" placeholder="প্রোডাক্টের নাম" value={name} onChange={(e) => setName(e.target.value)} required className="d-input" />
              <textarea placeholder="বিবরণ" value={desc} onChange={(e) => setDesc(e.target.value)} required className="d-input" style={{ minHeight: '80px' }} />
              <div style={{ display: 'flex', gap: '15px' }}>
                <input type="number" placeholder="মূল্য (টাকা)" value={price} onChange={(e) => setPrice(e.target.value)} required className="d-input" style={{ flex: 1 }} />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="d-input" style={{ flex: 1 }}>
                  <option value="shop" style={{background: '#1a1c2e'}}>শপ</option>
                  <option value="online-sheba" style={{background: '#1a1c2e'}}>অনলাইন সেবা</option>
                  <option value="freelancer-hub" style={{background: '#1a1c2e'}}>ফ্রীলান্সার হাব</option>
                  <option value="cards" style={{background: '#1a1c2e'}}>কার্ড সেবা</option>
                  <option value="accounts" style={{background: '#1a1c2e'}}>একাউন্ট সেবা</option>
                  <option value="company-formation" style={{background: '#1a1c2e'}}>কম্পানি রেজিস্ট্রেশন</option>
                  <option value="pc-solution" style={{background: '#1a1c2e'}}>পিসি সলুশন</option>
                  <option value="subscription" style={{background: '#1a1c2e'}}>সাবস্ক্রিপশন</option>
                  <option value="remote" style={{background: '#1a1c2e'}}>রিমোট</option>
                </select>
              </div>
              <input type="text" placeholder="সফটওয়্যার কী / লিংক" value={key} onChange={(e) => setKey(e.target.value)} required className="d-input" />
              <button type="submit" className="neon-3d-btn" style={{ width: '100%' }}>প্রোডাক্ট অ্যাড করুন</button>
            </form>
            {message && activeTab === 'add' && <p style={{ color: '#2dce89', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
          </div>
        )}

        {activeTab === 'list' && (
          <div className="glass-3d" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead><tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', textAlign: 'left' }}><th style={{ padding: '12px', color: 'white' }}>নাম</th><th style={{ padding: '12px', color: 'white' }}>মূল্য</th><th style={{ padding: '12px', color: 'white' }}>স্ট্যাটাস</th><th style={{ padding: '12px', color: 'white' }}>অ্যাকশন</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: '600', color: 'white' }}>{p.name}</td>
                    <td style={{ padding: '12px', color: '#2dce89' }}>৳{p.price}</td>
                    <td style={{ padding: '12px', color: 'rgba(255,255,255,0.6)' }}>{p.isSold ? 'বিক্রি হয়েছে' : 'Available'}</td>
                    <td style={{ padding: '12px' }}><button onClick={() => handleDelete(p._id)} className="d-btn-orange" style={{ padding: '8px 12px', fontSize: '12px' }}>ডিলিট</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'job' && (
          <div className="glass-3d">
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'white' }}>💼 নতুন রিমোট জব পোস্ট করুন</h2>
            <form onSubmit={handlePostJob} style={{ display: 'grid', gap: '15px' }}>
              <input type="text" placeholder="জব টাইটেল (যেমন: Senior Web Developer)" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required className="d-input" />
              <div style={{ display: 'flex', gap: '15px' }}>
                <input type="text" placeholder="কোম্পানির নাম" value={jobCompany} onChange={(e) => setJobCompany(e.target.value)} required className="d-input" style={{ flex: 1 }} />
                <input type="text" placeholder="স্যালারি (যেমন: $1000)" value={jobSalary} onChange={(e) => setJobSalary(e.target.value)} required className="d-input" style={{ flex: 1 }} />
              </div>
              <input type="url" placeholder="এপ্লাই করার লিংক (URL)" value={jobLink} onChange={(e) => setJobLink(e.target.value)} required className="d-input" />
              <button type="submit" className="neon-3d-btn" style={{ width: '100%' }}>জব পোস্ট করুন</button>
            </form>
            {message && activeTab === 'job' && <p style={{ color: '#2dce89', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass-3d" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead><tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', textAlign: 'left' }}><th style={{ padding: '12px', color: 'white' }}>কাস্টমার ইমেইল</th><th style={{ padding: '12px', color: 'white' }}>প্রোডাক্ট</th><th style={{ padding: '12px', color: 'white' }}>মূল্য</th><th style={{ padding: '12px', color: 'white' }}>কী</th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', color: 'rgba(255,255,255,0.7)' }}>{o.buyerEmail}</td>
                    <td style={{ padding: '12px', fontWeight: '600', color: 'white' }}>{o.productName}</td>
                    <td style={{ padding: '12px', color: '#2dce89' }}>৳{o.price}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace', color: '#a855f7' }}>{o.deliveredKey}</td>
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