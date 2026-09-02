import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      delay: (index % 8) * 0.04,
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      className="group relative h-[215px] sm:h-[250px] md:h-[275px] lg:h-[295px] rounded-2xl sm:rounded-[22px] overflow-hidden bg-[#090C12] border border-white/[0.08] hover:border-stylein-red/40 flex flex-col justify-between select-none cursor-pointer hover:shadow-[0_18px_40px_rgba(229,9,20,0.18)] will-change-transform"
    >
      {/* Top 3D Image Showcase Area */}
      <div className="h-[54%] w-full bg-[#06080d]/70 p-2 sm:p-3 flex items-center justify-center relative overflow-hidden border-b border-white/[0.04]">
        {service.image ? (
          <img
            src={service.image}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-106 transition-transform duration-300 ease-out select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
            loading="lazy"
          />
        ) : (
          <div className="text-neutral-600 font-heading text-[0.66rem] uppercase">{title}</div>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="h-[46%] p-2.5 sm:p-3.5 flex flex-col justify-between bg-[#090C12]">
        <div>
          <h3 className="font-heading text-[0.74rem] sm:text-[0.84rem] md:text-[0.92rem] font-bold text-white tracking-tight uppercase line-clamp-1 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="font-body text-neutral-400 text-[0.6rem] sm:text-[0.68rem] md:text-[0.73rem] leading-snug line-clamp-2 mt-0.5 sm:mt-1">
            {description}
          </p>
        </div>

        {/* Minimal Bottom Action Indicator */}
        <div className="flex items-center justify-between pt-0.5 border-t border-white/[0.03]">
          <span className="text-[0.58rem] sm:text-[0.64rem] font-bold text-white/30 group-hover:text-stylein-red transition-colors uppercase tracking-wider font-heading">
            View Details
          </span>
          <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-white/[0.03] group-hover:bg-stylein-red/15 border border-white/10 group-hover:border-stylein-red/40 flex items-center justify-center transition-all duration-300">
            <ChevronRight size={9} className="text-neutral-400 group-hover:text-stylein-red group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
