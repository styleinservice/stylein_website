import React from 'react';
import RescueServiceCard from './RescueServiceCard';

export default function RescueServicesGrid({ rescueServices = [] }) {
  if (!rescueServices || rescueServices.length === 0) return null;

  return (
    <section id="services-list" className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-12 bg-[#030406]">
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="text-[0.72rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-2">
            RAPID RESPONSE FLEET
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
            Specialized Rescue Services
          </h2>
        </div>

        {/* 2-Column Desktop Grid / 1-Column Mobile Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {rescueServices.map((service, idx) => (
            <RescueServiceCard key={service._id || idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
