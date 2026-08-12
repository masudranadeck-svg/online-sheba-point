'use client';

import { useEffect } from 'react';

export default function GlowEffect() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.glow-card, .glow-btn');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
}