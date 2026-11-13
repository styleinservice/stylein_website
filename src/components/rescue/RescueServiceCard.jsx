import React from 'react';
import { Clock, Tag, CheckCircle2 } from 'lucide-react';

export default function RescueServiceCard({ service }) {
  if (!service) return null;

  const { image, name, description, duration, price, points } = service;

  return (
    <div className="group relative w-full rounded-[28px] bg-[#090C12] border border-white/[0.08] hover:border-stylein-red/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-400 ease-out hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(229,9,20,0.22)] overflow-hidden">
      {/* Subtle Red Ambient Gradient Top-Right */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-stylein-red/5 blur-3xl group-hover:bg-stylein-red/10 transition-colors pointer-events-none" />

      <div>
        {/* Visual Preview */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#05060a] mb-6 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-white/[0.03]" />
          )}

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {duration && (
              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[0.7rem] font-bold font-heading text-neutral-200 uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md">
                <Clock size={12} className="text-stylein-red" />
                <span>{duration}</span>
              </span>
            )}
            {price && (
              <span className="px-3 py-1 rounded-full bg-stylein-red/90 backdrop-blur-md text-white text-[0.7rem] font-bold font-heading uppercase tracking-wider inline-flex items-center gap-1 shadow-md ml-auto">
                <Tag size={12} />
                <span>AED {Number(price).toLocaleString()}</span>
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mb-2 group-hover:text-stylein-red transition-colors text-left">
          {name}
        </h3>

        {description && (
          <p className="font-body text-neutral-300/80 text-xs sm:text-sm leading-relaxed mb-6 text-left">
            {description}
          </p>
        )}

        {/* Points List */}
        {Array.isArray(points) && points.length > 0 && (
          <div className="flex flex-col gap-2.5 pt-4 border-t border-white/[0.06] mb-6 text-left">
            {points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-stylein-red shrink-0 mt-0.5" />
                <span className="font-body text-[0.78rem] sm:text-xs text-neutral-200 leading-snug">
                  {typeof point === 'string' ? point : point.text || ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Button */}
      <a
        href="#download"
        className="w-full py-3 rounded-xl bg-white/[0.06] hover:bg-stylein-red border border-white/10 hover:border-stylein-red text-white text-center font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 no-underline shadow-sm hover:shadow-[0_10px_25px_rgba(229,9,20,0.35)]"
      >
        Book This Service
      </a>
    </div>
  );
}
