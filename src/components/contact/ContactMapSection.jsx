import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { CONTACT_AREAS_DATA } from '../../constants/contactData';

export default function ContactMapSection() {
  return (
    <section id="areas" className="relative w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04] overflow-hidden">
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
            COVERAGE ZONES
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight uppercase">
            Areas We{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red">
              Serve
            </span>
          </h2>
          <p className="font-body text-neutral-300/85 text-xs sm:text-sm md:text-base leading-relaxed mt-2.5">
            Professional mobile vehicle services delivered rapidly across all major districts in Dubai and the UAE.
          </p>
        </motion.div>

        {/* 2-Column Map Display & Area Cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive/Visual Dark Map Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full h-[360px] sm:h-[420px] rounded-[28px] overflow-hidden border border-white/10 relative bg-[#07090f] shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Embedded Dark Theme OpenStreetMap / Map Canvas */}
            <iframe
              title="STYLEIN Dubai Coverage Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115654.54580277252!2d55.1856784!3d25.1843232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae"
              className="w-full h-full border-none filter invert-[90%] hue-rotate-[180deg] contrast-[110%] opacity-75"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay Badge */}
            <div className="absolute top-4 left-4 z-20 bg-[#090C12]/90 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white text-xs font-bold font-heading uppercase tracking-wider">Live Rapid Dispatch: Active</span>
            </div>
          </motion.div>

          {/* Right: Area List */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 w-full text-left">
            {CONTACT_AREAS_DATA.map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="p-3.5 rounded-2xl bg-[#090C12] border border-white/[0.06] hover:border-white/15 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-stylein-red/10 border border-stylein-red/20 flex items-center justify-center text-stylein-red shrink-0">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs sm:text-sm font-bold text-white leading-tight">{area.name}</h4>
                    <span className="font-body text-[0.68rem] text-neutral-400">{area.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-heading text-[0.72rem] font-bold">
                  <Navigation size={11} />
                  <span>{area.eta}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
