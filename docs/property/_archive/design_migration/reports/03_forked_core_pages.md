# Report 03: the seven forked core pages

Agent brief: tear down the forked core pages route by route, side by side, and
recommend per page. Written 2026-08-22.

**Note on the count.** The brief and `CONTEXT.md` §4 both say "eight" but list
**seven** routes. There are seven. `/services/page.tsx` (the services hub) is a
separate heavy-churn file listed in §4's second bucket, not one of these; it is
out of scope for this report.

**Method.** All fourteen `page.tsx` files read in full, both sides. Facts
cross-checked against `docs/Property/house_positions.md`. Link and schema counts
produced by grep over the source, not by loading pages. Everything below is
**verified** from source unless labelled INFERRED.

---

## 0. The headline, before the detail

The designer's own working method (`CONTEXT.md` §4, owner's note) is confirmed
by the code. On every one of the seven, **their page is a re-presentation of our
prose**. Prompt-by-prompt comparison shows entire arrays copied verbatim:
`whoItHits` on `/section-24` is character-identical between
`Property/web/src/app/section-24/page.tsx:31-48` and
`Property_zip/web/src/app/section-24/page.tsx:134-159` apart from two added
fields (`outcome`, `icon`). Every FAQ set on all seven pages is byte-identical
apart from `£` being written `£` in some of theirs. Their worked examples
carry our arithmetic unchanged (`£82,000 / £20,232 / £3,600 / £16,632`,
section-24 both sides).

So this is not a content contest. It is a question of **what their re-layout
threw away on the way through**, and the answer is consistent and large:

| | OURS | THEIRS | delta |
|---|---|---|---|
| Unique outbound internal links, 7 pages | **135** | **52** | **-83** |
| ...of which deep links into blog clusters | **72** | **0** | **-72** |
| JSON-LD block types emitted | Article, BreadcrumbList, Service, FAQPage | **FAQPage only, all 7** | -3 types |
| hreflang `alternates.languages` | 3 pages carry it | 0 | -3 |
| `twitter:` card metadata | 6 of 7 | 0 | -6 |
| On-page lead form | 0 | **7** | **+7** |
| `data-cta` instrumented CTAs | 0 | **~30** | **+30** |

Per-route link counts (`href="..."`, `href: "..."` and `${BLOG}/...` forms,
deduplicated):

| Route | ours total | ours blog | theirs total | theirs blog |
|---|---|---|---|---|
| `/landlord-tax` | 19 | 6 | 9 | 0 |
| `/making-tax-digital-landlords` | 14 | 10 | 3 | 0 |
| `/section-24` | 19 | 12 | 7 | 0 |
| `/services/property-accountant` | 21 | 9 | 8 | 0 |
| `/services/landlord-accountant` | 20 | 11 | 11 | 0 |
| `/services/non-resident-landlord` | 23 | 16 | 8 | 0 |
| `/services/property-tax-advice` | 19 | 8 | 6 | 0 |

**Why that number is the decisive one.** `docs/Property/STRUCTURE_VS_COMPETITORS_2026-08-17.md:128-142`
is our own structural diagnosis, measured live five days ago. It found:

- raw internal links per page, us **22 to 55**, the ranking competitor **158 to 193**;
- links from all 760 blog posts *into* these hubs: `/landlord-tax` **0**,
  `/section-24` **0**, `/making-tax-digital-landlords` **0**;
- the same doc's depth table (`:170-171`) records our `/landlord-tax` and
  `/section-24` schema as "Article, Breadcrumb, FAQPage" and concludes
  "we ship richer schema... content quality is not the deficit."

We already diagnosed under-linking and over-reliance on these seven pages as the
*only* authored equity flowing outward into the clusters. Adopting the designer's
pages wholesale would cut the outbound half of that in half again and delete
100% of the blog deep links, on the exact pages the audit named. That is not a
close call.

**One partial mitigation, VERIFIED:** their `CalculatorTabs`
(`Property_zip/web/src/components/calculators/CalculatorTabs.tsx:137-209`)
renders `<button role="tab">`, not `<a href>`. It embeds the calculators
inline. So on the four pages where they replaced calculator link cards with
`CalculatorTabs`, the crawlable link is gone *and* the calculator is now on-page.
That is a genuine conversion gain traded against a link loss. On
`/services/property-accountant` and `/services/property-tax-advice` this is a
clean -4 calculator links each.

---

## 1. `/section-24`

OURS `Property/web/src/app/section-24/page.tsx` (627 lines)
THEIRS `Property_zip/web/src/app/section-24/page.tsx` (923 lines)

### 1.1 Structure, side by side

| # | OURS | THEIRS |
|---|---|---|
| 1 | Unsplash photo hero, navy 85% scrim, H1, 2 CTAs to `/contact` + calculator (`:163-198`) | `HeroBrickBackdrop` cream hero, same H1, 2 CTAs to `#book` + `#free-tools` (`:297-332`) |
| 2 | — | `StatsCounter` proof strip (`:336-340`) |
| 3 | — | "Sound familiar?" `PromptMarquee`, 6 first-person prompts + CTA (`:348-377`) |
| 4 | H2 What is Section 24? 3 paragraphs (`:204-227`) | H2 same, 1 paragraph + **before/after two-column figure** + Restricted / Still deductible tick-cross lists (`:379-504`) |
| 5 | H2 How much is the reducer worth 2026/27 and 2027/28 + worked-example table (`:231-327`) | H2 same, prose split into scannable run-in leads + 3-item cap list + same table in a card + `ExampleFigureNote` + inline CTA card (`:506-653`) |
| 6 | H2 Who does Section 24 hit hardest? 4 bars (`:336-366`) | H2 same, `CoverageCards columns={2} glow` (`:655-670`) |
| 7 | H2 Who is not affected? 4 bars (`:374-393`) | H2 same, divided rose-X list (`:672-706`) |
| 8 | H2 How can you reduce the cost? 4 cards, each with 2-3 blog links (`:401-499`) | H2 same, **`CardCarousel` autoplay, numbered** (`:708-780`) |
| 9 | H2 What changes in April 2027 (`:506-550`) | H2 same + `RateWedge` figure (`:782-835`) |
| 10 | H2 What does a review involve, navy, 5 ticks (`:558-597`) | H2 same, navy card + `DrawnTickList` animated (`:837-873`) |
| 11 | — | `TestimonialsSection` (`:880-884`) |
| 12 | — | Free tools `CalculatorTabs` (`:888-901`) |
| 13 | — | **`LeadCTAPanel` with `LeadForm`** at `#book` (`:907-918`) |
| 14 | H2 Section 24 questions, 10 FAQs (`:605-613`) | `FaqSection`, same 10 (`:919`) |
| 15 | `CTASection` to `/contact` (`:618-624`) | — (replaced by 13) |

Every H2 of ours survives in theirs, in order. No section was dropped.

### 1.2 Content coverage

**Ours has, theirs lacks:**

- Twelve internal links, all in body prose (`:222-226`, `:308-326`, `:351-365`,
  `:385-392`, `:424-434`, `:446-451`, `:464-469`, `:482-494`, `:524-530`,
  `:541-549`). Named targets lost:
  `.../how-to-calculate-section-24-tax-credit-step-by-step`,
  `.../section-24-worked-example-50k-rental-income-portfolio`,
  `.../can-section-24-push-higher-rate-tax`,
  `.../section-24-child-benefit-high-income-charge-landlords`,
  `.../section-24-basic-rate-taxpayers`,
  `.../section-24-vs-incorporation-which-saves-more-tax`,
  `.../section-24-joint-property-ownership-tax-split`,
  `.../section-24-pension-contributions-tax-planning`,
  `.../section-24-remortgaging-btl-property-tax-implications`,
  `.../section-24-interest-only-mortgage-tax-planning`,
  `.../section-24-2027-tax-year-planning-landlords`, plus the category hub
  `/blog/section-24-and-tax-relief`.
- The sentence carrying the hub's authority claim: "our Section 24 and tax relief
  guides run to more than forty pieces covering individual scenarios" (`:545-549`).
