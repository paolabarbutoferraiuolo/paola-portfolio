import { useEffect, useLayoutEffect, useRef, useState } from "react";

const stations = [
  {
    name: "Sakura-mae",
    title: "Communication & Business Background",
    text: "Experience in communication, client relations and business development, with attention to people, messages and context.",
  },
  {
    name: "Hanami-dori",
    title: "Content & Social Media",
    text: "Development of social content, campaign ideas, visual formats and digital storytelling.",
  },
  {
    name: "Gakuen-eki",
    title: "Academy / Tech Environment",
    text: "Work on presentations, student stories, visual assets and stakeholder-facing materials in an educational and tech-driven context.",
  },
  {
    name: "Bijutsu-ko",
    title: "Visual Design Direction",
    text: "Focus on portfolio, visual systems, presentation design, editorial sensitivity and brand storytelling.",
  },
  {
    name: "Tsugi-no",
    title: "Next Stop",
    text: "Looking for opportunities where design, content and strategy meet.",
  },
];

// SVG viewBox kept reasonably narrow so aspect ratio can be preserved
const TRACK_W = 280;
const TRACK_H = 1200;
const TRACK_D =
  "M 140 30 C 60 140, 220 250, 140 360 S 60 560, 140 660 S 220 860, 140 960 S 60 1130, 140 1170";

const STATION_POINTS = [
  { x: 140, y: 90 },
  { x: 95, y: 380 },
  { x: 195, y: 660 },
  { x: 95, y: 940 },
  { x: 140, y: 1150 },
];

/**
 * Locomotive drawn centered around (0, 0), facing +x.
 * Body footprint roughly 76 × 28, so we offset by (-38, -10).
 */
function Locomotive() {
  return (
    <g transform="translate(-38 -10)">
      <ellipse cx="40" cy="32" rx="34" ry="2" fill="var(--ink)" opacity="0.2" />
      <path
        d="M 2 2 Q 2 -4 8 -4 L 64 -4 Q 74 -4 78 6 L 78 21 Q 78 24 75 24 L 5 24 Q 2 24 2 21 Z"
        fill="var(--terracotta)"
        stroke="var(--ink)"
        strokeWidth="1"
      />
      <path d="M 6 -4 L 64 -4 Q 70 -4 73 0 L 6 0 Z" fill="var(--warm-brown)" />
      <rect x="3" y="10" width="74" height="6" fill="var(--cream)" opacity="0.95" />
      {[8, 20, 32, 44].map((x) => (
        <rect
          key={x}
          x={x}
          y="1"
          width="9"
          height="7"
          rx="1"
          fill="oklch(0.94 0.03 75)"
          stroke="var(--ink)"
          strokeWidth="0.4"
        />
      ))}
      <path
        d="M 57 1 L 70 1 Q 74 1 76 7 L 76 8 L 57 8 Z"
        fill="oklch(0.94 0.03 75)"
        stroke="var(--ink)"
        strokeWidth="0.4"
      />
      <circle cx="76" cy="17" r="1.6" fill="oklch(0.95 0.14 85)" stroke="var(--ink)" strokeWidth="0.3" />
      <line x1="30" y1="-4" x2="38" y2="-9" stroke="var(--ink)" strokeWidth="0.5" />
      <line x1="38" y1="-9" x2="46" y2="-4" stroke="var(--ink)" strokeWidth="0.5" />
      <line x1="34" y1="-9" x2="42" y2="-9" stroke="var(--ink)" strokeWidth="0.6" />
      {[14, 36, 58].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="26" r="4" fill="var(--ink)" />
          <circle cx={cx} cy="26" r="1.6" fill="var(--cream)" />
        </g>
      ))}
    </g>
  );
}

/** Single passenger wagon centered around (0, 0), facing +x. */
function Wagon() {
  return (
    <g transform="translate(-34 -12)">
      <rect x="0" y="0" width="68" height="24" rx="3" fill="var(--terracotta)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="0" y="0" width="68" height="4" fill="var(--warm-brown)" />
      <rect x="0" y="16" width="68" height="3" fill="var(--cream)" opacity="0.9" />
      {[5, 17, 29, 41, 53].map((x) => (
        <rect
          key={x}
          x={x}
          y="5"
          width="9"
          height="8"
          rx="1"
          fill="oklch(0.94 0.03 75)"
          stroke="var(--ink)"
          strokeWidth="0.4"
        />
      ))}
      {[12, 56].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="26" r="4" fill="var(--ink)" />
          <circle cx={cx} cy="26" r="1.6" fill="var(--cream)" />
        </g>
      ))}
    </g>
  );
}

// Spacing between car centers along the track (path-length units).
const CAR_SPACING = 78;
// Step (in path units) for the precomputed pose lookup table.
const POSE_STEP = 1;

