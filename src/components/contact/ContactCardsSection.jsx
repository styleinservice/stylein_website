import React from 'react';
import { CONTACT_CARDS_DATA } from '../../constants/contactData';
import ContactInfoCard from './ContactInfoCard';

export default function ContactCardsSection() {
  return (
    <section className="relative w-full py-8 sm:py-12 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04] overflow-hidden">
      <div className="max-w-[1240px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {CONTACT_CARDS_DATA.map((card, idx) => (
            <ContactInfoCard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
