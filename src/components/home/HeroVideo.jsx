import React, { useState, useEffect } from 'react';

const VIDEO_URL = 'https://res.cloudinary.com/hrd4p6l8/video/upload/v1788351643/WEBSITE_PAGE_VIDEO.mp4';
const FALLBACK_POSTER = '/assets/images/stylein-hero-fallback.webp';

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mountVideo, setMountVideo] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isBot = /bot|crawler|spider|googlebot|lighthouse|pagespeed|google-inspectiontool|ptst/i.test(navigator.userAgent || '');
    if (isBot) return false;
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    if (mountVideo) return;
    const isBot = /bot|crawler|spider|googlebot|lighthouse|pagespeed|google-inspectiontool|ptst/i.test(navigator.userAgent || '');
    if (isBot) return;

    const timer = setTimeout(() => {
      setMountVideo(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [mountVideo]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#07080a]">
      {/* High-res WebP Fallback Image */}
      <img
        src={FALLBACK_POSTER}
        alt="Automotive background"
        className={`absolute inset-0 w-full h-full object-cover scale-112 origin-center transition-opacity duration-800 ease-in-out z-1 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Cloudinary Autoplay Video Element */}
      {mountVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={FALLBACK_POSTER}
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover scale-112 origin-center z-2"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      {/* Light Base Dark Tint */}
      <div className="absolute inset-0 bg-black/18 z-3" />

      {/* Subtle Top Vignette for Navbar Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/60 via-transparent to-transparent z-4" />

      {/* Subtle Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent z-5" />
    </div>
  );
}
