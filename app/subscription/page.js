'use client';
import { useState } from 'react';

const subs=[
  {id:1,name:'Netflix',icon:'📺',cat:'streaming',plans:[{d:'১ মাস',p:299,f:['4K স্ট্রিমিং','২ ডিভাইস']},{d:'৩ মাস',p:799,f:['4K','৪ ডিভাইস','ডাউনলোড']},{d:'১২ মাস',p:2999,f:['4K','৬ ডিভাইস','ডাউনলোড','প্রায়োরিটি']}]},
  {id:2,name:'Spotify',icon:'🎵',cat:'music',plans:[{d:'১ মাস',p:199,f:['বিজ্ঞাপনমুক্ত','অফলাইন']},{d:'৩ মাস',p:499,f:['বিজ্ঞাপনমুক্ত','HQ','অফলাইন']},{d:'১২ মাস',p:1799,f:['বিজ্ঞাপনমুক্ত','HQ','ফ্যামিলি']}]},
  {id:3,name:'Canva Pro',icon:'🎨',cat:'design',plans:[{d:'১ মাস',p:399,f:['প্রো টেমপ্লেট','AI']},{d:'৩ মাস',p:999,f:['প্রো','AI','ব্র্যান্ড কিট']},{d:'১২ মাস',p:3499,f:['সব','টিম','AI','ব্র্যান্ড']}]},
  {id:4,name:'YouTube Premium',icon:'▶️',cat:'streaming',plans:[{d:'১ মাস',p:349,f:['বিজ্ঞাপনমুক্ত','ব্যাকগ্রাউন্ড']},{d:'৩ মাস',p:899,f:['বিজ্ঞাপনমুক্ত','Music','ব্যাকগ্রাউন্ড']},{d:'১২ মাস',p:3499,f:['সব','Music','অফলাইন']}]},
  {id:5,name:'VPN Premium',icon:'🛡️',cat:'security',plans:[{d:'১ মাস',p:299,f:['৫০+ দেশ','ফাস্ট']},{d:'৬ মাস',p:1299,f:['৫০+ দেশ','কিল সুইচ']},{d:'১২ মাস',p:1999,f:['সব','ডেডিকেটেড IP']}]},
  {id:6,name:'Adobe CC',icon:'🖼️',cat:'design',plans:[{d:'১ মাস',p:1499,f:['Photoshop','Illustrator']},{d:'৩ মাস',p:3999,f:['PS','AI','Premiere']},{d:'১২ মাস',p:14999,f:['সব অ্যাপ','100GB','Fonts']}]},
];

export default function SubPage() {
  const [sel,setSel]=useState('all');
  const filtered=sel==='all'?subs:subs.filter(s=>s.cat===sel);
  return (
    <div style={{minHeight:'100vh'}}>
      <section style={{background:'linear-gradient(135deg, #a855f7, #ec4899)', paddingTop:120, paddingBottom:64, paddingLeft:24, paddingRight:24}}>
        <div style={{maxWidth:1100,margin:'0 auto',textAlign:'center'}}><h1 style={{fontSize:36,fontWeight:700,color:'white',marginBottom:8}}>সাবস্ক্রিপশন স্টোর</h1><p style={{color:'rgba(255,255,255,0.6)',fontSize:15}}>বঙ্গ ডিজিটালের মতো সব সাবস্ক্রিপশন প্ল্যান</p></div>
      </section>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
          {[{id:'all',n:'সব'},{id:'streaming',n:'📺 স্ট্রিমিং'},{id:'music',n:'🎵 মিউজিক'},{id:'design',n:'🎨 ডিজাইন'},{id:'security',n:'🛡️ সিকিউরিটি'}].map(c=>(
            <button key={c.id} onClick={()=>setSel(c.id)} className={sel===c.id?'d-btn-purple glow-btn-purple':''} style={sel!==c.id?{background:'white',color:'#888',border:'2px solid #e8ecf1',borderRadius:12,padding:'8px 20px',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all 0.3s'}:{}}>{c.n}</button>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:32}}>
          {filtered.map(sub=>(
            <div key={sub.id} className="d-card glow-card glow-purple">
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}><span style={{fontSize:28}}>{sub.icon}</span><h2 style={{fontSize:20,fontWeight:700,color:'#1a1a2e',margin:0}}>{sub.name}</h2></div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:16}}>
                {sub.plans.map((plan,i)=>(
                  <div key={i} style={{background:'#f5f7fa',borderRadius:16,padding:24,border:i===1?'2px solid #a855f7':'2px solid transparent',transition:'all 0.3s'}}>
                    <h3 style={{fontSize:13,fontWeight:700,color:'#888',marginBottom:8,margin:'0 0 8px 0'}}>{plan.d}</h3>
                    <p style={{fontSize:28,fontWeight:700,color:'#a855f7',marginBottom:16,margin:'0 0 16px 0'}}>৳{plan.p}</p>
                    <div style={{marginBottom:24}}>{plan.f.map((f,j)=><p key={j} style={{fontSize:13,color:'#666',marginBottom:6,display:'flex',alignItems:'center',gap:6,margin:'0 0 6px 0'}}><span style={{color:'#2dce89'}}>✓</span>{f}</p>)}</div>
                    <button className="d-btn-purple glow-btn-purple" style={{width:'100%'}}>সাবস্ক্রাইব</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}