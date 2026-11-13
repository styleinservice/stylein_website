const CANONICAL_BASE = 'https://www.styleincar.com';
const BACKEND_BASE = 'https://stylein-backend-334136272370.asia-south1.run.app';

const FALLBACK_BRANDS = [
  'audi',
  'bentley-continental-gt',
  'bmw',
  'bmw-x5',
  'byd-seal',
  'hyundai-elantra',
  'kia-sportage',
  'mercedes-benz',
  'mercedes-benz-amg-gt-4-door-coupe',
  'mg-cyberster',
  'mitsubishi-lancer-evolution-evo',
  'nissan-gt-r',
  'porsche-911-gt3-rs',
  'rolls-royce-phantom',
  'suzuki-jimny',
  'tesla-cybertruck',
  'toyota-land-cruiser-300',
];

const FALLBACK_BLOGS = [
  'car-service-in-the-uae-one-doorstep-at-a-time-stylein-car',
  'ppf-services-in-ajman-clear-ppf-aed-3-300-color-ppf-aed-3-999-styleincar',
  'who-is-stylein-car-services-l-l-c-in-the-uae',
];

function generateSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400');

  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/services', priority: '0.9', changefreq: 'weekly' },
    { loc: '/rescue', priority: '0.9', changefreq: 'weekly' },
    { loc: '/brands', priority: '0.9', changefreq: 'weekly' },
    { loc: '/blogs', priority: '0.8', changefreq: 'daily' },
    { loc: '/about', priority: '0.8', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
    { loc: '/faqs', priority: '0.7', changefreq: 'monthly' },
    { loc: '/legal', priority: '0.5', changefreq: 'monthly' },
  ];

  const brandSlugs = new Set(FALLBACK_BRANDS);
  try {
    const brandController = new AbortController();
    const brandTimeout = setTimeout(() => brandController.abort(), 4000);
    const brandRes = await fetch(`${BACKEND_BASE}/brand`, { signal: brandController.signal });
    clearTimeout(brandTimeout);
    if (brandRes.ok) {
      const json = await brandRes.json();
      if (Array.isArray(json?.data)) {
        json.data.forEach((b) => {
          if (!b.deleted && b.active) {
            const slug = b.slug || generateSlug(b.name);
            if (slug) brandSlugs.add(slug);
          }
        });
      }
    }
  } catch (_) {}

  const blogSlugs = new Set(FALLBACK_BLOGS);
  try {
    const blogController = new AbortController();
    const blogTimeout = setTimeout(() => blogController.abort(), 4000);
    const blogRes = await fetch(`${BACKEND_BASE}/blog`, { signal: blogController.signal });
    clearTimeout(blogTimeout);
    if (blogRes.ok) {
      const json = await blogRes.json();
      if (Array.isArray(json?.data)) {
        json.data.forEach((b) => {
          if (!b.deleted && b.active !== false && b.slug) {
            blogSlugs.add(b.slug);
          }
        });
      }
    }
  } catch (_) {}

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of staticRoutes) {
    xml += `  <url>\n    <loc>${CANONICAL_BASE}${page.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
  }

  for (const slug of Array.from(brandSlugs).sort()) {
    xml += `  <url>\n    <loc>${CANONICAL_BASE}/brands/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  for (const slug of Array.from(blogSlugs).sort()) {
    xml += `  <url>\n    <loc>${CANONICAL_BASE}/blogs/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }

  xml += `</urlset>\n`;

  res.status(200).send(xml);
}
