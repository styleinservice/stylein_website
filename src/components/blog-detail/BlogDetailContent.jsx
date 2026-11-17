import React, { useMemo } from 'react';

/**
 * Normalizes blog HTML content from Admin Panel / rich text editors.
 * Removes rogue inline colors (e.g. black text pasted from Google Docs/Word),
 * inline background colors, external font-families, and inline font sizes,
 * ensuring all current and future blogs strictly adhere to StyleinCar's
 * high-contrast dark automotive typography.
 */
function cleanBlogHtml(html) {
  if (!html || typeof html !== 'string') return '';

  let cleaned = html;

  // 1. Remove dangerous/disruptive inline styles (colors, backgrounds, external font families & sizes)
  cleaned = cleaned.replace(/style=(["'])(.*?)\1/gi, (match, quote, styleStr) => {
    const declarations = styleStr.split(';');
    const preserved = [];

    for (const decl of declarations) {
      const trimmed = decl.trim();
      if (!trimmed) continue;
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx === -1) continue;
      const prop = trimmed.substring(0, colonIdx).trim().toLowerCase();
      const val = trimmed.substring(colonIdx + 1).trim();

      // Strip color, background, font-family, and font-size so website styles always win
      if (
        prop === 'color' ||
        prop.startsWith('background') ||
        prop.startsWith('font-family') ||
        prop.startsWith('font-size')
      ) {
        continue;
      }

      preserved.push(`${prop}: ${val}`);
    }

    if (preserved.length === 0) return '';
    return `style="${preserved.join('; ')}"`;
  });

  // 2. Fix Google Docs / Word quirk where paragraphs or lists are wrapped inside headings (e.g. <h3 ...><p>...</p></h3>)
  cleaned = cleaned.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    if (/<(p|ul|ol|table|blockquote)\b/i.test(inner)) {
      return `<div class="blog-nested-content"${attrs}>${inner}</div>`;
    }
    return match;
  });

  return cleaned;
}

export default function BlogDetailContent({ content }) {
  if (!content) return null;

  const sanitizedContent = useMemo(() => cleanBlogHtml(content), [content]);

  return (
    <article className="w-full font-body text-neutral-300 leading-relaxed text-[0.95rem] sm:text-[1.02rem]">
      {/* Dynamic Rendered HTML Blog Content with Custom Dark Automotive Styling */}
      <div
        className="blog-article-content space-y-6"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </article>
  );
}
