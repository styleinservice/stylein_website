import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const BrandsPage = lazy(() => import('./pages/BrandsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/Services/index'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetail/index'));
const RescuePage = lazy(() => import('./pages/Rescue/index'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage/index'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage/index'));
const LegalPage = lazy(() => import('./pages/LegalPage/index'));
const ContactPage = lazy(() => import('./pages/ContactPage/index'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#05060a]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog" element={<Navigate to="/blogs" replace />} />
          <Route path="/blog/:slug" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rescue" element={<RescuePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/faq" element={<Navigate to="/faqs" replace />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/terms" element={<Navigate to="/legal" replace />} />
          <Route path="/privacy" element={<Navigate to="/legal" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
