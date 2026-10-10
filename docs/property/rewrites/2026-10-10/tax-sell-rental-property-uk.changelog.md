# Change log: /blog/capital-gains-tax/tax-sell-rental-property-uk (preserve-and-extend refresh, 2026-10-10)

File: `Property/web/content/blog/tax-sell-rental-property-uk.md`. URL, slug, category, canonical, `date`, title, h1, metaTitle and metaDescription unchanged. `dateModified` 2026-07-26 -> 2026-10-10. Not committed, not deployed. Marked pending QA (batch LE-REFRESH-1).

## Verify and heading diff

- `protect_list.py --verify`: **341/341 protected queries still answered, 0 lost**, no structure warnings (exit 0). Baseline on the unedited file was also 341/341.
- Heading diff (`git show HEAD:<file>` vs working copy, all `<h2>`-`<h4>`): **0 removed, 0 renamed, 5 added** (19 -> 24 headings). Every existing H2/H3/H4, the stage table, the worked example and all 14 original FAQ entries kept (questions verbatim; four answers extended or corrected, below).
- Of the 74 protect-list gap queries (score < 0.5), 29 now score >= 0.5. Most of the rest are long or misspelt queries whose substance is now answered in prose (legal fees, receipts, joint ownership, moving back in, form to file) but the token scorer cannot match; no keyword stuffing was added to chase them.
- Em-dashes (U+2014): 0. `frontmatter_lint --check`: OK.

## Word count (body + FAQ text, HTML stripped)

Before 3,606 (body 2,582 + 14 FAQs 1,024). After 6,129 (body 4,108 + 24 FAQs 2,021).

## Sections added

| Added | Where | Queries / PAA it answers |
|---|---|---|
| Para: income tax in the year of sale; sale price is not income; trading exception | After the stage table (H2 "The three things...") | "do i have to pay income tax on my house sale if its a buy to let", "how much tax you for rented property when sold", PAA "How is rental income taxed", "i will be selling my rental house what do i need to put in my next tax return" |
| Para: joint owners and trustees/PRs | H2 "Capital Gains Tax when you sell..." | "joint ownership do you get 3000 each", "if i own 20 of a rental home" |
| **H3 "Does the gain push my income into a higher tax band?"** | Under the CGT H2 | "i am a 20 tax payer if i sell my rental house will that push me into the 40 bracket", "as a 20 tax payer ... 100 000 profit ... push me into 40", "which income tax bands apply", "sell property before retiring", PAA "How to avoid paying 40% tax" (partly) |
| **H4 "Costs that do not reduce the gain"** + selling-costs bullet extended (legal fees vs rent, VAT) | H3 "How the gain is calculated" | "legal fees for selling btl go against cgt or against rent profit", "what can you offset against cgt", "expenses on rental property up for sale", "deed of variation ... tax deductable", "pay off ... mortgage" |
| PRR paras: lived-in-then-let and let-then-lived-in; moving back in before sale; out-of-date longer final period; spouses one main residence; family member rent-free | H3 "Private Residence Relief..." | "should we live in it for 6 months", "cgt on property you lived in and then rented out", "rented it out but then lived in it again before selling", "ex rental i have now lived in for 7 months", "son moved in for a year", "only property rented 3 of 10 years", PAA "36 month rule", "6 year rule", "How to avoid CGT on rented property" |
| Lettings Relief: lodger / rent-a-room shared occupation | H3 "Lettings Relief..." | "rent a room scheme do i pay capital gains tax on sale of house" |
| Losses: no carry-back except year of death; rental loss is not a capital loss | H3 "Using capital losses" | "loss in rental income in the same year", "sell another property at a loss two years later can i claim a refund" |
| 60-day penalties; **two-date trap** (exchange fixes the tax year, completion starts the clock) | H2 "Reporting and paying" | "how long to pay capital gains on rented property sale", "when do you have to complete a tax form", "losses brought forward is it still 60 days" |
| **H3 "What HMRC needs from you when you sell"** | H2 "Reporting and paying" | "after sold the uk rental property what tax form", "im selling my rented house what do i need to do with the hmrc", "what information do i need to provide to hmrc", "how to declare tax on selling rental house", gov.uk report-and-pay URL queries, "done my tax return ... how do i pay the tax owing" |
| **H3 "If the rent was never declared"** | H2 "Reporting and paying" | "who is the best person to ask advice ... renting out and not declaring the income" |
| Company: associated companies, CIHC carve-out, no AEA, indexation to Dec 2017 | H3 "Company-owned properties" | company-disposal queries (precision) |
| Non-resident AEA | H3 "Non-resident landlords" | precision |
| Exchange-date note on splitting across tax years | H3 "Use the annual exemption..." | correctness |
| **H3 "Reinvesting the proceeds or paying off a mortgage"** | H2 "Planning to reduce the CGT" | "if you sell a rental property and buy another one do you still have to pay gains tax", "selling a rented property to buy a cheaper one", "can i use the money to pay off some of my personal mortgage" |
| Records: assessment windows, retention minimum, receipts | H2 "Records to keep" | "selling a rental house do receipts get checked for tax" |
| Two "When to get specialist advice" bullets (exchange near 5 April; undeclared rent) | H2 "When to get specialist advice" | as above |
| FAQs added (10): only house rented out; 40% bracket; April 2026 change; rental loss vs gain; moving back in; simple way to avoid CGT; joint owners £3,000 each; what to tell HMRC; sell and buy another; never declared the rent | Frontmatter `faqs` | "do you have to pay capital gain tax if you sell your only house that has been rented", PAA "Is capital gains tax changing in April 2026?", PAA "What is a simple trick for avoiding capital gains tax?" (8 SERPs), PAA "How to avoid capital gains tax on a buy-to-let", plus the queries listed above |
| FAQ answers extended (4): income tax vs CGT (rent to date of sale, sale price not income); losses (no carry-back); costs (legal fees, VAT, exclusions); 60-day (exchange vs completion) | Frontmatter `faqs` | protected queries already mapped there, strengthened |

