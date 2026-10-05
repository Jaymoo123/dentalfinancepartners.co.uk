# Form wording diff: LIVE vs deploy candidate 67c7d05f9

**Verdict: 11 of 17 sites have at least one visible wording change on or around a lead form between LIVE and `67c7d05f9`. The dominant change is the "firm voice" sweep replacing "a specialist firm from our partner network" / "matched to a regulated firm" with "one of our accountants" on thank-you pages, booking pages, contact pages and form success messages (care, charities, Medical, contractors-ir35, Dentists). The second most common change is new eyebrow/breadcrumb text ("Your enquiry", "Your callback", "Home / Contact") added when pages are ported onto the shared SlimHero/Breadcrumb components (startups-tech, hospitality, ecommerce), plus brand-new mid-article capture forms (InlineMiniLeadForm) appearing on sites that did not have one live (pharmacies, hospitality, ecommerce, crypto, startups-tech). Property has zero changes anywhere on its form surfaces.**

Compared against commit `67c7d05f9` (not HEAD), per-site live base commit as instructed. `leadConsentText` / `siteConfig.leadConsentText` is untouched everywhere it was checked — confirmed by diff absence on every site's `config/site.ts` (not present in any site's diff list against its base).

## Summary table

| Site | Form wording changes (count) | Consent paragraph changed? | Files involved |
|---|---|---|---|
| Property | 0 | No | — |
| Solicitors | 1 (footer link label only) | No | `Solicitors/niche.config.json` |
| digital-agency | 1 (footer link label only) | No | `digital-agency/niche.config.json` |
| crypto | 1 (new InlineMiniLeadForm) | No | `crypto/web/src/components/blog/InlineMiniLeadForm.tsx` |
| pharmacies | 1 (new InlineMiniLeadForm) | No | `pharmacies/web/src/components/blog/InlineMiniLeadForm.tsx` |
| construction-cis | 1 (new blog CTA copy) | No | `construction-cis/niche.config.json` |
| generalist | 2 (new ResultCaptureForm text; new footer link label) | No | `generalist/niche.config.json`, `generalist/web/src/components/calculators/ResultCaptureForm.tsx` |
| care | 2 ("firm voice" on thank-you + niche.config.json copy) | No | `care/web/src/app/thank-you/page.tsx`, `care/niche.config.json` |
| charities | 2 ("firm voice" on thank-you + DetailsForm success) | No | `charities/web/src/app/thank-you/page.tsx`, `charities/web/src/components/forms/DetailsForm.tsx` |
| contractors-ir35 | 1 ("firm voice" on contact page) | No | `contractors-ir35/web/src/app/contact/page.tsx` |
| Dentists | 1 (book-page fallback copy rewritten + form swapped in) | No | `Dentists/web/src/app/book/page.tsx` |
| Medical | 6 ("firm voice" across thank-you, book, contact, LeadForm success, BookingPicker, InlineMiniLeadForm, new ResultCaptureForm) | No | `Medical/web/src/app/{book,contact,thank-you}/page.tsx`, `Medical/web/src/components/forms/{BookingPicker,LeadForm}.tsx`, `Medical/web/src/components/blog/InlineMiniLeadForm.tsx`, `Medical/web/src/components/tools/ResultCaptureForm.tsx` (new) |
| startups-tech | 3 (new eyebrow text on thank-you; new ConsentToggle button; new InlineMiniLeadForm; changed message placeholder) | No | `startups-tech/web/src/app/thank-you/page.tsx`, `startups-tech/web/src/components/analytics/ConsentToggle.tsx` (new), `startups-tech/web/src/components/blog/InlineMiniLeadForm.tsx` (new), `startups-tech/web/src/components/calculators/MiniCapture.tsx` |
| hospitality | 3 (new eyebrow text x3; new breadcrumb text; new InlineMiniLeadForm) | No | `hospitality/web/src/app/{book,thank-you}/page.tsx`, `hospitality/web/src/app/contact/page.tsx`, `hospitality/web/src/components/blog/InlineMiniLeadForm.tsx` (new) |
| ecommerce | 3 (new eyebrow text x3; new breadcrumb text; new InlineMiniLeadForm + new MiniCapture) | No | `ecommerce/web/src/app/{book,contact,thank-you}/page.tsx`, `ecommerce/web/src/components/blog/InlineMiniLeadForm.tsx` (new), `ecommerce/web/src/components/calculators/MiniCapture.tsx` (new), `ecommerce/web/src/components/analytics/ConsentToggle.tsx` (new) |
| Solicitors / digital-agency / crypto / construction-cis / care / charities / contractors-ir35 / Dentists / Medical / startups-tech / hospitality / ecommerce / generalist | (see rows above) | | |
| Sites with 0 changes: Property | 0 | No | — |

