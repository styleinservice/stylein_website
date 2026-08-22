import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_WHY_DATA } from '../../constants/contactData';
import ContactWhyCard from './ContactWhyCard';

export default function ContactWhySection() {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12 bg-[#050505] border-t border-white/[0.04] overflow-hidden">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-8 sm:mb-12 max-w-xl"
        >
          <span className="font-heading text-[0.74rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase text-neutral-400 mb-2 block">
            WHY CHOOSE STYLEIN
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight uppercase">
            Premium Service.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
              Professional Standards.
            </span>
          </h2>
          <p className="font-body text-neutral-300/80 text-xs sm:text-sm md:text-base leading-relaxed mt-2.5">
            Designed from the ground up to deliver perfection for discerning automobile owners who expect the highest standard of care.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {CONTACT_WHY_DATA.map((item, idx) => (
            <ContactWhyCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
