import React from 'react';
import { useSelector } from 'react-redux';
import { Navigation, MapPin, Shield, Clock } from 'lucide-react';

export default function ContactHoursMap() {
  const { data: contact } = useSelector((state) => state.contact || {});

  const address = contact?.address || 'Showroom 4, Sheikh Zayed Road, Al Quoz 3, Dubai, UAE';
  const workingHours = contact?.workingHours || 'Monday - Sunday: 08:00 AM - 10:00 PM';
  const mapsUrl = contact?.googleMapsUrl || 'https://maps.google.com/?q=Al+Quoz+Dubai';
  const embedUrl = contact?.mapEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const coordinates = contact?.coordinates || '25°08\'12.0"N 55°14\'30.0"E';
  const license = contact?.license || 'Trade License No. 59292';

  return (
    <div className="w-full h-full flex flex-col text-left">
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0b0d14]/90 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group flex flex-col flex-1 h-full">
        {/* Header with Title & Coordinates */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-amber-400">
            <MapPin size={16} />
            <h3 className="text-white text-sm sm:text-base font-bold font-heading">Hub & Workshop Location</h3>
          </div>
          <span className="text-[0.68rem] font-mono text-neutral-400 font-medium">
            {coordinates}
          </span>
        </div>

        {/* Dynamic Address */}
        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-body">
          {address}
        </p>

        {/* Dynamic Working Hours Strip */}
        <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-neutral-300 font-body">
          <Clock size={13} className="text-stylein-red shrink-0" />
          <span className="text-neutral-400 text-[0.72rem] font-semibold">Hours:</span>
          <span className="text-white text-[0.75rem] font-medium">{workingHours}</span>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="w-full flex-1 min-h-[180px] rounded-xl overflow-hidden my-3.5 border border-white/10 relative bg-[#121520]">
          <iframe
            title="STYLEIN Workshop Location"
            src={embedUrl}
            className="w-full h-full min-h-[180px] border-0 filter contrast-[1.08] opacity-90 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Bottom Actions: Trade License & Open in Google Maps Button */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[0.72rem] text-neutral-400">
            <Shield size={12} className="text-emerald-400 shrink-0" />
            <span className="truncate">{license}</span>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold no-underline border border-amber-500/20 transition-all hover:scale-105 shrink-0"
          >
            <Navigation size={12} />
            <span>View on Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}
