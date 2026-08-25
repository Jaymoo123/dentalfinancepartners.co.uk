# Claim system design + market research notes (2026-08-12)

Working notes from the exclusivity-model session. Direction is settled (below); the rung-3 build is parked for when volume justifies it.

## Direction (settled 2026-08-12)

**Now (first firms, incl. the 2026-08-14 prospect): rung 1/2 concierge claims.** Firms reply to the ping email to claim ("CLAIM" / "CLAIM EXCLUSIVE", optionally pre-filled mailto buttons). We process replies in strict arrival order with `lead_engine/scripts/claim.py`, which enforces the race, the cap, the lock and the fixed price, and send the delivery email it renders. Email timestamps are the arrival order of record.

**Later (when manual claims cost real time or ordering disputes appear): rung 3, the industry-standard claim link.** One dynamic route + one claims table, built once; the page fills itself from the database per token, no per-lead page exists. Nothing from rungs 1/2 is thrown away; only the claim intake changes.

## The claim ladder

1. **Reply-to-claim** (zero build): ping says "Reply CLAIM to take this lead". Fine at concierge volume.
2. **Mailto buttons** (ten minutes): ping buttons pre-fill "CLAIM L123 SHARED" / "CLAIM L123 EXCLUSIVE". One click for the firm, structured text for us.
3. **Signed claim link + confirm page** (~a day): per-firm-per-lead unguessable token in the ping button, opens a confirm page (redacted summary, price, basis, terms), confirm button fires the claim atomically server-side (Supabase transaction: reject if locked / at cap; lock if exclusive-and-first), page then shows full details and the delivery email goes out. `{{CLAIM_URL}}` in the ping templates is the reserved slot.

### Rung-3 design constraints (learned, do not lose)

- **Never claim on GET.** Corporate email scanners (Outlook SafeLinks etc.) prefetch every link in an email and would claim leads automatically. The link renders the confirm page only; the claim is the POST from the confirm button. This is the classic bug in claim-by-email systems.
- **No PINs, no in-email entry.** Email clients strip forms/JS; interactive email (AMP) is Gmail-only and needs sender registration. A PIN in the same email as its entry box authenticates nothing; the tokenised link is the credential (standard magic-link practice). A reply from the firm's own mailbox gives the same proof at rung 1.
- **Redaction stays structural.** Ping templates have no fields for contact details or the raw message, so nothing can leak; the classifier's one-line intent summary is the anonymised view. Never regex-redact the real message for pings.
- **Atomicity is the whole point.** Claim ordering must be one SQL statement / transaction so the race is millisecond-exact and self-resolving. Port the logic from `claim.py`, don't reimplement.
- Tokens encode (lead, firm); forwarding risk is acceptable, liability sits with the firm, and per-firm tokens preserve the audit trail.

## Competitor research (2026-08-12)

- **Bark** (UK generalist marketplace): prepaid credits ~£1.20 + VAT; a lead costs 5-20 credits (~£7-£40) to unlock; shared with up to 5 pros; exclusive ~+20% credits; credits bought after Nov 2025 expire in 3 months, non-refundable; leads unverified before sale (one cited test: ~44% of bought leads ever responded); realistic all-in cost £50-£150+ per won job.
- **Unbiased** (accounting-specific): auto-matched redacted enquiry in dashboard, accept-to-purchase from £33 + VAT for accounting, price + estimated value shown before acceptance, details released on purchase. Subscription-led. Nearest mechanic to ours.
- **US insurance / home-services ping-post**: shared leads sold to 3-8 buyers ($3-$20); exclusive at 2x-4x premium ($20-$50); exclusive converts 2-3x better.

**Read-across:** the accept-to-reveal claim mechanic is universal (nobody uses PINs); our cap of 3 is tighter than the market; 3x exclusivity sits inside the insurance 2x-4x band and, unlike Bark's 20%, has a stated rationale (buying out all three slots); pay-per-claim in arrears with no prepaid credits and no expiry is a genuine differentiator; credits-on-exclusive-only is non-standard, defended by the pre-sale verification gate (competitors sell unverified and refund after the fight).

Sources: nobleleads.uk/blog/how-much-do-bark-credits-cost · whito.co.uk/tools/bark-cost-uk · baadigi.com/compare/bark-vs-baadigi · unbiased.co.uk/pro/how-it-works/lead-generation-for-accountants-and-bookkeepers-accounting-leads · knowledge.unbiased.co.uk/enquiry-pricing-1 · leaddistro.ai/blog/exclusive-vs-shared-leads · agents.smartfinancial.com/resource/shared-leads-vs-exclusive-leads
