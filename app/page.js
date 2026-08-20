import Link from 'next/link';

export default function Home() {
  return (
    <div className="deepin-body" style={{ margin: 0, padding: 0 }}>
      
      {/* Top Floating Glass Navigation */}
      <nav style={{
        position: 'fixed', 
        top: 16, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 100,
        display: 'flex', 
        alignItems: 'center', 
        gap: 24, 
        padding: '10px 24px',
        borderRadius: 50,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{ margin: 0, color: 'white', fontSize: 18, letterSpacing: 1 }}>SHEBAPPOINT</h3>
        <div style={{ display: 'flex', gap: 20, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>হোম</Link>
          <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>শপ</Link>
          <Link href="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>ড্যাশবোর্ড</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#2dce89' }}>
          <span className="status-dot"></span> Online
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight:'100vh', 
        display:'flex', 
        alignItems:'center', 
        paddingTop:120, 
        paddingBottom:80, 
        paddingLeft:24, 
        paddingRight:24,
        perspective: '1000px'
      }}>
        <div style={{maxWidth:1100, margin:'0 auto', width:'100%'}}>
          <div style={{maxWidth:600, margin: '0 auto', textAlign: 'center'}}>
            
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
              <span style={{fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:500}}>সার্ভিস চালু আছে</span>
            </div>
            
            <h1 style={{
              fontSize:52, 
              fontWeight:800, 
              color:'white', 
              lineHeight:1.15, 
              marginBottom:20,
              textShadow: '0 10px 30px rgba(78, 110, 242, 0.3)'
            }}>আপনার ডিজিটাল স্টোর</h1>
            
            <p style={{
              fontSize:18, 
              color:'rgba(255,255,255,0.6)', 
              lineHeight:1.7, 
              marginBottom:36, 
              maxWidth:480, 
              margin: '0 auto 36px auto'
            }}>সফটওয়্যার কী, সাবস্ক্রিপশন ও রিমোট আনলক সার্ভিস — সব এক জায়গায়, সেরা দামে।</p>
            
            <div style={{display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center'}}>
              <Link href="/shop" className="neon-3d-btn">শপ করুন →</Link>
              <Link href="/keys" className="neon-3d-btn" style={{
                background:'rgba(255,255,255,0.1)', 
                color:'white', 
                border:'1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}>কী কিনুন</Link>
            </div>
            
            <div style={{display:'flex', gap:40, marginTop:48, justifyContent: 'center'}}>
              {[
                {n:'৫০০+',l:'কাস্টমার'},
                {n:'১০০০+',l:'কী বিক্রি'},
                {n:'৯৯%',l:'সন্তুষ্টি'}
              ].map(s=>(
                <div key={s.l}>
                  <p style={{fontSize:28, fontWeight:700, color:'white', margin:0}}>{s.n}</p>
                  <p style={{fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:4, marginBottom:0}}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section style={{padding:'80px 24px', marginTop:-48, position:'relative', zIndex:10}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:48}}>
            <p style={{fontSize:11, fontWeight:700, letterSpacing:2, color:'#aaa', marginBottom:8, textTransform:'uppercase', margin:'0 0 8px 0'}}>সার্ভিস</p>
            <h2 style={{fontSize:32, fontWeight:700, color:'white', margin:0}}>যা যা আমরা অফার করি</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:20}}>
            {[
              {name:'প্রোডাক্ট শপ',desc:'দারাজের মতো সব প্রোডাক্ট',link:'/shop',icon:'🛒'},
              {name:'সাবস্ক্রিপশন',desc:'বঙ্গ ডিজিটালের মতো প্ল্যান',link:'/subscription',icon:'📺'},
              {name:'সফটওয়্যার কী',desc:'ইনস্ট্যান্ট কী ডেলিভারি',link:'/keys',icon:'🔑'},
              {name:'রিমোট সার্ভিস',desc:'ফোন আনলক রিমোটলি',link:'/remote',icon:'📱'}
            ].map(c=>(
              <Link key={c.link} href={c.link} className="glass-3d" style={{textDecoration:'none', display:'block'}}>
                <div style={{
                  width:48, 
                  height:48, 
                  borderRadius:16, 
                  background:'rgba(255,255,255,0.1)', 
                  display:'flex', 
                  alignItems:'center', 
                  justifyContent:'center', 
                  fontSize:22, 
                  marginBottom:20
                }}>{c.icon}</div>
                <h3 style={{fontSize:16, fontWeight:700, marginBottom:6, color:'white', margin:'0 0 6px 0'}}>{c.name}</h3>
                <p style={{fontSize:13, color:'rgba(255,255,255,0.4)', marginBottom:16, margin:'0 0 16px 0'}}>{c.desc}</p>
                <span style={{fontSize:13, fontWeight:600, color:'#4e6ef2'}}>দেখুন →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <div style={{
            display:'flex', 
            justifyContent:'space-between', 
            alignItems:'flex-end', 
            marginBottom:40, 
            flexWrap: 'wrap', 
            gap: '20px'
          }}>
            <div>
              <p style={{fontSize:11, fontWeight:700, letterSpacing:2, color:'#aaa', textTransform:'uppercase', margin:'0 0 8px 0'}}>প্রোডাক্ট</p>
              <h2 style={{fontSize:32, fontWeight:700, color:'white', margin:0}}>সবচেয়ে জনপ্রিয়</h2>
            </div>
            <Link href="/shop" style={{fontSize:13, fontWeight:600, color:'#4e6ef2', textDecoration:'none'}}>সব দেখুন →</Link>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:20}}>
            {[
              {name:'Windows 11 Pro Key',price:1500,type:'কী',badge:'বেস্ট',color:'#4e6ef2'},
              {name:'Netflix 1 মাস',price:299,type:'সাব',badge:'জনপ্রিয়',color:'#a855f7'},
              {name:'FRP Unlock',price:500,type:'রিমোট',badge:'সার্ভিস',color:'#fb6340'},
              {name:'MS Office 365',price:2000,type:'কী',badge:'হট',color:'#4e6ef2'},
              {name:'Spotify Premium',price:199,type:'সাব',badge:'নতুন',color:'#a855f7'},
              {name:'iCloud Unlock',price:2000,type:'রিমোট',badge:'প্রিমিয়াম',color:'#fb6340'}
            ].map((p,i)=>(
              <div key={i} className="glass-3d">
                <div style={{
                  display:'flex', 
                  justifyContent:'space-between', 
                  alignItems:'center', 
                  marginBottom:16
                }}>
                  <span style={{background:p.color, color:'white', padding: '4px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600}}>{p.type}</span>
                  <span style={{background:'rgba(255,255,255,0.1)', color:'#aaa', padding: '4px 12px', borderRadius: 50, fontSize: 12}}>{p.badge}</span>
                </div>
                <h3 style={{fontSize:15, fontWeight:700, marginBottom:8, color:'white', margin:'0 0 8px 0'}}>{p.name}</h3>
                <p style={{fontSize:28, fontWeight:700, color:'#2dce89', marginBottom:20, margin:'0 0 20px 0'}}>৳{p.price}</p>
                <button className="neon-3d-btn" style={{width:'100%', textAlign: 'center'}}>কার্টে যোগ করুন</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION PLANS */}
      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:48}}>
            <h2 style={{fontSize:32, fontWeight:700, color:'white', margin:0}}>সাবস্ক্রিপশন প্ল্যান</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24}}>
            {[
              {name:'Basic',price:'১৯৯',dur:'১ মাস',f:['১টি সাবস্ক্রিপশন','ইমেইল সাপোর্ট','বেসিক'],pop:false},
              {name:'Standard',price:'৪৯৯',dur:'৩ মাস',f:['৩টি সাবস্ক্রিপশন','প্রায়োরিটি সাপোর্ট','সব বেসিক','ডিসকাউন্ট'],pop:true},
              {name:'Premium',price:'১৪৯৯',dur:'১২ মাস',f:['আনলিমিটেড','২৪/৭ সাপোর্ট','সব ফিচার','বড় ডিসকাউন্ট'],pop:false}
            ].map((pl,i)=>(
              <div key={i} className="glass-3d" style={{
                position:'relative', 
                border:pl.pop?'1px solid #a855f7':'1px solid rgba(255,255,255,0.1)'
              }}>
                {pl.pop && (
                  <div style={{
                    position:'absolute', 
                    top:-12, 
                    left:'50%', 
                    transform:'translateX(-50%)', 
                    background:'#a855f7', 
                    color:'white', 
                    padding:'4px 16px', 
                    borderRadius:50, 
                    fontSize:11, 
                    fontWeight:700
                  }}>জনপ্রিয়</div>
                )}
                <h3 style={{fontSize:18, fontWeight:700, marginBottom:4, color:'white', margin:'0 0 4px 0'}}>{pl.name}</h3>
                <p style={{fontSize:13, color:'rgba(255,255,255,0.4)', marginBottom:24, margin:'0 0 24px 0'}}>{pl.dur}</p>
                <p style={{
                  fontSize:36, 
                  fontWeight:700, 
                  color:'#a855f7', 
                  marginBottom:24, 
                  margin:'0 0 24px 0'
                }}>৳{pl.price}<span style={{fontSize:13, color:'rgba(255,255,255,0.4)', fontWeight:400}}>/মাস</span></p>
                <div style={{marginBottom:32}}>
                  {pl.f.map((f,j)=>(
                    <p key={j} style={{
                      fontSize:13, 
                      color:'rgba(255,255,255,0.6)', 
                      marginBottom:8, 
                      display:'flex', 
                      alignItems:'center', 
                      gap:8, 
                      margin:'0 0 8px 0'
                    }}>
                      <span style={{color:'#2dce89'}}>✓</span>{f}
                    </p>
                  ))}
                </div>
                <button className="neon-3d-btn" style={{
                  width:'100%', 
                  background: pl.pop ? 'linear-gradient(135deg, #a855f7, #6c5ce7)' : 'rgba(255, 255, 255, 0.1)'
                }}>সাবস্ক্রাইব করুন</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <h2 style={{
            fontSize:32, 
            fontWeight:700, 
            color:'white', 
            textAlign:'center', 
            marginBottom:48, 
            margin:'0 auto 48px auto'
          }}>কেন আমাদের বেছে নেবেন</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20}}>
            {[
              {icon:'⚡',t:'তাৎক্ষণিক ডেলিভারি',d:'কী কেনার সাথে সাথে পান'},
              {icon:'🔒',t:'১০০% নিরাপদ',d:'সব কী অরিজিনাল'},
              {icon:'💬',t:'২৪/৭ সাপোর্ট',d:'সবসময় সাহায্য'},
              {icon:'💰',t:'সেরা দাম',d:'সবচেয়ে কম খরচ'}
            ].map((x,i)=>(
              <div key={i} className="glass-3d" style={{textAlign:'center'}}>
                <div style={{fontSize:36, marginBottom:12}}>{x.icon}</div>
                <h3 style={{fontSize:14, fontWeight:700, marginBottom:4, color:'white', margin:'0 0 4px 0'}}>{x.t}</h3>
                <p style={{fontSize:13, color:'rgba(255,255,255,0.4)', margin:0}}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:700, margin:'0 auto'}}>
          <div className="glass-3d" style={{
            background:'linear-gradient(135deg, rgba(78,110,242,0.2), rgba(168,85,247,0.2))', 
            textAlign:'center'
          }}>
            <h2 style={{fontSize:28, fontWeight:700, color:'white', marginBottom:12, margin:'0 0 12px 0'}}>আজই শুরু করুন!</h2>
            <p style={{
              fontSize:14, 
              color:'rgba(255,255,255,0.6)', 
              marginBottom:28, 
              margin:'0 0 28px 0'
            }}>সেরা ডিজিটাল প্রোডাক্ট ও সার্ভিস — সবচেয়ে কম দামে</p>
            <Link href="/shop" className="neon-3d-btn">শপ করুন →</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign:'center', 
        padding:'40px 24px', 
        color:'rgba(255,255,255,0.3)', 
        fontSize:14, 
        borderTop:'1px solid rgba(255,255,255,0.05)'
      }}>
        <p>© 2024 SHEBAPPOINT. All rights reserved.</p>
        <div style={{display:'flex', justifyContent:'center', gap:20, marginTop:12}}>
          <Link href="/" style={{color:'inherit', textDecoration:'none'}}>Facebook</Link>
          <Link href="/" style={{color:'inherit', textDecoration:'none'}}>Telegram</Link>
          <Link href="/" style={{color:'inherit', textDecoration:'none'}}>WhatsApp</Link>
        </div>
      </footer>

    </div>
  );
}