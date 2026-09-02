import React from 'react';
import { motion } from 'framer-motion';
import aboutImg1 from '../../assets/about/about_1.png';
import aboutImg2 from '../../assets/about/about_2.png';

const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
  },
};

const image1Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, delay: 0.08, ease: [0.16, 1, 0.3, 1] },
  },
};

const image2Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function WhoWeAreSection() {
  return (
    <section className="relative w-full py-10 sm:py-14 bg-[#040406] text-white overflow-hidden border-t border-white/[0.04]">
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 sm:gap-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Clean Trust-Building Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Small Label */}
            <span className="font-heading text-[0.74rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase text-neutral-400 mb-2 block">
              ABOUT STYLEIN
            </span>

            {/* Heading with Signature Red Gradient on 'Are' */}
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.45rem] font-bold text-white tracking-tight leading-[1.16] uppercase">
              Who We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red font-bold">
                Are
              </span>
            </h2>

            {/* Paragraphs */}
            <div className="flex flex-col gap-3 sm:gap-3.5 mt-4 sm:mt-5 text-neutral-300/85 font-body text-[0.86rem] sm:text-[0.92rem] lg:text-[0.96rem] leading-relaxed">
              <p>
                STYLEIN is a technology-driven automotive service platform built to simplify vehicle ownership through premium, on-demand solutions.
              </p>
              <p>
                From routine maintenance and detailing to emergency roadside assistance and vehicle protection, we bring professional automotive care directly to our customers with reliability, convenience, and exceptional service standards.
              </p>
              <p>
                Our mission is to make every vehicle service experience effortless, transparent, and worthy of the trust our customers place in us.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Layered 2-Image Presentation */}
          <div className="lg:col-span-6 w-full flex flex-col items-start justify-center relative select-none">
            {/* Primary Image (Top-Left) */}
            <motion.div
              variants={image1Variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="w-[80%] sm:w-[78%] relative z-0"
            >
              <img
                src={aboutImg1}
                alt="STYLEIN automotive excellence"
                className="w-full aspect-[16/10] object-cover rounded-[18px] sm:rounded-[24px] border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
                loading="lazy"
              />
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              variants={image2Variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="w-[60%] sm:w-[56%] -mt-10 sm:-mt-14 lg:-mt-16 ml-auto mr-0 sm:mr-2 z-10 relative"
            >
              <img
                src={aboutImg2}
                alt="Luxury vehicle precision craftsmanship"
                className="w-full aspect-[4/3] object-cover rounded-[16px] sm:rounded-[20px] border border-white/[0.1] shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
