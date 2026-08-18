import React from 'react';
import StyleinLogo from '../common/StyleinLogo';

export default function PhoneBackUI() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#242836] via-[#12141c] to-[#07080b] rounded-[28px] flex flex-col justify-between items-center p-5 select-none relative overflow-hidden border border-white/12 [transform:rotateY(180deg)] [backface-visibility:hidden]">
      {/* Samsung Galaxy Ultra Iconic Floating Camera Module */}
      <div className="self-start flex gap-3 pt-1 pl-1">
        {/* Main 3 Vertical Large Camera Rings */}
        <div className="flex flex-col gap-2.5">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="w-10 h-10 rounded-full bg-[#0a0c12] border-2 border-neutral-400/60 p-1 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.9)] relative"
            >
              <div className="w-6 h-6 rounded-full bg-[#141724] border border-white/25 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-950/90 border border-cyan-400/50 shadow-[0_0_5px_rgba(34,211,238,0.4)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Vertical Column: Flash, Laser AF, 5x Telephoto */}
        <div className="flex flex-col gap-2.5 pt-0.5">
          {/* LED Flash */}
          <div className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-400/50 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-100 shadow-[0_0_6px_rgba(255,240,200,0.9)]" />
          </div>

          {/* Laser AF Sensor */}
          <div className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-400/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-950 border border-red-500/60" />
          </div>

          {/* Periscope Telephoto Ring */}
          <div className="w-7 h-7 rounded-full bg-[#0a0c12] border-2 border-neutral-400/60 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-4 h-4 rounded-full bg-[#141724] flex items-center justify-center">
              <div className="w-2 h-2 bg-cyan-950 border border-cyan-400/40 rounded-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Center Official STYLEIN Emblem */}
      <div className="my-auto opacity-80 hover:opacity-100 transition-opacity">
        <StyleinLogo />
      </div>

      {/* Samsung Style Subtle Titanium Label */}
      <div className="text-[0.52rem] text-neutral-500 font-bold tracking-[0.2em] uppercase pb-1">
        SAMSUNG TITANIUM EDITION
      </div>

      {/* Metallic Specular Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
    </div>
  );
}
