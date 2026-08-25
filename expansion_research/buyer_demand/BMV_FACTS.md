# BMV — verified regulatory and market facts

Date: 2026-08-08. Two independent research passes against gov.uk, legislation.gov.uk, FCA Handbook,
HMRC manuals, RICS, LEASE, HomeOwners Alliance, Homehold, EIG. Each point marked with confidence.
**Nothing here is legal or tax advice — the compliance stack needs a solicitor and an accountant
before any money moves.**

## Regulation

### Buying as principal to HOLD as a rental — genuinely outside the regime
**CONFIRMED.** Estate Agents Act 1979 s.1(1) defines estate agency work as acts done *"pursuant to
instructions received from another person (the client)"*. Buying for your own account means no
client and no instructions, so it falls outside the Act — and with it, outside the TPO/PRS redress
duty, the s.21 personal-interest duty and the s.14/16 client-money duties.
**CONFIRMED:** no FCA authorisation needed. BTL mortgages are generally unregulated (consumer BTL
excepted).

### Buying as principal to FLIP — pulled in by HMRC anyway
**CONFIRMED, and this is the trap.** HMRC's AML guidance for the estate-agency sector expressly
captures a firm that *"purchases property directly from the owner, with a view to selling it on to a
third party"*, and names *"property sourcing, deal packaging or investment brokering"*.
So buy-to-flip as a business needs **HMRC AML supervision** even though it is principal-side.
Buy-to-hold as a rental does not. Note HMRC's manual is broader than the strict s.1 test.

**This maps directly onto the stated plan.** A long-term rental portfolio is the clean side of that
line. The moment it becomes buy-and-resell, the compliance stack changes.

### Sourcing / packaging deals for other investors — full stack
**CONFIRMED.** Acting on a client's instructions and effecting introductions *is* estate agency work.

| Requirement | Status |
|---|---|
| Redress scheme — TPO or PRS (only two approved) | mandatory; breach is an offence |
| HMRC AML supervision | mandatory; trading unregistered is an offence |
| ICO data-protection fee | required for any lead form / CRM |
| s.21 written personal-interest disclosure | mandatory — the clause packagers most often breach |
| Client money | EAA s.14/16 bite only if you hold it; simplest compliant answer is never take reservation fees |
| PI insurance | **UNCONFIRMED as statutory** — a scheme membership condition in practice |

### Sale-and-rent-back — the hard line
**CONFIRMED.** FCA-regulated since 1 July 2009 (RAO arts 63J-63K, PERG 14.4A, MCOB 2.4 / 3A.8 /
4.11; Handbook current as at 26/06/2026). Not literally banned, but full regulation from mid-2010
closed the market. Operating without Part 4A permission breaches the FSMA s.19 general prohibition —
criminal, and the agreement is unenforceable against the seller.
**Never offer a seller "sell to me and stay on as a tenant."**

### Consumer protection — the biggest live risk, and it is new
**CONFIRMED.** The CPUTR 2008 were **revoked and replaced by DMCCA 2024 Part 4 Ch.1 from 6 April
2025**. Misleading actions (s.226), misleading omissions (s.227), aggressive practices (s.228).
**The CMA now enforces directly** — it can find infringement and fine up to **10% of global
turnover** administratively, without going to court. Its stated early priorities include aggressive
sales tactics targeting vulnerable consumers, which is exactly the distressed-seller channel.

Is there an express duty to disclose that an offer is below market value? **UNCONFIRMED as a hard
statutory rule** — but misleading-omission liability makes it very hard to be safe without stating
the discount clearly. The OFT's 2013 quick-house-sale study (OFT1499) found typical 10-25%
below-market discounts and secured undertakings from four firms: marketing must set out key
information and risks clearly and prominently, and valuations must be conducted fairly,
professionally and in good faith. Those undertakings are the de facto standard. Misstating value or
discount, and last-minute price-chipping after the seller is committed, are the named unfair practices.

### NAPB / TPO code
**CONFIRMED voluntary.** NAPB is a trade body; membership is not compulsory. NAPB members must
register with TPO and follow its Code of Practice for Residential Property Buying Companies (2014).
For a principal buyer there is no statutory compulsion — but joining is the cheapest credibility and
defence asset available in a sector the CMA has already investigated.

## Tax

