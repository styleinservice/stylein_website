import React from 'react';
import BlogCard from './BlogCard';
import { SearchX } from 'lucide-react';

export default function BlogsGrid({ blogs, loading, onClearFilters }) {
  if (loading) {
    return (
      <div className="w-full max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-[430px] rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-pulse flex flex-col p-5"
          >
            <div className="w-full h-48 rounded-xl bg-white/[0.04] mb-4" />
            <div className="w-24 h-4 rounded bg-white/[0.04] mb-3" />
            <div className="w-full h-6 rounded bg-white/[0.04] mb-2" />
            <div className="w-3/4 h-6 rounded bg-white/[0.04] mb-4" />
            <div className="w-full h-12 rounded bg-white/[0.04] mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="w-full max-w-[500px] mx-auto py-4 sm:py-6 px-6 text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-400 mb-3">
          <SearchX size={24} />
        </div>
        <h3 className="font-heading font-bold text-white text-lg sm:text-xl mb-1.5">No Articles Found</h3>
        <p className="font-body text-neutral-400 text-xs sm:text-sm">
          We couldn't find any articles matching your search query.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1180px] mx-auto px-6 pt-2 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {blogs.map((blog, idx) => (
        <BlogCard key={blog._id || idx} blog={blog} index={idx} />
      ))}
    </div>
  );
}
