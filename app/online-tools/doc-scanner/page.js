'use client';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';

export default function DocScanner() {
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [finalUrl, setFinalUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Perspective Crop State
  const [pts, setPts] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const imgRef = useRef(null);

  // Filter State
  const [scanMode, setScanMode] = useState('magic'); // original, magic, gray, bw
  const [brightness, setBrightness] = useState(0); // -50 to 50
  const [contrast, setContrast] = useState(10); // -50 to 50
  const [sharpness, setSharpness] = useState(0); // 0 to 100
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270

  // Resolution State
  const [resType, setResType] = useState('high'); // high, medium, low, custom
  const [customSize, setCustomSize] = useState(500); // KB

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const w = img.width;
        const h = img.height;
        setOriginalImage(ev.target.result);
        setPts([
          { x: w * 0.1, y: h * 0.1 },
          { x: w * 0.9, y: h * 0.1 },
          { x: w * 0.9, y: h * 0.9 },
          { x: w * 0.1, y: h * 0.9 }
        ]);
        setCroppedImage(null);
        setFinalUrl(null);
        setRotation(0);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setDraggingIndex(index);
  };

  const handleMouseMove = (e) => {
    if (draggingIndex === null || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const scaleX = imgRef.current.naturalWidth / rect.width;
    const scaleY = imgRef.current.naturalHeight / rect.height;

    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;

    x = Math.max(0, Math.min(imgRef.current.naturalWidth, x));
    y = Math.max(0, Math.min(imgRef.current.naturalHeight, y));

    const newPts = [...pts];
    newPts[draggingIndex] = { x, y };
    setPts(newPts);
  };

  const handleMouseUp = () => setDraggingIndex(null);

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

  const handleConfirmCrop = () => {
    if (!imgRef.current || !pts) return;
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
    ctx.drawImage(imgRef.current, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(-1, -1); ctx.lineTo(outW + 1, outH + 1); ctx.lineTo(-1, outH + 1); ctx.closePath();
    ctx.clip();
    const m2 = getAffineTransformMatrix([p1, p3, p4], [{x:0,y:0}, {x:outW,y:outH}, {x:0,y:outH}]);
    ctx.transform(m2[0], m2[2], m2[1], m2[3], m2[4], m2[5]);
    ctx.drawImage(imgRef.current, 0, 0);
    ctx.restore();

    setCroppedImage(canvas.toDataURL('image/jpeg', 0.95));
  };

  const applyAutoEnhance = () => {
    setScanMode('magic');
    setBrightness(15);
    setContrast(25);
    setSharpness(40);
  };

  const applyScan = () => {
    if (!croppedImage) return;
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Rotation logic
      if (rotation === 90 || rotation === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      const ctx = canvas.getContext('2d');
      
      // 1. Draw with Rotation & Filters (Brightness, Contrast, Sharpness)
      // Sharpness এর জন্য আমরা contrast এর সাথে combine করছি যাতে text স্পষ্ট হয়
      const sharpContrast = contrast + (sharpness * 0.3);
      ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + sharpContrast}%)`;
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();
      ctx.filter = 'none';

      // 2. Apply Scan Mode
      if (scanMode !== 'original') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          if (scanMode === 'magic') {
            const factor = 1.3;
            r = ((r - 128) * factor) + 128;
            g = ((g - 128) * factor) + 128;
            b = ((b - 128) * factor) + 128;
            if (r > 170 && g > 170 && b > 170) {
              r = 255; g = 255; b = 255;
            }
          } else if (scanMode === 'gray') {
            let avg = (r + g + b) / 3;
            r = g = b = avg;
          } else if (scanMode === 'bw') {
            let avg = (r + g + b) / 3;
            avg = avg > 140 ? 255 : 0;
            r = g = b = avg;
          }

          data[i] = Math.max(0, Math.min(255, r));
          data[i + 1] = Math.max(0, Math.min(255, g));
          data[i + 2] = Math.max(0, Math.min(255, b));
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // 3. Resolution & Custom Size Logic
      let quality = 0.9;
      if (resType === 'medium') quality = 0.6;
      else if (resType === 'low') quality = 0.4;
      
      let dataUrl = canvas.toDataURL('image/jpeg', quality);

      if (resType === 'custom') {
        const targetKB = customSize;
        let attempts = 0;
        let blobSize = 0;
        do {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          const base64 = dataUrl.split(',')[1];
          const binaryString = atob(base64);
          blobSize = binaryString.length;
          
          if (blobSize / 1024 > targetKB && quality > 0.1) {
            quality -= 0.1;
          } else {
            break;
          }
          attempts++;
        } while (attempts < 5);
      }

      setFinalUrl(dataUrl);
      setLoading(false);
    };
    img.src = croppedImage;
  };

  const downloadPdf = () => {
    if (!finalUrl) return;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(finalUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(finalUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('scanned-document.pdf');
  };

  const handlePrint = () => {
    if (!finalUrl) return;
    const win = window.open('', '_blank');
    win.document.write(`<img src="${finalUrl}" style="width:100%;" onload="window.print();">`);
  };

  const clearAll = () => {
    setOriginalImage(null);
    setCroppedImage(null);
    setFinalUrl(null);
    setScanMode('magic');
    setBrightness(0);
    setContrast(10);
    setSharpness(0);
    setRotation(0);
    setResType('high');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}
         onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>📷 A4 Document Scanner Pro</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি সোজা করুন, স্ক্যান করুন, সাইজ কমানো সহ সব কাজ এক জায়গায়।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {!originalImage && (
            <div style={{ border: '2px dashed rgba(45,206,137,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={onSelectFile} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          )}

          {/* Step 1: Crop & Straighten */}
          {originalImage && !croppedImage && (
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>৪টি বিন্দু টেনে কাগজের ঠিক কোণায় বসান</p>
              <div style={{ position: 'relative', display: 'inline-block', touchAction: 'none', maxWidth: '100%' }}>
                <img ref={imgRef} src={originalImage} alt="Source" style={{ maxWidth: '100%', maxHeight: '400px', pointerEvents: 'none', userSelect: 'none' }} />
                {pts && (
                  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <polygon points={`${pts[0].x},${pts[0].y} ${pts[1].x},${pts[1].y} ${pts[2].x},${pts[2].y} ${pts[3].x},${pts[3].y}`} fill="rgba(45,206,137,0.2)" stroke="#2dce89" strokeWidth="2" />
                  </svg>
                )}
                {pts && pts.map((pt, i) => {
                  const rect = imgRef.current ? imgRef.current.getBoundingClientRect() : { width: 400, height: 400 };
                  const scaleX = imgRef.current ? imgRef.current.naturalWidth / rect.width : 1;
                  const scaleY = imgRef.current ? imgRef.current.naturalHeight / rect.height : 1;
                  const dispX = pt.x / scaleX;
                  const dispY = pt.y / scaleY;
                  return (
                    <div key={i} onMouseDown={(e) => handleMouseDown(e, i)} style={{ position: 'absolute', left: dispX - 12, top: dispY - 12, width: 24, height: 24, borderRadius: '50%', background: '#2dce89', border: '2px solid white', cursor: 'pointer', boxShadow: '0 0 10px rgba(45,206,137,0.8)', touchAction: 'none' }} />
                  );
                })}
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button onClick={() => setOriginalImage(null)} className="d-btn-orange" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>বাতিল</button>
                <button onClick={handleConfirmCrop} className="d-btn-green glow-btn-green" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>✂️ Crop & Straighten</button>
              </div>
            </div>
          )}

          {/* Step 2: Adjust Filters */}
          {croppedImage && !finalUrl && (
            <div>
              <div style={{ marginBottom: '20px', background: 'white', padding: '10px', borderRadius: '8px' }}>
                <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%', maxHeight: '300px', transform: `rotate(${rotation}deg)` }} />
              </div>

              {/* Scan Modes & Auto Enhance */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { key: 'original', label: 'Original' },
                  { key: 'magic', label: 'Magic Scan' },
                  { key: 'gray', label: 'Grayscale' },
                  { key: 'bw', label: 'B&W' }
                ].map(m => (
                  <button key={m.key} onClick={() => setScanMode(m.key)} className={scanMode === m.key ? 'd-btn glow-btn' : 'd-btn-outline'} style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}>{m.label}</button>
                ))}
                <button onClick={applyAutoEnhance} className="d-btn-purple glow-btn-purple" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}>✨ Auto Enhance</button>
              </div>

              {/* Sliders */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Brightness: {brightness}</label>
                  <input type="range" min="-50" max="50" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Contrast: {contrast}</label>
                  <input type="range" min="-50" max="50" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Text Sharpen: {sharpness}</label>
                  <input type="range" min="0" max="100" value={sharpness} onChange={(e) => setSharpness(Number(e.target.value))} style={{ width: '100%', accentColor: '#4e6ef2' }} />
                </div>
              </div>

              {/* Rotate & Resolution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <button onClick={() => setRotation((rotation + 90) % 360)} className="d-btn-outline" style={{ width: '100%', padding: '10px', border: 'none', cursor: 'pointer' }}>🔄 Rotate 90°</button>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Output Size:</label>
                  <select value={resType} onChange={(e) => setResType(e.target.value)} className="d-input" style={{ padding: '8px' }}>
                    <option value="high" style={{background: '#1a1c2e'}}>High Quality</option>
                    <option value="medium" style={{background: '#1a1c2e'}}>Medium Size</option>
                    <option value="low" style={{background: '#1a1c2e'}}>Low Size</option>
                    <option value="custom" style={{background: '#1a1c2e'}}>Custom Size (KB)</option>
                  </select>
                </div>
              </div>

              {resType === 'custom' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Target Size (KB):</label>
                  <input type="number" value={customSize} onChange={(e) => setCustomSize(Number(e.target.value))} className="d-input" style={{ maxWidth: '150px', margin: '0 auto', textAlign: 'center', padding: '8px' }} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button onClick={() => { setCroppedImage(null); setOriginalImage(null); }} className="d-btn-outline" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>🔄 নতুন ছবি</button>
                <button onClick={applyScan} disabled={loading} className="d-btn-green glow-btn-green" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
                  {loading ? '⏳ প্রসেসিং...' : '✨ Apply Scan'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Final Result & Save */}
          {finalUrl && (
            <div>
              <div style={{ marginBottom: '20px', background: 'white', padding: '10px', borderRadius: '8px' }}>
                <img src={finalUrl} alt="Final" style={{ maxWidth: '100%', maxHeight: '400px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                <a href={finalUrl} download="scanned-doc.jpg" className="d-btn-green glow-btn-green" style={{ padding: '12px', textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>💾 Save JPG</a>
                <a href={finalUrl} download="scanned-doc.png" className="d-btn-purple glow-btn-purple" style={{ padding: '12px', textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>💾 Save PNG</a>
                <button onClick={downloadPdf} className="d-btn-orange glow-btn-orange" style={{ padding: '12px', border: 'none', cursor: 'pointer', fontSize: '15px' }}>📄 Save PDF</button>
                <button onClick={handlePrint} className="d-btn glow-btn" style={{ padding: '12px', border: 'none', cursor: 'pointer', fontSize: '15px' }}>🖨️ Print</button>
              </div>

              <button onClick={clearAll} className="d-btn-outline" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>🔄 নতুন ডকুমেন্ট স্ক্যান করুন</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}