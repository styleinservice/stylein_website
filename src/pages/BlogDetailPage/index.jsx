import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchBlogBySlug, clearCurrentBlog } from '../../store/blogs/blogsSlice';
import { SmoothScrollProvider, useSmoothScroll } from '../../context/SmoothScrollContext';
import StyleinNavbar from '../../components/home/StyleinNavbar';
import NavMobileMenu from '../../components/home/NavMobileMenu';
import StyleinFooter from '../../components/footer/StyleinFooter';
import SEO from '../../components/common/SEO';
import BlogDetailHeader from '../../components/blog-detail/BlogDetailHeader';
import BlogDetailAuthorBar from '../../components/blog-detail/BlogDetailAuthorBar';
import BlogDetailFeaturedMedia from '../../components/blog-detail/BlogDetailFeaturedMedia';
import BlogDetailContent from '../../components/blog-detail/BlogDetailContent';
import BlogDetailSidebar from '../../components/blog-detail/BlogDetailSidebar';
import { ArrowLeft, FileQuestion } from 'lucide-react';

function BlogDetailPageContent() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBlog: blog, detailLoading: loading, detailError: error } = useSelector((state) => state.blogs);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [capturedScrollY, setCapturedScrollY] = useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogBySlug(slug));
    }
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [dispatch, slug]);

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

  return (
    <div className="bg-[#05060a] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
      <SEO
        pageKey="blog-detail"
        title={blog?.title ? `${blog.title} | STYLEIN Dubai` : 'Auto Care Article | STYLEIN Journal'}
        description={blog?.shortDescription || 'Read this comprehensive auto care guide from STYLEIN specialists.'}
        ogImage={blog?.image}
      />
      <NavMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <motion.main
        animate={mobileMenuOpen ? { x: '44%', scale: 0.62, borderRadius: '32px', boxShadow: '-25px 0 70px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.18)' } : { x: '0%', scale: 1, borderRadius: '0px', boxShadow: 'none' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => { if (!mobileMenuOpen) setIsMenuAnimating(false); }}
        style={{ transformOrigin: 'center center' }}
        className={`w-full bg-[#030406] z-30 transition-[border-radius] ${isLockedState ? 'h-[100dvh] max-h-[100dvh] overflow-hidden fixed top-0 bottom-0 left-0 right-0 m-auto pointer-events-none lg:pointer-events-auto' : 'relative min-h-screen'}`}
      >
        {mobileMenuOpen && (
          <div aria-label="Scaled website view" className="absolute inset-0 z-[2500] pointer-events-auto cursor-default bg-black/15 select-none" />
        )}

        <div style={{ transform: isLockedState ? `translateY(-${capturedScrollY}px)` : 'none' }} className="w-full">
          <StyleinNavbar isReady={true} mobileMenuOpen={mobileMenuOpen} isMenuSession={isLockedState} onToggleMobileMenu={handleOpenMenu} />
          <div className="relative z-10 w-full flex flex-col items-center bg-[#07080a] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5 rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[48px] lg:rounded-b-[56px] pt-32 pb-20 px-6 sm:px-10 lg:px-12 overflow-hidden">
            <div className="w-full max-w-[1180px] mx-auto">
              {loading && !blog && (
                <div className="max-w-3xl animate-pulse space-y-6">
                  <div className="h-6 w-32 bg-white/10 rounded" />
                  <div className="h-12 w-full bg-white/10 rounded" />
                  <div className="h-72 w-full bg-white/10 rounded-2xl" />
                </div>
              )}

              {error && !blog && !loading && (
                <div className="text-center py-20 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-400 mx-auto mb-4">
                    <FileQuestion size={32} />
                  </div>
                  <h2 className="font-heading font-bold text-white text-2xl mb-2">Article Not Found</h2>
                  <p className="font-body text-neutral-400 text-sm mb-6">The article you are looking for does not exist or has been relocated.</p>
                  <button onClick={() => navigate('/blogs')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stylein-red text-white font-heading font-semibold text-sm cursor-pointer">
                    <ArrowLeft size={16} /> Back to Blogs
                  </button>
                </div>
              )}

              {blog && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  <div className="lg:col-span-8 w-full text-left">
                    <BlogDetailHeader blog={blog} />
                    <BlogDetailAuthorBar blog={blog} />
                    <BlogDetailFeaturedMedia blog={blog} />
                    <BlogDetailContent content={blog.content} />
                  </div>
                  <div className="lg:col-span-4 w-full lg:sticky lg:top-24">
                    <BlogDetailSidebar currentSlug={blog.slug || blog._id} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <StyleinFooter />
        </div>
      </motion.main>
    </div>
  );
}

export default function BlogDetailPage() {
  return (
    <SmoothScrollProvider>
      <BlogDetailPageContent />
    </SmoothScrollProvider>
  );
}
