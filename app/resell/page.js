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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/resell`);
        setItems(await res.json());
      } catch (error) {}
    };
    fetchItems();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setMessage('Posting...');
    try {
      const res = await fetch(`${API_URL}/resell/add`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: details, price: Number(price), condition, sellerName, sellerPhone })
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setTitle(''); setPrice(''); setDetails(''); setSellerName(''); setSellerPhone('');
        setShowForm(false);
        const resAgain = await fetch(`${API_URL}/resell`);
        setItems(await resAgain.json());
      }
    } catch (error) { setMessage('Server Error!'); }
  };

  const handleBuy = (item) => {
    const cleanPhone = item.sellerPhone.replace(/[^0-9]/g, '').replace(/^0/, '880');
    const msg = `আসসালামু আলাইকুম, আমি আপনার "${item.title}" পণ্যটি কিনতে আগ্রহী। মূল্য: ৳${item.price}`;
    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <div className="section-eyebrow mb-4">04 / Resell</div>
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">Old Products.</h1>
            <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">Buy and sell used or second-hand digital and physical products.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary self-start lg:self-end">
            {showForm ? '❌ Close' : '➕ Post an Item'}
          </button>
        </div>

        {showForm && (
          <div className="relative bg-[var(--bg-card)] p-8 border border-[var(--border)] rounded-lg mb-12 max-w-2xl mx-auto">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-6">Sell Your Item</h3>
            <form onSubmit={handlePost} className="grid gap-4">
              <input type="text" placeholder="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" />
              <div className="grid grid-cols-2 gap-4">
                <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full bg-[var(--bg)] border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors">
                  <option>নতুনের মতো</option><option>খুব ভালো</option><option>ভালো</option><option>মোটামুটি</option>
                </select>
                <input type="number" placeholder="Price (৳)" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <textarea placeholder="Details (Battery, Charger, Issues etc.)" value={details} onChange={(e) => setDetails(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors resize-none" rows="3"></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" />
                <input type="text" placeholder="WhatsApp Number" value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <button type="submit" className="btn-primary w-fit mt-4">Post Item →</button>
              {message && <p className="text-[var(--lime)] font-mono text-sm mt-2">{message}</p>}
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="relative bg-[var(--bg-card)] p-6 rounded-lg border border-transparent hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4)] transition-all duration-300 flex flex-col">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <span className="text-[9px] font-mono px-2 py-1 bg-[var(--lime)] text-black font-bold tracking-widest rounded-sm mb-4 w-fit">{item.condition}</span>
              <h3 className="font-display font-bold text-base tracking-tight mb-2 text-[var(--fg)]">{item.title}</h3>
              <p className="text-xs text-[var(--fg-muted)] mb-6 flex-grow">{item.description}</p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-[var(--border)]">
                <div>
                  <span className="font-display font-bold text-lg text-[var(--fg)]">৳{item.price}</span>
                  <p className="text-[10px] text-[var(--fg-muted)] mt-1">By {item.sellerName}</p>
                </div>
                <button onClick={() => handleBuy(item)} className="btn-primary !py-2 !px-3 text-[10px]">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}