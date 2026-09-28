# Full lead-kit check, five sites, cross-site report (2026-09-28)

Independent second pass over the whole lead kit on the five priority sites, LIVE in production,
commissioned by the owner: "the full lead kit, all of it, writing quality, sameness etc on
everything." Brief: `LEAD_KIT_FULL_CHECK_BRIEF_2026-09-28.md`.

This is a report. Nothing was fixed, nothing deployed, nothing pushed, no IndexNow, no monitor,
email, cron, popup or banner created or changed. Reports are uncommitted for the manager.

Per-site reports: `docs/<site>/_wave1/qa/LEAD_KIT_CHECK_2026-09-28.md` for property, medical,
contractors-ir35, care and charities.

## 0. READ THIS FIRST: a positioning reversal is in flight and it re-grades half this report

While this check was running, 77 source files across all five sites were modified in the shared
working tree and left uncommitted. They are real content changes, not line-ending noise: 77 files,
+247/-250, identical when whitespace is ignored. The session-start snapshot had only one dirty file,
so these landed during this check.

The direction is unambiguous. Counting the diff: **86 referral-voice lines removed and 3 added; 92
practice-voice lines added and 0 removed.** Medical `/about` goes from "a medical-only tax and
accounting publisher for UK doctors, and an enquiry service that matches your enquiry to a regulated
firm from our specialist partner network" to "a medical-only tax and accounting practice for UK
doctors. Send your enquiry and one of our medical accountants comes back to you directly." Code
comments mark it: "Firm voice (owner ruling 2026-09-28)" and "VOICE (locked, owner ruling
2026-09-28): the brand IS the accountancy firm".

**I did not revert any of it and I did not touch those files.** I cannot confirm that ruling from
anything I was given; my brief instructed me to grade against the 2026-09-12 ruling that the sites
are referral networks operated by Ashfield Trading Ltd and never accountancy practices. So one of
two things is true, and the owner needs to say which:

1. There IS a new ruling today reversing the positioning, in which case the findings below that
   depend on the referral model must be re-graded, and the estate-claims history should record the
   reversal deliberately rather than by diff.
2. There is not, in which case 77 uncommitted files are re-introducing exactly the false-practice
   claims that `ESTATE_CLAIMS_INTEGRITY` was opened to remove from five live sites.

**What this does NOT affect.** Everything in this report was graded from the LIVE production sites,
not the working tree, so it is an accurate description of what visitors see today. And these
findings are positioning-independent and stand either way:
B1 (nurture runs 25 days), B3 (footer CTA dead-ends on three sites), B4 (Medical health-check
promises a report nothing sends and denies a drip the code enrols into), B8 (charities `/about`
captures nothing), F1 (contractors blog CTAs are dead code), F2 (four response-time postures, two
sites contradicting themselves), F3 and F6 and F7 (sameness), F5 (pipeline artefacts), F8 (unsourced
contractors figures), F9 (pages with no capture), and all of section 5 (the 390 capture artefact).

**What this DOES re-grade.** B5 (footer straplines claim a practice), B7 (Property calls itself an
accountancy firm), the Medical footer strapline in B4's site report, the `slogan` finding, and the
reasoning behind B2 (the free first call): the argument there is partly "we are not the party who
makes the call", which weakens if the brand is now the firm. Note that even under firm voice, "free"
is still a price stated for our own service, so B2 survives in reduced form and still needs decision
4.1.

Until the owner rules, treat every "practice claim" finding in this report as pending, and every
mechanical and sameness finding as live.

## 0b. Scope note

The entity block COPY was taken out of scope mid-check by owner direction, because it is being
rewritten. Its PLACEMENT was recorded on every page instead and is reported in section 6, because
the owner also wants it moved below the FAQs and made smaller. No finding in this report grades the
block's sentences.

## 1. Verdict in three lines

The writing is not the problem. Across five sites the prose, the figures and the segment bodies are
genuinely strong, and three sites are clean of em-dashes, US spellings and AI tells entirely.

The problem is that the lead kit still speaks in the voice of an accountancy practice the sites say
they are not. Two promise classes are live on roughly 200 pages: a free first call, and a fee or
response-time commitment. Both are promises about a partner firm we do not control.

One defect is mechanical and silent: four of the five nurture sequences run for 25 days instead of
11, so the break-up email arrives two weeks after the lead has gone cold.

## 2. Estate-wide ranked list

### BLOCKERS

