---
title: Found by Google, not by monitoring — a WordPress zero-day post-mortem
date: 2026-09-17
lang: en
translationKey: wordpress-zero-day-post-mortem
excerpt: A site was fully compromised for ten days through a WordPress Core zero-day. Nothing the operators did caused it, nothing they had running detected it, and the only reason we could prove the entry vector was two database rows the attacker could not delete.
seoTitle: "WordPress Zero-Day Post-Mortem: Ten Days Undetected"
seoDescription: >-
  A WordPress Core zero-day gave an unauthenticated attacker admin in 93 seconds. Ten days undetected, found by a Google result, proven by two database rows.
tags: Security, Incident Response, WordPress, Forensics
readingTime: 10 min read
draft: false
firstHand: true
keyPoints:
  - >-
      A WordPress Core zero-day chain (CVE-2026-63030 with CVE-2026-60137) took an unauthenticated HTTP request to a working command shell in 93 seconds.
  - >-
      The patch had been public for 46 days. Automatic core updates were disabled across all sites and nobody noticed.
  - >-
      The compromise ran undetected for 10.3 days and was found through a Google search result showing injected casino spam, not by any monitoring.
  - >-
      Four of five sites shared one system user, so a single site's compromise exposed the database credentials of all four. The fifth, on its own user, was untouched.
  - >-
      Log retention was about 10 days — shorter than the dwell time. Only a pre-remediation backup preserved the day-zero logs that proved the entry vector.
sources:
  - title: "CVE-2026-63030 — WordPress REST API batch-route confusion leading to remote code execution"
    url: https://www.cve.org/CVERecord?id=CVE-2026-63030
    publisher: CVE Program
    note: The route-desynchronisation half of the chain. Affects WordPress 6.9.x before 6.9.5 and 7.0.x before 7.0.2.
  - title: "CVE-2026-60137 — Facilitated SQL injection via author__not_in in WP_Query"
    url: https://www.cve.org/CVERecord?id=CVE-2026-60137
    publisher: CVE Program
    note: The injection half. WP_Query does not properly sanitise author__not_in when it arrives as a scalar rather than an array.
  - title: WordPress security releases
    url: https://wordpress.org/news/category/security/
    publisher: WordPress
    note: Where Core security releases are announced, including the one that fixed this chain 46 days before the compromise.
  - title: Known Exploited Vulnerabilities (KEV) Catalog
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    publisher: CISA
    note: Both CVEs were listed as actively exploited days after disclosure — the signal that turns "patch soon" into "patch now".
  - title: Hardening WordPress
    url: https://wordpress.org/documentation/article/hardening-wordpress/
    publisher: WordPress
    note: File permissions, user separation, and the baseline this installation did not meet.
  - title: "wp-config.php — authentication keys and salts"
    url: https://developer.wordpress.org/apis/wp-config-php/#security-keys
    publisher: WordPress
    note: Rotating these is what invalidates every existing session after a compromise.
  - title: "Regulation (EU) 2016/679 (GDPR) — Articles 33 and 34"
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
    publisher: EUR-Lex
    note: The notification obligations that a confirmed unauthorised access to personal data may engage. The threshold is reasonable likelihood of access, not proof of exfiltration.
---

*This is a sanitised write-up of a real incident I handled. The client, domains, IP addresses, account names, and file paths have been removed or generalised — the CVEs, version numbers, durations and counts are unchanged, because those are the parts worth learning from.*

The site was not reported by a user, an alert, or a monitoring system. It was reported by a Google search result.

Someone searched for the company and found a listing advertising a Turkish online casino under the client's own domain. Clicking through showed a perfectly normal homepage. That gap — spam in the index, clean site in the browser — is the signature of **cloaking**: content served to search-engine crawlers and hidden from human visitors. It also means whatever is wrong has been wrong long enough for Google to have crawled, indexed, and ranked it.

By the time anyone looked, the attacker had been inside for **ten days and eight hours**.

## Nobody did anything wrong

I want to put this first, because the reflex after a WordPress compromise is to look for the careless human.

