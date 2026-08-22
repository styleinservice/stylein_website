import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_DROPDOWN_ITEMS } from '../../constants/heroData';
import { ArrowRight } from 'lucide-react';

export default function ServicesDropdown({ onClose }) {
  const navigate = useNavigate();

  const handleItemClick = (href, e) => {
    e.preventDefault();
    onClose?.();
    if (href.startsWith('#') || href.startsWith('/#')) {
      window.location.href = href;
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute top-full left-0 mt-5 w-[230px] bg-[#090b10]/95 backdrop-blur-2xl border border-white/12 rounded-2xl p-2 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-50 before:absolute before:-top-5 before:left-0 before:right-0 before:h-5 before:bg-transparent">
      <div className="flex flex-col gap-0.5">
        {SERVICES_DROPDOWN_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleItemClick(item.href, e)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 no-underline group cursor-pointer ${
              item.isRescue
                ? 'text-[#FF3B47] font-bold hover:bg-red-500/10'
                : 'text-neutral-200 hover:text-stylein-red hover:bg-white/5'
            }`}
          >
            <span>{item.title}</span>
          </a>
        ))}
      </div>

      {/* Footer: View All Services */}
      <div className="mt-1.5 pt-1.5 border-t border-white/10">
        <a
          href="/services"
          onClick={(e) => handleItemClick('/services', e)}
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-stylein-red/10 border border-stylein-red/25 text-stylein-red hover:bg-stylein-red/20 font-semibold text-xs transition-all no-underline group cursor-pointer"
        >
          <span>View All Services</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
