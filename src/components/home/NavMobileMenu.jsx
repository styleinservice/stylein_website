import React, { useState } from 'react';
import { NAV_LINKS, SERVICES_DROPDOWN_ITEMS, LANGUAGES } from '../../constants/heroData';
import { X, Globe, LifeBuoy, ChevronDown, ArrowRight, Check } from 'lucide-react';

export default function NavMobileMenu({ isOpen, currentLang, onSelectLang, onClose }) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [langExpanded, setLangExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-[#07080a]/96 backdrop-blur-xl flex flex-col p-6 justify-between overflow-y-auto">
      <div className="flex justify-end">
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="bg-white/10 border-none rounded-full w-10 h-10 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-4 my-6">
        {NAV_LINKS.map((item) => {
          if (item.id === 'services') {
            return (
              <div key={item.id} className="flex flex-col">
                <button
                  onClick={() => setServicesExpanded((prev) => !prev)}
                  className="flex items-center justify-between text-white text-xl font-semibold bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  <span>{item.label}</span>
                  <ChevronDown size={20} className={`transition-transform ${servicesExpanded ? 'rotate-180 text-stylein-red' : ''}`} />
                </button>

                {servicesExpanded && (
                  <div className="flex flex-col gap-2 mt-3 ml-2 pl-3 border-l border-white/15">
                    {SERVICES_DROPDOWN_ITEMS.map((srv) => (
                      <a
                        key={srv.id}
                        href={srv.href}
                        onClick={onClose}
                        className="text-neutral-300 hover:text-stylein-red text-base py-1 no-underline font-medium flex items-center justify-between"
                      >
                        <span>{srv.title}</span>
                      </a>
                    ))}
                    <a
                      href="#all-services"
                      onClick={onClose}
                      className="text-stylein-red text-sm font-semibold py-1.5 no-underline flex items-center gap-1 mt-1"
                    >
                      <span>View All Services</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="text-white text-xl font-semibold no-underline hover:text-stylein-red transition-colors"
            >
              {item.label}
            </a>
          );
        })}

        <a
          href="#rescue"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-[#ff3b47] text-lg font-semibold no-underline mt-2"
        >
          <LifeBuoy size={20} />
          <span>Rescue me!</span>
        </a>
      </div>

      {/* Language Switcher for Mobile */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setLangExpanded((prev) => !prev)}
            className="flex items-center justify-between text-txt-muted bg-transparent border-none text-sm cursor-pointer p-0"
          >
            <div className="flex items-center gap-2">
              <Globe size={18} />
              <span>Language: {currentLang === 'EN' ? 'English' : 'العربية'}</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${langExpanded ? 'rotate-180 text-stylein-red' : ''}`} />
          </button>

          {langExpanded && (
            <div className="flex flex-col gap-1.5 mt-1 pl-6">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    if (onSelectLang) onSelectLang(l.short);
                    setLangExpanded(false);
                  }}
                  className={`flex items-center justify-between py-1.5 px-3 rounded-lg text-sm bg-transparent border border-transparent text-left cursor-pointer ${
                    currentLang === l.short ? 'text-white bg-white/10 border-white/15' : 'text-neutral-400'
                  }`}
                >
                  <span>{l.native}</span>
                  {currentLang === l.short && <Check size={14} className="text-stylein-red" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <a
          href="#download"
          onClick={onClose}
          className="flex items-center justify-center bg-stylein-red text-white py-3.5 px-6 rounded-full font-semibold text-base no-underline w-full text-center shadow-[0_4px_14px_rgba(229,9,20,0.35)]"
        >
          Download app
        </a>
      </div>
    </div>
  );
}
