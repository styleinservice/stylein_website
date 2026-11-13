import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRecentBlogs } from '../../store/blogs/blogsSlice';
import { Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BlogDetailSidebar({ currentSlug }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recentBlogs, recentFetched } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (!recentFetched) {
      dispatch(fetchRecentBlogs({ limit: 4 }));
    }
  }, [dispatch, recentFetched]);

  const related = (recentBlogs || [])
    .filter((b) => (b.slug || b._id) !== currentSlug)
    .slice(0, 3);

  const handleArticleClick = (slug, e) => {
    e.preventDefault();
    navigate(`/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="w-full flex flex-col gap-8">
      {/* 1. Related Articles Widget */}
      {related.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#0b0d14]/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <h3 className="font-heading font-bold text-white text-[1.05rem] mb-4 pb-3 border-b border-white/[0.08] flex items-center justify-between">
            <span>Related Articles</span>
            <span className="w-2 h-2 rounded-full bg-stylein-red animate-ping" />
          </h3>

          <div className="flex flex-col gap-4">
            {related.map((item, idx) => {
              const itemSlug = item.slug || item._id;
              return (
                <a
                  key={item._id || idx}
                  href={`/blog/${itemSlug}`}
                  onClick={(e) => handleArticleClick(itemSlug, e)}
                  className="flex items-center gap-3.5 group no-underline text-left"
                >
                  <img
                    src={item.image || 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp'}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-neutral-900 border border-white/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[0.68rem] text-stylein-red font-bold uppercase tracking-wider font-heading block mb-1">
                      {item.category || 'Article'}
                    </span>
                    <h4 className="font-heading font-semibold text-white text-[0.84rem] line-clamp-2 leading-snug group-hover:text-neutral-200 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Direct Doorstep Booking CTA Card */}
      <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#121624] via-[#0d101a] to-[#08090e] border border-stylein-red/30 shadow-[0_15px_40px_rgba(229,9,20,0.2)] text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-stylein-red/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-10 h-10 rounded-xl bg-stylein-red/20 border border-stylein-red/40 flex items-center justify-center text-stylein-red mb-4">
          <ShieldCheck size={22} />
        </div>

        <h3 className="font-heading font-extrabold text-white text-lg sm:text-xl leading-tight mb-2">
          Need Professional Car Care at Your Doorstep?
        </h3>
        <p className="font-body text-neutral-300 text-xs sm:text-[0.82rem] leading-relaxed mb-5">
          Certified mobile workshop units equipped with pure deionized water, synthetic oils & ceramic protection.
        </p>

        <div className="flex flex-col gap-2.5">
          <a
            href="https://wa.me/971558120570"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-heading font-bold text-xs sm:text-[0.84rem] flex items-center justify-center gap-2 shadow-lg transition-all no-underline"
          >
            <MessageSquare size={15} />
            <span>Book via WhatsApp</span>
          </a>

          <a
            href="tel:+971558120570"
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-heading font-semibold text-xs sm:text-[0.82rem] flex items-center justify-center gap-2 transition-all no-underline"
          >
            <Phone size={14} className="text-neutral-400" />
            <span>Call +971 55 812 0570</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
