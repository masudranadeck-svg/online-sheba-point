'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./_components/Hero3D'), { ssr: false });

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const services = [
  { name: 'ডিজিটাল শপ', desc: 'সফটওয়্যার কী ও সাবস্ক্রিপশন', link: '/shop', icon: 'fa-solid fa-bag-shopping' },
  { name: 'অনলাইন টুলস', desc: '৩০+ প্রফেশনাল টুল, ফ্রি', link: '/online-tools', icon: 'fa-solid fa-screwdriver-wrench' },
  { name: 'রিয়েল এস্টেট', desc: 'কেনা, বেচা ও ভাড়া', link: '/properties', icon: 'fa-solid fa-house' },
  { name: 'মার্কেটপ্লেস', desc: 'সার্ভিস ও পণ্য কেনাবেচা', link: '/marketplace', icon: 'fa-solid fa-store' },
  { name: 'রিসেল', desc: 'পুরোনো পণ্য বিক্রি', link: '/resell', icon: 'fa-solid fa-recycle' },
  { name: 'রিমোট জবস', desc: 'ঘরে বসে কাজ খুঁজুন', link: '/remote-jobs', icon: 'fa-solid fa-briefcase' },
  { name: 'ডেভ সার্ভিস', desc: 'ওয়েবসাইট ও অ্যাপ ডেভেলপমেন্ট', link: '/dev-services', icon: 'fa-solid fa-code' },
  { name: 'অনলাইন সেবা', desc: 'ডিজিটাল সলিউশন', link: '/online-sheba', icon: 'fa-solid fa-headset' },
  { name: 'ডলার এক্সচেঞ্জ', desc: 'নিরাপদ ট্রান্সফার', link: '/dollar-exchange', icon: 'fa-solid fa-dollar-sign' },
  { name: 'কার্ডস', desc: 'ভার্চুয়াল ও ফিজিক্যাল', link: '/cards', icon: 'fa-solid fa-credit-card' },
  { name: 'অ্যাকাউন্টস', desc: 'অ্যাকাউন্ট সার্ভিস', link: '/accounts', icon: 'fa-solid fa-user-shield' },
  { name: 'কোম্পানি', desc: 'ব্যবসা নিবন্ধনে সহায়তা', link: '/company-formation', icon: 'fa-solid fa-building' },
  { name: 'পিসি সলিউশন', desc: 'কম্পিউটার রিপেয়ার', link: '/pc-solution', icon: 'fa-solid fa-desktop' },
  { name: 'সাবস্ক্রিপশন', desc: 'স্ট্রিমিং ও সফটওয়্যার', link: '/subscription', icon: 'fa-solid fa-tv' },
  { name: 'রিমোট সার্ভিস', desc: 'ফোন আনলক ও সাপোর্ট', link: '/remote', icon: 'fa-solid fa-satellite-dish' },
];

const steps = [
  ['পণ্য বাছাই করুন', 'শপ থেকে আপনার দরকারি সার্ভিস বা কী নির্বাচন করুন।'],
  ['bKash/Nagad-এ পেমেন্ট', 'নিরাপদ পেমেন্টের পর অর্ডার কনফার্ম হবে।'],
  ['দ্রুত ডেলিভারি', 'কী বা সার্ভিস আপনার ড্যাশবোর্ডে ও WhatsApp-এ পৌঁছে যাবে।'],
];

