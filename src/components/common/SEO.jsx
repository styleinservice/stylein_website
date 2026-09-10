import { useEffect, useState } from 'react';
import api from '../../api/axios';

// Fast in-memory cache for SEO data
let cachedSeoMap = null;
let pendingSeoPromise = null;

const DEFAULT_SEO_BY_KEY = {
  home: {
    metaTitle: 'STYLEIN | Premium On-Demand Car Services & Mobile Auto Care',
    metaDescription: 'The all-in-one app for your car. Premium car wash, tyre change, detailing, battery replacement, and roadside assistance delivered directly to you across Dubai & UAE.',
    metaKeywords: 'car wash dubai, mobile car detailing uae, tyre replacement, battery jumpstart, doorstep car maintenance, luxury auto care',
    ogTitle: 'STYLEIN | Premium On-Demand Car Services & Mobile Auto Care',
    ogDescription: 'The all-in-one app for your car. Certified automotive care delivered to your doorstep in UAE.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp',
  },
  services: {
    metaTitle: 'Our Automotive Services | Mobile Car Care & Detailing | STYLEIN',
    metaDescription: 'Explore STYLEIN\'s comprehensive mobile car care services in Dubai & UAE - from exterior foam wash to interior detailing, ceramic coating, PPF, and battery replacement.',
    metaKeywords: 'car detailing dubai, ceramic coating, car wash at doorstep, steam wash uae, luxury car service, auto detailing packages',
    ogTitle: 'Automotive Services | STYLEIN Mobile Care',
    ogDescription: 'Comprehensive doorstep automotive solutions for luxury, exotic, and daily cars in UAE.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp',
  },
  'service-detail': {
    metaTitle: 'Service Details & Pricing | STYLEIN Doorstep Car Care',
    metaDescription: 'Detailed breakdown of services, pricing, steps, and certified equipment used by STYLEIN mobile workshop units across the UAE.',
    metaKeywords: 'car care packages, service pricing dubai, mobile car wash booking, certified auto service',
    ogTitle: 'Service Details | STYLEIN',
    ogDescription: 'Book certified on-demand automotive services directly to your location.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp',
  },
  rescue: {
    metaTitle: '24/7 Emergency Roadside Assistance & Rescue | STYLEIN UAE',
    metaDescription: 'Rapid 20-30 min emergency rescue in Dubai & UAE. Flat tyre change, dead battery jumpstart & replacement, emergency tyre pressure on-site.',
    metaKeywords: 'emergency roadside assistance dubai, flat tyre repair uae, battery jump start on-demand, car breakdown rescue',
    ogTitle: '24/7 Roadside Rescue | STYLEIN UAE',
    ogDescription: 'Rapid response emergency assistance reaching your GPS location in 20-30 mins.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Rescue.webp',
  },
  brands: {
    metaTitle: 'Luxury & Exotic Car Brands We Service | STYLEIN UAE',
    metaDescription: 'Specialized doorstep car care for Porsche, Mercedes-Benz, BMW, Audi, Ferrari, Lamborghini, Rolls-Royce, Tesla, and more using OEM-approved tools.',
    metaKeywords: 'luxury car service dubai, exotic car detailing, porsche service uae, mercedes wash, supercar maintenance',
    ogTitle: 'Luxury Brands Serviced | STYLEIN',
    ogDescription: 'Trusted care for the world\'s most prestigious automotive marques.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp',
  },
  about: {
    metaTitle: 'About STYLEIN | Redefining Automotive Convenience in UAE',
    metaDescription: 'Learn about STYLEIN\'s mission to revolutionize automotive car care with certified technicians, eco-friendly products, and fully equipped mobile workshops.',
    metaKeywords: 'about stylein, automotive startup dubai, mobile car workshop uae, car care innovators',
    ogTitle: 'About STYLEIN | Revolutionizing Car Care',
    ogDescription: 'Discover how STYLEIN brings the workshop directly to you.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp',
  },
  contact: {
    metaTitle: 'Contact STYLEIN | Book Your Car Service Today',
    metaDescription: 'Get in touch with STYLEIN customer support. Call, WhatsApp, or email our team for bookings, corporate fleets, and inquiries in UAE.',
    metaKeywords: 'contact stylein, car service helpline dubai, stylein whatsapp, customer support uae',
    ogTitle: 'Contact STYLEIN Customer Care',
    ogDescription: 'We\'re here to assist with bookings, corporate fleets, and inquiries.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp',
  },
  faqs: {
    metaTitle: 'FAQs | Answers About STYLEIN Doorstep Car Services',
    metaDescription: 'Find answers to common questions about booking, pricing, service timings, technician certifications, coverage areas across Dubai and UAE.',
    metaKeywords: 'stylein faqs, car service questions, mobile car wash prices dubai, doorstep booking help',
    ogTitle: 'Frequently Asked Questions | STYLEIN',
    ogDescription: 'Everything you need to know about STYLEIN automotive services.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp',
  },
  legal: {
    metaTitle: 'Terms of Service & Privacy Policy | STYLEIN UAE',
    metaDescription: 'Read our terms and conditions, privacy policy, user data handling, and service guarantees for STYLEIN automotive applications and services.',
    metaKeywords: 'terms and conditions, privacy policy, stylein legal terms, user agreement dubai',
    ogTitle: 'Terms & Privacy Policy | STYLEIN',
    ogDescription: 'Legal policies, user guarantees, and data protection terms.',
    ogImage: 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp',
  },
};

