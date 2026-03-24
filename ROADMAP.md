# ROADMAP.md — Blockchain@USC Website
### ONE canonical roadmap. No competing lists anywhere else.

---

## Prioritized Tasks

**[NEXT]** Update Ticker partner names to real Blockchain@USC partners/sponsors
- Currently shows placeholder names (a16z, Paradigm, Coinbase, etc.)
- Replace `PARTNERS` array in `src/components/Ticker.tsx`

**[NEXT]** Configure `FORMSPREE_ID` environment variable in production
- Newsletter form silently falls back to console.log without it
- Set in Vercel (or wherever deployed) env vars

**[NEXT]** Deploy to production
- Site has never been deployed; currently dev only
- Likely target: Vercel (natural fit for Next.js)

**[SOON]** Update research articles when new Medium posts are published
- Fetch `https://medium.com/feed/blockchain-at-usc` (RSS — works; direct URL returns 403)
- Update/add MDX files in `content/research/`

**[SOON]** Add real cohort application link when Fall '26 applications open
- Currently "Fall '26 Cohort Coming Soon" is a disabled `<span>` in Nav + Hero
- When ready: swap for `<a>` with real link, restore hover styles, remove `opacity-70 cursor-default`

**[SOON]** Update events when new events are announced
- Add/edit MDX files in `content/events/`
- Remove past events (or archive them)

**[LATER]** Individual research article pages
- Currently research cards link directly to Medium
- Could add `/research/[slug]` routes for on-site reading experience

**[LATER]** Individual team member pages or expanded bios
- Current grid only shows name, role, and socials

**[LATER]** SEO + metadata
- Currently using default Next.js metadata
- Add `og:image`, description, title per page

**[MAYBE]** Dark/light mode toggle
- Currently hard-coded dark theme via CSS variables
- Would need to wire up a theme switcher

**[MAYBE]** Animation performance audit
- WireframeCanvas and BackgroundMesh run continuously
- Worth profiling on low-end devices
