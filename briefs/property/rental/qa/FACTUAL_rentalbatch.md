# FACTUAL QA (adversarial, instruction = REFUTE) — Property rental cluster batch

Run 2026-08-21. Reviewer: Opus adversarial factual track. No files edited.
Scope: E1 + E2 changed copy only (isolated via `git diff HEAD`), N1 full page.

## Verdicts

| slug | verdict |
|---|---|
| `rental-income-tax-uk-complete-guide-landlords` (E1, EXTEND) | **must_fix** — 2 BLOCKER, 6 ADVISORY |
| `landlord-tax-deductions-uk-2026-complete-list` (E2, EXTEND) | **all_clear** — 0 BLOCKER, 3 ADVISORY |
| `national-insurance-on-rental-income` (N1, NET-NEW) | **must_fix** — 1 BLOCKER, 3 ADVISORY |

**ARITHMETIC: 49 figures re-derived, 48 confirmed, 1 unsupported** (N1-1). Every published
number on all three pages was recomputed from its inputs; no fabrication found.

**STATUTE/SOURCE: 23 primary-source fetches performed (22 productive), 12 of N1's 17
coverage-note checks independently re-verified, 10 `house_positions.md` sections
cross-checked** (§3, §4, §6, §7, §21.4, §24.1-24.2, §27.2, §27.3, §27.7, §34, §41).

**§34.2 ADJUDICATION: PAGE-RIGHT.** Evidence in the final section. That section also carries an
**out-of-scope escalation**: the page anchored to §34, `claim-home-office-deduction-landlords`,
is live and is built end to end on the s.94H route that does not exist for a property business.

---

## E1 — `rental-income-tax-uk-complete-guide-landlords` (EXTEND)

Changed copy reviewed: 3 new H2 sections, 2 new FAQs, 2 table source lines,
`metaDescription`, `summary`, `dateModified`, and the record-retention sentence rewrite.

### [BLOCKER] E1-1 — property allowance presented as stacking on top of actual expenses

Two places, and they contradict the page's own later section.

Body, new H2 "Do landlords pay tax on rent?":

> "**Some of it can be tax-free.** The first £1,000 of gross property income is covered by the property allowance, and if you have little or no other income the £12,570 personal allowance covers the next slice at 0%."

New FAQ "Do landlords pay tax on rent?":

> "The first £1,000 of gross property income is covered by the property allowance, and if the rent is your only income the £12,570 personal allowance covers the next slice at 0%. On £18,000 of rent with £6,000 of allowable costs, a basic-rate landlord pays £2,400..."

**Why.** `house_positions.md` §41 (ITTOIA 2005 Part 6A): partial relief is an election to
deduct £1,000 **INSTEAD of** actual expenses (ss.783BG-BH, s.783BK). Full relief (s.783BE)
only exists where relevant property income is £1,000 or less. In both quotes the £1,000 is
asserted unconditionally and then immediately sits alongside an £18,000 / £6,000 actual-
expenses example, which reads as £18,000 − £6,000 − £1,000. The FAQ compounds it by putting
both in the same answer. The page's own later H2 states it correctly ("Use the £1,000
property allowance where your real costs are lower"), so the page contradicts itself, and
the wrong version is the one that ships into FAQ schema.

**Drop-in fix** (body bullet):

> `<li><strong>Some of it can be tax-free.</strong> If your gross property income is £1,000 or less, the property allowance covers it and there is nothing to report. Above that you choose between the £1,000 allowance and your actual expenses, whichever is larger, and if you have little or no other income the £12,570 personal allowance covers the next slice at 0%.</li>`

**Drop-in fix** (FAQ answer, replace the first two sentences):

> "Yes. You pay Income Tax on rental profit at 0%, 20%, 40% or 45% for 2026/27, depending on where that profit sits once it is added to your other income. If your gross property income is £1,000 or less, the property allowance covers it entirely; above that you deduct either your actual expenses or the £1,000 allowance, not both. If the rent is your only income the £12,570 personal allowance covers the next slice at 0%. On £18,000 of rent with £6,000 of allowable costs, a basic-rate landlord pays £2,400 and a higher-rate landlord pays £4,800 on the same £12,000 of profit."

