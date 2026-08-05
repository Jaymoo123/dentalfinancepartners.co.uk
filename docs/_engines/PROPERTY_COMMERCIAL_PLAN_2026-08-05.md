# Property commercial capture: execution plan, 2026-08-05

Companion to `PROPERTY_CEILING_ANALYSIS_2026-08-05.md` (the measurement) and
`PROPERTY_COMMERCIAL_CAPTURE_SCOPE_2026-08-05.md` (the diagnosis). This document is
the plan: what changes, what gets re-jigged, what gets built new, in what order,
behind which gates.

## Situation in one paragraph

Property is compounding on impressions (11.5k Apr to 77.5k Jul on Google, 15.5k to
67.1k on Bing) and producing 62 leads/month, but it is winning none of the commercial
demand. The homepage earns 42 impressions in 90 days. The head term `property
accountant` (720/mo, £17.55 CPC) is served by a careers article at position 24.8.
`landlord tax` (2,900/mo, the largest term in the UK set) earns zero impressions.
Forty city posts target terms with zero measured search volume, and they cannibalise
the six pages that do matter. Meanwhile 52 of the site's leads enter on informational
blog posts, so the content engine works, it is simply pointed at reference-stage
topics that neither rank well nor convert.

## Governing constraints (from locked estate rules)

These are not negotiable and every phase below is shaped by them:

- **Homepage and all conversion surfaces are FROZEN** (`property_frozen_pages.md`).
  Any homepage change needs an explicit per-page owner sign-off line added to that file.
- **Rewrite-only, never collapse**, with consolidation gated on fresh GSC + Bing +
  guard + **Bing veto** + per-cluster owner approval.
- **Opus writes all content.** Sonnet is banned from blog bodies. Calculators and
  mechanical build slices may be delegated.
- **Voice standard is locked**: second person, no meta-commentary, no SEO-architecture
  talk in prose, no signposting filler, **no em-dashes**. `voice_scan.py` band `clean`
  or `minor` is the floor.
- **Gold-standard A\* bar**: no thin pages. A page that exists only to hold a keyword
  is a violation, which is exactly what most of the 40 city posts are.
- **No named-expert claims, no quotes, no credentials.** Off-site authority stays
  faceless.
- **No phone numbers displayed, no Google Business Profile, ever.**
- **Deploys need owner sign-off.** Auto-commit is off by default.
- **One sub-agent per topic, in parallel** (wave batch size 1).

---

## Phase 0 — Instrument before touching anything (half a day)

Nothing in this plan is measurable without a baseline, and several phases are
reversible only if we know what we broke.

1. **Freeze a baseline snapshot**: commercial-bucket impressions/clicks/CTR by intent
   bucket, Bing totals via `GetRankAndTrafficStats`, per-page Bing via `GetPageStats`,
   AI-referrer sessions and leads, leads by entry path and referrer host. Commit as a
   dated JSON so the 28-day read is a diff, not a re-derivation.
2. **Add the Bing site-total pull to the standard tooling.** `GetQueryStats` must never
   be summed as a total again (see `bing_query_stats_topn_trap`).
3. **Per-page Bing position for all 55 commercial/city posts.** This is the input to the
   Bing veto in Phase 2. Do not schedule a single redirect before this exists.

**Gate:** baseline committed. No content or redirect work starts before this.

---

## Phase 1 — Fix (technical, no content, no approval needed)

### 1.1 Canonicalisation split
Both `www.` and non-www hostnames are indexed (`/locations/leeds` at 805 impressions
www and 140 non-www; also london, manchester). Force one hostname across canonical
tags, `siteConfig.url`, sitemap entries and absolute links; confirm the non-www 301s
at the edge. Re-submit affected URLs via IndexNow.

*Effort: hours. Risk: low. No owner gate. Unblocks Phase 2 by consolidating signal.*

### 1.2 Quarantine the careers/jobs cluster
`how-to-become-property-accountant.md`, `property-accountant-jobs-uk.md`,
`property-accountant-salary-complete-guide.md`. The first is currently the page Google
serves for the head term. These target job seekers, not clients, and actively displace
the commercial pages.

