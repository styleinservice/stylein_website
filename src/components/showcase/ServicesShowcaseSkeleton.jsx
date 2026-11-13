import React from 'react';

export default function ServicesShowcaseSkeleton() {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12 bg-[#050507] overflow-hidden">
      {/* Ambient Red Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, rgba(180,10,20,0.06) 0%, rgba(6,6,8,0.98) 50%, #040406 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1080px] mx-auto flex flex-col items-center gap-10 sm:gap-12 w-full animate-pulse">
        {/* Top Tab Bar Shimmer */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-3 overflow-x-hidden py-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-9 sm:h-10 w-24 sm:w-28 rounded-full bg-white/[0.04] border border-white/[0.06] shrink-0"
            />
          ))}
        </div>

        {/* 2-Column Balanced Grid Shimmer */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          {/* Left Column Shimmer */}
          <div className="w-full flex flex-col justify-center items-start gap-4">
            {/* Number & Tag Badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-6 rounded-md bg-white/[0.06]" />
              <div className="w-24 h-4 rounded-full bg-stylein-red/15" />
            </div>

            {/* Main Heading Shimmer */}
            <div className="w-3/4 h-8 sm:h-10 rounded-lg bg-white/[0.08]" />
            <div className="w-1/2 h-6 sm:h-7 rounded-lg bg-white/[0.05]" />

            {/* Redline Shimmer */}
            <div className="w-48 h-3.5 rounded bg-stylein-red/20 mt-1" />

            {/* Description Lines */}
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="w-full h-3 rounded bg-white/[0.04]" />
              <div className="w-[90%] h-3 rounded bg-white/[0.04]" />
              <div className="w-[75%] h-3 rounded bg-white/[0.04]" />
            </div>

            {/* Action Button */}
            <div className="w-36 h-10 sm:h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] mt-4" />
          </div>

          {/* Right Column: Studio Vehicle Frame Shimmer */}
          <div className="w-full aspect-[16/11] sm:aspect-[16/10] rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/[0.06] p-6 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="w-12 h-4 rounded bg-white/[0.04]" />
            <div className="w-3/4 h-32 mx-auto rounded-2xl bg-white/[0.03] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02]" />
            </div>
            <div className="w-1/3 h-3 rounded bg-white/[0.04]" />
          </div>
        </div>
      </div>
    </section>
  );
}
