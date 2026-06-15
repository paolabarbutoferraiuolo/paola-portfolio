interface Props {
  size?: number;
  className?: string;
  /**
   * 0 → 1 scroll progress mapped to 8 hand-drawn flipbook frames.
   *  0.00–0.15  Frame 1  tiny closed bud
   *  0.15–0.28  Frame 2  swollen bud
   *  0.28–0.40  Frame 3  bud beginning to open
   *  0.40–0.55  Frame 4  half-open blossom
   *  0.55–0.72  Frame 5  soft open sakura
   *  0.72–0.85  Frame 6  full bloom
   *  0.85–0.93  Frame 7  bloom with drifting petals
   *  0.93–1.00  Frame 8  dispersal into atmosphere
   */
  openness?: number;
}

/* Soft hand-drawn sakura palette */
const PETAL_HI = "oklch(0.978 0.012 14)";   // near-white highlight
const PETAL = "oklch(0.93 0.045 14)";        // pale blush body
const PETAL_MID = "oklch(0.87 0.07 14)";     // mid pink
const PETAL_DEEP = "oklch(0.75 0.11 14)";    // dusty-rose outline
const CENTER = "oklch(0.84 0.09 20)";        // warmer center wash
const STAMEN = "oklch(0.58 0.12 25)";        // soft mauve filament
const STAMEN_TIP = "oklch(0.95 0.04 80)";    // pale cream anther tip
const CALYX = "oklch(0.5 0.08 22)";          // muted burgundy / rose-brown
const CALYX_HI = "oklch(0.62 0.09 22)";
const BRANCH = "oklch(0.34 0.05 35)";        // soft brown branch
const BLUSH_HALO = "oklch(0.95 0.04 16)";

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function weight(t: number, c: number, w: number) {
  const d = Math.abs(t - c);
  if (d >= w) return 0;
  return 0.5 + 0.5 * Math.cos((d / w) * Math.PI);
}

/* ============================================================
   Heart-notched sakura petal pointing up (negative y).
   Drawn around base point (0,0); len controls petal length.
   ============================================================ */
function SakuraPetal({
  rotate = 0,
  len = 18,
  fill = PETAL,
  edge = PETAL_DEEP,
  highlight = true,
  noStroke = false,
}: {
  rotate?: number;
  len?: number;
  fill?: string;
  edge?: string;
  highlight?: boolean;
  noStroke?: boolean;
}) {
  const w = len * 0.62;
  const tip = -len;
  const notch = tip + len * 0.18;
  const d = `
    M 0 ${len * 0.18}
    C ${-w * 0.95} ${len * 0.05} ${-w} ${tip * 0.45} ${-w * 0.85} ${tip * 0.75}
    C ${-w * 0.7} ${tip + 1} ${-w * 0.25} ${tip - 1} ${-w * 0.1} ${notch}
    Q 0 ${notch + len * 0.08} ${w * 0.1} ${notch}
    C ${w * 0.25} ${tip - 1} ${w * 0.7} ${tip + 1} ${w * 0.85} ${tip * 0.75}
    C ${w} ${tip * 0.45} ${w * 0.95} ${len * 0.05} 0 ${len * 0.18} Z
  `;
  return (
    <g transform={`rotate(${rotate})`}>
      <path
        d={d}
        fill={fill}
        stroke={noStroke ? "none" : edge}
        strokeWidth={noStroke ? 0 : 0.55}
        strokeLinejoin="round"
        strokeOpacity="0.7"
      />
      {highlight && (
        <path
          d={`M 0 ${tip * 0.7}
              C ${-w * 0.42} ${tip * 0.55} ${-w * 0.4} ${tip * 0.9} 0 ${notch + 0.6}
              C ${w * 0.4} ${tip * 0.9} ${w * 0.42} ${tip * 0.55} 0 ${tip * 0.7} Z`}
          fill={PETAL_HI}
          opacity="0.55"
        />
      )}
    </g>
  );
}

