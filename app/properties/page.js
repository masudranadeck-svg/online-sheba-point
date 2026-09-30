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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/properties`);
        setItems(await res.json());
      } catch (error) {}
    };
    fetchItems();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setMessage('Posting...');
    try {
      const res = await fetch(`${API_URL}/properties/add`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
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
    } catch (error) { setMessage('Server Error!'); }
  };

  const handleContact = (item) => {
    const cleanPhone = item.ownerPhone.replace(/[^0-9]/g, '').replace(/^0/, '880');
    const msg = `আসসালামু আলাইকুম, আমি আপনার "${item.title}" (${item.location}) এর বিজ্ঞাপনটি দেখে যোগাযোগ করছি। বিস্তারিত জানাবেন।`;
    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);

  // Inline Styles for Stability
  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope', sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '1280px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    headerFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    title: { fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    btnPrimary: { display: 'inline-block', padding: '14px 28px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' },
    filterBtn: (isActive) => ({ padding: '8px 16px', background: isActive ? 'var(--bg-card)' : 'transparent', color: isActive ? 'var(--accent)' : 'var(--fg-muted)', border: 'none', borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }),
    card: { position: 'relative', background: 'var(--bg-card)', border: '1px solid transparent', borderRadius: '8px', padding: '24px', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' },
    corner: (pos) => ({ position: 'absolute', width: '14px', height: '14px', borderColor: 'var(--accent)', ...pos }),
    input: { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-bright)', padding: '12px 0', color: 'white', outline: 'none', fontSize: '14px' },
    label: { fontSize: '10px', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", display: 'block', marginBottom: '8px' },
  };
  
  const handleMouseEnter = (e) => {
    e.currentTarget.style.borderColor = 'var(--accent)';
    e.currentTarget.style.boxShadow = '0 0 25px rgba(255,91,20,0.4)';
    e.currentTarget.style.transform = 'translateY(-4px)';
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.borderColor = 'transparent';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Header */}
        <div style={styles.headerFlex}>
          <div>
            <div style={styles.eyebrow}>
              <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
              15 / Real Estate
            </div>
            <h1 style={styles.title}>Properties.</h1>
            <p style={{ color: 'var(--fg-dim)', marginTop: '16px', maxWidth: '400px' }}>Buy, sell, and rent properties directly from owners.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={styles.btnPrimary}>
            {showForm ? '❌ Close' : '➕ Post Ad'}
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', flexWrap: 'wrap' }}>
          {[{id:'all', label:'All'}, {id:'rent', label:'Rent'}, {id:'sell', label:'Sell'}, {id:'house', label:'House'}, {id:'land', label:'Land'}].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={styles.filterBtn(filter === f.id)}>{f.label}</button>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div style={{ ...styles.card, maxWidth: '600px', margin: '0 auto 48px auto', border: '1px solid var(--border)' }}>
            <div style={styles.corner({top: '8px', left: '8px', borderTop: '1px solid', borderLeft: '1px solid'})}></div>
            <div style={styles.corner({top: '8px', right: '8px', borderTop: '1px solid', borderRight: '1px solid'})}></div>
            <div style={styles.corner({bottom: '8px', left: '8px', borderBottom: '1px solid', borderLeft: '1px solid'})}></div>
            <div style={styles.corner({bottom: '8px', right: '8px', borderBottom: '1px solid', borderRight: '1px solid'})}></div>
            
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '32px', fontFamily: "'Syne', sans-serif" }}>Post Property Ad</h2>
            <form onSubmit={handlePost} style={{ display: 'grid', gap: '24px' }}>
              <div><label style={styles.label}>Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} /></div>
              <div><label style={styles.label}>Description</label><textarea value={desc} onChange={(e) => setDesc(e.target.value)} required style={{...styles.input, resize: 'none', minHeight: '60px'}} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div><label style={styles.label}>Type</label><select value={type} onChange={(e) => setType(e.target.value)} style={{...styles.input, background: 'var(--bg)'}}><option value="rent">Rent</option><option value="sell">Sell</option><option value="house">House</option><option value="land">Land</option></select></div>
                <div><label style={styles.label}>Price (৳)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={styles.input} /></div>
              </div>
              <div><label style={styles.label}>Location</label><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required style={styles.input} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div><label style={styles.label}>Your Name</label><input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required style={styles.input} /></div>
                <div><label style={styles.label}>WhatsApp Number</label><input type="text" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} required style={styles.input} /></div>
              </div>
              <button type="submit" style={styles.btnPrimary}>Deploy Ad →</button>
              {message && <p style={{ color: 'var(--lime)', fontSize: '14px', marginTop: '8px' }}>{message}</p>}
            </form>
          </div>
        )}

        {/* Properties Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {filteredItems.length === 0 ? (
            <div style={{ ...styles.card, gridColumn: '1 / -1', textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={styles.corner({top: '8px', left: '8px', borderTop: '1px solid', borderLeft: '1px solid'})}></div>
              <div style={styles.corner({top: '8px', right: '8px', borderTop: '1px solid', borderRight: '1px solid'})}></div>
              <div style={styles.corner({bottom: '8px', left: '8px', borderBottom: '1px solid', borderLeft: '1px solid'})}></div>
              <div style={styles.corner({bottom: '8px', right: '8px', borderBottom: '1px solid', borderRight: '1px solid'})}></div>
              <p style={{ color: 'var(--fg-muted)', padding: '48px 0' }}>No properties available in this category.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item._id} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={styles.card}
              >
                <div style={styles.corner({top: '8px', left: '8px', borderTop: '1px solid', borderLeft: '1px solid'})}></div>
                <div style={styles.corner({top: '8px', right: '8px', borderTop: '1px solid', borderRight: '1px solid'})}></div>
                <div style={styles.corner({bottom: '8px', left: '8px', borderBottom: '1px solid', borderLeft: '1px solid'})}></div>
                <div style={styles.corner({bottom: '8px', right: '8px', borderBottom: '1px solid', borderRight: '1px solid'})}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', background: 'var(--accent)', color: '#0a0a0b', fontWeight: '700' }}>{item.type}</span>
                  <span style={{ fontSize: '10px', color: 'var(--fg-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{item.location}</span>
                </div>
                
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: 'var(--fg)', fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--fg-muted)', marginBottom: '24px', flex: '1', lineHeight: '1.6' }}>{item.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                  <div>
                    <p style={{ fontSize: '10px', color: 'var(--fg-muted)', fontFamily: "'JetBrains Mono', monospace", margin: '0 0 4px 0', textTransform: 'uppercase' }}>Price</p>
                    <p style={{ fontSize: '20px', fontWeight: '800', color: 'var(--lime)', margin: '0', fontFamily: "'Syne', sans-serif" }}>৳{item.price}</p>
                  </div>
                  <button onClick={() => handleContact(item)} style={{ padding: '10px 16px', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)', cursor: 'pointer', fontSize: '11px', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}>Contact →</button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}