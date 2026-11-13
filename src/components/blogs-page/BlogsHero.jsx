import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, BookOpen } from 'lucide-react';

export default function BlogsHero({ search, onSearchChange, onSearchClear }) {
  return (
    <section className="relative w-full pt-28 pb-4 sm:pt-32 sm:pb-6 px-6 sm:px-10 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-[#07080a]">
      {/* Ambient Red Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] rounded-full blur-[150px] bg-[#e50914]/12 pointer-events-none" />

      <div className="relative z-10 max-w-[850px] mx-auto flex flex-col items-center">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0c12]/80 backdrop-blur-md border border-white/10 text-stylein-red text-[0.72rem] font-bold uppercase tracking-widest font-heading mb-3"
        >
          <BookOpen size={13} />
          <span>STYLEIN AUTOMOTIVE JOURNAL</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] text-white leading-tight tracking-tight uppercase"
        >
          PREMIER CAR CARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">INSIGHTS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-neutral-400 text-xs sm:text-sm max-w-lg mt-2.5 leading-relaxed"
        >
          Explore expert maintenance techniques, ceramic coating guides, UAE summer car protection tips, and luxury auto engineering.
        </motion.p>

        {/* Search Bar Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg mt-5 sm:mt-6 relative"
        >
          <div className="relative flex items-center w-full">
            <Search size={18} className="absolute left-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles, e.g. Ceramic coating, Battery, Summer tips..."
              aria-label="Search articles"
              className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#0b0d14]/90 border border-white/15 focus:border-stylein-red text-white placeholder-neutral-500 text-[0.88rem] focus:outline-none focus:ring-2 focus:ring-stylein-red/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all font-body"
            />
            {search && (
              <button
                type="button"
                onClick={onSearchClear}
                aria-label="Clear search"
                className="absolute right-3.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
