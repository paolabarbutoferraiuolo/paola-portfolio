import { SakuraIcon } from "./SakuraIcon";

export function Footer() {
  return (
    <footer className="py-10 px-6 bg-warm-white border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 group">
          <span className="hover-spin inline-block">
            <SakuraIcon size={22} />
          </span>
          <span className="font-serif text-sm text-ink/70">
            Paola Barbuto Ferraiuolo — Visual Communication &amp; Content Designer
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-ink/40 tracking-wider">
          <a
            href="https://www.instagram.com/mrsmushroometti/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sakura-deep transition-colors"
          >
            Instagram
          </a>
          <span className="text-ink/30">·</span>
          <span>© {new Date().getFullYear()} · made with care</span>
        </div>
      </div>
    </footer>
  );
}
