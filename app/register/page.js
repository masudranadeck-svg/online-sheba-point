'use client'
import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // Phone Auth State
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  // ১. Email/Password দিয়ে রেজিস্টার
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('লোডিং...');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('রেজিস্ট্রেশন সফল হয়েছে!');
      setEmail(''); 
      setPassword('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // ২. Google দিয়ে রেজিস্টার
  const handleGoogle = async () => {
    setMessage('Google দিয়ে লগইন হচ্ছে...');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setMessage('Google দিয়ে লগইন সফল!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // ৩. Phone OTP পাঠানো
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('OTP পাঠানো হচ্ছে...');
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'normal',
          'callback': () => {}
        });
      }
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      setMessage('OTP পাঠানো হয়েছে, নিচে কোড দিন।');
      setShowOtp(true);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // ৪. OTP ভেরিফাই করা
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('ভেরিফাই হচ্ছে...');
    try {
      await window.confirmationResult.confirm(otp);
      setMessage('Phone ভেরিফাই সফল!');
    } catch (error) {
      setMessage('ভুল OTP কোড!');
    }
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '450px', margin: 'auto' }}>
      <div className="d-card glow-card" style={{ padding: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a1a2e' }}>📝 রেজিস্টার করুন</h2>
        
        <button 
          onClick={handleGoogle} 
          style={{ width: '100%', padding: '12px', background: 'white', color: '#444', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginBottom: '10px' }}
        >
          🔵 Sign up with Google
        </button>

        <div style={{ textAlign: 'center', color: '#aaa', margin: '20px 0' }}>অথবা ইমেইল দিয়ে</div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="ইমেইল" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <input 
            type="password" 
            placeholder="পাসওয়ার্ড" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button 
            type="submit" 
            style={{ padding: '12px', background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
          >
            রেজিস্টার
          </button>
        </form>

        <div style={{ textAlign: 'center', color: '#aaa', margin: '20px 0' }}>অথবা ফোন নম্বর দিয়ে</div>
        
        <div id="recaptcha-container" style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}></div>
        
        {!showOtp ? (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="tel" 
              placeholder="+8801XXXXXXXXX" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <button 
              type="submit" 
              style={{ padding: '12px', background: '#42b72a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
            >
              📱 OTP পাঠান
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="৬ ডিজিটের কোড" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <button 
              type="submit" 
              style={{ padding: '12px', background: '#4e6ef2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
            >
              ✅ ভেরিফাই করুন
            </button>
          </form>
        )}

        {message && <p style={{ marginTop: '15px', color: 'blue', textAlign: 'center', fontSize: '14px' }}>{message}</p>}
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/login" style={{ color: '#4e6ef2', textDecoration: 'none', fontWeight: '600' }}>লগইন করুন</Link>
        </p>
      </div>
    </div>
  );
}