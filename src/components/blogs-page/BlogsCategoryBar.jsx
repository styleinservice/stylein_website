import React from 'react';

const CATEGORIES = [
  'All',
  'Car Care',
  'Paint Protection',
  'Detailing',
  'Roadside Assistance',
  'Maintenance',
  'Industry News',
];

export default function BlogsCategoryBar({ activeCategory, onSelectCategory }) {
  return (
    <div className="w-full max-w-[1180px] mx-auto px-6 mb-8 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-2.5 p-1.5 rounded-2xl bg-[#0a0c12]/80 border border-white/[0.08] backdrop-blur-xl">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category || (!activeCategory && category === 'All');
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category === 'All' ? '' : category)}
              className={`px-4 py-2 rounded-xl text-[0.78rem] sm:text-[0.82rem] font-semibold whitespace-nowrap transition-all duration-300 font-heading cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#E50914] to-[#FF1F2D] text-white shadow-[0_4px_16px_rgba(229,9,20,0.45)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
