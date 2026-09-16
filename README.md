# szelcsanyi consulting

Personal consulting website for a freelance software engineer & fractional CTO — portfolio, about, open roles, and a file-based blog. Built with **Astro**, **Tailwind CSS v4**, and TypeScript.

Every page is prerendered to static HTML and ships **no JavaScript** except the Cal.com booking embed on `/contact`, which is the site's one React island.

Dark "terminal datasheet" identity from the Figma brand: near-black `#101215`, slate borders `#222b35`, green accent `#2be080`, the **Outfit** typeface, and a lowercase two-tone wordmark.

## Requirements

Node **20+** (the repo pins **24** in `.nvmrc`). This project uses **pnpm**.

```bash
nvm use            # or: nvm install
```

## Develop

```bash
pnpm install
pnpm dev           # http://localhost:4321
```

## Build & preview

```bash
pnpm build         # astro check (type-checks .astro + .ts), then builds to dist/
pnpm preview
```

## Project layout

```
astro.config.mjs     Site URL, sitemap, generated CSP, Tailwind
src/
  content.config.ts  Zod schema for blog frontmatter — a bad post fails the build
  content/blog/      Posts as Markdown — add a file, it appears automatically
  layouts/
    BaseLayout.astro <head>, header/footer, scroll-reveal observer
  components/
    Seo.astro        Canonical, Open Graph, Twitter, and the schema.org @graph
    Sources.astro    The reference list under a post
    BookingEmbed.tsx The only React component (Cal.com embed)
    ui/              Button, Badge
  lib/
    meta.ts          Shared structured-data nodes and date/URL helpers
    site.ts          Brand, contact, nav — reads from config.ts
    content.ts       Services, ventures/portfolio, stats, stack
    roles.ts         Open roles
  pages/
    index.astro  about.astro  contact.astro  404.astro
    blog/  work/  hiring/     index + [slug] for each
    rss.xml.ts  robots.txt.ts  llms.txt.ts  llms-full.txt.ts
src/config.ts        Single source of truth: name, email, address, SEO defaults
```

## SEO & GEO

The site is built to be readable by search crawlers and quotable by answer engines:

| Output | What it does |
| --- | --- |
| Static HTML per route | Full article text without executing JavaScript |
| `schema.org` `@graph` per page | `Person` + `ProfessionalService` identity on every page, plus `BlogPosting`, `JobPosting`, `CreativeWork`, `BreadcrumbList`, `OfferCatalog` |
| `citation` on each post | Every entry in a post's `sources:` list, so a claim traces to its primary document |
| `/sitemap-index.xml` | Auto-generated; posts carry a content-accurate `lastmod` |
| `/rss.xml` | Full-text feed |
| `/llms.txt`, `/llms-full.txt` | [llmstxt.org](https://llmstxt.org) index and the complete writing archive |
| `/robots.txt` | Generated; named AI crawlers allowed explicitly |

To opt a specific AI crawler out, remove it from `AI_CRAWLERS` in `src/pages/robots.txt.ts`.

## Add a blog post

Drop a Markdown file in `src/content/blog/` with frontmatter:

```markdown
---
title: Your title
date: 2026-08-12
excerpt: One-line summary shown in the list.
tags: Architecture, Reliability
readingTime: 5 min read
# optional
updated: 2026-09-01          # drives dateModified; shown in the byline
firstHand: true              # marks it as a first-hand account
draft: true                  # excluded from the build entirely
sources:
  - title: Choose Boring Technology
    url: https://mcfunley.com/choose-boring-technology
    publisher: Dan McKinley
    note: What this source backs up.
---

Your post body in Markdown…
```

It appears in the list, gets its own page, and enters the sitemap, RSS feed, and `llms.txt` automatically. `sources` renders as the Sources list and as schema.org `citation` — the two can never drift apart. The schema in `src/content.config.ts` validates all of it at build time.

## Things to personalize

- `src/config.ts` — name, email, address, socials, availability, SEO defaults.
  - `social.linkedin` is still the placeholder `https://www.linkedin.com/`. It is filtered out of `sameAs` until it points at a real profile.
  - `legal.entityName`, `legal.legalForm`, and `legal.uid` carry TODOs.
- `src/lib/content.ts` — ventures, services, stats.
- `src/lib/roles.ts` — open roles.

## Deploy

Static output, any host.

- **Vercel** — deploys as-is with the Astro preset. `vercel.json` sets `cleanUrls`, cache headers, and the `frame-ancestors` header.
- **Docker / nginx** — `Dockerfile` builds and serves via `nginx.conf`. Routes resolve to directory indexes, unknown URLs return a real 404, and `/foo/` redirects to `/foo`.

The full Content-Security-Policy is generated per page by Astro (`security.csp`) and delivered in a `<meta>` element, with a SHA-256 hash for each inline script. Only `frame-ancestors` is sent as a response header — it is ignored inside `<meta>`. Do not add `script-src` back to `security-headers.conf`: a second, hashless policy would block every inline script the generated one permits.
