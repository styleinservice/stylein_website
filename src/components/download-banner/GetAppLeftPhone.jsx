import React from 'react';
import { motion } from 'framer-motion';
import PhoneScreenUI from '../app-showcase/PhoneScreenUI';
import { useHomeMotion } from '../../context/HomeMotionContext';

export default function GetAppLeftPhone() {
  const isFirstVisit = useHomeMotion();

  return (
    <div className="w-full lg:w-[42%] flex items-end justify-center relative overflow-hidden self-end pt-4 lg:pt-0">
      <motion.div
        initial={isFirstVisit ? { y: 150, opacity: 0 } : false}
        animate={!isFirstVisit ? { y: 0, opacity: 1 } : undefined}
        whileInView={isFirstVisit ? { y: 0, opacity: 1 } : undefined}
        viewport={{ once: true, margin: '-50px' }}
        transition={isFirstVisit ? { duration: 0.95, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
        className="relative z-10 w-[225px] sm:w-[245px] h-[340px] sm:h-[365px] rounded-t-[34px] p-1.5 pb-0 bg-gradient-to-b from-[#3a3f52] via-[#161822] to-[#08090f] border-2 border-b-0 border-white/20 [transform:perspective(1000px)_rotateY(10deg)_rotateX(6deg)] hover:[transform:perspective(1000px)_rotateY(4deg)_rotateX(2deg)] transition-transform duration-500 ease-out"
      >
        <div className="absolute inset-0 rounded-t-[34px] ring-1 ring-inset ring-white/20 pointer-events-none" />

        <div className="w-full h-full rounded-t-[28px] overflow-hidden bg-[#07090e] border border-black relative">
          <PhoneScreenUI />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