- Prose detail on what counts as a finance cost ("overdraft interest on a lending
  facility used for the property business", `:213-218`) — mostly preserved as
  list items in theirs (`:113-118`) but the enumeration of *why* is gone.

**Theirs has, ours lacks:**

- Six self-identification prompts (`:59-90`), new copy.
- The before/after arithmetic panel: `£24,000` taxed-on vs `£42,000` taxed-on
  (`:405-454`). Genuinely good — it shows the mechanism our prose only asserts.
- A three-item gloss on the reducer cap (`:214-227`), new copy.
- `outcome` one-liners on each `whoItHits` card (`:138,144,150,156`), new copy.
- A link to `/making-tax-digital-landlords` (`:813-818`) ours does not have.
- `ExampleFigureNote` disclaimers.

### 1.3 Facts and figures

Identical on both sides. Every figure checked against house positions:

| Figure | Both sides | House position | Verdict |
|---|---|---|---|
| Reducer 20% for 2026/27 | yes | §4 | OK |
| Reducer 22% from Apr 2027, tracks property basic rate | yes | §4, §7 | OK |
| Property income 22/42/47 from 6 Apr 2027, England+Wales+NI, Scotland carved out | yes | §7 — and correctly *not* "England and NI only" | OK |
| FA 2026 enacted 18 March 2026 | yes | §7 | OK |
| Three-part cap, excess carried forward | yes | §4 | OK |
| FHL abolished 6 Apr 2025, S24 now applies | yes | §6 | OK |
| £50,270 / £60,000 HICBC / £100,000-£125,140 taper | yes | §4 taper note | OK |
| Form 17, 60 days | yes | §6 joint ownership | OK |
| MTD £50,000 Apr 2026 / £30,000 Apr 2027 | yes | §3 | OK, but see below |
| WDA 18%→14%, 40% FYA, special rate 6% | yes | ground-truth memory | OK |
| Wedge stays 20pp / 25pp | yes | §7 "does NOT widen" | OK |

**Flag, both sides equally:** the MTD sentence stops at April 2027 and omits the
**£20,000 from 6 April 2028** step that house positions §3 locks. Not wrong, but
incomplete on a page that lists the other two. Trivial back-patch on whichever
version survives.

Arithmetic spot-check of the 2027/28 column, verified by hand:
£10,270 @ 22% = £2,259.40; £31,730 @ 42% = £13,326.60; sum £15,586;
salary £40,000 less PA £12,570 = £27,430 @ 20% = £5,486; total £21,072. Matches
the stated `£21,072`. Reducer 22% × £18,000 = £3,960. Net £17,112. **Correct on
both sides.**

### 1.4 SEO surface

| | OURS | THEIRS |
|---|---|---|
| `title` | "Section 24 Explained: Mortgage Interest Relief for Landlords" (`:10`) | same words, colon → pipe (`:24`) |
| `description` | carries "the 20% tax reducer now and 22% from April 2027" (`:11-12`) | replaced with a softer four-clause summary (`:25-26`) |
| canonical | yes (`:17`) | yes (`:27`) |
| `openGraph.type` | `article` (`:22`) | `website` (`:33`) |
| twitter card | yes (`:24-28`) | **none** |
| JSON-LD | `@graph` with **Article** (`:126-145`) + **FAQPage** (`:146-154`) | **FAQPage only** (`:294`) |
| H1 | identical wording, both sides | identical |
| Breadcrumb component | yes (`:173`) | yes (`:301`) — but neither emits BreadcrumbList JSON-LD on this route |

**Lost if theirs replaces ours:** Article schema, `og:type=article`, the twitter
card, the keyword-bearing meta description, and 12 outbound links including the
whole `/blog/section-24-and-tax-relief` cluster rail. This page is the *only*
authored inbound path from a commercial hub into that 40-piece cluster
(STRUCTURE_VS_COMPETITORS `:137-139` recorded 0 links the other way).

### 1.5 Conversion surface

- OURS: two `/contact` links, one `CTASection`, two calculator links. **No form,
  no `data-cta` attributes.**
- THEIRS: four `#book` CTAs with `data-cta` / `data-cta-placement` /
  `data-cta-goal="form"` (`:315-318`, `:365-368`, `:642-645`, `:769-772`), one
  `LeadCTAPanel` containing the real `LeadForm`, embedded `CalculatorTabs`,
  `StatsCounter`, `TestimonialsSection`.

`data-cta-placement` and `data-cta-goal` are the attribute names our own
homepage and contact page already use (`Property/web/src/app/page.tsx:686-688`,
`app/contact/page.tsx:69-71`), so the designer's instrumentation lands straight
into the existing funnel taxonomy. **VERIFIED**, not inferred.

### 1.6 Components theirs needs that we do not have

All missing: `HeroBrickBackdrop`, `RateWedge`, `PromptMarquee`, `CardCarousel`,
`FaqSection`, `CalculatorTabs`, `CoverageCards`, `LeadCTAPanel`, `StatsCounter`,
`TestimonialsSection`, `Eyebrow`/`Prose`/`InlineLink` (`ui/page-blocks`),
`ExampleFigureNote`, `DrawnTickList`, `lib/site-stats`, plus
`heroCreamSurface` and `btnOnCream` in `layout-utils`.

`lib/faq-page-schema.ts` is **byte-identical** apart from line endings, so no
work there. Our five calculators (`Section24Calculator`,
`IncorporationCostCalculator`, `MTDCheckerCalculator`,
`PortfolioProfitabilityCalculator`, `StampDutyCalculator`) all exist under
`components/calculators/` with the export names `CalculatorTabs` imports, so
`CalculatorTabs` ports without touching the calculators. `LeadForm`'s prop type
is identical on both sides (`{redirectOnSuccess?, submitLabel?}`), so
`LeadCTAPanel` drops in.

### 1.7 Recommendation — HYBRID, ours as the base

Keep our file. Re-skin it into their system and lift their genuinely additive
blocks. Specifically:

- **From ours, keep:** all metadata, the Article JSON-LD, every body link and the
  paragraph each one lives in, the worked-example table, the FAQ set.
- **From theirs, take:** the cream `HeroBrickBackdrop` hero; the before/after
  mechanism panel (`:405-454`) — it is the best single thing on either version;
  the Restricted / Still-deductible split; the reducer-cap gloss list;
  `PromptMarquee`; `CoverageCards` for `whoItHits`; the rose-X divided list for
  "Who is not affected"; `RateWedge`; `DrawnTickList`; `StatsCounter`;
  `TestimonialsSection`; `CalculatorTabs`; and the `LeadCTAPanel` at `#book`
  with all four `data-cta` CTAs.
- **Reject:** `CardCarousel` for the four routes. Each of our four route cards
  carries two or three blog links in its body; a carousel hides three-quarters of
  that behind an autoplay control. Render the four as a `CoverageCards` grid or
  keep our stacked cards, links intact.
- Add a "Related reading" rail at the foot for any links that will not fit back
  into the reskinned prose, so the count does not drop.

**Effort: 6 to 8 hours** once the shared component set exists (that cost is
counted once, in §8). Risks: the before/after panel and the worked example use
the same `£50,000 / £8,000 / £18,000` landlord and their code comment
(`:92-101`) warns to change them in both places or not at all; keep that
invariant. Low risk otherwise.

---

## 2. `/landlord-tax`

OURS `Property/web/src/app/landlord-tax/page.tsx` (722 lines)
THEIRS `Property_zip/web/src/app/landlord-tax/page.tsx` (1,262 lines)

### 2.1 Structure

Ours uses a local `Section({id, title, children, links})` helper (`:131-157`)
rendering twelve anchored sections inside one `max-w-4xl` column, each with an
optional link rail. Theirs is twelve full-width alternating bands.

| OURS section (id) | THEIRS equivalent |
|---|---|
| navy hero (`:192-218`) | cream `HeroBrickBackdrop` hero (`:414-450`) |
| — | `StatsCounter` (`:455-459`) |
| — | "Sound familiar?" `PromptMarquee` (`:469-498`) |
| `#what-tax` What tax do UK landlords pay? **five** taxes as `<li>` (`:223-261`) | same H2, **six** taxes as `CoverageCards columns={3}` (`:500-519`) |
| `#rental-income` How is rental income taxed? + bands table (`:263-331`) | same + bands table + `RentalProfitStack` + run-in-bold split (`:521-595`) |
| `#section-24` What is Section 24 (`:333-368`) | same + **new band/relief/gap table** + covers / does-not-apply lists (`:597-710`) |
| `#worked-example` (`:370-431`) | same, table extracted to data (`:712-786`) + inline CTA |
| `#expenses` (`:433-475`) | same, list + repair-vs-improvement two-card split (`:788-851`) |
| `#buying` (`:477-501`) | same, three rate-forward jurisdiction tiles (`:853-905`) |
| `#selling` (`:503-523`) | same + `DisposalFigures showRebasing={false}` (`:907-948`) |
| `#inheritance-tax` (`:525-545`) | same, divided list with rose X (`:950-1014`) |
| `#changes` + changes table (`:547-603`) | same table on a **navy band** (`:1022-1081`) |
| `#structure` (`:605-642`) | same + **new personal-vs-company comparison table** (`:1083-1141`) |
| `#deadlines` (`:644-671`) | same + `PenaltyLadder` (`:1143-1168`) |
| `#specialist` (`:673-698`) | same + 6-item decision list (`:1170-1208`) |
| — | `TestimonialsSection`, `CalculatorTabs`, `LeadCTAPanel` (`:1215-1254`) |
| FAQ, 12 questions (`:700-710`) | `FaqSection`, same 12 (`:1256`) |
| `CTASection` (`:715-719`) | — |

### 2.2 Content coverage

**Ours has, theirs lacks:**

- **Twelve stable section anchors** (`#what-tax` … `#specialist`, `:143`).
  Theirs has only `#free-tools`, `#book`, `#faqs`. No current internal reference
  to a `/landlord-tax#...` anchor exists (grepped `Property/web/src` and
  `docs/Property`, zero hits), so nothing breaks today — but the deep-link
  affordance and the AI-answer-engine fragment targets go.
- Six blog links plus `/landlord-compliance` and `/calculators/mtd-checker` and
  `/calculators/rental-income-tax-calculator`, all removed. Named:
  `.../landlord-tax-return-complete-guide-2026` (`:269`),
  `.../landlord-tax-changes-2026-complete-guide` (`:340`, `:552` — twice),
  `.../landlord-tax-deductions-uk-2026-complete-list` (`:438`),
  `.../first-time-landlord-tax-guide-...` (`:611`),
  `.../landlord-tax-calendar-2026-27-key-dates` (`:649`),
  `.../hmrc-penalties-late-landlord-tax-returns-2026` (`:653`).
- **`/landlord-compliance` (`:449-454`).** This link was added in wave 11
  (`aa77a994`, "landlord-compliance hub wiring") — it is live cluster wiring,
  three days old, and their snapshot predates it. Same for `/calculators/mtd-checker`.
- The safety-and-licensing sentence carrying that link (`:446-455`).
- `/contact` as a CTA target.

**Theirs has, ours lacks — and this one is substantive:**

- **A sixth tax: ATED** (`:126-131`). New content, not in ours. Copy:
  "An annual charge on company-held residential property worth over £500,000.
  Letting to unconnected tenants relieves it in full, but only if you claim."
  and outcome "A return every April, even when the relief reduces it to nil."
  Cross-checked against house positions §2 (`:158-161`): threshold £500,000,
  chargeable on non-natural persons, "rental property let to an unconnected
  tenant on commercial terms" is the common relief, "**ATED returns must be
  filed even where a relief is claimed**", return due 30 April. **Theirs is
  correct and ours is materially incomplete on this point.** Back-patch it.
- A per-band Section 24 relief/gap table (`:161-165`), new framing of facts
  already in our prose.
- The personal-vs-company comparison table (`:266-273`), which pulls our £5,146
  worked-example figure through into the structure section.
- The three-tile purchase surcharge lookup (`:226-242`).
- Repair vs improvement as a two-card split (`:200-211`).
- `PenaltyLadder` steps (`:283-288`).
- `ExampleFigureNote` on five figures.

### 2.3 Facts and figures

Every figure in ours also appears in theirs, unchanged. Both check out:

- Bands 0 / 20 / 40 / 45, £12,570 / £50,270 / £125,140 — OK.
- 22/42/47 from 6 Apr 2027, E+W+NI, Scotland separate — matches §7 exactly,
  including the corrected Wales position. OK both sides.
- Reducer 20% → 22% — §4. OK.
- Property allowance £1,000 — standard. OK.
- CGT 18% / 24%, AEA £3,000, 60 days — §5. **See flag below.**
- SDLT 5% surcharge on the whole price, 14 days, Scotland ADS 8%, Wales separate
  higher-rates table, 17% flat charge over £500,000 for companies with property
  rental business relief claimable and withdrawable — all match §1 including the
  Sch 4A 17% figure. OK both sides.
- IHT 40%, NRB/RNRB/£2m taper frozen to 5 Apr 2031, BPR/APR combined £2.5m from
  Apr 2026, no BPR on standard BTL — §9 and §15.4. OK both sides.
- Corporation tax 19% to £50,000, 25% from £250,000, marginal relief between;
  dividends 10.75 / 35.75 / 39.35 from 6 Apr 2026 above a £500 allowance;
  mileage 55p first 10,000 then 25p from 6 Apr 2026; WDA 18%→14%, 40% FYA,
  special rate 6%; PRR final 9 months; letting relief shared-occupation;
  spouse no-gain-no-loss — all OK both sides.
- Penalties: £100 automatic, £10/day for up to 90 days from 3 months, further at
  6 and 12 months based on tax outstanding — §5 late-filing note. OK both sides.

**Flag 1, both sides:** the CGT FAQ says "You must report the disposal and pay
the tax within 60 days of completion" without qualification (ours `:59`, theirs
`:372`). House positions §5 is explicit: UK residents file the 60-day return
**only where CGT is due**, and the do-not-write list names
"60-day applies to all UK residents' disposals regardless of tax due" as wrong.
Identical wording both sides, so this is not a reason to prefer either — but it
is a live factual defect on the page that ships. Fix in the port.

