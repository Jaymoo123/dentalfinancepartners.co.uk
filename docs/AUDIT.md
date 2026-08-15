# Phase 0 audit — site inventory and consistency with the pool/claim model

> **HISTORICAL, 10 August 2026.** This is the state of the estate *before* the 14 August alignment, and the consent strings quoted in its findings are no longer live. Every site now carries the multi-firm disclosure (DSA Annex B.2). Kept as the record of what was found. Do not read any quoted string here as current wording.

Date: 10 August 2026. Read-only inventory of all 18 public sites (plus the ashfield corporate site) against the Lead Engine operating model: leads tiered by case type, shared with a specialist partner network, delivered on claim, onward re-referral disclosed. Target consent state = notice-only legitimate-interests acknowledgement mentioning partner sharing and re-referral (owner decision; Property is the reference implementation). Body-copy conflicts are listed but marked DO-NOT-EDIT (ranking content is out of scope for the messaging pass).

## Estate summary

| Site | Consent | Privacy sharing clause | Form fields | Copy conflicts |
|---|---|---|---|---|
| Property | OK (notice-only, network + re-referral) | OK (incl. re-referral) | OK | ~4 (3 messaging, 1 body) |
| Dentists | needs-change (checkbox; wording already network) | OK | OK | ~3 messaging |
| Medical | needs-change (checkbox; wording already network) | OK | OK | ~7 (3 messaging, 4 body) |
| Solicitors | needs-change (checkbox; wording already network) | OK | OK | ~9 (3 messaging, 6 body) |
| generalist | needs-change (checkbox; wording already network) | OK | OK | ~10 (4 messaging, 6 body) |
| construction-cis | needs-change (checkbox; wording already network) | OK | OK | ~8 (3 messaging, 5 body) |
| contractors-ir35 | needs-change (checkbox; wording already network) | OK | OK | 5 |
| digital-agency | needs-change (checkbox; wording already network) | OK | OK | 4 |
| startups-tech | needs-change (checkbox; wording already network) | OK (richest variant) | OK | 3 |
| charities | needs-change (checkbox + in-house wording) | contradicts ("we do not share") | OK | 5 |
| care | needs-change (checkbox + in-house wording) | contradicts ("we do not share") | OK | 5 |
| crypto | needs-change (checkbox + in-house wording) | contradicts ("we do not share") | OK | 5 |
| ecommerce | needs-change (checkbox; no sharing mention) | contradicts ("we do not share") | OK | 3 (+body) |
| hospitality | needs-change (checkbox; no sharing mention) | contradicts ("we do not share") | OK | 3 (+body) |
| pharmacies | needs-change (checkbox; no sharing mention) | contradicts ("we do not share") | OK | 3 (+body) |
| wills-probate | needs-change (no sharing/fee sentence in main consent; mixed mechanics) | contradicts (vs vetted-firm promises) | OK | 3 (+articles) |
| divorce-finances | needs-change (sharing + fee present; not notice-only everywhere) | contradicts (vs own consent checkbox) | OK | 3 (+articles) |
| ashfield | OK (corporate, pool-exempt) | OK | OK | 0 |

## Estate-level findings (load-bearing for the messaging pass)

1. **The `partner` config object is truthy-empty on most sites.** `partner: {name: "", ...}` opens the sharing branches even with a blank name; `partner: null` sites (charities, care, crypto, and the five ecommerce-family sites in effect) render "we do not share". The "null = in-house" comments are stale. The canonical fix is one static category wording, not a ternary.
2. **Interpolation hazard**: several privacy partner-branches interpolate `${partner.name}` as a single named firm; flipping an empty-name partner object in without rewriting the ternary renders broken copy ("our specialist partner firm , an independent..."). Ternaries must be rewritten, not re-pointed.
3. **Only Property discloses onward re-referral.** All other sharing-branch sites describe a single-firm share. The LIA requires re-referral disclosure network-wide.
4. **Shared `packages/web-shared/leads/MiniCapture.tsx` is already notice-only estate-wide**; only the 17 main LeadForms still block on a checkbox. On wills-probate the MiniCapture notice carries no sharing or fee disclosure at all.
5. **No site other than Property verifies contactability at submit.** `verify.ts` exists on Tier-2 sites but is wired only to inbound email. Leads from those sites would currently enter the pool unverified; flagged for the live-bridge phase, not fixed in this build.
6. **Direct model conflicts found**: divorce-finances homepage promises "not a call centre round robin" (body surface, flagged DO-NOT-EDIT this pass, owner call); generalist newsletter SignupForm claims "We never share your email." adjacent to lead capture (messaging surface, fix in site branch: scope the line to the newsletter or reword).
7. **ashfield ContactForm carries a local `CONSENT_TEXT` const** diverging from its `siteConfig.leadConsentText`; site is pool-exempt but the drift is noted.

Per-site detail follows, in three parts.

---
# Phase 0 inventory, part 1 (6 monorepo sites) — pool/claim lead-distribution audit

