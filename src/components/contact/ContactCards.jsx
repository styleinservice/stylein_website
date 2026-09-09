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
    <section className="w-full mb-10 sm:mb-14 lg:mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {CONTACT_CARDS.map((card) => {
          const IconComponent = ICONS[card.iconName] || PhoneCall;
          const accent = ACCENT_STYLES[card.accentColor] || ACCENT_STYLES.red;

          return (
            <a
              key={card.id}
              href={card.href}
              target={card.isExternal ? '_blank' : undefined}
              rel={card.isExternal ? 'noopener noreferrer' : undefined}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#0b0d14]/85 border border-white/[0.09] hover:bg-[#0e111a] hover:border-white/25 transition-all duration-300 no-underline shadow-[0_10px_35px_rgba(0,0,0,0.55)] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${accent}`}>
                    <IconComponent size={20} />
                  </div>
                  <span className="text-[0.66rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-white text-base font-bold font-heading group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                <p className="text-white text-sm sm:text-[0.94rem] font-semibold mt-1.5 tracking-tight font-body">
                  {card.value}
                </p>
                <p className="text-neutral-400 text-xs mt-1.5 font-body leading-relaxed">
                  {card.subtext}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold mt-5 text-neutral-300 group-hover:text-white transition-colors">
                <span>{card.actionLabel}</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
