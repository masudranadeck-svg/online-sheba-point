'use client';
import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import jsPDF from 'jspdf';

export default function NidJoiner() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontCrop, setFrontCrop] = useState(null);
  const [backCrop, setBackCrop] = useState(null);
  const [croppedFront, setCroppedFront] = useState(null);
  const [croppedBack, setCroppedBack] = useState(null);
  
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [finalFront, setFinalFront] = useState(null);
  const [finalBack, setFinalBack] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const frontImgRef = useRef(null);
  const backImgRef = useRef(null);

  const onSelectFile = (e, setter) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setter(reader.result);
      reader.readAsDataURL(e.target.files[0]);
      setIsEnhanced(false);
      setFinalFront(null);
      setFinalBack(null);
      setCroppedFront(null);
      setCroppedBack(null);
    }
  };

  // Image Rotate Function
  const rotateImage = (imgSrc, deg, setter) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (deg === 90 || deg === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(deg * Math.PI / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      
      setter(canvas.toDataURL('image/jpeg', 0.95));
      setFrontCrop(null); // Reset crop on rotate
      setBackCrop(null);
    };
    img.src = imgSrc;
  };

  const makeClientCrop = async (crop, image) => {
    if (image && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      canvas.width = Math.ceil(crop.width * scaleX);
      canvas.height = Math.ceil(crop.height * scaleY);
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        crop.x * scaleX, crop.y * scaleY,
        crop.width * scaleX, crop.height * scaleY,
        0, 0, canvas.width, canvas.height
      );
      
      return canvas.toDataURL('image/jpeg', 0.95);
    }
  };

  const handleConfirmFront = async () => {
    if (frontCrop) {
      const url = await makeClientCrop(frontCrop, frontImgRef.current);
      if (url) setCroppedFront(url);
    }
  };

  const handleConfirmBack = async () => {
    if (backCrop) {
      const url = await makeClientCrop(backCrop, backImgRef.current);
      if (url) setCroppedBack(url);
    }
  };

  const handleEnhance = async () => {
    setIsProcessing(true);
    
    const enhanceImage = (imgUrl) => new Promise((resolve) => {
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
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };
      img.src = imgUrl;
    });

    if (croppedFront) setFinalFront(await enhanceImage(croppedFront));
    if (croppedBack) setFinalBack(await enhanceImage(croppedBack));
    
    setIsEnhanced(true);
    setIsProcessing(false);
  };

  const buildCanvas = async () => {
    const cardW = 1020;
    const cardH = 630;
    const gap = 60;
    const border = 5;
    
    const totalW = cardW;
    const totalH = (cardH * 2) + gap + (border * 2);

    const canvas = document.createElement('canvas');
    canvas.width = totalW;
    canvas.height = totalH;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const loadImage = (url) => new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = url;
    });

    const frontImg = finalFront ? await loadImage(finalFront) : null;
    const backImg = finalBack ? await loadImage(finalBack) : null;

    const drawImage = (img, yStart) => {
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, yStart + 1, cardW - 2, cardH - 2);

      let w = cardW;
      let h = (img.height / img.width) * w;
      if (h > cardH) {
        h = cardH;
        w = (img.width / img.height) * h;
      }
      const x = (cardW - w) / 2;
      const y = yStart + (cardH - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    };

    if (frontImg) drawImage(frontImg, 0);
    if (backImg) drawImage(backImg, cardH + gap);
    
    return canvas;
  };

  const handleDownloadPNG = async () => {
    const canvas = await buildCanvas();
    const link = document.createElement('a');
    link.download = 'nid-joined.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadJPG = async () => {
    const canvas = await buildCanvas();
    const link = document.createElement('a');
    link.download = 'nid-joined.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const handleDownloadPDF = async () => {
    const canvas = await buildCanvas();
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfW = 86.36;
    const pdfH = 111.68; 
    const x = (210 - pdfW) / 2;
    const y = (297 - pdfH) / 2;

    pdf.addImage(imgData, 'JPEG', x, y, pdfW, pdfH);
    pdf.save('nid-joined-exact-size.pdf');
  };

  const handlePrint = async () => {
    const canvas = await buildCanvas();
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Print NID</title>
          <style>
            @media print {
              @page { size: A4; margin: 0; }
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { width: 86.36mm; height: 111.68mm; }
            }
          </style>
        </head>
        <body onload="window.print();">
          <img src="${dataUrl}" />
        </body>
      </html>
    `);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📄 NID Front-Back Joiner (3.4" x 2.1")</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি সোজা করতে ঘোরান, ক্রপ করুন, একসাথে জোড়া লাগিয়ে সঠিক সাইজে সেভ বা প্রিন্ট করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            
            {/* Front Side */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>সামনের ছবি (Front)</label>
              {!frontImage ? (
                <div style={{ border: '2px dashed rgba(45,206,137,0.5)', borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                  <input type="file" accept="image/*" onChange={(e) => onSelectFile(e, setFrontImage)} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                </div>
              ) : (
                <>
                  {croppedFront ? (
                    <div>
                      <img src={isEnhanced && finalFront ? finalFront : croppedFront} alt="Cropped Front" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.2)' }} />
                      {!isEnhanced && (
                        <button onClick={() => { setFrontImage(null); setCroppedFront(null); }} className="d-btn-orange" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
                          পুনরায় করুন
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {/* Rotate Buttons */}
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: 'center' }}>
                        <button onClick={() => rotateImage(frontImage, -90, setFrontImage)} className="d-btn-outline" style={{ padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }}>⟲ বামে ঘোরান</button>
                        <button onClick={() => rotateImage(frontImage, 90, setFrontImage)} className="d-btn-outline" style={{ padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }}>⟳ ডানে ঘোরান</button>
                      </div>
                      
                      <ReactCrop crop={frontCrop} onChange={(c) => setFrontCrop(c)} aspect={34 / 21}>
                        <img ref={frontImgRef} src={frontImage} alt="Front" style={{ maxHeight: '300px' }} />
                      </ReactCrop>
                      <button onClick={handleConfirmFront} className="d-btn-green glow-btn-green" style={{ marginTop: '10px', padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
                        ✅ সামনের ছবি কনফার্ম করুন
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Back Side */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>পিছনের ছবি (Back)</label>
              {!backImage ? (
                <div style={{ border: '2px dashed rgba(45,206,137,0.5)', borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                  <input type="file" accept="image/*" onChange={(e) => onSelectFile(e, setBackImage)} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                </div>
              ) : (
                <>
                  {croppedBack ? (
                    <div>
                      <img src={isEnhanced && finalBack ? finalBack : croppedBack} alt="Cropped Back" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.2)' }} />
                      {!isEnhanced && (
                        <button onClick={() => { setBackImage(null); setCroppedBack(null); }} className="d-btn-orange" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
                          পুনরায় করুন
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {/* Rotate Buttons */}
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: 'center' }}>
                        <button onClick={() => rotateImage(backImage, -90, setBackImage)} className="d-btn-outline" style={{ padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }}>⟲ বামে ঘোরান</button>
                        <button onClick={() => rotateImage(backImage, 90, setBackImage)} className="d-btn-outline" style={{ padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }}>⟳ ডানে ঘোরান</button>
                      </div>

                      <ReactCrop crop={backCrop} onChange={(c) => setBackCrop(c)} aspect={34 / 21}>
                        <img ref={backImgRef} src={backImage} alt="Back" style={{ maxHeight: '300px' }} />
                      </ReactCrop>
                      <button onClick={handleConfirmBack} className="d-btn-green glow-btn-green" style={{ marginTop: '10px', padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
                        ✅ পিছনের ছবি কনফার্ম করুন
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>

          {/* Magic Filter Button */}
          {croppedFront && croppedBack && !isEnhanced && (
            <button 
              onClick={handleEnhance} 
              disabled={isProcessing}
              className="neon-3d-btn" 
              style={{ width: '100%', padding: '14px', fontSize: '16px', marginBottom: '20px', opacity: isProcessing ? 0.5 : 1 }}
            >
              {isProcessing ? '⏳ ম্যাজিক ফিল্টার প্রসেসিং হচ্ছে...' : '✨ Upscale & Enhance (Magic Filter)'}
            </button>
          )}

          {/* Save & Print Options */}
          {isEnhanced && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <button onClick={handleDownloadPNG} className="d-btn-green glow-btn-green" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>
                💾 Save as PNG
              </button>
              <button onClick={handleDownloadJPG} className="d-btn-purple glow-btn-purple" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>
                💾 Save as JPG
              </button>
              <button onClick={handleDownloadPDF} className="d-btn-orange glow-btn-orange" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>
                💾 Save as PDF
              </button>
              <button onClick={handlePrint} className="d-btn glow-btn" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>
                🖨️ Direct Print
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}