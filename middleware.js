/**
 * Vercel Edge Middleware for StyleinCar Main Website Frontend
 *
 * 1. Enforces genuine HTTP 301 Permanent Redirects for old/legacy brand slugs to canonical destination:
 *    https://www.styleincar.com/brands/{currentSlug}
 * 2. Enforces genuine HTTP 301 for legacy /brand/:slug -> /brands/:slug
 * 3. Dynamically serves always-fresh sitemap.xml directly from active database records,
 *    so new brands added in Admin Panel appear instantly without rebuilding or manual code changes.
 */

const CANONICAL_BASE = 'https://www.styleincar.com';
const BACKEND_BASE = 'https://stylein-backend-334136272370.asia-south1.run.app';

export const config = {
  matcher: [
    '/brands/:slug*',
    '/brand/:slug*',
    '/brand',
    '/blogs/:slug*',
    '/blog/:slug*',
    '/blog',
    '/sitemap.xml',
  ],
};

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

/**
 * Resolves whether a requested slug is an archived old slug that must issue an HTTP 301.
 */
async function resolveOldSlug(slug) {
  if (!slug) return null;
  const clean = slug.trim().toLowerCase();

  // Known legacy / demo old slugs
  if (clean === 'audi-old') return 'audi';
  if (clean === 'bmw-old') return 'bmw-x5';

  // 1. Try public backend slug endpoint with ?redirect=false
  try {
    const res = await fetch(`${BACKEND_BASE}/api/brands/slug/${encodeURIComponent(clean)}?redirect=false`, {
      headers: { 'Accept': 'application/json' },
    });

    if (res.status === 301) {
      const json = await res.json().catch(() => null);
      if (json?.data?.currentSlug && json.data.currentSlug !== clean) {
        return json.data.currentSlug;
      }
    }

    if (res.ok) {
      const json = await res.json().catch(() => null);
      if (json?.data?.isRedirect && json.data.currentSlug && json.data.currentSlug !== clean) {
        return json.data.currentSlug;
      }
    }
  } catch (_) {}

  // 2. Fallback: check brand catalog for oldSlugs history
  try {
    const catRes = await fetch(`${BACKEND_BASE}/brand`, {
      headers: { 'Accept': 'application/json' },
    });
    if (catRes.ok) {
      const catJson = await catRes.json().catch(() => null);
      const brands = catJson?.data;
      if (Array.isArray(brands)) {
        for (const b of brands) {
          if (!b.deleted && b.active) {
            const canonical = b.slug ? b.slug.toLowerCase().trim() : generateSlug(b.name);
            if (Array.isArray(b.oldSlugs) && b.oldSlugs.some((s) => s.toLowerCase().trim() === clean)) {
              if (canonical && canonical !== clean) {
                return canonical;
              }
            }
          }
        }
      }
    }
  } catch (_) {}

  return null;
}

/**
 * Resolves whether a requested blog slug is an archived old slug that must issue an HTTP 301.
 */
async function resolveOldBlogSlug(slug) {
  if (!slug) return null;
  const clean = slug.trim().toLowerCase();

  // Try backend SEO slug endpoint
  try {
    const res = await fetch(`${BACKEND_BASE}/api/blogs/slug/${encodeURIComponent(clean)}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const json = await res.json().catch(() => null);
      if (json?.extra?.isRedirect && json.extra.newSlug && json.extra.newSlug.toLowerCase() !== clean) {
        return json.extra.newSlug.toLowerCase();
      }
      if (json?.statusCode === 301 && json?.extra?.newSlug) {
        return json.extra.newSlug.toLowerCase();
      }
    }
  } catch (_) {}

  // Fallback: check /blog endpoint
  try {
    const res = await fetch(`${BACKEND_BASE}/blog/${encodeURIComponent(clean)}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const json = await res.json().catch(() => null);
      if (json?.extra?.isRedirect && json.extra.newSlug && json.extra.newSlug.toLowerCase() !== clean) {
        return json.extra.newSlug.toLowerCase();
      }
    }
  } catch (_) {}

  return null;
}

/**
 * Dynamically serves the live sitemap.
 */
async function handleSitemap() {
  const today = new Date().toISOString().split('T')[0];

  // Try backend dynamic sitemap first
  try {
    const backendSitemap = await fetch(`${BACKEND_BASE}/sitemap.xml`);
    if (backendSitemap.ok) {
      const xml = await backendSitemap.text();
      if (xml && xml.includes('<urlset')) {
        return new Response(xml, {
          status: 200,
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400',
          },
        });
      }
    }
  } catch (_) {}

  // Generate on-the-fly from live active brands and blogs
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

  const brandSlugs = new Set();
  try {
    const res = await fetch(`${BACKEND_BASE}/brand`);
    if (res.ok) {
      const json = await res.json();
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

  const blogSlugs = new Set();
  try {
    const res = await fetch(`${BACKEND_BASE}/blog`);
    if (res.ok) {
      const json = await res.json();
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

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 1. Dynamic sitemap
  if (pathname === '/sitemap.xml') {
    return handleSitemap();
  }

  // 2. Legacy /brand or /brand/:slug -> HTTP 301
  if (pathname === '/brand' || pathname === '/brand/') {
    return Response.redirect(`${CANONICAL_BASE}/brands`, 301);
  }

  if (pathname.startsWith('/brand/')) {
    const rawSlug = pathname.replace('/brand/', '').replace(/\/+$/, '');
    if (rawSlug) {
      return Response.redirect(`${CANONICAL_BASE}/brands/${rawSlug}${url.search}`, 301);
    }
    return Response.redirect(`${CANONICAL_BASE}/brands`, 301);
  }

  // 3. /brands/:slug -> check oldSlugs HTTP 301 permanent redirect
  if (pathname.startsWith('/brands/')) {
    const slug = pathname.replace('/brands/', '').replace(/\/+$/, '').toLowerCase();
    if (slug) {
      const targetSlug = await resolveOldSlug(slug);
      if (targetSlug && targetSlug !== slug) {
        const destination = `${CANONICAL_BASE}/brands/${targetSlug}${url.search}`;
        return new Response(null, {
          status: 301,
          headers: {
            Location: destination,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }
  }

  // 4. Legacy /blog or /blog/:slug -> HTTP 301
  if (pathname === '/blog' || pathname === '/blog/') {
    return Response.redirect(`${CANONICAL_BASE}/blogs`, 301);
  }

  if (pathname.startsWith('/blog/')) {
    const rawSlug = pathname.replace('/blog/', '').replace(/\/+$/, '');
    if (rawSlug) {
      return Response.redirect(`${CANONICAL_BASE}/blogs/${rawSlug}${url.search}`, 301);
    }
    return Response.redirect(`${CANONICAL_BASE}/blogs`, 301);
  }

  // 5. /blogs/:slug -> check old blog slugs HTTP 301 permanent redirect
  if (pathname.startsWith('/blogs/')) {
    const slug = pathname.replace('/blogs/', '').replace(/\/+$/, '').toLowerCase();
    if (slug) {
      const targetSlug = await resolveOldBlogSlug(slug);
      if (targetSlug && targetSlug !== slug) {
        const destination = `${CANONICAL_BASE}/blogs/${targetSlug}${url.search}`;
        return new Response(null, {
          status: 301,
          headers: {
            Location: destination,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }
  }

  // Pass-through to client SPA
  return;
}
