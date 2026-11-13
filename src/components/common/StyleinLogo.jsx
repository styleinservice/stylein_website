import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/stylein-official-logo.webp';

export default function StyleinLogo({ className = '', size = 'medium' }) {
  const navigate = useNavigate();
  const isLarge = size === 'large';

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      href="/"
      onClick={handleClick}
      title="STYLEIN Home"
      className={`inline-flex items-center gap-2 no-underline group select-none cursor-pointer ${className}`}
      aria-label="STYLEIN Home"
    >
      <img
        src={logoImg}
        alt="STYLEIN Logo"
        title="STYLEIN - Doorstep Car Care & Detailing"
        className={`object-contain transition-transform duration-300 group-hover:scale-[1.03] ${
          isLarge ? 'h-16 max-w-[260px]' : 'h-8 max-w-[140px]'
        }`}
      />
    </a>
  );
}
