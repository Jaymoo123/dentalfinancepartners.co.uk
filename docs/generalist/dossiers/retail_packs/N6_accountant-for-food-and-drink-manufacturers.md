# PACK N6: net-new — accountant for food and drink manufacturers

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **rate-boundary-led**). Sixth surface of the manufacturing hub.
Largest Companies House manufacturing sub-sector on the tier1 evidence, and the dossier's designated
host for niche-map row 72 (cake makers) tail demand.

## 1. Target and permission level

- NET-NEW page. Proposed slug: `accountant-for-food-and-drink-manufacturers` (writer may refine).
- Grade NET-NEW. Revert path: delete pre-deploy; post-deploy enters `monitored_pages`.
- C1 gate: row 73, no C1 restriction. CLEAR. **Row 72 (cake makers) note: N6 is the host surface and
  the dossier closes that cannibalisation note (§6).** No separate cake-maker page is created.
- Ground truth: **§7** (VAT registration, rates, MTD for VAT), **§21.4** (retail schemes, where the
  producer also retails), **§3** (corporation tax), **§8** (capital allowances on production plant),
  **§9** (payroll), **§2** for unincorporated producers.
- **GROUND-TRUTH GATE: CLEARED 2026-08-25.** The food and drink VAT liability position is now locked
  at **`house_positions.md` §21.9** (Sch 8 Group 1 three-layer structure; excepted items 1 to 7
  verbatim, including item 2 confectionery and item 5 savoury snacks; Note (5) confectionery
  definition; the settled cake-versus-chocolate-covered-biscuit line; Note (3) catering and the five
  Note (3B) hot-food tests; premises and cold takeaway per Notice 709/1; the zero-rated producer's
  registration inversion and Sch 1 para 14(1) exemption from registration; the producer-retailer
  handoff to §21.4; the excise fence). Write to §21.9 and stay inside its five **open-questions
  fences**, in particular: **no liability ruling on any borderline product**, no linked-goods
  de minimis figures, no VFOOD sub-paragraph citations, and **no excise statement of any kind**
  (§21.9.7 is a permanent fence, not a research gap).

## 2. Equity register

None (net-new).

## 3. Market keyword slice

The ledger assigns **no dedicated keyword rows** to this surface. Its demand is carried inside the
manufacturing family (~260/mo head, 590/mo merged per C3 §7a) plus the row 72 cake-maker tail, which
was not separately measured because the free expansions for this family were not run (delta **D4**).

**Coverage over selection: volume is not a gate.** The justification is structural: food and drink
is the largest manufacturing sub-sector by company count on the tier1 Companies House evidence, and
the VAT liability boundary is the single most consequential and most misunderstood tax question its
operators face. If D4 autocomplete or PAA expansion runs at write time, record what it returns; do
not resize the page on it.

## 4. Competitor teardown (fetched 2026-08-25, free)

No food-and-drink manufacturing accountancy page surfaced in the free sweep for this cluster.
Measured on the manufacturing field that did surface:

