import React, { useState } from 'react';
import { User, MessageSquare, Link2, Check } from 'lucide-react';

export default function BlogDetailAuthorBar({ blog }) {
  const [copied, setCopied] = useState(false);

  if (!blog) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = encodeURIComponent(blog.title || 'STYLEIN Auto Care Guide');
  const encodedUrl = encodeURIComponent(currentUrl);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full py-4 border-y border-white/[0.08] flex flex-wrap items-center justify-between gap-4 mb-8">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E50914] to-[#990008] border border-white/15 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(229,9,20,0.3)]">
          <User size={20} />
        </div>
        <div>
          <h4 className="font-heading font-bold text-white text-[0.92rem]">
            {blog.author || 'STYLEIN Editorial Team'}
          </h4>
          <p className="font-body text-neutral-400 text-xs">
            Certified Automotive Care & Detailing Specialists
          </p>
        </div>
      </div>

      {/* Social Share Strip */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-400 text-xs font-semibold font-heading mr-1 hidden sm:inline">
          Share:
        </span>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${shareTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on WhatsApp"
          className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 flex items-center justify-center text-neutral-300 hover:text-[#25D366] transition-all"
        >
          <MessageSquare size={14} />
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on LinkedIn"
          className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/40 flex items-center justify-center text-neutral-300 hover:text-[#0A66C2] transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6c0-.88-.72-1.6-1.6-1.6a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.6 1.6 1.6m1.39 9.74v-8.37H5.07v8.37h2.78z" />
          </svg>
        </a>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on X"
          className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/20 border border-white/10 hover:border-white/40 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          title="Copy Link"
          className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-stylein-red/20 border border-white/10 hover:border-stylein-red/40 flex items-center justify-center text-neutral-300 hover:text-stylein-red transition-all cursor-pointer"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Link2 size={14} />}
        </button>
      </div>
    </div>
  );
}
