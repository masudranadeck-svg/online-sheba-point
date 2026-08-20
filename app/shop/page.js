'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ShopPage() {
  const [products, setProducts] = useState([]); // ডাটাবেস থেকে আসা প্রোডাক্ট এখানে থাকবে
  const [cat,setCat]=useState('all');
  const [search,setSearch]=useState('');
  const [sort,setSort]=useState('default');
  const [cart,setCart]=useState([]);
  const [showCart,setShowCart]=useState(false);

  // পেজ লোড হলে সার্ভার থেকে প্রোডাক্ট আনার জন্য useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://online-sheba-point.onrender.com/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("প্রোডাক্ট আনতে সমস্যা হয়েছে!");
      }
    };
    fetchProducts();
  }, []);

  const cats=[{id:'all',n:'🎯 সব'},{id:'software',n:'🔑 সফটওয়্যার কী'},{id:'subscription',n:'📺 সাবস্ক্রিপশন'},{id:'remote',n:'📱 রিমোট সার্ভিস'}];

  // ডাটাবেসের ফিল্ড অনুযায়ী ফিলটার করা (category)
  let items=products.filter(p=>
    (cat==='all'||p.category===cat) && 
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  
  if(sort==='low')items=[...items].sort((a,b)=>a.price-b.price);
  if(sort==='high')items=[...items].sort((a,b)=>b.price-a.price);

  // কার্টে যোগ করার সময় _id ব্যবহার করা হয়েছে
  const addCart=(p)=>{const e=cart.find(c=>c._id===p._id);e?setCart(cart.map(c=>c._id===p._id?{...c,qty:c.qty+1}:c)):setCart([...cart,{...p,qty:1}])};
  const removeCart=(id)=>setCart(cart.filter(c=>c._id!==id));
  const total=cart.reduce((s,c)=>s+c.price*c.qty,0);
  
  const typeColor=(t)=>t==='software'?'#4e6ef2':t==='subscription'?'#a855f7':'#fb6340';
  const typeGlow=(t)=>t==='software'?'glow-card':t==='subscription'?'glow-card glow-purple':'glow-card glow-orange';
  const typeBtn=(t)=>t==='software'?'d-btn glow-btn':t==='subscription'?'d-btn-purple glow-btn-purple':'d-btn-orange glow-btn-orange';

  return (
    <div className="deepin-body" style={{minHeight:'100vh'}}>
      <section style={{background:'linear-gradient(135deg, #4e6ef2, #6c5ce7)', paddingTop:120, paddingBottom:64, paddingLeft:24, paddingRight:24}}>
        <div style={{maxWidth:1100,margin:'0 auto',textAlign:'center'}}>
          <h1 style={{fontSize:36,fontWeight:700,color:'white',marginBottom:8}}>প্রোডাক্ট শপ</h1>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:15}}>সেরা ডিজিটাল প্রোডাক্ট ও সার্ভিস</p>
        </div>
      </section>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:24}}>
          <input type="text" placeholder="🔍 প্রোডাক্ট খুঁজুন..." value={search} onChange={e=>setSearch(e.target.value)} className="d-input" style={{flex:1,minWidth:200}} />
          <select value={sort} onChange={e=>setSort(e.target.value)} className="d-input" style={{width:180}}>
            <option value="default">ডিফল্ট</option>
            <option value="low">কম → বেশি</option>
            <option value="high">বেশি → কম</option>
          </select>
          <button onClick={()=>setShowCart(true)} className="d-btn glow-btn" style={{padding:'10px 24px',fontSize:14}}>🛒 কার্ট {cart.length>0&&<span style={{marginLeft:4,background:'rgba(255,255,255,0.2)',padding:'2px 8px',borderRadius:50,fontSize:12}}>{cart.length}</span>}</button>
        </div>

        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
          {cats.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)} className={cat===c.id?'d-btn glow-btn':''} style={cat!==c.id?{background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.6)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:'8px 20px',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all 0.3s'}:{}}>{c.n}</button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))',gap:20}}>
          {items.map(p=>(
            <div key={p._id} className={`d-card ${typeGlow(p.category)}`}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <span className="d-tag" style={{background:typeColor(p.category),color:'white'}}>{p.category === 'software' ? 'কী' : p.category === 'subscription' ? 'সাব' : 'রিমোট'}</span>
                <span className="d-tag" style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.6)'}}>নতুন</span>
              </div>
              <h3 style={{fontSize:14,fontWeight:700,marginBottom:4,color:'white',margin:'0 0 4px 0'}}>{p.name}</h3>
              <p style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:12,margin:'0 0 12px 0'}}>{p.description}</p>
              <p style={{fontSize:24,fontWeight:700,color:'#2dce89',marginBottom:16,margin:'0 0 16px 0'}}>৳{p.price}</p>
              <button onClick={()=>addCart(p)} className={typeBtn(p.category)} style={{width:'100%'}}>কার্টে যোগ</button>
            </div>
          ))}
        </div>

        {items.length===0&&<div style={{textAlign:'center',padding:64}}><p style={{fontSize:48,marginBottom:16}}>😔</p><p style={{fontSize:16,color:'rgba(255,255,255,0.4)'}}>কোনো প্রোডাক্ট পাওয়া যায়নি</p></div>}
      </div>

      {showCart&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:16}} onClick={()=>setShowCart(false)}>
          <div className="glass-3d" style={{padding:24,maxWidth:420,width:'100%',maxHeight:'80vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontSize:20,fontWeight:700,color:'white',margin:0}}>🛒 কার্ট</h2>
              <button onClick={()=>setShowCart(false)} style={{background:'none',border:'none',fontSize:20,color:'rgba(255,255,255,0.4)',cursor:'pointer'}}>✕</button>
            </div>
            {cart.length===0?<div style={{textAlign:'center',padding:32}}><p style={{fontSize:40,marginBottom:8}}>🛒</p><p style={{color:'rgba(255,255,255,0.4)'}}>কার্ট খালি!</p></div>:(
              <>
                <div style={{marginBottom:24}}>{cart.map(c=>(<div key={c._id} style={{background:'rgba(255,255,255,0.05)',borderRadius:12,padding:16,marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div><h4 style={{fontWeight:600,fontSize:14,color:'white',margin:'0 0 4px 0'}}>{c.name}</h4><p style={{color:'#2dce89',fontWeight:700,fontSize:14,margin:0}}>৳{c.price} × {c.qty}</p></div>
                  <button onClick={()=>removeCart(c._id)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer',color:'#ff6b6b'}}>🗑</button>
                </div>))}</div>
                <div style={{borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:16,marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontWeight:700,color:'white'}}>মোট：</span>
                  <span style={{fontSize:24,fontWeight:700,color:'#2dce89'}}>৳{total}</span>
                </div>
                
                {/* EITA APNAR NOTUN CHECKOUT BUTTON (localStorage e save korbe) */}
                <button 
                  onClick={() => {
                      localStorage.setItem('cart', JSON.stringify(cart));
                      window.location.href = '/checkout';
                  }} 
                  className="d-btn-green glow-btn-green" 
                  style={{display:'block',textAlign:'center',padding:'12px 0',fontSize:14,textDecoration:'none', width:'100%', border:'none', cursor:'pointer'}}
                >💳 চেকআউট</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}