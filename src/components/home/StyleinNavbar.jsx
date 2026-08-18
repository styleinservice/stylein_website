import React, { useState, useEffect, useRef } from 'react';
import StyleinLogo from '../common/StyleinLogo';
import NavMobileMenu from './NavMobileMenu';
import ServicesDropdown from './ServicesDropdown';
import LanguageDropdown from './LanguageDropdown';
import { NAV_LINKS } from '../../constants/heroData';
import { ChevronDown, Globe, Menu, LifeBuoy } from 'lucide-react';

export default function StyleinNavbar({ isReady = true }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const sTimeout = useRef(null);
  const lTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY <= 60;
      setIsAtTop(top);
      if (top) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleHover = (type, open) => {
    const ref = type === 'srv' ? sTimeout : lTimeout;
    const setter = type === 'srv' ? setServicesOpen : setLangOpen;
    if (ref.current) clearTimeout(ref.current);
    if (open) setter(true);
    else ref.current = setTimeout(() => setter(false), 250);
  };

  const showNavbar = (isAtTop || isMenuOpen) && isReady;

  return (
    <>
      {/* Top-Left Floating Menu Button in Smoky Liquid Glass with Dark Border */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? 'Close Navigation' : 'Open Navigation'}
        className={`fixed top-5 left-5 z-[2000] w-[50px] h-[50px] rounded-2xl bg-[#0a0c12]/60 hover:bg-[#0a0c12]/85 backdrop-blur-3xl border border-white/[0.08] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAtTop || !isReady ? 'opacity-0 scale-75 pointer-events-none -translate-x-4' : 'opacity-100 scale-100 pointer-events-auto translate-x-0'
        }`}
      >
        <div className="relative w-5 h-4 flex items-center justify-center pointer-events-none">
          <span className={`absolute h-[2px] bg-white rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'w-4 rotate-45 translate-y-0' : 'w-5 -translate-y-1.5'}`} />
          <span className={`absolute h-[2px] bg-white rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'w-4 -rotate-45 translate-y-0' : 'w-5 translate-y-1.5'}`} />
        </div>
      </button>

      {/* Floating Smoky Liquid Glassy Navbar with Dark Hairline Border */}
      <header
        className={`fixed top-5 z-[1990] backdrop-blur-3xl border border-white/[0.08] hover:border-white/[0.16] rounded-2xl px-5 py-2.5 sm:py-3 flex items-center justify-between gap-6 bg-[#0b0d14]/65 hover:bg-[#0b0d14]/80 shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-visible transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAtTop
            ? 'left-1/2 -translate-x-1/2 w-[90%] max-w-[830px]'
            : 'left-[76px] w-[calc(100%-92px)] max-w-[810px] xl:left-1/2 xl:-translate-x-1/2'
        } ${
          showNavbar
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-95 pointer-events-none -translate-y-6'
        }`}
      >
        <StyleinLogo />

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4.5">
          {NAV_LINKS.map((link) => {
            const isServices = link.id === 'services';
            return (
              <div
                key={link.id}
                className="relative py-1"
                onMouseEnter={isServices ? () => handleHover('srv', true) : undefined}
                onMouseLeave={isServices ? () => handleHover('srv', false) : undefined}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (isServices) { e.preventDefault(); setServicesOpen((p) => !p); }
                  }}
                  className={`text-neutral-200 text-[0.86rem] font-medium no-underline inline-flex items-center gap-1.5 relative group hover:text-white transition-colors cursor-pointer ${isServices && servicesOpen ? 'text-white' : ''}`}
                >
                  <span>{link.label}</span>
                  {link.hasSubmenu && <ChevronDown size={13} className={`opacity-70 transition-transform ${isServices && servicesOpen ? 'rotate-180 text-stylein-red opacity-100' : 'group-hover:opacity-100'}`} />}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-stylein-red transition-all duration-300 rounded-full ${isServices && servicesOpen ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
                {isServices && servicesOpen && <ServicesDropdown onClose={() => setServicesOpen(false)} />}
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3.5">
          <div className="relative py-1 hidden lg:block" onMouseEnter={() => handleHover('lang', true)} onMouseLeave={() => handleHover('lang', false)}>
            <button onClick={() => setLangOpen((p) => !p)} className={`flex items-center gap-1.5 bg-transparent border-none text-neutral-200 text-[0.84rem] font-medium cursor-pointer hover:text-white transition-colors ${langOpen ? 'text-white' : ''}`}>
              <Globe size={13} className="opacity-80" />
              <span>{currentLang}</span>
              <ChevronDown size={11} className={`opacity-70 transition-transform ${langOpen ? 'rotate-180 text-stylein-red opacity-100' : ''}`} />
            </button>
            {langOpen && <LanguageDropdown currentLang={currentLang} onSelectLang={(l) => setCurrentLang(l)} onClose={() => setLangOpen(false)} />}
          </div>

          <a href="#rescue" className="hidden lg:inline-flex items-center gap-1.5 text-[#FF3B47] text-[0.84rem] font-semibold no-underline hover:text-[#ff5c66] transition-colors relative group">
            <LifeBuoy size={15} className="group-hover:scale-110 transition-transform" />
            <span>Rescue me!</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B47] animate-ping absolute -top-0.5 -right-1.5 opacity-75" />
          </a>

          <a href="#download" className="inline-flex items-center justify-center bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] bg-[length:200%_auto] hover:bg-right text-white px-4 py-2 rounded-xl text-[0.82rem] font-semibold no-underline shadow-[0_2px_15px_rgba(229,9,20,0.4)] hover:shadow-[0_4px_25px_rgba(229,9,20,0.6)] hover:-translate-y-0.5 transition-all duration-300">
            Download app
          </a>

          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden bg-transparent border-none text-white cursor-pointer p-1">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <NavMobileMenu isOpen={mobileMenuOpen} currentLang={currentLang} onSelectLang={(l) => setCurrentLang(l)} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
