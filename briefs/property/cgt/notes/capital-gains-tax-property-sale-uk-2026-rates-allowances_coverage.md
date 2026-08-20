# Coverage note: /blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances

EXTEND-GOOGLE, additive only. Executed 2026-08-20 against
`packs/PACK_blog_capital-gains-tax_capital-gains-tax-property-sale-uk-2026-rates-allowances.md`.

Diff after QA remediation: 55 insertions, **1 deletion**. The single deletion is the
APPROVED protected-element back-patch recorded below. Everything else is additive: metaTitle,
H1, all 7 existing H2s (and the 8 existing H3s) and their order, all existing body prose and
the other 11 existing FAQ entries are byte-identical. Frontmatter: `reviewedAt: "2026-08-20"`
and `dateModified: "2026-08-20"` added after `date:` (neither field previously existed on
this page; order follows the estate convention of `reviewedAt` then `dateModified`). Nothing
else in frontmatter touched.

## What was added

Five new question-form H2 sections inserted between the last existing content H2
("Reporting, Payment and Record Keeping") and "Related Reading", so every new block sits
BELOW the existing current-year rate content and "Related Reading" stays last. Existing H2
relative order unchanged.

1. Do you pay 18% or 24% on your gain? (retitled at QA, see EDITORIAL 1.1)
2. Have capital gains tax rates gone up?
3. What were the capital gains tax rates in 2024/25 and 2025/26? (carries the single
   historic-rates table)
4. What is the CGT rate on commercial property and land?
5. Do non-residents pay capital gains tax on UK property? (two H3s: 60-day return on every
   disposal; rebased base cost)

Six new FAQ entries appended to `faqs:` (12 existing -> 18). Three were repointed at QA to
edge cases the body does not carry, see EDITORIAL 1.2.

Words added to body: 1,246 (825 existing -> 2,071 by the file count, 2,033 body words by
`voice_scan`). Winners average 2,022 per §6, so this lands on the market's shape without
padding.

## Measured against the §6 language spec (post-remediation)

| Measure | Spec target | New sections |
|---|---|---|
| Question-form headings | raise (winners 31.5%) | 5 of 5 H2s = 100% |
| "you/your" per 1,000 words | 25+ | 32.1 |
| Statute refs in new sections | near zero | 0 (no section/Act cited anywhere in the added copy) |
| Answer in the first sentence | required | 5 of 5 ("On a gain of any size, usually both.", "CGT rates last changed on 30 October 2024...", "2024/25 is the awkward year...", "The same 18% and 24%.", "Yes.") |
| Em-dashes | none | 0 in file |
| Counted-noun section openers (cross-page tic X.1) | at most one | 1 ("One thing to check before you reuse an older calculation"). The other pre-existing instance, "Five steps." in a protected FAQ, is out of scope. |
| Tables | keep ours | 1 added (historic rates), existing structure untouched |

## Gate outputs (run after remediation)

- `python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD` ->
  `EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)`
- `python scripts/voice_scan.py --slug capital-gains-tax-property-sale-uk-2026-rates-allowances --site property`
  -> `robot_score 3.9, band: CLEAN`. S2 meta-commentary 0, S3 structural/SEO talk 0,
  S4 em-dashes 0, S5 signposting 0, S7 americanisms 0. The only flag is S1 abstract-noun
  voice at 1.57/1k, and three of its four hits are in protected pre-existing copy.
- `git diff` -> 55 insertions, 1 deletion (the approved back-patch).

## APPROVED protected-element back-patch (FACTUAL BLOCKER 2)

The pre-existing FAQ "What are the most common CGT mistakes landlords make on a property
sale?" had the disposal date backwards. Coordinator approved the correction. Exact change,
one bullet inside one FAQ answer, nothing else in that FAQ touched:

- Before: `(1) using exchange date rather than completion date as the disposal date;`
- After: `(1) using the completion date rather than the exchange date as the disposal date (exchange fixes the tax year; completion only starts the 60-day clock);`

Wording is the QA reviewer's suggested correction verbatim. TCGA 1992 s.28 puts the time of
disposal at the time the contract is made; only the 60-day reporting and payment clock runs
from completion (FA 2019 Sch 2 para 3). This also resolves the cross-page contradiction with
`cgt-payment-deadlines-property-sales-2026`, which already stated it correctly and narrowly.

**Consequence for the new copy.** The original pass deliberately avoided the exchange versus
completion topic because the protected FAQ blocked it (recorded in the first version of this
note). With the FAQ corrected, the topic is now safe, so one of the duplicated FAQs was
repointed to it: "Which CGT rates apply if a sale exchanged before 30 October 2024 but
completed after it?" That is the highest-value straddle case on a page that now carries a
rate-change date, and it doubles as the EDITORIAL 1.2 fix.

