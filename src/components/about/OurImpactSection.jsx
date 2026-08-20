import React from 'react';
import { motion } from 'framer-motion';
import ImpactCard from './ImpactCard';

const IMPACT_STATS = [
  { id: 'stat-1', targetNumber: 1000, suffix: '+', label: 'Vehicles Serviced' },
  { id: 'stat-2', targetNumber: 98, suffix: '%', label: 'Customer Satisfaction' },
  { id: 'stat-3', value: '24/7', label: 'Support Availability' },
  { id: 'stat-4', targetNumber: 50, suffix: '+', label: 'Service Professionals' },
];

export default function OurImpactSection() {
  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24 bg-[#040406] text-white overflow-hidden border-t border-white/[0.04]">
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full blur-[160px] bg-stylein-red/5 pointer-events-none z-0" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 lg:px-10 w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-left mb-8 sm:mb-10"
        >
          <span className="font-heading text-[0.74rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase text-neutral-400 mb-2 block">
            OUR IMPACT
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.45rem] font-bold text-white tracking-tight leading-[1.16] uppercase max-w-2xl">
            Trusted By Vehicle Owners{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red font-bold">
              Across The UAE
            </span>
          </h2>
          <p className="font-body text-neutral-300/80 text-xs sm:text-[0.88rem] lg:text-[0.92rem] leading-relaxed max-w-xl mt-2.5">
            Through consistent service quality, professional expertise, and customer-focused experiences, STYLEIN continues to help vehicle owners maintain, protect, and enjoy their cars with confidence.
          </p>
        </motion.div>

        {/* 4 Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full">
          {IMPACT_STATS.map((stat, idx) => (
            <ImpactCard key={stat.id} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
