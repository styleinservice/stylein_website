import React, { useState } from 'react';
import { SmoothScrollProvider } from '../context/SmoothScrollContext';
import StyleinLoader from '../components/home/StyleinLoader';
import StyleinNavbar from '../components/home/StyleinNavbar';
import HeroSection from '../components/home/HeroSection';
import CollectionsShowcase from '../components/showcase/CollectionsShowcase';
import AppShowcaseSection from '../components/app-showcase/AppShowcaseSection';
import FAQSection from '../components/faq/FAQSection';
import TestimonialsSection from '../components/testimonials/TestimonialsSection';
import GetAppBanner from '../components/download-banner/GetAppBanner';
import StyleinFooter from '../components/footer/StyleinFooter';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  return (
    <SmoothScrollProvider>
      <main className="bg-[#030406] min-h-screen relative selection:bg-stylein-red selection:text-white">
        {/* Brand Intro Loader */}
        <StyleinLoader
          onStartReveal={() => setIsReady(true)}
          onComplete={() => setIsReady(true)}
        />

        {/* Sticky Floating Glass Navbar */}
        <StyleinNavbar isReady={isReady} />

        {/* Main Content Shutter Layer (Rolls up over fixed footer) */}
        <div className="relative z-10 bg-[#07080a] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5">
          {/* Hero Section with Framer Motion triggers */}
          <HeroSection isReady={isReady} />

          {/* 7 Core Services Pinned Luxury Showcase */}
          <CollectionsShowcase />

          {/* 3D Mobile App Experience Showcase */}
          <AppShowcaseSection />

          {/* Luxury FAQ Section (Single Accordion Open with Smooth Height Motion) */}
          <FAQSection />

          {/* Lightweight Luxury Customer Reviews Carousel */}
          <TestimonialsSection />

          {/* Liquid Glassy "Get The App" Banner Section */}
          <GetAppBanner />
        </div>

        {/* Fixed Parallax Reveal Footer (Curtain / Shutter Effect) */}
        <StyleinFooter />
      </main>
    </SmoothScrollProvider>
  );
}
