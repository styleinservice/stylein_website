import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { SmoothScrollProvider, useSmoothScroll } from '../context/SmoothScrollContext';
import StyleinLoader from '../components/home/StyleinLoader';
import StyleinNavbar from '../components/home/StyleinNavbar';
import NavMobileMenu from '../components/home/NavMobileMenu';
import HeroSection from '../components/home/HeroSection';
import CollectionsShowcase from '../components/showcase/CollectionsShowcase';
import FeaturedBrandsShowcase from '../components/brands/FeaturedBrandsShowcase';
import AppShowcaseSection from '../components/app-showcase/AppShowcaseSection';
import FAQSection from '../components/faq/FAQSection';
import TestimonialsSection from '../components/testimonials/TestimonialsSection';
import GetAppBanner from '../components/download-banner/GetAppBanner';
import StyleinFooter from '../components/footer/StyleinFooter';

function HomeContent() {
  const [isReady, setIsReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const [currentLang, setCurrentLang] = useState('EN');
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  const handleOpenMenu = () => {
    const scroll = lenis?.scroll ?? window.scrollY ?? document.documentElement.scrollTop ?? 0;
    savedScrollRef.current = scroll;
    setCapturedScrollY(scroll);
    setIsMenuAnimating(true);
    setMobileMenuOpen(true);
    lenis?.stop();
  };

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleAnimationComplete = () => {
    if (!mobileMenuOpen) {
      setIsMenuAnimating(false);
    }
  };

  const isLockedState = mobileMenuOpen || isMenuAnimating;

  // Synchronous pre-paint restoration eliminating any 1-frame Hero blink
  useLayoutEffect(() => {
    if (!isLockedState && !mobileMenuOpen) {
      const target = savedScrollRef.current;
      window.scrollTo(0, target);
      document.documentElement.scrollTop = target;
      document.body.scrollTop = target;
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target, { immediate: true });
        lenis.start();
      }
    }
  }, [isLockedState, mobileMenuOpen, lenis]);

  return (
    <div className="bg-[#05060a] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
      <div className="fixed top-1/4 left-10 w-[300px] h-[300px] rounded-full blur-[140px] bg-stylein-red/10 pointer-events-none z-0" />

      <StyleinLoader onStartReveal={() => setIsReady(true)} onComplete={() => setIsReady(true)} />

      <NavMobileMenu isOpen={mobileMenuOpen} currentLang={currentLang} onSelectLang={(l) => setCurrentLang(l)} onClose={handleCloseMenu} />

      {/* Main Website Canvas: Viewport-Fixed Centered Floating Window */}
      <motion.main
        animate={
          mobileMenuOpen
            ? {
                x: '44%',
                scale: 0.62,
                borderRadius: '32px',
                boxShadow: '-25px 0 70px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.18)',
              }
            : {
                x: '0%',
                scale: 1,
                borderRadius: '0px',
                boxShadow: 'none',
              }
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={handleAnimationComplete}
        style={{ transformOrigin: 'center center' }}
        className={`w-full bg-[#030406] z-30 transition-[border-radius] ${
          isLockedState
            ? 'h-[100dvh] max-h-[100dvh] overflow-hidden fixed top-0 bottom-0 left-0 right-0 m-auto pointer-events-none lg:pointer-events-auto'
            : 'relative min-h-screen'
        }`}
      >
        {mobileMenuOpen && (
          <div aria-label="Scaled website view" className="absolute inset-0 z-[2500] pointer-events-auto cursor-default bg-black/15 select-none" />
        )}

        <div style={{ transform: isLockedState ? `translateY(-${capturedScrollY}px)` : 'none' }} className="w-full">
          <StyleinNavbar
            isReady={isReady}
            mobileMenuOpen={mobileMenuOpen}
            isMenuSession={isLockedState}
            onToggleMobileMenu={handleOpenMenu}
          />
          <div className="relative z-10 bg-[#07080a] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5">
            <HeroSection isReady={isReady} />
            <CollectionsShowcase />
            <FeaturedBrandsShowcase />
            <AppShowcaseSection />
            <FAQSection />
            <TestimonialsSection />
            <GetAppBanner />
          </div>
          <StyleinFooter />
        </div>
      </motion.main>
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <HomeContent />
    </SmoothScrollProvider>
  );
}
