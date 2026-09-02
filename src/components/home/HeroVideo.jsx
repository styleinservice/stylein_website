import React, { useState } from 'react';

const CLOUDINARY_VIDEO_URL =
  'https://res.cloudinary.com/hrd4p6l8/video/upload/f_auto,q_auto/v1788351643/WEBSITE_PAGE_VIDEO.mp4';
const CLOUDINARY_VIDEO_FALLBACK =
  'https://res.cloudinary.com/hrd4p6l8/video/upload/v1788351643/WEBSITE_PAGE_VIDEO.mp4';

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#07080a]">
      {/* High-res Image Fallback */}
      <img
        src="/assets/images/stylein-hero-fallback.webp"
        alt="Automotive background"
        className={`absolute inset-0 w-full h-full object-cover scale-112 origin-center transition-opacity duration-800 ease-in-out z-1 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Cloudinary CDN Streamed Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/images/stylein-hero-fallback.webp"
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover scale-112 origin-center z-2"
      >
        <source src={CLOUDINARY_VIDEO_URL} type="video/mp4" />
        <source src={CLOUDINARY_VIDEO_FALLBACK} type="video/mp4" />
      </video>

      {/* Light Base Dark Tint */}
      <div className="absolute inset-0 bg-black/18 z-3" />

      {/* Subtle Top Vignette for Navbar Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/60 via-transparent to-transparent z-4" />

      {/* Subtle Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent z-5" />
    </div>
  );
}
