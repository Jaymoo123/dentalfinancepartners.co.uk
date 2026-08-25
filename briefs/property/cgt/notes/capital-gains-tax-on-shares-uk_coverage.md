# Coverage note: /blog/capital-gains-tax/capital-gains-tax-on-shares-uk

NET-NEW page, written 2026-08-20 against
`briefs/property/cgt/netnew/BRIEF_capital-gains-tax-on-shares-uk.md`.
Clusters owned: `how much capital gains tax on shares` (840) + `capital gains tax on stocks` (2,380).
File: `Property/web/content/blog/capital-gains-tax-on-shares-uk.md`.

## QA round 1 (2026-08-20, post-write)

Two reviewer reports actioned: `qa/FACTUAL_netnew-calculator.md` §3 (verdict must_fix, 1 BLOCKER
+ 4 ADVISORY) and `qa/EDITORIAL_batch2.md` page 3 + cross-page (verdict must_fix, 3 BLOCKER +
5 ADVISORY). All findings against this page are closed. The editorial brand-fit read passed
clearly ("this reads as a property tax firm explaining shares to its own clients") and the
sections it named as worth keeping were left untouched.

| Finding | Status | What changed |
|---|---|---|
| FACTUAL BLOCKER 1 / EDITORIAL 3.1: "£2,872" in the lead worked example | **fixed** | now £3,072. Full re-derivation to the penny below. |
| FACTUAL ADV 1 / EDITORIAL: "EIS and SEIS deferral" label, SEIS never in the text and not a deferral relief | **fixed** | label now "Enterprise Investment Scheme (EIS) deferral"; one honest sentence added stating SEIS gives a partial exemption on a reinvested gain rather than a postponement. Both abbreviations expanded at first use per §13. |
| FACTUAL ADV 2: "Use both allowances in a couple" reads as covering unmarried partners | **fixed** | now "in a married couple or civil partnership", with an explicit sentence that the route is closed to unmarried partners because the transfer is a disposal at market value. Brings the page level with the second-home sibling. |
| FACTUAL ADV 3: reporting FAQ names only the gains test, not the proceeds test | **partially fixed, one item still open** | FAQ 7 now states that the capital gains pages have their own reporting tests and that one of them is based on total disposal proceeds rather than on the gain, so a large rebalance can require an entry with no tax due. The **£50,000 figure itself is still not stated** (see open item below). |
| FACTUAL ADV 4 / EDITORIAL 3.4: quoted UI label "Shares and other assets" | **fixed** | now `Shares &amp; other assets`, matching `capital-gains-tax-calculator.ts` line 27 exactly. Fixed on the blog side, which the reviewer identified as the smaller diff; the calculator was not touched. |
| EDITORIAL BLOCKER 3.2: "a shares-held-for-20-years calculation is rarely a two-figure sum" | **fixed** | replaced with the reviewer's wording: "so the base cost is rarely a single number off an old contract note. Get it settled before you file." |
| EDITORIAL BLOCKER 3.3: "when they reach for a sharesave capital gains tax calculator" | **fixed** | clause deleted. This removes the only verbatim placement of a target keyword (see keyword table). |
| EDITORIAL ADV 3.5: four promotional touches | **fixed** | cut the calculator plug from FAQ 2 (promotional copy inside FAQPage schema). The two asides and the inline calculator block are kept, as the reviewer directed. |
| EDITORIAL ADV 3.6: aside in third person | **fixed** | "Property Tax Partners reviews disposal timing" is now "We review disposal timing". |
| EDITORIAL ADV 3.7 / cross-page X.1: numbered-preamble tic x4 | **fixed** | three of four cut. Removed "You do not pay anything in three situations", "Two rows deserve a second look" and "There are three routes worth knowing" (the last folded into the spouse-transfer lead so the content survives). Kept one: "Three practical consequences if you own both:". |
| EDITORIAL ADV 3.8: three closers stacked | **fixed** | the five-bullet recap and its H2 are deleted. The closing paragraph is kept and now sits under a question-form H2, "What matters most if you hold shares and property?". |
| Cross-page X.2: aphoristic closers | **fixed** | "Do not leave it unused" removed (bullet now leads on the substantive fact). "Get those three right and the rate looks after itself" kept, being one of the two the reviewer named as strongest across the batch. |
| Cross-page X.3: "lever" metaphor duplicated with the inherited page | **fixed** | "the largest single lever available to a UK investor" is now "Nothing else in the UK system removes a gain this cleanly". |

