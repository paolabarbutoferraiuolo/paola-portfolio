import { SakuraIcon } from "./SakuraIcon";
import { Reveal } from "./Reveal";

const cards = [
  { title: "Social Media Design", icon: "和" },
  { title: "Presentation Design", icon: "禅" },
  { title: "Visual Storytelling", icon: "桜" },
  { title: "Editorial & Illustration", icon: "絵" },
];

export function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-16 py-28 sm:py-36 px-6 gradient-sakura">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 text-sakura-deep mb-6 text-xs tracking-[0.3em] uppercase">
            <span className="h-px w-8 bg-sakura-deep" />
            About
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1]">
            Visual stories with structure,
            <br />
            <em className="text-sakura-deep not-italic font-serif">softness</em> and clarity.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 text-lg text-ink/75 max-w-2xl leading-relaxed">
            I'm Paola, a Visual Communication &amp; Content Designer. I create social content,
            presentations, visual systems and editorial layouts that help ideas become
            clear, coherent and memorable.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <div className="group bg-card rounded-3xl p-6 border border-border/50 soft-shadow hover-lift h-full">
                <div className="text-2xl text-sakura-deep mb-3 inline-block hover-wiggle">{c.icon}</div>
                <div className="font-serif text-base text-ink leading-tight">{c.title}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16 flex gap-4 items-start bg-card/60 backdrop-blur rounded-3xl p-6 sm:p-8 border border-border/40">
            <span className="hover-spin inline-block">
              <SakuraIcon size={36} />
            </span>
            <p className="text-sm sm:text-base text-ink/75 italic font-serif leading-relaxed">
              My work combines strategic thinking, visual sensitivity and attention to detail
              — from stakeholder presentations to social campaigns and illustrated narratives.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