## QA remediation log

### Factual (FACTUAL_rates-family.md, page 2 verdict all_clear on changed copy, 3 advisories)

| Ref | Finding | Fix applied |
|---|---|---|
| ADVISORY 2 | Straight-line apportionment offered as an alternative for BOTH rebasing dates. It is Sch 4AA Part 3, i.e. the April 2015 residential route only. | FAQ "What is NRCGT and when did it start?" now attaches straight-line apportionment to the residential April 2015 route only, with the actual-original-cost basis as the alternative available on either route. |
| ADVISORY 3 | Temporary non-residence framed as catching a plain UK property disposal, and missing the entry condition. | Both instances (body and FAQ) rewritten. They now state that a post-April-2015 UK residential gain is already inside the non-resident charge in full so there is nothing left to recapture, that the rules reach principally pre-April-2015 value and non-UK assets, and that the entry condition is UK residence in at least 4 of the 7 tax years before departure plus return within 5 years. |
| ADVISORY 4 | BADR described as reaching commercial property directly. | Body rewritten: rollover relief attaches to land and buildings used in your own trade; BADR needs a disposal of the business, of business assets after cessation, or an associated disposal, so a standalone shop sale by a continuing trader gets nothing. The FAQ that repeated the claim was repointed entirely (EDITORIAL 1.2), so the claim no longer appears anywhere on the page. |

Nothing was left unverifiable-but-kept. The one soft statement retained is in the new
straddle FAQ: "Contracts between connected parties around a rate change attract more scrutiny
than arm's length sales, so take advice before relying on the exchange date in a family
transfer." That is written as a prompt to take advice, not as a statutory assertion, because
house positions carries no anti-forestalling rule for the 30 October 2024 change and I would
not assert one from memory.

### Editorial (EDITORIAL_batch3.md, target 1: 2 blockers, 4 advisories)

| Ref | Finding | Fix applied |
|---|---|---|
| BLOCKER 1.1 | New H2 answered "what is the rate" a second time, seventy lines below the protected H2 that already answers it; AEA history told three times. | H2 retitled "Do you pay 18% or 24% on your gain?" and reopened on the stacking mechanic, which the protected section does not cover. The restated rate line is gone. The third telling of the AEA history (the £12,300 -> £6,000 -> £3,000 sequence in H2 2) is deleted; the comparison arithmetic that made the point stays, and the sequence still reads off the historic table. |
| BLOCKER 1.2 | Four of six new FAQs restated their own H2, one heading character-for-character. | One kept ("What were the capital gains tax rates in 2024/25?", the 590/mo carrier). Three repointed to edge cases the body does not carry: treaty credit / double taxation for non-residents; the 30 October 2024 exchange-versus-completion straddle; whether a commercial or land sale needs a 60-day return. |
| ADVISORY 1.3 | "25/26" keyword shorthand, not house style. | Replaced with the reviewer's wording: "The 2025/26 and 2026/27 positions are the same, so an older calculation built on 2025/26 rates still holds." |
| ADVISORY 1.4 | Protected line 68 says the AEA "continues its significant reduction", untrue since April 2024, and the new copy now sits beside it saying nothing has moved. | NOT fixed. Out of this window's permission (it is protected prose and the coordinator approved only the disposal-date back-patch). Logged here for the next edit window on this page. It is a one-clause fix: "continues its significant reduction" -> "has been cut and then held flat". |
| ADVISORY 1.5 | "or shares" drift into the deferred shares family (§4c.9). | Dropped. |
| ADVISORY 1.6 | Subject overlap with `cgt-rates-property-2026-27-current-rates-explained`. | Acknowledged, link retained as the mitigation. Same point as the cannibalisation section below. |
| CROSS-PAGE X.1 | "[number] [plural noun]" section openers, 16 across the batch, 3 of them mine. | Cut to 1. "Two things work differently." disappeared with the repointed FAQ; "Two alternatives exist if they suit you better:" rewritten as "You can elect out of that if the facts suit you better..."; "One thing to check before you reuse an older calculation" kept as this page's single retained instance. |

One knock-on to flag: the repointed 60-day FAQ answers a reporting question, and reporting
intent is otherwise declined on this page as belonging to
`cgt-payment-deadlines-property-sales-2026`. It is kept because the answer is a
commercial-property answer (the deadline is the thing that differs) and because a reader who
has just been told commercial and residential share a rate will otherwise assume they share a
deadline. One FAQ, no section, no keyword claim on the reporting cluster.

