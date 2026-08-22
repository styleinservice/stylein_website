import React, { useState } from 'react';
import { CheckCircle2, Clock, Tag } from 'lucide-react';

export default function DetailInteractiveCard({
  item,
  fallbackTitle = '',
  fallbackDesc = '',
  fallbackPoints = [],
  fallbackPrice = null,
  fallbackDuration = '',
  isControlled = false,
  isOpen: controlledIsOpen = false,
  onToggle,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [localIsOpen, setLocalIsOpen] = useState(false);

  if (!item) return null;

  const isOpen = (isControlled ? controlledIsOpen : localIsOpen) || isHovered;

  const image = item.image || '';
  const title = item.text || item.title || item.name || fallbackTitle || 'Automotive Service';
  const description = item.description || fallbackDesc || '';
  const points = Array.isArray(item.points) && item.points.length > 0 ? item.points : fallbackPoints;
  const duration = item.duration || fallbackDuration;
  const price = item.price || fallbackPrice;

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setLocalIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative w-full h-[380px] sm:h-[430px] md:h-[460px] rounded-[26px] overflow-hidden bg-[#090C12] border border-white/[0.08] hover:border-white/20 flex flex-col justify-end select-none cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-500 will-change-transform"
    >
      {/* Full Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#07090e]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-104 select-none pointer-events-none"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-white/[0.03]" />
        )}
      </div>

      {/* Natural Soft Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 pointer-events-none transition-opacity duration-500" />
      <div
        className={`absolute inset-0 bg-black/25 z-10 pointer-events-none transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Content Container Positioned at Bottom */}
      <div className="relative z-20 p-4 sm:p-5 flex flex-col justify-end text-left w-full">
        {/* Scaled-down Compact Title */}
        <h3 className="font-heading text-sm sm:text-[0.95rem] md:text-base font-bold text-white uppercase tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {title}
        </h3>

        {/* Scaled-down Description */}
        {description && (
          <p className="font-body text-[0.7rem] sm:text-[0.76rem] text-neutral-300/90 leading-snug mt-1 line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {description}
          </p>
        )}

        {/* Hardware-Accelerated Smooth CSS Grid Transition */}
        <div
          className={`grid transition-[grid-template-rows,opacity,margin,padding] duration-500 ease-[0.16,1,0.3,1] ${
            isOpen
              ? 'grid-rows-[1fr] opacity-100 mt-2.5 pt-2.5 border-t border-white/10'
              : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            {/* Bullet Points */}
            {points && points.length > 0 && (
              <div className="flex flex-col gap-1.5 mb-2.5">
                {points.slice(0, 4).map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-stylein-red shrink-0" />
                    <span className="font-body text-[0.68rem] sm:text-[0.74rem] text-neutral-200 line-clamp-1 leading-tight">
                      {typeof pt === 'string' ? pt : pt.text || ''}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Duration & Price Row */}
            {(duration || price) && (
              <div className="flex items-center gap-3 pt-0.5 text-[0.66rem] sm:text-[0.72rem] font-semibold font-heading uppercase tracking-wider text-neutral-300">
                {duration && (
                  <span className="inline-flex items-center gap-1 text-neutral-300">
                    <Clock size={11} className="text-stylein-red" />
                    <span>{duration}</span>
                  </span>
                )}
                {price && (
                  <span className="inline-flex items-center gap-1 text-white">
                    <Tag size={11} className="text-stylein-red" />
                    <span>AED {Number(price).toLocaleString()}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
