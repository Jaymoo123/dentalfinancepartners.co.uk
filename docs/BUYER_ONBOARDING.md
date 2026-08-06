# Buyer onboarding runbook

From "prospect replied" to "receiving monthly invoices". Prices and terms live in `docs/LEAD_PRICING.md`.

1. **Prospect replies to outreach.** Confirm firm name, contact, email, and which vertical(s) they want (`leads.source` values, e.g. `property`, `dentists`).

2. **Send proposal + DSA.**
   - Proposal: create `proposal_engine/prospects/<ref>.py` (copy `example_prospect.py`), then `python proposal_engine/generate_proposal.py --prospect <ref>`. Complete the mandatory manual message-redaction pass before sending.
   - DSA: render `legal/DSA_TEMPLATE.md` to PDF via `python legal/build_pdf.py` (Supplier pre-signed; commercial terms go in the email, not the DSA).
   - Send both.

3. **Signed DSA back → create the buyer row.** Run in Supabase SQL (fill placeholders):

   ```sql
   insert into public.lead_buyers (ref, firm_name, contact_name, email, sources, min_tier, dsa_signed_at, notes)
   values ('<short-ref>', '<Firm Name Ltd>', '<Contact Name>', '<contact@firm.co.uk>',
           array['<source>'], 'medium', '<YYYY-MM-DD>', '<anything useful>');
   ```

4. **Optional backlog offer.** Show the backlog with `python scripts/offer_backfill.py` (readout), then insert offers, for example:

   ```
   python scripts/offer_backfill.py --buyer <ref> --source <source> --since 2026-06-01 --min-tier medium
   ```

   This only writes ledger rows; sending happens via the web offer-send path.

5. **Verify with a test offer.** Offer one lead (`--lead-ids <id>`), walk the claim link end to end, confirm the row flips to `claimed`.

6. **Monthly invoicing.** Start of each month: `python scripts/lead_offers_invoice.py <prev YYYY-MM>`, apply any credits with `--credit OFFER_ID REASON`, invoice the net, 14-day terms.
