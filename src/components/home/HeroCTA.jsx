import React from 'react';
import { motion } from 'framer-motion';

export default function HeroCTA({ isReady }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
      animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 35, filter: 'blur(8px)' }}
      transition={{ duration: 0.85, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mt-2"
    >
      {/* Ultra-Premium Glass QR Code Badge Card */}
      <a
        href="#download"
        className="bg-[#0d0f16]/70 backdrop-blur-2xl border border-white/15 border-t-white/25 rounded-2xl px-5 py-3 inline-flex items-center gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(229,9,20,0.25)] hover:border-stylein-red/50 hover:-translate-y-1 transition-all duration-300 group no-underline"
        aria-label="Scan to download STYLEIN App"
      >
        {/* QR Code Icon Frame */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/12 to-white/5 border border-white/15 flex items-center justify-center relative p-1.5 group-hover:border-stylein-red/40 transition-colors">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:scale-105 transition-transform duration-300"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <path d="M14 14h3v3h-3z" fill="#e50914" stroke="none" />
            <path d="M17 17h4v4h-4z" />
            <path d="M14 20h3" />
          </svg>
        </div>

        {/* Text Label */}
        <div className="text-left">
          <span className="text-white text-sm font-semibold block tracking-wide group-hover:text-neutral-100 transition-colors font-heading">
            Scan to download
          </span>
        </div>
      </a>
    </motion.div>
  );
}
