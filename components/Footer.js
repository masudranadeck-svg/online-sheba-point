import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{background:'white',borderTop:'1px solid #f0f0f0'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'48px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:40}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
              <div style={{width:36,height:36,borderRadius:12,background:'linear-gradient(135deg,#4e6ef2,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'bold',fontSize:14}}>D</div>
              <span style={{fontSize:18,fontWeight:700,color:'#1a1a2e'}}>Digital<span style={{color:'#4e6ef2'}}>Store</span></span>
            </div>
            <p style={{color:'#aaa',fontSize:13,lineHeight:1.6}}>আপনার বিশ্বস্ত ডিজিটাল প্রোডাক্ট ও সার্ভিসের দোকান।</p>
          </div>
          <div>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:1,color:'#aaa',marginBottom:16,textTransform:'uppercase'}}>সার্ভিস</p>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <Link href="/shop" style={{color:'#888',fontSize:13,textDecoration:'none'}}>শপ</Link>
              <Link href="/subscription" style={{color:'#888',fontSize:13,textDecoration:'none'}}>সাবস্ক্রিপশন</Link>
              <Link href="/keys" style={{color:'#888',fontSize:13,textDecoration:'none'}}>সফটওয়্যার কী</Link>
              <Link href="/remote" style={{color:'#888',fontSize:13,textDecoration:'none'}}>রিমোট সার্ভিস</Link>
            </div>
          </div>
          <div>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:1,color:'#aaa',marginBottom:16,textTransform:'uppercase'}}>যোগাযোগ</p>
            <div style={{display:'flex',flexDirection:'column',gap:8,color:'#888',fontSize:13}}>
              <p>📞 017XXXXXXXX</p>
              <p>📧 info@digitalstore.com</p>
              <p>💬 WhatsApp</p>
            </div>
          </div>
          <div>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:1,color:'#aaa',marginBottom:16,textTransform:'uppercase'}}>পেমেন্ট</p>
            <div style={{display:'flex',flexDirection:'column',gap:8,color:'#888',fontSize:13}}>
              <p>📱 bKash</p>
              <p>📱 Nagad</p>
              <p>📱 Rocket</p>
              <p>🏦 ব্যাংক</p>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid #f0f0f0',marginTop:40,paddingTop:24,textAlign:'center'}}>
          <p style={{color:'#ccc',fontSize:13}}>© ২০২৫ DigitalStore। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}