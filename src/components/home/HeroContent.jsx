import React from 'react';
import HeroHeadline from './HeroHeadline';
import HeroCTA from './HeroCTA';

export default function HeroContent({ isReady }) {
  return (
    <div className="relative z-10 w-full max-w-[1000px] mx-auto pt-35 pb-15 px-6 flex flex-col items-center justify-center min-h-screen">
      <HeroHeadline isReady={isReady} />
      <HeroCTA isReady={isReady} />
    </div>
  );
}