/* ============================================================
   Open 5-petal sakura silhouette with NO inner petal strokes.
   The single outer rose-pink outline is created by drawing the
   same 5 petals slightly enlarged in PETAL_DEEP behind the
   normal-sized petal fills — interior seams are covered by the
   solid fill layer, so only the outer silhouette ring shows.
   ============================================================ */
function OpenFlower({
  len = 21,
  scale = 1,
  highlight = true,
}: {
  len?: number;
  scale?: number;
  highlight?: boolean;
}) {
  return (
    <g style={{ transform: `scale(${scale})` }}>
      {/* outer silhouette ring */}
      <g style={{ transform: "scale(1.045)" }}>
        {[0, 72, 144, 216, 288].map((a) => (
          <SakuraPetal
            key={`o-${a}`}
            rotate={a}
            len={len}
            fill={PETAL_DEEP}
            highlight={false}
            noStroke
          />
        ))}
      </g>
      {/* solid petal fills (no inner strokes) */}
      {[0, 72, 144, 216, 288].map((a) => (
        <SakuraPetal
          key={`f-${a}`}
          rotate={a}
          len={len}
          fill={PETAL}
          highlight={highlight}
          noStroke
        />
      ))}
    </g>
  );
}

/* ============================================================
   Cute rounded bud (side view) with a darker calyx at the base.
   openTip 0 → 1 controls how much the top of the bud parts.
   ============================================================ */
function Bud({
  scale = 1,
  openTip = 0,
  showBranch = true,
  showCalyx = true,
}: {
  scale?: number;
  openTip?: number;
  showBranch?: boolean;
  showCalyx?: boolean;
}) {
  return (
    <g transform={`scale(${scale})`}>
      {showBranch && (
        <>
          <path d="M -26 24 C -14 22 -6 14 -2 6" stroke={BRANCH} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M -22 22 C -16 21 -10 17 -6 12" stroke={CALYX_HI} strokeWidth="0.7" fill="none" opacity="0.6" strokeLinecap="round" />
        </>
      )}
      {showCalyx && (
        <>
          {/* calyx cup */}
          <path d="M -5 7 C -6 12 6 12 5 7 C 4 5 -4 5 -5 7 Z" fill={CALYX} />
          {/* tiny sepal tips */}
          <path d="M -3 8 L -2.4 12 M 0 8 L 0 12.4 M 3 8 L 2.4 12" stroke={CALYX} strokeWidth="0.8" strokeLinecap="round" />
        </>
      )}
      {/* layered overlapping petals — outer deep ring + inner pale */}
      <path
        d="M -5.4 3 C -6.4 -5 -2 -9.5 0 -9.5 C 2 -9.5 6.4 -5 5.4 3 C 4.2 6 -4.2 6 -5.4 3 Z"
        fill={PETAL_DEEP}
      />
      <path
        d="M -4.6 2.4 C -5.6 -4.2 -1.4 -8.6 0.4 -8.6 C 2.4 -8.6 5.6 -4.2 4.6 2.4 C 3.6 5 -3.6 5 -4.6 2.4 Z"
        fill={PETAL_MID}
      />
      <path
        d="M -3.4 1.4 C -4 -3.6 0 -7.8 1 -7.8 C 2 -7.8 4.4 -3.4 3.4 2 C 2.6 4 -2.8 4 -3.4 1.4 Z"
        fill={PETAL}
      />
      {/* soft highlight */}
      <ellipse cx="-1" cy="-3.4" rx="1.4" ry="2.2" fill={PETAL_HI} opacity="0.75" />
      {/* seam parting at the tip when openTip > 0 */}
      {openTip > 0 && (
        <path
          d="M -2 -5.5 C -1 -7.4 1 -7.4 2 -5.5"
          stroke={PETAL_HI}
          strokeWidth={0.6 + openTip * 0.6}
          fill="none"
          strokeLinecap="round"
          opacity={0.5 + openTip * 0.5}
        />
      )}
      {openTip > 0.5 && (
        <path
          d="M 0 -7.6 L 0 -3"
          stroke={PETAL_DEEP}
          strokeWidth="0.35"
          opacity={0.4 * openTip}
        />
      )}
    </g>
  );
}

