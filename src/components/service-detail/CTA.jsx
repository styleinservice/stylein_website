import React from 'react';
import { Calendar, Download } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-12 bg-[#050505] overflow-hidden border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[180px] bg-stylein-red/10 pointer-events-none z-0" />

      <div className="relative z-10 max-w-[900px] mx-auto text-center flex flex-col items-center">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold text-white uppercase tracking-tight leading-[1.14] max-w-2xl">
          Ready To Experience Professional{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
            Automotive Care?
          </span>
        </h2>

        <p className="font-body text-neutral-300/85 text-xs sm:text-sm md:text-base mt-4 max-w-lg leading-relaxed">
          Book your service in seconds and let STYLEIN come to you anywhere across the UAE.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="#book"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-stylein-red hover:bg-[#ff2f2f] text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(229,9,20,0.45)] hover:shadow-[0_15px_40px_rgba(229,9,20,0.65)] hover:-translate-y-0.5 no-underline"
          >
            <Calendar size={16} />
            <span>Book Service</span>
          </a>

          <a
            href="#download"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#090C12] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 no-underline"
          >
            <Download size={16} />
            <span>Download App</span>
          </a>
        </div>
      </div>
    </section>
  );
}