Options in preference order: (a) `noindex` them, (b) move out of the
`property-accountant-services` category so they stop absorbing category relevance.
Recommend (a) plus (b). They are not deleted; they simply stop competing.

*Effort: hours. Risk: low, these produce zero leads. No owner gate (no redirects).*

**Gate:** Phase 1 deployed and verified live before Phase 2 begins, so Phase 2's
measurement is not confounded.

---

## Phase 2 — Re-jig (existing pages, owner-gated)

This is the largest and most sensitive block. It touches 40+ existing pages, so it
runs per-cluster with a sign-off each time, not as one sweep.

### 2.1 Homepage becomes the money page **[FROZEN PAGE — needs sign-off]**
Currently: 42 impressions, 1 click, 10 queries in 90 days; ranks for brand only;
position 82 for `landlord tax accountant`. Title already says "Property Accountants UK"
but nothing else on the page competes.

Target cluster: `property accountant` / `property accountants` / `accountant for
property` (720), `property tax accountant` (210), `specialist property accountant`
(170), `property accountant near me` (170). **~1,270/mo combined.**

Required changes: a genuine commercial body (what you do, for whom, what it costs, why
you), not a link hub; the head term in H1 and opening sentence; service/offer schema;
internal links from the highest-authority informational posts. The existing calculator
embeds and lead form stay, they are the conversion machinery and already work.

**This page is on the frozen list. It needs an explicit sign-off line added to
`property_frozen_pages.md` before any edit.** It is also the single highest-leverage
page in the plan, so it should be the first thing approved, not the last.

### 2.2 Resolve homepage vs `/services` cannibalisation **[gated]**
`/services` currently targets "Property Accountant Services UK | Specialist Tax Advice
for Landlords", i.e. the same head term as the homepage. Two pages competing for one
term is the same defect as the city cluster, at the top of the site.

Decision needed: homepage owns `property accountant`, `/services` narrows to service-
specific intent, or `/services` is folded into the homepage. Recommend the first, as it
preserves a hub for the individual service pages and needs no redirect.

### 2.3 City cluster consolidation **[gated, per cluster, Bing veto applies]**
**40 city posts** exist. The measured volume for these terms is zero
(`property accountants leeds` 0, `landlord tax advice leeds` 0, `rental accountant
leeds` 0, `landlord tax accountant nottingham` 0). Combined they earn ~2,300
impressions and **1 click per 90 days**, and they cannibalise the commercial cluster.

Plan per cluster (start with London: 6 pages, 814 impressions, 0 clicks):
1. Pull per-page Bing position first. **Bing veto: any page performing on Bing is not
   retired**, regardless of Google numbers.
2. Merge the genuinely useful substance into the relevant commercial page.
3. 301 the rest to the commercial page that now owns the intent.
4. Keep `/locations/[slug]` for the five configured cities. It is config-driven, has
   correct `AccountingService` schema, and is not the problem.
5. Measure for 28 days before touching the next cluster.

*Do not expand the location layer. The demand is not there.*

### 2.4 Retire the reference-stage tail (later, low priority)
Form-code and rate-lookup content (`sa105`, `nrl6`, `is230tnrlh1e` and similar) earns
impressions and no clicks or leads because the searcher wants gov.uk. This is not
urgent, but it should stop being counted as headroom, and no more of it should be
commissioned (Phase 4).

Note the tension: `sa105-property-income-form-2026-complete-guide` is on the frozen
list at 37 clicks/90d, so parts of this tail do work. Judge per page on clicks and
leads, never sweep the category.

---

## Phase 3 — New build

### 3.1 Landlord tax hub **[the biggest single opportunity in the plan]**
`landlord tax` = **2,900/mo**, plus `rental property tax` (590) and `property tax
advice` (320). **~3,810/mo combined, currently zero impressions.**

The raw material already exists: `landlord-tax-changes-2026-complete-guide`,
`landlord-tax-deductions-uk-2026-complete-list`, `landlord-tax-return-complete-guide-
2026`, `landlord-tax-calendar-2026-27-key-dates`, `hmrc-penalties-late-landlord-tax-
returns-2026`, `first-time-landlord-tax-guide`. There is no hub tying them together
and nothing targeting the head term itself.

