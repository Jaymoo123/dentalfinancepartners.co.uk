# Competitor teardown: Property tools-family cluster

REWRITE_PROGRAM §9.5 section 4 / §9.10. Run 2026-08-21.

**Method note.** Every competitor page was pulled with WebFetch, which converts
the rendered page to markdown. Two consequences apply to everything below:
heading lists include sidebar and promo blocks that are `<h2>` in source but are
not body prose, and "no schema markup detected" means none survived the markdown
conversion, not a certified absence in raw HTML. Both are flagged inline where
they matter. Position claims come only from the harvest data in the dispatch;
Serper is out of credits and no live SERP was queried.

**Fetch log.** 4 fetches attempted against competitors, 3 returned pages, 1
returned HTTP 404 (`uklandlordtax.co.uk/sitemap.xml`), worked around via the
homepage nav and the `/calculators/` index. No page in the brief was dropped.

---

## 1. uklandlordtax.co.uk buy-to-let mortgage calculator

**URL found:** `https://www.uklandlordtax.co.uk/calculators/buy-to-let-mortgage-calculator-interest-only/`
Discovered via homepage nav (their `sitemap.xml` 404s). The slug carries
`-interest-only` while the H1 and title do not, so the page ranks on the generic
head term and captures the interest-only long tail through the URL string.

**Title:** `Buy to Let Mortgage Calculator - UK Landlord Tax`
**Meta description:** not visible in the converted output.
**H1:** `Buy to Let Mortgage Calculator`
**Prose:** roughly 1,200 to 1,400 words.

**H2 list in document order.** Items 1 to 6 and 8 are guide-promo cards from a
resource rail, not body prose. The body-prose H2s are 7 and 9 to 12.

1. The top 10 Allowable expenses against rental income plus 32 more
2. Stamp Duty : Your Top 30 questions answered
3. Limited Company v Personal Ownership. Which one is right for you?
4. How a Deed of Trust can cut income tax for married couples by 50%
5. Property Family Investment Companies (FIC) and Inheritance Tax
6. The Let Property Campaign
7. Our experts are waiting to speak to you
8. Do you know all 42 allowable expenses?
9. Why are interest-only mortgages a common choice for buy-to-let properties?
10. What happens at the end of an interest-only buy-to-let mortgage?
11. How much is the deposit for a buy-to-let interest-only mortgage?
12. Get your landlord tax return sorted

**H3s:** none.

**Calculator inputs.** Property value (£), Deposit (£), Deposit %, Interest rate
(% per year, editable), Mortgage term (years). No defaults are pre-populated;
fields start empty.

**Calculator outputs.** Amount you need to borrow, interest-only monthly payment,
capital + interest monthly payment, total paid over term interest-only, total
paid over term capital + interest.

**Repayment vs interest-only.** This is the structural centre of the page. It
does **not** ask the user to choose. It computes both and shows them side by
side, with the explanatory line: "Interest-only payments cover interest only; the
full loan amount is still owed at the end of the term. Capital and interest
payments gradually pay off the loan, so the balance reaches zero by the end of
the term." One page therefore answers "buy to let mortgage calculator",
"interest only buy to let calculator" and "buy to let repayment calculator"
without a variant page for each.

**Worked example rendered on-page** (server-side text, not only a JS result):
loan £240,000, interest-only £900/mo, capital + interest £1,333/mo, total
interest-only over term £270,000, total capital + interest over term £399,900.

**Tables:** none.

**FAQ block:** three questions, rendered as H2s (items 9 to 11 above), all
interest-only framed:
- Why are interest-only mortgages a common choice for buy-to-let properties?
- What happens at the end of an interest-only buy-to-let mortgage?
- How much is the deposit for a buy-to-let interest-only mortgage?

**Schema markup:** none detected (FAQPage, BreadcrumbList, Organization,
WebApplication all absent from the converted source). They own the family with
no structured data at all.

**Internal links in body:** `/allowable-expenses/`, `/tax-guide/stamp-duty-faqs/`,
`/limited-companies-for-landlords/`, `/tax-guide/declaration-of-trust/`,
`/family-investment-company-guide/`, `/let-property-campaign-accountant/`,
`/contact-us/`, `/allowable-expenses-guide/` (gated download).

