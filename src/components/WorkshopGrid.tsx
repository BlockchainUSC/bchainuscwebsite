import { getAllWorkshops } from "@/lib/content";

export default function WorkshopGrid() {
  const workshops = getAllWorkshops();

  if (workshops.length === 0) return null;

  return (
    <section
      id="workshops"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      {/* Section header */}
      <div className="mb-lg flex justify-between items-end pb-sm border-b border-[var(--border)]">
        <h2 className="font-display text-[2rem] font-medium tracking-tight">
          Engineering Workshops
        </h2>
        <div className="font-mono text-sm text-[var(--text-secondary)]">
          BUILD_LOG
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <article
            key={workshop.slug}
            className="card-hover-line relative overflow-hidden flex flex-col min-h-[300px] p-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Meta */}
            <div className="font-mono text-xs text-cardinal-bright mb-sm flex justify-between">
              <span>{workshop.tags[0]}</span>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl mb-sm leading-snug">
              {workshop.title}
            </h3>

            {/* Excerpt */}
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-lg flex-grow">
              {workshop.excerpt}
            </p>

            {/* Link */}
            <a
              href={workshop.url ?? `#${workshop.slug}`}
              {...(workshop.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[var(--text-primary)] no-underline text-sm font-medium font-mono uppercase tracking-widest inline-flex items-center gap-2 group"
            >
              View Repo
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
