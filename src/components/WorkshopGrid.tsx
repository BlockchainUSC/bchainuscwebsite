import { getAllWorkshops } from "@/lib/content";
import CardCarousel from "./CardCarousel";

export default function WorkshopGrid() {
  const workshops = getAllWorkshops();

  if (workshops.length === 0) return null;

  return (
    <div className="mt-lg">
      <div className="mb-md flex justify-between items-end pb-sm border-b border-[var(--border)]">
        <h3 className="font-display text-[1.5rem] font-medium tracking-tight">
          Workshops
        </h3>
        <div className="font-mono text-sm text-[var(--text-secondary)]">
          BUILD_LOG
        </div>
      </div>

      <CardCarousel items={workshops} linkLabel="View Repo" size="compact" />
    </div>
  );
}