**Disclaimers.** Full-fat, three layers: an informational-purposes-only block
("this information may not be current or complete... It does not constitute any
form of advice"), a calculator note ("This is an estimate for comparison
purposes, not a formal mortgage quote"), and entity identification (Thandi
Nicholls Ltd Accountants, company number 7319439) plus two phone numbers, an
email and stated office hours.

---

## 2. landlordstudio.com free rental yield calculator

**URL:** `https://www.landlordstudio.com/free-rental-yield-calculator`
Harvest position 9 on "rental yield calculator", 2,400/mo.

**Title:** `Free Rental Yield Calculator | Landlord Studio`
**H1:** `Free rental yield calculator`
**Prose:** roughly 1,200 to 1,400 words.

**H2 list in order:** Calculating rental yield; What is rental yield?; Gross
yield; How to calculate gross rental yield; Net yield; How to calculate net
rental yield; Cashflow; Payback period; What is a good rental yield?; Increasing
cash flow for a good rental yield; Get started with Landlord Studio now.

**H3 list:** Estimating a property's performance; Understanding an existing
property's performance; Manage up to 3 rental properties for free!; Occupancy
Rates; Capital Gains; Risks; Holding Period; Investment Strategy.

**Calculator inputs.** Property price, Monthly rent, Annual expenses, Vacancy
rate %. All default to zero or empty.

**Calculator outputs.** Cashflow, Gross yield, Net yield, Payback period (years).

**Gross vs net handling.** Both computed and displayed simultaneously, each with
its own "how to calculate" H2 carrying the formula in prose. Net subtracts
annual expenses from rental income before dividing by property value. The
distinctive additions over a plain yield tool are the **vacancy rate input**
(voids modelled as a percentage rather than buried in a costs figure) and the
**payback period output** (years to recover the purchase price from net income).

**Tables:** none.

**FAQ:** no schema'd FAQ block; the concept explanations sit in expandable
accordion blocks.

**Schema markup:** none detected.

**Internal links in body:** `/features/find-tenants`,
`/blog/cash-on-cash-return-vs-roi/`, `/calculators`.

**Disclaimers:** none. Only a generic "By continuing you agree to our Terms &
Conditions" attached to the signup.

**Conversion model:** SaaS trial, not advisory lead. "Manage up to 3 rental
properties for free!" appears mid-page as an H3 and again as the closing H2.

---

## 3. provestor.co.uk best UK rental yield hotspots

**URL:** `https://www.provestor.co.uk/blog/best-uk-rental-yield-hotspots`
Harvest: owns the "what is a good rental yield" question family at positions
5 to 10.

**Title and H1 (identical):** `Best UK rental yield hotspots for 2026`
**Prose:** roughly 2,100 words.

**Headings in order,** question-form marked:

| Level | Heading | Question form |
|---|---|---|
| H2 | What counts as a good rental yield? | yes |
| H2 | What's happening to rental yields in 2026? | yes |
| H2 | Which UK regions have the highest yields? | yes |
| H2 | The highest-yielding cities for 2026 | no |
| H3 | Note | no |
| H2 | Yield is only half the picture | no |
| H3 | One to watch: Derby | no |
| H2 | Do your homework before you buy | no |
| H3 | Our most popular posts: (x2) | no |
| H2 | Work with the Pro's | no |
| H2 | Explore our limited company services | no |

Three of the first three H2s are verbatim questions. That is how a data post
takes a question family: the question is the heading, the answer is the table
directly beneath it.

**Data tables.** Two, both sourced to **Zoopla, data to September 2025** (roughly
11 months stale at time of teardown, and still winning).

- Table 1, regional: Region | Average gross yield | Average monthly rent |
  Average BTL price. 12 rows: North East, Scotland, North West, Wales, Yorkshire
  and the Humber, West Midlands, East Midlands, Northern Ireland, East of
  England, South West, South East, London.
- Table 2, city: City | Average gross yield | Average monthly rent | Average BTL
  price. 9 rows: Sunderland, Aberdeen, Burnley, Dundee, Middlesbrough, Hull,
  Glasgow, Liverpool, Newcastle.

Both tables carry **three metrics per row, not one**. The rent and price columns
are what make the yield number checkable, and they are what an AI answer engine
can lift as a citable fact.

**Charts:** none.
**FAQ block:** none; the question H2s do the work.
**Schema markup:** none detected.

