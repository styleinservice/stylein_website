import React from 'react';

export default function RescueGetStarted({ getStarted }) {
  let points = [];
  if (getStarted && Array.isArray(getStarted.points)) {
    points = getStarted.points;
  } else if (getStarted && typeof getStarted === 'object') {
    points = Object.values(getStarted).filter((v) => typeof v === 'string');
  }

  if (points.length === 0) {
    points = [
      'Download the Stylein app',
      'Tap Rescue Services and choose the required assistance',
      'Get immediate roadside support at your location',
    ];
  }

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04]">
      <div className="w-full max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="text-[0.72rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-2">
            RAPID DISPATCH PROCESS
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
            How It Works In {points.length} Steps
          </h2>
        </div>

        {/* Timeline: Desktop Horizontal / Mobile Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {points.map((point, idx) => {
            const stepNumber = String(idx + 1).padStart(2, '0');
            const stepText = typeof point === 'string' ? point : point.text || '';
            const isLast = idx === points.length - 1;

            return (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step Circle */}
                <div className="w-16 h-16 rounded-2xl bg-[#090C12] border-2 border-white/15 group-hover:border-stylein-red flex items-center justify-center font-heading text-lg font-extrabold text-white mb-5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] z-10">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-300 group-hover:from-white group-hover:to-stylein-red">
                    {stepNumber}
                  </span>
                </div>

                {/* Step Content Card */}
                <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#090C12]/80 border border-white/[0.06] group-hover:border-white/15 transition-all duration-300 min-h-[110px] flex items-center justify-center">
                  <p className="font-body text-neutral-200 text-xs sm:text-sm font-medium leading-relaxed">
                    {stepText}
                  </p>
                </div>

                {/* Desktop Horizontal Red Connector Line */}
                {!isLast && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-stylein-red/60 via-stylein-red/20 to-transparent pointer-events-none z-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
