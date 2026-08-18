import React from 'react';
import AppStoreBadge from '../common/AppStoreBadge';
import GooglePlayBadge from '../common/GooglePlayBadge';

export default function AppQRCodeCard() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
      {/* QR Code Glass Pill */}
      <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#0e1017]/90 backdrop-blur-xl border border-white/12 shadow-[0_10px_25px_rgba(0,0,0,0.8)] group hover:border-white/25 transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-full bg-[#050608] rounded-md p-0.5 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="w-2 h-2 bg-[#e50914] rounded-xs" />
              <div className="w-2 h-2 bg-white rounded-xs" />
            </div>
            <div className="w-1.5 h-1.5 bg-[#e50914] mx-auto rounded-full animate-ping opacity-75" />
            <div className="flex justify-between">
              <div className="w-2 h-2 bg-white rounded-xs" />
              <div className="w-2 h-2 bg-[#e50914] rounded-xs" />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-white text-[0.82rem] font-bold tracking-wide font-heading">
            Scan to download
          </span>
          <span className="text-neutral-400 text-[0.68rem] font-medium font-body">
            iOS & Android
          </span>
        </div>
      </div>

      {/* Official Reusable Store Badges */}
      <div className="flex items-center gap-2">
        <AppStoreBadge />
        <GooglePlayBadge />
      </div>
    </div>
  );
}
