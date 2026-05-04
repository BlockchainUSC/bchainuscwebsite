# Deployment & Branch Protection

This site deploys to **[blockchainatusc.com](https://blockchainatusc.com)** automatically on every push to `main`.

This document covers the **one-time setup** to make that happen, plus how to lock down `main` so nothing reaches production without review.

> Most of this is clicking through GitHub and Vercel UIs. There are no scripts to run.

---

## Part 1 — Connect the repo to Vercel (one-time, ~10 min)

We use **Vercel** because Next.js is built by Vercel and the integration is essentially zero-config. Free for personal/club use.

### 1. Create a Vercel account and import the repo

1. Go to [vercel.com](https://vercel.com) and **Sign up with GitHub**.
2. Authorize the Vercel GitHub app to access the org/repo that owns this site.
3. From the dashboard, click **Add New… → Project**.
4. Find the repo (`bchainuscwebsite`) and click **Import**.
5. Vercel auto-detects Next.js. Leave all defaults:
   - Framework Preset: **Next.js**
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
6. Click **Deploy**. First build takes ~2 minutes. You'll get a temporary URL like `bchainuscwebsite.vercel.app`.

### 2. Add the custom domain

1. In the Vercel project, go to **Settings → Domains**.
2. Add `blockchainatusc.com` and `www.blockchainatusc.com`.
3. Vercel will show DNS records to add. Two cases:
   - **If your registrar is Namecheap/GoDaddy/etc.**: log in there and add the records Vercel shows you (usually an `A` record pointing to `76.76.21.21` and a `CNAME` for `www` pointing to `cname.vercel-dns.com`).
   - **If you want simplest setup**: transfer the domain's nameservers to Vercel. Vercel handles the rest.
4. DNS propagation usually takes 5–60 minutes. Vercel shows a green check when it's working.

### 3. Confirm auto-deploy is on

In **Settings → Git**, you should see:
- **Production Branch**: `main`
- **Auto-deploy on push**: enabled (default)
- **Pull Request Comments**: enabled — Vercel will post a preview URL on every PR.

That's it. Every push to `main` now deploys to `blockchainatusc.com`. Every PR gets its own preview URL.

---

## Part 2 — Protect the `main` branch (one-time, ~5 min)

This makes it impossible to push directly to `main`. Every change must go through a PR.

### Steps

1. Go to your repo on GitHub.
2. **Settings → Branches** (left sidebar).
3. Click **Add branch protection rule** (or **Add classic branch protection rule** if GitHub shows you the new rulesets UI — either works; classic is simpler).
4. **Branch name pattern**: `main`
5. Enable these checkboxes:

   - ✅ **Require a pull request before merging**
     - ✅ **Require approvals** — set to **1** (or more if you have multiple maintainers)
     - ✅ **Dismiss stale pull request approvals when new commits are pushed**
     - ✅ **Require approval of the most recent reviewable push**
   - ✅ **Require status checks to pass before merging**
     - ✅ **Require branches to be up to date before merging**
     - In the search box, add status checks once they appear after your first PR build. At minimum: `Vercel` (Vercel posts a status check per PR).
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings** (admins included — recommended)

   Leave these **unchecked** unless you specifically want them:
   - Require signed commits (annoying for student contributors)
   - Require linear history (squash-merge already gives you this)
   - Lock branch (this would block all merges)

6. Click **Create** (or **Save changes**).

### Verify it works

Try to push directly to `main` from your machine:

```bash
git checkout main
echo "test" >> README.md
git commit -am "test"
git push origin main
```

You should get a `protected branch hook declined` error. ✅

Undo the local commit:
```bash
git reset --hard origin/main
```

---

## Part 3 — Optional but recommended

### Add a CODEOWNERS file

Create `.github/CODEOWNERS` to auto-request reviews from specific people:

```
# Default owners for everything in the repo
*       @your-github-username @co-lead-username

# Content owned by the research lead
/content/research/  @research-lead-username
```

Once branch protection is on, you can also enable **"Require review from Code Owners"** in the protection rule.

### Set up a deploy notification (optional)

In Vercel **Settings → Notifications**, enable Slack/Discord notifications so the team knows when production deploys (and especially when one fails).

---

## What if I need to make an emergency hotfix?

Even with protection on, the right path is fast:

1. Branch from `main`: `git checkout -b fix/hotfix-thing`
2. Push the fix.
3. Open the PR.
4. Get one approval (any maintainer).
5. Merge. Vercel deploys in ~1 minute.

If literally nobody is around to approve, a repo admin can temporarily disable the protection rule, push the fix, and re-enable it. **Avoid this** — it defeats the purpose. Better to keep at least 2 maintainers active.

---

## How the daily Medium refresh works

The Research section pulls posts from [medium.com/blockchain-at-usc](https://medium.com/blockchain-at-usc) via RSS. The fetch is cached for 24 hours by Next.js's data cache, so:

- New posts appear within ~24 hours of publishing on Medium without any redeploy.
- If Medium is unreachable, the page falls back to the local MDX files in `content/research/`.

No cron job, no separate workflow needed — Vercel handles the cache revalidation transparently.

If you ever want to force-refresh sooner, redeploy the site (Vercel **Deployments → … → Redeploy**) — that wipes the cache.
