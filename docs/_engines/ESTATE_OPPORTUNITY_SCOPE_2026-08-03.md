# Estate opportunity scope — 2026-08-03

> **SUPERSEDED 2026-08-14 in part.** The commercial figures here describe the named-partner era (leads sold to DJH at a flat fee, a Haines Watts Option B trial at £150 per selected lead, capped at 15 leads or 3 months). None of that is the current model: see `docs/LEAD_PRICING.md` for the case-type card and the claim model. The strategic analysis is still useful; the deal terms are history.

Scoping pass across the whole estate: what is open to us right now, on existing sites, on
new sites, and per site. Written for a decision, not for execution. Nothing here was built
or changed by this pass.

Data in this doc is a **fresh pull taken 2026-08-03**, not a stored snapshot:

- Google Search Console, 28-day date-only totals (unsampled), all 15 registered properties.
- Google Search Console, 28-day query-level pull for the striking-distance table. Query-level
  rows exclude anonymised queries, so they undercount site totals by roughly 5-20x. Use them
  for **shape**, never for totals.
- Bing Webmaster Tools per-site aggregates. **Caveat: BWT's GetQueryStats returns its own
  rolling window, not 28 days.** Bing figures are NOT directly comparable with the Google
  column and must not be added to it.
- Supabase `leads` (estate project `dhlxwmvmkrfnmcgjbntk`), test rows excluded.

---

## 1. Where the estate actually is

### Search visibility, 28 days to 2026-08-03 (Google)

| Site | Clicks | Impressions | CTR | Bing clicks (rolling) | Leads 30d |
|---|---:|---:|---:|---:|---:|
| property | 753 | 69,325 | 1.09% | 673 | 63 |
| solicitors | 246 | 14,515 | 1.69% | 303 | 2 |
| dentists | 95 | 7,057 | 1.35% | 158 | 2 |
| generalist | 75 | 17,566 | 0.43% | 285 | 4 |
| construction-cis | 51 | 6,231 | 0.82% | 35 | 0 |
| medical | 41 | 2,777 | 1.48% | 160 | 7 |
| agency | 5 | 1,869 | 0.27% | 32 | 0 |
| charities | 5 | 2,632 | 0.19% | no data | 0 |
| care | 3 | 871 | 0.34% | no data | 1 |
| contractors-ir35 | 3 | 1,155 | 0.26% | 0 | 1 |
| crypto | 3 | 164 | 1.83% | no data | 0 |
| startups-tech | 2 | 1,119 | 0.18% | no data | 1 |
| pharmacies | 1 | 316 | 0.32% | no data | 0 |
| ecommerce | 1 | 953 | 0.10% | no data | 0 |
| hospitality | 0 | 475 | 0.00% | no data | 0 |
| **Estate** | **1,039** | **127,025** | **0.82%** | 1,646 | **81** |

### Leads

| Month | Leads |
|---|---:|
| 2026-04 | 5 |
| 2026-05 | 12 |
| 2026-06 | 40 |
| 2026-07 | 83 |
| 2026-08 (3 days) | 7 |

Property is 63 of the last 81 leads (78%). Lead volume roughly doubled month over month
since April and August is tracking at a similar run rate.

### Three facts that frame everything below

1. **The estate is seen 127,000 times a month and clicked 1,039 times.** The bottleneck is
   not content volume. It is position: outside Property, almost the entire visible query
   corpus sits at position 21+.
2. **Property is the only site converting at scale**, at roughly 8.4 leads per 100 Google
   clicks. Solicitors, with a third of Property's Google clicks, produces 2 leads a month.
3. **We are selling roughly one lead in six that we generate.** July invoice DJH-002 bills
   11 Property leads at £85. Property produced ~60 in the same window.

---

## 2. Tier 1 — already built, not earning

These cost nothing more to build. They are gated on a release decision, not on work.

### O1. Ship the 100-page finance/tax expansion

Built, QA'd, committed on `expansion/phase-0`, **8 commits unpushed and nothing deployed.**
Verified live today: `/blog/property-finance` 404, `/calculators/bridging-loan-calculator`
404, generalist `/blog/business-finance` 404.

