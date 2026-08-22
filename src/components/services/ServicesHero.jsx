import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ServicesHero({ totalCount, filteredCount, searchQuery, onSearchChange, loading }) {
  return (
    <motion.div
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12"
    >
      {/* Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center px-3 py-0.5 rounded-full bg-stylein-red/10 border border-stylein-red/30 text-stylein-red text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase mb-3"
      >
        <span>PREMIUM AUTOMOTIVE SERVICES</span>
      </motion.div>

      {/* Scaled-down Heading with Framer Motion */}
      <motion.h1
        variants={itemVariants}
        className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight max-w-2xl leading-[1.14]"
      >
        Automotive Care.{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
          Delivered Anywhere.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="font-body text-neutral-400 text-xs sm:text-sm max-w-lg mt-2 leading-relaxed"
      >
        Explore our complete collection of professional doorstep vehicle care services, detailing solutions, inspections, maintenance and emergency assistance.
      </motion.p>

      {/* Search Bar & Result Counter */}
      <motion.div variants={itemVariants} className="w-full max-w-md mt-6 sm:mt-8 flex flex-col items-center gap-3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search services by title..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#090C12] border border-white/[0.08] focus:border-stylein-red/60 text-white placeholder-neutral-500 text-xs sm:text-sm font-body outline-none transition-all shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Counter */}
        {!loading && (
          <div className="text-[0.72rem] sm:text-xs text-neutral-400 font-medium font-body flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-stylein-red" />
            <span>
              Showing {filteredCount} of {totalCount} Services
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