There wasn't one. No weak password. No phishing. No reused admin credential, no malicious plugin installed by someone who should have known better, no agency leaving a backup file in the web root. The exploit **required no authentication at all**. Anyone on the internet who could reach the site could run it, and the proof-of-concept was public.

The site was running WordPress 6.9.4. The fix was in 6.9.5, published **46 days earlier**.

That is the whole story: a Core zero-day, a public exploit, and a patch that existed but had not been applied. Everything else in this post is consequence.

## How the chain worked

The exploit — circulating publicly as *wp2shell* — chains two WordPress Core flaws disclosed on the same day. Neither one gives you code execution. Together they take an anonymous HTTP request all the way to administrator.

What makes it nasty is that **every step makes WordPress perform the malicious action itself**. There is no foreign code executing until the very end. The artifacts look like ordinary application output, which is exactly why nothing flagged it.

**Step 1 — route confusion in the REST batch endpoint ([CVE-2026-63030](https://www.cve.org/CVERecord?id=CVE-2026-63030)).** The batch endpoint bundles several API calls into one request, tracking them across three parallel arrays: requests, handlers, validation results. A deliberately malformed sub-request gets added to the validation array but skipped in the handler array. The arrays shift out of alignment, and a request that passed validation is then executed under a *different* request's handler — inheriting permission and method checks that were never meant for it.

In the logs this looks like nothing much:

```text
POST //?_w2s=…  HTTP/2.0"  207
```

Triple and double-slash paths, and `HTTP 207 Multi-Status` responses. Thirty seconds of them. If you are not specifically looking for the batch endpoint, they read as noise.

**Step 2 — SQL injection ([CVE-2026-60137](https://www.cve.org/CVERecord?id=CVE-2026-60137)).** The desynchronised request lands on `WP_Query`'s `author__not_in` parameter. Passed as a scalar string instead of an array, it slips past sanitisation and is interpolated straight into raw SQL. A `UNION`-based read then pulls arbitrary values out of the database, returned shaped like a blog post.

There is a lovely tell for this one. Among a burst of small batch responses, a single response came back at **1,242,468 bytes** — three orders of magnitude larger than its neighbours. That is not an API call. That is a database being read.

**Step 3 — privilege escalation without a password.** This is the clever part. The forged query result poisons WordPress's in-memory object cache. The attacker then abuses the oEmbed feature to persist that poisoned object into the database as a real `oembed_cache` row, and — through a cache-reconciliation gadget and a self-referencing parent loop — recasts it as a `customize_changeset`.

Applying a changeset runs with the authority of **user ID 1**. During that borrowed-authority window, a "create administrator" request that was rejected on the first pass gets replayed, and this time it succeeds.

**Step 4 — code execution.** Now holding a real administrator account, the attacker logged in and uploaded a plugin. That is not an exploit. That is a Tuesday. The plugin registered an unauthenticated REST route that took base64-encoded shell commands and returned their output.

Elapsed time from first contact to working command shell: **93 seconds.**

## The two rows the attacker couldn't delete

The exploit is tidy. It removes its own administrator account and cleans up its webshell. Log retention on the host was about ten days — shorter than the dwell time — so the logs from day zero had already rotated by the time anyone was looking. On paper, this should have been an incident where you say *"probably WordPress, probably a plugin"* and move on.

Except the privilege-escalation trick leaves two rows in the database, and they are structurally hard to remove:

- an `oembed_cache` row — the poisoned cache object
- a `customize_changeset` row, `post_author = 1`, written in the same second the rogue administrator was created, still carrying the proof-of-concept's marker payload: `"title":"proof"`

Both were still sitting in the live database eleven days later.

That is the difference between an assumed root cause and a proven one. Those rows are why this report says *"the chain executed and succeeded at 16:11:32"* instead of *"the site was probably compromised via a vulnerability."* The attacker swept the floor and forgot the thing bolted to it.

The other half of the save was procedural: **evidence was preserved before remediation**, including a full pre-remediation server backup. When the live logs for day zero turned out to have rotated, that backup still had them. Had we cleaned first and investigated second — which is the instinct when a client's domain is serving casino spam to Google — the entry vector would have been unknowable.

> Clean second. Whatever you delete to fix the site is also the evidence that tells you how it got in.

## One user, four databases

The compromise reached exactly as far as the filesystem let it, and that turned out to be much further than one site.

Five WordPress sites shared the server. **Four of them ran under a single system user.** The attacker's very first commands after getting a shell were to read every `wp-config.php` on the box and sweep the filesystem for passwords, API keys, and tokens — which meant database credentials and authentication salts for all four, not just the one that was vulnerable.

The fifth site ran under its own system user. It was probed. It was untouched. Same server, same attacker, same ten days — the only difference was a user boundary.

That is the entire argument for isolation, delivered as a controlled experiment nobody wanted to run. A single-site vulnerability became a four-site credential exposure purely because of how the hosting was laid out.

It's worth being precise about the limit too: the attacker ran as the web user, never as root. SSH authentication logs across the full window show the exploit never authenticated to SSH at all, and there was no root-owned persistence — no cron, no SUID binaries, no keys. The blast radius was bounded by the web-application layer. It was just a *wider* web-application layer than it needed to be.

## Three numbers

Strip out the technique and the incident reduces to three durations, each of which is a separate failure:

**46 days** — how long the patch had been public before the compromise. Automatic updates were disabled across all sites. This is the primary cause and the cheapest possible fix.

**10.3 days** — dwell time. Nothing detected an unauthenticated administrator account appearing, a plugin directory named after random hex, or a backdoor being invoked **7,174 times**. Detection came from outside, via a search engine, six days after the spam payload was even planted.

**~10 days** — log retention. Shorter than the dwell time. This is the quiet one, and the one people get wrong most often: *your retention window has to be longer than a realistic dwell time, or your logs will expire before you know you need them.* Ten days of retention means that any incident lasting longer than ten days is, by construction, uninvestigable from logs alone.

## What I'd tell anyone running WordPress

The specific exploit will be irrelevant within a year. The shape of it won't be.

- **Turn on automatic Core updates and then verify they ran.** Not "we have a patching process." Check that a site actually moved versions. The failure mode here was auto-updates being off and nobody noticing for 46 days.
- **One system user per site. Always.** This is the single change that would have converted a four-site credential exposure into a one-site incident. It costs nothing at setup time and is painful to retrofit.
- **Make retention longer than plausible dwell time.** Sixty to ninety days. Attackers who get in quietly stay for weeks, and a ten-day window guarantees you'll be investigating a crime scene that has already been swept.
- **Alert on administrator account creation.** It is a rare, high-signal, trivially-monitored event. It would have cut ten days down to minutes here, and it is perhaps thirty minutes of work to wire up.
- **Take dev sites off the public internet.** The staging copy took roughly 1,470 exploit attempts during the same window. It happened not to succeed. That's luck, not architecture.
- **Preserve before you clean.** Copy logs, database, and file timestamps off the host *first*, hash them, and only then remediate.
- **When personal data is in scope, the technical report is not the last word.** Confirmed unauthorised access to systems holding personal data may trigger notification duties under [GDPR Articles 33 and 34](https://eur-lex.europa.eu/eli/reg/2016/679/oj), and the threshold is generally *reasonable likelihood* of access, not proof of exfiltration. Demonstrated shell access with database-read capability is material to that test. That determination belongs to counsel, not to the engineer who did the forensics — but it is the engineer's job to hand over the facts that make the assessment possible, and to be honest about what the logs cannot rule out.

## The uncomfortable part

I can tell you exactly what the attacker did, because the database kept a receipt. I can tell you what they were *capable* of reading — four site databases, including contact-form submissions — because the shell had that access for ten days.

What I cannot tell you is what they actually read. The access logs don't record request bodies. That data is simply gone, and no amount of forensic care recovers it.

So the report says so, in those words, and separates *Confirmed* from *Assessed* on every finding. There is a real temptation in incident response to let a confident tone paper over a gap in the evidence, because a client in a bad week wants certainty. Giving it to them when you don't have it is how a technical report ends up misleading a legal decision downstream.

Containment took less than a day once we knew. Finding out took ten, and we only found out because a search engine told on us.

Boring, verifiable defence beats clever reaction. It usually does.
