import React, { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { SmoothScrollProvider, useSmoothScroll } from '../../context/SmoothScrollContext';
import StyleinNavbar from '../../components/home/StyleinNavbar';
import NavMobileMenu from '../../components/home/NavMobileMenu';
import ServicesHero from '../../components/services/ServicesHero';
import ServiceCard from '../../components/services/ServiceCard';
import ServicesSkeleton from '../../components/services/ServicesSkeleton';
import ServicesErrorState from '../../components/services/ServicesErrorState';
import StyleinFooter from '../../components/footer/StyleinFooter';
import SEO from '../../components/common/SEO';

let cachedServices = null;
try {
  const stored = sessionStorage.getItem('stylein_services_catalog_cache');
  if (stored) cachedServices = JSON.parse(stored);
} catch (_) {}

function ServicesContent() {
  const [services, setServices] = useState(() => cachedServices || []);
  const [loading, setLoading] = useState(() => !cachedServices || cachedServices.length === 0);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  const fetchServices = useCallback(async () => {
    if (cachedServices && cachedServices.length > 0) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/service');
      const data = response.data?.data || [];
      cachedServices = data;
      try {
        sessionStorage.setItem('stylein_services_catalog_cache', JSON.stringify(data));
      } catch (_) {}
      setServices(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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
      if (lenis) { lenis.resize(); lenis.scrollTo(target, { immediate: true }); lenis.start(); }
    }
  }, [isLockedState, mobileMenuOpen, lenis]);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const q = searchQuery.toLowerCase();
    return services.filter((s) => s.title?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q));
  }, [services, searchQuery]);

  return (
    <div className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
      <SEO pageKey="services" />
      <NavMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <motion.main
        animate={mobileMenuOpen ? { x: '44%', scale: 0.62, borderRadius: '32px', boxShadow: '-25px 0 70px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.18)' } : { x: '0%', scale: 1, borderRadius: '0px', boxShadow: 'none' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => { if (!mobileMenuOpen) setIsMenuAnimating(false); }}
        style={{ transformOrigin: 'center center' }}
        className={`w-full bg-[#030406] z-30 transition-[border-radius] ${isLockedState ? 'h-[100dvh] max-h-[100dvh] overflow-hidden fixed top-0 bottom-0 left-0 right-0 m-auto pointer-events-none lg:pointer-events-auto' : 'relative min-h-screen'}`}
      >
        {mobileMenuOpen && <div aria-label="Scaled website view" className="absolute inset-0 z-[2500] pointer-events-auto cursor-default bg-black/15 select-none" />}

        <div style={{ transform: isLockedState ? `translateY(-${capturedScrollY}px)` : 'none' }} className="w-full">
          <StyleinNavbar isReady={true} mobileMenuOpen={mobileMenuOpen} isMenuSession={isLockedState} onToggleMobileMenu={handleOpenMenu} />

          <div className="relative z-10 w-full flex flex-col items-center bg-[#040406] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5 rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[48px] lg:rounded-b-[56px] overflow-hidden pb-16 sm:pb-20">
            <ServicesHero
              totalCount={services.length}
              filteredCount={filteredServices.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              loading={loading}
            />

            <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              {loading ? (
                <ServicesSkeleton />
              ) : error ? (
                <ServicesErrorState error={error} onRetry={fetchServices} />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4.5 lg:gap-5">
                  {filteredServices.map((service, index) => (
                    <ServiceCard key={service._id || service.id || index} service={service} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <StyleinFooter />
        </div>
      </motion.main>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <SmoothScrollProvider>
      <ServicesContent />
    </SmoothScrollProvider>
  );
}
