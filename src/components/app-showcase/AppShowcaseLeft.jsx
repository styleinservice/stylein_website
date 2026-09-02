import React from 'react';
import { motion } from 'framer-motion';
import AppQRCodeCard from './AppQRCodeCard';
import { useHomeMotion } from '../../context/HomeMotionContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: -20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 45, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 35, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AppShowcaseLeft() {
  const isFirstVisit = useHomeMotion();

  return (
    <div className="w-full lg:w-[48%] flex flex-col justify-center gap-4 z-10 items-center lg:items-start text-center lg:text-left">
      <motion.div
        variants={containerVariants}
        initial={isFirstVisit ? "hidden" : false}
        animate={!isFirstVisit ? "visible" : undefined}
        whileInView={isFirstVisit ? "visible" : undefined}
        viewport={{ once: true, margin: '-50px' }}
        className="flex flex-col gap-3.5 items-center lg:items-start w-full"
      >
        <motion.div variants={pillVariants} className="flex justify-center lg:justify-start w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stylein-red/10 border border-stylein-red/25 w-fit">
            <span className="text-stylein-red text-[0.7rem] font-bold tracking-widest uppercase font-heading">
              ON-DEMAND DOORSTEP CARE
            </span>
          </div>
        </motion.div>

        <motion.div variants={headingVariants} className="w-full">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.15] tracking-tight uppercase">
            The everything app <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
              for your car
            </span>
          </h2>
        </motion.div>

        <motion.div variants={textVariants} className="w-full flex justify-center lg:justify-start">
          <p className="text-neutral-300/90 text-[0.84rem] sm:text-[0.88rem] leading-relaxed max-w-md font-body">
            Car wash, tyre fitting, synthetic oil change, battery replacement, and 24/7 emergency rescue — just tap and our mobile units roll directly to wherever you are parked. Skip the service queues. STYLEIN brings automotive excellence straight to you.
          </p>
        </motion.div>

        <motion.div variants={cardVariants} className="pt-1 flex justify-center lg:justify-start w-full">
          <AppQRCodeCard />
        </motion.div>
      </motion.div>
    </div>
  );
}
