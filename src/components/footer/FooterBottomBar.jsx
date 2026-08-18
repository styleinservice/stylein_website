import React from 'react';

const SOCIAL_ICONS = [
  {
    name: 'Instagram',
    href: '#instagram',
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#facebook',
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#linkedin',
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#tiktok',
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31 0 2.6.43 3.65 1.22.42-1.02 1.4-1.24 1.4-1.24v3.91s-1.24-.03-2.39-.77c0 2.21 0 4.41-.01 6.62 0 3.73-3.03 6.75-6.75 6.75-3.73 0-6.75-3.02-6.75-6.75 0-3.72 3.02-6.74 6.75-6.74.34 0 .68.03 1.01.08v3.9c-.31-.08-.65-.12-.99-.12-1.63 0-2.95 1.32-2.95 2.95 0 1.63 1.32 2.95 2.95 2.95 1.63 0 2.95-1.32 2.95-2.95V.02h2.13z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#youtube',
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>
    ),
  },
];

export default function FooterBottomBar() {
  return (
    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.8rem] text-neutral-400 font-body relative z-20">
      {/* Copyright & Legal Links */}
      <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
        <span>© {new Date().getFullYear()} STYLEIN. All Rights Reserved</span>
        <a href="#terms" className="text-neutral-400 hover:text-white no-underline transition-colors">
          Terms
        </a>
        <a href="#privacy" className="text-neutral-400 hover:text-white no-underline transition-colors">
          Privacy
        </a>
      </div>

      {/* Social Media SVG Icons */}
      <div className="flex items-center gap-4">
        {SOCIAL_ICONS.map((soc) => (
          <a
            key={soc.name}
            href={soc.href}
            aria-label={soc.name}
            className="text-neutral-400 hover:text-white transition-colors no-underline cursor-pointer"
          >
            {soc.svg}
          </a>
        ))}
      </div>
    </div>
  );
}
