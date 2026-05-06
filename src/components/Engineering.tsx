import WorkshopGrid from "./WorkshopGrid";
import SectionHeader from "./SectionHeader";

export default function Engineering() {
  return (
    <section
      id="engineering"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      <SectionHeader
        index="02 / ENGINEERING"
        title="Build at the Edge"
        tag="ENG.LOG"
        description="Hands-on workshops and shipped projects: from Solidity fundamentals to ZK proofs"
      />

      <WorkshopGrid />
    </section>
  );
}
