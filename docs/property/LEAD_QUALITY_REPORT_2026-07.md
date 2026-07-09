# Property site lead quality report — 5 Apr to 9 Jul 2026

Audience: partner firms evaluating the lead flow. Every lead message was read
individually and given a judgment-based estimate of first-year engagement
value (£). Estimates are midpoints, not quotes; the shape of the distribution
is the point, not any single number.

Data: 56 submissions, 55 unique leads (1 duplicate submitter).
Chart: `lead_value_distribution_2026-07.png`. Scoring + reproduction:
`scripts/_lead_value_analysis.py` (re-run after editing any estimate).

## Headline

- **£70,200 estimated first-year pipeline value in ~3 months** across 55 leads.
- Mean £1,276 vs median £700 (std £1,807): a **right-skewed, power-law-ish
  distribution**. The top 5 leads carry 46% of all value; the top 14
  (very-high + high tiers) carry 73%.
- Practical rate: **one £5k+ lead every ~2.5 weeks, one £1.5k+ lead every
  week** at current volume.
- 3 in 4 leads (41/55) represent real billable work. The "low" quartile is
  almost entirely micro-capture widgets, not the main contact form.

## Tier definitions and counts

| Tier | Definition | n | % |
|---|---|---|---|
| Very high | £3k+/yr recurring or £5k+ project (large portfolios, £1m+ incorporations, trading businesses) | 5 | 9% |
| High | £1k–3k/yr recurring (multi-property incorporation candidates, growth SPVs) | 9 | 16% |
| Medium | £300–1.5k one-off advisory or small recurring (single-property Ltd, SA+MTD) | 27 | 49% |
| Low | Email-only captures, vague one-liners, non-work | 14 | 25% |

## Insight 1 — self-selected role is an honest, predictive signal

| Role | n | Mean value | Total value |
|---|---|---|---|
| Large portfolio | 4 | £6,500 | £26,000 |
| Portfolio owner | 5 | £1,680 | £8,400 |
| Property developer | 2 | £950 | £1,900 |
| Other | 23 | £787 | £18,100 |
| Individual landlord | 21 | £752 | £15,800 |

**Nobody inflated themselves.** All 4 who ticked "Large portfolio" genuinely
were (12-flat freehold block, £750k-turnover holiday-let business, 11-flat
estate + Ltd + LLP, self-declared large incorporation). The role dropdown
alone predicts value about as well as reading the message, so a partner can
triage on it with confidence. The 4 "Large portfolio" leads are worth more
in aggregate than the 21 individual landlords combined.

Caveat: "Other" is bimodal — it is the default for anonymous widget captures
(bottom of the range) but also hides a £6k incorporation lead and several
£1.5k–2k company enquiries. "Other" + a substantive message deserves a read,
not a discard.

## Insight 2 — channel drives quality; the contact form is the premium stream

| Channel | n | Mean | Median | VH+H rate | Low rate |
|---|---|---|---|---|---|
| Standard forms (contact / page) | 38 | £1,568 | £750 | 34% | 13% |
| Micro-capture widgets (exit-intent, mini-forms, result gates, mobile tool, assistant) | 17 | £624 | £100 | 6% | 53% |

The impression that "some leads are low value" is a channel artefact: the
widgets harvest thin intent by design (over half are Low tier). Strip them
out and the core form flow is ~87% medium-or-better with a £1,568 mean.
The widgets still pay their way — one exit-intent capture was a **£1.2m
partnership incorporation (est. £6k)**, a top-5 lead the site would
otherwise have lost. Correct read: widgets are a cheap lottery ticket
stapled to a premium stream, and should be reported separately.

## Insight 3 — intent mix: incorporation is the money keyword

| Intent | n | Total est. value | Mean |
|---|---|---|---|
| Incorporation | 10 | £33,100 | £3,310 |
| Structure/ownership (SPV, LLP, Form 17, splits) | 13 | £14,900 | £1,146 |
| Compliance (SA, MTD, company accounts) | 5 | £8,700 | £1,740 |
| CGT disposals | 9 | £8,000 | £889 |
| SDLT | 4 | £3,000 | £750 |
| Non-resident / expat | 4 | £1,500 | £375 |
| VAT | 1 | £500 | £500 |

Incorporation + structure = 23 leads and **£48k (68% of pipeline value)**.
These are also the enquiries that convert into *recurring* company clients
rather than one-off questions. CGT volume is steady but individually small;
NRL/expat is the weakest segment (complex, low fee, hard to serve).

## Insight 4 — work type: recurring beats one-off 2.7:1 on value

| Work type | n | Total | Mean |
|---|---|---|---|
| Recurring client | 16 | £34,800 | £2,175 |
| One-off project (large) | 4 | £21,500 | £5,375 |
| One-off advisory | 22 | £13,000 | £591 |
| None/unknown | 13 | £900 | — |

20 of 55 leads (36%) are potential recurring clients or major projects, and
they hold 80% of the value. First-year estimates *understate* recurring
leads: a £2k/yr company client retained 5 years is a £10k relationship.

## Insight 5 — volume is accelerating

| Month | Leads | Est. value |
|---|---|---|
| Apr 2026 | 2 | £2,500 |
| May 2026 | 8 | £14,600 |
| Jun 2026 | 34 | £39,500 |
| Jul 2026 (first 9 days) | 11 | £13,600 |

July's run-rate is ~37 leads / ~£45k pipeline per month. Mean quality has
held (~£1.2k/lead) while volume grew 4x from May to June — growth has come
from more of the same mix, not from diluting quality. (Some June growth is
the new capture widgets; the form-only trend also rose.)

## Lead-message quality note

Messages are unusually substantive for web leads: people volunteer property
counts, valuations (£2.25m block, £1.2m portfolio, £750k turnover), mortgage
figures, tax bands and deadlines. The multi-step mini-form rollout (early
July) further structures this (Situation / Prompted by / Wants from call),
which makes triage faster for whoever works the leads.

## What a partner should take from this

1. Judge the stream on the tail, not the average: ~half the value arrives in
   ~9% of leads, roughly fortnightly.
2. Triage rule: role = portfolio/large → priority call same day;
   incorporation/structure language → priority; widget email-only → nurture.
3. The £70k figure is first-year only; weighting recurring clients at
   realistic lifetimes puts the 3-month flow well into six figures of
   lifetime value.
