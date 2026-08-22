import React from 'react';

export default function ServicesSkeleton() {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
      {skeletonItems.map((_, idx) => (
        <div
          key={idx}
          className="h-[235px] sm:h-[275px] md:h-[295px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#090C12] border border-white/[0.06] flex flex-col justify-between animate-pulse"
        >
          {/* Top Image Area Placeholder */}
          <div className="h-[56%] w-full bg-[#06080d]/80 p-2 sm:p-3 flex items-center justify-center border-b border-white/[0.04]">
            <div className="w-3/4 h-16 sm:h-24 rounded-xl bg-white/[0.03] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/[0.02]" />
            </div>
          </div>

          {/* Bottom Content Placeholder */}
          <div className="h-[44%] p-2.5 sm:p-3 flex flex-col justify-between bg-[#090C12]">
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <div className="w-3/4 h-3.5 sm:h-4 rounded bg-white/[0.08]" />
              <div className="w-full h-2 sm:h-2.5 rounded bg-white/[0.04] mt-0.5" />
              <div className="w-4/5 h-2 sm:h-2.5 rounded bg-white/[0.04]" />
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className="w-12 h-2 rounded bg-white/[0.04]" />
              <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-white/[0.04]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
