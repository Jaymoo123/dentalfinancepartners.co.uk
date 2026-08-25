# PACK N1: net-new — rent a chair in a salon: tax, VAT and employment status

Derived 2026-08-25 from FROZEN dossier `../personal_care_fitness_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **both-sides-led**, salon-owner column and stylist column side
by side before any prose). Ground truth: house_positions.md **§20.1, §20.2**, plus **§7** (VAT
thresholds), **§13** (status factors), **§9** (employer cost if reclassified), **§2** (sole-trader
taxation). Cite those sections in the writer's report, never on the page.

## 1. Target and permission level

- NET-NEW page, `Sole Trader and Self Employment` blog category. Proposed slug:
  `rent-a-chair-salon-tax-uk` (writer may refine; resolver conventions apply, no invented slugs).
- Grade NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- **C1 gate: none.** Niche-map row 60 is C1 CLEAR and does not appear in `C2_PLACEMENT.md` §8's
  carried-forward gate list. Row 60's note ("chair-rental status is generalist SA work") confirms
  this page belongs here.
- **GT gate: house §20 is authored (DRAFT 2026-08-25, personal_care_fitness gate).** §20 open
  question 2 binds this page: the live VATLP paragraph for the post-2012 chair-rental position is
  **not pinned**, so no VATLP number goes into copy unless independently verified at write time.
  §20 open question 1 (current HMRC hairdresser-status guidance versus ESM framing) means status
  factors are written generically from ESM, not from a named sector leaflet.
- Frozen-ground check: net-new slug, nothing to collide with; still verify the live
  `monitored_pages` table before the page is registered.

## 2. Equity register

None (net-new). Adjacent equity that must not be cannibalised: R1 holds the GSC query
`accountant for salons sutton` and keeps its existing **Chair Rental Income: Tax Treatment** H2 in
place (never delete depth). N1 differentiates by covering **both sides plus the VAT and status
mechanics in full**; R1 keeps a summary and links here.

## 3. Market keyword slice (ledger, N1 chair rental, 170/mo raw, peer-winnable 0)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| hmrc guidelines to rent a chair for hairdressers | 170 | alto-accounting pos 16 |

Sitemap topic evidence from the discovery pool, corroborating but not countable (dossier §2):
"becoming a self employed mobile hairdresser", "do hairdressers charge vat". Nobody holds a top-10
slot on this topic. Coverage-over-selection applies: one measured keyword is enough, volume is not
a gate.

## 4. Competitor teardown (the only ranking page, fetched 2026-08-25)

`alto-accounting.com/insights/rent-a-chair-hairdresser-tax-uk` — pos 16, ~2,400-2,600 words,
9 H2s, 6 FAQs. **The strongest page in the whole cluster and still only pos 16.**

- Does well: H1 date-tagged "(2026/27)"; opens on the ruling ("Renting a chair in a salon does not
  automatically make a hairdresser self-employed for tax purposes"); current figures (£90,000,
  15% employer NIC above £5,000, £10,500 Employment Allowance); an explicit worked example
  (£150/week chair rent, 20% = £30/week, **£1,560 a year per chair** under-accounted); and the
  best structural move in the sample, separating employment status from the VAT treatment of the
  rent ("the two questions are decided under completely different rules").
- Gaps we take: **no statutory basis whatsoever** for the standard-rating (no VATA 1994 Sch 9
  Group 1 para (ma), no 1 October 2012 date); cites **VATLP19820** as the live paragraph, which our
  own ground truth has flagged as unpinned; **no treatment of chair-rental income counting toward
  the salon's own £90,000 threshold**; **no disaggregation boundary at all**; nothing on the
  stylist's own tax position beyond status (no Class 4, no registration, no trading allowance);
  nothing on the genuinely-separate-room exception; em-dashes throughout; three CTA blocks and an
  "If you remember 5 things" listicle tail.
- Fusion's head-term page (fetched) covers chair rental as a business-model description only
  (fixed monthly payment versus income split) with **no VAT or status consequence** attached.

## 5. Whitespace

- **The statutory basis nobody states:** chair rental is standard-rated because VATA 1994 Sch 9
  Group 1 para (ma) (inserted by FA 2012) takes "the grant of facilities to a person who uses the
  facilities wholly or mainly to supply hairdressing services" out of the land exemption, **from
  1 October 2012**. Date-tagged, statutory, and absent from every fetched page.
- **Relabelling does not work:** splitting the invoice into "rent" plus "services" does not create
  an exempt element; it is one standard-rated supply of facilities.
- **The threshold interaction:** chair-rental income counts toward the salon's £90,000 rolling
  12-month turnover alongside its own takings. No fetched page says this, and it is the fact that
  turns the topic from academic into urgent for a mid-sized salon.
- **The genuinely separate room exception,** hedged: a room let with no services attached can still
  be exempt land, fact-specific, not the norm.
- **Both sides in one place:** alto addresses the salon owner's risk well and the stylist's own tax
  affairs barely at all. The stylist half (self-employed registration, Class 4, what the rent is
  deductible against, records) is open field.
- A recomputable **2026/27** worked example that does what alto's does and then carries on into the
  threshold consequence.

## 6. Fences (binding)

- **Standard-rating is always date-tagged to 1 October 2012** and always sourced to the statute,
  never to a VATLP paragraph number (house §20 open question 2 unpinned).
- **Disaggregation fence, verbatim in substance:** describe the boundary and describe HMRC's power
  to direct that the parties be treated as a **single taxable person (VATA 1994 Sch 1 paras 1A/2,
  prospective)**. The page **never** supplies a splitting recipe, never names a target structure,
  and never frames separation as a planning technique. Legitimate positions may be stated (a salon
  and a genuinely independent stylist are separate persons; timing capital spend or pricing is
  legitimate); scheming is not described.
- **Status is decided on the ordinary factors** (control, substitution, own clients, own prices,
  own products and kit, keeps own takings and pays the rent, freedom to work elsewhere), written
  generically from the employment-status factors, **not from a named sector leaflet**. A properly
  run rent-a-chair stylist is self-employed; a stylist paid a percentage on salon-set prices with
  salon-controlled hours looks like an employee. Mislabelling is named as the sector's classic
  failure; no reader is told which side they fall on.
- **Status and VAT stay visibly separate.** The page states in terms that getting status right does
  not fix the VAT treatment of the rent, and vice versa.
- If reclassification consequences are given, use the current employer figures: employer NIC **15%
  above £5,000 from 6 April 2025**, Employment Allowance **£10,500**. Never 13.8% / £9,100.
- Employment-law exposure (holiday pay, minimum wage, auto-enrolment, tribunal claims) is
  **described only**, one short paragraph, flagged as employment law rather than tax, no advice.
- No em-dashes. **No house-position section numbers in copy** (§ references belong in the report).
- No IR35 depth: one sentence maximum, IR35 bites only where a personal service company exists,
  and hand to E1.
- No expenses-checklist depth (that is R1's and the existing sole-trader checklist's ground): one
  sentence plus link.

## 7. Acceptance criteria (deterministic)

1. Answerable as H2s or FAQ entries: does a salon charge VAT on chair rent; is a chair-renting
   stylist self-employed; does chair rent count toward the salon's VAT threshold; what happens if
   HMRC decides the stylists are employees; can rent be split into rent plus services; what does a
   chair-rental agreement need to reflect.
2. Figures present and recomputable: **£90,000** registration and **£88,000** deregistration
   thresholds; **20%** standard rate; **1 October 2012** standard-rating date; employer NIC **15%**
   above **£5,000** and Employment Allowance **£10,500** if reclassification is costed; one full
   2026/27 worked example running chair rent through VAT **and** through the salon's threshold
   (e.g. Nadia's salon in Norwich, four chairs, weekly rent, annual VAT figure, then the effect on
   the rolling 12-month total). Class 4 6% and the £12,570 / £50,270 bands, if used on the
   stylist side, tagged as the 2025/26 rates still current when checked in August 2026.
3. Statutory references reader-facing and correct: VATA 1994 Sch 9 Group 1 para (ma); VATA 1994
   Sch 1 paras 1A/2 for the single-taxable-person direction. **No VATLP paragraph number.**
4. Structure: both-sides table in the opening 40%; status and VAT never merged into one answer.
5. Links: R1 (hairdressers), R2 (beauty therapists), the existing VAT registration page; resolver
   clean, zero invented slugs.
6. Zero em-dashes; zero house-position citations in body copy; every rate date-tagged.
7. Adversarial QA checks every VAT and status sentence against house §20.1/§20.2 substance and
   confirms the disaggregation paragraph describes without prescribing.

## 8. Expectation

170/mo raw with the only ranking page at pos 16 and missing the statutory basis, the threshold
interaction and the whole stylist side. Realistic: Google top-10 on the head phrasing within a
quarter of indexing, Bing earlier (the cluster currently has **zero** Bing surface, so any Bing
impression is new ground). Maturity caveat: net-new, judge at 28d Bing / 90d Google. Failure
trigger, written before the build: zero impressions on any chair-rental phrasing at 90d
post-index. Standing risk: if HMRC's sector status guidance or the VATLP paragraph is pinned
later, this page takes a dated one-paragraph back-patch, not a rewrite.
