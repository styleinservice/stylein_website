export function optimizeCloudinary(url, width = 200) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('cloudinary.com') || !url.includes('/image/upload/')) return url;
  if (url.includes('/image/upload/w_') || url.includes('/image/upload/c_')) return url;
  return url.replace('/image/upload/', `/image/upload/w_${width},c_limit,q_auto,f_auto/`);
}
