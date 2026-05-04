# Contributing to the Blockchain@USC Website

Welcome! This site is the public face of Blockchain@USC and powers [blockchainatusc.com](https://blockchainatusc.com). Every push to `main` deploys to production, so we keep `main` protected and require pull requests for all changes.

## TL;DR

1. Branch off `main`
2. Make your change
3. Open a pull request
4. Get one approval
5. Merge — production deploys automatically

You **cannot** push directly to `main`. The branch is protected.

---

## 1. Set up your local environment

```bash
git clone https://github.com/<org>/<repo>.git
cd <repo>
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Make sure your branch is up to date before starting work:

```bash
git checkout main
git pull origin main
```

## 2. Create a branch

Use a short, descriptive branch name. Convention:

- `feat/<thing>` — new feature (e.g. `feat/sponsor-section`)
- `fix/<thing>` — bug fix (e.g. `fix/footer-spacing`)
- `content/<thing>` — content-only update (e.g. `content/build-night-5`)
- `chore/<thing>` — tooling/refactor (e.g. `chore/upgrade-next`)

```bash
git checkout -b feat/your-change
```

## 3. Make your change

A few rules of thumb:

- **Run `npm run dev` and check the page in your browser** before opening a PR — type-checks alone don't catch visual regressions.
- **Run `npm run lint`** and fix any errors.
- Keep changes scoped. One PR = one logical change. If you find yourself fixing unrelated things, open a separate PR for them.
- Don't commit secrets, API keys, or `.env` files.
- Don't commit `node_modules/` or build artifacts.

### Common kinds of changes

| You want to… | Edit |
|---|---|
| Add a Build Night | `content/workshops/build-night-N.mdx` |
| Add an event | `content/events/<slug>.mdx` |
| Add a research article | Just publish on Medium — the site pulls automatically (daily refresh) |
| Update team members | `data/team.json` (or wherever team data lives) |
| Update partners ticker | `src/components/Ticker.tsx` |
| Update navigation links | `src/components/Nav.tsx` / `src/components/Footer.tsx` |
| Style tweaks | `src/app/globals.css` and component-level Tailwind classes |

## 4. Commit and push

```bash
git add <files>
git commit -m "feat: short description of the change"
git push -u origin feat/your-change
```

Commit messages: short imperative present tense (`add sponsor section`, not `added` or `adds`). Include "why" in the body if it isn't obvious.

## 5. Open a pull request

Push your branch, then open a PR against `main` on GitHub. The PR template will prompt you for:

- A summary of what changed and why
- A test plan (what you actually checked in your browser)
- Screenshots if it's a visual change
- Whether anything in production behavior changes

## 6. Review

- At least **one approval** is required before merging
- All conversations on the PR must be resolved
- Required status checks must pass (build, lint)
- Your branch must be up to date with `main`

If you're not sure who should review, tag the project lead or anyone who's recently committed to the area you're touching.

## 7. Merge

Once approved and green, hit **Squash and merge** (preferred — keeps `main`'s history clean). Production deploys automatically within ~1 minute.

If something looks broken in production:
1. Don't panic.
2. Open a fix PR, or
3. Ask a maintainer to revert the merge commit.

---

## What lives where

```
.
├── content/             # Markdown content (workshops, events)
│   ├── events/
│   ├── research/        # Local fallback only — production pulls from Medium
│   └── workshops/
├── data/                # Static JSON data (team, partners, etc.)
├── public/              # Static assets (images, fonts)
└── src/
    ├── app/             # Next.js App Router pages
    ├── components/      # React components
    ├── lib/             # Server-side helpers (content loaders, Medium fetch)
    └── types/           # Shared TypeScript types
```

## Questions?

Open a draft PR with what you have and ask in the description. It's cheaper than getting unstuck alone.
