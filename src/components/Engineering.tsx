import WorkshopGrid from "./WorkshopGrid";
import SectionHeader from "./SectionHeader";

export default function Engineering() {
  return (
    <section
      id="projects"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      <SectionHeader
        index="04 / PROJECTS"
        title="Build at the Edge"
        tag="ENG.LOG"
        description="Hands-on workshops and shipped projects: from Solidity fundamentals to ZK proofs"
      />

      <WorkshopGrid />
    </section>
  );
}
