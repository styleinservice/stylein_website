import React from 'react';
import AppShowcaseLeft from './AppShowcaseLeft';
import AppShowcaseRight from './AppShowcaseRight';

export default function AppShowcaseSection() {
  return (
    <section id="app" className="relative w-full py-12 sm:py-16 pb-6 sm:pb-8 px-6 sm:px-12 lg:px-16 bg-[#040406] flex items-center justify-center overflow-hidden">
      {/* Deep Dark Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] bg-[#e50914]/8 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] bg-[#e50914]/6 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1240px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 relative z-10">
        {/* Left: Text & QR Code Badges */}
        <AppShowcaseLeft />

        {/* Right: 360-Degree Rotatable 3D Smartphone Body */}
        <AppShowcaseRight />
      </div>
    </section>
  );
}
