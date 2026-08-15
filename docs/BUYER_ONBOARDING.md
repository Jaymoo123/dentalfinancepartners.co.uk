# Buyer onboarding runbook (pool/claim model)

*Rewritten 2026-08-14 for the claim-race model owner-locked on 12 to 13 August. Supersedes the 2026-08-10 version, which told you to deny exclusivity and slot counts; both are now published terms and you should quote them freely. The estate does not sign named partner firms into bespoke deals: firms join the Ashfield Partner Network on standing terms and claim leads from a shared pool.*

## Flow at a glance

1. Prospect firm expresses interest.
2. Send the price sheet and the combined agreement.
3. Proposal only where it helps close (engine-generated).
4. Firm signs and returns. **Record the signed date before the firm receives anything.**
5. Firm joins the pool (free). Nothing is payable on joining.
6. Insert the buyer row; record professions and tiers of interest.
7. Leads arrive as redacted alerts; full details on claim.
8. Claimed leads invoiced on the 1st, payable by bank transfer within 14 days.

## 1. Interest

A prospect firm gets in touch (referral, outreach reply, inbound). No qualification gate beyond being a genuine practising firm that is regulated or professionally qualified for the work it wants, since the pool model prices per claimed lead and a low-volume buyer costs us nothing.

## 2. What to send

Two documents:

- **`docs/PRICE_SHEET.md`**, the published price sheet, generated from `config/tiers.json`. Never hand-type prices into an email; send the sheet.
- **The combined agreement.** Build it: `python legal/build_agreement.py`, then `python legal/build_signing_docx.py` for the signing copy. It contains the commercial terms and the data sharing agreement in one document, so the firm signs once. You sign and date the Supplier block first; the firm completes only its own details block.

**No per-firm redrafting.** If a firm asks for redline changes, that is an owner decision, not an onboarding step. A price agreed differently from the published card goes in Schedule 1 paragraph 7 ("Agreed variations"), never into the body of the agreement.

Send the standalone `legal/DSA_TEMPLATE.md` as well only if the firm's solicitor wants to review the data protection layer on its own. It is the same text as Schedule 2, lifted verbatim by the build.

## 3. Proposal (only where warranted)

Most firms need only the price sheet. Where a proposal helps close (larger firm, formal procurement), use the proposal engine: create one prospect config in `proposal_engine/prospects/`, then run the engine. **Zero template edits per prospect.**

## 4. What you can say about the model

All of this is published, in the price sheet and the standard terms. Quote it freely.

- **Shared by default**: up to 3 accountancy firms may claim each lead, first come, first served. Every active firm gets the alert; the cap is on successful claims, not on who may try.
- **Price fixed at the first claim.** Nobody gets the same lead cheaper.
- **Exclusive is a paid upgrade at 3x**, available only while no firm has claimed. The race decides: if a shared claim lands first, exclusivity is gone for that lead and the 3x is never charged.
- **Credits come with exclusivity, and only with it.** Shared and raw leads are sold as seen.
- **The price never drops.** A lead holds its published price for as long as nobody claims it, so there is nothing to gain by waiting. After 48 hours fully unclaimed it leaves the accounting lane: a verified lead cascades to the adjacent lane, an unverified one becomes eligible for the raw batch. Cascade stops at the first claim, and a claimed lead never re-prices.
- **The adjacent lane**: the same lead may go to up to 3 non-accounting firms, separately. It never touches an accountancy firm's slots.

**Do not** name other firms in the pool, promise volumes, or negotiate price live.

## 5. Joining the pool

- Joining is free. No joining fee, no minimum volume, no volume promise from us.
- Nothing is payable on joining, and there is no Direct Debit mandate to chase. A firm pays only for the leads it claims, invoiced in arrears.
- Take the **billing contact and address** for invoices at this point, if it differs from the firm's main contact. Clause 2.3 lets you require this before accepting a first claim.

## 6. Buyer row, and the signed-agreement gate

Once the signed agreement is back:

- Insert the buyer row into `lead_buyers` via `scripts/offer_backfill.py --buyer ...`, and set `dsa_signed_at`.
- Record the firm's professions. This determines which lane it claims on, and a firm with no accounting profession can only ever claim on the adjacent lane.
- Record the tiers the firm says it wants. Tiers of interest are **informational only**: they steer which alerts we bother sending, they reserve nothing and restrict nothing.

**A firm must not receive an alert before its agreement is signed.** This is a condition of the LIA, not a preference. It is enforced in code on both engines: `matchingBuyers()` in `Property/web/src/lib/leads/offer-config.ts` filters on `dsa_signed_at`, `route.py` skips unsigned firms when it renders alerts, and `claim.py` rejects a claim outright. Setting `dsa_signed_at` is therefore the switch that starts a firm's alerts, so do not set it before the signed agreement is actually back.

## 7. Leads

- New leads go out to the pool as **redacted alerts**: tier, case type, rough area, one-line intent, price. No name, no contact details, no enquiry message.
- On claim, the full lead is delivered to the claiming firm.
- Handle claims strictly in arrival order. The race decides exclusivity, and a firm asking for exclusivity gets it only if its claim is the first to arrive.
- Fire the adjacent ping only once the accounting lane has been served, so the enquirer hears from their accountant first.

## 8. Billing

- Claimed leads are invoiced on the **1st of the month** for the prior month, payable by bank transfer within 14 days. Run `scripts/lead_offers_invoice.py`.
- Set `BANK_DETAILS` in `lead_engine/scripts/invoice_run.py` before the first real run. It is empty by default and the script refuses to render without it, so an invoice can never go out asking for a transfer without saying where to.
- Credit terms per `config/standard_terms.md`. Credits are exclusive-claim only, and a credit flagged on a shared row is ignored with a warning.

## Pricing reference

The published numbers live in `config/tiers.json` and render into `docs/PRICE_SHEET.md`. See `docs/LEAD_PRICING.md` for the full explanation, including the lanes, decay and bulk supply.

| Tier | Shared | Exclusive |
|---|---|---|
| Advisory | £85 | £255 |
| Standard | £40 | £120 |
| Essential | £15 | £45 |
| Adjacent lane (non-accounting professions) | £35 | n/a |
| Raw batch (unverified, bulk supply, one firm) | ~£5 per lead, £75 to £125 per batch | n/a |

## Notes

- The old named-partner flow is superseded; its record lives at `docs/property/ops/DJH_FORWARDING_SOP.md`.
- Some referenced scripts are built in parallel workstreams and may not exist in every checkout; the paths above are canonical.
