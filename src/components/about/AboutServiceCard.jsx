import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      delay: idx * 0.05,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AboutServiceCard({ service, index }) {
  const navigate = useNavigate();
  const title = service.name || service.title || 'Service';
  const description = service.redline || service.description || '';

  const handleClick = () => {
    const nameLower = title.toLowerCase();
    if (nameLower.includes('rescue') || nameLower.includes('tyre') || service.isRescue) {
      navigate('/rescue');
    } else if (service.serviceId) {
      navigate(`/services/${service.serviceId}`);
    } else {
      navigate('/services');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="group relative min-w-[195px] max-w-[215px] sm:min-w-[215px] sm:max-w-[230px] h-[245px] sm:h-[268px] rounded-[20px] overflow-hidden bg-[#0a0c12] border border-white/[0.08] hover:border-stylein-red/40 shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_40px_rgba(229,9,20,0.2)] shrink-0 snap-start flex flex-col justify-end select-none transition-all duration-300 cursor-pointer"
    >
      {/* Full-Card Image Layer (90% Compact Proportions) */}
      <div className="absolute inset-0 w-full h-full z-0 p-3 pb-14 flex items-center justify-center bg-[#07090e]">
        {service.image ? (
          <img
            src={service.image}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 select-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600 font-heading text-xs uppercase">
            {title}
          </div>
        )}
      </div>

      {/* Bottom Dark Gradient Fade Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/85 to-transparent z-10 pointer-events-none" />

      {/* Text Overlay Layer at Bottom of Card */}
      <div className="relative z-20 p-3.5 sm:p-4 flex flex-col text-left">
        <h3 className="font-heading text-[0.92rem] sm:text-[0.98rem] font-bold text-white tracking-tight uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-stylein-red transition-colors">
          {title}
        </h3>
        <p className="font-body text-[0.72rem] sm:text-[0.76rem] text-neutral-300/85 leading-snug mt-1 line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