**Internal links:** heavy and commercial. `/tour/mtd`, `/`, `/pricing`, `/blog`,
`/resources`, `/tour/limited-companies/`, `/masterclass/limited-companies/`,
plus seven sibling blog posts (self-assessment mistakes, HMRC MTD letter, Budget
2025, stamp duty survival guide, how should I buy my first BTL, business bank
accounts, limited company structures), plus footer service links.

**How a data page converts.** Four mechanisms, no forms:
1. "Book a callback" via Calendly.
2. "Start the free Masterclass" on limited companies, placed twice.
3. Product price anchor in-body ("From £19/mo") for the tax-smart app.
4. Two service-link H2s as the page's closing sections ("Work with the Pro's",
   "Explore our limited company services").
No newsletter capture, no gated download. The conversion is a booked call or a
free course enrolment, both low-friction.

**Disclaimer / editorial note.** Styled as an H3 "Note": "A high yield often
signals lower house price growth. Areas with cheap entry prices tend to deliver
strong income but slower capital appreciation, while pricier southern areas do
the reverse. Decide which one your strategy needs before chasing the biggest
percentage." Plus footer entity ID (Provestor Accounts Ltd, 10510713).

---

## 4. uklandlordtax other calculator pages

Their domain carries 563 tools-family keywords off a six-tool `/calculators/`
hub. Full list from the homepage nav, cross-checked against the hub index:

- `/calculators/cgt-capital-gains-tax-calculator/` — CGT on a property disposal.
  Nav links it as live; the hub index labels a CGT calculator "coming soon", so
  the two surfaces disagree.
- `/calculators/buy-to-let-mortgage-calculator-interest-only/` — the page torn
  down in section 1.
- `/calculators/buy-to-let-stamp-duty-calculator/` (hub also shows
  `/calculators/btl-stamp-duty-calculator/`) — SDLT on freehold residential,
  England and NI, with the additional-dwellings surcharge.
- `/calculators/lbtt-land-and-building-transaction-tax-calculator-scotland/` —
  Scottish LBTT plus Additional Dwelling Supplement.
- `/calculators/buy-to-let-land-transaction-tax-calculator-wales/` (hub also
  shows `/calculators/ltt-calculator/`) — Welsh LTT.
- `/calculators/limited-company-vs-personal-ownership-calculator/` — incorporation
  comparison, their highest-intent commercial tool.
- IHT calculator — listed "coming soon" on the hub, no live URL.

**Answers to the dispatch question:** they have **no rental yield calculator**
and **no separate repayment mortgage calculator**. The single BTL mortgage page
absorbs the whole repayment-vs-interest-only family, and rental yield is
territory they have not entered at all.

Two structural observations. First, three of six tools are acquisition-tax
calculators split by jurisdiction (SDLT / LBTT / LTT), which is a cheap way to
triple a keyword footprint on near-identical logic. Second, the hub and the nav
disagree about what is live, so some of the 563 keywords are landing on tools
that may not exist yet.

---

## 5. Our counterpart pages

All four are Next.js tool-registry entries in
`Property/web/src/lib/calculators/tools/`, not markdown. They are rendered by
`Property/web/src/app/calculators/[slug]/page.tsx`, which emits
`buildCalculatorJsonLd` (WebApplication / FinanceApplication, `isAccessibleForFree`,
Organization provider, `en-GB`) and `buildFaqPageJsonLd`, and which supports two
optional blocks the four tools below do not use: `workedExamples` (SSR'd for GEO
citability) and `related` (internal links under the explainer). The type contract
is `packages/web-shared/tools/types.ts`; a sibling tool
(`lease-extension-premium-calculator.ts`) already uses both, so the pattern
exists in-repo and needs no new code.

### buy-to-let-mortgage-calculator.ts

- **Name:** Buy-to-Let Mortgage Calculator. **Category:** Property Finance.
- **metaTitle:** `BTL Mortgage Calculator | Interest-Only vs Repayment`
- **oneLiner:** Estimate the monthly payment on a buy-to-let mortgage,
  interest-only or capital repayment.
- **Inputs (4):** Loan amount (£200,000, step 5,000); Annual interest rate (5.5%,
  step 0.1); Mortgage term (25 years); Repayment type (select, default
  interest-only, options interest-only / repayment).
