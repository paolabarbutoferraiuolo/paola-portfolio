import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { supabase } from "@/integrations/supabase/client";

const INSTAGRAM_URL = "https://www.instagram.com/mrsmushroometti/";

type IgItem = {
  id: string;
  permalink: string;
  caption: string;
  imageUrl: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
};

// Fallback tiles used when the Instagram Graph API is not yet configured
// or a request fails. Each tile still opens the profile.
const fallbackTiles = [
  { label: "Sketchbook", tint: "from-sakura-soft to-sakura" },
  { label: "Characters", tint: "from-cream to-mustard/60" },
  { label: "Studies", tint: "from-sakura/70 to-terracotta/50" },
  { label: "Everyday", tint: "from-sage/50 to-sakura-soft" },
];

export function Illustrations() {
  const [items, setItems] = useState<IgItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "instagram-latest",
          { body: {} },
        );
        if (cancelled) return;
        if (error) throw error;
        if (data?.configured && Array.isArray(data.data) && data.data.length) {
          setItems(data.data as IgItem[]);
        } else {
          setItems([]); // triggers fallback rendering
        }
      } catch (e) {
        console.warn("instagram-latest fetch failed", e);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showReal = !!items && items.length > 0;

  return (
    <section
      id="illustrations"
      className="relative scroll-mt-16 pt-24 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 lg:pb-24 px-6 bg-warm-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
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
              <em className="text-sakura-deep not-italic font-serif">
                quiet little worlds.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-base sm:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
              A personal Instagram corner for doodles, studies and everyday
              visual notes. Tap any post to open it on Instagram.
            </p>
          </Reveal>
        </div>

        {/* Responsive gallery — 2 cols on mobile, 4 cols from sm up */}
        <Reveal delay={220}>
          <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {showReal
              ? items!.map((item, i) => (
                  <a
                    key={item.id}
                    href={item.permalink || INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      item.caption
                        ? `Instagram post: ${item.caption.slice(0, 80)}`
                        : "Latest Instagram post"
                    }
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-cream soft-shadow hover-lift"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption?.slice(0, 120) || "Illustration"}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-warm-white text-xs tracking-wide inline-flex items-center gap-1">
                        <InstagramIcon className="w-3.5 h-3.5" />
                        View on Instagram
                      </span>
                    </div>
                  </a>
                ))
              : fallbackTiles.map((tile, i) => (
                  <a
                    key={tile.label}
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open @mrsmushroometti — ${tile.label}`}
                    className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${tile.tint} soft-shadow hover-lift ${loading ? "animate-pulse" : ""}`}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <div className="absolute inset-0 paper-grain opacity-60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-ink/80">
                      <InstagramIcon className="w-7 h-7 sm:w-8 sm:h-8 mb-2 opacity-70 group-hover:opacity-100 transition-opacity hover-wiggle" />
                      <span className="font-doodle text-lg sm:text-xl">
                        {tile.label}
                      </span>
                    </div>
                  </a>
                ))}
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-10 sm:mt-12 flex justify-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-ink text-warm-white text-sm tracking-wide hover:bg-sakura-deep transition-colors soft-shadow hover-pulse hover-lift"
            >
              <InstagramIcon className="w-4 h-4" />
              Follow @mrsmushroometti
              <span aria-hidden className="arrow-slide">→</span>
            </a>
          </div>
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
