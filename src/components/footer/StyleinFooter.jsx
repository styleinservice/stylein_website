import React from 'react';
import FooterColumns from './FooterColumns';
import FooterBottomBar from './FooterBottomBar';

export default function StyleinFooter() {
  return (
    <>
      {/* Scroll Placeholder Spacer (Compact height to prevent empty space) */}
      <div className="relative z-0 h-[380px] sm:h-[340px] lg:h-[300px] w-full pointer-events-none" />

      {/* Fixed Parallax Reveal Footer (Curtain / Shutter Reveal) */}
      <footer className="fixed bottom-0 left-0 right-0 z-0 min-h-[380px] sm:min-h-[340px] lg:min-h-[300px] w-full bg-[#0a0b10] border-t border-white/10 flex flex-col justify-between pt-8 sm:pt-10 pb-6 px-6 sm:px-12 lg:px-16 overflow-hidden">
        {/* Subtle Deep Red Ambient Back-Glow */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[160px] bg-[#e50914]/10 pointer-events-none" />

        {/* Large Ghost Background Watermark Typography (Untouched) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-heading font-black text-7xl sm:text-[9rem] lg:text-[12rem] text-white/[0.03] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0">
          STYLEIN
        </div>

        {/* Content Container */}
        <div className="max-w-[1240px] w-full mx-auto flex flex-col justify-between relative z-10 flex-1">
          {/* Brand Logo, Reusable App Store Badges & Nav Columns */}
          <FooterColumns />

          {/* Copyright, Terms, Privacy & Socials */}
          <FooterBottomBar />
        </div>
      </footer>
    </>
  );
}
