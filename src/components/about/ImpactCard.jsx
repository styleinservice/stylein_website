import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      delay: idx * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function ImpactCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(stat.targetNumber ? 0 : stat.value);

  useEffect(() => {
    if (!isInView || !stat.targetNumber) return;

    let start = 0;
    const end = stat.targetNumber;
    const duration = 1200;
    const startTime = performance.now();

    const animateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, stat.targetNumber]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative flex flex-col justify-center items-center text-center p-4.5 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-[#0a0c14]/70 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.2] shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-1 select-none"
    >
      {/* Subtle Inner Highlight */}
      <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

      {/* Metric Number */}
      <div className="font-heading font-black text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.45rem] text-white tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
        {stat.targetNumber ? (
          <>
            {displayValue}
            <span className="text-stylein-red ml-0.5">{stat.suffix}</span>
          </>
        ) : (
          stat.value
        )}
      </div>

      {/* Metric Label */}
      <div className="font-body font-medium text-[0.76rem] sm:text-[0.84rem] lg:text-[0.88rem] text-neutral-300/80 leading-snug mt-2 sm:mt-2.5">
        {stat.label}
      </div>
    </motion.div>
  );
}
