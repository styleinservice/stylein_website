import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="w-[245px] sm:w-[320px] h-[155px] sm:h-[185px] rounded-2xl p-3.5 sm:p-5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 hover:border-white/20 backdrop-blur-2xl shadow-[0_6px_25px_rgba(0,0,0,0.4)] flex flex-col justify-between text-left shrink-0 select-none group transition-all duration-300">
      {/* Top Header: Golden Stars & Quote Icon */}
      <div className="flex items-center justify-between">
        {/* 5-Star Rating in Luxury Golden Color */}
        <div className="flex items-center gap-0.5 sm:gap-1 text-[#FFB800]">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={11} className="sm:w-3 sm:h-3" fill="#FFB800" stroke="none" />
          ))}
        </div>

        {/* Clean Quote Icon */}
        <Quote size={13} className="sm:w-4 sm:h-4 text-white/20 group-hover:text-stylein-red/60 transition-colors" />
      </div>

      {/* Comment Body */}
      <p className="text-neutral-200/90 text-[0.73rem] sm:text-[0.84rem] leading-snug sm:leading-relaxed line-clamp-3 font-body my-auto">
        "{review.comment}"
      </p>

      {/* Card Footer: User & Vehicle Details */}
      <div className="pt-1.5 sm:pt-2 border-t border-white/6 flex items-center justify-between text-[0.68rem] sm:text-[0.74rem]">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-white font-semibold font-heading">
            <span>{review.name}</span>
            <CheckCircle2 size={10} className="text-emerald-400" />
          </div>
          <span className="text-neutral-400 text-[0.62rem] sm:text-[0.68rem] font-medium font-body truncate max-w-[180px] sm:max-w-[220px]">
            {review.role} • {review.service}
          </span>
        </div>
      </div>
    </div>
  );
}
