'use client';
import { useState } from 'react';

export default function CVBuilder() {
  const [template, setTemplate] = useState('modern');
  
  const [data, setData] = useState({
    name: 'Masud Rana',
    title: 'Software Engineer & Developer',
    email: 'masud@email.com',
    phone: '01700000000',
    address: 'Dhaka, Bangladesh',
    summary: 'Experienced software developer with a passion for building scalable web applications.',
    experience: [{ role: 'Jr. Developer', company: 'Tech Corp', duration: '2020-2022', desc: 'Worked on frontend and backend.' }],
    education: [{ degree: 'BSc in Computer Science', institute: 'Dhaka University', duration: '2016-2020' }]
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, type) => {
    const items = [...data[type]];
    items[index][e.target.name] = e.target.value;
    setData({ ...data, [type]: items });
  };

  const addItem = (type, emptyItem) => {
    setData({ ...data, [type]: [...data[type], emptyItem] });
  };

  const handlePrint = () => {
    const printContent = document.getElementById('cv-preview').innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Print CV</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
            .cv-header { text-align: center; margin-bottom: 20px; }
            .cv-name { font-size: 24px; font-weight: bold; text-transform: uppercase; }
            .cv-title { color: #555; }
            .cv-contact { margin-top: 10px; font-size: 12px; color: #777; }
            .cv-section { margin-top: 20px; }
            .cv-section h3 { border-bottom: 2px solid #ddd; padding-bottom: 5px; color: #2c3e50; }
            .cv-item { margin-bottom: 10px; }
            .cv-item-header { display: flex; justify-content: space-between; font-weight: bold; }
            /* Modern Template */
            .modern .cv-header { background: #2c3e50; color: white; padding: 20px; border-radius: 8px; }
            .modern .cv-name { color: white; }
            .modern .cv-title { color: #ddd; }
            .modern .cv-contact { color: #ddd; }
            /* Classic Template */
            .classic .cv-header { border-bottom: 3px solid #000; padding-bottom: 10px; text-align: left; }
          </style>
        </head>
        <body class="${template}">${printContent}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ color: 'white', marginBottom: '10px', textAlign: 'center' }}>💼 Professional CV Builder</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', textAlign: 'center' }}>তথ্য লিখুন, লেআউট বেছে নিন এবং সরাসরি পিডিএফ ডাউনলোড করুন।</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Form */}
          <div className="glass-3d" style={{ padding: '30px', maxHeight: '80vh', overflowY: 'auto' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>টেমপ্লেট নির্বাচন করুন:</label>
              <select value={template} onChange={(e) => setTemplate(e.target.value)} className="d-input">
                <option value="modern" style={{background: '#1a1c2e'}}>Modern Dark</option>
                <option value="classic" style={{background: '#1a1c2e'}}>Classic Simple</option>
              </select>
            </div>

            <h3 style={{ color: '#4e6ef2', marginTop: 0 }}>১. Personal Identity</h3>
            <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="পুরো নাম" className="d-input" style={{ marginBottom: '10px' }} />
            <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="পেশা (যেমন: Software Engineer)" className="d-input" style={{ marginBottom: '10px' }} />
            
            <h3 style={{ color: '#4e6ef2' }}>২. Contact & Titles</h3>
            <input type="text" name="email" value={data.email} onChange={handleChange} placeholder="ইমেইল" className="d-input" style={{ marginBottom: '10px' }} />
            <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder="ফোন নাম্বার" className="d-input" style={{ marginBottom: '10px' }} />
            <input type="text" name="address" value={data.address} onChange={handleChange} placeholder="ঠিকানা" className="d-input" style={{ marginBottom: '10px' }} />
            <textarea name="summary" value={data.summary} onChange={handleChange} placeholder="নিজের সম্পর্কে সংক্ষেপে" className="d-input" style={{ marginBottom: '10px', minHeight: '60px' }} />

            <h3 style={{ color: '#a855f7' }}>৩. Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                <input type="text" name="role" value={exp.role} onChange={(e) => handleArrayChange(e, i, 'experience')} placeholder="পদবি" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="company" value={exp.company} onChange={(e) => handleArrayChange(e, i, 'experience')} placeholder="কোম্পানির নাম" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="duration" value={exp.duration} onChange={(e) => handleArrayChange(e, i, 'experience')} placeholder="সময়কাল (২০২০-২০২২)" className="d-input" style={{ marginBottom: '5px' }} />
                <textarea name="desc" value={exp.desc} onChange={(e) => handleArrayChange(e, i, 'experience')} placeholder="কাজের বিবরণ" className="d-input" style={{ minHeight: '40px' }} />
              </div>
            ))}
            <button onClick={() => addItem('experience', { role: '', company: '', duration: '', desc: '' })} className="d-btn-outline" style={{ width: '100%', padding: '8px', border: 'none', cursor: 'pointer' }}>+ অভিজ্ঞতা যোগ করুন</button>

            <h3 style={{ color: '#2dce89', marginTop: '20px' }}>৪. Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                <input type="text" name="degree" value={edu.degree} onChange={(e) => handleArrayChange(e, i, 'education')} placeholder="ডিগ্রি" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="institute" value={edu.institute} onChange={(e) => handleArrayChange(e, i, 'education')} placeholder="প্রতিষ্ঠান" className="d-input" style={{ marginBottom: '5px' }} />
                <input type="text" name="duration" value={edu.duration} onChange={(e) => handleArrayChange(e, i, 'education')} placeholder="সময়কাল" className="d-input" />
              </div>
            ))}
            <button onClick={() => addItem('education', { degree: '', institute: '', duration: '' })} className="d-btn-outline" style={{ width: '100%', padding: '8px', border: 'none', cursor: 'pointer' }}>+ শিক্ষা যোগ করুন</button>

          </div>

          {/* Right Side: Live Preview */}
          <div>
            <div style={{ background: 'white', borderRadius: '8px', padding: '40px', color: '#333', minHeight: '80vh', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} id="cv-preview" className={template}>
              
              {template === 'modern' ? (
                <div className="cv-header">
                  <h1 className="cv-name" style={{ margin: 0, color: 'white' }}>{data.name || 'Your Name'}</h1>
                  <p className="cv-title" style={{ margin: '5px 0', color: '#ccc' }}>{data.title || 'Your Title'}</p>
                  <p className="cv-contact" style={{ margin: '10px 0 0 0', color: '#ddd', fontSize: '12px' }}>
                    {data.email} | {data.phone} | {data.address}
                  </p>
                </div>
              ) : (
                <div className="cv-header" style={{ textAlign: 'left', borderBottom: '3px solid #333', paddingBottom: '10px' }}>
                  <h1 className="cv-name" style={{ margin: 0 }}>{data.name || 'Your Name'}</h1>
                  <p className="cv-title" style={{ margin: '5px 0' }}>{data.title || 'Your Title'}</p>
                  <p className="cv-contact" style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#555' }}>
                    {data.email} | {data.phone} | {data.address}
                  </p>
                </div>
              )}

              <div className="cv-section" style={{ marginTop: '20px' }}>
                <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px' }}>Summary</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.5 }}>{data.summary}</p>
              </div>

              <div className="cv-section" style={{ marginTop: '20px' }}>
                <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px' }}>Experience</h3>
                {data.experience.map((exp, i) => (
                  <div className="cv-item" key={i} style={{ marginBottom: '10px' }}>
                    <div className="cv-item-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{exp.role}</strong>
                      <span style={{ fontSize: '12px', color: '#777' }}>{exp.duration}</span>
                    </div>
                    <p style={{ margin: '2px 0', fontSize: '14px', color: '#555' }}>{exp.company}</p>
                    <p style={{ fontSize: '13px', color: '#666' }}>{exp.desc}</p>
                  </div>
                ))}
              </div>

              <div className="cv-section" style={{ marginTop: '20px' }}>
                <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px' }}>Education</h3>
                {data.education.map((edu, i) => (
                  <div className="cv-item" key={i} style={{ marginBottom: '10px' }}>
                    <div className="cv-item-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{edu.degree}</strong>
                      <span style={{ fontSize: '12px', color: '#777' }}>{edu.duration}</span>
                    </div>
                    <p style={{ margin: '2px 0', fontSize: '14px', color: '#555' }}>{edu.institute}</p>
                  </div>
                ))}
              </div>

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