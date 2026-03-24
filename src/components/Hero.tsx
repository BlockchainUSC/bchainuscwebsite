const TAGS = ["Protocol Research", "Venture Building", "On-Chain Engineering"];

export default function Hero() {
  return (
    <header className="pt-[25vh] pb-xl text-center relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10">
      {/* Tags */}
      <div className="flex justify-center gap-6 mb-md font-mono text-xs tracking-widest uppercase text-[var(--text-secondary)]">
        {TAGS.map((tag) => (
          <span key={tag} className="flex items-center gap-2">
            <span className="text-cardinal-bright">&#10003;</span>
            {tag}
          </span>
        ))}
      </div>

      {/* Heading */}
      <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-md max-w-[900px] mx-auto text-[clamp(3rem,6vw,5.5rem)]">
        Pioneering the Future
        <br />
        of On-Chain Systems
      </h1>

      {/* Subtitle */}
      <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-[var(--text-secondary)] max-w-[600px] mx-auto mb-lg leading-relaxed">
        USC&apos;s premier student-led organization dedicated to blockchain
        research, rigorous protocol analysis, and accelerating Web3 founders.
      </p>

      {/* CTAs */}
      <div className="flex gap-4 justify-center items-center flex-wrap">
        <span
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded bg-cardinal text-white opacity-70 cursor-default select-none"
          style={{ boxShadow: "0 0 20px rgba(153, 0, 0, 0.2)" }}
        >
          Fall &apos;26 Cohort Coming Soon
        </span>
        <a
          href="#research"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded bg-transparent text-[var(--text-primary)] no-underline border transition-all duration-200 hover:bg-white/5"
          style={{ borderColor: "var(--border)" }}
        >
          Read Our Research
        </a>
      </div>
    </header>
  );
}