- **skynet `/manufacturing-accountant/`** (p11) lists the sectors it serves ("manufacturers of all
  types and sizes, from small specialist workshops to multi-line production facilities") with no
  sub-sector page and no food content.
- **skynet `/common-manufacturing-accounting-issues/`** (p7-11) is sector-neutral throughout.

Adjacent evidence from the retail side of the fetched sample: **neither lanop nor livingstones names
the zero-rate versus standard-rate food boundary anywhere**, despite both running retail pages where
it is the governing rule. Livingstones separately runs a large "how to open a coffee shop / bakery"
content fleet (7,440/mo, excluded from this cluster as EX-STARTUP-DIY) which is startup DIY content
and contains no VAT liability analysis.

Honest limitation: this teardown is a negative finding across the fetched sample, not an
observation of a ranking food-manufacturing page, because none exists in the field we swept.

## 5. Whitespace

- **The liability boundary, stated first and worked.** Most food for human consumption is
  zero-rated; confectionery, hot food, catering, savoury snacks and most beverages are not. For a
  producer, that single classification governs pricing, margin, the VAT registration calculation and
  whether registration is even worth avoiding. **No page in the fetched sample says any of it.**
- **The zero-rated producer's counter-intuitive position:** a zero-rated producer usually *wants* to
  be VAT registered, because outputs carry no VAT and inputs can be reclaimed, which inverts the
  usual small-business instinct to stay under the threshold. This is the most useful single
  paragraph the page can carry and it is unoccupied.
- **The producer who also retails**, which is most small food manufacturers (a bakery with a
  counter, a brewery with a taproom): mixed-rate takings, the retail scheme choice, and the handoff
  to N1.
- **Production plant capital allowances** at the FA 2026 rates, handed to N5.
- A recomputable 2026/27 worked example: one producer's mixed zero-rate and standard-rate output
  taken through to a VAT position and a taxable profit.

## 6. Fences (binding)

- **Food VAT ground truth = §21.9 (locked 2026-08-25).** Gate cleared. The borderline fence survives
  the lock and is permanent: no liability outcome asserted on a borderline product. Where a
  borderline is unavoidable, the page names the boundary as fact-specific and cites Notice 701/14
  and VFOOD rather than ruling (§21.9.3, open question 3).
- **Alcohol duty, Alcohol Duty Stamps, small producer relief and the draught relief regime are OUT
  OF SCOPE.** They are excise ground, not covered in `house_positions.md`, and nothing may be
  asserted about them. One neutral sentence acknowledging a drinks producer has excise obligations,
  with a gov.uk link, is the ceiling.
- **No food safety, HACCP, labelling or Natasha's Law content.** Not tax, not our competence.
- **No startup DIY content.** "How to start a food business" is the excluded EX-STARTUP-DIY intent
  (7,440/mo) and the A* lead-intent bar governs. The reader is an operating producer.
- **Assignment split:** retail scheme arithmetic is N1's, costing and WIP are N4's, capital
  allowances are N5's, the hire framing is N3's. One paragraph plus a link each.
- No house-position citations in reader copy (report only). No em-dashes. Rates date-tagged; 2025/26
  bands and Class 4 carry the "still current when checked August 2026" hedge.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: accountant for food manufacturers; accountant for drink /
   beverage producers; VAT on food a producer sells; is my product zero-rated or standard-rated;
   should a zero-rated food producer register for VAT; accountant for a bakery or cake business
   (the row 72 tail).
2. Figures, date-tagged and recomputable: VAT registration £90,000 and deregistration £88,000;
   standard 20%, reduced 5%, zero rate; retail scheme gates £1m and £130m where the producer
   retails; Annual Investment Allowance £1m, 40% first-year allowance from 1 January 2026 and
   main-rate WDA 18% to 14% from April 2026 on production plant; employer NIC 15% and the £5,000
   secondary threshold; corporation tax 25% / 19% with the £50,000 and £250,000 limits.
3. One full worked example (mixed-liability output to a VAT position and a taxable profit), every
   line re-derivable.
4. Structure follows the rate-boundary lead: the zero-rate versus standard-rate boundary stated in
   the opening sentences. No H2 phrasing shared with N1, N3, N4 or N5.
5. Links: N3, N1, N4, N5. Resolver-clean, zero invented slugs. §4 floors plus coverage floor pass.
6. Food VAT ground truth: **§21.9, locked 2026-08-25, gate CLEARED**. Delivery report confirms every
   liability sentence traces to §21.9 and breaches none of its open-questions fences.

## 8. Expectation

Coverage surface with unmeasured demand, hosting the row 72 tail, and it will not be judged on
volume. Realistic: impressions across food-producer and bakery phrasings within a quarter, given
the field is empty of tax substance; a head-term position is not expected. Maturity caveat:
net-new, judge at 28d Bing / 90d Google, on impression breadth rather than position. Failure
trigger: zero impressions across all named phrasings at 90d post-index. Recorded: if D4 expansion
later shows real head volume here, the surface is re-argued upward in the hub-growth review, not
resized now.

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| N1 (this wave) | mixed-rate food and retail schemes | Differentiate by side of the counter: N1 is the retailer computing output VAT on takings; N6 is the producer classifying its own product. One paragraph plus link each way. Both ship in this wave so QA enforces the split on both files. |
| `accountant-for-retail-shops-uk.md` (R1) | food retail | R1 is the shop, N6 is the producer. No shared phrasing. |
| row 72 cake makers (niche map) | overlapping niche | **N6 is the designated host surface; the dossier §6 note closes on that basis.** No separate cake-maker page is created in this wave or later without reopening the dossier. |
| `accountant-for-amazon-fba-sellers-uk.md`, ecommerce pages | producers selling online | Ecommerce wall. N6 carries no online-selling phrasing. Watch item. |
