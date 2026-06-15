import { useEffect, useRef, useState } from "react";
import { SakuraIcon } from "./SakuraIcon";

/**
 * One pinned, scroll-driven sakura hero.
 * A single normalized scroll progress value (0 → 1) is the source of truth
 * for the flower, pink flood, petals and text reveal.
 */
export function SakuraHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const scrollLength = Math.max(el.offsetHeight - window.innerHeight, 1);
      const nextProgress = clamp01((window.scrollY - sectionTop) / scrollLength);
      setProgress(nextProgress);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const p = progress;
  /* p drives the 8 internal frames of the SakuraIcon directly. */
  const bloomScale = ease(seg(p, 0.0, 0.85));
  const atmosphere = ease(seg(p, 0.4, 0.95));
  const petalProgress = ease(seg(p, 0.72, 1));
  const disperse = ease(seg(p, 0.93, 1));
  const textReveal = ease(seg(p, 0.85, 1));
  const hintFade = 1 - ease(seg(p, 0, 0.18));

  const lightness = 0.985 - atmosphere * 0.06;
  const chroma = 0.008 + atmosphere * 0.075;
  const hue = 60 - atmosphere * 50;
  const bg = `oklch(${lightness} ${chroma} ${hue})`;

  const flowerSize = 150 + bloomScale * 220;
  const flowerOpacity = Math.max(0.32, 1 - disperse * 0.65);
  const flowerScale = 1 + bloomScale * 0.06 + disperse * 0.12;
  const flowerRotate = -3 + bloomScale * 4;
  const flowerY = -disperse * 14;
  const pinkHaloOpacity = atmosphere;
  const pinkHaloScale = 0.3 + atmosphere * 2.25;
  const pinkWashOpacity = ease(seg(p, 0.5, 0.98)) * 0.92;

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Paola Barbuto Ferraiuolo — opening sequence"
      data-hero-progress={p.toFixed(3)}
      className="relative z-0"
      style={{ height: "280vh", minHeight: "280vh", isolation: "isolate" }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center paper-grain"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          minHeight: "100svh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bg,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.93 0.075 8 / 0.95) 0%, oklch(0.95 0.05 12 / 0.55) 38%, transparent 72%)",
            opacity: pinkHaloOpacity,
            transform: `scale(${pinkHaloScale})`,
            transformOrigin: "50% 50%",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.96 0.05 15 / 0) 0%, oklch(0.94 0.07 10 / 0.55) 55%, oklch(0.92 0.085 8 / 0.8) 100%)",
            opacity: pinkWashOpacity,
          }}
        />

        <PetalField progress={petalProgress} />

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: flowerSize,
              height: flowerSize,
              opacity: flowerOpacity,
              transform: `translateY(${flowerY}px) rotate(${flowerRotate}deg) scale(${flowerScale})`,
            }}
          >
            <SakuraIcon size={flowerSize} openness={p} />
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-1/2 z-20 px-6 text-center pointer-events-none"
          style={{
            opacity: textReveal,
            transform: `translateY(calc(-50% + ${(1 - textReveal) * 26}px))`,
          }}
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ink">
            Paola Barbuto Ferraiuolo
          </h1>
          <p className="mt-4 text-sm sm:text-base tracking-[0.2em] uppercase text-ink/65">
            Visual Communication &nbsp;·&nbsp; Content Designer
          </p>
          <p className="mt-6 font-serif italic text-base sm:text-lg text-ink/70 max-w-xl mx-auto">
            Visual stories with structure, softness and clarity.
          </p>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-10 z-20 text-[10px] text-ink/40 tracking-[0.3em] uppercase pointer-events-none"
          style={{ opacity: hintFade }}
        >
          ↓ scroll
        </div>
      </div>
    </section>
  );
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

const ease = (t: number) => t * t * (3 - 2 * t);

const seeded = (seed: number) => {
  const value = Math.sin(seed * 91.7) * 10000;
  return value - Math.floor(value);
};

const petalSpecs = Array.from({ length: 34 }).map((_, i) => {
  const angle = seeded(i + 1) * Math.PI * 2;
  const radius = 80 + seeded(i + 11) * 580;
  const fall = 100 + seeded(i + 21) * 430;
  const drift = (seeded(i + 31) - 0.5) * 210;
  const sway = (seeded(i + 41) - 0.5) * 70;
  const size = 18 + seeded(i + 51) * 22;
  const rotate = (seeded(i + 61) - 0.5) * 620;
  const delay = (i / 34) * 0.34;
  const opacity = 0.48 + seeded(i + 71) * 0.34;
  return { angle, radius, fall, drift, sway, size, rotate, delay, opacity };
});

function PetalField({ progress }: { progress: number }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-[5]"
      style={{ width: 0, height: 0 }}
      aria-hidden="true"
    >
      {petalSpecs.map((petal, i) => {
        const t = ease(seg(progress, petal.delay, 1));
        if (t <= 0) return null;
        const x = Math.cos(petal.angle) * petal.radius * t + petal.drift * t + Math.sin(t * Math.PI) * petal.sway;
        const y = Math.sin(petal.angle) * petal.radius * 0.42 * t + petal.fall * t;
        const opacity = petal.opacity * Math.sin(t * Math.PI) ** 0.55;

        return (
          <svg
            key={i}
            width={petal.size}
            height={petal.size}
            viewBox="-20 -20 40 40"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              opacity,
              transform: `translate(${x}px, ${y}px) rotate(${petal.rotate * t}deg)`,
            }}
          >
            <path
              d="M 0 0 C -7 -2 -11 -10 -7 -16 C -5 -19 -2 -20 -1 -17 L 0 -19 L 1 -17 C 2 -20 5 -19 7 -16 C 11 -10 7 -2 0 0 Z"
              fill="oklch(0.94 0.05 8)"
              stroke="oklch(0.74 0.11 10)"
              strokeWidth="0.5"
              strokeOpacity="0.45"
            />
          </svg>
        );
      })}
    </div>
  );
}
