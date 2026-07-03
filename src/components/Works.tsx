import { useEffect, useRef, useState } from "react";
import { Petals } from "./Petals";
import academy2026 from "@/assets/academy-2026.png";
import graduation2025 from "@/assets/graduation-2025.png";
import graduation2026_2 from "@/assets/graduation-2026-2.png";
import graduation2026_3 from "@/assets/graduation-2026-3.png";


type Project = {
  id: string;
  drink: string;
  color: string;
  cap: string;
  title: string;
  category: string;
  description: string;
  role: string;
  tools: string;
  brief: string;
  challenge: string;
  process: string;
  output: string;
  reflection: string;
  image?: string;
  gallery?: string[];
};


const projects: Project[] = [
  {
    id: "sakura-soda",
    drink: "Sakura Soda",
    color: "oklch(0.85 0.08 5)",
    cap: "var(--sakura-deep)",
    title: "Academy Graduation Campaign",
    category: "Social media design · Event communication",
    description:
      "A celebratory visual direction using doodles, soft illustration and social formats to communicate the end of the academy year.",
    role: "Visual designer & content lead",
    tools: "Figma, Procreate, Instagram formats",
    brief:
      "Celebrate the academy graduation through a coherent multi-format social campaign that felt personal, warm and human.",
    challenge:
      "Balance institutional tone with an emotional, student-first feeling — without losing visual structure across many post types.",
    process:
      "Built a small system: doodle library, color palette, post templates (single, carousel, story), and content pacing for the launch week.",
    output:
      "Launch posts, carousels, stories and reels covers — all reusable as a brand pattern for future cohorts.",
    reflection:
      "Showed how a tiny illustrated system can carry a whole event narrative with very little overhead.",
    image: academy2026,
    gallery: [graduation2025, graduation2026_2],
  },

  {
    id: "matcha-latte",
    drink: "Matcha Latte",
    color: "oklch(0.82 0.07 145)",
    cap: "oklch(0.45 0.1 145)",
    title: "Apple / Academy Presentation",
    category: "Presentation design · Stakeholder communication",
    description:
      "A structured presentation system designed to make project content clearer, more polished and easier to review.",
    role: "Presentation designer",
    tools: "Keynote, Figma, type system",
    brief:
      "Make a stakeholder-facing deck feel calm, structured and easy to scan during executive reviews.",
    challenge:
      "Dense content, multiple authors, inconsistent visuals — a system was needed, not just a redesign.",
    process:
      "Defined slide archetypes (title, section, data, story, quote), a restrained type scale and a soft neutral palette.",
    output:
      "A reusable deck system and a polished final presentation used in stakeholder reviews.",
    reflection:
      "Good presentation design is invisible — the audience just understands faster.",
  },
  {
    id: "ramune-blue",
    drink: "Ramune Blue",
    color: "oklch(0.82 0.08 230)",
    cap: "oklch(0.45 0.12 240)",
    title: "WWDC / Swift Student Challenge Content",
    category: "Social media content · Visual storytelling",
    description:
      "Social and visual content created to celebrate student stories, achievements and tech-related initiatives.",
    role: "Content & visual designer",
    tools: "Figma, Photoshop, content calendar",
    brief:
      "Tell student winner stories in a way that felt celebratory, human and on-brand.",
    challenge:
      "Many stories, limited time, consistent quality bar — and a tone that had to feel personal, not corporate.",
    process:
      "Built a portrait-led template, defined a copy formula, scheduled the rollout and produced the assets in batches.",
    output:
      "A series of feature posts, carousel highlights and quote cards published across the launch window.",
    reflection:
      "Templates aren't constraints — they're what makes consistent quality possible at scale.",
  },
  {
    id: "peach-tea",
    drink: "Peach Tea",
    color: "oklch(0.85 0.08 50)",
    cap: "oklch(0.55 0.13 35)",
    title: "Youth Battersea Social Audit",
    category: "Social media strategy · Content direction",
    description:
      "A visual and strategic analysis of NGO communication, with proposed formats and content directions.",
    role: "Content strategist",
    tools: "Notion, Figma, content audit framework",
    brief:
      "Audit the current social presence and propose a clearer, more sustainable content direction.",
    challenge:
      "Limited resources on the NGO side — the proposal had to be realistic, not aspirational.",
    process:
      "Audited posts and engagement, mapped audiences, defined three content pillars and proposed lightweight templates.",
    output:
      "A short strategic document with insights, proposed formats and a visual direction sample.",
    reflection:
      "Strategy is most useful when it's small enough that someone can actually execute it.",
  },
  {
    id: "strawberry-milk",
    drink: "Ichigo Milk",
    color: "oklch(0.9 0.06 0)",
    cap: "oklch(0.6 0.16 10)",
    title: "Editorial Visual Storytelling",
    category: "Editorial design · Illustration",
    description:
      "A personal visual storytelling project combining layout, illustration, atmosphere and narrative sensitivity.",
    role: "Designer & illustrator",
    tools: "InDesign, Procreate",
    brief:
      "A self-initiated editorial piece exploring atmosphere through type, layout and small illustrated details.",
    challenge:
      "Holding a consistent mood across pages without leaning on photography.",
    process:
      "Sketched compositions, built a soft palette, iterated on layout rhythm, added small illustrative anchors.",
    output:
      "A short illustrated editorial sequence — a personal reference for tone and pacing.",
    reflection:
      "Personal projects are where the real voice gets defined.",
  },
];

