import React, { useState, useMemo } from 'react';
import { ListFilter, Search, X } from 'lucide-react';
import { LEGAL_PARTS, ALL_LEGAL_SECTIONS } from '../../data/legal';

export default function LegalTOC({ activeId, onItemClick }) {
  const [query, setQuery] = useState('');
  const trimmed = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!trimmed) return null;
    return ALL_LEGAL_SECTIONS.filter(
      (sec) =>
        sec.number.toString() === trimmed ||
        sec.number.toString().includes(trimmed) ||
        sec.title.toLowerCase().includes(trimmed)
    );
  }, [trimmed]);

  return (
    <nav
      aria-label="Table of Contents"
      className="w-full py-8 border-b border-white/10 max-w-[900px] mx-auto px-4 sm:px-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <ListFilter size={18} className="text-stylein-red" />
          <h2 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
            Table of Contents
          </h2>
        </div>

        {/* Search Bar for Section Name or Number */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or number (e.g. 19, refund)..."
            className="w-full pl-9 pr-8 py-2 bg-white/[0.05] hover:bg-white/[0.08] focus:bg-white/[0.1] border border-white/10 focus:border-stylein-red/60 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {filteredSections ? (
        filteredSections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-[0.84rem] font-body pt-1">
            {filteredSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => onItemClick(sec.id, e)}
                className={`block py-1.5 px-2 rounded-lg transition-colors truncate ${
                  activeId === sec.id
                    ? 'bg-stylein-red/15 text-stylein-red font-semibold'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`}
                title={`${sec.number}. ${sec.title}`}
              >
                <span className="font-mono text-stylein-red font-bold mr-1.5">{sec.number}.</span>
                {sec.title}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-neutral-400 py-3 font-body">
            No sections found matching "{query}".
          </p>
        )
      ) : (
        <div className="space-y-6 pt-1">
          {LEGAL_PARTS.map((part) => (
            <div key={part.id} className="space-y-2">
              <a
                href={`#${part.id}`}
                onClick={(e) => onItemClick(part.id, e)}
                className="font-heading text-xs font-bold text-white/70 uppercase tracking-wider block hover:text-stylein-red transition-colors"
              >
                {part.title}
              </a>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5 text-[0.82rem] font-body">
                {part.sections.map((sec) => {
                  const isActive = activeId === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => onItemClick(sec.id, e)}
                      className={`block py-0.5 truncate transition-colors ${
                        isActive
                          ? 'text-stylein-red font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      title={`${sec.number}. ${sec.title}`}
                    >
                      <span className="font-mono text-neutral-500 mr-1.5">{sec.number}.</span>
                      {sec.title}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
