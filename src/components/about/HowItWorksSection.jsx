import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Download The App',
    description: 'Access premium automotive services anytime, anywhere from your smartphone.',
  },
  {
    number: '02',
    title: 'Choose Your Service & Time Slot',
    description: 'Select the service you need and schedule it at a time that suits your routine.',
  },
  {
    number: '03',
    title: 'Enjoy A Seamless Experience',
    description: 'Our trained professionals arrive on time and deliver exceptional care wherever you are.',
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      delay: idx * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HowItWorksSection() {
  return (
    <section className="relative w-full py-10 sm:py-14 pb-16 sm:pb-20 bg-[#040406] text-white overflow-hidden border-t border-white/[0.04]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] rounded-full blur-[150px] bg-stylein-red/5 pointer-events-none z-0" />

      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 lg:px-10 w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-left sm:text-center items-start sm:items-center mb-10 sm:mb-14"
        >
          <span className="font-heading text-[0.74rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase text-neutral-400 mb-2 block">
            HOW IT WORKS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.45rem] font-bold text-white tracking-tight leading-[1.16] uppercase">
            Simple. Convenient.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red font-bold">
              Reliable.
            </span>
          </h2>
          <p className="font-body text-neutral-300/80 text-xs sm:text-[0.88rem] lg:text-[0.92rem] leading-relaxed max-w-xl mt-2">
            Book professional automotive services in just a few steps and let our experts take care of the rest.
          </p>

          {/* QR Code Download Pill Badge placed directly under text */}
          <div className="mt-4 sm:mt-5 flex items-center justify-start sm:justify-center">
            <a
              href="#download"
              className="bg-[#0d0f16]/75 backdrop-blur-2xl border border-white/15 hover:border-stylein-red/50 rounded-2xl px-4 py-2 inline-flex items-center gap-3 shadow-[0_10px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_35px_rgba(229,9,20,0.2)] hover:-translate-y-0.5 transition-all duration-300 group no-underline"
              aria-label="Scan to download STYLEIN App"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/12 to-white/5 border border-white/15 flex items-center justify-center p-1 group-hover:border-stylein-red/40 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <path d="M14 14h3v3h-3z" fill="#e50914" stroke="none" />
                  <path d="M17 17h4v4h-4z" />
                  <path d="M14 20h3" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-white text-[0.78rem] sm:text-[0.82rem] font-semibold block tracking-wide font-heading">
                  Scan to download
                </span>
                <span className="text-neutral-400 text-[0.65rem] font-medium font-body block">
                  iOS & Android
                </span>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Steps Grid: Vertical with connected vertical line on Mobile, Horizontal on Desktop */}
        <div className="relative flex flex-col md:grid md:grid-cols-3 gap-7 sm:gap-8 lg:gap-12">
          {/* Visual Horizontal Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-7 left-[18%] right-[18%] h-[1px] bg-gradient-to-r from-white/10 via-stylein-red/30 to-white/10 z-0 pointer-events-none" />

          {/* Visual Vertical Connector Line (Mobile Only) */}
          <div className="md:hidden absolute top-6 bottom-10 left-[23px] w-[2px] bg-gradient-to-b from-stylein-red/40 via-white/15 to-stylein-red/40 z-0 pointer-events-none" />

          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 sm:gap-5 md:gap-0 select-none"
            >
              {/* Step Number Badge */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0a0c14] border border-white/[0.08] group-hover:border-stylein-red/40 flex items-center justify-center shrink-0 shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:-translate-y-1">
                <span className="font-heading font-black text-lg md:text-2xl text-white/40 group-hover:text-stylein-red transition-colors">
                  {step.number}
                </span>
              </div>

              {/* Step Content */}
              <div className="flex flex-col md:items-center">
                <h3 className="font-heading text-[1.02rem] sm:text-[1.08rem] md:text-[1.18rem] font-bold text-white tracking-tight uppercase leading-snug md:mt-5 group-hover:text-white">
                  {step.title}
                </h3>
                <p className="font-body text-[0.8rem] sm:text-[0.84rem] md:text-[0.88rem] text-neutral-300/80 leading-relaxed mt-1 md:mt-2 max-w-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