**Flag 2, both sides:** neither mentions that s.162 incorporation relief must
now be **claimed** for transfers on or after 6 April 2026 (FA 2026, house §5,
locked 2026-06-01). Both discuss incorporation relief as if automatic. Same
defect on `/services/property-accountant` FAQ. Back-patch.

**Flag 3, both sides:** the MTD ladder in the changes table stops at £30,000 /
April 2027 and omits £20,000 / April 2028 (§3).

**Arithmetic spot-check**, our worked example carried verbatim into theirs:
salary £45,000 + property £20,000 = £65,000; less PA £12,570 = £52,430 taxable;
£37,700 @ 20% = £7,540, £14,730 @ 40% = £5,892, total £13,432. Matches.
Less reducer £1,800 = £11,632. Matches. Property-attributable £5,146: the
no-property counterfactual is £45,000 − £12,570 = £32,430 @ 20% = £6,486, and
£11,632 − £6,486 = £5,146. **Correct.** 2027/28: £5,270 @ 22% = £1,159.40,
£14,730 @ 42% = £6,186.60, sum £7,346, less £1,980 = £5,366. **Correct.**

### 2.4 SEO surface

| | OURS | THEIRS |
|---|---|---|
| title | "Landlord Tax Explained: What UK Landlords Pay in 2026/27" (`:11`) | "Landlord Tax Explained 2026/27 \| What UK Landlords Pay" (`:24`) |
| description | itemises the six taxes and worked examples (`:12-13`) | itemises them too (`:26`) — comparable |
| canonical | yes (`:14`) | yes (`:27`) |
| twitter | yes (`:22-27`) | none |
| JSON-LD | **Article** (`:160-172`) + **BreadcrumbList** (`:174-181`) + **FAQPage** (`:187-190`) — three blocks, and Article carries `datePublished`/`dateModified` | **FAQPage only** (`:409-412`) |
| H1 | identical both sides | identical |
| Section anchors | 12 | 3 |

**Lost if theirs replaces ours:** Article + BreadcrumbList JSON-LD (this is one
of the two pages the 08-17 audit cited as evidence our schema beats the
competition), twelve section anchors, twitter card, and ten internal links
including the three-day-old `/landlord-compliance` wave-11 wiring.

### 2.5 Conversion surface

Ours: one `/contact` link, one calculator link, one `CTASection`. No form, no
instrumentation. Theirs: three `data-cta` CTAs to `#book`, one `LeadCTAPanel`
with `LeadForm`, `CalculatorTabs`, `StatsCounter`, `TestimonialsSection`.

### 2.6 Components needed

Same set as `/section-24`, plus `RentalProfitStack`, `DisposalFigures`,
`PenaltyLadder`, and `Prose`/`InlineLink` from `page-blocks`.

### 2.7 Recommendation — HYBRID, ours as the base, largest back-patch of the seven

- **Base: ours.** Keep the `Section` helper and its `id`s, all three JSON-LD
  blocks, the twitter card, every link rail.
- **Take from theirs:** the ATED card (verbatim, it is correct and we are missing
  it — promote "five taxes" to six in our `#what-tax` prose), the Section 24
  band/relief/gap table, the personal-vs-company comparison table, the three
  purchase-surcharge tiles, repair-vs-improvement cards, `RentalProfitStack`,
  `DisposalFigures`, `PenaltyLadder`, the navy treatment on `#changes`, the
  hero, `StatsCounter`, `TestimonialsSection`, `CalculatorTabs`, `LeadCTAPanel`.
- **Fix on the way through:** the 60-day qualifier, the s.162 claim point, and
  the £20,000/2028 MTD row.
- Their design converts our link rails into inline `InlineLink` prose. That is
  fine as a treatment; the constraint is that **no link may be dropped**. Their
  version dropped ten; the reskin must carry all nineteen.

**Effort: 8 to 10 hours.** Biggest of the seven because it is the longest page,
has the most links to preserve, and carries three real factual back-patches.
Risk: the `Section` helper's `scroll-mt-24 border-t first:border-t-0` pattern
does not survive a move to full-width alternating bands; keeping the anchors
means keeping `id` on the outer `<section>` in the new layout, which is trivial
but easy to forget.

---

## 3. `/making-tax-digital-landlords`

OURS `Property/web/src/app/making-tax-digital-landlords/page.tsx` (684 lines)
THEIRS `Property_zip/.../page.tsx` (1,191 lines)

### 3.1 Structure

| OURS | THEIRS |
|---|---|
| Unsplash navy hero (`:290-329`) | cream `HeroBrickBackdrop` hero (`:421-457`) |
| — | `StatsCounter` (`:460-464`) |
| — | "Nobody sent you a manual" `PromptMarquee` (`:473-502`) |
| H2 What is MTD for Income Tax, 4 paras (`:334-372`) | same H2, 1 para + **`FilingCadence` figure** + "None of this changes" chip row + 1 para (`:504-560`) |
| H2 When does MTD start for you, 3 bars (`:380-404`) | same, **three calendar tiles** with a live-pulse indicator (`:562-647`) |
| H2 Who has to comply, 4 bars (`:412-440`) | same + **gross-vs-profit £60/45/15k figure** + in/out badged list (`:649-754`) |
| H2 What do you have to do this year, 6 bars (`:448-479`) | same, `ProcessTimeline` (`:756-769`) |
| H2 What counts as a digital record, 3 paras (`:487-514`) | same + **specimen 4-row ledger table** + "What does not count" list (`:771-860`) |
| H2 How do you choose MTD software, 6 bars (`:522-547`) | same, `CoverageCards columns={2}` + inline CTA (`:862-920`) |
| H2 What happens if you miss a deadline, 3 paras (`:555-584`) | same, **two side-by-side penalty regimes** with a 4-point counter and bar chart + inline CTA (`:922-1036`) |
| H2 How we handle MTD for you, 4 numbered steps (`:592-618`) | same, `CoverageCards glow` (`:1038-1066`) |
| H2 What a specialist catches, 3 paras (`:625-646`) | same + **new 5-row specialist comparison** (`:1068-1140`) |
| H2 MTD questions, 14 FAQs + hub link (`:653-671`) | `FaqSection`, same 14 (`:1183-1187`) |
| `CTASection` (`:675-681`) | `TestimonialsSection`, `CalculatorTabs`, `LeadCTAPanel` (`:1147-1182`) |

### 3.2 Content coverage

**Ours has, theirs lacks — this is the worst link loss ratio of the seven:**

Ten `${BLOG}/...` deep links plus the hub, all removed. Named:
`making-tax-digital-property-income-2026-complete-guide` (`:365`),
`mtd-rental-income-threshold-exemptions` (`:400`),
`what-is-qualifying-income-for-mtd` (`:429`),
`mtd-itsa-jointly-owned-property-threshold-split` (`:434`),
`mtd-quarterly-deadlines-2026-2027-landlords` (`:466`),
`how-to-register-mtd-landlord-step-by-step-guide` (`:473`),
`mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence` (`:507`),
`mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics` (`:541`),
`mtd-itsa-late-submission-points-late-payment-15-30-31-worked` (`:577`),
`/blog/making-tax-digital-mtd` hub (`:665`), plus
`/blog/section-24-and-tax-relief` (`:346`).

Ours ends with 14 links; theirs with 3. That is 79% of the page's outbound
equity gone, on the hub the head-asset map flags as **"the most time-sensitive
upgrade"** (`docs/Property/head_asset_map_2026-08-16.md:150`, MTD 114,800/mo,
GSC pos 26.9). Losing the cluster rail on this page specifically is the single
worst SEO consequence in the whole set.

Also lost: the second `/calculators/mtd-checker` link (ours has two, theirs one).

**Theirs has, ours lacks:**

- The `specialistComparison` five-row table (`:160-186`) — genuinely new copy,
  and well judged: the left column is written as what a generalist reasonably
  does rather than as failure, which keeps the claim honest.
- The specimen digital record (`:143-148`), four rows demonstrating HMRC's
  property categories rather than listing them.
- The gross-vs-profit £60,000 / £45,000 / £15,000 figure (`:208-212`), our own
  example promoted from a sentence to a visual.
- `notARecord` three-item list (`:201-205`).
- The "None of this changes" chip row (`:128-135`).

### 3.3 Facts and figures

Identical both sides, all verified against house positions §3, §19.7 and §19.9:

- £50,000 from 6 Apr 2026, £30,000 from 6 Apr 2027, **£20,000 from 6 Apr 2028** —
  both sides carry all three (`:33-49` ours, `:93-121` theirs). **This page is
  the one that gets the ladder right on both sides.**
- Tested on gross qualifying income, property + self-employment combined, tax
  year two back — §19.2. OK.
- Companies outside MTD ITSA, CT600 continues, MTD for CT deferred — §3. OK.
- Joint owners tested on their share — §19.4. OK.
- Quarterly deadlines 7 Aug / 7 Nov / 7 Feb / 7 May, calendar-quarter election —
  OK.
- Cumulative updates; final declaration replaces the return; 31 Jan payment and
  POAs unchanged — OK.
- Points-based: 1 point per miss, **£200 at 4 points**, clears after 24 months —
  §3, §19.19. OK.
- Late payment 3% at day 15, further 3% at day 30, 10% p.a. from day 31, HMRC
  interest separate — §3 (Spring Statement 2025 accelerated schedule). OK.
- The £1,011 illustration on £10,000 paid 180 days late: 3% + 3% = £600, plus
  10% p.a. from day 31 for 150 days = £10,000 × 0.10 × 150/365 = £410.96, total
  £1,010.96. **Correct**, both sides.
