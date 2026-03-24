import Image from "next/image";
import { getTeamMembers } from "@/lib/content";

export default function TeamGrid() {
  const members = getTeamMembers();

  if (members.length === 0) return null;

  return (
    <section
      id="team"
      className="py-xl max-w-[1280px] mx-auto px-[var(--space-md)] z-10 relative"
    >
      {/* Section header */}
      <div className="mb-lg flex justify-between items-end pb-sm border-b border-[var(--border)]">
        <h2 className="font-display text-[2rem] font-medium tracking-tight">
          Core Contributors
        </h2>
        <div className="font-mono text-sm text-[var(--text-secondary)]">
          TEAM_ROSTER
        </div>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center text-center p-md transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-[var(--surface-hover)]">
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
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-colors"
                >
                  Twitter
                </a>
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
