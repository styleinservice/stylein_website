import React from 'react';
import { useSelector } from 'react-redux';
import { PhoneCall, MessageSquare, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const ACCENT_STYLES = {
  red: 'group-hover:border-[#FF3B47]/40 bg-[#FF3B47]/10 text-[#FF3B47]',
  emerald: 'group-hover:border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  blue: 'group-hover:border-blue-500/40 bg-blue-500/10 text-blue-400',
  amber: 'group-hover:border-amber-500/40 bg-amber-500/10 text-amber-400',
};

export default function ContactCards() {
  const { data: contact, loading } = useSelector((state) => state.contact || {});

  const cleanPhone = (contact?.phone || '+971 4 800 STYLE').replace(/\s+/g, '');
  const cleanWhatsapp = (contact?.whatsapp || '+971 50 999 8877').replace(/[^0-9]/g, '');

  const cards = [
    {
      id: 'phone',
      badge: 'Direct Hotline',
      title: 'Customer Support',
      value: contact?.phone || '+971 4 800 STYLE',
      subtext: contact?.workingHours ? `Hours: ${contact.workingHours}` : 'Available 8 AM - 10 PM (Rescue 24/7)',
      actionLabel: 'Call Now',
      href: `tel:${cleanPhone}`,
      icon: PhoneCall,
      accentColor: 'red',
      isExternal: false,
    },
    {
      id: 'whatsapp',
      badge: 'Instant Response',
      title: 'WhatsApp Concierge',
      value: contact?.whatsapp || '+971 50 999 8877',
      subtext: 'Chat live with our technical advisors',
      actionLabel: 'WhatsApp Us',
      href: `https://wa.me/${cleanWhatsapp}`,
      icon: MessageSquare,
      accentColor: 'emerald',
      isExternal: true,
    },
    {
      id: 'email',
      badge: 'Official Inquiries',
      title: 'Email Desk',
      value: contact?.email || 'support@stylein.ae',
      subtext: 'For corporate fleet & service queries',
      actionLabel: 'Send Email',
      href: `mailto:${contact?.email || 'support@stylein.ae'}`,
      icon: Mail,
      accentColor: 'blue',
      isExternal: false,
    },
    {
      id: 'location',
      badge: 'Service Hub',
      title: 'Workshop & Hub',
      value: contact?.address || 'Showroom 4, Sheikh Zayed Road, Al Quoz 3, Dubai, UAE',
      subtext: 'United Arab Emirates',
      actionLabel: 'View on Google Maps',
      href: contact?.googleMapsUrl || 'https://maps.google.com/?q=Al+Quoz+Dubai',
      icon: MapPin,
      accentColor: 'amber',
      isExternal: true,
    },
  ];

  return (
    <section className="w-full mb-10 sm:mb-14 lg:mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {cards.map((card) => {
          const IconComponent = card.icon;
          const accent = ACCENT_STYLES[card.accentColor] || ACCENT_STYLES.red;

          return (
            <a
              key={card.id}
              href={card.href}
              target={card.isExternal ? '_blank' : undefined}
              rel={card.isExternal ? 'noopener noreferrer' : undefined}
              className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#0b0d14]/85 border border-white/[0.09] hover:bg-[#0e111a] hover:border-white/25 transition-all duration-300 no-underline shadow-[0_10px_35px_rgba(0,0,0,0.55)] hover:-translate-y-1 ${
                loading ? 'opacity-80' : 'opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${accent}`}>
                    <IconComponent size={20} />
                  </div>
                  <span className="text-[0.66rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-white text-base font-bold font-heading group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                <p className="text-white text-sm sm:text-[0.92rem] font-semibold mt-1.5 tracking-tight font-body break-words line-clamp-2">
                  {card.value}
                </p>
                <p className="text-neutral-400 text-xs mt-1.5 font-body leading-relaxed line-clamp-2">
                  {card.subtext}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold mt-5 text-neutral-300 group-hover:text-white transition-colors">
                <span>{card.actionLabel}</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
