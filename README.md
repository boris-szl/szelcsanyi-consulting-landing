# szelcsanyi consulting

Personal consulting website for a freelance software engineer & fractional CTO — portfolio, about, and a file-based blog. Built with **Vite + React + TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**-style primitives.

Dark "terminal datasheet" identity from the Figma brand: near-black `#101215`, slate borders `#222b35`, green accent `#2be080`, the **Outfit** typeface, and a lowercase two-tone wordmark.

## Requirements

Node **20+** (the repo pins **24** in `.nvmrc`). This project uses **pnpm**.

```bash
nvm use            # or: nvm install
corepack enable    # provides pnpm
```

## Develop

```bash
pnpm install
pnpm dev           # http://localhost:5173
```

## Build & preview

```bash
pnpm build         # type-checks, then builds to dist/
pnpm preview
```

## Project layout

```
src/
  components/        Layout, Header, Footer, Wordmark, Reveal, CTABand, PageHeader
    ui/              shadcn/ui-style primitives (button, card, badge)
  content/blog/      Blog posts as Markdown — add a file, it appears automatically
  lib/
    site.ts          Brand, contact, nav — edit your name/email/socials here
    content.ts       Services, ventures/portfolio, stats, stack
    blog.ts          Markdown loader + frontmatter parser
  pages/             Home, Work, WorkDetail, About, Blog, BlogPost, Contact, NotFound
```

## Add a blog post

Drop a Markdown file in `src/content/blog/` with frontmatter:

```markdown
---
title: Your title
date: 2026-08-12
excerpt: One-line summary shown in the list.
tags: Architecture, Reliability
readingTime: 5 min read
---

Your post body in Markdown…
```

It shows up in the list and gets its own page automatically — no code changes.

## Things to personalize

- `src/lib/site.ts` — set your **full display name** (`owner`), email, GitHub, and LinkedIn URLs.
- `src/lib/content.ts` — the ventures, services, and stats.
- The contact form composes a pre-filled `mailto:` — swap in a real form backend if you want inbox delivery.

## Deploy

Any static host. On **Vercel** it deploys as-is (Vite preset); `vercel.json` adds the SPA rewrite so client routes like `/work` resolve on refresh.