**B1. Nurture runs 25 days instead of 11, on four of five sites.** Medical, contractors, care,
charities.
`delayHours` is the gap BETWEEN sends, not an offset from enrolment (`computeNextSendMs` computes
`dueMs = fromMs + delayHours * 3_600_000`, and `fromMs` is `Date.now()` at the previous send). The
four sites carry `0, 0, 4, 24, 48, 96, 168, 264`, which is Property's CUMULATIVE timeline pasted
into a field that takes gaps. Those increments sum to 604 hours. So `day7_email` sends on day 14
and `breakup_day11` on day 25.
Property is correct at `0, 0, 4, 20, 24, 48, 72, 96`, whose running totals are exactly the four
sites' literal array. That is the proof and it is also the fix: copy Property's values. One line per
site.

**B2. The free-first-call class, roughly 200 surfaces across all five sites.**

| Site | Footprint |
|---|---|
| Property | 30 of 40 routes |
| Medical | 37 pages |
| contractors | all 41 routes, including the header nav on every page |
| care | 16 surfaces (14 page eyebrows plus `/book` and `/complete`) |
| charities | 6 instances across 43 surfaces |

Promising that the partner firm's first call is free quotes that firm's fee at zero, on sites whose
own copy says they do not quote fees and are not the firm. Medical's `/services` carries the
contradiction a few lines apart.

This class is NOT new. `docs/construction-cis/_port/CLAIMS_REGISTER.md` already reasoned it out:
"Free call / free review / free 15-minute call is a **price for our own advisory service (zero)**,
and under the pool model we are not the party who makes the call. **Verdict: owner-gated, one
decision for the whole class of 80.**" It was logged precisely because "a future strip-our-pricing
sweep will otherwise miss 80 lines." It then was never swept to the other 14 sites. This is the
`ESTATE_CLAIMS_INTEGRITY` rule exactly: sweep by RULE, not by the list you were handed.

Because it was owner-gated there, the decision is section 4 item 1, not an automatic fix. But the
root cause is small and shared:
- `packages/web-shared/design/marketing/LeadCTAPanel.tsx:18,27` defaults
  `eyebrow = "Free consultation"` and `formTitle = "Book your free consultation"`. This is why care
  and charities show it despite carrying no such copy of their own.
- `packages/web-shared/design/blog/BlogCategoryHub.tsx:209` and
  `design/marketing/ProblemStatement.tsx:52` hardcode "Book free consultation".
- Property, Medical and contractors `niche.config.json` set it explicitly.

Three shared files plus three configs cover the large majority of roughly 200 pages.

**B3. The footer CTA dead-ends on three sites.** Property, contractors, charities all carry a footer
link "Book a consultation" to `/book` on every page. Untokened, `/book` renders ZERO forms and says
"This page needs the personal link from your email or text message", under an h1 promising "Book
your free review call. Pick a day and a time window that suits you." It offers a contact-form link,
so it is not a total dead end, but the only footer call to action on every page cannot do what it
says. Change it to "Send an enquiry" pointing at `/contact`.

**B4. Medical `/free-practice-health-check` describes a follow-up that does not exist and denies one
that does.** Traced: wizard to `submitMedicalLead` to `/api/leads/submit` line 138 `enrollLead`; no
exemption exists for the wizard (the only one, `enroll.ts` line 75, is for `role === "resource"`);
`phone: ""` routes it to `medical_detail_capture`, four emails over seven days.
The page says "no sales sequences" and "If you do not reply, we do not chase. No drip campaigns, no
remarketing, no list-selling." Armed, it chases four times. Unarmed, it sends nothing while promising
"We follow up once by email with the full report." Nothing anywhere emails the report; the findings
render on screen and are discarded.

**B5. Footer straplines claim a practice on three of five sites.**

| Site | Footer strapline | Verdict |
|---|---|---|
| Property | "Specialist property accountants for UK landlords... Fixed fees, 24hr response." | practice claim + fee promise + response promise |
| Medical | "Expert accounting for GPs... NHS pension advice, locum tax planning..." | practice claim + advice in our own voice |
| contractors | "Specialist accountants for UK contractors... IR35 status advice..." | practice claim + advice |
| care | "UK care providers (care homes, domiciliary care, supported living): accounts, payroll, VAT and CQC-linked financial compliance" | CLEAN |
| charities | "UK charities, CICs and social enterprises: accounts, independent examination, Gift Aid, VAT and trustee compliance" | CLEAN |

The fix already exists inside the estate. Copy the care and charities shape to the other three.

