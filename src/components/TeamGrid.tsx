import Image from "next/image";
import { getTeamMembers } from "@/lib/content";
import SectionHeader from "./SectionHeader";

export default function TeamGrid() {
  const members = getTeamMembers();

  if (members.length === 0) return null;

  return (
    <section
      id="team"
      className="py-xl max-w-[1280px] mx-auto px-[var(--space-md)] z-10 relative"
    >
      <SectionHeader
        index="04 / TEAM"
        title="Core Contributors"
        tag="TEAM_ROSTER"
        description="The students driving research, engineering, and community at Blockchain@USC."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map((member) => (
          <div
            key={member.name}
            className="group relative flex flex-col items-center text-center p-md rounded-xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-[var(--surface-hover)] ring-1 ring-white/10 group-hover:ring-cardinal-bright/40 transition-all">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <h3 className="font-display text-base font-medium mb-1">
              {member.name}
            </h3>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              {member.role}
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-3">
              {member.twitter ? (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-colors"
                >
                  X
                </a>
              ) : (
                <span className="text-[var(--text-secondary)]/40 text-xs font-mono cursor-default">
                  X
                </span>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
