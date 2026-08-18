import React from 'react';

export default function AppStoreBadge({ className = '', href = '#app-store' }) {
  return (
    <a
      href={href}
      aria-label="Download on the Apple App Store"
      className={`inline-flex items-center gap-2.5 h-[46px] px-3.5 rounded-[14px] bg-black border border-white/20 hover:border-white/50 text-white no-underline shadow-[0_4px_15px_rgba(0,0,0,0.7)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.12)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group select-none shrink-0 cursor-pointer ${className}`}
    >
      {/* Exact Official Apple Silhouette Icon */}
      <img
        src="/assets/icons/app-store.svg"
        alt="Apple App Store"
        className="w-[20px] h-[24px] object-contain shrink-0"
      />
      <div className="flex flex-col text-left leading-none justify-center">
        <span className="text-[9px] text-neutral-300 font-medium tracking-tight">
          Download on the
        </span>
        <span className="text-[15px] font-bold text-white tracking-tight mt-0.5 font-heading">
          App Store
        </span>
      </div>
    </a>
  );
}