Build a genuine hub page that answers "landlord tax" directly and completely, links
the existing guides as real cross-references (voice standard rule 4: no "pillar" or
"cluster" language in prose), and carries the lead form and relevant calculators.

This is the highest-volume gap found anywhere in the four-country analysis, and it is
in the market where we already hold the domain, the authority and the buyer.

### 3.2 Commercial pages

| Page | Terms | Vol/mo | Status |
|---|---|---:|---|
| Homepage | property accountant cluster | ~1,270 | re-jig, 2.1 |
| Landlord tax hub | landlord tax, rental property tax, property tax advice | ~3,810 | **new**, 3.1 |
| Landlord accountant | landlord accountant (390), accountant for landlords (260), landlord tax accountant (70, £22.02 CPC), near me (70) | ~790 | **new** |
| Property investor | property investment accountant / accountant for property investors (320), investment property accountant (50) | ~370 | **new** |
| Property management | accountant for property management (210, **£26.15 CPC**, highest in set) | 210 | **new** |
| Rental property accountant | rental property accountant (110, £15.24) | 110 | **new** or merge into landlord accountant |

Five new commercial pages plus one hub. Each must clear the A\* bar: a real answer to
a real commercial question, not a keyword container. Opus writes them, one sub-agent
per page, in parallel.

### 3.3 Decide: merge or separate
`rental property accountant` (110) is thin on its own. Recommend merging into the
landlord accountant page unless the SERP shows genuinely different intent. Check before
building, not after.

---

## Phase 4 — Change the content philosophy (the durable fix)

The lead data settles a question that has been argued from intuition:

| Entry page type | Leads |
|---|---:|
| blog (informational) | **52** |
| homepage | 32 |
| other | 14 |
| services | 1 |

Informational content is the primary lead source. The problem is not informational
content, it is **reference-stage** content.

**New commissioning rule: decision-stage only.**

- **Commission**: "I have a decision or a problem, what do I do." Proven performers:
  `how-to-transfer-property-into-limited-company-uk` (8 leads), MTD quarterly
  reporting, penalties for undeclared rental income, Section 24 finance costs, CGT on
  transfer to spouse, buy-to-let limited company guide.
- **Stop commissioning**: form lookups, rate tables, code explainers, "what is X"
  definitional pages. These earn impressions, near-zero CTR on both engines, and no
  leads. The searcher wants gov.uk or is satisfied by the snippet.

This rule should be written into the blog generator brief and the content QA checklist,
not just this document, or it will not survive the next wave.

**Secondary rule: write for answerability.** Bing's queries are long and conversational
(`can uk landlords claim cost of mortgage product fee as an expense`). Question-formed
H2s and direct answer blocks serve Bing, Copilot and the AI assistants simultaneously,
which is Phase 5's delivery mechanism as well.

---

## Phase 5 — Channel programmes

### 5.1 Bing as co-primary
Bing delivers ~2x Google's clicks (1,692 vs 811 in July) and more leads (16 vs 11) at
2.52% vs 1.05% CTR. It has never had a programme.

- Bing position becomes a first-class input to page decisions, not an afterthought.
- Confirm Property is wired to IndexNow and submitting on publish.
- Pull `GetPageStats` per page routinely (already needed for Phase 0/2).

Caveat: Bing's edge is ~2.4x, not the order of magnitude an earlier draft claimed. It
earns equal billing with Google, not sole priority.

### 5.2 AI/GEO programme
ChatGPT produced 4 leads in June and 4 in July from 43 sessions, with zero investment.
Copilot, Perplexity, Claude and Gemini all appear in session referrers.

- Instrument AI referrers as a first-class channel so this is reportable rather than
  reconstructed by hand.
- Wire `GetAiPerformance` for Copilot citation counts (note the ASSUMPTION FLAG in
  `bing_query_client.py`: the method name is inferred and may need correcting).
- Re-check `llms-full.txt` against the new commercial pages once Phase 3 lands.
- The answerability work in Phase 4 is the content side of this; it does not need a
  separate content programme.

---

## Phase 6 — Measure and decide

28 days after each gated release, segmented by intervention date (never raw
before/after). Metrics: commercial-bucket impressions/clicks/CTR, position on the six
target clusters, Bing CTR by position bucket, AI-referrer sessions and leads, leads by
entry path.

