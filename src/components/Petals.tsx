import { useEffect, useMemo, useState } from "react";

export function Petals({ count = 14, opacity = 0.85, minDuration = 10, maxDuration = 22 }: { count?: number; opacity?: number; minDuration?: number; maxDuration?: number }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: minDuration + Math.random() * Math.max(0, maxDuration - minDuration),
        size: 18 + Math.random() * 18,
        rot: Math.random() * 360,
      })),
    [count, minDuration, maxDuration]
  );

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <svg
          key={p.id}
          width={p.size}
          height={p.size}
          viewBox="-20 -20 40 40"
          className="absolute animate-float-petal"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <path
            d="M 0 -16 c -8 -2 -12 -8 -8 -14 c 4 -4 12 -2 14 4 c 2 6 -2 8 -6 10 z"
            fill="var(--sakura)"
          />
          <path
            d="M -2 -10 c -3 0 -4 -3 -2 -5"
            stroke="var(--sakura-deep)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.6"
          />
        </svg>
      ))}
    </div>
  );
}
