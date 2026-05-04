import { getAllWorkshops } from "@/lib/content";
import CardCarousel from "./CardCarousel";

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

      <CardCarousel items={workshops} linkLabel="View Repo" />
    </section>
  );
}
