import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StyleinLogo from '../common/StyleinLogo';
import NavDesktopLinks from './NavDesktopLinks';
import { LifeBuoy } from 'lucide-react';

export default function StyleinNavbar({ isReady = true, mobileMenuOpen, isMenuSession = false, onToggleMobileMenu }) {
  const navigate = useNavigate();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);

  const lastScrollY = useRef(0);
  const frozenStateRef = useRef({ isAtTop: true, mobileVisible: true });
  const sTimeout = useRef(null);

  useEffect(() => {
    if (isMenuSession) {
      frozenStateRef.current = { isAtTop, mobileVisible };
    } else {
      const cur = window.scrollY || document.documentElement.scrollTop || 0;
      lastScrollY.current = cur;
      setIsAtTop(cur <= 60);
    }
  }, [isMenuSession]);

  useEffect(() => {
    const onScroll = () => {
      if (isMenuSession) return;
      const cur = window.scrollY || document.documentElement.scrollTop || 0;
      const top = cur <= 60;
      setIsAtTop(top);
      if (top) {
        setIsMenuOpen(false);
        setMobileVisible(true);
      } else {
        const diff = cur - lastScrollY.current;
        if (diff > 8) setMobileVisible(false);
        else if (diff < -8) setMobileVisible(true);
      }
      lastScrollY.current = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuSession]);

  const handleHover = (type, open) => {
    if (sTimeout.current) clearTimeout(sTimeout.current);
    if (open) setServicesOpen(true);
    else sTimeout.current = setTimeout(() => setServicesOpen(false), 250);
  };

  const activeTop = isMenuSession ? frozenStateRef.current.isAtTop : isAtTop;
  const activeMobileVisible = isMenuSession ? frozenStateRef.current.mobileVisible : mobileVisible;
  const isDesktopVisible = (activeTop || isMenuOpen) && isReady;
  const isMobileShown = activeMobileVisible || activeTop;

  return (
    <>
      <motion.button
        onClick={() => setIsMenuOpen((p) => !p)}
        aria-label={isMenuOpen ? 'Close Navigation' : 'Open Navigation'}
        initial={{ opacity: 0, scale: 0.75, x: -20 }}
        animate={activeTop || !isReady ? { opacity: 0, scale: 0.75, x: -20, pointerEvents: 'none' } : { opacity: 1, scale: 1, x: 0, pointerEvents: 'auto' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed top-5 left-5 z-[2000] w-[50px] h-[50px] rounded-2xl bg-[#0a0c12]/70 hover:bg-[#0a0c12]/90 backdrop-blur-3xl border border-white/[0.08] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
      >
        <div className="relative w-5 h-4 flex items-center justify-center pointer-events-none">
          <span className={`absolute h-[2px] bg-white rounded-full transition-transform duration-400 ${isMenuOpen ? 'w-4 rotate-45 translate-y-0' : 'w-5 -translate-y-1.5'}`} />
          <span className={`absolute h-[2px] bg-white rounded-full transition-transform duration-400 ${isMenuOpen ? 'w-4 -rotate-45 translate-y-0' : 'w-5 translate-y-1.5'}`} />
        </div>
      </motion.button>

      <header
        className={`fixed top-4 sm:top-5 z-[1990] backdrop-blur-3xl border border-white/[0.08] hover:border-white/[0.16] rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-4 sm:gap-6 bg-[#0b0d14]/75 hover:bg-[#0b0d14]/85 shadow-[0_15px_40px_rgba(0,0,0,0.55)] ${
          isMenuSession ? '!transition-none' : 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
        } ${
          activeTop
            ? 'left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] max-w-[830px] lg:absolute lg:top-5'
            : 'left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] max-w-[830px] lg:fixed lg:top-5 lg:left-[76px] lg:translate-x-0 lg:w-[calc(100%-92px)] lg:max-w-[810px] xl:left-1/2 xl:-translate-x-1/2'
        } ${isDesktopVisible ? 'lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto' : 'lg:opacity-0 lg:-translate-y-8 lg:pointer-events-none'} ${
          isMobileShown ? 'max-lg:opacity-100 max-lg:translate-y-0 max-lg:pointer-events-auto' : 'max-lg:opacity-0 max-lg:-translate-y-24 max-lg:pointer-events-none'
        }`}
      >
        <button onClick={onToggleMobileMenu} aria-label="Open Mobile Menu" className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center cursor-pointer transition-colors active:scale-95 shrink-0">
          <div className="relative w-5 h-4 flex items-center justify-center pointer-events-none">
            <span className="absolute h-[2px] w-5 bg-white rounded-full -translate-y-1.5" />
            <span className="absolute h-[2px] w-5 bg-white rounded-full translate-y-1.5" />
          </div>
        </button>

        <div className="flex-1 lg:flex-initial flex justify-center lg:justify-start items-center">
          <StyleinLogo />
        </div>

        <a
          href="/rescue"
          onClick={(e) => {
            e.preventDefault();
            navigate('/rescue');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Rescue me"
          className="lg:hidden w-10 h-10 rounded-xl bg-[#FF3B47]/10 hover:bg-[#FF3B47]/20 border border-[#FF3B47]/30 flex items-center justify-center text-[#FF3B47] no-underline transition-all active:scale-95 shrink-0 relative cursor-pointer"
        >
          <LifeBuoy size={18} className="text-[#FF3B47]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B47] animate-ping absolute top-1 right-1 opacity-80 pointer-events-none" />
        </a>

        <NavDesktopLinks servicesOpen={servicesOpen} setServicesOpen={setServicesOpen} handleHover={handleHover} />

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/rescue"
            onClick={(e) => {
              e.preventDefault();
              navigate('/rescue');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-[#FF3B47] text-[0.84rem] font-semibold no-underline hover:text-[#ff5c66] transition-colors relative group cursor-pointer"
          >
            <LifeBuoy size={15} className="group-hover:scale-110 transition-transform" />
            <span>Rescue me!</span>
            <span className="w-2 h-2 rounded-full bg-[#FF3B47] animate-ping absolute -top-0.5 -right-1 opacity-80 pointer-events-none" />
          </a>

          <a href="#download" className="inline-flex items-center justify-center bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] bg-[length:200%_auto] hover:bg-right text-white px-4 py-2 rounded-xl text-[0.82rem] font-semibold no-underline shadow-[0_2px_15px_rgba(229,9,20,0.4)] hover:shadow-[0_4px_25px_rgba(229,9,20,0.6)] hover:-translate-y-0.5 transition-all duration-300">
            Download app
          </a>
        </div>
      </header>
    </>
  );
}
