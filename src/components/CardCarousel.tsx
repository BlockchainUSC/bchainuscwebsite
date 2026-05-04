"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CarouselItem = {
  slug: string;
  title: string;
  date?: string;
  tags: string[];
  excerpt: string;
  url?: string;
};

type Props = {
  items: CarouselItem[];
  linkLabel: string;
  showDate?: boolean;
};

export default function CardCarousel({ items, linkLabel, showDate = false }: Props) {
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
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-[var(--space-md)] px-[var(--space-md)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.slug}
            data-carousel-card
            className="card-hover-line snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] relative overflow-hidden flex flex-col min-h-[300px] p-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Meta */}
            <div className="font-mono text-xs text-cardinal-bright mb-sm flex justify-between">
              <span>{item.tags[0]}</span>
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
            <h3 className="font-display text-xl mb-sm leading-snug">
              {item.title}
            </h3>

            {/* Excerpt */}
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-lg flex-grow">
              {item.excerpt}
            </p>

            {/* Link */}
            <a
              href={item.url ?? `#${item.slug}`}
              {...(item.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[var(--text-primary)] no-underline text-sm font-medium font-mono uppercase tracking-widest inline-flex items-center gap-2 group"
            >
              {linkLabel}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
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
