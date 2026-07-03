import { useEffect, useRef, useState } from "react";
import { SakuraIcon } from "./SakuraIcon";
import { Petals } from "./Petals";
import { attachKonami, petalBurst } from "@/lib/microinteractions";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#works", label: "Works" },
  { href: "#illustrations", label: "Illustrations" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [secretRain, setSecretRain] = useState(false);
  const tapCount = useRef(0);
  const tapTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return attachKonami(() => {
      setSecretRain(true);
      window.setTimeout(() => setSecretRain(false), 9000);
    });
  }, []);

  const onBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Hidden: triple-tap the brand within 600ms to trigger a petal rain
    tapCount.current += 1;
    if (tapTimer.current) window.clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => (tapCount.current = 0), 600);
    if (tapCount.current >= 3) {
      tapCount.current = 0;
      setSecretRain(true);
      window.setTimeout(() => setSecretRain(false), 9000);
    }
    // Hidden: petal burst from the icon on every click
    const r = (e.currentTarget.querySelector("[data-sakura]") as HTMLElement | null)?.getBoundingClientRect();
    if (r) petalBurst(r.left + r.width / 2, r.top + r.height / 2, 8);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-warm-white/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      {secretRain && (
        <div className="fixed inset-0 pointer-events-none z-[60]">
          <Petals count={40} opacity={0.85} minDuration={6} maxDuration={12} />
        </div>
      )}
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#home" onClick={onBrandClick} className="flex items-center gap-2 group">
          <span data-sakura className="hover-spin inline-block">
            <SakuraIcon size={26} />
          </span>
          <span className="font-serif text-base sm:text-lg text-ink tracking-tight">
            Paola <span className="text-sakura-deep">·</span> Barbuto Ferraiuolo
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm text-ink/70 hover:text-sakura-deep transition-colors relative group"
              >
                {l.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-sakura-deep scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-2 rounded-full hover:bg-sakura-soft transition-colors"
        >
          <div className="w-5 h-[1.5px] bg-ink mb-1.5" />
          <div className="w-5 h-[1.5px] bg-ink" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-warm-white/95 backdrop-blur-xl border-t border-border">
          <ul className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-ink/80 hover:text-sakura-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
