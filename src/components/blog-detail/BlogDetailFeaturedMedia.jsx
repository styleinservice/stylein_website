import React from 'react';
import { motion } from 'framer-motion';

export default function BlogDetailFeaturedMedia({ blog }) {
  if (!blog?.image) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.12 }}
      className="relative w-full h-[260px] sm:h-[380px] md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] mb-10"
    >
      <img
        src={blog.image}
        alt={blog.title}
        title={blog.title}
        className="w-full h-full object-cover select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-40" />
    </motion.div>
  );
}