- **Outputs:** headline monthly payment; rows for annual payment, total payable
  over term, and then either capital still owed at the end (interest-only) or
  total interest over the term (repayment). Note covers Section 24 and an
  estimate-not-a-quote line.
- **Counts:** explainer 3 paragraphs, 3 FAQs, 0 workedExamples, 0 related.

### rental-yield-calculator.ts

- **Name:** Rental Yield Calculator. **Category:** Portfolio.
- **metaTitle:** `Rental Yield Calculator (Gross & Net) | UK Buy-to-Let`
- **oneLiner:** Gross and net rental yield, and monthly net income, from a
  property's value, rent and costs.
- **Inputs (3):** Property value (£250,000); Annual rent (£15,000); Annual
  running costs (£4,000, help text naming management, insurance, maintenance,
  service charges, voids).
- **Outputs:** headline gross yield with net yield as sub; rows for annual rent,
  annual running costs, net income before tax, net income per month.
- **Counts:** explainer 3 paragraphs, 2 FAQs, 0 workedExamples, 0 related.

### buy-to-let-cashflow-calculator.ts

- **Name:** Buy-to-Let Cashflow Calculator. **Category:** Portfolio.
- **metaTitle:** `Buy-to-Let Cashflow Calculator | Monthly Rental Profit (UK)`
- **oneLiner:** Monthly and annual cashflow on a rental, from rent less mortgage
  and running costs.
- **Inputs (3):** Monthly rent (£1,200); Monthly mortgage payment (£600); Other
  monthly costs (£250).
- **Outputs:** headline monthly cashflow with a good/warn tone flag and a
  positive/negative label; rows for annual cashflow, rent, mortgage, other costs.
- **Counts:** explainer 3 paragraphs, 2 FAQs, 0 workedExamples, 0 related.

### rental-income-tax-calculator.ts

- **Name:** Rental Income Tax Calculator. **Category:** Income tax.
- **metaTitle:** `Landlord Tax Calculator: Rental Income Tax 2026/27`
- **oneLiner:** The income tax on your rental profit, including the Section 24
  mortgage-interest credit, and your take-home.
- **Inputs (4):** Annual rental income (£18,000); Allowable expenses (£3,000);
  Annual mortgage interest (£6,000); Income tax band (select, default higher;
  basic 20 / higher 40 / additional 45).
- **Outputs:** headline income tax on rental profit with profit as sub; rows for
  rental profit before mortgage interest, tax before relief, Section 24 credit at
  20% of interest, take-home after tax and mortgage. Note flags the 2027/28 rise
  to 22% and the single-band assumption.
- **Counts:** explainer 4 paragraphs, 3 FAQs, 0 workedExamples, 0 related.

### property-investment-benchmarks-uk-2026-good-yield.md (blog)

- **h1 / title:** What's a Good Property Investment Yield in the UK for 2026?
- **metaTitle:** `Good Rental Yield UK 2026: Benchmarks by Region`
- **Length:** ~4,119 words. **Tables:** 3. **FAQs in frontmatter:** 13.
  **Internal links:** 13 unique, all to sibling blog posts.
- **H2s:** What counts as a good rental yield in 2026?; Gross rental yield by UK
  region for 2026; Yield by property type (standard BTL, HMO, student,
  short-term); How Section 24 turns a good gross yield into a thin net one; What
  yield do you actually need to be cash-flow positive?; Limited company structure
  and net yield; Capital gains tax and total return on exit; The April 2027
  property income tax rates and your net yield; Acquisition tax and the net yield
  you really buy; Making Tax Digital and tracking true yield across a portfolio;
  Price, geography and where the yield actually comes from; How to benchmark a
  property the right way.
- **H3s:** How does rental yield move with property price?; Which UK cities have
  the best rental yields in 2026?; What rental yield should you expect on a
  property in the south of England?
- **Table 1:** Region | Indicative gross yield band | Character of the market.
  8 rows, **indicative bands, no named source, no data-through date**.

---

## 6. Side by side