Date: 2026-08-10. READ-ONLY audit; no repo file modified. All paths absolute under `C:\Users\user\Documents\Accounting\`.

Shared context (applies to all 6 sites):

- Stack everywhere: Next.js ^15.5.14 (App Router), Vercel hosting (CLI deploy workflow, auto-deploy OFF).
- `partner` in every `niche.config.json` is an OBJECT, not null. Five sites carry `{"name": "", "privacy_policy_url": null}` (blanked in commit `2cc693f8`, 2026-08-05, "remove Reflex named-partner references"). Property carries `{"name": "a firm from our specialist partner network", ...}`. Because the object is truthy, the `partner ? ... : ...` ternaries in `site.ts` and `privacy-policy/page.tsx` take the PARTNER branch on ALL SIX sites. The in-house "we do not share" fallback branch is dead code everywhere. The comments saying "null = handled in-house" describe a state no site is in.
- All main LeadForms POST via a per-site `submit-client.ts` to `/api/leads/submit` (server chokepoint), which inserts to Supabase and (where wired) enrols nurture.
- Shared MiniCapture (`packages\web-shared\leads\MiniCapture.tsx`) is notice-only ("acknowledgement-by-submission, owner decision 2026-07-17", line 430) and always sends `consent_given: true`, `consent_text`, `consent_at`. Every site's MiniCapture/InlineMiniLeadForm/ResourceGate-wrapping-MiniCapture inherits this.

---

## 1. Property

**Site**: dir `Property`, brand **Property Tax Partners**, domain `www.propertytaxpartners.co.uk`, Next.js ^15.5.14 App Router on Vercel.

**Enquiry forms**:
- MAIN `Property\web\src\components\forms\LeadForm.tsx`. Fields: role select (`niche.lead_form.role_options`, required), conditional `roleDetail` text (required if role = other), fullName (required), email (required), phone (required, 10+ digits), situation textarea (required, min-chars), prompted (required), callGoal (required). Honeypot `enquiry_ref`. Submits via `Property\web\src\lib\leads\submit-client.ts` → `POST /api/leads/submit` → `Property\web\src\app\api\leads\submit\route.ts` (Property-specific gatekeeper: insert, verify, enrol, booking token).
- `Property\web\src\components\forms\MiniCapture.tsx` — local config wrapper around shared `packages\web-shared\leads\MiniCapture.tsx` (notice-only, `consentText: siteConfig.leadConsentText`).
- `Property\web\src\components\blog\InlineMiniLeadForm.tsx` — renders MiniCapture (no own consent code).
- `Property\web\src\components\forms\DetailsForm.tsx` — phone top-up on `/complete`, POSTs `/api/leads/complete` (no consent text; original consent already captured).
- `Property\web\src\components\support\SpecialistWidget.tsx` — "Ask a specialist" email-first widget; uses `leadConsentText` as notice, sends `consent_given: true`.
- `Property\web\src\components\resources\ResourceGate.tsx` (+ `ResourceGateLazy.tsx`, `resources\GateOrForm.tsx`) — email-only downloads, tick-box with `resourceConsentText`; explicitly NOT shared with partner (Annex B.2).
- `Property\web\src\components\calculators\ResultGateModal.tsx` — calculator result gate (shared MiniCapture pattern).
- `Property\web\src\components\forms\BookingPicker.tsx` — callback slot picker, `/api/leads/book`.

**Consent notice (verbatim)** — `Property\web\src\config\site.ts` line 38 (active branch, `PARTNER_DISCLOSURE_PAUSED = true`):
> "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this."

`resourceConsentText` (line 42): "I agree to Property Tax Partners using my email to send me the resource I requested."
LeadForm shows this as a NOTICE, not a checkbox (comment at lines 403-405: "legitimate interests, not consent... shown as a notice, not a tick-box (data-sharing agreement Annex B.1)"). `consent_given: true` (always), `consent_text` (exact wording + "See our Privacy Policy."), `consent_at` all sent.

**Privacy policy**: `Property\web\src\app\privacy-policy\page.tsx` — YES, discloses partner sharing. Section 5 operative clause (partner.name interpolates to the category label):
> "When you submit an enquiry, we share information about you and your enquiry with **a firm from our specialist partner network**, so that they can contact you and provide the advice you asked for... [partner] acts as an **independent data controller**..."

Plus a dedicated re-referral paragraph: "**Our partner network and re-referral.** We work with a network of specialist accountancy and tax firms rather than a single firm... If that firm is unable to help... we may pass your enquiry to another firm in the same network for the same purpose... Whichever firm contacts you will tell you who it is and give you its own privacy information at that point."
Partner ternary: `siteConfig.partner` is always truthy (paused branch substitutes the category object), so the sharing branch always renders; the "we do not share" fallback is unreachable.

**Verification flow hooks**: `Property\web\src\app\api\leads\submit\route.ts` calls `verifyLead` from `Property\web\src\lib\leads\verify.ts` (Twilio Lookup v2 line-type + ZeroBounce email) synchronously at submit; result drives the "Verifying your details..." UX and `needsCheck` retry. Post-submit confirm loop: `Property\web\src\lib\leads\enroll.ts` (instant SMS/email touch), `api\leads\confirm\[token]\route.ts`, `api\leads\inbound\twilio\route.ts`, `api\leads\inbound\email\route.ts`. Pool/claim scaffolding already exists: `api\leads\claim\[token]\route.ts`, `api\leads\forwarded\[token]\route.ts`, `api\leads\handoff\resend\route.ts`, `api\leads\offer\[token]\route.ts`.

**Thank-you / confirmation copy**: `Property\web\src\app\thank-you\page.tsx`:
- "We have just sent you a message to arrange your free review. Please check your email and phone, and confirm to lock in your callback slot."
- "Your message is with our team. We aim to respond within 24 hours, usually same day."
- Fallback: "Your enquiry is with our team. We will be in touch within one working day, usually the same day."
`Property\web\src\app\complete\page.tsx`: "We have everything we need. A property tax specialist will be in touch shortly."
LeadForm inline footer: "We respond within 24 hours and store your details securely. You'll get a text and email from us straight away."

**Conflicts with pool model**:
- Messaging surfaces: thank-you/complete/LeadForm footer speak first-person "our team" / "we respond within 24 hours", implying the site operator makes contact; under the pool model the claiming firm contacts directly. ~3 surfaces (thank-you, complete, LeadForm footer). Consent + privacy already pool-compatible (category label + re-referral).
- Body copy (DO-NOT-EDIT): homepage `app\page.tsx` first-person "our team/specialists" phrasing (1 file flagged).

**Summary row**: `| Property | consent OK (notice-only, partner-network + re-referral) | privacy OK | form fields OK | ~4 (3 messaging + 1 body) |`

---

## 2. Dentists

**Site**: dir `Dentists`, brand **Dental Finance Partners**, domain `www.dentalfinancepartners.co.uk`, Next.js ^15.5.14 App Router on Vercel.

**Enquiry forms**:
- MAIN `Dentists\web\src\components\forms\LeadForm.tsx`. Fields: fullName (required), email (required), phone (required), role select (required), message textarea "What's on your mind?" (OPTIONAL), then an optional `<details>` disclosure ("Optional: a bit more detail") with situation / prompted / callGoal, consent CHECKBOX (required; submit disabled until ticked, error "Please tick the box to continue."). Honeypot `enquiry_ref`. Submits via `Dentists\web\src\lib\leads\submit-client.ts` → `/api/leads/submit` → `Dentists\web\src\app\api\leads\submit\route.ts` built on shared `packages\web-shared\leads\server\createLeadSubmitHandler.ts` + `enrollLead`.
- `Dentists\web\src\components\forms\MiniCapture.tsx` (shared notice-only MiniCapture wrapper), `blog\InlineMiniLeadForm.tsx` (wraps MiniCapture), `forms\DetailsForm.tsx` (→ `/api/leads/complete`), `support\SpecialistWidget.tsx` (leadConsentText notice, `consent_given: true`), `resources\ResourceGate.tsx` + `resources\GateOrForm.tsx` (checkbox with `resourceConsentText`, in-house only), `blog\ExitIntentModal.tsx` (prompt only; uses analytics consent gate, no own lead consent), `forms\BookingPicker.tsx`.

**Consent notice (verbatim)** — `Dentists\web\src\config\site.ts` line 21, ACTIVE branch (partner object truthy):
> "I agree to my details being shared by Dental Finance Partners with its specialist partner network, and to Dental Finance Partners and its partner firms contacting me about my enquiry by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

(Dead in-house branch line 22: "I agree to Dental Finance Partners using my details to respond to my enquiry...")
`resourceConsentText` (lines 74-75): "I agree to Dental Finance Partners using my details to send me the free resource I have requested and to respond to any enquiry I submit."
LeadForm = CHECKBOX (tick-to-consent). Sends `consent_given: consent` (checkbox state), `consent_text`, `consent_at`.

**Privacy policy**: `Dentists\web\src\app\privacy-policy\page.tsx` — YES, discloses sharing. Section 5:
> "When you submit an enquiry, we share the details you provide with a specialist partner firm from our **specialist partner network**, so that they can respond and provide the advice you asked for. The receiving firm acts as an **independent data controller**... We share your enquiry only for the purpose of responding to it."

No onward re-referral paragraph (unlike Property). Partner ternary: `niche.partner` = `{name:"", ...}` is truthy, so the sharing branch renders; fallback unreachable. The empty `partner.name` is never interpolated on this page (generic wording), so no visible artefact.

**Verification flow hooks**: no synchronous phone/email verification in `api\leads\submit\route.ts` (shared handler comment notes Property's Twilio/email steps are NOT included). `Dentists\web\src\lib\leads\verify.ts` exists, consumed by `api\leads\inbound\email\route.ts`. Post-submit SMS/email touch: `Dentists\web\src\lib\leads\enroll.ts` (route comment: DRY-RUN while `LEAD_NURTURE_ENABLED` unset), confirm loop `api\leads\confirm\[token]\route.ts`, `api\leads\inbound\twilio\route.ts`. Handoff scaffolding: `api\leads\forwarded\[token]\route.ts`, `api\leads\handoff\resend\route.ts`.

**Thank-you / confirmation copy**: `Dentists\web\src\app\thank-you\page.tsx`:
- "We have just sent you a message to arrange your free dental practice finance review... confirm to lock in your callback slot."
- "Your message is with our team. We aim to respond within 24 hours, usually same day." / fallback "Your enquiry is with our team. We will be in touch within one working day, usually the same day."
`complete\page.tsx`: "We have everything we need. A dental accountant will be in touch shortly." and "Add the last detail we need and a dental accountant will be in touch to arrange your [review]."

**Conflicts with pool model**:
- Messaging: checkbox consent (target = notice-only LI acknowledgement); thank-you "our team" first-person; complete page "A dental accountant will be in touch" reads as an in-house accountant. ~3 messaging surfaces.
- Body copy (DO-NOT-EDIT): first-person "our team" phrasing confined to thank-you per grep; homepage/service copy clean on the swept patterns. 0 body files flagged beyond messaging.

**Summary row**: `| Dentists | needs-change (checkbox; wording already partner-network) | privacy OK | form fields OK | ~3 (messaging) |`

---

## 3. Medical

**Site**: dir `Medical`, brand **Medical Accountants UK**, domain `www.medicalaccounts.co.uk`, Next.js ^15.5.14 App Router on Vercel. (Memory: site parked, ~11/117 legacy indexed, flat routing.)

**Enquiry forms**:
- MAIN `Medical\web\src\components\forms\LeadForm.tsx`. Fields: fullName (required), email (required), phone (required), role select (required), message (optional), optional disclosure situation/prompted/callGoal, consent CHECKBOX (required, submit disabled until ticked). Hidden `practiceName`. Honeypot. Submits via `Medical\web\src\lib\leads\submit-client.ts` → `/api/leads/submit` → `Medical\web\src\app\api\leads\submit\route.ts` (own handler + `enrollLead`).
- `forms\MiniCapture.tsx` (shared notice-only), `blog\InlineMiniLeadForm.tsx`, `forms\DetailsForm.tsx` (→ `/api/leads/complete`), `support\SpecialistWidget.tsx` (leadConsentText notice, consent_given true), `resources\ResourceGate.tsx` (checkbox, resourceConsentText), `blog\ExitIntentModal.tsx` (prompt only), `forms\BookingPicker.tsx`, `components\tools\premium\MobileToolSlot.tsx` (tool gate via shared slot).

**Consent notice (verbatim)** — `Medical\web\src\config\site.ts` line 20, ACTIVE branch:
> "I agree to my details being shared by Medical Accountants UK with its specialist partner network, and to Medical Accountants UK and its partner firms contacting me about my enquiry by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

(Dead branch line 21: "I agree to be contacted about my enquiry. I understand that Medical Accountants UK may follow up by email and phone over the next 11 days...")
`resourceConsentText`: "I agree to Medical Accountants UK using my email address to send me the requested resource and occasional relevant updates. I can unsubscribe at any time."
LeadForm = CHECKBOX. `consent_given` (checkbox state) / `consent_text` / `consent_at` all sent.

**Privacy policy**: `Medical\web\src\app\privacy-policy\page.tsx` — YES. Section 5:
> "When you submit an enquiry, we share the details you provide with a specialist partner firm in our partner network, so that they can respond and provide the advice you asked for. That partner firm [acts as an independent data controller]... We share your enquiry only for the purpose of responding to it."

No re-referral paragraph. Partner ternary truthy (empty-name object), sharing branch renders, name never interpolated.

**Verification flow hooks**: no verify call in submit route (only `enrollLead`, no-op while `LEAD_NURTURE_ENABLED` unset). `Medical\web\src\lib\leads\verify.ts` used by `api\leads\inbound\email\route.ts`. Confirm loop: `api\leads\confirm\[token]\route.ts`, `api\leads\inbound\twilio\route.ts`; handoff: `api\leads\forwarded\[token]\route.ts`, `api\leads\handoff\resend\route.ts`.

**Thank-you / confirmation copy**: `Medical\web\src\app\thank-you\page.tsx`: "Your message is with our team. We aim to respond within 24 hours, usually the [same day]." / "Your enquiry is with our team. We will be in touch within one working day, usually [the same day]." `complete\page.tsx`: "We have everything we need. A specialist medical accountant will be in touch shortly."

**Conflicts with pool model**:
- Messaging: checkbox consent; "our team" thank-you; complete page "A specialist medical accountant will be in touch". ~3 messaging surfaces.
- Body copy (DO-NOT-EDIT): first-person "our team/accountants" in `app\page.tsx`, `app\services\page.tsx`, `app\blog\gp-accountant-services\page.tsx`, `app\blog\gp-practice-management\page.tsx` (4 files).

**Summary row**: `| Medical | needs-change (checkbox; wording already partner-network) | privacy OK | form fields OK | ~7 (3 messaging + 4 body) |`

---

## 4. Solicitors

**Site**: dir `Solicitors`, brand **Accounts for Lawyers**, domain `www.accountsforlawyers.co.uk`, Next.js ^15.5.14 App Router on Vercel.

**Enquiry forms**:
- MAIN `Solicitors\web\src\components\forms\LeadForm.tsx`. Fields: fullName (required), email (required), phone (required), role select (required), message (optional), optional disclosure situation/prompted/callGoal, consent CHECKBOX (required, submit disabled until ticked). Hidden `practiceName`. Submits via `Solicitors\web\src\lib\leads\submit-client.ts` → `/api/leads/submit` → `Solicitors\web\src\app\api\leads\submit\route.ts` (own handler + `enrollLead`).
- `forms\MiniCapture.tsx` (shared notice-only), `blog\InlineMiniLeadForm.tsx`, `forms\DetailsForm.tsx` (→ `/api/leads/complete`), `support\SpecialistWidget.tsx` (leadConsentText, consent_given true), `resources\ResourceGate.tsx` — wraps MiniCapture ("Mirrors Property's GateOrForm pattern, no email-unlock"), so resource gating here rides the LEAD consent notice, not a resource checkbox, `blog\ExitIntentModal.tsx` (prompt only), `forms\BookingPicker.tsx`. Site also has `/api/resources` routes.

**Consent notice (verbatim)** — `Solicitors\web\src\config\site.ts` line 21, ACTIVE branch:
> "I agree to my details being shared by Accounts for Lawyers with its specialist partner network, and to Accounts for Lawyers and its partner firms contacting me about my enquiry by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

`resourceConsentText` (line 71): "I agree to Accounts for Lawyers using my email to send me the resource I requested." (defined but the ResourceGate wraps MiniCapture, which uses leadConsentText).
LeadForm = CHECKBOX. `consent_given`/`consent_text`/`consent_at` sent.

**Privacy policy**: `Solicitors\web\src\app\privacy-policy\page.tsx` — YES. Section 5:
> "When you submit an enquiry, we may share the details you provide with a specialist partner firm in our network, so that they can respond and provide the advice you asked for. Any such partner firm acts as an **independent data controller**... We share your enquiry only for the purpose of responding to it."

No re-referral paragraph. Partner ternary truthy, sharing branch renders.

**Verification flow hooks**: no verify in submit route (only `enrollLead`, dormant without `LEAD_NURTURE_ENABLED`). `Solicitors\web\src\lib\leads\verify.ts` used by `api\leads\inbound\email\route.ts`. Confirm loop: `api\leads\confirm\[token]\route.ts`, `api\leads\inbound\twilio\route.ts`; handoff: `api\leads\forwarded\[token]\route.ts`, `api\leads\handoff\resend\route.ts`.

**Thank-you / confirmation copy**: `Solicitors\web\src\app\thank-you\page.tsx`: "Your message is with our team. We aim to respond within 24 hours..." / "Your enquiry is with our team. We will be in touch within one working day..." `complete\page.tsx`: "We have everything we need. A specialist accountant for solicitors will be in touch shortly."

**Conflicts with pool model**:
- Messaging: checkbox consent; "our team" thank-you; complete page in-house framing. ~3 messaging surfaces.
- Body copy (DO-NOT-EDIT): `app\services\[slug]\data.ts` ("We work with solicitors only. Every client is a law firm..." — first-person as the advising firm), `app\about\page.tsx`, `app\page.tsx`, plus 3 research pages with "our team" phrasing (~6 files).

**Summary row**: `| Solicitors | needs-change (checkbox; wording already partner-network) | privacy OK | form fields OK | ~9 (3 messaging + 6 body) |`

---

## 5. generalist

**Site**: dir `generalist`, brand **Holloway Davies**, domain `www.hollowaydavies.co.uk`, Next.js ^15.5.14 App Router on Vercel.

**Enquiry forms**:
- MAIN `generalist\web\src\components\forms\LeadForm.tsx`. Fields: role select FIRST (required), fullName (required), email (required), phone (required), message (optional), optional disclosure situation/prompted/callGoal, consent CHECKBOX (required, submit disabled until ticked). Submits via `generalist\web\src\lib\leads\submit-client.ts` → `/api/leads/submit` → `generalist\web\src\app\api\leads\submit\route.ts` (shared `createLeadSubmitHandler` + `enrollLead`).
- `forms\MiniCapture.tsx` (shared notice-only), `blog\InlineMiniLeadForm.tsx`, `forms\DetailsForm.tsx` (→ `/api/leads/complete`), `support\SpecialistWidget.tsx` (leadConsentText, consent_given true; the `submitPropertyLead` mention is a comment only, submit correctly uses `submitGeneralistLead`), `resources\ResourceGate.tsx` + `resources\GateOrForm.tsx` (checkbox, resourceConsentText), `blog\ExitIntentModal.tsx` (prompt only).
- NEWSLETTER stack (unique to this site): `components\newsletter\SignupForm.tsx` (email + marketing-consent CHECKBOX, `NEWSLETTER_CONSENT_TEXT`, POSTs `/api/nurture/subscribe`), `newsletter\ExitIntentModal.tsx`, `newsletter\InlinePrompt.tsx`, `newsletter\StickyCard.tsx`.

**Consent notice (verbatim)** — `generalist\web\src\config\site.ts` line 21, ACTIVE branch:
> "I agree to my details being shared by Holloway Davies with its specialist partner network, and to Holloway Davies and its partner firms contacting me about my enquiry by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

`resourceConsentText` (line 72): "I agree to Holloway Davies using my email to send me the resource I requested."
LeadForm = CHECKBOX. `consent_given`/`consent_text`/`consent_at` sent.

**Privacy policy**: `generalist\web\src\app\privacy-policy\page.tsx` — YES. Section 5:
> "When you submit an enquiry, we share the details you provide with a specialist partner firm in our **specialist partner network**, so that they can respond and provide the advice you asked for. That [partner firm is an independent controller]... We share your enquiry only for the purpose of responding to it."

No re-referral paragraph. Partner ternary truthy, sharing branch renders.

**Verification flow hooks**: no verify in submit route. `generalist\web\src\lib\leads\verify.ts` used by `api\leads\inbound\email\route.ts`. Confirm loop: `api\leads\confirm\[token]\route.ts`, `api\leads\inbound\twilio\route.ts`; handoff: `api\leads\forwarded\[token]\route.ts`, `api\leads\handoff\resend\route.ts`. Newsletter double-entry via `/api/nurture/subscribe`.

**Thank-you / confirmation copy**: `generalist\web\src\app\thank-you\page.tsx`: "Your message is with an accountant on the team. We aim to reply within one [working day]..." `complete\page.tsx`: "We have everything we need. An accountant will be in touch shortly."

**Conflicts with pool model**:
- Messaging: checkbox consent; thank-you "an accountant on the team" (strong in-house implication); complete page same; newsletter SignupForm reassurance line "No spam. Unsubscribe one click. We never share your email." (email-only scope, but sits on the same page as lead capture and reads as a blanket no-share claim). ~4 messaging surfaces.
- Body copy (DO-NOT-EDIT): first-person copy in `app\about`, `app\blog\page.tsx`, `app\glossary\[slug]\data.ts`, `app\locations\[slug]\data.ts`, `app\r-and-d-credits\page.tsx`, `app\templates\page.tsx` (~6 files; locations/glossary data files fan out across many rendered pages).

**Summary row**: `| generalist | needs-change (checkbox; wording already partner-network) | privacy OK | form fields OK | ~10 (4 messaging + 6 body) |`

---

## 6. construction-cis

**Site**: dir `construction-cis`, brand **Trade Tax Specialists**, domain `www.tradetaxspecialists.co.uk`, Next.js ^15.5.14 App Router on Vercel.

**Enquiry forms**:
- MAIN `construction-cis\web\src\components\forms\LeadForm.tsx`. Fields: role select (required), conditional segment selects `trade` (optional, shown for subcontractors/self-employed) and `subbieCount` (optional, shown for main contractors), fullName (required), email (required), phone (required), message (optional), optional disclosure situation/prompted/callGoal, consent CHECKBOX (required, submit disabled until ticked). Submits via `construction-cis\web\src\lib\leads\submit-client.ts` → `/api/leads/submit` → `construction-cis\web\src\app\api\leads\submit\route.ts` (shared `createLeadSubmitHandler` + `enrollLead`).
- `forms\MiniCapture.tsx` (shared notice-only), `blog\InlineMiniLeadForm.tsx`, `forms\DetailsForm.tsx` (→ `/api/leads/complete`), `support\SpecialistWidget.tsx` (leadConsentText, consent_given true), `resources\ResourceGate.tsx` — wraps MiniCapture (GateOrForm pattern, no email-unlock, rides lead consent notice), `blog\ExitIntentModal.tsx` (prompt only), `forms\BookingPicker.tsx`.

**Consent notice (verbatim)** — `construction-cis\web\src\config\site.ts` line 19, ACTIVE branch (`niche.partner ?? null` still truthy object):
> "I agree to my details being shared by Trade Tax Specialists with its specialist partner network, and to Trade Tax Specialists and its partner firms contacting me about my enquiry by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

(Dead branch line 20: "...Trade Tax Specialists may follow up by email and SMS over the next 11 days...")
`resourceConsentText`: "I agree to Trade Tax Specialists using my details to send me the free resource I have requested and to respond to any enquiry I submit."
LeadForm = CHECKBOX. `consent_given`/`consent_text`/`consent_at` sent.

**Privacy policy**: `construction-cis\web\src\app\privacy-policy\page.tsx` — YES. Section 5:
> "When you submit an enquiry, we share the details you provide with a specialist partner firm from our partner network, so that they can respond and provide the advice you asked for. The partner firm acts as [an independent data controller]... We share your enquiry only for the purpose of responding to it."

No re-referral paragraph. Partner ternary truthy, sharing branch renders.

**Verification flow hooks**: no verify in submit route. `construction-cis\web\src\lib\leads\verify.ts` used by `api\leads\inbound\email\route.ts`. Confirm loop: `api\leads\confirm\[token]\route.ts`, `api\leads\inbound\twilio\route.ts`; handoff: `api\leads\forwarded\[token]\route.ts`, `api\leads\handoff\resend\route.ts`.

**Thank-you / confirmation copy**: `construction-cis\web\src\app\thank-you\page.tsx`: metadata title "Thank you | We'll be in touch"; body "Your enquiry is with a specialist on the team. We aim to reply within one working day..." `complete\page.tsx`: "We have everything we need. A specialist will be in touch shortly." / "Add the last detail we need and a specialist will be in touch to arrange your free [CIS tax review]."

**Conflicts with pool model**:
- Messaging: checkbox consent; thank-you "a specialist on the team" + "We'll be in touch" title; complete page in-house framing. ~3 messaging surfaces.
- Body copy (DO-NOT-EDIT): first-person "our team" phrasing in 4 research index pages (`app\research\uk-construction-*`) plus `lib\support\faq.ts` FAQ answers written first-person (~5 files).

**Summary row**: `| construction-cis | needs-change (checkbox; wording already partner-network) | privacy OK | form fields OK | ~8 (3 messaging + 5 body) |`

---

## Summary table

| Site | Consent | Privacy | Form fields | Copy conflicts |
|---|---|---|---|---|
| Property | OK (notice-only, partner network + re-referral) | OK (incl. re-referral para) | OK | ~4 (3 messaging + 1 body) |
| Dentists | needs-change (checkbox; wording already partner-network) | OK | OK | ~3 (messaging) |
| Medical | needs-change (checkbox; wording already partner-network) | OK | OK | ~7 (3 messaging + 4 body) |
| Solicitors | needs-change (checkbox; wording already partner-network) | OK | OK | ~9 (3 messaging + 6 body) |
| generalist | needs-change (checkbox; wording already partner-network) | OK | OK | ~10 (4 messaging + 6 body) |
| construction-cis | needs-change (checkbox; wording already partner-network) | OK | OK | ~8 (3 messaging + 5 body) |

## Cross-site notes for Phase 1

1. Partner truthiness: all six sites render the partner-sharing branch because `niche.partner` is a truthy object even with `name: ""` (deliberate since `2cc693f8`). The `null = in-house` comments in every `site.ts` are stale relative to actual config state; no site can currently reach the in-house branch.
2. Only Property discloses onward re-referral in its privacy policy and consent notice. The other five consents say "partner firms contacting me" (plural, arguably covers it) but their privacy policies describe a single-firm share with no re-referral paragraph. Porting Property's Section 5 re-referral paragraph is the gap.
3. Only Property is notice-only (LI acknowledgement). The other five use a blocking checkbox with submit disabled until ticked; converting to Property's Annex B.1 notice pattern is the target change per site (LeadForm + site.ts).
4. Shared MiniCapture is already notice-only estate-wide and always sends `consent_given: true` with the site's leadConsentText, so the secondary surfaces (InlineMiniLeadForm, ResourceGate-as-MiniCapture on Solicitors/cis, calculator gates) are already in target state wherever leadConsentText is partner-network wording.
5. Pool/claim API scaffolding (`forwarded/[token]`, `handoff/resend`, and on Property `claim/[token]` + `offer/[token]`) already exists on all six sites' `/api/leads/` trees.
6. Verification asymmetry: only Property verifies contactability at submit (`verifyLead`: Twilio Lookup + ZeroBounce). The other five ship `lib\leads\verify.ts` but only use it in the inbound-email route; leads enter the pool unverified on those sites.
7. generalist quirks: newsletter stack with its own marketing-consent checkbox and a "We never share your email" line on `SignupForm.tsx` (email-only scope but reads as a blanket no-share claim).
# Phase 0 inventory, part 2 (contractors-ir35, digital-agency, startups-tech, charities, care, crypto)

READ-ONLY audit for AUDIT.md. Date: 2026-08-10. Branch: expansion/phase-0.

Shared architecture note (applies to all six): Next.js App Router sites in the monorepo, deployed on Vercel (manual CLI deploys, auto-deploy off). All lead submissions post to the site-local `/api/leads/submit` chokepoint, which wraps `createLeadSubmitHandler` from `C:\Users\user\Documents\Accounting\packages\web-shared\leads\server\createLeadSubmitHandler.ts` (honeypot flagging via `enquiry_ref`, server validation, 24h dedupe, preview no-op, probe support) and inserts into the shared Supabase `leads` table. Owner email notification is via the DB trigger (`leads_to_email_trg` -> `/api/leads/notify`), not in the submit route. The handler's own comment confirms no verification step: "Property's steps 4-6 (Twilio/email verification, nurture enrolment, booking) are not ported" (paraphrase of lines 24-26).

Critical config mechanic: every `site.ts` derives `leadConsentText` from `niche.partner` with a ternary. On **contractors-ir35, digital-agency and startups-tech**, `niche.config.json` has `"partner": { "name": "", "privacy_policy_url": null }`, which is a **truthy object**, so the PARTNER branch renders site-wide (consent text and privacy policy) even though the partner name is empty. On **charities, care and crypto**, `"partner": null`, so the in-house branch renders.

---

## 1. contractors-ir35

**Site**: dir `contractors-ir35`, brand **Contractor Tax Accountants** (`display_name`), domain `www.contractortaxaccountants.co.uk`, Next.js App Router on Vercel.

**Enquiry forms**
- Main `LeadForm`: `C:\Users\user\Documents\Accounting\contractors-ir35\web\src\components\forms\LeadForm.tsx`. Fields: `role` select (required, options from `niche.lead_form.role_options`), `fullName` (required), `email` (required), `phone` (required), `message` (optional, min-length floor when present), qualifier selects `situation` / `prompted` / `callGoal` (optional), hidden `sourceUrl`, honeypot `enquiry_ref`. Submits via `submitContractorLead` in `web\src\lib\leads\submit-client.ts` -> POST `/api/leads/submit` (`web\src\app\api\leads\submit\route.ts`), which also enrols the lead into nurture (`enrollLead` / `routePrimarySequence`).
- `MiniCapture`: `web\src\components\forms\MiniCapture.tsx` is a thin adapter over the SHARED `@accounting-network/web-shared/leads/MiniCapture`, passing `consentText: siteConfig.leadConsentText`. Consumers: `ResourceGate.tsx` (de-gated 2026-07-18, now a MiniCapture enquiry slot, GateOrForm pattern), `InlineMiniLeadForm.tsx` (blog), `CalcResultCta.tsx`, `MobileToolSlot.tsx`, `ResultGateModal.tsx`, `ExitIntentModal.tsx`, `DeepScrollModal.tsx`.
- `DetailsForm`: `web\src\components\forms\DetailsForm.tsx`, post-submit profile completion (`full_name`, `phone`, honeypot) -> POST `/api/leads/complete` with a signed profile token. Used by `/complete` page.
- `BookingPicker`: `web\src\components\forms\BookingPicker.tsx` -> `/api/leads/book` (callback slot picker, used on `/book` and `/complete`).
- `SpecialistWidget`: `web\src\components\support\SpecialistWidget.tsx` (chat-style prompt widget).
- No separate newsletter form.

**Consent notice (verbatim)**
`leadConsentText` (partner branch, LIVE because `partner` is a truthy empty-name object):
> "I agree to my details being shared by Contractor Tax Accountants with its specialist partner network, and to Contractor Tax Accountants and its partner firms contacting me about my enquiry by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

Dead falsy branch in the same file (NOT rendered, `web\src\config\site.ts` line 20):
> "I agree to be contacted about my enquiry. I understand that Contractor Tax Accountants may follow up by email and SMS over the next 11 days to arrange a free call. I can opt out at any time by replying STOP to any message."

`resourceConsentText` (in-house, used by resource paths only):
> "I agree to Contractor Tax Accountants using my details to send me the free resource I have requested and to respond to any enquiry I submit."

Mechanism: mandatory **checkbox** in LeadForm (`if (!data.get("consent")) errs.consent = "Please tick the box to continue."`; submit disabled until ticked). Sends `consent_given`, `consent_text` (label text + " See our Privacy Policy."), `consent_at`.

**Privacy policy**: `web\src\app\privacy-policy\page.tsx`. Partner ternary; with truthy `partner` the DISCLOSING branch renders:
> "When you submit an enquiry, we share the details you provide with a specialist partner firm from our **specialist partner network**, so that they can respond and provide the advice you asked for. The partner firm acts as an **independent data controller** of the information it receives, and its own use of your data is governed by its own privacy policy. We share your enquiry only for the purpose of responding to it."

Section 2 also says data is used "to deal with your enquiry and to pass it to a specialist partner firm in our network so that they can provide the advice you have requested." Aligned with the pool model. `partner` in niche.config.json: `{ "name": "", "privacy_policy_url": null }`.

**Verification flow hooks**: no pre-share identity verification (Twilio/email verification explicitly not ported, see comment in `web\src\app\api\leads\submit\route.ts` ~line 21). Post-submit nurture stack exists: `web\src\app\api\cron\lead-nurture\route.ts` (hourly sends), `web\src\app\api\leads\confirm\[token]\` (email confirm link), `web\src\app\api\leads\inbound\twilio\route.ts` (inbound SMS incl. STOP), `web\src\app\api\leads\inbound\email\route.ts`, `web\src\app\api\leads\optout\`, `web\src\app\api\leads\handoff\` + `forwarded\[token]` (manual forward QA gate), `web\src\app\api\leads\complete\route.ts`, `book` / `booking-viewed` / `ics`. Shared token logic in `packages\web-shared\lead-nurture\tokens.ts`.

**Thank-you / confirmation copy**: `web\src\app\thank-you\page.tsx`:
> "We have received your enquiry and will come back to you within one working day. You will hear from a specialist contractor accountant, not a sales team."

`web\src\app\complete\page.tsx`:
> "We have everything we need. An accountant will be in touch shortly. If you would like to pick a time that suits you, you can book a callback below."

**Conflicts with the pool model** (consent + privacy are already partner-network wording; conflicts are first-person delivery promises):
1. Thank-you page: "You will hear from a specialist contractor accountant, not a sales team" (messaging surface; "we"-delivery framing survives the pool model only loosely, "not a sales team" is fine, but the promise is made by the brand).
2. Contact page `web\src\app\contact\page.tsx`: "We are in touch within 24 hours" / "A specialist contractor accountant will respond to arrange a short call. Not a sales team, not a call centre." (messaging surface).
3. About page `web\src\app\about\page.tsx`: "We respond within one working day. You deal with specialist accountants, not a call centre." (messaging surface).
4. SpecialistWidget: "A specialist replies within one working day" (messaging surface).
5. `/complete` page: "An accountant will be in touch shortly" (messaging surface).
No named firms. No "we do not share" claims on rendered surfaces (the in-house wording exists only in the dead ternary branch). Body copy: no no-share claims found in `web\content\`.

---

## 2. digital-agency

**Site**: dir `digital-agency`, brand **Agency Founder Finance**, domain `www.agencyfounderfinance.co.uk`, Next.js App Router on Vercel.

**Enquiry forms**
- Main `LeadForm`: `C:\Users\user\Documents\Accounting\digital-agency\web\src\components\forms\LeadForm.tsx`. Fields identical pattern: `role` select (required), `fullName` (required), `email` (required), `phone` (required), `message` (optional), `situation` / `prompted` / `callGoal` (optional), hidden `sourceUrl`, honeypot `enquiry_ref`. Submits via `submitAffLead` (`web\src\lib\leads\submit-client.ts`) -> POST `/api/leads/submit`.
- `MiniCapture` (LOCAL, full component): `web\src\components\forms\MiniCapture.tsx`. Fields `full_name` / `email` / `phone` / `message` all required, consent checkbox, honeypot. Consumers: `blog\InlineMiniLeadForm.tsx`, `blog\ExitIntentModal.tsx`, `intent\DeepScrollModal.tsx`, `tools\CalcResultCta.tsx`, `resources\CalculatorPageResources.tsx`.
- `ResourceGate`: `web\src\components\resources\ResourceGate.tsx` -> `/api/resources/deliver`, uses `resourceConsentText` (in-house wording, comment: "never" partner).
- Newsletter: `web\src\components\newsletter\SignupForm.tsx` -> `/api/nurture/subscribe` (plus `InlinePrompt.tsx`, `StickyCard.tsx`, `newsletter\ExitIntentModal.tsx`).
- `SpecialistWidget`: `web\src\components\support\SpecialistWidget.tsx`.

**Consent notice (verbatim)**
`leadConsentText` (partner branch LIVE, truthy empty-name `partner`):
> "I agree to my details being shared by Agency Founder Finance with its specialist partner network, and to Agency Founder Finance and its partner firms contacting me about my enquiry by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

`resourceConsentText`:
> "I agree to Agency Founder Finance using my details to send me the free resource I have requested and to respond to any enquiry I submit."

Mechanism: mandatory **checkbox** in both LeadForm and MiniCapture ("Please tick the box to continue."). Sends `consent_given` / `consent_text` / `consent_at`.

**Privacy policy**: `web\src\app\privacy-policy\page.tsx`, partner ternary, disclosing branch renders:
> "When you submit an enquiry, we share the details you provide with a specialist partner firm from our partner network, so that they can respond and provide the advice you asked for. That partner firm acts as an **independent data controller** ... governed by its own privacy policy. We share your enquiry only for the purpose of responding to it."

`partner` in niche.config.json: `{ "name": "", "privacy_policy_url": null }`. Aligned with the pool model.

**Verification flow hooks**: none on the lead path. Newsletter double-opt-in exists: `web\src\app\api\nurture\confirm\`, `subscribe`, `unsubscribe`, `send`, `events`. No SMS anywhere.

**Thank-you copy**: `web\src\app\thank-you\page.tsx`:
> "Your message is on its way to our team. We aim to respond within 24 hours, usually same day."

**Conflicts with the pool model**
1. Thank-you: "on its way to our team. We aim to respond within 24 hours" (messaging surface; "our team" implies in-house handling).
2. Contact page `web\src\app\contact\page.tsx`: "Fill in the form and we will get back to you within 24 hours" and "We will respond within 24 hours to confirm receipt" (messaging surface).
3. Newsletter `SignupForm.tsx` line 206: "No spam. Unsubscribe one click. We never share your email." (messaging surface; scoped to newsletter email, technically compatible if newsletter emails are never pooled, but should be reviewed).
4. SpecialistWidget: "A specialist replies within one working day" (messaging surface).
No named firms. Body copy: one grep hit in `web\content\blog\chart-of-accounts-digital-agency-retainer-project-work.md` ("They should never share an account") is a FALSE POSITIVE about ledger accounts, not data sharing. No genuine body conflicts.

---

## 3. startups-tech

**Site**: dir `startups-tech`, brand **Founder Tax Partners**, domain `www.foundertaxpartners.co.uk`, Next.js App Router on Vercel.

**Enquiry forms**
- Main `LeadForm`: `C:\Users\user\Documents\Accounting\startups-tech\web\src\components\forms\LeadForm.tsx`. Two-step layout (step 1 role+message, step 2 details): `role` select (required), `message` (optional), `situation` / `prompted` / `callGoal` (optional), `fullName` / `email` / `phone` (all required), honeypot `enquiry_ref`, hidden `sourceUrl`. Submits via `submitSiteLead` (`web\src\lib\leads\submit-client.ts`) -> POST `/api/leads/submit`.
- `MiniCapture` (LOCAL): `web\src\components\calculators\MiniCapture.tsx` (`full_name`, `phone`, `email`, `message`, consent checkbox, honeypot) -> `/api/leads/submit`. Used via `CalcResultCta.tsx` on `calculators\[slug]`.
- No ResourceGate, no newsletter, no SpecialistWidget, no DetailsForm.

**Consent notice (verbatim)**
`leadConsentText` (partner branch LIVE, truthy empty-name `partner` in niche.config.json):
> "I agree to my details being shared by Founder Tax Partners with its specialist partner network, and to Founder Tax Partners and its partner firms contacting me about my enquiry by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

No `resourceConsentText` (no resource gate). Mechanism: mandatory **checkbox** in both forms. Sends `consent_given` / `consent_text` / `consent_at` (LeadForm appends " See our Privacy Policy." to the stored text; MiniCapture stores the bare `leadConsentText`).

**Privacy policy**: `web\src\app\privacy-policy\page.tsx`, partner ternary, disclosing branch renders (richest variant):
> "When you submit an enquiry, we share information about you and your enquiry with a specialist partner firm in our specialist partner network, so that they can contact you and provide the advice you asked for. ... The partner firm acts as an **independent data controller** of the information it receives, may share it within its own group of companies for the same purpose, and uses it under its own [privacy policy]. We share this information only for the purpose of arranging and providing the advice you asked for."

Section 7 objection right "including our sharing of your enquiry with our partner firm". `partner`: `{ "name": "", "privacy_policy_url": null }` (privacyPolicyUrl null, so the link fallback text renders). Aligned with pool model.

**Verification flow hooks**: ABSENT. Only `/api/leads/submit` (+ `admin`, `og`, `track`). No SMS/email verification, no nurture.

**Thank-you copy**: `web\src\app\thank-you\page.tsx`:
> "Thanks, your enquiry is on its way." / "We'll come back to you within 24 hours."

**Conflicts with the pool model**
1. Thank-you: "We'll come back to you within 24 hours" (messaging surface; first-person only, no partner mention).
2. Contact page: "Tell us about your startup tax situation. We reply within 24 hours." (messaging surface).
3. About page `web\src\app\about\page.tsx`: "We work on a fixed-fee basis and reply within one working day." (messaging surface).
No "do not share" claims outside the cookie-policy analytics statement ("we do not sell or share this data", scoped to anonymous analytics events, `web\src\app\cookie-policy\page.tsx` line 45, compatible). No named firms. No body-copy conflicts found.

---

## 4. charities

**Site**: dir `charities`, brand **Trustee Tax**, domain `www.trusteetax.co.uk`, Next.js App Router on Vercel.

**Enquiry forms**
- Main `LeadForm`: `C:\Users\user\Documents\Accounting\charities\web\src\components\forms\LeadForm.tsx`. Two-step (header comment: step 2 "name, email, phone + mandatory data-sharing consent"; LD-04 note: "consent_text stored byte-identical to the rendered label"). Fields: `role` select (required), `message` (labelled "(optional)"), `situation` / `prompted` / `callGoal` (optional), `fullName` / `email` / `phone` (required), honeypot `enquiry_ref`, hidden `sourceUrl`. Submits via `submitSiteLead` -> POST `/api/leads/submit` (route has a test file `route.test.ts`).
- `MiniCapture` (LOCAL): `web\src\components\calculators\MiniCapture.tsx` (`full_name`, `phone`, `email`, `message` all required per header comment, consent checkbox, honeypot) -> `/api/leads/submit`. Used via `CalcResultCta.tsx` on calculators and the four `research\uk-charity-*` pages.
- No ResourceGate, newsletter or widget.

**Consent notice (verbatim)**
`partner` is **null**, so the IN-HOUSE branch renders:
> "I agree to Trustee Tax using my details to respond to my enquiry and provide the advice I have requested."

(The unrendered partner branch here is the older SINGLE-FIRM wording: "I agree to my details being shared by Trustee Tax with our specialist partner firm ${partner.name}, an independent data controller that uses them under its own privacy policy, to respond to my enquiry and provide specialist advice." Note it interpolates `partner.name`; with an empty-name partner object it would render broken copy.)

No `resourceConsentText`. Mechanism: mandatory **checkbox** in both forms. Sends `consent_given` / `consent_text` / `consent_at`.

NOTE: the briefed expectation ("I agree to be contacted... 11 days") is NOT present on this site. That wording exists only as the dead falsy branch on contractors-ir35.

**Privacy policy**: `web\src\app\privacy-policy\page.tsx`. With `partner = null` the CONTRADICTING branch renders:
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm. We use the service providers listed below only as our processors, acting on our instructions."

Followed by "We do not sell your personal data, and we do not use it for third-party advertising." The disclosing branch exists in code but uses `${partner.name}` single-firm wording ("we share information about you and your enquiry with **{partner.name}** ... independent data controller ... may share it within its own group of companies"). Flipping `partner` to the empty-name object (as done on the tier-1 sites) would render broken copy here; the ternary needs the network wording before the pool model goes live.

**Verification flow hooks**: ABSENT. Only `/api/leads/submit` (+ admin/og/track).

**Thank-you copy**: `web\src\app\thank-you\page.tsx`:
> "Thanks, your enquiry is on its way." / "We'll come back to you within 24 hours."

**Conflicts with the pool model**
1. Privacy policy: "we do **not** share it with any third-party advisory firm" (messaging surface, DIRECT contradiction).
2. Consent text: in-house only, no partner-sharing mention (messaging surface).
3. Thank-you: "We'll come back to you within 24 hours" (messaging surface).
4. Contact page: "Tell us about your charity, CIC or social enterprise. We reply within 24 hours." (messaging surface).
5. About page: "We work on a fixed-fee basis. You know what you are paying before we start. We reply within one working day." (messaging surface).
Cookie policy analytics no-share line is scoped and compatible. No named firms. No body-copy conflicts found in `web\content\`.

---

## 5. care

**Site**: dir `care`, brand **Care Home Tax**, domain `www.carehometax.co.uk`, Next.js App Router on Vercel.

**Enquiry forms**
- Main `LeadForm`: `C:\Users\user\Documents\Accounting\care\web\src\components\forms\LeadForm.tsx`. Same template as startups-tech: `role` select (required), `message` (optional), `situation` / `prompted` / `callGoal` (optional), `fullName` / `email` / `phone` (required), honeypot `enquiry_ref`, hidden `sourceUrl`. Submits via `submitSiteLead` -> POST `/api/leads/submit`.
- `MiniCapture` (LOCAL): `web\src\components\calculators\MiniCapture.tsx` (`full_name`, `phone`, `email`, `message`, consent checkbox, honeypot) -> `/api/leads/submit`, via `CalcResultCta.tsx` on `calculators\[slug]`.
- Nothing else (no gate, newsletter, widget).

**Consent notice (verbatim)**: `partner` is **null**, in-house branch renders:
> "I agree to Care Home Tax using my details to respond to my enquiry and provide the advice I have requested."

(Unrendered partner branch = single-firm `${partner.name}` wording as on charities.) No `resourceConsentText`. Mandatory **checkbox**; sends `consent_given` / `consent_text` / `consent_at`. The "11 days" wording is NOT present.

**Privacy policy**: `web\src\app\privacy-policy\page.tsx`, `partner = null` renders:
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm. We use the service providers listed below only as our processors, acting on our instructions."

Disclosing branch is single-firm `${partner.name}` wording (same empty-name breakage risk as charities).

**Verification flow hooks**: ABSENT. Only `/api/leads/submit` (+ admin/og/track).

**Thank-you copy**: `web\src\app\thank-you\page.tsx`:
> "Thanks, your enquiry is on its way." / "We'll come back to you within 24 hours."

**Conflicts with the pool model**
1. Privacy policy "we do **not** share it with any third-party advisory firm" (messaging surface, DIRECT contradiction).
2. In-house consent text, no sharing mention (messaging surface).
3. Thank-you "We'll come back to you within 24 hours" (messaging surface).
4. Contact page: "Tell us about your care service. We reply within 24 hours." (messaging surface).
5. About page: "We work on a fixed-fee basis and reply within one working day." (messaging surface).
No named firms, no body-copy conflicts found.

---

## 6. crypto

**Site**: dir `crypto`, brand **Crypto Tax Partners**, domain `www.cryptotaxpartners.co.uk`, Next.js App Router on Vercel.

**Enquiry forms**
- Main `LeadForm`: `C:\Users\user\Documents\Accounting\crypto\web\src\components\forms\LeadForm.tsx`. Same template: `role` select (required), `message` (optional), `situation` / `prompted` / `callGoal` (optional), `fullName` / `email` / `phone` (required), honeypot `enquiry_ref`, hidden `sourceUrl`. Submits via `submitSiteLead` -> POST `/api/leads/submit`.
- `MiniCapture` (LOCAL): `web\src\components\calculators\MiniCapture.tsx` (`full_name`, `phone`, `email`, `message`, consent checkbox, honeypot) -> `/api/leads/submit`, via `CalcResultCta.tsx` on `calculators\[slug]`.
- Nothing else.

**Consent notice (verbatim)**: `partner` is **null**, in-house branch renders:
> "I agree to Crypto Tax Partners using my details to respond to my enquiry and provide the advice I have requested."

(Unrendered partner branch = single-firm `${partner.name}` wording.) No `resourceConsentText`. Mandatory **checkbox**; sends `consent_given` / `consent_text` / `consent_at`. The "11 days" wording is NOT present.

**Privacy policy**: `web\src\app\privacy-policy\page.tsx`, `partner = null` renders:
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm. We use the service providers listed below only as our processors, acting on our instructions."

Disclosing branch is single-firm `${partner.name}` wording (crypto's variant omits the "may share it within its own group" sentence; same empty-name breakage risk).

**Verification flow hooks**: ABSENT. Only `/api/leads/submit` (+ admin/og/track).

**Thank-you copy**: `web\src\app\thank-you\page.tsx`:
> "Thanks, your enquiry is on its way." / "We'll come back to you within 24 hours."

**Conflicts with the pool model**
1. Privacy policy "we do **not** share it with any third-party advisory firm" (messaging surface, DIRECT contradiction).
2. In-house consent text, no sharing mention (messaging surface).
3. Thank-you "We'll come back to you within 24 hours" (messaging surface).
4. Contact page: "Tell us about your crypto tax situation. We reply within 24 hours." (messaging surface).
5. About page: "We work on a fixed-fee basis and reply within one working day." (messaging surface).
No named firms, no body-copy conflicts found. (Brand name "Crypto Tax Partners" itself is conveniently pool-compatible.)

---

## Summary table

Consent-OK definition applied: target state = notice-only LI acknowledgement mentioning partner sharing. All six sites use a mandatory checkbox, so all are needs-change on mechanism; the three truthy-partner sites already have the right WORDING.

| Site | Consent | Privacy | Form fields | Copy conflicts |
|---|---|---|---|---|
| contractors-ir35 | needs-change (checkbox; wording already partner-network) | OK (partner branch renders, network disclosure) | OK (name/email/phone/role req, message + 3 qualifiers opt, honeypot, consent trio sent) | 5 |
| digital-agency | needs-change (checkbox; wording already partner-network) | OK (partner branch renders, network disclosure) | OK (same pattern; MiniCapture all-required) | 4 |
| startups-tech | needs-change (checkbox; wording already partner-network) | OK (partner branch renders, richest disclosure) | OK (same pattern) | 3 |
| charities | needs-change (checkbox + in-house wording) | contradicts ("we do not share ... any third-party advisory firm") | OK (same pattern) | 5 |
| care | needs-change (checkbox + in-house wording) | contradicts (same clause) | OK (same pattern) | 5 |
| crypto | needs-change (checkbox + in-house wording) | contradicts (same clause) | OK (same pattern) | 5 |

## Cross-site notes for the fix phase

1. Pool switch-on for charities/care/crypto is nominally one line (`"partner": null` -> object) BUT their partner ternaries (site.ts consent + privacy section 2/5/7) interpolate `${partner.name}` as a single named firm. With the tier-1 empty-name pattern they would render broken copy ("shared ... with our specialist partner firm , an independent data controller"). The ternary partner branches must first be rewritten to the network wording used by contractors-ir35 / digital-agency / startups-tech.
2. The briefed "11 days" consent wording does NOT exist on charities/care/crypto. It is the dead falsy branch on contractors-ir35 only (`contractors-ir35\web\src\config\site.ts` line 20) and is currently unrendered.
3. All six store the consent audit trio (`consent_given`, `consent_text`, `consent_at`); moving to notice-only means the `consent_given` gate and "tick the box" validation need removing in LeadForm AND MiniCapture on every site (shared MiniCapture covers contractors-ir35 only; digital-agency and the tier-2 four have local copies).
4. MiniCapture on startups/charities/care/crypto stores `consent_text` WITHOUT the " See our Privacy Policy." suffix, while LeadForm stores it WITH; charities' own LD-04 comment demands byte-identical storage. Minor inconsistency to fold into the rewrite.
5. Only contractors-ir35 has any post-submit contact machinery (nurture, Twilio inbound, confirm tokens, booking). digital-agency has newsletter-only nurture. startups/charities/care/crypto have bare submit -> Supabase -> DB-trigger email notify. No site verifies a lead before it would be forwarded.
# Lead-capture / consent / privacy audit — part 3 (6 sites)

Audited 2026-08-10, read-only, branch `expansion/phase-0`. Context: move to pool/claim lead distribution (leads shared with a specialist partner network; a claiming firm contacts the enquirer directly; onward re-referral within the network possible). All paths relative to `C:\Users\user\Documents\Accounting\`.

Common infrastructure: every site's submit endpoint is a thin wrapper around the shared factory `packages\web-shared\leads\server\createLeadSubmitHandler.ts` (honeypot flagging, validation floors, 24h dedupe, env isolation, Supabase insert). `partner` is `null` in every `niche.config.json`, so every partner-aware ternary in consent and privacy copy renders its **null (in-house) branch** in production.

---

## 1. ecommerce

**Site**: dir `ecommerce`, brand **Ecommerce Finance**, domain `www.ecommercefinance.co.uk`, stack Next.js 15.5 App Router / React / Tailwind / Supabase via shared factory / Vercel.

**Enquiry forms**:
- `ecommerce\web\src\components\forms\LeadForm.tsx` (2-step). Used on: `app\contact\page.tsx`, `app\page.tsx` (homepage CTA), `app\research\online-seller-survival-index\page.tsx`.
- No MiniCapture on this site.
- Fields: step 1 `role` (required), `message` (optional, min 10 chars if given); step 2 `fullName`, `email`, `phone` (all required), consent checkbox (required); optional qualifiers `platforms`, `monthly_revenue_band`, `vat_registered`, `stock_location`, `fulfilment_model`; honeypot `enquiry_ref`.
- Submission: `lib\leads\submit-client.ts` (`submitSiteLead`) → POST `/api/leads/submit` → `app\api\leads\submit\route.ts` = `createLeadSubmitHandler({ source: "ecommerce" })` (7-line file, no hooks).

**Consent notice** (verbatim, null-partner branch of `web\src\config\site.ts`):
> "I agree to `${niche.display_name}` using my details to respond to my enquiry and provide the advice I have requested, including contacting me about it by email, phone and text message. I can ask them to stop at any time by replying STOP or clicking unsubscribe."

(The unused partner branch reads "I agree to my details being shared by ... with our specialist partner firm `${partner.name}`, an independent data controller...".) Mechanism: **checkbox**, submit disabled until ticked. Sends `consent_given`, `consent_text` (with " See our Privacy Policy." appended), `consent_at`. No `resourceConsentText`.

**Privacy policy** (`web\src\app\privacy-policy\page.tsx`, `partner` from siteConfig = null so the else branch renders):
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm. We use the service providers listed below only as our processors, acting on our instructions."

Section 5 heading "Who we share your information with"; lawful basis = legitimate interests. Partner branch (dormant) would disclose sharing with a named partner firm as independent controller. **Contradicts the pool model as-is.**

**Verification flow hooks**: ABSENT. No SMS/email verification, no nurture, no cron routes (`app\api` = admin/leads/og/track only).

**Thank-you** (`web\src\app\thank-you\page.tsx`, 21 lines):
> "Thanks, your enquiry is on its way." / "We'll come back to you within 24 hours."

No partner or referral mention; "we" only. Contact page repeats "We reply within 24 hours."

**Conflicts with the pool model**:
1. Privacy: "we do not share it with any third-party advisory firm" (messaging surface, must change).
2. Thank-you + contact page: "We'll come back to you within 24 hours" — we-only phrasing, no room for a partner firm contacting directly.
3. Consent text frames the site itself as adviser ("provide the advice I have requested") with no sharing mention.
4. BODY COPY (DO-NOT-EDIT flag): homepage and service pages speak as the accountant ("we handle the seller-specific picture", "we handle the multi-platform seller layer", `app\page.tsx` lines 146, 272). Widespread first-person-firm voice across services/for pages.

**Row**: `| ecommerce | needs-change (checkbox, no partner-sharing mention) | contradicts ("we do not share") | OK (rich qualifiers) | 3 (+body-copy voice, DO-NOT-EDIT) |`

---

## 2. hospitality

**Site**: dir `hospitality`, brand **Hospitality Tax**, domain `www.hospitalitytax.co.uk`, stack as ecommerce.

**Enquiry forms**:
- `hospitality\web\src\components\forms\LeadForm.tsx` — on `app\contact\page.tsx`, `app\page.tsx`, two research pages. Fields: `role` (required), `message` (optional min 10), optional qualifiers `situation`, `prompted`, `callGoal`; then `fullName`, `email`, `phone` (required), consent checkbox (required); honeypot `enquiry_ref`.
- **Local MiniCapture** `hospitality\web\src\components\calculators\MiniCapture.tsx` (site-local, NOT the shared package) via `calculators\CalcResultCta.tsx` on `app\calculators\[slug]\page.tsx`. Fields: `full_name`, `phone`, `email`, `message`, consent **checkbox** (required); posts directly to `/api/leads/submit`.
- Submission: `app\api\leads\submit\route.ts` = `createLeadSubmitHandler({ source: "hospitality" })`, no hooks.

**Consent notice** (verbatim, null branch, `web\src\config\site.ts`):
> "I agree to `${niche.display_name}` using my details to respond to my enquiry and provide the advice I have requested."

Checkbox on both forms; `consent_given` / `consent_text` / `consent_at` all sent. No `resourceConsentText`.

**Privacy policy** (`web\src\app\privacy-policy\page.tsx`, null branch renders):
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm. We use the service providers listed below only as our processors, acting on our instructions."

**Contradicts the pool model as-is.**

**Verification flow hooks**: ABSENT (no nurture/cron; `api\track` has a test file, nothing lead-verification related).

**Thank-you** (`web\src\app\thank-you\page.tsx`): identical to ecommerce:
> "Thanks, your enquiry is on its way." / "We'll come back to you within 24 hours."

**Conflicts with the pool model**:
1. Privacy "we do not share..." (must change).
2. Thank-you/contact "We reply within 24 hours" we-only phrasing.
3. Consent text "provide the advice I have requested" — site-as-adviser, no sharing mention.
4. BODY COPY (DO-NOT-EDIT): first-person accountant voice, e.g. `app\page.tsx` line 259 "We handle consolidated accounts and per-site compliance for groups...", line 650 "We handle hospitality-specific accounting."

**Row**: `| hospitality | needs-change (checkbox, no partner-sharing mention) | contradicts ("we do not share") | OK | 3 (+body-copy voice, DO-NOT-EDIT) |`

---

## 3. pharmacies

**Site**: dir `pharmacies`, brand **Pharmacy Tax**, domain `www.pharmacytax.co.uk`, stack as ecommerce.

**Enquiry forms**:
- `pharmacies\web\src\components\forms\LeadForm.tsx` — on `app\contact\page.tsx`, `app\page.tsx`, `app\for\[slug]\page.tsx`, `app\services\[slug]\page.tsx`. Fields identical in shape to hospitality (`role` required, `message` optional, `situation`/`prompted`/`callGoal` qualifiers, `fullName`/`email`/`phone` required, consent checkbox required).
- **Local MiniCapture** `pharmacies\web\src\components\calculators\MiniCapture.tsx` via `calculators\CalcResultCta.tsx` on `app\calculators\[slug]\page.tsx` — same shape as hospitality's (checkbox, posts to `/api/leads/submit`).
- Submission: `app\api\leads\submit\route.ts` = `createLeadSubmitHandler({ source: "pharmacies" })` (source name per file), no hooks.

**Consent notice** (verbatim, null branch, `web\src\config\site.ts`): identical to hospitality:
> "I agree to `${niche.display_name}` using my details to respond to my enquiry and provide the advice I have requested."

Checkbox; consent_given/consent_text/consent_at sent. No `resourceConsentText`.

**Privacy policy** (`web\src\app\privacy-policy\page.tsx`, null branch renders):
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm."

Noteworthy: the dormant partner branch here is the richest in the estate — it would disclose sharing "the result of our checks to confirm your contact details are valid, a short summary and priority rating we prepare to help route your enquiry, any messages you send us in response, a note of how you used our website... and any call time you book" on a legitimate-interests basis. Useful drafting seed for the pool-model disclosure. **Contradicts as-is.**

**Verification flow hooks**: ABSENT.

**Thank-you** (`web\src\app\thank-you\page.tsx`): identical to ecommerce/hospitality:
> "Thanks, your enquiry is on its way." / "We'll come back to you within 24 hours."

**Conflicts with the pool model**:
1. Privacy "we do not share..." (must change).
2. Thank-you/contact we-only phrasing ("We reply within 24 hours").
3. Consent text site-as-adviser, no sharing mention.
4. BODY COPY (DO-NOT-EDIT): e.g. `app\page.tsx` line 267 "Generalist firms handle your bookkeeping; we handle the parts of...", line 695 "We handle the parts of pharmacy finance that need NHS-contract literacy."

**Row**: `| pharmacies | needs-change (checkbox, no partner-sharing mention) | contradicts ("we do not share") | OK | 3 (+body-copy voice, DO-NOT-EDIT) |`

---

## 4. wills-probate

**Site**: dir `wills-probate`, brand **Probate Compass**, domain `www.probate-compass-placeholder.co.uk` (placeholder, brand decision deferred to G1), stack Next.js 15.5 / Supabase / Vercel plus full nurture stack (Resend email + Twilio SMS/WhatsApp, cron routes).

**Enquiry forms** (5 surface types):
- `web\src\components\forms\LeadForm.tsx` (526 lines) — `app\contact\page.tsx`. Fields: `role` (required), optional `estateStage`, `estateValue`; `fullName`, `email`, `phone` (required); `message` optional (min 10 if given); qualifiers `situation`/`prompted`/`callGoal`; consent **checkbox** required; honeypot `enquiry_ref`; hidden `sourceUrl`.
- `web\src\components\forms\MiniCapture.tsx` — thin site wrapper injecting config into the **shared** `packages\web-shared\leads\MiniCapture.tsx`. Fields: `role` segment, `full_name`, `email`, `phone` (all validated required). Consent = **notice-only, no checkbox** ("Consent is acknowledgement-by-submission (owner decision 2026-07-17)" comment at shared line 430); payload hard-codes `consent_given: true` + `consent_text` + `consent_at`. Surfaces: homepage, `probate`/`wills`/`inheritance-tax`/`lasting-power-of-attorney` hubs, `for\[slug]`, `calculators\[slug]` (via `CalcResultCta`), research pages, `resources\[topic]`, blog via `components\blog\InlineMiniLeadForm.tsx` and `components\blog\ExitIntentModal.tsx`, `calculators\premium\MobileToolSlot.tsx`, shared `ResultGateModal`.
- `web\src\components\support\SpecialistWidget.tsx` — assistant-style widget, email-only capture (`captureMode: "email_only"`), notice-only consent, `consent_given: true` hard-coded, uses `leadConsentText`.
- `web\src\components\forms\DetailsForm.tsx` — token-gated completion form on `app\complete\page.tsx` (`full_name`/`phone` as needed) → POST `/api/leads/complete`. No consent fields (completes an existing consented lead).
- `web\src\components\forms\BookingPicker.tsx` → `/api/leads/book`.
- Submission: `submitCisLead` in `lib\leads\submit-client.ts` → `/api/leads/submit` → `app\api\leads\submit\route.ts` wrapping `createLeadSubmitHandler({ source: "wills-probate" })` + `onLeadInserted`-style enrolment into nurture (`lib\leads\enroll.ts`) + booking-token mint.

**Consent notice** (verbatim, null branch, `web\src\config\site.ts`):
> "I agree to be contacted about my enquiry. I understand that `${niche.display_name}` may follow up by email and SMS over the next 11 days to arrange a free call. I can opt out at any time by replying STOP to any message."

**No sharing mention, no referral-fee sentence.** `resourceConsentText` (verbatim):
> "I agree to `${niche.display_name}` using my details to send me the free resource I have requested and to respond to any enquiry I submit."

`consent_given`/`consent_text`/`consent_at` sent by all surfaces (checkbox on LeadForm; hard-coded true on MiniCapture/SpecialistWidget).

**Privacy policy** (`web\src\app\privacy-policy\page.tsx`, partner null so else branch renders):
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm. We use the service providers listed below only as our processors, acting on our instructions."

Lawful basis section: consent-based ("We rely on your **consent** to process the personal data you provide through our enquiry forms..."). **CONFIRMED direct contradiction**: contact page, homepage capture and thank-you all promise sharing with a vetted firm (below).

**Verification flow hooks**:
- `web\src\lib\leads\verify.ts` — Twilio Lookup v2 (phone) + MX check (email). NOTE: header comment claims it "Runs at submit time" but its only call site is `web\src\app\api\leads\inbound\email\route.ts` (inbound reply webhook). Not wired into submit.
- Two-way contactability/nurture: `web\src\app\api\cron\lead-nurture\route.ts`, `lead-nurture-digest`, `lead-reconcile`, `lead-retention`; channel senders `web\src\lib\leads\channels.ts` (Resend + Twilio REST); confirm links `web\src\app\api\leads\confirm\[token]\route.ts`; opt-out `optout\[token]`; handoff email `web\src\lib\leads\handoff.ts` + partner-forward tracking `app\api\leads\forwarded\[token]\route.ts`.

**Thank-you** (`web\src\app\thank-you\page.tsx`):
> "Thank you. We have your message." ... "We will reply within two working days. If you asked to be connected with a specialist firm, we will match you with a vetted firm and they will contact you directly, usually within a few working days. You are under no obligation at any point, and you can change your mind at any time by replying to any message from us."

**No referral-fee sentence on the thank-you page.** `/complete` page (`web\src\app\complete\page.tsx`): "We have everything we need. A specialist will be in touch shortly." / "Add the last detail we need and a specialist will be in touch to arrange your free..." — no fee sentence either.

Contact page small print (`app\contact\page.tsx` line 56) DOES carry the full disclosure:
> "By submitting the form you agree to us using your details to respond to your enquiry. If you ask to be connected with a specialist firm, you agree to us sharing your details with that firm so they can contact you, and we may receive a fee if you use their services. We never share your details for any other purpose. See our privacy policy for full details."

Homepage capture footer (`app\page.tsx` line 308): "By sending your details you agree to us sharing them with a relevant specialist firm so they can contact you. We may receive a fee if you go on to use their services." About page (line 73) repeats the fee disclosure.

**Conflicts with the pool model**:
1. Privacy "we do **not** share it with any third-party advisory firm" vs contact/homepage/thank-you promising a vetted firm will contact directly — the KNOWN contradiction, confirmed verbatim above. (Messaging surface, must change.)
2. `leadConsentText` mentions neither sharing nor fee, yet MiniCapture surfaces (the majority of captures) show ONLY that text — leads captured mid-article/calculator never see a sharing or fee disclosure at point of capture.
3. "We never share your details for any other purpose" (contact) sits awkwardly with onward re-referral within the network; "match you with a vetted firm" (singular match) vs pool/claim where multiple firms may see the lead.
4. Homepage line 168: "We never pass on your details without your consent" — consent-gated, compatible, but the consent shown on most surfaces (point 2) does not mention passing on. BODY COPY in blog posts not swept individually; hub/for-page copy above is messaging-adjacent but article bodies flagged DO-NOT-EDIT.

**Row**: `| wills-probate | needs-change (no sharing/fee in leadConsentText; mixed checkbox + notice-only) | contradicts ("we do not share" vs vetted-firm promises) | OK | 3 (+article bodies unswept, DO-NOT-EDIT) |`

---

## 5. divorce-finances

**Site**: dir `divorce-finances`, brand **PLACEHOLDER-DIVORCE-BRAND** (display_name literally that; domain `placeholder-divorce-domain.example`), stack identical to wills-probate (full nurture stack).

**Enquiry forms**: mirror of wills-probate:
- `web\src\components\forms\LeadForm.tsx` (527 lines) — `app\contact\page.tsx`. Fields: `role` (required), optional `divorceStage`, `assetValue`; `fullName`/`email`/`phone` required; `message` optional; `situation`/`prompted`/`callGoal` qualifiers; consent **checkbox** required.
- Site wrapper `forms\MiniCapture.tsx` → shared `packages\web-shared\leads\MiniCapture.tsx` (notice-only, `consent_given: true` hard-coded). Surfaces: homepage, `financial-settlements`/`pension-sharing`/`capital-gains-tax-divorce` hubs, `for\[slug]`, `calculators\[slug]` + `premium\PremiumCalculator.tsx` + `MobileToolSlot`, research pages, `resources\[topic]`, blog `InlineMiniLeadForm` + `ExitIntentModal`.
- `support\SpecialistWidget.tsx` (email-only, notice-only, consent_given: true).
- `forms\DetailsForm.tsx` → `/api/leads/complete`; `BookingPicker.tsx` → `/api/leads/book`.
- Submission: `/api/leads/submit` → `createLeadSubmitHandler({ source: ... })` + nurture enrolment + booking token (file mirrors wills-probate).

**Consent notice** (verbatim, null branch, `web\src\config\site.ts` — the branch that renders):
> "I agree to be contacted about my enquiry and to my details being shared with a vetted specialist family law firm so it can respond and, if I want it, provide advice. I understand `${niche.display_name}` may receive a fee from the firm it introduces me to. `${niche.display_name}` may follow up by email and SMS over the next 11 days to arrange a free call, and I can opt out at any time by replying STOP."

Sharing + fee BOTH present (config comment: "Do not revert to the generic in-house wording for this site"). `resourceConsentText` identical to wills-probate. Checkbox on LeadForm; notice-only + hard-coded true on MiniCapture/SpecialistWidget; all send consent_given/consent_text/consent_at.

**Privacy policy** (`web\src\app\privacy-policy\page.tsx` — byte-identical to wills-probate except two topical lines; partner null so else branch renders):
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm. We use the service providers listed below only as our processors, acting on our instructions."

**CONFIRMED direct contradiction** with its own consent checkbox text ("my details being shared with a vetted specialist family law firm... may receive a fee") and thank-you page. The known self-contradiction, verified verbatim.

**Verification flow hooks**: same as wills-probate — `web\src\lib\leads\verify.ts` (called only from `app\api\leads\inbound\email\route.ts`), cron nurture routes under `app\api\cron\`, channels via `lib\leads\channels.ts` (Resend + Twilio), `confirm\[token]`, `forwarded\[token]`, `lib\leads\handoff.ts`.

**Thank-you** (`web\src\app\thank-you\page.tsx`):
> "We read every message personally and aim to reply within two working days. If you asked to be introduced to a specialist, a vetted firm or accredited mediator will contact you directly, usually within a few working days. There is nothing more you need to do right now."

Referral-fee sentence PRESENT:
> "As we set out on the contact form, we may receive a fee from the firm we introduce you to if you use their services. It does not change what you pay."

`/complete` page: "A specialist will be in touch shortly." — no fee sentence there. Contact page small print (lines 68-74): "...If you ask to be connected with a specialist firm or mediator, you agree to us sharing your details with them so they can contact you. We may receive a fee from the firm we introduce you to if you use their services. This does not change what you pay, and the firm will confirm the arrangement to you directly. We never share your details for any other purpose."

**Conflicts with the pool model**:
1. Privacy "we do **not** share it with any third-party advisory firm" vs consent checkbox + thank-you + contact promising sharing with a vetted firm — the KNOWN contradiction, confirmed. (Must change.)
2. Homepage `app\page.tsx` line 56 (how-it-works step 2): "A vetted specialist firm or accredited mediator suited to your situation, **not a call centre round robin**." — explicitly disclaims the round-robin/pool mechanic the estate is moving to.
3. Singular-firm framing throughout ("the firm we introduce you to", "We match you", "they contact you directly") plus "We never share your details for any other purpose" (contact) vs pool visibility + onward re-referral within the network.
4. Article bodies not individually swept — DO-NOT-EDIT.

**Row**: `| divorce-finances | needs-change (text has sharing+fee, but LeadForm is checkbox and MiniCapture consent_given hard-coded; target = notice-only LI) | contradicts ("we do not share" vs own consent text) | OK | 3 (+article bodies, DO-NOT-EDIT) |`

---

## 6. ashfield (light check)

**Site**: dir `ashfield`, brand **Ashfield Trading**, domain `www.ashfieldtrading.co.uk`, stack Next.js 15.5 / shared lead factory / Vercel. Corporate/broker site — B2B enquiries (rent-a-site / buy-leads / partnership), not consumer leads. Stays separate from the pool model.

**Enquiry forms**: `ashfield\web\src\components\forms\ContactForm.tsx` on `app\contact\page.tsx` only. Fields: `fullName` (required), `email` (required), `firmName` (optional), `enquiryType` (required), `message` (required), consent checkbox (required), honeypot `enquiry_ref`. Posts `captureMode: "email_only"` (no phone field) to `/api/leads/submit` → `app\api\leads\submit\route.ts` = `createLeadSubmitHandler({ source: "ashfield" })`, deliberately no nurture hook.

**Consent notice** (verbatim — NOTE: lives as `CONSENT_TEXT` const in `ContactForm.tsx` lines 23-24, not read from `siteConfig`):
> "I agree to Ashfield Trading Ltd using my details to respond to my enquiry and to follow up about the services I have asked about. Enquiries are handled in-house and are not shared with any third-party firm. I can opt out at any time."

`web\src\config\site.ts` separately defines `leadConsentText: "I agree to Ashfield Trading Ltd using my details to respond to my enquiry."` — unused by the form (drift risk, two sources of truth). Checkbox; consent_given/consent_text/consent_at sent.

**Privacy policy** (`web\src\app\privacy-policy\page.tsx`, no ternary — hard-coded):
> "Your enquiry is handled by us; we do **not** share it with any third-party advisory firm. We use the service providers listed below only as our processors, acting on our instructions."

Consistent with the corporate site's actual behaviour. OK.

**Verification flow hooks**: ABSENT (by design; route comment: "no nurture enrolment, no booking token, no partner CC").

**Thank-you** (`web\src\app\thank-you\page.tsx`): "Thank you, your enquiry is in" / "We reply within one working day, usually sooner." / "You then receive an anonymised written proposal built on real estate data: lead volumes, verification tiers and indicative terms." / "No obligation at any point." B2B framing, no consumer-lead promises. OK.

**Conflicts with the pool model**: none — site stays outside the pool and consistently says in-house. Only note: if buyer-network firms sign up via this form, "not shared with any third-party firm" remains accurate (their own details are not leads), so no change needed.

**Row**: `| ashfield | OK for its role (in-house, consistent) | OK (consistent) | OK | 0 |`

---

## Summary table

| Site | Consent | Privacy | Form fields | Copy conflicts |
|---|---|---|---|---|
| ecommerce | needs-change (checkbox; no partner-sharing mention) | contradicts ("we do not share") | OK | 3 (+body copy, DO-NOT-EDIT) |
| hospitality | needs-change (checkbox; no partner-sharing mention) | contradicts ("we do not share") | OK | 3 (+body copy, DO-NOT-EDIT) |
| pharmacies | needs-change (checkbox; no partner-sharing mention) | contradicts ("we do not share") | OK | 3 (+body copy, DO-NOT-EDIT) |
| wills-probate | needs-change (no sharing/fee sentence in leadConsentText; mixed checkbox/notice-only) | contradicts (vs vetted-firm promises) | OK | 3 (+articles, DO-NOT-EDIT) |
| divorce-finances | needs-change (sharing+fee present; mechanism not target notice-only LI everywhere) | contradicts (vs own consent checkbox) | OK | 3 (+articles, DO-NOT-EDIT) |
| ashfield | OK | OK | OK | 0 |

## Change-surface map for the pool-model rewrite (paths only)

- Consent single source: `<site>\web\src\config\site.ts` (`leadConsentText`); EXCEPT ashfield where the live text is `ContactForm.tsx` `CONSENT_TEXT`.
- Privacy null-branch paragraph: `<site>\web\src\app\privacy-policy\page.tsx` section 5 (all five lead-gen sites render the null branch; a pool disclosure cannot reuse the single-`partner.name` ternary — it assumes exactly one named firm).
- Thank-you: 21-line stubs on the three accounting sites; rich pages + `/complete` on wills/divorce (divorce already carries the fee sentence, wills does not).
- Contact small print: `wills-probate\web\src\app\contact\page.tsx` line 56 and `divorce-finances\web\src\app\contact\page.tsx` lines 68-74 ("We never share your details for any other purpose" needs pool/re-referral wording).
- Divorce homepage `app\page.tsx` line 56 "not a call centre round robin" — messaging surface, must change for pool.
