import React from 'react';
import { motion } from 'framer-motion';
import { HERO_VIDEO_URL } from '../../constants/videoConfig';

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

      {/* 1. Fullscreen Cloudinary Video Layer */}
      <div className="absolute inset-0 w-full h-full z-1 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
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

      {/* 2. Refined Luxury Scale Typography Layer & QR Code Badge */}
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

          {/* QR Code Download Pill Badge */}
          <motion.div variants={subheadlineVariants} className="mt-5 sm:mt-7 flex items-center justify-center">
            <a
              href="#download"
              className="bg-[#0d0f16]/75 backdrop-blur-2xl border border-white/15 hover:border-stylein-red/50 rounded-2xl px-4.5 py-2.5 inline-flex items-center gap-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(229,9,20,0.25)] hover:-translate-y-1 transition-all duration-300 group no-underline"
              aria-label="Scan to download STYLEIN App"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/12 to-white/5 border border-white/15 flex items-center justify-center p-1.5 group-hover:border-stylein-red/40 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <path d="M14 14h3v3h-3z" fill="#e50914" stroke="none" />
                  <path d="M17 17h4v4h-4z" />
                  <path d="M14 20h3" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-white text-[0.82rem] sm:text-[0.86rem] font-semibold block tracking-wide font-heading">
                  Scan to download
                </span>
                <span className="text-neutral-400 text-[0.68rem] font-medium font-body block">
                  iOS & Android
                </span>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