type Pose = { x: number; y: number; angle: number };

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Car group refs — we mutate `transform` directly to avoid React re-renders.
  const carRefs = useRef<(SVGGElement | null)[]>([null, null, null]);

  // Progress as discrete "reached station index" — only changes 5 times per scroll.
  const [reachedIndex, setReachedIndex] = useState(-1);

  // Smoothed lead distance along the path, eased toward target each frame.
  const targetDistRef = useRef(0);
  const currentDistRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pathLenRef = useRef(0);

  // Precomputed pose lookup table — built once after layout.
  const poseTableRef = useRef<Pose[]>([]);

  // Pre-computed rail offsets + sleeper ties (sampled from the path)
  const [rails, setRails] = useState<{ left: string; right: string }>({ left: "", right: "" });
  const [ties, setTies] = useState<{ x: number; y: number; angle: number }[]>([]);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    pathLenRef.current = len;
    const offset = 7;

    // Build pose lookup table once — O(1) sampling at runtime, no SVG DOM calls during scroll.
    const table: Pose[] = [];
    const tableLen = Math.ceil(len / POSE_STEP) + 1;
    for (let i = 0; i < tableLen; i++) {
      const s = Math.min(len, i * POSE_STEP);
      const p = path.getPointAtLength(s);
      const a = path.getPointAtLength(Math.min(len, s + 1));
      const angle = (Math.atan2(a.y - p.y, a.x - p.x) * 180) / Math.PI;
      table.push({ x: p.x, y: p.y, angle });
    }
    poseTableRef.current = table;

    // Rails
    let left = "";
    let right = "";
    const sampStep = 4;
    for (let s = 0; s <= len; s += sampStep) {
      const p = path.getPointAtLength(s);
      const a = path.getPointAtLength(Math.min(len, s + 1));
      const dx = a.x - p.x;
      const dy = a.y - p.y;
      const L = Math.hypot(dx, dy) || 1;
      const nx = -dy / L;
      const ny = dx / L;
      const cmd = s === 0 ? "M" : "L";
      left += `${cmd} ${(p.x + nx * offset).toFixed(2)} ${(p.y + ny * offset).toFixed(2)} `;
      right += `${cmd} ${(p.x - nx * offset).toFixed(2)} ${(p.y - ny * offset).toFixed(2)} `;
    }
    setRails({ left, right });

    const tieStep = 26;
    const tArr: { x: number; y: number; angle: number }[] = [];
    for (let s = 12; s < len; s += tieStep) {
      const p = path.getPointAtLength(s);
      const a = path.getPointAtLength(Math.min(len, s + 1));
      const angle = (Math.atan2(a.y - p.y, a.x - p.x) * 180) / Math.PI;
      tArr.push({ x: p.x, y: p.y, angle });
    }
    setTies(tArr);

    // Initial car placement at start
    applyCarTransforms(0);
  }, []);

  // Sample the precomputed table (linear interp between two nearest entries).
  const poseAt = (dist: number): Pose => {
    const table = poseTableRef.current;
    if (table.length === 0) return { x: STATION_POINTS[0].x, y: STATION_POINTS[0].y, angle: 90 };
    const len = pathLenRef.current;
    const d = Math.max(0, Math.min(len, dist));
    const idxF = d / POSE_STEP;
    const i0 = Math.floor(idxF);
    const i1 = Math.min(table.length - 1, i0 + 1);
    const t = idxF - i0;
    const a = table[i0];
    const b = table[i1];
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      angle: a.angle + (b.angle - a.angle) * t,
    };
  };

  const applyCarTransforms = (lead: number) => {
    for (let i = 0; i < 3; i++) {
      const node = carRefs.current[i];
      if (!node) continue;
      const p = poseAt(lead - CAR_SPACING * i);
      node.setAttribute(
        "transform",
        `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${p.angle.toFixed(2)})`,
      );
    }
  };

  useEffect(() => {
    let lastReached = -1;

    const tick = () => {
      const cur = currentDistRef.current;
      const tgt = targetDistRef.current;
      const next = cur + (tgt - cur) * 0.12;
      currentDistRef.current = next;

      applyCarTransforms(next);

      // Update station card state only when crossing a threshold (cheap React render).
      const len = pathLenRef.current || 1;
      const p = next / len;
      let r = -1;
      for (let i = 0; i < stations.length; i++) {
        const sp = i / (stations.length - 1);
        if (p >= sp - 0.05) r = i;
      }
      if (r !== lastReached) {
        lastReached = r;
        setReachedIndex(r);
      }

      if (Math.abs(tgt - next) > 0.05) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.6;
      const end = -rect.height + vh * 0.4;
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));
      // Clamp to len so locomotive stops exactly at the last station and wagons
      // remain properly spaced behind it (no overlap at the end of the track).
      targetDistRef.current = pathLenRef.current * p;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="journey"
      ref={ref}
      className="py-28 sm:py-36 px-6 gradient-cream relative overflow-hidden paper-grain"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-sakura-deep mb-4">
            Timeline
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink">My journey so far</h2>
          <p className="mt-4 text-ink/60 text-sm">
            a small train, five quiet stations
          </p>
        </div>

        <div className="relative mx-auto" style={{ maxWidth: 960 }}>
          {/* Track lane: SVG holds rails, ties, signposts & train. Fixed aspect. */}
          <div
            className="relative mx-auto"
            style={{ width: "min(320px, 70vw)", aspectRatio: `${TRACK_W}/${TRACK_H}` }}
          >
            <svg
              viewBox={`0 0 ${TRACK_W} ${TRACK_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              aria-hidden="true"
            >
              {/* ballast (gravel bed) */}
              <path
                d={TRACK_D}
                stroke="oklch(0.9 0.018 60)"
                strokeWidth="26"
                fill="none"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* sleepers / ties — perpendicular to track */}
              {ties.map((t, i) => (
                <rect
                  key={i}
                  x={-9}
                  y={-1.3}
                  width={18}
                  height={2.6}
                  rx={0.6}
                  fill="oklch(0.45 0.04 50)"
                  opacity="0.75"
                  transform={`translate(${t.x} ${t.y}) rotate(${t.angle + 90})`}
                />
              ))}
              {/* two parallel rails */}
              {rails.left && (
                <>
                  <path d={rails.left} stroke="var(--warm-brown)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                  <path d={rails.right} stroke="var(--warm-brown)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                  <path d={rails.left} stroke="oklch(0.92 0.04 70)" strokeWidth="0.4" fill="none" opacity="0.7" />
                  <path d={rails.right} stroke="oklch(0.92 0.04 70)" strokeWidth="0.4" fill="none" opacity="0.7" />
                </>
              )}
              {/* invisible centerline path used for sampling */}
              <path ref={pathRef} d={TRACK_D} stroke="none" fill="none" />

              {/* station markers + signposts */}
              {STATION_POINTS.map((pt, i) => {
                const reached = reachedIndex >= i;
                const onLeft = pt.x < TRACK_W / 2;
                const postX = onLeft ? pt.x + 16 : pt.x - 16;
                return (
                  <g key={i}>
                    <rect
                      x={pt.x - 14}
                      y={pt.y - 3}
                      width={28}
                      height={6}
                      rx={1}
                      fill="oklch(0.95 0.01 60)"
                      stroke="var(--ink)"
                      strokeOpacity="0.3"
                      strokeWidth="0.4"
                    />
                    <line
                      x1={postX}
                      y1={pt.y - 2}
                      x2={postX}
                      y2={pt.y - 18}
                      stroke="var(--ink)"
                      strokeWidth="0.8"
                      opacity="0.7"
                    />
                    <rect
                      x={postX - 7}
                      y={pt.y - 24}
                      width={14}
                      height={7}
                      rx={1}
                      fill={reached ? "var(--sakura-deep)" : "var(--warm-white)"}
                      stroke="var(--ink)"
                      strokeWidth="0.5"
                      opacity="0.95"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="3"
                      fill={reached ? "var(--sakura-deep)" : "var(--warm-white)"}
                      stroke="var(--ink)"
                      strokeWidth="0.6"
                    />
                  </g>
                );
              })}

              {/* Train — locomotive + two wagons, each following the curve.
                  Refs are mutated directly inside rAF to avoid React re-renders. */}
              {[0, 1, 2].map((i) => (
                <g
                  key={i}
                  ref={(el) => {
                    carRefs.current[i] = el;
                  }}
                >
                  {i === 0 ? <Locomotive /> : <Wagon />}
                </g>
              ))}
            </svg>
          </div>

          {/* Station cards — absolutely positioned along the same vertical timeline */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ height: "100%" }}
          >
            {stations.map((s, i) => {
              const reached = reachedIndex >= i;
              const pt = STATION_POINTS[i];
              const onLeft = pt.x < TRACK_W / 2;
              const topPct = (pt.y / TRACK_H) * 100;
              return (
                <div
                  key={s.name}
                  className={`absolute w-[44%] sm:w-[40%] transition-all duration-700 ease-out pointer-events-auto ${
                    reached ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    top: `${topPct}%`,
                    [onLeft ? "right" : "left"]: "2%",
                    transform: reached ? "translateY(-50%)" : "translateY(calc(-50% + 24px))",
                  }}
                >
                  <div className="bg-card rounded-2xl p-4 sm:p-5 border border-border/50 soft-shadow">
                    <div className="text-[10px] tracking-widest uppercase text-sakura-deep mb-1">
                      {s.name} 駅
                    </div>
                    <h3 className="font-serif text-base sm:text-lg text-ink leading-tight mb-2">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/65 leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
