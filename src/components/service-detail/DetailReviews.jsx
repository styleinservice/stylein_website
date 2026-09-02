import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouteMotion } from '../../context/HomeMotionContext';

const REVIEWS = [
  {
    text: 'Great service as always. Mr. Abdul showed and did a great job in cleaning my car and make sure all stains are gone!',
    author: 'Sofia Khalifa',
  },
  {
    text: 'I ordered for car wash outside and internal. The guy who did it was so pleasant and the job was perfectly done. I am so impressed.',
    author: 'David Foley',
  },
  {
    text: 'Unmatched convenience. The mobile studio arrived right on schedule and detailed the vehicle with precision.',
    author: 'Tariq Al-Mansoor',
  },
];

export default function DetailReviews() {
  const isFirstVisit = useRouteMotion();
  const scrollRef = useRef(null);

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -250 : 250, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-8 sm:py-12 px-6 sm:px-10 lg:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="w-full max-w-[1240px] mx-auto">
        <motion.div
          initial={isFirstVisit ? { opacity: 0, y: 20 } : false}
          animate={!isFirstVisit ? { opacity: 1, y: 0 } : undefined}
          whileInView={isFirstVisit ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={isFirstVisit ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase">
            Hear it from our customers
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0a0c14] border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0a0c14] border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex items-stretch overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 gap-3.5 sm:gap-5 md:gap-8 text-left pb-2 touch-pan-x"
        >
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={isFirstVisit ? { opacity: 0, y: 20 } : false}
              animate={!isFirstVisit ? { opacity: 1, y: 0 } : undefined}
              whileInView={isFirstVisit ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true }}
              transition={isFirstVisit ? { duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
              className="w-[230px] min-w-[230px] sm:w-[260px] sm:min-w-[260px] md:w-auto md:min-w-0 shrink-0 snap-start p-4.5 sm:p-5 md:p-6 rounded-2xl md:rounded-[24px] bg-[#090C12] border border-white/[0.06] flex flex-col justify-between hover:border-white/15 transition-colors self-stretch"
            >
              <p className="font-body text-neutral-300/90 text-xs sm:text-[0.82rem] md:text-[0.88rem] leading-relaxed mb-4 sm:mb-6 flex-1">
                &ldquo;{rev.text}&rdquo;
              </p>

              <div className="border-t border-white/[0.06] pt-3 mt-auto">
                <span className="font-heading text-[0.72rem] sm:text-xs md:text-sm font-bold text-white uppercase tracking-wider block">
                  {rev.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