### Lead worked example, re-derived to the penny after the fix

£34,000 proceeds − £16,000 cost − £200 dealing costs = **£17,800 gain**. Less £3,000 AEA =
**£14,800 taxable**. All higher rate: £14,800 × 24% = **£3,552.00**. With £8,000 of unused
basic-rate band: £8,000 × 18% = **£1,440.00**, £6,800 × 24% = **£1,632.00**, total
**£3,072.00**. Cross-check: £3,552 − £3,072 = **£480.00** = 6% × £8,000, the value of the band.
The page now states £1,440 and £1,632 explicitly so the total is checkable on its face.

### Open item carried to the owner, not closed unilaterally

FACTUAL ADVISORY 3 asks for the **£50,000 total-proceeds Self Assessment CGT reporting
threshold** to be named. It is still not stated as a number, for the reason given in the
omitted-figures table below: `house_positions.md` §5 does not carry it and no other Property
page states it, and §5 is the declared tie-breaker for this cluster. The reviewer is a QA track,
not ground truth, so naming a £ figure on its say-so would breach §13 ("no invented £ figures
that purport to come from HMRC publications") as the page has no verified source for it. The FAQ
now states the existence and shape of the proceeds test without the figure, which closes the
reader-harm half of the finding. **Recommended: add the threshold to house_positions §5, then
the figure can be stated here in a one-line edit.** Nothing was appended to
`track1_site_wide_flags.md` because this is a gap in our own ground truth rather than one of the
§14 flag categories.

## Gate results after the fixes

| Gate | Command | Result |
|---|---|---|
| Equity gate | `python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD` | **PASS** — "EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)" |
| Voice scan | `python scripts/voice_scan.py --slug capital-gains-tax-on-shares-uk` | **robot_score 4.9, band CLEAN** (was 21.6 / MINOR before the last two edits) |

Voice scan detail at CLEAN: S1 abstract-noun voice 1 (0.21/1k, the word "investor" in the
rollover sentence), S2 meta-commentary 0, S3 structural/SEO talk 0, S4 em-dashes 0, S5
signposting 0, S7 americanisms 0. The two S2 hits that produced the MINOR band were both "This
guide covers/sets out" framings, one in the summary and one in the body intro; both were
rewritten to lead on content. S6 reports 3,158 body words against its own 2,200 ideal (43%
over), which is a deliberate conflict with the brief's 2,800-3,500 net-new floor and is not
treated as a defect; the two counters differ because voice_scan excludes headings and table
cells.

## Six-check floor

| Check | Target | Result |
|---|---|---|
| Body words (tag-stripped) | 2,800-3,500 | **3,429** (was 3,493 pre-QA; the recap-bullet cut is the difference) |
| FAQs | 10-14 | **14** |
| metaTitle | <= 62 chars | **59** |
| metaDescription | <= 158 chars | **151** |
| Em-dashes / en-dashes | 0 | **0 / 0** |
| Internal links resolve | all | **6/6 verified** |
| Frontmatter shape | template match | all 19 fields present, every value double-quoted |
| Body format | raw HTML after frontmatter | yes, no markdown |

## Language spec (DOSSIER §6)

| Measure | Target | Result |
|---|---|---|
| Question-form H2s | raise (winners 31.5%) | **11 of 12 = 92%** (was 10 of 12; the recap H2 became a question) |
| "you/your" per 1,000 words | 25+ | **41.5** (winners 39.7) |
| Statute refs per 1,000 words | near zero, late | **1.4**, first mention is mid-page in the matching section |
| Tables | keep ours | 1 (the shares-vs-property comparison) |
| Current year | one only | 2026/27 throughout |

Statute used, all late and named in plain words: TCGA 1992 ss.104/105/106A (share matching,
mid-page), s.58 (spouse transfers, reliefs section), s.10A (temporary non-residence, penultimate
section). No statute above the fold. No pricing, no client names, "capital gains tax (CGT)"
defined at first use per house_positions §13.

## Internal links (all verified to exist)

| Link | Where | Purpose |
|---|---|---|
| `/calculators/capital-gains-tax-calculator` | twice: prominent block after the rate arithmetic, and the closing aside | the tool; shares mode confirmed live in `src/lib/calculators/tools/capital-gains-tax-calculator.ts` (`assetType: shares`) |
| `/blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27` | AEA section | AEA depth, do not restate |
| `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` | comparison table section | property side |
| `/blog/capital-gains-tax/bed-and-breakfasting` | share matching section | 30-day rule depth, do not restate |
| `/blog/capital-gains-tax/business-asset-disposal-relief-residential-property-qualification` | rate-reduction section | BADR qualification |
| `/blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk` | rate-reduction section | EIS/SEIS deferral |

No external links used. Zero outbound legislation links by design (spec calls for near-zero
statute; the sibling pages carry the citations).

## Differentiator delivered

The shares-vs-property side-by-side table (13 rows: rates, alignment date, trustee rate, shared
AEA, reporting route, payment deadline, matching rules, wrapper availability, part disposals,
main residence relief, spouse transfers, interchangeable losses). taxd's winning page has no
property comparison at all. Backed by three property-bridge sections no competitor carries:
sequencing disposals across tax years when the £3,000 is shared, selling shares to fund a
deposit (with the "no rollover into property" point stated flatly), and the ISA exemption having
no buy-to-let equivalent.

## Keyword placement

All 17 keywords in the `capital-gains-tax-on-shares-uk` section of `_newpage_keywords.txt` with
volume >= 50, plus the six head-family variants named in the brief.

### Placed (11)

| Keyword | Vol | Where |
|---|---|---|
| how much capital gains tax on shares | 590 | H2 "How much capital gains tax on shares do you pay in 2026/27?" + FAQ 2 (verbatim) |
| capital gains tax on stocks | 320 | FAQ 6 "Is capital gains tax on stocks the same as on shares?" + body (verbatim) |
| capital gains tax stocks and shares isa | 210 | H2 "Do you pay capital gains tax on a stocks and shares ISA?" + FAQ 4 (natural variant, article inserted) |
| capital gains tax uk calculator shares | 110 | calculator block: "Our UK capital gains tax calculator now has a shares mode" (natural variant) |
| do you pay capital gains tax on shares | 110 | H2 "Do you pay capital gains tax on shares?" + FAQ 1 (verbatim) |
| capital gains tax on shares held for 20 years calculator | 90 | H2 "What about shares you have held for 20 years?" + body sentence pairing the holding with the calculator + FAQ 8 (natural variant) |
| capital gains tax on stocks and shares | 90 | FAQ 6 answer, "capital gains tax on stocks and shares runs on one set of rules" (verbatim). Re-placed at QA round 1: the earlier verbatim sat in the ISA H2, which became singular ("a stocks and shares ISA") for readability and broke the string. |
| when do you pay capital gains tax on shares | 90 | H2 "When do you pay capital gains tax on shares, and how do you report it?" + FAQ 3 (verbatim) |
| capital gains tax uk stocks | 70 | body: "capital gains tax on UK stocks works in exactly the same way" (natural variant) |
| capital gains tax on shares (brief head) | family 2,900 | title, h1, metaTitle, metaDescription, opening paragraph |

Brief head-family also placed: **cgt on shares** (closing paragraph, verbatim; it previously sat
in the recap bullets that QA cut, and was re-placed there in the same edit), **capital gains
from shares** (opening paragraph, verbatim).

### Declined (7 keywords + 3 head variants)

| Keyword | Vol | Reason |
|---|---|---|
| sharesave capital gains tax calculator | 50 | **Declined at QA round 1, previously placed verbatim.** EDITORIAL_batch2 BLOCKER 3.3 ruled the carrying clause ("larger than most people expect when they reach for a sharesave capital gains tax calculator") a query string bolted onto a good sentence, and noted it implies a Sharesave-specific tool we do not have. Clause deleted. The intent is still fully served: FAQ 9 answers the Sharesave/SAYE question, including the discounted-option-price base cost and the 90-day ISA transfer window, and the general calculator is linked twice elsewhere. Editorial blocker outranks a 50-volume placement. |
| tax on capital gains stocks | 320 | ungrammatical word-order scramble of "capital gains tax on stocks", which is placed verbatim in a FAQ heading and body; forcing the scramble reads as stuffing and the head phrase matches the same intent |
| stock capital gain tax | 320 | same stem, singular/scrambled; no natural English sentence carries it |
| capital gain tax for stocks | 320 | same stem, scrambled ("capital gain tax" is not a phrase we write); covered by the placed head |
| capital gain tax stock | 320 | same stem, scrambled and singular; covered by the placed head |
| capital gain tax uk stocks | 70 | scramble of the placed "capital gains tax on UK stocks" |
| capital gains tax stocks uk | 70 | scramble of the same; trailing "uk" is a SERP artefact, not written English |
| capital gain tax stocks uk | 70 | scramble of the same |
| capital gains tax shares (head variant) | family | scramble of "capital gains tax on shares", placed verbatim throughout |
| cgt and shares (head variant) | family | scramble; "CGT on shares" placed instead |
| capital gains tax and shares (head variant) | family | scramble; head phrase placed verbatim |

The five 320-volume rows above are DataForSEO close-variant expansions of a single stem. The
volumes are not additive to "capital gains tax on stocks" and matching the head phrase serves
all of them.

## Figures omitted as unverifiable against house_positions §5

| Figure | Why omitted |
|---|---|
| 10% / 20% pre-30-October-2024 rates for shares and other assets | house_positions §5 states only that non-residential gains were "aligned to the same 18%/24% rates from 30 October 2024"; it does not lock the prior figures. The page states the alignment and says "if a source still shows a lower rate for shares, it predates that change" without quoting a number. |
| £50,000 total-proceeds Self Assessment CGT reporting threshold | Not in house_positions §5 and no precedent anywhere in the Property corpus (the only £50,000 figures in the estate are the MTD qualifying-income threshold and the corporation tax small profits lower limit). **Re-examined at QA round 1** after FACTUAL ADVISORY 3 asked for it; still not stated as a figure, but FAQ 7 now names the existence and shape of the proceeds-based test. See the open item above. |
| SEIS 50% reinvestment-exemption percentage | Added to the page at QA round 1 as a mechanism ("a partial exemption on a gain reinvested in qualifying SEIS shares rather than a postponement") without the 50% figure. The QA reviewer supplied the percentage, but house_positions is silent on SEIS and the QA track is not ground truth, so the number is not asserted. The finding it was raised to fix, SEIS being mislabelled as a deferral relief, is fully closed by the mechanism sentence. |
| Dividend allowance and dividend rates | Not needed for the page; FAQ 12 states dividends are income not capital gains and explains the band interaction without quoting a rate or allowance. |
| ISA annual subscription limit | Referenced in FAQ 9 as "your annual ISA subscription limit" without a figure; the 90-day Sharesave-into-ISA window is a scheme rule, not an HMRC £ figure. |
| Pension minimum access age | FAQ 5 says "the minimum pension age" without a number; the age is on a legislated increase path and no house lock covers it. |

## Cannibalisation guards honoured

- 30-day rule: explained in three lines inside the matching waterfall with a one-line worked
  variant, then handed to `/blog/capital-gains-tax/bed-and-breakfasting`. No s.106A depth here.
- AEA: mechanics of sharing it across asset classes only (the property angle nobody else has);
  the trust position, PRR ordering and carry-forward detail stay on the AEA page.
- Property CGT: the comparison table plus reporting contrast only; the property computation
  itself is handed to the complete guide.
- Calculator: the page never reproduces the calculator's output tables; it links twice.
- BADR and EIS: one honest paragraph each, both forward-linked as the brief instructs.
- Employee shares / SAYE: one FAQ only (FAQ 9), not a body section.

## House-position flags raised

None at write time and none at QA round 1. No conflict found between the brief's facts and
house_positions §5 or §17, and the two QA reports confirmed the same independently (FACTUAL §3
"What was tested and passed" clears the 18%/24% alignment date, the AEA chain, the trustee rate,
the matching waterfall, BADR, the five-year s.10A test and the whole §5 do-not-write list).
Nothing added to `docs/property/track1_site_wide_flags.md`. The one ground-truth gap found is
the missing £50,000 CGT reporting threshold in house_positions §5, recorded as an open item
above rather than as a §14 flag, because it is a gap in our own doc rather than a competitor
conflict or an unverified proprietary figure.

## Not done

Not committed, not deployed, not indexed (deploy is owner-triggered).
