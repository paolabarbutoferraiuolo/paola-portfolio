import { Reveal } from "./Reveal";

export function Illustrations() {
  return (
    <section id="illustrations" className="relative scroll-mt-16 py-28 sm:py-36 px-6 bg-warm-white">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 text-sakura-deep mb-6 text-xs tracking-[0.3em] uppercase">
            <span className="h-px w-8 bg-sakura-deep" />
            Illustrations
            <span className="h-px w-8 bg-sakura-deep" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink leading-[1.1]">
            Sketches, characters and{" "}
            <em className="text-sakura-deep not-italic font-serif">quiet little worlds.</em>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
            A personal Instagram corner for doodles, studies and everyday visual notes.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <a
            href="https://www.instagram.com/mrsmushroometti/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 mt-10 px-7 py-3.5 rounded-full bg-ink text-warm-white text-sm tracking-wide hover:bg-sakura-deep transition-colors soft-shadow hover-pulse hover-lift"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow @mrsmushroometti
            <span aria-hidden className="arrow-slide">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
