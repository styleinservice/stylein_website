import React from 'react';

export default function BlogDetailContent({ content }) {
  if (!content) return null;

  return (
    <article className="w-full font-body text-neutral-300 leading-relaxed text-[0.95rem] sm:text-[1.02rem]">
      {/* Dynamic Rendered HTML Blog Content with Custom Dark Automotive Styling */}
      <div
        className="space-y-6 [&>h2]:font-heading [&>h2]:font-extrabold [&>h2]:text-white [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:md:text-[1.7rem] [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:tracking-tight [&>h2]:border-b [&>h2]:border-white/10 [&>h2]:pb-2.5
        [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-white [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-stylein-red
        [&>p]:text-neutral-300 [&>p]:leading-[1.8] [&>p]:mb-5
        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul>li]:text-neutral-300
        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:mb-6 [&>ol>li]:text-neutral-300
        [&>blockquote]:border-l-4 [&>blockquote]:border-stylein-red [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-6 [&>blockquote]:bg-[#0d101a] [&>blockquote]:rounded-r-xl [&>blockquote]:text-neutral-200 [&>blockquote]:italic
        [&>img]:rounded-2xl [&>img]:my-8 [&>img]:border [&>img]:border-white/10 [&>img]:shadow-xl [&>img]:w-full
        [&>strong]:text-white [&>strong]:font-semibold
        [&>a]:text-stylein-red [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-[#ff1f2d]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
