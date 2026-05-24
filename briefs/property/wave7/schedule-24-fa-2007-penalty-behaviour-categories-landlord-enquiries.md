# Wave 7 brief: schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries

**Site:** property
**Bucket:** B (HMRC enquiry + tax compliance ops)
**Pick:** B8 — Schedule 24 FA 2007 penalty behaviour categories — Cat 1/2/3 offshore + Sch 21 asset-move stacking
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries

---

## Frontmatter header

- **Slug:** `schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries`
- **Bucket:** B
- **Section ID:** §27.2 + §27.3 (Sch 24 primary; Sch 41 referenced)
- **Framing differentiator (~50 words):** Full Sch 24 FA 2007 behaviour-band matrix — careless 30% max (0%/15% floors), deliberate-not-concealed 70% (20%/35%), deliberate-and-concealed 100% (30%/50%). Offshore Cat 1/2/3 territory uplift via para 4A (×1 / ×1.5 / ×2 — Cat 3 caps deliberate-concealed at 200%). Sch 21 FA 2015 asset-move penalty stacks SEPARATELY on top. Sch 24 para 14 careless-only suspension; Anderson FTT appeal. NOT writing failure-to-notify (Sch 41 — separate page); NOT reasonable-excuse case law (B9).
- **Locked HP anchors:**
  - §27.2 (Sch 24 penalty behaviour categories — verbatim mitigation matrix)
  - §27.3 (Sch 41 failure-to-notify — referenced for failure-to-notify-vs-inaccuracy distinction; both can apply same facts)
  - §27.9 (do-not-write list — "Sch 24 careless is 30% flat" + "offshore deliberate-concealed capped at 100%" both forbidden)
- **monitored_pages stub:** Register at launch with `landing_date` = ship date; `signal_window_days` = 90; primary monitored queries include "schedule 24 penalty landlord", "HMRC inaccuracy penalty bands", "careless penalty 30 percent", "offshore Category 3 penalty 200 percent".

---

## Manager pre-decisions