/** Realistic-ish drink can/bottle product in a vending machine slot */
function DrinkProduct({ p, onClick, label }: { p: Project; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open project: ${p.title}`}
      className="group relative w-full flex flex-col items-center gap-1.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      <div className="relative w-full flex justify-center transition-transform duration-300 group-hover:-translate-y-1.5 group-active:translate-y-0.5">
        <svg viewBox="0 0 48 70" className="w-full max-w-[78px] sm:max-w-[88px] drop-shadow-[0_4px_6px_oklch(0.3_0.02_320/0.3)]">
          <defs>
            <linearGradient id={`g-${p.id}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor={p.color} stopOpacity="0.8" />
              <stop offset="40%" stopColor={p.color} />
              <stop offset="100%" stopColor={p.color} stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* top rim */}
          <ellipse cx="24" cy="8" rx="15" ry="2.6" fill="oklch(0.85 0.01 80)" stroke="oklch(0.3 0.02 320)" strokeOpacity="0.5" strokeWidth="0.6" />
          <ellipse cx="24" cy="7.2" rx="13" ry="1.8" fill="oklch(0.92 0.008 80)" />
          {/* pull tab */}
          <ellipse cx="24" cy="7.2" rx="4" ry="1.3" fill="none" stroke="oklch(0.45 0.02 320)" strokeWidth="0.5" />
          <circle cx="24" cy="7.2" r="0.7" fill="oklch(0.45 0.02 320)" />
          {/* can body */}
          <path d="M 9 9 Q 9 9 9.6 11 L 9.6 58 Q 9.6 60 11 60.6 Q 24 63 37 60.6 Q 38.4 60 38.4 58 L 38.4 11 Q 39 9 39 9 Q 24 11.5 9 9 Z"
            fill={`url(#g-${p.id})`} stroke="oklch(0.2 0.02 320)" strokeOpacity="0.4" strokeWidth="0.7" />
          {/* highlight */}
          <rect x="12" y="12" width="2.2" height="45" rx="1" fill="oklch(0.99 0.005 60)" opacity="0.5" />
          <rect x="33.5" y="12" width="1.6" height="45" rx="1" fill="oklch(0.2 0.02 320)" opacity="0.18" />
          {/* label band — taller for legibility */}
          <rect x="9.6" y="20" width="28.8" height="32" fill="oklch(0.99 0.008 60)" opacity="0.97" />
          <line x1="9.6" y1="20" x2="38.4" y2="20" stroke={p.color} strokeOpacity="0.55" strokeWidth="0.5" />
          <line x1="9.6" y1="52" x2="38.4" y2="52" stroke={p.color} strokeOpacity="0.55" strokeWidth="0.5" />
          {/* drink name — bigger, doodle handwritten style */}
          <text x="24" y="34" textAnchor="middle" fontSize="7.5" fill="var(--ink)" fontFamily="Caveat, cursive" fontWeight="700">
            {p.drink.split(" ")[0]}
          </text>
          <text x="24" y="43" textAnchor="middle" fontSize="6.5" fill="var(--ink)" fontFamily="Caveat, cursive" fontWeight="600">
            {p.drink.split(" ").slice(1).join(" ")}
          </text>
          <circle cx="24" cy="48.5" r="1.4" fill={p.color} />

          {/* bottom rim */}
          <ellipse cx="24" cy="60.4" rx="13.5" ry="2.2" fill="oklch(0.78 0.01 80)" opacity="0.85" />
        </svg>
      </div>
      {/* slot code below product — printed mono label */}
      <div className="font-mono text-[10px] sm:text-xs tabular-nums tracking-wider text-ink/60 group-hover:text-sakura-deep transition-colors leading-none">
        {label}
      </div>
    </button>
  );
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-border soft-shadow"
      >
        <div className="sticky top-0 bg-background/95 backdrop-blur px-6 sm:px-10 py-5 flex items-start justify-between gap-4 border-b border-border/50">
          <div>
            <div className="text-[10px] tracking-widest uppercase text-sakura-deep mb-1">
              {p.drink} · case study
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-ink leading-tight">{p.title}</h3>
            <div className="mt-2 text-xs text-ink/60">{p.category}</div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="shrink-0 w-11 h-11 rounded-full bg-sakura-soft hover:bg-sakura text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura-deep focus-visible:ring-offset-2"
            aria-label="Close project details"
          >
            ✕
          </button>
        </div>


        <div className="px-6 sm:px-10 py-8 space-y-8">
          <p className="text-ink/80 leading-relaxed text-lg font-serif italic">{p.description}</p>

          {p.image ? (
            <div className="w-full rounded-2xl border border-border/50 bg-muted/40 overflow-hidden">
              <img
                src={p.image}
                alt={`${p.title} — project visual`}
                className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] object-contain mx-auto block"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full min-h-[200px] sm:min-h-[280px] rounded-2xl bg-gradient-to-br from-sakura-soft to-cream border border-border/50 flex items-center justify-center text-ink/40 text-sm">
              project visuals — placeholder
            </div>
          )}


          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Role" value={p.role} />
            <Field label="Tools" value={p.tools} />
          </div>

          <Block label="Brief" text={p.brief} />
          <Block label="Challenge" text={p.challenge} />
          <Block label="Process" text={p.process} />

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => {
              const src = p.gallery?.[i];
              return (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-sakura-soft/60 border border-border/40 overflow-hidden flex items-center justify-center text-[10px] text-ink/40"
                >
                  {src ? (
                    <img
                      src={src}
                      alt={`${p.title} — visual ${i + 1}`}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                  ) : (
                    <span>image {i + 1}</span>
                  )}
                </div>
              );
            })}
          </div>

          <Block label="Final output" text={p.output} />
          <Block label="Reflection" text={p.reflection} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/60 rounded-2xl p-4">
      <div className="text-[10px] tracking-widest uppercase text-sakura-deep mb-1">{label}</div>
      <div className="text-sm text-ink">{value}</div>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-widest uppercase text-sakura-deep mb-2">{label}</div>
      <p className="text-ink/75 leading-relaxed">{text}</p>
    </div>
  );
}

