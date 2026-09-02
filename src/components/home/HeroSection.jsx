import React from 'react';
import HeroVideo from './HeroVideo';
import HeroContent from './HeroContent';

export default function HeroSection({ isReady }) {
  return (
    <section className="relative min-h-screen w-full bg-[#07080a] flex items-center justify-center overflow-hidden">
      {/* Autoplay Background Video */}
      <HeroVideo />

      {/* Hero Content (Headline + Scan to Download Badge) */}
      <HeroContent isReady={isReady} />
    </section>
  );
}
