# PACK N5: net-new — Accountant for pilots and flight crew

Derived 2026-08-25 from FROZEN dossier `../specialist_professions_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **employment-status-fork-led**). Ground truth: house **§22.3**
(flight crew, flat rate expenses, repayment-agent fence), with §2 and §13 for contractor and
self-employed pilots. **C1 row 67 = CONDITIONAL: no rebate service, no assignment, no contingent fee;
safe form is informational plus accountancy leads for contractor and self-employed pilots.** The C1
fence is the gate and is recorded here in full. C2 §8 carries no separate row beyond the
24-CONDITIONAL line.

## 1. Target and permission level

- NET-NEW coverage page, single page, minimum shape (dossier §3: zero assigned keywords, built under
  the coverage-over-selection lock, volume is not a gate). Proposed slug:
  `accountant-for-pilots-and-flight-crew` (writer may refine; resolver conventions).
- Grade: NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- **No cluster, no hub, no sibling pages.** One page.

## 2. Equity register

None (net-new). No estate page addresses pilots or cabin crew.

## 3. Market keyword slice (ledger)

**Zero assigned keywords.** No pilot or aviation keyword in the 162-keyword universe carries measurable
volume. C3 recorded 10/mo for the head. This page is built for coverage, not demand.

**Instrument caveat, stated:** the two domains that do target pilots (arleys.co.uk, a gorillaaccounting
page) were **not harvested**, because the DataForSEO daily abort gate refused four planned harvests
(dossier §1 and delta D1). The zero here is a measured absence in what was harvested plus a free SERP
read, not a certainty. Free expansions (autocomplete, PAA) were never run for this family (delta D2).

## 4. Competitor teardown

**No specialist field exists and no page was fetched for teardown.** Dossier §1: the SERP for "pilot
accountant uk" is dominated by irrelevant results (a firm called "Co-Pilot", software reviews, job
boards). The only two targeted pages were blocked from harvest by the abort gate. Nothing is quoted,
imitated or characterised here.

What the SERP does contain, and what this page must not become, is **flight-crew tax rebate services**.
That is the field, and it is the exact shape C1 row 67 fences off.

## 5. Whitespace

- **The flat-rate expenses stated as facts with the self-claim route**, in a SERP where they are the
  hook for a rebate funnel. Anyone who states them plainly and then tells the reader how to claim them
  themselves from HMRC is doing something nobody else in the field is doing.
- **The status fork done honestly:** most pilots and cabin crew are PAYE employees and do not need an
  accountant at all; the ones who do are contractor and self-employed pilots (instructors, ferry
  pilots), and that is the only lead the page seeks.
- **A recomputable worked example** for a self-employed flying instructor at 2026/27 rates.

## 6. Fences (binding — this is the cluster's rebate-risk twin of N1)

- **Repayment-agent fence, hard (C1 row 67, house §22.3):** the page **describes** what is claimable
  and how to claim it directly from HMRC. We **never** process claims, take assignments or nominations,
  or charge contingent or percentage fees, and we **never link to a rebate firm**. No "claim your
  refund", no "average refund", no calculator promising a figure back, no urgency framing about
  backdated years.
- **The flat rate expenses are quoted exactly and date-tagged:** £1,022 a year for uniformed flight
  deck crew plus £110 for travel-related expenses; £720 a year for uniformed cabin crew. Both carry
  "from 2013/14, unchanged when checked August 2026". Both are **employed-crew flat rates**, which the
  copy says explicitly.
- **Do not cite the 2023 repayment-agent instrument by name or number.** House §22 open question 1
  records that the exact title and SI number are not pinned. Describe the rule, cite nothing.
- **No overnight or subsistence allowance extrapolation.** House §22 open question 2 records that no
  aviation equivalent of the £34.90-family approach was researched. Silence, not a guess.
- **Employed readers get an honest answer, not a sale.** If the honest answer is "you can do this
  yourself in twenty minutes on gov.uk", the page says so.
- No em-dashes. **No house-position section numbers in reader copy** (report only; trades leaked 71).
- Rate-date discipline per language spec §2 on bands, Class 4 and any IR35 content.

## 7. Acceptance criteria (deterministic)

1. Questions answerable: do pilots need an accountant; what expenses can flight crew claim; how do I
   claim flat rate expenses myself; do I need to file a tax return as a pilot; what if I fly as a
   contractor or instructor.
2. The page splits into PAYE crew and self-employed pilot in the opening 40% and stays split.
3. Figures, exact and date-tagged: £1,022 + £110 flight deck; £720 cabin crew; both tagged "from
   2013/14, unchanged when checked August 2026". Plus the 2026/27 bands and Class 4 with the August
   2026 check tag for the self-employed side.
4. One worked example: a self-employed flying instructor (unused persona name and unused city per
   language spec §4), profit computed to tax and NIC, re-derivable.
5. Minimum 10 FAQ pairs.
6. **Rebate grep, deterministic:** zero occurrences of refund, rebate, reclaim, tax back, "claim
   back", "average claim", "no win no fee", "we handle the claim". Adversarial QA fails the page on
   any hit. Zero outbound links to any rebate service.
7. Zero citation of any 2023 repayment-agent instrument by name or number.
8. Links: core self-assessment page, core IR35 page for contractor pilots. Resolver-clean, 0 invented
   slugs. §4 floors + coverage floor pass.

## 8. Expectation

**Zero assigned volume; this page is coverage, not a bet.** Under the coverage-over-selection lock it
ships anyway at minimum shape. Realistic outcome: long-tail impressions on flight-crew expense
phrasings and instructor phrasings within a quarter or two, no head-term expectation, low lead
expectation. Maturity caveat: net-new with no demand baseline, judge at 90d Google purely on whether
any impression at all appears. Failure trigger, written before the build: zero impressions of any kind
at 180d = the row was correctly graded zero-demand and no further pilot page is built. Delta note: if
D1 is ever unblocked and arleys/gorilla are harvested, re-read this page's sizing before extending it.
