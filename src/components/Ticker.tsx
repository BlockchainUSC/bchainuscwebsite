const PARTNERS = [
  "a16z crypto",
  "Paradigm",
  "Coinbase",
  "Optimism",
  "Solana Foundation",
  "Uniswap Labs",
  "Jump Crypto",
];

export default function Ticker() {
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <div
      className="relative overflow-hidden z-10"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(17, 17, 17, 0.4)",
        padding: "var(--space-sm) 0",
      }}
    >
      {/* Left fade mask — hides scrolling text behind the label area */}
      <div
        className="absolute left-0 top-0 h-full z-[2] pointer-events-none"
        style={{
          width: "140px",
          background: "linear-gradient(to right, rgba(17,17,17,0.95) 60%, transparent 100%)",
        }}
      />

      {/* Network label — sits on top of the fade */}
      <div className="absolute left-[var(--space-md)] top-1/2 -translate-y-1/2 z-[3]">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
          Network
        </span>
      </div>

      {/* Scrolling items — padded so they start after the label */}
      <div className="flex w-fit animate-ticker">
        <div className="flex items-center gap-16" style={{ paddingLeft: "160px" }}>
          {items.map((partner, i) => (
            <span
              key={`${partner}-${i}`}
              className="font-display font-bold text-xl text-[var(--text-secondary)] opacity-50 whitespace-nowrap transition-opacity duration-300 hover:opacity-100 hover:text-[var(--text-primary)]"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
