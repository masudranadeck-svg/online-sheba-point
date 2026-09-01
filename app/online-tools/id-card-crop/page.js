'use client';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import jsPDF from 'jspdf';

export default function IdCardCropToPDF() {
  const [frontOriginal, setFrontOriginal] = useState(null);
  const [backOriginal, setBackOriginal] = useState(null);
  const [croppedFront, setCroppedFront] = useState(null);
  const [croppedBack, setCroppedBack] = useState(null);
  
  const [isCropping, setIsCropping] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentTarget, setCurrentTarget] = useState(null);
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onFileChange = (e, target) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (target === 'front') setFrontOriginal(reader.result);
        else setBackOriginal(reader.result);
        setCurrentImage(reader.result);
        setCurrentTarget(target);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const handleConfirmCrop = async () => {
    try {
      const image = await createImage(currentImage);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0, 0, canvas.width, canvas.height
      );

      const dataURL = canvas.toDataURL('image/jpeg', 0.9);
      if (currentTarget === 'front') setCroppedFront(dataURL);
      else setCroppedBack(dataURL);

      setIsCropping(false);
    } catch (e) {
      console.error(e);
    }
  };

  const generatePDF = () => {
    if (!croppedFront || !croppedBack) {
      alert("দয়া করে সামনে এবং পিছনের দুটো ছবি ক্রপ করুন!");
      return;
    }

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [85.6, 54] });
    pdf.addImage(croppedFront, 'JPEG', 0, 0, 85.6, 54);
    pdf.addPage();
    pdf.addImage(croppedBack, 'JPEG', 0, 0, 85.6, 54);
    pdf.save('id-card.pdf');
  };

  // ক্রপিং স্ক্রিন চালু থাকলে এটা দেখাবে (জুম ছাড়া)
  if (isCropping && currentImage) {
    return (
      <div className="deepin-body" style={{ minHeight: '100vh', padding: '150px 20px 40px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>✂️ আইডি কার্ড ক্রপ করুন</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>ছবি টেনে আইডি কার্ডের ঠিক উপরে বক্সটা বসিয়ে নিন</p>
          
          <div className="glass-3d" style={{ padding: '20px' }}>
            <div style={{ position: 'relative', width: '100%', height: '400px', background: '#121212', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
              <Cropper
                image={currentImage}
                crop={crop}
                aspect={85.6 / 54}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setIsCropping(false)} className="d-btn-orange" style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '12px' }}>
                ❌ বাতিল
              </button>
              <button onClick={handleConfirmCrop} className="d-btn glow-btn" style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '12px' }}>
                ✅ কনফার্ম করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // মেইন আপলোড স্ক্রিন
  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🆔 ID Card to PDF</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>সামনে ও পিছনের ছবি আপলোড করে ক্রপ করুন, ২ পেজের পিডিএফ তৈরি হবে।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            
            {/* Front Side */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>সামনের ছবি (Front)</label>
              <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '10px', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                {croppedFront ? (
                  <img src={croppedFront} alt="Front" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '8px' }} />
                ) : (
                  <input type="file" accept="image/*" onChange={(e) => onFileChange(e, 'front')} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                )}
              </div>
            </div>

            {/* Back Side */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>পিছনের ছবি (Back)</label>
              <div style={{ border: '2px dashed rgba(168,85,247,0.5)', borderRadius: '12px', padding: '10px', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                {croppedBack ? (
                  <img src={croppedBack} alt="Back" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '8px' }} />
                ) : (
                  <input type="file" accept="image/*" onChange={(e) => onFileChange(e, 'back')} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                )}
              </div>
            </div>

          </div>

          <button 
            onClick={generatePDF} 
            disabled={!croppedFront || !croppedBack} 
            className="d-btn glow-btn" 
            style={{ width: '100%', padding: '14px', fontSize: '16px', border: 'none', cursor: 'pointer', opacity: (!croppedFront || !croppedBack) ? 0.5 : 1 }}
          >
            📄 পিডিএফ ডাউনলোড করুন
          </button>
        </div>
      </div>
    </div>
  );
}