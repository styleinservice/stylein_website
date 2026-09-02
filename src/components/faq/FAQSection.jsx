import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQ_ITEMS } from '../../constants/faqData';
import FAQHeader from './FAQHeader';
import FAQAccordionItem from './FAQAccordionItem';
import { ArrowUpRight } from 'lucide-react';
import { useHomeMotion } from '../../context/HomeMotionContext';

export default function FAQSection() {
  const isFirstVisit = useHomeMotion();
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="w-full pt-1 sm:pt-2 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-14 bg-[#040406] relative z-15 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[130px] bg-stylein-red/5 pointer-events-none" />

      <div className="max-w-[940px] mx-auto relative z-10 flex flex-col items-center">
        <div className="w-full">
          <FAQHeader />
        </div>

        <div className="w-full flex flex-col gap-2.5 mb-6">
          {FAQ_ITEMS.map((item, index) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        <motion.div
          initial={isFirstVisit ? { opacity: 0, y: 15 } : false}
          animate={!isFirstVisit ? { opacity: 1, y: 0 } : undefined}
          whileInView={isFirstVisit ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: '-30px' }}
          transition={isFirstVisit ? { duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white text-[0.82rem] font-semibold tracking-wide no-underline shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_25px_rgba(229,9,20,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 font-heading"
          >
            <span>Go to FAQs</span>
            <ArrowUpRight size={13} className="text-stylein-red" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
