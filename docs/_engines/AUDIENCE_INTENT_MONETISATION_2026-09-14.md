# Audience intent and monetisation, 2026-09-14

Question from the owner: the estate has a few hundred humans a day. Other than partner
lead submissions, what turns them into automated, month-on-month revenue in the
accounting niche? This is the first time the answer was derived from what the visitors
actually do, ask and search for, rather than from market research.

Three fresh pulls, data through 2026-09-12/13:

- `audience_intent_2026-09-14/INTENT_MAP.md`: GSC + Bing queries, 28 days, ten intent buckets.
- `audience_intent_2026-09-14/BEHAVIOUR.md`: `web_sessions` + `web_events`, bot-gated, 28 days, cohorts.
- Lead corpus: all 297 non-test leads since April, read and classified by hand. The full
  report quotes lead messages, so it stays out of the repo; the taxonomy is in section 2b.

## 1. Recommendation

**Sell the computation, not the callback.** Put a priced "workings" document behind the
Property calculators people already hammer (CGT disposal, incorporation, section 24):
one-off, Stripe Checkout, no account. Then add a small subscription for the returning
cohort. First pound inside two weeks. Everything else here is sequencing around that.

Why this and not the SaaS-sprint pilot (dividend pack): the demand here is measured on our
own traffic, not inferred from an incumbent's pricing page.

## 2a. What the audience is

| Fact | Number | Source |
|---|---|---|
| Human sessions per day (estate) | 457, not ~300 | BEHAVIOUR (58% of raw sessions were bots) |
| Property share of sessions | 229/day (50%) | BEHAVIOUR |
| Property share of leads | 215 of 297 (72%) | leads |
| Leads that are incorporation / SPV / personal-vs-Ltd decisions | 124 (42%) | leads |
| Leads that are DIY-ers who wanted a number, got a form | ~65 (22%) | leads |
| Leads that volunteer a price question | 71 (24%) | leads |
| Leads wanting an ongoing accountant | 46 (15.5%) | leads |
| Calculator runs / 28d | 6,020 in 581 sessions (10.4 runs, 47 input edits per session) | BEHAVIOUR |
| CGT calculator alone | 2,133 runs, 135 sessions, 10,118 input changes | BEHAVIOUR |
| Calculator power users per day | 18 | BEHAVIOUR |
| Deep readers (3+ min, one page, leave) per day | 92 | BEHAVIOUR |
| Returning visitors | 16% of visitors, 33% of sessions, 48% of converting visitors | BEHAVIOUR |
| ChatGPT referrals | 3.7 sessions/day, 14 leads, 13.6% conversion (bing 0.30%) | BEHAVIOUR |
| Result gate errors ("write a message to see the number") | 238 of 331 Property form errors; 274 gate skips | BEHAVIOUR |
| "calculator" queries with impressions and zero clicks | 672 queries, 5,578 impr, avg pos 45-90 | INTENT_MAP |
| Form-code navigational (SA105, NRL1, P11D) | only bucket at avg pos 10; top Bing clicks estate-wide | INTENT_MAP |

## 2b. Lead taxonomy (297 leads, 2026-04-05 to 2026-09-13)

| Primary intent | n | % |
|---|---:|---:|
| Incorporation / personal-vs-Ltd / SPV | 75 | 25.3 |
| Wants an accountant, ongoing | 46 | 15.5 |
| One specific question, free answer | 36 | 12.1 |
| Setting up a new entity (PSC, practice, firm) | 24 | 8.1 |
| Noise (blank, email-only, complaints) | 22 | 7.4 |
| CGT / disposal event | 19 | 6.4 |
| Non-resident landlord | 13 | 4.4 |
| HMRC panic (LPC, undeclared, nudge, enquiry) | 8 | 2.7 |
| SDLT surcharge | 8 | 2.7 |
| IHT / succession | 8 | 2.7 |
| Price only | 8 | 2.7 |
| MTD | 7 | 2.4 |
| NHS pension (medical) | 5 | 1.7 |
| Business exit / BADR / MVL | 5 | 1.7 |
| Second opinion on existing accountant | 5 | 1.7 |
| Spouse / Form 17 / 99:1 | 4 | 1.3 |
| B2B spam | 4 | 1.3 |