- Three-year exit test; narrow exemptions (trustees, PRs, religious belief,
  digital exclusion) — §19.5, §19.3. OK.
- Digital link rule, bridging software allowed, retyping breaks it — §19.14. OK.
- Neither side writes the abandoned "£10,000 threshold" (§19.9 do-not-write). OK.

**No factual divergence between the two versions on this page.** Their copy is
current, as `CONTEXT.md` §6.5 predicted.

### 3.4 SEO surface

| | OURS | THEIRS |
|---|---|---|
| title | "Making Tax Digital for Landlords: Rules and Deadlines" (`:14`) | "Making Tax Digital for Landlords \| MTD for Income Tax 2026" (`:23`) — arguably better, carries "MTD for Income Tax" and the year |
| description | names £50,000/Apr 2026 and £30,000/Apr 2027 (`:15-16`) | more benefit-shaped, drops the figures (`:24-25`) |
| twitter | yes (`:25-30`) | none |
| JSON-LD | **four blocks**: BreadcrumbList (`:227-234`), Article with publisher logo + areaServed (`:235-257`), **Service** (`:258-273`), FAQPage (`:274-282`) | **FAQPage only** (`:416-419`) |
| H1 | identical | identical |

This page has the richest schema of the seven on our side and the same
FAQPage-only on theirs. Adopting theirs would delete a Service block, an Article
block and a BreadcrumbList.

### 3.5 Conversion surface

Ours: `/contact`, two `/calculators/mtd-checker` links, one `CTASection`.
Theirs: three `data-cta` CTAs, `LeadCTAPanel`+`LeadForm`, `CalculatorTabs`,
`StatsCounter`, `TestimonialsSection`.

### 3.6 Components needed

Adds `ProcessTimeline` and `FilingCadence` to the shared set.

### 3.7 Recommendation — HYBRID, ours as the base, highest priority to protect links

- **Base: ours.** Keep all four JSON-LD blocks, the twitter card, and every one
  of the fourteen links. Consider taking their `title` string — it is a better
  head-term title than ours and carries no cost.
- **Take from theirs:** the calendar tiles (excellent for three dated mandates),
  the gross-vs-profit figure, the specimen ledger, "what does not count", the
  split-penalty pair, the `specialistComparison` table (new copy, adopt it),
  `FilingCadence`, `ProcessTimeline`, `CoverageCards`, the hero, the panel.
- **Do not** let the "Free tools" `CalculatorTabs` block replace the two
  `/calculators/mtd-checker` links; keep both, since the MTD checker currently
  receives **0** in-body links from the entire 760-post blog
  (STRUCTURE_VS_COMPETITORS `:142`) and these two are its only support.
