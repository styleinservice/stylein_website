import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchBlogsList } from '../../store/blogs/blogsSlice';
import { SmoothScrollProvider, useSmoothScroll } from '../../context/SmoothScrollContext';
import StyleinNavbar from '../../components/home/StyleinNavbar';
import NavMobileMenu from '../../components/home/NavMobileMenu';
import StyleinFooter from '../../components/footer/StyleinFooter';
import SEO from '../../components/common/SEO';
import BlogsHero from '../../components/blogs-page/BlogsHero';
import BlogsGrid from '../../components/blogs-page/BlogsGrid';
import BlogsPagination from '../../components/blogs-page/BlogsPagination';
import BlogDetailModal from '../../components/blogs/BlogDetailModal';

function BlogsPageContent() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { list: blogs, pagination, listLoading } = useSelector((state) => state.blogs);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  // Handle direct slug route (/blogs/:slug or ?slug=...)
  useEffect(() => {
    const targetSlug = slug || searchParams.get('slug');
    if (targetSlug) {
      const existing = blogs.find((b) => b.slug === targetSlug || b._id === targetSlug);
      setSelectedBlog(existing || { slug: targetSlug });
    }
  }, [slug, searchParams, blogs]);

  // Search Debounce (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch blogs on page / search change
  useEffect(() => {
    dispatch(fetchBlogsList({ page, limit: 9, search: debouncedSearch }));
  }, [dispatch, page, debouncedSearch]);

  const handleOpenMenu = () => {
    const scroll = lenis?.scroll ?? window.scrollY ?? document.documentElement.scrollTop ?? 0;
    savedScrollRef.current = scroll;
    setCapturedScrollY(scroll);
    setIsMenuAnimating(true);
    setMobileMenuOpen(true);
    lenis?.stop();
  };

  const isLockedState = mobileMenuOpen || isMenuAnimating;

  useLayoutEffect(() => {
    if (!isLockedState && !mobileMenuOpen) {
      const target = savedScrollRef.current;
      window.scrollTo(0, target);
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target, { immediate: true });
        lenis.start();
      }
    }
  }, [isLockedState, mobileMenuOpen, lenis]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 300, behavior: 'smooth' });
    if (lenis) lenis.scrollTo(300, { immediate: false });
  };

  const handleClearFilters = () => {
    setSearch('');
    setPage(1);
  };

  return (
    <div className="bg-[#05060a] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
      <SEO pageKey="blogs" />
      <NavMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <motion.main
        animate={mobileMenuOpen ? { x: '44%', scale: 0.62, borderRadius: '32px', boxShadow: '-25px 0 70px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.18)' } : { x: '0%', scale: 1, borderRadius: '0px', boxShadow: 'none' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => { if (!mobileMenuOpen) setIsMenuAnimating(false); }}
        style={{ transformOrigin: 'center center', transform: !mobileMenuOpen && !isLockedState ? 'none' : undefined }}
        className={`w-full bg-[#030406] z-30 transition-[border-radius] ${isLockedState ? 'h-[100dvh] max-h-[100dvh] overflow-hidden fixed top-0 bottom-0 left-0 right-0 m-auto pointer-events-none lg:pointer-events-auto' : 'relative min-h-screen'}`}
      >
        {mobileMenuOpen && (
          <div aria-label="Scaled website view" className="absolute inset-0 z-[2500] pointer-events-auto cursor-default bg-black/15 select-none" />
        )}

        <div style={{ transform: isLockedState ? `translateY(-${capturedScrollY}px)` : 'none' }} className="w-full">
          <StyleinNavbar isReady={true} mobileMenuOpen={mobileMenuOpen} isMenuSession={isLockedState} onToggleMobileMenu={handleOpenMenu} />
          <div className="relative z-10 w-full flex flex-col items-center bg-[#07080a] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5 rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[48px] lg:rounded-b-[56px] pb-16 overflow-hidden">
            <BlogsHero search={search} onSearchChange={setSearch} onSearchClear={() => setSearch('')} />
            <div className="w-full">
              <BlogsGrid blogs={blogs} loading={listLoading} onClearFilters={handleClearFilters} onSelectBlog={setSelectedBlog} />
            </div>
            <BlogsPagination pagination={pagination} onPageChange={handlePageChange} />
          </div>
          <StyleinFooter />
        </div>
      </motion.main>

      {/* Blog Details Modal Popup */}
      <BlogDetailModal
        blog={selectedBlog}
        isOpen={Boolean(selectedBlog)}
        onClose={() => setSelectedBlog(null)}
      />
    </div>
  );
}

export default function BlogsPage() {
  return (
    <SmoothScrollProvider>
      <BlogsPageContent />
    </SmoothScrollProvider>
  );
}
