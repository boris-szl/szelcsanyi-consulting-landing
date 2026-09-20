---
title: Pricing cyber risk in euros, not traffic lights
date: 2026-09-14
excerpt: I spent this year building Nisura — a European cyber risk quantification engine. Here are the modelling decisions that mattered, including the one I argued about with myself for weeks.
seoDescription: >-
  Building a European cyber risk quantification engine: why CVSS ranks the wrong things, and why US insurance loss models do not convert into euros.
tags: Security, Cyber Risk, NIS2, Product
readingTime: 8 min read
firstHand: true
keyPoints:
  - >-
      Ranking vulnerabilities by CVSS severity sorts by theoretical worst case; ranking on exploitation evidence (CISA KEV, EPSS, SSVC) inverts much of that order.
  - >-
      US insurance claims models do not convert to euros: they are bounded by policy limits and built on US labour costs and margins.
  - >-
      Controls such as MFA reduce the probability of a breach; resilience such as tested backups reduces the cost when one happens. Collapsing both into one score destroys the distinction.
  - >-
      The output is a loss-exceedance curve rather than a single figure, because a point estimate invites exactly the false precision that heatmaps are criticised for.
  - >-
      NIS2 Article 21 requires ongoing risk management, and Article 34 caps fines for essential entities at EUR 10 million or 2% of worldwide turnover.
sources:
  - title: Known Exploited Vulnerabilities (KEV) Catalog
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    publisher: CISA
    note: The authoritative list of vulnerabilities with confirmed in-the-wild exploitation, used here as the first ranking signal ahead of severity.
  - title: EPSS — Exploit Prediction Scoring System
    url: https://www.first.org/epss/
    publisher: FIRST
    note: Daily probability estimates that a vulnerability will be exploited in the next 30 days.
  - title: CVSS — Common Vulnerability Scoring System
    url: https://www.first.org/cvss/
    publisher: FIRST
    note: The severity standard the post argues is necessary but insufficient for deciding what to fix first.
  - title: Stakeholder-Specific Vulnerability Categorization (SSVC)
    url: https://www.cisa.gov/stakeholder-specific-vulnerability-categorization-ssvc
    publisher: CISA
    note: The decision tree behind the Track / Track* / Attend / Act outcomes.
  - title: "Directive (EU) 2022/2555 (NIS2) — Article 21: cybersecurity risk-management measures"
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
    publisher: EUR-Lex
    note: Article 21(2)(g) covers basic cyber hygiene practices and cybersecurity training; Article 34 sets the maximum administrative fine for essential entities at at least EUR 10 000 000 or 2% of total worldwide annual turnover, whichever is higher.
  - title: Regulation (EU) 2022/2554 (DORA)
    url: https://eur-lex.europa.eu/eli/reg/2022/2554/oj
    publisher: EUR-Lex
    note: The separate digital-operational-resilience regime applying to financial entities.
  - title: Regulation (EU) 2016/679 (GDPR)
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
    publisher: EUR-Lex
    note: Statutory penalty caps computed on a different basis from NIS2.
  - title: European Vulnerability Database (EUVD)
    url: https://euvd.enisa.europa.eu/
    publisher: ENISA
    note: The EU vulnerability source used alongside the American feeds.
  - title: Labour costs statistics
    url: https://ec.europa.eu/eurostat/web/labour-market/information-data/labour-costs
    publisher: Eurostat
    note: Hourly labour cost data underpinning the downtime-cost model.
  - title: NACE — statistical classification of economic activities
    url: https://ec.europa.eu/eurostat/web/nace
    publisher: Eurostat
    note: The sector taxonomy NIS2 itself uses to scope entities.
  - title: Current data — margins by sector (Europe)
    url: https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html
    publisher: Aswath Damodaran, NYU Stern
    note: Operating-margin data by sector used for business-interruption modelling.
  - title: Factor Analysis of Information Risk (FAIR)
    url: https://www.fairinstitute.org/
    publisher: FAIR Institute
    note: The quantitative risk framework behind decomposing loss into event frequency and magnitude.
---

Every board I have sat in front of has been shown the same artefact: a grid of red, amber and green squares. Someone walks through it, everyone nods, and the meeting moves on. Then the CFO asks the only question that actually matters — *how much money is this costing us, and how much would fixing it save?* — and the room goes quiet.

