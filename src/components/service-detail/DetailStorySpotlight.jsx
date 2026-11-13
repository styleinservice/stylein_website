import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import DetailInteractiveCard from './DetailInteractiveCard';

export default function DetailStorySpotlight({ service }) {
  if (!service) return null;

  const title = service.title || service.serviceName || service.name || 'Automotive Care';
  const description = service.description || '';
  const spotlightItem = service.servicesImages?.[0] || {
    image: service.image,
    text: title,
    name: title,
    description: description,
    points: [
      'On-site battery replacement',
      'Battery health diagnostics',
      'Professional installation',
      'Quick and convenient service',
    ],
    price: service.price || service.servicePrice,
    duration: service.duration,
  };

  const spotlightTitle = spotlightItem.text || spotlightItem.title || spotlightItem.name || title;
  const spotlightDesc = spotlightItem.description || description;

  const points = (spotlightItem?.points && spotlightItem.points.length > 0)
    ? spotlightItem.points
    : [
        'On-site battery replacement',
        'Battery health diagnostics',
        'Professional installation',
        'Quick and convenient service',
      ];

  return (
    <section className="relative w-full py-8 sm:py-12 px-6 sm:px-10 lg:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="w-full max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
        {/* Left Side (Desktop): The Interactive Hover Card / Top on Mobile */}
        <motion.div
          initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-1 lg:col-span-5 w-full flex items-center justify-center"
        >
          <div className="w-full max-w-[340px] sm:max-w-[360px]">
            <DetailInteractiveCard
              item={spotlightItem}
              fallbackTitle={spotlightTitle}
              fallbackDesc={spotlightDesc}
              fallbackPoints={points}
              fallbackPrice={service.price || service.servicePrice}
              fallbackDuration={service.duration}
            />
          </div>
        </motion.div>

        {/* Right Side (Desktop): Content / Bottom on Mobile */}
        <motion.div
          initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-2 lg:col-span-7 flex flex-col items-start text-left"
        >
          <span className="text-[0.72rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-2">
            THE LUXURY STANDARD
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14]">
            {spotlightTitle}
          </h2>

          <p className="font-body text-neutral-300/85 text-xs sm:text-sm md:text-base leading-relaxed mt-2.5 sm:mt-3 max-w-xl">
            {spotlightDesc}
          </p>

          {/* Bullet Points */}
          <div className="flex flex-col gap-3 mt-5 w-full max-w-lg">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-stylein-red/15 border border-stylein-red/30 flex items-center justify-center text-stylein-red shrink-0 mt-0.5">
                  <CheckCircle2 size={13} />
                </div>
                <span className="font-body text-neutral-200 text-xs sm:text-sm leading-snug">
                  {typeof pt === 'string' ? pt : pt.text || ''}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
