import React from 'react';
import { motion } from 'framer-motion';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function BrandsHero() {
  return (
    <motion.div
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full pt-28 sm:pt-32 pb-8 px-6 sm:px-10 lg:px-12 flex flex-col items-center text-center"
    >
      {/* Category Label */}
      <motion.span
        variants={itemVariants}
        className="text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase text-stylein-red mb-3 block font-heading"
      >
        PRECISION AUTOMOTIVE DIRECTORY
      </motion.span>

      {/* Scaled-down Heading */}
      <motion.h1
        variants={itemVariants}
        className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight max-w-2xl leading-[1.14]"
      >
        Bespoke Care for Every{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
          Marque
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="font-body text-neutral-400 text-xs sm:text-sm max-w-lg mt-2 leading-relaxed"
      >
        Discover our specialized care profiles crafted specifically for high-performance supercars, grand tourers, executive saloons, and modern electric mobility.
      </motion.p>
    </motion.div>
  );
}
