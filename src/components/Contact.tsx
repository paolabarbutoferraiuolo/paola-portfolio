import { Petals } from "./Petals";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 sm:py-40 px-6 gradient-sakura overflow-hidden">
      <Petals count={10} opacity={0.55} />
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-sakura-deep mb-6">Contact</div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1]">
          Let's create something clear,
          <br />
          thoughtful and{" "}
          <em className="text-sakura-deep not-italic">memorable.</em>
        </h2>
        <p className="mt-8 text-lg text-ink/70 max-w-xl mx-auto">
          For collaborations, portfolio requests or creative opportunities, feel free to get in touch.
        </p>

        <a
          href="mailto:paola.barbutoferraiuolo@gmail.com"
          className="group inline-flex items-center gap-2 mt-10 px-7 py-3.5 rounded-full bg-ink text-warm-white text-sm tracking-wide hover:bg-sakura-deep transition-colors soft-shadow hover-pulse hover-lift"
        >
          Contact me
          <span aria-hidden className="arrow-slide">→</span>
        </a>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 sm:gap-8 items-center justify-center text-sm text-ink/70">
          <a
            href="mailto:paola.barbutoferraiuolo@gmail.com"
            className="underline-grow hover:text-sakura-deep transition-colors"
          >
            paola.barbutoferraiuolo@gmail.com
          </a>
          <span className="hidden sm:inline text-ink/30">·</span>
          <a href="#" className="underline-grow hover:text-sakura-deep transition-colors">LinkedIn</a>
          <span className="hidden sm:inline text-ink/30">·</span>
          <a
            href="https://www.instagram.com/mrsmushroometti/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-grow hover:text-sakura-deep transition-colors"
          >
            Instagram
          </a>
          <span className="hidden sm:inline text-ink/30">·</span>
          <a href="#" className="underline-grow hover:text-sakura-deep transition-colors">Behance</a>
        </div>
      </div>
    </section>
  );
}
