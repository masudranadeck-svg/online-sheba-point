'use client';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputPass, setInputPass] = useState('');
  const ADMIN_PASSWORD = "Masud890@"; 

  const [activeTab, setActiveTab] = useState('add');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('shop');
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');

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
    else alert("ভুল পাসওয়ার্ড! অ্যাক্সেস ডিনায়েড।");
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage('প্রোডাক্ট যোগ করা হচ্ছে...');
    try {
      const res = await fetch(`${API_URL}/products/add`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
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
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: jobTitle, company: jobCompany, description: "Remote Job Opportunity", salary: jobSalary, location: "Remote", applyLink: jobLink })
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) { setJobTitle(''); setJobCompany(''); setJobSalary(''); setJobLink(''); }
    } catch (error) { setMessage('সার্ভার এরর!'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি এই প্রোডাক্টটি ডিলিট করতে চান?")) {
      try { await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' }); fetchData(); } catch (error) {}
    }
  };

  // Login Screen
  if (!isAdmin) {
    return (
      <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope', sans-serif", minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '48px', maxWidth: '400px', width: '100%', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 16px', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '0', border: '1px solid var(--accent)', transform: 'rotate(45deg)' }}></div>
              <div style={{ position: 'absolute', inset: '4px', background: 'var(--accent)', transform: 'rotate(45deg)' }}></div>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' }}>ADMIN ACCESS</h1>
            <p style={{ color: 'var(--fg-muted)', fontSize: '12px', marginTop: '8px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Authentication Required</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", display: 'block', marginBottom: '8px' }}>Password</label>
              <input type="password" placeholder="••••••••" value={inputPass} onChange={(e) => setInputPass(e.target.value)} required style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-bright)', padding: '12px 0', color: 'white', outline: 'none' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>Authenticate →</button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  const inputStyle = { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-bright)', padding: '12px 0', color: 'white', outline: 'none', fontSize: '14px' };
  const labelStyle = { fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", display: 'block', marginBottom: '8px' };
  const btnPrimary = { padding: '14px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' };
  const cardStyle = { position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px' };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope', sans-serif", minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 24px 64px 24px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
              <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
              99 / Admin Control
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' }}>Admin Panel.</h1>
          </div>
          <button onClick={() => setIsAdmin(false)} style={{ padding: '12px 24px', background: 'transparent', color: 'var(--fg-dim)', border: '1px solid var(--border-bright)', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}>Disconnect</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', flexWrap: 'wrap' }}>
          {[{id:'add', label:'Add Product'}, {id:'list', label:'Product List'}, {id:'job', label:'Post Job'}, {id:'orders', label:'Orders'}].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 16px', background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent', color: activeTab === tab.id ? 'var(--accent)' : 'var(--fg-muted)', border: 'none', borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}>{tab.label}</button>
          ))}
        </div>

        {/* Add Product Tab */}
        {activeTab === 'add' && (
          <div style={{ ...cardStyle, maxWidth: '600px' }}>
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
            
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '32px', fontFamily: "'Syne', sans-serif" }}>New Product</h2>
            <form onSubmit={handleAddProduct} style={{ display: 'grid', gap: '24px' }}>
              <div><label style={labelStyle}>Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} /></div>
              <div><label style={labelStyle}>Description</label><textarea value={desc} onChange={(e) => setDesc(e.target.value)} required style={{...inputStyle, resize: 'none', minHeight: '60px'}} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div><label style={labelStyle}>Price (৳)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} style={{...inputStyle, background: 'var(--bg)'}}><option value="shop">Shop</option><option value="software">Software</option><option value="subscription">Subscription</option><option value="remote">Remote</option></select></div>
              </div>
              <div><label style={labelStyle}>Software Key / Link</label><input type="text" value={key} onChange={(e) => setKey(e.target.value)} required style={inputStyle} /></div>
              <button type="submit" style={btnPrimary}>Deploy Product →</button>
              {message && activeTab === 'add' && <p style={{ color: 'var(--lime)', fontSize: '14px', marginTop: '8px' }}>{message}</p>}
            </form>
          </div>
        )}

        {/* Product List Tab */}
        {activeTab === 'list' && (
          <div style={{ ...cardStyle, overflowX: 'auto' }}>
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead><tr style={{ borderBottom: '1px solid var(--border)' }}><th style={{ padding: '12px', textAlign: 'left', fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace" }}>Name</th><th style={{ padding: '12px', textAlign: 'left', fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace" }}>Price</th><th style={{ padding: '12px', textAlign: 'left', fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace" }}>Action</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px', fontSize: '14px', color: 'var(--fg)' }}>{p.name}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: 'var(--lime)' }}>৳{p.price}</td>
                    <td style={{ padding: '12px' }}><button onClick={() => handleDelete(p._id)} style={{ padding: '8px 12px', background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', cursor: 'pointer', fontSize: '10px', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Post Job Tab */}
        {activeTab === 'job' && (
          <div style={{ ...cardStyle, maxWidth: '600px' }}>
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
            
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '32px', fontFamily: "'Syne', sans-serif" }}>New Job Post</h2>
            <form onSubmit={handlePostJob} style={{ display: 'grid', gap: '24px' }}>
              <div><label style={labelStyle}>Job Title</label><input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required style={inputStyle} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div><label style={labelStyle}>Company</label><input type="text" value={jobCompany} onChange={(e) => setJobCompany(e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Salary</label><input type="text" value={jobSalary} onChange={(e) => setJobSalary(e.target.value)} required style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Apply Link</label><input type="url" value={jobLink} onChange={(e) => setJobLink(e.target.value)} required style={inputStyle} /></div>
              <button type="submit" style={btnPrimary}>Deploy Job →</button>
              {message && activeTab === 'job' && <p style={{ color: 'var(--lime)', fontSize: '14px', marginTop: '8px' }}>{message}</p>}
            </form>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{ ...cardStyle, overflowX: 'auto' }}>
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '14px', height: '14px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }}></div>
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '14px', height: '14px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }}></div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace" }}>Customer</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace" }}>Product</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace" }}>Price</th>
              </tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px', fontSize: '14px', color: 'var(--fg-dim)' }}>{o.buyerEmail}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: 'var(--fg)' }}>{o.productName || 'Multiple Items'}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: 'var(--lime)' }}>৳{o.price || o.totalAmount}</td>
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