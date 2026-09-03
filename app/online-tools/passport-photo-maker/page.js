'use client';
import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import jsPDF from 'jspdf';

export default function PassportPhotoMaker() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  
  // Enhanced State
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const imgRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(e.target.files[0]);
      setIsEnhanced(false);
      setFinalImage(null);
      setCroppedImage(null);
    }
  };

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      canvas.width = Math.ceil(crop.width * scaleX);
      canvas.height = Math.ceil(crop.height * scaleY);
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0, 0, canvas.width, canvas.height
      );
      
      return canvas.toDataURL('image/jpeg', 0.95);
    }
  };

  const handleConfirmCrop = async () => {
    if (crop) {
      const croppedUrl = await makeClientCrop(crop);
      if (croppedUrl) setCroppedImage(croppedUrl);
    }
  };

  // Magic Filter
  const handleEnhance = async () => {
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      const ctx = canvas.getContext('2d');
      ctx.filter = 'contrast(125%) saturate(130%) brightness(105%)';
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setFinalImage(canvas.toDataURL('image/jpeg', 0.95));
      setIsEnhanced(true);
      setIsProcessing(false);
    };
    img.src = croppedImage;
  };

  // A4 Canvas Generate (20 Copies Grid with White Border)
  const buildA4Canvas = async () => {
    // High Quality A4 Canvas (300 DPI: 2480x3508)
    const canvas = document.createElement('canvas');
    canvas.width = 2480;
    canvas.height = 3508;
    const ctx = canvas.getContext('2d');
    
    // White Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // 1.6 inch x 2 inch at 300 DPI = 480px x 600px
        const photoW = 480;
        const photoH = 600;
        const borderW = 40; // White thin border around photo
        
        const blockW = photoW + (2 * borderW);
        const blockH = photoH + (2 * borderW);
        
        const cols = 4;
        const rows = 5;
        const gapX = 20;
        const gapY = 20;
        
        const totalGridW = (cols * blockW) + ((cols - 1) * gapX);
        const startX = (canvas.width - totalGridW) / 2;
        let startY = 200; // Top margin
        
        let x = startX;
        let y = startY;
        
        for (let i = 0; i < 20; i++) {
          // Draw White Border
          ctx.fillStyle = '#FFFFFF';
          // Shadow effect (optional, commented out for pure white border)
          // ctx.shadowColor = 'rgba(0,0,0,0.1)'; ctx.shadowBlur = 10;
          ctx.fillRect(x, y, blockW, blockH);
          // ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
          
          // Draw thin border line
          ctx.strokeStyle = '#E0E0E0';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, blockW, blockH);
          
          // Draw Photo
          ctx.drawImage(img, x + borderW, y + borderW, photoW, photoH);
          
          x += blockW + gapX;
          if ((i + 1) % cols === 0) {
            x = startX;
            y += blockH + gapY;
          }
        }
        resolve(canvas);
      };
      img.src = finalImage;
    });
  };

  const handleDownloadA4PNG = async () => {
    const canvas = await buildA4Canvas();
    const link = document.createElement('a');
    link.download = 'passport-photo-a4.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadA4JPG = async () => {
    const canvas = await buildA4Canvas();
    const link = document.createElement('a');
    link.download = 'passport-photo-a4.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const handleDownloadA4PDF = async () => {
    const canvas = await buildA4Canvas();
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    pdf.save('passport-photo-a4.pdf');
  };

  const handleDirectA4Print = async () => {
    const canvas = await buildA4Canvas();
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    win.document.write(`<img src="${dataUrl}" style="width:100%;" onload="window.print();">`);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📸 Passport Photo Maker (1.6" x 2")</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি ক্রপ করুন, ম্যাজিক ফিল্টার দিন, A4 পেজে ২০ কপি সাদা বর্ডারসহ প্রিন্ট করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          {!imageSrc ? (
            <div style={{ border: '2px dashed rgba(168,85,247,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>আপনার ছবি আপলোড করুন</p>
              <input type="file" accept="image/*" onChange={onSelectFile} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
            </div>
          ) : (
            <>
              {!croppedImage ? (
                <div>
                  {/* Passport Size Aspect Ratio (1.6:2 = 4:5) */}
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>মাউস দিয়ে টেনে পাসপোর্ট সাইজে ক্রপ করুন</p>
                  <div style={{ background: '#121212', padding: '10px', borderRadius: '12px', marginBottom: '20px' }}>
                    <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={4 / 5}>
                      <img ref={imgRef} src={imageSrc} alt="Source" style={{ maxHeight: '400px' }} />
                    </ReactCrop>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setImageSrc(null)} className="d-btn-orange" style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '12px' }}>
                      ❌ বাতিল
                    </button>
                    <button onClick={handleConfirmCrop} className="d-btn glow-btn" style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '12px' }}>
                      ✅ ক্রপ কনফার্ম করুন
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <img 
                    src={isEnhanced && finalImage ? finalImage : croppedImage} 
                    alt="Cropped" 
                    style={{ maxWidth: '200px', borderRadius: '8px', marginBottom: '20px', border: '2px solid rgba(255,255,255,0.2)' }} 
                  />
                  
                  {!isEnhanced ? (
                    <>
                      <button 
                        onClick={handleEnhance} 
                        disabled={isProcessing}
                        className="neon-3d-btn" 
                        style={{ width: '100%', padding: '14px', fontSize: '16px', marginBottom: '20px', opacity: isProcessing ? 0.5 : 1 }}
                      >
                        {isProcessing ? '⏳ ম্যাজিক ফিল্টার প্রসেসিং হচ্ছে...' : '✨ Upscale & Enhance'}
                      </button>
                      <button onClick={() => { setImageSrc(null); setCroppedImage(null); }} className="d-btn-outline" style={{ width: '100%', padding: '10px', border: 'none', cursor: 'pointer' }}>
                        পুনরায় ছবি আপলোড করুন
                      </button>
                    </>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                      <button onClick={handleDownloadA4PNG} className="d-btn-green glow-btn-green" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>
                        💾 Save as A4 PNG
                      </button>
                      <button onClick={handleDownloadA4JPG} className="d-btn-purple glow-btn-purple" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>
                        💾 Save as A4 JPG
                      </button>
                      <button onClick={handleDownloadA4PDF} className="d-btn-orange glow-btn-orange" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>
                        💾 Save as A4 PDF
                      </button>
                      <button onClick={handleDirectA4Print} className="d-btn glow-btn" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>
                        🖨️ Direct A4 Print
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}