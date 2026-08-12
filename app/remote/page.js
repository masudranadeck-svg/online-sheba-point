'use client';
import { useState } from 'react';

const services=[
  {id:1,name:'FRP Unlock',icon:'🔓',cat:'android',price:500,time:'১০-৩০ মিনিট',desc:'Google FRP Lock আনলক',supported:['Samsung','Xiaomi','Huawei','OPPO'],req:['TeamViewer','ইন্টারনেট']},
  {id:2,name:'iCloud Unlock',icon:'🍎',cat:'iphone',price:2000,time:'২৪-৭২ ঘণ্টা',desc:'iCloud Activation Lock',supported:['iPhone 6-15','iPad'],req:['IMEI নম্বর','ধৈর্য']},
  {id:3,name:'Network Unlock',icon:'📶',cat:'android',price:800,time:'১-২৪ ঘণ্টা',desc:'নেটওয়ার্ক আনলক',supported:['Samsung','iPhone','Huawei'],req:['IMEI','মডেল']},
  {id:4,name:'Mi Account Unlock',icon:'📱',cat:'android',price:400,time:'১০-৩০ মিনিট',desc:'Xiaomi Mi Account',supported:['Xiaomi','Redmi','POCO'],req:['TeamViewer','ইন্টারনেট']},
  {id:5,name:'Pattern/Pin Unlock',icon:'🔢',cat:'android',price:300,time:'৫-১৫ মিনিট',desc:'প্যাটার্ন/পিন ভুলে গেলে',supported:['Samsung','Xiaomi','OPPO'],req:['TeamViewer','ইন্টারনেট']},
  {id:6,name:'Bootloader Unlock',icon:'🔧',cat:'android',price:600,time:'১-২ ঘণ্টা',desc:'কাস্টম ROM এর জন্য',supported:['Xiaomi','OnePlus'],req:['TeamViewer','USB ক্যাবল']},
];

export default function RemotePage() {
  const [sel,setSel]=useState('all');
  const [order,setOrder]=useState(null);
  const filtered=sel==='all'?services:services.filter(s=>s.cat===sel);
  return (
    <div style={{minHeight:'100vh'}}>
      <section style={{background:'linear-gradient(135deg, #fb6340, #f7b731)', paddingTop:120, paddingBottom:64, paddingLeft:24, paddingRight:24}}>
        <div style={{maxWidth:1100,margin:'0 auto',textAlign:'center'}}><h1 style={{fontSize:36,fontWeight:700,color:'white',marginBottom:8}}>রিমোট আনলক সার্ভিস</h1><p style={{color:'rgba(255,255,255,0.6)',fontSize:15}}>টিমভিউয়ার/অ্যানিডেস্ক দিয়ে রিমোটলি আনলক</p></div>
      </section>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
          {[{id:'all',n:'সব'},{id:'android',n:'🤖 Android'},{id:'iphone',n:'🍎 iPhone'}].map(c=>(
            <button key={c.id} onClick={()=>setSel(c.id)} className={sel===c.id?'d-btn-orange glow-btn-orange':''} style={sel!==c.id?{background:'white',color:'#888',border:'2px solid #e8ecf1',borderRadius:12,padding:'8px 20px',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all 0.3s'}:{}}>{c.n}</button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(480px, 1fr))',gap:20}}>
          {filtered.map(s=>(
            <div key={s.id} className="d-card glow-card glow-orange">
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <span style={{fontSize:28}}>{s.icon}</span>
                <div><h3 style={{fontSize:16,fontWeight:700,color:'#1a1a2e',margin:0}}>{s.name}</h3><p style={{fontSize:13,color:'#aaa',margin:0}}>{s.desc}</p></div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
                <span style={{fontSize:24,fontWeight:700,color:'#fb6340'}}>৳{s.price}</span>
                <span style={{fontSize:13,color:'#aaa'}}>⏱️ {s.time}</span>
              </div>
              <div style={{marginBottom:12}}>
                <p style={{fontSize:12,fontWeight:600,color:'#888',marginBottom:8}}>সাপোর্টেড：</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{s.supported.map((d,j)=><span key={j} style={{fontSize:12,background:'#f5f5f5',color:'#666',padding:'4px 12px',borderRadius:8}}>{d}</span>)}</div>
              </div>
              <div style={{marginBottom:16}}>
                <p style={{fontSize:12,fontWeight:600,color:'#888',marginBottom:8}}>প্রয়োজন：</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{s.req.map((r,j)=><span key={j} style={{fontSize:12,background:'#fff8f0',color:'#fb6340',padding:'4px 12px',borderRadius:8}}>⚠️ {r}</span>)}</div>
              </div>
              <button onClick={()=>setOrder(s)} className="d-btn-orange glow-btn-orange" style={{width:'100%',padding:'10px 0',fontSize:14}}>📱 সার্ভিস নিন</button>
            </div>
          ))}
        </div>
      </div>
      {order&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:16}} onClick={()=>setOrder(null)}>
          <div style={{background:'white',borderRadius:20,padding:32,maxWidth:420,width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}} onClick={e=>e.stopPropagation()}>
            <h2 style={{fontSize:20,fontWeight:700,marginBottom:4,color:'#1a1a2e',margin:'0 0 4px 0'}}>{order.icon} {order.name}</h2>
            <p style={{fontSize:24,fontWeight:700,color:'#fb6340',marginBottom:24,margin:'0 0 24px 0'}}>৳{order.price}</p>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:24}}>
              <input type="text" placeholder="আপনার নাম" className="d-input" />
              <input type="text" placeholder="ফোন নম্বর" className="d-input" />
              <input type="text" placeholder="ডিভাইস মডেল" className="d-input" />
              <input type="text" placeholder="TeamViewer / AnyDesk ID" className="d-input" />
              <textarea placeholder="সমস্যার বিবরণ" rows={2} className="d-input" />
            </div>
            <div style={{display:'flex',gap:12}}>
              <button className="d-btn-orange glow-btn-orange" style={{flex:1,padding:'12px 0',fontSize:14}}>✅ অর্ডার করুন</button>
              <button onClick={()=>setOrder(null)} style={{flex:1,background:'#f5f5f5',color:'#888',padding:'12px 0',borderRadius:12,fontWeight:600,fontSize:14,border:'none',cursor:'pointer'}}>বন্ধ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}