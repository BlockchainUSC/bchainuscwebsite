# CONTEXT.md — Blockchain@USC Website
### Upload this file at the start of every new Claude session to restore full context.

---

## Project Overview

**Name:** Blockchain@USC Club Website
**Repo directory:** `/Users/noahneri/blockchain-usc`
**Purpose:** Public-facing landing page for Blockchain@USC — USC's premier student-led organization dedicated to blockchain research, rigorous protocol analysis, and accelerating Web3 founders.
**Audience:** Prospective members, founders, researchers, partners.
**Current state:** Core site is live and functional. All content is real (team, events, research articles, partners). Logo placed. Nav, footer, and CTAs accurate. Ticker shows real partners.

---

## Tech Stack

| Layer | Detail |
|---|---|
| Framework | Next.js 14.2.35 (App Router) |
| Language | TypeScript 5.x, strict mode |
| Styling | Tailwind CSS 3.4.1 |
| Fonts | Inter (body), Space Grotesk (display), Space Mono (mono) — via `next/font` |
| Content | File-based MDX with `gray-matter` ^4.0.3 |
| Team data | `data/team.json` (JSON array) |
| Images | `next/image` |
| Newsletter | `/api/newsletter` route, optional Formspree via `FORMSPREE_ID` env var |
| Dev server | `npm run dev` → localhost:3000 |
| No database | Static site generation via filesystem + gray-matter |

---

## File Structure (Key Paths)

```
src/
  app/
    layout.tsx          — root layout, fonts, metadata
    page.tsx            — home page, assembles all sections
    globals.css         — CSS variables (dark theme)
    api/newsletter/     — newsletter signup endpoint
  components/
    Nav.tsx             — fixed header, scroll effects, mobile menu
    Hero.tsx            — headline + CTAs
    Ticker.tsx          — infinite scroll partner ticker
    ResearchGrid.tsx    — 3-column research cards
    EventList.tsx       — upcoming events list
    TeamGrid.tsx        — team member grid
    Footer.tsx          — links, connect, newsletter form, copyright
    BackgroundMesh.tsx  — animated gradient blobs
    WireframeCanvas.tsx — canvas wireframe grid animation
    NewsletterForm.tsx  — email subscription form (client)
  lib/
    content.ts          — getAllResearch(), getAllEvents(), getTeamMembers()
  types/
    index.ts            — ResearchPost, Event, TeamMember interfaces

content/
  research/             — MDX files, one per article (frontmatter: title, date, tags, excerpt, url)
  events/               — MDX files, one per event (frontmatter: title, date, displayDate, location, description, buttonText, buttonVariant, url)

data/
  team.json             — array of TeamMember objects

public/
  logo.png              — club logo (red/gold 3D isometric block mark)
  team/
    headshots/          — individual headshot images
    team_data.csv       — source CSV (reference only, not loaded at runtime)
```

---

## Design System

**Color palette (CSS variables):**
- `--bg-base`: `#030303`
- `--surface`: `#111111`, `--surface-hover`: `#161616`
- `--text-primary`: `#ffffff`, `--text-secondary`: `#8a8f98`
- `--border`: `rgba(255,255,255,0.08)`
- `cardinal`: `#660000`, `cardinal-bright`: `#990000`

**Typography:**
- Display: Space Grotesk (bold, headlines)
- Body: Inter
- Mono: Space Mono (labels, metadata, code)

**Spacing tokens:** `--space-xs` through `--space-xl` (0.5rem → 8rem)

**Animations:** `meshFloat` (12s), `pulseGlow` (8s), `ticker` (infinite horizontal scroll)

---

## Current Navigation