### SDLT, England & NI — CONFIRMED from live gov.uk, August 2026
| Band | Standard | With additional-dwelling surcharge (**5%**) |
|---|---|---|
| £0-125,000 | 0% | 5% |
| £125,001-250,000 | 2% | 7% |
| £250,001-925,000 | 5% | 10% |
| £925,001-1.5m | 10% | 15% |
| £1.5m+ | 12% | 17% |

Surcharge went 3% to **5 percentage points on 31 Oct 2024**; bands reverted to the above on
1 Apr 2025. Applies to purchases from £40,000. Non-UK resident adds a further **2%**.
**Companies** pay higher rates on all purchases; the flat rate for non-natural persons on a dwelling
over £500,000 is **17%** (up from 15% on 31 Oct 2024), but a genuine property rental business
normally claims relief and pays the higher-rate table instead, with a 3-year clawback. Confirm per deal.
Matches the rates already encoded in `Property/web/src/lib/calculators/premium/tools/stamp-duty.ts`.

**Scotland CONFIRMED:** LBTT ADS **8%** of the full price (up from 6% for contracts after 4 Dec 2024).
**Wales PARTIAL:** LTT uses a separate higher-rates table, not a flat surcharge; higher rates rose
1pp on 11 Dec 2024. Reported 5% / 8.5% / 10% / 12.5% / 15% / 17%, but sourced from commercial
aggregators — **verify at gov.wales / WRA before use**.
**UNCONFIRMED:** no gov.uk record found of a further SDLT residential change at Autumn Budget 2025.

## Market economics

### Discounts
- Genuine cash buyers pay **75-82% of market value**; ~80% is the working average. Broader range
  75-85%, tighter (80-85%) in liquid urban markets. **CONFIRMED** to TheAdvisory; geographic split PARTIAL.
- **76% of sellers reported a last-minute price reduction attempt** (TheAdvisory 2026 survey).
  Down-valuing is the norm in this sector, not the exception.
- ~97% of advertised "cash buyers" are brokers or lead-sellers, not principals. **PARTIAL**, single source.

### Auction — the 45% figure is not real
Octane Capital (May 2026) reported average English auction guide price £159,996, "44.8% below" the
£290,001 average UK house price. **That is guide price versus national average house price, not a
like-for-like discount on the same property.** Guide prices are deliberately set low as bait and
hammer prices routinely exceed them. Treat 45% as marketing-grade.
**A credible like-for-like hammer-vs-market-value discount does not exist in the public domain — the
single biggest data gap here.**
Volumes **CONFIRMED** (EIG): 2025 full year 29,026 lots, £5.873bn, avg ~£200k. June 2026, 3,538
residential lots offered, 2,319 sold (~66%). Activity up 36.5% YoY with success rates down ~3.1pp —
more stock, softer clearance, mildly buyer-favourable.
Fees **CONFIRMED**: buyer's premium 1-5% + VAT or £1,500-£5,000 + VAT (modern method at the punitive
end); seller commission ~2% + VAT, entry fee £500-£1,500 non-refundable, legal pack £300-£600.
10% deposit on the day, 20-28 days to complete.

### Conversion — no data exists
**UNCONFIRMED.** No published enquiry-to-completion rate for cash-buying companies from NAPB, TPO or
the CMA. Context: 24.2% of *all* UK sales collapse before completion. Structurally, most
"we buy any house" traffic is bought by lead-generators who sell the same enquiry to several
principals, so per-buyer conversion must be low single digits — **but that is inference, not data.
Do not model on a number we do not have.**

### Bridging finance 2026 — CONFIRMED
Market average **0.72%/month** (Q1 2026), range 0.55-1.5%. Best 0.55-0.65% at first charge, clean
credit, clear exit, **≤65% LTV**. Typical 0.75-1.0% at ~70% LTV. Arrangement fee 1-2% of gross
(some 3%), exit fee 0.5-1% where charged and often negotiable away, valuation £500-£2,500+, plus
broker fee (often 1%) and lender legals — the last two are routinely missing from headline quotes.
Max LTV 70-75% residential. Interest usually retained, reducing the net advance.

### Capital per deal — PARTIAL
On a £100k Northern purchase: deposit at 75% LTV £25,000 · SDLT at 5% surcharge £5,000 · arrangement
~£1,125 · legals and fees ~£2,500 · survey ~£500 = **~£34,000 to purchase**. Then refurb
£10,000-£25,000, ~6 months bridging interest ~£5,000, refinance legals and valuation ~£1,500.
**Realistic all-in £40,000-£80,000 per deal, with £45-55k the honest central case.**
Below £35k assumes cosmetic-only refurb and no overrun. If the post-works valuation disappoints, the
cash stays stuck in the deal.

