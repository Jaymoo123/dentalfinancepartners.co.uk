# Questions / Open Items to Finish the Draft

*Most things are now settled and in the draft. This lists what's confirmed, then the handful of genuinely open items. Items marked ★ matter most. Not legal advice.*

## Confirmed and now in the draft
- **Supplier = Ashfield Trading Limited** (company 16358723, Active, inc. 1 April 2025), registered office **20 Ashfield Avenue, Shipley, BD18 3AL**, trading as Property Tax Partners. Sole director **Mohammed Junayd Moughal** set as signatory. **Not VAT registered.** (All verified on Companies House; confirm the signatory and VAT.)
- **Client = DJH Business Advisers Limited** (03451690) - confirmed as the receiving controller. It is itself ICO-registered: **Z8075605** (Tier 2). DP contact **GRC@djh.co.uk / Suzy Dawson-Newbury**. Privacy policy **https://www.djh.co.uk/privacy-policy/**. (All found on public registers.)
- **Price: flat £85 per lead** (you dropped the lower tier; no-message leads are charged £85 too).
- **Billing: monthly** (invoice at the start of each month), **paid within 14 days**.
- **Cancellation notice: 5 days** (each way).
- **Lawful basis: legitimate interests** (decided - see below).
- **Liability: mutual cap** (greater of £10,000 or 12 months' fees); **data-protection super-cap £100,000**; **insurance £100,000 PI** (your figure).
- **Hand-off clause (8.5):** DJH owns the data once it reaches its inbox.

## A. Open items on your side
1. **★ ICO registration - you almost certainly need to do this.** I searched the ICO register: **Ashfield Trading Limited does not appear to be registered** (nothing under the company name, number, your name, "Property Tax Partners", or postcode BD18 3AL; other firms' entries do show up, so the gap looks real). The ICO site blocked the automated check, so please **confirm in a browser**: https://ico.org.uk/ESDWebPages/Search → search postcode **BD18 3AL**. If nothing comes up, **register and pay the data protection fee** (~£40-£60) at https://ico.org.uk/for-organisations/data-protection-fee/. As a lead-gen business handling personal data you are legally required to, and the contract requires it **before the first lead is delivered** (clause 10.2). (DJH's is confirmed: Z8075605.)
2. **Supplier notices email** for the contract (Schedule 1 §17)?
3. **Bank/payment details** for invoices, or keep "as set out on each invoice" (Schedule 1 §9)?
4. **Confirm:** Mohammed Junayd Moughal (Director) signs for Ashfield Trading, and Ashfield Trading is **not** VAT registered. (Both assumed from the public record / your estate notes.)
5. **★ Check your insurance:** you have **£100k professional indemnity**. Two things: (a) does that policy actually cover **data-protection / data-breach** claims? Many PI policies exclude them - if so, the £100k data cap is largely uninsured and **cyber cover** is the real gap. (b) "PI" = professional indemnity, **not personal injury** (you were right that personal injury isn't a risk here; it's just standard boilerplate in clause 11.2).

## B. Data protection (mostly handled; your actions flagged)
6. **★ Lawful basis - decided, you don't need to choose.** The draft uses **legitimate interests** (the enquirer asked to be put in touch with a specialist, so sharing with DJH to do that is allowed). Your solicitor just confirms it at review. You only need to be comfortable with it.
7. **★ Flip the partner config before go-live:** set DJH as the partner firm in `Property/niche.config.json` (with DJH's privacy-policy URL). That auto-switches every form to wording that names DJH and discloses the share. I have **not** done this (deal unsigned). **One tweak:** because the basis is legitimate interests, present that line as an **acknowledgement** ("by submitting, your details will be shared with DJH...") rather than a tick-to-agree box (Annex B.2 has the wording). Or keep the tick-box and we use "consent" as the basis instead - your call.
8. **DJH's own privacy policy** is DJH's responsibility (you can't edit it). The contract makes DJH serve its own Art 14 notice and (ideally) add a "we receive leads from a partner website" line. Just flag it to DJH; nothing for you to draft.
9. **Confirm the exact lead fields** (name, email, phone, message - per your form). Anything else?
10. **Retention:** OK to delete/anonymise delivered leads after **12 months**? (Your site has an `enquiryRetentionMonths` setting - give me the number to match.)
11. **How are leads sent to DJH** - secure API/portal, or email? Schedule 2 wants encrypted transmission; if it's plain email today, we should change it.
12. **Supplier data protection contact** (you, or someone else) for Schedule 1 §17.

## C. Commercial (quick confirms)
13. **Commencement date** / expected sign date?
14. **DJH's delivery inbox** (the email/endpoint leads go to)?
15. **Cancellation 5 days:** confirmed per your instruction - just noting it lets DJH leave on 5 days too, and a firm their size may want 30. Keep 5?
16. **Setup fee / minimum**, or purely per-lead? Want the optional **volume cap** offered to DJH, or removed (Schedule 1 §11)?
17. **Rejection window 3 working days** - hold, or allow DJH 5?

## D. Client (DJH) to confirm
18. DJH's **authorised signatory** (name and role) and **notices email**.
19. Ask DJH to **add a "partner lead-generation source" line to their privacy policy** and to confirm their Art 14 notice will name **DJH Business Advisers Limited** (their group policy currently names the holding company). This is DJH's job, not yours.
20. DJH's **VAT (433279492) and ICAEW (C009116035)** are confirmed on DJH's own site; B-Corp is their representation. Leave as warranties, or verify B-Corp separately?

---

### Assumptions (tell me if any are wrong)
- Ashfield Trading Limited is **not VAT registered**; Mohammed Junayd Moughal signs as Director.
- Only **propertytaxpartners.co.uk** (and brand-related properties) are in scope.
- DJH responding to an enquiry is **response-to-request**, not marketing; other marketing needs separate PECR consent.
- Governing law **England and Wales**, exclusive jurisdiction.
- Defaults you can change: suspension grace **10 working days**, breach notice **24 hours**, duplicate window **30 days**, non-circumvention/no-poach **12 months**, fee-review notice **60 days**.
