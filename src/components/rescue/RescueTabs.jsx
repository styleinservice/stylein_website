import React from 'react';

export default function RescueTabs({ heroServices = [], activeIndex = 0, onSelectTab }) {
  if (!heroServices || heroServices.length === 0) return null;

  return (
    <div className="w-full flex justify-center mb-7 sm:mb-10 relative z-20 px-2 sm:px-4">
      {/* Floating Island Glass Container Fitting All 3 in Single Row Without Scroll */}
      <div className="w-full max-w-[640px] grid grid-cols-3 gap-1.5 sm:gap-3 p-1.5 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-[#090b10]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        {heroServices.map((service, idx) => {
          const isActive = idx === activeIndex;
          const name = service.name || `Service ${idx + 1}`;
          const image = service.image || '';

          return (
            <button
              key={service._id || idx}
              onClick={() => onSelectTab(idx)}
              className={`w-full flex flex-col items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer select-none group border ${
                isActive
                  ? 'bg-[#12151f] border-white/25 shadow-[0_8px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(229,9,20,0.15)] scale-[1.02]'
                  : 'bg-transparent border-transparent hover:bg-white/[0.04] hover:border-white/10'
              }`}
              aria-label={name}
            >
              {/* 3D Image on Top */}
              <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.8)]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04]" />
                )}
              </div>

              {/* Multi-line Service Name Below */}
              <span
                className={`font-heading text-[0.62rem] sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-wide transition-colors text-center leading-tight whitespace-normal break-words max-w-full ${
                  isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                }`}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
