'use client';
import { useState } from 'react';
import Link from 'next/link';

const shebaCategories = [
  { id: 'all', n: '🎯 সব সেবা' },
  { id: 'shop', n: '🛍️ শপ ও সাবস্ক্রিপশন' },
  { id: 'remote', n: '📱 রিমোট সার্ভিস' },
  { id: 'gov', n: '🏛️ সরকারি সেবা' },
  { id: 'bill', n: '💡 বিল পরিশোধ' },
  { id: 'ticket', n: '🚆 টিকিট ও ভ্রমণ' },
  { id: 'legal', n: '⚖️ ল’ সার্ভিসেস' },
  { id: 'health', n: '🏥 স্বাস্থ্য সেবা' },
];

const allSheba = [
  // শপ ও সাবস্ক্রিপশন
  { id: 1, name: 'সফটওয়্যার কী', desc: 'Windows, Office, Antivirus লাইসেন্স', cat: 'shop', icon: '🔑', link: '/shop' },
  { id: 2, name: 'সাবস্ক্রিপশন', desc: 'Netflix, Spotify, Canva Pro', cat: 'shop', icon: '📺', link: '/shop' },
  
  // রিমোট সার্ভিস
  { id: 3, name: 'FRP & iCloud Unlock', desc: 'Samsung, iPhone আনলক সার্ভিস', cat: 'remote', icon: '🔓', link: '/shop' },
  { id: 4, name: 'রিমোট সার্ভিস', desc: 'সব ধরনের মোবাইল সফটওয়্যার সমস্যা', cat: 'remote', icon: '🛠️', link: '/shop' },

  // সরকারি সেবা
  { id: 5, name: 'জাতীয় পরিচয়পত্র (NID)', desc: 'নতুন আবেদন ও তথ্য সংশোধন', cat: 'gov', icon: '🪪', link: '#custom' },
  { id: 6, name: 'জন্ম নিবন্ধন', desc: 'অনলাইনে জন্ম সনদ আবেদন', cat: 'gov', icon: '📄', link: '#custom' },
  { id: 7, name: 'পাসপোর্ট সেবা', desc: 'মেশিন রিডেবল পাসপোর্ট আবেদন', cat: 'gov', icon: '📕', link: '#custom' },
  
  // বিল পরিশোধ
  { id: 8, name: 'বিদ্যুৎ বিল', desc: 'DESCO, REB সহ সব বিদ্যুৎ বোর্ড', cat: 'bill', icon: '⚡', link: '#custom' },
  { id: 9, name: 'গ্যাস ও ওয়াসা বিল', desc: 'Titas, WASA বিল পরিশোধ', cat: 'bill', icon: '💧', link: '#custom' },

  // টিকিট ও ভ্রমণ
  { id: 10, name: 'ট্রেন ও বাস টিকিট', desc: 'রেলওয়ে ও ইন্টারসিটি বাস বুকিং', cat: 'ticket', icon: '🚆', link: '#custom' },
  { id: 11, name: 'ফ্লাইট টিকিট', desc: 'অভ্যন্তরীণ ও আন্তর্জাতিক ফ্লাইট', cat: 'ticket', icon: '✈️', link: '#custom' },

  // ল’ সার্ভিসেস ও ভূমি
  { id: 12, name: 'মোটর সার্টিফিকেট', desc: 'গাড়ির ফিটনেস, ট্যাক্স ও নামা পরিবর্তন', cat: 'legal', icon: '🚗', link: '#custom' },
  { id: 13, name: 'ভূমি সেবা', desc: 'ভূমি জমির খতিয়ান ও পর্চা', cat: 'legal', icon: '🗺️', link: '#custom' },

  // স্বাস্থ্য সেবা
  { id: 14, name: 'ডাক্তার অ্যাপয়েন্টমেন্ট', desc: 'বিশেষজ্ঞ ডাক্তার দেখানোর বুকিং', cat: 'health', icon: '🩺', link: '#custom' },
  { id: 15, name: 'অ্যাম্বুলেন্স', desc: 'ইমার্জেন্সি অ্যাম্বুলেন্স বুকিং', cat: 'health', icon: '🚑', link: '#custom' },
];

export default function OnlineShebaPage() {
  const [cat, setCat] = useState('all');

  let items = allSheba.filter(p => (cat === 'all' || p.cat === cat));

  // আপনার হোয়াটসঅ্যাপ নাম্বার এখানে দেওয়া হয়েছে
  const whatsappNumber = "8801610205062"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=আসসালামু%20আলাইকুম,%20আমার%20একটি%20অনলাইন%20সেবা%20দরকার%20ছিল।`;

  return (
    <div style={{ minHeight: '100vh' }}>
      <section style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop: 120, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>🌐 অনলাইন সেবা (Online Sheba)</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>জন্ম থেকে মৃত্যু পর্যন্ত সব ধরনের অনলাইন সেবা একসাথে</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        
        {/* কাস্টম হোয়াটসঅ্যাপ মেসেজ বক্স */}
        <div style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', padding: '24px', borderRadius: '16px', marginBottom: '32px', textAlign: 'center', color: 'white', boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🟢 আপনার প্রয়োজনীয় অন্য যেকোনো সেবা?</h2>
          <p style={{ fontSize: 14, marginBottom: 16, opacity: 0.9 }}>যদি আপনার এমন কোনো সেবা দরকার হয় যা এখানে তালিকাভুক্ত নেই, সরাসরি হোয়াটসঅ্যাপে মেসেজ করুন। আমরা যেকোনো ধরনের অনলাইন সেবা প্রদান করে থাকি।</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'white', color: '#128C7E', fontWeight: 700, padding: '12px 30px', borderRadius: '30px', textDecoration: 'none', fontSize: 16, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            📲 হোয়াটসঅ্যাপে মেসেজ করুন
          </a>
        </div>

        {/* ক্যাটাগরি ফিল্টার */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          {shebaCategories.map(c => (
            <button 
              key={c.id} 
              onClick={() => setCat(c.id)} 
              className={cat === c.id ? 'd-btn glow-btn' : ''}
              style={cat !== c.id ? { background: 'white', color: '#888', border: '2px solid #e8ecf1', borderRadius: 12, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' } : {}}
            >
              {c.n}
            </button>
          ))}
        </div>

        {/* সেবার কার্ডসমূহ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {items.map(p => (
            <div key={p.id} className="d-card glow-card">
              <div style={{ fontSize: 40, marginBottom: 12 }}>{p.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: '#1a1a2e', margin: '0 0 4px 0' }}>{p.name}</h3>
              <p style={{ fontSize: 13, color: '#aaa', marginBottom: 16, margin: '0 0 16px 0', minHeight: 40 }}>{p.desc}</p>
              
              {p.link === '#custom' ? (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="d-btn glow-btn" style={{ width: '100%', display: 'block', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>
                  সেবা নিন (WhatsApp)
                </a>
              ) : (
                <Link href={p.link} className="d-btn glow-btn" style={{ width: '100%', display: 'block', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>
                  সেবা নিন
                </Link>
              )}
            </div>
          ))}
        </div>

        {items.length === 0 && <div style={{ textAlign: 'center', padding: 64 }}><p style={{ fontSize: 48, marginBottom: 16 }}>😔</p><p style={{ fontSize: 16, color: '#aaa' }}>কোনো সেবা পাওয়া যায়নি</p></div>}
      </div>
    </div>
  );
}