# PACK N4: net-new — accountant for foster carers (qualifying care relief and the tax return)

Derived 2026-08-25 from the FROZEN dossier `../care_education_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **arithmetic-first**). Service and return page of the foster
pair (N4 service and return -> N5 year-tagged relief explainer).

## 1. Target and permission level

- NET-NEW page, sole-trader blog family. Proposed slug: `accountant-for-foster-carers-uk` (writer
  may refine; must resolve via `slug_resolver`).
- Grade: **NO-PAGE -> NET-NEW**, everything writable. Zero foster coverage anywhere in the estate.
- Revert path: delete pre-deploy. Post-deploy it enters `monitored_pages` as a new surface.
- Shape: service and self-assessment page, arithmetic before selling.
- C1 gate: **C2 row 27 CLEAR**, with the **standing benefits-claim-referral fence** (dossier §8).
  It is not in §8's carried-forward gate list. **Not blocked**, but see §6: the fence binds copy.

## 2. Equity register

None (net-new). Nothing frozen.

**Must NOT poach:** the year-tagged relief explainer and the simplified-versus-profit election
mechanics in depth are N5's ground. N4 does the sum once, for this reader, and links.

## 3. Market keyword slice (ledger, 17 rows, `foster accountants` 170/mo)

The largest assigned block in the cluster. Head and best-CPC rows:

| Keyword | Vol/mo | CPC | Ranking domains (D1) | Best peer |
|---|---|---|---|---|
| foster accountants | **170** | n/a | 1 | octopusfostering **p41** |
| foster carer tax / foster care tax (equivalence) | 70 | $4.25 | 1 | accountaxzone p61 |
| foster carers and tax | 70 | $4.25 | 1 | accountaxzone p61 |
| foster carers tax | 70 | $4.25 | 1 | accountaxzone p63 |
| tax foster carers | 70 | $4.25 | 1 | accountaxzone p49 |
| foster carers tax relief | 70 | $3.85 | 1 | accountaxzone p50 |
| tax relief for foster carers | 70 | $3.85 | 1 | accountaxzone p55 |
| foster carer tax return example | 90 | $0.86 | 1 | accountaxzone p21 |
| foster carer tax allowance 24 25 | 90 | n/a | 1 | accountaxzone p32 |
| foster carer tax allowance 24/25 | 90 | n/a | 1 | accountaxzone p40 |
| foster carer tax return example pdf | 50 | n/a | 1 | accountaxzone p33 |
| hmrc fostering tax allowance | 50 | n/a | 1 | accountaxzone p33 |
| tax return for foster carers | 50 | **$8.20** | 1 | accountaxzone p33 |
| tax return foster carer | 50 | $2.04 | 1 | accountaxzone p51 |
| tax returns for foster carers | 50 | $2.04 | 1 | accountaxzone p46 |
| foster carer tax return | 50 | n/a | 1 | accountaxzone p41 |

**The structural fact that defines this pack:** one domain holds fifteen of these rows and its best
position on any of them is **p21**. The 170/mo head is held at **p41**. Nobody is above position 20
on any commercial foster row in the harvest. `foster carer tax return example` at 90/mo is an
explicit request for a worked calculation, which the field does not supply.

## 4. Competitor teardown (fetched 2026-08-25)

**Primary: `accountaxzone.com/hmrc-self-assessment-tax-return-for-foster-carer/`**, p21 to p41
across eight return rows. Title and H1 "What Happens If Foster Carers Don't Register for Self
Assessment with HMRC (UK Guide 2026)". **~3,200 words**, 14 H2s. Opens "If you're a foster carer in
the UK, you've probably heard this before:". Em-dashes throughout.

Measured gaps: **no worked calculation** and **no qualifying care relief figures anywhere**. A
3,200-word page whose fifth H2 is "Understanding Qualifying Care Relief properly" and which states
no amounts. It also runs "Which apps can help with Self Assessment" and "Why Generic Accountants
Often Get This Wrong" as H2s, which is filler and a competitor swipe.

**Secondary: `tax-wise.co.uk/online-accountants-foster-carers/`**, p104. **1,040 words.** Structure
puts an accreditations block (ACCA, IFA, AAT) above the substance, then a QCR explainer, four
service H3s, a why-choose block, an FAQ, and Call / Email / WhatsApp H3s.

Measured flaw: it states the qualifying amount as **£18,140** with weekly rates of **£375 and
£450**, **with no tax year attached**. Those are 2023/24 figures. Also "maximize your tax-free
allowances", American spelling, and it leads on credentials.

**Head-term holder: `octopusfostering.co.uk`**, p41 on `foster accountants` (170/mo), a pure-play
with a £75 fixed fee recorded at first pass. **It would not fetch on 2026-08-25**: HTTP 500, a
WordPress error page. No claim in this pack rests on its content, and the writer should retry the
fetch at write time rather than assume.

**Recorded, deliberately not harvested:** Xeinadin is the Fostering Network's endorsed provider and
a top-100 firm. It is a national-brand-tier peer and pulling a domain that size would have been
wasteful. It is a real competitive presence that our rank data does not see. Stated as a limitation.

## 5. Whitespace (what §19.1 lets us own)

- **The sum, done correctly, with dated current figures, above the fold.** The qualifying amount is
  a fixed amount per household plus a weekly amount per person cared for, banded by age. Current
  figures per gov.uk foster-parent tax guidance: **£20,440 fixed for 2025/26, plus £435 a week per
  child under 11 and £515 a week per child 11 or over, and £515 a week per adult**; HS236 (2025
  edition) carries **£19,360 / £405 / £485 for 2024/25**. Every figure goes on the page with its
  year attached. The entire ranking field is either silent or wrong on these numbers.
- **"Most foster carers owe no tax, and here is the arithmetic that proves it for you."** Receipts
  at or below the qualifying amount mean nil profit and no tax, though a return may still be
  required. Say it plainly, early, and back it with the sum. This is the honest answer and it is
  also the answer that earns the reader's trust.
- **The worked example the SERP is explicitly asking for.** `foster carer tax return example` at
  90/mo, `foster carer tax return example pdf` at 50/mo. One full, recomputable calculation, start
  to finish.
- **Year-tagged answers for a year-tagged query set.** Two of the rows carry "24/25" in the query
  text. Answer both years, labelled.
- **The scope of qualifying care beyond fostering:** shared lives care, kinship and
  friends-and-family placements, staying put, and parent-and-child arrangements. The field talks
  only about fostering.
- **The National Insurance position for a carer with low or nil profit**, including the
  treated-as-paid Class 2 position since 6 April 2024 and the voluntary-contribution and credit
  routes for protecting a state pension record. This is the single most valuable practical point
  for a nil-tax foster carer and nobody covers it.
- **The election is annual.** Simplified method or profit method, chosen each year, not locked.

## 6. Fences (binding)

- **The C1 row 27 benefits fence is absolute.** No benefits-eligibility content, no help with a
  benefits claim, no assessment of how fostering income interacts with universal credit or any other
  benefit, and **no onward referral of a claimant to anyone**. Managing such claims is regulated
  claims-management activity and the estate holds no permission. This is not a style preference. The
  p8 competitor page in the sibling surface runs "Interaction with benefits" as a planning section:
  we do not, ever.
- **Tone fence (dossier §7).** Foster carers are doing care work, not running a growth business.
  Never sell fear, never use "maximise your tax-free allowances" framing, never imply the reader is
  losing money. Most of them owe nothing, and the page says so.
- **Never call fostering income "tax-free" without showing the qualifying-amount arithmetic.** The
  relief is a threshold, not an exemption.
- **Never mix tax years inside one worked example.** The figures are CPI-indexed and the gov.uk page
  and HS236 lag each other. One year per example, labelled in the sentence.
- **Write-time verification, mandatory before publish:** the house position records an open question
  on the exact tax-year label of the £20,440 / £435 / £515 set, because the gov.uk page states them
  without a year tag. **Fetch the current HS236 helpsheet at write time and pin the year** before
  any figure goes on the page. Also re-verify the current NI-credit route names for nil-profit
  carers. Do not publish an unpinned figure.
- **No published house-position citations in reader copy.** Writer cites **§19.1** (the whole
  position), **§2** (self-employment, Class 4, the post-2024 Class 2 position), **§17** and the C1
  row 27 fence **in the build report only**. The reader sees gov.uk and HS236.
- **No em-dashes.**
- **Rates date-tagged in the sentence**; the 2025/26-locked set (Class 4 6%, £12,570, £50,270)
  carries the natural-language **"still current when checked in August 2026"** tag in 2026/27 copy.
- **No competitor swipes.** We do not tell readers other pages have the wrong numbers.
- **Intra-cluster:** the deep year-by-year relief explainer and the election comparison are N5's. N4
  does one sum and links.

## 7. Acceptance criteria (deterministic)

1. **Queries answerable:** `foster accountants`; all six `foster carer(s) tax` and `tax relief for
   foster carers` phrasings; all six `tax return for foster carers` phrasings; `hmrc fostering tax
   allowance`; `foster carer tax return example`; "do foster carers pay tax"; "do foster carers need
   to file a tax return".
2. **Figures, recomputable and dated:** the fixed qualifying amount and both weekly child bands and
   the adult band, each with its tax year, for the current year and the prior year; the 5 October
   registration trigger; the 31 January filing deadline; Class 4 at 6% with the currency tag;
   £12,570 and £50,270 with the currency tag; the Class 2 treated-as-paid date of 6 April 2024.
3. **One full worked example**, recomputable on a single stated tax year: a carer with two
   placements across a stated number of weeks, from total receipts through the qualifying amount to
   the taxable result, showing the case where the answer is nil. Persona **Yusuf**, city
   **Durham**. Every input visible so the reader can substitute their own.
4. **One explicit paragraph** naming shared lives, kinship, staying put and parent-and-child
   arrangements as within qualifying care.
5. **One explicit paragraph** on National Insurance for a nil-profit carer and protecting a state
   pension record.
6. **Zero benefits content.** QA greps for "universal credit", "benefit", "claim" in a benefits
   sense before sign-off and fails the page on a hit.
7. **Single H1.** Links: N5 linked from body prose; resolver-clean; all house content floors and the
   coverage pass.
8. **No H2 duplicating an N1, N2, N3, N5 or E1 H2 phrasing.**
9. **Zero house-position section codes** in the published body.

## 8. Expectation

**The most winnable commercial block in the cluster.** Seventeen assigned rows, one competitor
holding fifteen of them, and its best position across the entire set is p21. The 170/mo head sits at
p41 on a site that returned a server error when fetched. The field's figures are stale or absent.
CPC reaches $8.20.

Realistic: Google top-10 on several of the `foster carer(s) tax` and `tax return for foster carers`
phrasings within a quarter of indexing, given that beating p21 is a low bar. `foster accountants`
at 170/mo is the stretch target and the one worth watching. Bing earlier. Maturity caveat applies:
poor position at 28 days is immaturity, not a gap.

Volume caveat: the seventeen rows collapse into perhaps four distinct intents (what is the relief,
what are this year's figures, do I need to file, who files it for me), so the summed volume
overstates distinct demand considerably. Expect fewer sessions than the arithmetic suggests, and
judge the page on the commercial rows, not the total.

Unmeasured competitor caveat, stated rather than hidden: Xeinadin holds the Fostering Network
endorsement and was not harvested. Our rank picture of this niche is incomplete at the top of the
brand tier.

Failure trigger: zero impressions on `foster accountants` and on all six `foster carer(s) tax`
phrasings at 90 days post-index.
