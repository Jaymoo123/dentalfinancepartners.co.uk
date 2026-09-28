# Full lead-kit check: brief for a fresh agent (2026-09-28)

Owner, 2026-09-28: "it's probably worth writing a handoff in order for a fresh agent to check. the
full lead kit, all of it, writing quality, sameness etc on everything." This is that handoff. It is
written for an agent with no memory of the last two days. Read it top to bottom before touching
anything.

## 0. Before you start (non-negotiable)

1. Read `CLAUDE.md` and load the `standard_terms` skill. Run ponytail full and caveman ultra.
2. Read `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` sections 1, 2, 10 and 13 (S4a, S4b, S5,
   and the S5 close block), then `docs/_engines/WAVE1_PRELIVE_REVIEW_2026-09-28.md` in full. That
   review is what has already been checked; you are the second, independent pair of eyes over a
   wider scope, not a repeat of it.
3. Read the 2026-09-12 owner rulings in memory `estate_claims_integrity`: the first-person "we do
   the work" voice STAYS and is not a defect; titles, h1s and metas are a separate ranking call and
   are reported, never edited; positioning must match the terms page; the sites are referral
   networks operated by Ashfield Trading Ltd (16358723), never accountancy practices.
4. Nothing deploys, nothing pushes, no IndexNow, no monitor, email, cron, popup or banner, and no
   change to an existing one's cadence, until the owner says so in that turn. Everything is
   local-first. There are 89 unpushed commits on `main` (this brief is one); do not push them.
5. Working-tree rules, earned the hard way: agents share ONE working tree. Never put `git checkout`,
   `git restore`, `git stash`, `git clean` or `git reset` in an agent prompt. One agent per site at
   a time for anything that edits or builds. Never kill node by image name; kill only the PID you
   started (a stale `next start` on a port will serve the OLD build and fake your results, it
   happened on port 3104 today). Check `git diff --stat` is non-empty before every commit; commit
   straight after each verified report. Scratch goes in the session scratchpad, never the repo, and
   is deleted at the end.
6. Price your fan-out before launching it and tell the owner the count. Default reviewers to Opus
   for anything a human reads or judges, Sonnet for builds and mechanical checks, never Sonnet for
   content, never DeepSeek. Re-grade existing evidence before spending a fresh wave.
7. Expected non-committed file: `care/web/src/app/blog/[category]/[slug]/page.tsx`, a
   line-ending-only empty diff. There are also about 17 untracked files from earlier sessions
   (`Admin/`, `docs/_engines/DWC_*`, `docs/ecommerce/*.json`, `expansion_research/`); they are
   not yours, leave them. Anything else modified at the start is a leftover; inspect it.

## 1. What "the full lead kit" means here

The lead kit is every surface between a visitor and a lead row, plus what the visitor is sent
afterwards. On each of the five priority sites (Property `Property/web`, Medical `Medical/web`,
contractors-ir35, care, charities) it comprises:

