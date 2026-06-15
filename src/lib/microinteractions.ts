/**
 * Spawn a small burst of petals from a screen point.
 * Hidden microinteraction — append DOM nodes that animate via existing
 * `animate-float-petal` keyframe, then self-cleanup.
 */
export function petalBurst(x: number, y: number, count = 10) {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layer = document.createElement("div");
  layer.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;`;
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    const size = 14 + Math.random() * 14;
    const dx = (Math.random() - 0.5) * 220;
    const dy = 120 + Math.random() * 220;
    const rot = (Math.random() - 0.5) * 540;
    const dur = 1400 + Math.random() * 1200;
    p.style.cssText = `
      position:absolute; left:${x}px; top:${y}px;
      width:${size}px; height:${size}px;
      background: radial-gradient(circle at 30% 30%, oklch(0.92 0.08 25), oklch(0.7 0.16 22));
      border-radius: 60% 40% 65% 35% / 50% 60% 40% 50%;
      opacity:0.95; transform: translate(-50%, -50%) rotate(0deg);
      transition: transform ${dur}ms cubic-bezier(.22,1,.36,1), opacity ${dur}ms ease-out;
      will-change: transform, opacity;
    `;
    layer.appendChild(p);
    requestAnimationFrame(() => {
      p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rot}deg)`;
      p.style.opacity = "0";
    });
  }

  setTimeout(() => layer.remove(), 2800);
}

/** Hidden konami listener — triggers a callback on the classic sequence. */
export function attachKonami(onTrigger: () => void) {
  const seq = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];
  let i = 0;
  const handler = (e: KeyboardEvent) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === seq[i]) {
      i++;
      if (i === seq.length) {
        i = 0;
        onTrigger();
      }
    } else {
      i = k === seq[0] ? 1 : 0;
    }
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}
