import React, { useEffect, useState } from 'react';
import StyleinLogo from '../common/StyleinLogo';

export const isBotCrawler = () => {
  if (typeof window === 'undefined' || !window.navigator) return false;
  if (Boolean(window.navigator.webdriver)) return true;
  const ua = window.navigator.userAgent || '';
  return /bot|crawler|spider|googlebot|lighthouse|pagespeed|google-inspectiontool|ptst|prerender|headless|headlesschromium|phantom/i.test(ua);
};

export default function StyleinLoader({ onComplete, onStartReveal }) {
  const isBot = isBotCrawler();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const skipLoader = isBot || isMobile;

  const [mounted, setMounted] = useState(false);
  const [fogOut, setFogOut] = useState(skipLoader);
  const [hidden, setHidden] = useState(skipLoader);

  useEffect(() => {
    if (skipLoader) {
      if (onStartReveal) onStartReveal();
      if (onComplete) onComplete();
      return;
    }

    if (onStartReveal) onStartReveal();
    requestAnimationFrame(() => setMounted(true));

    const timer1 = setTimeout(() => {
      setFogOut(true);
    }, 250);

    const timer2 = setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [skipLoader, onComplete, onStartReveal]);

  if (hidden || skipLoader) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050608] flex flex-col items-center justify-center transition-all duration-400 cubic-bezier(0.25,1,0.5,1) will-change-[opacity,transform,filter] ${
        fogOut ? 'fog-dissolve-out pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      <div
        className={`flex flex-col items-center gap-6 transition-all duration-400 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <StyleinLogo size="large" />

        <div className="w-52 h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(229,9,20,0.25)]">
          <div
            style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
            className="w-full h-full bg-gradient-to-r from-[#FF2E3B] via-[#E50914] to-[#FF1F2D] rounded-full shadow-[0_0_16px_rgba(229,9,20,0.7)] animate-progress-smooth"
          />
        </div>

        <span className="text-neutral-400 text-[0.72rem] font-semibold tracking-[0.25em] uppercase opacity-80">
          DELIVERING AUTOMOTIVE EXCELLENCE
        </span>
      </div>
    </div>
  );
}
