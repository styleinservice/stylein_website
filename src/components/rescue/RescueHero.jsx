import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RescueTabs from './RescueTabs';
import Rescue3DIcon from '../../assets/Services/Rescue.webp';
import { useRouteMotion } from '../../context/HomeMotionContext';

export default function RescueHero({ heroServices = [], description = '' }) {
  const isFirstVisit = useRouteMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const sortedServices = Array.isArray(heroServices)
    ? [...heroServices].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    : [];

  if (sortedServices.length === 0) return null;

  const currentService = sortedServices[activeIndex] || sortedServices[0];
  const serviceName = currentService?.title || currentService?.name || '24/7 Roadside Rescue';
  const serviceRedline = currentService?.redline || '24/7 ON-DEMAND ROADSIDE RESCUE';
  const serviceDesc = currentService?.description || description || '';
  const serviceImage = currentService?.image || '';
  const serviceNum = String(currentService?.order || activeIndex + 1).padStart(2, '0');

  return (
    <section className="relative w-full pt-3 pb-6 sm:pb-8 lg:pb-10 px-6 sm:px-10 lg:px-12 overflow-hidden bg-[#030406]">
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[180px] bg-stylein-red/12 pointer-events-none z-0" />

      <motion.div
        initial={isFirstVisit ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={isFirstVisit ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
        className="w-full max-w-[840px] mx-auto text-center flex flex-col items-center mb-6 sm:mb-8 relative z-10 px-4"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-3.5 drop-shadow-[0_10px_25px_rgba(229,9,20,0.4)] hover:scale-110 transition-transform duration-300">
          <img
            src={Rescue3DIcon}
            alt="Rescue 3D Warning Icon"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold tracking-[-0.025em] leading-[1.18]">
          <span className="text-white">Stranded on the road? </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
            We&apos;ve got your back.
          </span>
        </h1>

        <p className="text-neutral-300/85 text-xs sm:text-[0.875rem] leading-relaxed max-w-lg mx-auto mt-2.5 font-normal">
          Got a puncture? Battery died? Tyre pressure low? Just request STYLEIN and we&apos;ll be with you in minutes.
        </p>
      </motion.div>

      <div className="w-full max-w-[1280px] mx-auto relative z-10">
        <RescueTabs
          heroServices={sortedServices}
          activeIndex={activeIndex}
          onSelectTab={(idx) => setActiveIndex(idx)}
        />

        <div className="max-w-[960px] sm:max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center justify-center gap-8 sm:gap-10 lg:gap-12 pt-1">
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start text-left overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`rescue-content-${activeIndex}`}
                initial={isFirstVisit ? { opacity: 0, x: -40, filter: 'blur(4px)' } : false}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -25, filter: 'blur(4px)' }}
                transition={isFirstVisit ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
                className="w-full flex flex-col items-start"
              >
                <span className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#e50914]/25 tracking-tight select-none leading-none mb-1">
                  {serviceNum}
                </span>

                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14]">
                  {serviceName}
                </h2>

                <span className="text-stylein-red text-xs sm:text-[0.82rem] font-bold uppercase tracking-wider font-heading mt-2 block">
                  {serviceRedline}
                </span>

                {serviceDesc && (
                  <p className="font-body text-neutral-300/80 text-xs sm:text-sm leading-relaxed max-w-lg mt-2">
                    {serviceDesc}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5 w-full flex items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/3] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`rescue-img-${activeIndex}`}
                  initial={isFirstVisit ? { opacity: 0, x: 45, scale: 0.94, filter: 'blur(6px)' } : false}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 25, scale: 0.96, filter: 'blur(4px)' }}
                  transition={isFirstVisit ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {serviceImage ? (
                    <img
                      src={serviceImage}
                      alt={serviceName}
                      className="w-full h-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] select-none pointer-events-none hover:scale-104 transition-transform duration-300 ease-out"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-48 h-36 rounded-2xl bg-white/[0.03] flex items-center justify-center text-neutral-600 font-heading text-xs uppercase">
                      {serviceName}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
