import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const lenisInstance = new Lenis({
      duration: isTouch ? 0.9 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: true,
      syncTouchLerp: 0.1,
      infinite: false,
    });

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
