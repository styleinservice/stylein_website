import React from 'react';
import HeroVideo from './HeroVideo';
import HeroContent from './HeroContent';

export default function HeroSection({ isReady, isFirstVisit = true }) {
  return (
    <section className="relative min-h-screen w-full bg-[#07080a] flex items-center justify-center overflow-hidden">
      <HeroVideo />
      <HeroContent isReady={isReady} isFirstVisit={isFirstVisit} />
    </section>
  );
}