/* ============================================================
   FRAME 1 — tiny closed bud, slightly tilted
   ============================================================ */
function Frame1() {
  return (
    <g transform="rotate(-8)">
      <Bud scale={1} openTip={0} showBranch={false} showCalyx={false} />
    </g>
  );
}

/* ============================================================
   FRAME 2 — fuller bud, still closed, no branch
   ============================================================ */
function Frame2() {
  return (
    <g transform="rotate(-4)">
      <Bud scale={1.22} openTip={0.18} showBranch={false} showCalyx={false} />
    </g>
  );
}

/* ============================================================
   FRAME 3 — bud beginning to open (seam parting, petal divisions hint)
   ============================================================ */
function Frame3() {
  return (
    <g>
      <Bud scale={1.4} openTip={0.6} showBranch={false} showCalyx={false} />
      {/* first hint of petal divisions at the top */}
      <path
        d="M -3 -7 C -1.5 -9.5 1.5 -9.5 3 -7"
        stroke={PETAL_DEEP}
        strokeWidth="0.5"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M 0 -9.6 L 0 -4"
        stroke={PETAL_DEEP}
        strokeWidth="0.35"
        opacity="0.55"
      />
    </g>
  );
}

/* ============================================================
   FRAME 4 — half-open blossom, petals cupped, calyx still visible
   ============================================================ */
function Frame4() {
  return (
    <g>
      <g style={{ transform: "scale(0.6)" }}>
        {[0, 72, 144, 216, 288].map((a) => (
          <SakuraPetal key={a} rotate={a} len={15} fill={PETAL} edge={PETAL_DEEP} />
        ))}
      </g>
      <circle r="2.4" fill={CENTER} />
    </g>
  );
}

/* ============================================================
   FRAME 5 — soft open sakura, 5 petals clearly visible, stamens starting
   ============================================================ */
function Frame5() {
  return (
    <g>
      <circle r="18" fill={BLUSH_HALO} opacity="0.3" />
      <OpenFlower len={17} scale={0.78} />
      <circle r="2.8" fill={CENTER} />
      {/* short stamens beginning */}
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = ((a - 90) * Math.PI) / 180;
        return (
          <circle
            key={a}
            cx={Math.cos(rad) * 3}
            cy={Math.sin(rad) * 3}
            r="0.6"
            fill={STAMEN}
            opacity="0.85"
          />
        );
      })}
    </g>
  );
}

/* ============================================================
   FRAME 6 — full bloom with radiating stamens (no inner seams)
   ============================================================ */
function Frame6({ haloOpacity = 0.4, petalScale = 1 }: { haloOpacity?: number; petalScale?: number }) {
  const stamens = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * 360 + 8;
    const rad = ((a - 90) * Math.PI) / 180;
    const r = 6.4 + (i % 3 === 0 ? 1.2 : i % 2 === 0 ? 0.4 : 0);
    return { a, rad, r };
  });
  return (
    <g>
      <circle r="28" fill={BLUSH_HALO} opacity={haloOpacity} />
      <OpenFlower len={21} scale={petalScale} />
      <circle r="4.2" fill={CENTER} />
      <circle r="2.4" fill={PETAL_DEEP} />
      {stamens.map(({ a, rad, r }) => {
        const x2 = Math.cos(rad) * r;
        const y2 = Math.sin(rad) * r;
        const cx1 = Math.cos(rad) * 0.8;
        const cy1 = Math.sin(rad) * 0.8;
        const mx = (cx1 + x2) / 2 + Math.cos(rad + Math.PI / 2) * 0.5;
        const my = (cy1 + y2) / 2 + Math.sin(rad + Math.PI / 2) * 0.5;
        return (
          <g key={a}>
            <path
              d={`M ${cx1} ${cy1} Q ${mx} ${my} ${x2} ${y2}`}
              stroke={STAMEN}
              strokeWidth="0.45"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx={x2} cy={y2} r="0.95" fill={STAMEN_TIP} stroke={STAMEN} strokeWidth="0.25" />
          </g>
        );
      })}
      <circle r="0.85" fill={STAMEN} />
    </g>
  );
}

