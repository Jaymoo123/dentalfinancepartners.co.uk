# Pre-trading expense reconciliation

Goal: find every business-related cost paid from personal money over the years
(software subscriptions, tools, ad spend, domains, lead lists, one-off purchases),
match each one to whatever evidence exists, and produce a clean, entity-neutral
ledger that lets the owner (a) reimburse himself from the business and (b) offset
allowable costs against tax — with DJH Business Advisers confirming the final
allocation and deductibility.

> This is a personal-finance / tax working set. **No financial data in git.**
> `data/` (raw exports) and `output/` (generated ledgers) are gitignored. Only the
> code and this plan are ever committed, and only when the owner asks.

---

## Two different things (don't conflate them)

1. **Reimbursement** — the business paying back cash the owner fronted personally.
   A balance-sheet movement (director's loan / capital introduced), **tax-neutral
   to the owner**. Allowed for any genuine business cost he actually paid.
2. **Tax deduction** — reducing the business's taxable profit. Needs the cost to be
   *allowable* (wholly & exclusively for the business) **and** evidenced.

Every payment gets flagged for both, separately.

## Accounting frame (general — DJH confirms specifics)

- Taxed on **profit, not revenue**: allowable costs come off before tax.
- **Pre-trading expenses**: costs incurred wholly & exclusively for the business in
  the **7 years before trading started** are treated as incurred on day one of
  trading. So old spend counts — subject to the 7-year cap and business-use %.
- Entity is **both / not sure** (sole trade and/or Ashfield Trading Ltd). The ledger
  stays entity-neutral; DJH allocates each line. The company is newly formed, so most
  of this is *pre-incorporation* spend → reimburse via director's loan, deductibility
  needs DJH sign-off.
- **Not VAT registered** → this is not a VAT-reclaim exercise, so the evidence bar is
  lower: reasonable proof a cost was incurred for the business (statement line + vendor
  confirmation) is generally enough for a deduction. Proper invoices are still cleaner;
  grab them where a vendor portal offers them.

---

## The mess, and why it's tractable

Payments span **PayPal, personal bank, AMEX** (and possibly others). Receipts span
**Outlook, Gmail, and several old inboxes**. Statements are only partial/recent.

No single source is complete — so we never rely on one. Every payment source exports
a clean CSV, and a forgotten subscription only has to appear in **one** source for us
to catch it. We start with the money (payment spines), then attach evidence.

## Architecture — 4 layers

### Layer 1 — Payment spines ("what actually left my accounts")
Clean CSV exports = the discovery engine.
- **PayPal** transaction history (routes most SaaS/subscriptions).
- **AMEX** transactions.
- **Personal bank** (the partial statements available).
- Merge → one master "money out" ledger, tagged by source.
- **Dedupe double-counts**: a PayPal payment funded by an AMEX/bank pull appears twice;
  collapse to one real expense so totals don't inflate.

### Layer 2 — Evidence (emails)
- Export each mailbox locally: Outlook → `.pst`, Gmail → `.mbox`.
- Parse locally; AI extracts per receipt: vendor, date, amount, currency, invoice no.,
  recurring vs one-off, and **valid invoice vs mere card-charge notification**.

### Layer 3 — Reconcile
Match each payment-spine line to an email receipt by vendor + amount + date proximity.
Each line resolves to one of:
- ✅ **matched to a valid invoice** → reimburse + likely deductible.
- 🟡 **receipt / notification only** → evidence-lite (OK for non-VAT-registered; DJH ticks).
- 🔴 **no evidence found** → *"invoice needed — download from [vendor] billing portal."*

### Layer 4 — Output ledger (for DJH)
Google Sheet (reuse existing leads→Sheets sync) with:
`date | vendor | gross | currency | source | category | recurring? | business-use % |
evidence link | evidence type | reimbursable? | tax-deductible (DJH) | entity (DJH) | notes`
Plus per-year and per-vendor totals, and the 🔴 "invoices to chase" worklist.

## Model tiering (per estate rules)
- **Haiku 4.5** — bulk receipt extraction (high volume, cheap, structured).
- **Sonnet** — ambiguous receipts, categorisation edge cases.
- **Opus** — reconciliation judgement calls, final ledger QA.
All through a deterministic parse → extract → reconcile pipeline.

## What's automatable vs human
- **~80–90% automated**: discover, extract, categorise, total, dedupe, flag gaps.
- **Human / DJH**: logging into vendor portals for missing invoices, adjudicating
  business-use %, final allocation and sign-off.

---

## Workflow / status
1. **[owner]** Export PayPal + AMEX transaction CSVs → drop in `data/`. *(start here)*
2. Build spine normalizers against the real files → first draft "money out" ledger.
3. **[owner]** Export bank CSV(s) + each mailbox (`.pst` / `.mbox`) → `data/`.
4. Build email parser + AI extractor; reconcile; produce Layer-4 ledger + chase list.
5. **[owner + DJH]** Chase 🔴 invoices; DJH allocates entity + confirms deductibility.

See `data/README.md` for exact per-source export steps.
