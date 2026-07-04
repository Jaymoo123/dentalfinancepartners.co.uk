# DJH Lead Forwarding SOP + Delivery Log (Property)

*Created 2026-06-24 as Wave 0 of the Property process audit. Updated 2026-07-04 to reflect the current handover email. Purpose: make the manual DJH forward auditable so every billable lead is recorded, defensible, and easy to invoice on Tide. The manual review-then-forward step is a DELIBERATE quality gate and stays; this SOP just adds a record around it.*

## Why this exists
Under the executed Lead Generation & Data Sharing Agreement (2026-06-22), the **Delivery Log is the sole basis for invoicing** (clause 3.2) and the monthly **itemised Lead Statement** is drawn from it (clause 6.3). The Lead Fee (GBP 85/qualifying lead) is earned on **Delivery** (clause 5.2), i.e. when the lead is forwarded to DJH's Nominated Address.

## Current position (reconciled 2026-06-24, read-only)
- **38 Property leads all-time**; **1 since the 2026-06-22 go-live date** (Steve Mittler, 09:42, status `new`).
- **All existing leads were captured under the generic consent wording** (the DJH-named acknowledgement deployed later on 2026-06-22, and there have been no leads since). The live form now shows the correct DJH-named text.
- You have forwarded **3 leads** to DJH; **nothing invoiced yet**. Those 3 are among the historical 38 and were shown generic (non-DJH) consent wording. Note that against each in the log.

## Contactability gate (new, 2026-07-01)
DJH reported only 3 of the first 9 leads were contactable. We now run an automated **verify -> nurture -> contactability gate** on our side BEFORE any forward (see `docs/property/LEAD_NURTURE_SYSTEM.md`).

## The handover email

When a lead passes the contactability gate, **one email** arrives at `junayd@ashfieldtrading.com` with the subject **"New qualified enquiry: [name]"**. It contains the full evidence pack: verified phone and email (with verification status), how and when they responded, best call window, AI enrichment, their enquiry, on-site journey, and the conversation so far. There is no grading, no partner name, and no action button in the email (owner decision 2026-07-04). The earlier "READY FOR DJH: <name> is contactable" subject line is retired.

Annex A of the data-sharing agreement permits forwarding the lead's name, contact details and enquiry. The email contains more than that (journey, verification detail, conversation transcript), so trim before forwarding if you want to stay strictly within Annex A; that judgement sits with you at the forward step.

## The procedure (per lead)

1. **Receive** - wait for the **"New qualified enquiry: [name]"** email.
2. **Review (the QA gate)** - using the context in the email (verification, journey, enquiry), decide whether the lead qualifies to forward (name + contact + a genuine property-tax enquiry). If it does not qualify, log it as `qualifying=N`, `forwarded=no`, and stop.
3. **Forward** - forward to DJH's Nominated Address `Michael.Winniczuk@djh.co.uk`. Use a consistent subject: `PTP lead <YYYY-MM-DD> <ref>`.
4. **Record in Delivery Log** - add a row to the Delivery Log (see template) the same day: a reference, the capture date, enquirer name, qualifying Y/N, the forwarded timestamp, and DJH status. Retain the log **24 months**. (The in-system `forwarded` status has no email button any more; it can be set via the internal API route or a future console action, but the Delivery Log remains the invoicing source of truth.)
5. **Rejections** - DJH may reject a non-qualifying lead within **3 working days** (clause 5). If so, mark `djh_status=rejected` + reason and `billable=N`.
6. **Invoice (monthly, on Tide)** - count `billable=Y` rows for the period, multiply by GBP 85, and raise the Tide invoice with the per-lead breakdown (the itemised Lead Statement, clause 6.3). Record the invoice ref against each row. Payment terms are 14 days (clause 6); note the paid date so overdue sums are visible.
7. **Outcome loop (monthly, same sitting as the invoice)** - ask DJH for a one-line outcome per forwarded lead (reached? call held? became a client?) and record it in the Delivery Log as `djh_outcome`. This calibrates our contactability verdicts and gives early warning if our "contactable" decisions and DJH's reality drift apart.

## Data-protection rules for the log
- **Keep the filled-in log (with enquirer names/contacts) OUT of the git repo.** Maintain it in your own spreadsheet / Tide working area. The repo holds only the blank template (`DJH_DELIVERY_LOG_TEMPLATE.csv`), no PII.
- For any forwarded lead captured **before the 2026-06-22 transparency flip**, note `consent=generic-pre-DJH` in the row, since that enquirer was not shown the DJH-named notice.

## Open item to raise with DJH
- Provide your ICO registration reference for their file (clause 10.4) and obtain DJH's written clause-10.4 confirmation + their ICO reference (Z8075605) in return.
