import React from 'react';
import { motion } from 'framer-motion';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function BrandsHero() {
  return (
    <motion.div
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full pt-32 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-12 flex flex-col items-center text-center"
    >
      {/* Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center px-3.5 py-1 rounded-full bg-stylein-red/10 border border-stylein-red/30 text-stylein-red text-xs font-bold tracking-widest uppercase mb-4"
      >
        <span>PRECISION AUTOMOTIVE DIRECTORY</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={itemVariants}
        className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight max-w-3xl leading-[1.08]"
      >
        Bespoke Care for Every{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
          Marque
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="font-body text-neutral-400 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed"
      >
        Discover our specialized care profiles crafted specifically for high-performance supercars, grand tourers, executive saloons, and modern electric mobility.
      </motion.p>
    </motion.div>
  );
}
