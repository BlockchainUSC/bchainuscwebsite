import { getAllResearch } from "@/lib/content";

export default function ResearchGrid() {
  const posts = getAllResearch();

  return (
    <section
      id="research"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      {/* Section header */}
      <div className="mb-lg flex justify-between items-end pb-sm border-b border-[var(--border)]">
        <h2 className="font-display text-[2rem] font-medium tracking-tight">
          Research
        </h2>
        <div className="font-mono text-sm text-[var(--text-secondary)]">
          SYS.LOG_v2.4
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="card-hover-line relative overflow-hidden flex flex-col min-h-[300px] p-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Meta */}
            <div className="font-mono text-xs text-cardinal-bright mb-sm flex justify-between">
              <span>{post.tags[0]}</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl mb-sm leading-snug">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-lg flex-grow">
              {post.excerpt}
            </p>

            {/* Link */}
            <a
              href={post.url ?? `#${post.slug}`}
              {...(post.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[var(--text-primary)] no-underline text-sm font-medium font-mono uppercase tracking-widest inline-flex items-center gap-2 group"
            >
              Read Paper
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
