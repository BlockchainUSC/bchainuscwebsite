import WorkshopGrid from "./WorkshopGrid";

export default function Engineering() {
  return (
    <section
      id="engineering"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      <div className="mb-lg flex justify-between items-end pb-sm border-b border-[var(--border)]">
        <h2 className="font-display text-[2rem] font-medium tracking-tight">
          Engineering
        </h2>
        <div className="font-mono text-sm text-[var(--text-secondary)]">
          ENG.LOG
        </div>
      </div>

      <WorkshopGrid />
    </section>
  );
}
