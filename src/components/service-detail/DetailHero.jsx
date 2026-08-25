import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DetailHero({ service }) {
  const navigate = useNavigate();
  if (!service) return null;

  const title = service.title || service.serviceName || service.name || 'Automotive Service';
  const description = service.description || service.redline || '';

  return (
    <section className="relative w-full pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-6 sm:pb-8 lg:pb-10 px-6 sm:px-10 lg:px-12 overflow-hidden">
      {/* Ambient Red Glow */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[450px] h-[350px] rounded-full blur-[160px] bg-stylein-red/10 pointer-events-none z-0" />

      {/* Top Bar: Arrow Button */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1040px] sm:max-w-[1080px] mx-auto flex justify-start mb-4 sm:mb-6 relative z-10 pl-0 sm:pl-2"
      >
        <button
          onClick={() => navigate('/services')}
          className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-stylein-red/40 flex items-center justify-center text-white cursor-pointer transition-all duration-200 shadow-[0_4px_15px_rgba(0,0,0,0.6)] group active:scale-95"
          aria-label="Back to services"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform text-neutral-200 group-hover:text-white" />
        </button>
      </motion.div>

      {/* 2-Column Responsive Layout Horizontally Centered */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[1040px] sm:max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center justify-center gap-8 sm:gap-10 lg:gap-12 relative z-10"
      >
        {/* Left Content on Desktop / Bottom on Mobile with Inset Padding */}
        <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-start text-left pl-0 sm:pl-3 lg:pl-6 max-w-[480px]">
          {/* Small Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-3 py-0.5 rounded-full bg-stylein-red/10 border border-stylein-red/30 text-stylein-red text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase mb-2.5"
          >
            <span>PREMIUM AUTOMOTIVE SERVICE</span>
          </motion.div>

          {/* Heading with Gradient */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight max-w-xl leading-[1.14]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">
              {title}
            </span>
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
            variants={itemVariants}
            className="font-body text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mt-2.5 sm:mt-3"
          >
            {description}
          </motion.p>
        </div>

        {/* Right Image on Desktop / Top on Mobile - Centered & Proportionally Balanced */}
        <motion.div
          variants={imageVariants}
          className="order-1 lg:order-2 lg:col-span-6 w-full flex items-center justify-center lg:justify-end lg:-mt-8 lg:-translate-y-3"
        >
          {service.image ? (
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[480px] xl:max-w-[510px] aspect-[4/3] flex items-center justify-center">
              <img
                src={service.image}
                alt={title}
                className="w-full h-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] select-none pointer-events-none hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
            </div>
          ) : (
            <div className="w-48 h-36 rounded-2xl bg-white/[0.03] flex items-center justify-center text-neutral-600 font-heading text-xs uppercase">
              {title}
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
