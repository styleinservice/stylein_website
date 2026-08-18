import React, { useState } from 'react';
import StyleinLogo from '../common/StyleinLogo';
import FooterStoreBadges from './FooterStoreBadges';
import LanguageDropdown from '../home/LanguageDropdown';
import { HelpCircle, Phone, MessageSquare, Languages, ArrowUpRight } from 'lucide-react';

const SERVICES_COL_1 = [
  { label: 'Car Wash', href: '#car-wash' },
  { label: 'Battery', href: '#battery' },
  { label: 'Tyres', href: '#tyres' },
  { label: 'Engine Oil', href: '#engine-oil' },
];

const SERVICES_COL_2 = [
  { label: 'Glass Coating', href: '#glass-coating' },
  { label: 'Car Inspection', href: '#car-inspection' },
  { label: 'Rescue', href: '#rescue', isRescue: true },
];

export default function FooterColumns() {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-10 pt-4 pb-6 text-left font-body relative z-20">
      {/* Left: Brand Logo & App Store Badges (Moved slightly down for optical alignment) */}
      <div className="flex flex-col items-start gap-6 pt-2 sm:pt-3">
        <div className="scale-130 origin-left">
          <StyleinLogo />
        </div>
        <FooterStoreBadges />
      </div>

      {/* Right: Clean Link Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 lg:gap-14 text-[0.84rem]">
        {/* Column 1: Company Links */}
        <div className="flex flex-col gap-2.5">
          <a href="#about" className="text-neutral-300 hover:text-white no-underline transition-colors">
            About Us
          </a>
          <a href="#contact" className="text-neutral-300 hover:text-white no-underline transition-colors">
            Contact Us
          </a>
          <a href="#faqs" className="text-neutral-300 hover:text-white no-underline transition-colors">
            FAQs
          </a>
        </div>

        {/* Column 2A: Services First Half */}
        <div className="flex flex-col gap-2.5">
          {SERVICES_COL_1.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-neutral-300 hover:text-white no-underline transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Column 2B: Services Second Half */}
        <div className="flex flex-col gap-2.5">
          {SERVICES_COL_2.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={`no-underline transition-colors whitespace-nowrap ${
                item.isRescue
                  ? 'text-[#FF3B47] font-bold hover:text-[#ff5c66]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#services"
            className="text-neutral-400 hover:text-white font-medium flex items-center gap-1 pt-0.5 no-underline text-[0.78rem]"
          >
            <span>View all</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Column 3: Support & Single Hover Language Dropdown */}
        <div className="flex flex-col gap-3">
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

          {/* Single Language Dropdown with Hover Trigger */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setLangDropdownOpen(true)}
            onMouseLeave={() => setLangDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-[0.82rem]"
            >
              <Languages size={14} className="text-neutral-400" />
              <span>{currentLang} ▾</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-3 z-50 after:absolute after:-bottom-3 after:left-0 after:right-0 after:h-3 after:bg-transparent">
                <LanguageDropdown
                  currentLang={currentLang}
                  onSelectLang={(lang) => setCurrentLang(lang)}
                  onClose={() => setLangDropdownOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