**B6. Property promises "fixed fee in writing"** on `/about`, all four `/services/*`, `/services`,
`/book`, `/complete`, `/thank-you`, the footer of all 40 pages, and inside the FAQPage JSON-LD,
which tells Google "We quote fixed fees up front so there are no surprises". Four contractors pages
carry the same class. No other site does.

**B7. Property calls itself an accountancy practice** on `/` and `/contact`: "Property Tax Partners
is a specialist property accountancy firm for UK landlords, buy-to-let investors, and developers",
about 160 lines above the block saying it is not one. Its `Service` JSON-LD also sets
`serviceType: "Property accountancy and landlord tax services"` pointing at the correct Organization
node.

**B8. charities `/about` captures nothing.** No `<form>`, confirmed in a real browser. The page ends
on a bare "Get in touch" link straight after "The partner firm does the work." Every other site's
about page captures.

**B9. care's home page asks before it discloses.** The entity block sits at line 167 of 196, BELOW
the FAQ (120) and BELOW the lead form (152). It is the only page in the kit where a visitor can
submit without ever being told the enquiry goes to a third party. See the caution in section 6.

**B10. contractors' killed sentence is live on 62 blog posts.** `niche.config.json` `blog.cta_body`
was missed by `7ec4dd0f`: "We will review your contract, your working practices and your current
structure." `llms.txt` on the same domain says "it does not review contracts."

**B11. care `/llms-full.txt` line 3** says "Specialist UK accountants for care providers" while
`llms.txt` on the same domain says it correctly. The two machine files disagree about what the
business is.

### FIX (ranked)

**F1. contractors' blog category CTAs are dead code, and this is the highest-leverage single fix in
the check.** `BlogPostRenderer.tsx:373-379` renders `niche.blog.cta_*`. `ctaCopyForCategory` is
imported only by the hub route `blog/[category]/page.tsx:10,63`. The renderer already receives
`categorySlug` (line 28) and never uses it. `blog-categories.ts:15` asserts in a comment that both
consumers read the map; that is false. `blog-categories.test.ts` is green because it tests the map
and never the render. Eight good category CTAs reach 7 hub pages and none of the 62 articles.
Fixing one line retires part of B2 and all of B10.

**F2. The response-time posture is four postures.** Two sites promise, and each promises two
different things.

| Site | Posture |
|---|---|
| Property | "within 24 hours" on 60 instances, but "same working day" on 10 pages including all four service pages and every calculator |
| care | "within 24 hours" on 55 instances, but "within one working day" on all five calculators |
| Medical, contractors, charities | none stated, verified |

Neither promising site backs it: no Property or care nurture email mentions 24 hours at any step,
and both T0 messages make everything contingent on the lead replying. Either the T0 email states
the promise, or the sites drop to the weaker wording. Recommend the former.

**F3. Segment pages close identically, on every site.**
- Property: all 15 audience pages share one three-line close, eyebrow, heading and body.
- Medical: all nine audience pages end post-submit on "We store your details securely" instead of
  the next-step sentence `/contact` already has, and share five byte-identical trust tiles.
- contractors: all 14 `/for` pages share one foot-panel sentence with the noun swapped.
- charities: all 13 audience and service pages close on "We will explain what your organisation
  needs, in plain English, with no obligation", which also fails the decider test.
- care: all six service pages share one "Tell us about your situation".
The bodies above these closers are well differentiated. The close throws it away at the decision
point.

**F4. Over-capture on blog posts.** Property five surfaces, Medical six (two the same offer twice),
contractors five. Property's inline mini says "The form is just below", which is it admitting it
duplicates the form beneath it. Drop the inline mini on blog posts.

**F5. Pipeline artefacts substituting page titles into sentences.**
- care `/for/self-employed-carers-and-personal-assistants`: "Tell us about your self-employed carers
  and personal assistants situation", ungrammatical because the reader IS the carer.
  `/for/childrens-homes` has the same shape.
- charities: six audience pages carry "Tell us about your community interest companies", "Tell us
  about your small charities", "Tell us about your charity trustees and treasurers", a plural title
  in a singular slot.

**F6. care's "a specialist reviews X, Y and Z" closer is live on 11 of 13 Wave 1 posts**, not the
nine previously reported. The earlier pass nearly cleared it by reading the last sentence on the
page, which is always an FAQ answer, instead of the last sentence of the body.

**F7. charities Wave 1 sameness, quantified:** 8 of 8 posts at exactly 6 FAQs and 5 takeaways,
against a 0/6/8/8/10 spread in the older set, and the takeaways share a shape. Post-by-post targets
are in the site report, producing a 4-to-9 spread.

