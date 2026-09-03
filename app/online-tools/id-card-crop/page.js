'use client';
import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import jsPDF from 'jspdf';

export default function IdCardCropToPDF() {
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
      
      if (deg === 90 || deg === -90) {
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
      setFrontCrop(null);
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
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0, 0, canvas.width, canvas.height
      );
      
      return canvas.toDataURL('image/jpeg', 0.95);
    }
  };

  const handleConfirmFront = async () => {
    if (frontCrop) {
      const croppedUrl = await makeClientCrop(frontCrop, frontImgRef.current);
      if (croppedUrl) setCroppedFront(croppedUrl);
    }
  };

  const handleConfirmBack = async () => {
    if (backCrop) {
      const croppedUrl = await makeClientCrop(backCrop, backImgRef.current);
      if (croppedUrl) setCroppedBack(croppedUrl);
    }
  };

  // Magic Filter: Upscale & Enhance
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

  // A4 Canvas Generate (Smart Layout - ছবি কাটা যাবে না)
  const buildA4Canvas = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1240;
    canvas.height = 1754;
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

    const maxWidth = 700;
    const maxHeight = 600;
    const gap = 150;
    let currentY = 150;

    const drawImage = (img) => {
      let w = img.width;
      let h = img.height;
      
      if (w > maxWidth) {
        h = (maxWidth / w) * h;
        w = maxWidth;
      }
      if (h > maxHeight) {
        w = (maxHeight / h) * w;
        h = maxHeight;
      }
      
      const x = (canvas.width - w) / 2;
      ctx.drawImage(img, x, currentY, w, h);
      currentY += h + gap;
    };

    if (frontImg) drawImage(frontImg);
    if (backImg) drawImage(backImg);
    
    return canvas;
  };

  const handleDownloadA4PNG = async () => {
    const canvas = await buildA4Canvas();
    const link = document.createElement('a');
    link.download = 'id-card-a4.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadA4JPG = async () => {
    const canvas = await buildA4Canvas();
    const link = document.createElement('a');
    link.download = 'id-card-a4.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const handleDownloadA4PDF = async () => {
    const canvas = await buildA4Canvas();
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    pdf.save('id-card-a4.pdf');
  };

  const handleDirectA4Print = async () => {
    const canvas = await buildA4Canvas();
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    win.document.write(`<img src="${dataUrl}" style="width:100%;" onload="window.print();">`);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🆔 ID Card to A4 (Free Crop)</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি সোজা করতে ঘোরান, ক্রপ করুন, ম্যাজিক ফিল্টার দিন, এবং A4 পেজে সেভ বা প্রিন্ট করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            
            {/* Front Side */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>সামনের ছবি (Front)</label>
              {!frontImage ? (
                <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
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

                      <ReactCrop crop={frontCrop} onChange={(c) => setFrontCrop(c)}>
                        <img ref={frontImgRef} src={frontImage} alt="Front" style={{ maxHeight: '300px' }} />
                      </ReactCrop>
                      <button onClick={handleConfirmFront} className="d-btn glow-btn" style={{ marginTop: '10px', padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
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
                <div style={{ border: '2px dashed rgba(168,85,247,0.5)', borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
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

                      <ReactCrop crop={backCrop} onChange={(c) => setBackCrop(c)}>
                        <img ref={backImgRef} src={backImage} alt="Back" style={{ maxHeight: '300px' }} />
                      </ReactCrop>
                      <button onClick={handleConfirmBack} className="d-btn-purple glow-btn-purple" style={{ marginTop: '10px', padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
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

          {/* A4 Save & Print Options */}
          {isEnhanced && (
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
      </div>
    </div>
  );
}