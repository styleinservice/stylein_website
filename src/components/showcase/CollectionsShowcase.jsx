import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import TopServiceBar from './TopServiceBar';
import ShowcaseLeft from './ShowcaseLeft';
import ShowcaseCenter from './ShowcaseCenter';
import { fetchHomeServices } from '../../store/services/servicesSlice';

export default function CollectionsShowcase() {
  const dispatch = useDispatch();
  const { items: services } = useSelector((state) => state.services);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchHomeServices());
  }, [dispatch]);

  const handleSelectService = (idx) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  const safeIndex = activeIndex < services.length ? activeIndex : 0;
  const collection = services[safeIndex] || services[0];

  return (
    <section
      id="services"
      className="relative w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12 bg-[#050507] overflow-hidden"
    >
      {/* Deep Obsidian Black Ambient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, rgba(180,10,20,0.06) 0%, rgba(6,6,8,0.98) 50%, #040406 100%)',
        }}
      />

      {/* Unified Centered Container */}
      <div className="relative z-10 max-w-[1080px] mx-auto flex flex-col items-center gap-10 sm:gap-12 w-full">
        {/* Top Service Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <TopServiceBar
            services={services}
            activeIndex={safeIndex}
            onSelect={handleSelectService}
          />
        </motion.div>

        {/* 2-Column Balanced Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          {/* Left Text Column: Enters from Left */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col justify-center items-start"
          >
            <ShowcaseLeft
              collection={collection}
              services={services}
              activeIndex={safeIndex}
              onSelect={handleSelectService}
            />
          </motion.div>

          {/* Right Image Column: Enters from Right */}
          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-center relative"
          >
            <ShowcaseCenter
              collection={collection}
              activeIndex={safeIndex}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
