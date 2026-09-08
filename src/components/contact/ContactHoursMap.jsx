import React from 'react';
import { OPERATING_HOURS, CONTACT_INFO } from '../../constants/contactData';
import { Clock, Navigation, MapPin, Shield } from 'lucide-react';

export default function ContactHoursMap() {
  return (
    <div className="flex flex-col gap-6 w-full text-left">
      {/* Operating Hours Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0b0d14]/90 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 mb-4 text-[#FF3B47]">
          <Clock size={18} />
          <h3 className="text-white text-base font-bold font-heading">Operating Hours</h3>
        </div>
        <div className="flex flex-col gap-3">
          {OPERATING_HOURS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-none text-xs sm:text-sm">
              <div>
                <p className="text-neutral-200 font-medium">{item.days}</p>
                <p className="text-neutral-500 text-[0.72rem]">{item.label}</p>
              </div>
              <span className="text-right font-semibold text-[#FF3B47] font-mono">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Coverage & Hub Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0b0d14]/90 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="flex items-center gap-2 mb-3 text-amber-400">
          <MapPin size={18} />
          <h3 className="text-white text-base font-bold font-heading">Hub & Coverage</h3>
        </div>
        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-body">
          {CONTACT_INFO.address}
        </p>
        <div className="flex items-center gap-2 mt-2 text-[0.72rem] text-neutral-400">
          <Shield size={12} className="text-emerald-400" />
          <span>{CONTACT_INFO.license}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-neutral-400">Rapid vans across Ajman & UAE</span>
          <a
            href={CONTACT_INFO.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold no-underline border border-amber-500/20 transition-colors"
          >
            <Navigation size={12} />
            <span>Open Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}
