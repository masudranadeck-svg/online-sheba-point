'use client';
import Link from 'next/link';

export default function AccountsPage() {
  const whatsappNumber = "8801610205062"; 

  const services = [
    { id: 1, name: 'Payoneer Account', desc: 'Fully Verified US/EU Payment Account', price: '৳1,500 - ৳2,500', icon: '💳' },
    { id: 2, name: 'Wise (TransferWise)', desc: 'Multi-currency Account for Freelancers', price: '৳1,200 - ৳2,000', icon: '🌍' },
    { id: 3, name: 'Skrill Account', desc: 'Verified Skrill for International Payment', price: '৳1,000', icon: '💸' },
    { id: 4, name: 'Neteller Account', desc: 'Secure Online Payment Gateway', price: '৳1,000', icon: '🏦' },
    { id: 5, name: 'Virtual Credit Card (VCC)', desc: 'For Online Purchase & Verification', price: '৳500 - ৳1,500', icon: '🪪' },
    { id: 6, name: 'Tally ERP 9 / Prime', desc: 'Accounting Software with License', price: '৳1,000 - ৳3,000', icon: '📊' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <section style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop: 120, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>💳 ফিন্যান্সিয়াল অ্যাকাউন্ট সেবা</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>ফ্রিল্যান্সারদের জন্য নিরাপদ ও ভেরিফাইড পেমেন্ট অ্যাকাউন্ট সলিউশন।</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          {services.map((service) => {
            const msg = `আসসালামু আলাইকুম, আমি "${service.name}" এর জন্য সেবা নিতে চাই। অনুগ্রহ করে বিস্তারিত জানাবেন।`;
            const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

            return (
              <div key={service.id} className="d-card glow-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{service.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>{service.name}</h3>
                  <p style={{ fontSize: 14, color: '#888', marginBottom: 16, minHeight: 40 }}>{service.desc}</p>
                </div>
                
                <div>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#2dce89', marginBottom: 16 }}>{service.price}</p>
                  <a 
                    href={waLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="d-btn glow-btn" 
                    style={{ width: '100%', display: 'block', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
                  >
                    🟢 Buy Now
                  </a>
                </div>
              </div>
            );
          })}

        </div>

        {/* কাস্টম অর্ডার বক্স */}
        <div style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', padding: '24px', borderRadius: '16px', marginTop: '40px', textAlign: 'center', color: 'white', boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🟢 অন্য কোনো অ্যাকাউন্ট সেবা দরকার?</h2>
          <p style={{ fontSize: 14, marginBottom: 16, opacity: 0.9 }}>আপনার যদি এখানে তালিকাভুক্ত ছাড়া অন্য কোনো ফিন্যান্সিয়াল সেবা লাগে, সরাসরি হোয়াটসঅ্যাপে মেসেজ করুন।</p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমার অন্য একটি অ্যাকাউন্ট সেবা দরকার ছিল।")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-block', background: 'white', color: '#128C7E', fontWeight: 700, padding: '12px 30px', borderRadius: '30px', textDecoration: 'none', fontSize: 16 }}
          >
            📲 হোয়াটসঅ্যাপে মেসেজ করুন
          </a>
        </div>

      </div>
    </div>
  );
}