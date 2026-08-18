import React from 'react';
import { 
  Sparkles, Zap, Disc, Gauge, ShieldCheck, 
  CheckCircle2, LifeBuoy, Grid, MapPin, ChevronDown, 
  Wifi, Battery, Home, Tag, User 
} from 'lucide-react';
import StyleinLogo from '../common/StyleinLogo';

const GRID_SERVICES = [
  { id: 'wash', name: 'Car wash', sub: 'From 15m', badge: '10% off', badgeBg: '#f59e0b', icon: Sparkles },
  { id: 'battery', name: 'Battery', sub: 'From 20m', icon: Zap },
  { id: 'tyres', name: 'Tyres', sub: 'From 12 PM', icon: Disc },
  { id: 'oil', name: 'Engine Oil', sub: 'Synthetic', icon: Gauge },
  { id: 'coating', name: 'Ceramic', sub: '9H Shield', icon: ShieldCheck },
  { id: 'inspect', name: 'Inspection', sub: '50-Point', icon: CheckCircle2 },
  { id: 'rescue', name: 'Rescue', sub: '24/7 Live', badge: 'Rescue', badgeBg: '#e50914', icon: LifeBuoy, isRescue: true },
  { id: 'more', name: 'More', sub: '5 services', icon: Grid },
];

export default function PhoneScreenUI() {
  return (
    <div className="w-full h-full bg-[#07090e] text-white flex flex-col justify-between select-none relative overflow-hidden font-body text-left">
      {/* Samsung Infinity-O Punch-Hole & Status Bar */}
      <div className="pt-2 px-4 flex items-center justify-between shrink-0 z-20">
        <span className="text-[0.7rem] font-bold tracking-tight text-neutral-200">09:41</span>
        <div className="w-3 h-3 rounded-full bg-[#000] border border-neutral-700 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-cyan-950" />
        </div>
        <div className="flex items-center gap-1.5 text-neutral-300">
          <span className="text-[0.62rem] font-bold">5G</span>
          <Wifi size={10} />
          <Battery size={12} className="text-white fill-white" />
        </div>
      </div>

      {/* Brand Header */}
      <div className="flex justify-center pt-1 shrink-0">
        <StyleinLogo />
      </div>

      {/* Top Location & Vehicle Selector Dark Glass Pills */}
      <div className="px-3 py-1 flex items-center justify-between gap-2 shrink-0">
        <div className="flex-1 px-2.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <MapPin size={9} className="text-emerald-400" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[0.5rem] text-neutral-400 font-medium">My location</span>
              <span className="text-[0.6rem] font-bold text-white truncate max-w-[65px]">Downtown</span>
            </div>
          </div>
          <ChevronDown size={10} className="text-neutral-400" />
        </div>

        <div className="flex-1 px-2.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-stylein-red/25 text-stylein-red text-[0.5rem] font-black flex items-center justify-center">P</span>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[0.5rem] text-neutral-400 font-medium">Vehicle</span>
              <span className="text-[0.6rem] font-bold text-white truncate max-w-[65px]">Porsche 911</span>
            </div>
          </div>
          <ChevronDown size={10} className="text-neutral-400" />
        </div>
      </div>

      {/* 8 Services Grid (4x2 Layout) */}
      <div className="px-3 py-1 grid grid-cols-4 gap-1.5 shrink-0">
        {GRID_SERVICES.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className={`relative p-1.5 rounded-xl border flex flex-col items-center justify-center text-center gap-0.5 ${
                srv.isRescue ? 'bg-red-500/15 border-red-500/35' : 'bg-white/[0.05] border-white/8'
              }`}
            >
              {srv.badge && (
                <span
                  style={{ backgroundColor: srv.badgeBg }}
                  className="absolute -top-1 px-1.5 py-[0.5px] rounded-full text-white text-[0.42rem] font-black uppercase tracking-tight z-10"
                >
                  {srv.badge}
                </span>
              )}
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center mt-0.5">
                <Icon size={13} className={srv.isRescue ? 'text-stylein-red' : 'text-neutral-200'} />
              </div>
              <span className="text-[0.56rem] font-bold text-neutral-200 leading-tight truncate w-full">
                {srv.name}
              </span>
              <span className="text-[0.46rem] text-neutral-400 font-medium leading-none">
                {srv.sub}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hero Delivery Banner Card filling mid-bottom */}
      <div className="mx-3 my-1 flex-1 relative rounded-2xl overflow-hidden bg-[#0d0f17] border border-white/10 min-h-[110px]">
        <img
          src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80"
          alt="Service Van"
          className="w-full h-full object-cover brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-2.5 flex flex-col justify-between text-left">
          <span className="px-2 py-0.5 rounded-md bg-[#00d2b4] text-black text-[0.52rem] font-black tracking-wide w-fit">
            Delivery in 20 mins
          </span>
          <p className="text-white text-[0.68rem] font-bold leading-tight">
            Steam wash & doorstep detailing anywhere you park
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-8 py-2 bg-[#090b12]/95 border-t border-white/10 flex items-center justify-between shrink-0 z-20">
        <div className="flex flex-col items-center gap-0.5 text-stylein-red">
          <Home size={14} />
          <span className="text-[0.52rem] font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-neutral-400">
          <Tag size={14} />
          <span className="text-[0.52rem] font-medium">Deals</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 text-neutral-400">
          <User size={14} />
          <span className="text-[0.52rem] font-medium">Profile</span>
        </div>
      </div>

      {/* Samsung Navigation Bar Line */}
      <div className="pb-1 bg-[#090b12] flex justify-center shrink-0 z-20">
        <div className="w-24 h-0.5 bg-white/40 rounded-full" />
      </div>
    </div>
  );
}
