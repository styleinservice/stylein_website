import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Eye, ChevronRight, Home } from 'lucide-react';

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
      {/* 1. Breadcrumbs: Home → Blogs → Article Title */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs text-neutral-400 mb-6 font-body">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors no-underline"
        >
          <Home size={12} className="text-neutral-500" />
          <span>Home</span>
        </Link>
        <ChevronRight size={12} className="text-neutral-600 shrink-0" />
        <Link
          to="/blogs"
          className="text-neutral-400 hover:text-white transition-colors no-underline"
        >
          Blogs
        </Link>
        <ChevronRight size={12} className="text-neutral-600 shrink-0" />
        <span className="text-neutral-300 font-medium truncate max-w-[220px] sm:max-w-xs md:max-w-md">
          {blog.title}
        </span>
      </nav>

      {/* 2. Back Navigation Button */}
      <button
        type="button"
        onClick={() => navigate('/blogs')}
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-[0.82rem] font-semibold transition-colors mb-6 cursor-pointer font-heading group"
      >
        <ArrowLeft size={16} className="text-stylein-red group-hover:-translate-x-1 transition-transform" />
        <span>Back to Blogs</span>
      </button>

      {/* 3. Category Pill & Meta Badges */}
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

      {/* 4. Main Blog Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] text-white leading-[1.18] tracking-tight mb-4"
      >
        {blog.title}
      </motion.h1>

      {/* 5. Short Excerpt */}
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
