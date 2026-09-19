import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';

export default function RecentBlogCard({ blog, index = 0 }) {
  const navigate = useNavigate();

  if (!blog) return null;

  const slug = blog.slug || blog._id;
  const targetUrl = `/blog/${slug}`;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  const handleClick = (e) => {
    e.preventDefault();
    navigate(targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-[#0b0d14]/80 hover:bg-[#0f121d] border border-white/[0.08] hover:border-stylein-red/40 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(229,9,20,0.18)] transition-all duration-400 cursor-pointer"
      onClick={handleClick}
    >
      {/* Blog Thumbnail Media */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-900">
        <img
          src={blog.image || 'https://storage.googleapis.com/stylein_bucket/Home_services/Car_Wash.webp'}
          alt={blog.title}
          title={blog.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-transparent to-transparent opacity-80" />

        {/* Category Badge Pill */}
        {blog.category && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider bg-[#0a0c12]/80 backdrop-blur-md text-stylein-red border border-stylein-red/30 rounded-full font-heading">
              {blog.category}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Metadata: Read Time & Date */}
          <div className="flex items-center gap-3 text-[0.75rem] text-neutral-400 mb-2.5 font-body">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-neutral-500" />
              {formattedDate}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-neutral-500" />
              {blog.readTime || '4 min read'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-white text-[1.05rem] sm:text-[1.12rem] leading-snug line-clamp-2 group-hover:text-neutral-100 transition-colors mb-2">
            {blog.title}
          </h3>

          {/* Short Excerpt */}
          <p className="font-body text-neutral-400 text-[0.82rem] leading-relaxed line-clamp-2 mb-4">
            {blog.shortDescription || 'Read the latest professional automotive care guide and insights from STYLEIN experts.'}
          </p>
        </div>

        {/* Bottom Bar: Author & Read CTA */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stylein-red/20 border border-stylein-red/30 flex items-center justify-center text-stylein-red text-[0.68rem] font-bold">
              <User size={12} />
            </div>
            <span className="text-neutral-300 text-[0.76rem] font-medium font-body truncate max-w-[120px]">
              {blog.author || 'STYLEIN Experts'}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-stylein-red group-hover:translate-x-1 transition-transform font-heading">
            Read <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
