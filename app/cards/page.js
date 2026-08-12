'use client';

export default function CardsPage() {
  const whatsappNumber = "8801610205062";

  // দাম 2x + 600 করে দেওয়া হয়েছে
  const cardServices = [
    { id: 1, name: 'ভার্চুয়াল ভিসা কার্ড', price: '৭৯৮/- টাকা', icon: '💳' },
    { id: 2, name: 'ভার্চুয়াল মাস্টার কার্ড', price: '১২০০/- টাকা', icon: '💳' },
    { id: 3, name: 'ফিজিক্যাল ক্রেডিট কার্ড', price: '১৫৭০/- টাকা', icon: '🪪' },
    { id: 4, name: 'ফিজিক্যাল ডেবিট কার্ড', price: '১৪৯০/- টাকা', icon: '🪪' },
    { id: 5, name: 'ফিজিক্যাল ভিসা কার্ড', price: '১৩৯৮/- টাকা', icon: '🪪' },
    { id: 6, name: 'ফিজিক্যাল মাস্টার কার্ড', price: '১৭৯৮/- টাকা', icon: '🪪' },
    { id: 7, name: 'পেওনিয়ার কার্ড', price: '২০০০/- টাকা', icon: '🌍' },
    { id: 8, name: 'পেপাল কার্ড', price: '২১০০/- টাকা', icon: '🅿️' },
    { id: 9, name: 'স্ক্রিল কার্ড', price: '২১০০/- টাকা', icon: '💸' },
    { id: 10, name: 'রেডট পে (RedotPay)', price: '২১০০/- টাকা', icon: '🔴' },
    { id: 11, name: 'স্পেশাল মেটাল কার্ড', price: '৩০০০/- টাকা', icon: '🌟', isSpecial: true },
  ];

  // কার্ডের ফিচারসমূহ
  const features = [
    "USA এর যে কোন Bank থেকেও ফান্ড ট্রান্সফার করতে পারবেন।",
    "Meta Verified করতে পারবেন।",
    "যে কোন সার্ভার থেকে পেমেন্ট নিতে পারবেন।",
    "ফাইবার, আপওয়ার্ক, ফ্রিলান্সার সহ যেকোন মার্কেটপ্লেস থেকে টাকা তুলতে পারবেন।",
    "এটি দিয়ে ফেসবুকে এড দিতে পারবেন।",
    "গুগলে এড দিতে পারবেন।",
    "ইউটিউব এড দিতে পারবেন।",
    "পেজ প্রোমোট করতে পারবেন।",
    "যেকোন পেপালে এড করতে পারবেন।",
    "আলিবাবা এক্সপ্রেসে পেমেন্ট করতে পারবেন।",
    "যেকোন ওয়েব সাইটে পেমেন্ট করতে পারবেন।",
    "ডোমেইন হোস্টিং কিনতে পারবেন।",
    "ফ্রি ফায়ার অথবা পাবজি এর ডাইমোন্ড কিনতে পারবেন।",
    "গুগল প্লে স্টোর থেকে গেমস অথবা এ্যাপ কিনতে পারবেন।",
    "ভিপিএন / প্রক্সি পেমেন্ট করতে পারবেন।",
    "টেলিগ্রাম, ইউটিউব প্রিমিয়াম করতে পারবেন।",
    "এছাড়াও কার্ড দিয়ে যেকোনো অনলাইন পেমেন্ট সহ যেকোনো কারেন্সিতে পেমেন্ট করতে পারবেন।"
  ];

  const handleOrder = (cardName) => {
    const msg = `আসসালামু আলাইকুম। Online Sheba Point থেকে আমি "${cardName}" নিতে চাই। অনুগ্রহ করে বিস্তারিত জানাবেন।`;
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <section style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop: 120, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>💳 ভিসা, মাস্টার ও ভার্চুয়াল কার্ড সেবা</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>আপনার সকল অনলাইন পেমেন্টের সমাধান এক জায়গায়। নিরাপদ ও নির্ভরযোগ্য।</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        
        {/* কার্ড লিস্ট */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {cardServices.map((card) => (
            <div 
              key={card.id} 
              className="d-card glow-card" 
              style={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                border: card.isSpecial ? '2px solid #fbbf24' : '1px solid #f0f0f0'
              }}
            >
              <div>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{card.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>{card.name}</h3>
                {card.isSpecial && <span style={{ background: '#fbbf24', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>PREMIUM</span>}
              </div>
              
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: 24, fontWeight: 700, color: '#2dce89', marginBottom: 16 }}>{card.price}</p>
                <button 
                  onClick={() => handleOrder(card.name)} 
                  className="d-btn glow-btn" 
                  style={{ width: '100%', padding: '12px', fontSize: 16, border: 'none', cursor: 'pointer', textAlign: 'center', display: 'block', textDecoration: 'none', boxSizing: 'border-box' }}
                >
                  📲 অর্ডার করুন
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* কার্ডের ফিচার সেকশন */}
        <div style={{ marginTop: '50px', background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: '32px' }}>➡️ আমাদের কার্ড বৈশিষ্ট্য</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 15, color: '#555' }}>
                <span style={{ color: '#2dce89', fontWeight: 'bold', marginTop: '2px' }}>✅</span> 
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}