const css = `
.osp{--o-ink:#0a1428;--o-ink2:#14233f;--o-blue:#2f6bff;--o-mint:#19c3a0;--o-mute:#5b6b85;--o-line:#e3e8f1;font-family:inherit;line-height:1.65;overflow-x:hidden}
.osp *{box-sizing:border-box}
.osp-wrap{max-width:1160px;margin:0 auto;padding:0 20px}
.osp-hero{position:relative;min-height:90vh;display:flex;align-items:center;padding-top:80px;background:radial-gradient(ellipse at 75% 40%,#16336b 0%,#0a1428 60%);color:#fff;overflow:hidden}
.osp-copy{position:relative;z-index:2}
.osp-hero h1{font-size:clamp(2.1rem,5vw,3.6rem);line-height:1.25;max-width:14em;margin:0 0 18px;animation:ospRise .9s ease both}
.osp-hero p{max-width:34em;font-size:1.1rem;color:#c7d3ea;margin:0 0 30px;animation:ospRise .9s .15s ease both}
.osp-cta{display:flex;gap:14px;flex-wrap:wrap;animation:ospRise .9s .3s ease both}
.osp-btn{display:inline-block;padding:13px 26px;border-radius:10px;font-weight:600;text-decoration:none;transition:transform .2s}
.osp-btn:hover{transform:translateY(-2px)}
.osp-btn.p{background:var(--o-blue);color:#fff}
.osp-btn.g{border:1.5px solid rgba(255,255,255,.4);color:#fff}
@keyframes ospRise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.osp-hero h1,.osp-hero p,.osp-cta{animation:none}}
.osp-stats{background:var(--o-ink2);color:#fff}
.osp-stats .osp-wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding-top:30px;padding-bottom:30px}
.osp-stats strong{display:block;font-size:1.7rem;color:var(--o-mint)}
.osp-stats span{color:#aab8d3;font-size:.92rem}
.osp-sec{padding:84px 0;background:#fff;color:var(--o-ink)}
.osp-sec.alt{background:#f6f8fc}
.osp-sec h2{font-size:clamp(1.6rem,3vw,2.2rem);margin:0 0 10px;color:var(--o-ink)}
.osp-lead{color:var(--o-mute);max-width:36em;margin:0 0 40px}
.osp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px}
.osp-card{display:block;padding:24px;border:1px solid var(--o-line);border-radius:14px;background:#fff;text-decoration:none;color:var(--o-ink);transition:transform .25s,box-shadow .25s,border-color .25s}
.osp-card:hover{transform:perspective(700px) rotateX(3deg) translateY(-6px);box-shadow:0 18px 40px -18px rgba(47,107,255,.5);border-color:var(--o-blue)}
.osp-ic{width:46px;height:46px;border-radius:12px;background:#eaf0ff;color:var(--o-blue);display:grid;place-items:center;font-size:20px;margin-bottom:14px}
.osp-card h3{font-size:1.05rem;margin:0 0 4px}
.osp-card p{color:var(--o-mute);font-size:.92rem;margin:0}
.osp-steps{list-style:none;padding:0;margin:30px 0 0;display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.osp-steps li{display:flex;gap:16px}
.osp-steps li>span{flex:none;width:42px;height:42px;border-radius:50%;background:var(--o-blue);color:#fff;display:grid;place-items:center;font-weight:700}
.osp-steps h3{font-size:1.1rem;margin:0}
.osp-steps p{color:var(--o-mute);font-size:.95rem;margin:0}
.osp-trust ul{list-style:none;padding:0;display:flex;gap:14px;flex-wrap:wrap;margin:22px 0}
.osp-trust a{display:block;padding:10px 20px;border:1px solid var(--o-line);border-radius:999px;text-decoration:none;color:var(--o-ink)}
.osp-trust a:hover{border-color:var(--o-blue);color:var(--o-blue)}
.osp-note{color:var(--o-mute);font-size:.92rem;max-width:40em}
@media (max-width:860px){.osp-stats .osp-wrap{grid-template-columns:repeat(2,1fr)}.osp-steps{grid-template-columns:1fr}.osp-sec{padding:56px 0}.osp-hero{min-height:75vh}}
`;

export default function Home() {
  return (
    <div className="osp">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="osp-hero">
        <Hero3D />
        <div className="osp-wrap osp-copy">
          <h1>আপনার সব ডিজিটাল সার্ভিস, এক জায়গায়।</h1>
          <p>সফটওয়্যার কী, প্রিমিয়াম সাবস্ক্রিপশন, রিমোট আনলক এবং ৩০+ ফ্রি অনলাইন টুলস। bKash ও Nagad-এ পেমেন্ট করুন, দ্রুত ডেলিভারি নিন।</p>
          <div className="osp-cta">
            <Link href="/shop" className="osp-btn p">শপ দেখুন</Link>
            <Link href="/online-tools" className="osp-btn g">ফ্রি টুলস ব্যবহার করুন</Link>
          </div>
        </div>
      </section>

      <section className="osp-stats">
        <div className="osp-wrap">
          <div><strong><Counter to={30} suffix="+" /></strong><span>ফ্রি অনলাইন টুলস</span></div>
          <div><strong><Counter to={15} suffix="+" /></strong><span>সার্ভিস ক্যাটাগরি</span></div>
          <div><strong>24/7</strong><span>WhatsApp সাপোর্ট</span></div>
          <div><strong>bKash · Nagad</strong><span>নিরাপদ পেমেন্ট</span></div>
        </div>
      </section>

      <section className="osp-sec">
        <div className="osp-wrap">
          <h2>আমাদের সার্ভিস</h2>
          <p className="osp-lead">জন্ম নিবন্ধন থেকে ব্যবসা, শিক্ষা ও ক্যারিয়ার, দরকারি অনলাইন সেবা এক ঠিকানায়।</p>
          <div className="osp-grid">
            {services.map((s) => (
              <Link key={s.link} href={s.link} className="osp-card">
                <div className="osp-ic"><i className={s.icon}></i></div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="osp-sec alt">
        <div className="osp-wrap">
          <h2>অর্ডার করা খুব সহজ</h2>
          <ol className="osp-steps">
            {steps.map(([t, d], i) => (
              <li key={t}><span>{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="osp-sec">
        <div className="osp-wrap osp-trust">
          <h2>আপনার ভরসার জন্য</h2>
          <ul>
            <li><Link href="/refund-policy">রিফান্ড পলিসি</Link></li>
            <li><Link href="/privacy-policy">প্রাইভেসি পলিসি</Link></li>
            <li><Link href="/terms">শর্তাবলি</Link></li>
            <li><Link href="/about">আমাদের সম্পর্কে</Link></li>
          </ul>
          <p className="osp-note">জুয়া, অর্থ পাচার ও হারাম উৎসের লেনদেন সম্পূর্ণ নিষিদ্ধ। আমরা দেশের আইন মেনে চলি।</p>
        </div>
      </section>
    </div>
  );
}