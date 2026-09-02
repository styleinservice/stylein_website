import React, { useRef, useState, useLayoutEffect } from 'react';
import FooterColumns from './FooterColumns';
import FooterBottomBar from './FooterBottomBar';

export default function StyleinFooter() {
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useLayoutEffect(() => {
    if (!footerRef.current) return;
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(footerRef.current);
    window.addEventListener('resize', updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <>
      {/* Scroll Placeholder Spacer: Dynamically matches exact footer height on any screen */}
      <div
        style={{ height: footerHeight > 0 ? `${footerHeight}px` : undefined }}
        className="relative z-0 h-[520px] sm:h-[440px] lg:h-[280px] w-full pointer-events-none transform-gpu"
      />

      {/* Fixed Parallax Reveal Footer (Curtain / Shutter Reveal) */}
      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-0 w-full bg-[#0a0b10] border-t border-white/10 flex flex-col justify-between pt-10 sm:pt-12 pb-6 px-6 sm:px-12 lg:px-16 overflow-hidden transform-gpu will-change-transform"
      >
        {/* Subtle Deep Red Ambient Back-Glow */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[160px] bg-[#e50914]/10 pointer-events-none" />

        {/* Large Ghost Background Watermark Typography */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-heading font-black text-7xl sm:text-[9rem] lg:text-[12rem] text-white/[0.03] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0">
          STYLEIN
        </div>

        {/* Content Container */}
        <div className="max-w-[1240px] w-full mx-auto flex flex-col justify-between relative z-10 flex-1">
          <FooterColumns />
          <FooterBottomBar />
        </div>
      </footer>
    </>
  );
}
