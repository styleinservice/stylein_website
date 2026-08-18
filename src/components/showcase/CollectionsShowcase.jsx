import React, { useState } from 'react';
import Particles from './Particles';
import TopServiceBar from './TopServiceBar';
import ShowcaseLeft from './ShowcaseLeft';
import ShowcaseCenter from './ShowcaseCenter';
import { collections } from '../../data/collections';

export default function CollectionsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectService = (idx) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  const collection = collections[activeIndex];

  return (
    <section
      id="services"
      className="relative w-full py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-12 bg-[#050507] overflow-hidden"
    >
      {/* Deep Obsidian Black Ambient Background with Ultra-Subtle Warm Core */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, rgba(180,10,20,0.06) 0%, rgba(6,6,8,0.98) 50%, #040406 100%)',
        }}
      />

      <Particles color="#e50914" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Top Service Navigation Strip (Click-to-switch Tabs) */}
        <TopServiceBar
          activeIndex={activeIndex}
          onSelect={handleSelectService}
        />

        {/* 2-Column Luxury Showcase (Left Text, Right Glass Image) */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
          <ShowcaseLeft
            collection={collection}
            activeIndex={activeIndex}
            onSelect={handleSelectService}
          />
          <ShowcaseCenter
            collection={collection}
            activeIndex={activeIndex}
          />
        </div>
      </div>
    </section>
  );
}