| | uklandlordtax BTL mortgage | Ours: btl-mortgage-calculator |
|---|---|---|
| First input | Property value | Loan amount |
| Deposit / LTV input | yes, both £ and % | no |
| Borrowing amount | computed output | user must know it |
| Interest-only vs repayment | both computed, shown together | select, one at a time |
| Field defaults | none, all empty | all pre-filled |
| Worked example in HTML | yes, 5 figures | no |
| FAQs | 3, all interest-only framed | 3, tax framed |
| Schema | none detected | WebApplication + FAQPage |
| Body internal links | 8 | 0 |
| Gated download | yes | no |
| Disclaimer layers | 3 + entity ID + phone | 1 note line |
| Prose | ~1,200-1,400 words | 3 explainer paragraphs |

| | landlordstudio yield | Ours: rental-yield-calculator |
|---|---|---|
| Inputs | price, monthly rent, annual expenses, vacancy % | value, annual rent, annual costs |
| Rent period | monthly | annual |
| Voids | explicit vacancy rate % field | folded into costs help text |
| Outputs | gross yield, net yield, cashflow, payback period | gross yield, net yield, net income annual + monthly |
| Payback period | yes | no |
| Formula shown in prose | yes, own H2 each for gross and net | inside explainer paragraphs |
| "What is a good rental yield?" section | yes, on-page H2 | FAQ answer only |
| Prose | ~1,200-1,400 words, 11 H2 + 8 H3 | 3 paragraphs, 2 FAQs |
| Schema | none detected | WebApplication + FAQPage |
| Conversion | SaaS free tier | advisory CTA |

| | provestor hotspots | Ours: benchmarks blog |
|---|---|---|
| Length | ~2,100 words | ~4,119 words |
| Tables | 2 | 3 |
| Table metrics | yield + avg rent + avg price | yield band + qualitative character |
| Named data source | Zoopla | none |
| Data-through date | September 2025 | none |
| Named places | 12 regions + 9 cities, each with a number | regions with bands, cities named in prose only |
| Question-form H2s | 3 of first 3 | 1 of 12 (plus 3 question H3s) |
| FAQs | 0 | 13 |
| Conversion | Calendly callback, free masterclass x2, £19/mo anchor | site CTAs |
| Schema | none detected | FAQPage + Article |

---

## 7. Coverage checklist (union of their features minus ours)

### buy-to-let-mortgage-calculator.ts

1. **Property value + deposit (£ and %) inputs, with the loan amount as a
   computed output.** Highest-value single item. A searcher for "buy to let
   mortgage calculator" knows the asking price and their deposit; asking them for
   the loan amount asks them to do the first calculation themselves.
2. **Show interest-only and repayment together rather than behind a select.** One
   page then answers three query variants. Keep the select only if the toggle
   drives emphasis, not availability.