**F8. Unsourced figures, contractors home stat band.** Three of four trace to nothing in
`house_positions.md`. "~£2k modelled annual saving" and "~2M contractors affected" are unsourced;
"6 years HMRC can investigate" is wrong as a flat claim (4, 6 or 20 by behaviour). Only "45 days"
traces.

**F9. Pages with no capture that should have one.** Medical `/research` (the strongest authority page
on the site); care `/services` index and `/research/care-provider-business-index` (325 lines, linked
by name from home); charities `/services`, `/research` and `/calculators` indexes; care `/contact`
has no entity block.

**F10. Category and audience mismatches.** Medical: three blog CTA mismatches, worst a post about
CLOSING a company asking "Thinking about incorporating the private side?". charities: the blog CTA
calls a CIC reader's accounts "your charity's accounts" on both CIC posts, against house position 22
and the post's own sentence. Root cause: `src/data/blog-cta-copy.ts` was never built.

**F11. Smaller copy items.** care's BADR sentence reads as if BADR was 24% and fell (it was 10%,
then 14%, now 18%); care `care-home-vat-exemption-edge-cases` says "Get specialist advice";
charities `/for/social-enterprises` says "tax advice" on a page that says it gives none;
Medical `/for-gps` links neither sibling; contractors `/for` pages head a section "How we help"
directly above "it does not review contracts or file returns itself".

## 3. Sameness across the five sites

**The CTA template is one template with the sector noun swapped.**
- Property, 15 pages: "Talk to a specialist about your situation"
- care, 13 pages: "Talk to a care sector specialist about <Page Title>"
- charities, 13 pages: "Talk to a specialist about <Page Title>"
- Medical: "Speak to a specialist medical accountant about <thing>"
- contractors, 24 pages: "Book your free call"

**The button is the same button.** "Book your free consultation" on Property (30) and Medical (26);
"Book your free call" on contractors (24).

**The nurture sequences are the same four emails with the sector noun swapped.** The detail-capture
sequence has four identical subjects across all five sites, steps 1 and 3 near-verbatim. Worst line,
verbatim on four sites: "All we need is {ask}. Just reply to this email and we will sort the rest.
No cost and no obligation at any point." The day-7 email opens on all five with "Just checking in",
which is the phrase the decider test fails by name.

**Deliberate and correct, do not flag:** the consent sentence and the six entity-block headings.

**Genuinely differentiated, keep:** the break-up email on all five sites names real, different return
triggers. care's "If mornings go on handover, or one day of the week is quieter than the rest" and
charities' "or you would rather we called around a trustee meeting" are the best writing in the
nurture layer.

## 4. Decisions for the owner, in plain language

**1. The free first call.** About 200 pages across all five sites promise a free first call or free
review. We are not the ones making that call, and the same pages say we do not quote fees, so
promising it free is us pricing another firm's work at zero. This exact question was raised once
before on another site and parked for you. Options: (a) remove the word "free" everywhere and say
"no obligation" instead, which is already true and already on most of the same pages; (b) confirm
with the partner firm that the first call genuinely is free and always will be, then keep it; (c)
leave it. Recommendation: (a), because it costs nothing and removes a promise we cannot enforce.
Most of it is three shared files plus three site settings.

**2. The 24 hour promise.** Property and care tell visitors about 115 times that someone will be in
touch within 24 hours. No email in either sequence says it, and both first emails wait for the
visitor to reply first. Also, both sites say something different on their calculator and service
pages. Options: (a) put the promise in the first email and use one wording everywhere; (b) soften
every mention to "the same working day". Recommendation: (a). If the partner firm cannot commit to
24 hours, then (b), and tell me which.

**3. The health-check page on Medical.** It promises to email a report that nothing sends, and
promises not to chase while the code signs people up to four chasing emails. Options: (a) change the
three sentences to describe what actually happens; (b) change the code so health-check visitors are
exempt from the follow-up sequence, the way resource downloads already are. Recommendation: (b) then
(a), because the page's promise is the better product.

**4. Are the nurture emails actually switched on in production?** Every sequence is behind a setting
we cannot read from the code. If a site is switched off, a lead gets nothing at all, not even the
instant acknowledgement. This is a question, not a finding. Please confirm, or tell me to check.

**5. The entity block move.** You want it below the FAQs and smaller. Worth reading section 6 before
that is built, because on care's home page it is already below the FAQ and below the form, and that
is the one page in the kit where somebody can submit without ever being told their enquiry goes to a
third party.

