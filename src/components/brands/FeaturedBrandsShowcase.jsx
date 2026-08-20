import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchBrands } from '../../store/brands/brandsSlice';
import BrandShowcaseLeft from './BrandShowcaseLeft';
import BrandShowcaseCenter from './BrandShowcaseCenter';
import BrandShowcaseRight from './BrandShowcaseRight';

const headerVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const colLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const colCenter = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] } },
};

const colRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function FeaturedBrandsShowcase() {
  const dispatch = useDispatch();
  const { items: allBrands, fetched } = useSelector((state) => state.brands);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!fetched) dispatch(fetchBrands());
  }, [dispatch, fetched]);

  const featuredBrands = allBrands
    .filter((b) => b.featured === true && !b.deleted && b.active)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  // Preload all featured brand images in background for instant transitions
  useEffect(() => {
    if (featuredBrands.length > 0) {
      featuredBrands.forEach((b) => {
        if (b.image) {
          const img = new Image();
          img.src = b.image;
        }
      });
    }
  }, [featuredBrands]);

  const total = featuredBrands.length;
  const currentBrand = total > 0 ? featuredBrands[activeIndex % total] : null;

  const handlePrev = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  if (!currentBrand && total === 0) return null;

  return (
    <section id="featured-brands" className="relative w-full py-10 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-12 bg-[#040406] overflow-hidden border-t border-white/[0.04]">
      {/* Dynamic Ambient Red Atmosphere */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(180,10,20,0.08) 0%, rgba(6,6,8,0.98) 55%, #040406 100%)' }}
      />

      <div className="relative z-10 max-w-[1160px] mx-auto flex flex-col items-center gap-5 sm:gap-7 w-full">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center flex flex-col items-center max-w-xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center px-3 py-0.5 rounded-full bg-stylein-red/10 border border-stylein-red/25 text-stylein-red text-[0.68rem] sm:text-[0.72rem] font-bold tracking-widest uppercase mb-2">
            <span>THE PINNACLE OF AUTOMOTIVE CARE</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-heading text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            LUXURY <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">MARQUES</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="font-body text-[0.78rem] sm:text-xs text-neutral-400 mt-1 max-w-md">
            Tailored doorstep maintenance & precision detailing designed for the world's most distinguished automobiles.
          </motion.p>
        </motion.div>

        {/* 3-Column Luxury Showcase Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-5 mt-1"
        >
          <motion.div variants={colCenter} className="order-1 lg:order-2 lg:col-span-5 w-full flex items-center justify-center">
            <BrandShowcaseCenter
              brand={currentBrand}
              activeIndex={activeIndex}
              totalBrands={total}
              onPrev={handlePrev}
              onNext={handleNext}
              onSelect={(idx) => setActiveIndex(idx)}
            />
          </motion.div>

          <motion.div variants={colLeft} className="order-2 lg:order-1 lg:col-span-4 w-full flex items-center justify-center lg:justify-start">
            <BrandShowcaseLeft brand={currentBrand} activeIndex={activeIndex} totalBrands={total} />
          </motion.div>

          <motion.div variants={colRight} className="order-3 lg:col-span-3 w-full hidden lg:flex items-center justify-end">
            <BrandShowcaseRight
              brand={currentBrand}
              activeIndex={activeIndex}
              totalBrands={total}
              onSelect={(idx) => setActiveIndex(idx)}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