/** Background landscape: iconic Mount Fuji (teal cone + white snow cap +
 *  red sun behind), rural countryside station and stopped train. */
function FujiScene() {
  return (
    <svg
      viewBox="0 0 1200 620"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 top-0 bottom-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.97 0.022 70)" />
          <stop offset="100%" stopColor="oklch(0.95 0.035 40)" />
        </linearGradient>
        <linearGradient id="fuji" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.5 0.07 200)" />
          <stop offset="55%" stopColor="oklch(0.42 0.08 205)" />
          <stop offset="100%" stopColor="oklch(0.36 0.075 210)" />
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.72 0.2 28)" />
          <stop offset="80%" stopColor="oklch(0.62 0.21 25)" />
          <stop offset="100%" stopColor="oklch(0.58 0.2 22)" />
        </radialGradient>
        <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.96 0.02 60)" />
          <stop offset="100%" stopColor="oklch(0.9 0.04 50)" />
        </linearGradient>
      </defs>

      {/* warm cream sky band */}
      <rect x="0" y="0" width="1200" height="520" fill="url(#sky)" />

      {/* ===== Large red sun behind Fuji ===== */}
      <g>
        <circle cx="600" cy="280" r="190" fill="url(#sun)" />
        <circle cx="600" cy="280" r="210" fill="none" stroke="oklch(0.7 0.18 28)" strokeWidth="1.2" strokeOpacity="0.35" />
      </g>

      {/* very soft far hills */}
      <path
        d="M 0 470 Q 200 420 400 450 T 800 440 T 1200 460 L 1200 540 L 0 540 Z"
        fill="oklch(0.78 0.05 200)"
        opacity="0.35"
      />

      {/* ===== Mount Fuji — flared base, near-straight slopes, flat top ===== */}
      <g>
        <path
          d="M 110 515
             C 230 512, 320 500, 400 430
             C 470 365, 520 270, 560 175
             L 640 175
             C 680 270, 730 365, 800 430
             C 880 500, 970 512, 1090 515 Z"
          fill="url(#fuji)"
          stroke="oklch(0.28 0.06 210)"
          strokeOpacity="0.5"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* subtle right-side shading */}
        <path
          d="M 640 175 C 680 270, 730 365, 800 430 C 880 500, 970 512, 1090 515 L 600 515 Z"
          fill="oklch(0.32 0.07 210)"
          opacity="0.22"
        />

        {/* Snow cap — flat summit with 3 rounded drips */}
        <path
          d="M 560 175
             L 640 175
             Q 662 215 676 250
             Q 660 248 648 258
             Q 628 278 614 252
             Q 600 282 586 252
             Q 572 278 552 258
             Q 540 248 524 250
             Q 538 215 560 175 Z"
          fill="oklch(0.985 0.005 250)"
          stroke="oklch(0.82 0.012 250)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>


      {/* ===== Small red plum/sakura sprigs on the sides ===== */}
      {[
        { cx: 130, cy: 200, s: 1 },
        { cx: 175, cy: 240, s: 0.75 },
        { cx: 95, cy: 260, s: 0.65 },
        { cx: 1070, cy: 200, s: 1 },
        { cx: 1115, cy: 245, s: 0.7 },
        { cx: 1030, cy: 260, s: 0.65 },
      ].map((f, i) => (
        <g key={i} transform={`translate(${f.cx} ${f.cy}) scale(${f.s})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <circle cx="0" cy="-7" r="5.5" fill="oklch(0.6 0.2 25)" />
            </g>
          ))}
          <circle r="2.4" fill="oklch(0.85 0.16 80)" />
        </g>
      ))}

      {/* ===== Ground / foreground ===== */}
      <path d="M 0 520 Q 300 500 600 515 T 1200 525 L 1200 620 L 0 620 Z" fill="url(#ground)" />

      {/* Rail bed running across foreground */}
      <g transform="translate(0 555)">
        <rect x="0" y="-4" width="1200" height="14" fill="oklch(0.88 0.02 60)" opacity="0.8" />
        {Array.from({ length: 40 }).map((_, i) => (
          <rect key={i} x={i * 30 + 2} y="-3" width="14" height="12" rx="1" fill="oklch(0.45 0.04 50)" opacity="0.7" />
        ))}
        <line x1="0" y1="-1" x2="1200" y2="-1" stroke="oklch(0.35 0.02 280)" strokeWidth="2" />
        <line x1="0" y1="7" x2="1200" y2="7" stroke="oklch(0.35 0.02 280)" strokeWidth="2" />
        <line x1="0" y1="-1" x2="1200" y2="-1" stroke="oklch(0.92 0.04 70)" strokeWidth="0.5" opacity="0.7" />
        <line x1="0" y1="7" x2="1200" y2="7" stroke="oklch(0.92 0.04 70)" strokeWidth="0.5" opacity="0.7" />
      </g>

      {/* ===== Rural countryside station ===== */}
      <g transform="translate(820 470)">
        {/* wooden platform deck */}
        <rect x="-20" y="60" width="260" height="24" fill="oklch(0.93 0.012 60)" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="0.8" />
        <line x1="-20" y1="64" x2="240" y2="64" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="0.5" />
        {/* platform plank lines */}
        {[10, 50, 90, 130, 170, 210].map((x) => (
          <line key={x} x1={x} y1="64" x2={x} y2="84" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.4" />
        ))}
        {/* platform edge yellow safety stripe */}
        <rect x="-20" y="60" width="260" height="2" fill="oklch(0.85 0.16 85)" opacity="0.85" />

        {/* Station building */}
        <g transform="translate(0 0)">
          {/* upturned tiled roof — kawara style */}
          <path d="M -14 30 Q -10 24 0 22 L 60 4 Q 64 2 68 4 L 128 22 Q 138 24 142 30 Z"
            fill="oklch(0.38 0.06 25)" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="0.9" strokeLinejoin="round" />
          {/* roof ridge */}
          <rect x="-12" y="29" width="142" height="3.5" fill="oklch(0.3 0.05 25)" />
          {/* roof tile lines */}
          {[27, 25, 23].map((y, i) => (
            <path key={i} d={`M ${-12 + i * 3} ${y} L ${130 - i * 3} ${y}`} stroke="var(--ink)" strokeOpacity="0.22" strokeWidth="0.4" fill="none" />
          ))}
          {/* roof beam shadow */}
          <rect x="-10" y="32.5" width="138" height="2" fill="oklch(0.28 0.04 30)" opacity="0.7" />

          {/* support posts (wooden) */}
          <rect x="0" y="34" width="3.5" height="26" fill="oklch(0.35 0.05 35)" />
          <rect x="124" y="34" width="3.5" height="26" fill="oklch(0.35 0.05 35)" />
          {/* extra middle post */}
          <rect x="62" y="34" width="3" height="26" fill="oklch(0.35 0.05 35)" opacity="0.85" />

          {/* station wall behind */}
          <rect x="3.5" y="34" width="120.5" height="26" fill="oklch(0.94 0.018 50)" />
          {/* horizontal wooden cladding */}
          {[40, 46, 52, 57].map((y) => (
            <line key={y} x1="4" y1={y} x2="124" y2={y} stroke="var(--ink)" strokeOpacity="0.12" strokeWidth="0.4" />
          ))}

          {/* lower dark wood band */}
          <rect x="3.5" y="56" width="120.5" height="4" fill="oklch(0.45 0.06 35)" opacity="0.85" />

          {/* shoji-style windows on left of building */}
          <rect x="8" y="40" width="22" height="14" fill="oklch(0.96 0.04 75)" stroke="var(--ink)" strokeWidth="0.4" />
          <line x1="19" y1="40" x2="19" y2="54" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="0.3" />
          <line x1="8" y1="47" x2="30" y2="47" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="0.3" />

          {/* small wooden bench on platform */}
          <g transform="translate(95 60)">
            <rect x="0" y="-4" width="22" height="2" fill="oklch(0.4 0.06 35)" />
            <rect x="1" y="-2" width="1.5" height="4" fill="oklch(0.4 0.06 35)" />
            <rect x="19.5" y="-2" width="1.5" height="4" fill="oklch(0.4 0.06 35)" />
          </g>

          {/* Station name board */}
          <rect x="38" y="38" width="44" height="11" fill="var(--warm-white)" stroke="var(--ink)" strokeWidth="0.6" />
          <text x="60" y="46.5" textAnchor="middle" fontSize="7" fill="var(--ink)" fontFamily="serif" fontWeight="600">桜ノ駅</text>

          {/* Japanese paper lantern (chōchin) hanging under the roof */}
          <g transform="translate(108 34)">
            {/* cord */}
            <line x1="0" y1="0" x2="0" y2="3" stroke="var(--ink)" strokeWidth="0.5" />
            {/* top cap */}
            <rect x="-3" y="3" width="6" height="1.6" fill="oklch(0.25 0.04 30)" />
            {/* lantern body */}
            <ellipse cx="0" cy="10" rx="5.2" ry="7" fill="oklch(0.78 0.18 28)" stroke="var(--ink)" strokeWidth="0.6" />
            {/* bamboo ribs */}
            {[5, 7.5, 10, 12.5, 15].map((y) => (
              <ellipse key={y} cx="0" cy={y} rx={Math.sqrt(Math.max(0, 49 - (y - 10) * (y - 10))) * 0.74} ry="0.4" fill="none" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.3" />
            ))}
            {/* kanji on lantern */}
            <text x="0" y="11.5" textAnchor="middle" fontSize="4.5" fill="var(--warm-white)" fontFamily="serif" fontWeight="700">桜</text>
            {/* bottom cap + tassel */}
            <rect x="-3" y="17" width="6" height="1.4" fill="oklch(0.25 0.04 30)" />
            <line x1="0" y1="18.4" x2="0" y2="21" stroke="oklch(0.25 0.04 30)" strokeWidth="0.6" />
            {/* warm glow */}
            <ellipse cx="0" cy="10" rx="8" ry="9" fill="oklch(0.95 0.15 80)" opacity="0.18" />
          </g>

          {/* Wall-mounted clock */}
          <g transform="translate(33 36)">
            <circle cx="0" cy="0" r="3" fill="var(--warm-white)" stroke="var(--ink)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="-2" stroke="var(--ink)" strokeWidth="0.4" />
            <line x1="0" y1="0" x2="1.4" y2="0.5" stroke="var(--ink)" strokeWidth="0.4" />
          </g>
        </g>

        {/* Signal post / train stoplight to the right of station */}
        <g transform="translate(168 8)">
          {/* pole */}
          <line x1="0" y1="0" x2="0" y2="60" stroke="var(--ink)" strokeWidth="1.2" />
          {/* ladder rungs */}
          {[14, 22, 30, 38, 46].map((y) => (
            <line key={y} x1="-1.5" y1={y} x2="1.5" y2={y} stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="0.4" />
          ))}
          {/* signal head box */}
          <rect x="-5" y="-2" width="10" height="22" rx="1.2" fill="oklch(0.32 0.03 50)" stroke="var(--ink)" strokeWidth="0.6" />
          {/* visor */}
          <rect x="-6" y="-3" width="12" height="1.6" fill="oklch(0.22 0.02 40)" />
          {/* red light (top, lit) */}
          <circle cx="0" cy="2.5" r="2.4" fill="oklch(0.62 0.22 25)" stroke="var(--ink)" strokeWidth="0.4" />
          <circle cx="0" cy="2.5" r="3.5" fill="oklch(0.7 0.22 25)" opacity="0.35" />
          {/* yellow light (middle) */}
          <circle cx="0" cy="9" r="2.4" fill="oklch(0.55 0.08 80)" stroke="var(--ink)" strokeWidth="0.4" />
          {/* green light (bottom) */}
          <circle cx="0" cy="15.5" r="2.4" fill="oklch(0.5 0.1 150)" stroke="var(--ink)" strokeWidth="0.4" />
          {/* base */}
          <rect x="-3" y="58" width="6" height="3" fill="var(--ink)" opacity="0.7" />
        </g>

        {/* Roman/English station name signpost on platform */}
        <g transform="translate(200 24)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="var(--ink)" strokeWidth="0.8" />
          <rect x="-18" y="4" width="36" height="11" fill="var(--warm-white)" stroke="var(--ink)" strokeWidth="0.5" />
          <text x="0" y="12" textAnchor="middle" fontSize="6" fill="var(--ink)" fontFamily="serif" fontStyle="italic">Sakura-no</text>
          <line x1="-15" y1="18" x2="15" y2="18" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="0.3" />
        </g>

        {/* small potted plant on platform */}
        <g transform="translate(-8 60)">
          <rect x="0" y="-6" width="6" height="6" fill="oklch(0.5 0.08 40)" stroke="var(--ink)" strokeWidth="0.4" />
          <circle cx="3" cy="-8" r="3.5" fill="oklch(0.55 0.1 145)" />
          <circle cx="1.5" cy="-9" r="2" fill="oklch(0.62 0.12 145)" />
          <circle cx="4.5" cy="-9.5" r="2.2" fill="oklch(0.6 0.11 145)" />
        </g>
      </g>

      {/* ===== Stopped train at the station — 2 wagons + locomotive (locomotive on the right) ===== */}
      <g transform="translate(820 528) scale(0.85)">
        {/* shared shadow */}
        <ellipse cx="-30" cy="44" rx="160" ry="2.4" fill="var(--ink)" opacity="0.15" />

        {/* Wagons trailing behind (to the left of) the locomotive */}
        {[-73, -146].map((xOff, idx) => (
          <g key={idx} transform={`translate(${xOff} 0)`}>
            {/* coupling bar to next car */}
            <rect x="66" y="30" width="9" height="2" fill="var(--ink)" opacity="0.7" />
            {/* wagon body */}
            <rect x="0" y="12" width="68" height="24" rx="3" fill="var(--terracotta)" stroke="var(--ink)" strokeWidth="1" opacity="0.95" />
            {/* roof band */}
            <rect x="0" y="12" width="68" height="4" fill="var(--warm-brown)" />
            {/* lower cream stripe */}
            <rect x="0" y="28" width="68" height="3" fill="var(--cream)" opacity="0.9" />
            {/* windows */}
            {[5, 17, 29, 41, 53].map(x => (
              <rect key={x} x={x} y="17" width="9" height="8" rx="1" fill="oklch(0.94 0.03 75)" stroke="var(--ink)" strokeWidth="0.4" />
            ))}
            {/* wheels */}
            {[12, 56].map(cx => (
              <g key={cx}>
                <circle cx={cx} cy="38" r="4" fill="var(--ink)" />
                <circle cx={cx} cy="38" r="1.6" fill="var(--cream)" />
              </g>
            ))}
          </g>
        ))}

        {/* Locomotive (rightmost, facing right) */}
        <g>
          <path d="M 2 14 Q 2 8 8 8 L 64 8 Q 74 8 78 18 L 78 33 Q 78 36 75 36 L 5 36 Q 2 36 2 33 Z" fill="var(--terracotta)" stroke="var(--ink)" strokeWidth="1" />
          <path d="M 6 8 L 64 8 Q 70 8 73 12 L 6 12 Z" fill="var(--warm-brown)" />
          <rect x="3" y="22" width="74" height="6" fill="var(--cream)" opacity="0.95" />
          {[8, 20, 32, 44].map(x => (
            <rect key={x} x={x} y="13" width="9" height="7" rx="1" fill="oklch(0.94 0.03 75)" stroke="var(--ink)" strokeWidth="0.4" />
          ))}
          <path d="M 57 13 L 70 13 Q 74 13 76 19 L 76 20 L 57 20 Z" fill="oklch(0.94 0.03 75)" stroke="var(--ink)" strokeWidth="0.4" />
          <circle cx="76" cy="29" r="1.6" fill="oklch(0.95 0.14 85)" />
          {[14, 36, 58].map(cx => (
            <g key={cx}>
              <circle cx={cx} cy="38" r="4" fill="var(--ink)" />
              <circle cx={cx} cy="38" r="1.6" fill="var(--cream)" />
            </g>
          ))}
        </g>
      </g>



      <g opacity="0.6">
        {Array.from({ length: 20 }).map((_, i) => (
          <path key={i} d={`M ${i * 60 + 10} 600 q 3 -6 6 0 q 3 -8 6 0`} stroke="oklch(0.65 0.08 140)" strokeWidth="1" fill="none" />
        ))}
      </g>
    </svg>
  );
}

// ===== Shared vending-machine layout tokens =====
// Single source of truth for the 5-column rhythm so cans, prices,
// slot labels, buttons and the payment strip always align.
const VM_COLS = "grid grid-cols-5";
const VM_GAP = "gap-2 sm:gap-3";
// Padding INSIDE the illuminated display window (applied to shelf + price strip).
const VM_INNER_PX = "px-3 sm:px-4";
// Padding OUTSIDE that wrapper (button panel + payment strip) — chosen so the
// outer columns sit flush under the inner cans:
//   outer_padding = display_outer_padding (12/16) + glass border (4) + inner_padding (12/16)
//                 = 28px / 36px  →  px-7 sm:px-9
const VM_OUTER_PX = "px-7 sm:px-9";
const VM_FRAME_PX = "px-3 sm:px-4"; // outer red frame inner padding
const VM_SHELF_GRID = `relative ${VM_COLS} ${VM_GAP} ${VM_INNER_PX} pt-4 pb-2 items-end`;
const VM_PRICE_GRID = `${VM_COLS} ${VM_GAP} ${VM_INNER_PX} py-2`;
const VM_BUTTON_GRID = `${VM_COLS} ${VM_GAP} ${VM_OUTER_PX} py-3`;

/** Realistic-feeling Japanese street drink vending machine */
function VendingMachine({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 620 }}>
      {/* machine shadow on ground */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-[90%] h-6 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, oklch(0.3 0.02 320 / 0.35), transparent 70%)" }}
      />

      {/* outer frame */}
      <div
        className="relative rounded-[1.4rem] p-3 sm:p-4"
        style={{
          background: "oklch(0.72 0.16 28)",
          boxShadow:
            "0 30px 60px -20px oklch(0.2 0.02 320 / 0.35), inset 0 0 0 4px oklch(0.97 0.02 70), inset 0 0 0 5px oklch(0.55 0.14 28)",
          border: "2px solid oklch(0.45 0.12 28)",
        }}
      >



        {/* Brand header */}
        <div className="rounded-t-2xl px-4 py-2.5 flex items-center justify-between" style={{ background: "oklch(0.98 0.02 70)" }}>
          <div className="flex items-baseline gap-2">
            <div className="w-5 h-5 rounded-full self-center" style={{ background: "var(--sakura-deep)" }} />
            <span className="font-sans font-extrabold tracking-[0.18em] text-base sm:text-lg text-ink uppercase">SAKURA</span>
            <span className="font-serif italic text-sm text-ink/60">じはんき</span>
          </div>
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.28em] uppercase text-ink/55">case studies</span>
        </div>

        {/* Illuminated display window */}
        <div
          className={`relative ${VM_FRAME_PX} pt-3 pb-2`}
          style={{ background: "oklch(0.78 0.13 25)" }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, oklch(0.985 0.012 80) 0%, oklch(0.96 0.02 70) 100%)",
              border: "4px solid oklch(0.98 0.02 70)",
              boxShadow:
                "inset 0 0 28px oklch(0.95 0.12 85 / 0.3), inset 0 2px 0 oklch(1 0 0 / 0.7), 0 0 0 2px oklch(0.55 0.12 25 / 0.35)",
            }}
          >
            {/* warm interior light glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, oklch(0.97 0.12 85 / 0.5), transparent 70%)",
              }}
            />
            {/* glass reflection diagonals */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, oklch(1 0 0 / 0.3) 0%, transparent 35%, transparent 65%, oklch(1 0 0 / 0.18) 100%)",
              }}
            />

            {/* Shelf row with cans */}
            <div className={VM_SHELF_GRID}>
              {projects.map((p, i) => (
                <DrinkProduct
                  key={p.id}
                  p={p}
                  onClick={() => onSelect(p)}
                  label={`A0${i + 1}`}
                />
              ))}
            </div>
            {/* shelf bar */}
            <div className="mx-3 sm:mx-4 h-[5px] rounded-full" style={{ background: "oklch(0.88 0.06 30)" }} />
            {/* price strip — shares the shelf grid for perfect column alignment */}
            <div className={VM_PRICE_GRID} style={{ background: "oklch(0.94 0.04 30)" }}>
              {projects.map((_, i) => (
                <div
                  key={i}
                  className="font-sans font-bold text-sm sm:text-base tabular-nums text-ink text-center rounded-full leading-none py-1 tracking-tight"
                  style={{ background: "oklch(0.98 0.02 70)", border: "1.5px solid oklch(0.78 0.1 30)" }}
                >
                  ¥150
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button panel — outer padding compensates for the display's wrapper + glass border so buttons sit flush under cans */}
        <div
          className={VM_BUTTON_GRID}
          style={{ background: "oklch(0.78 0.13 25)" }}
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              aria-label={`Select ${p.drink} — opens ${p.title}`}
              className="group flex flex-col items-center gap-1 rounded-xl py-2 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura-deep focus-visible:ring-offset-1"
              style={{ background: "oklch(0.98 0.02 70)", border: "1.5px solid oklch(0.85 0.08 30)" }}
            >
              <span className="font-mono text-[10px] tabular-nums text-ink/60 leading-none">A0{i + 1}</span>
              <span className="block w-6 h-6 rounded-full transition-transform group-hover:scale-110 group-active:scale-95" style={{ background: p.color, border: "1.5px solid oklch(0.97 0.02 70)", boxShadow: "0 0 0 1.5px oklch(0.55 0.12 25 / 0.55)" }} />
              <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-ink/60 leading-none">push</span>
            </button>
          ))}
        </div>

        {/* Payment & dispenser strip */}
        <div className={`${VM_FRAME_PX} py-3 flex gap-2 items-stretch`} style={{ background: "oklch(0.82 0.13 25)" }}>
          {/* coin + bill slot column */}
          <div className="flex flex-col gap-1.5 w-28">
            <div className="rounded-lg px-2 py-1 flex items-center justify-between" style={{ background: "oklch(0.98 0.02 70)", border: "1px solid oklch(0.85 0.08 30)" }}>
              <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-ink/65 leading-none">coin</span>
              <span className="block w-6 h-1 rounded-full bg-ink/70" />
            </div>
            <div className="rounded-lg px-2 py-1 flex items-center justify-between" style={{ background: "oklch(0.98 0.02 70)", border: "1px solid oklch(0.85 0.08 30)" }}>
              <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-ink/65 leading-none">bill</span>
              <span className="block w-7 h-1.5 rounded-sm bg-ink/70" />
            </div>
            <div className="rounded-lg px-2 py-1 flex items-center gap-2" style={{ background: "oklch(0.98 0.02 70)", border: "1px solid oklch(0.85 0.08 30)" }}>
              <span className="font-mono text-[10px] tabular-nums text-ink/75 leading-none">¥000</span>
              <span className="ml-auto block w-2 h-2 rounded-full bg-sakura-deep" />
            </div>
          </div>
          {/* digital display */}
          <div className="flex-1 rounded-lg flex flex-col" style={{ background: "oklch(0.35 0.06 25)", border: "2px solid oklch(0.98 0.02 70)" }}>
            <div className="px-2 py-1 font-sans text-[9px] tracking-[0.22em] uppercase text-cream/80 border-b border-warm-white/15 leading-none">
              select a drink
            </div>
            <div className="flex-1 px-2 py-1 font-mono tabular-nums text-[11px] sm:text-xs text-warm-white flex items-center justify-between leading-none">
              <span>READY</span>
              <span className="text-sakura">●</span>
            </div>
          </div>
          {/* change return */}
          <div className="w-20 rounded-lg flex flex-col items-center justify-end px-1 py-1.5" style={{ background: "oklch(0.98 0.02 70)", border: "1px solid oklch(0.85 0.08 30)" }}>
            <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-ink/65 mb-1 leading-none">change</span>
            <div className="w-full h-3 rounded-sm bg-ink/75" />
          </div>
        </div>

        {/* Dispenser tray */}
        <div className={`${VM_FRAME_PX} pb-3 pt-2 rounded-b-[1.6rem]`} style={{ background: "oklch(0.78 0.13 25)" }}>
          <div
            className="rounded-xl h-14 flex items-center justify-center"
            style={{
              background: "linear-gradient(180deg, oklch(0.55 0.08 25) 0%, oklch(0.65 0.1 25) 100%)",
              border: "2px solid oklch(0.98 0.02 70)",
              boxShadow: "inset 0 4px 12px oklch(0 0 0 / 0.4)",
            }}
          >
            <div className="w-24 h-1.5 rounded-full bg-warm-white/80" />
            <span className="ml-3 font-sans text-[10px] tracking-[0.28em] uppercase text-warm-white/90 leading-none">pick up</span>
          </div>
        </div>
      </div>

      {/* little feet */}
      <div className="absolute -bottom-1 left-6 w-6 h-2 rounded-b-md" style={{ background: "oklch(0.55 0.1 25)" }} />
      <div className="absolute -bottom-1 right-6 w-6 h-2 rounded-b-md" style={{ background: "oklch(0.55 0.1 25)" }} />

    </div>
  );
}

export function Works() {
  const [active, setActive] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // progress: 0 when section top hits viewport bottom, 1 when bottom hits top
      const vh = window.innerHeight || 1;
      const p = 1 - (rect.top + rect.height / 2) / vh;
      setOffset(p * 100); // px scale
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="py-28 sm:py-36 px-6 relative overflow-hidden paper-grain"
      style={{ background: "linear-gradient(180deg, var(--sakura-soft) 0%, var(--cream) 55%, var(--warm-white) 100%)" }}
    >
      {/* background layer: Fuji drifts slowly (deepest) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${offset * 0.12}px, 0)` }}
      >
        <FujiScene />
      </div>

      {/* foreground layer: petals drift faster (closer) */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: `translate3d(0, ${offset * 0.42}px, 0)` }}
      >
        <Petals count={22} opacity={0.55} minDuration={22} maxDuration={38} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12 sm:mb-16 pt-24 sm:pt-36">
          <div className="text-xs tracking-[0.3em] uppercase text-cream mb-4" style={{ textShadow: "0 1px 6px oklch(0.3 0.1 25 / 0.45)" }}>Works</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream" style={{ textShadow: "0 2px 12px oklch(0.28 0.12 25 / 0.5)" }}>Choose a project</h2>
          <p className="mt-4 text-cream/90 text-sm" style={{ textShadow: "0 1px 6px oklch(0.3 0.1 25 / 0.45)" }}>tap a drink — each one opens a case study</p>
        </div>

        <div className="relative pt-32 sm:pt-40 pb-24 sm:pb-32">
          <VendingMachine onSelect={setActive} />
          {/* contact shadow blending machine into the railbed ground */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-16 sm:bottom-24 w-[78%] h-4 rounded-[50%]"
            style={{ background: "radial-gradient(ellipse, oklch(0.3 0.02 320 / 0.32), transparent 70%)", filter: "blur(2px)" }}
          />
        </div>
      </div>

      {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
    </section>
  );
}

