'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return <div className="deepin-body" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color: 'white' }}>লোডিং...</p>
    </div>;
  }

  return (
    <div className="deepin-body" style={{ minHeight:'100vh' }}>
      
      {/* Dashboard Exclusive Top Bar */}
      <header style={{ 
        display:'flex', 
        justifyContent:'space-between', 
        alignItems:'center', 
        padding:'20px 40px', 
        borderBottom:'1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ color:'white', margin:0, fontSize:20, letterSpacing:1 }}>SHEBAPPOINT</h2>
        <button onClick={handleLogout} className="neon-3d-btn" style={{ background:'linear-gradient(135deg, #fb6340, #ff9f43)', padding:'10px 24px', fontSize:14 }}>
          লগআউট
        </button>
      </header>

      {/* Main Dashboard Content */}
      <main style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Welcome Header */}
        <div className="glass-3d" style={{ marginBottom: 32, textAlign:'center' }}>
          <h1 style={{ fontSize:28, fontWeight:800, color:'white', margin:'0 0 8px 0' }}>আপনার ড্যাশবোর্ডে স্বাগতম</h1>
          <p style={{ color:'rgba(255,255,255,0.6)', margin:0 }}>
            লগইন করা ইমেইল: <span style={{ fontWeight:600, color:'#4e6ef2' }}>{user.email}</span>
          </p>
        </div>

        {/* Dashboard Organized Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24 }}>
          
          <Link href="/shop" className="glass-3d" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ fontSize:32, background:'rgba(78,110,242,0.1)', padding:16, borderRadius:12 }}>🛒</div>
            <div>
              <h3 style={{ color:'white', margin:'0 0 4px 0' }}>প্রোডাক্ট শপ</h3>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, margin:0 }}>নতুন সফটওয়্যার ও কী কিনুন</p>
            </div>
          </Link>
          
          <Link href="/orders" className="glass-3d" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ fontSize:32, background:'rgba(168,85,247,0.1)', padding:16, borderRadius:12 }}>📦</div>
            <div>
              <h3 style={{ color:'white', margin:'0 0 4px 0' }}>অর্ডার হিস্ট্রি</h3>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, margin:0 }}>আপনার আগের অর্ডার সমূহ</p>
            </div>
          </Link>
          
          <Link href="/keys" className="glass-3d" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ fontSize:32, background:'rgba(45,206,137,0.1)', padding:16, borderRadius:12 }}>🔑</div>
            <div>
              <h3 style={{ color:'white', margin:'0 0 4px 0' }}>আমার কীগুলো</h3>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, margin:0 }}>কেনা লাইসেন্স কী গুলো দেখুন</p>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}