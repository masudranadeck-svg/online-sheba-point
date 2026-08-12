'use client';
import { useState } from 'react';

const keys=[
  {id:1,name:'Windows 11 Pro',icon:'🖥️',cat:'windows',price:1500,orig:2500,type:'OEM',desc:'লাইফটাইম লাইসেন্স',stock:true,f:['লাইফটাইম','অনলাইন অ্যাক্টিভেশন','সব আপডেট','১ পিসি']},
  {id:2,name:'Windows 10 Pro',icon:'🖥️',cat:'windows',price:1200,orig:2000,type:'OEM',desc:'লাইফটাইম লাইসেন্স',stock:true,f:['লাইফটাইম','অনলাইন অ্যাক্টিভেশন','সব আপডেট','১ পিসি']},
  {id:3,name:'MS Office 365',icon:'📊',cat:'office',price:2000,orig:3500,type:'Volume',desc:'সম্পূর্ণ অফিস স্যুট',stock:true,f:['সব অফিস অ্যাপ','ক্লাউড','আপডেট','১ পিসি']},
  {id:4,name:'MS Office 2021',icon:'📊',cat:'office',price:1800,orig:3000,type:'Volume',desc:'ওয়ান-টাইম পারচেজ',stock:true,f:['ওয়ান-টাইম','সব অ্যাপ','অফলাইন','১ পিসি']},
  {id:5,name:'Kaspersky',icon:'🛡️',cat:'antivirus',price:800,orig:1500,type:'Retail',desc:'১ বছর প্রোটেকশন',stock:true,f:['১ বছর','রিয়েল-টাইম','VPN','১ ডিভাইস']},
  {id:6,name:'Adobe Photoshop',icon:'🎨',cat:'design',price:2500,orig:5000,type:'Volume',desc:'প্রফেশনাল এডিটিং',stock:true,f:['সম্পূর্ণ','AI টুলস','ক্লাউড','১ পিসি']},
  {id:7,name:'Windows Server',icon:'🖥️',cat:'windows',price:3000,orig:5000,type:'Volume',desc:'সার্ভার OS',stock:true,f:['সার্ভার','৫ CAL','RDP','হাইপার-ভি']},
  {id:8,name:'ESET NOD32',icon:'🛡️',cat:'antivirus',price:500,orig:1000,type:'Retail',desc:'হালকা অ্যান্টিভাইরাস',stock:false,f:['১ বছর','লো রিসোর্স']},
  {id:9,name:'Adobe Illustrator',icon:'🎨',cat:'design',price:2200,orig:4500,type:'Volume',desc:'ভেক্টর গ্রাফিক্স',stock:true,f:['সম্পূর্ণ','AI টুলস','ক্লাউড','১ পিসি']},
];

export default function KeysPage() {
  const [sel,setSel]=useState('all');
  const filtered=sel==='all'?keys:keys.filter(k=>k.cat===sel);
  return (
    <div style={{minHeight:'100vh'}}>
      <section style={{background:'linear-gradient(135deg, #2dce89, #0d9488)', paddingTop:120, paddingBottom:64, paddingLeft:24, paddingRight:24}}>
        <div style={{maxWidth:1100,margin:'0 auto',textAlign:'center'}}><h1 style={{fontSize:36,fontWeight:700,color:'white',marginBottom:8}}>সফটওয়্যার কী স্টোর</h1><p style={{color:'rgba(255,255,255,0.6)',fontSize:15}}>ইনস্ট্যান্ট ডেলিভারি — কেনার সাথে সাথে কী পান!</p></div>
      </section>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
          {[{id:'all',n:'সব'},{id:'windows',n:'🖥️ Windows'},{id:'office',n:'📊 Office'},{id:'antivirus',n:'🛡️ অ্যান্টিভাইরাস'},{id:'design',n:'🎨 ডিজাইন'}].map(c=>(
            <button key={c.id} onClick={()=>setSel(c.id)} className={sel===c.id?'d-btn-green glow-btn-green':''} style={sel!==c.id?{background:'white',color:'#888',border:'2px solid #e8ecf1',borderRadius:12,padding:'8px 20px',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all 0.3s'}:{}}>{c.n}</button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(480px, 1fr))',gap:20}}>
          {filtered.map(k=>(
            <div key={k.id} className="d-card glow-card glow-green">
              <div style={{display:'flex',alignItems:'flex-start',gap:16}}>
                <span style={{fontSize:36}}>{k.icon}</span>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                    <h3 style={{fontSize:16,fontWeight:700,color:'#1a1a2e',margin:0}}>{k.name}</h3>
                    <span className="d-tag" style={{background:'#e6f9ef',color:'#2dce89'}}>{k.type}</span>
                  </div>
                  <p style={{fontSize:13,color:'#aaa',marginBottom:12,margin:'0 0 12px 0'}}>{k.desc}</p>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                    <span style={{fontSize:24,fontWeight:700,color:'#2dce89'}}>৳{k.price}</span>
                    <span style={{fontSize:13,color:'#ccc',textDecoration:'line-through'}}>৳{k.orig}</span>
                    <span className="d-tag" style={{background:'#fff0f0',color:'#ff6b6b'}}>{Math.round(((k.orig-k.price)/k.orig)*100)}% ছাড়</span>
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:12,marginBottom:16}}>
                    {k.f.map((f,j)=><span key={j} style={{fontSize:12,color:'#888'}}><span style={{color:'#2dce89',marginRight:4}}>✓</span>{f}</span>)}
                  </div>
                  {k.stock?<button className="d-btn-green glow-btn-green" style={{padding:'8px 24px',fontSize:13}}>🔑 কী কিনুন</button>:<button style={{background:'#f5f5f5',color:'#ccc',padding:'8px 24px',fontSize:13,borderRadius:12,fontWeight:600,border:'none',cursor:'not-allowed'}} disabled>❌ স্টক নেই</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}