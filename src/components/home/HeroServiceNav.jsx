import React from 'react';
import { SERVICES_DATA } from '../../constants/heroData';
import { Disc, Sparkles, ShieldCheck, Gauge, Zap, Truck } from 'lucide-react';

const ICON_MAP = {
  Disc,
  Sparkles,
  ShieldCheck,
  Gauge,
  Zap,
  Truck
};

export default function HeroServiceNav({ activeServiceId, onSelectService }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '0 20px 24px 20px'
      }}
    >
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          overflowX: 'auto',
          padding: '8px 4px',
          justifyContent: 'flex-start',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {SERVICES_DATA.map((service) => {
          const isActive = service.id === activeServiceId;
          const IconComponent = ICON_MAP[service.iconName] || Disc;

          return (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              aria-label={`Select ${service.label} service`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                borderRadius: '12px',
                background: isActive ? 'var(--bg-glass-active)' : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: isActive ? '1px solid var(--border-red)' : '1px solid var(--border-subtle)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.92rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
                flexShrink: 0,
                boxShadow: isActive ? '0 4px 20px rgba(229, 9, 20, 0.15)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <IconComponent
                size={18}
                color={isActive ? 'var(--accent-red)' : 'currentColor'}
                style={{ transition: 'color var(--transition-fast)' }}
              />
              <span>{service.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
