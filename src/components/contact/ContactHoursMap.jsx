import React from 'react';
import { CONTACT_INFO } from '../../constants/contactData';
import { Navigation, MapPin, Shield } from 'lucide-react';

export default function ContactHoursMap() {
  return (
    <div className="w-full h-full flex flex-col text-left">
      {/* Service Coverage & Interactive Google Map Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0b0d14]/90 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group flex flex-col flex-1 h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-amber-400">
            <MapPin size={16} />
            <h3 className="text-white text-sm sm:text-base font-bold font-heading">Hub & Workshop Location</h3>
          </div>
          <span className="text-[0.68rem] font-mono text-neutral-400 font-medium">
            {CONTACT_INFO.coordinates}
          </span>
        </div>

        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-body">
          {CONTACT_INFO.address}
        </p>

        {/* Embedded Interactive Google Map */}
        <div className="w-full flex-1 min-h-[190px] rounded-xl overflow-hidden my-3.5 border border-white/10 relative bg-[#121520]">
          <iframe
            title="STYLEIN Workshop Location"
            src={CONTACT_INFO.mapEmbedUrl}
            className="w-full h-full border-0 filter contrast-[1.08] opacity-90 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[0.72rem] text-neutral-400">
            <Shield size={12} className="text-emerald-400" />
            <span>{CONTACT_INFO.license}</span>
          </div>
          <a
            href={CONTACT_INFO.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold no-underline border border-amber-500/20 transition-all hover:scale-105"
          >
            <Navigation size={12} />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}