| Cluster | Host | Pages | Calcs |
|---|---|---:|---:|
| Specialist tax | property | 15 | 2 |
| Landlord finance (Track B Tier 1) | property | 34 | 5 |
| Business finance | generalist | 25 | 2 |
| Exit / succession | generalist | 18 | 2 |
| Dental practice finance | dentists | 8 | 0 |
| **Total** | | **100** | **11** |

Open gates: owner push + deploy; solicitor sign-off on the Cluster-1 CTA wording; a veto
window on the new "Property Finance" category name; a business-finance broker principal for
the eventual lead flow.

**The sign-offs only gate the CTAs, not the pages.** The content and the calculators are
already compliant as educational material with tax/accounting CTAs. Shipping the corpus now
and arming finance CTAs later is available and is the obvious split.

### O2. Sell the Property leads we already have

This is the largest gap between what exists and what earns.

- Supply: ~63 Property leads per 30 days, rising.
- Sold: 11 in July, at £85, to DJH. DJH's exclusivity has ended / is being varied.
- Haines Watts (Shazin Tayub) has an agreed Option B trial: £150 per selected lead, capped
  at the earlier of 15 selected leads or 3 months. Even fully taken up, that is ~5 leads a
  month.
- Roughly 45-50 leads a month currently go unsold. At £85-150 that is **£3,800-£7,500 a
  month of already-generated supply**.

The machinery to fix this is already built and is not being used:

- `legal/DSA_TEMPLATE.md` is now a standing, firm-agnostic, Supplier-pre-signed Data Sharing
  Agreement. Onboarding a new buyer is send-one-file, no redraft.
- The site is already firm-agnostic ("a firm from our specialist partner network"), so
  multiple buyers can run in parallel without renaming anything.
- Category routing is live, so leads can be split by category across buyers.

Open: solicitor review of the DSA + LIA + form as a set before signing anyone new; DJH→HW
swap decision; whether to send Shazin the pure DSA or the combined doc. Also ~16 back-office
files still hardcode "DJH" as the forward destination — internal only, but it will bite on
any partner switch.

### O3. Launch wills-probate

123 posts, 7 calculators, 2 research assets, 4 content waves, all committed. Site is held by
the owner, not blocked technically.

Clear before launch: audit and Opus-rewrite the Fable-generated posts (wave-3 batch 2 and
the uncommitted `how-much-does-it-cost-to-make-a-will.md`), which breach the Opus-only
content rule; apply migration `20260724000001`; create the Vercel project; G1 brand/domain
decision.

### O4. Launch divorce-finances

17 posts, 5 calculators, 2 research assets, 4 pillars, 3 commercial hubs. Owner GO'd deploy
on 2026-07-28. Open: the systemic missing-HTML-table backfill (config rule 6, the writer
batch skipped it site-wide); Phase 6 infra; the `aux-cron.ts:229` "our specialists will ring"
wording, which implies in-house and needs partner-firm framing.

### O5. Launch the Ashfield parent site

19 routes built and committed since 2026-07-23. Its two products are *rent-a-site* and
*buy-leads*. That makes it the shopfront O2 currently lacks: right now there is no page a
prospective lead buyer can be sent to. Open: domain not bought, Vercel project not created,
DB migration not applied, indicative pricing still placeholder.

### O6. Arm the nurture stack

Full Property conversion stack (multistep forms, booking, progressive completion, email
nurture) is ported and dormant on all six non-Property sites. `LEAD_NURTURE_ENABLED` is
unset. Migrations are applied, control rows exist per site. This is an env flip plus a
would-send log review, not a build.

---

## 3. Tier 2 — traffic exists, leads do not

Leads per 100 Google clicks, 28d clicks against 30d leads (some leads arrive from Bing, so
treat as directional):

| Site | Google clicks | Leads | Per 100 |
|---|---:|---:|---:|
| medical | 41 | 7 | 17.1 |
| property | 753 | 63 | 8.4 |
| generalist | 75 | 4 | 5.3 |
| dentists | 95 | 2 | 2.1 |
| solicitors | 246 | 2 | 0.8 |
| construction-cis | 51 | 0 | 0 |