That silence is the reason [Nisura](https://nisura.eu) exists. It is a cyber risk quantification engine built for the European market: it maps your external attack surface, and resolves it into a euro figure your board can weigh against the cost of controls. This post is about the modelling decisions underneath that, including the one I got wrong first.

## Severity is not the same as danger

The instinct when you start is to rank by CVSS. It is the score everyone knows, it ships with every advisory, and it is right there in the feed. It is also close to useless for deciding what to fix on Monday.

CVSS answers *how bad would this be if someone exploited it.* It says nothing about whether anyone is actually doing so. The consequence is a queue sorted by theoretical worst case, where a 9.8 nobody has ever weaponised sits above a 7.5 that three ransomware crews are running today.

So the engine ranks on exploitation evidence instead — CISA's Known Exploited Vulnerabilities catalogue, EPSS probability scores from FIRST, and CISA-ADP's SSVC decision points (Act / Attend / Track). Combine those and the ordering inverts in a way that looks wrong until you sit with it:

> A 2022 Zyxel command-injection flaw at 100% EPSS outranks a 2026 VMware path traversal at 46%. The old one is proven, packaged, and in active use. The new one is a press release.

Ransomware groups are not researchers. They reuse what already works against exposed edge devices — VPN concentrators, file-transfer appliances, mail servers. Age is not a proxy for safety, and novelty is not a proxy for danger. Rank by what is being used, not by what could theoretically be worst.

## The American model does not convert

This is the decision I spent the longest on, and my first instinct was wrong.

The mature loss models in this space are built on US insurance claims data. It is genuinely good data — decades of it, actuarially sound, far richer than anything comparable in Europe. My initial plan was to use it and convert the output to euros.

That does not work, and the reason is not the exchange rate.

A claims-based model inherits the shape of the policies behind it. It is bounded by what insurers agreed to pay, which means it silently caps your risk at the policy limit and excludes the parts that hurt most — deductibles, customer churn, reputational damage, IP loss, the eighteen months of deferred roadmap after an incident. You are not measuring your exposure. You are measuring someone's willingness to underwrite a slice of it.

On top of that, the inputs are wrong for European operations. Downtime cost is a function of labour cost, and labour cost in Austria is not labour cost in Texas. Business interruption depends on operating margin by sector, and European margins differ structurally. Regulatory exposure is not a rounding error here — NIS2 and GDPR have statutory caps that are computed differently, and DORA applies to an entirely separate population of firms.

So the engine is built the other way around: Eurostat labour indices, Damodaran-Europe margin data, the NACE sector taxonomy that NIS2 itself uses, and ENISA's EUVD as a first-class vulnerability source alongside the American feeds. The threat intelligence is global, because attackers are. The loss model is European, because the losses are.

This is also the part that is hardest to copy. Anyone can plug into the same public feeds — they are table stakes. Building the European cost model is the slow, unglamorous work that actually differentiates the output.

## Likelihood and impact are different levers

The second modelling decision was separating two things most tools blur together.

Multi-factor auth on external access changes the *probability* of a breach. Tested offline backups do not — they change what it *costs you* when it happens anyway. Those are different mathematical operations, and collapsing them into one "security score" destroys the information a decision-maker needs.

So controls and resilience are modelled as separate tiers:

- **Controls** — MFA, EDR, rapid patching, segmentation, no exposed RDP — reduce modelled breach likelihood.
- **Resilience** — immutable backups, a tested IR retainer, a rehearsed DR plan — reduce recoverable loss.

The practical payoff is that a CISO can see, before spending anything, which lever moves their number further. Sometimes the answer is a €40k control. Often it is a backup restore drill that costs a weekend. A single blended score can never tell you that.

The expected annual loss is then the obvious thing — the sum of event probability times financial loss across modelled scenarios — surfaced as a loss-exceedance curve rather than one number, because the tail is where the interesting decisions live. Expected annual loss tells you what to budget. Probable maximum loss tells you what could end the company. Those deserve separate lines.

## What NIS2 Article 21 actually asks for

There is a lot of noise about NIS2, most of it selling fear about the €10M cap and personal liability for executives. Both are real. Neither is the useful part.

The useful part is that Article 21 requires *ongoing* risk management and supply-chain assessment, and 21(2)(g) requires evidence of security-awareness training. "Ongoing" is the load-bearing word. An annual penetration test is obsolete the moment it is printed, and a vendor questionnaire is a self-assessment that nobody verifies. Neither survives contact with an auditor asking what your posture was in March.

Continuous external monitoring produces something a point-in-time audit structurally cannot: a timestamped, verifiable record of what your exposure was, when, and what you did about it. That is the compliance artefact — not a certificate, a history.

The same logic pushed human risk into the model. Authorised phishing simulations against your own staff produce a real click rate, which becomes a factor on the credential-access vector rather than a separate report nobody reads. Aggregate only, no credential ever captured, gated behind signed authorisation and a works-council sign-off in Austria and Germany. That last constraint is not a nice-to-have here — get it wrong and you have created a labour-law problem while trying to solve a security one.

## The part that keeps me honest

The obvious failure mode of this entire category is false precision. A figure like *1.250.400 €* reads as though someone counted it. Nobody counted it. It is the output of a probabilistic model with real uncertainty in every input, and presenting it as a hard number invites exactly the over-confidence that heatmaps are criticised for.

I have not fully solved that tension. The mitigations so far are showing the curve rather than the point estimate, keeping the assumptions inspectable, citing the sources for every cost baseline, and being explicit that this is a decision aid and not an audit or an underwriting opinion. The honest framing is that the number is not *correct* — it is *defensible*, and it is wrong in a direction you can inspect and argue with. That is a real improvement on amber, but it is not the same as truth.

The other constraint I set early was that the free assessment sends no packets at your infrastructure. Passive OSINT only, no login, no agents. Partly that is a trust question — asking permission to scan before you have earned any is a bad first interaction. Mostly it is that the alternative requires an authorisation conversation that the tool has not yet given anyone a reason to have.

## What I would tell someone starting this

Build the cost model before the scanner. The feeds are commodity and the scanning is solved; the thing that makes the output meaningful is the boring economic modelling underneath, and it takes far longer than you plan for.

And resist the score. Every conversation will push you toward one number, one grade, one colour, because that is what people are used to being handed. The entire value is in refusing — keeping likelihood separate from impact, uncertainty visible, and assumptions inspectable — so that when someone disagrees with the output, they can point at *which* input they think is wrong.

That argument is the product working. A heatmap never gave anyone something specific enough to argue with.
