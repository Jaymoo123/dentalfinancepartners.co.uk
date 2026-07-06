# Medical Lead Paradox (battery step B5)

Site: www.medicalaccounts.co.uk (site_key `medical`). Written 2026-07-06 by B5 (Opus). Curated verdict; raw data in `.cache/medical_diag/lead_attribution.json` + `.cache/medical_diag/lead_context.json`.

**DATA-TRUST HEADER.** GSC exists ONLY 2026-04-01 to 2026-07-04 (API-confirmed empty before April; the site earned zero impressions, real not auth). Windows: pre = Apr 1-May 19 (thin), mig = May 20-Jun 17 (all 46 legacy canonicals pointed at the phantom domain medicalaccountantsuk.co.uk until fixed Jun 17), post = Jun 18-Jul 4. Bing snapshots 2026-06-03 to 2026-07-06 (rolling aggregates; matched-window only). **web_sessions data for medical only exists 2026-06-11 to 2026-07-06 (~25 days)**, so 30/60/90d session counts are IDENTICAL and the 2 April leads have NO session (they predate tracking). Absolute counts beside every rate; rates with denominator < 20 are suppressed.

Headline: medical has **7 leads TOTAL**. The converting surface is overwhelmingly the **homepage** (4 of 5 attributable leads, plus one high-intent GP-partner blog post). The dominant and accelerating channel is **ChatGPT / AI**, not organic search. Bing sends the most search traffic (96 human sessions) and converts **zero**. Leads and traffic are decoupled.

---

## 1. Per-lead table (NO PII)

source_url is the form-SUBMIT page (always /contact); `entry_page` is the true acquisition/landing page.

| # | lead_id (short) | date (UTC) | channel (raw) | true channel | entry (landing) | submit | attribution | country / device | note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 16f25723 | 2026-04-20 | direct | unknown | (no session) | /contact | source_url | -- / -- | pre-tracking; genuinely unattributable |
| 2 | f94c88a4 | 2026-04-27 | direct | unknown | (no session) | /contact | source_url | -- / -- | pre-tracking; genuinely unattributable |
| 3 | 59d752ff | 2026-06-16 | google | google | /blog/becoming-gp-partner-financial-implications | /contact | session | GB / mobile | the ONLY blog-attributed lead |
| 4 | 8c77b3eb | 2026-07-01 | google | google | / | /contact | session | GB / desktop | homepage |
| 5 | e3d370fc | 2026-07-01 | chatgpt | chatgpt | / | /contact | session | GB / desktop | referrer chatgpt.com + utm chatgpt.com |
| 6 | 928e0d22 | 2026-07-04 | direct | **chatgpt** | / | /contact | session | GB / mobile | referrer stripped BUT utm_source=chatgpt.com |
| 7 | 5cac9fe0 | 2026-07-05 | chatgpt | chatgpt | / | /contact | session | GB / desktop | referrer chatgpt.com + utm chatgpt.com |

Two corrections the raw rollup understates:
- **Lead #6 is really ChatGPT, not direct.** Its referrer_host is null (so the SQL CASE fell to 'direct'), but `utm_source = chatgpt.com`. True AI count = 3, true genuine-direct = 2 (the two April leads only).
- **All 5 tracked leads entered on a DIFFERENT page than they submitted on** (entry != submit for 5/5). "Converting page = /contact" is a submit-page artifact. The homepage (and one blog post) are the real acquisition surfaces; /contact is just where the form lives.

---

## 2. Channel + entry rollups (attributed_fraction)

**Attributed fraction: 5 / 7 leads** resolved to a session (attribution_level `session`); the other 2 are `source_url`-only (April, pre-tracking). 0 fully unattributed.

Channel (raw, from the script):

| channel | leads |
|---|---|
| direct | 3 |
| google | 2 |
| chatgpt | 2 |

