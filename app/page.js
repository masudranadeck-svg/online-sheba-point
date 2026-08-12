import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section style={{background:'linear-gradient(135deg, #4e6ef2, #6c5ce7, #a855f7)', minHeight:'90vh', display:'flex', alignItems:'center', paddingTop:120, paddingBottom:80, paddingLeft:24, paddingRight:24}}>
        <div style={{maxWidth:1100, margin:'0 auto', width:'100%'}}>
          <div style={{maxWidth:600}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', borderRadius:50, padding:'8px 16px', marginBottom:32}}>
              <span style={{width:8, height:8, borderRadius:'50%', background:'#2dce89'}} />
              <span style={{fontSize:13, color:'rgba(255,255,255,0.7)', fontWeight:500}}>সার্ভিস চালু আছে</span>
            </div>
            <h1 style={{fontSize:48, fontWeight:800, color:'white', lineHeight:1.15, marginBottom:20}}>আপনার ডিজিটাল স্টোর</h1>
            <p style={{fontSize:17, color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:36, maxWidth:480}}>সফটওয়্যার কী, সাবস্ক্রিপশন ও রিমোট আনলক সার্ভিস — সব এক জায়গায়, সেরা দামে।</p>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <Link href="/shop" className="glow-btn-white" style={{background:'white', color:'#4e6ef2', padding:'14px 32px', borderRadius:12, fontWeight:600, fontSize:15, textDecoration:'none', display:'inline-block', boxShadow:'0 4px 20px rgba(0,0,0,0.15)'}}>শপ করুন →</Link>
              <Link href="/keys" className="glow-btn-white" style={{background:'rgba(255,255,255,0.1)', color:'white', padding:'14px 32px', borderRadius:12, fontWeight:600, fontSize:15, textDecoration:'none', display:'inline-block', border:'1px solid rgba(255,255,255,0.15)'}}>কী কিনুন</Link>
            </div>
            <div style={{display:'flex', gap:40, marginTop:48}}>
              {[{n:'৫০০+',l:'কাস্টমার'},{n:'১০০০+',l:'কী বিক্রি'},{n:'৯৯%',l:'সন্তুষ্টি'}].map(s=>(<div key={s.l}><p style={{fontSize:28, fontWeight:700, color:'white', margin:0}}>{s.n}</p><p style={{fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:4, marginBottom:0}}>{s.l}</p></div>))}
            </div>
          </div>
        </div>
      </section>

      <section style={{padding:'80px 24px', marginTop:-48, position:'relative', zIndex:10}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:48}}>
            <p style={{fontSize:11, fontWeight:700, letterSpacing:2, color:'#aaa', marginBottom:8, textTransform:'uppercase', margin:0}}>সার্ভিস</p>
            <h2 style={{fontSize:32, fontWeight:700, color:'#1a1a2e', margin:0}}>যা যা আমরা অফার করি</h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:20}}>
            {[
              {name:'প্রোডাক্ট শপ',desc:'দারাজের মতো সব প্রোডাক্ট',link:'/shop',icon:'🛒',bg:'#eef1fe',color:'#4e6ef2',glow:'glow-card'},
              {name:'সাবস্ক্রিপশন',desc:'বঙ্গ ডিজিটালের মতো প্ল্যান',link:'/subscription',icon:'📺',bg:'#f3eeff',color:'#a855f7',glow:'glow-card glow-purple'},
              {name:'সফটওয়্যার কী',desc:'ইনস্ট্যান্ট কী ডেলিভারি',link:'/keys',icon:'🔑',bg:'#e6f9ef',color:'#2dce89',glow:'glow-card glow-green'},
              {name:'রিমোট সার্ভিস',desc:'ফোন আনলক রিমোটলি',link:'/remote',icon:'📱',bg:'#fef0ec',color:'#fb6340',glow:'glow-card glow-orange'},
            ].map(c=>(
              <Link key={c.link} href={c.link} className={`d-card ${c.glow}`} style={{textDecoration:'none', display:'block'}}>
                <div style={{width:48, height:48, borderRadius:16, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:20}}>{c.icon}</div>
                <h3 style={{fontSize:16, fontWeight:700, marginBottom:6, color:'#1a1a2e', margin:'0 0 6px 0'}}>{c.name}</h3>
                <p style={{fontSize:13, color:'#aaa', marginBottom:16, margin:'0 0 16px 0'}}>{c.desc}</p>
                <span style={{fontSize:13, fontWeight:600, color:c.color}}>দেখুন →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40}}>
            <div><p style={{fontSize:11, fontWeight:700, letterSpacing:2, color:'#aaa', textTransform:'uppercase', margin:'0 0 8px 0'}}>প্রোডাক্ট</p><h2 style={{fontSize:32, fontWeight:700, color:'#1a1a2e', margin:0}}>সবচেয়ে জনপ্রিয়</h2></div>
            <Link href="/shop" style={{fontSize:13, fontWeight:600, color:'#4e6ef2', textDecoration:'none'}}>সব দেখুন →</Link>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:20}}>
            {[
              {name:'Windows 11 Pro Key',price:1500,type:'কী',badge:'বেস্ট',color:'#4e6ef2',glow:'glow-card'},
              {name:'Netflix 1 মাস',price:299,type:'সাব',badge:'জনপ্রিয়',color:'#a855f7',glow:'glow-card glow-purple'},
              {name:'FRP Unlock',price:500,type:'রিমোট',badge:'সার্ভিস',color:'#fb6340',glow:'glow-card glow-orange'},
              {name:'MS Office 365',price:2000,type:'কী',badge:'হট',color:'#4e6ef2',glow:'glow-card'},
              {name:'Spotify Premium',price:199,type:'সাব',badge:'নতুন',color:'#a855f7',glow:'glow-card glow-purple'},
              {name:'iCloud Unlock',price:2000,type:'রিমোট',badge:'প্রিমিয়াম',color:'#fb6340',glow:'glow-card glow-orange'},
            ].map((p,i)=>(
              <div key={i} className={`d-card ${p.glow}`}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
                  <span className="d-tag" style={{background:p.color, color:'white'}}>{p.type}</span>
                  <span className="d-tag" style={{background:'#f5f5f5', color:'#888'}}>{p.badge}</span>
                </div>
                <h3 style={{fontSize:15, fontWeight:700, marginBottom:8, color:'#1a1a2e', margin:'0 0 8px 0'}}>{p.name}</h3>
                <p style={{fontSize:28, fontWeight:700, color:'#2dce89', marginBottom:20, margin:'0 0 20px 0'}}>৳{p.price}</p>
                <button className={p.type==='কী'?'d-btn glow-btn':p.type==='সাব'?'d-btn-purple glow-btn-purple':'d-btn-orange glow-btn-orange'} style={{width:'100%'}}>কার্টে যোগ করুন</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:48}}><h2 style={{fontSize:32, fontWeight:700, color:'#1a1a2e', margin:0}}>সাবস্ক্রিপশন প্ল্যান</h2></div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24}}>
            {[
              {name:'Basic',price:'১৯৯',dur:'১ মাস',f:['১টি সাবস্ক্রিপশন','ইমেইল সাপোর্ট','বেসিক'],pop:false},
              {name:'Standard',price:'৪৯৯',dur:'৩ মাস',f:['৩টি সাবস্ক্রিপশন','প্রায়োরিটি সাপোর্ট','সব বেসিক','ডিসকাউন্ট'],pop:true},
              {name:'Premium',price:'১৪৯৯',dur:'১২ মাস',f:['আনলিমিটেড','২৪/৭ সাপোর্ট','সব ফিচার','বড় ডিসকাউন্ট'],pop:false},
            ].map((pl,i)=>(
              <div key={i} className="d-card glow-card glow-purple" style={{position:'relative', border:pl.pop?'2px solid #a855f7':'1px solid #f0f0f0'}}>
                {pl.pop&&<div style={{position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', background:'#a855f7', color:'white', padding:'4px 16px', borderRadius:50, fontSize:11, fontWeight:700}}>জনপ্রিয়</div>}
                <h3 style={{fontSize:18, fontWeight:700, marginBottom:4, color:'#1a1a2e', margin:'0 0 4px 0'}}>{pl.name}</h3>
                <p style={{fontSize:13, color:'#aaa', marginBottom:24, margin:'0 0 24px 0'}}>{pl.dur}</p>
                <p style={{fontSize:36, fontWeight:700, color:'#a855f7', marginBottom:24, margin:'0 0 24px 0'}}>৳{pl.price}<span style={{fontSize:13, color:'#aaa', fontWeight:400}}>/মাস</span></p>
                <div style={{marginBottom:32}}>{pl.f.map((f,j)=><p key={j} style={{fontSize:13, color:'#666', marginBottom:8, display:'flex', alignItems:'center', gap:8, margin:'0 0 8px 0'}}><span style={{color:'#2dce89'}}>✓</span>{f}</p>)}</div>
                <button className={pl.pop?'d-btn-purple glow-btn-purple':'d-btn-outline glow-btn'} style={{width:'100%'}}>সাবস্ক্রাইব করুন</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'64px 24px', background:'white'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <h2 style={{fontSize:32, fontWeight:700, color:'#1a1a2e', textAlign:'center', marginBottom:48, margin:'0 auto 48px auto'}}>কেন আমাদের বেছে নেবেন</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20}}>
            {[{icon:'⚡',t:'তাৎক্ষণিক ডেলিভারি',d:'কী কেনার সাথে সাথে পান'},{icon:'🔒',t:'১০০% নিরাপদ',d:'সব কী অরিজিনাল'},{icon:'💬',t:'২৪/৭ সাপোর্ট',d:'সবসময় সাহায্য'},{icon:'💰',t:'সেরা দাম',d:'সবচেয়ে কম খরচ'}].map((x,i)=>(
              <div key={i} className="d-card glow-card" style={{textAlign:'center'}}>
                <div style={{fontSize:36, marginBottom:12}}>{x.icon}</div>
                <h3 style={{fontSize:14, fontWeight:700, marginBottom:4, color:'#1a1a2e', margin:'0 0 4px 0'}}>{x.t}</h3>
                <p style={{fontSize:13, color:'#aaa', margin:0}}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:700, margin:'0 auto'}}>
          <div style={{background:'linear-gradient(135deg, #4e6ef2, #a855f7)', borderRadius:24, padding:48, textAlign:'center', boxShadow:'0 20px 60px rgba(78,110,242,0.2)'}}>
            <h2 style={{fontSize:28, fontWeight:700, color:'white', marginBottom:12, margin:'0 0 12px 0'}}>আজই শুরু করুন!</h2>
            <p style={{fontSize:14, color:'rgba(255,255,255,0.6)', marginBottom:28, margin:'0 0 28px 0'}}>সেরা ডিজিটাল প্রোডাক্ট ও সার্ভিস — সবচেয়ে কম দামে</p>
            <Link href="/shop" className="glow-btn-white" style={{background:'white', color:'#4e6ef2', padding:'14px 40px', borderRadius:12, fontWeight:600, fontSize:15, textDecoration:'none', display:'inline-block', boxShadow:'0 4px 20px rgba(0,0,0,0.1)'}}>শপ করুন →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}