import React from 'react';
import { PhoneCall, MessageSquare, MapPin } from 'lucide-react';

const SERVICES_LINKS = [
  { label: 'Car Wash & Detailing', href: '#car-wash' },
  { label: 'Battery Replacement', href: '#battery' },
  { label: 'Mobile Tyre Fitting', href: '#tyres' },
  { label: 'Synthetic Oil Change', href: '#engine-oil' },
  { label: 'Ceramic Glass Coating', href: '#glass-coating' },
  { label: '50-Point Car Inspection', href: '#car-inspection' },
  { label: '24/7 Roadside Rescue', href: '#rescue', isRescue: true },
];

const COMPANY_LINKS = [
  { label: 'About Stylein', href: '#about' },
  { label: 'Mobile Fleet Tech', href: '#fleet' },
  { label: 'Careers & Hiring', href: '#careers' },
  { label: 'Eco & Sustainability', href: '#sustainability' },
  { label: 'Press & Media', href: '#press' },
  { label: 'Partner With Us', href: '#partner' },
];

const LOCATIONS = [
  'Downtown Dubai & DIFC',
  'Dubai Marina & JBR',
  'Palm Jumeirah & Hills',
  'Abu Dhabi Central',
  'Riyadh Metro Area',
];

export default function FooterNavColumns() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-left font-body">
      {/* Column 1: Services */}
      <div className="flex flex-col gap-3.5">
        <h4 className="text-white text-[0.85rem] font-bold tracking-wider uppercase font-heading">
          Services
        </h4>
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          {SERVICES_LINKS.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className={`text-[0.82rem] no-underline transition-colors hover:text-white ${
                  link.isRescue ? 'text-[#FF3B47] font-semibold hover:text-[#ff5c66]' : 'text-neutral-400'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2: Company */}
      <div className="flex flex-col gap-3.5">
        <h4 className="text-white text-[0.85rem] font-bold tracking-wider uppercase font-heading">
          Company
        </h4>
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          {COMPANY_LINKS.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className="text-neutral-400 hover:text-white text-[0.82rem] no-underline transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3: Emergency & Support */}
      <div className="flex flex-col gap-3.5">
        <h4 className="text-white text-[0.85rem] font-bold tracking-wider uppercase font-heading">
          24/7 Support
        </h4>
        <div className="flex flex-col gap-3 text-[0.82rem] text-neutral-400">
          <a
            href="tel:+97180078953"
            title="Call STYLEIN Helpline"
            className="flex items-center gap-2 text-white font-semibold no-underline hover:text-stylein-red transition-colors"
          >
            <PhoneCall size={14} className="text-stylein-red" />
            <span>+971 800 STYLEIN</span>
          </a>
          <a
            href="https://wa.me/971558120570"
            target="_blank"
            rel="noopener noreferrer"
            title="Live WhatsApp Chat"
            className="flex items-center gap-2 text-neutral-300 no-underline hover:text-white transition-colors"
          >
            <MessageSquare size={14} className="text-emerald-400" />
            <span>Live WhatsApp Chat</span>
          </a>
          <p className="text-[0.78rem] text-neutral-500 leading-relaxed mt-1">
            Certified emergency mobile units dispatched in &lt; 20 minutes across all major zones.
          </p>
        </div>
      </div>

      {/* Column 4: Coverage Areas */}
      <div className="flex flex-col gap-3.5">
        <h4 className="text-white text-[0.85rem] font-bold tracking-wider uppercase font-heading">
          Coverage
        </h4>
        <ul className="flex flex-col gap-2 list-none p-0 m-0 text-neutral-400 text-[0.82rem]">
          {LOCATIONS.map((loc, i) => (
            <li key={i} className="flex items-center gap-2">
              <MapPin size={12} className="text-stylein-red/70 shrink-0" />
              <span>{loc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
