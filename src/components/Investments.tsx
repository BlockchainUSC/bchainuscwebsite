import SectionHeader from "./SectionHeader";

const CURRENT_SEASON = {
  label: "Current Season",
  period: "Oct 2025 – Sep 2026",
  nav: "$116,769",
  rank: "#6",
  totalSchools: 17,
  usd: "-29.56%",
  eth: "+18.30%",
};

const SINCE_INCEPTION = {
  label: "Since Inception",
  period: "Founded Oct 2023",
  rank: "#2",
  totalSchools: 17,
  usd: "-29.56%",
  eth: "+18.30%",
};

const TRADING_PROGRAMS: {
  title: string;
  tag: string;
  description: string;
  href: string | null;
}[] = [
  {
    title: "Trading Competition",
    tag: "$1K → $10K CHALLENGE",
    description:
      "Turn $1,000 into $10,000 in a live trading competition on Legend, exclusive to Blockchain@USC members.",
    href: "https://www.legend.trade/",
  },
  {
    title: "Prediction Markets",
    tag: "GEMINI PARTNERSHIP",
    description:
      "We're partnering with Gemini to give members hands-on experience trading real-world event outcomes.",
    href: "https://www.gemini.com/predictions?status=active",
  },
  {
    title: "Club Treasury",
    tag: "LONG-TERM ALLOCATION",
    description:
      "Learn how to manage a treasury and invest club assets with a long-term time horizon and real accountability.",
    href: null,
  },
];

function StatBox({
  data,
  primaryLabel,
  primaryValue,
}: {
  data: typeof CURRENT_SEASON | typeof SINCE_INCEPTION;
  primaryLabel: string;
  primaryValue: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--text-secondary)]">
          {data.label}
        </div>
        <div className="font-mono text-[10px] text-white/40">{data.period}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="font-display text-base font-semibold">{primaryValue}</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{primaryLabel}</div>
        </div>
        <div>
          <div className="font-display text-base font-semibold text-cardinal-bright">
            {data.rank}
            <span className="text-[var(--text-secondary)] font-normal text-xs">
              {" "}
              / {data.totalSchools}
            </span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Rank</div>
        </div>
        <div>
          <div className="font-display text-base font-semibold">{data.usd}</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">USD Return</div>
        </div>
        <div>
          <div className="font-display text-base font-semibold">{data.eth}</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">ETH Return</div>
        </div>
      </div>
    </div>
  );
}

export default function Investments() {
  return (
    <section
      id="investments"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      <SectionHeader
        index="02 / INVESTMENTS"
        title="Capital at Work"
        tag="TREASURY_LOG"
        description="Blockchain@USC manages a live on-chain portfolio through Dorm Capital, and runs hands-on trading programs for the USC community."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left half — Dorm Capital */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-sm p-6">
          <div className="mb-5">
            <div className="flex items-center gap-4 flex-wrap mb-3">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                Dorm Capital
              </h3>
              <a
                href="https://www.dormdao.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase text-cardinal-bright no-underline hover:text-white transition-colors"
              >
                DormDAO
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a
              href="https://www.dormdao.io/about"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[var(--text-secondary)] text-sm leading-relaxed no-underline hover:text-[var(--text-primary)] transition-colors"
            >
              DormDAO is a student-run investment DAO uniting 17 university
              blockchain clubs across the US, Canada, and the UK. Each school
              manages its own on-chain portfolio, competing on a transparent,
              real-time leaderboard — giving the next generation of crypto
              builders real capital and real experience before they graduate.
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <StatBox data={SINCE_INCEPTION} primaryLabel="ETH Return" primaryValue={SINCE_INCEPTION.eth} />
            <StatBox data={CURRENT_SEASON} primaryLabel="NAV" primaryValue={CURRENT_SEASON.nav} />
          </div>

          <a
            href="https://www.dormdao.io/leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-xs text-[var(--text-secondary)] no-underline hover:text-white transition-colors inline-flex items-center gap-1"
          >
            Full leaderboard <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Right half — Trading */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-sm p-6">
          <div className="mb-5">
            <h3 className="font-display text-xl font-semibold tracking-tight mb-3">
              Trading
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Live markets and competitions where members trade with real
              stakes and real consequences.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {TRADING_PROGRAMS.map((program) => {
              const cardClass =
                "group rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 no-underline transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]";
              const content = (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
                      {program.title}
                    </h4>
                    {program.href && (
                      <span className="text-[var(--text-secondary)] group-hover:text-white transition-colors">
                        ↗
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-cardinal-bright mb-2">
                    {program.tag}
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {program.description}
                  </p>
                </>
              );

              return program.href ? (
                <a
                  key={program.title}
                  href={program.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {content}
                </a>
              ) : (
                <div key={program.title} className={cardClass}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
