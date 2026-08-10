# Review Checklist and Placeholder List (for draft v2)

*Use this before signing. Part A lists the clauses a qualified professional should review. Part B lists every `[PLACEHOLDER]` you must complete. Part C summarises what changed from v1 after the legal review. Not legal advice.*

---

## Part A - Clauses to have a qualified professional review

Have a **solicitor (England and Wales)** and a **data protection specialist** review the whole Agreement. Prioritise these:

### Highest priority

1. **Lawful basis + consent wording - Schedule 2, paragraph 3 (and clause 8.4, Annex A, Annex B).** The single most important decision, but largely solved at the code level. The brief assumed **consent** (Art 6(1)(a)); the review flags it may **not be "freely given"** (Art 7(4)/Recital 43). The draft **recommends Art 6(1)(b)/(f)** (the share is necessary to act on the enquiry) plus a privacy notice that names DJH. **Good news:** the site already has partner-aware consent wording (Annex B.2) that names DJH and discloses the share, and activates automatically when DJH is set as the partner in `niche.config.json`. **Action before go-live:** confirm the basis with your DPO; flip the partner config and add DJH's privacy-policy URL; ensure the Privacy Policy names DJH; and for the £45 email-only tier, build a dedicated capture with proper consent (newsletter subscribers don't qualify - Annex B.3, Schedule 2 §4.4). *Law: UK GDPR Arts 6, 7; PECR 2003.*

2. **Rest of Schedule 2 and its Annexes.** Confirm: controller-to-controller framing; consent-evidence trail and the per-Delivery metadata (para 3.3); the Article 13/14 transparency split (para 5); the PECR / soft-opt-in position (para 4); breach-notification at 24 hours with Art 33(3) content (para 8); the new complaints-handling duty (para 9.2); retention (para 10); the consent audit right (para 13); and that it reflects the **latest** ICO data-sharing guidance (being updated post-DUAA in 2026). *Law: UK GDPR + DPA 2018 as amended by the Data (Use and Access) Act 2025; ICO Data Sharing Code (s.121 DPA 2018).*

3. **Clause 11 (Limitation of Liability) - the cap (11.4) and super-cap (11.5).** The cap is now **mutual** and defaults to **"greater of £[floor] or 12 months' fees"** (not the 3 months you mentioned - a 3-month, one-way cap risks being struck down under UCTA, leaving you *uncapped*). **Decisions needed:** the £ floor, the £ super-cap (£50k is light; consider ~£250k), and confirm 12 vs 3 months. Size these together with the insurance limit (clause 14) so insurance ≥ super-cap. *Law: UCTA 1977 ss.2, 3, 11, 13.*

4. **Clause 12 (Indemnities).** Confirm the mutual, fault-based, capped structure, and the re-scoped fine cover (a fine on the *other* party caused by *your* breach, not your own fines - your own regulatory fine is likely unenforceable to pass on and uninsurable). DJH may push for your consent indemnity to be higher-capped. *Law: UK GDPR Arts 82/83.*

### Also review

