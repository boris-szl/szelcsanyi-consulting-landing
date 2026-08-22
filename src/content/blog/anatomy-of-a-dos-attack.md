---
title: Six hours to mitigate a DoS — a connection-flood post-mortem
date: 2026-05-16
excerpt: An unprotected origin server took a sustained flood on port 443 until its file descriptors ran out. Here is how we diagnosed it, stopped it in an afternoon, and why it was avoidable.
tags: Security, Incident Response, DevOps
readingTime: 8 min read
---

*This is a sanitised write-up of a real incident I handled. The client, IP addresses, hostnames, and other identifying details have been removed or generalised — it is shared purely for the technical lessons.*

One morning a client's website — a marketing site running on a single cloud VPS — went dark over HTTPS. Not slow. Gone. `curl` returned `HTTP 000`; the browser just spun. Plain HTTP on port 80 still answered instantly, SSH was fine, and the box responded to ping the whole time. That split — everything healthy except 443 — is the fingerprint of a specific kind of attack, and it tells you where to look.

By the end of the afternoon it was fully mitigated. Here's the anatomy.

## What actually happened

The server was hit with a **connection flood on port 443**. The attacker opened TLS connections as fast as it could and never sent a complete HTTP request — just enough to make nginx accept the socket and reserve a file descriptor for it. Multiply that by thousands of connections per second and you exhaust the one resource nobody thinks about until it's gone: **open file descriptors**.

Once the OS limit was hit, nginx could no longer accept *any* new connection — attacker or legitimate visitor alike. The site was effectively offline for HTTPS while the process sat there pinned, unable to make progress.

## The evidence

The story was written plainly in the logs — if you knew which log to read.

The nginx **error** log was full of the same two lines, tens of thousands of times:

```text
accept4() failed (24: Too many open files)
1024 worker_connections are not enough, reusing connections
```

The nginx **access** log, meanwhile, was **completely empty** for the same window. That's the giveaway: connections never reached the HTTP layer. They died at accept/TLS, so there was nothing to log as a request. If you only watch access logs and request-rate dashboards, an attack like this is invisible — the requests you'd count never happen.

The host metrics corroborated it:

- **CPU:** pinned at 100–150% (spikes past 200%) for hours, versus ~5% at rest. TLS handshakes are the most expensive thing an HTTPS server does, and the attacker was forcing a firehose of them.
- **Packets in:** ~8,000–10,000 pps, at only ~1 MB/s. That ratio — high packet count, low bandwidth, ~100-byte average packet — screams *connection-establishment traffic*, not real payloads.
- **Port 80:** answered a 301 redirect in 0.08s throughout. **Port 443:** dead.

No sign of data exfiltration or compromise. This was pure resource exhaustion — a denial of service, nothing more, but nothing less.

## The root cause (it wasn't the attacker)

Attacks like this succeed or fail based on what you did *before* they arrive. Here, the origin server had been stood up by a third party without any of the basics:

- **The origin IP was directly reachable.** No reverse proxy, no CDN in front. The public IP was resolvable via DNS and even exposed through the host's reverse-DNS record, so the attacker could aim straight at the machine and bypass any name-based defence entirely.
- **No firewall to speak of.** Port 443 accepted connections from the entire internet.
- **nginx was tuned for a toy load.** `worker_connections` sat at the default `1024`, and `worker_rlimit_nofile` was never raised — so the file-descriptor ceiling was low and easy to hit.
- **No packet-level logging.** Which made forensics after the fact much harder than it needed to be.

The uncomfortable takeaway: the site was set up by a marketing agency, with no security review. That's the real vulnerability — **letting whoever builds the site also own its security posture, with no one accountable for hardening.**

## The fix

The mitigation was a layered move: hide the origin, then only let the shield talk to it.

1. **Put a reverse proxy in front (Cloudflare).** Every DNS record for the domain was switched to *proxied*, so all traffic now flows through the CDN's global network. TLS terminates on their edge, not on the origin — and, crucially, **the real server IP is no longer visible** to the outside world.
2. **Firewall the origin down to the CDN's IP ranges.** At the host firewall, ports 443 and 80 were restricted to *only* the proxy's published IP ranges (a handful of IPv4 and IPv6 CIDR blocks). Every other connection attempt to 443 is now dropped at the network edge before it ever reaches nginx. This single rule is what dropped attack traffic to near-zero.
3. **Move DNS authority to the proxy** to unlock its caching, WAF, and DDoS features end-to-end.
4. **Turn on "Under Attack" mode** — a JavaScript challenge that filters out automated scripts and bots while letting real visitors through after a brief interstitial.
5. **Add packet-level logging** (an `iptables` log rule on 443, persisted across reboots) so the next incident starts with evidence instead of guesswork.
6. **File abuse reports** with the hosting providers the traffic originated from.

Within minutes of the firewall rule landing, CPU fell back to idle and inbound packets dropped to essentially zero. The host graphs confirmed the mitigation cleanly: a wall of load, then flat.

## What I'd tell anyone running an origin server

The specific attack matters less than the pattern. Five things would have prevented or blunted this entirely:

- **Never expose your origin IP.** Put a CDN/proxy in front from day one, and treat the origin IP as a secret. Most of these attacks evaporate the moment the attacker can't find the machine.
- **Firewall the origin to your proxy's ranges only.** A CDN in front does nothing if the attacker can still hit the naked IP directly. Lock 80/443 to the proxy's CIDRs — this is the rule that did the heavy lifting here.
- **Tune for the failure mode, not the demo.** Raise `worker_connections` (4096+) and `worker_rlimit_nofile` so file-descriptor exhaustion isn't a one-shot kill.
- **Watch the right signal.** Request-rate dashboards won't show a connection flood — the requests never complete. Watch connection counts, packets-per-second, CPU, and *error* logs.
- **Put security ownership somewhere accountable.** Whoever builds the site should not be the last word on how it's defended. A short hardening review before go-live would have closed every gap above.

The attack was resolved in about six hours, most of which was diagnosis and setting up the shield correctly. The mitigation itself — origin hidden, firewall scoped to the proxy — is now permanent. As long as the origin IP stays out of public view and the proxy stays on, the same attack simply has nowhere to land.

Boring, layered defence beats clever reaction. It usually does.
