import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function RescueError({ onRetry }) {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-6 py-20 bg-[#030406]">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#090C12] border border-white/10 text-center flex flex-col items-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-stylein-red/10 border border-stylein-red/30 flex items-center justify-center text-stylein-red mb-5 shadow-[0_0_25px_rgba(229,9,20,0.3)]">
          <AlertCircle size={32} />
        </div>

        <h2 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mb-2">
          Unable to load rescue services
        </h2>

        <p className="font-body text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
          An unexpected error occurred while fetching rescue services. Please try again.
        </p>

        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-stylein-red to-[#ff2b38] text-white font-heading text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_10px_25px_rgba(229,9,20,0.4)] hover:shadow-[0_15px_35px_rgba(229,9,20,0.6)] hover:scale-103 active:scale-98 transition-all cursor-pointer border-none"
        >
          <RefreshCw size={14} />
          <span>Retry Loading</span>
        </button>
      </div>
    </div>
  );
}
