import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Import the middleware
const { default: middleware } = await import('../middleware.js');
const vercelConfig = JSON.parse(fs.readFileSync(path.join(projectRoot, 'vercel.json'), 'utf8'));

const distDir = path.join(projectRoot, 'dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const PORT = 4045;
const HOST = '127.0.0.1';
const BASE_TEST_URL = `http://${HOST}:${PORT}`;

function matchVercelRoute(pattern, pathname) {
  if (pattern === pathname) return true;
  if (pattern.includes(':slug')) {
    const prefix = pattern.split(':slug')[0];
    if (pathname.startsWith(prefix) && pathname !== prefix) {
      const rest = pathname.slice(prefix.length);
      return !rest.includes('/');
    }
  }
  return false;
}

// Create HTTP server simulating Vercel Edge & Static routing
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, BASE_TEST_URL);
  const pathname = parsedUrl.pathname;

  // 1. Process Vercel redirects from vercel.json
  if (Array.isArray(vercelConfig.redirects)) {
    for (const rule of vercelConfig.redirects) {
      if (matchVercelRoute(rule.source, pathname)) {
        let dest = rule.destination;
        if (rule.source.includes(':slug')) {
          const slugVal = pathname.split('/').filter(Boolean).pop();
          dest = dest.replace(':slug', slugVal);
        }
        res.writeHead(rule.permanent ? 301 : 307, {
          Location: dest,
          'Content-Type': 'text/plain',
        });
        return res.end(`Redirecting to ${dest}`);
      }
    }
  }

  // 2. Process Edge Middleware
  try {
    const webReq = new Request(parsedUrl.href, {
      method: req.method,
      headers: req.headers,
    });

    const edgeRes = await middleware(webReq);
    if (edgeRes instanceof Response) {
      const headers = {};
      edgeRes.headers.forEach((val, key) => {
        headers[key] = val;
      });
      res.writeHead(edgeRes.status, headers);
      const body = await edgeRes.text();
      return res.end(body);
    }
  } catch (err) {
    console.error('Middleware error:', err);
  }

  // 3. Static files
  const staticPath = path.join(distDir, pathname === '/' ? 'index.html' : pathname);
  if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
    const ext = path.extname(staticPath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.xml': 'application/xml',
      '.webp': 'image/webp',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    return res.end(fs.readFileSync(staticPath));
  }

  // 4. Default SPA Rewrite -> index.html (HTTP 200)
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(indexHtml);
});

