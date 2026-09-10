/**
 * Service Slug Utility
 * Maps clean, human-friendly URLs (e.g. /services/car-wash) to MongoDB Service IDs
 * and vice-versa, ensuring clean user-facing URLs instead of raw IDs.
 */

export const SERVICE_SLUG_MAP = {
  '6a65aa710f4632990c8c8973': 'car-wash',
  '6a799b466c4b83aa31e54872': 'battery',
  '6a6d9260e47c7f8b06cde650': 'oil-change',
  '6a6728c9184f2d233de52e38': 'car-inspection',
  '6a6d921ce47c7f8b06cde633': 'glass-coating',
  '6a8830a682c3d0795ca4c6c2': 'ppf-suv',
  '6a6d92b9e47c7f8b06cde671': 'ppf-sedan-car',
  '6a6d922ee47c7f8b06cde63e': 'rim-ceramic-coating',
  '6a6d9209e47c7f8b06cde628': 'fabric-protection',
  '6a771800c35cff66d63fbaa9': 'odor-removal',
  '6a6d91dee47c7f8b06cde612': 'pet-hair-removal',
  '6a6d91c8e47c7f8b06cde5f9': 'leather-conditioning',
  '6a6d918fe47c7f8b06cde5da': 'headlight-restoration',
  '6a6d91666f096be98fc02c2c': 'engine-bay-detailing',
};

export const SLUG_TO_ID_MAP = {
  'car-wash': '6a65aa710f4632990c8c8973',
  'premium-car-wash-detailing': '6a65aa710f4632990c8c8973',
  'premium-car-wash-and-detailing': '6a65aa710f4632990c8c8973',
  'battery': '6a799b466c4b83aa31e54872',
  'battery-change-service': '6a799b466c4b83aa31e54872',
  'oil-change': '6a6d9260e47c7f8b06cde650',
  'engine-oil': '6a6d9260e47c7f8b06cde650',
  'car-inspection': '6a6728c9184f2d233de52e38',
  'inspection': '6a6728c9184f2d233de52e38',
  'glass-coating': '6a6d921ce47c7f8b06cde633',
  'ppf-suv': '6a8830a682c3d0795ca4c6c2',
  'ppf-sedan-car': '6a6d92b9e47c7f8b06cde671',
  'ppf-sedan': '6a6d92b9e47c7f8b06cde671',
  'rim-ceramic-coating': '6a6d922ee47c7f8b06cde63e',
  'fabric-protection': '6a6d9209e47c7f8b06cde628',
  'odor-removal': '6a771800c35cff66d63fbaa9',
  'pet-hair-removal': '6a6d91dee47c7f8b06cde612',
  'leather-conditioning': '6a6d91c8e47c7f8b06cde5f9',
  'headlight-restoration': '6a6d918fe47c7f8b06cde5da',
  'engine-bay-detailing': '6a6d91666f096be98fc02c2c',
};

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getServiceSlug(serviceOrId) {
  if (!serviceOrId) return '';
  if (typeof serviceOrId === 'string') {
    if (SERVICE_SLUG_MAP[serviceOrId]) return SERVICE_SLUG_MAP[serviceOrId];
    if (SLUG_TO_ID_MAP[serviceOrId]) return serviceOrId;
    return slugify(serviceOrId);
  }
  const id = serviceOrId.serviceId || serviceOrId._id || serviceOrId.id;
  if (id && SERVICE_SLUG_MAP[id]) return SERVICE_SLUG_MAP[id];
  const title = serviceOrId.title || serviceOrId.name || serviceOrId.serviceName;
  if (title) return slugify(title);
  return id || '';
}

export function getServiceIdFromSlug(slugOrId) {
  if (!slugOrId) return '';
  if (SLUG_TO_ID_MAP[slugOrId]) return SLUG_TO_ID_MAP[slugOrId];
  return slugOrId;
}
