import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const REVIEWS = [
  {
    author: 'Rashid Al-Maktoum',
    vehicle: 'Porsche 911 GT3 RS',
    rating: 5,
    comment: 'The level of precision and care STYLEIN provided at my private residence was exceptional. Zero hassle, impeccably executed.',
  },
  {
    author: 'Alexander Wright',
    vehicle: 'Mercedes-AMG G63',
    rating: 5,
    comment: 'Flawless doorstep service. The technicians arrived exactly on time with full studio-grade equipment.',
  },
  {
    author: 'Khalfan Al-Nuaimi',
    vehicle: 'Range Rover SV',
    rating: 5,
    comment: 'Unmatched quality in Dubai. The convenience of having certified specialists at my doorstep is worth every dirham.',
  },
];

export default function CustomerExperience() {
  return (
    <section className="relative w-full py-14 sm:py-20 px-6 sm:px-10 lg:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-stylein-red text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase mb-3 font-heading">
            <MessageSquare size={12} />
            <span>CLIENT EXPERIENCES</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14]">
            Trusted By Discerning Owners
          </h2>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-[26px] bg-[#090C12] border border-white/[0.06] flex flex-col justify-between"
            >
              <div className="flex items-center gap-1 text-stylein-red mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#FF1E1E" />
                ))}
              </div>

              <p className="font-body text-neutral-300/85 text-xs sm:text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.comment}&rdquo;
              </p>

              <div className="flex flex-col border-t border-white/[0.06] pt-4">
                <span className="font-heading text-sm font-bold text-white uppercase tracking-wide">
                  {review.author}
                </span>
                <span className="font-body text-neutral-400 text-xs mt-0.5">
                  {review.vehicle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
