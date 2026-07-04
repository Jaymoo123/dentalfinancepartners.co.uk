# DJH Lead Forwarding SOP + Delivery Log (Property)

*Created 2026-06-24 as Wave 0 of the Property process audit. Updated 2026-07-04 to reflect the two-email handover system. Purpose: make the manual DJH forward auditable so every billable lead is recorded, defensible, and easy to invoice on Tide. The manual review-then-forward step is a DELIBERATE quality gate and stays; this SOP just adds a record around it.*

## Why this exists
Under the executed Lead Generation & Data Sharing Agreement (2026-06-22), the **Delivery Log is the sole basis for invoicing** (clause 3.2) and the monthly **itemised Lead Statement** is drawn from it (clause 6.3). The Lead Fee (GBP 85/qualifying lead) is earned on **Delivery** (clause 5.2), i.e. when the lead is forwarded to DJH's Nominated Address.

## Current position (reconciled 2026-06-24, read-only)
- **38 Property leads all-time**; **1 since the 2026-06-22 go-live date** (Steve Mittler, 09:42, status `new`).
- **All existing leads were captured under the generic consent wording** (the DJH-named acknowledgement deployed later on 2026-06-22, and there have been no leads since). The live form now shows the correct DJH-named text.
- You have forwarded **3 leads** to DJH; **nothing invoiced yet**. Those 3 are among the historical 38 and were shown generic (non-DJH) consent wording. Note that against each in the log.

## Contactability gate (new, 2026-07-01)
DJH reported only 3 of the first 9 leads were contactable. We now run an automated **verify -> nurture -> contactability gate** on our side BEFORE any forward (see `docs/property/LEAD_NURTURE_SYSTEM.md`).

## Two-email handover system

When a lead passes the contactability gate, **two separate emails** arrive at `junayd@ashfieldtrading.com`:

1. **"New qualified enquiry: [name]"** (the forwardable brief). This email contains only what Annex A of the data-sharing agreement permits to be forwarded: the lead's name, contact details, and their enquiry. Forward THIS email to DJH exactly as it arrives. Do not modify it. Do not add anything from the internal email below.

2. **"[Internal] [name]: log hand-over and context"** (the internal ops email). This email carries everything else: phone and email verification detail, on-site journey, AI enrichment, the conversation transcript, and the one-click "I have forwarded this to DJH" log button. **Never forward this email.** It is for your use only.

**Previously** a single "READY FOR DJH: <name> is contactable" email was sent. That subject line is now retired. The new subjects are as above.

## The procedure (per lead)

1. **Receive** - wait for the **"New qualified enquiry: [name]"** email. Also note the "[Internal]" companion email (do not forward it).
2. **Review (the QA gate)** - using the context from the internal email (verification, journey, enquiry), decide whether the lead qualifies to forward (name + contact + a genuine property-tax enquiry). If it does not qualify, log it as `qualifying=N`, `forwarded=no`, and stop.
3. **Forward** - forward the **"New qualified enquiry: [name]"** email AS-IS to DJH's Nominated Address `Michael.Winniczuk@djh.co.uk`. Use a consistent subject: `PTP lead <YYYY-MM-DD> <ref>`.
4. **Log the hand-over** - click "I have forwarded this to DJH" in the **internal** email. This records the hand-over in the system. Alternatively, log it via the estate console Lead page.
5. **Record in Delivery Log** - add a row to the Delivery Log (see template) the same day: a reference, the capture date, enquirer name, qualifying Y/N, the forwarded timestamp, and DJH status. Retain the log **24 months**.
6. **Rejections** - DJH may reject a non-qualifying lead within **3 working days** (clause 5). If so, mark `djh_status=rejected` + reason and `billable=N`.
7. **Invoice (monthly, on Tide)** - count `billable=Y` rows for the period, multiply by GBP 85, and raise the Tide invoice with the per-lead breakdown (the itemised Lead Statement, clause 6.3). Record the invoice ref against each row. Payment terms are 14 days (clause 6); note the paid date so overdue sums are visible.
8. **Outcome loop (monthly, same sitting as the invoice)** - ask DJH for a one-line outcome per forwarded lead (reached? call held? became a client?) and record it in the Delivery Log as `djh_outcome`. This calibrates our contactability verdicts and gives early warning if our "contactable" decisions and DJH's reality drift apart.

## Data-protection rules for the log
- **Keep the filled-in log (with enquirer names/contacts) OUT of the git repo.** Maintain it in your own spreadsheet / Tide working area. The repo holds only the blank template (`DJH_DELIVERY_LOG_TEMPLATE.csv`), no PII.
- For any forwarded lead captured **before the 2026-06-22 transparency flip**, note `consent=generic-pre-DJH` in the row, since that enquirer was not shown the DJH-named notice.

## Open item to raise with DJH
- Provide your ICO registration reference for their file (clause 10.4) and obtain DJH's written clause-10.4 confirmation + their ICO reference (Z8075605) in return.
