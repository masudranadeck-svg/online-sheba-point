'use client';
import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import jsPDF from 'jspdf';

export default function JointPhotoMaker() {
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [crop1, setCrop1] = useState(null);
  const [crop2, setCrop2] = useState(null);
  const [cropped1, setCropped1] = useState(null);
  const [cropped2, setCropped2] = useState(null);

  const [filters1, setFilters1] = useState({ brightness: 100, contrast: 100, saturation: 100, rotation: 0 });
  const [filters2, setFilters2] = useState({ brightness: 100, contrast: 100, saturation: 100, rotation: 0 });

  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  const onSelectFile = (e, setter) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setter(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const makeClientCrop = async (crop, image) => {
    if (image && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = Math.ceil(crop.width * scaleX);
      canvas.height = Math.ceil(crop.height * scaleY);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', 0.95);
    }
  };

  const handleConfirm1 = async () => {
    if (crop1) { const url = await makeClientCrop(crop1, img1Ref.current); if (url) setCropped1(url); }
  };
  const handleConfirm2 = async () => {
    if (crop2) { const url = await makeClientCrop(crop2, img2Ref.current); if (url) setCropped2(url); }
  };

  // One-Click Auto Remove Background (Smart Flood Fill)
  const autoRemoveBg = (dataUrl, setter) => {
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;
      
      const tolerance = 40; // Color match tolerance
      
      // Get target color from the top-left corner
      const targetR = data[0];
      const targetG = data[1];
      const targetB = data[2];

      const visited = new Uint8Array(w * h);
      const stack = [];

      // Push all border pixels to start scanning from edges
      for (let x = 0; x < w; x++) { stack.push([x, 0]); stack.push([x, h - 1]); }
      for (let y = 0; y < h; y++) { stack.push([0, y]); stack.push([w - 1, y]); }

      while (stack.length > 0) {
        const [x, y] = stack.pop();
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        
        const idx = y * w + x;
        if (visited[idx]) continue;

        const pIdx = idx * 4;
        const r = data[pIdx];
        const g = data[pIdx + 1];
        const b = data[pIdx + 2];

        if (Math.abs(r - targetR) <= tolerance && Math.abs(g - targetG) <= tolerance && Math.abs(b - targetB) <= tolerance) {
          // Make it pure white
          data[pIdx] = 255;
          data[pIdx + 1] = 255;
          data[pIdx + 2] = 255;
          data[pIdx + 3] = 255;
          
          visited[idx] = 1;
          stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        } else {
          visited[idx] = 1; // Stop spreading when hitting a different color (the person)
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setter(canvas.toDataURL('image/jpeg', 0.95));
      setIsProcessing(false);
    };
    img.src = dataUrl;
  };

  const applyFilterAndDraw = (ctx, img, filters) => {
    ctx.save();
    ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;
    
    if (filters.rotation !== 0) {
      ctx.translate(img.width / 2, img.height / 2);
      ctx.rotate(filters.rotation * Math.PI / 180);
      ctx.translate(-img.width / 2, -img.height / 2);
    }
    
    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.restore();
  };

  const buildJointCanvas = async () => {
    const i1 = new Image();
    i1.src = cropped1;
    await new Promise(r => i1.onload = r);

    const i2 = new Image();
    i2.src = cropped2;
    await new Promise(r => i2.onload = r);

    const w = i1.width + i2.width + 20;
    const h = Math.max(i1.height, i2.height);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    applyFilterAndDraw(ctx, i1, filters1);
    
    ctx.save();
    ctx.translate(i1.width + 20, 0);
    applyFilterAndDraw(ctx, i2, filters2);
    ctx.restore();

    return canvas;
  };

  const handleDownloadJPG = async () => {
    const canvas = await buildJointCanvas();
    const link = document.createElement('a');
    link.download = 'joint-photo.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const buildA4Canvas = async () => {
    const jointCanvas = await buildJointCanvas();
    const jointImg = new Image();
    jointImg.src = jointCanvas.toDataURL('image/png');
    await new Promise(r => jointImg.onload = r);

    const a4Canvas = document.createElement('canvas');
    a4Canvas.width = 1240; 
    a4Canvas.height = 1754;
    const ctx = a4Canvas.getContext('2d');
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, a4Canvas.width, a4Canvas.height);

    const photoW = (a4Canvas.width - 100 - (cols - 1) * 20) / cols;
    const photoH = photoW * (jointImg.height / jointImg.width);

    let x = 50;
    let y = 50;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ctx.drawImage(jointImg, x, y, photoW, photoH);
        x += photoW + 20;
      }
      x = 50;
      y += photoH + 20;
    }

    return a4Canvas;
  };

  const handleDownloadA4PDF = async () => {
    const canvas = await buildA4Canvas();
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    pdf.save('joint-photo-a4.pdf');
  };

  const handleDirectPrint = async () => {
    const canvas = await buildA4Canvas();
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    win.document.write(`<img src="${dataUrl}" style="width:100%;" onload="window.print();">`);
  };

  const Slider = ({ label, value, target }) => (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
        <span>{label}</span>
        <span>{value}%</span>
      </label>
      <input 
        type="range" min="0" max="200" value={value} 
        onChange={(e) => {
          const val = Number(e.target.value);
          if (target === '1') setFilters1({ ...filters1, [label.toLowerCase()]: val });
          else setFilters2({ ...filters2, [label.toLowerCase()]: val });
        }} 
        style={{ width: '100%', accentColor: target === '1' ? '#4e6ef2' : '#a855f7' }}
      />
    </div>
  );

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>👥 Professional Joint Photo Maker</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি ক্রপ করুন, কালার ঠিক করুন, ব্যাকগ্রাউন্ড সাদা করুন এবং A4 পেজে প্রিন্ট করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            
            {/* First Image Section */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600, borderBottom: '2px solid #4e6ef2', paddingBottom: '5px' }}>1st Photo</label>
              {!img1 ? (
                <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                  <input type="file" accept="image/*" onChange={(e) => onSelectFile(e, setImg1)} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                </div>
              ) : (
                <>
                  {cropped1 ? (
                    <>
                      <img src={cropped1} alt="Cropped 1" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px', filter: `brightness(${filters1.brightness}%) contrast(${filters1.contrast}%) saturate(${filters1.saturation}%)`, transform: `rotate(${filters1.rotation}deg)` }} />
                      <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                        <button 
                          onClick={() => autoRemoveBg(cropped1, setCropped1)} 
                          disabled={isProcessing}
                          className="d-btn-purple glow-btn-purple" 
                          style={{ width: '100%', padding: '8px', fontSize: '12px', border: 'none', cursor: 'pointer', marginBottom: '15px', opacity: isProcessing ? 0.5 : 1 }}
                        >
                          {isProcessing ? '⏳ প্রসেসিং...' : '🪄 AI Auto Remove BG (White)'}
                        </button>
                        <Slider label="brightness" value={filters1.brightness} target="1" />
                        <Slider label="contrast" value={filters1.contrast} target="1" />
                        <Slider label="saturation" value={filters1.saturation} target="1" />
                        <button onClick={() => setFilters1({ ...filters1, rotation: filters1.rotation + 90 })} className="d-btn-outline" style={{ width: '100%', padding: '5px', fontSize: '12px', border: 'none', cursor: 'pointer' }}>🔄 Rotate Photo</button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <ReactCrop crop={crop1} onChange={(c) => setCrop1(c)} aspect={3 / 4}>
                        <img ref={img1Ref} src={img1} alt="Img 1" style={{ maxHeight: '250px' }} />
                      </ReactCrop>
                      <button onClick={handleConfirm1} className="d-btn glow-btn" style={{ marginTop: '10px', padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px', width: '100%' }}>✅ Crop Confirm</button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Second Image Section */}
            <div>
              <label style={{ display: 'block', color: 'white', marginBottom: '10px', fontWeight: 600, borderBottom: '2px solid #a855f7', paddingBottom: '5px' }}>2nd Photo</label>
              {!img2 ? (
                <div style={{ border: '2px dashed rgba(168,85,247,0.5)', borderRadius: '12px', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                  <input type="file" accept="image/*" onChange={(e) => onSelectFile(e, setImg2)} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }} />
                </div>
              ) : (
                <>
                  {cropped2 ? (
                    <>
                      <img src={cropped2} alt="Cropped 2" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px', filter: `brightness(${filters2.brightness}%) contrast(${filters2.contrast}%) saturate(${filters2.saturation}%)`, transform: `rotate(${filters2.rotation}deg)` }} />
                      <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                        <button 
                          onClick={() => autoRemoveBg(cropped2, setCropped2)} 
                          disabled={isProcessing}
                          className="d-btn-purple glow-btn-purple" 
                          style={{ width: '100%', padding: '8px', fontSize: '12px', border: 'none', cursor: 'pointer', marginBottom: '15px', opacity: isProcessing ? 0.5 : 1 }}
                        >
                          {isProcessing ? '⏳ প্রসেসিং...' : '🪄 AI Auto Remove BG (White)'}
                        </button>
                        <Slider label="brightness" value={filters2.brightness} target="2" />
                        <Slider label="contrast" value={filters2.contrast} target="2" />
                        <Slider label="saturation" value={filters2.saturation} target="2" />
                        <button onClick={() => setFilters2({ ...filters2, rotation: filters2.rotation + 90 })} className="d-btn-outline" style={{ width: '100%', padding: '5px', fontSize: '12px', border: 'none', cursor: 'pointer' }}>🔄 Rotate Photo</button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <ReactCrop crop={crop2} onChange={(c) => setCrop2(c)} aspect={3 / 4}>
                        <img ref={img2Ref} src={img2} alt="Img 2" style={{ maxHeight: '250px' }} />
                      </ReactCrop>
                      <button onClick={handleConfirm2} className="d-btn-purple glow-btn-purple" style={{ marginTop: '10px', padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '12px', width: '100%' }}>✅ Crop Confirm</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* A4 Print Layout Settings */}
          {cropped1 && cropped2 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>📄 A4 PRINT LAYOUT (ROWS & COLS)</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Rows: </label>
                  <input type="number" min="1" max="5" value={rows} onChange={(e) => setRows(Number(e.target.value))} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #444', borderRadius: '5px', padding: '5px', width: '60px', textAlign: 'center' }} />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Cols: </label>
                  <input type="number" min="1" max="5" value={cols} onChange={(e) => setCols(Number(e.target.value))} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #444', borderRadius: '5px', padding: '5px', width: '60px', textAlign: 'center' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <button onClick={handleDownloadJPG} className="d-btn-green glow-btn-green" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>💾 Save Single JPG</button>
                <button onClick={handleDownloadA4PDF} className="d-btn-orange glow-btn-orange" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>💾 Save A4 PDF</button>
                <button onClick={handleDirectPrint} className="d-btn glow-btn" style={{ padding: '12px', border: 'none', cursor: 'pointer' }}>🖨️ Direct Print</button>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '15px' }}>💡 প্রিন্ট করার সময় প্রিন্টার ডায়ালগ থেকে "Actual Size" সিলেক্ট করবেন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}