/* ============================================================
   FRAME 7 — full bloom with a few drifting petals around it
   ============================================================ */
function Frame7() {
  return (
    <g>
      <Frame6 haloOpacity={0.42} petalScale={1} />
      {/* 3 drifting petals at varied positions/rotations */}
      <g transform="translate(-30 -22) rotate(-30) scale(0.42)">
        <SakuraPetal rotate={0} len={20} highlight={false} />
      </g>
      <g transform="translate(28 -28) rotate(45) scale(0.36)">
        <SakuraPetal rotate={0} len={20} highlight={false} />
      </g>
      <g transform="translate(22 30) rotate(160) scale(0.4)">
        <SakuraPetal rotate={0} len={20} highlight={false} />
      </g>
    </g>
  );
}

/* ============================================================
   FRAME 8 — dispersal: flower softens, petals drift wider, halo grows
   ============================================================ */
function Frame8() {
  return (
    <g>
      <circle r="40" fill={BLUSH_HALO} opacity="0.55" />
      <g opacity="0.55">
        <Frame6 haloOpacity={0} petalScale={1.04} />
      </g>
      {/* dispersed petals — further out, lower opacity */}
      <g opacity="0.85" transform="translate(-42 -34) rotate(-40) scale(0.42)">
        <SakuraPetal rotate={0} len={20} highlight={false} />
      </g>
      <g opacity="0.8" transform="translate(40 -38) rotate(55) scale(0.38)">
        <SakuraPetal rotate={0} len={20} highlight={false} />
      </g>
      <g opacity="0.75" transform="translate(36 36) rotate(170) scale(0.4)">
        <SakuraPetal rotate={0} len={20} highlight={false} />
      </g>
      <g opacity="0.7" transform="translate(-38 32) rotate(-150) scale(0.36)">
        <SakuraPetal rotate={0} len={20} highlight={false} />
      </g>
    </g>
  );
}

export function SakuraIcon({ size = 240, className, openness = 1 }: Props) {
  const t = clamp01(openness);

  /* Centers of each of the 8 frames per the requested mapping.
     Half-widths are picked so adjacent frames crossfade smoothly. */
  const w1 = weight(t, 0.075, 0.13);
  const w2 = weight(t, 0.215, 0.11);
  const w3 = weight(t, 0.34, 0.1);
  const w4 = weight(t, 0.475, 0.105);
  const w5 = weight(t, 0.635, 0.1);
  const w6 = weight(t, 0.785, 0.095);
  const w7 = weight(t, 0.89, 0.06);
  const w8 = weight(t, 0.97, 0.07);

  const sum = w1 + w2 + w3 + w4 + w5 + w6 + w7 + w8 || 1;
  const o = (x: number) => x / sum;

  /* Gentle scale increase as bloom progresses */
  const scale = 0.5 + t * 0.7;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter id="sakura-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.2" />
        </filter>
        <filter id="sakura-grain" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed="9" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0.42
                    0 0 0 0 0.3
                    0 0 0 0 0.35
                    0 0 0 0.07 0"
            result="grainTinted"
          />
          <feComposite in="grainTinted" in2="SourceGraphic" operator="in" result="grainMasked" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="grainMasked" />
          </feMerge>
        </filter>
      </defs>
      <g
        style={{ transform: `scale(${scale})`, transformOrigin: "0px 0px" }}
        filter="url(#sakura-grain)"
      >
        <g filter="url(#sakura-soft)">
          <g opacity={o(w1)}><Frame1 /></g>
          <g opacity={o(w2)}><Frame2 /></g>
          <g opacity={o(w3)}><Frame3 /></g>
          <g opacity={o(w4)}><Frame4 /></g>
          <g opacity={o(w5)}><Frame5 /></g>
          <g opacity={o(w6)}><Frame6 /></g>
          <g opacity={o(w7)}><Frame7 /></g>
          <g opacity={o(w8)}><Frame8 /></g>
        </g>
      </g>
    </svg>
  );
}
