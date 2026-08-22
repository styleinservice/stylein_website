import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Mail, MessageSquare, Clock, ArrowUpRight } from 'lucide-react';

const ICON_MAP = {
  PhoneCall,
  Mail,
  MessageSquare,
  Clock,
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ContactInfoCard({ card, index }) {
  const IconComponent = ICON_MAP[card.iconName] || PhoneCall;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative w-full rounded-[24px] bg-[#090C12] border border-white/[0.08] hover:border-stylein-red/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_45px_rgba(229,9,20,0.2)] overflow-hidden text-left"
    >
      {/* Top Red Accent Glow Line */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-stylein-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top Row: Icon + Highlight Pill */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-stylein-red/40 flex items-center justify-center text-stylein-red transition-colors shadow-inner">
            <IconComponent size={18} />
          </div>
          <span className="text-[0.68rem] font-bold uppercase tracking-wider font-heading px-2.5 py-0.5 rounded-full bg-stylein-red/10 border border-stylein-red/20 text-stylein-red">
            {card.highlight}
          </span>
        </div>

        {/* Small Label */}
        <span className="font-heading text-[0.72rem] font-bold text-neutral-400 tracking-widest uppercase block mb-1">
          {card.label}
        </span>

        {/* Main Title & Subtitle */}
        <h3 className="font-heading text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug group-hover:text-stylein-red transition-colors">
          {card.title}
        </h3>
        <p className="font-body text-xs text-neutral-400 leading-relaxed mt-1">
          {card.subtitle}
        </p>
      </div>

      {/* Bottom Action Link */}
      <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between">
        <a
          href={card.actionHref}
          target={card.actionHref.startsWith('http') ? '_blank' : undefined}
          rel={card.actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1 text-[0.76rem] font-bold text-neutral-300 group-hover:text-white font-heading uppercase tracking-wider no-underline transition-colors cursor-pointer"
        >
          <span>{card.actionText}</span>
          <ArrowUpRight size={13} className="text-stylein-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
