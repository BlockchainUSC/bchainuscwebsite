interface Props {
  index: string;
  title: string;
  tag: string;
  description?: string;
}

export default function SectionHeader({ index, title, tag, description }: Props) {
  return (
    <div className="mb-lg">
      <div className="flex justify-between items-end gap-6 pb-sm relative">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3">
            <span className="text-cardinal-bright">●</span>{" "}
            <span className="text-black/50">{index}</span>
          </div>
          <h2 className="font-display font-semibold tracking-[-0.02em] text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-[var(--text-primary)]">
            {title}
          </h2>
          {description && (
            <p className="text-[var(--text-secondary)] text-sm mt-3 max-w-[520px]">
              {description}
            </p>
          )}
        </div>
        <div className="font-mono text-[11px] tracking-widest text-[var(--text-secondary)] hidden sm:flex items-center gap-2 pb-2">
          <span className="w-8 h-px bg-black/15" />
          {tag}
        </div>
        {/* Animated underline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.08]">
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-cardinal-bright to-transparent" />
        </div>
      </div>
    </div>
  );
}
