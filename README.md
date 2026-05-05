# Blockchain@USC — Club Website

**USC's premier student-led organization dedicated to blockchain research, rigorous protocol analysis, and accelerating Web3 founders.**

**Status:** Active development — core site live, all content real and current.

---

## What It Does

Public-facing landing page for Blockchain@USC. Showcases research publications pulled from Medium, upcoming events with signup links, the current leadership team with headshots and socials, real partner ticker, and club-wide social/contact links.

## Who It's For

Prospective members, founders, researchers, and partners looking to learn about or connect with Blockchain@USC.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Docs

- [CONTRIBUTING.md](./CONTRIBUTING.md) — **Read first if you want to contribute.** Branch workflow, PR process, what lives where.
- [CONTEXT.md](./CONTEXT.md) — Full project memory. Upload this at the start of every new session.
- [PROGRESS.md](./PROGRESS.md) — Changelog and current feature status.
- [ROADMAP.md](./ROADMAP.md) — Prioritized list of what comes next.

---

<details>
<summary><strong>For maintainers only — infrastructure handoff</strong></summary>

### How deployment works

Every push to `main` auto-deploys to [blockchainatusc.com](https://blockchainatusc.com) via Vercel. Contributors never touch Vercel — they just open PRs on GitHub. Every PR also gets a free Vercel preview URL automatically.

### Vercel account

The site is deployed under the **BlockchainUSC org Vercel account** (use the club email, not a personal one). If you're taking over infra, get login credentials from the outgoing maintainer or request access to the shared account.

- Project: `bchainuscwebsite-org`
- Production branch: `main`
- Domain: `blockchainatusc.com` + `www.blockchainatusc.com`

### Environment variables

Set these in **Vercel → project → Settings → Environment Variables**:

| Variable | What it does |
|---|---|
| `FORMSPREE_ID` | Newsletter form submission endpoint. Get the ID from [formspree.io](https://formspree.io). Without it, submissions log to console only. |

### Domain (Namecheap)

DNS is managed in Namecheap under the club account. Records currently pointing to Vercel:
- `A` record: `@` → `76.76.21.21`
- `CNAME`: `www` → `cname.vercel-dns.com`
- `TXT`: Vercel domain verification record (leave this — don't delete)

The old Webflow site is preserved but disconnected from the domain. To revert to Webflow: replace the A + CNAME records with `198.202.211.1` and `cdn.webflow.com`.

### GitHub branch protection

`main` is protected — no direct pushes. All changes go through a PR. Configured in **GitHub → Settings → Rules**. Requires PR + conversation resolution before merge.

To add the Vercel status check (recommended): after the first PR deploy, go to the ruleset → enable "Require status checks" → search for and add `Vercel`.

### Transferring ownership

If handing off to a new maintainer:
1. Add them to the `BlockchainUSC` GitHub org as an admin
2. Share the club Vercel account credentials (or add them as a member)
3. Share the Namecheap login
4. Update `data/team.json` with the new leadership

</details>
