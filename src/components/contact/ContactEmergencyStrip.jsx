import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LifeBuoy, PhoneCall, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../../constants/contactData';

export default function ContactEmergencyStrip() {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-6 sm:mt-8">
      <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#1c0809] via-[#12070a] to-[#0d0e14] border border-[#FF3B47]/30 shadow-[0_8px_30px_rgba(255,59,71,0.12)] flex flex-col md:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FF3B47]/15 border border-[#FF3B47]/30 flex items-center justify-center text-[#FF3B47] shrink-0">
            <LifeBuoy size={20} className="animate-spin-slow" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B47] animate-ping" />
              <span className="text-[0.64rem] font-bold uppercase tracking-wider text-[#FF3B47] font-heading">
                24/7 Roadside Rescue
              </span>
            </div>
            <h3 className="text-white text-sm sm:text-base font-bold font-heading">
              Stuck on the road? Rapid 20-Min Recovery
            </h3>
            <p className="text-neutral-400 text-[0.72rem] sm:text-xs mt-0.5 font-body">
              Flat tyre, dead battery, or breakdown? Our units are active in Ajman & UAE.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <a
            href={CONTACT_INFO.phoneHref}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF3B47] hover:bg-[#e02e3a] text-white text-xs font-semibold no-underline shadow-[0_3px_15px_rgba(255,59,71,0.35)] transition-all cursor-pointer"
          >
            <PhoneCall size={13} />
            <span>Emergency Call</span>
          </a>
          <button
            onClick={() => {
              navigate('/rescue');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <span>Rescue Page</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
