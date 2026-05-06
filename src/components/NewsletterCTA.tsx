"use client";

export default function NewsletterCTA() {
  return (
    <section className="py-xl max-w-[1280px] mx-auto px-[var(--space-md)] z-10 relative">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-10 md:p-16">
        {/* glow */}
        <div
          className="absolute -top-40 -right-20 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(153,0,0,0.35) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,91,138,0.18) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        {/* grid */}
        <div className="absolute inset-0 hero-grid opacity-50 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-[560px]">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cardinal-bright mb-3">
              ● Stay Connected
            </div>
            <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-4">
              The dispatch lands monthly.
            </h3>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              Research drops, event invites, application windows, and the
              occasional alpha straight to your inbox.
            </p>
          </div>

          <button
            onClick={() => window.dispatchEvent(new Event("open-newsletter"))}
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-black text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            Subscribe to Newsletter
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
