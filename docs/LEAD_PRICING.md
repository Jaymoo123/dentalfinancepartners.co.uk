# Lead pricing, single source of truth

Status: **case-type card, 2026-08.** Supersedes the value-tier card (very_high / high / medium at £150/£85/£40); see git history for the old card. Machine-readable copy: `config/tiers.json` (scripts, the price sheet and the proposal engine read that file; this document explains it).

Legacy mapping applied in code and data: `very_high → advisory`, `high → advisory`, `medium → standard`, `low → not sellable`. The internal value score (`lead_value_scores.tier`, `est_value_gbp`) remains an internal quality signal only; it never sets a price.

## How tiers are assigned

Tiers are assigned by case type under the published rubric in `docs/CLASSIFY.md`: graded on the work the enquiry describes, never on estimated client value; when in doubt, graded down; verification never inflates a tier; one rubric for every site and every buyer.

## Price card

| Tier | Price per claimed lead | What is in it |
|---|---|---|
| Advisory | £85 | Incorporation, restructuring, CGT/SDLT planning, non-resident, charity/CIO, records reconstruction, multi-entity portfolios |
| Standard | £40 | Landlord self assessment with complexity, SME accounts, compliance mixed with advice |
| Essential | £15 | Straightforward returns, basic compliance |
| Adjacent | £35 | Any lead offered to non-accounting professions (brokers, IFAs, solicitors, consultants); additive to the accounting sale, in its own lane, capped at 3 (see below) |
| Raw | ~£5 per lead, sold in monthly batches of £75 to £125 | Unverified after the 7-day nurture window; sold as seen, no credits. **Bulk Supply, not a Referral**: supplied whole to one firm with no alert, claim or acceptance step, so the claim caps, decay, exclusivity and lane rules do not apply (see below) |

Cascade: a lead holds its published price for as long as it is unclaimed. There is no last-call reprice (removed by owner decision 2026-08-14: a discount for waiting was not worth the extra state, and a firm should decide on the enquiry rather than on the price falling). After 48 hours fully unclaimed, a verified lead cascades to the adjacent lane and an unverified one becomes eligible for the raw batch. Cascade stops at the first claim, and a partially claimed lead never cascades. All figures in `config/tiers.json`.

## Lanes: accounting and adjacent (owner-locked 2026-08-13, capped 2026-08-14)

Claims run in two **independent lanes**, so the same enquiry earns on both at once.

- **Accounting lane.** Capped at `claim_slots_per_lead` (3). Everything in the next section (shared claims, exclusivity, the price-fixed-at-first-claim rule) and the cascade rule apply here and only here.
- **Adjacent lane.** Additive: an adjacent claim never consumes an accounting slot, and an accounting exclusive lock closes the accounting lane only. `adjacent_claim_slots_per_lead` is **3** (owner decision 2026-08-14, replacing the uncapped setting of 2026-08-13), so at most 3 non-accounting firms may claim the same lead and the enquirer chooses between them.
- **The caps are a compliance control, not a commercial preference.** Together they bound the number of firms that can receive one enquirer's details at **6**, and the legitimate interests assessment balances against exactly that number. Raising either cap, or setting the adjacent lane back to `null`, requires the LIA balancing test to be redone first. `lead_engine/scripts/test_lanes.py` fails if the adjacent lane is uncapped.
- **Sequencing.** The adjacent ping is fired only after the accounting lane has been served (`route.py <lead> --lane adjacent`), so the enquirer hears from their accountant first. The adjacent ping never touches the decay clock.
- A firm's lane comes from its `professions`: a firm with no accounting profession can only ever claim adjacent; a firm that does both defaults to accounting and claims adjacent with `--adjacent`.

Buyer-facing consequence, stated on the price sheet: "up to 3 firms" and "locked to your firm" describe the accountancy lane. An exclusive accounting claim does not prevent the enquiry being offered to non-competing professions.

## Shared and exclusive claims, accounting lane (owner-locked 2026-08-12)

- Leads are **shared by default**: up to `claim_slots_per_lead` (3) firms may claim each lead, first come, first served. The redacted ping goes to the whole pool; there is no cap on who may attempt a claim, only on how many claims succeed.
- A lead's **price is fixed at its first claim**. Every firm claiming that lead pays the same price.
- Any lead **not yet claimed** may be claimed **exclusively at `exclusive_multiplier` (3x) the current price**. An exclusive claim locks the lead: it is delivered to no one else and all slots are consumed. Rationale (stated in the terms): the shared price assumes up to 3 firms, so exclusivity is priced as buying out all three slots.
- The **race decides**. If a shared claim lands first, exclusivity is gone for that lead; the would-be exclusive firm is offered a shared slot at the shared price instead, with no premium and no credit. The 3x price is only ever charged when the exclusive claim wins.

## Raw batch: Bulk Supply, not a Referral

The Raw tier is structurally different from every other tier and the legal pack treats it as a separate act.

- **What it is.** Enquiries that were never verified, offered whole as a monthly batch after the 7-day nurture window closes, at roughly £5 per lead (£75 to £125 per batch).
- **No acceptance step.** There is no redacted alert, no per-enquiry claim and no per-enquiry decision by the buyer. Every other tier is a Referral precisely because the receiving firm accepts that enquiry first; a batch is supplied as a whole.
- **One recipient per batch** (`recipients_per_batch: 1`). The claim caps, decay, exclusivity and lane rules do not apply to it.
- **Sold as seen**, no credits, per the standard terms.
- Because it has no acceptance step, the DSA defines **Bulk Supply** separately from Referral, and the LIA assesses it as its own processing activity with its own necessity and balancing analysis. Do not describe a raw batch as a Referral in any document.

## Delivery and offer terms

- Leads are offered to the buyer pool as redacted alerts: tier, case type, area, one-line intent, shared and exclusive price, and the enquiry in the enquirer's own words with names, phone numbers, email addresses, postcodes, links and company names stripped. The unredacted enquiry and the contact details are delivered only on claim.
- The shared/exclusive model above is now stated openly in buyer-facing documents (supersedes the 2026-08-10 neutral wording). The live Property pipeline still delivers each lead to a single firm until the pool goes live; the dry-run engine implements the full model.
- Firms join the pool free, with no volume commitments or caps either way. Nothing is payable on joining: a firm pays only for the leads it claims, in arrears.

## Credit terms

Per the standard terms (`config/standard_terms.md`, reproduced verbatim on the price sheet, delivery footers and invoices): credits, never refunds, **apply to exclusive claims only**; shared and Raw leads are sold as seen. A shared lead goes to multiple firms at a lower price, so a "dead lead" claim is neither verifiable nor refundable across several buyers; the credit protection is part of what the 3x exclusive price buys. Grounds are unchanged: dead or unreachable contact details or an enquiry materially different from its description; "no response" credits require evidence of 7 to 9 contact attempts over 14 days; leads remain chargeable if the enquirer has spoken with another adviser unless formally engaged before enquiring.

(Credit reasons in the ledger: `spam_bot`, `duplicate_30d`, `wrong_category`, `dead_contact`.)

## Invoicing

- Claimed leads are invoiced on the 1st of each month, monthly in arrears, payable by bank transfer within 14 days of the invoice date. Delivery pauses on invoices 14 or more days overdue.
- `price_gbp` is snapshotted on each offer row at offer time and is the sole source of truth for billing.
- Credits are shown as negative line items and netted off the monthly total.
- Ledger pivot: `scripts/lead_offers_invoice.py YYYY-MM` (live pipeline) and `lead_engine/scripts/invoice_run.py` (dry-run engine).
