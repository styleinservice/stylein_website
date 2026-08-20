import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchBrands } from '../store/brands/brandsSlice';
import { SmoothScrollProvider, useSmoothScroll } from '../context/SmoothScrollContext';
import StyleinNavbar from '../components/home/StyleinNavbar';
import NavMobileMenu from '../components/home/NavMobileMenu';
import BrandsHero from '../components/brands/BrandsHero';
import BrandsGrid from '../components/brands/BrandsGrid';
import BrandDetailModal from '../components/brands/BrandDetailModal';
import StyleinFooter from '../components/footer/StyleinFooter';

function BrandsPageContent() {
  const dispatch = useDispatch();
  const { items: allBrands, loading, error, fetched } = useSelector((state) => state.brands);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  useEffect(() => {
    if (!fetched) dispatch(fetchBrands());
  }, [dispatch, fetched]);

  useEffect(() => {
    if (allBrands?.length > 0) {
      allBrands.forEach((b) => {
        if (b.image) { const img = new Image(); img.src = b.image; }
      });
    }
  }, [allBrands]);

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

  const activeBrands = allBrands
    ? allBrands.filter((b) => !b.deleted && b.active).sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    : [];

  return (
    <div className="bg-[#05060a] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
      <NavMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Website Canvas: 3D Perspective Scaled Preview Window */}
      <motion.main
        animate={mobileMenuOpen ? { x: '44%', scale: 0.62, borderRadius: '32px', boxShadow: '-25px 0 70px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.18)' } : { x: '0%', scale: 1, borderRadius: '0px', boxShadow: 'none' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => { if (!mobileMenuOpen) setIsMenuAnimating(false); }}
        style={{ transformOrigin: 'center center' }}
        className={`w-full bg-[#030406] z-30 transition-[border-radius] ${isLockedState ? 'h-[100dvh] max-h-[100dvh] overflow-hidden fixed top-0 bottom-0 left-0 right-0 m-auto pointer-events-none lg:pointer-events-auto' : 'relative min-h-screen'}`}
      >
        {mobileMenuOpen && (
          <div aria-label="Scaled website view" className="absolute inset-0 z-[2500] pointer-events-auto cursor-default bg-black/15 select-none" />
        )}

        <div style={{ transform: isLockedState ? `translateY(-${capturedScrollY}px)` : 'none' }} className="w-full">
          <StyleinNavbar isReady={true} mobileMenuOpen={mobileMenuOpen} isMenuSession={isLockedState} onToggleMobileMenu={handleOpenMenu} />
          <div className="relative z-10 w-full flex flex-col items-center bg-[#05060a] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5">
            <BrandsHero />
            <BrandsGrid brands={activeBrands} loading={loading} error={error} onSelectBrand={(b) => setSelectedBrand(b)} />
          </div>
          <StyleinFooter />
        </div>
      </motion.main>

      <AnimatePresence>
        {selectedBrand && <BrandDetailModal brand={selectedBrand} onClose={() => setSelectedBrand(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default function BrandsPage() {
  return (
    <SmoothScrollProvider>
      <BrandsPageContent />
    </SmoothScrollProvider>
  );
}
