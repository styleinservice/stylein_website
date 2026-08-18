import React, { useState } from 'react';
import videoFile from '../../assets/videos/WEBSITE_PAGE_VIDEO.mp4';

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#07080a]">
      {/* High-res Image Fallback */}
      <img
        src="/assets/images/stylein-hero-fallback.jpg"
        alt="Automotive background"
        className={`absolute inset-0 w-full h-full object-cover scale-112 origin-center transition-opacity duration-800 ease-in-out z-1 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Autoplay Video Element */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/images/stylein-hero-fallback.jpg"
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover scale-112 origin-center z-2"
      >
        <source src={videoFile} type="video/mp4" />
        <source src="/assets/videos/WEBSITE_PAGE_VIDEO.mp4" type="video/mp4" />
      </video>

      {/* Light Base Dark Tint (Reduced darkness for bright, vivid video) */}
      <div className="absolute inset-0 bg-black/18 z-3" />

      {/* Subtle Top Vignette for Navbar Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/60 via-transparent to-transparent z-4" />

      {/* Subtle Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent z-5" />
    </div>
  );
}
