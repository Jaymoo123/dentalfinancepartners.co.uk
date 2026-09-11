# Phase 5 adversarial factual QA (Trade Tax Specialists)

Site: `construction-cis/web`. Commit under review: `da7ec668` (HEAD), "feat(trade): phase 5 build,
homepage, services and the two pillars". Written 2026-09-11. READ-ONLY: no file under
`construction-cis/web` was edited, no build, no dev server, no git write. The phase-4 server on
:3167 was not touched (it serves a build without this copy, so it could not have settled anything
here; every verdict below is source-derived).

Ground truth: `docs/construction-cis/house_positions.md` (HP). Prior claim work:
`_port/CLAIMS_REGISTER.md` and `_port/OWNER_CLAIM_EVIDENCE.md`.

---

## A) VERDICT: **FAIL**

3 blockers, 5 gaps, 3 nits.

Two of the three blockers are newly authored in this commit. The third is pre-existing copy that
this commit did not introduce but that is live in structured data, which is why it is ranked with
them rather than below them.

---

## B) GAPS, most severe first

### BLOCKER 1. A registered rule-4 breach re-filed on two new surfaces

`src/app/cis-refund/page.tsx:247` and `src/app/gross-payment-status/page.tsx:255`

> "You speak to someone who works on CIS returns every week."

Newly authored in this commit (both lines are `+` in `git diff HEAD~1 HEAD`; the previous inline
panels carried three bare proof-point titles and no `detail` strings at all).