5. **Clause 7 (Late payment and suspension).** Interest, statutory-remedy preservation, the "interest is the statutory interest, not double" wording, the 10-working-day suspension grace. *Law: Late Payment of Commercial Debts (Interest) Act 1998.*
6. **Clauses 4, 5 and 9.4–9.6 (Exclusivity; tiered Lead definition and credits; non-circumvention/non-solicitation).** Confirm the two-tier Lead definition (Full vs Email-Only, clause 5.1), the 3-working-day window and four rejection grounds, the narrow anti-competing-site covenant (4.2), and that the restrictive covenants are reasonable in scope/duration (restraint-of-trade).
7. **Clause 6 and Schedule 1 (tiered Charges, VAT, monthly invoicing, payment terms, Delivery-Log audit, fee review, optional volume cap).** Confirm VAT status, the two fees, monthly billing and the 14-day term.
7a. **Clause 8.5 (Transfer of responsibility on Delivery).** Confirm the hand-off wording: once a Lead reaches DJH's inbox, DJH owns the data as controller and you are not liable for its downstream handling (but you remain liable for your own pre-Delivery conduct, e.g. a valid basis to share). *Law: UK GDPR Arts 5(2), 24, 82.*
8. **Clause 10 (Warranties).** Supplier-limited warranties; Client warranties (VAT/ICAEW/B-Corp as DJH's representations, given at the Commencement Date).
9. **Clause 11.2 carve-outs.** Confirm the un-excludable carve-outs are complete (note: the wrong Sale of Goods Act reference from v1 was removed).
10. **Clause 14 (Insurance).** Set cover type and level; ensure it is ≥ the super-cap and matches your actual policy.
11. **Clauses 15–17 (Termination; consequences/survival; anti-bribery & financial crime).** Notice/cure periods; the completed survival list (16.3); the Bribery Act / Criminal Finances Act covenant.
12. **Boilerplate (clauses 18–21).** Force majeure, assignment (with the DP condition), entire agreement/non-reliance, dispute-escalation timetable (20), governing law.
13. **Execution block.** Confirm each party's authorised signatory and signing method (Companies Act 2006 s.43/44).

### Data-protection operational items to verify (not just the wording)
- You actually **capture and store consent/lawful-basis evidence** (version, wording, timestamp) and transmit the metadata with each Delivery.
- The enquiry form **does not collect special category data** and **warns** against free-text sensitive detail.
- Leads are transmitted **securely** (not plain email).
- Both parties' **published privacy notices** match the Agreement and Annex B.
- Both parties hold current **ICO registration** (verify DJH's on the ICO register; renew yours).
- A **DPIA/screening** is done before go-live (allocated to you in para 11.2).

---

## Part B - Every placeholder to complete

### Supplier details - now filled from Companies House (confirm)
**Filled in:** Ashfield Trading Limited, company 16358723, registered office 20 Ashfield Avenue, Shipley, BD18 3AL, trading as Property Tax Partners; signatory Mohammed Junayd Moughal (Director); not VAT registered. Still needed:
- [ ] **Supplier ICO registration number** (registration **pending** - must be done before the first lead; clause 10.2)
- [x] **Supplier notices email** (Schedule 1 §17) - **junayd@ashfieldtrading.com**
- [ ] **Supplier bank/payment details** (Schedule 1 §9) - or keep "as set out on each invoice"
- [x] **Supplier data protection / breach contact** (Schedule 1 §17; Annex A) - **junayd@ashfieldtrading.com** (you)
- [ ] Confirm the **signatory** and **VAT-not-registered** status

### Commercial figures and dates
- [ ] **Date of Agreement**; **Commencement Date** (Schedule 1 §2)
- [ ] **Nominated Address** for Leads - DJH's designated inbox (Schedule 1 §4)
- [ ] **Other Charges** - any setup/minimum, or "None" (Schedule 1 §6)
- [ ] **Optional volume cap** - `[N]` per Billing Period and notice period, or leave as "None" (Schedule 1 §11)

*Settled and fixed in the draft (not placeholders): flat **£85** per lead (tiering dropped; no-message leads also £85); monthly billing (invoice at start of month); 14-day payment; 5-day cancellation notice (clause 15.1 / Schedule 1 §14 - cuts both ways).*

*De-bracketed to sensible defaults in v2 (change if you wish): duplicate window 30 days; rejection-review 5 working days; suspension grace 10 working days; dispute window 10 working days from receipt; payment-default and material-breach cure 14 days; force-majeure termination 30 days; confidentiality survival 3 years; non-circumvention 12 months; no-poach 12 months; fee-review notice 60 days; Delivery-Log audit twice/year and 24-month log retention; breach notice 24 hours; DSAR acknowledgement 5 working days; Supplier data retention 12 months; Schedule 2 review annually; suppression exchange 2 working days.*

### Liability and insurance (figures filled to your £100k PI; confirm)
- [ ] **Liability cap floor** - suggested **£10,000** (clause 11.4; Schedule 1 §16)
- [ ] **Liability cap period** - **12 months**, mutual (clause 11.4)
- [ ] **Data-protection super-cap** - **£100,000** = your PI limit (clause 11.5; Schedule 1 §16)
- [ ] **★ Insurance** - **£100,000 professional indemnity** (clause 14; Schedule 1 §15). Check: (a) does your PI policy cover **data-breach/data-protection** claims? If not, the super-cap is largely uninsured - consider **cyber cover**. (b) DJH may want a higher DP cap. NB "PI" = professional indemnity, not personal injury.

### Data protection
- **Lawful basis: DECIDED = legitimate interests** (Art 6(1)(f), with 6(1)(b) where applicable; Schedule 2 §3.1, Annex A). Solicitor confirms at review; you don't choose.
- [ ] **★ Flip the partner config before go-live:** set DJH as the partner firm in `Property/niche.config.json` (the site then auto-switches every lead form to the DJH-naming consent wording - Annex B.2) and add **DJH's privacy-policy URL** (https://www.djh.co.uk/privacy-policy/). (Not done yet - deal unsigned.)
- [ ] **Supplier ICO registration** completed before the first lead (pending - clause 10.2). *DJH's is confirmed: Z8075605.*
- [ ] **Exact data fields** in the Data Specification (Annex A)
- [x] **Supplier retention period** = **3 months** for the Lead Data (Schedule 2 §10.1), evidence/log carved out. TODO: align site `enquiry_retention_months` (currently 24) to 3.
- [x] **Supplier data protection / breach contact** (Annex A; Schedule 1 §17) = **junayd@ashfieldtrading.com**. *DJH's is filled: GRC@djh.co.uk.*

### Client (DJH) details to confirm
- [ ] **DJH authorised signatory** name and role, and **notices email** (DP contact GRC@djh.co.uk already filled).
- [ ] **DJH to fix its privacy notice:** name **DJH Business Advisers Limited** (not just the holding group) as the receiving controller, and add a "partner lead-generation source" line (Schedule 2 §5.2). DJH's job, not yours.
- [ ] **DJH VAT (433279492) / ICAEW (C009116035)** confirmed on DJH's own site; **B-Corp** is their representation. Captured as warranties (clause 10.5).

> **Note on DJH's name:** Companies House confirms the entity but shows it was **formerly Mitten Clarke Limited, then DJH Mitten Clarke Limited** (current name only since 15 July 2024). The draft uses the current name with a "formerly" note, which is correct.

---

## Part C - What changed from v1 after the legal review

A five-lens adversarial review (data protection, UCTA/enforceability, internal consistency, commercial balance, completeness) produced 30 findings; the substantive ones are now in the draft:
- **Re-scoped the regulatory-fine indemnities** (own fines removed; "to the extent lawfully recoverable" added).
- **Flagged the consent "freely given" issue** and made clause 8.4 basis-neutral with a documented decision in Schedule 2 §3.
- **Added a consent-evidence/audit right** and an **Annex B** freezing the consent/privacy wording.
- **Made the liability cap mutual**; confined the loss exclusion to *indirect* loss only.
- **Changed the payment term to 14 days** and **deleted "time of the essence"** (it contradicted the cure period).
- **Added** non-circumvention/non-solicitation (9.4–9.6), a Delivery-Log audit/accuracy right (3.2/6.6), a fourth "bad data" rejection ground (5.4(d)), the spelled-out DUAA complaints duty, an anti-bribery/Criminal-Finances-Act covenant, a dispute-escalation timetable, a fee-review right, and an optional volume cap.
- **Fixed** the wrong Sale of Goods Act citation, the survival list, the "Billing Period" pointer, the Business/Working Day duplication, a possible double-interest reading, named the recipient (DJH), added Art 7(3) withdrawal mechanics, UK-only transfer and no-automated-decision lines, an active special-category control, and removed the dangling "Review Checklist" references inside the contract.

Residual risks your adviser should weigh: the lawful-basis choice; the (unsettled) enforceability of passing on third-party-caused regulatory fines; and that the caps' UCTA reasonableness depends on sensible figures and insurance being set.

## Part D - What changed in v3 (your latest instructions, 20 June 2026)
- **Tiered pricing:** Full Lead £85 (has a message and/or phone) vs Email-Only Lead £[set it] (email-only exit-capture). Defined in clause 5.1; priced in clause 6.1 and Schedule 1 §5.
- **Monthly billing:** one invoice at the start of each month for the prior month's leads, paid within 14 days (Schedule 1 §8).
- **Explicit hand-off (new clause 8.5):** responsibility for the data passes to DJH on delivery to its inbox; you are not liable for DJH's downstream handling (but remain liable for your own pre-delivery conduct).
- **ICO registration pending:** clause 10.2 now requires it to be completed before the first lead is delivered.
- **Consent wording corrected:** recorded your current (insufficient) wording and a corrected version in Annex B; recommended Art 6(1)(b)/(f) as the basis for the share; added an email-only PECR rule (Schedule 2 §4.4).

## Part E - What changed in v4 (your latest answers, 20 June 2026)
- **Email-Only Lead Fee set to £45** (clause 6.1; Schedule 1 §5).
- **Cancellation notice set to 5 days** (clause 15.1; Schedule 1 §14) - flagged as short and mutual.
- **Liability figures filled**: cap floor £10,000, super-cap **£100,000** (matched to your stated **£100k professional indemnity** limit), insurance £100,000 PI - all marked "confirm". Flagged that PI often excludes data-breach/fines, so cyber cover may be needed (clauses 11.4, 11.5, 14; Schedule 1 §§15-16).
- **DJH privacy-policy research** (agent, 20 June 2026): policy at **https://www.djh.co.uk/privacy-policy/** (Nov 2025); DP contact **GRC@djh.co.uk / Suzy Dawson-Newbury** - both now in Schedule 1 §17 and Annex B.4. Three DJH-side fixes flagged for go-live (Schedule 2 §5.2 + Questions Q29-30): (1) the policy names **DJH Holding Group Limited (13871316)** as controller, not DJH Business Advisers Ltd - confirm the receiving controller; (2) the policy doesn't describe a **partner lead-generation source** (Art 14 gap) - DJH to add a paragraph; (3) **no ICO number** published - obtain it.
- **Consent wording sourced from the live site** (Annex B): the site already has partner-aware wording that names DJH and activates on a config flip; the current line is just the "no partner" fallback. Recorded the newsletter consent too, with a caution that newsletter subscribers cannot be sent as Email-Only Leads.
- **Confirmed your current exit-pop-up is a full (name+phone+email+message) capture**, so it produces £85 Full Leads; the £45 tier needs a purpose-built email-only capture.

## Part F - What changed in this round (20 June 2026)
- **Tiering dropped:** flat **£85** per lead, including leads without a message (clauses 5.1, 6.1; Schedule 1 §5). Removed the £45 Email-Only tier and its terms; kept a light PECR guardrail for any no-message lead (Schedule 2 §4.4).
- **Lawful basis decided = legitimate interests** (Art 6(1)(f)/(b)), so you don't have to choose (Schedule 2 §3.1; Annex A). Solicitor confirms.
- **Supplier party filled from Companies House:** Ashfield Trading Limited (16358723), 20 Ashfield Avenue, Shipley, BD18 3AL, signatory Mohammed Junayd Moughal (Director), not VAT registered.
- **Insurance reconciled to your £100k PI:** super-cap dropped from £250k to **£100k** to match; flagged that PI may not cover data-breach/fines (cyber cover gap). PI = professional indemnity, not personal injury.
- **DJH facts found on public registers:** ICO **Z8075605** (Tier 2), privacy policy https://www.djh.co.uk/privacy-policy/, DP contact GRC@djh.co.uk - filled into Schedule 1 §17, Annex B, Schedule 2. Receiving entity confirmed = DJH Business Advisers Limited. Two DJH-side privacy-notice fixes placed on DJH (Schedule 2 §5.2).
- **ICO check:** Ashfield Trading is **not** on the ICO register - must register before first lead (clause 10.2; verify by postcode BD18 3AL).

## Part I - Lean signing copy (21 June 2026)
Per your instruction, a **lean version** is now the operative signing copy (`_FOR_SIGNATURE.md` / `.docx`): ~13-14pp / 6,665 words, down from 20+pp. **All substantive protections kept** (billable-on-delivery + no-unilateral-set-off, exclusivity + payment-conditional suspension, the full data-protection backbone, liability cap + £100k super-cap, mutual indemnities, clean hand-off 8.5, IP ownership, non-circumvention, 3-month retention, Lead Statement + reconciliation, no-message fair-value review). What was condensed/dropped to slim it:
- **Dropped the Supplier fee-review right** (was Schedule 1 §5: raise the fee on 60 days' notice). The £85 is now varied only by mutual agreement (clause 19.3) — flag if you want the unilateral review back.
- **Dropped the optional volume cap** (was "None" anyway).
- **Merged the two audit rights** (delivery-log + consent) into one clause 6.6.
- **Condensed** the IP clauses (9.1-9.3 → 9.1), non-circumvention + no-poach (9.4-9.6 → 9.2; no-poach KEPT), indemnities (→ 12.1-12.2), confidentiality (→ 13.1), the dispute timetable + governing law (→ clause 20), and Schedule 2 (13 sections → 11). Inlined the insolvency definition; dropped a few rarely-used defined terms.
- **Tightened verbose phrasing throughout** (~30% fewer words), no term change.
The long-form annotated master `.md` is retained only as a reasoning reference and is now more verbose than the operative copy.

## Part H - What changed in v6 (your instructions, 21 June 2026)
- **Dual-log billing made explicit (amended clause 6.3, new clause 6.7; Schedule 1 §8).** You bill against your own **Delivery Log** and send DJH an itemised **"Lead Statement"** with each monthly invoice (the list you send on the 1st). DJH must keep its own record and check the Statement against it, flagging any discrepancy within **10 working days**; you reconcile in good faith. Absent a timely, substantiated flag, your Delivery Log is the agreed record for the month. This sits in front of the heavier twice-a-year audit (6.6).
- **No-message Leads, good-faith fair-value review (new clause 5.8; clause 5.7 softened).** No-message Leads remain billable at £85, but you are no longer relying on a blanket "pay regardless": if DJH thinks the fee isn't fair value for a no-message Lead it can raise it within 5 working days and the parties **discuss a reasonable fee/credit in good faith**. The fee stays payable while discussed (a comment in 5.8 flags the option to defer instead). Clause 5.7 no longer bars DJH from *raising* a dispute, only from *unilaterally* withholding/setting off. *Fairness lever for you to set: payable-pending-discussion (default) vs defer the contested amount.*
- **Open decision flagged: non-solicitation of personnel (clause 9.5).** You have no employees, so the mutual no-poach gives you no real protection (it mainly protects DJH's staff). It is harmless boilerplate DJH may expect; **non-circumvention (9.4) is the one that protects your £85 fee and should stay.** Decide whether to keep or delete 9.5 (deletion would also touch 9.6, 16.3 and 19.5).

### Follow-up decisions applied (21 June 2026)
- **Clause 9.5 non-solicitation: KEPT** (your call - "leave as goodwill"). No further action.
- **Retention set to 3 months (Schedule 2 §10.1; Annex A).** The Lead Data (contact details + message) is deleted/anonymised within 3 months of Delivery; the consent/billing/audit evidence and the 24-month Delivery Log are carved out, so the short window doesn't undermine billing, the 6.7 reconciliation or the 6.6 / Sch 2 §13 audits. *Is it needed? Yes - a retention limit is a legal requirement (UK GDPR Art 5(1)(e) storage limitation), but the burden is tiny here because DJH holds the data as controller after Delivery. Enforcement can be a manual quarterly purge - no system needed.* **Loose end:** the site's `enquiry_retention_months` config is still 24 and is what the public privacy policy shows; change it to 3 to stay consistent (1-line config edit, not a build).
- **Delivery wording softened (clause 3.1; Annex A method-of-transfer).** Delivery may now be automated OR by you forwarding leads on manually, so the contract no longer warrants automation you haven't built. **The one thing that must still happen:** today no Property lead reaches DJH at all (they go to your inbox only), so before billing you must actually forward them to DJH (manually, or by adding DJH as the Property-lead recipient). Keep the channel encrypted in transit (ordinary business email between mainstream providers is normally TLS - fine).
- **Special-category warning made optional (Schedule 2 §3.4).** Softened from "the form will warn" to a minimisation duty, per your "not significant" call. *Recommendation stands: a one-line warning on the message field is a 2-minute change and strengthens your Art 9 position - worth doing.*
- **Placeholders filled:** Supplier notices email and data-protection/breach contact = **junayd@ashfieldtrading.com** (Mohammed Junayd Moughal); Supplier privacy-policy URL = **https://www.propertytaxpartners.co.uk/privacy-policy** (Schedule 1 §17; Annex A). Still open: Supplier **bank details** (or keep "as set out on each invoice"), **ICO registration number** (register first), Commencement Date, DJH's Nominated inbox + signatory.

### Site legal pages vs the contract (reviewed 21 June 2026)
- **Retention: DONE + safe to deploy now.** `Property/niche.config.json` → `enquiry_retention_months` set **24 → 3**; the privacy policy §6 reads this value, so it now states "3 months" automatically. Accurate regardless of the DJH deal.
- **Terms of use + cookie policy: NO change needed.** Neither mentions the enquiry-sharing arrangement; the DJH agreement is B2B and is not a website-terms matter. (Both read in full 21 June 2026.)
- **Privacy policy DJH alignment = the GO-LIVE FLIP. DO NOT deploy until: (1) contract signed, (2) Ashfield Trading ICO-registered [clause 10.2], (3) Property→DJH delivery actually wired.** Deploying it before then would tell every enquirer their data is shared with DJH on a legitimate-interests basis when it is not (a false transparency statement) — worse than leaving it.

#### Go-live site flip (exact edits — apply ONLY when the 3 preconditions above are met)
1. **`Property/niche.config.json`** — replace `"partner": null` with:
   ```json
   "partner": {
     "name": "DJH Business Advisers Limited",
     "privacy_policy_url": "https://www.djh.co.uk/privacy-policy/"
   }
   ```
   This auto-activates: the DJH-naming consent line on every lead form, and the "we share with DJH" branches in privacy policy §3 (Why we use) and §5 (Who we share). `site.ts` reads `partner.name` + `partner.privacy_policy_url`.
2. **`Property/web/src/config/site.ts`** — change the `partner` branch of `leadConsentText` from the current consent-style "I agree to my details being shared…" to the **acknowledgement** wording (Annex B.2 recommended), because the basis is **legitimate interests, not consent**:
   > *"To answer your enquiry, your details will be shared with our specialist partner firm DJH Business Advisers Limited, an independent data controller that will contact you and use your details under its own privacy policy. By submitting this enquiry you confirm you understand this."*
3. **`Property/web/src/app/privacy-policy/page.tsx` §4 (Our lawful basis)** — this is **hardcoded "consent"** and is NOT config-driven; change the enquiry-handling + share basis to **legitimate interests** (Art 6(1)(f)/(b)), keeping **consent** only for the newsletter/email sign-ups. Bump the "Last updated" date.
4. *(Optional)* link DJH's privacy-policy URL in §5 and on the consent line (the config now carries `privacyPolicyUrl`).
- **Note:** today's pages run a consent model (forms say "I agree…", §4 says "consent") which is internally consistent for the current in-house state — so nothing is broken now; the above is the cutover to the contract's legitimate-interests model at go-live.

## Part G - Re-review fixes (focused 3-lens re-review, 20 June 2026)
A focused re-review confirmed consistency is clean (no tier leftovers, uniform identity, figures reconcile) and applied these fixes:
- **Consent vs legitimate interests reconciled:** kept **legitimate interests**; reframed the on-form line from a consent opt-in to an **acknowledgement** (Annex B.2), stopped calling it a "consent statement" (Schedule 2 §3.1-3.2), and made the do-not-deliver triggers **basis-neutral** (Art 21 objection, not just consent withdrawal - clauses 3.5, 8.4; Schedule 2 §5.1). **Decision for you:** acknowledgement form (cleaner) vs keep the tick-box and use "consent" basis.
- **Closed the "working details" gap (clause 5.1(c)):** functionality is no longer a condition of qualification, so a hard-bounced lead is still billable and the 5.4(d) credit is the only remedy (protects the no-set-off design).
- **Added:** a pre-go-live Client confirmation that DJH's privacy notice names DJH Business Advisers + the partner source (Schedule 2 §5.2, tied to clause 10.4); a final-invoice withholding exception for validly-flagged-but-unreviewed leads (clause 5.6); a "Billing Period" definition (clause 1.1); an insurance acknowledgement that PI may not cover data-breach/fines (clause 14.1).
- **Fixed** a Markdown header-comment rendering bug.

## Part J - Trim, plain-language and summary-sync pass (22 June 2026)
Driven by your worry that the lean copy was too long / "tongue-twisty" and might hide a self-contradiction. Ran a 5-lens adversarial review (redundancy, droppability, internal-contradiction audit, plain-language, signature) with a sceptic verification pass that defaulted to KEEP. **Headline: the contradiction audit found no genuine internal contradictions** - six candidates (16.3 survival list vs the 24-month log; 15.2 vs 7.2 payment-default periods; 5.4/5.6/15.1 final-invoice timing; 5.4/6.5/7.3 windows; Charges vs Lead Fee; 10.4 to Sch 2 §5) were each verified as coherent/non-conflicts, so none were "fixed" (avoiding edits that would have *created* drift).

**Safe trims applied (each verified no loss of protection):**
- **Clause 6.1:** removed the literal "£85", now "the Lead Fee". Price now lives only in the definition (1.1) and Schedule 1 §5, so a future fee change cannot leave a stale figure in the body. No other clause repeats the number.
- **Schedule 1:** merged old §14 (Insurance) + §15 (Liability) into one **§14 "Insurance and caps"**; **renumbered Contacts §16 → §15**; updated the one cross-reference in **Schedule 2 §2** from "paragraph 16" to "paragraph 15". Schedule 1 is now contiguous 1-15.
- **Schedule 1 §10:** trimmed the part-paraphrase to "3 Working Days from Delivery. Rejection grounds and crediting: clause 5 (grounds in clause 5.4)." (removes a minor summary-vs-clause-5.6 mismatch).
- **Background recitals:** condensed A-D to A-C (the load-bearing "not a processor arrangement..." and "warrants the exclusive flow... and nothing more" phrases kept verbatim).
- **Clause 14 (Insurance):** condensed to two sentences, keeping all four functions (PI covenant, £100k/super-cap floor, the honest "PI may not respond to data-breach/fines" carve-out, each-party-own-insurance).

**~13 plain-language rewrites applied (legal effect preserved, no term change):** clauses **5.7, 11.3, 11.5, 12.1, 12.2, 19.1, 19.4** and Schedule 2 **§3 (final sentence), §5, §6, §11** - dense multi-duty sentences broken into short lettered lists. Defined-term anchors kept (e.g. **super-cap** bolded on first use in 11.5; **indemnifier** in 12.1).

**Verified KEEP (no further safe trim available):** audit (6.6 - cross-referenced by Sch 2 §11), reconciliation (6.5 - sole source of delivery-log finality), force majeure (18 - only express outage shield), anti-bribery (17 - survival-listed, only "comply with laws" hook), dispute ladder (20.1), notices (19.7 - anchors all notice clocks), counterparts (19.8 - enables separate-copy e-sign), client representations (10.5). Each is load-bearing or too short to be worth cutting.

**Plain-English Summary synced to the contract:** removed the stale "review the fee on 60 days' notice" bullet (the fee-review right was dropped in Part I); filled "[Your company]" -> Ashfield Trading Limited (16358723); corrected the Annex reference B.2 -> **B.1**; VAT "assumed not" -> "not currently" registered.

**Tooling / backups:** pandoc is not installed on this machine, so added **`build_signing_docx.py`** (python-docx) to rebuild the `.docx` from the `.md` without pandoc (US Letter, Calibri 11, Heading 1/2 styles, the three tables, page breaks before each Schedule). Rebuilt `.docx` verified: 27 headings, 3 tables, page breaks before both Schedules, all nine `£` signs intact. Pre-change backups saved alongside: `..._FOR_SIGNATURE.md.bak-2026-06-22`, `..._FOR_SIGNATURE.docx.bak-2026-06-22`, `Plain_English_Summary.md.bak-2026-06-22`.

**Signature question (your Northflow comparison):** keep **both** signatures. Northflow was a one-sided B2C adhesion T&C (only you took on duties); this is a bilateral B2B contract where DJH *and* Ashfield each take on real obligations, so each must sign to be bound. Execution is already lean: e-signature is allowed (clause 19.8 counterparts), your side is pre-filled, only DJH's four blanks remain, and no deed/witness formality is needed.

*Numbering note:* the lean signing copy is the authority. Earlier Parts (H/I) cite some pre-renumber references (e.g. Schedule 2 §10/§13, Annex B.2/B.3, clause 9.5/6.7, Schedule 1 §17); the current lean copy uses **Schedule 2 §11 (retention) / §5 (transparency) / Annex B.1 / clause 9.2 / Schedule 1 §15 (contacts)**.
