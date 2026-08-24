'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
    setOpen(false);
  };

  const menuItems = [
    {href:'/',l:'হোম'},
    {href:'/shop',l:'শপ'},
    {href:'/marketplace',l:'মার্কেটপ্লেস'},
    {href:'/resell',l:'পুরোনো পণ্য'},
    {href:'/remote-jobs',l:'রিমোট জবস'},
    {href:'/dev-services',l:'ডেভেলপমেন্ট সার্ভিস'},
    {href:'/online-sheba',l:'অনলাইন সেবা'},
    {href:'/dollar-exchange',l:'ডলার এক্সচেঞ্জ'},
    {href:'/cards',l:'কার্ড সেবা'},
    {href:'/accounts',l:'অ্যাকাউন্ট সেবা'},
    {href:'/company-formation',l:'কোম্পানি রেজিস্ট্রেশন'},
    {href:'/pc-solution',l:'পিসি সলিউশন'},
    {href:'/dashboard',l:'ড্যাশবোর্ড'},
    {href:'/subscription',l:'সাবস্ক্রিপশন'},
    {href:'/remote',l:'রিমোট সার্ভিস'}
  ];

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:50,transition:'all 0.3s',
      background:scrolled?'rgba(10, 11, 20, 0.8)':'transparent',
      backdropFilter:scrolled?'blur(20px)':'none',
      borderBottom:scrolled?'1px solid rgba(255,255,255,0.1)':'none',
      padding:scrolled?'10px 0':'20px 0',
    }}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px'}}>
        
        {/* Fix: Flex layout adjusted to prevent overlapping */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px'}}>
          
          {/* Logo Section */}
          <Link href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none',flexShrink:0}}>
            <div style={{width:36,height:36,borderRadius:12,background:'linear-gradient(135deg,#4e6ef2,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'bold',fontSize:14}}>O</div>
            <span style={{fontSize:18,fontWeight:700,color:'white',whiteSpace:'nowrap'}}>Online Sheba<span style={{color:'#4e6ef2'}}>Point</span></span>
          </Link>

          {/* Desktop Login/Logout Section */}
          <div style={{display:'flex',alignItems:'center',gap:12,flexShrink:0, marginLeft: 'auto'}} className="hidden lg:flex">
            {user ? (
              <>
                <Link href="/dashboard" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:14,fontWeight:600, whiteSpace:'nowrap'}}>ড্যাশবোর্ড</Link>
                <button onClick={handleLogout} className="d-btn-orange glow-btn-orange" style={{padding:'8px 20px',fontSize:14,textDecoration:'none',border:'none',cursor:'pointer', whiteSpace:'nowrap'}}>লগআউট</button>
              </>
            ) : (
              <Link href="/login" className="d-btn glow-btn" style={{padding:'8px 20px',fontSize:14,textDecoration:'none', whiteSpace:'nowrap'}}>লগইন / রেজিস্টার</Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button className="lg:hidden" onClick={()=>setOpen(!open)} style={{padding:8,borderRadius:12,border:'none',background:'transparent',cursor:'pointer'}}>
            <div style={{width:20,height:16,display:'flex',flexDirection:'column',justifyContent:'center',gap:4}}>
              <span style={{width:20,height:2,background:'white',borderRadius:2,transition:'all 0.3s',transform:open?'rotate(45deg) translateY(6px)':'none'}} />
              <span style={{width:20,height:2,background:'white',borderRadius:2,transition:'all 0.3s',opacity:open?0:1}} />
              <span style={{width:20,height:2,background:'white',borderRadius:2,transition:'all 0.3s',transform:open?'rotate(-45deg) translateY(-6px)':'none'}} />
            </div>
          </button>
        </div>

        {/* Desktop Menu Items */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px 16px',marginTop:12,borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:12,flexWrap:'wrap'}} className="hidden lg:flex">
          {menuItems.map(x=>(
            <Link key={x.href} href={x.href} style={{padding:'4px 8px',borderRadius:8,fontSize:13.5,fontWeight:600,color:'rgba(255,255,255,0.7)',textDecoration:'none',transition:'all 0.2s',whiteSpace:'nowrap'}}>{x.l}</Link>
          ))}
        </div>

        {/* Mobile Menu Items */}
        <div className="lg:hidden" style={{overflow:'hidden',transition:'all 0.3s',maxHeight:open?'600px':'0',marginTop:12}}>
          <div style={{background:'rgba(255, 255, 255, 0.05)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', margin:'0 16px',borderRadius:16,padding:12}}>
            {menuItems.map(x=>(
              <Link key={x.href} href={x.href} onClick={()=>setOpen(false)} style={{display:'block',padding:'12px 16px',borderRadius:12,color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:14,fontWeight:500}}>{x.l}</Link>
            ))}
            
            <div style={{marginTop:8, borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:12}}>
              {user ? (
                <button onClick={handleLogout} className="d-btn-orange glow-btn-orange" style={{display:'block',width:'100%',textAlign:'center',padding:'12px 16px',fontSize:14,textDecoration:'none',border:'none',cursor:'pointer'}}>লগআউট</button>
              ) : (
                <Link href="/login" onClick={()=>setOpen(false)} className="d-btn glow-btn" style={{display:'block',textAlign:'center',padding:'12px 16px',fontSize:14,textDecoration:'none'}}>লগইন / রেজিস্টার</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}