import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { SmoothScrollProvider, useSmoothScroll } from '../../context/SmoothScrollContext';
import StyleinNavbar from '../../components/home/StyleinNavbar';
import NavMobileMenu from '../../components/home/NavMobileMenu';
import StyleinFooter from '../../components/footer/StyleinFooter';
import LegalSEO from '../../components/legal/LegalSEO';
import LegalHeader from '../../components/legal/LegalHeader';
import LegalTOC from '../../components/legal/LegalTOC';
import LegalDocumentView from '../../components/legal/LegalDocumentView';
import BackToTopButton from '../../components/legal/BackToTopButton';

function LegalPageContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();
  const [activeId, setActiveId] = useState('introduction');
  const isInitialScrollDone = useRef(false);

  const handleOpenMenu = () => {
    const scroll = lenis?.scroll ?? window.scrollY ?? 0;
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
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target, { immediate: true });
        lenis.start();
      }
    }
  }, [isLockedState, mobileMenuOpen, lenis]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -24, duration: 0.9 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    window.history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  const handleItemClick = (id, e) => {
    if (e) e.preventDefault();
    scrollToId(id);
  };

  useEffect(() => {
    if (isInitialScrollDone.current) return;
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const timer = setTimeout(() => {
        scrollToId(hash);
        isInitialScrollDone.current = true;
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [lenis]);

  useEffect(() => {
    const handleScroll = () => {
      const articles = document.querySelectorAll('article[data-section-id]');
      let current = '';
      articles.forEach((art) => {
        if (art.getBoundingClientRect().top <= 60) {
          current = art.getAttribute('data-section-id');
        }
      });
      if (current && current !== activeId) {
        setActiveId(current);
        window.history.replaceState(null, '', `#${current}`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  const menuAnim = mobileMenuOpen
    ? { x: '44%', scale: 0.62, borderRadius: '32px', boxShadow: '-25px 0 70px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.18)' }
    : { x: '0%', scale: 1, borderRadius: '0px', boxShadow: 'none' };

  return (
    <div className="bg-[#05060a] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
      <LegalSEO />
      <NavMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <motion.main
        animate={menuAnim}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => { if (!mobileMenuOpen) setIsMenuAnimating(false); }}
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
            <LegalHeader />
            <LegalTOC activeId={activeId} onItemClick={handleItemClick} />
            <LegalDocumentView />
          </div>

          <StyleinFooter />
        </div>
      </motion.main>

      <BackToTopButton />
    </div>
  );
}

export default function LegalPage() {
  return (
    <SmoothScrollProvider>
      <LegalPageContent />
    </SmoothScrollProvider>
  );
}
