import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useHomeMotion } from '../../context/HomeMotionContext';

export default function FAQHeader() {
  const isFirstVisit = useHomeMotion();

  return (
    <motion.div
      initial={isFirstVisit ? { opacity: 0, y: 20 } : false}
      animate={!isFirstVisit ? { opacity: 1, y: 0 } : undefined}
      whileInView={isFirstVisit ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-50px' }}
      transition={isFirstVisit ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
      className="flex flex-col items-center text-center lg:items-start lg:text-left gap-2 mb-5 sm:mb-6 w-full"
    >
      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-stylein-red/10 border border-stylein-red/25 w-fit">
        <HelpCircle size={11} className="text-stylein-red" />
        <span className="text-stylein-red text-[0.66rem] font-bold tracking-widest uppercase font-heading">
          FREQUENTLY ASKED QUESTIONS
        </span>
      </div>

      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
        Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">Answered.</span>
      </h2>

      <p className="text-neutral-400 text-[0.82rem] sm:text-[0.86rem] max-w-md font-body leading-relaxed">
        Everything you need to know about our premium on-demand car care, bookings, doorstep operations, and emergency response.
      </p>
    </motion.div>
  );
}
