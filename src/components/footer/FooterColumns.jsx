import React, { useState } from 'react';
import StyleinLogo from '../common/StyleinLogo';
import FooterStoreBadges from './FooterStoreBadges';
import LanguageDropdown from '../home/LanguageDropdown';
import { HelpCircle, Phone, MessageSquare, Languages, ArrowUpRight } from 'lucide-react';

const ALL_SERVICES = [
  { label: 'Car Wash', href: '#car-wash' },
  { label: 'Battery', href: '#battery' },
  { label: 'Tyres', href: '#tyres' },
  { label: 'Engine Oil', href: '#engine-oil' },
  { label: 'Glass Coating', href: '#glass-coating' },
  { label: 'Car Inspection', href: '#car-inspection' },
  { label: 'Rescue', href: '#rescue', isRescue: true },
];

export default function FooterColumns() {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 pt-2 pb-6 text-left font-body relative z-20 w-full">
      {/* Top on Mobile / Left on Desktop: Brand Logo & App Store Badges */}
      <div className="flex flex-col items-start gap-4 sm:gap-6 pt-1 sm:pt-3 w-full lg:w-auto">
        <div className="scale-110 sm:scale-130 origin-left">
          <StyleinLogo />
        </div>
        <FooterStoreBadges />
      </div>

      {/* Nav Columns: 2 Columns on Mobile (Company/Support on Left, All Services on Right); 4 Columns on Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 lg:gap-14 text-[0.82rem] sm:text-[0.84rem] w-full lg:w-auto">
        {/* Column 1: Company Links */}
        <div className="flex flex-col gap-2.5">
          <span className="text-white text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 opacity-70">Company</span>
          <a href="#about" className="text-neutral-300 hover:text-white no-underline transition-colors">About Us</a>
          <a href="#contact" className="text-neutral-300 hover:text-white no-underline transition-colors">Contact Us</a>
          <a href="#faqs" className="text-neutral-300 hover:text-white no-underline transition-colors">FAQs</a>

          {/* Support links integrated on mobile column 1 */}
          <div className="flex sm:hidden flex-col gap-2.5 pt-2 border-t border-white/5">
            <a href="tel:+97180078953" className="flex items-center gap-1.5 text-neutral-300 hover:text-white no-underline">
              <Phone size={13} className="text-neutral-400" />
              <span>800 STYLEIN</span>
            </a>
            <a href="#whatsapp" className="flex items-center gap-1.5 text-neutral-300 hover:text-white no-underline">
              <MessageSquare size={13} className="text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white bg-transparent border-none p-0 cursor-pointer text-[0.8rem]"
            >
              <Languages size={13} className="text-neutral-400" />
              <span>{currentLang} ▾</span>
            </button>
          </div>
        </div>

        {/* Column 2: All Services on one side on Mobile */}
        <div className="flex flex-col gap-2.5 sm:hidden">
          <span className="text-white text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 opacity-70">Services</span>
          {ALL_SERVICES.map((item, idx) => (
            <a key={idx} href={item.href} className={`no-underline transition-colors ${item.isRescue ? 'text-[#FF3B47] font-bold' : 'text-neutral-300 hover:text-white'}`}>
              {item.label}
            </a>
          ))}
          <a href="#services" className="text-neutral-400 hover:text-white font-medium flex items-center gap-1 pt-0.5 no-underline text-[0.76rem]">
            <span>View all</span>
            <ArrowUpRight size={11} />
          </a>
        </div>

        {/* Desktop Split Services Column 1 */}
        <div className="hidden sm:flex flex-col gap-2.5">
          <span className="text-white text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 opacity-70">Services</span>
          {ALL_SERVICES.slice(0, 4).map((item, idx) => (
            <a key={idx} href={item.href} className="text-neutral-300 hover:text-white no-underline transition-colors whitespace-nowrap">{item.label}</a>
          ))}
        </div>

        {/* Desktop Split Services Column 2 */}
        <div className="hidden sm:flex flex-col gap-2.5 pt-5 sm:pt-0">
          <span className="text-transparent text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 select-none hidden sm:block">&nbsp;</span>
          {ALL_SERVICES.slice(4).map((item, idx) => (
            <a key={idx} href={item.href} className={`no-underline transition-colors whitespace-nowrap ${item.isRescue ? 'text-[#FF3B47] font-bold' : 'text-neutral-300 hover:text-white'}`}>{item.label}</a>
          ))}
          <a href="#services" className="text-neutral-400 hover:text-white font-medium flex items-center gap-1 pt-0.5 no-underline text-[0.78rem]">
            <span>View all</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Column 4 (Desktop): Support & Language */}
        <div className="hidden sm:flex flex-col gap-3">
          <span className="text-white text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 opacity-70">Support</span>
          <a href="#faqs" className="flex items-center gap-2 text-neutral-300 hover:text-white no-underline transition-colors">
            <HelpCircle size={14} className="text-neutral-400" />
            <span>FAQs</span>
          </a>
          <a href="tel:+97180078953" className="flex items-center gap-2 text-neutral-300 hover:text-white no-underline transition-colors">
            <Phone size={14} className="text-neutral-400" />
            <span>800 STYLEIN</span>
          </a>
          <a href="#whatsapp" className="flex items-center gap-2 text-neutral-300 hover:text-white no-underline transition-colors">
            <MessageSquare size={14} className="text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <div className="relative inline-block" onMouseEnter={() => setLangDropdownOpen(true)} onMouseLeave={() => setLangDropdownOpen(false)}>
            <button type="button" onClick={() => setLangDropdownOpen(!langDropdownOpen)} className="flex items-center gap-1.5 text-neutral-300 hover:text-white bg-transparent border-none p-0 cursor-pointer text-[0.82rem]">
              <Languages size={14} className="text-neutral-400" />
              <span>{currentLang} ▾</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-3 z-50">
                <LanguageDropdown currentLang={currentLang} onSelectLang={(l) => setCurrentLang(l)} onClose={() => setLangDropdownOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
