# ROADMAP.md — Blockchain@USC Website
### ONE canonical roadmap. No competing lists anywhere else.

---

## Prioritized Tasks

**[NEXT]** Add `RESEND_API_KEY` + `RESEND_SEGMENT_ID` to Vercel environment variables
- Newsletter emails won't send in production without these
- Resend account must be set up with `blockchainatusc.com` domain verified
- API key must have Full Access (not Sending only)

**[NEXT]** Add Vercel status check to branch protection rule
- Go to GitHub → Settings → Rules → edit the main ruleset
- Enable "Require status checks" → search for and add `Vercel` (appears after first PR deploy)

**[SOON]** Add real cohort application link when Fall '26 applications open
- Currently "Fall '26 Cohort Coming Soon" is a disabled `<span>` in Nav + Hero
- When ready: swap for `<a>` with real link, restore hover styles, remove `opacity-70 cursor-default`

**[DONE]** ~~Deploy to production~~ — live at blockchainatusc.com via Vercel

**[DONE]** ~~Update research articles when new Medium posts are published~~ — now auto-fetched from Medium RSS daily

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