| Layer | Where | Notes |
|---|---|---|
| Foot lead form | `<site>/web/src/components/forms/LeadForm.tsx` inside the shared `LeadCTAPanel` (`packages/web-shared/design/marketing/LeadCTAPanel.tsx`) | on homepage, /about (care, charities), /services, every audience and service page, blog post foot |
| Mini captures | shared `packages/web-shared/leads/MiniCapture.tsx`, `CalcResultCta.tsx`, `MobileToolSlot.tsx`; per-site `components/forms/MiniCapture.tsx` (Property, Medical, contractors) or `components/calculators/MiniCapture.tsx` (care, charities); `components/blog/InlineMiniLeadForm.tsx` on all five | form ids `inline_mini`, `mobile_tool`, `calc_result_form`, `calc_result`, `resource_block`, `calc_page_footer`, `blog_short_resource`, the research index forms |
| Calculator result form | Property `ResultGate.tsx`, premium tools, shared `Calculator` result slot | owner rule 09-27: exactly ONE form directly beneath a calculator result, no popup, no gate, no PDF offer |
| Chat and intent surfaces | `<site>/web/src/components/support/SpecialistWidget.tsx`; `components/intent/` (`IntentProvider`, `ReturningBar`, `DeepScrollModal`; `NextStepOffer` on Medical and contractors only); `lib/intent/` | on Property, Medical and contractors ONLY; care and charities carry no widget and no intent surfaces (verified by grep 09-28, confirm on the rendered page); owner ruled auto-open stays on calculator pages; two open findings today: widget over the entity block on /about, returning bar misrendering at 390 on Property |
| Sticky and hero CTAs | per-site `components/ui/StickyCTA.tsx` on Property (homepage), Medical and contractors (`PageShell`); care and charities have no sticky CTA. Hero and home CTA copy: `<site>/niche.config.json` `cta.variants.leadgen.home_cta` on Property and Medical; care, charities and contractors leave `leadgen` empty and hardcode hero copy in their page files | Medical's home_cta was rewritten today; check the other four in their page files |
| Entity block | shared `packages/web-shared/design/marketing/EntityBlock.tsx` fed by `<site>/niche.config.json` `entity` | six headings: Who we are, Who this is for, Where we work, How it works, What happens next, What we are not; mounted on home, /about, /services, every audience and service page |
| Consent and disclosure | `LeadForm` consent text from `<site>/web/src/config/site.ts` (`leadConsentText`), `niche.config.json` `partner`, privacy and terms pages | consent wording is verbatim estate-wide; do not retype it anywhere |
| Post-submit | `/thank-you`, `/complete`, `/book` (`BookingPicker.tsx`, `DetailsForm.tsx`), the post-submit Aswatax intro message | thank-you pages have named Aswatax since 09-09 |
| Nurture | `<site>/web/src/config/lead-nurture.ts` | the emails a lead receives; same voice rules apply; "regulated firm" wording appears in Medical's file (twice), not the other four |
| Blog CTAs | five different mechanisms: Property `CTA_BY_CATEGORY` inside `components/blog/BlogPostRenderer.tsx`; Medical `lib/blog-cta.ts` via `BlogPostRenderer`; contractors `ctaCopyForCategory` in `lib/blog-categories.ts` via `BlogPostRenderer`; charities `BLOG_CTA` in `components/blog/blog-cta.ts`; care has no category map, one fixed heading plus `LeadForm` and `InlineMiniLeadForm` written directly in `app/blog/[category]/[slug]/page.tsx` | category-driven headings and blurbs on four sites, one fixed CTA on care |
| Machine layer | Organization JSON-LD (`lib/organization-schema.ts` or `lib/schema.ts`, all on `packages/web-shared/schema/organization.ts`), `public/llms.txt`, `llms-full.txt` route, footer legal line | all five ported and cleaned today; re-check, do not assume |

"All of it" means every one of those layers on every one of the five sites, on the rendered page,
at 1280 and 390, plus the copy of every email in `lead-nurture.ts`.

## 2. What "writing quality, sameness etc on everything" means here

Grade against three tests, on the rendered page, as a visitor and as an assistant would read it:

1. **Decider test** (plan section 1). Does the surface speak to a person about to do something
   (transfer, sell, gift, incorporate, register, hire), and does it say what happens after the form
   in one liftable sentence? A CTA that says "get in touch" with no situation and no next step
   fails.
