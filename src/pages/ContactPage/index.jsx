import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SmoothScrollProvider, useSmoothScroll } from '../../context/SmoothScrollContext';
import StyleinNavbar from '../../components/home/StyleinNavbar';
import NavMobileMenu from '../../components/home/NavMobileMenu';
import StyleinFooter from '../../components/footer/StyleinFooter';

import ContactHero from '../../components/contact/ContactHero';
import ContactCards from '../../components/contact/ContactCards';
import ContactForm from '../../components/contact/ContactForm';
import ContactHoursMap from '../../components/contact/ContactHoursMap';
import ContactEmergencyStrip from '../../components/contact/ContactEmergencyStrip';

function ContactPageContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  useEffect(() => {
    document.title = 'Contact Us | STYLEIN Automotive UAE';
    window.scrollTo(0, 0);
  }, []);

  const handleOpenMenu = () => {
    const scroll = lenis?.scroll ?? window.scrollY ?? document.documentElement.scrollTop ?? 0;
    savedScrollRef.current = scroll;
    setCapturedScrollY(scroll);
    setIsMenuAnimating(true);
    setMobileMenuOpen(true);
    lenis?.stop();
  };

  const isLockedState = mobileMenuOpen || isMenuAnimating;

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
    <div className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
      <NavMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <motion.main
        animate={
          mobileMenuOpen
            ? {
                x: '44%',
                scale: 0.62,
                borderRadius: '32px',
                boxShadow: '-25px 0 70px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.18)',
              }
            : { x: '0%', scale: 1, borderRadius: '0px', boxShadow: 'none' }
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (!mobileMenuOpen) setIsMenuAnimating(false);
        }}
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
            isReady={true}
            mobileMenuOpen={mobileMenuOpen}
            isMenuSession={isLockedState}
            onToggleMobileMenu={handleOpenMenu}
          />

          <div className="relative z-10 w-full flex flex-col items-center bg-[#040406] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5 rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[48px] lg:rounded-b-[56px] overflow-hidden pb-16 sm:pb-24">
            <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
              <ContactHero />
              <ContactCards />

              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-7 w-full">
                  <ContactForm />
                </div>
                <div className="lg:col-span-5 w-full">
                  <ContactHoursMap />
                </div>
              </div>

              <ContactEmergencyStrip />
            </div>
          </div>

          <StyleinFooter />
        </div>
      </motion.main>
    </div>
  );
}

export default function ContactPage() {
  return (
    <SmoothScrollProvider>
      <ContactPageContent />
    </SmoothScrollProvider>
  );
}
