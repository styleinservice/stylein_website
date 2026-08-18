import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collections } from '../../data/collections';

export default function ShowcaseLeft({ collection, activeIndex, onSelect }) {
  const isRescue = collection.id === 'rescue';

  return (
    <div className="w-full lg:w-[48%] flex flex-col justify-center z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={`left-${activeIndex}`}
          initial={{ x: -25, opacity: 0, filter: 'blur(6px)' }}
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ x: 25, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 sm:gap-3.5"
        >
          {/* Watermark Number */}
          <span className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black block leading-none select-none tracking-tight text-stylein-red/25">
            {collection.number}
          </span>

          {/* Service Title */}
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.12] uppercase text-white tracking-tight">
            {collection.name}
          </h2>

          {/* Headline / Tagline in Stylein Red */}
          <p className="text-[0.75rem] sm:text-[0.82rem] font-bold tracking-wider uppercase text-stylein-red font-body">
            {collection.headline}
          </p>

          {/* Description */}
          <p className="text-neutral-300/85 text-[0.82rem] sm:text-[0.88rem] leading-relaxed max-w-md font-body">
            {collection.description}
          </p>

          {/* Lightweight Clean Action Buttons with Thin Red Border on Hover */}
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <a
              href="#service-action"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[0.82rem] font-semibold text-white tracking-wide no-underline bg-[#0c0e14]/80 backdrop-blur-xl border border-white/10 hover:border-stylein-red/70 hover:bg-[#12151e] hover:shadow-[0_0_20px_rgba(229,9,20,0.18)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group cursor-pointer"
            >
              <span>{collection.cta}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1 text-white/90 group-hover:text-stylein-red"
              />
            </a>

            {/* Secondary Button for Rescue */}
            {isRescue && collection.ctaSecondary && (
              <a
                href="#learn-more"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.82rem] font-medium text-neutral-300 hover:text-white tracking-wide no-underline bg-transparent border border-white/10 hover:border-stylein-red/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
              >
                <span>{collection.ctaSecondary}</span>
                <ArrowRight size={13} />
              </a>
            )}
          </div>

          {/* Progress Dash Indicators */}
          <div className="flex items-center gap-1.5 mt-2">
            {collections.map((_, i) => (
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
