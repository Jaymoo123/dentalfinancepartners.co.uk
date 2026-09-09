# S2 agent 1: complaint mining — MTD bridging, dividend vouchers, deal analysers (2026-09-09)

Access limits (material): Reddit and X blocked the crawler entirely — those lanes UNMINED,
not empty. AccountingWEB = 403 direct; its material is search-snippet paraphrase unless
quoted. Trustpilot, MSE forum, reviews.co.uk, Apple App Store fetched directly = verbatim.

## CATEGORY 1 — MTD bridging/filing (ITSA focus)

Top 5 pains by frequency:
1. **Quarterly relearn/friction tax** — 4x/yr task forgotten between uses; "always forget the
   process, as its a bit convoluted", "nearly have to relearn it each time" (123 Sheets
   Trustpilot, 5+ reviewers).
2. **Support vacuum at deadline moments** — email-only, days-slow, dead phone lines (6+
   reviewers across 123 Sheets, VitalTax, Hammock, Coconut; 1-star cluster Jul-Aug 2026).
3. **HMRC connection fragility** — surprise re-authorisation ("Vital Tax refuses to recognise
   it... complete nightmare", 5 Aug 2026), uploads appearing wrong at HMRC with vendor
   refusing to help (123 Sheets 29 Apr 2026, Coconut).
4. **Threshold/scope confusion** — gross vs net £50k, PAYE, joint ownership, sole trade +
   property = 8 submissions/yr not 4, "'HMRC-recognised' absolutely does not mean compliant"
   (AccountingWEB). These are the actual panic questions on MSE.
5. **Pricing traps** — per-submission fees (Landlord Studio £5/submission), renewal expiring
   the day a return is due ("GOT A FINE"), promo codes charging anyway, Coconut £3->£9.95 creep.

Also: bank feeds break silently (Coconut); Hammock missing Rent-a-Room; Landlord Studio no
sole-trader income (side-trade landlord needs 2 platforms); QuickBooks needs 2 accounts for
rental + self-employment (Intuit's own doc).

Would-not-pay: FreeAgent free via NatWest/Mettle; bridging anchored £12-36/yr (123 Sheets
from £12/yr, VitalTax £36/yr); a cohort plans to exit the regime instead of paying.

**Spec (complaint-derived):** landlord-first MTD ITSA filer, promise = "you never relearn
it": identical guided 3-step quarterly flow; "what HMRC now holds" read-back after every
submission; proactive token re-auth warnings; tolerant Excel parsing; property + sole-trade
in one account (8-submission case); Rent-a-Room + joint splits; flat annual fee aligned to
tax year, no per-submission charges; support <1 business day + real phone line in the 2
weeks before each quarterly deadline; onboarding = plain-English scope checker (gross rent,
PAYE, joint shares).

Timing: mandation live Apr 2026; first quarterly deadline was 7 Aug 2026; HMRC auto-signup
of no-shows from Sept 2026 (ICAS/IAB); >£30k wave Apr 2027.

## CATEGORY 2 — Dividend voucher / board minutes

Direct complaints scarce: Dividify has NO Trustpilot page at all; Dividendly no reviews.
Friction evidence is about the TASK (AccountingWEB, snippet-verified):
1. The paperwork simply doesn't get done (contractors arrive with years missing).
2. Nobody owns it — accountants email a Word template, unbillable, client never fills it in.
3. Retrospective catch-up demand (backdating threads; gap discovered at investigation/
   mortgage/accounts time).
4. Legal uncertainty — voucher vs minutes vs distributable-profits evidence; sole-director
   "board meeting with himself".
5. Monthly-sub mismatch for a 4x/yr task (INFERRED, no verbatim quote): Dividify £6-24/mo
   card-upfront trial, Starter caps 2 vouchers; Dividendly free generator; free templates
   everywhere (ContractEye, FreeAgent, CompanyMate).

Willingness-to-pay counterpoint: Inform Direct "accountant quoted £500... did it in minutes
for £40" (Capterra).

**Spec:** pay-per-use or cheap flat annual (NO monthly below accountant tier): amount +
date + shareholders -> voucher AND sole-director minutes as one PDF pack, with
distributable-profits confirmation tick (what HMRC challenges turn on). Killer features:
CATCH-UP mode (compliant pack for every historic dividend in a date range, honest as-at
dating) + one-click yearly summary export for accountant/HMRC. Consumer side = free-tool/
SEO play; the money is small; accountants only pay near-free or bundled.

## CATEGORY 3 — BTL deal analyser / landlord tax calculators

Top pains:
1. **PropertyData credit metering** — same search 8 days later costs again; rate-limiting
   pushes top package ("way too expensive"); 4.7/5 product, hated meter.
2. **Billing/cancellation hostility** — silent auto-renewal ("straight from crappy dating
   websites", Lendlord), post-trial charging + lockouts (PropertyData).
3. **After-tax blindness** — analysers stop at gross/net yield; Section 24/band/company-vs-
   personal requires chaining broker calculators + spreadsheets. Market monetising the gap
   separately: Etsy s24 spreadsheet (758 formulas, 2026/27), uktaxdrag, checkmytax, PaTMa.
   (Inferred from market structure; Reddit unminable.)
4. **Distrust of free broker calculators** — exist to harvest mortgage leads, users know.
5. Mobile/UI weakness.

Would-not-pay: spreadsheet culture (Etsy £5-15), Lendlord free core sets £0 anchor for
tracking; PropertyData proves serious investors pay £14+/mo for proprietary data; casual
one-deal-a-quarter landlords won't pay.

**Spec:** deal analyser whose output = post-tax cash in pocket THREE WAYS side-by-side
(personal at marginal band with s24 / limited company CT + dividend extraction / joint
split), current + following tax year. Flat price, unlimited searches, EXPLICITLY no
credits; saved deals forever; renewal warning emails; one-click cancel; no mortgage-lead
harvesting. Free single-deal calculator as front door; saving/portfolio/multi-scenario paid.

## Cross-category facts

Same three failure modes recur everywhere: silent auto-renewal/billing traps, email-only
support going dark, pricing mismatched to task frequency (per-submission, credits,
monthly-for-quarterly). "Boringly honest billing + reachable humans at deadline time" is
itself a differentiator per this corpus. Category 1 has the clearest paying wave and the
freshest 1-star pain (Jul-Aug 2026).

Not mined (inaccessible to crawler): Reddit, X, AccountingWEB verbatim threads, Google
Business reviews. Needs a browser session if decisive.
