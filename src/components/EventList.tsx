import { getAllEvents } from "@/lib/content";

export default function EventList() {
  const events = getAllEvents();

  return (
    <section
      id="events"
      className="py-xl max-w-[1280px] mx-auto px-[var(--space-md)] z-10 relative"
    >
      {/* Section header */}
      <div className="mb-lg flex justify-between items-end pb-sm border-b border-[var(--border)]">
        <h2 className="font-display text-[2rem] font-medium tracking-tight">
          Upcoming Events
        </h2>
        <div className="font-mono text-sm text-[var(--text-secondary)]">
          CRON_SCHEDULE
        </div>
      </div>

      {/* Event rows */}
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.slug}
            className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4 md:gap-8 items-center p-md transition-all duration-200 hover:bg-[var(--surface)]"
            style={{
              border: "1px solid var(--border)",
            }}
          >
            <div className="font-mono text-base text-cardinal-bright">
              {event.displayDate}
            </div>

            <div>
              <h3 className="font-display text-xl mb-1">{event.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                {event.location} &bull; {event.description}
              </p>
            </div>

            <a
              href={event.url ?? "#"}
              {...(event.url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded no-underline transition-all duration-200 ${
                event.buttonVariant === "primary"
                  ? "bg-cardinal text-white hover:bg-cardinal-bright"
                  : "bg-transparent text-[var(--text-primary)] border hover:bg-white/5"
              }`}
              style={
                event.buttonVariant === "primary"
                  ? { boxShadow: "0 0 20px rgba(153, 0, 0, 0.4)" }
                  : { borderColor: "var(--border)" }
              }
            >
              {event.buttonText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
