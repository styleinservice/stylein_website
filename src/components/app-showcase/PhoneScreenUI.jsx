import React from 'react';

export default function PhoneScreenUI() {
  return (
    <div className="w-full h-full bg-[#05060a] text-white select-none relative overflow-hidden font-body text-left">
      <img
        src="/assets/images/app-screen.webp"
        alt="Stylein Mobile App Screen"
        className="w-full h-full object-fill select-none pointer-events-none"
        loading="eager"
        draggable="false"
      />
    </div>
  );
}
