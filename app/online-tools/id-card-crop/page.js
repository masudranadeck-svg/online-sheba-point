'use client';
import { useState } from 'react';
import jsPDF from 'jspdf';

export default function IdCardCropToPDF() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // স্মার্ট অটো-ক্রপ ফাংশন (ছবির মাঝ থেকে আইডি কার্ড সাইজ কেটে নেবে)
  const autoCropToIDCardSize = (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const targetRatio = 85.6 / 54; // আইডি কার্ডের সঠিক অনুপাত
        const imgRatio = img.width / img.height;
        
        let cropWidth, cropHeight;
        
        if (imgRatio > targetRatio) {
          // ছবি যদি চওড়া হয়, দুই পাশ কাটবে
          cropWidth = img.height * targetRatio;
          cropHeight = img.height;
        } else {
          // ছবি যদি লম্বা হয়, উপর-নিচ কাটবে
          cropWidth = img.width;
          cropHeight = img.width / targetRatio;
        }
        
        const offsetX = (img.width - cropWidth) / 2;
        const offsetY = (img.height - cropHeight) / 2;
        
        // ক্যানভাসে নতুন ছবি তৈরি (হাই রেজোলিউশনের জন্য 10x)
        const canvas = document.createElement('canvas');
        canvas.width = 856;
        canvas.height = 540;
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(
          img,
          offsetX, offsetY, cropWidth, cropHeight,
          0, 0, 856, 540
        );
        
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.src = dataUrl;
    });
  };

  const generatePDF = async () => {
    if (!frontImage || !backImage) {
      alert("দয়া করে আইডি কার্ডের সামনে এবং পিছনের ছবি দুটো আপলোড করুন!");
      return;
    }
    
    setLoading(true);
    try {
      // ছবি দুটো অটো-ক্রপ করা হচ্ছে
      const frontCropped = await autoCropToIDCardSize(frontImage);
      const backCropped = await autoCropToIDCardSize(backImage);
      
      // পিডিএফ তৈরি করা হচ্ছে (Landscape, ID Card Size)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 54]
      });
      
      // ১ম পেজে সামনের ছবি
      pdf.addImage(frontCropped, 'JPEG', 0, 0, 85.6, 54);
      
      // ২য় পেজে পিছনের ছবি
      pdf.addPage();
      pdf.addImage(backCropped, 'JPEG', 0, 0, 85.6, 54);
      
      // ডাউনলোড করা হচ্ছে
      pdf.save('id-card-front-back.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert("PDF তৈরি করতে সমস্যা হয়েছে!");
    }
    setLoading(false);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🆔 ID Card to PDF (Auto Crop)</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>সামনে ও পিছনের ছবি আপলোড করুন, অটো ক্রপ হয়ে ২ পেজের পিডিএফ তৈরি হবে।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            
            {/* Front Image Upload */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>সামনের ছবি (Front)</label>
              <div style={{ 
                border: '2px dashed rgba(78,110,242,0.5)', 
                borderRadius: '12px', 
                padding: '10px', 
                minHeight: '120px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'rgba(0,0,0,0.2)' 
              }}>
                {frontImage ? (
                  <img src={frontImage} alt="Front" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '8px' }} />
                ) : (
                  <input type="file" accept="image/*" onChange={(e) => handleFile(e, setFrontImage)} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                )}
              </div>
              {frontImage && (
                <button onClick={() => setFrontImage(null)} className="d-btn-orange" style={{ marginTop: '10px', padding: '5px 10px', fontSize: '12px', border: 'none', cursor: 'pointer', width: '100%' }}>
                  পরিবর্তন করুন
                </button>
              )}
            </div>

            {/* Back Image Upload */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>পিছনের ছবি (Back)</label>
              <div style={{ 
                border: '2px dashed rgba(168,85,247,0.5)', 
                borderRadius: '12px', 
                padding: '10px', 
                minHeight: '120px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'rgba(0,0,0,0.2)' 
              }}>
                {backImage ? (
                  <img src={backImage} alt="Back" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '8px' }} />
                ) : (
                  <input type="file" accept="image/*" onChange={(e) => handleFile(e, setBackImage)} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                )}
              </div>
              {backImage && (
                <button onClick={() => setBackImage(null)} className="d-btn-orange" style={{ marginTop: '10px', padding: '5px 10px', fontSize: '12px', border: 'none', cursor: 'pointer', width: '100%' }}>
                  পরিবর্তন করুন
                </button>
              )}
            </div>

          </div>

          <button 
            onClick={generatePDF} 
            disabled={loading || !frontImage || !backImage} 
            className="d-btn glow-btn" 
            style={{ 
              width: '100%', 
              padding: '14px', 
              fontSize: '16px', 
              border: 'none', 
              cursor: 'pointer', 
              opacity: (loading || !frontImage || !backImage) ? 0.5 : 1 
            }}
          >
            {loading ? '⏳ পিডিএফ তৈরি হচ্ছে...' : '📄 অটো পিডিএফ ডাউনলোড করুন'}
          </button>
        </div>
      </div>
    </div>
  );
}