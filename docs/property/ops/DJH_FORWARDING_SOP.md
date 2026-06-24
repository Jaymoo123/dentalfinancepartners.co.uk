# DJH Lead Forwarding SOP + Delivery Log (Property)

*Created 2026-06-24 as Wave 0 of the Property process audit. Purpose: make the manual DJH forward auditable so every billable lead is recorded, defensible, and easy to invoice on Tide. The manual review-then-forward step is a DELIBERATE quality gate and stays; this SOP just adds a record around it.*

## Why this exists
Under the executed Lead Generation & Data Sharing Agreement (2026-06-22), the **Delivery Log is the sole basis for invoicing** (clause 3.2) and the monthly **itemised Lead Statement** is drawn from it (clause 6.3). The Lead Fee (GBP 85/qualifying lead) is earned on **Delivery** (clause 5.2), i.e. when the lead is forwarded to DJH's Nominated Address. Today there is no log, so invoices would be un-evidenced. This fixes that with zero code change.

## Current position (reconciled 2026-06-24, read-only)
- **38 Property leads all-time**; **1 since the 2026-06-22 go-live date** (Steve Mittler, 09:42, status `new`).
- **All existing leads were captured under the generic consent wording** (the DJH-named acknowledgement deployed later on 2026-06-22, and there have been no leads since). The live form now shows the correct DJH-named text.
- You have forwarded **3 leads** to DJH; **nothing invoiced yet**. Those 3 are among the historical 38 and were shown generic (non-DJH) consent wording. Note that against each in the log.

## The procedure (per lead)
1. **Receive** - a Property lead notification arrives at `junayd@ashfieldtrading.com` (Property leads are never auto-copied to DJH or Reflex; this is by design).
2. **Review (the QA gate)** - decide whether the lead qualifies to forward (name + contact + a genuine property-tax enquiry). This is your quality control over what DJH receives. If it does not qualify, log it as `qualifying=N`, `forwarded=no`, and stop.
3. **Forward** - forward the email to DJH's Nominated Address `Michael.Winniczuk@djh.co.uk`. Use a consistent subject: `PTP lead <YYYY-MM-DD> <ref>`.
4. **Record** - add a row to the Delivery Log (see template) the same day: a reference, the capture date, enquirer name, qualifying Y/N, the forwarded timestamp, and DJH status. Retain the log **24 months** (this is the agreement's carve-out from the 3-month enquiry-retention rule, so the log survives the eventual PII deletion).
5. **Rejections** - DJH may reject a non-qualifying lead within **3 working days** (clause 5). If so, mark `djh_status=rejected` + reason and `billable=N`.
6. **Invoice (monthly, on Tide)** - count `billable=Y` rows for the period, multiply by GBP 85, and raise the Tide invoice with the per-lead breakdown (the itemised Lead Statement, clause 6.3). Record the invoice ref against each row. Payment terms are 14 days (clause 6); note the paid date so overdue sums are visible.

## Data-protection rules for the log
- **Keep the filled-in log (with enquirer names/contacts) OUT of the git repo.** Maintain it in your own spreadsheet / Tide working area. The repo holds only the blank template (`DJH_DELIVERY_LOG_TEMPLATE.csv`), no PII.
- For any forwarded lead captured **before the 2026-06-22 transparency flip**, note `consent=generic-pre-DJH` in the row, since that enquirer was not shown the DJH-named notice. (Going forward, new leads carry the DJH acknowledgement automatically.)

## Open item to raise with DJH
- Provide your ICO registration reference for their file (clause 10.4) and obtain DJH's written clause-10.4 confirmation + their ICO reference (Z8075605) in return.
