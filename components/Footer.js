export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // হোয়াটসঅ্যাপে ক্লিক করলে সরাসরি চ্যাট ওপেন হওয়ার লিংক
  const whatsappLink = "https://wa.me/8801610205062?text=আসসালামু%20আলাইকুম,%20আমি%20আপনাদের%20ওয়েবসাইট%20থেকে%20যোগাযোগ%20করছি।";

  return (
    <footer style={{ background: '#1a1a2e', color: '#888', padding: '40px 24px', marginTop: '60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px' }}>
        
        {/* ব্র্যান্ড ও নীতিমালা */}
        <div style={{ flex: '1 1 250px' }}>
          <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '20px' }}>Online Sheba<span style={{color:'#4e6ef2'}}>Point</span></h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            ই-কমার্স, ফ্রিল্যান্সিং ও মাইক্রোজব কাজে নিরাপদ ও নির্ভরযোগ্য সেবা প্রদান করাই আমাদের লক্ষ্য। জুয়া, অর্থ পাচার, হারাম উৎসের অর্থ লেনদেন সম্পূর্ণ নিষিদ্ধ। Online Sheba Point সর্বদা দেশের আইন ও নৈতিকতার প্রতি শ্রদ্ধাশীল।
          </p>
        </div>

        {/* যোগাযোগের তথ্য */}
        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '18px' }}>যোগাযোগ</h4>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>📞 01610205062</p>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>📧 masudranadeck@gmail.com</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '10px', background: '#25D366', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
            💬 WhatsApp করুন
          </a>
        </div>

      </div>
      
      {/* কপিরাইট */}
      <div style={{ textAlign: 'center', paddingTop: '30px', marginTop: '30px', borderTop: '1px solid #2d2d44', fontSize: '13px' }}>
        &copy; {currentYear} Online Sheba Point. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}