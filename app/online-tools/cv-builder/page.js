'use client';
import { useState } from 'react';

export default function CVBuilder() {
  const [template, setTemplate] = useState('modern-dark');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [photo, setPhoto] = useState(null);
  
  const colors = [
    '#ffffff', '#f0f2f5', '#e8f5e9', '#e3f2fd', '#fff3e0', 
    '#fce4ec', '#f3e5f5', '#e0f7fa', '#fff8e1', '#efebe9'
  ];

  const themes = {
    'modern-dark': { name: 'Modern Dark', headerBg: '#2c3e50', headerColor: '#fff', subColor: '#bdc3c7', secBorder: '2px solid #ddd', secColor: '#2c3e50', skillBg: '#f0f0f0' },
    'modern-gradient': { name: 'Modern Gradient', headerBg: 'linear-gradient(135deg, #4e6ef2, #a855f7)', headerColor: '#fff', subColor: '#f0e6ff', secBorder: '2px solid #e0e0e0', secColor: '#4e6ef2', skillBg: '#eef2ff' },
    'modern-boxed': { name: 'Modern Boxed', headerBg: 'transparent', headerColor: '#2c3e50', subColor: '#7f8c8d', secBorder: 'none', secColor: '#2c3e50', skillBg: '#f8f9fa', boxBorder: '1px solid #eee', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
    'elegant-cream': { name: 'Elegant Cream', headerBg: '#fff8e1', headerColor: '#5d4037', subColor: '#8d6e63', secBorder: '2px solid #d7ccc8', secColor: '#5d4037', skillBg: '#f5e6da' },
    'cool-teal': { name: 'Cool Teal', headerBg: 'transparent', headerColor: '#00796b', subColor: '#004d40', secBorder: '2px solid #b2dfdb', secColor: '#00796b', skillBg: '#e0f2f1' },
    'minimalist-line': { name: 'Minimalist Line', headerBg: 'transparent', headerColor: '#000', subColor: '#555', secBorder: '1px solid #000', secColor: '#000', skillBg: '#f0f0f0' },
    'warm-sunset': { name: 'Warm Sunset', headerBg: 'linear-gradient(135deg, #ff9a9e, #fecfef)', headerColor: '#7b341e', subColor: '#9b2c2c', secBorder: '2px solid #fed7aa', secColor: '#c2410c', skillBg: '#fff7ed' },
    'bold-purple': { name: 'Bold Purple', headerBg: '#4a148c', headerColor: '#fff', subColor: '#e1bee7', secBorder: '2px solid #ce93d8', secColor: '#4a148c', skillBg: '#f3e5f5' },
    'corporate-blue': { name: 'Corporate Blue', headerBg: '#0d47a1', headerColor: '#fff', subColor: '#bbdefb', secBorder: '2px solid #90caf9', secColor: '#0d47a1', skillBg: '#e3f2fd' },
    'classic-simple': { name: 'Classic Simple', headerBg: 'transparent', headerColor: '#000', subColor: '#333', secBorder: '3px solid #000', secColor: '#000', skillBg: '#f0f0f0' }
  };

  const emptyData = {
    name: '', title: '', email: '', phone: '', address: '', summary: '',
    experience: [{ role: '', company: '', duration: '', desc: '' }],
    education: [{ degree: '', institute: '', duration: '' }],
    social: [{ platform: '', link: '' }],
    skills: [{ name: '', level: '' }],
    languages: [{ name: '', level: '' }],
    projects: [{ title: '', link: '', desc: '' }]
  };

  const demoData = {
    name: 'FYZAL KARIM',
    title: 'Graphic Designer, Web Developer & Article Writer',
    email: 'fyzalkarim@email.com',
    phone: '+8801712345678',
    address: 'Mirpur, Dhaka, Bangladesh',
    summary: 'A passionate and creative Graphic Designer, Web Developer, and Article Writer with over 5 years of experience.',
    experience: [
      { role: 'Senior Graphic Designer', company: 'Creative Agency Ltd.', duration: '2021-Present', desc: 'Leading design teams and creating premium branding materials.' },
      { role: 'Web Developer', company: 'Tech Solutions', duration: '2018-2021', desc: 'Developed responsive websites using React, Next.js.' }
    ],
    education: [{ degree: 'BSc in Computer Science', institute: 'Dhaka University', duration: '2014-2018' }],
    social: [{ platform: 'LinkedIn', link: 'linkedin.com/in/fyzalkarim' }],
    skills: [{ name: 'Adobe Photoshop', level: 'Expert' }, { name: 'React', level: 'Advanced' }],
    languages: [{ name: 'Bengali', level: 'Native' }, { name: 'English', level: 'Fluent' }],
    projects: [{ title: 'E-commerce Platform', link: 'github.com/fyzal', desc: 'A full-stack e-commerce solution.' }]
  };

  const [data, setData] = useState(emptyData);
  const loadDemo = () => { setData(demoData); setPhoto('https://i.pravatar.cc/150?img=12'); }; // Demo Photo Added
  const clearForm = () => { setData(emptyData); setPhoto(null); };
  
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleArrayChange = (e, index, type) => {
    const items = [...data[type]];
    items[index][e.target.name] = e.target.value;
    setData({ ...data, [type]: items });
  };
  const addItem = (type, emptyItem) => setData({ ...data, [type]: [...data[type], emptyItem] });

  const handlePrint = () => {
    const printContent = document.getElementById('cv-preview').innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Print CV</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; background: ${bgColor}; }
            .cv-wrapper { padding: 40px; min-height: 100vh; box-sizing: border-box; }
          </style>
        </head>
        <body>
          <div class="cv-wrapper">${printContent}</div>
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  const T = themes[template];

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ color: 'white', marginBottom: '10px', textAlign: 'center' }}>💼 Free Premium CV Builder</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', textAlign: 'center' }}>১০টি প্রিমিয়াম লেআউট থেকে আপনার পছন্দের ডিজাইন বেছে নিন।</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <button onClick={loadDemo} className="d-btn-purple glow-btn-purple" style={{ padding: '10px 24px', border: 'none', cursor: 'pointer' }}>👁️ See Demo CV</button>
          <button onClick={clearForm} className="d-btn-outline" style={{ padding: '10px 24px', border: 'none', cursor: 'pointer' }}>🧹 Clear Form</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Form */}
          <div className="glass-3d" style={{ padding: '30px', maxHeight: '85vh', overflowY: 'auto' }}>
            
            {/* Profile Photo Upload */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <label style={{ color: 'white', display: 'block', marginBottom: '10px' }}>০. Profile Photo Upload</label>
              {photo ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={photo} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #4e6ef2' }} />
                  <button onClick={() => setPhoto(null)} style={{ position: 'absolute', top: '0', right: '0', background: '#fb6340', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                </div>
              ) : (
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="d-input" style={{ padding: '10px', background: 'rgba(255,255,255,0.05)' }} />
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>১. টেমপ্লেট নির্বাচন করুন (10 Styles):</label>
              <select value={template} onChange={(e) => setTemplate(e.target.value)} className="d-input" style={{ marginBottom: '15px' }}>
                {Object.keys(themes).map(key => (
                  <option key={key} value={key} style={{background: '#1a1c2e'}}>{themes[key].name}</option>
                ))}
              </select>

              <label style={{ color: 'white', display: 'block', marginBottom: '10px' }}>২. Select CV Background Color</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {colors.map((c, i) => (
                  <div key={i} onClick={() => setBgColor(c)} style={{ background: c, height: '36px', borderRadius: '8px', cursor: 'pointer', border: bgColor === c ? '3px solid #4e6ef2' : '1px solid rgba(255,255,255,0.2)', boxShadow: bgColor === c ? '0 0 10px rgba(78,110,242,0.5)' : 'none' }} />
                ))}
              </div>
            </div>

            <h3 style={{ color: '#4e6ef2', marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>৩. Personal Identity</h3>
            <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="পুরো নাম" className="d-input" style={{ marginBottom: '10px' }} />
            <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="পেশা" className="d-input" style={{ marginBottom: '20px' }} />
            
            <h3 style={{ color: '#4e6ef2', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>৪. Contact</h3>
            <input type="text" name="email" value={data.email} onChange={handleChange} placeholder="ইমেইল" className="d-input" style={{ marginBottom: '10px' }} />
            <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder="ফোন" className="d-input" style={{ marginBottom: '10px' }} />
            <input type="text" name="address" value={data.address} onChange={handleChange} placeholder="ঠিকানা" className="d-input" style={{ marginBottom: '20px' }} />

            <h3 style={{ color: '#a855f7', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>৫. Social Media</h3>
            {data.social.map((soc, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input type="text" name="platform" value={soc.platform} onChange={(e) => handleArrayChange(e, i, 'social')} placeholder="প্ল্যাটফর্ম" className="d-input" style={{ flex: 1 }} />
                <input type="text" name="link" value={soc.link} onChange={(e) => handleArrayChange(e, i, 'social')} placeholder="লিংক" className="d-input" style={{ flex: 2 }} />
              </div>
            ))}
            <button onClick={() => addItem('social', { platform: '', link: '' })} className="d-btn-outline" style={{ width: '100%', padding: '8px', marginBottom: '20px', border: 'none', cursor: 'pointer' }}>+ সোশ্যাল যোগ করুন</button>

            <h3 style={{ color: '#2dce89', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>৬. Summary</h3>
            <textarea name="summary" value={data.summary} onChange={handleChange} placeholder="সংক্ষেপে" className="d-input" style={{ marginBottom: '20px', minHeight: '60px' }} />

            <h3 style={{ color: '#fb6340', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>৭. Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                <input type="text" name="role" value={exp.role} onChange={(e) => handleArrayChange(e, i, 'experience')} placeholder="পদবি" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="company" value={exp.company} onChange={(e) => handleArrayChange(e, i, 'experience')} placeholder="কোম্পানি" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="duration" value={exp.duration} onChange={(e) => handleArrayChange(e, i, 'experience')} placeholder="সময়কাল" className="d-input" style={{ marginBottom: '5px' }} />
                <textarea name="desc" value={exp.desc} onChange={(e) => handleArrayChange(e, i, 'experience')} placeholder="বিবরণ" className="d-input" style={{ minHeight: '40px' }} />
              </div>
            ))}
            <button onClick={() => addItem('experience', { role: '', company: '', duration: '', desc: '' })} className="d-btn-outline" style={{ width: '100%', padding: '8px', marginBottom: '20px', border: 'none', cursor: 'pointer' }}>+ অভিজ্ঞতা যোগ করুন</button>

            <h3 style={{ color: '#4e6ef2', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>৮. Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                <input type="text" name="degree" value={edu.degree} onChange={(e) => handleArrayChange(e, i, 'education')} placeholder="ডিগ্রি" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="institute" value={edu.institute} onChange={(e) => handleArrayChange(e, i, 'education')} placeholder="প্রতিষ্ঠান" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="duration" value={edu.duration} onChange={(e) => handleArrayChange(e, i, 'education')} placeholder="সময়কাল" className="d-input" />
              </div>
            ))}
            <button onClick={() => addItem('education', { degree: '', institute: '', duration: '' })} className="d-btn-outline" style={{ width: '100%', padding: '8px', marginBottom: '20px', border: 'none', cursor: 'pointer' }}>+ শিক্ষা যোগ করুন</button>

            <h3 style={{ color: '#a855f7', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>৯. Skills</h3>
            {data.skills.map((skl, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input type="text" name="name" value={skl.name} onChange={(e) => handleArrayChange(e, i, 'skills')} placeholder="স্কিল" className="d-input" style={{ flex: 2 }} />
                <input type="text" name="level" value={skl.level} onChange={(e) => handleArrayChange(e, i, 'skills')} placeholder="লেভেল" className="d-input" style={{ flex: 1 }} />
              </div>
            ))}
            <button onClick={() => addItem('skills', { name: '', level: '' })} className="d-btn-outline" style={{ width: '100%', padding: '8px', marginBottom: '20px', border: 'none', cursor: 'pointer' }}>+ স্কিল যোগ করুন</button>

            <h3 style={{ color: '#2dce89', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>১০. Languages</h3>
            {data.languages.map((lng, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input type="text" name="name" value={lng.name} onChange={(e) => handleArrayChange(e, i, 'languages')} placeholder="ভাষা" className="d-input" style={{ flex: 1 }} />
                <input type="text" name="level" value={lng.level} onChange={(e) => handleArrayChange(e, i, 'languages')} placeholder="লেভেল" className="d-input" style={{ flex: 1 }} />
              </div>
            ))}
            <button onClick={() => addItem('languages', { name: '', level: '' })} className="d-btn-outline" style={{ width: '100%', padding: '8px', marginBottom: '20px', border: 'none', cursor: 'pointer' }}>+ ভাষা যোগ করুন</button>

            <h3 style={{ color: '#fb6340', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>১১. Projects & Awards</h3>
            {data.projects.map((prj, i) => (
              <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                <input type="text" name="title" value={prj.title} onChange={(e) => handleArrayChange(e, i, 'projects')} placeholder="প্রজেক্ট নাম" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="link" value={prj.link} onChange={(e) => handleArrayChange(e, i, 'projects')} placeholder="লিংক" className="d-input" style={{ marginBottom: '5px' }} />
                <textarea name="desc" value={prj.desc} onChange={(e) => handleArrayChange(e, i, 'projects')} placeholder="বিবরণ" className="d-input" style={{ minHeight: '40px' }} />
              </div>
            ))}
            <button onClick={() => addItem('projects', { title: '', link: '', desc: '' })} className="d-btn-outline" style={{ width: '100%', padding: '8px', border: 'none', cursor: 'pointer' }}>+ প্রজেক্ট যোগ করুন</button>

          </div>

          {/* Right Side: Live Preview */}
          <div>
            <div style={{ background: bgColor, borderRadius: '8px', padding: '40px', color: '#333', minHeight: '85vh', boxShadow: '0 0 20px rgba(0,0,0,0.5)', transition: 'background 0.3s' }} id="cv-preview">
              
              {/* Dynamic Header with Photo */}
              <div style={{ background: T.headerBg, padding: '30px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                {photo && (
                  <img src={photo} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
                )}
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <h1 className="cv-name" style={{ margin: 0, fontSize: '28px', color: T.headerColor }}>{data.name || 'Your Name'}</h1>
                  <p className="cv-title" style={{ margin: '5px 0', color: T.subColor }}>{data.title || 'Your Title'}</p>
                  <p className="cv-contact" style={{ margin: '10px 0 0 0', fontSize: '13px', color: T.subColor }}>
                    {data.email} | {data.phone} | {data.address}
                  </p>
                </div>
              </div>

              {data.social.length > 0 && data.social[0].platform && (
                <div style={{ marginTop: '10px', fontSize: '13px', color: '#555', textAlign: 'center' }}>
                  {data.social.map((s, i) => <span key={i} style={{ marginRight: '15px' }}><strong>{s.platform}:</strong> {s.link}</span>)}
                </div>
              )}

              {/* Wrapper for Boxed Style */}
              <div style={{ background: T.boxBorder ? '#fff' : 'transparent', padding: T.boxBorder ? '20px' : '0', borderRadius: T.boxBorder ? '12px' : '0', border: T.boxBorder || 'none', boxShadow: T.boxShadow || 'none', marginBottom: T.boxBorder ? '15px' : '0' }}>
                <h3 style={{ borderBottom: T.secBorder, paddingBottom: '5px', color: T.secColor }}>Summary</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.5 }}>{data.summary}</p>
              </div>

              <div style={{ background: T.boxBorder ? '#fff' : 'transparent', padding: T.boxBorder ? '20px' : '0', borderRadius: T.boxBorder ? '12px' : '0', border: T.boxBorder || 'none', boxShadow: T.boxShadow || 'none', marginBottom: T.boxBorder ? '15px' : '0', marginTop: '20px' }}>
                <h3 style={{ borderBottom: T.secBorder, paddingBottom: '5px', color: T.secColor }}>Work Experience</h3>
                {data.experience.map((exp, i) => exp.role && (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px' }}>
                      <span>{exp.role}</span>
                      <span style={{ fontSize: '12px', color: '#777' }}>{exp.duration}</span>
                    </div>
                    <p style={{ margin: '2px 0', fontSize: '14px', color: '#555' }}>{exp.company}</p>
                    <p style={{ fontSize: '13px', color: '#666' }}>{exp.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: T.boxBorder ? '#fff' : 'transparent', padding: T.boxBorder ? '20px' : '0', borderRadius: T.boxBorder ? '12px' : '0', border: T.boxBorder || 'none', boxShadow: T.boxShadow || 'none', marginBottom: T.boxBorder ? '15px' : '0', marginTop: '20px' }}>
                <h3 style={{ borderBottom: T.secBorder, paddingBottom: '5px', color: T.secColor }}>Education</h3>
                {data.education.map((edu, i) => edu.degree && (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px' }}>
                      <span>{edu.degree}</span>
                      <span style={{ fontSize: '12px', color: '#777' }}>{edu.duration}</span>
                    </div>
                    <p style={{ margin: '2px 0', fontSize: '14px', color: '#555' }}>{edu.institute}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: T.boxBorder ? '#fff' : 'transparent', padding: T.boxBorder ? '20px' : '0', borderRadius: T.boxBorder ? '12px' : '0', border: T.boxBorder || 'none', boxShadow: T.boxShadow || 'none', marginBottom: T.boxBorder ? '15px' : '0', marginTop: '20px' }}>
                <h3 style={{ borderBottom: T.secBorder, paddingBottom: '5px', color: T.secColor }}>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
                  {data.skills.map((skl, i) => skl.name && <span key={i} style={{ background: T.skillBg, padding: '5px 10px', borderRadius: '5px', fontSize: '13px' }}>{skl.name} ({skl.level})</span>)}
                </div>
              </div>

              {data.languages.length > 0 && data.languages[0].name && (
                <div style={{ background: T.boxBorder ? '#fff' : 'transparent', padding: T.boxBorder ? '20px' : '0', borderRadius: T.boxBorder ? '12px' : '0', border: T.boxBorder || 'none', boxShadow: T.boxShadow || 'none', marginBottom: T.boxBorder ? '15px' : '0', marginTop: '20px' }}>
                  <h3 style={{ borderBottom: T.secBorder, paddingBottom: '5px', color: T.secColor }}>Languages</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
                    {data.languages.map((lng, i) => <span key={i} style={{ background: T.skillBg, padding: '5px 10px', borderRadius: '5px', fontSize: '13px' }}>{lng.name} ({lng.level})</span>)}
                  </div>
                </div>
              )}

              {data.projects.length > 0 && data.projects[0].title && (
                <div style={{ background: T.boxBorder ? '#fff' : 'transparent', padding: T.boxBorder ? '20px' : '0', borderRadius: T.boxBorder ? '12px' : '0', border: T.boxBorder || 'none', boxShadow: T.boxShadow || 'none', marginTop: '20px' }}>
                  <h3 style={{ borderBottom: T.secBorder, paddingBottom: '5px', color: T.secColor }}>Projects & Awards</h3>
                  {data.projects.map((prj, i) => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{prj.title}</div>
                      <p style={{ margin: '2px 0', fontSize: '13px', color: '#4e6ef2' }}>{prj.link}</p>
                      <p style={{ fontSize: '13px', color: '#666' }}>{prj.desc}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={handlePrint} className="neon-3d-btn" style={{ padding: '14px 40px', fontSize: '16px', border: 'none', cursor: 'pointer' }}>
            💾 Save CV as PDF
          </button>
        </div>
      </div>
    </div>
  );
}