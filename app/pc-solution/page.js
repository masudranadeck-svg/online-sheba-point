'use client';
import { useState } from 'react';

export default function PcSolutionPage() {
  const whatsappNumber = "8801610205062";

  // কম্পিউটার সমস্যার ক্যাটাগরি
  const services = [
    { id: 1, title: 'সফটওয়্যার সমাধান', icon: '💻', desc: 'উইন্ডোজ ইনস্টল, ড্রাইভার সমস্যা, স্লো পিসি ফিক্স, ভাইরাস রিমুভ।', type: 'remote' },
    { id: 2, title: 'হার্ডওয়্যার সমস্যা', icon: '🛠️', desc: 'র‍্যাম, হার্ডডিস্ক, মাদারবোর্ড চেক এবং মেরামত।', type: 'onsite' },
    { id: 3, title: 'ল্যাপটপ সার্ভিসিং', icon: '🧹', desc: 'ল্যাপটপ ক্লিনিং, পেস্ট চেঞ্জ, কিবোর্ড/মাউস চেঞ্জ।', type: 'onsite' },
    { id: 4, title: 'নেটওয়ার্ক ও ইন্টারনেট', icon: '🌐', desc: 'ওয়াইফাই রাউটার সেটআপ, ল্যান ক্যাবলিং, নেটওয়ার্ক শেয়ারিং।', type: 'both' },
    { id: 5, title: 'প্রিন্টার সেটআপ', icon: '🖨️', desc: 'প্রিন্টার ড্রাইভার ইনস্টল ও নেটওয়ার্ক প্রিন্টার সেটআপ।', type: 'remote' },
    { id: 6, title: 'ডেটা রিকভারি', icon: '💾', desc: 'ফরম্যাট করা বা ডিলিট হওয়া ফাইল ফিরিয়ে আনা।', type: 'onsite' },
  ];

  // কাজের প্রসেস
  const processSteps = [
    { step: '১', title: 'সমস্যা জানান', desc: 'হোয়াটসঅ্যাপে আপনার কম্পিউটারের সমস্যা বিস্তারিত লিখে পাঠান।' },
    { step: '২', title: 'সার্ভিস নির্ধারণ', desc: 'সমস্যা রিমোটে সমাধান যোগ্য কিনা তা জানিয়ে দেওয়া হবে। না হলে বাসায় যাওয়া হবে।' },
    { step: '৩', title: 'সমাধান ও পেমেন্ট', desc: 'সমস্যা সমাধানের পর সার্ভিস চার্জ পরিশোধ করুন।' },
  ];

  const handleOrder = (serviceTitle, type) => {
    let typeText = type === 'remote' ? 'রিমোটলি (Remote)' : type === 'onsite' ? 'বাসায় গিয়ে (On-site)' : 'রিমোট বা বাসায় (যা প্রযোজ্য)';
    const msg = `আসসালামু আলাইকুম, আমার কম্পিউটারের "${serviceTitle}" সম্পর্কিত সমস্যা আছে। আমি ${typeText} সেবা নিতে চাই।`;
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <section style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop: 120, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>💻 পিসি সলিউশন (PC Solution)</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>যেকোনো কম্পিউটার সমস্যার সমাধান রিমোটলি অথবা বাসায় গিয়ে দ্রুত ও নিরাপদে।</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        
        {/* সার্ভিস লিস্ট */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {services.map((service) => (
            <div key={service.id} className="d-card glow-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 36 }}>{service.icon}</div>
                <span style={{ background: service.type === 'remote' ? '#e3f2fd' : service.type === 'onsite' ? '#fff3e0' : '#f3e5f5', color: service.type === 'remote' ? '#1976d2' : service.type === 'onsite' ? '#f57c00' : '#7b1fa2', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                  {service.type === 'remote' ? '🌐 Remote' : service.type === 'onsite' ? '🏠 On-site' : '🔄 Both'}
                </span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>{service.title}</h3>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 20, flex: 1 }}>{service.desc}</p>
              
              <button 
                onClick={() => handleOrder(service.title, service.type)} 
                className="d-btn glow-btn" 
                style={{ width: '100%', padding: '12px', fontSize: 16, border: 'none', cursor: 'pointer', textAlign: 'center', display: 'block', textDecoration: 'none', boxSizing: 'border-box' }}
              >
                📲 সেবা নিন
              </button>
            </div>
          ))}
        </div>

        {/* কীভাবে কাজ করে (How it works) */}
        <div style={{ marginTop: '50px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: '32px' }}>⚙️ আমরা কীভাবে কাজ করি?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {processSteps.map((step, i) => (
              <div key={i} className="d-card glow-card" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ width: 50, height: 50, background: 'linear-gradient(135deg,#4e6ef2,#a855f7)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, margin: '0 auto 16px auto' }}>
                  {step.step}
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>{step.title}</h4>
                <p style={{ fontSize: 14, color: '#666', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}