- **Suggested slug:** `schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B (HMRC enquiry + tax compliance ops)
- **Framing differentiator (Stage 2, 2026-05-24):**

> Sch 24 FA 2007 is the working penalty regime for landlord inaccuracy cases. This brief is the **canonical penalty-matrix reference** that B5 / B6 / B7 / B10 all forward-cite for behaviour bands. Three readers in scope: (i) landlord with HMRC enquiry open and an officer's penalty proposal in hand, needing to know whether the 30%/70%/100% maxima apply and what mitigation floors are achievable; (ii) accountant preparing a disclosure response that must price-in the penalty band; (iii) offshore landlord (overseas BTL, foreign holiday-let income, non-resident-landlord scheme breach) needing the Category 2/3 ×1.5/×2 uplift mechanic. The page walks the four operational layers: (1) behaviour categorisation under Sch 24 para 3 — careless / deliberate-not-concealed / deliberate-and-concealed (and the evidentiary patterns that drive HMRC into each); (2) standard maxima under para 4 with the mitigation floors at paras 9-10 (unprompted-disclosure 0%/20%/30% — including the 0% floor only available for careless within 12 months); (3) offshore territory uplift via para 4A — Cat 1 full-info-exchange same-as-onshore, Cat 2 partial-info ×1.5 (max 45%/105%/150%), Cat 3 no-info ×2 (max 60%/140%/200%) — and the published HMRC Order classifying territories that sessions must verify at write time; (4) Sch 21 FA 2015 asset-move penalty (extra uplift where assets moved from Cat 2/3 territories to defeat HMRC — stacks ON TOP of the Sch 24 offshore uplift, do not conflate). Two worked penalty calculations: (i) careless under-declared UK rental income £30k tax loss, prompted disclosure → 15% × £30k = £4.5k penalty; (ii) deliberate-not-concealed Spanish holiday-let income (Cat 1 — Spain is full-info-exchange via CRS), £45k tax loss, prompted → 35% × £45k = £15.75k penalty. Sch 24 para 14 suspension (careless only, up to 2 years; deliberate cannot be suspended; Anderson FTT-appealable refusal).

**B8 ships FIRST within Bucket B.** B5 / B6 / B7 / B10 forward-cite this page's penalty bands. If sequencing slips, manager flags as critical-path block.

**Pool-thinness disclosure:** Specialist tax-disputes firms cover Sch 24 well but rarely landlord-facing; landlord-specialist firms cover it shallowly. Brief generator pulls from Sch 24 verbatim + §27.2 + §27.9 + HMRC CH80000+ manual. Anderson suspension authority — verify exact citation (Anderson v HMRC) at write time.

---

## Competitor URLs (Stage 2 populated; sessions verify liveness per §16.31 at write time)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of (a) the behaviour-band table; (b) offshore Category 2/3 uplift mechanic; (c) suspension under para 14; (d) presence of Sch 21 asset-move-penalty stacking (most omit). Most competitor pages give the headline 30%/70%/100% but skip the offshore uplift OR collapse it into "double" — be precise.

- https://www.ukpropertyaccountants.co.uk/schedule-24-penalty-behaviour-bands/ — mid-market specialist; landlord-flavoured; useful for FAQ patterns.
- https://www.uklandlordtax.co.uk/sch-24-penalty-matrix-landlord/ — reader-friendly framing.
- https://www.shipleys.com/insights/schedule-24-penalties-explained/ — Top-50 firm; useful for citation density.
- https://www.haines-watts.com/insight/penalty-behaviour-categories-hmrc/ — Top-30 firm; specialist depth on mitigation floors.

**Borrowable patterns:** Shipleys' worked-example structure; Haines Watts' mitigation-floor narrative. Most competitor pages collapse offshore uplift incorrectly — defensible point of differentiation.

---

## GSC data

*Net-new page. Primary topical queries expected: "schedule 24 penalty bands", "HMRC inaccuracy penalty landlord", "careless penalty 30 percent", "deliberate concealed penalty 100 percent", "offshore Category 3 penalty 200 percent", "Schedule 24 mitigation floor", "Sch 24 suspension landlord", "asset move penalty Sch 21".*

---

## Closest existing pages (cannibalisation context)

- `section-24-calculator` (0.12 — **false-positive** token overlap on "Section 24" / "Sch 24"; topic is the unrelated finance-cost restriction)
- `liverpool-property-accountant-tax-services-landlords` (0.10 — local; false-positive)
- `landlord-incorporation-step-by-step-guide-uk` (0.09 — adjacent only)
- `hmrc-penalties-late-landlord-tax-returns-2026` (adjacent — covers Sch 56 late-filing + Sch 55 late-payment; this brief covers Sch 24 inaccuracy; distinct regimes per §19)
- `ated-late-filing-penalty-appeal-reasonable-excuse` (0.26 — ATED-specific procedural; B8 is the substantive Sch 24 mechanic)

**Cannibalisation discipline:**
- No on-site duplication; B8 is the canonical Sch 24 page.
- Distinguish carefully from `hmrc-penalties-late-landlord-tax-returns-2026` (Sch 55 / Sch 56 — MTD late-filing / late-payment) — these are PROCEDURAL penalty regimes; Sch 24 is the SUBSTANTIVE inaccuracy regime. Do not conflate.
- Sch 41 failure-to-notify is the sibling regime (covered conceptually in B6 LPC context); B8 references it for the "both can apply on same facts" rule per §27.3 but does not deep-dive Sch 41 mechanics.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no existing redirects for "schedule-24" or "sch24" slugs. No middleware edit on initial launch. If post-launch hygiene identifies a stale page collapsing all HMRC penalty regimes into one, candidate for redirect to B8; flag in `wave7_site_wide_flags.md` for manager merge decision.

---

## Authority links worth considering (Stage 2 populated; session selects 6-8)

**Statutory:**
- Sch 24 FA 2007 verbatim: https://www.legislation.gov.uk/ukpga/2007/11/schedule/24
- Sch 24 para 3 (behaviour categories): https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/3
- Sch 24 para 4 (standard maxima): https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/4
- Sch 24 para 4A (offshore Cat 1/2/3 uplift; inserted by FA 2010 + amended FA 2015): https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/4A
- Sch 24 paras 9-10 (disclosure mitigation floors): https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/9
- Sch 24 para 14 (suspension — careless only): https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/14
- Sch 21 FA 2015 (asset-move penalty — separate stacking uplift): https://www.legislation.gov.uk/ukpga/2015/11/schedule/21
- FA 2010 s.35 (introduction of offshore Cat 1/2/3 uplift mechanics — verify cross-reference at write time)

**HMRC manuals:**
- CH80000+ (Compliance Handbook on penalties — Sch 24 cluster): https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch80000
- CH82000+ (penalty calculation walk): https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch82000
- CC/FS7a (taxpayer-facing factsheet on Sch 24): https://www.gov.uk/government/publications/compliance-checks-penalties-for-inaccuracies-in-returns-and-documents-ccfs7a

**Case law (verify at write time):**
- Anderson v HMRC — controlling authority on Sch 24 para 14 suspension discretion (verify exact citation; commonly referenced as Anderson [2009] UKFTT or via Anderson UT progression)

**Cross-references in house_positions.md:** §27.2 (primary anchor — full Sch 24 walk); §27.3 (Sch 41 sibling regime); §27.6 (LPC / WDF / DDS — voluntary disclosure routes that unlock unprompted floors); §27.9 (do-not-write list).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify (i) the percentage bands and mitigation floors verbatim against Sch 24 paras 4 + 9-10 at write time; (ii) the offshore Cat 1/2/3 ×1/×1.5/×2 multipliers verbatim against para 4A and the offshore-territories Order (Order may have been updated between HP-lock and write — territory classifications are dynamic); (iii) Anderson case-name spelling + citation if used.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation, statutory paragraph references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate.
- `<aside>` styled by global CSS; you add no classes.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the behaviour-categorisation walk (high-intent: reader knows whether they sit in careless / deliberate-not-concealed / deliberate-and-concealed and needs help arguing down the band)
  - After the offshore Cat 2/3 uplift mechanic (offshore-landlord readers facing 150-200% exposure)
  - Optionally after the suspension-of-careless-penalty section (Anderson FTT appeal route)
- Vary opening; do NOT lead with "Schedule 24 of the Finance Act 2007 imposes...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Read `hmrc-penalties-late-landlord-tax-returns-2026` once before writing to ensure clean separation (Sch 55/56 procedural vs Sch 24 substantive).
- B6 / B7 will forward-cite this page; ensure the offshore-uplift section is structured so deeper offshore-disclosure pages can link to a specific anchor.

### House positions
- §27.2 is the primary anchor (verbatim band-mitigation matrix).
- §27.9 do-not-write list is critical: confirm "30% flat" is corrected; confirm "100% offshore cap" is corrected; confirm Cat 3 max is 200% not 100%.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Framing differentiator is the offshore Cat 2/3 + Sch 21 stacking depth. Write to it.
- Vary H2s from `hmrc-penalties-late-landlord-tax-returns-2026`.
- Vary opening.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §27.2 primary; §27.3 + §27.6 + §27.9 adjacent.
2. Claim in `wave7_page_tracker.md`, todo → in_progress + UTC.
3. Read brief.
4. Fetch competitor URLs (httpx + BS4).
5. Read closest existing pages (`hmrc-penalties-late-landlord-tax-returns-2026` for separation discipline).
6. Plan write.
7. Verify factual claims; **per §16.35: re-verify band percentages and offshore Cat 1/2/3 multipliers verbatim against Sch 24 + para 4A at write time; verify Anderson citation; verify Sch 21 FA 2015 asset-move stacking distinct from para 4A**.
8. Fetch Pexels hero image.
9. Write markdown at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`.
11. Verify six checks.
12. No middleware edit on initial launch.
13. Register in `monitored_pages`.
14. Commit on branch (BEFORE marking done; do NOT include tracker file).
15. Fill work-log below.
16. Mark done in tracker with 1-line Notes.
17. Append flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Spawn Monitor on Q&A file; keep working while waiting.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:** `schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries` (per brief).
- **Final category:** `landlord-tax-essentials` (per brief; lives under `/blog/landlord-tax-essentials/<slug>`).
- **H1 chosen:** "Schedule 24 FA 2007 Penalty Behaviour Bands: Landlord Inaccuracy Penalties Explained".
- **Meta title chosen:** "Schedule 24 FA 2007 Penalty Bands for Landlords" (47 chars; under 60-char floor).
- **Meta description chosen:** "Schedule 24 FA 2007 sets landlord inaccuracy penalty bands at 30%, 70%, 100%, with offshore Category 2 and 3 uplifts taking the maximum to 200%." (144 chars).
- **Why these vs other options:** H1 keeps the load-bearing Schedule 24 + FA 2007 statutory identifier upfront (the page is an anchor reference for B5/B6/B7/B10), then adds the operational framing "Penalty Behaviour Bands" + "Landlord Inaccuracy Penalties" for SERP intent match. Meta title trades the "explained" tail for character count headroom. Anti-templating: opening sentence is "When HMRC opens an enquiry into a landlord's tax return and finds the figures wrong, the penalty is calculated under Schedule 24..." rather than the banned "Schedule 24 of the Finance Act 2007 imposes..." opener.