**The decision this plan exists to inform:** if commercial capture moves, the same
playbook is worth far more applied to the seven other sites than to a new country. If
it does not move, that is critical evidence to hold *before* committing to a market
where we have no buyer relationship.

---

## Sequencing

```
Phase 0  instrument + baseline            (no gate)
   |
Phase 1  canonical fix + jobs quarantine  (no gate)  <- deploy, verify
   |
Phase 2.1 homepage                        [SIGN-OFF: frozen page]   <- highest leverage
Phase 3.1 landlord tax hub                (new page, no redirect)   <- highest volume
   |     (2.1 and 3.1 can run in parallel; neither blocks the other)
   |
Phase 2.2 homepage vs /services           [decision needed]
Phase 3.2 four new commercial pages       (parallel, one agent each)
   |
Phase 2.3 city consolidation, London first [SIGN-OFF per cluster, Bing veto]
   |     measure 28d before the next cluster
   |
Phase 4  commissioning rule into the brief (do alongside, not after)
Phase 5  Bing + GEO programmes
Phase 6  28-day reads
```

Phases 1, 3.1 and 3.2 add or fix without removing anything, so they carry little risk
and need no consolidation approval. Phase 2.3 is the only genuinely destructive block
and it is deliberately last and slowest.

---

## Risks

1. **Homepage is frozen for a reason.** It is a conversion surface carrying 32 leads.
   Changing it risks live lead flow. Mitigation: sign-off line first, preview-gate,
   manual walk QA, and leave the lead form and calculator embeds untouched.
2. **City consolidation could destroy Bing traffic.** Google says these pages are dead;
   Bing is the better converter and may disagree. Mitigation: the Bing veto, enforced
   with per-page data from Phase 0, before any redirect is written.
3. **`landlord tax` at 2,900/mo may be dominated by SERP features.** Volume is not the
   same as available clicks. Mitigation: pull the SERP composition before building, as
   was done for `property accountant` (which turned out to have no local pack).
4. **Six new commercial pages could become the next cannibalisation problem.** The
   existing mess was created exactly this way. Mitigation: one page owns one cluster,
   documented in the plan above, and the pre-flight slug/keyword audit that already
   exists in the cannibalisation protection layer.
5. **The £17.55 and £26.15 CPCs mean paid competitors are bidding hard.** Organic
   difficulty on these terms is real; page 1 is achievable (competitors are ordinary
   firm sites) but not immediate.
6. **DJH ranks 6th for the head term.** Optimising hard against the lead buyer is a
   commercial question that should be answered before 2.1 ships, not after.

---

## Owner decisions required

1. **Homepage sign-off** to add a per-page exemption line to `property_frozen_pages.md`.
   Blocks the highest-leverage item.
2. **`/services` disposition**: homepage owns the head term and `/services` narrows
   (recommended), or fold `/services` in.
3. **City consolidation approval**, London cluster first, as a single gated release.
4. **DJH at rank 6**: acceptable to compete, or shape the targeting around it.
5. **No-GBP rule**: confirmed to still hold. It does not block `property accountant`
   (no local pack) but caps `landlord accountant` and `accountant for landlords`, which
   both carry a 3-result pack.

---

## AUDIT NOTE (2026-08-05, Fable session)

This document was audited against same-day re-pulls. Verdict: directionally right, materially wrong in specific numbers and two conclusions. Before acting on any figure or conclusion here, read docs/_engines/PROPERTY_ANALYSIS_AUDIT_2026-08-05.md (verdict ledger, 13 decision-changing corrections, corrected fact base) and docs/_engines/PROPERTY_ARCHITECTURE_RECOMMENDATIONS_2026-08-05.md (amended plan). Headline corrections: query-mix CTR argument refuted; Phase 4 reference-content ban refuted; city 301 direction reversed (consolidate within city, never into national pages); city denominator is 19 posts + 5 routes; landlord tax zero is Google-exact only (Bing serves it 1,064 impr / 121 clicks); local pack IS present on property accountant, so no-GBP caps 6 clusters; Bing 6-9% CTR norm unsupported.
