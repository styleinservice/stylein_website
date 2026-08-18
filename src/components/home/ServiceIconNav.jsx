import React from 'react';
import { SERVICES_SECTION_DATA } from '../../constants/servicesData';
import {
  Sparkles,
  Zap,
  Disc,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  LifeBuoy
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Zap,
  Disc,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  LifeBuoy,
};

export default function ServiceIconNav({ activeIndex, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2.5 px-2 overflow-x-auto no-scrollbar">
      {SERVICES_SECTION_DATA.map((service, i) => {
        const isActive = i === activeIndex;
        const IconComponent = ICON_MAP[service.iconName] || Sparkles;

        return (
          <button
            key={service.id}
            onClick={() => onSelect(i)}
            className={`flex flex-col items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl transition-all duration-300 cursor-pointer border relative group ${
              isActive
                ? 'bg-[#11141c]/90 border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(229,9,20,0.12)] scale-[1.04]'
                : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05] hover:border-white/[0.08] hover:scale-[1.02]'
            }`}
            aria-label={service.label}
          >
            {/* Glass Icon Container */}
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-stylein-red/25 to-stylein-red/10 text-stylein-red border border-stylein-red/30 shadow-[0_0_15px_rgba(229,9,20,0.25)]'
                  : 'bg-white/[0.04] text-neutral-400 border border-white/[0.06] group-hover:text-white group-hover:bg-white/[0.08]'
              }`}
            >
              <IconComponent size={18} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
            </div>

            {/* Label */}
            <span
              className={`text-[0.68rem] sm:text-[0.72rem] font-medium tracking-wide transition-colors duration-300 whitespace-nowrap ${
                isActive ? 'text-white font-semibold' : 'text-neutral-400 group-hover:text-neutral-200'
              }`}
            >
              {service.label}
            </span>

            {/* Active Indicator Glow */}
            <div
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-stylein-red transition-all duration-300 shadow-[0_0_8px_rgba(229,9,20,0.8)] ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
