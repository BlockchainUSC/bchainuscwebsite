import { getAllResearch } from "@/lib/content";
import { getMediumPosts } from "@/lib/medium";
import CardCarousel from "./CardCarousel";
import SectionHeader from "./SectionHeader";

export default async function ResearchGrid() {
  const mediumPosts = await getMediumPosts();
  const posts = mediumPosts.length > 0 ? mediumPosts : getAllResearch();

  if (posts.length === 0) return null;

  return (
    <section
      id="research"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      <SectionHeader
        index="03 / RESEARCH"
        title="Protocol-Grade Research"
        tag="SYS.LOG_v2.4"
        description="Deep technical analysis of the protocols, primitives, and design patterns shaping the next era of onchain systems."
      />

      <CardCarousel items={posts} linkLabel="Read Paper" showDate size="compact" />
    </section>
  );
}
