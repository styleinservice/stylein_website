import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PhoneScreenUI from '../app-showcase/PhoneScreenUI';

export default function Detail3DPhone() {
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 22 });
  const springY = useSpring(y, { stiffness: 120, damping: 22 });

  const rotateY = useTransform(springX, [-0.5, 0.5], ['-30deg', '-16deg']);
  const rotateX = useTransform(springY, [-0.5, 0.5], ['0deg', '0deg']);
  const rotateZ = useTransform(springX, [-0.5, 0.5], ['0deg', '0deg']);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
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
      className="order-1 lg:order-2 lg:col-span-6 w-full flex items-center justify-center relative [perspective:1400px] py-4 select-none"
    >
      <div className="absolute w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full blur-[110px] bg-[#e50914]/15 opacity-55 pointer-events-none" />

      {/* Volumetric 3D Smartphone Gliding In From The Right Side */}
      <motion.div
        style={{ rotateX, rotateY, rotateZ, transformStyle: 'preserve-3d' }}
        initial={{ x: 85, opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
        whileInView={{ x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[245px] sm:w-[265px] h-[485px] sm:h-[520px] rounded-[42px]"
      >
        <div
          className="absolute inset-0 rounded-[42px] bg-gradient-to-b from-[#64748b] via-[#334155] to-[#1e293b] border-2 border-white/40 shadow-[-25px_30px_70px_rgba(0,0,0,0.98)] pointer-events-none"
          style={{ transform: 'translateZ(-16px)' }}
        />
        <div
          className="absolute inset-0 rounded-[42px] bg-gradient-to-b from-[#94a3b8] via-[#475569] to-[#1e293b] border-2 border-white/50 ring-1 ring-white/40 pointer-events-none"
          style={{ transform: 'translateZ(-8px)' }}
        />
        <div
          className="absolute -right-[7px] top-20 w-[5px] h-10 bg-gradient-to-r from-neutral-100 to-neutral-400 rounded-r-md border border-white/80"
          style={{ transform: 'translateZ(-7px)' }}
        />
        <div
          className="absolute -right-[7px] top-34 w-[5px] h-7 bg-gradient-to-r from-neutral-100 to-neutral-400 rounded-r-md border border-white/80"
          style={{ transform: 'translateZ(-7px)' }}
        />
        <div
          className="absolute inset-0 rounded-[42px] p-2 bg-gradient-to-b from-[#33384a] via-[#141620] to-[#08090f] border-2 border-white/35 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]"
          style={{ transform: 'translateZ(0px)' }}
        >
          <div className="w-full h-full rounded-[36px] overflow-hidden bg-[#07090e] border border-black relative shadow-inner">
            <PhoneScreenUI />
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/[0.05] to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