### [BLOCKER] E1-2 — Let Property Campaign penalty floors are from the wrong schedule

New H2 "How to avoid paying tax on rental income legally":

> "HMRC matches letting-agent, deposit-scheme and Land Registry data against tax returns, and disclosing before it contacts you can bring the penalty down to 0%, against roughly 15% or more once it has written to you, on top of the tax and interest."

**Why.** Undeclared rental income is a failure to notify, and `house_positions.md` §27.3
states plainly that "the Let Property Campaign route operates within the Sch 41 framework".
Under Sch 41 FA 2008 para 13 the prompted non-deliberate floor is **10%**, not 15%, and the
unprompted 0% floor is only available where the disclosure is made **within 12 months of
when the liability arose** — otherwise the floor is 10%. The 0%-unprompted / 15%-prompted
pair quoted is the **Sch 24 FA 2007 careless** matrix. §27.2's F-5 correction (logged
2026-05-24) exists specifically to stop sessions conflating these two schedules; this
sentence does it in the other direction. Both published percentages are wrong for the
regime the sentence names, and "0%" is stated without the qualifier that makes it true.

**Drop-in fix:**

> `<p>What does not work is leaving the income undeclared. HMRC matches letting-agent, deposit-scheme and Land Registry data against tax returns, and coming forward first is worth real money: an unprompted disclosure made within 12 months of the tax falling due can reduce the penalty to nil, and even outside that window an unprompted disclosure is penalised more lightly than one HMRC has had to ask for. Declaring rental income late is always cheaper than being found: if you are behind, our guide to the <a href="/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026">Let Property Campaign</a> explains the disclosure route.</p>`

### [ADVISORY] E1-3 — pipeline jargon leaked into two user-facing source lines

> `<p><em>Rates: house-verified against HMRC rates and thresholds, 2026/27.</em></p>`
> `<p><em>Rates: house-verified against HMRC guidance, applying from 6 April 2027.</em></p>`

**Why.** "house-verified" is internal build vocabulary and means nothing to a reader. It is
also inconsistent with the convention E2 and N1 both use in this same batch
("Source: ..., data to August 2026"). Second line is additionally imprecise: the 2027 rates
are enacted law (Finance Act 2026, Royal Assent 18 March 2026, per §7), not "HMRC guidance".

**Drop-in fix:**

> `<p><em>Source: HMRC rates and thresholds for 2026/27, gov.uk. Data to August 2026.</em></p>`
> `<p><em>Source: Finance Act 2026, applying from 6 April 2027. Data to August 2026.</em></p>`

### [ADVISORY] E1-4 — `summary` truncated mid-thought, with trailing whitespace

> `summary: "UK rental income is taxed on net profit at your marginal Income Tax rate (20%, 40% or 45% for 2026/27), with mortgage interest no longer deductible but instead relieved as a 20% basic-rate credit under Section 24. "`

**Why.** The diff deleted the second sentence and left a trailing space before the closing
quote. `summary` is rendered on the category listing page
(`Property/web/src/app/blog/section-24-and-tax-relief/page.tsx`, `line-clamp-3`), so this is
user-facing, and `frontmatter_lint.py` has no length rule that required the cut (I ran it:
764 files valid, so nothing forced this). No factual harm, but the deletion is unexplained
and the trailing space is a defect.

**Drop-in fix:** restore the original second sentence, or at minimum strip the trailing
space and end the field cleanly at "...under Section 24."

### [ADVISORY] E1-5 — Form 17 framed as creating the income split

> "It has to reflect genuine beneficial ownership, and married couples are taxed 50:50 by default until a Form 17 declaration says otherwise."

**Why.** `house_positions.md` §24.2 names this as "the most common confusion": Form 17 is
the disclosure of an existing unequal beneficial interest, it does not create one, and a
declaration that does not match the underlying ownership is invalid. §24.2 also carries the
joint-tenancy bar (joint tenants cannot use Form 17 at all without severing to tenants in
common). The preceding clause partly covers this but the sentence as written still reads as
"file the form, change the split". §24.1 also limits the 50/50 rule to spouses/civil
partners in **joint legal ownership**.

