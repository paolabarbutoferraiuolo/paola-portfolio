const services = [
  {
    title: "Presentation Design",
    desc: "Clear, structured and visually polished decks for projects, reviews and storytelling.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="24" rx="3" fill="var(--sakura-soft)" stroke="var(--sakura-deep)" strokeWidth="1.5"/>
        <line x1="12" y1="18" x2="28" y2="18" stroke="var(--sakura-deep)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="24" x2="36" y2="24" stroke="var(--sakura-deep)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="12" y1="28" x2="22" y2="28" stroke="var(--sakura-deep)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="24" y1="34" x2="24" y2="40" stroke="var(--sakura-deep)" strokeWidth="1.5"/>
        <line x1="16" y1="40" x2="32" y2="40" stroke="var(--sakura-deep)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Social Content Design",
    desc: "Posts, carousels, stories and visual systems for digital communication.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <rect x="14" y="6" width="20" height="36" rx="4" fill="var(--sakura-soft)" stroke="var(--sakura-deep)" strokeWidth="1.5"/>
        <circle cx="24" cy="36" r="1.5" fill="var(--sakura-deep)"/>
        <circle cx="24" cy="20" r="4" fill="none" stroke="var(--sakura-deep)" strokeWidth="1.2"/>
        <circle cx="28" cy="14" r="1" fill="var(--sakura-deep)"/>
      </svg>
    ),
  },
  {
    title: "Content Strategy",
    desc: "Organising ideas into formats, messages and visual directions.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <rect x="10" y="8" width="28" height="32" rx="2" fill="var(--cream)" stroke="var(--sakura-deep)" strokeWidth="1.5"/>
        <line x1="10" y1="14" x2="38" y2="14" stroke="var(--sakura-deep)" strokeWidth="1.5"/>
        <line x1="15" y1="22" x2="33" y2="22" stroke="var(--sakura-deep)" strokeWidth="1.2" opacity="0.5"/>
        <line x1="15" y1="28" x2="30" y2="28" stroke="var(--sakura-deep)" strokeWidth="1.2" opacity="0.5"/>
        <line x1="15" y1="34" x2="33" y2="34" stroke="var(--sakura-deep)" strokeWidth="1.2" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: "Editorial & Visual Storytelling",
    desc: "Layouts, illustrated details and narrative-driven visual concepts.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10">
        <path d="M8 38 L30 16 L34 20 L12 42 Z" fill="var(--sakura-soft)" stroke="var(--sakura-deep)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M30 16 L34 12 L38 16 L34 20 Z" fill="var(--sakura-deep)"/>
        <path d="M8 38 L6 44 L12 42 Z" fill="var(--ink)"/>
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section className="py-28 sm:py-36 px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-sakura-deep mb-4">Services</div>
          <h2 className="font-serif text-4xl sm:text-5xl text-ink">What I can help with</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group bg-card rounded-[2rem] p-8 border border-border/40 soft-shadow hover:petal-shadow hover-lift transition-all duration-500"
              style={{ borderTopLeftRadius: i % 2 ? "3rem" : "1rem", borderBottomRightRadius: i % 2 ? "1rem" : "3rem" }}
            >
              <div className="mb-5 origin-left hover-wiggle inline-block">
                {s.icon}
              </div>
              <h3 className="font-serif text-2xl text-ink mb-3">{s.title}</h3>
              <p className="text-ink/65 leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
