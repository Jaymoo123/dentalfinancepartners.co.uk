# PACK N2: net-new — is gym membership tax deductible?

Derived 2026-08-25 from FROZEN dossier `../personal_care_fitness_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **four-verdict-led**, four one-sentence rulings before any
prose). Ground truth: house_positions.md **§20.3**, plus **§4** (employer NIC and Class 1A rate),
**§9** and **§9.A** (P11D, trivial benefits, employer cost), **§16** logic (duality of purpose),
**§3** (company treatment), **§2** (sole trader). Cite those sections in the writer's report,
never on the page.

## 1. Target and permission level

- NET-NEW page. Category call: this is an employer/BIK question as much as a fitness one, so
  `Sole Trader and Self Employment` is the wrong home if a benefits or limited-company category
  exists; writer places it beside `p11d-benefits-in-kind-explained.md`. Proposed slug:
  `is-gym-membership-tax-deductible-uk` (writer may refine; resolver conventions, no invented
  slugs).
- Grade NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- **C1 gate: none blocking.** Niche-map row 61 is C1 CLEAR and unregulated, and row 61 does not
  appear in `C2_PLACEMENT.md` §8's carried-forward gate list. **Recorded:** C2 carries a CAUTION
  flag on row 61's contamination column (dossier §scope, contamination 0.24). That is a placement
  signal, not a copy fence, and imposes no wording restriction here.
- **GT gate: house §20.3 is authored (DRAFT 2026-08-25).** No open question in §20 touches this
  page.

## 2. Equity register

None (net-new). **Cannibalisation control, binding (dossier §3 and §6):**
`generalist/web/content/blog/p11d-benefits-in-kind-explained.md` mentions gym membership twice,
both inside the same FAQ answer about wellbeing perks, which correctly states that an
employer-paid gym membership is a reportable benefit unless a trivial-benefit or statutory
exemption applies. **Differentiate, never collapse:** the P11D page keeps generic benefit-in-kind
mechanics and its existing FAQ answer untouched; N2 owns gym specifics (OpRA, s.261, sole trader,
company) and the two cross-link. N2 must not restate P11D filing mechanics at length.

## 3. Market keyword slice (ledger, N2 gym membership tax, 940/mo raw, 570 peer-winnable)

Updated 2026-08-25 from the D1 harvest. "Best peer" is now the best of pulse and accotax.

| Keyword | Vol/mo | Best peer |
|---|---|---|
| salary sacrifice gym membership | 170 | pulse service page pos 6 |
| is a gym membership tax deductible | 110 | **accotax blog pos 20** (pulse 22) |
| is gym membership tax deductible | 110 | **accotax blog pos 18** (pulse 30) |
| can a gym membership be a business expense | 90 | **accotax blog pos 6** (pulse 31) |
| can gym membership be a business expense | 90 | **accotax blog pos 10** (pulse 29) |
| can you put gym membership through business | 70 | pulse blog pos 10 (accotax 23) |
| gym membership benefit | 50 | pulse blog pos 3 |
| gym membership for employees | 50 | pulse blog pos 9 |
| gym salary sacrifice | 50 | pulse service page pos 6 |
| can i put gym membership through my limited company | 50 | **accotax blog pos 19** (pulse 20) |

The cluster's biggest real prize by a distance, and the only topic in the cluster with two
confirmed ranking domains. It is **not** a one-competitor slice: accotax beats pulse on 5 of the
6 phrasings they share, and its pos 6 and pos 10 are what lift peer-winnable from 390 to 570.
The two "business expense" phrasings are now the hardest, not the softest, targets.

## 4. Competitor teardown (fetched 2026-08-25)

**NOT YET TORN DOWN, do before drafting (D1, 2026-08-25):**
`accotax.co.uk/is-a-gym-membership-tax-deductible-for-business-in-the-uk/` — the second ranker,
found by the D1 harvest after this pack was written. Free fetch, no paid call needed. It holds
pos 6 on `can a gym membership be a business expense` (90/mo), so its answer shape and its
Class 1A figure both need checking before the draft claims the field is stale.

**`pulse-accountants.co.uk/blog/gym-membership-benefit-in-kind`** — the incumbent, ~4,200-4,400
words, **21 H2s of which 17 are questions**, published 31 July 2025.

- Does well: question-H2 density; every section opens "Yes," or "No," with the classification
  first; covers OpRA by name ("taxed on the higher of the salary given up or the benefit's cash
  value"); covers the on-premises exemption conditions in plain words; covers directors, family
  members, reimbursement, and non-reporting consequences.
- **Fatal gap we take: it states Class 1A NIC at 13.8% and builds its worked figures on it**
  (£500 x 13.8% = £69, alongside a £600 membership example and a "£500 benefit costs the basic
  rate employee about £120" line). The rate has been **15% since 6 April 2025**. Its entire cost
  arithmetic is wrong.
- Other gaps: **no statutory reference anywhere** (no ITEPA 2003 ss.69A/69B, no s.261); **no sole
  trader treatment at all**, which is half the query intent behind "can a gym membership be a
  business expense"; no trivial-benefits interaction; no recomputable current-year example; the
  last two H2s are pure sell; em-dashes throughout.

**`pulse-accountants.co.uk/services/salary-sacrifice/gym-membership`** — pos 6 on 220/mo of
combined salary-sacrifice demand, ~2,100 words, service page. **Presents gym salary sacrifice as a
tax saving** ("the primary advantage for employees is the reduction in National Insurance
contributions and tax payments") and **makes no reference to the OpRA rules at all**. Its only
figures are firm statistics (215 years combined experience, 14 staff, 1,580 clients). This is the
top-ranking answer to the highest-volume single keyword in the cluster and it is wrong.

Our own corpus already carries the correct generic position (`allowable-expenses-sole-trader-
checklist.md`: "A gym membership is not allowable unless you can demonstrate a specific business
need (rare)"), which N2 expands rather than contradicts.

## 5. Whitespace

- **The OpRA correction, done properly and in public.** Employer-paid membership of a public gym is
  a taxable benefit in kind, reportable on the P11D with Class 1A NIC at the employer rate; running
  it through **salary sacrifice does not help**, because the optional remuneration arrangements
  rules (**ITEPA 2003 ss.69A/69B, from 6 April 2017**) tax the **higher of** the salary given up
  and the benefit value. The pos-6 page for this exact query says the opposite. Nobody in the
  sample states the statute.
- **The exemption that does work, correctly bounded: ITEPA 2003 s.261**, in-house sporting or
  recreational facilities. Available to employees generally, **not available to the public**, used
  mainly by employment-related users, not on domestic premises. The compliant case is an on-site
  gym, not a paid-for club membership. Pulse describes the conditions without naming the section.
- **The sole trader answer, absent from the entire sample.** Own gym or fitness spend is
  **generally disallowed** on duality of purpose: personal fitness serves the person, not only the
  trade. Narrow exceptions tied to a specific requirement of the trade exist and are rare and
  fact-specific.
- **The limited company answer as a non-trick:** the company paying a director's membership creates
  the same benefit in kind. It is a way of paying for it, not a deduction technique.
- **Correct current arithmetic:** Class 1A at **15%**, so a £600 membership costs the employer
  £90 in Class 1A on top, and the employee is taxed on £600 at their marginal rate. One
  recomputable 2026/27 example does what no ranking page does.
- The **trivial-benefits boundary** (£50 per benefit cliff edge, £300 annual cap for a close-company
  director, never contractual, never under salary sacrifice) as the honest answer to "is there any
  small way to do this", stated as a limit rather than a workaround.

## 6. Fences (binding)

- **Class 1A NIC is 15%, date-tagged from 6 April 2025.** Never 13.8%. Never reproduce pulse's £69.
- **Salary sacrifice is never presented as saving tax on a gym membership.** Every mention of
  salary sacrifice on this page is paired in the same breath with the OpRA higher-of rule. This is
  the page's hardest fence.
- **s.261 is reserved for genuinely in-house facilities** and all four conditions are stated
  together. Never imply a subsidised commercial gym membership qualifies.
- **Do NOT promise deductibility of personal fitness spend for a sole trader.** State the general
  disallowance, hedge the narrow exceptions hard, give no worked route to a claim.
- The page **describes** the treatment of each route; it never recommends a structure to obtain a
  benefit, and it does not tell a reader how to make a non-deductible cost deductible.
- The correction of the market position is written impersonally ("salary sacrifice is often
  described as a saving here; the optional remuneration rules mean it is not"). **No competitor is
  named, quoted or linked.**
- No P11D filing-mechanics depth (deadlines, forms, payrolling): one sentence plus link to the
  existing P11D page.
- Personal trainers as a trade are E1's ground: no PT status or PT expenses depth here, one
  sentence plus link.
- No em-dashes. **No house-position section numbers in copy.** Statutory references are
  reader-facing and required.

## 7. Acceptance criteria (deterministic)

1. All ten §3 keywords answerable from an H2, the H1 or an FAQ entry, in the reader's own phrasing:
   is gym membership tax deductible; can gym membership be a business expense; can you put gym
   membership through the business; can I put gym membership through my limited company; gym
   membership salary sacrifice; gym membership for employees; gym membership benefit in kind.
2. Four verdicts stated in the opening 40%, one sentence each: employee benefit, salary sacrifice,
   sole trader, limited company.
3. Figures present and recomputable: Class 1A at **15%** from **6 April 2025**; one 2026/27 worked
   example (e.g. Callum's company in Swansea paying £600 a year of membership for two staff:
   benefit value, Class 1A cost, employee tax at marginal rate, total employer cost); trivial
   benefits **£50** cliff edge and **£300** close-company director cap; any use of the £12,570 /
   £50,270 bands or Class 4 at 6% tagged as the 2025/26 rates still current when checked in
   August 2026.
4. Statutory references reader-facing and correct: **ITEPA 2003 ss.69A/69B** (OpRA, from 6 April
   2017) and **ITEPA 2003 s.261** (in-house facilities); ITEPA 2003 s.323A/s.323B if trivial
   benefits are covered.
5. Links: the P11D page (generic mechanics), E1 (personal trainers), the sole-trader allowable
   expenses checklist; resolver clean, zero invented slugs.
6. Zero em-dashes; zero house-position citations in body copy; every rate date-tagged.
7. Adversarial QA verifies every salary-sacrifice sentence carries the OpRA pairing, that 13.8%
   appears nowhere, and that the sole-trader section promises nothing.

## 8. Expectation

940/mo raw, **570 peer-winnable (revised up from 390 by the D1 harvest, 2026-08-25)**, against
**two** competitors, not one: pulse, deep and well-structured but factually stale on its central
number, plus a pos-6 pulse service page that is simply wrong, and accotax, a single blog URL that
outranks pulse on 5 of 6 shared phrasings and holds pos 6 on a 90/mo term. Realistic, revised
down accordingly: Google top-10 on two or three of the "can I put gym membership through"
phrasings within a quarter of indexing, and a credible run at `salary sacrifice gym membership`
because we can answer it correctly; Bing earlier. The two "business expense" phrasings are no
longer soft targets and should not be promised at 90d until accotax's page has been read. This is the cluster's highest-expectation page. Maturity caveat: net-new,
judge at 28d Bing / 90d Google. Failure trigger, written before the build: fewer than 50
impressions across the ten phrasings at 90d post-index. Standing risk: if the employer NIC and
Class 1A rate moves at a fiscal event, this page needs a dated figure back-patch, and the worked
example is built as one replaceable block for exactly that reason.
