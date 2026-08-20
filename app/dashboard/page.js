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
        // Login na thakle login page e pathay dibe
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  // Jodium check korbe
  if (loading) {
    return <div className="deepin-body" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color: 'white' }}>লোডিং...</p>
    </div>;
  }

  return (
    <div className="deepin-body" style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:40, flexWrap:'wrap', gap:20 }}>
        <div>
          <h1 style={{ fontSize:28, fontWeight:800, color:'white', margin:0 }}>আপনার ড্যাশবোর্ড</h1>
          <p style={{ color:'rgba(255,255,255,0.6)', margin:'5px 0 0 0' }}>
            স্বাগতম, <span style={{ fontWeight:600, color:'#4e6ef2' }}>{user.email}</span>
          </p>
        </div>
        <button onClick={handleLogout} className="neon-3d-btn" style={{ background:'linear-gradient(135deg, #fb6340, #ff9f43)' }}>
          লগআউট
        </button>
      </div>

      {/* Dashboard Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:20 }}>
        <Link href="/shop" className="glass-3d" style={{ textDecoration:'none' }}>
          <h3 style={{ color:'white', margin:'0 0 8px 0' }}>🛒 প্রোডাক্ট শপ</h3>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, margin:0 }}>নতুন সফটওয়্যার ও কী কিনুন</p>
        </Link>
        
        <Link href="/orders" className="glass-3d" style={{ textDecoration:'none' }}>
          <h3 style={{ color:'white', margin:'0 0 8px 0' }}>📦 অর্ডার হিস্ট্রি</h3>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, margin:0 }}>আপনার আগের অর্ডার সমূহ</p>
        </Link>
        
        <Link href="/keys" className="glass-3d" style={{ textDecoration:'none' }}>
          <h3 style={{ color:'white', margin:'0 0 8px 0' }}>🔑 আমার কীগুলো</h3>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, margin:0 }}>কেনা লাইসেন্স কী গুলো দেখুন</p>
        </Link>
      </div>
    </div>
  );
}