### Competitor URLs fetched
- Skipped at per-write per §16.36 priority. The brief framing differentiator + §27.2 verbatim matrix lock + statute verbatim verification (Sch 24 paras 4 / 4A / 10 / 14 + Sch 21 FA 2015) is the load-bearing factual base. Competitor patterns from the brief (Shipleys worked-example structure; Haines Watts mitigation-floor narrative) used as composition hints; no fresh pattern extraction needed.

### Existing-page review
- `hmrc-penalties-late-landlord-tax-returns-2026` — read for separation discipline. Confirmed clean separation: existing page covers Sch 55 / Sch 56 (procedural late-filing + late-payment; £100 + £10/day + 6-month/12-month milestones). B8 covers Sch 24 (substantive inaccuracy; 30/70/100% + offshore uplift). No overlap. B8 forward-links to it under the "How Sch 24 sits alongside other landlord penalty regimes" section.
- `penalties-not-declaring-rental-income-hmrc` — read for the Sch 41 sibling regime. Existing page uses 20%/35%/70% bands as generic behaviour categories without naming Sch 41. B8 distinguishes Sch 41 (failure-to-notify, includes 12-month qualifier on 0% non-deliberate-unprompted floor) from Sch 24 (inaccuracy, no 12-month qualifier) explicitly. Forward-link added.

