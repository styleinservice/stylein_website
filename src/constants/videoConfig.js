/**
 * Video URL Configuration
 * Reads video URLs from Vite environment variables with automatic fallback
 * and normalizes Google Cloud Storage console URLs to direct streaming endpoints.
 */

export function resolveVideoUrl(envKey = 'VITE_HERO_VIDEO_URL', fallbackUrl = '') {
  const DEFAULT_FALLBACK =
    'https://storage.googleapis.com/stylein_bucket/Services_Content/Video_Home_page/WEBSITE_PAGE_VIDEO-compressed.mp4';

  let rawUrl =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[envKey]) ||
    fallbackUrl ||
    DEFAULT_FALLBACK;

  // Auto-normalize GCP Console URL to direct public streaming URL
  if (rawUrl.includes('storage.cloud.google.com/')) {
    rawUrl = rawUrl.replace('storage.cloud.google.com/', 'storage.googleapis.com/');
  }

  return rawUrl;
}

export const HERO_VIDEO_URL = resolveVideoUrl(
  'VITE_HERO_VIDEO_URL',
  'https://storage.googleapis.com/stylein_bucket/Services_Content/Video_Home_page/WEBSITE_PAGE_VIDEO-compressed.mp4'
);
