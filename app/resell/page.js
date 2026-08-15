'use client';
import { useState } from 'react';

export default function ResellPage() {
  const whatsappNumber = "8801610205062";
  
  const [productName, setProductName] = useState('');
  const [condition, setCondition] = useState('নতুনের মতো');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLocation, setSellerLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSell = async (e) => {
    e.preventDefault();
    setMessage('আপনার অনুরোধ প্রসেস হচ্ছে...');

    const msg = `🛍️ *পুরোনো পণ্য বিক্রির অনুরোধ*\n\n` +
                `*পণ্যের নাম:* ${productName}\n` +
                `*অবস্থা:* ${condition}\n` +
                `*মূল্য:* ৳${price}\n` +
                `*বিস্তারিত:* ${details}\n\n` +
                `*বিক্রেতার নাম:* ${sellerName}\n` +
                `*এলাকা:* ${sellerLocation}`;
                
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    
    // ১ সেকেন্ড পর হোয়াটসঅ্যাপ ওপেন হবে
    setTimeout(() => {
      window.open(waLink, '_blank');
      setMessage('আপনার তথ্য হোয়াটসঅ্যাপে পাঠানো হয়েছে! অ্যাডমিন যাচাই করে সাইটে পাবলিশ করবে।');
      setProductName(''); setPrice(''); setDetails(''); setSellerName(''); setSellerLocation('');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <section style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop: 150, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>♻️ পুরোনো পণ্য ক্রয়-বিক্রয়</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>আপনার অব্যবহৃত বা পুরোনো ফোন, ল্যাপটপ, গ্যাজেট বিক্রি করুন অথবা কিনুন।</p>
        </div>
      </section>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* নির্দেশনা বক্স */}
        <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '12px', marginBottom: '30px', color: '#1976d2', fontSize: '14px' }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: '700' }}>📌 কীভাবে কাজ করে?</p>
          <p style={{ margin: 0 }}>নিচের ফর্মটি পূরণ করে বিক্রি করুন বাটনে ক্লিক করুন। আপনার পণ্যের ছবি ও বিবরণ সরাসরি আমাদের হোয়াটসঅ্যাপে চলে যাবে। যাচাই শেষে আমরা এটি আমাদের পেজে পাবলিশ করব।</p>
        </div>

        <div className="d-card glow-card" style={{ padding: '30px' }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a2e' }}>পণ্য বিক্রি করুন</h2>
          <form onSubmit={handleSell} style={{ display: 'grid', gap: '15px' }}>
            <input type="text" placeholder="পণ্যের নাম (যেমন: iPhone 11 64GB)" value={productName} onChange={(e) => setProductName(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
            <div style={{ display: 'flex', gap: '15px' }}>
              <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', background: 'white' }}>
                <option>নতুনের মতো</option>
                <option>খুব ভালো</option>
                <option>ভালো</option>
                <option>মোটামুটি</option>
              </select>
              <input type="number" placeholder="মূল্য (টাকা)" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
            <textarea placeholder="বিস্তারিত (ব্যাটারি, চার্জার, কোনো সমস্যা আছে কি না)" value={details} onChange={(e) => setDetails(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '80px' }} />
            <div style={{ display: 'flex', gap: '15px' }}>
              <input type="text" placeholder="আপনার নাম" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
              <input type="text" placeholder="আপনার এলাকা" value={sellerLocation} onChange={(e) => setSellerLocation(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
            <button type="submit" style={{ padding: '12px', background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>📤 বিক্রি করুন</button>
          </form>
          {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}