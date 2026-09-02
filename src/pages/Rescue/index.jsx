import React, { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, MotionConfig } from 'framer-motion';
import { fetchRescuePage } from '../../store/rescue/rescueSlice';
import { SmoothScrollProvider, useSmoothScroll } from '../../context/SmoothScrollContext';
import { RouteMotionProvider, useRouteMotion } from '../../context/HomeMotionContext';
import StyleinNavbar from '../../components/home/StyleinNavbar';
import NavMobileMenu from '../../components/home/NavMobileMenu';
import RescueHero from '../../components/rescue/RescueHero';
import DetailCardCarousel from '../../components/service-detail/DetailCardCarousel';
import DetailGetStarted from '../../components/service-detail/DetailGetStarted';
import DetailReviews from '../../components/service-detail/DetailReviews';
import DetailFAQ from '../../components/service-detail/DetailFAQ';
import RescueSkeleton from '../../components/rescue/RescueSkeleton';
import RescueError from '../../components/rescue/RescueError';
import StyleinFooter from '../../components/footer/StyleinFooter';

function RescuePageContent() {
  const dispatch = useDispatch();
  const isFirstVisit = useRouteMotion();
  const { data, loading, fetched, error } = useSelector((state) => state.rescue);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  const loadData = useCallback(() => {
    dispatch(fetchRescuePage());
  }, [dispatch]);

  useEffect(() => {
    if (!data && !fetched) loadData();
  }, [data, fetched, loadData]);

  useEffect(() => {
    document.title = 'STYLEIN Rescue Services | 24/7 Roadside Assistance';
    if (data?.description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', data.description.slice(0, 160));
    }
  }, [data]);

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

  const hasRescueServices = Array.isArray(data?.rescueServices) && data.rescueServices.length > 0;

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
          <MotionConfig reducedMotion={!isFirstVisit ? 'always' : 'user'} transition={!isFirstVisit ? { duration: 0, delay: 0 } : undefined}>
            <div className="relative z-10 w-full bg-[#050505] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5 pt-22 sm:pt-26 lg:pt-28 rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[48px] lg:rounded-b-[56px] overflow-hidden">
              {loading && !data ? (
                <RescueSkeleton />
              ) : error && !data ? (
                <RescueError onRetry={loadData} />
              ) : (
                <>
                  <RescueHero heroServices={data?.heroServices} description={data?.description} />
                  {hasRescueServices && <DetailCardCarousel items={data.rescueServices} />}
                  <DetailGetStarted getStarted={data?.getStarted} serviceTitle="Rescue" />
                  <DetailReviews />
                  <DetailFAQ questions={data?.questionsAnswered} />
                </>
              )}
            </div>
          </MotionConfig>
          <StyleinFooter />
        </div>
      </motion.main>
    </div>
  );
}

export default function RescuePage() {
  return (
    <SmoothScrollProvider>
      <RouteMotionProvider routeKey="rescue">
        <RescuePageContent />
      </RouteMotionProvider>
    </SmoothScrollProvider>
  );
}
