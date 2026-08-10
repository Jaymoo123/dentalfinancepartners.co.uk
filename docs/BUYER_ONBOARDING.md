# Buyer onboarding runbook (pool model)

*Rewritten 2026-08-10 for the anonymous pool/claim model. The estate no longer signs named partner firms into bespoke deals; buyer firms join the Ashfield Partner Network (operated by Ashfield Trading Ltd) on standing terms and claim leads from a shared pool. There is no exclusivity, no slot count, and no volume commitment in either direction.*

## Flow at a glance

1. Prospect firm expresses interest.
2. Send price sheet + standing DSA.
3. Proposal only where warranted (engine-generated).
4. Firm joins the pool (free). Direct Debit mandate before FIRST claim, not at join.
5. Insert the buyer row; record tiers of interest.
6. Leads arrive as redacted alerts; full details on claim.
7. Claimed leads invoiced monthly on the 1st by Direct Debit.

## 1. Interest

A prospect firm gets in touch (referral, outreach reply, inbound). No qualification gate beyond being a genuine practising firm; the pool model prices per claimed lead, so a low-volume buyer costs us nothing.

## 2. Price sheet + standing DSA

Send two documents, unmodified:

- `docs/PRICE_SHEET.md`, the published price sheet. It is generated from `config/tiers.json`; never hand-edit prices into an email, send the sheet.
- `legal/DSA_TEMPLATE.md`, the standing Lead Generation & Data Sharing Agreement. The firm completes its own Details Block and signs. **No per-firm redrafting.** If a firm asks for redline changes, that is an owner decision, not an onboarding step.

## 3. Proposal (only where warranted)

Most firms need only the price sheet. Where a proposal helps close (larger firm, formal procurement), use the proposal engine:

- Create one prospect config in `proposal_engine/prospects/`.
- Run the engine. **Zero template edits per prospect.**

## 4. Joining the pool

- Joining is free. No joining fee, no minimum volume, no volume promise from us.
- A Direct Debit mandate (GoCardless) is required **before the firm's first claim**, not at join. A firm can sit in the pool receiving redacted alerts with no mandate in place; the first claim is blocked until the mandate exists. This is currently a stub/manual check, chase the mandate by email and record it by hand until the GoCardless integration lands.

## 5. Buyer row + tiers of interest

Once the signed DSA is back:

- Insert the buyer row into `lead_buyers` via `scripts/offer_backfill.py --buyer ...`.
- Record the tiers the firm says it wants. Tiers of interest are **informational only**, they steer which alerts we bother sending, they do not reserve anything and do not restrict what the firm may claim.

## 6. Leads

- New leads go out to the pool as **redacted alerts** (case type, tier, region-level signal; no name, no contact details).
- On claim, the full lead is delivered to the claiming firm.
- No exclusivity promise and no slot counts. Do not imply either in any buyer-facing message.

## 7. Billing

- Claimed leads are invoiced on the **1st of the month** for the prior month, collected by Direct Debit. Run: `scripts/lead_offers_invoice.py`.
- Credit terms per `config/standard_terms.md`.

## Pricing reference

Case-type tiers (per `docs/LEAD_PRICING.md`; the published numbers live in `config/tiers.json` and render into `docs/PRICE_SHEET.md`):

| Tier | Price per claimed lead |
|---|---|
| Advisory | £85 |
| Standard | £40 |
| Essential | £15 |
| Adjacent lane (raw batch) | £35 |

## Notes

- Some referenced files are built in parallel workstreams and may not exist in every checkout yet; the paths above are canonical.
- The old named-partner flow (bespoke DJH-era forwarding) is superseded; its record lives at `docs/property/ops/DJH_FORWARDING_SOP.md`.
