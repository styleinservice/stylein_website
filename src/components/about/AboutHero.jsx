import React from 'react';
import { motion } from 'framer-motion';
import videoFile from '../../assets/videos/WEBSITE_PAGE_VIDEO.mp4';

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
          className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
        >
          <source src={videoFile} type="video/mp4" />
          <source src="/assets/videos/WEBSITE_PAGE_VIDEO.mp4" type="video/mp4" />
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
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 lg:h-72 bg-gradient-to-t from-[#040406] via-[#040406]/80 to-transparent z-20 pointer-events-none" />
      </div>

      {/* 2. Refined Luxury Scale Typography Layer */}
      <div className="relative z-30 w-full max-w-[740px] mx-auto px-6 sm:px-8 lg:px-10 pt-16 sm:pt-20 flex flex-col items-center justify-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center w-full"
        >
          {/* Headline */}
          <motion.h1
            variants={headlineVariants}
            className="font-heading font-bold text-white text-[1.65rem] sm:text-2xl md:text-3xl lg:text-[2.35rem] xl:text-[2.65rem] leading-[1.16] tracking-tight uppercase max-w-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          >
            More Than Car Care.
            <br />
            A Better{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red font-bold">
              Ownership Experience.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={subheadlineVariants}
            className="font-body text-neutral-200/85 text-xs sm:text-[0.88rem] lg:text-[0.92rem] leading-relaxed max-w-[520px] mt-3 sm:mt-4 tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          >
            STYLEIN delivers premium automotive services designed around convenience, quality, and trust — helping vehicle owners keep their cars protected, maintained, and road-ready without disrupting their day.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
