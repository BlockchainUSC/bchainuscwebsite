/**
 * Live Dorm Capital / DormDAO leaderboard stats for the Investments section.
 *
 * DormDAO has no public API, so we scrape the server-rendered pages:
 *   - https://www.dormdao.io/schools/usc   — clean JSON blob with rank/nav/returns
 *   - https://www.dormdao.io/leaderboard    — HTML tables with the since-inception rank
 *
 * Results are cached with daily ISR (`revalidate`). Any fetch/parse failure or
 * an implausible value falls back to LAST_KNOWN so the section never breaks.
 */

const SCHOOL_URL = "https://www.dormdao.io/schools/usc";
const LEADERBOARD_URL = "https://www.dormdao.io/leaderboard";
const REVALIDATE_SECONDS = 60 * 60 * 24; // daily (matches the site's ISR window; no Vercel cron needed)
const FETCH_TIMEOUT_MS = 6000;

export type SeasonStat = {
  rank: string; // "#12"
  usd: string; // "-45.08%"
  eth: string; // "-6.47%"
};

export type DormDaoStats = {
  currentSeason: SeasonStat & { nav: string }; // nav: "$91,036"
  sinceInception: SeasonStat;
  totalSchools: number;
  /** true when any part is served from the hardcoded fallback */
  stale: boolean;
};

/**
 * Last hand-verified figures (2026-08-28). Used as the fallback whenever the
 * live scrape fails. Update these occasionally so a prolonged DormDAO outage
 * doesn't leave the site wildly out of date.
 */
export const LAST_KNOWN: DormDaoStats = {
  currentSeason: { nav: "$113,353", rank: "#5", usd: "-31.62%", eth: "+16.50%" },
  sinceInception: { rank: "#5", usd: "-31.62%", eth: "+16.50%" },
  totalSchools: 17,
  stale: true,
};

function fmtPct(n: number): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}

function fmtNav(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function plausibleRank(rank: number, total: number): boolean {
  return Number.isInteger(rank) && rank >= 1 && rank <= total;
}

function plausiblePct(n: number): boolean {
  return Number.isFinite(n) && n > -100 && n < 10000;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "user-agent": "blockchain-usc-site/1.0 (+https://blockchainatusc.com)" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

/** Pull rank / nav / usdReturn / ethReturn from the USC school-page JSON blob. */
function parseSchoolPage(html: string) {
  const s = html.replace(/\\"/g, '"');
  const m = s.match(
    /"school":\{"rank":(\d+),"name":"USC","slug":"usc","nav":([\d.]+),"usdReturn":(-?[\d.]+),"ethReturn":(-?[\d.]+)/,
  );
  if (!m) return null;
  return {
    rank: Number(m[1]),
    nav: Number(m[2]),
    usd: Number(m[3]),
    eth: Number(m[4]),
  };
}

type LeaderboardRow = { rank: number; nav?: number; usd?: number; eth?: number };

/**
 * The leaderboard page renders three tables:
 *   1. recent performance   (# School USD ETH)     — often blank ("—")
 *   2. current season       (# School NAV USD ETH Deployed)
 *   3. since inception      (# School USD ETH)
 * We locate USC's row by its /schools/usc link and read the numbers positionally.
 */
function parseLeaderboard(html: string): {
  currentSeason?: LeaderboardRow;
  sinceInception?: LeaderboardRow;
  totalSchools?: number;
} {
  const out: ReturnType<typeof parseLeaderboard> = {};

  for (const table of html.match(/<table\b[\s\S]*?<\/table>/g) ?? []) {
    const headEnd = table.indexOf("</thead>");
    const header = stripTags(headEnd > -1 ? table.slice(0, headEnd) : table.slice(0, 400))
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    const rowMatch = table.match(
      /<tr[^>]*>((?:(?!<\/tr>)[\s\S])*?\/schools\/usc"(?:(?!<\/tr>)[\s\S])*?)<\/tr>/,
    );
    if (!rowMatch) continue;

    const cells = stripTags(rowMatch[1])
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean);
    const rank = Number(cells[0]);
    if (!Number.isInteger(rank)) continue;

    const pcts = cells.filter((c) => /^-?\d+(\.\d+)?%$/.test(c)).map((c) => Number(c.replace("%", "")));
    const navCell = cells.find((c) => /^\$[\d,]+$/.test(c));
    const totalSchools = new Set(table.match(/\/schools\/[a-z0-9-]+"/g) ?? []).size || undefined;

    if (header.includes("nav") && navCell && pcts.length >= 2) {
      out.currentSeason = { rank, nav: Number(navCell.replace(/[$,]/g, "")), usd: pcts[0], eth: pcts[1] };
      out.totalSchools = totalSchools;
    } else if (pcts.length >= 2) {
      // since-inception table: the USD/ETH table that actually has numbers
      out.sinceInception = { rank, usd: pcts[0], eth: pcts[1] };
      if (!out.totalSchools) out.totalSchools = totalSchools;
    }
  }

  return out;
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ");
}

export async function getDormDaoStats(): Promise<DormDaoStats> {
  try {
    const [schoolHtml, leaderboardHtml] = await Promise.all([
      fetchText(SCHOOL_URL).catch(() => null),
      fetchText(LEADERBOARD_URL).catch(() => null),
    ]);

    const school = schoolHtml ? parseSchoolPage(schoolHtml) : null;
    const board = leaderboardHtml ? parseLeaderboard(leaderboardHtml) : {};

    const totalSchools = board.totalSchools ?? LAST_KNOWN.totalSchools;

    // Current season: prefer the precise school-page JSON, fall back to the table.
    const cs = school
      ? { rank: school.rank, nav: school.nav, usd: school.usd, eth: school.eth }
      : board.currentSeason;
    // Since inception: only the leaderboard has this rank.
    const si = board.sinceInception;

    if (
      !cs ||
      cs.nav === undefined ||
      cs.usd === undefined ||
      cs.eth === undefined ||
      !plausibleRank(cs.rank, totalSchools) ||
      !plausiblePct(cs.usd) ||
      !plausiblePct(cs.eth) ||
      !(cs.nav > 0)
    ) {
      return LAST_KNOWN;
    }

    const currentSeason = {
      rank: `#${cs.rank}`,
      nav: fmtNav(cs.nav),
      usd: fmtPct(cs.usd),
      eth: fmtPct(cs.eth),
    };

    // DormDAO reports the same USD/ETH figures for both windows, so we only need
    // the rank from the leaderboard's all-time table and reuse the precise
    // returns from above. This also avoids a visible mismatch when DormDAO's
    // leaderboard page briefly lags its per-school pages.
    const sinceInception =
      si && plausibleRank(si.rank, totalSchools)
        ? { rank: `#${si.rank}`, usd: currentSeason.usd, eth: currentSeason.eth }
        : LAST_KNOWN.sinceInception;

    return {
      currentSeason,
      sinceInception,
      totalSchools,
      stale: si == null,
    };
  } catch {
    return LAST_KNOWN;
  }
}
