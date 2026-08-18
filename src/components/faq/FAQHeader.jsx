import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

export default function FAQHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start text-left gap-2 mb-5 sm:mb-6"
    >
      {/* Category Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-stylein-red/10 border border-stylein-red/25 w-fit">
        <HelpCircle size={11} className="text-stylein-red" />
        <span className="text-stylein-red text-[0.66rem] font-bold tracking-widest uppercase font-heading">
          FREQUENTLY ASKED QUESTIONS
        </span>
      </div>

      {/* Scaled-Down Main Title */}
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
        Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">Answered.</span>
      </h2>

      <p className="text-neutral-400 text-[0.82rem] sm:text-[0.86rem] max-w-md font-body leading-relaxed">
        Everything you need to know about our premium on-demand car care, bookings, doorstep operations, and emergency response.
      </p>
    </motion.div>
  );
}
