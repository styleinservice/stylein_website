import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LifeBuoy, PhoneCall, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../../constants/contactData';

export default function ContactEmergencyStrip() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#1c0809] via-[#12070a] to-[#0d0e14] border border-[#FF3B47]/30 shadow-[0_10px_40px_rgba(255,59,71,0.15)] flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF3B47]/15 border border-[#FF3B47]/30 flex items-center justify-center text-[#FF3B47] shrink-0">
            <LifeBuoy size={26} className="animate-spin-slow" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#FF3B47] animate-ping" />
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#FF3B47] font-heading">
                24/7 Emergency Roadside Assistance
              </span>
            </div>
            <h3 className="text-white text-lg sm:text-xl font-bold font-heading">
              Stuck on the road? Immediate 20-Min Recovery
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-0.5 font-body">
              Flat tyre, dead battery, breakdown or lockout? Our mobile units are on standby.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
          <a
            href={CONTACT_INFO.phoneHref}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF3B47] hover:bg-[#e02e3a] text-white text-xs sm:text-sm font-semibold no-underline shadow-[0_4px_20px_rgba(255,59,71,0.4)] transition-all cursor-pointer"
          >
            <PhoneCall size={15} />
            <span>Emergency Call</span>
          </a>
          <button
            onClick={() => {
              navigate('/rescue');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>Rescue Page</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
