import React from 'react';
import { motion } from 'framer-motion';
import Detail3DPhone from './Detail3DPhone';

const containerVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DetailGetStarted({ getStarted, serviceTitle = '' }) {
  let points = [];
  if (getStarted && Array.isArray(getStarted.points)) {
    points = getStarted.points;
  } else if (getStarted && typeof getStarted === 'object') {
    points = Object.values(getStarted).filter((v) => typeof v === 'string');
  }

  if (points.length === 0) {
    points = [
      'Download the STYLEIN app',
      `Tap ${serviceTitle || 'your service'} and choose your time slot`,
      'Relax while our experts arrive at your location',
    ];
  }

  return (
    <section className="relative w-full py-8 sm:py-12 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04] overflow-hidden">
      <div className="w-full max-w-[1000px] sm:max-w-[1040px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center justify-center gap-8 lg:gap-12">
        {/* Left Column: Heading + QR Code Badge + 3 Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-start text-left max-w-[460px]"
        >
          <motion.span variants={itemVariants} className="text-[0.72rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-2">
            ON-DEMAND CONVENIENCE
          </motion.span>

          <motion.h2 variants={itemVariants} className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14] mb-4">
            Get started in {points.length} steps
          </motion.h2>

          {/* QR Code Download Badge */}
          <motion.div variants={itemVariants} className="mb-5 flex items-center">
            <a
              href="#download"
              className="bg-[#0d0f16]/90 backdrop-blur-2xl border border-white/15 hover:border-stylein-red/50 rounded-2xl px-5 py-2.5 inline-flex items-center gap-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(229,9,20,0.25)] hover:-translate-y-0.5 transition-all duration-300 group no-underline"
              aria-label="Scan to download STYLEIN App"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/12 to-white/5 border border-white/15 flex items-center justify-center p-1.5 group-hover:border-stylein-red/40 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <path d="M14 14h3v3h-3z" fill="#e50914" stroke="none" />
                  <path d="M17 17h4v4h-4z" />
                  <path d="M14 20h3" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-white text-xs sm:text-sm font-bold block tracking-wider uppercase font-heading">
                  Scan to get app
                </span>
                <span className="text-neutral-400 text-[0.68rem] font-medium font-body block">
                  iOS & Android
                </span>
              </div>
            </a>
          </motion.div>

          {/* 3 Step Cards */}
          <div className="flex flex-col gap-3 w-full">
            {points.map((point, idx) => {
              const stepNum = idx + 1;
              const stepText = typeof point === 'string' ? point : point.text || '';

              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="w-full p-3 sm:p-3.5 rounded-2xl bg-[#090C12] border border-white/[0.06] flex items-center justify-between gap-4 transition-all duration-300 hover:border-white/15"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#040406] border border-white/15 flex items-center justify-center text-xs font-bold font-heading text-white shrink-0">
                      {stepNum}
                    </div>
                    <span className="font-body text-neutral-200 text-xs sm:text-sm font-medium leading-snug">
                      {stepText}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Tilted Smartphone Mockup */}
        <Detail3DPhone />
      </div>
    </section>
  );
}
