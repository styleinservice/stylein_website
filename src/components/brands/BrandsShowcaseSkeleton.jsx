import React from 'react';

export default function BrandsShowcaseSkeleton() {
  return (
    <section className="relative w-full py-10 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-12 bg-[#040406] overflow-hidden border-t border-white/[0.04]">
      {/* Ambient Red Atmosphere */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(180,10,20,0.08) 0%, rgba(6,6,8,0.98) 55%, #040406 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1160px] mx-auto flex flex-col items-center gap-6 sm:gap-8 w-full animate-pulse">
        {/* Section Header Shimmer */}
        <div className="text-center flex flex-col items-center gap-2 max-w-xl">
          <div className="w-48 h-5 rounded-full bg-stylein-red/15 border border-stylein-red/20 mb-1" />
          <div className="w-56 sm:w-64 h-8 sm:h-9 rounded-lg bg-white/[0.08]" />
          <div className="w-72 sm:w-80 h-3.5 rounded bg-white/[0.04] mt-1" />
        </div>

        {/* 3-Column Luxury Showcase Grid Shimmer */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-5 mt-2">
          {/* Left Column Shimmer */}
          <div className="order-2 lg:order-1 lg:col-span-4 w-full flex flex-col items-start gap-4">
            <div className="w-20 h-4 rounded bg-stylein-red/20" />
            <div className="w-40 h-8 rounded-lg bg-white/[0.08]" />
            <div className="w-56 h-3.5 rounded bg-white/[0.04]" />
            <div className="w-full flex flex-col gap-2 mt-3">
              <div className="w-full h-3 rounded bg-white/[0.03]" />
              <div className="w-[85%] h-3 rounded bg-white/[0.03]" />
            </div>
            <div className="w-32 h-10 rounded-xl bg-white/[0.05] mt-3" />
          </div>

          {/* Center Column: Studio Vehicle Podium Frame */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/[0.08] p-6 flex flex-col justify-center items-center shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="w-4/5 h-36 rounded-2xl bg-white/[0.03] flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/[0.02]" />
            </div>
          </div>

          {/* Right Column: Mini Thumbnails Shimmer */}
          <div className="order-3 lg:col-span-3 w-full hidden lg:flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05] p-3 flex items-center gap-3"
              >
                <div className="w-12 h-10 rounded-lg bg-white/[0.04]" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="w-20 h-3 rounded bg-white/[0.06]" />
                  <div className="w-12 h-2 rounded bg-white/[0.03]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
