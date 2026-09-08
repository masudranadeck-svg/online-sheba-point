'use client';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';

export default function IdCardCropToPDF() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [croppedFront, setCroppedFront] = useState(null);
  const [croppedBack, setCroppedBack] = useState(null);
  
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [finalFront, setFinalFront] = useState(null);
  const [finalBack, setFinalBack] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Live Preview State
  const [livePreview, setLivePreview] = useState({ front: null, back: null });

  const [cardType, setCardType] = useState('id-landscape');
  
  const cardSizes = {
    'id-landscape': { w: 85.6, h: 54 },
    'id-portrait': { w: 54, h: 85.6 },
    'nid-landscape': { w: 85.6, h: 53.98 },
    'nid-portrait': { w: 53.98, h: 85.6 },
    'student-landscape': { w: 85.6, h: 54 },
    'student-portrait': { w: 54, h: 85.6 },
    'business-landscape': { w: 85, h: 55 },
    'business-portrait': { w: 55, h: 85 }
  };

  const frontImgRef = useRef(null);
  const backImgRef = useRef(null);

  const [frontPts, setFrontPts] = useState(null);
  const [backPts, setBackPts] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [activeTarget, setActiveTarget] = useState(null);

  const onSelectFile = (e, target) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const w = img.width;
          const h = img.height;
          const pts = [
            { x: w * 0.1, y: h * 0.1 },
            { x: w * 0.9, y: h * 0.1 },
            { x: w * 0.9, y: h * 0.9 },
            { x: w * 0.1, y: h * 0.9 }
          ];
          if (target === 'front') {
            setFrontImage(ev.target.result);
            setFrontPts(pts);
            setCroppedFront(null);
            setIsEnhanced(false);
            setFinalFront(null);
            setTimeout(() => generateLivePreview(target, pts, ev.target.result), 100);
          } else {
            setBackImage(ev.target.result);
            setBackPts(pts);
            setCroppedBack(null);
            setIsEnhanced(false);
            setFinalBack(null);
            setTimeout(() => generateLivePreview(target, pts, ev.target.result), 100);
          }
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleMouseDown = (e, index, target) => {
    e.preventDefault();
    setDraggingIndex(index);
    setActiveTarget(target);
  };

  const handleMouseMove = (e) => {
    if (draggingIndex === null || !activeTarget) return;
    const imgRef = activeTarget === 'front' ? frontImgRef.current : backImgRef.current;
    if (!imgRef) return;

    const rect = imgRef.getBoundingClientRect();
    const scaleX = imgRef.naturalWidth / rect.width;
    const scaleY = imgRef.naturalHeight / rect.height;

    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;

    x = Math.max(0, Math.min(imgRef.naturalWidth, x));
    y = Math.max(0, Math.min(imgRef.naturalHeight, y));

    const setPts = activeTarget === 'front' ? setFrontPts : setBackPts;
    const currentPts = activeTarget === 'front' ? frontPts : backPts;
    
    const newPts = [...currentPts];
    newPts[draggingIndex] = { x, y };
    setPts(newPts);

    // Update Live Preview while dragging
    generateLivePreview(activeTarget, newPts);
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
    setActiveTarget(null);
  };

  const getAffineTransformMatrix = (src, dst) => {
    const x1 = src[0].x, y1 = src[0].y;
    const x2 = src[1].x, y2 = src[1].y;
    const x3 = src[2].x, y3 = src[2].y;
    const u1 = dst[0].x, v1 = dst[0].y;
    const u2 = dst[1].x, v2 = dst[1].y;
    const u3 = dst[2].x, v3 = dst[2].y;

    const denom = (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
    const a = ((u1 - u3) * (y2 - y3) - (u2 - u3) * (y1 - y3)) / denom;
    const b = ((x1 - x3) * (u2 - u3) - (x2 - x3) * (u1 - u3)) / denom;
    const c = ((v1 - v3) * (y2 - y3) - (v2 - v3) * (y1 - y3)) / denom;
    const d = ((x1 - x3) * (v2 - v3) - (x2 - x3) * (v1 - v3)) / denom;
    const e = u3 - a * x3 - b * y3;
    const f = v3 - c * x3 - d * y3;

    return [a, b, c, d, e, f];
  };

  const dist = (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

  // Generate Live Preview (Fast, low-resolution render for preview)
  const generateLivePreview = (target, pts, imgSrc = null) => {
    const imgRef = target === 'front' ? frontImgRef.current : backImgRef.current;
    if (!imgRef || !pts) return;

    const p1 = pts[0], p2 = pts[1], p3 = pts[2], p4 = pts[3];
    const rawW = Math.max(50, Math.round(Math.max(dist(p1, p2), dist(p3, p4))));
    const rawH = Math.max(50, Math.round(Math.max(dist(p1, p4), dist(p2, p3))));

    const maxPreviewSize = 200;
    let scale = 1;
    if (rawW > rawH) scale = maxPreviewSize / rawW;
    else scale = maxPreviewSize / rawH;
    if (scale > 1) scale = 1;

    const outW = Math.round(rawW * scale);
    const outH = Math.round(rawH * scale);

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, outW, outH);

    const sP1 = { x: p1.x * scale, y: p1.y * scale };
    const sP2 = { x: p2.x * scale, y: p2.y * scale };
    const sP3 = { x: p3.x * scale, y: p3.y * scale };
    const sP4 = { x: p4.x * scale, y: p4.y * scale };

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-1, -1); ctx.lineTo(outW + 1, -1); ctx.lineTo(outW + 1, outH + 1); ctx.closePath();
    ctx.clip();
    const m1 = getAffineTransformMatrix([sP1, sP2, sP3], [{x:0,y:0}, {x:outW,y:0}, {x:outW,y:outH}]);
    ctx.transform(m1[0], m1[2], m1[1], m1[3], m1[4], m1[5]);
    ctx.drawImage(imgRef, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-1, -1); ctx.lineTo(outW + 1, outH + 1); ctx.lineTo(-1, outH + 1); ctx.closePath();
    ctx.clip();
    const m2 = getAffineTransformMatrix([sP1, sP3, sP4], [{x:0,y:0}, {x:outW,y:outH}, {x:0,y:outH}]);
    ctx.transform(m2[0], m2[2], m2[1], m2[3], m2[4], m2[5]);
    ctx.drawImage(imgRef, 0, 0);
    ctx.restore();

    setLivePreview(prev => ({ ...prev, [target]: canvas.toDataURL('image/jpeg', 0.8) }));
  };

  const handleConfirmCrop = (target) => {
    const imgRef = target === 'front' ? frontImgRef.current : backImgRef.current;
    const pts = target === 'front' ? frontPts : backPts;

    if (!imgRef || !pts) return;

    const p1 = pts[0], p2 = pts[1], p3 = pts[2], p4 = pts[3];
    const outW = Math.round(Math.max(dist(p1, p2), dist(p3, p4)));
    const outH = Math.round(Math.max(dist(p1, p4), dist(p2, p3)));

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, outW, outH);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-1, -1); ctx.lineTo(outW + 1, -1); ctx.lineTo(outW + 1, outH + 1); ctx.closePath();
    ctx.clip();
    const m1 = getAffineTransformMatrix([p1, p2, p3], [{x:0,y:0}, {x:outW,y:0}, {x:outW,y:outH}]);
    ctx.transform(m1[0], m1[2], m1[1], m1[3], m1[4], m1[5]);
    ctx.drawImage(imgRef, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-1, -1); ctx.lineTo(outW + 1, outH + 1); ctx.lineTo(-1, outH + 1); ctx.closePath();
    ctx.clip();
    const m2 = getAffineTransformMatrix([p1, p3, p4], [{x:0,y:0}, {x:outW,y:outH}, {x:0,y:outH}]);
    ctx.transform(m2[0], m2[2], m2[1], m2[3], m2[4], m2[5]);
    ctx.drawImage(imgRef, 0, 0);
    ctx.restore();

    const dataURL = canvas.toDataURL('image/jpeg', 0.95);
    if (target === 'front') setCroppedFront(dataURL);
    else setCroppedBack(dataURL);
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

  const buildA4Canvas = async () => {
    const dpi = 150; 
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

    const selectedSize = cardSizes[cardType];
    const cardW_px = (selectedSize.w / 25.4) * dpi;
    const cardH_px = (selectedSize.h / 25.4) * dpi;
    const gap_px = 20;

    const x = (canvas.width - cardW_px) / 2;
    let y = (canvas.height - (cardH_px * 2 + gap_px)) / 2;

    const frontImg = finalFront ? await loadImage(finalFront) : null;
    const backImg = finalBack ? await loadImage(finalBack) : null;

    const drawCard = (img) => {
      if (!img) return;

      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cardW_px, cardH_px);

      const imgRatio = img.width / img.height;
      const cardRatio = cardW_px / cardH_px;
      let dw, dh, dx, dy;

      if (imgRatio > cardRatio) {
        dh = cardH_px; dw = dh * imgRatio; dx = x - (dw - cardW_px) / 2; dy = y;
      } else {
        dw = cardW_px; dh = dw / imgRatio; dx = x; dy = y - (dh - cardH_px) / 2;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, cardW_px, cardH_px);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();

      y += cardH_px + gap_px;
    };

    if (frontImg) drawCard(frontImg);
    if (backImg) drawCard(backImg);
    
    return canvas;
  };

  const handleDownloadA4PDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const selectedSize = cardSizes[cardType];
    const gap = 5; 
    const x = (210 - selectedSize.w) / 2;
    const y = (297 - (selectedSize.h * 2 + gap)) / 2;

    const frontData = finalFront || croppedFront;
    const backData = finalBack || croppedBack;

    if (frontData) pdf.addImage(frontData, 'JPEG', x, y, selectedSize.w, selectedSize.h, undefined, 'FAST');
    if (backData) pdf.addImage(backData, 'JPEG', x, y + selectedSize.h + gap, selectedSize.w, selectedSize.h, undefined, 'FAST');
    
    pdf.save('id-card-exact-size.pdf');
  };

  const handleDirectA4Print = async () => {
    const canvas = await buildA4Canvas();
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    win.document.write(`<img src="${dataUrl}" style="width:100%;" onload="window.print();">`);
  };

  const renderCropper = (target) => {
    const imgSrc = target === 'front' ? frontImage : backImage;
    const pts = target === 'front' ? frontPts : backPts;
    const imgRef = target === 'front' ? frontImgRef : backImgRef;
    const cropped = target === 'front' ? croppedFront : croppedBack;

    if (!imgSrc) return null;

    if (cropped) {
      return (
        <div>
          <img src={isEnhanced && target === 'front' ? finalFront : isEnhanced && target === 'back' ? finalBack : cropped} alt="Cropped" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.2)' }} />
          {!isEnhanced && (
            <button onClick={() => target === 'front' ? setCroppedFront(null) : setCroppedBack(null)} className="d-btn-orange" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
              পুনরায় করুন
            </button>
          )}
        </div>
      );
    }

    return (
      <div style={{ position: 'relative', display: 'inline-block', touchAction: 'none' }}
           onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
      >
        <img ref={imgRef} src={imgSrc} alt="Source" style={{ maxWidth: '300px', maxHeight: '300px', pointerEvents: 'none', userSelect: 'none' }} />
        {pts && (
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <polygon points={`${pts[0].x},${pts[0].y} ${pts[1].x},${pts[1].y} ${pts[2].x},${pts[2].y} ${pts[3].x},${pts[3].y}`} fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="2" />
            <line x1={pts[0].x} y1={pts[0].y} x2={pts[2].x} y2={pts[2].y} stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
            <line x1={pts[1].x} y1={pts[1].y} x2={pts[3].x} y2={pts[3].y} stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        )}
        {pts && pts.map((pt, i) => {
          const rect = imgRef.current ? imgRef.current.getBoundingClientRect() : { width: 300, height: 300 };
          const scaleX = imgRef.current ? imgRef.current.naturalWidth / rect.width : 1;
          const scaleY = imgRef.current ? imgRef.current.naturalHeight / rect.height : 1;
          const dispX = pt.x / scaleX;
          const dispY = pt.y / scaleY;

          return (
            <div
              key={i}
              onMouseDown={(e) => handleMouseDown(e, i, target)}
              style={{
                position: 'absolute', left: dispX - 12, top: dispY - 12,
                width: 24, height: 24, borderRadius: '50%',
                background: '#a855f7', border: '2px solid white',
                cursor: 'pointer', boxShadow: '0 0 10px rgba(168,85,247,0.8)',
                touchAction: 'none'
              }}
            />
          );
        })}

        {/* Live Preview Box */}
        <div style={{ marginTop: '15px', textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: '0 0 5px 0' }}>👁️ Live Preview (ডট টানলে এখানে দেখাবে):</p>
          <div style={{ width: '150px', height: '105px', background: '#fff', margin: '0 auto', borderRadius: '4px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
            {livePreview[target] ? (
              <img src={livePreview[target]} alt="Live Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : (
              <span style={{ color: '#888', fontSize: '12px' }}>Waiting...</span>
            )}
          </div>
        </div>

        <button onClick={() => handleConfirmCrop(target)} className={target === 'front' ? 'd-btn glow-btn' : 'd-btn-purple glow-btn-purple'} style={{ marginTop: '10px', padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px', width: '100%', display: 'block' }}>
          ✅ {target === 'front' ? 'সামনের' : 'পিছনের'} ছবি কনফার্ম করুন
        </button>
      </div>
    );
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}
         onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>🆔 ID Card to A4 (Exact Size Print)</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>৪টি বেগুনি বিন্দু টেনে কার্ডের ঠিক কোণায় বসান। নিচ থেকে কার্ডের ধরন সিলেক্ট করে প্রিন্ট করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>সামনের ছবি (Front)</label>
              {!frontImage ? (
                <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                  <input type="file" accept="image/*" onChange={(e) => onSelectFile(e, 'front')} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                </div>
              ) : renderCropper('front')}
            </div>

            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600 }}>পিছনের ছবি (Back)</label>
              {!backImage ? (
                <div style={{ border: '2px dashed rgba(168,85,247,0.5)', borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                  <input type="file" accept="image/*" onChange={(e) => onSelectFile(e, 'back')} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                </div>
              ) : renderCropper('back')}
            </div>
          </div>

          {croppedFront && croppedBack && !isEnhanced && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '600', display: 'block', marginBottom: '10px' }}>কার্ডের ধরন সিলেক্ট করুন:</label>
                <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="d-input" style={{ maxWidth: '300px', margin: '0 auto' }}>
                  <option value="id-landscape" style={{background: '#1a1c2e'}}>ID Card - Landscape (85.6x54mm)</option>
                  <option value="id-portrait" style={{background: '#1a1c2e'}}>ID Card - Portrait (54x85.6mm)</option>
                  <option value="nid-landscape" style={{background: '#1a1c2e'}}>NID Card - Landscape (85.6x53.98mm)</option>
                  <option value="nid-portrait" style={{background: '#1a1c2e'}}>NID Card - Portrait (53.98x85.6mm)</option>
                  <option value="student-landscape" style={{background: '#1a1c2e'}}>Student ID - Landscape (85.6x54mm)</option>
                  <option value="student-portrait" style={{background: '#1a1c2e'}}>Student ID - Portrait (54x85.6mm)</option>
                  <option value="business-landscape" style={{background: '#1a1c2e'}}>Business Card - Landscape (85x55mm)</option>
                  <option value="business-portrait" style={{background: '#1a1c2e'}}>Business Card - Portrait (55x85mm)</option>
                </select>
              </div>

              <button onClick={handleEnhance} disabled={isProcessing} className="neon-3d-btn" style={{ width: '100%', padding: '14px', fontSize: '16px', marginBottom: '20px', opacity: isProcessing ? 0.5 : 1 }}>
                {isProcessing ? '⏳ ম্যাজিক ফিল্টার প্রসেসিং হচ্ছে...' : '✨ Upscale & Enhance (Magic Filter)'}
              </button>
            </>
          )}

          {isEnhanced && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '600', display: 'block', marginBottom: '10px' }}>কার্ডের ধরন সিলেক্ট করুন:</label>
                <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="d-input" style={{ maxWidth: '300px', margin: '0 auto' }}>
                  <option value="id-landscape" style={{background: '#1a1c2e'}}>ID Card - Landscape (85.6x54mm)</option>
                  <option value="id-portrait" style={{background: '#1a1c2e'}}>ID Card - Portrait (54x85.6mm)</option>
                  <option value="nid-landscape" style={{background: '#1a1c2e'}}>NID Card - Landscape (85.6x53.98mm)</option>
                  <option value="nid-portrait" style={{background: '#1a1c2e'}}>NID Card - Portrait (53.98x85.6mm)</option>
                  <option value="student-landscape" style={{background: '#1a1c2e'}}>Student ID - Landscape (85.6x54mm)</option>
                  <option value="student-portrait" style={{background: '#1a1c2e'}}>Student ID - Portrait (54x85.6mm)</option>
                  <option value="business-landscape" style={{background: '#1a1c2e'}}>Business Card - Landscape (85x55mm)</option>
                  <option value="business-portrait" style={{background: '#1a1c2e'}}>Business Card - Portrait (55x85mm)</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <button onClick={handleDownloadA4PDF} className="d-btn-orange glow-btn-orange" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>💾 Save as A4 PDF</button>
                <button onClick={handleDirectA4Print} className="d-btn glow-btn" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>🖨️ Direct A4 Print</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}