Grouped: structuring decisions 42%; wants a person on retainer 18%; wants an answer not a
firm 16%; transactional events 13.5%. Leads per month, estate: Apr 5, May 12, Jun 40,
Jul 83, Aug 112, Sep 45 (13 days). 74 of the 75 incorporation leads are Property.
Urgency is transaction-shaped ("offer accepted", "mortgage renewal", "complete next
week"), not January-shaped.

The picture in one sentence: a landlord arrives on one page with one transaction in mind
(sell, gift, incorporate), spends minutes reconstructing it in a free calculator, is asked
to write a message to see the answer, and either skips or leaves. 42% of those who do
write are asking for an incorporation decision with a break-even. Nothing on the estate
produces that document at any price.

## 3. The plays, ranked by time to first pound

### P1. Paid workings at the calculator result (build: days)

Free headline number stays free. Below it: "Download the full computation with workings,
dated, as a PDF" for a one-off fee. Stripe Checkout link, PDF generated from the inputs the
user already typed. Replaces the message gate, which is the largest single source of form
errors on the estate.

- CGT on a disposal or gift, with the 60-day payment figure and a box-by-box worksheet
  for the HMRC return. Suggested £29.
- Incorporation decision report: personal vs company vs keep, SDLT, CGT and s.162,
  refinancing cost, annual saving, break-even years, act-now-or-wait against the Apr 2027
  +2pp property rates. Suggested £79. One lead asked for exactly this output, item by item.
- Section 24 / landlord essentials annual position with workings. Suggested £19.

Sizing, honest: ~21 calculator sessions/day on Property. At 3% take-up and a £39 blend,
roughly £700/month from day one, before any ranking fix. Scales linearly with P3.

Non-advisory line: the product is a computation from the user's own inputs with a standard
software disclaimer, the same footing as TaxCalc or GoSimpleTax. The owner is not an
accountant, so the copy never says "advice", "recommend" or "should". The report ends with
"take this to an accountant", which also feeds the partner lead line.

### P2. Landlord desk subscription (build: 1-2 weeks after P1)

Returning visitors are 16% of visitors and half of conversions; the 6+ visit bucket
averages 20 minutes engaged. Flat £5-9/month, no credits: saved scenarios and portfolio,
re-run every calculator against the current year, rate-change notes (Apr 2027), MTD
quarter reminders, P1 documents included. This is SaaS-sprint #3 scoped to what the
returning cohort already does.

### P3. Rank the calculator pages that already exist (content work, no product)

672 "calculator" queries, 5,578 impressions, zero clicks, because the pages sit at
position 45-90. Commercial mortgage calculator alone: 418 impressions at position 54.
These pages are P1's front door. Rewrite/uplift job for the existing programme. Do not
build more calculators until these rank.

### P4. Guided disclosure kits (~1 week each)

HMRC panic + non-resident is 7% of leads and the least price-sensitive cluster (an
81-year-old who missed the 60-day rule; people with undeclared years). NRL1 is the top
clicked query on Bing estate-wide. Two kits: Let Property Campaign calculator (tax,
interest, penalty per year, disclosure worksheet) and non-resident landlord pack (NRL1
walkthrough plus return figures). £79-149 one-off. Computation and worksheet, not advice.

### P5. SA105 box filler (folds into the MTD flagship)

SA105 is the only healthy Google bucket (position 3-10). A guided page that turns the
landlord calculator into filled SA105 box values is the free funnel the SaaS sprint named
(#4) and the on-ramp to the MTD ITSA filer (#1) before Apr 2027.

### P6. ChatGPT as a paid-answer channel (no build; measure first)

14 leads from 103 sessions. These arrive with the question framed. Two cheap moves: make
P1's result pages the thing ChatGPT cites (plain "how this was calculated" sections,
structured outputs), and tag P1 purchases by referrer so the channel can be sized before
any GEO spend.

## 4. What this contradicts

- "Build more calculators": no. The existing ones do not rank, and the ones that do (dental
  practice valuation pos 3, SRA calculator pos 3.8) still get zero clicks because the URL
  is a blog post. Fix presentation and ranking first.
- "More informational posts": 92 deep readers/day already read one page for 3+ minutes and
  leave. The gap is the second step, not the first.
- "Landlords want a retainer": 15.5% do; several explicitly refuse one. Price one-off.
- "Nudge/modal surfaces are the lever": assistant nudge 0.21% CTR on 10,384 impressions,
  deep-scroll modal 1.6% with 1,131 dismissals. People refuse an interruption and accept a
  product placed where their answer is.

## 5. Sequence

1. P1 on the three Property calculators. Stripe account (owner), PDF generation from the
   existing calculator libs, replace the message gate. Blast radius: Property calculator
   result panels only. Revert: restore the gate component.
2. P3 in parallel as a rewrite package on the calculator URLs.
3. P2 once P1 has 30 days of purchase data.
4. P4 and P5 as capacity allows, P5 tied to the MTD flagship decision.

Cost this session: three Opus agents, no DataForSEO spend, no repo changes beyond this doc
and two appendices.

## 6. Decisions for the owner

1. Approve P1 as the first self-serve build (replaces the dividend-pack pilot as "first pound").
2. Confirm the non-advisory framing: computations with workings, software disclaimer, no
   advice language.
3. Price points above are placeholders; owner sets them.

## 7. Caveats

- GSC query-level data names only 4% of estate clicks; bucket shares are impression shares
  and click-level intent comes from Bing. See INTENT_MAP section 0.
- Cohort sizes are 28-day averages from `web_sessions`/`web_events`, all countries, not the
  GB-only console RPCs, so they will not match the dashboard exactly.
- No PDF, print, download or internal-search events exist in the taxonomy, so "would they
  download" is unmeasured. Absence of data, not a finding.
- September lead figures cover 13 days.
