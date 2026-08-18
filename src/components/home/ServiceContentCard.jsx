import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ServiceContentCard({
  service,
  direction,
  currentIndex,
  totalServices,
}) {
  const slideClass = direction === 'up'
    ? 'animate-[slideInUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]'
    : 'animate-[slideInDown_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]';

  return (
    <div
      key={service.id}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full max-w-[980px] mx-auto px-6 ${slideClass}`}
    >
      {/* Left — Text Information */}
      <div className="flex flex-col gap-3.5 animate-[fadeSlideLeft_0.65s_cubic-bezier(0.16,1,0.3,1)_0.08s_both]">
        {/* Category Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] w-fit text-[0.72rem] font-medium text-neutral-400">
          <span className="text-stylein-red font-semibold tracking-wider">
            {String(currentIndex).padStart(2, '0')} / {String(totalServices).padStart(2, '0')}
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span className="tracking-wide uppercase text-neutral-300">STYLEIN ON-DEMAND</span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-[1.45rem] sm:text-[1.75rem] lg:text-[1.95rem] font-bold text-white leading-[1.2] tracking-[-0.015em]">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-400 text-[0.825rem] sm:text-[0.875rem] leading-relaxed max-w-[420px] font-body">
          {service.description}
        </p>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 mt-1">
          <a
            href={service.href}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.8rem] font-semibold no-underline transition-all duration-300 group ${
              service.isRescue
                ? 'bg-gradient-to-r from-stylein-red to-[#ff2a37] text-white shadow-[0_4px_20px_rgba(229,9,20,0.35)] hover:shadow-[0_6px_30px_rgba(229,9,20,0.5)] hover:-translate-y-0.5'
                : 'bg-white/[0.08] text-white border border-white/[0.12] hover:bg-white/[0.14] hover:border-white/[0.22] hover:-translate-y-0.5'
            }`}
          >
            <span>{service.cta}</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </a>

          {service.ctaSecondary && (
            <a
              href={service.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.8rem] font-semibold no-underline bg-transparent text-neutral-300 border border-white/[0.08] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 group"
            >
              <span>{service.ctaSecondary}</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>

      {/* Right — Showcase Image with Ambient Glass Card */}
      <div className="flex items-center justify-center animate-[fadeSlideRight_0.7s_cubic-bezier(0.16,1,0.3,1)_0.12s_both]">
        <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[4/3] rounded-2xl overflow-hidden group border border-white/[0.12] bg-[#0c0e14]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-stylein-red/15 rounded-full blur-3xl pointer-events-none" />

          <img
            src={service.image}
            alt={service.label}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
