import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const BrandsPage = lazy(() => import('./pages/BrandsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/Services/index'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetail/index'));
const RescuePage = lazy(() => import('./pages/Rescue/index'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#05060a]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rescue" element={<RescuePage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/faq" element={<Navigate to="/faqs" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