**Top nav:** Research | Events | Team | [Fall '26 Cohort Coming Soon — disabled span]
**Footer index:** Research | Events | Team
**Footer connect:** LinkedIn | Twitter | Instagram | GitHub | YouTube | Medium | Email Us

---

## Real Club Links

| Platform | URL |
|---|---|
| LinkedIn | https://www.linkedin.com/company/trojancrypto |
| Twitter | https://x.com/0xBlockchainSC |
| Instagram | https://www.instagram.com/blockchainatusc/ |
| GitHub | https://github.com/BlockchainUSC |
| YouTube | https://www.youtube.com/@blockchainusc |
| Medium | https://medium.com/blockchain-at-usc |
| Email | bchain@usc.edu |

---

## Team Roster (from `data/team.json`)

| Name | Role | LinkedIn | Twitter |
|---|---|---|---|
| Noah Neri | Co-President | /in/noah-neri-14a975251/ | @2nnatural |
| Rishab Rai | Co-President | /in/rishabrai/ | @rishabsrai |
| Shriya Upadhyay | Director of Engineering | /in/shriyaupadhyay/ | @ushriya19 |
| Alp Guneri | Director of Governance/On-Chain Consulting | /in/alpguneri/ | @GuneriAlp |
| Sebastian Sampedro | Director of Research/Investments | /in/sxsampedro/ | @0xblockchainsc |
| Alon Mutter | Director of Marketing | /in/alon-mutter-4367a12b3/ | @mutter88126 |
| Melanie Aguirre | Director of Recruitment | /in/melanie-aguirre05/ | — |
| Abba Wada | Treasurer | /in/abba-wada-63b999266/ | — |
| Melanie Rosas | Director of Community | /company/trojancrypto/ | @0xblockchainsc |
| Hersh Joshi | Director of Events | /in/hershnj/ | @Hershjdev |
| Nitzan Saar | Director of Partnerships | /in/nitzans/ | @nitzmode |

Headshot images: `public/team/headshots/<name>.png` or `.jpg`
Image path in JSON: `/team/headshots/<filename>`

---

## Ticker Partners (real, live in `src/components/Ticker.tsx`)

VanEck | a16z | Solana | Optimism | Superscrypt | Dorm DAO | SUI | Aptos | AVA Labs | Akash

---

## Research Articles (live, from Medium RSS)

| Title | Date | Medium URL |
|---|---|---|
| Unichain Incentive Analysis | 2025-10-29 | https://medium.com/blockchain-at-usc/unichain-incentive-analysis-43390c48e423 |
| Incentive Impact Analysis: Velodrome | 2025-09-10 | https://medium.com/blockchain-at-usc/incentive-impact-analysis-velodrome-0741ff9676c4 |
| The Fault-Tolerant Consensus Problem... | 2023-10-05 | https://medium.com/blockchain-at-usc/the-fault-tolerant-consensus-problem-and-its-solutions-in-blockchains-and-distributed-systems-7f883227ebc7 |

Research is pulled by fetching Medium RSS feed (`https://medium.com/feed/blockchain-at-usc`) — medium.com returns 403 on direct page fetch but RSS works. Articles live as MDX files in `content/research/`. "Read Paper" links open in new tab.

---

## Events (live, with signup links)

| Title | Date | URL |
|---|---|---|
| Akash Build Night @ USC | 2026-03-26 | https://luma.com/p1jabrns?tk=XqgJAq |
| Southern California Blockchain Conference Day 1 | 2026-04-22 | https://uscblockchainconf.com/ |
| Southern California Blockchain Conference Day 2 | 2026-04-23 | https://luma.com/kdfrx7je |

Events sorted chronologically (ascending) by `getAllEvents()`. Button links open in new tab.

---

## TypeScript Interfaces

```ts
interface ResearchPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  url?: string;        // links to Medium article
}

interface Event {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  location: string;
  description: string;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  url?: string;        // links to RSVP/signup page
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}
```

---

## Key Decisions & Reasoning

**No Governance tab** — removed; there is no governance section on the page. Was a broken anchor link.
**No Partners nav tab** — removed from nav. The Ticker (partner scroll) stays on the page but has no nav anchor; it's decorative.
**Ticker "Network" label fix** — the original used `background: var(--bg-base)` on an absolutely positioned label inside the overflow container, causing scrolling text to bleed through. Fixed with a gradient fade mask (`linear-gradient` from opaque to transparent) overlaid on the left side, plus `paddingLeft: 160px` on the scroll track.
**CTA is a teaser, not a button** — "Apply for Cohort '24" replaced with `<span>Fall '26 Cohort Coming Soon</span>` — not an `<a>`, not clickable, `cursor-default`, `opacity-70`. Appears in Nav (desktop + mobile) and Hero.
**Research articles from Medium RSS** — medium.com returns 403 on HTML fetch but the RSS feed (`/feed/`) works. Fetch it fresh when updating articles.
**`url` field added to both ResearchPost and Event** — optional field, gracefully falls back to `#slug` if absent. Added to types, content loader, and both rendering components.
**Email is `bchain@usc.edu`** — not `blockchain@usc.edu`.
**Copyright year is 2026.**
**Logo** — `public/logo.png`, 3D isometric red/gold block mark. Rendered in Nav at 36×36px via `next/image`, left of the wordmark.
**All external links** use `target="_blank" rel="noopener noreferrer"` — footer connect links, team social links, research "Read Paper" links, event RSVP buttons.
**Medium added to footer Connect links** — placed between YouTube and Email Us. `external: true` so it opens in a new tab.
**Ticker partners are real** — replaced all placeholder names (a16z crypto, Paradigm, Coinbase, etc.) with 10 real Blockchain@USC partners.

---

## Behavioral Instructions (verbatim)

> "keep it concise"
> "go straight to the point"
> "be extra concise"
> "short, direct sentences"

- Do not restate what the user said — just do it.
- Do not use emojis.
- Do not use a colon before tool calls.
- Do not add trailing summaries unless there's something important to flag.
- When referencing files or code, use markdown link syntax with relative paths: `[Nav.tsx](src/components/Nav.tsx)`.
- Do not propose changes to code you haven't read.
- Understand existing code before suggesting modifications.
- Do not add features, comments, or error handling beyond what was asked.
- Do not create new files unless absolutely necessary.

---

## Corrections & Behavior Updates (All Sessions)

- **Email address** — initially used `blockchain@usc.edu`; corrected to `bchain@usc.edu`.
- **Ticker / Partners** — initially planned to remove the Ticker entirely. Corrected: "I want the Partner ticker to stay on the page, but we don't need a top redirect that just goes to a ticker." — keep Ticker on page, remove Partners from nav only.
- **Ticker "Network" label** — "make the ticker not flow through the side fixed 'Network' portion. The network text should also fit better with the overall style of the ticker." Fixed with gradient mask approach.
