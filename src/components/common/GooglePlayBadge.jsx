import React from 'react';

export default function GooglePlayBadge({ className = '', href = '#google-play' }) {
  return (
    <a
      href={href}
      aria-label="Get it on Google Play"
      className={`inline-flex items-center gap-2.5 h-[46px] px-3.5 rounded-[14px] bg-black border border-white/20 hover:border-white/50 text-white no-underline shadow-[0_4px_15px_rgba(0,0,0,0.7)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.12)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group select-none shrink-0 cursor-pointer ${className}`}
    >
      {/* Official Multicolored Google Play Vector SVG */}
      <img
        src="/assets/icons/google-play.svg"
        alt="Google Play"
        className="w-[20px] h-[22px] object-contain shrink-0"
      />
      <div className="flex flex-col text-left leading-none justify-center">
        <span className="text-[9px] text-neutral-300 font-medium tracking-tight uppercase">
          GET IT ON
        </span>
        <span className="text-[15px] font-bold text-white tracking-tight mt-0.5 font-heading">
          Google Play
        </span>
      </div>
    </a>
  );
}
