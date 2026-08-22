import React from 'react';

export default function RescueIntro({ description = '' }) {
  if (!description) return null;

  return (
    <section className="relative w-full py-12 sm:py-16 px-6 sm:px-10 lg:px-12 bg-[#040406] border-y border-white/[0.04]">
      <div className="w-full max-w-[960px] mx-auto text-center flex flex-col items-center">
        <span className="text-[0.72rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-3">
          INSTANT RELIEF ON THE ROAD
        </span>

        <p className="font-heading text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-medium text-neutral-200 leading-relaxed tracking-tight">
          &ldquo;{description}&rdquo;
        </p>
      </div>
    </section>
  );
}
