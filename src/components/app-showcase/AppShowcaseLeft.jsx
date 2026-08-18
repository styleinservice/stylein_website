import React from 'react';
import { motion } from 'framer-motion';
import AppQRCodeCard from './AppQRCodeCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AppShowcaseLeft() {
  return (
    <div className="w-full lg:w-[48%] flex flex-col justify-center gap-4 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-3.5"
      >
        {/* Category Pill with Framer Motion */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stylein-red/10 border border-stylein-red/25 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-stylein-red animate-ping" />
            <span className="text-stylein-red text-[0.7rem] font-bold tracking-widest uppercase font-heading">
              ON-DEMAND DOORSTEP CARE
            </span>
          </div>
        </motion.div>

        {/* Main Headline with Framer Motion */}
        <motion.div variants={itemVariants}>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.15] tracking-tight uppercase">
            The everything app <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
              for your car
            </span>
          </h2>
        </motion.div>

        {/* Description Paragraph with Framer Motion */}
        <motion.div variants={itemVariants}>
          <p className="text-neutral-300/90 text-[0.84rem] sm:text-[0.88rem] leading-relaxed max-w-md font-body">
            Car wash, tyre fitting, synthetic oil change, battery replacement, and 24/7 emergency rescue — just tap and our mobile units roll directly to wherever you are parked. Skip the service queues. STYLEIN brings automotive excellence straight to you.
          </p>
        </motion.div>

        {/* QR Code & Store Downloads with Framer Motion */}
        <motion.div variants={itemVariants} className="pt-1">
          <AppQRCodeCard />
        </motion.div>
      </motion.div>
    </div>
  );
}
