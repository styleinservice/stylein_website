import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { SmoothScrollProvider, useSmoothScroll } from '../../context/SmoothScrollContext';
import StyleinNavbar from '../../components/home/StyleinNavbar';
import NavMobileMenu from '../../components/home/NavMobileMenu';
import DetailHero from '../../components/service-detail/DetailHero';
import DetailCardCarousel from '../../components/service-detail/DetailCardCarousel';
import DetailStorySpotlight from '../../components/service-detail/DetailStorySpotlight';
import DetailGetStarted from '../../components/service-detail/DetailGetStarted';
import DetailReviews from '../../components/service-detail/DetailReviews';
import DetailFAQ from '../../components/service-detail/DetailFAQ';
import DetailSkeleton from '../../components/service-detail/DetailSkeleton';
import DetailError from '../../components/service-detail/DetailError';
import StyleinFooter from '../../components/footer/StyleinFooter';

const detailCache = new Map();
function getCachedDetail(id) {
  if (detailCache.has(id)) return detailCache.get(id);
  try {
    const s = sessionStorage.getItem(`stylein_detail_${id}`);
    if (s) { const p = JSON.parse(s); detailCache.set(id, p); return p; }
  } catch (_) {}
  return null;
}

function ServiceDetailContent() {
  const { id } = useParams();
  const cached = getCachedDetail(id);
  const [service, setService] = useState(() => cached || null);
  const [loading, setLoading] = useState(() => !cached);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  const fetchServiceDetail = useCallback(async () => {
    const existing = getCachedDetail(id);
    if (existing) { setService(existing); setLoading(false); return; }
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/service/${id}`);
      if (response.data && response.data.success !== false) {
        const data = response.data.data || response.data.service || response.data;
        detailCache.set(id, data);
        try { sessionStorage.setItem(`stylein_detail_${id}`, JSON.stringify(data)); } catch (_) {}
        setService(data);
      } else {
        setService(null);
        setError(response.data?.message || 'Service not found');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load service');
      setService(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchServiceDetail(); }, [fetchServiceDetail]);

  useEffect(() => {
    if (service) {
      document.title = `${service.title || service.serviceName || 'Service'} | STYLEIN`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && service.description) meta.setAttribute('content', service.description.slice(0, 160));
    }
  }, [service]);

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

  return (
    <div className="bg-[#050505] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
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

          <div className="relative z-10 w-full flex flex-col items-center bg-[#040406] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5 rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[48px] lg:rounded-b-[56px] overflow-hidden">
            {loading ? <DetailSkeleton /> : error ? <DetailError error={error} onRetry={fetchServiceDetail} /> : service ? (
              <>
                <DetailHero service={service} />
                <DetailCardCarousel service={service} />
                <DetailStorySpotlight service={service} />
                <DetailGetStarted service={service} />
                <DetailReviews service={service} />
                <DetailFAQ service={service} />
              </>
            ) : null}
          </div>

          <StyleinFooter />
        </div>
      </motion.main>
    </div>
  );
}

export default function ServiceDetailPage() {
  return (
    <SmoothScrollProvider>
      <ServiceDetailContent />
    </SmoothScrollProvider>
  );
}
