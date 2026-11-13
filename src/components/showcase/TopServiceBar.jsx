import React from 'react';
import { optimizeCloudinary } from '../../utils/imageOptimizer';

export default function TopServiceBar({ services = [], activeIndex, onSelect }) {
  return (
    <div className="w-full flex items-center justify-center pt-1 pb-1 z-20">
      <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-2xl bg-[#0b0d14]/70 backdrop-blur-3xl border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.65)] w-full max-w-[500px] sm:max-w-none">
        {services.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={item.id || idx}
              onClick={() => onSelect(idx)}
              title={item.name}
              aria-label={item.name}
              className={`w-[22.5%] sm:w-auto flex flex-col items-center justify-center gap-1.5 px-1 sm:px-3.5 py-2 sm:py-2.5 rounded-xl transition-all duration-300 cursor-pointer border shrink-0 ${
                isActive
                  ? 'bg-[#0b0d14]/95 backdrop-blur-3xl border-white/[0.22] shadow-[0_10px_30px_rgba(0,0,0,0.7)] scale-[1.03]'
                  : 'bg-transparent border-transparent hover:bg-white/[0.04] hover:border-white/[0.08]'
              }`}
            >
              {/* Prominent Service 3D Image */}
              <img
                src={optimizeCloudinary(item.image, 140)}
                alt={item.name}
                title={item.name}
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden';
                }}
                className={`w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain transition-all duration-300 ${
                  isActive
                    ? 'scale-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]'
                    : 'opacity-75 group-hover:opacity-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]'
                }`}
                loading={idx < 2 ? 'eager' : 'lazy'}
              />

              {/* Service Label (Uses API name) */}
              <span
                className={`font-heading text-[0.66rem] sm:text-[0.7rem] tracking-tight sm:tracking-wide font-semibold text-center whitespace-normal sm:whitespace-nowrap line-clamp-1 ${
                  isActive ? 'text-white font-bold' : 'text-neutral-400 group-hover:text-neutral-200'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