Channel (corrected for the utm reclass of lead #6):

| true channel | leads | absolute detail |
|---|---|---|
| ChatGPT / AI | **3** | leads #5, #6, #7 (all July, all landed on homepage) |
| Google | 2 | lead #3 (GP-partner blog), lead #4 (homepage) |
| genuine direct (unknowable) | 2 | leads #1, #2 (April, no session) |
| Bing / bing_family | **0** | despite 96 human sessions in 90d |

Entry page (true landing, attributed_fraction beside):

| entry (landing) page | leads | of 7 |
|---|---|---|
| / (homepage) | 4 | 0.57 |
| /blog/becoming-gp-partner-financial-implications | 1 | 0.14 |
| (no session / unknowable) | 2 | 0.29 |

Of the 5 attributable leads, **4 landed on the homepage** and 1 on the GP-partner blog post. Homepage is the conversion engine.

---

## 3. Monthly trend (accelerating, shifting to AI)

| month | leads | mix |
|---|---|---|
| 2026-04 | 2 | direct/unknown (pre-tracking) |
| 2026-05 | 0 | -- |
| 2026-06 | 1 | google -> GP-partner blog (#3) |
| 2026-07 | 4 | **ChatGPT x3** (homepage) + google x1 (homepage) |

The most recent window is decisively **ChatGPT -> homepage**. 3 of the last 4 leads are AI-referred and all 4 July leads landed on the homepage. This is a real mix shift, not noise-in-place: April's leads were untracked direct, the single June lead was Google-to-blog, and July is AI-to-homepage.

---

## 4. Session context and conversion arithmetic

Session window 2026-06-11 to 2026-07-06 (~25 days). Counts identical across 30/60/90d (no earlier session data exists).

- Total sessions 531 · bot 286 · **human 245** · human_confirmed 167 · human GB 142 · human non-GB 103.
- Human sessions by channel (90d): direct 111 (6 carry a chatgpt.com utm) · bing_family **96** · google 22 · referral 11 · chatgpt 3 · copilot 1 · gemini 1.
- ChatGPT-attributable human sessions ~= **9** (3 explicit referrer + 6 direct-with-chatgpt-utm).

Conversion arithmetic (absolute n over n; rates suppressed where denominator < 20):

- **Human GB session -> lead: 5 leads / 142 human GB sessions (~25d) = 3.5%** (numerator 5, small).
- **Homepage: 4 leads from 14 GB homepage sessions** (denominator < 20, rate suppressed, but this is by far the densest converting surface).
- **Bing_family: 0 leads from 96 human sessions.** The single biggest search-traffic channel converts nobody.
- The 2 highest-traffic blog ENTRY pages (gp-partner-vs-salaried 25 human sessions; gp-partnership-tax-complete-guide 21) produced **0 leads each**; the GP-partner-financial-implications post (17 sessions, 14 GB) produced 1.

Dark-AI lens (vw_probable_ai_direct): now `has_rows` (>= 2 Bing snapshots present) but weak, 1 flagged session, 0 with a lead, latest snap 2026-07-06. The utm_source evidence (6 chatgpt-utm sessions inside "direct") is a far stronger AI signal than the impression-uplift heuristic.

---

## 5. Estate lead-source table (does "#2 lead source" survive?)

Full `leads` table, all sites, by count:

| rank | source | leads | first | last |
|---|---|---|---|---|
| 1 | property | **51** | 2026-04-05 | 2026-07-06 |
| 2 | **medical** | **7** | 2026-04-20 | 2026-07-05 |
| 3 | dentists | 5 | 2026-04-20 | 2026-06-29 |
| 4 | generalist | 4 | 2026-06-02 | 2026-06-26 |
| 5 | solicitors | 2 | 2026-05-25 | 2026-07-04 |
| -- | agency | 0 | (absent) | -- |
| -- | contractors-ir35 | 0 | (absent) | -- |

**Verdict on "medical is the estate's #2 lead source": literally TRUE, but brittle.** Medical is #2 by absolute count (7), but (a) it sits 7.3x behind Property (51), (b) it leads #3 dentists by only 2 leads and #4 generalist by 3, so the whole 2-through-5 band (7 / 5 / 4 / 2) is separated by noise-level margins where a single lead reorders positions, and (c) 2 of its 7 are unattributable April leads. More accurate framing: **medical is the strongest of a tight cluster of low-volume sites, far behind Property.** The rank is real; the implied importance ("a big deal") is overstated.

---

## 6. Why the converting surfaces convert (judgment)

### Homepage (`Medical/web/src/app/page.tsx`) - 4 leads

The homepage is a purpose-built conversion page, and every element serves a doctor arriving cold (increasingly from an AI recommendation):
- **Persistent StickyCTA** plus a dual hero CTA: primary "Speak to a medical accountant" (to /contact) and a low-friction lead magnet, "Free practice health check".
- **Specialisation trust wall up front**: "100% medical focus", "50+ doctors", "Fixed fees", "our entire client base is medical". For a visitor who was just told by ChatGPT "use a specialist medical accountant", the first screen confirms exactly that, closing the recommendation loop.
- **Pain-point framing** ("most GPs face avoidable tax complications", NHS pension annual-allowance traps, locum confusion) that mirrors the audience's real anxieties.
- **Segment self-identification** (GP partners / consultants / locums -> /for-* pages) so each visitor sees themselves.
- **Social proof** (TestimonialSlider) and a specialist-vs-generalist comparison table.
- **Multiple /contact CTAs** (hero, how-we-work, get-started) plus an **inline LeadForm** near the foot with reassurance copy ("free and obligation-free", "we respond within one working day", "no hard sell"). All 4 homepage leads navigated on to /contact to submit, so the homepage's job is trust + routing and /contact is the completion step; both matter.

### GP-partner blog post (`.../content/blog/becoming-gp-partner-financial-implications.md`) - 1 lead (Google, mobile, GB)

This is a **trigger-event** page. "Becoming a GP partner: financial implications" is read by someone actively facing a buy-in decision, a moment that essentially forces hiring a specialist accountant. It converts because it is:
- **Genuinely authoritative and current**: Class 4 NIC 6% (2026/27), 55p AMAP mileage, £60k annual-allowance taper with the £200k/£260k thresholds, NHS-goodwill prohibition (SI 2019/251), last-man-standing premises risk. Trustworthy content earns the enquiry.
- **Conversion-wired**: a dense internal-link cluster to sibling GP-partnership guides, and a direct in-body /contact CTA ("Get in touch with our medical-accounting team to talk through your own move before you commit") exactly where a decision-stage reader wants it.

### What the ChatGPT leads landed on

All 3 ChatGPT-attributable leads (#5, #6, #7) landed on the **homepage** (`/`), not a blog post. ChatGPT is recommending medicalaccounts.co.uk as a brand/entity; users arrive at the front door, hit the specialisation trust wall, and convert. The AI funnel and the homepage are a matched pair.

---

## 7. Verdict: where medical leads REALLY come from, and what it implies

**Where they come from.** Two acquisition surfaces (homepage 4, one GP-partner blog 1) and, increasingly, one channel (ChatGPT / AI). In the live-tracked window, AI is the #1 lead-driving channel (3 leads), Google #2 (2 leads, one blog + one homepage), genuine direct is only the 2 pre-tracking April leads, and Bing, the largest search-traffic source, converts nobody. Traffic volume does not predict leads: the two busiest blog entry pages and the entire 96-session Bing stream produced zero leads, while a 14-GB-session homepage and one 17-session blog post produced all 5 tracked conversions.

**What to PROTECT (do not touch, these are the working assets):**
1. The **homepage** as-is: its specialisation trust wall, the free-health-check lead magnet, the inline form, and the many /contact CTAs. It converts at a rate no other surface approaches. Any redesign must not dilute the "100% medical / specialist" signalling or thin the CTAs.
2. The **/contact page + LeadForm** completion path (all 7 leads finish here).
3. **ChatGPT visibility.** Whatever makes the brand recommendable to ChatGPT (the specialist positioning + the comprehensive, factually-current blog corpus that AI reads) is now the top lead driver. Protect it before optimising anything that could reduce crawlability or entity clarity.

**What to AMPLIFY (proven, extend it):**
1. **GEO / AI-answer optimisation.** The ChatGPT-to-homepage funnel is the only channel with an accelerating, high-converting trend. This is the highest-ROI growth lever, and it aligns with the estate AI-search program.
2. **Trigger-event, decision-stage blog content** like the GP-partnership cluster (becoming a partner, buy-in, last-man-standing, salaried-vs-partner). Life-event topics that force an accountant decision convert; generic informational posts do not. Ensure each such post carries the same in-body /contact CTA that the GP-partner post has.

**What to INVESTIGATE (the paradox's loss leaders):**
1. **Bing: 96 human sessions, 0 leads.** Either wrong-intent traffic or a conversion-path failure on the blog entries Bing feeds. Worth a look, but note Bing traffic may simply be lower-intent; do not assume a bug.
2. **High-traffic non-converting blog posts** (gp-partner-vs-salaried 25 sessions, gp-partnership-tax-complete-guide 21 sessions, 0 leads each) lack the homepage's trust + CTA density. Adding a stronger, decision-stage CTA block to the highest-traffic posts is a low-risk test.

**Does "#2 lead source" survive absolute-count scrutiny?** Yes literally (7 leads, rank 2 of 7 sites), but it is a #2 that is 7.3x behind Property and only 2 leads clear of #3. It is the best of a low-volume cluster, not a major channel. Treat the 7-lead base as small and the recent AI-to-homepage shift as the signal worth acting on.

---

## Schema summary (return payload)

- **total_leads: 7** (medical). attributed_fraction 5/7 (2 April leads pre-session-tracking, unattributable).
- **true channel: ChatGPT/AI 3 · Google 2 · genuine-direct 2 · Bing 0** (raw script said direct 3 / google 2 / chatgpt 2; lead #6 is really ChatGPT via utm_source).
- **entry surfaces: homepage 4 · GP-partner blog 1 · unknown 2.** All 7 submit on /contact (submit-page artifact).
- **monthly: Apr 2, May 0, Jun 1, Jul 4** (July = 3 ChatGPT + 1 Google, all homepage).
- **estate table: property 51 · medical 7 · dentists 5 · generalist 4 · solicitors 2 · agency 0 · contractors-ir35 0.** "#2 lead source" = literally true, brittle (2 leads clear of #3, 7.3x behind #1).
- **sessions (~25d live window): 531 total, 245 human, 142 human GB; by channel bing_family 96 / direct 111 (6 chatgpt-utm) / google 22 / chatgpt 3.** Conversion: 5 leads / 142 human GB sessions = 3.5%; homepage 4 leads / 14 GB sessions (rate suppressed); Bing 0 / 96.
- artifacts: `.cache/medical_diag/lead_attribution.json`, `.cache/medical_diag/lead_context.json`. doc: `docs/medical/lead_paradox.md`.
