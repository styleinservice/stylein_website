import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyleinLogo from '../common/StyleinLogo';
import FooterStoreBadges from './FooterStoreBadges';
import { HelpCircle, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

const ALL_SERVICES = [
  { label: 'Car Wash', href: '/services/6a65aa710f4632990c8c8973' },
  { label: 'Battery', href: '/services/6a799b466c4b83aa31e54872' },
  { label: 'Tyres', href: '/rescue' },
  { label: 'Engine Oil', href: '/services/6a6d9260e47c7f8b06cde650' },
  { label: 'Glass Coating', href: '/services/6a6d921ce47c7f8b06cde633' },
  { label: 'Car Inspection', href: '/services/6a6728c9184f2d233de52e38' },
  { label: 'Rescue', href: '/rescue', isRescue: true },
];

export default function FooterColumns() {
  const navigate = useNavigate();

  const handleNav = (href, e) => {
    if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 pt-2 pb-6 text-left font-body relative z-20 w-full">
      <div className="flex flex-col items-start gap-4 sm:gap-6 pt-1 sm:pt-3 w-full lg:w-auto">
        <div className="scale-110 sm:scale-130 origin-left">
          <StyleinLogo />
        </div>
        <FooterStoreBadges />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 lg:gap-14 text-[0.82rem] sm:text-[0.84rem] w-full lg:w-auto">
        {/* Column 1: Company Links */}
        <div className="flex flex-col gap-2.5">
          <span className="text-white text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 opacity-70">Company</span>
          <a href="/about" onClick={(e) => handleNav('/about', e)} className="text-neutral-300 hover:text-white no-underline transition-colors cursor-pointer">About Us</a>
          <a href="/faqs" onClick={(e) => handleNav('/faqs', e)} className="text-neutral-300 hover:text-white no-underline transition-colors cursor-pointer">FAQs</a>

          <div className="flex sm:hidden flex-col gap-2.5 pt-2 border-t border-white/5">
            <a href="tel:+97180078953" className="flex items-center gap-1.5 text-neutral-300 hover:text-white no-underline">
              <Phone size={13} className="text-neutral-400" />
              <span>800 STYLEIN</span>
            </a>
            <a href="https://wa.me/971558120570" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-neutral-300 hover:text-white no-underline">
              <MessageSquare size={13} className="text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Column 2: Mobile Services */}
        <div className="flex flex-col gap-2.5 sm:hidden">
          <span className="text-white text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 opacity-70">Services</span>
          {ALL_SERVICES.map((item, idx) => (
            <a key={idx} href={item.href} onClick={(e) => handleNav(item.href, e)} className={`no-underline transition-colors cursor-pointer ${item.isRescue ? 'text-[#FF3B47] font-bold' : 'text-neutral-300 hover:text-white'}`}>
              {item.label}
            </a>
          ))}
          <a href="/services" onClick={(e) => handleNav('/services', e)} className="text-neutral-400 hover:text-white font-medium flex items-center gap-1 pt-0.5 no-underline text-[0.76rem] cursor-pointer">
            <span>View all</span>
            <ArrowUpRight size={11} />
          </a>
        </div>

        {/* Desktop Split Services Column 1 */}
        <div className="hidden sm:flex flex-col gap-2.5">
          <span className="text-white text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 opacity-70">Services</span>
          {ALL_SERVICES.slice(0, 4).map((item, idx) => (
            <a key={idx} href={item.href} onClick={(e) => handleNav(item.href, e)} className="text-neutral-300 hover:text-white no-underline transition-colors whitespace-nowrap cursor-pointer">{item.label}</a>
          ))}
        </div>

        {/* Desktop Split Services Column 2 */}
        <div className="hidden sm:flex flex-col gap-2.5 pt-5 sm:pt-0">
          <span className="text-transparent text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 select-none hidden sm:block">&nbsp;</span>
          {ALL_SERVICES.slice(4).map((item, idx) => (
            <a key={idx} href={item.href} onClick={(e) => handleNav(item.href, e)} className={`no-underline transition-colors whitespace-nowrap cursor-pointer ${item.isRescue ? 'text-[#FF3B47] font-bold' : 'text-neutral-300 hover:text-white'}`}>{item.label}</a>
          ))}
          <a href="/services" onClick={(e) => handleNav('/services', e)} className="text-neutral-400 hover:text-white font-medium flex items-center gap-1 pt-0.5 no-underline text-[0.78rem] cursor-pointer">
            <span>View all</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Column 4 (Desktop): Support */}
        <div className="hidden sm:flex flex-col gap-3">
          <span className="text-white text-[0.78rem] font-bold uppercase tracking-wider font-heading mb-0.5 opacity-70">Support</span>
          <a href="/faqs" onClick={(e) => handleNav('/faqs', e)} className="flex items-center gap-2 text-neutral-300 hover:text-white no-underline transition-colors cursor-pointer">
            <HelpCircle size={14} className="text-neutral-400" />
            <span>FAQs</span>
          </a>
          <a href="tel:+97180078953" className="flex items-center gap-2 text-neutral-300 hover:text-white no-underline transition-colors">
            <Phone size={14} className="text-neutral-400" />
            <span>800 STYLEIN</span>
          </a>
          <a href="https://wa.me/971558120570" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-300 hover:text-white no-underline transition-colors">
            <MessageSquare size={14} className="text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
