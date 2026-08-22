import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award } from 'lucide-react';
import ContactFormCard from './ContactFormCard';

export default function ContactFormSection() {
  return (
    <section id="contact-form" className="relative w-full py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-12 bg-[#050505] border-t border-white/[0.04] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[160px] bg-stylein-red/5 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10">
        {/* Left Side: Concierge Introduction */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-start text-left"
        >
          <span className="text-[0.68rem] sm:text-xs font-semibold text-stylein-red uppercase tracking-widest font-heading mb-2">
            GET IN TOUCH
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight leading-[1.15]">
            Let&apos;s Talk About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">
              Your Vehicle
            </span>
          </h2>

          <p className="font-body text-neutral-300/80 text-xs sm:text-sm leading-relaxed mt-2.5 max-w-md">
            Tell us what you need and our dedicated automotive concierge will reach out promptly to confirm your doorstep service.
          </p>

          {/* Value Highlights */}
          <div className="flex flex-col gap-3.5 mt-6 w-full">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-stylein-red/10 border border-stylein-red/25 flex items-center justify-center text-stylein-red shrink-0 mt-0.5">
                <Clock size={14} />
              </div>
              <div>
                <span className="font-heading text-xs font-semibold text-neutral-200 uppercase block">
                  15-Minute Response Time
                </span>
                <span className="font-body text-neutral-400 text-[0.72rem] leading-relaxed">
                  Our dispatch center reviews booking requests instantly.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-stylein-red/10 border border-stylein-red/25 flex items-center justify-center text-stylein-red shrink-0 mt-0.5">
                <ShieldCheck size={14} />
              </div>
              <div>
                <span className="font-heading text-xs font-semibold text-neutral-200 uppercase block">
                  Fully Insured & Certified
                </span>
                <span className="font-body text-neutral-400 text-[0.72rem] leading-relaxed">
                  Comprehensive care by trained master automotive technicians.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-stylein-red/10 border border-stylein-red/25 flex items-center justify-center text-stylein-red shrink-0 mt-0.5">
                <Award size={14} />
              </div>
              <div>
                <span className="font-heading text-xs font-semibold text-neutral-200 uppercase block">
                  OEM-Grade Guaranteed Quality
                </span>
                <span className="font-body text-neutral-400 text-[0.72rem] leading-relaxed">
                  Authentic fluids, filters, batteries, and detailing products.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 w-full"
        >
          <ContactFormCard />
        </motion.div>
      </div>
    </section>
  );
}
