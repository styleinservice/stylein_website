import React, { useState } from 'react';
import StyleinLogo from '../common/StyleinLogo';
import { ArrowRight, Check } from 'lucide-react';

export default function FooterTopBrand() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
      {/* Brand Identity & Mission */}
      <div className="flex flex-col gap-3 max-w-md">
        <StyleinLogo size="large" />
        <p className="text-neutral-400 text-[0.85rem] leading-relaxed font-body">
          The ultimate on-demand automotive technology platform. Delivering eco-friendly mobile car wash, tyre fitting, synthetic oil changes, and 24/7 emergency rescue wherever you are parked.
        </p>
      </div>

      {/* VIP Newsletter Subscription */}
      <div className="flex flex-col gap-2.5 w-full lg:w-auto">
        <span className="text-white text-[0.82rem] font-bold tracking-wider uppercase font-heading">
          Join the Stylein Exclusive Club
        </span>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full sm:w-[280px] px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/12 text-white text-[0.82rem] placeholder:text-neutral-500 focus:outline-none focus:border-stylein-red/60 focus:bg-white/[0.09] transition-all"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-stylein-red hover:bg-[#ff1f2d] text-white text-[0.82rem] font-semibold flex items-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(229,9,20,0.4)] hover:shadow-[0_6px_20px_rgba(229,9,20,0.6)] cursor-pointer border-none shrink-0"
          >
            {subscribed ? (
              <>
                <Check size={14} />
                <span>Joined</span>
              </>
            ) : (
              <>
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
