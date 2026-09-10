import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getServiceSlug } from '../../utils/serviceSlug';

export default function ShowcaseLeft({ collection, services = [], activeIndex, onSelect }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  if (!collection) return null;

  const isRescue = collection.id === 'rescue' || collection.isRescue || collection.name?.toLowerCase().includes('rescue') || collection.title?.toLowerCase().includes('rescue');
  const isTyres = collection.name?.toLowerCase().includes('tyre') || collection.title?.toLowerCase().includes('tyre');

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (isRescue || isTyres) {
      navigate('/rescue');
    } else {
      const slug = getServiceSlug(collection);
      navigate(slug ? `/services/${slug}` : '/services');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      <AnimatePresence mode="wait">
        <motion.div
          key={`left-${activeIndex}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.24, ease: 'easeIn' } }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3 sm:gap-3.5 items-center lg:items-start w-full will-change-transform"
        >
          {/* Watermark Number */}
          <span className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black block leading-none select-none tracking-tight text-stylein-red/25">
            {collection.number}
          </span>

          {/* Service Title */}
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.12] uppercase text-white tracking-tight">
            {collection.title}
          </h2>

          {/* Headline / Tagline */}
          <p className="text-[0.75rem] sm:text-[0.82rem] font-bold tracking-wider uppercase text-stylein-red font-body">
            {collection.redline}
          </p>

          {/* Description */}
          <div className="max-w-md font-body flex flex-col items-center lg:items-start">
            <p className={`text-neutral-300/85 text-[0.82rem] sm:text-[0.88rem] leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-1 lg:line-clamp-none'}`}>
              {collection.description}
            </p>
            <button
              onClick={() => setIsExpanded((p) => !p)}
              className="lg:hidden text-neutral-400 hover:text-neutral-200 text-[0.74rem] font-medium mt-1 bg-transparent border-none p-0 cursor-pointer inline-flex items-center gap-1 hover:underline active:scale-95 transition-colors"
            >
              <span>{isExpanded ? 'Show less' : 'View more...'}</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} text-neutral-400`} />
            </button>
          </div>

          {/* Action CTA Button */}
          <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 flex-wrap w-full">
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[0.82rem] font-semibold text-white tracking-wide no-underline bg-[#0c0e14]/80 backdrop-blur-xl border border-white/10 hover:border-stylein-red/70 hover:bg-[#12151e] hover:shadow-[0_0_20px_rgba(229,9,20,0.18)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group cursor-pointer"
            >
              <span>{collection.buttonText || collection.cta || 'Discover Service'}</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-white/90 group-hover:text-stylein-red" />
            </button>
          </div>

          {/* Progress Dash Indicators: Hidden on mobile */}
          <div className="hidden lg:flex items-center justify-start gap-1.5 mt-2 w-full">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                aria-label={`Jump to service ${i + 1}`}
                className="h-1 rounded-full transition-all duration-300 cursor-pointer border-none p-0"
                style={{
                  width: i === activeIndex ? '32px' : '10px',
                  backgroundColor: i === activeIndex ? '#e50914' : 'rgba(255,255,255,0.2)',
                  boxShadow: i === activeIndex ? '0 0 10px rgba(229,9,20,0.8)' : 'none',
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
