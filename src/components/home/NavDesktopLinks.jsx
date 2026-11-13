import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/heroData';
import ServicesDropdown from './ServicesDropdown';
import { ChevronDown } from 'lucide-react';

export default function NavDesktopLinks({ servicesOpen, setServicesOpen, handleHover }) {
  const navigate = useNavigate();

  const handleLinkClick = (link, e) => {
    if (link.id === 'services') {
      e.preventDefault();
      setServicesOpen((p) => !p);
      return;
    }
    if (link.href.startsWith('/')) {
      e.preventDefault();
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden lg:flex items-center gap-3.5 xl:gap-4.5">
      {NAV_LINKS.map((link) => {
        const isServices = link.id === 'services';
        return (
          <div
            key={link.id}
            className="relative py-1"
            onMouseEnter={isServices ? () => handleHover('srv', true) : undefined}
            onMouseLeave={isServices ? () => handleHover('srv', false) : undefined}
          >
            <a
              href={link.href}
              title={`STYLEIN ${link.label}`}
              onClick={(e) => handleLinkClick(link, e)}
              className={`text-neutral-200 text-[0.84rem] xl:text-[0.86rem] font-medium no-underline inline-flex items-center gap-1 relative group hover:text-white transition-colors cursor-pointer ${
                isServices && servicesOpen ? 'text-white' : ''
              }`}
            >
              <span>{link.label}</span>
              {link.hasSubmenu && (
                <ChevronDown
                  size={13}
                  className={`opacity-70 transition-transform ${
                    isServices && servicesOpen ? 'rotate-180 text-stylein-red opacity-100' : 'group-hover:opacity-100'
                  }`}
                />
              )}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-stylein-red transition-all duration-300 rounded-full ${
                  isServices && servicesOpen ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
            {isServices && servicesOpen && <ServicesDropdown onClose={() => setServicesOpen(false)} />}
          </div>
        );
      })}
    </nav>
  );
}