**Solicitors is the single clearest conversion target in the estate.** It has the second
highest traffic of any site and converts at a tenth of Property's rate. CRO detectors already
localised it: 977 engaged sessions → 15 calculator uses → 1 lead. At even half Property's
rate it would produce ~10 leads a month from traffic it already has.

Construction-cis is the second: real traffic, zero leads, ever.

Medical converting at 17 per 100 is worth reading carefully rather than celebrating: the
denominator is 41 clicks. It says the site converts when found, which strengthens the case
that Medical's problem is purely indexation (below), not the offer.

---

## 4. Tier 3 — ranking and visibility

Position distribution, from the query-level 28-day pull (impressions by band; undercounts
totals, use for shape):

| Site | p1-3 | p4-10 | p11-20 | p21+ |
|---|---:|---:|---:|---:|
| property | 874 | 4,969 | 2,277 | 5,213 |
| generalist | 26 | 61 | 969 | 6,649 |
| dentists | 72 | 149 | 598 | 1,359 |
| solicitors | 56 | 152 | 270 | 1,572 |
| construction-cis | 20 | 146 | 411 | 843 |
| medical | 21 | 29 | 55 | 1,441 |
| charities | 0 | 3 | 24 | 1,758 |
| agency | 6 | 7 | 8 | 959 |
| everything else | 0 | ~53 | ~161 | ~2,565 |

Property holds essentially all of the estate's page-1 real estate. Every other site is a
position-21+ site with a small tail. That is an authority and indexation profile, not a
content profile, and it matches the two standing diagnoses (agency 18/433 indexed, medical
~11/117 indexed).

### O7. Striking-distance pages (fastest ranking wins)

Queries at position 4-20 with real impressions and near-zero clicks:

- **property / SA105 cluster** — `sa105` 263 impressions at pos 7.8 with 0 clicks,
  `sa105 form 2026` 160 at pos 4.2, `sa105 form` 104 at pos 10.2, `sa105 notes` 91 at pos 7.9.
  That is ~620 impressions a month on one form-name intent with almost no page dedicated to it.
- **property / NRL and CGT reporting** — `nrl quarterly return` 104 at pos 5.8, 0 clicks;
  `hmrc cgt reporting deadlines 2026` 194 at pos 16.
- **construction-cis / roofers** — `accountant for roofers` and variants, ~310 impressions
  across three queries at pos 14-17, 0 clicks. A single trade page.
- **dentists / practice sale tax** — `selling a dental practice taxes` family, ~200
  impressions at pos 11-16. Note this is exactly the intent the new dental-finance cluster
  targets, which is another argument for O1.
- **generalist / trader accounting** — `accounting for traders` 166 at pos 15,
  `accountants for forex traders uk` 43 at pos 10.5.

### O8. Off-site authority

The backlink campaign (~17 dofollow links/month) runs on Property only. Property is also the
only site with page-1 mass. That correlation is not proof, but extending the campaign to a
second site is the cheapest available test of whether authority is the binding constraint
estate-wide.

### O9. Cash in the research assets already deployed

20 research pages and 21 supporting posts across 12 sites went live 2026-07-23. The owner's
GSC Request-Indexing list (`docs/_engines/GSC_REQUEST_INDEXING_2026-07-23b.md`) has still not
been actioned. On low-authority domains that manual submit is the difference between indexed
and invisible.

---

## 5. Tier 4 — new sites and new verticals

### O10. Screener candidates never built

The niche screener's all-time league, backtested 9/9:

| Candidate | Score | Status |
|---|---:|---|
| boiler-control | 65.4 | **highest scoring, never built, never discussed** |
| wills-probate | 60.6 | built, held (O3) |
| divorce | 59.9 | built, held (O4) |
| equity-release | 59.6 | unbuilt |
| leasehold | 57.1 | unbuilt |
| older-driver | 56.3 | unbuilt |
| solar | 56.2 | unbuilt |
| buy-to-let (anchor) | 56.1 | our best site |

