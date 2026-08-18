import React, { useRef, useEffect, useState } from 'react';
import { REVIEWS_DATA } from '../../constants/reviewsData';
import ReviewCard from './ReviewCard';

export default function ReviewsCarousel() {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Triple set for seamless infinite wrap
  const items = [...REVIEWS_DATA, ...REVIEWS_DATA, ...REVIEWS_DATA];

  useEffect(() => {
    let animId;
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      if (!isPaused && !isDragging.current) {
        scrollContainer.scrollLeft += 0.8;
        // Reset when scrolled past one set of items
        const halfScroll = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= halfScroll * 2) {
          scrollContainer.scrollLeft -= halfScroll;
        }
      }
      animId = requestAnimationFrame(autoScroll);
    };

    animId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="w-full relative py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        isDragging.current = false;
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Interactive Drag & Auto-Scroll Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="flex items-center gap-5 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing w-full px-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((review, idx) => (
          <ReviewCard key={`${review.id}-${idx}`} review={review} />
        ))}
      </div>
    </div>
  );
}
