# Lead pricing — single source of truth

Status: **proposed, owner sign-off pending.** Scripts (`scripts/offer_backfill.py`) and proposals must use this card until it changes here.

## Price card

| Tier | Price per lead | What the tier means (est. first-year value to the buying firm) |
|---|---|---|
| Very High | £150 | £3,000+/yr recurring or £5,000+ one-off project |
| High | £85 | £1,000 to £3,000/yr recurring |
| Medium | £40 | £300 to £1,500 one-off or small recurring |
| Low | never sold | £0 to £100, no real engagement value; excluded from all offers |

Tiers come from `lead_value_scores.tier`, scored per lead (see `Property/web/src/lib/leads/value-score.ts` for the scoring definitions).

## Exclusivity and offer terms

- One buyer per lead. Each lead is offered exclusively; first accept wins (enforced at database level by a partial unique index on claimed offers).
- Fresh leads: 24 hour offer expiry.
- Backlog leads (historical, offered via `scripts/offer_backfill.py`): 72 hour expiry.
- Unclaimed offers expire and the lead can be re-offered elsewhere.

## Credit terms

Automatic credit within 3 working days on objective grounds: spam/bot, duplicate within 30 days, not a relevant enquiry for the category, dead contact details evidenced by 7 to 9 proven contact attempts over 14 days across phone, voicemail, SMS and email with a contact log. Leads billable on delivery, not conversion.

(Credit reasons in the ledger: `spam_bot`, `duplicate_30d`, `wrong_category`, `dead_contact`.)

## Invoicing

- Monthly in arrears, generated from the `lead_offers` ledger via `scripts/lead_offers_invoice.py YYYY-MM`.
- `price_gbp` is snapshotted on each offer row at offer time and is the sole source of truth for billing.
- Credits are shown as line items and netted off the monthly total.
- Payment terms: 14 days (per proposal precedent, `proposal_engine/config_prospect.py`).
