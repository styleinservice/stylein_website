import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageSquare, LifeBuoy, ArrowUpRight } from 'lucide-react';
import { FAQ_SUPPORT_CARDS } from '../../constants/faqPageData';

const ICON_MAP = {
  PhoneCall,
  MessageSquare,
  LifeBuoy,
};

export default function FAQPageSupportCards() {
  return (
    <div className="w-full mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-white/[0.06] relative z-10 text-left">
      <div className="flex flex-col items-center text-center mb-8">
        <span className="text-[0.7rem] font-bold tracking-widest text-stylein-red uppercase font-heading mb-1.5">
          STILL HAVE QUESTIONS?
        </span>
        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
          We&apos;re Available 24/7 To Assist You
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {FAQ_SUPPORT_CARDS.map((card, idx) => {
          const IconComponent = ICON_MAP[card.iconName] || PhoneCall;

          return (
            <motion.a
              key={card.id}
              href={card.actionHref}
              target={card.actionHref.startsWith('http') ? '_blank' : undefined}
              rel={card.actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between no-underline select-none group cursor-pointer ${
                card.isRescue
                  ? 'bg-gradient-to-b from-[#140608] to-[#0a0709] border-stylein-red/35 hover:border-stylein-red shadow-[0_10px_30px_rgba(229,9,20,0.18)]'
                  : 'bg-[#080a0f] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-stylein-red mb-3.5 group-hover:scale-108 transition-transform">
                  <IconComponent size={18} />
                </div>
                <h4 className="font-heading text-base font-bold text-white uppercase tracking-tight group-hover:text-stylein-red transition-colors">
                  {card.title}
                </h4>
                <p className="font-body text-xs text-neutral-400 leading-relaxed mt-1">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[0.74rem] font-bold uppercase tracking-wider font-heading text-neutral-300 group-hover:text-white">
                <span>{card.actionText}</span>
                <ArrowUpRight size={13} className="text-stylein-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
