import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CANONICAL_BASE = 'https://www.styleincar.com';
const BACKEND_BASE = 'https://stylein-backend-334136272370.asia-south1.run.app';

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

function fetchJson(url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (_) {
            resolve(null);
          }
        });
      })
      .on('error', () => resolve(null));
  });
}

// Fallback active services (all 14 canonical service routes)
const FALLBACK_SERVICES = [
  'car-wash',
  'battery',
  'oil-change',
  'car-inspection',
  'glass-coating',
  'ppf-suv',
  'ppf-sedan-car',
  'rim-ceramic-coating',
  'fabric-protection',
  'odor-removal',
  'pet-hair-removal',
  'leather-conditioning',
  'headlight-restoration',
  'engine-bay-detailing',
];

// Fallback active brands from database in case network is offline during build
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

// Fallback active blogs from database
const FALLBACK_BLOGS = [
  'car-service-in-the-uae-one-doorstep-at-a-time-stylein-car',
  'meet-the-founder-of-styleincar-premium-car-care-across-ajman-sharjah-dubai-and-all-uae',
  'ppf-services-in-ajman-clear-ppf-aed-3-300-color-ppf-aed-3-999-styleincar',
  'stylein-app-is-now-live-on-google-play-doorstep-car-wash-and-detailing-across-the-uae',
  'who-is-stylein-car-services-l-l-c-in-the-uae',
];

async function generate() {
  console.log('Generating production sitemap.xml...');
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

  // 1. Services
  const serviceSlugs = new Set(FALLBACK_SERVICES);

  // 2. Fetch dynamic brands
  const brandSlugs = new Set();
  const brandsData = await fetchJson(`${BACKEND_BASE}/brand`);
  if (brandsData?.data && Array.isArray(brandsData.data)) {
    brandsData.data.forEach((b) => {
      if (!b.deleted && b.active) {
        const slug = b.slug || generateSlug(b.name);
        if (slug) brandSlugs.add(slug);
      }
    });
  }
  FALLBACK_BRANDS.forEach((s) => brandSlugs.add(s));

  // 3. Fetch dynamic blogs
  const blogSlugs = new Set();
  const blogsData = await fetchJson(`${BACKEND_BASE}/blog`);
  if (blogsData?.data && Array.isArray(blogsData.data)) {
    blogsData.data.forEach((b) => {
      if (!b.deleted && b.active !== false && b.slug) {
        blogSlugs.add(b.slug);
      }
    });
  }
  FALLBACK_BLOGS.forEach((s) => blogSlugs.add(s));

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static URLs
  for (const page of staticRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${CANONICAL_BASE}${page.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Active Service URLs
  for (const slug of Array.from(serviceSlugs).sort()) {
    xml += `  <url>\n`;
    xml += `    <loc>${CANONICAL_BASE}/services/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  }

  // Active Brand URLs
  for (const slug of Array.from(brandSlugs).sort()) {
    xml += `  <url>\n`;
    xml += `    <loc>${CANONICAL_BASE}/brands/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // Active Blog URLs
  for (const slug of Array.from(blogSlugs).sort()) {
    xml += `  <url>\n`;
    xml += `    <loc>${CANONICAL_BASE}/blogs/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`✅ Sitemap created at: ${sitemapPath} (${serviceSlugs.size} services, ${brandSlugs.size} brands, ${blogSlugs.size} blogs)`);

  // Also ensure robots.txt exists
  const robotsPath = path.join(publicDir, 'robots.txt');
  const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${CANONICAL_BASE}/sitemap.xml\n`;
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log(`✅ robots.txt created at: ${robotsPath}`);
}

generate();
