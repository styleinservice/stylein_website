import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DROPDOWN_ITEMS } from '../../constants/heroData';
import { X, LifeBuoy, ChevronDown, ArrowRight } from 'lucide-react';

export default function NavMobileMenu({ isOpen, onClose }) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (href, e) => {
    onClose?.();
    if (href.startsWith('#') || href.startsWith('/#')) {
      return;
    }
    e.preventDefault();
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isOpen && (
        <button
          onClick={onClose}
          aria-label="Close navigation drawer"
          className="fixed top-5 right-5 z-[2600] w-10 h-10 rounded-full bg-white/[0.1] hover:bg-white/[0.2] border border-white/20 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.8)] lg:hidden"
        >
          <X size={20} className="text-white" />
        </button>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-20 w-[80vw] max-w-[340px] h-[100dvh] max-h-[100dvh] px-6 pt-16 pb-28 flex flex-col overflow-y-auto select-none transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3 pt-4 w-full">
          {/* 1. Home */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="text-white text-[1.05rem] font-semibold no-underline hover:text-stylein-red py-1 font-heading tracking-wide cursor-pointer"
          >
            Home
          </a>

          {/* 2. Services Accordion */}
          <div className="flex flex-col w-full">
            <button
              onClick={() => setServicesExpanded((p) => !p)}
              className="flex items-center gap-2 text-white text-[1.05rem] font-semibold bg-transparent border-none py-1.5 cursor-pointer text-left font-heading tracking-wide w-fit group"
            >
              <span>Services</span>
              <ChevronDown size={15} className={`transition-transform duration-300 ${servicesExpanded ? 'rotate-180 text-stylein-red' : 'text-neutral-400'}`} />
            </button>

            <AnimatePresence>
              {servicesExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col gap-1.5 mt-1 ml-2 pl-3 border-l-2 border-stylein-red/40 overflow-hidden w-full"
                >
                  {SERVICES_DROPDOWN_ITEMS.map((srv) => (
                    <a
                      key={srv.id}
                      href={srv.href}
                      onClick={(e) => handleNavClick(srv.href, e)}
                      className={`text-[0.84rem] py-1 no-underline font-medium flex items-center justify-between w-full cursor-pointer ${
                        srv.isRescue
                          ? 'text-[#FF3B47] font-bold hover:text-red-400'
                          : 'text-neutral-300 hover:text-stylein-red'
                      }`}
                    >
                      <span>{srv.title}</span>
                    </a>
                  ))}
                  <a
                    href="/services"
                    onClick={(e) => handleNavClick('/services', e)}
                    className="text-stylein-red text-[0.8rem] font-bold py-1 no-underline flex items-center gap-1 mt-0.5 cursor-pointer"
                  >
                    <span>View All Services</span>
                    <ArrowRight size={12} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Brands */}
          <a href="/brands" onClick={(e) => handleNavClick('/brands', e)} className="text-white text-[1.05rem] font-semibold no-underline hover:text-stylein-red py-1 font-heading tracking-wide cursor-pointer">
            Brands
          </a>

          {/* 4. FAQs */}
          <a href="/faqs" onClick={(e) => handleNavClick('/faqs', e)} className="text-white text-[1.05rem] font-semibold no-underline hover:text-stylein-red py-1 font-heading tracking-wide cursor-pointer">
            FAQs
          </a>

          {/* 5. About Us */}
          <a href="/about" onClick={(e) => handleNavClick('/about', e)} className="text-white text-[1.05rem] font-semibold no-underline hover:text-stylein-red py-1 font-heading tracking-wide cursor-pointer">
            About Us
          </a>

          {/* 6. Contact */}
          <a href="/contact" onClick={(e) => handleNavClick('/contact', e)} className="text-white text-[1.05rem] font-semibold no-underline hover:text-stylein-red py-1 font-heading tracking-wide cursor-pointer">
            Contact
          </a>

          {/* 7. Rescue Me */}
          <a href="/rescue" onClick={(e) => handleNavClick('/rescue', e)} className="inline-flex items-center gap-2 text-[#FF3B47] text-[0.98rem] font-bold no-underline py-1 mt-0.5 relative cursor-pointer">
            <LifeBuoy size={18} className="text-[#FF3B47]" />
            <span>Rescue me!</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B47] animate-ping ml-1 opacity-80" />
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="fixed bottom-6 left-0 right-0 z-[2550] flex justify-center items-center px-6 pointer-events-none lg:hidden">
          <a
            href="#download"
            onClick={onClose}
            className="pointer-events-auto flex items-center justify-center bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] text-white py-4 px-6 rounded-2xl font-extrabold text-[0.96rem] tracking-wide no-underline w-full max-w-[320px] text-center shadow-[0_6px_25px_rgba(229,9,20,0.55)] active:scale-98 transition-transform"
          >
            Download app
          </a>
        </div>
      )}
    </>
  );
}
