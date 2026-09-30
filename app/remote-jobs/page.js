'use client';
import { useState, useEffect } from 'react';

export default function RemoteJobs() {
  const [jobs, setJobs] = useState([]);
  const API_URL = "https://online-sheba-point.onrender.com/api";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs`);
        setJobs(await res.json());
      } catch (error) { console.log("Error fetching jobs"); }
    };
    fetchJobs();
  }, []);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <div className="section-eyebrow mb-4">05 / Remote Jobs</div>
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">Remote Jobs.</h1>
            <p className="max-w-md text-[var(--fg-dim)] mt-6 text-base">Find the best remote work opportunities from around the world.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {jobs.length === 0 ? (
            <div className="relative bg-[var(--bg-card)] p-12 border border-[var(--border)] rounded-lg col-span-full text-center">
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              <i className="fa-solid fa-briefcase text-5xl text-[var(--fg-muted)] mb-4"></i>
              <h3 className="font-display font-bold text-xl text-[var(--fg)]">No Jobs Available</h3>
              <p className="text-sm text-[var(--fg-muted)] mt-2">Check back soon for new opportunities.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="relative bg-[var(--bg-card)] p-6 rounded-lg border border-transparent hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4)] transition-all duration-300">
                <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg tracking-tight text-[var(--fg)]">{job.title}</h3>
                    <p className="text-sm text-[var(--accent)] font-mono mt-1">{job.company}</p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-1 bg-[var(--lime)] text-black font-bold tracking-widest rounded-sm">REMOTE</span>
                </div>
                <p className="text-xs text-[var(--fg-muted)] mb-6">{job.description}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-[var(--border)]">
                  <div className="flex gap-4 text-sm">
                    <span className="text-[var(--fg)] font-mono">💰 {job.salary}</span>
                    <span className="text-[var(--fg-muted)] font-mono">📍 {job.location}</span>
                  </div>
                  <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 text-[10px]">Apply Now →</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}