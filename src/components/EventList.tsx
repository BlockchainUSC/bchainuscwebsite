import { getAllEvents } from "@/lib/content";
import SectionHeader from "./SectionHeader";

export default function EventList() {
  const events = getAllEvents();

  return (
    <section
      id="events"
      className="py-xl max-w-[1280px] mx-auto px-[var(--space-md)] z-10 relative"
    >
      <SectionHeader
        index="03 / EVENTS"
        title="On the Calendar"
        tag="CRON_SCHEDULE"
        description="Workshops, speaker series, hackathons, and community nights all open to the entire USC community."
      />

      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <div
            key={event.slug}
            className="group relative grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-4 md:gap-8 items-center p-md rounded-xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(153,0,0,0.08), transparent 40%)",
              }}
            />

            <div className="relative font-mono text-sm tracking-wider text-cardinal-bright">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cardinal-bright animate-pulse" />
                {event.displayDate}
              </div>
            </div>

            <div className="relative">
              <h3 className="font-display text-xl font-medium mb-1 tracking-tight">
                {event.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                <span className="text-white/70">{event.location}</span>
                <span className="mx-2 text-white/20">/</span>
                {event.description}
              </p>
            </div>

            <a
              href={event.url ?? "#"}
              {...(event.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full no-underline transition-all duration-200 ${
                event.buttonVariant === "primary"
                  ? "bg-white text-black hover:scale-[1.03]"
                  : "bg-white/[0.03] text-[var(--text-primary)] border border-white/10 hover:bg-white/[0.08] hover:border-white/20"
              }`}
            >
              {event.buttonText}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
