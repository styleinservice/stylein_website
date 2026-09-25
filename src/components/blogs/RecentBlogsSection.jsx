import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRecentBlogs } from '../../store/blogs/blogsSlice';
import RecentBlogCard from './RecentBlogCard';
import BlogDetailModal from './BlogDetailModal';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function RecentBlogsSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recentBlogs, recentLoading, recentFetched } = useSelector((state) => state.blogs);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (!recentFetched) {
      dispatch(fetchRecentBlogs({ limit: 3 }));
    }
  }, [dispatch, recentFetched]);

  if (recentFetched && (!recentBlogs || recentBlogs.length === 0)) {
    return null;
  }

  const handleViewAll = (e) => {
    e.preventDefault();
    navigate('/blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="recent-blogs" className="relative w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12 bg-[#05060a] overflow-hidden border-t border-white/[0.04]">
      {/* Subtle Ambient Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] rounded-full blur-[140px] bg-[#e50914]/8 pointer-events-none" />

      <div className="relative z-10 max-w-[1180px] mx-auto flex flex-col items-center w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 w-full mb-10 sm:mb-12">
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start max-w-xl">
            <span className="text-[0.72rem] sm:text-[0.76rem] font-bold tracking-widest uppercase text-stylein-red mb-2 inline-flex items-center gap-1.5 font-heading">
              <BookOpen size={14} />
              STYLEIN JOURNAL & INSIGHTS
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-white tracking-tight leading-[1.15] uppercase">
              EXPERT CAR CARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">GUIDES</span>
            </h2>
          </div>

          <a
            href="/blogs"
            onClick={handleViewAll}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-stylein-red/40 text-white text-[0.84rem] font-semibold transition-all no-underline font-heading group cursor-pointer"
          >
            <span>View All Articles</span>
            <ArrowRight size={14} className="text-stylein-red group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3-Cards Grid or Loading Skeletons */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {recentLoading && !recentFetched
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
              ))
            : recentBlogs.slice(0, 3).map((blog, idx) => (
                <RecentBlogCard key={blog._id || idx} blog={blog} index={idx} onSelect={setSelectedBlog} />
              ))}
        </div>
      </div>

      {/* Blog Details Modal Popup */}
      <BlogDetailModal
        blog={selectedBlog}
        isOpen={Boolean(selectedBlog)}
        onClose={() => setSelectedBlog(null)}
      />
    </section>
  );
}
