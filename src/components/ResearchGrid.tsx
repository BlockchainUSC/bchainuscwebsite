import { getAllResearch } from "@/lib/content";
import { getMediumPosts } from "@/lib/medium";
import CardCarousel from "./CardCarousel";

export default async function ResearchGrid() {
  const mediumPosts = await getMediumPosts();
  const posts = mediumPosts.length > 0 ? mediumPosts : getAllResearch();

  if (posts.length === 0) return null;

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

      <CardCarousel items={posts} linkLabel="Read Paper" showDate />
    </section>
  );
}
