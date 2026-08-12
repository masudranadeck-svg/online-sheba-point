'use client';
import { useState } from 'react';

export default function DollarExchangePage() {
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [sendCur, setSendCur] = useState('USD');
  const [receiveCur, setReceiveCur] = useState('BDT');

  // ডেমো রেট (আপনি চাইলে বদলাতে পারবেন)
  const rate = 120; 

  // এক্সচেঞ্জ ক্যালকুলেটর
  const handleCalculate = (value, type) => {
    if (type === 'send') {
      setSendAmount(value);
      const num = parseFloat(value) || 0;
      setReceiveCur('BDT');
      setSendCur('USD');
      setReceiveAmount((num * rate).toFixed(2));
    } else {
      setReceiveAmount(value);
      const num = parseFloat(value) || 0;
      setReceiveCur('BDT');
      setSendCur('USD');
      setSendAmount((num / rate).toFixed(2));
    }
  };

  // হোয়াটসঅ্যাপ মেসেজ
  const whatsappNumber = "8801610205062"; 
  const msg = `আসসালামু আলাইকুম, আমি ডলার এক্সচেঞ্জ করতে চাই।%0Aপরিমাণ: ${sendAmount} ${sendCur}%0Aপাবো: ${receiveAmount} ${receiveCur}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${msg}`;

  // ডেমো লাইভ ট্রানজেকশন ডাটা
  const transactions = [
    { user: 'Rahul***', sent: '$50', received: '6000 BDT', time: '5 মিনিট আগে' },
    { user: 'Karim***', sent: '$100', received: '12000 BDT', time: '15 মিনিট আগে' },
    { user: 'Sadia***', sent: '2000 BDT', received: '$16.67', time: '1 ঘন্টা আগে' },
  ];

  // ডেমো রিজার্ভ বা স্টক
  const reserves = [
    { method: 'bKash', amount: '৳ 45,000' },
    { method: 'Nagad', amount: '৳ 30,000' },
    { method: 'USD (Paypal)', amount: '$ 1,200' },
    { method: 'USD (Payoneer)', amount: '$ 800' },
  ];

  // কাস্টমার রিভিউ
  const reviews = [
    { name: 'Imran Hossain', text: 'খুব দ্রুত এবং নিরাপদে ডলার বিক্রি করতে পারলাম। অসাধারণ সার্ভিস!', rating: '⭐⭐⭐⭐⭐' },
    { name: 'Tania Akter', text: 'Online Sheba Point এর সাথে কাজ করে ভালো লাগলো। টাকা সাথে সাথেই বিকাশে পেলাম।', rating: '⭐⭐⭐⭐⭐' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <section style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop: 120, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>💵 ডলার এক্সচেঞ্জ (Freelancer Hub)</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>ফ্রিল্যান্সিং ও মাইক্রোজব কাজের নিরাপদ ও নির্ভরযোগ্য ডলার বিক্রি/ক্রয় সেবা।</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        
        {/* নীতিমালা */}
        <div style={{ background: '#fff3cd', border: '1px solid #ffeeba', color: '#856404', padding: '16px 20px', borderRadius: '12px', marginBottom: '32px', textAlign: 'center', fontSize: 14 }}>
          ⚠️ <strong>আমাদের নীতিমালা:</strong> ই-কমার্স, ফ্রিল্যান্সিং ও মাইক্রোজব কাজে নিরাপদ সেবাই আমাদের লক্ষ্য। জুয়া, অর্থ পাচার, হারাম উৎসের অর্থ লেনদেন সম্পূর্ণ নিষিদ্ধ। Online Sheba Point সর্বদা দেশের আইন ও নৈতিকতার প্রতি শ্রদ্ধাশীল।
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* এক্সচেঞ্জ ফর্ম */}
          <div className="d-card glow-card" style={{ padding: '24px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a2e' }}>🔄 এক্সচেঞ্জ করুন</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: 14, color: '#888', marginBottom: '8px', display: 'block' }}>আপনি পাঠাবেন (Send)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" placeholder="0.00" value={sendAmount} onChange={(e) => handleCalculate(e.target.value, 'send')} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: 16 }} />
                  <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', background: '#f9f9f9', fontWeight: 600 }}>
                    <option>USD</option>
                  </select>
                </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: 24, color: '#4e6ef2' }}>⬇️</div>
              <div>
                <label style={{ fontSize: 14, color: '#888', marginBottom: '8px', display: 'block' }}>আপনি পাবেন (Receive)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" placeholder="0.00" value={receiveAmount} onChange={(e) => handleCalculate(e.target.value, 'receive')} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: 16 }} />
                  <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', background: '#f9f9f9', fontWeight: 600 }}>
                    <option>BDT</option>
                  </select>
                </div>
              </div>
              <p style={{ fontSize: 14, color: '#888', textAlign: 'center' }}>বর্তমান রেট: 1 USD = ৳{rate} BDT</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="d-btn glow-btn" style={{ display: 'block', textAlign: 'center', padding: '14px', fontSize: 16, textDecoration: 'none', fontWeight: 700, marginTop: '8px' }}>
                🟢 Exchange Now
              </a>
            </div>
          </div>

          {/* রিজার্ভ বা স্টক */}
          <div className="d-card glow-card" style={{ padding: '24px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a2e' }}>🏦 রিজার্ভ বা স্টক</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reserves.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f5f7fa', borderRadius: '8px', fontSize: 15 }}>
                  <span style={{ fontWeight: 600, color: '#1a1a2e' }}>{r.method}</span>
                  <span style={{ color: '#2dce89', fontWeight: 700 }}>{r.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* লাইভ ট্রানজেকশন */}
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>📋 সর্বশেষ লেনদেন (Live Transactions)</h3>
          <div className="d-card glow-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f7fa', textAlign: 'left' }}>
                  <th style={{ padding: '12px', fontSize: 14, color: '#888' }}>ইউজার</th>
                  <th style={{ padding: '12px', fontSize: 14, color: '#888' }}>পাঠিয়েছে</th>
                  <th style={{ padding: '12px', fontSize: 14, color: '#888' }}>পেয়েছে</th>
                  <th style={{ padding: '12px', fontSize: 14, color: '#888' }}>সময়</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#1a1a2e' }}>{t.user}</td>
                    <td style={{ padding: '12px', color: '#fb6340', fontWeight: 600 }}>{t.sent}</td>
                    <td style={{ padding: '12px', color: '#2dce89', fontWeight: 600 }}>{t.received}</td>
                    <td style={{ padding: '12px', color: '#aaa', fontSize: 13 }}>{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* কাস্টমার রিভিউ */}
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>⭐ কাস্টমার রিভিউ</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {reviews.map((r, i) => (
              <div key={i} className="d-card glow-card" style={{ padding: '20px' }}>
                <p style={{ fontSize: 18, marginBottom: '8px' }}>{r.rating}</p>
                <p style={{ color: '#555', fontSize: 14, marginBottom: '12px', fontStyle: 'italic' }}>"{r.text}"</p>
                <p style={{ fontWeight: 700, color: '#1a1a2e', margin: 0 }}>- {r.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px', textAlign: 'center' }}>❓ সাধারণ প্রশ্ন (FAQ)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="d-card glow-card" style={{ padding: '16px 20px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1a1a2e' }}>১. এক্সচেঞ্জ করতে কত সময় লাগে?</h4>
              <p style={{ margin: 0, color: '#666', fontSize: 14 }}>হোয়াটসঅ্যাপে রিকোয়েস্ট করার সাথে সাথে ৫-১০ মিনিটের মধ্যে লেনদেন সম্পন্ন হয়।</p>
            </div>
            <div className="d-card glow-card" style={{ padding: '16px 20px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1a1a2e' }}>২. কোন পেমেন্ট মেথডগুলো সাপোর্ট করে?</h4>
              <p style={{ margin: 0, color: '#666', fontSize: 14 }}>আমরা bKash, Nagad, Rocket এবং ব্যাংক ট্রান্সফার সাপোর্ট করি। ডলারের ক্ষেত্রে PayPal, Payoneer বা কার্ড ট্রান্সফার গ্রহণযোগ্য।</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}