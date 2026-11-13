import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchBlogBySlug } from '../../store/blogs/blogsSlice';
import { X, Calendar, Eye, Loader2 } from 'lucide-react';

export default function BlogDetailModal({ blog, isOpen, onClose }) {
  const dispatch = useDispatch();
  const { currentBlog, detailLoading } = useSelector((state) => state.blogs);

  const activeBlog = (currentBlog && (currentBlog.slug === blog?.slug || currentBlog._id === blog?._id))
    ? currentBlog
    : blog;

  useEffect(() => {
    if (isOpen && blog) {
      const slug = blog.slug || blog._id;
      if (slug && (!currentBlog || (currentBlog.slug !== slug && currentBlog._id !== slug))) {
        dispatch(fetchBlogBySlug(slug));
      }
    }
  }, [isOpen, blog, currentBlog, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  const formattedDate = activeBlog?.createdAt
    ? new Date(activeBlog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return createPortal(
    <AnimatePresence>
      {isOpen && activeBlog && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container: Solid Deep Black Theme with Hidden Scrollbar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#050608] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 flex flex-col max-h-[85vh] overflow-hidden text-left"
          >
            {/* Header Bar */}
            <div className="px-5 py-3 sm:px-6 sm:py-3.5 border-b border-white/[0.08] flex items-center justify-between gap-3 bg-[#08090d] shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                {activeBlog?.category && (
                  <span className="px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-wider bg-stylein-red/15 text-stylein-red border border-stylein-red/30 rounded-full font-heading">
                    {activeBlog.category}
                  </span>
                )}
                <span className="text-[0.72rem] text-neutral-400 font-body inline-flex items-center gap-1">
                  <Calendar size={12} className="text-neutral-500" /> {formattedDate}
                </span>
                {activeBlog?.views !== undefined && (
                  <span className="text-[0.72rem] text-neutral-400 font-body inline-flex items-center gap-1">
                    <Eye size={12} className="text-neutral-500" /> {activeBlog.views} views
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable Body: Image on Top, Content Below, No Scrollbar Visible */}
            <div
              data-lenis-prevent="true"
              className="p-5 sm:p-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden font-body text-neutral-300 text-xs sm:text-sm space-y-3.5"
            >
              {/* Top Featured Image */}
              {activeBlog?.image && (
                <div className="w-full h-44 sm:h-56 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg shrink-0">
                  <img
                    src={activeBlog.image}
                    alt={activeBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h2 className="font-heading font-extrabold text-white text-base sm:text-lg md:text-xl leading-snug tracking-tight">
                {activeBlog?.title}
              </h2>

              {/* Short Excerpt */}
              {activeBlog?.shortDescription && (
                <p className="text-neutral-300/90 text-xs sm:text-[0.84rem] leading-relaxed italic border-l-2 border-stylein-red/60 pl-2.5 py-0.5 bg-white/[0.02] rounded-r-lg">
                  {activeBlog.shortDescription}
                </p>
              )}

              {/* Article Content or Loading Spinner */}
              {detailLoading && !activeBlog?.content ? (
                <div className="py-6 flex flex-col items-center justify-center gap-2 text-neutral-400">
                  <Loader2 size={20} className="animate-spin text-stylein-red" />
                  <span className="text-xs">Loading article...</span>
                </div>
              ) : activeBlog?.content ? (
                <div
                  className="space-y-2.5 text-neutral-300 leading-relaxed text-xs sm:text-[0.85rem] [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-white [&>h3]:text-sm [&>h3]:mt-3 [&>h3]:mb-1 [&>h3]:text-stylein-red [&>p]:leading-relaxed [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>strong]:text-white [&>a]:text-stylein-red [&>a]:underline"
                  dangerouslySetInnerHTML={{ __html: activeBlog.content }}
                />
              ) : null}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