3. **Total paid over the term for both bases, side by side** (they show
   £270,000 vs £399,900 on the same screen; that contrast is the page's hook).
4. **An SSR worked example** with real figures. `workedExamples` already exists on
   the type and already renders on `[slug]/page.tsx`.
5. **`related` internal links.** Ours has zero body links; theirs has eight.
6. **Three interest-only FAQs we do not answer:** why interest-only is the BTL
   norm; what happens at the end of an interest-only term; how big a BTL deposit
   needs to be. Ours are all tax-framed, so we answer none of the mortgage
   questions the query actually asks.
7. **Longer prose.** Theirs runs 1,200 to 1,400 words against our three
   paragraphs.
8. **A fuller disclaimer and entity block.** Ours has one note line; theirs has an
   informational-purposes block, an estimate-not-a-quote line, company number and
   contact details. This is an E-E-A-T signal as much as a legal one.

### rental-yield-calculator.ts

1. **Vacancy / void rate as its own % input.** Currently buried in help text on
   the costs field.
2. **Payback period output** (years to recover the purchase price from net
   income). Cheap to compute, and it is a differentiated output.
3. **Cashflow output on the yield page.** We have it on a separate tool; they
   surface it here because a yield searcher wants it in the same view.
4. **Monthly rent input** rather than annual. Landlords know the monthly figure.
   Accept monthly, annualise internally.
5. **The formulas as their own headed sections** ("How to calculate gross rental
   yield", "How to calculate net rental yield"). Snippet and AI-answer bait.
6. **An on-page "What is a good rental yield?" section** with actual regional
   numbers, not just an FAQ answer.
7. **The soft factors provestor and landlordstudio both cover** and we do not:
   occupancy rates, holding period, capital growth trade-off, risk, investment
   strategy.
8. **`related` and `workedExamples`:** both empty.
9. **Only 2 FAQs**, the thinnest of the four tools.

### buy-to-let-cashflow-calculator.ts

1. **No competitor holds a dedicated BTL cashflow page**, so the checklist is
   borrowed: landlordstudio folds cashflow into its yield tool.
2. **Vacancy rate as a % input** rather than an "other costs" lump.
3. **Payback period / cash-on-cash return output.** Landlordstudio links out to a
   whole post on cash-on-cash vs ROI, which signals the demand.
4. **Split the mortgage input into interest and capital portions,** since the
   help text already explains that only interest matters for tax and the tool
   then cannot act on it.
5. **`related`, `workedExamples`, prose depth:** all absent, as above.

### rental-income-tax-calculator.ts

1. **No direct competitor page in the harvest set.** uklandlordtax's nearest
   equivalent is the limited-company-vs-personal-ownership calculator, which is
   the higher-intent commercial tool.
2. **A company-vs-personal comparison output** is the gap: our tool stops at the
   individual's tax and the note only says "companies are taxed differently".
   Their whole tool is that comparison.
3. **Band-spanning profit.** Our note admits the single-band assumption; making
   the calculation span bands removes the caveat.
4. **`related`, `workedExamples`:** absent.

### property-investment-benchmarks-uk-2026-good-yield.md

1. **A named data source.** Provestor cites Zoopla; we cite nothing. This is the
   single biggest gap on the page, and our word count advantage does not offset
   it.
2. **A data-through date.** Theirs says September 2025 and still ranks. An
   undated indicative band cannot be cited by an answer engine.
3. **Average monthly rent and average property price columns** alongside the
   yield, so a reader can check the arithmetic.
4. **A city-level table.** We name cities in prose and in H3s but give them no
   row of their own.
5. **Question-form H2s.** Three of provestor's first three H2s are verbatim
   questions; only one of our twelve is. Our 13 frontmatter FAQs contain the
   right questions, they are just not promoted into the heading structure where
   the question family is won.
6. **A "one to watch" single-area spotlight,** their most human, most linkable
   block.
7. **A low-friction conversion path.** Theirs offers a Calendly callback and a
   free masterclass placed twice mid-page.

---

## 8. Whitespace: ours only, KEEP

1. **KEEP: structured data on tool pages.** We emit WebApplication /
   FinanceApplication plus FAQPage; no competitor page in this set had detectable
   schema. This is the cheapest available edge for AI answer surfaces.
2. **KEEP: Section 24 integrated into every tool.** All four of our tools carry
   the mortgage-interest restriction in the note, the explainer or the maths.
   uklandlordtax sells Section 24 advice and still does not put it in the
   mortgage calculator; landlordstudio, being US-built, never mentions it.
3. **KEEP: after-tax take-home as a computed output.** Our rental income tax tool
   returns take-home after tax and mortgage. Competitor yield and mortgage tools
   stop at pre-tax.
4. **KEEP: forward-dated tax facts.** The 2027/28 Section 24 rise from 20% to
   22%, the April 2027 separate property income tax rates and the FHL abolition
   are all live in our copy. Provestor's data is 11 months stale and neither
   competitor tool page mentions a future rate change.
5. **KEEP: a connected tool fleet.** Yield feeds cashflow feeds income tax, and
   the notes cross-reference. Competitors have isolated tools (landlordstudio) or
   a hub whose own index disagrees with its nav about what exists
   (uklandlordtax).
6. **KEEP: sensible pre-filled defaults.** Every field in all four tools opens
   with a realistic figure, so the page shows a result on load. Both competitor
   calculators open empty and show zeros.
7. **KEEP: the tone flag on cashflow.** The good/warn signal plus the
   positive/negative label is a genuine UX touch neither competitor has.
8. **KEEP: 13 FAQs and 4,119 words on the benchmarks post,** roughly double
   provestor's length, with HMO, student, serviced accommodation, MTD,
   incorporation and CGT-on-exit all covered. Provestor covers none of that
   depth. The post loses on sourcing, not on substance.
9. **KEEP: embeddable tools.** Every tool carries an `embedHeight` and an embed
   route, which is the faceless off-site authority play. No competitor tool here
   offers an embed.
