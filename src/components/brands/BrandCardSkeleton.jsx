import React from 'react';
import { motion } from 'framer-motion';

export default function BrandCardSkeleton({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-start bg-[#0b0d14] border border-white/[0.06] shadow-[0_15px_40px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      {/* Sweeping Shimmer Wave */}
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

      {/* Top Right Affordance Skeleton */}
      <div className="flex items-center justify-end w-full mb-2">
        <div className="w-8 h-8 rounded-full bg-white/[0.04] animate-pulse" />
      </div>

      {/* Vehicle Image Skeleton Box */}
      <div className="w-full h-44 sm:h-52 flex items-center justify-center my-1 relative rounded-2xl bg-white/[0.02] border border-white/[0.03] animate-pulse">
        <div className="w-3/4 h-24 rounded-xl bg-white/[0.03]" />
      </div>

      {/* Brand Name Skeleton */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-6 w-4/5 rounded-lg bg-white/[0.06] animate-pulse" />
        {/* Tagline Skeleton */}
        <div className="h-3.5 w-3/5 rounded-md bg-stylein-red/20 animate-pulse mt-0.5" />
      </div>
    </motion.div>
  );
}
