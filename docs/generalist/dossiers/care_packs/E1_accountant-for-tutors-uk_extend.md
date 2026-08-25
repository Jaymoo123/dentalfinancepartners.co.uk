# PACK E1: EXTEND — accountant-for-tutors-uk (additive only)

Derived 2026-08-25 from the FROZEN dossier `../care_education_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **additive append only**). The one existing page in this
cluster and the only seed for all three niches.

## 1. Target and permission level

- **EXISTING page.** `generalist/web/content/blog/accountant-for-tutors-uk.md`, dated 2026-05-17,
  category "Sole Trader and Self Employment", slug `accountant-for-tutors-uk`.
- Grade: **EXTEND, additive only.** The page holds **2 clicks / 13 impressions / position 6.2** in
  Google over the 90 days to 2026-08-25, and 0 / 0 in Bing. One click or more on Google is the
  EXTEND trigger.
- **Permission level, and this is the tightest in the cluster:** keep the existing `metaTitle`,
  `metaDescription`, H1 and **H2 order** exactly as they are. The page sits at position 6 on a tiny
  impression base; a title or H1 change risks the one thing that is working. New content is
  appended, never interleaved in a way that reorders what exists.
- **What may change:** new H2 sections appended before the FAQ, new FAQ entries, and **factual
  correction in place** where the existing body is wrong or stale. Correcting a wrong figure is not
  a structural change and is not optional.
- Revert path: git revert the content commit. The page is live, so this is the only surface in the
  cluster where a bad edit has an immediate production consequence.
- **Frozen-ground check:** the page is not registered in `monitored_pages` and is not in an armed
  window (dossier §5). Re-verify against the live table immediately before editing. Standing rule,
  regardless of what this pack says.
- C1 gate: **C2 row 78 CLEAR**. Note the recorded C1 contradiction, resolved in C2's favour: the
  estate's tutoring lock is **commercial, not regulatory**. Row 78's shape is "section plus 1 to 2
  pages", and this single page already satisfies it. **Not blocked.**

## 2. Equity register

**This is the only equity in the cluster and it is small and fragile.**

| Metric | Value | Source |
|---|---|---|
| Google clicks (90d to 2026-08-25) | 2 | fresh GSC pull |
| Google impressions | 13 | fresh GSC pull |
| Google average position | **6.2** | fresh GSC pull |
| Bing clicks / impressions | 0 / 0 | Bing 91d query and page stats |
| Named family queries in GSC | **0** | the 13 impressions carry no named family query; the two "statutory" hits are the sta-**tutor**-y substring artefact and are excluded |

**Do-not-lose list:** the `metaTitle` ("Why UK Tutors Need a Specialist Accountant for Tutors"), the
H1, the existing nine-H2 order, the canonical, and the category assignment. Position 6.2 on 13
impressions is a thin signal, but it is the only positive signal this cluster has, and it cost
nothing to keep.

**Must NOT poach:** nothing. No other pack touches tutoring.

## 3. Market keyword slice (ledger, 3 rows, thin by measurement)

| Keyword | Vol/mo | Source | Note |
|---|---|---|---|
| private tutor tax | 10 | on-file paid demand, row 78 head | the only priced tutor term in the family |
| how to be a freelance tutor | n/a | discovery pool, sitemap source | career-adjacent, carried as an FAQ candidate only |
| how to set up an online tutoring business | n/a | discovery pool, sitemap source | FAQ candidate only |

**The D1 finding that matters here: zero tutor rows in 3,853 harvested keywords across seven
specialist domains.** Not one. That is not evidence of no demand, it is evidence that **no
specialist accountancy domain competes in this niche at all**, which is the same conclusion the
free SERP sweep reached at first pass. Row 78 is a 10/mo niche with no specialist field.

Per the coverage-over-selection lock: thin measured volume downgrades what we expect from this page.
It does not remove it, and it does not justify a second tutor page. **No second tutor page unless
free expansion (delta D2) shows demand that this one cannot absorb.**

## 4. Competitor teardown

**There is no specialist field to tear down, and that is the finding.** The dossier's free SERP
sweep found only sector pages on generalist firms (accotax.co.uk, auditox-accountancy.uk,
apexaccountants.tax, hayes-accountants.co.uk) plus marketplace and career content. D1's paid harvest
of seven childcare and fostering specialists confirmed it from the other direction: none of them
carries a tutoring page worth a ranked row.

No competitor page was fetched for this pack, because there is no ranking specialist competitor to
fetch. Stated plainly rather than padded with an irrelevant teardown.

**The competitor for this page is therefore its own current content**, and that is where the
teardown belongs. Measured against the existing file on 2026-08-25:

| Concept | Mentions in the current page |
|---|---|
| trading allowance | **0** |
| "£1,000" | **0** |
| 5 October registration deadline | **0** |
| £12,570 / £50,270 | **0 / 0** |
| Class 4 | **0** |
| platform / marketplace reporting | 1 passing mention |
| IR35 | 8 (a full H2) |
| MTD | 6 (a full H2) |
| £90,000 VAT threshold | 4 (a full H2) |
| 2026/27 figures | **0** |

The page devotes an H2 to IR35 for tutors and does not mention the £1,000 trading allowance once.
For an audience whose defining question is "I earn a few hundred pounds tutoring, do I need to tell
HMRC", that is the wrong emphasis by a wide margin.

## 5. Whitespace (what §19.4 lets us add)

Everything below is additive and none of it exists on the page today.

- **The £1,000 trading allowance and the 5 October registration trigger.** The single biggest gap.
  A tutor under £1,000 of gross tutoring receipts may have nothing to do. A tutor over it registers
  by the 5 October after the end of the tax year in which they started. This is the answer most
  visitors to this page actually need.
- **The employed teacher who tutors on the side.** Keeps PAYE on the employment and reports the
  tutoring separately as self-employment on the same return. The trading allowance is available
  against it, with the connected-employer exclusion biting only where the tutoring income comes from
  their own employer or their own company. This is a large and completely uncovered slice of the
  audience.
- **Tutoring marketplace reporting.** Tutoring platforms are reportable platforms and there is no
  small-volume exclusion for services, so tutoring income is reportable from the first pound. Paired
  every time with the locked fence: **reported does not mean newly taxable, and unreported does not
  mean tax-free.**
- **Deductible costs named for this reader:** DBS checks, exam-board and awarding-body fees,
  marketplace commission, teaching resources, and the either-or point that claiming the trading
  allowance means claiming no expenses.
- **A recomputable 2026/27 worked example**, which the page has never had.
- **Correction in place, required:** the page carries an IR35 H2. Off-payroll working is only in
  play where a tutor operates through a company and the end client is not a private consumer, which
  is rare in this niche. The H2 stays (structure is frozen) but its content must be corrected to say
  so plainly rather than implying IR35 is a routine tutor concern.

## 6. Fences (binding)

- **Additive only.** `metaTitle`, `metaDescription`, H1 and existing H2 order are frozen. New H2s
  append before the FAQ. New FAQ entries append to the FAQ.
- **Factual correction in place is required, not optional**, wherever the existing body is wrong or
  stale. Additive-only protects structure, never errors.
- **No published house-position citations in reader copy.** Writer cites **§19.4** (tutors, the
  trading-allowance boundary and the employed-teacher interaction), **§17** (trading allowance, 5
  October), **§18.1** (platform reporting and its fence), **§2**, **§7** and **§13** (IR35, for the
  correction) **in the build report only**.
- **No em-dashes.**
- **Rates date-tagged in the sentence**; the 2025/26-locked set (Class 4 6%, £12,570, £50,270)
  carries the natural-language **"still current when checked in August 2026"** tag in 2026/27 copy.
- **The platform-reporting fence wording is mandatory** on any mention of marketplace reporting.
- **The tutoring lock is commercial, not regulatory** (C1 contradiction 1, resolved in C2 §10 row
  78). Do not write regulatory hedging that does not exist. Equally, do not expand this page into a
  tutoring-business how-to: the two pool rows are FAQ candidates, not sections.
- **Career content stays out.** "How to become a tutor" style content is excluded family-wide under
  the EX-CAREER code.
- **Intra-cluster:** no childminder, nursery or fostering content. Different families, different
  pages.

## 7. Acceptance criteria (deterministic)

1. **Preserved unchanged and verified by diff:** `metaTitle`, `metaDescription`, H1, canonical,
   category, and the relative order of the nine existing H2s. QA fails the edit on any diff to these.
2. **New queries answerable:** "do I need to declare tutoring income"; "£1,000 trading allowance
   tutor"; "when do I register as a tutor with HMRC"; "I am a teacher and I tutor on the side";
   "do tutoring platforms report to HMRC"; `private tutor tax`.
3. **Figures added, recomputable and dated:** £1,000 trading allowance; 5 October registration
   trigger; 31 January filing deadline; £12,570 and £50,270 with the currency tag; Class 4 at 6%
   with the currency tag; the existing £90,000 VAT threshold re-checked and date-tagged.
4. **One worked example added**, recomputable on 2026/27 figures: a teacher with a PAYE salary plus
   tutoring receipts, shown both under the trading allowance and with actual expenses. Persona
   **Owen**, city **Lincoln**.
5. **The platform-reporting fence sentence is present** wherever reporting is mentioned.
6. **The IR35 section is corrected in place** to state that off-payroll working rarely applies to a
   tutor working for private clients.
7. **Both pool rows appear as FAQ entries**, not as H2 sections.
8. **No new H2 duplicating an N1, N2, N3, N4 or N5 H2 phrasing.**
9. **Zero house-position section codes** in the published body. The page is live, so this grep runs
   before the commit, not after.
10. **`monitored_pages` re-checked** against the live table immediately before the edit.

## 8. Expectation

**Hold what exists, add the answer the page is missing, expect very little traffic.** This is a
10/mo niche with no specialist competitors and a page already at position 6.2 on 13 impressions.
The realistic outcome of a good extend is position 6.2 becoming position 3 or 4 on a slightly larger
impression base, which is a handful of sessions a month.

That is the honest expectation and it is fine. The reason to do the work is not traffic. It is that
the page currently gives a tutor no answer to the trading-allowance question, and the
coverage-over-selection lock means row 78 gets a correct page whether or not the volume justifies
one. Thin measured volume downgrades the expectation, never the surface.

Bing: 0 impressions today. Bing usually moves first on this estate, so any Bing impressions at all
after the extend are the earliest useful signal.

Maturity caveat: this is an existing page, so the usual net-new immaturity allowance does **not**
apply in the same way. An extend that has not moved impressions at all by 90 days is a real
negative result, not immaturity.

Failure trigger: Google impressions at 90 days post-edit are flat or lower than the current 13, and
Bing is still at zero.