Every unbuilt candidate above scores at or above the anchor, which is Property. Re-screen
queue: dental-implants, employment-law, insolvency, ev-road-charging, epc-retrofit.

Worth stating plainly: two sites were built off this list and neither has launched. Building
a third before launching the first two would be pushing rope.

### O11. Adjacent-vertical layers on existing audiences

From the 2026-07-30 research, ranked by return over effort, with the regulatory position:

1. Specialist tax (capital allowances, R&D, land remediation) — fully unregulated, highest
   value per lead, no independent lead-gen incumbent, and the estate **already ranks page 1**
   for the core terms. Content built (O1); the open piece is re-routing that existing traffic
   to specialist buyers rather than general accountants.
2. Business finance for limited companies — fully unregulated under RAO Art 36A when the
   borrower is a body corporate, highest CPC in the research (£47-145), exclusive leads
   £50-100. Content built (O1); no buyer secured.
3. Exit / EOT — unregulated advisory; competitor content is stale post the 26-Nov-2025 CGT
   cut. Content built (O1).
4. Landlord commercial finance — 5-10x BTL case value but the promotion is s21-gated, so
   conversion needs an IAR. Content built and deliberately CTA-free (O1).

The pattern across all four: **the content exists, the buyer does not.** Securing one
business-finance principal unlocks three of the four.

### O12. MTD ITSA hub

Proposed in the 2026-07-24 horizon work, never decided. The first mandated deadline is
7 Aug 2026, which is four days away. Whatever the merit, the launch window for the deadline
itself is gone. If it is built it should be built as a durable decision hub, not a deadline
play.

---

## 6. Tier 5 — fix-first, risk and hygiene

### O13. The two indexation walls come due this week

Agency's 28-day read lands ~2026-08-05. The pre-agreed failure test is ≤25 indexed at 28
days, which triggers the authority-wall branch. Medical's early check on 07-17 showed new
posts indexing but every legacy core page still unknown to Google, and MED-F2 (owner Request
Indexing) was never confirmed as actually done. Both need a verdict, not another wave.

### O14. Bing is a live blind spot on six sites

care, charities, crypto, hospitality, pharmacies and startups-tech all returned no Bing data
this pull. Bing is a material channel for this estate (Property 673 clicks, generalist 285,
solicitors 303 on the rolling window), and it is the channel where our pages already rank
well while Google buries them. Six sites are unmeasured on it.

### O15. Crypto is abandoned

19 posts, 3 clicks and 164 impressions in 28 days, no research asset (the only batch-2 site
never built), no entry in the deploy map, and a known stale tax file (`crypto-hubs.ts`) that
was deferred in the 07-20 deploy round because there was no Vercel project to deploy it to.
Either adopt it properly or park it explicitly.

### O16. Residual correctness debt

- FA 2026 sweep: R3 2026/27 year-transition in progress with Property excluded; R5 residue
  and R6 H3 webhook still open; the CGT-on-property cluster is deferred pending sign-off.
- Estate-wide stale 18% WDA sweep on existing Property capital-allowances pages (the new
  cluster is correct at 14%; the old pages may not be).
- Property `landlordTax.ts` carries the income-tax band bug fixed everywhere else, frozen by
  owner decision since 2026-07-18.
- divorce-finances posts systemically missing the mandatory HTML table.

---

## 7. If we only did five things

Ranked by return over effort, using what is already built:

1. **Deploy the 100-page finance corpus** (O1) — content-only now, CTAs after sign-off.
2. **Get a second lead buyer signed** (O2) — ~50 leads a month are being generated and not sold.
3. **Fix Solicitors conversion** (O7 / Tier 2) — second-highest traffic, a tenth of the conversion.
4. **Launch wills-probate and divorce-finances** (O3, O4) — two finished sites earning nothing.
5. **Call the agency and medical indexation verdicts** (O13) — the watch windows expire this week.

Everything in Tier 4 should wait behind those. We do not have a content shortage. We have a
release backlog, a buyer shortage and an authority ceiling.
