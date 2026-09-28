'use client';
import { useState } from 'react';
import jsPDF from 'jspdf';

export default function TextToPdf() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(12);
  const [pageSize, setPageSize] = useState('a4');
  const [loading, setLoading] = useState(false);

  const generatePdf = () => {
    if (!text.trim()) {
      alert('অনুগ্রহ করে কিছু টেক্সট লিখুন!');
      return;
    }

    setLoading(true);

    try {
      const doc = new jsPDF('p', 'mm', pageSize);
      
      const margin = 15; // 15mm margin
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const usableWidth = pageWidth - margin * 2;

      doc.setFontSize(fontSize);
      
      // টেক্সটকে পেজের সাইজ অনুযায়ী ভাগ করা হচ্ছে (Text Wrapping)
      const splitText = doc.splitTextToSize(text, usableWidth);
      
      let y = margin + fontSize; // প্রথম লাইনের Y পজিশন

      for (let i = 0; i < splitText.length; i++) {
        // যদি লেখা পেজের শেষে চলে যায়, তবে নতুন পেজ যোগ হবে
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin + fontSize; // নতুন পেজে আবার উপর থেকে শুরু
        }
        
        doc.text(splitText[i], margin, y);
        y += fontSize * 0.5; // লাইন হাইট (Font size এর অর্ধেক)
      }

      doc.save('text-document.pdf');
    } catch (err) {
      console.error(err);
      alert('পিডিএফ তৈরি করতে সমস্যা হয়েছে!');
    }
    setLoading(false);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📝 Text to PDF Maker</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>যেকোনো লেখা টাইপ বা পেস্ট করুন এবং সাথে সাথে পিডিএফ ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Font Size: {fontSize}</label>
              <input type="range" min="8" max="24" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={{ width: '150px', marginLeft: '10px', accentColor: '#4e6ef2' }} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Page Size:</label>
              <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} className="d-input" style={{ marginLeft: '10px', width: 'auto', padding: '5px' }}>
                <option value="a4" style={{background: '#1a1c2e'}}>A4</option>
                <option value="letter" style={{background: '#1a1c2e'}}>Letter</option>
                <option value="legal" style={{background: '#1a1c2e'}}>Legal</option>
              </select>
            </div>
          </div>

          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="এখানে আপনার লেখা টাইপ করুন বা পেস্ট করুন..." 
            style={{ 
              width: '100%', 
              height: '300px', 
              background: 'rgba(0,0,0,0.3)', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '8px', 
              padding: '15px', 
              fontSize: '14px', 
              outline: 'none', 
              resize: 'vertical' 
            }} 
          />

          <button onClick={generatePdf} disabled={loading} className="d-btn-green glow-btn-green" style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '20px', opacity: loading ? 0.5 : 1 }}>
            {loading ? '⏳ তৈরি হচ্ছে...' : '📄 Download PDF'}
          </button>

        </div>
      </div>
    </div>
  );
}