**Drop-in fix:**

> "It has to reflect genuine beneficial ownership: spouses in joint names are taxed 50:50 by default, and a Form 17 declaration tells HMRC about an unequal beneficial split that a deed has already created, rather than creating one itself."

### [ADVISORY] E1-6 — "a low-cost room let" collides with the rent-a-room block

> "On a parking space or a low-cost room let, deducting the flat £1,000 beats deducting actual expenses."

**Why.** §41 records the Stage 2 catch: ITTOIA s.783BM is the explicit Part 6A exclusion
gate blocking property-allowance relief on income **within the rent-a-room regime**. A "room
let" sitting three bullets away from the page's own Rent-a-Room bullet invites exactly the
stacking §41 forbids.

**Drop-in fix:** change the example to "On a parking space or a lock-up garage, deducting the
flat £1,000 beats deducting actual expenses."

### [ADVISORY] E1-7 — review metadata not refreshed alongside substantive tax content

`dateModified` moved to 2026-08-21 but `reviewedAt: "2026-06-02"` and
`reviewerCredentials: "Reviewed against legislation.gov.uk and HMRC guidance"` were left
untouched, while three new H2 sections of tax content and two new FAQs were added. The page
now asserts a review date that predates most of its substantive claims.

### [ADVISORY] E1-8 — E1 must not deploy without N1