## Per-site detail

### care
File: `care/web/src/app/thank-you/page.tsx`
- Before: "Thanks, that is confirmed. A specialist firm from our partner network will contact you directly."
- After: "Thanks, that is confirmed. One of our care sector accountants will contact you directly."

File: `care/niche.config.json` (entity block feeding the firm's "how it works" / "what we are" copy — not directly on the lead form, but rewords the same partner-network framing used elsewhere)
- Before (`entity.next`): "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. We reply within 24 hours."
- After: "We reply within 24 hours and one of our accountants comes back to you directly."
- Also drops the `entity.notWhatWeAre` key entirely ("Care Home Tax is not an accountancy practice...").

### charities
File: `charities/web/src/app/thank-you/page.tsx`
- Before: "Thanks, that is confirmed. A specialist firm from our partner network will contact you directly."
- After: "Thanks, that is confirmed. One of our charity accountants will contact you directly."

File: `charities/web/src/components/forms/DetailsForm.tsx` (success state)
- Before: "A specialist firm from our partner network will be in touch shortly. If you would like to pick a time that suits you, you can book a callback below."
- After: "One of our charity accountants will be in touch shortly. If you would like to pick a time that suits you, you can book a callback below."

### contractors-ir35
File: `contractors-ir35/web/src/app/contact/page.tsx`
- Before: "A specialist contractor accountant from our partner network will respond to arrange a short call. Not a sales team, not a call centre."
- After: "One of our specialist contractor accountants will respond to arrange a short call. Not a sales team, not a call centre."

### Dentists
File: `Dentists/web/src/app/book/page.tsx`
- Before: "This page needs the personal link from your email or text message. If you cannot find it, use the contact form and we will arrange your review." followed by a "Go to the contact form" link to `/contact`.
- After: "This page needs the personal link from your email or text message. If you cannot find it, send us your details below and we will arrange your review." followed by an inline `LeadForm` with submit label "Send enquiry" instead of the link.
- This is a structural change (a full lead form is now embedded directly on `/book` when there's no token) as well as a wording change.

File: `Dentists/niche.config.json` — adds a `footer_links` entry `{ "label": "Book a consultation", "href": "/contact" }` (new footer link text, site-wide chrome).

### Medical
File: `Medical/web/src/app/thank-you/page.tsx`
- Before: "Thanks, that is confirmed. A specialist firm from our partner network will contact you directly."
- After: "Thanks, that is confirmed. One of our medical accountants will contact you directly."

File: `Medical/web/src/app/book/page.tsx`
- Before: "Pick a day and a time window that suits you. A medical accountant from our specialist partner network will call you then. Booking commits you to nothing, and scope and fees are agreed with that firm."
- After: "Pick a day and a time window that suits you. One of our medical accountants will call you then. Booking commits you to nothing, and scope and fees are agreed with you."
- Meta description also reworded: "Pick a time for a call with a specialist firm about your medical practice finances." -> "Pick a time for a call with one of our medical accountants about your medical practice finances."

File: `Medical/web/src/app/contact/page.tsx`
- Before: "...tell us the position in the form. We read it and match it to a regulated firm from our specialist partner network that works with doctors, and that firm contacts you."
- After: "...tell us the position in the form. We read it, put it in front of one of our medical accountants who works with doctors, and they contact you."
- NEXT_STEPS list rewritten from "We read your enquiry and match it to a regulated firm..." to "We read your enquiry and put it in front of one of our medical accountants who works with doctors."; proof-point label "Matched to a specialist firm" -> "Read by a medical accountant".

File: `Medical/web/src/components/forms/BookingPicker.tsx`
- Before: "Booking commits you to nothing. A medical accountant from our specialist partner network will call you in your chosen window, and scope and fees are agreed with that firm."
- After: "Booking commits you to nothing. One of our medical accountants will call you in your chosen window, and scope and fees are agreed with you."

File: `Medical/web/src/components/forms/LeadForm.tsx` (success state)
- Before: "A firm from our specialist partner network will be in touch."
- After: "One of our medical accountants will be in touch."

File: `Medical/web/src/components/blog/InlineMiniLeadForm.tsx`
- Before: "Leave your details and a one-line summary. We match it to a regulated firm from our specialist partner network, and an accountant there who works with doctors makes contact. Enquiring commits you to nothing."
- After: "Leave your details and a one-line summary. One of our medical accountants who works with doctors reads it and makes contact. Enquiring commits you to nothing."

File: `Medical/web/src/components/tools/ResultCaptureForm.tsx` — brand-new component, not live today. Adds a result-page capture form with heading, blurb ("A calculator gives the shape of the answer. NHS pensions, the annual allowance taper and private-practice incorporation are unforgiving in the detail...") and success text that do not exist live.

### generalist
File: `generalist/web/src/components/calculators/ResultCaptureForm.tsx` — brand-new component (replaces a modal gate that is being removed). New visible copy: heading fallback "Want a specialist to check your figure?", blurb "A calculator gives the shape of the answer. Tell us your situation and a specialist will confirm your exact figure and the legitimate ways to reduce it, with no obligation.", submit label "Get my figure confirmed", success text "Thanks, we'll be in touch within 24 hours. Your result is below."

File: `generalist/niche.config.json` — adds `footer_links` entry `{ "label": "Book a consultation", "href": "/contact" }`.

### startups-tech
File: `startups-tech/web/src/app/thank-you/page.tsx` — body paragraphs are byte-identical (confirmed: "We have just sent you a message...", "For specialist tax advisory work...", "Cannot see our email?..." all unchanged), but each of the three branches now carries a new `eyebrow="Your enquiry"` string on the SlimHero component that was not rendered live before.

File: `startups-tech/web/src/components/analytics/ConsentToggle.tsx` — brand-new footer control, not live today: button text "Do not track me" / "Enable analytics" (toggles).

File: `startups-tech/web/src/components/blog/InlineMiniLeadForm.tsx` — brand-new component, not live today: heading "Want this checked against your specific situation?", blurb "Leave your details and a one-line summary. A specialist will come back to you, with no obligation.", submit label "Get a quick reply".

File: `startups-tech/web/src/components/calculators/MiniCapture.tsx`
- Before (hardcoded placeholder, apparently a leftover from a different niche): "e.g. pub with 12 staff, need help with tronc setup and food VAT"
- After (from `niche.config.json` `lead_form.placeholders.message`): "e.g. We are raising a seed round and want to check our SEIS eligibility, or we need to set up an EMI scheme..."

Not counted (code-only, confirmed same words): `CalcResultCta.tsx`, `CalculatorClient.tsx` (eyebrow "Calculator" is the kit's own default string, unchanged), `BookingPicker.tsx`, `DetailsForm.tsx`, `LeadForm.tsx` — all restyling/focus-ring/data-attribute only.

### hospitality
File: `hospitality/web/src/app/book/page.tsx` and `hospitality/web/src/app/thank-you/page.tsx` — body paragraphs confirmed byte-identical ("Pick a day and a time window...", "Thanks, that is confirmed. A specialist firm from our partner network will contact you directly." — unlike the a796de63-base sites, hospitality's base already had this exact sentence and it is NOT touched here), but each SlimHero now carries new eyebrow text not rendered live before: "Your callback" (book) and "Your enquiry" (thank-you, x3 branches).

File: `hospitality/web/src/app/contact/page.tsx` — h1 "Contact us" and paragraph "Tell us about your hospitality business. We reply within 24 hours." are unchanged, but a new `Breadcrumb` component is added rendering "Home" / "Contact" trail text that was not on the page before.

File: `hospitality/web/src/components/blog/InlineMiniLeadForm.tsx` — brand-new component, not live today: heading "Want this checked against your specific situation?", blurb "Leave your details and a one-line summary. A specialist will come back to you, with no obligation.", submit label "Get a quick reply".

Not counted: `niche.config.json` gains new `blog.label_topics` / `label_library` / `related_heading` / `howto_heading` keys — these feed blog list/hub UI, not the form surfaces in scope.

### ecommerce
File: `ecommerce/web/src/app/book/page.tsx` and `ecommerce/web/src/app/thank-you/page.tsx` — body paragraphs confirmed byte-identical, but new SlimHero eyebrow "Your callback" (book) / "Your enquiry" (thank-you, x3 branches) appears, none of which rendered live before.

File: `ecommerce/web/src/app/contact/page.tsx` — h1 "Contact us" and paragraph "Tell us about your online selling. We reply within 24 hours." unchanged, but a new `Breadcrumb` renders "Home" / "Contact" that was not there live (the page previously had no breadcrumb or hero section at all).

File: `ecommerce/web/src/components/blog/InlineMiniLeadForm.tsx` and `.../calculators/MiniCapture.tsx` — both brand-new; this site had no mid-article capture form or MiniCapture live. New text: heading "Want this checked against your specific situation?", blurb "Leave your details and a one-line summary. A specialist will come back to you, with no obligation.", submit label "Get a quick reply"; MiniCapture default success text "Thanks. We'll be in touch."

File: `ecommerce/web/src/components/analytics/ConsentToggle.tsx` — brand-new footer control: "Do not track me" / "Enable analytics".

Not counted (confirmed same words, just moved into `NoticeCard`): `DetailsForm.tsx` ("Thank you, that is everything we need"), `LeadForm.tsx`, `BookingPicker.tsx` ("Callback booked").

### crypto
File: `crypto/web/src/components/blog/InlineMiniLeadForm.tsx` — brand-new component, not live today: heading "Want this checked against your specific situation?", blurb "Leave your details and a one-line summary. A specialist will come back to you, with no obligation.", submit label "Get a quick reply".

Not counted: `MiniCapture.tsx`, `DetailsForm.tsx`, `LeadForm.tsx` — focus-ring/data-attribute only, words unchanged.

### pharmacies
File: `pharmacies/web/src/components/blog/InlineMiniLeadForm.tsx` — brand-new component, not live today: same heading/blurb/submit-label text as crypto's.

Not counted: `niche.config.json` `entity` block addition (feeds the EntityBlock marketing component, not a form surface); `MiniCapture.tsx`, `DetailsForm.tsx`, `LeadForm.tsx` — focus-ring only.

### construction-cis
File: `construction-cis/niche.config.json` — adds a new `blog.cta_heading` / `cta_body` / `cta_button` block: "Most CIS subcontractors are owed money back." / "Third-party reported averages put a registered CIS subcontractor's annual refund at around £2,000 (illustrative, not guaranteed). Book a free call with one of our accountants. We will review your deductions, identify what you are owed, and handle the reclaim. Plain English, no jargon." / "Book a free call" — a new lead-capture CTA block, not live today.

Not counted: `DetailsForm.tsx`, `LeadForm.tsx` focus-ring only; `contact/page.tsx` canonical-tag addition is not visible text; `entity` block not form-adjacent.

### Solicitors
File: `Solicitors/niche.config.json` — adds `footer_links` entry `{ "label": "Book a consultation", "href": "/contact" }` (new footer link text). No other form-surface file changed for this site.

### digital-agency
File: `digital-agency/niche.config.json` — adds `footer_links` entry `{ "label": "Book a consultation", "href": "/contact#form" }`. `contact/page.tsx` only adds an `id="form"` anchor (not visible text).

### Property
No file matching the form-surface scope changed at all between `bb8d6bb5` and `67c7d05f9`. Confirmed with an explicit `git diff --stat` restricted to Property's `/book`, `/contact`, `/thank-you`, `components/forms`, `InlineMiniLeadForm.tsx`, `ResultCaptureForm.tsx`, `ConsentToggle.tsx` and `niche.config.json` — zero output.

## Code-only changes on form files (no visible wording change)

These files differ between live and the candidate but carry no rendered-word change — restyling (focus-ring recipes, slate/neutral token renames, `btnPrimary`/`NoticeCard` adoption), `data-form-id` / `data-cta` attributes, or comments:

- `packages/web-shared/leads/MiniCapture.tsx` (all sites that import it) — `focusRing` refactor only.
- `care/web/src/components/forms/LeadForm.tsx`
- `generalist/web/src/components/forms/{DetailsForm,LeadForm}.tsx`
- `Dentists` — no other form files beyond `/book` (above)
- `charities` — no other form files beyond `DetailsForm.tsx` (above) and `thank-you` (above)
- `contractors-ir35/web/src/components/forms/{DetailsForm,LeadForm}.tsx`
- `Medical/web/src/components/forms/DetailsForm.tsx`
- `Solicitors` — no other form files changed
- `digital-agency/web/src/app/contact/page.tsx` (`id="form"` anchor only)
- `crypto/web/src/components/calculators/MiniCapture.tsx`, `forms/{DetailsForm,LeadForm}.tsx`
- `construction-cis/web/src/components/forms/{DetailsForm,LeadForm}.tsx`, `web/src/app/contact/page.tsx` (canonical tag only)
- `pharmacies/web/src/components/calculators/MiniCapture.tsx`, `forms/{DetailsForm,LeadForm}.tsx`
- `startups-tech/web/src/components/calculators/{CalcResultCta,CalculatorClient}.tsx`, `forms/{BookingPicker,DetailsForm,LeadForm}.tsx`
- `hospitality/web/src/components/calculators/MiniCapture.tsx`, `forms/{BookingPicker,DetailsForm,LeadForm}.tsx`
- `ecommerce/web/src/components/forms/{DetailsForm,LeadForm,BookingPicker}.tsx`

## Explicitly out of scope / excluded per instructions

- `*/web/src/config/lead-nurture.ts` (e.g. `startups-tech`) — nurture email/SMS timing and copy, excluded by the brief.
- `niche.config.json` `entity.*` blocks (firm/serves/where/howItWorks/next/notWhatWeAre) added or reworded on care, charities, Medical, contractors-ir35, Dentists, generalist, crypto, pharmacies, construction-cis, hospitality, ecommerce, Solicitors, digital-agency — these feed the `EntityBlock` marketing component (schema/about blurb), not a form surface, so not counted in the table above even though the wording changed substantially (mostly dropping the "partner network" framing in favour of first-person firm voice — consistent with the memory note on the 09-28 firm-voice reversal).
- `niche.config.json` `hub_labels` (ecommerce) and `blog.label_topics`/`label_library`/`related_heading`/`howto_heading` (hospitality) — blog/hub chrome, not form-adjacent.
