import React from 'react';

export default function DetailSkeleton() {
  return (
    <div className="w-full min-h-screen px-6 sm:px-10 lg:px-12 py-12 max-w-[1280px] mx-auto animate-pulse flex flex-col gap-16">
      {/* Hero Skeleton */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-10 min-h-[60vh]">
        <div className="lg:col-span-7 flex flex-col items-start gap-4">
          <div className="w-32 h-6 rounded-full bg-white/[0.06]" />
          <div className="w-4/5 h-12 rounded-2xl bg-white/[0.08]" />
          <div className="w-full h-4 rounded bg-white/[0.04] mt-2" />
          <div className="w-3/4 h-4 rounded bg-white/[0.04]" />
          <div className="flex gap-4 mt-6">
            <div className="w-36 h-12 rounded-2xl bg-white/[0.08]" />
            <div className="w-36 h-12 rounded-2xl bg-white/[0.05]" />
          </div>
        </div>
        <div className="lg:col-span-5 w-full aspect-[4/3] rounded-3xl bg-white/[0.03] border border-white/[0.06]" />
      </div>

      {/* Highlights Skeleton */}
      <div className="w-full flex flex-col gap-6">
        <div className="w-48 h-6 rounded-lg bg-white/[0.06]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-56 rounded-2xl bg-[#090C12] border border-white/[0.06] p-4 flex flex-col justify-between">
              <div className="w-full h-28 rounded-xl bg-white/[0.03]" />
              <div className="w-3/4 h-4 rounded bg-white/[0.06]" />
              <div className="w-full h-3 rounded bg-white/[0.03]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
