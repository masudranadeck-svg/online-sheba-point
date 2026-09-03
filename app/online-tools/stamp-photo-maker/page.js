'use client';
import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import jsPDF from 'jspdf';

export default function StampPhotoMaker() {
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

  // A4 Canvas Generate (48 Copies Grid - Perfectly Centered)
  const buildA4Canvas = async () => {
    const canvas = document.createElement('canvas');
    // High Quality A4 Canvas (300 DPI: 2480x3508)
    canvas.width = 2480;
    canvas.height = 3508;
    const ctx = canvas.getContext('2d');
    
    // White Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // 2.0 cm x 2.1 cm at 300 DPI 
        // 1 cm = 118.11 px. So, 2cm = 236px, 2.1cm = 248px (Approx)
        const photoW = 236;
        const photoH = 248;
        const borderW = 15; // Thin white border around photo
        
        const blockW = photoW + (2 * borderW); // 266
        const blockH = photoH + (2 * borderW); // 278
        
        const cols = 6; // 6 photos per row
        const rows = 8; // 8 rows total = 48 photos
        const gapX = 20; // Horizontal gap
        const gapY = 20; // Vertical gap
        
        // Calculate Total Grid Width & Height to perfectly center it
        const totalGridW = (cols * blockW) + ((cols - 1) * gapX);
        const totalGridH = (rows * blockH) + ((rows - 1) * gapY);
        
        const startX = (canvas.width - totalGridW) / 2; // Centered horizontally
        let startY = (canvas.height - totalGridH) / 2;   // Centered vertically (No cut off)
        
        let x = startX;
        let y = startY;
        
        for (let i = 0; i < 48; i++) {
          // Draw White Border Background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(x, y, blockW, blockH);
          
          // Draw thin border line
          ctx.strokeStyle = '#E0E0E0';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, blockW, blockH);
          
          // Draw Photo inside the border
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
    link.download = 'stamp-photo-a4.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadA4JPG = async () => {
    const canvas = await buildA4Canvas();
    const link = document.createElement('a');
    link.download = 'stamp-photo-a4.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const handleDownloadA4PDF = async () => {
    const canvas = await buildA4Canvas();
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    pdf.save('stamp-photo-a4.pdf');
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
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🟫 Stamp Photo Maker (2cm x 2.1cm)</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি ক্রপ করুন, ম্যাজিক ফিল্টার দিন, A4 পেজে ৪৮ কপি সাদা বর্ডারসহ প্রিন্ট করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          {!imageSrc ? (
            <div style={{ border: '2px dashed rgba(45,206,137,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>আপনার ছবি আপলোড করুন</p>
              <input type="file" accept="image/*" onChange={onSelectFile} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
            </div>
          ) : (
            <>
              {!croppedImage ? (
                <div>
                  {/* Stamp Size Aspect Ratio (2.0:2.1 = 20:21) */}
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>মাউস দিয়ে টেনে স্ট্যাম্প সাইজে ক্রপ করুন</p>
                  <div style={{ background: '#121212', padding: '10px', borderRadius: '12px', marginBottom: '20px' }}>
                    <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={20 / 21}>
                      <img ref={imgRef} src={imageSrc} alt="Source" style={{ maxHeight: '400px' }} />
                    </ReactCrop>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setImageSrc(null)} className="d-btn-orange" style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '12px' }}>
                      ❌ বাতিল
                    </button>
                    <button onClick={handleConfirmCrop} className="d-btn-green glow-btn-green" style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '12px' }}>
                      ✅ ক্রপ কনফার্ম করুন
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <img 
                    src={isEnhanced && finalImage ? finalImage : croppedImage} 
                    alt="Cropped" 
                    style={{ maxWidth: '150px', borderRadius: '8px', marginBottom: '20px', border: '2px solid rgba(255,255,255,0.2)' }} 
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