## Historic-rates block: sourcing

House positions §5 gives the current position (18%/24% residential and non-residential from
30 October 2024; AEA £3,000, £1,500 trusts; trustees and PRs 24% throughout; BADR 10% ->
14% from 6 Apr 2025 -> 18% from 6 Apr 2026) and its do-not-write list fixes 28% as the
pre-30-October-2024 higher rate. §5's own line 4003 caveat ("the individual higher rate fell
28% -> 24% from 30 Oct 2024") corroborates. The pre-30-October-2024 non-residential figures
(10% / 20%) are not in §5; they are taken from our already-published, house-checked sibling
`cgt-rates-property-2026-27-current-rates-explained` §"What changed from previous years",
which states them explicitly. Every figure in the table is therefore traceable to house
positions or to published house-checked copy. Nothing was inferred.

Deliberately omitted, per "exactly right or omit":
- The exchange-vs-completion disposal-date point for sales straddling 30 October 2024. The
  protected FAQ on this page already asserts completion date as the disposal date; house
  positions does not adjudicate it. Raising it in new copy would either contradict protected
  prose or restate an unadjudicated point, so it is left out entirely.
- Personal representatives' rate is written as the current 2026/27 position only, with no
  commencement date, per the §4003 warning not to assert 24% for PRs "from Oct 2024" without
  checking FA 2025 commencement.
- Pre-2015 non-resident position beyond the 6 April 2015 / 6 April 2019 staging dates.

Arithmetic check in the "Have rates gone up?" section: £60,000 gain, 2022/23 =
(60,000 - 12,300) x 28% = £13,356; 2026/27 = (60,000 - 3,000) x 24% = £13,680. Verified.

## Section 3 keyword disposition (60 rows, all vol >= 90)

The pack lists one best-peer domain per row, so the ">= 2 domains" test is applied at
cluster level: the non-resident cluster spans ukpropertyaccountants + uklandlordtax +
optimiseaccountants (3), the reporting cluster spans uklandlordtax + ukpropertyaccountants
(2), the rates/increase cluster is single-domain ukpropertyaccountants (the HTTP 202 captcha
stub, dossier §7 = weakest evidence). Single-domain rows were still placed where the manager
adjudication assigns the intent to this page.

**PLACED: 54 of 60.**

| Group | Rows | Where placed |
|---|---|---|
| Residential head: capital gains on residential property (1000), cgt on residential property (1000) | 2 | H2 1 body ("Work out capital gains on residential property in this order"; the heading itself was retitled at QA and no longer carries the phrase); H2 3 body ("CGT on residential property in 2025/26 and 2026/27") |
| Non-resident family (33 rows, 390/260 vol: all "non resident / non-resident / non residents" x capital gains / capital gain / cgt permutations, plus `nrcgt` 140, `non resident cgt return` 90, `non resident capital gains tax return` 90) | 33 | H2 5 + its two H3s; FAQs "What is NRCGT and when did it start?", "If you are non-resident, will you be taxed twice on a UK property sale?", "Do I still pay UK CGT if I move abroad before selling?" (the fourth non-resident FAQ was repointed at QA; the H2 heading still carries the phrase verbatim) |
| Rates by year: capital gains tax rates 2024/25 (590), capital gains tax rate 2026 (320), capital gains tax 2025 26 (210), capital gain tax rate 2025 (210), capital gains tax 2025 (140), cgt on residential property 2025/26 (110), cgt on residential property 2025 26 (110), capital gains tax rates 25 26 (110), cgt higher rate (90), when did cgt rates change (90) | 10 | H2 3 heading + historic table + body ("an older calculation built on 2025/26 rates"); H2 2 body ("CGT rates last changed on 30 October 2024", "The CGT higher rate on residential gains was 28%"); FAQ "What were the capital gains tax rates in 2024/25?" |
| Rate-increase family: increase in capital gains tax, cgt increase, rise in capital gains tax, raising capital gains tax, capital gain tax increase, capital gains tax increase, capital gains tax raise, increase capital gains tax (210 each), has capital gains tax gone up (90) | 9 | H2 2 heading and body (both directions answered: residential down 28% -> 24%, non-residential up 10%/20% -> 18%/24%, BADR up); the matching FAQ was repointed at QA, so the carriers now sit in the H2 heading and body only ("CGT rates last changed on 30 October 2024", "The CGT higher rate on residential gains was 28%") |

**DECLINED: 6 of 60.**

