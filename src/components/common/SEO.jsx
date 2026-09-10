import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { DEFAULT_SEO_BY_KEY, generateSchemaJsonLd } from '../../constants/seoData';

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

function updateOrCreateLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Universal SEO component that reads from the admin-managed backend API (/seo)
 * and dynamically injects Title, Meta Description, Meta Keywords, Canonical, Robots, and OG tags into the DOM.
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

    // 2. Standard Meta & Link Tags
    updateOrCreateMetaTag('name', 'description', finalDescription);
    updateOrCreateMetaTag('name', 'keywords', finalKeywords);
    updateOrCreateMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateOrCreateMetaTag('name', 'author', 'STYLEIN');
    updateOrCreateMetaTag('name', 'publisher', 'STYLEIN Car Services LLC');
    updateOrCreateLinkTag('canonical', window.location.origin + window.location.pathname);
    if (finalOgImage) updateOrCreateLinkTag('image_src', finalOgImage);

    // 3. OpenGraph Tags (Facebook, WhatsApp, LinkedIn)
    updateOrCreateMetaTag('property', 'og:title', finalTitle);
    updateOrCreateMetaTag('property', 'og:description', finalDescription);
    updateOrCreateMetaTag('property', 'og:url', currentUrl);
    updateOrCreateMetaTag('property', 'og:type', 'website');
    if (finalOgImage) updateOrCreateMetaTag('property', 'og:image', finalOgImage);

    // 4. Twitter Cards
    updateOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMetaTag('name', 'twitter:title', finalTitle);
    updateOrCreateMetaTag('name', 'twitter:description', finalDescription);
    if (finalOgImage) updateOrCreateMetaTag('name', 'twitter:image', finalOgImage);

    // 5. Schema.org JSON-LD
    const schema = generateSchemaJsonLd(pageKey, finalTitle, finalDescription, currentUrl);
    let sEl = document.getElementById('stylein-dynamic-schema');
    if (!sEl) {
      sEl = document.createElement('script');
      sEl.id = 'stylein-dynamic-schema';
      sEl.type = 'application/ld+json';
      document.head.appendChild(sEl);
    }
    sEl.textContent = JSON.stringify(schema);
  }, [pageKey, title, description, keywords, ogImage, seoData, fallback]);

  return null;
}
