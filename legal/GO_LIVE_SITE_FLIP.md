# GO-LIVE SITE FLIP — do this (and DEPLOY it) BEFORE the first real lead

*Created 2026-06-22, after the Lead Generation and Data Sharing Agreement with DJH Business Advisers Limited was FULLY EXECUTED. The contract and LIA say enquirers are told, at the point of submission, that their details are shared with DJH on a legitimate-interests basis. The live site does NOT yet do that. Until it does, forwarding a real enquirer's data to DJH is a transparency breach by the Supplier. So: make these changes, DEPLOY them, confirm live, THEN send leads. Not before.*

## Verified current state (checked 2026-06-22)

- `Property/niche.config.json`: `"partner": null`; `"enquiry_retention_months": 3` (already correct).
- `Property/web/src/config/site.ts`: `leadConsentText` is driven by `partner`. Its partner branch is **consent** phrasing ("I agree to my details being shared by ... with our specialist partner firm ${partner.name} ..."). This is the WRONG model: we agreed **legitimate interests + an acknowledgement**, not consent.
- `Property/web/src/app/privacy-policy/page.tsx`: §4 "Our lawful basis" (around line 110-114) currently says we rely on **consent** for enquiry forms AND for sharing with the partner. Sharing branch in §3 (~line 96) and §5 (~line 123-126) read off `partner`. Consent-records (~line 76, ~148) and "withdraw consent" (~line 161) wording is consent-model.

## Required changes (local-first; do NOT deploy until reviewed + signed off)

1. **`Property/niche.config.json` — turn the partner on.** Replace `"partner": null` with:
   ```json
   "partner": {
     "name": "DJH Business Advisers Limited",
     "privacy_policy_url": "https://www.djh.co.uk/privacy-policy/"
   }
   ```
   (Leave `enquiry_retention_months` at 3.)

2. **`Property/web/src/config/site.ts` — change the partner branch of `leadConsentText` from CONSENT to the ACKNOWLEDGEMENT wording** (legitimate interests, submitting is the act, no "I agree"). It must match Annex B.1 of the signed agreement:
   > "To answer your enquiry, your details will be shared with our specialist partner firm DJH Business Advisers Limited (part of the DJH group of companies), an independent data controller that will contact you and use your details under its own privacy policy. By submitting this enquiry you confirm you understand this."
   (The forms append "See our Privacy Policy.") Note the "(part of the DJH group of companies)" phrase: the template is generic via `${partner.name}`, so decide how to carry it cleanly, e.g. add an optional `partner.descriptor` field, or fold it into the displayed name. Implementer's call; keep it config-driven.

3. **`Property/web/src/app/privacy-policy/page.tsx` — switch the enquiry basis from consent to legitimate interests:**
   - §4: enquiry handling AND the partner share = **legitimate interests (Article 6(1)(f), with 6(1)(b) where necessary to act on the enquiry)**. Keep **consent** ONLY for the newsletter / email sign-ups.
   - Surface the **right to object (Article 21)** for the legitimate-interests processing.
   - Make the consent-records (~line 76, ~148) and "withdraw consent" (~line 161) wording apply to the newsletter consent, not the enquiry/share.
   - Ensure §3 (~line 96) and §5 (~line 123-126) are consistent and note DJH **may share the data within the DJH group** (matches clause 8.6 / Annex B.3 of the agreement).
   - Bump the "Last updated" date.

4. **`Property/web/src/lib/lead-routing.ts` — do NOT enable automated delivery to the partner.** Leads are forwarded MANUALLY by Junayd from junayd@ashfieldtrading.com to Michael.Winniczuk@djh.co.uk. Confirm that flipping `partner` does NOT cause Property-source leads to be auto-emailed to DJH (memory: `source='property'` is excluded from partner CC; KEEP that guard).

5. **Optional (recommended, Schedule 2 §4 / LIA minimisation):** add a one-line "Please don't include sensitive personal information" note on the lead-form message field.

## Verify + deploy

- Build/typecheck `Property/web` locally (check `package.json` for the command) and confirm green.
- **Deploy is user-gated** (GitHub auto-deploy is OFF; use the Vercel CLI per the deploy memory). 
- **CAUTION — messy working tree:** the repo is on branch `console-kpi-windows-carousel` with many uncommitted changes (console work, blog markdown, `niche.config.json` already shows as modified). A Property deploy will carry whatever is in the working tree. Coordinate with Junayd on exactly what should ship; do not blindly deploy unrelated work. Consider isolating these go-live changes.

## After it is confirmed LIVE

Then, and only then, Junayd sends the held/Friday + ongoing leads (manual forward, max 5/day trial cap).

## Source of truth for wording

Annex B.1 / B.3 and Schedule 2 §3 in `legal/Lead_Generation_and_Data_Sharing_Agreement_FOR_SIGNATURE.md`. The LIA (`legal/Legitimate_Interests_Assessment.pdf`) assumes this transparency is live.
