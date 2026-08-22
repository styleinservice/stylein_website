import React from 'react';
import { Clock, Tag } from 'lucide-react';

export default function Highlights({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative w-full py-12 sm:py-16 px-6 sm:px-10 lg:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8 sm:mb-10 text-left">
          <span className="text-[0.72rem] sm:text-xs font-bold uppercase tracking-widest text-stylein-red font-heading mb-1.5">
            SERVICE HIGHLIGHTS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            Key Features & Capabilities
          </h2>
        </div>

        {/* Responsive Grid / Mobile Horizontal Scroll */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-x-visible no-scrollbar gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pb-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group min-w-[240px] sm:min-w-0 flex-1 rounded-[24px] bg-[#090C12] border border-white/[0.08] hover:border-stylein-red/50 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(229,9,20,0.15)] select-none"
            >
              {/* Image Area */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#06080d]/80 p-3 flex items-center justify-center overflow-hidden border border-white/[0.03] mb-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.text || 'Highlight'}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/[0.05]" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col text-left">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  {item.duration && (
                    <span className="inline-flex items-center gap-1 text-[0.62rem] text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded-md font-medium">
                      <Clock size={10} className="text-stylein-red" />
                      <span>{item.duration}</span>
                    </span>
                  )}
                  {item.price && (
                    <span className="inline-flex items-center gap-1 text-[0.62rem] text-neutral-300 bg-white/[0.04] px-2 py-0.5 rounded-md font-medium">
                      <Tag size={10} className="text-stylein-red" />
                      <span>AED {Number(item.price).toLocaleString()}</span>
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-sm sm:text-[0.95rem] font-bold text-white uppercase tracking-tight group-hover:text-white line-clamp-1">
                  {item.text || item.title || `Feature ${idx + 1}`}
                </h3>
                {item.description && (
                  <p className="font-body text-neutral-400 text-xs leading-relaxed mt-1 line-clamp-3">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
