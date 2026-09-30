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

  // A4 Canvas Generate (Perfectly Centered - No Cut Off)
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
        // 1.6 inch x 2 inch at 300 DPI = 480px x 600px
        const photoW = 480;
        const photoH = 600;
        const borderW = 20; // Thin white border around photo
        
        const blockW = photoW + (2 * borderW); // 520
        const blockH = photoH + (2 * borderW); // 640
        
        const cols = 4; // 4 photos per row
        const rows = 5; // 5 rows total = 20 photos
        const gapX = 30; // Horizontal gap
        const gapY = 30; // Vertical gap
        
        // Calculate Total Grid Width & Height to perfectly center it
        const totalGridW = (cols * blockW) + ((cols - 1) * gapX);
        const totalGridH = (rows * blockH) + ((rows - 1) * gapY);
        
        const startX = (canvas.width - totalGridW) / 2; // Centered horizontally
        let startY = (canvas.height - totalGridH) / 2;   // Centered vertically (No top extra margin)
        
        let x = startX;
        let y = startY;
        
        for (let i = 0; i < 20; i++) {
          // Draw White Border Background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(x, y, blockW, blockH);
          
          // Draw thin border line
          ctx.strokeStyle = '#E0E0E0';
          ctx.lineWidth = 2;
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

  // AETHER Corporate UI (Pure Inline CSS)
  const styles = {
    container: { background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope', sans-serif", minHeight: '100vh', overflowX: 'hidden' },
    wrapper: { maxWidth: '1000px', margin: '0 auto', padding: '96px 24px 64px 24px' },
    header: { textAlign: 'center', marginBottom: '48px' },
    eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' },
    title: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', lineHeight: '1', margin: '0', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.025em' },
    card: { position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px', textAlign: 'center' },
    corner: (pos) => ({ position: 'absolute', width: '14px', height: '14px', borderColor: 'var(--accent)', ...pos }),
    btnPrimary: { display: 'inline-block', padding: '14px 28px', background: 'var(--accent)', color: '#0a0a0b', border: 'none', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)', margin: '8px' },
    btnGhost: { display: 'inline-block', padding: '14px 28px', background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border-bright)', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)', margin: '8px' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.eyebrow}>
            <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }}></span>
            03 / Tools
          </div>
          <h1 style={styles.title}>Passport Photo Maker.</h1>
          <p style={{ color: 'var(--fg-dim)', marginTop: '16px' }}>1.6x2 inch size. A4 layout with 20 copies.</p>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          <div style={styles.corner({top: '8px', left: '8px', borderTop: '1px solid', borderLeft: '1px solid'})}></div>
          <div style={styles.corner({top: '8px', right: '8px', borderTop: '1px solid', borderRight: '1px solid'})}></div>
          <div style={styles.corner({bottom: '8px', left: '8px', borderBottom: '1px solid', borderLeft: '1px solid'})}></div>
          <div style={styles.corner({bottom: '8px', right: '8px', borderBottom: '1px solid', borderRight: '1px solid'})}></div>

          {!imageSrc ? (
            <div style={{ border: '2px dashed var(--border-bright)', padding: '48px', borderRadius: '8px' }}>
              <input type="file" accept="image/*" onChange={onSelectFile} style={{ color: 'var(--fg-muted)' }} />
            </div>
          ) : (
            <>
              {!croppedImage ? (
                <div>
                  <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'inline-block' }}>
                    <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={4 / 5}>
                      <img ref={imgRef} src={imageSrc} alt="Source" style={{ maxHeight: '400px' }} />
                    </ReactCrop>
                  </div>
                  <div>
                    <button onClick={() => setImageSrc(null)} style={styles.btnGhost}>Cancel</button>
                    <button onClick={handleConfirmCrop} style={styles.btnPrimary}>Crop Confirm →</button>
                  </div>
                </div>
              ) : (
                <div>
                  <img src={isEnhanced && finalImage ? finalImage : croppedImage} alt="Cropped" style={{ maxWidth: '200px', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--border)' }} />
                  
                  {!isEnhanced ? (
                    <>
                      <button onClick={handleEnhance} disabled={isProcessing} style={{ ...styles.btnPrimary, opacity: isProcessing ? 0.5 : 1, width: '100%' }}>
                        {isProcessing ? 'Processing...' : 'Upscale & Enhance'}
                      </button>
                      <button onClick={() => { setImageSrc(null); setCroppedImage(null); }} style={styles.btnGhost}>New Image</button>
                    </>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <button onClick={handleDownloadA4PDF} style={styles.btnPrimary}>Save A4 PDF</button>
                      <button onClick={handleDirectA4Print} style={styles.btnGhost}>Direct Print</button>
                      <button onClick={handleDownloadA4PNG} style={styles.btnGhost}>Save PNG</button>
                      <button onClick={handleDownloadA4JPG} style={styles.btnGhost}>Save JPG</button>
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