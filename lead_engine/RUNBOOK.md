# Runbook: daily 10 minutes, monthly 5 minutes

All commands run from the repo root. Everything is dry run: outputs are files in `lead_engine/outbox/` and `lead_engine/invoices/`, and anything that would send or charge prints a `[STUB] would ...` line.

## Daily (about 10 minutes)

1. **New enquiries in.** Add each new verified enquiry as a row in `lead_engine/data/leads.csv` (id, timestamp, source site, contact fields, message, verified + verified_at). Leave tier blank for now.

2. **Classify.** Grade each new enquiry with the rubric in `docs/CLASSIFY.md` (case type lists, grey-zone rule: when in doubt, grade down). Record the tier, case_type, intent_line and area on the lead row. The JSON shape the classifier returns is demonstrated by:
   ```
   python lead_engine/scripts/classify_stub.py --message "<enquiry text>"
   ```
   Trust the rubric, not the stub's keyword guess.

3. **Route.** For each newly classified, verified lead:
   ```
   python lead_engine/scripts/route.py <lead_id>
   ```
   Redacted pings for the whole active pool land in `outbox/`. Unverified enquiries are never routed; they wait for the raw batch.

4. **Claims arrive.** When a firm replies wanting a lead, in arrival order:
   ```
   python lead_engine/scripts/claim.py <lead_id> <firm_id>
   python lead_engine/scripts/claim.py <lead_id> <firm_id> --exclusive
   ```
   Process claims strictly in arrival order: the race decides exclusivity. A firm asking for exclusivity gets it (at 3x, lead locked) only if theirs is the first claim; if a shared claim landed first the script rejects the exclusive claim and quotes the shared slot instead; relay that to the firm. The cap, the lock and the fixed price are all enforced automatically, per lane: an adjacent claim (`--adjacent`, or any firm with no accounting profession) never consumes an accounting slot, is uncapped, and is unaffected by an exclusive accounting lock. Fire the adjacent ping (`route.py <lead> --lane adjacent`) only once the accounting lane has been served, so the enquirer hears from their accountant first.

5. **Decay check.** Once a day, last thing:
   ```
   python lead_engine/scripts/decay.py
   ```
   Only fully unclaimed leads cascade (a lead's price is fixed at its first claim, and the price never drops while it waits): past 48h they cascade to the adjacent lane (verified) or the raw batch (unverified). Follow up any `cascaded` lead with the adjacent-professions firms.

6. **Optional glance.**
   ```
   python lead_engine/scripts/stats.py
   ```

## Monthly (1st of the month)

1. Invoice the month just ended:
   ```
   python lead_engine/scripts/invoice_run.py YYYY-MM
   ```
   One invoice per firm appears in `lead_engine/invoices/YYYY-MM/`, credits netted as negative lines, rows marked invoiced. Invoices are payable by bank transfer within 14 days; sending them is a printed stub only. `BANK_DETAILS` in `invoice_run.py` must be set or the script refuses to render.
2. Eyeball each invoice HTML before anything ever goes out. Credits apply to exclusive claims only and need a reason that matches the standard terms in `config/standard_terms.md`; a credit flag on a shared row is ignored with a warning; fix the ledger row.

## When something changes

- Prices, decay timing, the claim cap or the exclusive multiplier: edit `config/tiers.json` (owner sign-off first), then re-run `python lead_engine/scripts/build_price_sheet.py` so the price sheet stays in step. Scripts read the config at runtime, nothing else to update.
- Standard terms: edit between the markers in `config/standard_terms.md`, re-run `build_price_sheet.py`. Delivery emails and invoices pick the change up automatically.
- New firm joins the pool: add a row to `lead_engine/data/firms.csv`. Leave `dsa_signed_date` empty until the signed agreement is back; alerts and claims are both blocked while it is empty.
