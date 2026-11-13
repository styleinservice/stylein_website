/**
 * Universal Brand Slug Utility for StyleinCar Main Website Frontend
 * Ensures 100% parity with Backend slug generation and validation.
 */

export function generateSlug(text, fallbackPrefix = 'brand') {
  if (!text || typeof text !== 'string') {
    return `${fallbackPrefix}-${Date.now()}`;
  }

  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || `${fallbackPrefix}-${Date.now()}`;
}

export function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.trim());
}

/**
 * Returns the canonical slug for a brand object.
 * If brand.slug exists, returns it; otherwise generates it gracefully from brand.name.
 */
export function getBrandSlug(brand) {
  if (!brand) return '';
  if (brand.slug && typeof brand.slug === 'string' && brand.slug.trim()) {
    return brand.slug.trim().toLowerCase();
  }
  if (brand.name && typeof brand.name === 'string') {
    return generateSlug(brand.name);
  }
  return brand._id || brand.id || '';
}

/**
 * Checks whether a given slug matches a brand (either canonical or in oldSlugs history).
 */
export function isBrandMatchSlug(brand, searchSlug) {
  if (!brand || !searchSlug) return false;
  const target = searchSlug.trim().toLowerCase();
  const canonical = getBrandSlug(brand);

  if (canonical === target) return true;
  if (generateSlug(brand.name) === target) return true;

  if (Array.isArray(brand.oldSlugs) && brand.oldSlugs.some((s) => s.toLowerCase() === target)) {
    return true;
  }

  return false;
}
