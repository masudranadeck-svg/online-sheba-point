'use client';
import { useState } from 'react';

export default function CompanyFormationPage() {
  const [country, setCountry] = useState('usa'); // usa বা uk
  const whatsappNumber = "8801610205062";

  // USA LLC প্যাকেজ
  const usaPlans = [
    { name: 'Basic Plan', price: '$189', desc: 'স্টার্টারদের জন্য পারফেক্ট।', features: ['Company Name Check', 'Articles of Organization', 'Operating Agreement', 'EIN Number'] },
    { name: 'Popular Plan', price: '$349', desc: 'আমাদের সবচেয়ে বিক্রিত প্যাকেজ।', features: ['Basic Plan এর সব সুবিধা', 'Registered Agent (1 Year)', 'US Business Address', 'Bank Account Guidance'], popular: true },
    { name: 'Exclusive Plan', price: '$599', desc: 'সম্পূর্ণ প্যাকেজ প্রিমিয়াম সাপোর্টসহ।', features: ['Popular Plan এর সব সুবিধা', 'ITIN Application Support', 'US Phone Number', 'Expedited Processing'] },
  ];

  // UK LTD প্যাকেজ
  const ukPlans = [
    { name: 'Basic Plan', price: '£89', desc: 'UK কোম্পানি রেজিস্ট্রেশনের প্রাথমিক প্যাকেজ।', features: ['Company Name Registration', 'Certificate of Incorporation', 'Memorandum & Articles', 'Digital Documents'] },
    { name: 'Popular Plan', price: '£139', desc: 'ব্যাংক অ্যাকাউন্ট খোলার জন্য সেরা।', features: ['Basic Plan এর সব সুবিধা', 'Registered Office Address', 'Director Service Address', 'Bank Account Guidance'], popular: true },
    { name: 'Exclusive Plan', price: '£199', desc: 'সম্পূর্ণ প্যাকেজ ভ্যাট সাপোর্টসহ।', features: ['Popular Plan এর সব সুবিধা', 'VAT Registration', 'Confirmation Statement', 'Priority Support'] },
  ];

  const currentPlans = country === 'usa' ? usaPlans : ukPlans;

  const handleOrder = (planName, price) => {
    const msg = `আসসালামু আলাইকুম, আমি ${country.toUpperCase()} কোম্পানি ফরমেশন সেবা নিতে চাই।%0Aপ্যাকেজ: ${planName}%0Aমূল্য: ${price}`;
    const waLink = `https://wa.me/${whatsappNumber}?text=${msg}`;
    window.open(waLink, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <section style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop: 120, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>🏢 কোম্পানি ফরমেশন (Company Formation)</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>ফ্রিল্যান্সার ও ই-কমার্স ব্যবসায়ীদের জন্য বিশ্বমানের কোম্পানি রেজিস্ট্রেশন সেবা।</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        
        {/* কান্ট্রি টগল বাটন */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          <button 
            onClick={() => setCountry('usa')} 
            className={country === 'usa' ? 'd-btn glow-btn' : ''}
            style={country !== 'usa' ? { padding: '10px 30px', border: '2px solid #e8ecf1', background: 'white', borderRadius: '12px', fontWeight: 600, color: '#888', cursor: 'pointer' } : { padding: '10px 30px', textDecoration: 'none', display: 'block', boxSizing: 'border-box'}}
          >
            🇺🇸 USA LLC
          </button>
          <button 
            onClick={() => setCountry('uk')} 
            className={country === 'uk' ? 'd-btn glow-btn' : ''}
            style={country !== 'uk' ? { padding: '10px 30px', border: '2px solid #e8ecf1', background: 'white', borderRadius: '12px', fontWeight: 600, color: '#888', cursor: 'pointer' } : { padding: '10px 30px', textDecoration: 'none', display: 'block', boxSizing: 'border-box'}}
          >
            🇬🇧 UK LTD
          </button>
        </div>

        {/* প্যাকেজ কার্ডসমূহ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {currentPlans.map((plan, index) => (
            <div 
              key={index} 
              className="d-card glow-card" 
              style={{ 
                padding: '32px 24px', 
                display: 'flex', 
                flexDirection: 'column', 
                border: plan.popular ? '2px solid #4e6ef2' : '1px solid #f0f0f0',
                position: 'relative'
              }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#4e6ef2', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                  ★ সবচেয়ে জনপ্রিয়
                </div>
              )}
              
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px 0' }}>{plan.name}</h3>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>{plan.desc}</p>
              
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#1a1a2e', margin: '0 0 24px 0' }}>
                {plan.price} <span style={{ fontSize: 14, color: '#888', fontWeight: 400 }}>+ Govt Fees</span>
              </h2>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', flex: 1 }}>
                {plan.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: 14, color: '#555' }}>
                    <span style={{ color: '#2dce89', fontWeight: 'bold' }}>✓</span> {feat}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleOrder(plan.name, plan.price)} 
                className={plan.popular ? 'd-btn glow-btn' : 'd-btn-green glow-btn-green'} 
                style={{ width: '100%', padding: '12px', fontSize: 16, border: 'none', cursor: 'pointer', textAlign: 'center', display: 'block', textDecoration: 'none', boxSizing: 'border-box' }}
              >
                📲 অর্ডার করুন
              </button>
            </div>
          ))}

        </div>

        <p style={{ textAlign: 'center', color: '#888', fontSize: 13, marginTop: 32 }}>
          * সরকারি ফি (Govt Fees) প্যাকেজের মূল্যের সাথে যুক্ত হবে। বিস্তারিত জানতে হোয়াটসঅ্যাপে যোগাযোগ করুন।
        </p>

      </div>
    </div>
  );
}