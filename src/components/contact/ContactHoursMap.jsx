import React from 'react';
import { OPERATING_HOURS, CONTACT_INFO } from '../../constants/contactData';
import { Clock, Navigation, MapPin, Shield } from 'lucide-react';

export default function ContactHoursMap() {
  return (
    <div className="flex flex-col gap-3.5 w-full text-left">
      {/* Operating Hours Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0b0d14]/90 border border-white/[0.08] shadow-[0_12px_35px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 mb-3 text-[#FF3B47]">
          <Clock size={16} />
          <h3 className="text-white text-sm font-bold font-heading">Operating Hours</h3>
        </div>
        <div className="flex flex-col gap-2">
          {OPERATING_HOURS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/[0.05] last:border-none text-xs">
              <div>
                <p className="text-neutral-200 font-medium">{item.days}</p>
                <p className="text-neutral-500 text-[0.68rem]">{item.label}</p>
              </div>
              <span className="text-right font-semibold text-[#FF3B47] font-mono text-xs">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Coverage & Interactive Google Map Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0b0d14]/90 border border-white/[0.08] shadow-[0_12px_35px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-amber-400">
            <MapPin size={16} />
            <h3 className="text-white text-sm font-bold font-heading">Hub & Workshop Location</h3>
          </div>
          <span className="text-[0.68rem] font-mono text-neutral-400 font-medium">
            {CONTACT_INFO.coordinates}
          </span>
        </div>

        <p className="text-neutral-300 text-xs leading-relaxed font-body">
          {CONTACT_INFO.address}
        </p>

        {/* Embedded Interactive Google Map */}
        <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden mt-3 border border-white/10 relative bg-[#121520]">
          <iframe
            title="STYLEIN Workshop Location"
            src={CONTACT_INFO.mapEmbedUrl}
            className="w-full h-full border-0 filter contrast-[1.08] opacity-90 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[0.7rem] text-neutral-400">
            <Shield size={11} className="text-emerald-400" />
            <span>{CONTACT_INFO.license}</span>
          </div>
          <a
            href={CONTACT_INFO.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[0.74rem] font-semibold no-underline border border-amber-500/20 transition-all hover:scale-105"
          >
            <Navigation size={12} />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}
