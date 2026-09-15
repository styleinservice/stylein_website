import React from 'react';
import { HERO_VIDEO_URL } from '../../constants/videoConfig';

export default function HeroVideo() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#07080a]">
      {/* Direct Autoplay Video Element with Instant WebP Poster */}
      <video
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        poster="/assets/images/stylein-hero-fallback.webp"
        className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none z-1"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* Light Base Dark Tint */}
      <div className="absolute inset-0 bg-black/18 z-2" />

      {/* Subtle Top Vignette for Navbar Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/60 via-transparent to-transparent z-3 pointer-events-none" />

      {/* Subtle Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent z-4 pointer-events-none" />
    </div>
  );
}
