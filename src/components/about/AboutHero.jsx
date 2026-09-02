import React from 'react';
import { motion } from 'framer-motion';

const CLOUDINARY_VIDEO_URL =
  'https://res.cloudinary.com/hrd4p6l8/video/upload/f_auto,q_auto/v1788351643/WEBSITE_PAGE_VIDEO.mp4';
const CLOUDINARY_VIDEO_FALLBACK =
  'https://res.cloudinary.com/hrd4p6l8/video/upload/v1788351643/WEBSITE_PAGE_VIDEO.mp4';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const subheadlineVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AboutHero() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden flex items-center justify-center bg-[#040406] select-none z-10">
      {/* Solid Opaque Backing */}
      <div className="absolute inset-0 bg-[#040406] z-0" />

      {/* 1. Fullscreen Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-1 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
        >
          <source src={CLOUDINARY_VIDEO_URL} type="video/mp4" />
          <source src={CLOUDINARY_VIDEO_FALLBACK} type="video/mp4" />
        </video>

        {/* Minimal Soft Dark Overlay */}
        <div className="absolute inset-0 bg-black/15 z-10" />

        {/* Ultra-Subtle Edge Vignette */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(4,4,6,0.02) 0%, rgba(4,4,6,0.4) 85%, #040406 100%)',
          }}
        />

        {/* Top Atmospheric Fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#040406]/50 to-transparent z-20 pointer-events-none" />

        {/* Bottom Smooth Dark Gradient Fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 sm:h-56 bg-gradient-to-t from-[#040406] via-[#040406]/85 to-transparent z-20 pointer-events-none" />
      </div>

      {/* 2. Centered Elegant Typography Overlay */}
      <div className="relative z-30 max-w-[1140px] mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center pt-24 sm:pt-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Subtle Category Tag */}
          <motion.div variants={subheadlineVariants} className="mb-4">
            <span className="font-heading text-[0.7rem] sm:text-xs font-semibold tracking-[0.25em] text-neutral-300 uppercase px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
              THE VISION BEHIND STYLEIN
            </span>
          </motion.div>

          {/* Luxury Main Statement */}
          <motion.h1
            variants={headlineVariants}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.12] sm:leading-[1.1] uppercase"
          >
            Pioneering The Future <br className="hidden sm:inline" />
            Of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red font-extrabold">
              Automotive Luxury
            </span>
          </motion.h1>

          {/* Poetic Sub-copy */}
          <motion.p
            variants={subheadlineVariants}
            className="font-body text-neutral-300/80 text-xs sm:text-sm md:text-[0.98rem] max-w-xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal"
          >
            Where cutting-edge technology meets uncompromising artisanal craftsmanship to protect, elevate, and celebrate every journey.
          </motion.p>
        </motion.div>
      </div>

      {/* 3. Bottom Gradient Transition Shield */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#040406] to-transparent z-30 pointer-events-none" />
    </section>
  );
}
