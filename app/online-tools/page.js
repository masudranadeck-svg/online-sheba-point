'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnlineTools() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const tools = [
    { name: 'ID Card Crop to PDF', link: '/online-tools/id-card-crop', icon: 'fa-solid fa-id-card' },
    { name: 'Passport Photo Maker', link: '/online-tools/passport-photo-maker', icon: 'fa-solid fa-camera' },
    { name: 'Stamp Photo Maker', link: '/online-tools/stamp-photo-maker', icon: 'fa-solid fa-stamp' },
    { name: 'NID Front-Back Joiner', link: '/online-tools/nid-joiner', icon: 'fa-solid fa-file-lines' },
    { name: 'Professional CV Maker', link: '/online-tools/cv-builder', icon: 'fa-solid fa-briefcase' },
    { name: 'AI Passport Photo Maker', link: '/online-tools/ai-passport-photo-maker', icon: 'fa-solid fa-robot' },
    { name: 'Studio Photo Print Layout', link: '/online-tools/studio-print-layout', icon: 'fa-solid fa-image' },
    { name: 'Joint Photo Maker', link: '/online-tools/joint-photo-maker', icon: 'fa-solid fa-users' },
    { name: 'Invoice Maker', link: '/online-tools/invoice-maker', icon: 'fa-solid fa-file-invoice' },
    { name: 'Quotation Maker', link: '/online-tools/quotation-maker', icon: 'fa-solid fa-dollar-sign' },
    { name: 'PDF Size Reducer', link: '/online-tools/pdf-size-reducer', icon: 'fa-solid fa-compress' },
    { name: 'Bangla Sign Maker', link: '/online-tools/bangla-sign-maker', icon: 'fa-solid fa-signature' },
    { name: 'Signature BG Remover', link: '/online-tools/signature-bg-remover', icon: 'fa-solid fa-eraser' },
    { name: 'Image BG Remover', link: '/online-tools/image-bg-remover', icon: 'fa-solid fa-mountain-sun' },
    { name: 'Advance Image Crop', link: '/online-tools/advance-image-crop', icon: 'fa-solid fa-crop-simple' },
    { name: 'Image Converter', link: '/online-tools/image-converter', icon: 'fa-solid fa-right-left' },
    { name: 'PDF to Image', link: '/online-tools/pdf-to-image', icon: 'fa-solid fa-file-image' },
    { name: 'Image to PDF', link: '/online-tools/image-to-pdf', icon: 'fa-solid fa-file-pdf' },
    { name: 'Image to Text', link: '/online-tools/image-to-text', icon: 'fa-solid fa-font' },
    { name: 'Pro QR Generator', link: '/online-tools/qr-generator', icon: 'fa-solid fa-qrcode' },
    { name: 'Image Compressor', link: '/online-tools/image-compressor', icon: 'fa-solid fa-minimize' },
    { name: 'Doc Scanner (PDF)', link: '/online-tools/doc-scanner', icon: 'fa-solid fa-fax' },
    { name: 'PDF Merge & Split', link: '/online-tools/merge-pdf', icon: 'fa-solid fa-layer-group' },
    { name: 'Watermark Adder', link: '/online-tools/watermark-adder', icon: 'fa-solid fa-droplet' },
    { name: 'PDF Page Manager', link: '/online-tools/pdf-page-manager', icon: 'fa-solid fa-folder-tree' },
    { name: 'Text to PDF Maker', link: '/online-tools/text-to-pdf', icon: 'fa-solid fa-pen-to-square' },
    { name: 'Social Media Resizer', link: '/online-tools/social-resizer', icon: 'fa-solid fa-mobile-screen' },
    { name: 'Image Color Picker', link: '/online-tools/color-picker', icon: 'fa-solid fa-palette' },
    { name: 'Password Generator', link: '/online-tools/password-generator', icon: 'fa-solid fa-key' },
    { name: 'Bijoy Avro Converter', link: '/online-tools/bijoy-avro-converter', icon: 'fa-solid fa-language' },
    { name: 'Word Counter', link: '/online-tools/word-counter', icon: 'fa-solid fa-calculator' }
  ];

  // সার্চ ফিল্টার লজিক (বড়-ছোট হাতের অক্ষর ignore করে)
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (tool) => {
    router.push(tool.link);
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: "'Manrope',sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 pt-24 pb-16">
        
        {/* Header */}
        <div className="mb-8">
          <div className="section-eyebrow mb-4">02 / Utilities</div>
          <h1 className="font-display font-bold text-5xl lg:text-7xl leading-none">Free Tools.</h1>
          <p className="max-w-sm text-[var(--fg-dim)] mt-6">30+ premium tools for your daily digital tasks. 100% free and secure.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-xl">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools... (e.g. pdf, image, scanner)"
            className="w-full bg-[var(--bg-card)] border border-[var(--border-bright)] rounded-lg py-3.5 pl-11 pr-10 text-sm text-[var(--fg)] placeholder-[var(--fg-muted)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_15px_rgba(255,91,20,0.2)] transition-all duration-300"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
              title="Clear search"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        {/* Result count */}
        {search && (
          <p className="text-xs text-[var(--fg-muted)] mb-4 font-mono">
            {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found for "{search}"
          </p>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredTools.map((tool, i) => (
            <div 
              key={i} 
              onClick={() => handleClick(tool)} 
              className="relative bg-[var(--bg-card)] border border-transparent rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-[var(--bg-elev)] hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgba(255,91,20,0.4),inset_0_0_15px_rgba(255,91,20,0.1)] group cursor-pointer"
            >
              <div className="corner-tl"></div><div className="corner-tr"></div><div className="corner-bl"></div><div className="corner-br"></div>
              
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--accent-glow)]"
                style={{ background: 'var(--bg)', border: '1px solid var(--border-bright)', color: 'var(--accent)' }}
              >
                <i className={tool.icon}></i>
              </div>
              
              <h3 className="font-display font-bold text-sm tracking-tight mb-1 text-[var(--fg)]">{tool.name}</h3>
              <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">EXPLORE →</p>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <i className="fa-solid fa-magnifying-glass text-4xl text-[var(--fg-muted)] mb-4"></i>
            <p className="text-[var(--fg-muted)] text-lg font-display font-bold">No tools found.</p>
            <p className="text-[var(--fg-dim)] text-sm mt-2">Try different keywords like "pdf", "image", "scanner"</p>
          </div>
        )}
      </div>
    </div>
  );
}