import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { DEFAULT_SEO_BY_KEY } from '../../constants/seoData';

// Fast in-memory cache for SEO data
let cachedSeoMap = null;
let pendingSeoPromise = null;

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
