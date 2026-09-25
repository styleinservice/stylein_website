import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Eye } from 'lucide-react';

export default function BlogDetailHeader({ blog }) {
  const navigate = useNavigate();

  if (!blog) return null;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="w-full mb-8">
      {/* Back Link */}
      <button
        type="button"
        onClick={() => navigate('/blogs')}
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-[0.82rem] font-semibold transition-colors mb-6 cursor-pointer font-heading"
      >
        <ArrowLeft size={16} className="text-stylein-red" />
        <span>Back to All Articles</span>
      </button>

      {/* Category Pill & Meta Badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-wrap items-center gap-3 mb-4"
      >
        {blog.category && (
          <span className="px-3.5 py-1 text-[0.72rem] font-bold uppercase tracking-wider bg-stylein-red/15 text-stylein-red border border-stylein-red/30 rounded-full font-heading">
            {blog.category}
          </span>
        )}

        <div className="flex items-center gap-2.5 text-xs text-neutral-400 font-body">
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-neutral-500" />
              {formattedDate}
            </span>
          )}
          {blog.readTime && (
            <>
              <span className="text-neutral-600">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} className="text-neutral-500" />
                {blog.readTime}
              </span>
            </>
          )}
          {typeof blog.views === 'number' && (
            <>
              <span className="text-neutral-600">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Eye size={13} className="text-neutral-500" />
                {blog.views} views
              </span>
            </>
          )}
        </div>
      </motion.div>

      {/* Main Blog Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] text-white leading-[1.18] tracking-tight mb-4"
      >
        {blog.title}
      </motion.h1>

      {/* Short Excerpt */}
      {blog.shortDescription && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="font-body text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl"
        >
          {blog.shortDescription}
        </motion.p>
      )}
    </div>
  );
}
