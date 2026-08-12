# Call brief: accounting firm, Friday 14 August 2026

Everything below is consistent with the published price sheet (`docs/price-sheet.html`, print to PDF before the call), the standard terms (`config/standard_terms.md`) and the proposal engine. Say anything on this page freely; it all matches the documents you can send afterwards.

## The story in 60 seconds

We run a portfolio of specialist UK tax and accounting information sites (property tax, landlords, contractors, charities, wills and probate, and more). Readers finish an article, need a professional, and ask us for one. Every enquiry is SMS and email verified before it is ever offered, and graded by the type of work it describes under a published rubric, never by what we guess the client is worth. Firms join a small partner pool free, get a redacted alert for each lead (tier, case type, area, one line of intent, price), and claim the ones they want. No subscriptions, no minimums, no contracts to get out of. You only ever pay for a lead you chose to take.

Operating name: **Ashfield Partner Network** (legal entity Ashfield Trading Ltd; the brands are trading names).

## The model (know this cold)

1. **Shared by default.** Up to 3 firms can claim each lead, first come, first served. Every firm in the pool sees every alert; the cap is on successful claims, not on who may try.
2. **The price is fixed at the first claim.** Whatever the lead's price was when the first firm claimed it, every later claimant pays the same. Nobody gets the same lead cheaper.
3. **Exclusive is a paid upgrade, at 3x.** Any lead that no firm has claimed yet can be claimed exclusively at 3 times its current price. That locks the lead: it is delivered to nobody else. The logic is simple to say out loud: the shared price assumes up to 3 firms, so exclusivity is buying out all three slots.
4. **The race decides, honestly.** Exclusivity is not a right of first refusal and there is no head start. If a shared claim lands first, exclusivity is gone for that lead and the firm that wanted it can still take a shared slot at the shared price. The 3x price is only ever charged when the exclusive claim actually wins.
5. **Credits come with exclusivity, and only with it.** Dead number, bounced email, enquiry materially different from the description: an exclusive claim gets a credit. Shared leads are a third of the price and sold as seen, because a "dead lead" claim cannot be verified fairly across three buyers. This is a selling point, not a catch: the firm chooses the protection level per lead.
6. **Unclaimed leads get cheaper, claimed leads never do.** A lead nobody claims re-offers at a last-call price after 24 hours and leaves the accounting pool after 48. Decay stops the moment anyone claims.

## Price card (published, per claimed lead)

| Tier | Typical work | Shared | Exclusive | Typical volume/mo* |
|---|---|---|---|---|
| Advisory | incorporation, restructuring, CGT/SDLT planning, non-resident, charity structure | £85 (last-call £55) | £255 | ~25 |
| Standard | landlord self assessment with complexity, SME accounts, compliance plus advice | £40 (last-call £25) | £120 | ~45 |
| Essential | straightforward returns, basic compliance | £15 (last-call £10) | £45 | ~20 |

\* Typical, not guaranteed. Never promise volumes on the call.

Anchor if asked "is £85 a lot?": an advisory lead is a single-digit percentage of typical first-year fees for that work, and the firm pays nothing for leads it does not claim.

## Terms highlights (all in the standard terms, quote freely)

- A billable lead is SMS and email verified with full contact details, a case description and a tier label, delivered in real time on claim. Enquirers who never respond to verification are never delivered and never charged.
- No volume commitments or minimums in either direction. Join free.
- Invoiced on the 1st of each month for the previous month's claims, collected by Direct Debit (mandate set up before the first claim, not at join).
- Leads are chargeable even if the enquirer has spoken to another adviser, unless they were formally engaged for that work before enquiring.
- "No response" credits (exclusive only) need evidence of 7 to 9 contact attempts over 14 days.

## Market context (where we sit vs what they may already use)

Researched 2026-08-12; sources in `docs/_engines/CLAIM_SYSTEM_AND_MARKET_NOTES_2026-08-12.md`.

- **Bark** (biggest UK generalist): prepaid credit packs (~£1.20 + VAT/credit), a lead costs roughly £7 to £40 to unlock, shared with up to 5 professionals, exclusivity only ~20% extra. Credits now expire after 3 months, non-refundable. Leads are not verified before sale; a widely cited test found only ~44% of purchased leads ever responded.
- **Unbiased** (accounting-specific): redacted enquiry lands in the dashboard, accept-to-purchase from £33 + VAT, details released on acceptance. Nearest model to ours.
- **US insurance/home-services ping sellers**: shared to 3 to 8 buyers, exclusive at a 2x to 4x premium.

Contrast lines that land:

- "Shared means three firms maximum, not five or eight."
- "You never prepay and nothing expires. No credit packs. You pay in arrears, by Direct Debit, only for what you claimed."
- "Every lead is SMS and email verified before you ever see it. The big marketplaces sell unverified enquiries and argue about refunds afterwards; we filter before the sale instead."
- On our 3x exclusivity vs Bark's 20%: their exclusivity is priced as an afterthought; ours is literally the price of buying out all three slots. A 20% premium tells you the exclusivity isn't real.

## Likely objections, answers

- **"Why would I pay for a lead two other firms also have?"** Because it costs a third of the exclusive price and speed decides these anyway; the firm that calls first usually wins the work. If you want certainty, take it exclusively, and you get the credit protection with it.
- **"What if the lead is junk?"** Three layers: it is verified by SMS and email before you ever see it, it is graded down whenever the case type is ambiguous (published rubric, checkable against any delivered lead), and on exclusive claims dead contact details or a mis-described enquiry earn a credit.
- **"Can I have first look before anyone else?"** No, and that is deliberate. Everyone gets the alert at the same moment and the race is honest. What you can have is the lock: claim exclusively before anyone else claims and the lead is yours alone.
- **"How many leads will I get?"** Whatever you choose to claim. Typical flow across the pool is on the price card, but nothing is promised and nothing is owed if you claim none.
- **"Who else is in the pool?"** Never name firms. "A small number of UK accounting firms; leads also go to non-competing professions like brokers and solicitors on a separate lane that never touches your slots."
- **"Do you share my details / the client's details?"** Enquirers consent to being referred to a firm from our partner network; each side is an independent data controller from delivery. The data sharing agreement pack exists and can be sent for their review.

## Do not

- Do not promise volumes, name other firms, or reveal which sites specific leads come from beyond the source shown on delivery.
- Do not negotiate prices live. If they push, the proposal engine supports per-tier overrides; say pricing flex can be reflected in a written proposal.
- Do not present the platform as fully automated. Truthful framing: delivery is real time, claims are handled by us in arrival order during onboarding ("concierge onboarding while we scale the self-serve claim links").

## After the call

- Their name and email is everything needed to generate a full branded proposal (live lead charts, statistical run-rate, their pricing) the same day: `python proposal_engine/generate_proposal.py --prospect <ref>` after copying `proposal_engine/prospects/example_prospect.py`.
- Send: price sheet PDF, standard terms (they are on the price sheet already), then the proposal.
- If they want in: firms.csv row, Direct Debit mandate before first claim, done.

## State of play (internal honesty, not for the call)

- The distribution engine is built and verified end to end but dry-run: pings, deliveries and invoices render locally; nothing sends email, GoCardless is stubbed, claim links do not exist yet. Manual operation via the runbook is fully workable for the first firms.
- The live Property pipeline still delivers each lead to a single firm; the pool bridge for the other sites is an open build item.
- The 20 lead-engine branches are merged locally on this line but not pushed; the Property SQL migration must be applied before the next Property deploy.
