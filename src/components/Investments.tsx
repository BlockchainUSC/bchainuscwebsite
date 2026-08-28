import SectionHeader from "./SectionHeader";
import { getDormDaoStats } from "@/lib/dormdao";

// Static presentation for each stat box; the live figures (nav, rank, returns)
// come from getDormDaoStats() and are refreshed weekly via ISR.
const SINCE_INCEPTION_META = {
  label: "Since Inception",
  period: "Founded Oct 2023",
  tint: "#4a0d0d",
};

const CURRENT_SEASON_META = {
  label: "Current Season",
  period: "Oct 2025 – Sep 2026",
  tint: "#4a0d0d",
};

const TRADING_PROGRAMS: {
  title: string;
  tag: string;
  description: string;
  href: string | null;
  tint: string;
}[] = [
  {
    title: "Trading Competition",
    tag: "$1K → $10K CHALLENGE",
    description:
      "Turn $1,000 into $10,000 in a live trading competition on Legend, exclusive to Blockchain@USC members.",
    href: "https://www.legend.trade/",
    tint: "#4a0d0d",
  },
  {
    title: "Prediction Markets",
    tag: "GEMINI PARTNERSHIP",
    description:
      "We're partnering with Gemini to give members hands-on experience trading real-world event outcomes.",
    href: "https://www.gemini.com/predictions?status=active",
    tint: "#4a0d0d",
  },
  {
    title: "Club Treasury",
    tag: "LONG-TERM ALLOCATION",
    description:
      "Learn how to manage a treasury and invest club assets with a long-term time horizon and real accountability.",
    href: null,
    tint: "#4a0d0d",
  },
];

function StatBox({
  meta,
  rank,
  totalSchools,
  usd,
  eth,
  primaryLabel,
  primaryValue,
}: {
  meta: { label: string; period: string; tint: string };
  rank: string;
  totalSchools: number;
  usd: string;
  eth: string;
  primaryLabel: string;
  primaryValue: string;
}) {
  return (
    <div
      className="rounded-lg border border-white/[0.12] p-4"
      style={{ backgroundColor: meta.tint }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/60">
          {meta.label}
        </div>
        <div className="font-mono text-[10px] text-white/40">{meta.period}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="font-display text-base font-semibold text-white">{primaryValue}</div>
          <div className="text-[11px] text-white/60 mt-0.5">{primaryLabel}</div>
        </div>
        <div>
          <div className="font-display text-base font-semibold text-[#f6c65c]">
            {rank}
            <span className="text-white/60 font-normal text-xs">
              {" "}
              / {totalSchools}
            </span>
          </div>
          <div className="text-[11px] text-white/60 mt-0.5">Rank</div>
        </div>
        <div>
          <div className="font-display text-base font-semibold text-white">{usd}</div>
          <div className="text-[11px] text-white/60 mt-0.5">USD Return</div>
        </div>
        <div>
          <div className="font-display text-base font-semibold text-white">{eth}</div>
          <div className="text-[11px] text-white/60 mt-0.5">ETH Return</div>
        </div>
      </div>
    </div>
  );
}

export default async function Investments() {
  const stats = await getDormDaoStats();

  return (
    <section
      id="investments"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      <SectionHeader
        index="02 / INVESTMENTS"
        title="Capital at Work"
        tag="TREASURY_LOG"
        description="Blockchain@USC manages a live onchain portfolio through Dorm Capital, and runs hands-on trading programs for the USC community."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left half — Dorm Capital */}
        <div className="rounded-xl border border-black/[0.08] bg-black/[0.015] backdrop-blur-sm p-6">
          <div className="mb-5">
            <div className="flex items-center gap-4 flex-wrap mb-3">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                Dorm Capital
              </h3>
              <a
                href="https://www.dormdao.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] uppercase text-cardinal-bright no-underline hover:text-[var(--text-primary)] transition-colors"
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
              manages its own onchain portfolio, competing on a transparent,
              real-time leaderboard — giving the next generation of crypto
              builders real capital and real experience before they graduate.
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <StatBox
              meta={SINCE_INCEPTION_META}
              rank={stats.sinceInception.rank}
              totalSchools={stats.totalSchools}
              usd={stats.sinceInception.usd}
              eth={stats.sinceInception.eth}
              primaryLabel="ETH Return"
              primaryValue={stats.sinceInception.eth}
            />
            <StatBox
              meta={CURRENT_SEASON_META}
              rank={stats.currentSeason.rank}
              totalSchools={stats.totalSchools}
              usd={stats.currentSeason.usd}
              eth={stats.currentSeason.eth}
              primaryLabel="NAV"
              primaryValue={stats.currentSeason.nav}
            />
          </div>

          <a
            href="https://www.dormdao.io/leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-xs text-[var(--text-secondary)] no-underline hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1"
          >
            Full leaderboard <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Right half — Trading */}
        <div className="rounded-xl border border-black/[0.08] bg-black/[0.015] backdrop-blur-sm p-6">
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
                "group rounded-lg border border-white/[0.12] p-4 no-underline transition-all duration-300 hover:border-white/25";
              const content = (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display text-base font-semibold text-white">
                      {program.title}
                    </h4>
                    {program.href && (
                      <span className="text-white/60 group-hover:text-white transition-colors">
                        ↗
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#f6c65c] mb-2">
                    {program.tag}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
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
                  style={{ backgroundColor: program.tint }}
                >
                  {content}
                </a>
              ) : (
                <div key={program.title} className={cardClass} style={{ backgroundColor: program.tint }}>
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