### The 6-month rule — CONFIRMED as convention, not law
No statutory or FCA basis; it is lender policy. Still the mainstream default in 2026, but not
universal. The decisive question is which figure a lender uses for LTV: many sub-6-month lenders cap
at the **original purchase price**, which destroys the BRRR maths. A smaller group will use **current
market value** within 6 months where you evidence works done, or a genuine below-market reason
unrelated to condition (probate, repossession, distressed sale).
**UNCONFIRMED at lender level** — never rely on day-one market value without written criteria or a
broker DIP.

## Short-lease arbitrage — I got this wrong, and so has most of the internet

I previously suggested short-lease flats as the cleanest BMV route. **The key premise is false.**

**CONFIRMED** against HomeOwners Alliance and Homehold, mutually consistent:
- The Leasehold and Freehold Reform Act 2024 abolishes marriage value **on the statute book**, but
  **that provision is NOT in force. Marriage value remains payable in August 2026.**
- Numerous 2026 investor and auction blogs state it has been abolished. **They are wrong.**
- In force so far: two-year ownership rule abolished (Jan 2025); Right to Manage reforms (Mar 2025).
- **990-year extensions at zero ground rent: NOT commenced.**
- Freeholders' judicial review dismissed by the High Court (Oct 2025) — reforms survived, but that
  did not commence them.
- Valuation reforms need secondary legislation setting deferment and capitalisation rates.
  That consultation launched summer 2026 and **closes 23 September 2026**.
- A Commonhold and Leasehold Reform Bill was committed to in the May 2026 King's Speech; the £250
  ground rent cap is draft, not law.
- **Realistic commencement: 2027-28 at the earliest; Homehold says late 2028 at the very earliest.
  Treat any date as unreliable.**

Discount to long-lease equivalent (**PARTIAL**, valuer consensus, no authoritative dataset):
70-80 yrs **10-20%** · 60-70 yrs **20-35%** · 40-60 yrs **35-60%**.

**Trading implication:** the play is *not* "buy cheap because marriage value is gone". Buy a sub-80
flat and extend today and you pay marriage value in full. Hold waiting for commencement and you
carry the asset 2-4+ years while the lease shortens, and the new prescribed deferment and
capitalisation rates could move the premium **either way** — a higher deferment rate can offset the
marriage value saving. Uncertain in both direction and timing.

**But there is a real opportunity hiding in the error.** Most published 2026 content on this is
factually wrong. An authoritative leasehold resource that gets it right is exactly the kind of
correction-of-record that earns citations and authority, and it sits on the Tier 1 leasehold cluster
already found at KD 0-1.

## Defect discounts — which are curable

**Curable / priceable:** probate, no chain, repossession, genuine speed-motivated seller (no defect
at all, cleanest source) · short lease above ~55 years, subject to the marriage-value point above ·
cosmetic or heavy refurb where the property is unmortgageable only for want of a kitchen or bathroom
(a finance-access discount, the classic BRRR) · Japanese knotweed Category C, present without damage,
where a treatment plan and insurance-backed guarantee restore lendability · non-standard construction
of a *known lendable* type where a narrow lender panel exists.

**Value traps:** cladding / EWS1 and building-safety remediation — cost unknown until the scheme
lands, and exit depends on other people's timetables (watch item: a new RICS standard takes effect
**1 November 2026** narrowing when EWS1 must be requested, which may re-liquefy some flats) ·
active or unresolved subsidence · knotweed Category A with visible material damage · non-standard
construction with no lender panel at all, where the exit pool is as shallow as the entry pool ·
leases under ~40 years or with onerous/doubling ground rent · absent freeholder, insolvent management
company, or pending s.20 major works.

RICS explicitly refuses to publish standard percentage deductions for knotweed, so any circulating
percentage is a trade estimate, not a standard.

## Biggest open gaps
1. No credible like-for-like auction discount figure exists publicly.
2. No published enquiry-to-completion conversion data for cash buyers, from anyone.
3. Marriage value abolition timing is genuinely unknowable, and most web content asserts it has
   already happened.
4. Welsh LTT higher-rate bands need verifying at source.
5. Lender-level 6-month criteria need a broker DIP, not commentary.