| Keyword | Vol | Reason |
|---|---|---|
| budget 2025 capital gains tax | 170 | Budget-speculation intent. Dossier §3 puts budget speculation in the `excluded-news` bucket; a dated news frame on an evergreen rates page decays it and the page's protected metaTitle is 2026-anchored. |
| paper cgt return | 140 | Reporting-mechanics intent, adjudicated to `cgt-payment-deadlines-property-sales-2026` (dossier §4c.3). This page already links there and stacking the form-mechanics answer here would cannibalise the owner. |
| report cgt on residential property | 90 | Same adjudication (§4c.3). |
| reporting cgt on residential property | 90 | Same adjudication (§4c.3). |
| capital gains tax uk property disposal return form pdf | 90 | Same adjudication (§4c.3); form-download intent, not rates intent. |
| cgt on uk property account | 90 | Same adjudication (§4c.3); the HMRC account/service walkthrough is the deadlines page's subject. |

The non-resident 60-day return IS mentioned here (H2 5, H3 1) because it is the point of
difference that makes the non-resident answer correct, not because reporting intent moved
pages. Depth routes out to the two non-resident pages by link.

## Competitor themes from §4 (zero undecided)

| Theme | Decision |
|---|---|
| optimise: "What are the basics of UK property CGT for foreign non-UK residents?" | COVERED, H2 5 opening. |
| optimise: "What CGT do I report and pay to HMRC as a foreign investor?" | COVERED, H3 "You report every disposal, even when no tax is due". |
| optimise: "What happens if I sell a property in the UK while non-resident?" | COVERED, H2 5 + rebasing H3 + temporary-non-residence paragraph. |
| optimise: "Consultation options / Appointment booking / Book your appointment" (3 headings) | DECLINED. Booking-CTA padding, named in dossier §6 do-not-copy. The page already routes to /services in protected prose. |
| uklandlordtax: "Residential property" / "Non-residential property (after 5th April 2019)" | COVERED, H2 4 (commercial and land) + rebasing H3 (5 April 2015 / 5 April 2019 staging). |
| uklandlordtax: "Do you have a question for our landlord tax experts?" | DECLINED. CTA furniture, same reason as above. |
| uklandlordtax: on-page calculator (calculator=True) | DECLINED. Tool intent belongs to `/calculators/capital-gains-tax-calculator` per dossier §4c.1, and the calculator work is gated on the SDLT calculator read (~2026-09-01). |
| ukpropertyaccountants: "how capital gains tax has evolved over the years" | COVERED factually by the historic table and H2 2, without the retrospective-essay framing. No teardown available (HTTP 202 stub, §7), so the theme is inferred from the URL slug and treated as rate-history intent. |
| ukpropertyaccountants: "capital gains tax the likely target for hike in tax rates" | DECLINED. Speculation about future rises. Same reason as `budget 2025 capital gains tax`; house positions carries no forward rate change for CGT, and the enacted FA 2026 change is to property INCOME rates from April 2027, not CGT. |

## Cannibalisation note (flagged, not hidden)

Four sibling pages already own adjacent subject matter: `cgt-rates-property-2026-27-current-rates-explained`
(current rates, incl. its own rate-history H2), `cgt-commercial-property-different-residential`,
`non-resident-cgt-uk-property-rates-reporting` and `non-resident-cgt-selling-uk-property-overseas-guide`.
The manager adjudication puts current-and-historic rates intent on this page, so the rates
material was written, but the non-resident and commercial blocks were deliberately kept to a
summary answer plus outbound links rather than full treatments, so the hierarchy stays
answer-here / depth-there. If the 28d Bing read shows the siblings losing position on their
own heads, the shortest correction is to trim H2 4 and H2 5 to their opening paragraph plus
the links.

## Equity gate

All 10 Google queries and the Bing rows in pack §2 still match: the protected rate,
allowance, PRR, allowable-cost, indexation, company-ownership and 60-day content is
untouched, and the additions extend the commercial-property, land-sale and
annual-exemption-2026/27 phrasings that already earn Bing impressions.

## Not done (per instruction)

No commit, no deploy, no `monitored_pages` / `blog_optimizations` row. Those follow at
owner-triggered deploy per dossier §9.

## Manager back-patches (2026-08-20, post-QA)

- Protected FAQ (60-day reporting): "daily penalties after 3 months and 6 months" corrected to
  "£10 daily penalties from 3 months and further penalties at 6 and 12 months" (house_positions
  section 5 ladder; flagged by the deadlines-page QA as factual advisory 8).
- Protected body line 69 (applied by the complete-guide writer under approval): AEA "continues its
  significant reduction" corrected to "was cut sharply and has stood at £3,000 since April 2024".
