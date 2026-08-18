import React, { useMemo } from 'react';

export default function Particles({ color }) {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      width: `${(i % 4) + 1.5}px`,
      height: `${(i % 4) + 1.5}px`,
      opacity: 0.15 + (i % 5) * 0.08,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 23) % 100}%`,
      duration: `${3.5 + (i % 4)}s`,
      delay: `${(i % 3) * 0.6}s`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-pulse-subtle"
          style={{
            width: p.width,
            height: p.height,
            backgroundColor: color,
            opacity: p.opacity,
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}
