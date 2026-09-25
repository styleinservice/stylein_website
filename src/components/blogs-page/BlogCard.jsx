import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Eye, ArrowRight, User } from 'lucide-react';

export default function BlogCard({ blog, index = 0, onSelect }) {
  if (!blog) return null;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  const handleClick = (e) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(blog);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 9) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-[#07090e] hover:bg-[#0c0e16] border border-white/[0.07] hover:border-stylein-red/35 rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_45px_rgba(229,9,20,0.14)] transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Blog Thumbnail Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950">
        <img
          src={blog.image || 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp'}
          alt={blog.title}
          title={blog.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/20 to-transparent" />

        {/* Category Badge Pill */}
        {blog.category && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-stylein-red border border-stylein-red/30 rounded-full font-heading">
              {blog.category}
            </span>
          </div>
        )}

        {/* Views Count Badge */}
        {typeof blog.views === 'number' && (
          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2 py-0.5 text-[0.66rem] font-medium bg-black/70 backdrop-blur-md text-neutral-300 border border-white/10 rounded-full">
            <Eye size={11} className="text-neutral-400" />
            <span>{blog.views}</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 sm:p-5.5 flex flex-col justify-between">
        <div>
          {/* Metadata: Read Time & Date */}
          <div className="flex items-center gap-2.5 text-[0.72rem] text-neutral-400 mb-2 font-body">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} className="text-neutral-500" />
              {formattedDate}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} className="text-neutral-500" />
              {blog.readTime || '4 min read'}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading font-bold text-white text-[1.02rem] sm:text-[1.1rem] leading-snug line-clamp-2 group-hover:text-white transition-colors mb-2">
            {blog.title}
          </h2>

          {/* Short Excerpt */}
          <p className="font-body text-neutral-400/90 text-[0.8rem] leading-relaxed line-clamp-2 mb-4">
            {blog.shortDescription || 'Read the comprehensive guide and tips on automotive care by STYLEIN certified mechanics.'}
          </p>
        </div>

        {/* Bottom Bar: Author & Read CTA */}
        <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5.5 h-5.5 rounded-full bg-stylein-red/15 border border-stylein-red/25 flex items-center justify-center text-stylein-red text-[0.65rem] font-bold">
              <User size={11} />
            </div>
            <span className="text-neutral-300 text-[0.74rem] font-medium font-body truncate max-w-[130px]">
              {blog.author || 'STYLEIN Experts'}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-[0.76rem] font-semibold text-stylein-red group-hover:translate-x-0.5 transition-transform font-heading">
            Read Full <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