### Citations added
**External authority (9):** Sch 24 full schedule + paras 3 / 4 / 4A / 10 / 14 on legislation.gov.uk; Sch 21 FA 2015 full schedule; CH82420 (quality-of-disclosure handbook); CH83110 (suspension handbook).
**Internal links (3):** `/blog/landlord-tax-essentials/making-tax-digital-property-income-2026-complete-guide` (MTD ITSA suspension-condition tie-in); `/blog/landlord-tax-essentials/hmrc-penalties-late-landlord-tax-returns-2026` (Sch 55/56 separation); `/blog/landlord-tax-essentials/penalties-not-declaring-rental-income-hmrc` (Sch 41 separation).

### Internal links added
- See above 3 internal links.

### Inline CTA placements
- After "The three behaviour bands" walk (high-intent: reader knows where they sit; band classification is the largest lever).
- After "The offshore uplift under paragraph 4A" (high-stakes Cat 2/3 readers; can run to multiples of underlying tax).
- After "Suspension of careless penalties under paragraph 14" (suspension proposal is operational territory for PTP).

### Build attempts
- 1 attempt (clean). Build at `cd Property/web && npm run build` (after one-off `npm install` to populate wave7-b worktree node_modules — wave7-b worktree was fresh at launch).

### Verification
- em-dash count: 0
- en-dash count: 0
- Tailwind utility classes: 0 (no `class="…"` attributes in body)
- metaTitle length: 47 chars
- metaDescription length: 144 chars
- FAQ count: 12
- Body word count: 3,307
- Internal links resolve: 3 of 3 (MTD page exists; both penalty cross-links exist)
- External authority links: 9 (target was 6-8; over-shipped for verification breadth)
- Inline asides: 3

### Flags raised to wave7_site_wide_flags.md
- **F-4 BRIEF_DRIFT** — Sch 24 para 10 has NO "within 12 months" qualifier on careless-unprompted 0% floor. Brief + §27.2 conflate Sch 24 para 10 with Sch 41 para 13 (which DOES carry the 12-month qualifier on non-deliberate unprompted). Page written using corrected statute; the Sch 24 vs Sch 41 12-month distinction used as operational differentiator in the mitigation-floor section. Back-patch to §27.2 + B8 brief recommended at wave close (manager-callable). 15th Wave 7 drift catch.

### 2-3 sentence summary
B8 is the canonical Sch 24 FA 2007 penalty-matrix reference page for the Wave 7 Bucket B cluster: 3,307 words walking the three behaviour bands (careless / deliberate-not-concealed / deliberate-and-concealed), the para 4 maxima for Cat 1 / Cat 2 / Cat 3 territories, the para 10 mitigation floors, the para 4A offshore uplift, the Sch 21 FA 2015 asset-move 50% stacking penalty, and the para 14 suspension mechanic. B5 / B6 / B7 / B10 forward-cite B8's penalty matrix. F-4 BRIEF_DRIFT raised: brief + §27.2 carry an erroneous "(within 12 months)" qualifier on the careless-unprompted-0% floor (that cliff is Sch 41, not Sch 24); page written without the qualifier, Sch 24 vs Sch 41 distinction used as an operational differentiator.
