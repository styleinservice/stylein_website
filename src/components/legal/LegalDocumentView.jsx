import React from 'react';
import { LEGAL_PARTS } from '../../data/legal';
import LegalSectionContent from './LegalSectionContent';
import LegalCompanyContact from './LegalCompanyContact';

export default function LegalDocumentView() {
  return (
    <main
      id="legal-content"
      tabIndex={-1}
      className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 outline-none"
    >
      {LEGAL_PARTS.map((part) => (
        <section key={part.id} id={part.id} className="scroll-mt-6 mb-12">
          {/* Plain Legal Part Header */}
          <div className="pt-8 pb-4 mb-6 border-b border-white/20">
            <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-wide">
              {part.title}
            </h2>
          </div>

          {/* Sequential Plain Sections */}
          <div className="space-y-10">
            {part.sections.map((sec) => (
              <article
                key={sec.id}
                id={sec.id}
                data-section-id={sec.id}
                className="scroll-mt-6 pt-2"
              >
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-white uppercase tracking-tight mb-3">
                  <span className="text-stylein-red mr-2 font-mono">
                    {sec.number}.
                  </span>
                  {sec.title}
                </h3>

                <LegalSectionContent content={sec.content} />
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* Plain Contact Footer */}
      <LegalCompanyContact />
    </main>
  );
}
