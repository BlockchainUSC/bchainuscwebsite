"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ResearchThumbnail from "./ResearchThumbnail";

export type CarouselItem = {
  slug: string;
  title: string;
  date?: string;
  tags: string[];
  excerpt: string;
  url?: string;
  author?: string;
};

type Props = {
  items: CarouselItem[];
  linkLabel: string;
  showDate?: boolean;
  size?: "default" | "compact";
  showThumbnail?: boolean;
  sectionLabel?: string;
};

export default function CardCarousel({
  items,
  linkLabel,
  showDate = false,
  size = "default",
  showThumbnail = false,
  sectionLabel,
}: Props) {
  const compact = size === "compact";
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className={`flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-[var(--space-md)] px-[var(--space-md)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${compact ? "gap-4" : "gap-6"}`}
      >
        {items.map((item) => (
          <article
            key={item.slug}
            data-carousel-card
            className={`card-hover-line snap-start shrink-0 relative overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] ${
              compact
                ? "w-[70%] sm:w-[42%] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)] rounded-lg"
                : "w-[85%] sm:w-[60%] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            }`}
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {showThumbnail && (
              <div className="aspect-[3/2] w-full overflow-hidden">
                <ResearchThumbnail slug={item.slug} />
              </div>
            )}

            <div className={compact ? "p-sm flex flex-col flex-grow" : "p-md flex flex-col flex-grow"}>
              {/* Meta */}
              <div className={`font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider flex justify-between ${compact ? "mb-xs" : "mb-sm"}`}>
                <span>{sectionLabel ?? item.tags[0]}</span>
                {showDate && item.date && (
                  <span>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                className={`font-display leading-snug ${compact ? "text-base mb-1 line-clamp-2" : "text-xl mb-1"}`}
              >
                {item.title}
              </h3>

              {/* Author */}
              {item.author && (
                <p className={`font-mono text-xs text-[var(--text-secondary)] ${compact ? "mb-xs" : "mb-sm"}`}>
                  {item.author}
                </p>
              )}

              {/* Excerpt */}
              {!showThumbnail && (
                <p
                  className={`text-[var(--text-secondary)] leading-relaxed flex-grow ${
                    compact ? "text-xs mb-xs line-clamp-3" : "text-sm mb-sm"
                  }`}
                >
                  {item.excerpt}
                </p>
              )}

              {showThumbnail && <div className="flex-grow" />}

              {/* Tags */}
              {showThumbnail && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-sm items-start">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-black/[0.12] text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              <a
                href={item.url ?? `#${item.slug}`}
                {...(item.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`text-[var(--text-primary)] no-underline font-medium font-mono uppercase tracking-widest inline-flex items-center gap-2 group mt-auto ${compact ? "text-xs" : "text-sm"}`}
              >
                {linkLabel}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-md flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous"
          className="w-10 h-10 flex items-center justify-center font-mono text-base transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface)]"
          style={{ border: "1px solid var(--border)" }}
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next"
          className="w-10 h-10 flex items-center justify-center font-mono text-base transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface)]"
          style={{ border: "1px solid var(--border)" }}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
