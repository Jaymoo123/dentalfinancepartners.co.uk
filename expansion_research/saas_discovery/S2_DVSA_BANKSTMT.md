# S2 agent 2: DVSA slot checker feasibility + bank statement converter (2026-09-09)

## INVESTIGATION 1 — UK driving test cancellation checkers: VERDICT AVOID

Demand real (33k/mo head term) but the category was legislated out of existence in 2026.

**Mechanism:** all apps take the user's licence number + DVSA booking reference and bot the
gov.uk booking system (no official API exists). NAO (Dec 2025): bots completed the form in
<10s, grabbing up to ~20% of slots in peak areas.

**Competitors (verified pricing):** Testi £10 premium (some sources ~£18.99); Driving Test
Genie £14.99-17.99 one-off until pass; Cancellations NOW £17.99; Cancellations App £5.99/wk;
4 All £18; Test Hunter/DriveBot/Testmate ~£15-25.

**The kill factors:**
- 31 Mar 2026: test changes cut 6 -> 2 per booking.
- 8 Apr / 12 May 2026: third-party booking/changing/swapping/cancelling on a learner's
  behalf became an offence (gov.uk "End of the road for unofficial driving test booking
  services"; press calls it criminal; exact instrument scope would need a solicitor read,
  direction unambiguous).
- 9 Jun 2026: tests movable only to one of learner's 3 nearest centres (kills swap arbitrage).
- Enforcement: 1,100+ licence numbers suspended; 7 business accounts; **17 apps removed from
  Apple/Google at DVSA's request**; detected bot activity gets the LEARNER's test cancelled.
- DVSA position explicitly bans NOTIFY-ONLY services too ("even if you complete the booking
  yourself") — checking itself is bot access. No compliant technical implementation exists.
- Churn 100% by design (need lasts 2-12 weeks once); LTV ~£15; DVSA publicly committed to
  7-week waits by summer 2026 = demand is state-managed wind-down.
- User complaints: late notifications, phantom slots, users blocked by DVSA because app bot
  activity linked to their licence, duplicate charges, dead refunds.

Only harvestable piece: the search volume via content + ads (guides on official rebooking),
a different much smaller business.

## INVESTIGATION 2 — bank statement PDF-to-Excel: VERDICT BUILD-WITH-CONSTRAINTS

**Revenue re-check:** the $318k/yr figure UNVERIFIED. Founder-published trail: $4k MRR Oct
2022 -> $12.5k 2023 (Starter Story) -> $16k/mo ~= $192k/yr (Founder Reports). His Feb-2023
blog reports HKD (misreadable as USD). Treat ceiling as $150-200k/yr solo, not $318k.

**Competitors:** bankstatementconverter.com (credits, expire monthly); DocuClipper from
$20/mo (pro leader, Trustpilot 1.8/5, billing-trap complaints, fails on Barclays/HSBC);
MoneyThumb $29-99 desktop (local processing exists, dated); ProperSoft ~$39; enterprise IDP
$499+/mo (Nanonets etc); PLUS 15+ AI-era me-too sites launched 2024-2026 incl 6+ UK-branded
(statementconverter.uk, hsbcstatements.co.uk...) with no evident traction.

**Complaint taxonomy ranked:** (1) billing/credit traps (expiring credits, auto-renew,
post-cancel charging), (2) accuracy on non-US + scanned statements (DocuClipper fails
Barclays/HSBC; BSC <95% on complex layouts), (3) upload-privacy distrust ("don't want my
transactions on a third-party server"), (4) support latency.

**Buyers:** bookkeepers/accountants = core + only subscription-shaped segment; MCA lenders/
brokers = high-value (buy analysis + fraud detection, not conversion); one-off consumers
(tax season, mortgage, probate, landlords) = credit packs. Volume data: none published.

**Complaint-derived spec:** UK-bank-perfect parsing top ~15 banks (Barclays money-in/out,
Lloyds debit/credit, HSBC same-column, Monzo signed amounts, wrapped transactions) with a
PUBLISHED per-bank accuracy table; balance reconciliation check on every conversion
(opening + transactions = closing, flagged); no credit expiry, no auto-renew, packs that
never expire + flat bookkeeper sub; file-hash dedupe (never charge same upload twice);
privacy tier = in-browser/WASM conversion for text-layer PDFs (file never leaves device,
server OCR opt-in for scans) — verifiable, mostly unclaimed differentiator; same-day support.

**Saturation read:** provable solo money (~$16k/mo demonstrated) but entry level heavily
saturated; head-term SERP a knife-fight vs free tiers. Unsaturated: UK-specific accuracy
with proof, verifiable on-device privacy, bookkeeper subscription, lender-analysis upsell.
Only worth doing as UK-first fair-billing wedge targeting bookkeepers; low-six-figure
ceiling; skip if plan = clone + rank head term.

Sources: gov.uk end-of-the-road announcement; readytopass.campaign.gov.uk unofficial-apps;
carwow crackdown; driving.org 1,100 suspensions; theregister.com 2025-12-18 DVSA bots;
yourmoney.com bots black market; Testi Trustpilot/PissedConsumer; you-well.co.uk roundup;
drivingtestgenie.co.uk; founderreports.com Angus Cheng; starterstory.com BSC; BSC revenue
blog 2023-02-01 (HKD); capyparse DocuClipper review; MoneyThumb + BSC Trustpilot;
herondata.io lender segment; bank-statements.co 2026 comparison.
