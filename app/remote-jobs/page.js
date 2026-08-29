'use client'
import { useState, useEffect } from 'react';

export default function RemoteJobs() {
  const [jobs, setJobs] = useState([]);
  const API_URL = "https://online-sheba-point.onrender.com/api";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs`);
        setJobs(await res.json());
      } catch (error) {
        console.log("জব আনতে সমস্যা");
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>🌍 Remote Job Portal</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '40px', fontSize: '16px' }}>বাংলাদেশ ও বিশ্বের বিভিন্ন কোম্পানির রিমোট জব। সরাসরি এপ্লাই করুন।</p>

        <div style={{ display: 'grid', gap: '20px' }}>
          {jobs.length === 0 ? (
            <div className="glass-3d" style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ fontSize: '40px', marginBottom: '10px' }}>💼</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>এখনো কোনো রিমোট জব পোস্ট করা হয়নি। শীঘ্রই আসছে!</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="glass-3d" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <h3 style={{ margin: '0 0 5px 0', color: 'white', fontSize: '20px' }}>{job.title}</h3>
                  <p style={{ margin: '0 0 10px 0', color: '#4e6ef2', fontWeight: '600', fontSize: '14px' }}>🏢 {job.company}</p>
                  <p style={{ margin: '0 0 10px 0', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{job.description}</p>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(45,206,137,0.2)', color: '#2dce89', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>💰 {job.salary}</span>
                    <span style={{ background: 'rgba(78,110,242,0.2)', color: '#4e6ef2', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>📍 {job.location}</span>
                  </div>
                </div>
                <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="neon-3d-btn" style={{ padding: '12px 24px', textDecoration: 'none', textAlign: 'center' }}>
                  Apply Now →
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}