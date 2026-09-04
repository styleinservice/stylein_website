import React from 'react';
import { LEGAL_META } from '../../data/legal/legalMeta';

export default function LegalHeader() {
  return (
    <header className="w-full pt-28 sm:pt-32 pb-8 border-b border-white/10">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight mb-3">
          {LEGAL_META.title}
        </h1>

        <div className="text-xs sm:text-sm text-neutral-400 font-mono flex flex-wrap items-center gap-x-4 gap-y-1 mb-6">
          <span>Version: {LEGAL_META.version}</span>
          <span>•</span>
          <span>Effective: {LEGAL_META.effectiveDate}</span>
          <span>•</span>
          <span>Last Updated: {LEGAL_META.lastUpdated}</span>
        </div>

        <p className="font-body text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
          {LEGAL_META.intro}
        </p>

        <div className="pt-4 border-t border-white/10 text-xs sm:text-sm text-neutral-400 font-body space-y-2">
          <p className="font-semibold text-neutral-300 uppercase tracking-wider text-xs">
            IMPORTANT LEGAL NOTICE
          </p>
          {LEGAL_META.importantNotice.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </header>
  );
}
