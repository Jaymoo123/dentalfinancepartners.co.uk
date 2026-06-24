# Property Continuity & Recovery Record

*Created 2026-06-24 (Wave 0 of the process audit). Single source of truth for "what would we need to keep lead income running if something failed." Update this when any of it changes; do not let it go stale.*

## Code durability (risk C)
- Live prod is built from local branch `console-kpi-windows-carousel` (55 commits ahead of `origin/main`).
- **2026-06-24: pushed to `origin/backup/prod-state-2026-06-24` (tip `9754341b`)** so the live source is no longer laptop-only.
- NOT yet in any remote: working-tree changes left behind = `optimisation_engine/config.py` (modified) + untracked tooling (`scripts/_mp_*`, `scripts/seranking/`, `optimisation_engine/clients/seranking_client.py`, `legal/*.bak-2026-06-22`, `_audit_digest.txt`). None are part of the deployed site bundle. Decide whether to commit/stash these (Wave 2).
- TODO (Wave 2): merge to `main` after reviewing the 55 commits; adopt "deploy only from pushed `main` HEAD" + tag each prod deploy; add a second git mirror.

## Database backups (risk J)
- Project ref `dhlxwmvmkrfnmcgjbntk` (display name "Trades-Quotes" in Supabase, region eu-north-1, ACTIVE_HEALTHY) - this IS the live lead/billing/consent DB.
- **PITR: OFF.** WAL-G physical backups: ENABLED (paid-tier daily physical backups), but the API returned 0 listed daily backups, so **confirm the exact retention window in the Supabase dashboard**.
- **2026-06-24: manual off-platform snapshot taken** -> `C:\Users\user\Documents\PTP-db-backups\snapshot_2026-06-24\` (leads 48 rows, lead_enrichment 0, subscribers 1). Contains PII; **copy to secure cloud storage**.
- TODO (Wave 2): enable PITR for the billing/consent system of record (small add-on); schedule a periodic off-platform dump; run one restore drill into the staging project; record RTO/RPO.

## Domain (risk K - owner-confirmed mitigated)
- `propertytaxpartners.co.uk` - auto-renew confirmed ON (2026-06-24), so silent expiry is no longer the catastrophic risk.
- TODO (record here): registrar = ____; account login owner = ____; exact expiry date = ____; registrar transfer-lock = on/off; reminders set 60 + 14 days before expiry.

## ICO registration (risk G - owner-confirmed done)
- Ashfield Trading Ltd is ICO-registered + fee paid (confirmed 2026-06-24). Lawful-Delivery pre-condition (agreement clause 10.2) satisfied.
- TODO (record here): Ashfield ICO reference = ____ (give to DJH per clause 10.4); DJH ICO reference = Z8075605; obtain DJH's written clause-10.4 confirmation for the file.

## Single-operator / vendor facts
- Property lead notifications -> `junayd@ashfieldtrading.com` (no auto-CC to any vendor). DJH delivery is a manual forward to `Michael.Winniczuk@djh.co.uk` (deliberate QA gate). Other 5 sites auto-CC Reflex (`ahmadtirmizey@reflexaccounting.co.uk`).
- All six sites' lead emails route through the single Property Vercel deploy (shared infra).

## Owner-only items still open
- **Supabase daily-backup retention window** - confirm in dashboard.
- **VAT position** - rolling 12-month turnover vs the GBP 90k threshold (Ashfield not VAT-registered).
- **Cyber insurance** - any cover beyond Hiscox PI GBP 100k for a PII breach?
