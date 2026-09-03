import React, { useRef, useState, useEffect } from 'react';
import FooterColumns from './FooterColumns';
import FooterBottomBar from './FooterBottomBar';

export default function StyleinFooter() {
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const measured = entries[0].borderBoxSize?.[0]?.blockSize || entries[0].contentRect?.height;
        if (measured) {
          setFooterHeight(Math.ceil(measured));
        }
      }
    });

    observer.observe(footerRef.current);
    return () => observer.disconnect();
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

        {/* Large Ghost Background Watermark Typography (CSS pseudo-content to prevent false LCP capture) */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-heading font-black text-7xl sm:text-[9rem] lg:text-[12rem] text-white/[0.03] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0 after:content-['STYLEIN']"
        />

        {/* Content Container */}
        <div className="max-w-[1240px] w-full mx-auto flex flex-col justify-between relative z-10 flex-1">
          <FooterColumns />
          <FooterBottomBar />
        </div>
      </footer>
    </>
  );
}
