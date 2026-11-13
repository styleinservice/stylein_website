import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function DetailError() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-24 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-stylein-red/10 border border-stylein-red/20 flex items-center justify-center text-stylein-red mb-5 shadow-[0_0_30px_rgba(229,9,20,0.25)]">
        <AlertCircle size={28} />
      </div>

      <h2 className="font-heading text-2xl font-extrabold text-white uppercase tracking-tight">
        Service Not Found
      </h2>

      <p className="font-body text-neutral-400 text-sm mt-2 leading-relaxed">
        The requested service could not be loaded or is temporarily unavailable.
      </p>

      <button
        onClick={() => navigate('/services')}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-stylein-red hover:bg-[#ff2f2f] text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_10px_25px_rgba(229,9,20,0.3)] hover:scale-105 active:scale-95"
      >
        <ArrowLeft size={15} />
        <span>Back To Services</span>
      </button>
    </div>
  );
}
