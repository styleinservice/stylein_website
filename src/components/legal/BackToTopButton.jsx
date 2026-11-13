import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '../../context/SmoothScrollContext';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const lenis = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      setVisible(scroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#0a0c12]/90 border border-white/20 text-white hover:text-stylein-red hover:border-stylein-red/50 transition-all shadow-lg active:scale-95 cursor-pointer"
    >
      <ArrowUp size={18} />
    </button>
  );
}
