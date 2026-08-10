# Lead pricing — single source of truth

Status: **case-type card, 2026-08.** Supersedes the value-tier card (very_high / high / medium at £150/£85/£40); see git history for the old card. Machine-readable copy: `config/tiers.json` (scripts, the price sheet and the proposal engine read that file; this document explains it).

Legacy mapping applied in code and data: `very_high → advisory`, `high → advisory`, `medium → standard`, `low → not sellable`. The internal value score (`lead_value_scores.tier`, `est_value_gbp`) remains an internal quality signal only; it never sets a price.

## How tiers are assigned

Tiers are assigned by case type under the published rubric in `docs/CLASSIFY.md`: graded on the work the enquiry describes, never on estimated client value; when in doubt, graded down; verification never inflates a tier; one rubric for every site and every buyer.

## Price card

| Tier | Price per claimed lead | Last-call price (unclaimed after 24h) | What is in it |
|---|---|---|---|
| Advisory | £85 | £55 | Incorporation, restructuring, CGT/SDLT planning, non-resident, charity/CIO, records reconstruction, multi-entity portfolios |
| Standard | £40 | £25 | Landlord self assessment with complexity, SME accounts, compliance mixed with advice |
| Essential | £15 | £10 | Straightforward returns, basic compliance |
| Adjacent | £35 | n/a | Any lead offered to non-competing professions (brokers, IFAs, solicitors, consultants); additive to the accounting sale |
| Raw | ~£5 per lead, sold in monthly batches of £75 to £125 | n/a | Unverified after the 7-day nurture window; sold as seen, no credits |

Decay: unclaimed after 24 hours, re-offered at the last-call price; after 48 hours, cascaded to the adjacent lane or the raw batch. All figures in `config/tiers.json`.

## Delivery and offer terms

- Leads are offered to the buyer pool as redacted alerts (tier, case type, area, one-line intent, price) and delivered in full on claim.
- Claim slots per lead are limited (`claim_slots_per_lead` in `config/tiers.json`). The current live pipeline delivers one claim per lead; buyer-facing documents state neither an exclusivity promise nor a slot count.
- Firms join the pool free, with no volume commitments or caps either way. A Direct Debit mandate is required before a firm's first claim, not at join.

## Credit terms

Per the standard terms (`config/standard_terms.md`, reproduced verbatim on the price sheet, delivery footers and invoices): credits, never refunds, only for dead or unreachable contact details or an enquiry materially different from its description; "no response" credits require evidence of 7 to 9 contact attempts over 14 days; leads remain chargeable if the enquirer has spoken with another adviser unless formally engaged before enquiring; Raw is sold as seen.

(Credit reasons in the ledger: `spam_bot`, `duplicate_30d`, `wrong_category`, `dead_contact`.)

## Invoicing

- Claimed leads are invoiced on the 1st of each month, monthly in arrears, collected by Direct Debit. Delivery pauses on failed payment or invoices 14 or more days overdue.
- `price_gbp` is snapshotted on each offer row at offer time and is the sole source of truth for billing.
- Credits are shown as negative line items and netted off the monthly total.
- Ledger pivot: `scripts/lead_offers_invoice.py YYYY-MM` (live pipeline) and `lead_engine/scripts/invoice_run.py` (dry-run engine).