function updateOrCreateMetaTag(attribute, attributeValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Universal SEO component that reads from the admin-managed backend API (/seo)
 * and dynamically injects Title, Meta Description, Meta Keywords, and OG tags into the DOM.
 */
export default function SEO({
  pageKey = 'home',
  title,
  description,
  keywords,
  ogImage,
}) {
  const fallback = DEFAULT_SEO_BY_KEY[pageKey] || DEFAULT_SEO_BY_KEY.home;
  const [seoData, setSeoData] = useState(() => {
    if (cachedSeoMap && cachedSeoMap[pageKey]) {
      return cachedSeoMap[pageKey];
    }
    return fallback;
  });

  useEffect(() => {
    let isMounted = true;

    async function loadSeo() {
      if (cachedSeoMap) {
        if (isMounted && cachedSeoMap[pageKey]) {
          setSeoData(cachedSeoMap[pageKey]);
        }
        return;
      }

      if (!pendingSeoPromise) {
        pendingSeoPromise = api
          .get('/seo')
          .then((res) => {
            if (res.data?.status && res.data?.data) {
              cachedSeoMap = res.data.data;
              return cachedSeoMap;
            }
            return null;
          })
          .catch((err) => {
            console.warn('[SEO] Failed to fetch dynamic SEO from backend, using defaults:', err.message);
            return null;
          })
          .finally(() => {
            pendingSeoPromise = null;
          });
      }

      const map = await pendingSeoPromise;
      if (isMounted && map && map[pageKey]) {
        setSeoData(map[pageKey]);
      }
    }

    loadSeo();

    return () => {
      isMounted = false;
    };
  }, [pageKey]);

  useEffect(() => {
    const finalTitle = title || seoData.metaTitle || fallback.metaTitle;
    const finalDescription = description || seoData.metaDescription || fallback.metaDescription;
    const finalKeywords = keywords || seoData.metaKeywords || fallback.metaKeywords;
    const finalOgImage = ogImage || seoData.ogImage || fallback.ogImage;
    const currentUrl = window.location.href;

    // 1. Update Title
    if (finalTitle) {
      document.title = finalTitle;
    }

    // 2. Standard Meta Tags
    updateOrCreateMetaTag('name', 'description', finalDescription);
    updateOrCreateMetaTag('name', 'keywords', finalKeywords);

    // 3. OpenGraph Tags (Facebook, WhatsApp, LinkedIn)
    updateOrCreateMetaTag('property', 'og:title', finalTitle);
    updateOrCreateMetaTag('property', 'og:description', finalDescription);
    updateOrCreateMetaTag('property', 'og:url', currentUrl);
    updateOrCreateMetaTag('property', 'og:type', 'website');
    if (finalOgImage) {
      updateOrCreateMetaTag('property', 'og:image', finalOgImage);
    }

    // 4. Twitter Cards
    updateOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMetaTag('name', 'twitter:title', finalTitle);
    updateOrCreateMetaTag('name', 'twitter:description', finalDescription);
    if (finalOgImage) {
      updateOrCreateMetaTag('name', 'twitter:image', finalOgImage);
    }
  }, [pageKey, title, description, keywords, ogImage, seoData, fallback]);

  return null;
}
