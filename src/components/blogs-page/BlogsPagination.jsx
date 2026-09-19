import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogsPagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages } = pagination;

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="w-full max-w-[1180px] mx-auto px-6 mt-12 mb-6 flex items-center justify-center gap-2">
      {/* Prev Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
        className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-colors cursor-pointer"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {pages.map((p) => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-xl font-heading font-semibold text-[0.84rem] transition-all cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-[#E50914] to-[#FF1F2D] text-white shadow-[0_4px_16px_rgba(229,9,20,0.4)]'
                : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white'
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
        className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-colors cursor-pointer"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
