'use client';
import { useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter(Boolean).length;

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🔢 Word Counter</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>লেখার শব্দ, অক্ষর, বাক্য এবং প্যারাগ্রাফ গণনা করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="এখানে আপনার লেখা টাইপ করুন বা পেস্ট করুন..." 
            style={{ 
              width: '100%', 
              height: '250px', 
              background: 'rgba(0,0,0,0.3)', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '8px', 
              padding: '15px', 
              fontSize: '16px', 
              outline: 'none', 
              resize: 'vertical' 
            }} 
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginTop: '30px' }}>
            <div style={{ background: 'rgba(78,110,242,0.1)', border: '1px solid rgba(78,110,242,0.2)', borderRadius: '8px', padding: '15px' }}>
              <p style={{ margin: 0, color: '#4e6ef2', fontSize: '24px', fontWeight: 'bold' }}>{words}</p>
              <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Words (শব্দ)</p>
            </div>
            <div style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px', padding: '15px' }}>
              <p style={{ margin: 0, color: '#a855f7', fontSize: '24px', fontWeight: 'bold' }}>{chars}</p>
              <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Characters (অক্ষর)</p>
            </div>
            <div style={{ background: 'rgba(45,206,137,0.1)', border: '1px solid rgba(45,206,137,0.2)', borderRadius: '8px', padding: '15px' }}>
              <p style={{ margin: 0, color: '#2dce89', fontSize: '24px', fontWeight: 'bold' }}>{sentences}</p>
              <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Sentences (বাক্য)</p>
            </div>
            <div style={{ background: 'rgba(251,99,64,0.1)', border: '1px solid rgba(251,99,64,0.2)', borderRadius: '8px', padding: '15px' }}>
              <p style={{ margin: 0, color: '#fb6340', fontSize: '24px', fontWeight: 'bold' }}>{paragraphs}</p>
              <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Paragraphs (প্যারাগ্রাফ)</p>
            </div>
          </div>

          {text && (
            <button onClick={() => setText('')} className="d-btn-outline" style={{ marginTop: '20px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
              🧹 Clear Text
            </button>
          )}

        </div>
      </div>
    </div>
  );
}