What is actually true: `_port/CLAIMS_REGISTER.md:162` records the near-identical sentence
("these are things we work on every week across a large CIS client base", still live at
`src/app/about/page.tsx:33`) as an open **BREACH** of the estate rule quoted there from
`PROPERTY_STANDARD_ROLLOUT.md` section I: *"No claims of clients/customers/served/advised (no
client records exist anywhere in the estate)"*. `CLAIMS_REGISTER.md:166` adds the pool-model
problem directly: *"we do not act for anyone; the enquiry goes to independent firms"*. A sentence
that tells the reader who will pick up their case, and how often that person does this work,
asserts both a staffing fact and a work-volume fact that nothing in HP or in any evidence file
supports. Phase 5 removed this claim class from the homepage (the old `page.tsx:411` "large CIS
client base" line is gone) and simultaneously re-introduced it on two pillars.

Severity: **blocker**. It re-files an open, owner-visible breach without sign-off.

Minimal fix: replace the `detail` on both lines with a claim already licensed on this site:
`detail: "Not a sales team, not a call centre."` (homepage `page.tsx:673`, unchanged for phases).

---

### BLOCKER 2. The deduction-rate sentence omits the 30% rate, and the homepage now states it nowhere

`src/app/page.tsx:409`

> "... and 20% is deducted on labour, or 0% once gross payment status is in place."

What is actually true: HP section 1 locks a three-rate ladder, 0% (GPS) / 20% (registered) / 30%
(unregistered), and its practical writing rule is explicit: *"present the 0% / 20% / 30% ladder
with the status each rate attaches to (GPS / registered / unregistered), and always couple it with
the labour-only rule"*, with HP calling the coupled requirement *"a blocking requirement at QA for
any deduction-discussing page"*. The labour-only half is met. The ladder half is not:
`grep -n "30%" src/app/page.tsx` returns **no hits**, so after this commit the front door
discusses CIS deduction rates and never mentions that an unregistered subcontractor suffers 30%.
HP section 5 makes that gap the everyday reason to register, so the omission also removes the
page's only registration argument.

Severity: **blocker** (HP names this class blocking).

Minimal fix, one clause: `... and 20% is deducted on labour for a registered subcontractor, 30% if
you are not registered, or 0% once gross payment status is in place.`

---

### BLOCKER 3. A banned fee/outcome claim is published inside FAQPage structured data

`src/app/page.tsx:160`, emitted as schema at `src/app/page.tsx:202`

> "Most subcontractors recoup our fees many times over in the first year's refund alone."

**Pre-existing string; pre-existing binding.** `git show HEAD~1:...page.tsx:163` shows
`buildFaqJsonLd(faqs)` already on the page before this commit, so this commit did not introduce
it. It is listed here anyway because it is a live, Google-quotable instance of two banned classes
at once and the brief asked for the FAQ schema to be settled.

What is actually true: `CLAIMS_REGISTER.md:163` records the identical shape at
`src/data/trade-types.ts:252` ("For most groundworkers, the refund covers our fee many times over
in the first year") as a **BREACH on two rules at once**: an aggregate client-outcome claim and a
fee/value claim about our own service. The homepage instance is the same sentence with "most
subcontractors" in place of "most groundworkers", and it sits in `acceptedAnswer.text` of a
FAQPage, which is exactly the surface Google can lift verbatim. Nothing in HP licenses it: HP
section 13 licenses the ~£2,000 refund average as illustrative market data, not a claim about what
our fee returns.

Severity: **blocker** to publish, **pre-existing** to authorship. Do not let the cutover carry it.

Minimal fix: delete the final sentence of the answer. The rest of the answer stands unaided.

---

### GAP 4. An unsourced market statistic asserted as flat fact

`src/app/page.tsx:409`

> "There are more than 1.4 million CIS-registered subcontractors in the UK."

Source: HP section 13, "HMRC-registered CIS subcontractors: 1.4 million or more". The figure is
re-derivable, so the number is not wrong. The **framing** is. HP section 13 heads that block
*"Market data (for content, not guaranteed)"* and its practical writing rule is *"present every
figure here as typical / illustrative, never as a promise"*; HP's Watch items list names it
directly: *"Re-confirm the source figures (Dearne £1,840; RIFT range; 1.4m registered subs) before
relying on them in new content, and always caveat."* HP carries no publisher, no date and no
denominator for it, so nothing on file establishes whether it counts live registrations, ever-
registered UTRs, or subcontractor-contractor pairs, and the site has no way to date it. The
retired navy stat tile carried the same number, so the substance is not new; the assertion as a
flat sentence of fact is.

Severity: **gap**.

Minimal fix: `More than 1.4 million subcontractors are registered under the scheme (third-party
reported figure, for context).` Or delete the sentence: the paragraph reads fine on three facts.

---

### GAP 5. Page copy contradicts the page's own structured data on refund timing, and neither figure is HP-derivable

`src/app/cis-refund/page.tsx:25` (rendered) against `src/app/cis-refund/page.tsx:78` (HowTo JSON-LD)

> rendered: "HMRC typically processes and issues the refund **within 8 to 12 weeks**"
> schema:   "HMRC typically processes Self Assessment repayments **within 5 to 10 working days**"

Both pre-existing (neither line is touched by this commit), and the same "8 to 12 weeks" claim
also renders at `src/app/page.tsx:92` and `src/app/services/page.tsx:39`, in both cases prefixed
"Most subcontractors receive their refund ...".

What is actually true: HP section 11a locks *"SA online repayment: typically 5-10 working days"*
and *"EPS/CIS company repayment target: 25 working days"*. There is **no 8-to-12-week figure
anywhere in HP**. So the page states one timing to the reader and a different, HP-locked timing to
Google, from the same page, and the reader-facing one is the one that is not re-derivable.

Second problem, same strings: `CLAIMS_REGISTER.md:116` opens Rule 2 with *"NO non-email instance
survives on a web surface"*. That is **false**. Three web-surface instances survive
(`page.tsx:92`, `services/page.tsx:39`, `cis-refund/page.tsx:25`), and two of them are prefixed
with a "most subcontractors" aggregate. The register's own Rule 2 pattern is turnaround-word
based and does not match a bare "within 8 to 12 weeks", which is how they were missed. Rule 2 is
not closed.

Severity: **gap** (pre-existing, but it is a false-closure and a live T17 mismatch).

Minimal fix: make all three read *"HMRC typically issues Self Assessment repayments within 5 to 10
working days of a correctly filed return, though complex or amended returns take longer"*, and
drop the "Most subcontractors receive" prefix on `page.tsx:92` and `services/page.tsx:39`.

---

### GAP 6. BreadcrumbList structured data on a page that renders no breadcrumb

`src/app/page.tsx:204-207` (new in this commit)

```
buildBreadcrumbJsonLd([{ label: "Home", href: "/" }])
```

`grep -n "Breadcrumb" src/app/page.tsx` returns the import and this one call and **nothing that
renders**: the homepage has no `<Breadcrumb>` element. Playbook T17 requires structured data to
match what the page renders. It is also a one-item BreadcrumbList whose only item is the page
itself, which conveys no position. Note the contrast: `/services`, `/cis-refund` and
`/gross-payment-status` use the `Breadcrumb` component, which builds schema and markup from one
`items` array (`components/ui/Breadcrumb.tsx:21` and `:43`), so those three are correct by
construction. The homepage is the one hand-rolled exception and it is the one that is wrong.

Severity: **gap**.

Minimal fix: delete `page.tsx:204-207` and the now-unused `buildBreadcrumbJsonLd` import.

---

### GAP 7. A product claim the calculators do not support

`src/app/page.tsx:503` (new in this commit)

> "Every calculator is free, needs no account, and **runs on the rates that apply to your tax
> year**."

What is actually true: the tools are pinned to one year.
`lib/calculators/tools/cis-refund-estimator.ts:123` and `:131`: *"This is an estimate based on
2026/27 rates"*, *"This calculator applies the 2026/27 rates"*. There is no year selector. The
back-years tool covers four prior years (`cis-back-years-calculator.ts:16`) but applies the same
current rates across them, which is precisely the case where a reader would take this sentence as
a promise about a year that is not 2026/27. "Free" and "needs no account" are both true.

Severity: **gap** (unsupported, and it is the half of the sentence a reader would rely on).

Minimal fix: `... and runs on the current 2026/27 rates.`

---

### GAP 8. "CIS is all we do", on a page that sells work which is not CIS

`src/app/services/page.tsx:262-263` (new in this commit)

> "CIS is all we do" / "Every service on this page is built around how the scheme works in
> practice."

The same page publishes Corporation Tax and CT600, annual statutory accounts, Companies House
filings and dividend extraction (`services/page.tsx:71-72`), VAT domestic reverse charge and MTD
ITSA (`:92-94`), and capital allowances and AIA (`:104`). Those are general accountancy services
delivered to construction clients, not CIS services. HP section 12.D locks the position as
**construction-only**, not CIS-only, and the site's own live framing elsewhere is the construction
one (`about/page.tsx:18`, "We only work with the construction industry", mirrored verbatim into
`MarketingSections.tsx:34`). The sentence overstates the house position and is contradicted three
cards up the page it introduces.

Severity: **gap**.

Minimal fix: `title: "Construction is all we do"`, detail unchanged.

---

### NIT 9. `src/app/page.tsx:409`, the mileage sentence gives 55p and the 10,000-mile threshold but not the 25p above it

HP section 11 locks "55p per mile for the first 10,000 business miles, 25p thereafter". The 25p
tier does appear two bands down in the table (`page.tsx:133`), so this is not a contradiction,
only an incomplete lead sentence. Fix if touching the line anyway: "... 55p per mile for the first
10,000 miles from April 2026, and 25p after that."

### NIT 10. `src/app/page.tsx:409`, "A CIS refund can be claimed up to four years back"

HP section 11a: "SA refund lookback: 4 prior tax years". Correct in substance. "Four years back"
is looser than "four prior tax years" and a reader could read it as four years from today rather
than four closed tax years. `lib/calculators/tools/cis-back-years-calculator.ts:11` already uses
the precise phrasing ("up to four previous tax years"); matching it costs nothing.

### NIT 11. `src/app/services/page.tsx:270-271`, "Seven specialist services"

The count is right (seven entries in the `services` array, seven rendered cards, and
`config/service-tiers.ts:74` publishes "7 Specialist services" with its deriving note). The
enumeration under it, "Refunds, gross payment status, Self Assessment, limited company, contractor
returns, VAT and expenses", reads as six to anyone who takes "VAT and expenses" as one item. Fix:
"... contractor returns, VAT, and expenses."

---

## C) CLEARED

Every line names what was run and what it returned. Scope for the rule sweeps, run from
`construction-cis/web/src`: `app/page.tsx components/marketing/MarketingSections.tsx
app/services/page.tsx app/cis-refund/page.tsx app/gross-payment-status/page.tsx`.

### The banned classes, by rule

| rule | pattern | result |
|---|---|---|
| No pricing for our services, incl. comparative | `grep -niE "£[0-9]+ ?(/|per |a )?(month|mo|year|hour)\|our fee\|our fees\|from £\|price\|pricing\|cheap\|affordable\|cost less\|lower fees\|value for money\|fee is\|charges? (from\|start)"` | 3 hits. `services/page.tsx:114-115` are the JSON-LD code comment stating no pricing is emitted. `page.tsx:160` is BLOCKER 3, reported. **No published price anywhere in the five files, and the new `/services` OfferCatalog carries no `price`, `priceRange`, `offers.price` or `priceSpecification` (read in full at `services/page.tsx:118-144`).** |
| No contingent / no-win-no-fee | `grep -niE "no win\|no fee\|contingen\|percentage of your refund\|only pay if\|commission\|cut of"` | **0 hits.** |
| No turnaround promises, incl. soft | `grep -niE "within [0-9]\| days\| weeks\|shortly\|quickly\|straight away\|right away\|fast\|rapid\|prompt\|turnaround\|same day\|immediately\|as soon as\|in no time\|speedy\|swift\|no time\|hours"` | 7 hits, all read. **0 newly authored.** 4 are statutory/HP-locked content (12-month compliance window, immediate revocation, the HMRC 25-working-day EPS target). 3 are the pre-existing "8 to 12 weeks" instances, reported as GAP 5. The soft-promise half of the pattern (`shortly`/`quickly`/`straight away`/`promptly`) returns **0**. |
| No client-behaviour assertions | `grep -niE "most (clients\|customers\|people\|businesses\|subcontractors\|of our)\|our clients (prefer\|say\|find\|typically)\|clients choose\|average client"` | 6 hits. 4 are the HP section 9 licensed "most registered subcontractors overpay" family, licensed verbatim by `CLAIMS_REGISTER.md:174` and by HP section 9's writing rule (a statement about scheme mechanics, not about our clients): `page.tsx:73`, `services/page.tsx:37`, `cis-refund/page.tsx:97`, `cis-refund/page.tsx:138`. 2 are BLOCKER 3 and GAP 5. The "every week" claims are not caught by this pattern and were found by the separate `every week` sweep (BLOCKER 1). |
| No client-count / aggregate-performance | `grep -niE "[0-9,]+ ?\+? (clients\|customers)\|we have helped\|helped over\|[0-9]+ (clients\|subcontractors) (served\|advised)\|9 out of\|satisfaction\|most popular\|rated"` | **0 published hits.** The only `Most Popular` occurrence is `page.tsx:381`, a code comment recording that `featuredBadge=""` is passed deliberately. Both `<ServiceTiers>` call sites pass `featuredBadge=""` explicitly (`page.tsx:394`, `services/page.tsx:242`); `git diff` confirms `services/page.tsx` changed **from** `featuredBadge="Most Popular"` **to** `""` in this commit, which removes a live aggregate claim. |
| No "most businesses qualify" framing | `grep -niE "most businesses qualify\|you probably qualify\|most (subcontractors\|trades) qualify\|you will qualify\|guaranteed"` | 4 hits, **all of them the word "guaranteed" inside the licensed HP section 13 caveat** ("illustrative, not guaranteed") at `page.tsx:48`, `page.tsx:248`, `cis-refund/page.tsx:11`, `cis-refund/page.tsx:97`. **0 qualify-framing hits.** |
| No em-dashes | `grep -c $'—'` per file | **0, 0, 0, 0, 0.** The site's 2 protected survivors are elsewhere and were not touched: neither is in these five files. |
| British English | `grep -niE "\b(organiz\|realiz\|analyz\|recogniz\|customiz\|maximiz\|minimiz\|specializ\|color\|favor\|center\|enrollment\|fulfill\|traveling)"` | All hits are `text-center`/`items-center`/`justify-center` Tailwind class names and the word "check". **0 prose Americanisms.** |
| No new interruptive surface | `grep -niE "modal\|popup\|pop-up\|exit.?intent\|banner\|dialog\|overlay\|setTimeout\|onScroll\|sticky"`; plus `grep -l "use client"` on the five files and on `LeadCTAPanel.tsx` | 1 hit, `services/page.tsx:251`, a comment stating the opposite ("no overlay, no timer, no trigger"). **No `"use client"` in any of the six files**, so nothing can fire on a timer or a scroll. The new `#book` `LeadCTAPanel` bands on `/services`, `/cis-refund` and `/gross-payment-status` are static in-body sections at the END of each page, which the brief exempts. **Clean.** |
| Retired figures | `grep -niE "30% of the tax\|Finance Bill\|100% of the CIS\|20% of the sums\|62B"` | **0 breaches.** No "Finance Bill 2026" anywhere (only "Finance Act 2026"). No "30% of the tax lost". s.62A/s.62B are stated correctly and distinctly at `services/page.tsx:49` and `gross-payment-status/page.tsx:50` ("20% of that payment" for s.62A, "an amount equal to the whole sum the return treats as paid" for s.62B), matching HP section 3 exactly. The legitimate section-naming 30% exception did not need to be invoked: the only 30% in scope is the CIS unregistered rate at `cis-refund/page.tsx:44` and `:200`, correct per HP section 1. The s.72B officer-liability sentence at `gross-payment-status/page.tsx:50` names the section and states "up to 100% of the company's s.72A penalty", which is HP section 3's express exception, correctly used. CIS300 ladder at `services/page.tsx:82` stops at the six-month tier ("£300 or 5%"), so it does not reach the 12-month tier at all and cannot carry the retired 100%. |

### The owner-gated claims, byte-identity

- Testimonials: `diff <(git show HEAD~1:...page.tsx | sed -n '/^const testimonials/,/^];/p') <(sed -n '/^const testimonials/,/^];/p' ...page.tsx)` returned **no output**. All three quotes, including "the refund was more than four times what I had been getting", plus both attributions and punctuation, are **byte-identical**. The three lines of framing copy around them ("Real outcomes", "What we have done for CIS subcontractors", "Composite snapshots based on patterns across our CIS clients...") appear as a `-` block and an identical `+` block in the diff: moved, not edited.
- Fixed-fee promises: per-file `diff` of `grep -oiE "[^\"]*[Ff]ixed fee[^\"]*"` between `HEAD~1` and `HEAD` returned **no output for all four page files** (`MarketingSections.tsx` contains none). "Fixed fees. Plain English. No hard sell.", "Start with our free calculators or speak to us directly. Fixed fees, no surprises.", `{ title: "Fixed fees, no surprises", sub: "Quoted before we start" }`, and "Fixed fees, quoted before we start" on both pillars: all unchanged, no case change, no punctuation change, no lost qualifier. **No sixteenth fixed-fee claim was added** (the new pillar `detail` "No work begins until you have agreed the scope." attaches to an existing title and adds no fee assertion).

### The default-props vector

`components/marketing/LeadCTAPanel.tsx` read in full. Its defaults are `eyebrow = "Free consultation"`, `formTitle = "Book your free call"`, `submitLabel = "Request a callback"` and nothing else; there are no default `title`, `description`, `proofPoints` or `footnote` (all required or optional-undefined). `git log -1 --` on the file returns `6575bbb6` (phase 2), so no default was introduced or changed here. All three new call sites pass every visible string explicitly. **No copy entered through default props.**

### "Moved verbatim" verified, not assumed

`MarketingSections.tsx` is a new file whose header claims its copy is lifted verbatim.
`WhoWeAreSection`'s h2 (`:34`) and both paragraphs (`:37`, `:40`) resolve to `about/page.tsx:18`,
`:30` and `:34` (`grep -rn "only work with the construction"` returns exactly those two files).
`WhyChooseUsSection`'s heading and paragraph (`:55-59`) appear as removed lines in the
`page.tsx` diff with identical text. **Provenance holds, and the move quietly deleted the
`CLAIMS_REGISTER.md:162` homepage breach ("large CIS client base"), which is now confirmed gone
from `page.tsx` and surviving only at `about/page.tsx:33`.**

### The numbered claims

1. **"A CIS refund can be claimed up to four years back."** `page.tsx:409`. **TRUE.** HP section 11a: *"SA refund lookback: 4 prior tax years"*; corroborated in-tree by `lib/calculators/tools/cis-back-years-calculator.ts:11`. Phrasing nit at NIT 10.
2. **"There are more than 1.4 million CIS-registered subcontractors in the UK."** `page.tsx:409`. **Number derivable, framing wrong.** HP section 13 ("1.4 million or more") is market data flagged *"for content, not guaranteed"*, and HP's Watch items require re-confirmation before new use. No publisher, no date, no denominator on file. **GAP 4.**
3. **"20% is deducted on labour, or 0% once gross payment status is in place."** `page.tsx:409`. **Misleads by omission.** Labour-only base: stated, correct. 30% unregistered rate: absent from the sentence and from the entire page (`grep -n "30%" src/app/page.tsx` = no hits). HP section 1 makes the coupled ladder blocking. **BLOCKER 2.**
4. **"Mileage runs at 55p per mile for the first 10,000 miles from April 2026."** `page.tsx:409`. **TRUE on all four axes.** Rate, threshold and date match HP section 11 (55p first 10,000 from 6 April 2026, up from 45p). Audience: the page's primary reader is the sole-trader subcontractor (HP audience persona A), who claims exactly this rate via simplified mileage expenses, so it is in scope for the page it sits on. Missing 25p tier is NIT 9.
5. **"Seven specialist services" and the list.** `services/page.tsx:270-271`. **TRUE.** The `services` array holds seven entries (`:30-108`), seven cards render from it, the OfferCatalog emits seven offers from the same array, and `config/service-tiers.ts:74` independently publishes "7 Specialist services" with a deriving note pointing at this array. Enumeration wording nit at NIT 11.
6. **"We do not offer general accountancy services to non-construction clients."** `services/page.tsx:267` (new as a proof point; `:170` is the pre-existing hero instance, unchanged in this commit). **TRUE.** Consistent with HP section 12.D (construction-only) and with `about/page.tsx:18`. No surface in scope offers a non-construction client anything; all three service tiers are CIS-framed (`config/service-tiers.ts:9-56`).
7. **"CIS is all we do" / "Every service on this page is built around how the scheme works in practice."** `services/page.tsx:262-263`. **Overstated.** See GAP 8: the same page sells CT600, statutory accounts, Companies House filings, dividend extraction, VAT DRC, MTD ITSA and capital allowances. HP locks construction-only, not CIS-only.
8. **"You speak to someone who works on CIS returns every week."** `cis-refund:247`, `gross-payment-status:255`. **Cannot be supported, and it does fall under the bans.** It is not a client-behaviour claim and not strictly a client-count claim, but it is an aggregate claim about our own work volume and staffing, which is the class `CLAIMS_REGISTER.md:162` already records as an open breach for the near-identical about-page sentence, and which the pool model contradicts (`CLAIMS_REGISTER.md:166`). **BLOCKER 1.**
9. **"No work begins until you have agreed the scope."** `cis-refund:251`, `gross-payment-status:259`. **CLEARED.** It is an engagement-process statement, not a fee claim: it names no price, no fee basis and no comparison, and it does not promise a fee will be fixed (its sibling title "Fixed fees, quoted before we start" is the pre-existing claim, and the byte-identity check above shows that title unchanged). It adds no sixteenth fixed-fee claim to the count in `OWNER_CLAIM_EVIDENCE.md`. Verified against the `fixed fee` pattern: the sentence does not match it.

### Structured data against rendered copy (T17)

- **Homepage FAQPage.** `faqs` (`page.tsx:156-177`) feeds `buildFaqJsonLd(faqs)` at `:202` and the rendered `<details>` list at `:721` from **one array**. Single binding, no second `.map()`, confirmed by reading both call sites. `lib/schema.ts:89-102` copies `question`/`answer` straight through. Every assertion in the schema therefore renders verbatim. The defect here is not a mismatch, it is the content of `faqs[0]` (BLOCKER 3). Also note: the FAQ JSON-LD is **not new in this commit** (`git show HEAD~1:...page.tsx:163`).
- **Homepage BreadcrumbList.** New, and it asserts a breadcrumb the page does not render. **GAP 6.**
- **Homepage Service.** `page.tsx:211-216`. `name` and `description` enumerate refunds, GPS, Self Assessment, limited company CIS and CIS300 returns: all five render in `servicesOverview` (`:89-126`). It omits the sixth card (VAT and expenses), which understates rather than overstates. Cleared.
- **Homepage WebPage/AccountingService.** `page.tsx:219-229`. `name`, `url`, `areaServed` ("United Kingdom", matching HP section 12.C UK-only) all check out. `description` is `siteConfig.description`, resolving to `construction-cis/niche.config.json:24`, which carries the ~£2,000 refund average **with** the HP section 13 caveat verbatim ("illustrative, not guaranteed") and the rendered hero at `page.tsx:248` states the same figure with the same caveat. Consistent. Cleared.
- **/services Service + OfferCatalog.** `services/page.tsx:118-144`. Every offer's `name` is `service.title` and every `description` is `service.body[0]`, both read from the same `services` array the cards render from: one binding, seven offers, seven cards. No price fields of any kind. Cleared, with the standing caveat that `body[0]` of the refund offer carries the HP-licensed "most registered sole-trader subcontractors overpay" sentence into schema; that phrase is licensed by `CLAIMS_REGISTER.md:174`, so it is not a breach, but the owner should know it is now quotable.
- **/cis-refund HowTo.** Pre-existing, unchanged, and it contradicts the page's rendered timing. **GAP 5.**
- **/gross-payment-status HowTo.** `gross-payment-status/page.tsx:64-82`. Three steps, each matching a rendered `qualifyingTests` card (`:14-30`) and the rendered turnover table (`:32-37`). Thresholds in the schema (£30,000 sole trader; £30,000 per partner or £100,000; £30,000 per director or £100,000; net excludes VAT and materials) match HP section 2 exactly. Cleared.

### House-positions contradictions confirmed, and confirmed unused

Both owner-gated contradictions named in the brief are real, and **neither is relied on by any of
the five files**, so nothing here needs the owner to resolve them first.

- (a) `house_positions.md:82` reads *"additional penalty up to £3,000 or 100% of the CIS deductions (whichever is higher)"*, asserting both "up to" and "whichever is higher" of the same figure, and the deliberate-but-not-concealed tier is absent from the ladder. `services/page.tsx:82` is the only phase-5 penalty ladder and it stops at the six-month tier, so it does not touch line 82. Not resolved here, per instruction.
- (b) `:11` and `:57` both attach SI 2026/289 to the ss.62A/62B commencement while `:61` says *"Do not cite SI 2026/289 as the vehicle for ss.62A/62B/s.66"*, and `:221` (Watch items) still frames the provisions as sitting in *"Finance Bill 2026"* six months after the 18 March 2026 Royal Assent that `:11` itself records. `grep -rn "2026/289"` across the five files: **no hits**, and no file says "Finance Bill". Not resolved here, per instruction.

---

## D) OPEN QUESTIONS FOR THE OWNER

1. **Can we say a specialist who works on CIS every week will take the call?** Two new pages now
   say so. We have no staffing records to back it, and enquiries go out to independent firms in the
   partner network, so strictly we do not know who picks up or how often they do this work. Say
   the word and it becomes "Not a sales team, not a call centre", which we already publish and can
   stand behind. (Same question, already open, covers the about page.)
2. **The homepage FAQ tells Google that most subcontractors get our fees back many times over in
   the first year's refund.** It is in the part of the page Google can quote directly in search
   results. It is a claim about what our service returns against its price, and we have nothing on
   file supporting it. Remove it?
3. **We tell readers a refund takes 8 to 12 weeks, and we tell Google 5 to 10 working days, on the
   same page.** HMRC's own published figure is the 5 to 10 working days. Are you happy for us to
   correct the reader-facing figure downwards to match, or is the longer figure there deliberately
   to manage expectations?
4. **The "more than 1.4 million CIS subcontractors" figure.** We hold it as third-party market
   data with no publisher and no date, and our own notes say to re-check it before reusing it. It
   is now stated on the homepage as plain fact. Do we (a) soften it to "reported at more than 1.4
   million", (b) drop it, or (c) do you want someone to pin down a citable HMRC source first?
5. **"CIS is all we do."** The services page it introduces also sells company accounts,
   Corporation Tax, VAT and dividend planning to construction clients. "Construction is all we do"
   is true and says the same thing. Approve the swap?