E1's new internal link `/blog/landlord-tax-essentials/national-insurance-on-rental-income`
resolves on disk (verified, and the category segment matches N1's own canonical), but N1 is
untracked. Shipping E1 alone is a 404 on a link placed in the page's opening section.

**Cross-page checks that PASSED for E1:** the new NI sentence ("Rental income does not count
as earned income: it is property income, which is why no National Insurance is due on it")
agrees with N1's Class 1 / Class 2 / Class 4 analysis and with N1's three carve-outs, since
E1's claim is scoped to the rental income itself. The record-retention rewrite is a genuine
**fix**: "at least five years after the 31 January following the tax year" now matches §27.7
exactly (the removed "five years and ten months after the relevant 31 January filing
deadline" was wrong). `metaTitle` 57 / `metaDescription` 148, both inside the CI 60/155
limits. Zero em-dashes, zero pipeline artefacts.

---

## E2 — `landlord-tax-deductions-uk-2026-complete-list` (EXTEND)

Changed copy reviewed: 6 new H2 sections, the 10-row repairs table, 2 source lines,
`metaDescription`, `dateModified`, and the deleted `metaDescription_prev`.

### [ADVISORY] E2-1 — "Cars sit outside that treatment either way" over-generalises

> "A van bought for the property business is not a running cost. Under the cash basis you deduct the payment in the year you make it; on traditional accounting you claim capital allowances instead. **Cars sit outside that treatment either way**, so a car is claimed through mileage at 55p or through apportioned actual running costs."

**Why.** True on the cash-basis limb (cars are excluded from the cash-basis capital
deduction). Not true on the traditional-accounting limb: an ordinary UK property business is
a qualifying activity for plant and machinery allowances (CAA 2001 s.15; the s.35
dwelling-house restriction does not reach a car), so a landlord on the accruals basis who
does not use the mileage route can claim capital allowances on the car with a private-use
adjustment. As written the sentence quietly removes a legitimate claim. It understates
rather than overstates, which is why this is advisory not blocking.

**Drop-in fix:**

> "Cars are excluded from that cash-basis deduction, so a car is claimed either through mileage at 55p or, on traditional accounting, through capital allowances plus apportioned running costs. You cannot use both methods on the same vehicle, and lease payments on a car you also drive privately are apportioned to the business share."

### [ADVISORY] E2-2 — `metaDescription_prev` deleted, orphaning `metaTitle_prev`

The diff replaces `metaDescription` and **deletes** the `metaDescription_prev` line while
leaving `metaTitle_prev` in place. `scripts/meta_apply.py` (lines 206, 235-237) treats
`metaTitle_prev` / `metaDescription_prev` as the rollback path for meta changes. The
convention on a change is to overwrite `_prev` with the value being replaced, not to remove
it. The rollback record for this field is now gone and the two `_prev` keys are inconsistent.

**Drop-in fix:** restore the key with the value that was actually replaced:

> `metaDescription_prev: "Every allowable landlord expense for 2026/27: repairs, finance costs, RDI, travel at 55p/mile, plus the grey areas that trip landlords up."`

### [ADVISORY] E2-3 — "finance costs" listed as one of the nine allowable-expense categories

> "The allowable expenses for rental income fall into nine categories in 2026/27: property running costs, repairs, professional fees, advertising, **finance costs**, travel at 55p a mile, office and admin, replacement furniture, and bad debts."

**Why.** For an individual residential landlord finance costs are not an allowable expense at
all; they are a tax reducer (§4). The very next paragraph corrects it, and the framing
matches the page's own existing nine-row master table (row count verified: 9 rows, same nine
categories), so this is a presentation tension rather than an error. Worth one clause.

**Drop-in fix:** "...advertising, finance costs (relieved as a credit, not a deduction, for
individuals), travel at 55p a mile..."

**Everything else in E2 PASSED.** Specifically re-derived and confirmed:

- Section 24 staging 75% / 50% / 25% / 0% across 2017/18 to 2020/21 — correct.
- £7,200 interest → £1,440 at 20%; £2,880 at the old 40% relief; £1,440 annual cost — all correct, and consistent with §4 and with E1's Section 24 treatment. The "three-part cap described earlier" is genuinely described earlier (line 185-191) and matches §4's lower-of-three exactly.
- Arrangement, product-switch, remortgage, broker fees and ERCs as finance costs running through the reducer — correct.
- **10-row repairs table, all 10 rows checked against HMRC primary guidance and all 10 correct.** Single glazing → double glazing verified verbatim at PIM2030 ("alterations due to advancements in technology are generally treated as an allowable repair rather than an improvement... For example, when single glazing is replaced with double glazing"); the modern-materials principle verified at PIM2030 ("the cost normally remains revenue expenditure where any improvement arises only because the customer uses new materials that are broadly equivalent to the old materials"); carpets / curtains / washing machine → RDI verified at PIM3210 ("Furnishings (curtains, rugs, carpets etc)", "Household appliances (fridges, freezers, washing machines etc)"); baths and washbasins as fixtures rather than domestic items verified at PIM3210, which is what makes the "worn bathroom suite" row a repair; the net-off-proceeds mechanic verified at PIM3210. Repointing, roof repair, like-for-like flooring, boiler replacement, second bathroom, first-time central heating, loft conversion — all consistent with the repairs/capital boundary.
- Cash basis: £150,000 receipts limit, default since 2017/18, companies / LLPs / trustees excluded, payment date governs — all correct.
- The March 2026 leak paid May 2026 → 2026/27 example — tax years correct.
- Pre-letting seven-year rule — correct.
- Ground rent £300 → £60 at basic rate, £120 at higher rate — correct. Sublet rent as a running cost, and gross-rent-not-net-of-agent-fee — both correct.
- Property allowance section: £1,000 or less = full relief with nothing to report; election is instead-of not as-well-as; per person not per property; £4,000 rent / £600 expenses → £3,000 vs £3,400, saving £400 of profit and £80 of tax; mutually exclusive with the s.24 reducer **including** the narrow nil-reducer exception — matches §41 line for line. (E2 gets this right where E1 gets it wrong; see E1-1.)
- Wear and tear allowance ended 2016 — correct.
- `metaTitle` 58 / `metaDescription` 150, inside the CI limits. Zero em-dashes, zero pipeline artefacts. Both new source lines carry the "data to August 2026" convention.

---

## N1 — `national-insurance-on-rental-income` (NET-NEW, full page)

### [BLOCKER] N1-1 — "Scotland and Wales set their own rates" is the §7 do-not-write, twice

Body, "Will landlords be charged National Insurance in future?":

> "One line on devolution, because it comes up: National Insurance is set UK-wide. The classes, rates and thresholds are identical in England, Scotland, Wales and Northern Ireland. **Income tax on rental profit is not, because Scotland and Wales set their own rates.**"

FAQ 12:

> "...the same £18.40 a week voluntary Class 3 rate. **Income tax on rental profit is a different matter, because Scotland and Wales set their own rates on property income.**"

**Why.** `house_positions.md` §7 carries this as an explicit do-not-write: *"'the 2027 rates
apply to England and NI only' or 'Scotland and Wales set their own property rates' for
2027/28 (WRONG on Wales: only Scotland is carved out for 2027/28; the Welsh/Scottish
self-setting power is a future s.8/Sch 2 power not yet in force)."* I re-verified against the
HM Treasury / HMRC policy paper the page itself relies on: *"These rates apply to England,
Wales, and Northern Ireland. The government will engage with Scotland and Wales regarding
their ability to set devolved property income tax rates under their fiscal frameworks."* The
body sentence sits immediately after the paragraph announcing the 22% / 42% / 47% rates, so a
reader takes it as "Wales sets its own property rates", which is exactly the banned framing.

This also produces a **cross-page contradiction**: E1 states the position correctly ("These
rates apply to property income in England, Wales and Northern Ireland; Scotland sets its own
rates on non-savings income"), and N1 links to E1 in its closing section. Two pages in the
same batch, opposite answers, E1 right.

**Drop-in fix** (body):

> `<p>One line on devolution, because it comes up: National Insurance is set UK-wide. The classes, rates and thresholds are identical in England, Scotland, Wales and Northern Ireland. Income tax on rental profit is not, because Scotland sets its own rates on non-savings income. The 2027 property rates apply in England, Wales and Northern Ireland; only Scotland is carved out.</p>`

**Drop-in fix** (FAQ 12, final sentence):

> "Income tax on rental profit is a different matter, because Scotland sets its own rates on non-savings income, so a Scottish landlord uses the Holyrood rates rather than the UK ones."

### [ADVISORY] N1-2 — "before her 69th birthday" assumes a State Pension age the page never states

> "She pays £956.80 and gets it back before her 69th birthday, then keeps the £358 a year for life."

**Why.** The break-even is 2.67 years of pension (£956.80 / £358.50), which lands before 69
only if Priya's State Pension age is 66. State Pension age rises from 66 to 67 for those born
on or after 6 April 1960, phased between 2026 and 2028, so a reader buying a voluntary year
now is very likely on 67 and breaks even at about 69 years 8 months. Priya's age is never
given on the page, so the claim has no stated basis. This is the one figure in the batch I
could not confirm.

**Drop-in fix:**

> "She pays £956.80 and gets it back within three years of reaching State Pension age, then keeps the £358 a year for life."

### [ADVISORY] N1-3 — the early-retirement worked figures are looser than the page's tone implies

> "Give up employment at 45 and live on £40,000 a year of rent, and you reach State Pension age with a record that stopped growing 20 years earlier... Twenty missing years is the difference between the full £241.30 and about £103 a week."

**Why.** 45 to State Pension age is 21 or 22 years, not 20, and the £103 figure additionally
assumes the reader had banked exactly 15 qualifying years by 45. The arithmetic checks out on
its own inputs (15/35 × £241.30 = £103.41) but the framing presents an assumption as a
consequence. Low risk, worth one clause.

**Drop-in fix:** "...with a record that stopped growing two decades earlier. If that leaves
you 20 years short, the gap is the difference between the full £241.30 and about £103 a week."

### [ADVISORY] N1-4 — Priya and Marcus are different people on two pages that link to each other

E1's new worked example uses **Priya** (34, salary £32,000, basic rate) and **Marcus** (52,
salary £60,000, higher rate). N1 uses **Marcus** (guest house, £78,000 turnover) and
**Priya** (buying a missing qualifying year). E1 links to N1 in its opening section and N1
links back to E1 in its closing section. Same names, different facts, one click apart.
Rename one pair.

### N1 checks that PASSED

**Class 2 abolition mechanics (priority check).** Verified verbatim at NIM70650 (last updated
22 July 2026): *"From 6 April 2024 the Class 2 Lower Profits Threshold was removed which
means that liability to pay Class 2 NICs no longer exists from tax year 2024 to 2025
onwards"* and *"A self-employed earner with profits equal to or above the SPT is treated as
having actually paid Class 2 NICs."* The page's rendering of this is accurate in both the
body and FAQ 5, including the "treated as having paid without handing over any money" gloss.
Small Profits Threshold **£7,105** for 2026/27 confirmed at gov.uk self-employed NI rates.
Voluntary Class 2 **£3.65/week** confirmed at both gov.uk self-employed rates and gov.uk
voluntary rates. Class 3 **£18.40/week** confirmed at gov.uk voluntary rates.

**The NIM74250-vs-NIM70650 staleness call (priority check): the page's departure is CORRECT
and correctly handled.** NIM74250, itself last updated 22 July 2026, still describes Tier 3
individuals as liable to pay Class 2 NICs under s.11(2) SSCBA 1992. NIM70650, updated the
same day, states that the liability no longer exists from 2024-25. The two manual pages
genuinely conflict and NIM74250 is the stale one. The page's handling — state the tier
framework as HMRC writes it, then tell the reader to read "liable to pay Class 2" as
shorthand for being inside the self-employed regime, with the 2026/27 effect being a free
qualifying year at or above £7,105 plus a Class 4 bill — is the right call, is stated
transparently rather than silently, and does not misquote either source. **No change needed.**

**The three-tier framework (priority check).** Verified against NIM74250. The decisive
sentence is verbatim: *"The nature of property letting requires some activity to maintain the
investment, but that is not enough to make it gainful employment for self-employed NICs
purposes."* All three tiers correct, including the load-bearing Tier 1 point that an ordinary
landlord is **neither liable nor entitled** to pay Class 2 (Class 3 remains open, which the
page also says). All six named examples confirmed at the correct tiers: Samantha (inherited
let, T1), Claire (several properties, about half her working time, T1), Hasan (buy-to-lets
with a managing agent, T1), Bob (ten student properties, full time, expanding, T2), Amy (bed
and breakfast, T3), Nadiya (hotel, T3). The s.11(6) SSCBA 1992 attribution for Tier 2
voluntary entitlement is correct.

**The HM Treasury Budget 2025 policy-paper quote (priority check): the page quotes it
accurately.** Verified verbatim at the gov.uk policy paper "Income Tax: changes to tax rates
for property, savings and dividend income": *"Those with property, savings or dividend income
pay less tax than those whose income comes from employment or self-employment as they do not
pay National Insurance."* The page reproduces the quoted fragment exactly and attributes the
policy conclusion correctly (a 2pp property rate rise chosen instead of extending NI). Rates
22% / 42% / 47% from 6 April 2027 confirmed on the same page. Only the devolution sentence
that follows is wrong — see N1-1.

**State Pension qualifying-year mechanics (priority check).** Full new State Pension
**£241.30 a week** and **35 qualifying years** where the record started after April 2016,
both confirmed at gov.uk. **10 qualifying years** minimum for any new State Pension confirmed
at gov.uk, along with the three routes to a qualifying year (contributions, credits,
voluntary contributions) — which is what makes the page's central claim, that rental profit
does none of the three, sound. £241.30 / 35 = £6.8943 → "roughly £6.89"; × 52 = £358.50 →
"about £358". Both correct.

**Employer and employee NI figures.** All confirmed at gov.uk "Rates and thresholds for
employers 2026 to 2027": LEL £129/wk and £6,708/yr, Primary Threshold £242/wk and
£12,570/yr, Secondary Threshold £96/wk and £5,000/yr, UEL £967/wk, employee 8% then 2%,
employer secondary 15%, Employment Allowance £10,500. PAYE registration at £96 or more a week
confirmed at gov.uk. Employment Allowance exclusions confirmed at gov.uk eligibility: the
single-director bar (*"If your company has only one director, they must not be the only
employee liable for secondary Class 1 National Insurance"*) and the domestic-work exclusion
(*"Someone you employ for personal, household or domestic work (like a nanny or gardener)"*).
Class 4 at 6% between £12,570 and £50,270 and 2% above confirmed.

**Salary-vs-dividend framing** matches `house_positions.md` §21.4 exactly: salary at the
£5,000 secondary threshold for a single-director SPV where Employment Allowance is not
available, dividends carrying no NI, EA sole-director bar stated. The page's addition — that
a salary at the £6,708 LEL buys a qualifying year for about £256 of employer NI
(15% × £1,708 = £256.20) — is arithmetically right and does not contradict §21.4.

**FHL.** Cessation for tax years beginning on or after 6 April 2025 and the removal of the
income from relevant UK earnings for maximum pension relief both confirmed verbatim at
PIM4165. The £2,880 net / £3,600 gross no-earnings contribution limit is correct. §6 alignment
confirmed.

**Full £35,000-three-ways table re-derived, all nine figures correct:** £35,000 − £12,570 =
£22,430; income tax 20% × £22,430 = £4,486 in all three columns; employee Class 1 8% ×
£22,430 = £1,794.40; Class 4 6% × £22,430 = £1,345.80; employee total £6,280.40; sole trader
total £5,831.80; landlord total £4,486; employer NI 15% × £30,000 = £4,500; qualifying-year
column correct in all three (the sole trader clears the £7,105 SPT so is treated as having
paid). The 2027 follow-on is also right: 22% × £22,430 = £4,934.60, which is £448.60 more
than £4,486. Marcus's guest house: £78,000 − £43,000 = £35,000, Class 4 £1,345.80, Class 2
£0 treated as paid. Priya's table: £18.40 × 52 = £956.80; £3.65 × 52 = £189.80; £956.80 /
£358.50 = 2.67 years; £189.80 / £358.50 = 0.53 years. 15/35 × £241.30 = £103.41. Property
manager: 15% × £14,000 = £2,100.

**Links.** All 9 internal `/blog/<category>/<slug>` links resolve on disk and every category
segment matches the target file's own canonical (verified programmatically). All 4 external
links are gov.uk, all carry `rel="nofollow noopener" target="_blank"`, and all 4 URLs
returned live content when I fetched them.

**Meta and hygiene.** `metaTitle` 54, `metaDescription` 154, both inside the CI 60/155 limits.
`frontmatter_lint.py --check --site property` run and passed: 764 files valid. Zero em-dashes.
Zero pipeline artefacts.

---

## §34.2 ADJUDICATION

**VERDICT: PAGE-RIGHT.** `landlord-tax-deductions-uk-2026-complete-list` is correct that a UK
property business cannot use the s.94H fixed-rate use-of-home deduction.
`house_positions.md` §34 is wrong and needs a correction.

The page's disputed text (pre-existing, not part of this diff, in "The Home-Office Deduction"
and its FAQ):

> "a property business cannot use the simplified flat-rate amounts (the £10, £18 and £26 monthly bands). Those sit in ITTOIA 2005 s.94H, a trading-income relief, and the property cash-basis rules in s.272ZA apply only the vehicle flat rates, not the use-of-home one. HMRC's landlord guidance (PIM2100) is to apportion actual costs."

The house-file text it conflicts with:

> §34 statutory hooks: "**s.94H (simplified expenses, imported)**"
> §34.2: "(a) **ITTOIA s.94H simplified flat-rate** (hours-based, no exclusive-use requirement, no CGT downside)"

**Evidence, four independent primary-source checks:**

1. **s.94H is scoped to a trade on its own face.** Fetched
   `legislation.gov.uk/ukpga/2005/5/section/94H`. Heading "Use of home for business
   purposes", sitting in **Part 2** (trading income), Chapter 5A. Opening subsection
   verbatim: *"This section applies if, in calculating the profits of **a trade** of a person
   for a period, a deduction ('the standard deduction') would otherwise be allowable..."*
   Part 3 property-business profits are outside its own words, so it reaches a property
   business only if Part 3 imports it.

2. **s.272 (GAAP basis) does not import it.** Fetched
   `legislation.gov.uk/ukpga/2005/5/section/272`. The Chapter 5A rows of the s.272 table are
   s.94C (the corporate-partner exclusion) and **"sections 94D to 94G — expenditure on
   vehicles"**. s.94H does not appear anywhere in the section.

3. **s.272ZA (cash basis) does not import it either.** Fetched
   `legislation.gov.uk/ukpga/2005/5/section/272ZA`. Chapter 5A rows are identical: s.94C and
   **"sections 94D to 94G: expenditure on vehicles"**. Nothing beyond 94G. I re-fetched both
   sections a second time through
   `legislation.gov.uk/ukpga/2005/5/part/3/chapter/3` and got the same answer, and a third
   time against the 2016-04-06 point-in-time version of s.272 — s.94H is absent in every
   rendering. So the vehicle flat rates (55p / 25p) **are** available to landlords, which is
   what makes the omission of 94H deliberate rather than a drafting gap.

4. **HMRC's own guidance splits the same way.** The gov.uk simplified-expenses page scopes
   the scheme to *"Sole traders"* and *"business partnerships that have no companies as
   partners"* and never mentions landlords or property businesses. HMRC's use-of-home
   chapter for traders (BIM47825) states its own scope as *"what expenses are allowable when
   a self-employed individual **carrying on a trade** uses part of their home for trade
   purposes"*. The landlord-specific page, **PIM2100 "Deductions: main types of expense:
   expenses for own home"**, gives only actual-cost apportionment: *"Where a landlord
   genuinely runs the property business from home they may claim the extra business costs
   that they incur - such as the cost of extra lighting and heating."* No flat rate is
   offered to landlords anywhere in PIM.

**Consequence for the house file (do not action without owner sign-off; I have edited
nothing).** §34's statutory hook line "s.94H (simplified expenses, imported)" is factually
wrong, and §34.2's two-route decision tree collapses to one route: a property business
apportions actual costs under the imported s.34 wholly-and-exclusively test, and there is no
flat-rate escape from the §34.3 cross-tax problem. That makes §34.3 **more** load-bearing,
not less: the CGT trap under TCGA 1992 s.224(1) is now unavoidable by route choice and can
only be managed by documented mixed use, which is exactly what the page already tells
readers. §34's do-not-write entry *"The simplified £10/month always wins"* should become
*"A property business can use the simplified flat rate for use of home"* (false — s.272 and
s.272ZA import only ss.94D-94G, vehicles). Note also that §34.4's Ltd Co mechanic references
"director's individual-side ITTOIA s.272/s.94H/s.34", which inherits the same error.

### Out-of-scope escalation found while adjudicating (reported, not actioned)

The page anchored to this lock, `Property/web/content/blog/claim-home-office-deduction-landlords.md`
(MW2 B5), **is committed and clean at `cdf893f2`, so it is live**, and it is built end to end
on the route that does not exist. 33 occurrences of s.94H / "flat rate" across the file,
including:

- `metaDescription`: *"UK landlords can claim a home-office deduction via ITTOIA s.94H flat-rate or s.34 actual-cost apportionment."*
- `summary`: *"There are two routes: the simplified flat-rate at s.94H (a monthly figure based on hours worked at home, £10 for 25 to 50 hours, £18 for 51 to 100 hours, £26 for 101 hours or more)"*
- FAQ 1: *"ITTOIA 2005 s.272 imports the trading-income deduction rules into the property-business profit calculation, **including the simplified-flat-rate home-office provision at s.94H**"* — this is the precise claim refuted above.
- A whole H2, *"How to Claim the Simplified Flat-Rate (ITTOIA 2005 s.94H)"*, plus a "which method should I use" FAQ, an hours-log FAQ, a records FAQ, an enquiry-risk FAQ and a year-by-year switching FAQ, all servicing a route a property business cannot take.

The consumer-harm limb is the CGT FAQ, which offers the flat rate as the **first** escape from
the s.224(1) PPR restriction: *"The avoidance routes are: use the simplified flat-rate (s.94H,
no exclusive-use requirement)..."*. A landlord who follows that advice claims a deduction they
are not entitled to **and** believes they have neutralised a CGT exposure they have not.

This is outside the rental-batch scope and I have changed nothing. Flagging it because it is
live, it is the page E2 links to, and it is the reason §34.2 reads the way it does. Suggested
sequence for the owner: correct §34 / §34.2 / §34.4 in `house_positions.md` first, then rewrite
`claim-home-office-deduction-landlords` against the corrected lock (the s.224(1) differentiator
survives intact and arguably gets stronger), then the E2 back-patch is already correct and needs
no change. Do not start with the blog page, or it will be rewritten against a wrong lock again.
