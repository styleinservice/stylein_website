import React from 'react';
import { Check, Flame } from 'lucide-react';

export default function Gallery({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04]">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-16 sm:gap-24">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-2 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 text-stylein-red text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase mb-3 font-heading">
            <Flame size={12} />
            <span>IN-DEPTH SHOWCASE</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14]">
            Craftsmanship & Precision Detailing
          </h2>
        </div>

        {/* Alternating Storytelling Rows */}
        {items.map((item, idx) => {
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 sm:gap-12 lg:gap-16"
            >
              {/* Image Side */}
              <div
                className={`lg:col-span-6 w-full ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="w-full aspect-[16/11] rounded-[28px] bg-[#090C12] border border-white/[0.08] p-4 sm:p-6 flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.text || 'Gallery Image'}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04]" />
                  )}
                </div>
              </div>

              {/* Content Side */}
              <div
                className={`lg:col-span-6 flex flex-col items-start text-left ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <span className="text-[0.72rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-2">
                  Feature 0{idx + 1}
                </span>

                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight">
                  {item.text || item.title || 'Premium Detail'}
                </h3>

                {item.description && (
                  <p className="font-body text-neutral-300/80 text-sm sm:text-base leading-relaxed mt-3 sm:mt-4">
                    {item.description}
                  </p>
                )}

                {/* Bullet Points */}
                {Array.isArray(item.points) && item.points.length > 0 && (
                  <div className="flex flex-col gap-2.5 mt-5 sm:mt-6 w-full">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-stylein-red/15 border border-stylein-red/30 flex items-center justify-center text-stylein-red shrink-0">
                          <Check size={12} />
                        </div>
                        <span className="font-body text-neutral-200 text-xs sm:text-sm">
                          {typeof pt === 'string' ? pt : pt.text || pt.title || ''}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
