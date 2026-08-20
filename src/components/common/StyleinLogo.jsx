import React from 'react';
import logoImg from '../../assets/images/stylein-official-logo.png';

export default function StyleinLogo({ className = '', size = 'medium' }) {
  const isLarge = size === 'large';
  
  return (
    <a 
      href="/" 
      className={`inline-flex items-center gap-2 no-underline group select-none ${className}`}
      aria-label="STYLEIN Home"
    >
      <img
        src={logoImg}
        alt="STYLEIN Logo"
        className={`object-contain transition-transform duration-300 group-hover:scale-[1.03] ${
          isLarge ? 'h-16 max-w-[260px]' : 'h-8 max-w-[140px]'
        }`}
      />
    </a>
  );
}
