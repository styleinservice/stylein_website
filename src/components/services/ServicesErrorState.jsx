import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ServicesErrorState({ onRetry }) {
  return (
    <div className="w-full min-h-[380px] flex flex-col items-center justify-center text-center p-8 rounded-[32px] bg-[#090C12] border border-white/[0.08] my-6">
      <div className="w-14 h-14 rounded-2xl bg-[#FF1E1E]/10 border border-[#FF1E1E]/20 flex items-center justify-center text-[#FF1E1E] mb-4">
        <AlertCircle size={26} />
      </div>

      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
        Unable to Load Services
      </h3>

      <p className="font-body text-neutral-400 text-sm max-w-md mt-2 leading-relaxed">
        We encountered an issue fetching the latest services directory. Please check your connection and try again.
      </p>

      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF1E1E] hover:bg-[#e01919] text-white font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-[0_10px_25px_rgba(255,30,30,0.3)] cursor-pointer"
      >
        <RotateCcw size={16} />
        <span>Try Again</span>
      </button>
    </div>
  );
}
