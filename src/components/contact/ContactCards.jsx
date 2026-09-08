import React from 'react';
import { CONTACT_CARDS } from '../../constants/contactData';
import { PhoneCall, MessageSquare, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const ICONS = {
  PhoneCall,
  MessageSquare,
  Mail,
  MapPin,
};

const ACCENT_STYLES = {
  red: 'group-hover:border-[#FF3B47]/40 bg-[#FF3B47]/10 text-[#FF3B47]',
  emerald: 'group-hover:border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  blue: 'group-hover:border-blue-500/40 bg-blue-500/10 text-blue-400',
  amber: 'group-hover:border-amber-500/40 bg-amber-500/10 text-amber-400',
};

export default function ContactCards() {
  return (
    <section className="w-full mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {CONTACT_CARDS.map((card) => {
          const IconComponent = ICONS[card.iconName] || PhoneCall;
          const accent = ACCENT_STYLES[card.accentColor] || ACCENT_STYLES.red;

          return (
            <a
              key={card.id}
              href={card.href}
              target={card.isExternal ? '_blank' : undefined}
              rel={card.isExternal ? 'noopener noreferrer' : undefined}
              className="group relative flex flex-col justify-between p-4 sm:p-4.5 rounded-xl bg-[#0b0d14]/80 border border-white/[0.08] hover:bg-[#0e111a] hover:border-white/20 transition-all duration-300 no-underline shadow-[0_6px_25px_rgba(0,0,0,0.5)] hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${accent}`}>
                    <IconComponent size={18} />
                  </div>
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-white text-sm font-semibold font-heading group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                <p className="text-neutral-200 text-xs sm:text-[0.82rem] font-semibold mt-0.5 tracking-tight font-body">
                  {card.value}
                </p>
                <p className="text-neutral-400 text-[0.72rem] mt-0.5 font-body leading-relaxed">
                  {card.subtext}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[0.7rem] font-semibold mt-3 text-neutral-300 group-hover:text-white transition-colors">
                <span>{card.actionLabel}</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
