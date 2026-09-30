'use client';
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
      } catch (error) { console.log("Error fetching gigs"); }
    };
    fetchGigs();
  }, []);

  const handlePostGig = async (e) => {
    e.preventDefault();
    setMessage('Posting...');
    try {
      const res = await fetch(`${API_URL}/gigs/add`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
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
    } catch (error) { setMessage('Server Error!'); }
  };

  const handleBuy = (gig) => {
    const msg = `আসসালামু আলাইকুম, আমি আপনার "${gig.title}" সার্ভিসটি নিতে চাই। মূল্য: ৳${gig.price}`;
    const waLink = `https://wa.me/8801610205062?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <div className="section-eyebrow mb-4">03 / Marketplace</div>
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">Buy & Sell.</h1>
            <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">Offer your services or find freelancers for your digital needs.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary self-start lg:self-end">
            {showForm ? '❌ Close' : '➕ Post a Service'}
          </button>
        </div>

        {showForm && (
          <div className="relative bg-[var(--bg-card)] p-8 border border-[var(--border)] rounded-lg mb-12 max-w-2xl mx-auto">
            <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
            <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-6">Post a New Service</h3>
            <form onSubmit={handlePostGig} className="grid gap-4">
              <input type="text" placeholder="Service Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" />
              <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors resize-none" rows="3"></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price (৳)" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[var(--bg)] border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors">
                  <option>Website Development</option><option>Software Development</option><option>Remote Job</option><option>Digital Product</option><option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" />
                <input type="email" placeholder="Your Email" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} required className="w-full bg-transparent border-b border-[var(--border-bright)] py-3 text-white outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <button type="submit" className="btn-primary w-fit mt-4">Submit Service →</button>
              {message && <p className="text-[var(--lime)] font-mono text-sm mt-2">{message}</p>}
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gigs.map((gig) => (
            <div key={gig._id} className="relative bg-[var(--bg-card)] p-6 rounded-lg border border-transparent hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4)] transition-all duration-300 flex flex-col">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <span className="text-[9px] font-mono px-2 py-1 bg-[var(--accent)] text-black font-bold tracking-widest rounded-sm mb-4 w-fit">{gig.category}</span>
              <h3 className="font-display font-bold text-base tracking-tight mb-2 text-[var(--fg)]">{gig.title}</h3>
              <p className="text-xs text-[var(--fg-muted)] mb-6 flex-grow">{gig.description}</p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-[var(--border)]">
                <div>
                  <span className="font-display font-bold text-lg text-[var(--fg)]">৳{gig.price}</span>
                  <p className="text-[10px] text-[var(--fg-muted)] mt-1">By {gig.sellerName}</p>
                </div>
                <button onClick={() => handleBuy(gig)} className="btn-primary !py-2 !px-3 text-[10px]">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}