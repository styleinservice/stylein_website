import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BACKEND_BASE = 'https://stylein-backend-334136272370.asia-south1.run.app';
const CANONICAL_ORIGIN = 'https://www.styleincar.com';

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 STYLEIN BLOG SEO SLUG SYSTEM VERIFICATION SUITE');
  console.log('======================================================\n');

  // Test 1: App.jsx Routing
  console.log('1. Routing Configuration in src/App.jsx:');
  const appFile = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf8');
  assert(appFile.includes('path="/blogs"'), 'Route /blogs exists');
  assert(appFile.includes('path="/blogs/:slug"'), 'Dynamic route /blogs/:slug exists');
  assert(appFile.includes('path="/blog/:slug"'), 'Alias route /blog/:slug mapped for canonical migration');
  assert(appFile.includes('path="/blog"'), 'Legacy /blog route redirect configured');

  // Test 2: BlogCard Link & SEO Accessibility
  console.log('\n2. BlogCard Component (src/components/blogs-page/BlogCard.jsx):');
  const blogCardFile = fs.readFileSync(path.join(rootDir, 'src/components/blogs-page/BlogCard.jsx'), 'utf8');
  assert(blogCardFile.includes('import { Link } from \'react-router-dom\''), 'BlogCard imports React Router Link');
  assert(blogCardFile.includes('to={blogUrl}'), 'BlogCard wraps card in Link to blogUrl');
  assert(blogCardFile.includes('`/blogs/${targetSlug}`'), 'BlogCard constructs clean /blogs/:slug URL');
  assert(!blogCardFile.includes('e.preventDefault()'), 'BlogCard does not hijack default link navigation');

  // Test 3: RecentBlogCard Link & SEO Accessibility
  console.log('\n3. RecentBlogCard Component (src/components/blogs/RecentBlogCard.jsx):');
  const recentCardFile = fs.readFileSync(path.join(rootDir, 'src/components/blogs/RecentBlogCard.jsx'), 'utf8');
  assert(recentCardFile.includes('import { Link } from \'react-router-dom\''), 'RecentBlogCard imports Link');
  assert(recentCardFile.includes('`/blogs/${targetSlug}`'), 'RecentBlogCard links to canonical /blogs/:slug');

  // Test 4: BlogsPage (src/pages/BlogsPage/index.jsx)
  console.log('\n4. BlogsPage Listing (src/pages/BlogsPage/index.jsx):');
  const blogsPageFile = fs.readFileSync(path.join(rootDir, 'src/pages/BlogsPage/index.jsx'), 'utf8');
  assert(!blogsPageFile.includes('BlogDetailModal'), 'Modal-only dependency removed from BlogsPage');
  assert(blogsPageFile.includes('BlogsGrid'), 'BlogsGrid rendered for SEO card listing');
  assert(blogsPageFile.includes('navigate(`/blogs/${querySlug}`, { replace: true })'), 'Legacy query param (?slug=...) redirected to /blogs/:slug');

  // Test 5: BlogDetailPage & Breadcrumbs
  console.log('\n5. BlogDetailPage (src/pages/BlogDetailPage/index.jsx & Header):');
  const blogDetailPageFile = fs.readFileSync(path.join(rootDir, 'src/pages/BlogDetailPage/index.jsx'), 'utf8');
  assert(blogDetailPageFile.includes('redirectInfo?.isRedirect'), 'Structured redirect handling implemented');
  assert(blogDetailPageFile.includes('canonicalUrl'), 'Dynamic canonicalUrl computed');
  assert(blogDetailPageFile.includes('window.location.pathname.startsWith(\'/blog/\')'), 'Enforces canonical URL if loaded via alias');

  const headerFile = fs.readFileSync(path.join(rootDir, 'src/components/blog-detail/BlogDetailHeader.jsx'), 'utf8');
  assert(headerFile.includes('aria-label="Breadcrumb"'), 'Breadcrumbs navigation exists');
  assert(headerFile.includes('to="/"') && headerFile.includes('to="/blogs"'), 'Breadcrumb links Home and Blogs');
  assert(headerFile.includes('Back to Blogs') || headerFile.includes('Back to All Articles'), 'Back button to /blogs exists');

  // Test 6: Redux Blogs Slice (src/store/blogs/blogsSlice.js)
  console.log('\n6. Redux Slice (src/store/blogs/blogsSlice.js):');
  const sliceFile = fs.readFileSync(path.join(rootDir, 'src/store/blogs/blogsSlice.js'), 'utf8');
  assert(sliceFile.includes('fetchBlogBySlug'), 'fetchBlogBySlug async thunk exists');
  assert(sliceFile.includes('api.get(`/api/blogs/slug/${cleanSlug}`)') || sliceFile.includes('api.get(`/blogs/${cleanSlug}`)'), 'Endpoint slug fallback cascade implemented');
  assert(sliceFile.includes('redirectInfo'), 'redirectInfo state managed in slice');

  // Test 7: vercel.json Redirects
  console.log('\n7. Edge Redirect Rules in vercel.json:');
  const vercelFile = fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8');
  const vercelJson = JSON.parse(vercelFile);
  const blogRedirect = vercelJson.redirects.find(r => r.source === '/blog/:slug');
  assert(Boolean(blogRedirect), 'vercel.json contains /blog/:slug redirect');
  assert(blogRedirect?.destination === 'https://www.styleincar.com/blogs/:slug', '/blog/:slug permanently redirects to canonical https://www.styleincar.com/blogs/:slug');
  assert(blogRedirect?.permanent === undefined, 'permanent: true removed to prevent Vercel HTTP 308 override');
  assert(blogRedirect?.statusCode === 301, 'Redirect strictly enforces HTTP 301 status code');

  // Test 8: middleware.js HTTP 301 & Dynamic Sitemap
  console.log('\n8. Vercel Middleware (middleware.js):');
  const mwFile = fs.readFileSync(path.join(rootDir, 'middleware.js'), 'utf8');
  assert(mwFile.includes('resolveOldBlogSlug'), 'Old blog slug resolution function implemented');
  assert(mwFile.includes('Response.redirect(`${CANONICAL_BASE}/blogs`, 301)'), 'Legacy /blog redirect to /blogs');
  assert(mwFile.includes('${CANONICAL_BASE}/blogs/${slug}'), 'Sitemap formats blog URLs with canonical /blogs/:slug');

  // Test 9: Public Sitemap XML Content
  console.log('\n9. Public Static / Prebuild Sitemap (public/sitemap.xml):');
  const sitemapXml = fs.readFileSync(path.join(rootDir, 'public/sitemap.xml'), 'utf8');
  assert(sitemapXml.includes('<loc>https://www.styleincar.com/blogs</loc>'), 'Sitemap includes /blogs listing');
  assert(sitemapXml.includes('https://www.styleincar.com/blogs/'), 'Sitemap contains canonical /blogs/:slug URLs');
  assert(!sitemapXml.includes('<loc>https://www.styleincar.com/blog/'), 'Sitemap does NOT contain non-canonical /blog/:slug URLs');

  // Test 10: Live Backend Communication Check (if online)
  console.log('\n10. Live Backend Integration Check:');
  try {
    const liveRes = await fetch(`${BACKEND_BASE}/blog`);
    if (liveRes.ok) {
      const liveJson = await liveRes.json();
      assert(Array.isArray(liveJson?.data) && liveJson.data.length > 0, `Live backend returned ${liveJson.data.length} blogs`);
      const sampleSlug = liveJson.data[0].slug;
      assert(Boolean(sampleSlug), `Sample blog slug resolved: ${sampleSlug}`);
    } else {
      console.log('  ⚠️ Skipping live network check (offline/sandboxed)');
    }
  } catch (_) {
    console.log('  ⚠️ Skipping live network check (offline/sandboxed)');
  }

  console.log('\n======================================================');
  console.log(`📊 RESULTS: ${passedTests} / ${totalTests} ASSERTIONS PASSED`);
  console.log('======================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