2. **Writing quality.** A* or it does not ship. Specific, in British English, no filler, no AI
   tells, no em-dashes (U+2014, also as mojibake), no US spellings ("specialize", "optimization"),
   no pipeline artefacts ("verify at build", "(HP12)"), figures that trace to
   `docs/<site>/house_positions.md` or primary law. Banned in our own voice: pricing or fee
   figures for our service, named people, "chartered", "ICAEW", "ACCA", "CIOT", "our accountants",
   "we are accountants", "we advise", and "advice" as something we give (the negation "does not
   give advice" is required; a third party's advice is fine).
3. **Sameness.** Three kinds, and the last two were the misses this week:
   - across pieces on one site: identical openers, identical closers ("a specialist reviews X, Y
     and Z" ended nine of ten Medical posts and nine of thirteen care posts; care is still open),
     identical FAQ shapes (exactly six FAQs and five takeaways on all eight charities posts),
     identical CTA sentences on every audience page;
   - across surfaces on one page: the same "how we work" said twice (block plus a "handoff"
     section), the same registered-office sentence three times, two identical forms stacked;
   - across the five sites: the same CTA copy, blurb or panel title with only the noun swapped
     ("Talk to a care sector specialist about X" / "Talk to a contractor specialist about X"), the
     same nurture email with the sector word changed. Some shared wording is deliberate (the consent
     sentence, the six entity headings). Everything else should read as five sites, not one
     template.

Also grade **contradiction**: any surface that says something another surface on the same page or
site denies (response time 24 hours here and same day there; "our accountants" a screen below "not
an accountancy practice"; a footer identity line the entity block contradicts).

## 3. Scope, exactly

Per site, every page that carries a kit surface:

- `/`, `/about`, `/services`, `/contact`, `/book`, `/thank-you`, `/complete`
- every audience page: Property `/for/<slug>` (15, `src/data/audiences.ts`); Medical `/for-*` (9,
  one `page.tsx` each); contractors `/for/<slug>` (14, `src/data/contractor-types.ts`); care
  `/for/<slug>` (7, `src/data/care-hubs.ts`); charities `/for/<slug>` (6, `src/data/charity-types.ts`)
- every service page: Property four static `/services/*`; care and charities `/services/<slug>`
  (`care-services.ts`, `charity-services.ts`); contractors and Medical hubs only
- calculators: at least one dedicated calculator page and one generic per site, and on Property the
  section-24 page and the transfer-into-company post (the S1a reference pages)
- blog: every Wave 1 post (Medical 10, contractors 8, care 13, charities 8; slugs in
  `docs/<site>/_wave1/posts/`) plus five older posts per site chosen at random, so sameness is
  judged against the corpus and not only the wave
- research index pages that carry a form (`/research/*`)
- `lead-nurture.ts` on all five, every email, read as the recipient
- `public/llms.txt` and `/llms-full.txt`, the Organization node, the footer legal line

That is roughly 70 rendered pages per site at two widths, plus the nurture files.

## 4. Method

1. **Inventory first, from the rendered site, not from this document.** A Sonnet agent per site
   builds the production bundle (`npm run build`, `next start` on a unique port 3101 to 3105),
   walks the sitemap plus the routes above, and for every page records: every `<form>` with its id
   and heading, every CTA heading and button label, every entity-block occurrence, every widget
   element present in the HTML, the Organization node, canonical, h1, and the visible text of each
   capture surface. Save as JSON in the scratchpad. Screenshots at 1280 and 390, full page; where a
   full-page capture truncates (about 16,400 px in Edge headless) shoot in halves. Then a
   viewport-only shot of the top 900 px of /about and one audience page after an 8 second wait, so
   the chat widget's auto-open is captured honestly.
2. **Re-grade before re-reviewing.** Today's reports are in
   `docs/<site>/_wave1/qa/PRELIVE_READ_2026-09-28.md` and the compiled review. Where a piece is
   unchanged since (check `git log -- <file>`) and today's grade was READY, one sceptical read is
   enough; spend the reading time on the surfaces nobody has read yet: nurture emails, thank-you and
   book flows, contact pages, blog CTAs by category, the older posts, calculator pages, research
   forms.
3. **Cross-site pass last, one Opus agent.** Give it the five inventories side by side and the
   five nurture files. Its only question is sameness across sites and contradiction within a site.
4. **Report, do not fix.** The owner wants a check. Every finding carries page, width, the exact
   sentence, the proposed sentence or change, and one of: BLOCKER (false claim, contradiction, a
   broken or missing capture surface), FIX (copy or layout defect with an exact replacement), OWNER
   CALL (h1, title, meta, tier name, legal page, widget behaviour, anything in the 2026-09-12
   reserved list), FOLLOW-UP. Only if a build is red or a page 500s do you fix and rebuild, and you
   say so.
5. **Rendered, never source.** A surface counts if the browser shows it. A comment or a config key
   is not evidence.

## 5. Outputs

- `docs/<site>/_wave1/qa/LEAD_KIT_CHECK_2026-09-XX.md`, one per site: a table per layer (forms,
  captures, CTAs, entity block, widget, post-submit, nurture, machine layer) with one row per page
  or email, the grade and the sentence; then the ranked findings.
- `docs/_engines/LEAD_KIT_CHECK_2026-09-XX.md`: the cross-site sameness and contradiction report,
  the estate-wide ranked list, decisions for the owner in plain language, agent counts.
- A dated entry at the top of each `docs/<site>/STATE.md`, and a line in the plan doc's S5 close
  block pointing at the report. Update memory `leads_250_programme` with one paragraph. No new
  memory file.
- Delete the scratchpad. Kill your servers by PID. `git status --short` at the end shows only the
  care line-ending file and your reports.

## 6. Budget and count

Estimate before launch and tell the owner: 5 Sonnet inventory-and-render builders (sequential, one
site at a time), 5 Opus site readers, 1 Opus cross-site reader, 1 Opus nurture reader if the site
readers are already heavy. About 12 agents. No paid API. If the owner then wants the FIX and
BLOCKER items applied, that is a second, priced round: one fixer per site plus one re-verify build
per site, about 10 more.

## 7. What is already known, so you do not re-find it

Fixed today, verify they held (all local, commits listed in the compiled review):

- Property and contractors audience templates no longer lowercase the title into headings
  (`524b5290`, `44490175`); care and charities templates still call `title.toLowerCase()` but their
  titles are common nouns ("Care Homes", "Small Charities") so the headings read correctly, confirm
  on the rendered page; care and charities audience
  and service pages now carry one foot form; both service templates mount the entity block; Medical
  stat tiles render dates as text; Medical long posts carry one mid-article form; care service pages
  render their HTML; charities footer no longer says "specialist charity accountants"; Organization
  nodes are plain Organization with the entity sentence on all five; Property's about page no longer
  claims 100+ landlords or a 2020 start; Property stat strip says "200+ Landlord enquiries".

Open owner decisions (do not re-argue, just check nothing new joins them): the terms pages do not
mention the partner network; "regulated firm" wording estate-wide; h1s, titles, metas and taglines
that say "Accountants for" or "Specialist accountants"; the couples page s.58(1D) FAQ on Property;
the chat widget auto-open on /about and the returning-visitor panel at 390; orphan audience pages
on Property; two hub intros written to a reader (`/for-nhs-doctors`, `/for/it-contractors`); care's
heading-class "advice" strings; Property llms-full.txt at 17 MB against a 19.07 MB ISR ceiling.

Known follow-ups not yet done: care "a specialist reviews" closers; charities endowment figures
need house position 29; Property entity `serves` line on three family pages; `EntityBlock` silent
guard; response-time posture differs by site; T4 doc says seven missing queries, tables total six;
Medical `/for-gps` does not link its two new siblings; contractors four-stat band stacks to one
column at 390; two rendered-page checks worth adding to `scripts/check_audience_pages.py` (one form
and one entity block per audience page; a grep for `title.toLowerCase()` inside JSX text).

## 8. Traps

- The premium calculator tool is client-rendered (`ssr: false`); its form is invisible to curl.
  Count forms in the browser, not in static HTML.
- React hydration comments (`<!-- -->`) around interpolated text look like stray spaces to a naive
  strip-tags check. Read raw bytes before reporting a spacing defect.
- The count-up stat tiles show "120+" or "14hr" mid-animation in a screenshot; the target is in the
  markup. Check the markup before reporting a contradiction.
- The returning-visitor bar and the chat widget change what a page shows depending on visit
  history and time on page. State the conditions of every screenshot.
- Windows paths: `docs/property` and `docs/Property` are the same folder.
- A stale `next start` on a port serves the previous build. Confirm the port is free before you
  start, and confirm your PID is the listener.
