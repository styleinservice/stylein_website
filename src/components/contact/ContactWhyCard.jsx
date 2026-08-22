import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Tag, Zap } from 'lucide-react';

const ICON_MAP = {
  MapPin,
  ShieldCheck,
  Tag,
  Zap,
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ContactWhyCard({ item, index }) {
  const IconComponent = ICON_MAP[item.iconName] || ShieldCheck;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative w-full rounded-[24px] bg-[#090C12] border border-white/[0.08] hover:border-stylein-red/40 p-6 flex flex-col items-start text-left transition-all duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_40px_rgba(229,9,20,0.18)] overflow-hidden"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-stylein-red/40 flex items-center justify-center text-stylein-red mb-4 transition-colors">
        <IconComponent size={22} />
      </div>

      <h3 className="font-heading text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-2 group-hover:text-stylein-red transition-colors">
        {item.title}
      </h3>

      <p className="font-body text-neutral-300/80 text-xs sm:text-sm leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}
