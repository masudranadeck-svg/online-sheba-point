'use client';

export default function DevServicesPage() {
  const whatsappNumber = "8801610205062";

  const services = [
    {
      id: 1,
      title: 'Website Development',
      icon: '🌐',
      desc: 'E-commerce, Portfolio, Business, Custom Web Application ও হাই-সিকিউরিটি ওয়েবসাইট তৈরি।',
      features: ['Next.js / React', 'Node.js Backend', 'Database (MongoDB/SQL)', 'SSL & Hosting Setup'],
      price: '১০,০০০ টাকা থেকে শুরু'
    },
    {
      id: 2,
      title: 'App Development',
      icon: '📱',
      desc: 'Android ও iOS এর জন্য প্রফেশনাল মোবাইল অ্যাপ্লিকেশন তৈরি।',
      features: ['React Native / Flutter', 'User Authentication', 'Push Notification', 'Play Store Upload'],
      price: '১৫,০০০ টাকা থেকে শুরু'
    },
    {
      id: 3,
      title: 'OS & Software Dev',
      icon: '💻',
      desc: 'নতুন অপারেটিং সিস্টেম, কাস্টম সফটওয়্যার বা সিস্টেম লেভেলের টুল তৈরি।',
      features: ['Linux/Custom OS', 'Desktop Software (Win/Mac)', 'C++ / Python / Rust', 'System Driver'],
      price: '২৫,০০০ টাকা থেকে শুরু'
    }
  ];

  const handleOrder = (serviceTitle) => {
    const msg = `আসসালামু আলাইকুম। আমি "${serviceTitle}" সার্ভিসটি নিতে আগ্রহী। অনুগ্রহ করে বিস্তারিত এবং কাস্টম কোটেশন জানাবেন।`;
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <section style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop: 120, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 8 }}>🚀 ডেভেলপমেন্ট সার্ভিস</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>ওয়েবসাইট, মোবাইল অ্যাপ থেকে শুরু করে নতুন অপারেটিং সিস্টেম (OS) তৈরি পর্যন্ত - সব ধরনের সফটওয়্যার ডেভেলপমেন্ট সলিউশন।</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {services.map((service) => (
            <div key={service.id} className="d-card glow-card" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 50, marginBottom: 16 }}>{service.icon}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: '#1a1a2e' }}>{service.title}</h3>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 24, lineHeight: 1.6 }}>{service.desc}</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', flex: 1 }}>
                {service.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: 14, color: '#555' }}>
                    <span style={{ color: '#4e6ef2', fontWeight: 'bold' }}>▹</span> {feat}
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>{service.price}</p>
                <button 
                  onClick={() => handleOrder(service.title)} 
                  className="d-btn glow-btn" 
                  style={{ width: '100%', padding: '14px', fontSize: 16, border: 'none', cursor: 'pointer', textAlign: 'center', display: 'block', textDecoration: 'none', boxSizing: 'border-box' }}
                >
                  📲 অর্ডার বা কোটেশন নিন
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* কাস্টম রিকোয়েস্ট সেকশন */}
        <div style={{ background: 'linear-gradient(135deg, #4e6ef2, #6c5ce7)', padding: '32px', borderRadius: '16px', marginTop: '50px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>💡 আপনার কি অন্য কোনো কাস্টম আইডিয়া আছে?</h2>
          <p style={{ fontSize: 15, marginBottom: 24, opacity: 0.9 }}>গেম তৈরি, এআই (AI) বট, সাইবার সিকিউরিটি টুল বা এর বাইরে যেকোনো সফটওয়্যার তৈরির আইডিয়া থাকলে আমাদের সাথে শেয়ার করুন। আমরা বানিয়ে দিব!</p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("আসসালামু আলাইকুম, আমার একটি কাস্টম সফটওয়্যার তৈরির আইডিয়া আছে।")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-block', background: 'white', color: '#4e6ef2', fontWeight: 700, padding: '14px 40px', borderRadius: '30px', textDecoration: 'none', fontSize: 16 }}
          >
            💬 হোয়াটসঅ্যাপে আইডিয়া শেয়ার করুন
          </a>
        </div>

      </div>
    </div>
  );
}