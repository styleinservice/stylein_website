import React from 'react';

export default function LegalSectionContent({ content }) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="space-y-3 font-body text-sm sm:text-base text-neutral-300 leading-relaxed">
      {content.map((block, idx) => {
        if (block.type === 'paragraph') {
          return (
            <p key={idx} className="leading-relaxed">
              {block.text}
            </p>
          );
        }

        if (block.type === 'subheading') {
          return (
            <h3
              key={idx}
              className="font-heading font-bold text-white text-sm sm:text-base uppercase tracking-wider pt-2"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === 'list') {
          if (block.ordered) {
            return (
              <ol key={idx} className="list-decimal pl-5 sm:pl-6 space-y-1.5 my-2">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            );
          }

          return (
            <ul key={idx} className="list-disc pl-5 sm:pl-6 space-y-1.5 my-2 text-neutral-300">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed pl-1">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}
