'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // আপডেট করা মেন্যু লিস্ট (পিসি সলিউশন যোগ করা হয়েছে)
  const menuItems = [
    {href:'/',l:'হোম'},
    {href:'/shop',l:'শপ'},
    {href:'/online-sheba',l:'অনলাইন সেবা'},
    {href:'/dollar-exchange',l:'ডলার এক্সচেঞ্জ'},
    {href:'/cards',l:'কার্ড সেবা'},
    {href:'/accounts',l:'অ্যাকাউন্ট সেবা'},
    {href:'/company-formation',l:'কোম্পানি রেজিস্ট্রেশন'},
    {href:'/pc-solution',l:'পিসি সলিউশন'}, // নতুন অপশন
    {href:'/subscription',l:'সাবস্ক্রিপশন'},
    {href:'/remote',l:'রিমোট'}
  ];

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:50,transition:'all 0.3s',
      background:scrolled?'rgba(255,255,255,0.95)':'transparent',
      backdropFilter:scrolled?'blur(20px)':'none',
      borderBottom:scrolled?'1px solid #f0f0f0':'none',
      padding:scrolled?'12px 0':'20px 0',
    }}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <div style={{width:36,height:36,borderRadius:12,background:'linear-gradient(135deg,#4e6ef2,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'bold',fontSize:14}}>O</div>
          <span style={{fontSize:18,fontWeight:700,color:'#1a1a2e'}}>Online Sheba<span style={{color:'#4e6ef2'}}>Point</span></span>
        </Link>

        {/* ডেস্কটপ মেন্যু */}
        <div style={{display:'flex',alignItems:'center',gap:4}} className="hidden md:flex">
          {menuItems.map(x=>(
            <Link key={x.href} href={x.href} style={{padding:'8px 8px',borderRadius:12,fontSize:13,fontWeight:500,color:'#888',textDecoration:'none',transition:'all 0.2s'}}>{x.l}</Link>
          ))}
        </div>

        <div style={{display:'flex',alignItems:'center',gap:12}} className="hidden md:flex">
          <Link href="/login" className="d-btn glow-btn" style={{padding:'8px 20px',fontSize:13,textDecoration:'none'}}>লগইন</Link>
        </div>

        <button className="md:hidden" onClick={()=>setOpen(!open)} style={{padding:8,borderRadius:12,border:'none',background:'transparent',cursor:'pointer'}}>
          <div style={{width:20,height:16,display:'flex',flexDirection:'column',justifyContent:'center',gap:4}}>
            <span style={{width:20,height:2,background:'#666',borderRadius:2,transition:'all 0.3s',transform:open?'rotate(45deg) translateY(6px)':'none'}} />
            <span style={{width:20,height:2,background:'#666',borderRadius:2,transition:'all 0.3s',opacity:open?0:1}} />
            <span style={{width:20,height:2,background:'#666',borderRadius:2,transition:'all 0.3s',transform:open?'rotate(-45deg) translateY(-6px)':'none'}} />
          </div>
        </button>
      </div>

      {/* মোবাইল মেন্যু */}
      <div className="md:hidden" style={{overflow:'hidden',transition:'all 0.3s',maxHeight:open?550:0,marginTop:12}}>
        <div style={{background:'white',margin:'0 16px',borderRadius:16,boxShadow:'0 4px 20px rgba(0,0,0,0.1)',padding:12}}>
          {menuItems.map(x=>(
            <Link key={x.href} href={x.href} onClick={()=>setOpen(false)} style={{display:'block',padding:'12px 16px',borderRadius:12,color:'#888',textDecoration:'none',fontSize:14,fontWeight:500}}>{x.l}</Link>
          ))}
          <Link href="/login" className="d-btn glow-btn" style={{display:'block',textAlign:'center',padding:'12px 16px',fontSize:14,textDecoration:'none',marginTop:8}}>লগইন</Link>
        </div>
      </div>
    </nav>
  );
}