- Their calendar tiles carry a `live: true` flag set by hand (`:92`, code
  comment: "When the 2027 wave starts, move the flag down a row. Nothing on this
  page derives it from the clock."). That is a **manual staleness trap** with a
  known expiry of 6 April 2027. Either derive it from a date or write it into the
  same place we track content-refresh obligations. Flag for the plan.

**Effort: 7 to 9 hours.** Risk: medium-low. The one real risk is the `live` flag
above.

---

## 4. `/services/property-accountant`

OURS `Property/web/src/app/services/property-accountant/page.tsx` (592 lines)
THEIRS `Property_zip/.../page.tsx` (605 lines) — the closest pair in size.

### 4.1 Structure

| OURS | THEIRS |
|---|---|
| navy Unsplash hero, `priority`, CTAs `/contact` + `#what-we-do` (`:283-324`) | cream hero, CTAs `#book` + `#free-tools` (`:281-321`) |
| — | `StatsCounter` (`:325-329`) |
| Opening two paragraphs, no heading (`:326-343`) | same two paragraphs under a new H2 "Your tax bill is decided before the return is filed" + `TaxYearGap` figure (`:332-357`) |
| — | "Sound familiar" `PromptMarquee`, 6 prompts (`:362-387`) |
| `#what-we-do` H2 What a property accountant covers, 6 cards + rates/guide links (`:345-376`) | H2 Who this is for **moved above it** (`:389-416`), then `#included` same 6 as `CoverageCards` + inline CTA (`:418-454`) |
| H2 Who this is for, 4 audience cards + 3 sibling-service links (`:378-408`) | see above |
| H2 Why a specialist, navy, 4 cards (`:410-429`) | same, `CoverageCards` on white + inline CTA (`:457-486`) |
| — | `TestimonialsSection` (`:489`) |
| H2 How working together starts, 4 numbered steps (`:431-452`) | `ProcessTimeline` (`:491-501`) |
| H2 What it costs, 3 paragraphs + fee-guide blog link (`:454-485`) | H2 same, 1 paragraph + **4 fee-driver cards** + two-end cards + inline CTA (`:503-561`) |
| H2 Work out your own numbers first, **4 calculator link cards** (`:487-543`) | `#free-tools` `CalculatorTabs` (`:563-583`) |
| H2 FAQs, 12 in `<details>` (`:545-561`) | `FaqSection`, same 12 (`:598-602`) |
| **H2 Related reading, 8 blog links** (`:563-581`) | **deleted** |
| `CTASection` (`:583-589`) | `LeadCTAPanel` (`:585-596`) |

### 4.2 Content coverage

**Ours has, theirs lacks:**

- **The entire "Related reading" section** (`:192-225` data, `:563-581` render):
  eight curated blog links spanning four clusters —
  `how-to-choose-a-property-accountant`,
  `how-much-does-a-property-accountant-cost`,
  `change-landlord-accountants`,
  `finance-costs-section-24-complete-guide`,
  `making-tax-digital-landlords-april-2026-deadline`,
  `best-mtd-software-landlords-2026`,
  `buy-to-let-limited-company-complete-guide-uk`,
  `how-to-complete-landlord-self-assessment-filing-step-by-step-guide`.
- A ninth blog link in the fees section to the fee guide (`:474-479`).
- **Four crawlable calculator links** (`/calculators/section-24-calculator`,
  `/calculators/mtd-checker`, `/calculators/incorporation-cost-calculator`,
  `/calculators/portfolio-profitability-calculator`, `:495-532`) replaced by
  `CalculatorTabs`, which emits zero `<a href>`.
- The two middle paragraphs of "What it costs" (`:459-470`) — compressed into
  four cards; the prose detail about what does and does not move the fee is
  thinner in theirs.
- `#what-we-do` anchor (their equivalent is `#included`).

Net: **21 links → 8.**

**Theirs has, ours lacks:**

- Six client prompts (`:56-87`), new copy.
- `TaxYearGap` figure.
- Four fee-driver cards + "the simple end / the other end" pair (`:168-185`,
  `:528-542`) — a decent restatement of our fee prose.
- A new H2 for the opener ("Your tax bill is decided before the return is
  filed"), which our version left as an unheaded lede. Their H2 is better.
- One copy change worth noting: our process step 04 says "questions answered
  inside 24 hours" (`:125`); theirs says "inside one working day" (`:206`).
  Different promise. Owner call, not a fact.

### 4.3 Facts and figures

Identical. All verified:

- MTD £50,000 Apr 2026 / £30,000 Apr 2027 — §3. OK (both omit the 2028 step).
- Reducer 20% → 22% Apr 2027, property income 22/42/47, "leaves higher-rate
  landlords no better off" — §4, §7. OK.
- WDA 14% with 40% FYA on main pool — OK.
- Dividends 10.75 / 35.75 / 39.35 from 6 Apr 2026 — OK.
- **BADR 18% from 6 Apr 2026** (`:83` ours, `:141` theirs) — §5 "14% to 18% from
  6 April 2026". OK.
- IHT thresholds frozen to 5 Apr 2031 — §9. OK.
- 60-day CGT return after a residential disposal — stated in a service context
  ("the 60-day CGT return after a residential disposal"), which is acceptable.
- ATED returns each April for company-held residential above the threshold
  (`:98` ours, `:159` theirs) — §2, return due 30 April. OK.

**Flag, both sides:** the FAQ "What is the difference between a property
accountant and a regular accountant?" cites "incorporation relief under section
162" (`:143` ours, `:224` theirs) without the FA 2026 claim requirement (house
§5). Same defect as `/landlord-tax`. Back-patch once, in both places.

### 4.4 SEO surface

| | OURS | THEIRS |
|---|---|---|
| title | "Property Accountant for UK Landlords and Investors" (`:12`) | "Property Accountant \| Landlords, Portfolios & SPVs" (`:35`) |
| canonical + **hreflang** `en-GB` / `x-default` (`:15-21`) | canonical only (`:38`) |
| twitter | yes (`:29-34`) | none |
| JSON-LD | **Service** with `hasOfferCatalog` built from the six scope items, `audience`, `areaServed` (`:227-258`) + **FAQPage** (`:260-269`) | **FAQPage only** (`:278`) |
| H1 | identical both sides | identical |

The `hasOfferCatalog` block is the richest service markup on the site. Losing it
loses the machine-readable list of what the service includes.

### 4.5 Conversion surface

Ours: two `/contact`, one `#what-we-do` jump, four calculator cards, one
`CTASection` with `secondaryHref="/services"`. No form, no instrumentation.
Theirs: five `data-cta` CTAs (`hero_book`, `prompts_book`, `included_book`,
`difference_book`, `fees_book`), `LeadCTAPanel`, embedded `CalculatorTabs`,
`StatsCounter`, `TestimonialsSection`.

**This is the biggest conversion upgrade of the seven** — five instrumented asks
against zero, on the page the head-asset map treats as the money page for the
"property accountant" head term.

### 4.6 Components needed

Adds `TaxYearGap` to the shared set. Everything else already in it.

### 4.7 Recommendation — HYBRID, leaning further toward theirs than the other six

Their page is genuinely better shaped for conversion here, and the content delta
is small. But the link and schema deletions are still disqualifying on their own.

- **Base: take THEIR layout, port OUR head and OUR links into it.** This is the
  one page where I would build from their file rather than ours, because their
  section order (opener → prompts → who → what → why → proof → process → fees →
  tools → ask) is a better funnel than ours and the copy underneath is the same.
- **Re-add, non-negotiable:** the whole `metadata` object from ours including
  hreflang and twitter; the Service + `hasOfferCatalog` JSON-LD; the "Related
  reading" section with all eight blog links (put it between `FaqSection` and
  the footer, or as a rail under `#free-tools`); the fee-guide link; and four
  crawlable calculator links *alongside* `CalculatorTabs` (a small "or open the
  full calculator" link under each tab, or a link list under the tabs).
- Take their H2 for the opener. Ask the owner about "24 hours" vs "one working
  day" — it is a service promise, not a design choice.

**Effort: 4 to 6 hours.** Lowest of the seven, because the copy is
near-identical and the work is head-and-links restoration rather than re-layout.
Risk: low.

---

## 5. `/services/landlord-accountant`

OURS `Property/web/src/app/services/landlord-accountant/page.tsx` (625 lines)
THEIRS `Property_zip/.../page.tsx` (652 lines)

### 5.1 Structure

| OURS | THEIRS |
|---|---|
| navy hero, CTAs `/contact` + `#faqs` (`:220-261`) | cream hero, CTAs `#book` + `#free-tools` (`:259-299`) |
| — | `StatsCounter` (`:303-307`) |
| H2 What a landlord accountant covers, 6 bars + 3 links (`:263-303`) | same, `CoverageCards columns={2}` + same links as `InlineLink` (`:311-335`) |
| — | H2 Who we work with moved up, `CardCarousel` (`:337-345`) |
| H2 Buy to let landlords, 3 paragraphs (`:305-343`) | same H2, 3 rewritten paragraphs + `Section24Wedge` figure + inline CTA (`:347-399`) |
| H2 Rental portfolios, 3 paragraphs (`:345-396`) | same, 3 rewritten + `PortfolioPooling` figure (`:401-443`) |
| H2 Property investors, 3 paragraphs (`:398-435`) | same, 1 paragraph + **4 `investorFocus` cards** (`:445-480`) |
| H2 Letting agents, 3 paragraphs (`:437-480`) | same, 2 paragraphs + `AgencyBooks` figure + inline CTA (`:482-519`) |
| H2 Who we work with, 5 bars + LPC link (`:482-506`) | moved up, see above |
| H2 Why a landlord tax accountant, 3 paragraphs + 2 links (`:508-548`) | **navy band** + 2 paragraphs + **`ComparisonTable` 5 rows with its own CTA** (`:527-562`) |
| H2 From first call to first filing, 4 steps (`:550-573`) | `ProcessTimeline` (`:564-574`) |
| — | `TestimonialsSection` (`:581`) |
| H2 Landlord accountant near you, 2 paragraphs (`:575-594`) | same + `LocationMap` + a `/locations` link (`:583-610`) |
| `#faqs` 12 FAQs in `<details>` (`:596-614`) | `#faqs` `FaqSection` (`:643-649`) |
| `CTASection` (`:616-622`) | `#free-tools` `CalculatorTabs` + `LeadCTAPanel` (`:615-641`) |

### 5.2 Content coverage

**Ours has, theirs lacks:**

Eleven blog links (`:286`, `:330`, `:369`, `:375`, `:380`, `:422`, `:460`,
`:467`, `:497`, `:532`, `:539`):
`finance-costs-section-24-complete-guide`,
`buy-to-let-limited-company-complete-guide-uk`,
`capital-vs-revenue-expenditure-landlord-uk`,
`jointly-owned-property`,
`portfolio-landlord-mortgages-guide`,
`cgt-calculation-selling-buy-to-let-property-step-by-step`,
`mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly`,
`how-to-register-mtd-landlord-step-by-step-guide`,
`let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026`,
`change-landlord-accountants`,
`buy-to-let-accountants-near-me-guide`.

Substantive prose lost:

- The letting-agent paragraph enumerating commission recognition period, VAT on
  fees including disbursements, payroll for negotiators and property managers,
  **employer NIC 15% above the £5,000 secondary threshold**, and the agent's own
  NRL deduction and reporting obligation (`:448-455`). Their `AgencyBooks`
  component recovers "VAT on fees" and "employer NI at 15% above £5,000"
  (`AgencyBooks.tsx:25-26`) but drops the disbursement nuance and the NRL
  obligation framing. **VERIFIED** by reading the component.
- The investors paragraph on group ring-fencing, capital allowances on
  commercial, and **stamp duty analysis on acquisition including mixed use and
  multiple dwellings positions** (`:411-418`) — compressed to four card
  one-liners; the mixed-use/MDR point does not survive.
- The middle paragraph of "Why a landlord tax accountant" naming the three
  practical differences (`:522-527`) — recovered in the `ComparisonTable` rows,
  so no real loss there.
- The `#faqs` hero CTA target (theirs keeps `#faqs` on the wrapper, `:643`, so
  the anchor survives — no break).

**Theirs has, ours lacks:**

- Links to `/section-24` (`:326`), `/making-tax-digital-landlords` (`:496`) and
  `/locations` (`:603`). Three new hub links, and `/section-24` in particular is
  a hub-to-hub link we should keep in the port. The `/section-24` link replaces
  our link to a blog post on the same subject — a reasonable substitution but a
  net -1 to the cluster.
- Rewritten buy-to-let prose (`:354-374`) that is sharper than ours: "you can
  hand over more tax than you kept in rent... if you pay 40% on that slice, half
  the relief never arrives." Adopt it.
- Rewritten portfolio prose (`:415-435`) with the pooling danger stated
  ("one figure goes on the return, and a property that lost money all year leaves
  no mark on it"). Adopt it.
- `investorFocus` cards, `Section24Wedge`, `PortfolioPooling`, `AgencyBooks`,
  `LocationMap`, `ComparisonTable`.

Net: **20 links → 11.**

### 5.3 Facts and figures

Identical. Verified:

- Reducer 20% now, 22% from Apr 2027, property rates 22/42/47, higher-rate
  landlords pay more overall — §4, §7. OK.
- MTD £50,000 Apr 2026 / £30,000 Apr 2027, gross not profit, joint owners by
  share — §3, §19.4. OK.
- WDA 14%, 40% FYA, residential lets restricted so the answer is usually the
  repairs deduction — correct framing. OK.
- Dividends 10.75 / 35.75 / 39.35 — OK.
- 60-day residential CGT reporting — OK in service framing.
- IHT frozen to 5 Apr 2031, BPR does not apply to a straightforward let
  portfolio (Pawson), combined £2.5m allowance for the reliefs that survive —
  §9, §15.4. OK. Notably this page gets the Pawson point right on both sides.
- Employer NIC 15% / £5,000 secondary threshold — matches ground truth. OK on
  both (ours in prose, theirs in `AgencyBooks`).
- Let Property Campaign framing — OK.

**Flag, both sides:** "the 3% and subsequent surcharges on additional dwellings"
(`:517` ours, `:540` theirs). House positions §1 do-not-write bans
"the additional dwellings surcharge is 3%". Here it is written historically
("since 2015 the sector has absorbed... the 3% and subsequent surcharges"),
which is defensible, but it is close to the line and a skim reader could take
3% as current. Identical wording both sides. Recommend rewording in the port to
"the additional dwellings surcharge, now 5%".

### 5.4 SEO surface

| | OURS | THEIRS |
|---|---|---|
| title | "Landlord Accountant \| Accountants for Landlords & Buy to Let" (`:13`) | "Landlord Accountant \| Rental Income, Section 24 & MTD" (`:36`) |
| canonical + **hreflang** (`:16-22`) | canonical only (`:39`) |
| twitter | yes (`:30-35`) | none |
| JSON-LD | **Service** (`:175-191`) + **FAQPage** (`:192-200`) + **BreadcrumbList** (`:201-209`) | **FAQPage only** (`:256`) |
| H1 | identical | identical |
| `#faqs` anchor | yes (`:596`) | yes (`:643`) — preserved |

Ours' title carries "Accountants for Landlords" and "Buy to Let" as separate
head-term variants; theirs trades those for "Section 24 & MTD". Ours is the
better commercial title for this route. **INFERRED** from term coverage, not
from ranking data.

### 5.5 Conversion surface

Ours: `/contact`, `#faqs`, `CTASection`. No form.
Theirs: three inline `data-cta` CTAs plus a fourth inside `ComparisonTable`'s
`cta` prop, `LeadCTAPanel`, `CalculatorTabs`, `StatsCounter`,
`TestimonialsSection`, `LocationMap`.

### 5.6 Components needed

Adds `Section24Wedge`, `PortfolioPooling`, `AgencyBooks`, `ComparisonTable`,
`LocationMap` to the shared set.

### 5.7 Recommendation — HYBRID, ours as the base

- **Base: ours,** for the metadata and the three JSON-LD blocks.
- **Adopt their rewritten prose** for the buy-to-let and portfolio sections —
  it is better than ours and carries the same facts. Re-insert our blog links
  into it.
- **Take:** `Section24Wedge`, `PortfolioPooling`, `AgencyBooks`,
  `ComparisonTable` on a navy band, `ProcessTimeline`, `LocationMap`,
  `CardCarousel` for "Who we work with" (acceptable here — those five cards
  carry no links), `CoverageCards`, `TestimonialsSection`, `CalculatorTabs`,
  `LeadCTAPanel`, and their new `/section-24`, `/making-tax-digital-landlords`
  and `/locations` links.
- **Restore into the reskin:** all eleven blog links, the letting-agent
  disbursement + NRL-obligation detail, and the investor mixed-use/MDR sentence.
- **Reword** the 3% surcharge sentence.

**Effort: 7 to 9 hours.** Risk: medium. This page has the most component
dependencies (five unique to it) and the most prose that was genuinely rewritten
rather than re-laid-out, so the merge needs care to avoid losing the facts inside
the paragraphs their rewrite compressed.

---

## 6. `/services/non-resident-landlord`

OURS `Property/web/src/app/services/non-resident-landlord/page.tsx` (615 lines)
THEIRS `Property_zip/.../page.tsx` (616 lines)

**This pair has the largest content loss of the seven.** Theirs is the only one
of the four service pages where their file is *shorter* than ours in real prose,
and it deletes sixteen blog links — the entire authored rail into the
`/blog/non-resident-landlord-tax` cluster.

### 6.1 Structure

| OURS | THEIRS |
|---|---|
| navy hero, CTAs `/contact` + `#faqs` (`:211-252`) | cream hero, CTAs `#book` + `#free-tools` (`:252-292`) |
| — | `StatsCounter` (`:296-300`) |
| H2 How the scheme catches you, **4 paragraphs, 4 blog links** (`:254-305`) | same H2, 2 paragraphs + `SchemeFlow` figure (`:303-324`) |
| H2 What the service covers, 6 bars + 2 links (`:307-332`) | moved below the prompts; `CoverageCards` + same 2 links (`:355-372`) |
| H2 Who we work with, 6 cards (`:334-348`) | "Our clients" `PromptMarquee`, 6 **first-person rewrites** of the same six (`:326-353`) |
| — | `TestimonialsSection` (`:376`) |
| H2 Self Assessment when you live overseas, 4 paragraphs, 3 links (`:350-400`) | same H2, 4 paragraphs (compressed) + `FilingDates` + **nested `#free-tools` `CalculatorTabs`** + inline CTA (`:378-457`) |
| H2 Double tax treaties, 3 paragraphs, **5 blog links** (`:402-444`) | same H2, **`CoverageCards columns={3}`, prose rewritten into 3 cards, all 5 links gone** (`:459-469`) |
| H2 Selling from abroad: the 60-day rule, 3 paragraphs, 2 links (`:446-483`) | same, 3 compressed paragraphs + `DisposalFigures` + inline CTA (`:471-511`) |
| H2 Moving abroad with a UK portfolio, 3 paragraphs, **4 links** (`:485-528`) | same, 2 compressed paragraphs + `DepartureWindow` + inline CTA (`:513-548`) |
| H2 How working with us runs, 4 steps + fees paragraph (`:530-559`) | moved below; `ProcessTimeline` + same paragraph (`:573-589`) |
| H2 Where non-resident cases go wrong, navy, 4 ticks (`:561-579`) | same, **full-bleed navy band** (`:550-571`) |
| `#faqs` 12 FAQs + hub link (`:581-606`) | `#faqs` `FaqSection`, hub link gone (`:607-613`) |
| `CTASection` (`:608-612`) | `LeadCTAPanel` (`:594-605`) |

### 6.2 Content coverage

**Ours has, theirs lacks. Sixteen blog links:**

`nrl-withholding-tax-20-percent-basic-rate-deduction` (`:281`),
`nrl-scheme-letting-agents-quarterly-returns-mechanics` (`:285`),
`non-resident-landlord-scheme-uk-complete-guide` (`:293`),
`nrl-approval-receive-rent-gross-hmrc-guide` (`:297`),
`non-resident-landlord-self-assessment-filing-requirements` (`:370`),
`dont-pay-twice-an-introduction-to-tax-treaties` (`:424`),
`dta-tie-breaker-test-dual-residence-property-owners` (`:428`),
`moving-to-dubai-uk-rental-property-tax-pathway` (`:432`),
`moving-to-australia-uk-rental-property-tax-pathway` (`:436`),
`non-resident-cgt-uk-property-rates-reporting` (`:471`),
`non-resident-cgt-selling-uk-property-overseas-guide` (`:475`),
`leaving-uk-landlord-12-month-pre-departure-checklist` (`:502`),
`/blog/property-finance/expat-non-resident-landlord-mortgages` (`:506`),
`non-resident-landlords-uk-inheritance-tax-exposure` (`:516`),
`changes-nrl-companies` (`:520`),
`/blog/non-resident-landlord-tax` hub (`:599`).

The head-asset map (`docs/Property/head_asset_map_2026-08-16.md:45`) classes
`non-resident-landlord` as our single **HAVE-WINNING** asset — 124,800/mo,
GSC position 7.2, and the asset is described as "`/services/non-resident-landlord`
**+ NRL blog set**". This page is the connective tissue of the only cluster we
are currently winning. **Deleting sixteen of its links is the highest-risk single
change in the whole migration.**

Substantive prose lost:

- The agent-deduction mechanics paragraph: "the agent works out the 20% on rent
  less the expenses they happen to know about, which typically means their own
  fees and repairs they arranged. Mortgage interest, insurance, ground rent,
  accountancy and anything you paid directly do not feature" (`:275-289`).
  `SchemeFlow` partially recovers this ("But the 20% is not worked out on your
  profit", `SchemeFlow.tsx:119`, plus a deducted/not-deducted split at `:130`) —
  **VERIFIED**, so the substance survives, the prose does not.
- The rebasing detail: "market value at April 2015 or April 2019 instead of
  original cost, or elect for straight-line time apportionment" (`:466-470`).
  Theirs replaces this with "choosing the wrong basis is the expensive part"
  (`:487-490`). **The 2015 / 2019 dates and the time-apportionment election are
  gone entirely.** These are the operative facts in house positions §5 and
  §17.4. Real content loss.
- The 31 January / 31 July / £1,000 payments-on-account detail in prose —
  recovered inside `FilingDates` (`FilingDates.tsx:15-25`). **VERIFIED**, no loss.
- The "£100 a week" tenant threshold — recovered inside `SchemeFlow`
  (`SchemeFlow.tsx:13`). **VERIFIED**, no loss.
- 18% / 24% / £3,000 — recovered inside `DisposalFigures`
  (`DisposalFigures.tsx:20-22`). **VERIFIED**, no loss.
- The split-year / exchange-date / expat-refinancing detail (`:492-497`) —
  compressed to one sentence; `DepartureWindow` may carry some of it (not
  audited line by line; **INFERRED** partial recovery).

**Theirs has, ours lacks:**

- Six first-person prompts (`:93-124`), new copy, better than our third-person
  card stack for this audience.
- Links to `/section-24` (`:392`) and `/making-tax-digital-landlords` (`:400`).
- `SchemeFlow`, `FilingDates`, `DisposalFigures`, `DepartureWindow` figures.
- Four `data-cta` inline CTAs plus the panel.
- A neat placement decision: `CalculatorTabs` nested inside the filing section
  with a scoped tab set `["section24","mtd","stampduty"]` (`:431`).

Net: **23 links → 8.**

### 6.3 Facts and figures

Identical where both state a fact. Verified against house §5, §16, §17:

- NRL scheme: 20% basic rate deducted at source by the UK agent, or by a tenant
  paying more than £100 a week; paid quarterly; credited against the eventual
  liability — §17.5, §16.6 ("NRL scheme is statutory, not treaty"). OK.
- Usual place of abode test, not the SRT; six months or more; you can be UK
  resident and still in the scheme — §17.5. OK.
- NRL1 / NRL2 / NRL3 by taxpayer type; approval effective from the start of the
  quarter HMRC accepts it; changes timing not amount — OK.
- NRL6 certificates. OK.
- Personal allowance: UK and Irish nationals, EEA nationals, treaty-country
  residents; disregarded income election as the alternative — §17.6 territory.
  OK.
- Non-resident CGT: UK residential **and commercial** land, plus indirect
  disposals where the entity derives ≥75% of value from UK land and the holding
  is ≥25%; 18% / 24%; AEA £3,000; **return on every disposal including nil and
  loss**, 60 days, penalties even where no tax is due — §5, §17.4. OK, and this
  correctly states the stricter non-resident rule that §5's do-not-write list
  cares about.
- Non-resident companies pay corporation tax on UK property income since April
  2020, bringing loan relationship and CIR rules — OK.
- ATED on higher-value residential held by non-natural persons unless a relief
  is claimed — §2. OK.
- Treaty framing: source-state primacy on immovable property, credit capped at
  local tax, 5 April year-end mismatch, residence tie-breaker — §16.2, §16.4.
  OK both sides.
- Section 24 20% → 22%, property rates 22/42/47 — OK.
- MTD £50,000 / £30,000, no overseas exemption, agent does not take the
  obligation — §3. OK.
- IHT: UK land in charge whoever owns it, offshore-company shelter closed for
  residential, thresholds frozen to 5 Apr 2031 — §9, §15.6. OK.

**Only factual divergence between the versions:** ours states the rebasing
dates (5 April 2015 residential, 5 April 2019 non-residential, per §5) and the
straight-line time-apportionment election; theirs does not. **Ours is the more
complete and more accurate version on this point.** No divergence the other way.

### 6.4 SEO surface

| | OURS | THEIRS |
|---|---|---|
| title | "Non-Resident Landlord Accountant \| UK Tax for Overseas Landlords" (`:12`) | "Non-Resident Landlord Accountant \| NRL Scheme & UK Returns" (`:39`) |
| canonical | yes (`:15`) | yes (`:42`) |
| twitter | yes (`:23-28`) | none |
| JSON-LD | **Service** with `audience` and `areaServed` (`:180-195`) + **FAQPage** (`:196-204`) | **FAQPage only** (`:249`) |
| `#faqs` | yes (`:581`) | yes (`:607`) — preserved |

Ours' title carries "UK Tax for Overseas Landlords", which covers the
"overseas landlord" variant; theirs carries "NRL Scheme". Given the head-asset
map lists "nrls (110,000)" as the volume driver (`:45`), theirs may be the
better title. **INFERRED.** Worth an owner/data check rather than a guess.

### 6.5 Conversion surface

Ours: `/contact`, `#faqs`, `CTASection`. No form.
Theirs: five `data-cta` CTAs (`hero_book`, `clients_book`, `calculators_book`,
`disposals_book`, `predeparture_book`), `LeadCTAPanel` with NRL-specific
proof points, scoped `CalculatorTabs`, `StatsCounter`, `TestimonialsSection`.

### 6.6 Components needed

Adds `SchemeFlow`, `FilingDates`, `DisposalFigures`, `DepartureWindow`.

### 6.7 Recommendation — RE-SKIN OURS, minimal adoption. Handle this page last.

This is the one page where I would be most conservative.

- **Base: ours, unchanged in content.** Keep the Service JSON-LD, the twitter
  card, all sixteen blog links, the four-paragraph scheme explanation and the
  rebasing detail.
- **Take from theirs, purely as presentation:** the cream hero, `StatsCounter`,
  `PromptMarquee` (their six first-person prompts are better copy — adopt the
  strings), `CoverageCards`, `SchemeFlow`, `FilingDates`, `DisposalFigures`,
  `DepartureWindow`, `ProcessTimeline`, the full-bleed navy failure-points band,
  `TestimonialsSection`, the scoped `CalculatorTabs`, `LeadCTAPanel` and all five
  `data-cta` CTAs. Add their `/section-24` and `/making-tax-digital-landlords`
  links.
- **Do not** let a figure component replace a paragraph that carries a link.
  On this page specifically, every compressed paragraph took links with it.
  The rule for the reskin: figure *and* prose, not figure *instead of* prose.
- The link count must come out **≥ 23**, ideally 25 with their two additions.
  Make that an explicit acceptance check on this page.

**Effort: 6 to 8 hours,** most of it careful re-insertion rather than layout.
**Risk: HIGH by consequence, low by mechanics.** This is our only
HAVE-WINNING asset (`head_asset_map_2026-08-16.md:45`) and the only cluster
where we hold a top-10 position. A regression here is visible in GSC within
weeks. Recommend this page ships last, alone, so its effect is separable in the
data.

---

## 7. `/services/property-tax-advice`

OURS `Property/web/src/app/services/property-tax-advice/page.tsx` (683 lines)
THEIRS `Property_zip/.../page.tsx` (599 lines)

### 7.1 Structure

| OURS | THEIRS |
|---|---|
| navy hero, CTAs `/contact` + `#faq` (`:238-279`) | cream hero, CTAs `#book` + `#free-tools` (`:314-351`) |
| — | `StatsCounter` (`:355-359`) |
| H2 Advice, not another set of accounts, 3 paragraphs (`:281-310`) | same H2, 1 paragraph + `DecisionWindow` + 2 paragraphs (`:363-386`) |
| H2 What the advice covers, 6 bars + **"Background reading" box with 8 blog links** (`:312-402`) | H2 Triggers `PromptMarquee` first (`:388-418`), then H2 same, `CoverageCards` with new `outcome` lines (`:420-432`). **Background reading box deleted.** |
| H2 When a consultation is worth booking, 6 scenario cards (`:404-420`) | replaced by the 6 first-person `triggerPrompts` (`:104-135`) |
| H2 How an engagement works, 5 steps (`:422-445`) | `ProcessTimeline` (`:434-442`) |
| H2 Why a specialist, 5-row two-column table (`:447-482`) | `ComparisonTable` with a CTA (`:480-510`) |
| H2 The rules your advice has to work around, 8-row table + rates link (`:484-567`) | same 8 rows, extracted to `changes` data, same rates link (`:512-550`) |
| H2 Run the numbers yourself first, **4 calculator link cards** + 2 links (`:569-622`) | `#free-tools` `CalculatorTabs` scoped to 4 + the same 2 links (`:555-577`) |
| H2 What you get from a consultation, navy, 6 ticks (`:624-658`) | navy band + `DrawnTickList` + CTA, **moved much earlier** (`:444-478`) |
| `#faq` 12 FAQs (`:660-674`) | `#faqs` `FaqSection` (`:594-596`) |
| `CTASection` (`:676-680`) | `LeadCTAPanel` (`:581-592`) |

### 7.2 Content coverage

**Ours has, theirs lacks:**

- **The "Background reading before you book" box** (`:328-399`), eight curated
  blog links across five clusters:
  `how-to-choose-right-property-company-structure-uk-landlords-2026`,
  `2027-property-tax-rates-section-24-relief-uk-landlords`,
  `cgt-deferral-strategies-property-investors-uk`,
  `cgt-property-transfer-limited-company-calculate`,
  `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`,
  `iht-april-2026-bpr-apr-cap-property-impact`,
  `fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics`,
  `best-mtd-software-landlords-2026`.
- **Four crawlable calculator links** (`:578-607`) replaced by `CalculatorTabs`.
- The six `scenarios` cards (`:64-89`), each a two-to-three-sentence explanation.
  Theirs replaces them with six one-line first-person prompts. **This is a real
  content reduction**, roughly 250 words of substantive copy traded for 80 words
  of recognition cue. Their prompts are better as a hook; our scenarios are
  better as content. They are not the same thing and both have a place.
- **Anchor `#faq` → `#faqs`.** Ours' hero CTA points at `#faq` (`:271`); theirs
  wraps `FaqSection` in `id="faqs"` (`:594`). Nothing in the monorepo or docs
  links to `/services/property-tax-advice#faq` (grepped, zero hits), so no
  external break — but note it if any off-site link exists. **INFERRED** that
  none does; I checked internal sources only.

Net: **19 links → 6.**

**Theirs has, ours lacks:**

- An `outcome` line on each of the six coverage cards (`:53-91`) — six new
  one-liners, each naming the deliverable rather than the topic. Good copy,
  adopt it.
- The six `triggerPrompts` (`:104-135`), new copy.
- `DecisionWindow` figure, `DrawnTickList` animated deliverables,
  `ComparisonTable`.
- Better section ordering: the navy Deliverables band moved from the
  second-to-last position to the middle, so the "what do I actually get" answer
  arrives before the differentiation argument rather than after it.

### 7.3 Facts and figures

The eight-row changes table is **verbatim identical** between the two versions
(ours `:504-554`, theirs `:198-231`). Verified against house positions:

| Row | Both sides say | House | Verdict |
|---|---|---|---|
| Rates on property income | 22/42/47 replace 20/40/45 in E, W and NI; Scotland not affected for 2027/28; 6 Apr 2027 | §7 | **Exactly right**, including the corrected Wales position |
| S24 reducer | 20% → 22%, tracks property basic rate, higher-rate wedge stays 20 points; April 2027 | §4, §7 | OK |
| MTD | over £50,000 from Apr 2026, over £30,000 from Apr 2027 | §3 | OK, £20,000/2028 omitted |
| WDA | main pool 18% → 14%, new 40% FYA, special rate 6%; 2026/27 | ground truth | OK |
| Dividends | 10.75 / 35.75 / 39.35; 6 Apr 2026 | ground truth | OK |
| BADR | 18%; 6 Apr 2026 | §5 | OK |
| IHT | frozen, combined BPR/APR allowance capped at £2.5m; to 5 Apr 2031 | §9, §15.4 | OK |
| Employer NIC | 15% with a £5,000 secondary threshold | ground truth | OK |

Elsewhere, both sides: capital allowances on embedded fixtures and the s.198
election; option to tax for VAT; non-residential SDLT rates; BPR rarely applies
to rental property; seven-year clock; freezer share structures; 60-day CGT
deadline; Let Property Campaign. All consistent with house positions.

**No factual divergence between the versions on this page at all.** The changes
table is the cleanest fact surface of the seven, on both sides.

### 7.4 SEO surface

| | OURS | THEIRS |
|---|---|---|
| title | "Property Tax Advice from Specialist Advisors" (`:12`) | "Property Tax Advice \| One-Off Specialist Consultations" (`:37`) |
| canonical + **hreflang** (`:15-21`) | canonical only (`:40`) |
| twitter | yes (`:29-34`) | none |
| JSON-LD | **Service** (`:193-214`) + **FAQPage** (`:216-224`) | **FAQPage only** (`:311`) |
| anchor | `#faq` (`:660`) | `#faqs` (`:594`) |

### 7.5 Conversion surface

Ours: `/contact`, `#faq`, four calculator cards, `CTASection`. No form.
Theirs: four `data-cta` CTAs plus a fifth inside `ComparisonTable`,
`LeadCTAPanel` with advice-specific proof points ("One-off advice welcome / No
need to move your accounts to us" — good, addresses the page's core objection),
scoped `CalculatorTabs`, `StatsCounter`, `TestimonialsSection`.

### 7.6 Components needed

Adds `DecisionWindow`. `ComparisonTable` and `DrawnTickList` shared with pages 5
and 1 respectively.

### 7.7 Recommendation — HYBRID, take their section order

- **Base: ours** for metadata (hreflang, twitter), Service JSON-LD, the eight
  blog links, the four calculator links and the six `scenarios` cards.
- **Take from theirs:** the section ordering (Deliverables moved to the middle),
  `DecisionWindow`, `ComparisonTable`, `DrawnTickList`, `CoverageCards` with the
  new `outcome` lines, `PromptMarquee`, the hero, `StatsCounter`,
  `TestimonialsSection`, scoped `CalculatorTabs`, `LeadCTAPanel` and the CTAs.
- **Keep both** the six triggers-as-prompts *and* the six scenarios-as-cards.
  Prompts near the top as the hook; scenarios lower down as the substance. They
  cost nothing together and the page loses real copy otherwise.
- Keep `id="faq"` **and** add `id="faqs"` on the wrapper so neither anchor form
  404s. One line.
- Restore "Background reading" as a rail, and keep four crawlable calculator
  links alongside the tabs.

**Effort: 5 to 7 hours.** Risk: low. The facts table transfers as data with no
edits at all.

---

## 8. Cross-cutting: what the port actually costs, and what it must not break

### 8.1 The shared component set — build once, before any page

Twenty-nine files exist in the snapshot and **none of them exist in the
monorepo** (verified by path check). Roughly 3,300 lines:

| File | lines | used by |
|---|---|---|
| `components/ui/CardCarousel.tsx` | 278 | s24, landlord-acct |
| `components/property/RentalProfitStack.tsx` | 215 | landlord-tax |
| `components/calculators/CalculatorTabs.tsx` | 211 | all 7 |
| `components/property/ComparisonTable.tsx` | 201 | landlord-acct, advice |
| `components/property/SchemeFlow.tsx` | 177 | NRL |
| `components/property/LeadCTAPanel.tsx` | 176 | all 7 |
| `components/property/RateWedge.tsx` | 147 | s24 |
| `components/property/ProcessTimeline.tsx` | 133 | MTD, 4 services |
| `components/property/FilingDates.tsx` | 130 | NRL |
| `components/property/LocationMap.tsx` | 124 | landlord-acct |
| `components/property/DepartureWindow.tsx` | 122 | NRL |
| `components/property/FilingCadence.tsx` | 109 | MTD |
| `components/property/PortfolioPooling.tsx` | 108 | landlord-acct |
| `components/ui/page-blocks.tsx` | 104 | all 7 (`Eyebrow`/`Prose`/`InlineLink`) |
| `components/property/CoverageCards.tsx` | 104 | all 7 |
| `components/property/PenaltyLadder.tsx` | 101 | landlord-tax |
| `components/property/PromptMarquee.tsx` | 98 | 6 of 7 |
| `components/property/AgencyBooks.tsx` | 94 | landlord-acct |
| `components/property/StatsCounter.tsx` | 92 | all 7 |
| `components/property/Section24Wedge.tsx` | 91 | landlord-acct |
| `components/property/DisposalFigures.tsx` | 90 | landlord-tax, NRL |
| `components/property/TestimonialsSection.tsx` | 89 | all 7 |
| `components/property/DrawnTickList.tsx` | 87 | s24, advice |
| `components/property/DecisionWindow.tsx` | 77 | advice |
| `components/property/TaxYearGap.tsx` | 71 | property-acct |
| `components/property/FaqSection.tsx` (`ui/`) | 47 | all 7 |
| `components/layout/HeroBrickBackdrop.tsx` | 43 | all 7 |
| `components/ui/ExampleFigureNote.tsx` | 30 | 4 pages |
| `lib/site-stats.ts` | 16 | all 7 |
| plus `layout-utils`: `siteContainerXl`, `heroCreamSurface`, `btnOnCream` | 3 exports | all 7 |

**Good news, verified:**
- `lib/faq-page-schema.ts` is byte-identical apart from line endings. No work.
- `LeadForm`'s prop type is identical on both sides (`{redirectOnSuccess?:
  boolean; submitLabel?: string}`), so `LeadCTAPanel` compiles against our real
  `LeadForm` without a shim.
- All five calculators `CalculatorTabs` dynamically imports exist in
  `Property/web/src/components/calculators/` with matching export names.
- `data-cta-placement` / `data-cta-goal` match the attribute names already used
  by `app/page.tsx` and `app/contact/page.tsx`, so instrumentation lands in the
  existing funnel taxonomy with no analytics change.

These twenty-nine are shared with the rest of the migration (homepage,
`/services`, `/incorporation`, calculators), so their cost belongs to the
programme, not to this report. Rough order: **12 to 18 hours** for the set,
mostly mechanical, plus typecheck reconciliation against the real
`@accounting-network/web-shared` per `CONTEXT.md` §5's corollary risk.

### 8.2 Wave and cluster coupling — what a swap would break

**Searched:** `Property/web/src` for every reference to the seven routes, and
`docs/Property/` for the briefs that produced our versions.

| Surface | Finding | Break risk if theirs replaces ours |
|---|---|---|
| `app/sitemap.ts:12-23` | all seven listed by path | **None.** Path-based; content-agnostic. |
| `app/services/page.tsx:36-51` | hub links to the four service routes | **None.** |
| Footer / nav | routes reached via `/services` and the four topic hubs (`STRUCTURE_VS_COMPETITORS:128`) | **None.** |
| `middleware.ts:428-505` | ~20 `DUPLICATE_REDIRECTS` entries pointing at `/blog/property-accountant-services/*` and `/blog/making-tax-digital-mtd/*` | **None directly** — they target blog posts, not these routes. |
| `app/incorporation/page.tsx:299-308` | links in to `/services/property-tax-advice`, `/services/property-accountant`, `/landlord-tax` | **None.** Inbound. |
| `app/landlord-compliance/page.tsx:320,538-539,604,870,882,910` | six inbound links to `/landlord-tax`, `/section-24`, `/services/landlord-accountant` | **None.** Inbound. But note the *reciprocal* link (`/landlord-tax` → `/landlord-compliance`) exists only in ours. |
| `app/leasehold/page.tsx:487,532`, `app/landed-estates/page.tsx:444`, `app/cost-of-selling-a-property/page.tsx:544` | inbound from wave 11/12 pages | **None.** Inbound. |
| `src/tests/qa-gate.test.ts`, `call-brief.test.ts`, `intent-engine.test.ts`, `calculator-goldens.test.ts` | **No test asserts anything about these seven page files.** The hits are on blog category slugs (`section-24-and-tax-relief`), calculator ids (`section-24-calculator`) and intent topic keys | **None.** Confirms `CONTEXT.md` §6.6: test coupling is light, and on inspection it is effectively zero. |
| `lib/intent/taxonomy.ts:48-53`, `lib/support/faq.ts:27`, `lib/assistant/opener.ts:21,37,122`, `lib/resources/registry.ts:73-82` | keyed on the topic string `"section-24"` and calculator ids, not on the route | **None.** |
| `config/lead-nurture.ts:170`, `lib/leads/sequence-gen.ts:76` | reference `/calculators/section-24-calculator` | **None.** |
| Anchor fragments | grep for `landlord-tax#`, `section-24#`, `property-accountant#`, `making-tax-digital-landlords#` across `Property/web/src` and `docs/Property`: **zero hits** | **None internally.** Off-site inbound anchors not checkable from here. |
| `monitored_pages` | populated by `scripts/populate_monitored_pages.py` / `register_monitored_batch.py` at deploy time, keyed on URL | **None** from a content swap; but a large content change on a monitored row will register as a change event on the next detector run. Expect noise, not breakage. **INFERRED** from the script names and `monitored_pages_system` memory; I did not read the scripts. |

**Conclusion on coupling: a page swap breaks no code and no test.** The entire
risk is editorial and SEO. That is a useful finding — it means the decision can
be made purely on content and link grounds, with no engineering blocker either
way.

### 8.3 The wave brief that produced our seven

Found. Commit `bbfe0437` (2026-08-05), "commercial money tier + hubs + city
consolidation + demotion sweep", created all seven in one pass:
`/landlord-tax` 679 lines, `/making-tax-digital-landlords` 680,
`/section-24` 597, `/services/property-tax-advice` 672,
`/services/landlord-accountant` 624, `/services/non-resident-landlord` 614,
`/services/property-accountant` 592.

The brief is `expansion_research/_prop_audit_2026_08_05/wave_brief_shared.md`
(still on disk). It is worth quoting because it explains the design of our
versions and is exactly what the designer's re-layout undoes:

- "**Schema:** emit JSON-LD inline in your page: Service (with provider
  Organization Property Tax Partners, areaServed GB) + FAQPage for your FAQ
  section + BreadcrumbList." — the three block types the designer dropped, all
  three specified as requirements.
- "**Feeding posts:** link 4-8 relevant existing blog posts from `content/blog/`
  in-body (real cross-references, no 'pillar/cluster' language)." — the 72 blog
  links were a brief requirement, not incidental. Our pages over-delivered
  (6 to 16 each).
- "**Collision pre-flight:** one page owns one cluster. Your metaTitle must not
  collide with [list]. Use your assigned primary phrasing exactly; do not drift
  into a neighbour's terms." — meaning **our titles were chosen against a
  cannibalisation matrix.** The designer's retitles were not. Any title change
  in the port needs re-checking against that list, especially
  `/landlord-tax` vs `/property-tax-rates` vs `/research/landlord-tax-index`,
  and `/section-24` vs `/calculators/section-24-calculator`
  ("Section 24 Tax Calculator...").
- Term clusters came from
  `docs/_engines/PROPERTY_SEO_SURFACE_MAP_2026-08-05.md` per-page Tier-1 rows.
- Two later commits touched these files: `82b66a32` (2026-08-05, "completeness
  pass - nav equity, 2027 rates correction, gap closure") and `aa77a994`
  (2026-08-20, wave 11 fix rounds, which added the `/landlord-compliance`
  wiring). Both post-date the designer's snapshot.

### 8.4 Facts back-patch list (applies to whichever version ships)

Six items, all cheap:

1. **`/landlord-tax`: add ATED as the sixth tax.** Take the designer's card
   verbatim (`Property_zip/.../landlord-tax/page.tsx:126-131`); it is correct
   against house §2 and we are missing it. Change "Five taxes" to "Six taxes"
   at `Property/web/src/app/landlord-tax/page.tsx:225-226`.
2. **`/landlord-tax` FAQ: qualify the 60-day CGT rule.** House §5: UK residents
   file only where CGT is due. Currently unqualified at `:59` (and theirs `:372`).
3. **s.162 incorporation relief must now be claimed** (FA 2026, house §5, locked
   2026-06-01). Add to `/services/property-accountant` FAQ (`:143`) and wherever
   `/landlord-tax` discusses incorporation relief.
4. **MTD £20,000 from 6 April 2028** missing from the ladder on `/landlord-tax`
   (changes table), `/section-24`, and all four service pages. Present and
   correct only on `/making-tax-digital-landlords`.
5. **`/services/landlord-accountant`: reword "the 3% and subsequent surcharges"**
   (`:517`) to name 5% as current. House §1 do-not-write.
6. Neither side is stale anywhere. `CONTEXT.md` §6.5's spot-check generalises:
   **across all seven pages I found zero instances of the designer's copy being
   factually behind ours**, and one instance of it being ahead (ATED).

### 8.5 Recommendation summary

`CONTEXT.md` §7's standing recommendation is "keep ours, re-skin". The evidence
supports it, with one qualification and one exception:

| Route | Verdict | Base file | Hours | Risk |
|---|---|---|---|---|
| `/section-24` | Hybrid | ours | 6-8 | low |
| `/landlord-tax` | Hybrid + 3 fact patches | ours | 8-10 | low-med |
| `/making-tax-digital-landlords` | Hybrid | ours | 7-9 | low-med (`live` flag) |
| `/services/property-accountant` | Hybrid, **their layout** | theirs | 4-6 | low |
| `/services/landlord-accountant` | Hybrid, their prose rewrites | ours | 7-9 | med |
| `/services/non-resident-landlord` | **Re-skin only, ship last** | ours | 6-8 | **high by consequence** |
| `/services/property-tax-advice` | Hybrid, their ordering | ours | 5-7 | low |
| | | **total** | **43-57 h** | |

Plus the shared component set at 12-18 h, counted once for the whole programme.

**The qualification:** "re-skin" undersells it. On five of the seven the
designer produced real new copy worth adopting (prompts, comparison tables,
`outcome` lines, the ATED card, the rewritten buy-to-let and portfolio prose).
"Keep our content and our head, take their layout and their additions, restore
every link they dropped" is the accurate instruction.

**The exception:** `/services/property-accountant` is close enough that building
from their file and porting our `metadata`, Service JSON-LD and links back in is
less work than the reverse, and lands a better funnel.

**The one non-negotiable acceptance check**, whichever direction each page goes:

> Outbound unique internal links, per page, must be **greater than or equal to
> the current live count** in the table at §0. Not "roughly comparable". Greater
> than or equal. It is a one-line grep and it protects the only thing in this
> whole set that is hard to rebuild.

---

## 9. Open questions for the owner

Not guessed. Recorded for the plan.

1. **Titles.** Our seven titles were set against a cannibalisation matrix
   (`wave_brief_shared.md`, collision pre-flight). The designer retitled all
   seven without sight of it. Three of theirs look better on head-term coverage
   (`/making-tax-digital-landlords`, `/services/non-resident-landlord`,
   possibly `/services/property-accountant`). Re-run the collision check before
   adopting any of them, or keep ours. Needs the surface map, not a judgement.
2. **`CalculatorTabs` vs crawlable calculator links.** Their tabs put the tool
   on the page (conversion up) and delete the link (equity down). My
   recommendation is both, but that is a design compromise the designer
   deliberately avoided. Owner call.
3. **"24 hours" vs "one working day"** on `/services/property-accountant`
   process step 04. Service promise, changed by the designer without comment.
4. **`StatsCounter` on all seven.** `siteStats` claims "100+ landlords served",
   "£2.4M+ tax savings identified", "24hr response", "100% property-only focus".
   `CONTEXT.md` §7 already records the `ExampleFigureNote` asterisk question as
   open. Adopting the designer's pages puts these four claims on seven more
   pages. That is a substantiation question, not a design one.
5. **`TestimonialsSection` on all seven.** Anonymised, which fits the
   `agency_lead_gen_model` rule (anonymised social proof only). Worth confirming
   the underlying testimonial data is real before it lands on seven commercial
   pages.
6. **The MTD calendar `live` flag** (`Property_zip/.../making-tax-digital-landlords/page.tsx:92`)
   is a hand-set boolean with a hard expiry of 6 April 2027 and an explicit code
   comment saying nothing derives it from the clock. Either derive it or add it
   to a refresh obligation list. It is exactly the kind of thing that goes stale
   silently.
