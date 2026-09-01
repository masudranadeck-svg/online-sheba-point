'use client';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import jsPDF from 'jspdf';

export default function IdCardCropToPDF() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
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

  const generateCroppedImage = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    try {
      const image = await createImage(imageSrc);
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
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const croppedImageDataURL = canvas.toDataURL('image/jpeg', 0.9);

      // ID Card size in mm (CR80 standard: 85.6mm x 54mm)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 54]
      });

      pdf.addImage(croppedImageDataURL, 'JPEG', 0, 0, 85.6, 54);
      pdf.save('id-card.pdf');
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>🆔 ID Card Crop to PDF</h1>
        
        {!imageSrc ? (
          <div className="glass-3d" style={{ padding: '40px', border: '2px dashed rgba(255,255,255,0.2)' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>আপনার আইডি কার্ডের ছবি আপলোড করুন</p>
            <input type="file" accept="image/*" onChange={onFileChange} className="d-input" style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', border: 'none' }} />
          </div>
        ) : (
          <div className="glass-3d" style={{ padding: '20px' }}>
            <div style={{ position: 'relative', width: '100%', height: '300px', background: '#222', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={85.6 / 54} // ID Card aspect ratio
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', display: 'block', marginBottom: '5px' }}>Zoom: {zoom.toFixed(1)}x</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#4e6ef2' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={generateCroppedImage} className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                📄 PDF ডাউনলোড করুন
              </button>
              <button onClick={() => setImageSrc(null)} className="d-btn-orange" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                ❌ বাতিল করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}