Not added, deliberately: no further calculation steps or numeric PRR worked example (LE-25: CGT calculation searches belong to the step-by-step calculation guide, already linked); no "why are landlords selling up" or "is buy-to-let worth it" content (opinion, not this page's intent).

## Facts corrected (old -> new)

| Old | New | house_positions |
|---|---|---|
| April 2027 property income rates apply in "England and Northern Ireland"; "Scotland and Wales set their own property income rates (FA 2026 s.8 and Schedule 2)" (body and FAQ) | England, Wales and Northern Ireland; only Scotland carved out; s.8/Sch 2 is a future power not in force for 2027/28 | §7 |
| Splitting across two tax years "by completing one sale in late March and another in early April" | By **exchanging**; the exchange date fixes the tax year, completion only starts the 60-day clock | §5.B (TCGA s.28(1); FA 2019 Sch 2 para 3(1)(b)) |
| Section 162 relief presented as available without qualification | Must be **claimed** for transfers on or after 6 April 2026 (FA 2026) | §5 |
| "HMRC can usually enquire into a return for up to 4 years after the relevant filing deadline" (body and FAQ) | Assessment normally up to 4 years after the end of the tax year, 6 careless, 20 deliberate; record minimum 5 years after 31 January, firm suggests 7 | §27.1, §27.7, §27.8 |
| Close investment-holding companies "pay the 25% main rate regardless" with no carve-out (implied most letting companies) | A company letting commercially to unconnected tenants is normally outside CIHC; connected/family tenants can bring it in; associated-companies sharing of limits added | §21.A, §21.5 |

Added facts (all house positions): 60-day late-filing penalties £100 + £10/day from day 91 + 5% at 6 and 12 months (§5); trustees/PRs 24% throughout (§5); BADR 18% from 6 April 2026, not for investment property (§5); exhaustive s.38 costs list, interest/ERCs excluded, removals/cleaning/cosmetic excluded, private seller deducts gross agent fee (§5.B, CG14300); indexation for companies frozen December 2017 (§5); non-resident individual £3,000 AEA (§17.4); spouses one main residence (§24.5); loss carry-back only in year of death (§39); Let Property Campaign notify then 90 days, lower penalties if unprompted (§27.6, §27.2); trading vs investment (§28.5).

**For QA, general-law statements not explicitly locked in house_positions** (all standard and conservative, but check): (1) no CGT relief for reinvesting in another let residential property; (2) a rental (property business) loss cannot be set against a capital gain; (3) a period when a family member lived there rent-free is not covered by PRR; (4) the HMRC UK property CGT service needs its own property account (stated on our own /for/selling-a-buy-to-let page); (5) a lodger under rent-a-room is "shared occupation" for Lettings Relief.

## Headings changed

None renamed or removed. Added: H3 "Does the gain push my income into a higher tax band?", H4 "Costs that do not reduce the gain", H3 "What HMRC needs from you when you sell", H3 "If the rent was never declared", H3 "Reinvesting the proceeds or paying off a mortgage".

## Hand-off sentence

Rework of the existing help aside at the end of H2 "Reporting and paying: the 60-day return" (rubric: prefer reworking an existing help sentence), placed after the deadline, penalty, two-date and undeclared-rent material, i.e. where the reader's case gets complicated; mid-page, not the intro or last line. One link to the money page; no other link to /for/selling-a-buy-to-let on the page. Anchor is hire-intent ("help with"), variant, not the exact head phrase. Claims match the destination page's "how we help" copy.

> Property Tax Partners can [help with the gain computation and the 60-day return on your buy-to-let sale](/for/selling-a-buy-to-let): a specialist checks the exchange and completion dates, any period you lived there and the costs you can evidence, then prepares and files the return where tax is due.

The aside's "free, no-obligation call" line was replaced by this sentence; the second aside (planning) still offers the free call.

## QA round 1 (factual: fail, 1 BLOCK / 2 FIX / 4 NOTE; editorial: weak, 6 FIX / 5 NOTE)

Result after fixes: `protect_list.py --verify` **341/341 answered, 0 lost** (exit 0); heading diff vs HEAD **0 removed, 0 renamed** (same 5 additions); em-dashes 0; frontmatter lint OK. Words 6,129 -> **5,728** (-401; body 4,033 + 21 FAQs 1,695). FAQs 24 -> 21.

### Factual
| Item | Resolution |
|---|---|
| BLOCK: loss ordering backwards ("losses come off after the annual exemption", pre-dated the refresh) | Replaced with QA wording: same-year losses set off in full before the £3,000 AEA (can waste it); brought-forward losses used only down to £3,000 (TCGA 1992 s.1K(4), manager-confirmed). Checked the rest of the page: no other loss-ordering statement (FAQ on losses and 60-day "covered by losses" lines make no ordering claim). Suggest house_positions §5 gains a loss-ordering line. |
| FIX: final period overstated (body) | Body now: 9 months for most sellers; 36 months only in narrow cases such as a disabled owner or one in long-term care (s.225E). |
| FIX: same overstatement in moving-back-in FAQ | FAQ shortened to one sentence (editorial FIX) and the stale-guidance clause removed from it, so the scoped statement lives in the body only (also resolves editorial NOTE on duplication). |
| NOTE: penalties "5% or £300 if greater" | Applied. Suggest house_positions §5 is updated to match (FA 2009 Sch 55). |
| NOTE: trustees "whole gain" | Applied: "24% on all of the taxable gain"; added most trusts' £1,500 AEA (§5). |
| NOTE: lodger / Lettings Relief | No change required (QA). |
| NOTE: separation 3-year window | No change required (QA). |

### Editorial
| Item | Resolution |
|---|---|
| FIX: "stops mattering once you sell" contradiction | Now "carries on only up to the date of sale". |
| FIX: six "Two ..." openers | All six removed or rewritten ("In the year you sell...", direct statement on 60-day filing, "Watch the dates...", "Where non-residents differ from residents:", loss-limits and reinvesting paragraphs open on the point). Also removed "Two things did change" from the April 2026 FAQ. |
| FIX: hand-off aside position | Moved unchanged to the end of H3 "What HMRC needs from you when you sell"; "If the rent was never declared" now follows it. |
| FIX: 4/6/20 windows repeated, LPC guide unlinked | Kept once (Records to keep). Removed from the undeclared-rent H3 (replaced by link to /blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026, explainer anchor) and from the records FAQ ("HMRC can look back further where an error was careless or deliberate"). |
| FIX: joint-owner £3,000 said five times | Body paragraph kept as the main statement; sentence deleted from "Use the annual exemption"; the two £3,000 FAQs merged. The original question "Can my spouse and I both use the £3,000 annual exemption?" was **kept verbatim** (rather than renamed as QA suggested) to protect any query matching it; the answer now covers unmarried joint owners, the 20% share example, own 60-day return and s.58. "Simple way" FAQ no longer restates the spouse point. |
| FIX: PRR paragraph formulaic and overloaded; FAQ duplicate | Opens "Moving back in before you sell helps only if..."; spouses and family-member rules split into their own short paragraph; FAQ cut to one sentence. |
| NOTE: higher-band H3 opener | Applied QA wording; second paragraph tightened. |
| NOTE: final-period line stated twice | Body only (see factual FIX). |
| NOTE: "specifically excluded" | Now "not on the list of allowable costs". |
| NOTE: exchange vs completion said five times | One full statement kept (Reporting H2, "Watch the dates..."); others reduced to brief back-references (higher-band H3 "fixed by the exchange date, explained below"; annual-exemption H3 one clause; 60-day FAQ one clause; "What to tell HMRC" FAQ no longer repeats tax-year-of-exchange). Similarity to the /for/selling-a-buy-to-let copy noted for the owner; not changed here. |
| NOTE: length / FAQ count | Cut 401 words. Also removed FAQs "If I sell my rental property and buy another..." and "Can a loss on my rental income reduce..." (both restated body H3/paragraphs added in this refresh; neither was a protected FAQ) and shortened "I never declared the rent" and "What do I need to tell HMRC". |
