import React from 'react';
import { collections } from '../../data/collections';
import {
  Sparkles,
  Zap,
  Disc,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  LifeBuoy
} from 'lucide-react';

const ICONS = [
  Sparkles,
  Zap,
  Disc,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  LifeBuoy
];

export default function TopServiceBar({ activeIndex, onSelect }) {
  return (
    <div className="w-full flex items-center justify-center pt-2 sm:pt-3 pb-2 z-20">
      <div className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-x-auto max-w-[95%] sm:max-w-none">
        {collections.map((item, idx) => {
          const isActive = idx === activeIndex;
          const Icon = ICONS[idx] || Sparkles;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[0.72rem] sm:text-[0.78rem] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                isActive
                  ? 'bg-stylein-red/20 text-white border-stylein-red/60 shadow-[0_0_15px_rgba(229,9,20,0.35)] scale-[1.03]'
                  : 'bg-transparent text-neutral-400 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon
                size={14}
                className={`transition-transform duration-300 ${isActive ? 'text-stylein-red scale-110' : 'text-neutral-400'}`}
              />
              <span className="font-heading tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
