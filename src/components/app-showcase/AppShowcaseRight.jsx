import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PhoneScreenUI from './PhoneScreenUI';

export default function AppShowcaseRight() {
  const containerRef = useRef(null);

  // 3D Smooth Interactive Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 22 });
  const springY = useSpring(y, { stiffness: 120, damping: 22 });

  // Pure Vertical Y-Axis Rotation: Top-Left & Bottom-Left are 100% EXACTLY EQUAL (Dono Barabar)
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-30deg', '-16deg']);
  const rotateX = useTransform(springY, [-0.5, 0.5], ['0deg', '0deg']);
  const rotateZ = useTransform(springX, [-0.5, 0.5], ['0deg', '0deg']);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full lg:w-[48%] flex items-center justify-center relative py-6 [perspective:1400px] select-none"
    >
      {/* Deep Red Subtle Ambient Glow */}
      <div className="absolute w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-full blur-[110px] bg-[#e50914]/15 opacity-55 pointer-events-none" />

      {/* Volumetric 3D Smartphone with Top-Left & Bottom-Left 100% Equal Depth */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: 'preserve-3d',
        }}
        initial={{ y: 25, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[275px] sm:w-[290px] h-[535px] sm:h-[560px] rounded-[44px]"
      >
        {/* Deep Back Chassis Layer (Natural Titanium Rail) */}
        <div
          className="absolute inset-0 rounded-[44px] bg-gradient-to-b from-[#64748b] via-[#334155] to-[#1e293b] border-2 border-white/40 shadow-[-30px_35px_80px_rgba(0,0,0,0.98),0_0_25px_rgba(255,255,255,0.08)] pointer-events-none"
          style={{ transform: 'translateZ(-18px)' }}
        />

        {/* Mid-Frame Titanium Extrusion Layer (Bright Specular Rail) */}
        <div
          className="absolute inset-0 rounded-[44px] bg-gradient-to-b from-[#94a3b8] via-[#475569] to-[#1e293b] border-2 border-white/50 ring-1 ring-white/40 pointer-events-none"
          style={{ transform: 'translateZ(-9px)' }}
        />

        {/* Physical Titanium Side Buttons */}
        <div
          className="absolute -right-[8px] top-24 w-[6px] h-12 bg-gradient-to-r from-neutral-100 to-neutral-400 rounded-r-md border border-white/80 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          style={{ transform: 'translateZ(-8px)' }}
        />
        <div
          className="absolute -right-[8px] top-40 w-[6px] h-8 bg-gradient-to-r from-neutral-100 to-neutral-400 rounded-r-md border border-white/80 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          style={{ transform: 'translateZ(-8px)' }}
        />

        {/* Front Titanium Bezel & Glass Display Assembly */}
        <div
          className="absolute inset-0 rounded-[44px] p-2 bg-gradient-to-b from-[#33384a] via-[#141620] to-[#08090f] border-2 border-white/35 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Outer Chamfered Titanium Rim Highlight */}
          <div className="absolute inset-0 rounded-[44px] ring-1 ring-inset ring-white/35 pointer-events-none" />

          {/* Symmetrical Display Screen Frame */}
          <div className="w-full h-full rounded-[38px] overflow-hidden bg-[#07090e] border border-black relative shadow-inner">
            <PhoneScreenUI />

            {/* Front Glass Specular Reflection Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/[0.06] to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