function httpGet(urlPath) {
  return new Promise((resolve) => {
    http.get(`${BASE_TEST_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          headers: res.headers,
          bodyPreview: data.slice(0, 300),
          fullBody: data,
        });
      });
    }).on('error', (err) => resolve({ path: urlPath, error: err.message }));
  });
}

async function runTests() {
  await new Promise((resolve) => server.listen(PORT, HOST, resolve));
  console.log(`\n==================================================`);
  console.log(`🚀 PRODUCTION HTTP AUDIT SUITE RUNNING ON PORT ${PORT}`);
  console.log(`==================================================\n`);

  let allPassed = true;

  // TEST 1: Current brand URL returns HTTP 200
  console.log('--- TEST 1: Current Brand Canonical URLs (HTTP 200) ---');
  const t1_1 = await httpGet('/brands/porsche-911-gt3-rs');
  console.log(`GET /brands/porsche-911-gt3-rs -> Status: ${t1_1.statusCode}`);
  if (t1_1.statusCode !== 200 || !t1_1.fullBody.includes('<div id="root">')) {
    console.error('❌ TEST 1.1 FAILED: Expected HTTP 200 with SPA shell');
    allPassed = false;
  } else {
    console.log('✅ Canonical brand URL returned HTTP 200 with valid HTML shell.');
  }

  const t1_2 = await httpGet('/brands/toyota-land-cruiser-300');
  console.log(`GET /brands/toyota-land-cruiser-300 -> Status: ${t1_2.statusCode}`);
  if (t1_2.statusCode !== 200) {
    console.error('❌ TEST 1.2 FAILED');
    allPassed = false;
  } else {
    console.log('✅ Toyota Land Cruiser canonical URL returned HTTP 200.');
  }

  // TEST 2: Old brand URL returns HTTP 301 with Location header
  console.log('\n--- TEST 2: Old Brand Slugs (HTTP 301 Permanent Redirect) ---');
  const t2_1 = await httpGet('/brands/audi-old');
  console.log(`GET /brands/audi-old -> Status: ${t2_1.statusCode}`);
  console.log(`Location Header: ${t2_1.headers.location}`);
  if (t2_1.statusCode !== 301 || t2_1.headers.location !== 'https://www.styleincar.com/brands/audi') {
    console.error(`❌ TEST 2.1 FAILED: Expected 301 to https://www.styleincar.com/brands/audi, got ${t2_1.statusCode} -> ${t2_1.headers.location}`);
    allPassed = false;
  } else {
    console.log('✅ Verified: /brands/audi-old returns ACTUAL HTTP 301 to https://www.styleincar.com/brands/audi');
  }

  const t2_2 = await httpGet('/brands/bmw-old');
  console.log(`GET /brands/bmw-old -> Status: ${t2_2.statusCode}`);
  console.log(`Location Header: ${t2_2.headers.location}`);
  if (t2_2.statusCode !== 301 || t2_2.headers.location !== 'https://www.styleincar.com/brands/bmw-x5') {
    console.error(`❌ TEST 2.2 FAILED: Expected 301 to https://www.styleincar.com/brands/bmw-x5`);
    allPassed = false;
  } else {
    console.log('✅ Verified: /brands/bmw-old returns ACTUAL HTTP 301 to https://www.styleincar.com/brands/bmw-x5');
  }

  const t2_3 = await httpGet('/brand/porsche-911-gt3-rs');
  console.log(`GET /brand/porsche-911-gt3-rs -> Status: ${t2_3.statusCode}`);
  console.log(`Location Header: ${t2_3.headers.location}`);
  if (t2_3.statusCode !== 301 || t2_3.headers.location !== 'https://www.styleincar.com/brands/porsche-911-gt3-rs') {
    console.error('❌ TEST 2.3 FAILED');
    allPassed = false;
  } else {
    console.log('✅ Verified: /brand/:slug returns ACTUAL HTTP 301 to https://www.styleincar.com/brands/:slug');
  }

  // TEST 3: Dynamic Sitemap Freshness & Exclusions
  console.log('\n--- TEST 3: Dynamic /sitemap.xml Freshness & Structure ---');
  const t3 = await httpGet('/sitemap.xml');
  console.log(`GET /sitemap.xml -> Status: ${t3.statusCode}`);
  console.log(`Content-Type: ${t3.headers['content-type']}`);
  console.log(`Cache-Control: ${t3.headers['cache-control']}`);
  if (t3.statusCode !== 200 || !t3.headers['content-type'].includes('xml') || !t3.fullBody.includes('<urlset')) {
    console.error('❌ TEST 3 FAILED: Invalid sitemap response');
    allPassed = false;
  } else {
    console.log('✅ Sitemap returns valid XML with proper headers.');
  }

  // Check URLs inside sitemap
  const sitemapUrls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(t3.fullBody)) !== null) {
    sitemapUrls.push(match[1]);
  }
  console.log(`Total URLs in dynamic sitemap: ${sitemapUrls.length}`);
  const hasToyota = sitemapUrls.includes('https://www.styleincar.com/brands/toyota-land-cruiser-300');
  const hasPorsche = sitemapUrls.includes('https://www.styleincar.com/brands/porsche-911-gt3-rs');
  const hasServices = sitemapUrls.includes('https://www.styleincar.com/services');
  const hasBlogs = sitemapUrls.includes('https://www.styleincar.com/blogs');
  console.log(`Includes Toyota Land Cruiser: ${hasToyota}`);
  console.log(`Includes Porsche 911 GT3 RS: ${hasPorsche}`);
  console.log(`Includes /services: ${hasServices}`);
  console.log(`Includes /blogs: ${hasBlogs}`);

  if (!hasToyota || !hasPorsche || !hasServices || !hasBlogs) {
    console.error('❌ TEST 3 FAILED: Missing required URLs');
    allPassed = false;
  } else {
    console.log('✅ Dynamic sitemap includes active brands, blogs, and static pages.');
  }

  // TEST 4: Existing website routes continue working
  console.log('\n--- TEST 4: Existing Routes Verification ---');
  const routes = ['/services', '/rescue', '/about', '/contact', '/faqs', '/blogs'];
  for (const r of routes) {
    const res = await httpGet(r);
    if (res.statusCode !== 200) {
      console.error(`❌ Route ${r} returned status ${res.statusCode}`);
      allPassed = false;
    } else {
      console.log(`✅ Route ${r} returned HTTP 200 OK.`);
    }
  }

  console.log(`\n==================================================`);
  if (allPassed) {
    console.log('🎉 ALL AUDIT HTTP TESTS PASSED WITH 100% SUCCESS');
  } else {
    console.log('⚠️ SOME TESTS FAILED');
  }
  console.log(`==================================================\n`);

  server.close();
  process.exit(allPassed ? 0 : 1);
}

runTests();
