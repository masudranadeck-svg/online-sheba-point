'use client';
import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function AdvanceImageCrop() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [aspect, setAspect] = useState(undefined); // undefined = Free crop
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const imgRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setCroppedImageUrl(null);
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const makeClientCrop = async () => {
    if (imgRef.current && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      
      canvas.width = Math.ceil(crop.width * scaleX);
      canvas.height = Math.ceil(crop.height * scaleY);
      
      const ctx = canvas.getContext('2d');
      
      // Apply transformations (Flip)
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Apply Rotation (simple 90 degree rotation for output)
      if (rotation !== 0) {
        const rad = rotation * Math.PI / 180;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.height;
        tempCanvas.height = canvas.width;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
        tempCtx.rotate(rad);
        tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
        canvas.width = tempCanvas.width;
        canvas.height = tempCanvas.height;
        ctx.drawImage(tempCanvas, 0, 0);
      }

      setCroppedImageUrl(canvas.toDataURL('image/png'));
    }
  };

  const handleDownload = () => {
    if (!croppedImageUrl) return;
    const link = document.createElement('a');
    link.href = croppedImageUrl;
    link.download = 'cropped-image.png';
    link.click();
  };

  const resetAll = () => {
    setImageSrc(null);
    setCroppedImageUrl(null);
    setCrop(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>✂️ Advance Image Crop</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>ছবি ক্রপ করুন, সাইজ ঠিক করুন, ঘোরান এবং ডাউনলোড করুন।</p>
        
        <div className="glass-3d" style={{ padding: '30px' }}>
          
          {!imageSrc ? (
            <div style={{ border: '2px dashed rgba(78,110,242,0.5)', borderRadius: '12px', padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
              <input type="file" accept="image/*" onChange={onSelectFile} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }} />
            </div>
          ) : (
            <>
              {/* Controls */}
              <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                <select 
                  onChange={(e) => {
                    const val = e.target.value;
                    setAspect(val === 'free' ? undefined : Number(val));
                    setCrop(null); 
                  }} 
                  className="d-input" 
                  style={{ maxWidth: '150px', margin: 0 }}
                >
                  <option value="free" style={{background: '#1a1c2e'}}>Free Aspect</option>
                  <option value="1" style={{background: '#1a1c2e'}}>1:1 (Square)</option>
                  <option value="1.7777" style={{background: '#1a1c2e'}}>16:9 (YouTube)</option>
                  <option value="1.333" style={{background: '#1a1c2e'}}>4:3 (Standard)</option>
                  <option value="0.5625" style={{background: '#1a1c2e'}}>9:16 (Story/TikTok)</option>
                </select>

                <button onClick={() => setRotation(rotation - 90)} className="d-btn-outline" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}>⟲ Rotate Left</button>
                <button onClick={() => setRotation(rotation + 90)} className="d-btn-outline" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}>⟳ Rotate Right</button>
                <button onClick={() => setFlipH(!flipH)} className="d-btn-outline" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}>↔️ Flip H</button>
                <button onClick={() => setFlipV(!flipV)} className="d-btn-outline" style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}>↕️ Flip V</button>
              </div>

              {/* Cropper Area */}
              <div style={{ background: '#121212', padding: '20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <ReactCrop 
                  crop={crop} 
                  onChange={(c) => setCrop(c)} 
                  aspect={aspect}
                >
                  <img 
                    ref={imgRef} 
                    src={imageSrc} 
                    alt="Source" 
                    style={{ 
                      maxHeight: '400px', 
                      transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})` 
                    }} 
                  />
                </ReactCrop>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={makeClientCrop} className="d-btn-green glow-btn-green" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                  ✅ Crop Image
                </button>
                <button onClick={resetAll} className="d-btn-orange" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                  🔄 New Image
                </button>
              </div>
            </>
          )}

          {/* Cropped Preview */}
          {croppedImageUrl && (
            <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>Cropped Result:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <img src={croppedImageUrl} alt="Cropped" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.2)' }} />
                <button onClick={handleDownload} className="d-btn glow-btn" style={{ padding: '12px 30px', border: 'none', cursor: 'pointer' }}>
                  💾 Download PNG
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}