import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function GetAppRightContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="flex-1 flex flex-col justify-center gap-4 text-center lg:text-left items-center lg:items-start z-10 py-4 lg:py-2 w-full"
    >
      {/* Category Label with Motion */}
      <motion.div variants={itemVariants} className="flex justify-center lg:justify-start w-full">
        <div className="inline-flex items-center gap-1.5 text-stylein-red text-[0.68rem] font-bold tracking-widest uppercase font-heading">
          <Smartphone size={12} className="text-stylein-red" />
          <span>MOBILE EXCELLENCE</span>
        </div>
      </motion.div>

      {/* Main Headline with Motion */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1.5 w-full items-center lg:items-start">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
          Get the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">STYLEIN App</span>
        </h2>
        <p className="text-neutral-300/90 text-[0.82rem] sm:text-[0.86rem] leading-relaxed max-w-sm font-body mx-auto lg:mx-0">
          Book on-demand steam car wash, mobile battery, tyres, oil changes, and 24/7 rescue anywhere across the city in seconds.
        </p>
      </motion.div>

      {/* QR Code Glass Pill with Motion */}
      <motion.div variants={itemVariants} className="pt-1 flex justify-center lg:justify-start w-full">
        <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.6)] group hover:border-white/30 transition-all">
          <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#050608] rounded-md p-0.5 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-1.5 h-1.5 bg-white/90 rounded-xs" />
                <div className="w-1.5 h-1.5 bg-white/90 rounded-xs" />
              </div>
              <div className="w-1 h-1 bg-white/70 mx-auto rounded-full" />
              <div className="flex justify-between">
                <div className="w-1.5 h-1.5 bg-white/90 rounded-xs" />
                <div className="w-1.5 h-1.5 bg-white/90 rounded-xs" />
              </div>
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white text-[0.78rem] font-bold tracking-wide font-heading">
              Scan to download
            </span>
            <span className="text-neutral-400 text-[0.65rem] font-medium font-body">
              iOS & Android
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
