import React from 'react';

export default function RescueSkeleton() {
  return (
    <div className="w-full min-h-screen py-16 px-6 sm:px-10 lg:px-12 max-w-[1280px] mx-auto animate-pulse flex flex-col gap-16">
      {/* Tabs Shimmer */}
      <div className="w-full flex justify-center">
        <div className="w-80 h-12 rounded-full bg-white/[0.04] border border-white/[0.08]" />
      </div>

      {/* Hero 2-Column Shimmer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="w-36 h-6 rounded-full bg-white/[0.05]" />
          <div className="w-3/4 h-12 rounded-2xl bg-white/[0.06]" />
          <div className="w-full h-20 rounded-xl bg-white/[0.03]" />
          <div className="w-44 h-12 rounded-full bg-white/[0.07] mt-4" />
        </div>
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[420px] aspect-[4/3] rounded-3xl bg-white/[0.04]" />
        </div>
      </div>

      {/* Cards Shimmer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((n) => (
          <div key={n} className="rounded-[28px] bg-white/[0.03] border border-white/[0.06] p-7 flex flex-col gap-4">
            <div className="w-full aspect-[16/10] rounded-2xl bg-white/[0.05]" />
            <div className="w-1/2 h-7 rounded-xl bg-white/[0.06]" />
            <div className="w-full h-12 rounded-lg bg-white/[0.03]" />
          </div>
        ))}
      </div>
    </div>
  );
}
