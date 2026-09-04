import React from 'react';
import { Smartphone } from 'lucide-react';

export default function GetStarted({ getStarted, serviceTitle = '' }) {
  // Extract points or fallback
  let points = [];
  if (getStarted && Array.isArray(getStarted.points)) {
    points = getStarted.points;
  } else if (getStarted && typeof getStarted === 'object') {
    points = Object.values(getStarted).filter((v) => typeof v === 'string');
  }

  if (points.length === 0) {
    points = [
      'Download the STYLEIN App from App Store or Google Play',
      `Select ${serviceTitle || 'your service'} and choose your preferred location & time slot`,
      'Relax while our certified technicians arrive on-demand and deliver perfection',
    ];
  }

  return (
    <section className="relative w-full py-14 sm:py-20 px-6 sm:px-10 lg:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-stylein-red text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase mb-3 font-heading">
            <Smartphone size={12} />
            <span>SEAMLESS BOOKING</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14]">
            Get Started In {points.length} Steps
          </h2>

          <p className="font-body text-neutral-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Experience the future of automotive care with effortless on-demand booking.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {points.map((point, idx) => {
            const stepNum = String(idx + 1).padStart(2, '0');
            const stepText = typeof point === 'string' ? point : point.text || point.title || '';

            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-[28px] bg-[#090C12] border border-white/[0.08] hover:border-stylein-red/40 flex flex-col items-start justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Step Number Badge */}
                <div className="w-12 h-12 rounded-2xl bg-[#06080d] border border-white/10 group-hover:border-stylein-red/40 flex items-center justify-center text-lg font-bold font-heading text-neutral-400 group-hover:text-stylein-red transition-colors mb-6">
                  {stepNum}
                </div>

                <div className="flex flex-col text-left">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-2">
                    Step {stepNum}
                  </h3>
                  <p className="font-body text-neutral-300/85 text-xs sm:text-sm leading-relaxed">
                    {stepText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
