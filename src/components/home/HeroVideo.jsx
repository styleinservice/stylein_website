import React, { useState, useEffect, useRef } from 'react';
import { isBotCrawler } from './StyleinLoader';
import { HERO_VIDEO_URL } from '../../constants/videoConfig';

const FALLBACK_POSTER = '/assets/images/stylein-hero-fallback.webp';

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mountVideo, setMountVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isBotCrawler()) return;

    // Mobile & Save-Data Optimization: Do not stream 10MB video on mobile
    const isMobile = window.innerWidth < 768;
    const isSaveData = Boolean(navigator.connection && navigator.connection.saveData);
    if (isMobile || isSaveData) return;

    // Desktop: Defer video mount until browser idle/after load
    const mountCallback = () => {
      const timer = setTimeout(() => {
        setMountVideo(true);
      }, 1500);
      return timer;
    };

    let timerId;
    if (document.readyState === 'complete') {
      timerId = mountCallback();
    } else {
      const handleLoad = () => {
        timerId = mountCallback();
      };
      window.addEventListener('load', handleLoad, { once: true });
      return () => {
        window.removeEventListener('load', handleLoad);
        if (timerId) clearTimeout(timerId);
      };
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (mountVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [mountVideo]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#07080a]">
      {/* High-res WebP Fallback Image - Instant LCP */}
      <img
        src={FALLBACK_POSTER}
        alt="STYLEIN Doorstep Automotive Care"
        title="STYLEIN Doorstep Automotive Background"
        loading="eager"
        fetchPriority="high"
        className={`absolute inset-0 w-full h-full object-cover scale-112 origin-center transition-opacity duration-1000 ease-in-out z-1 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Cloudinary Autoplay Video Element - Desktop only deferred */}
      {mountVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          poster={FALLBACK_POSTER}
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-112 origin-center transition-opacity duration-1000 z-2 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
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
