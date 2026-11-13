import React from 'react';
import GetAppLeftPhone from './GetAppLeftPhone';
import GetAppRightContent from './GetAppRightContent';

export default function GetAppBanner() {
  return (
    <section className="w-full py-10 sm:py-14 px-6 sm:px-12 lg:px-16 bg-transparent flex items-center justify-center relative z-20">
      {/* Compact Liquid Glassy Luxury Banner Container */}
      <div className="max-w-[1180px] w-full rounded-[36px] border border-white/12 bg-gradient-to-br from-[#121522]/95 via-[#0c0e17]/90 to-[#080910]/95 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(229,9,20,0.12)] relative overflow-hidden flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-10 px-6 sm:px-12 pt-6 lg:pt-8 pb-0">
        {/* Iridescent Liquid Mesh Background Ambient */}
        <div className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full blur-[110px] bg-[#e50914]/18 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[380px] h-[380px] rounded-full blur-[110px] bg-[#00d2b4]/8 pointer-events-none" />

        {/* Specular Liquid Glass Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent pointer-events-none" />

        {/* Left Side: Compact Half/Two-Thirds 3D Smartphone */}
        <GetAppLeftPhone />

        {/* Right Side: Typography & QR Code Pill */}
        <GetAppRightContent />
      </div>
    </section>
  );
}
