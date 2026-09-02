import React from 'react';
import { motion } from 'framer-motion';
import Detail3DPhone from './Detail3DPhone';
import { useRouteMotion } from '../../context/HomeMotionContext';

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
  const isFirstVisit = useRouteMotion();

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
        <motion.div
          variants={containerVariants}
          initial={isFirstVisit ? "hidden" : false}
          animate={!isFirstVisit ? "visible" : undefined}
          whileInView={isFirstVisit ? "visible" : undefined}
          viewport={{ once: true, amount: 0.2 }}
          className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-start text-left max-w-[460px]"
        >
          <motion.span variants={itemVariants} className="text-[0.72rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-2">
            ON-DEMAND CONVENIENCE
          </motion.span>

          <motion.h2 variants={itemVariants} className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14] mb-4">
            Get started in {points.length} steps
          </motion.h2>

          <motion.div variants={itemVariants} className="mb-5 flex items-center">
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#050608] rounded-md p-0.5 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-1.5 h-1.5 bg-white/90 rounded-xs" />
                    <div className="w-1.5 h-1.5 bg-white/90 rounded-xs" />
                  </div>
                  <div className="w-1 h-1 bg-white/70 mx-auto rounded-full" />
                  <div className="flex justify-between">
                    <div className="w-1.5 h-1.5 bg-white/90 rounded-xs" />
                    <div className="w-1.5 h-1.5 bg-white/90 rounded-xs" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white text-[0.76rem] font-bold tracking-wide font-heading">
                  Scan to download
                </span>
                <span className="text-neutral-400 text-[0.62rem] font-medium font-body">
                  iOS & Android
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-2.5 w-full">
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

        <Detail3DPhone />
      </div>
    </section>
  );
}
