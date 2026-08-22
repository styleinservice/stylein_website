import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: (index % 8) * 0.05,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function ServiceCard({ service, index = 0 }) {
  const navigate = useNavigate();
  if (!service) return null;

  const targetId = service.serviceId || service._id || '';
  const title = service.title || service.name || 'Automotive Service';
  const description = service.description || service.redline || '';

  const handleClick = () => {
    if (targetId) {
      navigate(`/services/${targetId}`);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      className="group relative h-[235px] sm:h-[275px] md:h-[295px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#090C12] border border-white/[0.08] hover:border-stylein-red/40 flex flex-col justify-between select-none cursor-pointer hover:shadow-[0_20px_45px_rgba(229,9,20,0.15)] will-change-transform"
    >
      {/* Top Image Area */}
      <div className="h-[56%] w-full bg-[#06080d]/60 p-2 sm:p-3 flex items-center justify-center relative overflow-hidden border-b border-white/[0.04]">
        {service.image ? (
          <img
            src={service.image}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-106 transition-transform duration-300 ease-out select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
            loading="lazy"
          />
        ) : (
          <div className="text-neutral-600 font-heading text-[0.68rem] uppercase">{title}</div>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="h-[44%] p-2.5 sm:p-3 flex flex-col justify-between bg-[#090C12]">
        <div>
          <h3 className="font-heading text-[0.8rem] sm:text-[0.88rem] md:text-[0.94rem] font-bold text-white tracking-tight uppercase line-clamp-1 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="font-body text-neutral-400 text-[0.64rem] sm:text-[0.72rem] leading-snug line-clamp-2 mt-0.5 sm:mt-1">
            {description}
          </p>
        </div>

        {/* Minimal Bottom Link Arrow Indicator */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[0.62rem] sm:text-[0.66rem] font-bold text-white/30 group-hover:text-stylein-red transition-colors uppercase tracking-wider font-heading">
            View Details
          </span>
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-white/[0.03] group-hover:bg-stylein-red/15 border border-white/10 group-hover:border-stylein-red/40 flex items-center justify-center transition-all duration-300">
            <ChevronRight size={10} className="text-neutral-400 group-hover:text-stylein-red group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
