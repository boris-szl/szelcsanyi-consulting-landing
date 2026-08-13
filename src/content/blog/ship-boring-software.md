---
title: Ship boring software on purpose
date: 2026-07-28
excerpt: The most reliable systems I have built were also the least clever. Here is why I reach for boring first, and when I break my own rule.
tags: Architecture, Reliability
readingTime: 6 min read
---

Early in my career I mistook novelty for quality. A new datastore, an exotic queue, a framework three weeks old on Hacker News — each felt like progress. Most of them became the thing I was paged about at 3am.

These days I optimise for a different property: **how quickly can the next engineer understand this and change it safely?** That question tends to push me toward boring, well-understood technology, and it has been the single best predictor of a system aging well.

## Boring is a feature, not a compromise

Boring technology has a large surface area of prior art. When Postgres does something surprising, ten thousand people have already hit it and written it down. When your bespoke consensus layer does something surprising, you are the documentation.

That matters most exactly when things are on fire:

- The failure modes are known and searchable.
- Hiring is easier because the skills already exist.
- The tooling — backups, migrations, observability — is mature.

None of that is glamorous. All of it compounds.

## When I break the rule

Boring-by-default is not boring-always. I will spend novelty budget when three things line up:

1. The problem is genuinely core to the business, not incidental.
2. The boring option has a concrete, measured ceiling I have already hit.
3. I can contain the new thing behind an interface I could rip out in a week.

> A good architecture makes the reversible decisions cheap and the irreversible ones rare.

If I cannot draw the line where the risky component ends, I am not ready to add it yet.

## The test I actually use

Before adding anything to a stack, I ask: *if this breaks at the worst possible time, do I know how to fix it, and can I explain that fix to someone who has never seen it?*

If the answer is no, the interesting choice is usually the wrong one. Ship the boring version, instrument it, and let the data — not the changelog — tell you when it is time for something sharper.
