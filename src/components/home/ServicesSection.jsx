import React, { useState, useEffect, useRef, useCallback } from 'react';
import ServiceIconNav from './ServiceIconNav';
import ServiceContentCard from './ServiceContentCard';
import { useSmoothScroll } from '../../context/SmoothScrollContext';
import { SERVICES_SECTION_DATA } from '../../constants/servicesData';

const TOTAL = SERVICES_SECTION_DATA.length;

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('up');
  const [contentKey, setContentKey] = useState(0);
  const lastScrollY = useRef(0);
  const lenis = useSmoothScroll();

  const updateScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportH = window.innerHeight;

    /* Normalized scroll progress inside section: 0 -> 1 */
    const scrolled = Math.max(0, -rect.top) / Math.max(1, sectionHeight - viewportH);
    const clamped = Math.min(Math.max(scrolled, 0), 0.999);
    const newIndex = Math.floor(clamped * TOTAL);

    const currentScrollY = window.scrollY;
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < TOTAL) {
      setDirection(currentScrollY >= lastScrollY.current ? 'up' : 'down');
      setActiveIndex(newIndex);
      setContentKey((k) => k + 1);
    }

    lastScrollY.current = currentScrollY;
  }, [activeIndex]);

  useEffect(() => {
    if (lenis) {
      lenis.on('scroll', updateScroll);
      return () => lenis.off('scroll', updateScroll);
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [lenis, updateScroll]);

  const handleIconClick = (i) => {
    if (i === activeIndex) return;
    setDirection(i > activeIndex ? 'up' : 'down');
    setActiveIndex(i);
    setContentKey((k) => k + 1);

    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewportH = window.innerHeight;
    const targetScroll = sectionTop + (i / TOTAL) * (sectionHeight - viewportH) + 5;

    if (lenis) {
      lenis.scrollTo(targetScroll, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services-showcase"
      style={{ height: `${TOTAL * 100}vh` }}
      className="relative bg-[#07080a]"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-between overflow-hidden">
        {/* Top ambient fade */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#07080a] to-transparent z-10 pointer-events-none" />

        {/* Service icon nav — pinned at top */}
        <div className="relative z-20 pt-24 sm:pt-28 pb-4 w-full max-w-[900px] px-4">
          <ServiceIconNav activeIndex={activeIndex} onSelect={handleIconClick} />

          {/* Smooth progress bar */}
          <div className="mt-3 mx-auto w-full max-w-[520px] h-[2px] bg-white/[0.06] relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-stylein-red/60 via-stylein-red to-[#ff2a37] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full shadow-[0_0_10px_rgba(229,9,20,0.5)]"
              style={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
            />
          </div>
        </div>

        {/* Dynamic content card */}
        <div className="flex-1 flex items-center justify-center w-full relative z-10 py-4">
          <ServiceContentCard
            key={contentKey}
            service={SERVICES_SECTION_DATA[activeIndex]}
            direction={direction}
            currentIndex={activeIndex + 1}
            totalServices={TOTAL}
          />
        </div>

        {/* Bottom ambient fade */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
