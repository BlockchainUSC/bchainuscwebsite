# PROGRESS.md — Blockchain@USC Website

---

## Session: 2026-05-04

### Completed

**Research — Live Medium RSS feed**
- `src/lib/medium.ts`: fetches `https://medium.com/feed/blockchain-at-usc` via `rss-parser` at runtime
- Cached 24h via Next.js ISR (`fetch` with `next: { revalidate: 86400 }`) — new posts appear within a day, no redeploy needed
- Extracts title, date, tags (categories), excerpt (stripped HTML), author (`dc:creator`), and link
- `ResearchGrid` is now an async server component; falls back to local MDX in `content/research/` if Medium is unreachable

**Carousels — Research + Workshops**
- `src/components/CardCarousel.tsx`: generic horizontal scroll-snap carousel with prev/next arrows; replaces `WorkshopCarousel`
- Props: `items`, `linkLabel`, `showDate` — reused for both sections
- Research cards show date + author; Workshop cards show neither
- 1 card mobile / 2 md / 3 lg; arrows disable at track edges

**Engineering Workshops — Build Night 4**
- Added `content/workshops/build-night-4.mdx`: "Build Night 4 (HackSC-2024 Workshop): Voting dApp"
- Removed date display from workshop cards (build-night-3 had no date, build-night-4 none either)
- Pulled from main branch (was committed separately by user)

**Deployment — Vercel + blockchainatusc.com**
- Site deployed to `blockchainatusc.com` via Vercel (connected to GitHub repo)
- Auto-deploys on every push to `main`; PR branches get preview URLs
- DNS migrated from Webflow to Vercel in Namecheap (old Webflow records replaced with Vercel A + CNAME)
- Webflow project preserved (not deleted) in case team wants to revert

**Branch protection + contributor workflow**
- GitHub branch protection enabled on `main`: require PR, require conversation resolution, block force pushes
- `CONTRIBUTING.md`: branch naming, commit style, PR process, "what lives where" table
- `.github/PULL_REQUEST_TEMPLATE.md`: auto-fills on every PR
- `DEPLOYMENT.md`: Vercel setup, DNS, branch protection click-by-click

---

## Session: 2026-03-26

### Completed

**Ticker — Real Partners**
- Replaced 7 placeholder names (a16z crypto, Paradigm, Coinbase, Solana Foundation, Uniswap Labs, Jump Crypto) with 10 real Blockchain@USC partners
- `PARTNERS` array in `src/components/Ticker.tsx` now contains: VanEck, a16z, Solana, Optimism, Superscrypt, Dorm DAO, SUI, Aptos, AVA Labs, Akash

**Footer — Medium Link**
- Added Medium (`https://medium.com/blockchain-at-usc`) to `CONNECT_LINKS` in `src/components/Footer.tsx`
- Positioned between YouTube and Email Us
- `external: true` — opens in new tab

---

## Session: 2026-03-24

### Completed

**Navigation**
- Removed `Governance` and `Partners` tabs from `NAV_LINKS`
- Added `Team` tab pointing to `#team`
- Final nav order: Research | Events | Team
- "Apply Now" button (desktop + mobile) replaced with non-clickable `<span>`: "Fall '26 Cohort Coming Soon" (`opacity-70`, `cursor-default`, no hover effects)

**Hero CTA**
- "Apply for Cohort '24 →" replaced with non-clickable `<span>`: "Fall '26 Cohort Coming Soon"

**Footer**
- Index links updated: Governance removed, Members → Team
- Connect links: replaced all `#` placeholders with real URLs (LinkedIn, Twitter, Instagram, GitHub, YouTube)
- Added Instagram and YouTube (were not in original)
- Removed Medium link (not provided at the time — added 2026-03-26)
- Email corrected to `bchain@usc.edu`
- Copyright updated 2024 → 2026
- All external links get `target="_blank" rel="noopener noreferrer"`

**Ticker (Partner scroll)**
- Kept on page; removed `id="partners"` (no longer a nav anchor)
- Fixed "Network" label overlap: replaced hacky `background: var(--bg-base)` with gradient fade mask (`linear-gradient`) + `paddingLeft: 160px` on scroll track
- "Network" label restyled: `font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--text-secondary)]`

**Team data**
- Replaced 4 dummy members in `data/team.json` with 11 real members from `public/team/team_data.csv`
- Headshot paths: `/team/headshots/<filename>`
- Social links: real LinkedIn + Twitter URLs for all members (some have only LinkedIn)
- `TeamGrid.tsx` social links updated with `target="_blank" rel="noopener noreferrer"`

**Research articles**
- Replaced 3 placeholder MDX files with real articles from Blockchain@USC Medium publication
  - Unichain Incentive Analysis (Oct 2025)
  - Incentive Impact Analysis: Velodrome (Sep 2025)
  - The Fault-Tolerant Consensus Problem... (Oct 2023)
- Added `url` optional field to `ResearchPost` type and `getAllResearch()` loader
- "Read Paper" links now open actual Medium articles in new tab

**Events**
- Replaced 3 placeholder MDX files with real upcoming events:
  - Akash Build Night @ USC — Mar 26, 2026 (Luma)
  - SoCal Blockchain Conference Day 1 — Apr 22, 2026
  - SoCal Blockchain Conference Day 2 — Apr 23, 2026
- Added `url` optional field to `Event` type and `getAllEvents()` loader
- RSVP buttons now link to real signup pages, open in new tab

**Section titles**
- "Ledger // Research" → "Research"
- "Upcoming Nodes" → "Upcoming Events"

**Logo**
- `public/logo.png` placed by user (3D isometric red/gold block mark)
- `next/image` added to `Nav.tsx` (36×36px, left of wordmark)

**Docs**
- `README.md` rewritten (was default Create Next App boilerplate)
- `CONTEXT.md` created
- `PROGRESS.md` created
- `ROADMAP.md` created

---

## Feature Status

| Feature | Status |
|---|---|
| Navigation (Research, Events, Team) | ✅ Live |
| Hero + teaser CTA | ✅ Live |
| Partner Ticker (10 real partners) | ✅ Live |
| Research grid (live Medium RSS, auto-refreshes daily, author shown) | ✅ Live |
| Events list (3 real events + links) | ✅ Live |
| Team grid (11 real members + headshots) | ✅ Live |
| Footer (real social links, correct email, Medium) | ✅ Live |
| Logo in nav | ✅ Live |
| Newsletter form | ✅ Wired (Formspree via `FORMSPREE_ID` env var, console fallback) |
| Background animations (mesh + wireframe) | ✅ Live |
| Mobile menu | ✅ Live |

---

## Known Issues / Not Yet Fixed

- `FORMSPREE_ID` env var not set in Vercel — newsletter form falls back to console.log in production.
- Vercel status check not yet added to branch protection rule — add after first PR deploy surfaces the check name.
- Medium RSS cache is 24h — newly published posts won't appear until cache expires or a "Clear cache and redeploy" is triggered in Vercel.
