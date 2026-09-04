import React from 'react';
import { CheckCircle2, Shield } from 'lucide-react';

export default function WhyChooseUs({ servicesImages = [] }) {
  // Extract all points from servicesImages
  const allPoints = [];
  servicesImages.forEach((item) => {
    if (Array.isArray(item.points)) {
      item.points.forEach((pt) => {
        if (typeof pt === 'string' && pt.trim() && !allPoints.includes(pt.trim())) {
          allPoints.push(pt.trim());
        }
      });
    }
  });

  if (allPoints.length === 0) return null;

  return (
    <section className="relative w-full py-14 sm:py-20 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04]">
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-stylein-red text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase mb-3 font-heading">
            <Shield size={12} />
            <span>UNMATCHED QUALITY</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14]">
            Why Choose This Service
          </h2>

          <p className="font-body text-neutral-400 text-xs sm:text-sm mt-2 max-w-lg leading-relaxed">
            Engineered to perfection with certified technicians, premium materials, and obsessive attention to detail.
          </p>
        </div>

        {/* 2-Column Desktop, 1-Column Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {allPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-[22px] bg-[#090C12] border border-white/[0.06] hover:border-stylein-red/40 flex items-start gap-4 transition-all duration-300 hover:bg-[#0c1018]"
            >
              <div className="w-8 h-8 rounded-xl bg-stylein-red/10 border border-stylein-red/30 flex items-center justify-center text-stylein-red shrink-0 mt-0.5">
                <CheckCircle2 size={16} />
              </div>
              <p className="font-body text-white text-sm sm:text-base font-medium leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
