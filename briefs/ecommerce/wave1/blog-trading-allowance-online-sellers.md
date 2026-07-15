---
slug: trading-allowance-online-sellers
tier: blog
route: /blog/trading-allowance-online-sellers
category: "Making Tax Digital and Self Assessment"
intent: DIY-INFORMATIONAL / SELLER-PROBLEM. Sellers asking "do I even have to pay tax on this" after side-hustle-tax headlines; when a hobby/declutter becomes a taxable trade. Pairs with platform-reporting-rules.
---
# The £1,000 Trading Allowance for Online Sellers, and When a Side Hustle Becomes a Taxable Trade

> RAW HTML AT WRITE TIME. Blog body must be raw HTML (`<p>`, `<h2>`, `<ul>`, `<table>`), never markdown syntax. No em-dashes anywhere in user-facing copy.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK loc 2826, joined 2026-07-12)

- **Primary:** "hmrc side hustle tax limit change" 3,600/mo, KD 8 (LAUNCH_CORE: the single largest measured cluster in the niche; side-hustle family 79 terms summing 5,910/mo).
- **Secondary:** "trading allowance" / "£1000 trading allowance" (pool + autocomplete; the £1,000 figure is the direct answer to the "limit change" panic). "side hustle tax free amount", "ebay selling limit before tax" (family members, mostly no discrete measured volume).
- Long-tail (autocomplete-derived, no measured volume): "when does a hobby become a business uk", "do I pay tax reselling for profit".

## Search-intent class + play

DIY-INFORMATIONAL. The "side hustle tax limit change" query is largely a MISUNDERSTANDING of the platform-reporting rules (there was no new tax LIMIT; the change was reporting). Play: correct the misconception at the top (BLUF: no new tax-free limit was created, the £1,000 trading allowance is the actual figure and it is not new), then resolve the real question with badges of trade. Capture edge: a seller who realises they ARE trading and needs to register → Self Assessment pointer + MTD ITSA blog.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **gov.uk** (tax-free-allowances-on-property-and-trading-income owns the definitional head): beat on the "was there a change?" framing and on goods-seller-specific worked examples (COGS vs allowance trade-off). Do not fight the definitional head.
- **Consumer press + HMRC taxhelpforhustles**: own the panic-headline SERP; beat on the clear correction (reporting change, not a tax limit change) and the badges-of-trade decision the headlines skip.

## Required structure

- H2 skeleton:
  1. The short answer: there was no new tax-free limit; the £1,000 trading allowance is the number that matters (BLUF box)
  2. What the "side hustle tax limit change" headlines actually referred to (reporting, not tax; link platform-reporting-rules)
  3. The £1,000 trading allowance: gross income £1,000 or less may need no return
  4. Above £1,000: allowance instead of actual expenses, or actual expenses, but not both (worked example for a goods seller with real COGS)
  5. The bigger question: is what you do actually trading? (badges of trade)
  6. The four badges applied to a reseller vs a declutterer (worked scenarios)
  7. If you are trading: registering for Self Assessment (5 October deadline) and what comes next
  8. Common failure modes (using the allowance instead of larger real COGS; assuming a report trigger is a tax-free amount)
- FAQ candidates (no answers at seed stage):
  1. Did the side hustle tax rules change in 2024?
  2. What is the £1,000 trading allowance?
  3. Do I pay tax on selling my own old stuff?
  4. When does reselling become a taxable business?
  5. Can I use the trading allowance and claim expenses?
  6. Is the £1,000 allowance the same as the platform reporting threshold?
  7. When do I have to register for Self Assessment?
  8. Do I pay tax if I sell under £1,000 on eBay?
- Table/chart opportunities: allowance-vs-actual-expenses table (when £1,000 allowance beats real COGS and when it does not); badges-of-trade table (the four badges applied to declutter vs buy-to-resell).
- Calculator embed: none native. Do not embed seller-take-home here (wrong stage; this reader is pre-trading).
- Internal links within launch core: /blog/platform-reporting-rules (the reporting misconception), /blog/mtd-itsa-online-sellers (if trading and scaling), /for/marketplace-sellers (Vinted/eBay-graduate hub), hmrc-letter-online-sales (if a letter prompted the search).

## House positions touched

- **HP 14 (trading allowance), copied exactly:** "If annual gross trading income is £1,000 or less, a return may not be required. Above £1,000, a seller can either deduct the £1,000 allowance instead of actual expenses, or deduct actual expenses, but not both. For goods sellers with real cost of goods sold, using the allowance instead of actual COGS is usually the worse choice." Citation: https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income (verified 2026-07-15).
- **HP 15 (badges of trade), copied exactly:** "Selling personal possessions you no longer want (Vinted, eBay, Depop declutter) is generally not trading; buying or making goods to sell at a profit generally is. The distinction turns on HMRC's badges of trade (profit motive, frequency of transactions, nature of the asset, how goods were acquired), not on any sales count or platform-report trigger." FLAGGED: cite HMRC Business Income Manual badges-of-trade pages (BIM20205 onward) at build time.
- **HP 13 (reporting exclusion is not a tax threshold):** referenced to correct the "limit change" misconception; do not restate its full mechanics (owned by platform-reporting-rules).
- **HP 21 (Self Assessment 5 October deadline), copied exactly:** "A new sole-trader seller who becomes chargeable to tax must tell HMRC by 5 October following the end of the relevant tax year (so 5 October 2026 for income in the year to 5 April 2026)." Citation: https://www.gov.uk/register-for-self-assessment (verified 2026-07-15).
- Consistency rule that binds this page: "Badges of trade (position 15): 'is my decluttering trading?' is a badges-of-trade question; cite BIM at build, never a sales count."

## Hallucination danger zones

- BADGES OF TRADE IS A BUILD-TIME CITATION (HP 15 open flag): the badges must cite HMRC BIM (BIM20205 onward) at build; do NOT publish the badges list without the live citation. This is the flagged citation for this brief.
- Never state a sales count or a pound figure as the "trading" line; trading is a badges question, not a threshold (this is the core correction of the whole page).
- The £1,000 trading allowance is NOT new and is NOT the reporting trigger; keep it distinct from the €2,000/30-sales reporting exclusion (HP 13).
- "May not be required" (HP 14 wording): do not upgrade to "no return is required"; other income can still pull a taxpayer into Self Assessment.
- No em-dashes.

## Stage 2 TODO

- Fix and verify the BIM20205 badges-of-trade citation URL live (HP 15 open flag) BEFORE the badges section is written.
- WebFetch gov.uk trading-income allowance page; confirm £1,000 figure and allowance-instead-of-expenses rule.
- WebFetch one consumer-press "side hustle tax" article to record the exact misconception to correct.
