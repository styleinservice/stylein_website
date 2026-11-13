import React from 'react';
import { LANGUAGES } from '../../constants/heroData';
import { Check } from 'lucide-react';

export default function LanguageDropdown({ currentLang, onSelectLang, onClose }) {
  return (
    <div className="absolute top-full right-0 mt-5 w-[165px] bg-[#090b10]/95 backdrop-blur-2xl border border-white/12 rounded-2xl p-1.5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-50 before:absolute before:-top-5 before:left-0 before:right-0 before:h-5 before:bg-transparent">
      <div className="flex flex-col gap-0.5">
        {LANGUAGES.map((lang) => {
          const isActive = currentLang === lang.short;

          return (
            <button
              key={lang.code}
              onClick={() => {
                onSelectLang(lang.short);
                onClose();
              }}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border border-transparent ${
                isActive
                  ? 'text-white bg-stylein-red/15 border-stylein-red/30'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.native}</span>
              </div>
              {isActive && <Check size={14} className="text-stylein-red" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
