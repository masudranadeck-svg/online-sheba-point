'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [isEntering, setIsEntering] = useState(false);
  const router = useRouter();

  const enterDigitalWorld = () => {
    setIsEntering(true);
    // 1.5 second animation er por shop page e pathay dibe
    setTimeout(() => {
      router.push('/shop');
    }, 1500);
  };

  return (
    <div className="deepin-body" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      
      {/* HERO SECTION */}
      <section className="home-hero-section" style={{
        minHeight:'90vh', 
        display:'flex', 
        alignItems:'center', 
        justifyContent: 'center',
        paddingTop:200, 
        paddingBottom:80, 
        paddingLeft:24, 
        paddingRight:24,
        perspective: '1000px',
        position: 'relative'
      }}>
        
        {/* 3D Background Elements */}
        <div className={`digital-world-bg ${isEntering ? 'zoom-in' : ''}`}>
          <div className="grid-floor"></div>
          <div className="shape-3d" style={{ top: '20%', left: '10%', width: '100px', height: '100px', background: '#4e6ef2', animationDelay: '0s' }}></div>
          <div className="shape-3d" style={{ top: '60%', left: '80%', width: '150px', height: '150px', background: '#a855f7', animationDelay: '2s', borderRadius: '50%' }}></div>
          <div className="shape-3d" style={{ top: '70%', left: '20%', width: '80px', height: '80px', background: '#2dce89', animationDelay: '4s' }}></div>
          <div className="shape-3d" style={{ top: '15%', left: '75%', width: '120px', height: '120px', background: '#fb6340', animationDelay: '1s' }}></div>
        </div>

        <div style={{maxWidth:800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2}}>
          
          <div style={{
            display:'inline-flex', 
            alignItems:'center', 
            gap:8, 
            background:'rgba(255,255,255,0.05)', 
            borderRadius:50, 
            padding:'8px 16px', 
            marginBottom:32, 
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <span className="status-dot" />
            <span style={{fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:500}}>সিস্টেম অনলাইন</span>
          </div>
          
          {/* 3D Neon Title */}
          <h1 className="neon-3d-text" style={{ marginBottom: 20, fontSize: 60 }}>
            আপনার ডিজিটাল স্টোর
          </h1>
          
          <p style={{
            fontSize:20, 
            fontWeight: 500,
            color:'rgba(255,255,255,0.8)', 
            lineHeight:1.7, 
            marginBottom:40, 
            maxWidth:500, 
            margin: '0 auto 40px auto',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
          }}>সফটওয়্যার কী, সাবস্ক্রিপশন ও রিমোট আনলক সার্ভিস। নিজেকে প্রস্তুত করুন এক নতুন ডিজিটাল দুনিয়ায়।</p>
          
          <div style={{display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center'}}>
            <button onClick={enterDigitalWorld} className="neon-3d-btn" style={{ fontSize: 18, padding: '16px 40px' }}>
              🚀 ডিজিটাল ওয়ার্ল্ডে প্রবেশ করুন
            </button>
          </div>
          
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section style={{padding:'80px 24px', position:'relative', zIndex:10, background: 'rgba(10, 11, 20, 0.8)', backdropFilter: 'blur(10px)'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:48}}>
            <h2 style={{fontSize:36, fontWeight:800, color:'white', margin:0, textShadow: '2px 2px 0 #333, 4px 4px 10px rgba(0,0,0,0.8)'}}>যা যা আমরা অফার করি</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:20}}>
            {[
              {name:'প্রোডাক্ট শপ',desc:'দারাজের মতো সব প্রোডাক্ট',link:'/shop',icon:'🛒'},
              {name:'রিয়েল এস্টেট',desc:'ফ্ল্যাট, বাড়ি ও জমি কেনা-বেচা',link:'/properties',icon:'🏠'},
              {name:'অনলাইন টুলস',desc:'ফ্রি টুলস ও পিডিএফ মেকার',link:'/online-tools',icon:'🛠️'}, // নতুন কার্ড এখানে যোগ করা হলো
              {name:'সাবস্ক্রিপশন',desc:'বঙ্গ ডিজিটালের মতো প্ল্যান',link:'/subscription',icon:'📺'},
              {name:'সফটওয়্যার কী',desc:'ইনস্ট্যান্ট কী ডেলিভারি',link:'/keys',icon:'🔑'},
              {name:'রিমোট সার্ভিস',desc:'ফোন আনলক রিমোটলি',link:'/remote',icon:'📱'}
            ].map(c=>(
              <Link key={c.link} href={c.link} className="glass-3d" style={{textDecoration:'none', display:'block'}}>
                <div style={{width:48, height:48, borderRadius:16, background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:20}}>{c.icon}</div>
                <h3 style={{fontSize:16, fontWeight:700, marginBottom:6, color:'white', margin:'0 0 6px 0'}}>{c.name}</h3>
                <p style={{fontSize:13, color:'rgba(255,255,255,0.4)', marginBottom:16, margin:'0 0 16px 0'}}>{c.desc}</p>
                <span style={{fontSize:13, fontWeight:600, color:'#4e6ef2'}}>দেখুন →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign:'center', 
        padding:'40px 24px', 
        color:'rgba(255,255,255,0.3)', 
        fontSize:14, 
        borderTop:'1px solid rgba(255,255,255,0.05)',
        background: 'rgba(10, 11, 20, 0.8)'
      }}>
        <p>© 2024 Online Sheba Point. All rights reserved.</p>
        <div style={{display:'flex', justifyContent:'center', gap:20, marginTop:12}}>
          <Link href="/" style={{color:'inherit', textDecoration:'none'}}>Facebook</Link>
          <Link href="/" style={{color:'inherit', textDecoration:'none'}}>Telegram</Link>
          <Link href="/" style={{color:'inherit', textDecoration:'none'}}>WhatsApp</Link>
        </div>
      </footer>

    </div>
  );
}