**Already open, not re-argued:** the terms pages not mentioning the partner network; "regulated firm"
(40 occurrences on 30 Medical pages, 1 elsewhere); h1s, titles, metas and taglines saying
"Accountants for"; the Property couples-page three-year cap (still live in TWO places, the FAQ and a
stat tile, not one); chat widget auto-open and overlap; Property `llms-full.txt` at about 17 MB;
Property's orphan `/for` pages.

## 5. What this check got wrong, and the process lesson

**Four of five inventory agents reported site-wide text clipping at 390, and one insisted it was
"not a capture artifact". It was.** Edge headless `--window-size=390,844` does not emulate a mobile
viewport: it lays out at roughly 440px and crops to 390. The same command clips gov.uk identically,
which is how it was caught. Re-tested with true emulation (`puppeteer`, `isMobile: true`), every
page probed on all five sites returns document `scrollWidth` exactly 390 and ZERO overflowing
elements. The charities tables that do exceed 390 sit in `overflow-x: auto` wrappers that genuinely
scroll, which is correct.

**Yesterday's pre-live review used the same tool at the same widths.** Its 390 findings should be
re-checked before anyone acts on them. Its care entry saying "no overflow at 390" was right.

Three other claims were withdrawn on checking: Medical's health-check page is not missing a form
(client-rendered wizard, invisible to curl); Property's form-attribution concern is unfounded
(`extras.form_id`, `${formId}-role` and `source_url`); Medical's "optimization" US spelling sits in a
config key that does not render.

**The lesson worth keeping:** a rendering check needs a known-good control. One gov.uk screenshot
would have saved this check, and yesterday's, from a false mobile emergency. Suggested addition to
`scripts/check_audience_pages.py`, alongside the two already proposed: assert document `scrollWidth`
equals the viewport width at 390 using real emulation, and fail if a control page does not pass
first.

## 6. Entity block placement, for the relocation decision

| Site | Home | About | Audience pages | Service pages | Blog / calculators |
|---|---|---|---|---|---|
| Property | above FAQ, below form | above FAQ | above FAQ, above form | absent | absent |
| Medical | above FAQ | above FAQ | above FAQ | BELOW FAQ (`/services`) | absent |
| contractors | above FAQ, BELOW panel | above FAQ | above FAQ, above panel | above FAQ | absent |
| care | BELOW FAQ, BELOW form | above FAQ | above FAQ, above form | above FAQ, above form | absent |
| charities | above FAQ | above FAQ | above FAQ | above FAQ | absent |

It is full-bleed, `py-12/16/20`, a six-heading grid, roughly one viewport tall at 1280. Nothing
covers it on Property, care or charities; the chat widget covers it on Medical and contractors
`/about`.

**Two cautions for the move.**
1. On care's home page the block is ALREADY below the FAQ and below the form, and that is exactly
   why it is flagged as a blocker: the visitor can submit before any disclosure. "Below the FAQs" is
   safe only if it is still ABOVE the foot form. Medical `/services` is the model: below the FAQ,
   above the form.
2. The block is absent from every blog post and every calculator on all five sites, and from all four
   Property service pages, which carry the strongest "we do the work" claims with no disclosure at
   all. If the block is being reworked anyway, that gap is worth closing in the same change.

## 7. What is genuinely good

The writing. Across 59 Wave 1 pieces and roughly 40 sampled older posts, no figure failed a
re-check, and the segment bodies open on a named action and a real cost. Zero em-dashes and zero
live US spellings across all five sites. charities has the cleanest machine layer in the estate and
an `llms.txt` the other four should be ported to. care is the cleanest site for interruption: no
widget, no sticky CTA, no modal, no banner, verified over 8 seconds at both widths. Property's
post-submit layer is the best of the five. The consent sentence is verbatim and untouched
everywhere, and charities' two-step form carries the full data-sharing disclosure before submit,
verified by driving it in a browser.

## 8. Agents used

Eleven, against the approved twelve.

| Stage | Agents | Model |
|---|---:|---|
| Inventory and render, one per site | 5 | Sonnet |
| Site readers, one per site | 5 | Opus |
| Nurture reader, five sequences | 1 | Opus |
| Cross-site sameness and contradiction | 0 | done by the manager |

The twelfth agent was not needed: the cross-site sweeps (free-call class, fixed-fee class, footer
straplines, response-time posture, CTA templates, em-dashes and US spellings) ran as greps over the
rendered text already on disk, and the nurture reader had already done the cross-site nurture pass.

No paid API spend. No CI run, no deploy, no push, no IndexNow, no email, no monitor.
