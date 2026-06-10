# Track 2 brief: incorporation-holdover-relief-property

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; INTENT-MISMATCH + CANNIBAL + STALE_FACTS dominant; load-bearing title-level factual error)
**Source markdown path:** `Property/web/content/blog/incorporation-holdover-relief-property.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/incorporation-holdover-relief-property
**Stage 1 priority:** M (near-invisible: 0 GSC / 0 Bing on the slug itself; primary commercial value is owning an un-owned head term `holdover relief property` + the most common landlord confusion, not rescuing existing equity)
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02
**Cannibalisation status:** REWRITE only (rewrite-only mode non-negotiable; no 301). No ranking equity exists in either direction (slug is 0/0; strongest overlapping sibling `cgt-gifting-property-family-members-uk` is 64 impr / pos 70). Collapse would be premature. Sharp re-differentiation into a disambiguation / routing-hub page resolves the overlap.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** **KEPT** as `incorporation-holdover-relief-property`. The slug already carries both head terms a confused landlord types ("incorporation" + "holdover relief" + "property"). The page's liability is not the slug, it is the body/title CONFLATION of two distinct mechanisms. Keeping the slug + recasting the content converts the existing URL into the disambiguation hub without losing the (tiny) crawl history.
- **Category:** `Incorporation & Company Structures` (kept). The page sits correctly at the incorporation/structures decision layer because the dominant query is "can I use holdover to put my portfolio into a company" (an incorporation-intent question that the page answers by routing).
- **Gap-mode tag:** `INTENT-MISMATCH` (primary) + `CANNIBAL` (secondary) + `STALE_FACTS` (tertiary) + `THIN_DEPTH` + `STRUCTURE` + `INVISIBLE`.
- **"Why this rewrite" angle:** The current page commits a load-bearing factual error at title and body level: it frames "incorporation" as a "holdover relief" question. Incorporation of a property business uses **s.162 incorporation relief** (a distinct roll-over mechanism), NOT s.165/s.260 holdover. Holdover (s.165 gifts of business assets / s.260 gifts into a chargeable trust) only applies to genuine GIFT / TRUST transactions, and ordinary residential BTL fails the s.165 business-asset test anyway. Every sibling owns one flank of this topic with more depth and freshness (see overlap map). The fix is NOT to re-explain each mechanism in depth (the siblings already do that better) but to recast this page as the **terminology-disambiguation + route-selection hub** that owns the exact head term `holdover relief property` and answers the single most common landlord confusion decisively: NO, you cannot "holdover" your way into a company; here is the correct mechanism for each fact-pattern, and here is the specialist page for each. This is distinct primary intent no sibling targets head-on, and it turns the page's biggest liability (its misleading title) into its differentiator.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

- **Current word count:** ~780 (body). Thin against the ~3,000 gold-reference floor.
- **Current H2 outline (1-line each):**
  1. Understanding Holdover Relief for Property Incorporation (+ H3 When Holdover Relief Applies) — mis-frames the whole topic as a holdover question
  2. Conditions and Requirements for Relief (+ H3 Business Transfer Requirements, H3 Timing and Elections)
  3. The Practical Reality and Trade-offs of Deferring CGT — Manchester £800k→£1.2m worked example
  4. Alternative Strategies
  5. Professional Advice Is Essential
  6. Related Reading (3 links)
- **Current meta title:** "Holdover Relief Property: UK Incorporation Guide 2026" (52 chars) — perpetuates the conflation.
- **Current meta description:** "Holdover relief defers CGT when transferring property to a company, but strict conditions apply. Eligibility rules and how to claim." (131 chars) — factually wrong (holdover does NOT defer CGT on incorporation; s.162 does).
- **Current FAQ count (frontmatter `faqs:`):** 4. All four blur s.162 and s.165 together; FAQ #1 says holdover "possibly" applies to incorporation (misleading); none mention s.260 / trust route; none state residential BTL fails the s.165 business test.
- **Current outbound authority links:** 0. No legislation.gov.uk, no HMRC manual.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter; no Article reviewer fields; no HowTo).
- **Last meaningful edit date (`date`):** 2026-04-01. No `dateModified`, no `reviewedBy`, no `reviewerCredentials`.
- **Internal links present:** 4 (`/incorporation`, `incorporate-rental-property-without-cgt`, `cgt-property-transfer-limited-company-calculate`, `how-to-transfer-property-into-limited-company-uk`).

---

## GSC angle (last 90 days) — from diagnosis payload

**Aggregate:** the slug itself is effectively **INVISIBLE** — 0 GSC clicks, 0 Bing. The single in-corpus GSC datapoint adjacent to this page is `incorporation relief for landlords` at **5 impr / pos 68.3** (page 7, near-zero). All other target queries are adjacency-sourced (0 impr) — they are head/long-tail terms the corpus does not yet serve head-on.

**Read:** there is nothing to "rescue". This is a land-grab on an un-owned head term + the most common landlord confusion. The realistic win is (a) ranking debut on `holdover relief property` and `s162 vs s165` disambiguation queries where no sibling competes, and (b) becoming the internal routing hub that distributes equity to the four specialist siblings. No CTR-fail framing applies (there is no impression base to convert).

**GA4 engagement signal:** not pulled (page has no meaningful traffic; deferred per the INVISIBLE-page handling lesson — depth + correctness now, monitored_pages 180-day INVISIBLE-baseline window post-rewrite rather than a 90-day CTR test).

---

## Query-coverage plan

One row per `target_queries[]` item from the diagnosis; each query assigned exactly once.

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| holdover relief property (incorporation vs gift) — can I use holdover relief to transfer my rental portfolio to a company | primary | 0 | 0 | H1 + metaTitle + opening answer-block |
| incorporation relief for landlords | gsc | 5 | 68.3 | H2#3 (the incorporation fact-pattern → s.162 route) |
| holdover relief property | adjacent | 0 | 0 | metaTitle + H2#2 (what holdover actually is) |
| can i use holdover relief to transfer property to a company | adjacent | 0 | 0 | FAQ#1 (verbatim) |
| section 165 holdover relief property | adjacent | 0 | 0 | H2#4 (s.165 gifts of business assets + the BTL-is-investment failure) |
| holdover relief vs incorporation relief property | adjacent | 0 | 0 | H2#6 comparison table + H2 heading "s.162 vs s.165 vs s.260" |
| does residential property qualify for holdover relief | adjacent | 0 | 0 | FAQ#2 (verbatim) |
| s162 vs s165 difference landlord | adjacent | 0 | 0 | H2#6 comparison table (row-level) + FAQ#3 |
| gift holdover relief rental property | adjacent | 0 | 0 | H2#4 (gift-to-child fact-pattern) |
| holdover relief gift property to children cgt | adjacent | 0 | 0 | FAQ#4 (verbatim) |
| s260 holdover relief property into trust | adjacent | 0 | 0 | H2#5 (s.260 gifts into a chargeable trust + s.169B/s.169E settlor-interested block) |

(Surplus FAQ slots #5–#12 carry supporting long-tail: SDLT-on-transfer reality, "is incorporation relief automatic now", deferred-gain consequences, exit-strategy interaction, etc. — see Meta / Schema plan.)

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: INTENT-MISMATCH (title-level factual error).** The page presents itself as "holdover relief for property incorporation" and answers the user's real question ("can I holdover my way into a company?") with a hedged "possibly, it depends" (FAQ#1, body para 1). That is both wrong and useless. The correct, decisive answer is: **NO — incorporation uses s.162 incorporation relief, a different relief; holdover (s.165/s.260) is for gifts and trust settlements only, and ordinary residential BTL does not even qualify for s.165.** The load-bearing fix is to lead with this disambiguation and re-orient every section around routing the reader to the correct mechanism for their fact-pattern.

**Secondary: CANNIBAL (squeezed on both flanks).** Per the overlap map, the s.162 INCORPORATION intent is already owned (more freshly, ICAEW-reviewed) by `section-162-incorporation-relief-property-landlords` + `incorporate-rental-property-without-cgt`; the s.165/s.260 GIFT-and-TRUST-holdover-on-property intent is owned more precisely by `cgt-deferral-strategies-property-investors-uk` (dedicated H2s "Section 165 holdover relief: gifts of business assets" AND "Section 260 holdover relief: gifts into trust"), plus `cgt-gifting-property-family-members-uk` and `putting-a-rental-property-into-a-trust`. Re-explaining either mechanism in depth here would deepen the cannibalisation. The resolution is sharp re-differentiation: this page becomes the **disambiguation / routing hub** (distinct primary intent: terminology + route-selection), forward-linking to each specialist sibling rather than competing with it. Reciprocal links both ways (two siblings already link here).

**Tertiary: STALE_FACTS (verify-and-fix list).**
1. s.162 claim deadline phrased loosely as "around 13 months" (line 63). Correct figure per §5 / §16.x: the **first anniversary of the 31 January following the tax year of the transfer** (~22 months, not ~13). Fix verbatim.
2. The whole-page conflation (incorporation = holdover) is the headline stale/wrong framing — corrected by the recast.
3. s.165 "business assets" eligibility is overstated by omission — the page never states that ordinary residential BTL is **investment, not a trade**, so it generally does NOT qualify for s.165. Must state plainly (s.165 + Sch 7 limit holdover to business assets / trading; Pawson-style investment activity fails).
4. s.260 holdover (gifts into an IHT-chargeable trust) and the s.169B settlor-interested block are **entirely absent** — yet s.260 is the one holdover route that actually works on residential property. Must add (TCGA 1992 s.260 + ss.169B–169G; settlor defined at s.169E per §22.x, NOT s.169G).
5. SDLT framing: any SDLT mention must use the **5% additional-dwellings surcharge** (from 31 October 2024 per §1.I) and note **FA 2003 Sch 15 partnership relief** is the only reliable mitigation route on incorporation; CGT residential 18%/24% + £3,000 AEA per §5.
6. April 2027 rates (22/42/47): assert as **enacted law** with Royal-Assent citation — FA 2026 ss.6–7, Royal Assent 18 March 2026 (England, Wales and NI; only Scotland carved out) per §7 / F-37. NOT a Bill-form hedge.
7. Zero outbound authority links — add legislation.gov.uk s.162 / s.165 / s.260 / s.169B (+ Sch 7) and an HMRC manual anchor.

**Also THIN_DEPTH + STRUCTURE:** ~780 words / 4 blurred FAQs / 0 tables / 0 authority links / 0 reviewer schema → lift to ~3,000 words, 12 FAQs, a comparison table + a decision/routing table, 5 authority links, ICAEW reviewer fields.

**Load-bearing fix order (by ROI):**
1. **Recast title + opening answer-block** to the decisive disambiguation ("No — that is s.162 incorporation relief, not holdover").
2. **Fix the four stale/wrong facts** (claim deadline ~22 months; BTL fails s.165; add s.260 + s.169B; SDLT 5% surcharge + Sch 15).
3. **Build the comparison table** (s.162 vs s.165 vs s.260) + the **fact-pattern routing table** (each scenario → correct mechanism → specialist sibling).
4. **Forward-link to all four siblings** at the routing layer; keep depth shallow-but-correct so the siblings remain the deep pages.
5. **FAQ 4 → 12**, each targeting a disambiguation query verbatim.
6. **5 authority links** + **ICAEW reviewer schema** + `dateModified`.

---

## Distinctiveness / cannibalisation statement (Stage 2)

**Cannibalisation Index basis:** overlap map supplied in the 2026-06-02 diagnosis payload (corpus state: net-new CLOSED 420 live; rewrite cohort ~44 deployed).

| Slug | Intent it owns | Overlap with this page | Resolution |
|---|---|---|---|
| incorporation-holdover-relief-property (this page) | **Disambiguation + route-selection hub** for "holdover vs incorporation on property"; head term `holdover relief property` | self | REWRITE in place into the hub |
| section-162-incorporation-relief-property-landlords | s.162 incorporation relief mechanics (business test / Ramsay / SDLT trap / s.162 claim) | s.162 incorporation intent | No collision after recast — this page ROUTES the "incorporate-for-shares" fact-pattern HERE; does not re-explain s.162 in depth. Reciprocal link. |
| incorporate-rental-property-without-cgt | s.162 applied "without CGT" how-to (ICAEW-reviewed, fresher) | s.162 incorporation intent | No collision — routes here; already links back to this slug. Reciprocal link. |
| cgt-deferral-strategies-property-investors-uk | s.165 (gifts of business assets) + s.260 (gifts into trust) deep mechanics + deferral decision table + s.169B block | s.165/s.260 holdover-on-property intent | No collision after recast — this page ROUTES the gift-to-child and gift-into-trust fact-patterns HERE; does not duplicate the deferral table. Already links back to this slug. Reciprocal link. |
| cgt-gifting-property-family-members-uk | Gift of property to family + connected-person MV disposal + no-holdover-for-BTL | gift-to-child fact-pattern | No collision — routes here for the "gift to child" branch. Reciprocal link. |
| putting-a-rental-property-into-a-trust | Trust settlement mechanics + s.260 + periodic charges | gift-into-trust fact-pattern | No collision — routes here for the "gift into discretionary trust" branch. Reciprocal link. |

**Conclusion:** REWRITE only. No REDIRECT (rewrite-only mode is non-negotiable, and there is no equity to migrate). Distinct primary intent = terminology disambiguation + fact-pattern routing, which NO sibling targets head-on. The four overlapping siblings become forward-link destinations; the page becomes a hub, not a competitor.

---

## Content plan — section-by-section to ~3,000 words

Body target **~3,000 words**, 8–9 H2s, 2 tables, 12 FAQs, 2 inline `<aside>` CTAs, 5 authority links. Raw HTML in frontmatter body (`<p>`, `<h2>`, `<h3>`, `<ul>`, `<table>`) per the HTML-in-frontmatter rendering rule. No Tailwind classes. No em-dashes. No pricing.

**Opening answer-block (~150 words, no heading).** Decisive lede that answers the head query in the first two sentences: you cannot use "holdover relief" to move your rental portfolio into a company. Moving a property *business* into a company in exchange for shares is **incorporation relief (s.162 TCGA 1992)**, a different roll-over. Holdover relief (s.165 / s.260) applies only to genuine **gifts** and **trust settlements**, and ordinary residential buy-to-let usually fails the s.165 test anyway. This page disambiguates the two and routes you to the right mechanism for your situation.

**H2#1 — "Why landlords confuse holdover relief with incorporation" (~300 words).** Name the confusion plainly: both defer CGT, both involve "moving" property, both cite TCGA 1992. Explain the actual distinction: incorporation = transfer of a *going-concern business* for *shares* (roll-over into the share base cost, s.162); holdover = a *gift* (or transfer at undervalue / into a chargeable trust) where the donee takes over the donor's base cost (s.165/s.260). Different trigger, different statute, different claim. State that the wrong mechanism = wrong (often nil) relief + an unexpected CGT bill.

**H2#2 — "What holdover relief actually is (s.165 and s.260)" (~350 words).** Define both: s.165 (gifts of *business assets*) and s.260 (gifts that are immediately chargeable to IHT, e.g. into a discretionary/relevant-property trust). The mechanic in both: no CGT for the donor now; the donee inherits the lower base cost; tax is deferred, not erased. Targets `holdover relief property`. Forward-link the deep mechanics to `cgt-deferral-strategies-property-investors-uk`.

**H2#3 — "Putting your portfolio INTO a company: that is s.162, not holdover" (~400 words).** The incorporation fact-pattern. Whole property *business* (not cherry-picked properties) transferred as a going concern, in exchange wholly or mainly for shares → s.162 incorporation relief rolls the gain into the share base cost. Note the post-FA-2026 change: **no longer automatic — must be claimed** by the first anniversary of the 31 January following the tax year of transfer (~22 months); the old s.162A disapplication election was repealed. Note the business test (Ramsay [2013]; most passive BTL fails). Targets `incorporation relief for landlords`. Forward-link depth to `section-162-incorporation-relief-property-landlords` + `incorporate-rental-property-without-cgt`. **Inline CTA #1** here (after the claim-deadline paragraph).

**H2#4 — "Gifting property to your children: s.165 usually fails on BTL" (~350 words).** The gift-to-child fact-pattern. A gift to a connected person is a deemed disposal at **market value** (s.17 / s.286). s.165 holdover would defer it — BUT s.165 + Sch 7 limit holdover to **business assets**, and ordinary residential letting is **investment, not a trade** (Pawson-style reasoning), so s.165 generally does NOT apply. Result: CGT crystallises on the gift; the gift is also a PET for IHT. Targets `section 165 holdover relief property`, `gift holdover relief rental property`. Forward-link to `cgt-gifting-property-family-members-uk`.

**H2#5 — "Gifting property into a trust: s.260 is the holdover that works" (~400 words).** The gift-into-trust fact-pattern. A gift into a relevant-property (discretionary) trust is an immediately chargeable transfer for IHT, which unlocks **s.260 holdover** — the one holdover route that genuinely works on residential property. The trap: **settlor-interested trusts** (settlor or spouse can benefit) are excluded from s.260 by **TCGA 1992 ss.169B–169G** (settlor defined at **s.169E**, not s.169G), so CGT crystallises immediately at MV. Note the IHT trade-off (entry charge + 10-year periodic charges up to 6%). Targets `s260 holdover relief property into trust`. Forward-link to `putting-a-rental-property-into-a-trust` + `cgt-deferral-strategies-property-investors-uk`.

**H2#6 — "s.162 vs s.165 vs s.260: side-by-side" (~250 words + TABLE).** The disambiguation comparison table (see Tables below). Targets `holdover relief vs incorporation relief property`, `s162 vs s165 difference landlord`.

**H2#7 — "Which one applies to you? A fact-pattern router" (~250 words + TABLE).** The routing/decision table (see Tables below) mapping each fact-pattern to the correct mechanism and the specialist sibling page. **Inline CTA #2** after this table (model-your-scenario discovery call).

**H2#8 — "The costs holdover and incorporation do NOT remove: SDLT and the deferred gain" (~300 words).** SDLT does not get held over or rolled over: a transfer into a company is normally chargeable to **SDLT at market value plus the 5% additional-dwellings surcharge** (from 31 October 2024); the only reliable mitigation is **FA 2003 Sch 15 partnership relief** where a genuine pre-existing letting partnership exists. The deferred CGT is a future liability (lower base cost in the company / shares / donee). State residential CGT 18%/24% + £3,000 AEA (§5). For income, note the April 2027 property rates (22/42/47, England/Wales/NI; Scotland carved out) as enacted FA 2026 ss.6–7 (Royal Assent 18 March 2026) per §7.

**H2#9 — "Getting the mechanism right before you transfer" (~200 words).** Close: choosing the wrong relief is the costliest error (claim a relief that does not apply → unexpected CGT + penalties). A specialist can model the fact-pattern and confirm which (if any) relief is available before the irreversible transfer. Anonymised proof only (e.g. "a portfolio landlord we worked alongside assumed holdover would cover incorporation; the correct route was a s.162 claim plus Sch 15 partnership relief on the SDLT"). No names, no fees.

### Tables the page MUST include (plain HTML, no pricing)

**Table 1 — Comparison: s.162 vs s.165 vs s.260 (in H2#6).**
Columns: `Relief (statute)` | `Trigger transaction` | `Does residential BTL qualify?` | `What happens to the gain` | `Must it be claimed/elected?` | `Specialist page`.
Rows:
- Incorporation relief — s.162 TCGA 1992 | Whole property *business* → company for shares | Yes, if it is a genuine business (Ramsay test) | Rolled into share base cost | Yes, claim by 1st anniversary of 31 Jan following tax year of transfer (FA 2026) | section-162-incorporation-relief-property-landlords
- Holdover, gifts of business assets — s.165 TCGA 1992 | Gift of a *business asset* | Usually NO (residential BTL is investment, not a trade) | Held over to donee's base cost (when it applies) | Yes, joint election | cgt-gifting-property-family-members-uk
- Holdover, gifts into trust — s.260 TCGA 1992 | Gift into a relevant-property (chargeable) trust | Yes (this is the holdover that works on BTL) | Held over to trustees' base cost | Yes, claim; blocked if settlor-interested (ss.169B–169E) | putting-a-rental-property-into-a-trust

**Table 2 — Fact-pattern router (in H2#7).**
Columns: `Your situation` | `Correct mechanism` | `Watch out for` | `Read next`.
Rows:
- "I want to move my whole portfolio into my own company" → s.162 incorporation relief → business test (Ramsay); SDLT 5% surcharge unless Sch 15 partnership relief; must claim → section-162-incorporation-relief-property-landlords / incorporate-rental-property-without-cgt
- "I want to give a rental property to my adult child" → Gift = MV disposal (s.17/s.286); s.165 holdover usually fails on BTL → CGT now + PET for IHT → cgt-gifting-property-family-members-uk
- "I want to settle a rental property into a discretionary trust" → s.260 holdover (works) → settlor-interested block (ss.169B–169E); IHT entry + 10-year charges → putting-a-rental-property-into-a-trust / cgt-deferral-strategies-property-investors-uk
- "I just want to defer CGT generally" → Depends on the transaction type → there is no single 'property holdover'; match the relief to the deal → cgt-deferral-strategies-property-investors-uk

---

## Statute spine (every section number with its Act — verify at write time)

Verify each against legislation.gov.uk at write time, including Royal-Assent date of any cited Finance Act (the F-37 Bill-vs-enacted pattern).

- **TCGA 1992 s.162** — Incorporation relief (roll-over on transfer of a business to a company for shares). Post-FA-2026: must be claimed; s.162(1)(b) claim mechanic; s.162A disapplication election repealed (FA 2026 s.39). [§5 LOCKED 2026-06-01]
- **TCGA 1992 s.165** — Relief for gifts of business assets (holdover). Limited to business assets; investment BTL generally fails. [§21.5 references s.165 + Sch 7 trading-only]
- **TCGA 1992 Sch 7** — Defines the business assets eligible for s.165 holdover (the trading limb). [§21 do-not-write list]
- **TCGA 1992 s.260** — Holdover on gifts that are immediately chargeable transfers for IHT (gifts into relevant-property trusts). [§22.x LOCKED]
- **TCGA 1992 ss.169B–169G** — Settlor-interested-trust exclusion from s.260 holdover; settlor defined at **s.169E** (NOT s.169G — s.169G defines 'arrangement', subsections (2)–(5) omitted by FA 2009). [§22.x LOCKED, F-4 Wave 6]
- **TCGA 1992 s.17 + s.286** — Connected-person disposal at market value (the gift-to-child trigger). [§22 / §15.2]
- **TCGA 1992 s.222–226** — PRR (referenced only in passing if a former-home property is involved). [§5]
- **TCGA 1992 s.58** — Spouse / civil-partner no-gain-no-loss (referenced only if a spousal step is mentioned). [§5]
- **FA 2003 Sch 4ZA** — SDLT 5% additional-dwellings surcharge (from 31 October 2024). [§1.I LOCKED 2026-05-25]
- **FA 2003 Sch 15** — SDLT partnership relief (the only reliable incorporation SDLT mitigation; genuine pre-existing partnership required). [§1.A / §11.C.8]
- **FA 2026 ss.6–7** — April 2027 property income rates 22/42/47 (England, Wales, NI; Scotland carved out); Royal Assent 18 March 2026. [§7 LOCKED 2026-05-30, F-37]
- **Ramsay v HMRC [2013] UKUT 226 (TCC)** — business-vs-investment threshold for s.162. [§5]
- **(Pawson v HMRC [2013])** — investment-activity reasoning supporting "BTL is not a trade" for s.165 (cite as supporting authority, IHT-origin case; frame as illustrative of the trading test, do not over-state). [§9 / §15]

---

## Competitor depth benchmark (Stage 2 — verify liveness at write time)

Targets supplied by diagnosis; fetch + status-check + date-stamp each at write time per the URL-liveness discipline.

| URL | Expected angle | What to borrow | What to differentiate against |
|---|---|---|---|
| https://mpestateplanning.uk/gift-hold-over-relief-on-property-how-to-avoid-a-capital-gains-tax/ | Consumer "hold-over on property" explainer | Plain-English gift framing | They blur business-asset eligibility; we state BTL fails s.165 plainly + add the routing layer |
| https://www.rossmartin.co.uk/capital-gains-tax/4198-holdover-gift-relief-at-a-glance | Practitioner "at a glance" on s.165/s.260 | Statute precision (s.165 vs s.260 split) | They are a generic UK at-a-glance; we are property-specific + add the incorporation disambiguation + fact-pattern router |
| https://www.bdo.co.uk/en-gb/insights/tax/.../section-165-holdover-relief | Authoritative s.165 back-to-basics | s.165 business-asset test rigour | They cover s.165 only; we own the s.162-vs-s.165-vs-s.260 disambiguation no competitor does head-on |
| https://gofile.co.uk/knowledgebase/capital-gains-tax/holdover-relief/ | Knowledge-base holdover overview | Scannable structure | Thin; we beat on depth + decision table + verified statute + reviewer |

**Competitor depth ceiling for this query class:** prose explainers, 0–1 tables, generic (not property-specific), and crucially **none of them disambiguate incorporation (s.162) from holdover (s.165/s.260) for the confused landlord, and none route by fact-pattern.** Our ~3,000-word disambiguation hub with 2 tables + 12 FAQs + 5 verified statute citations + ICAEW reviewer is decisively best-in-class on the exact intent.

---

## Internal-link targets within the live corpus (reciprocal)

Forward-links FROM this page (the hub distributes equity):
- `section-162-incorporation-relief-property-landlords` — `/blog/incorporation-and-company-structures/section-162-incorporation-relief-property-landlords` (H2#3 + Table 1/2 incorporation row)
- `incorporate-rental-property-without-cgt` — `/blog/incorporation-and-company-structures/incorporate-rental-property-without-cgt` (H2#3; already links back here)
- `cgt-deferral-strategies-property-investors-uk` — `/blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk` (H2#2 + H2#5; already links back here)
- `cgt-gifting-property-family-members-uk` — `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` (H2#4 + Table 1/2 gift row)
- `putting-a-rental-property-into-a-trust` — `/blog/landlord-tax-essentials/putting-a-rental-property-into-a-trust` (H2#5 + Table 1/2 trust row)
- `cgt-property-transfer-limited-company-calculate` — `/blog/capital-gains-tax/cgt-property-transfer-limited-company-calculate` (H2#8 deferred-gain / SDLT) — preserve from current page
- `how-to-transfer-property-into-limited-company-uk` — `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` (H2#8) — preserve from current page

Reciprocal back-links INTO this page: `incorporate-rental-property-without-cgt` and `cgt-deferral-strategies-property-investors-uk` already point here (verify at write time); add a back-link from `section-162-incorporation-relief-property-landlords`, `cgt-gifting-property-family-members-uk` and `putting-a-rental-property-into-a-trust` if missing (manager-direct or note for execution; do not over-edit siblings beyond a single reciprocal link).

---

## Meta plan

- **metaTitle (<=62):** `Holdover Relief vs Incorporation: Property CGT Routes` (52 chars)
- **metaDescription (<=158):** `No, you cannot use holdover relief to move a portfolio into a company: that is s.162 incorporation relief. How s.165, s.260 and s.162 differ for landlords.` (155 chars)
- **h1:** `Holdover Relief on Property: Incorporation, Gifts and Trusts Explained`
- **summary (frontmatter):** `You cannot use holdover relief to move a rental portfolio into a company: that is incorporation relief (s.162 TCGA 1992), a different roll-over. Holdover relief (s.165 for gifts of business assets, s.260 for gifts into a chargeable trust) applies only to genuine gifts and trust settlements, and ordinary residential buy-to-let usually fails the s.165 business-asset test. This guide disambiguates the three reliefs and routes each fact-pattern to the correct mechanism.`

(No em-dashes in any field. No pricing. metaTitle/metaDescription drop the misleading "holdover defers CGT on incorporation" framing.)

---

## Schema plan

- **reviewedBy:** `ICAEW Qualified Senior Reviewer` (REAL reviewer pattern already used on the sibling `incorporate-rental-property-without-cgt.md`; consistent with house byline practice).
- **reviewerCredentials:** `Chartered Accountant (ACA, ICAEW), Property Tax Specialist`.
- **reviewedAt:** `2026-05-30`.
- **dateModified:** `2026-05-30`.
- **howTo:** **false** (this is a disambiguation / decision page, not a step-by-step procedure; no HowTo JSON-LD, no `howToSteps`).
- **JSON-LD blocks emitted:** **Article** (with reviewer fields) + **FAQPage** (auto-emitted from the 12-entry `faqs:` array by `buildBlogPostingJsonLd`). NO HowTo. Never hand-add FAQ schema in body.

**FAQ set (12, frontmatter `faqs:`), each mapping to a query/disambiguation:**
1. Can I use holdover relief to transfer property to a company? (verbatim target; decisive NO → s.162)
2. Does residential property qualify for holdover relief? (verbatim; s.165 usually fails, s.260 works on trust gifts)
3. What is the difference between s.162 and s.165 for a landlord? (s162 vs s165)
4. How does holdover relief work when gifting property to children for CGT? (verbatim; s.165 fails BTL → CGT now + PET)
5. What is s.260 holdover and when can I use it on a rental property?
6. Is incorporation relief automatic, or do I have to claim it now? (FA 2026 claim by 1st anniversary of 31 Jan following tax year of transfer)
7. What is a settlor-interested trust and why does it block s.260 holdover? (ss.169B–169E)
8. Does holdover or incorporation relief remove the SDLT on transfer? (no; 5% surcharge; Sch 15 partnership relief)
9. Is the held-over gain gone, or just deferred?
10. Does my buy-to-let count as a business for s.162 incorporation relief? (Ramsay test)
11. What happens to the deferred gain when the company or trust later sells?
12. How do the April 2027 property income rates affect an incorporation decision? (22/42/47 enacted FA 2026; Scotland carved out)

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM.md §4 section 13 pointer block: NETNEW_PROGRAM.md §4 voice block + competitor_rewrite_playbook.md §5 (no em-dashes anywhere; lead-gen architecture, LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated, 1–3 inline `<aside>` CTAs; CSS-in-markdown forbidden, semantic HTML only; FAQs frontmatter array target 10–14, FAQPage auto-emitted, never hand-add FAQ schema; anti-templating; §4.3 six-check verification; statute-citation discipline incl. F-8 live-URL-but-amended-content + F-37 Bill-vs-enacted). HARD RULES restated for this brief: NO pricing/fees on-page (Decision E: even soft fee comparisons are a pricing-leak — none present in source, keep it clean); NO real client names (anonymised proof only); NO em-dashes; every statute verified at legislation.gov.uk at write time including FA Royal-Assent date.

---

## 19-step workflow — inherited (Wave 5) with Track 2 deltas

Per TRACK2_PROGRAM.md §4 section 14: inherit the full 19-step workflow; Track 2 deltas — Step 9 rewrite markdown at EXISTING path (preserve slug + canonical + `date`; add `dateModified` 2026-05-30 + reviewer fields); Step 11 six checks (FAQ schema count = 12; em-dash count = 0; Tailwind class count = 0; metaTitle <=62; metaDescription <=158; all internal links resolve; PLUS verify no `£`/pricing in body); Step 12 confirm no redirect (REWRITE only); Step 13 insert/refresh `monitored_pages` row with **180-day INVISIBLE-baseline window** (no CTR-fail test — there is no impression base).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 s.162 + claim deadline (1st anniversary of 31 Jan following tax year of transfer): __
- §5 CGT residential 18%/24% + £3,000 AEA: __
- §21.5 s.165 + Sch 7 trading-only (BTL fails): __
- §22.x s.260 + ss.169B–169E settlor-interested (settlor at s.169E NOT s.169G): __
- §1.I SDLT 5% surcharge + §1.A/§11.C.8 Sch 15 partnership relief: __
- §7 April 2027 22/42/47 enacted FA 2026 ss.6–7 (Royal Assent 18 Mar 2026; Scotland carved out): __ verified at legislation.gov.uk

### Comparison: before vs after
- Word count: ~780 → __
- H2 count: 5 → __ (target 8–9)
- FAQ count: 4 → __ (target 12)
- Authority links: 0 → __ (target 5)
- Inline CTAs: 0 → __ (target 2)
- Tables: 0 → __ (target 2: comparison + router)
- Reviewer schema: none → ICAEW reviewer fields + dateModified
- metaTitle: "Holdover Relief Property: UK Incorporation Guide 2026" → "Holdover Relief vs Incorporation: Property CGT Routes"

### Flags raised
- STALE: s.162 claim deadline "around 13 months" corrected to ~22 months: __
- STALE: incorporation-=-holdover conflation corrected (load-bearing): __
- STALE: s.165 BTL-fails statement added: __
- STALE: s.260 + s.169B route added (was absent): __
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
