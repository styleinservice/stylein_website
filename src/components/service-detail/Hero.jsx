import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Download, Calendar, Tag } from 'lucide-react';

export default function Hero({ service }) {
  const navigate = useNavigate();
  if (!service) return null;

  const title = service.title || service.serviceName || service.name || 'Automotive Service';
  const description = service.description || service.redline || '';
  const price = service.price || service.servicePrice;

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 sm:py-16 overflow-hidden">
      {/* Dynamic Red Glow Behind Vehicle */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[160px] bg-stylein-red/10 pointer-events-none z-0" />

      {/* Back Button */}
      <div className="w-full max-w-[1280px] mx-auto mb-6 relative z-10">
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider font-heading cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back To Services</span>
        </button>
      </div>

      <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12 relative z-10">
        {/* Left Column Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stylein-red/10 border border-stylein-red/30 text-stylein-red text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase">
              <Sparkles size={12} />
              <span>PREMIUM AUTOMOTIVE SERVICE</span>
            </div>
            {price && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-200 text-[0.68rem] sm:text-xs font-bold tracking-wider uppercase">
                <Tag size={11} className="text-stylein-red" />
                <span>From AED {Number(price).toLocaleString()}</span>
              </div>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white uppercase tracking-tight leading-[1.12]">
            {title}
          </h1>

          <p className="font-body text-neutral-300/85 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-xl mt-4 sm:mt-5">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#book"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-stylein-red hover:bg-[#ff2f2f] text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(229,9,20,0.45)] hover:shadow-[0_15px_40px_rgba(229,9,20,0.65)] hover:-translate-y-0.5 no-underline"
            >
              <Calendar size={16} />
              <span>Book Service</span>
            </a>

            <a
              href="#download"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#090C12] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 no-underline"
            >
              <Download size={16} />
              <span>Download App</span>
            </a>
          </div>
        </div>

        {/* Right Column Image with Subtle Float */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="relative w-full max-w-[480px] aspect-[4/3] flex items-center justify-center">
            {service.image ? (
              <img
                src={service.image}
                alt={title}
                className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] select-none pointer-events-none transition-transform duration-700 ease-in-out hover:scale-105"
              />
            ) : (
              <div className="w-full h-full rounded-3xl bg-[#090C12] border border-white/10 flex items-center justify-center text-neutral-600 font-heading text-sm uppercase">
                {title}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
