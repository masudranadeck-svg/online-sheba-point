'use client';
import { useState } from 'react';

export default function AIPassportPhotoMaker() {
  const [copiedCard, setCopiedCard] = useState('');

  // AI Studio Link
  const aiStudioUrl = "https://aistudio.google.com/prompts/new_chat?model=gemini-3.1-flash-lite-image";

  // Pre-defined Prompts
  const prompts = {
    male: "Generate a natural passport photo meeting official standards. Ensure the background is plain white, face is centered, looking straight at the camera, neutral expression, and proper lighting. Transform the uploaded image into this standard.",
    female: "Create a passport headshot photo from the uploaded photo. Ensure ears are visible, plain white background, neutral expression, and official passport photo standards.",
    hijab: "Create a perfect passport facial headshot from the uploaded photo, where the person is wearing a hijab. Ensure the face from forehead to chin is clearly visible, plain white background, and meets official passport standards."
  };

  const handleCardClick = async (type) => {
    const promptText = prompts[type];
    
    try {
      // 1. Copy prompt to clipboard
      await navigator.clipboard.writeText(promptText);
      setCopiedCard(type);
      
      // 2. Open Google AI Studio in a new tab
      window.open(aiStudioUrl, '_blank');

      // Reset copied text after 5 seconds
      setTimeout(() => setCopiedCard(''), 5000);
    } catch (err) {
      alert('প্রম্পট কপি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  const cards = [
    { id: 'male', title: 'Male Passport Photo', desc: 'To automatically generate a natural passport photo meeting official standards.', icon: '👨', color: '#4e6ef2' },
    { id: 'female', title: 'Female Passport Photo', desc: 'Creating a passport headshot photo from any photo, ears will be there.', icon: '👩', color: '#a855f7' },
    { id: 'hijab', title: 'Hijab Passport Photo', desc: 'Creating passport - perfect facial headshots from any photo wearing a hijab.', icon: '🧕', color: '#2dce89' }
  ];

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🤖 AI Passport Photo Lab</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>যেকোনো একটি কার্ডে ক্লিক করুন। প্রম্পট অটো-কপি হয়ে Google AI Studio ওপেন হবে।</p>
        
        {/* Instructions */}
        <div className="glass-3d" style={{ padding: '15px', marginBottom: '30px', background: 'rgba(78,110,242,0.1)', border: '1px solid rgba(78,110,242,0.2)' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>
            📌 <strong>নিয়মাবলি:</strong> ১. কার্ডে ক্লিক করুন। ২. AI Studio তে গিয়ে Chat box এ প্রম্পট Paste করুন (Ctrl+V)। ৩. আপনার ছবি আপলোড করে Run দিন।
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {cards.map((card) => (
            <div 
              key={card.id} 
              onClick={() => handleCardClick(card.id)} 
              className="glass-3d" 
              style={{ cursor: 'pointer', textAlign: 'center', borderColor: copiedCard === card.id ? card.color : 'rgba(255,255,255,0.1)' }}
            >
              <div style={{
                width: 70, height: 70, borderRadius: '50%',
                background: `rgba(${card.color === '#4e6ef2' ? '78,110,242' : card.color === '#a855f7' ? '168,85,247' : '45,206,137'}, 0.1)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, margin: '0 auto 16px auto', border: `1px solid ${card.color}30`
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', margin: '0 0 10px 0' }}>{card.title}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, minHeight: '60px' }}>{card.desc}</p>
              
              <button 
                className="d-btn-outline" 
                style={{ 
                  marginTop: '16px', 
                  padding: '10px 16px', 
                  fontSize: '14px', 
                  width: '100%', 
                  boxSizing: 'border-box', 
                  border: 'none', 
                  cursor: 'pointer',
                  background: copiedCard === card.id ? card.color : 'rgba(255,255,255,0.05)',
                  color: copiedCard === card.id ? 'white' : 'rgba(255,255,255,0.7)',
                  transition: 'all 0.3s'
                }}
              >
                {copiedCard === card.id ? '✅ কপি হয়েছে! AI Studio খুলুন' : 'অটো-কপি ও ওপেন করুন →'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}