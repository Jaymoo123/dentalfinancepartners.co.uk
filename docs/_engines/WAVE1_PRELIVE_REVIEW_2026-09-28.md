# Wave 1 pre-live review (2026-09-28)

Independent read of the whole Leads-250 Wave 1 output before anything goes live: 20 segment
pages, 39 posts, the entity block on homepage, about and services on five sites, the shared
Organization schema, llms.txt, and the eight overhauled posts. Spec: `LEADS_250_PROGRAMME_2026-09-27.md`
section 1 (deciders, not readers) and sections 2 and 12. Owner rulings applied: first-person
"we do the work" voice stays (2026-09-12); titles, h1s and metas are a separate ranking call;
positioning must match the terms page; nothing deploys until the owner says go.

Nothing pushed, nothing deployed, no IndexNow, no monitor or email created.

## 1. Verdict in three lines

**Ready to go live, on the owner's word:** all five sites, after today's fixes. Every site
built green (tsc, vitest, next build), rendered clean at 1280 and 390, one entity block and one
Organization node per page, no wrong figure in 59 pieces, no banned string, no placeholder.

**Not ready as it stood this morning, now fixed:** the machine layer (JSON-LD, footers, about
pages, stat strips) still called four of the five sites accountancy practices and Property's
about page carried a false client count and trading history; two sites' audience and service
pages had no lead form at all; four templates lowercased the page title into headings. Twenty-one
fix commits today, all local.

**Decisions for the owner before or after go-live:** ten, in section 4. None blocks the deploy
except decision 1 if he wants the terms page to say what every other surface now says.

## 2. What the review found, by track

### 2a. Pages (rendered, production build, 1280 and 390)

Method: one Sonnet builder per site, one at a time (tsc, vitest, production build, `next start`,
curl checks on every page, Edge headless screenshots at 1280 and 390 full page), then one Opus
visual reviewer per site reading the screenshots as a visitor. Sites whose fixes landed after
their full build got a second, narrower re-verify build on the changed pages.

| Site | Pages rendered | Build | Rendered checks | Visual review | Re-verify after fixes |
|---|---:|---|---|---|---|
| Medical | 14 (+12 re-verify) | tsc clean, 539 tests, build green | one entity block and one Organization node per page after the duplicate-node fix; Service, FAQPage, Breadcrumb on all audience pages; no overflow | two fix-before-live: stat tiles rendering "0" on four new pages, two identical forms stacked mid-article; both fixed | clean: literal stat values render, one mid-article form, CTA copy, 7-question FAQPages, guides links, no widget over the /about block |
| contractors-ir35 | 19 (+7 re-verify) | tsc clean, 456 tests, build green | all clean, 14 audience pages, natural-phrase headings | five fix-before-live: entity block above the lead panel on white, chat widget over the /about block, "specialist accountants" card, table clipped at 390, orphan stat tile; all but the widget fixed | clean: block once, after the lead panel, before the footer; Organization plain with entity description; no banned phrase; table not clipped at 390; the reported "stray space" was a hydration comment, not a space. Two notes: the 4-stat band stacks to one column at 390 (breakpoint is 640), and the "Ask a specialist" widget auto-opens after 8 seconds on /about and overlaps the block at both widths (estate widget, decision 5) |
| care | 18 (+re-verify) | tsc clean, 59 tests, build green | fixed in pass: service pages printing raw HTML with overflow at 390; then clean, Organization plain with entity description | four fix-before-live: two "advise/advisory" strings, /about closing panel and repeated registered-office line; fixed except the heading-class "Advisory" tier (owner call); first-person "we run payroll" kept per ruling | clean: one form and one entity block on every changed page, panel titles keep the hub title verbatim; /about says the registered office twice (block and footer) and has one form; Organization plain with entity description; no overflow at 390; entity block not covered by any widget at the top of /about after 8 seconds |
| charities | 18 (+re-verify) | tsc clean, 65 tests, build green | all clean, one entity block and one form on all 13 audience and service pages, breadcrumb once | one fix-before-live: footer "Specialist charity accountants" on every page; fixed, plus ground alternation and stat grid | clean: footer line replaced on every page; block on white over a slate FAQ; one form and one block per audience and service page; four even stat columns at 1280; /about opens on the publisher sentence and closes with padding; Organization plain with entity description; no overflow at 390; nothing over the block after 8 seconds. Note: the earlier full pass had left its server running on port 3104, which first served the old build; killed and re-run |
| Property | 24 | tsc clean, 1640 tests, build green (945 routes) | all clean on first render after the port and fixes; llms-full.txt 810 posts, 17.0 MB static | desktop ready; at 390 a pre-existing returning-visitor panel misrenders and covers content on every page (live intent-engine surface, decision 5); chat pill over the fourth stat at 1280; eyebrow offset in the shared block | not needed (built after all fixes) |

Render evidence (screenshots, REPORT.md, VISUAL_REVIEW.md, REVERIFY.md per site) lived in the
session scratchpad and was deleted at close per the housekeeping rule; the per-site STATE.md
entries carry the findings.

### 2b. Content (59 pieces, sceptical read, re-graded against the Track A and Track B reports)

| Site | Pieces | Ready | Fix-first | Not ready | Wrong figures found | Banned strings in the pieces |
|---|---:|---:|---:|---:|---:|---:|
| Property | 15 pages | 13 | 2 | 0 | 0 | 0 |
| Medical | 5 pages + 10 posts + entity + terms | 6 | 11 | 0 | 0 (one incomplete Class 4 band) | 0 |
| contractors-ir35 | 5 pages + 8 posts | 6 | 7 | 0 | 0 | 0 |
| care | 2 pages + 13 posts | 13 | 2 | 0 | 0 | 0 |
| charities | 7 pages + 8 posts | 13 | 2 | 0 | 0 | 0 |

Every fix-first grade was a sentence, a template string or a missing mount, never a wrong
figure or a piece written to a reader instead of a decider. All applied today (section 3)
except the items listed as owner decisions (section 4). Per-site reads with the piece tables,
sameness verdicts and assistant tests: `docs/<site>/_wave1/qa/PRELIVE_READ_2026-09-28.md`.

What the readers agreed on:

- The writing is the strongest segment work in the estate. No figure failed a re-check
  against house positions or primary law across 59 pieces.
- The defects were in the furniture, not the words: four templates lowercased the page
  title into headings ("What makes it contractors accounting different", "What lands on your
  desk: landlords moving property into a limited company"), two service templates had no
  entity block, two had no lead form, Medical's stat strip rendered dates as "0", Medical
  posts stacked two identical forms mid-article.
- Sameness is visible at the closings, not the openings. Nine of ten Medical posts and nine
  of thirteen care posts ended on "a specialist reviews X, Y and Z"; all five new Medical
  audience pages closed on one identical sentence; all eight charities posts had exactly six
  FAQs and five takeaways. Medical's and charities' closers were varied today; care's are a
  follow-up (section 5).
- Assistant test passed on every page tested (three per site): the entity block alone lets
  a model describe us as a trading name of Ashfield Trading Ltd that publishes research and
  introduces enquiries to a partner firm, with no person named and no practice claim.

### 2c. Philosophy (cross-cutting, one reviewer)

Report: session scratchpad `philosophy_review.md`, findings carried here.

- **Deciders, not readers.** 34 segment pages read: 22 open to a person about to act, 8 mixed,
  4 written to a reader. Property is the strongest set (13 of 15 open with a named action and
  cost). The four reader pages are pre-existing occupation hubs brought into the wave without a
  rewrite; two of them, Medical `/for-nhs-doctors` and contractors `/for/it-contractors`, are
  the pages the section 8 baseline named. Follow-up, not a blocker.
- **The four statements.** Who it is for, how it works, what happens after the form and what
  we are not are all present on every rendered audience page on all five sites, carried by the
  shared `EntityBlock` from each site's `niche.config.json` entity key. "What happens next"
  reuses the live consent sentence verbatim, so page and form cannot drift apart.
- **Would an assistant name us accurately?** From the entity copy and llms.txt, yes on all
  five. From the JSON-LD as it stood this morning, no on four of five: the hand-rolled
  Organization nodes on Property, contractors, care and charities said `AccountingService`,
  two carried `priceRange`, Property's homepage carried office hours, and every node's
  `description` was the meta string ("Fixed fees, 24hr response", "IR35 status advice").
  Property's about page metadata claimed "100+ landlords served, property-only since 2020"
  against an operating company incorporated in 2025. All fixed today (section 3).
- **Positioning consistency.** After today's fixes, page copy, schema and llms.txt agree on all
  five sites. The terms pages do not contradict the referral model but none of the five
  mentions it (decision 1). Response times now agree (24 hours on Property and care, none
  stated on the other three).
- **Query protection on the eight overhauled posts.** T4 listed six missing queries (its
  summary line said seven); three are now answered by new FAQs, the two Medical FAQs the T4
  fix had displaced are restored, one honest clause covers "are there many VAT registered GP
  surgeries", and the two location and specialty queries are left alone deliberately. Four of
  eight H1s changed intent by design (reference page to decision page). Two are flagged for
  the owner as ranking calls (decision 4).

## 3. Fixed today, all committed locally

Twenty-one commits on top of `847fdc8e`, all local, in the order they landed:

| Commit | What |
|---|---|
| `1bca9bf0` | Property Organization onto the shared builder, one node per page, blog author = Organization (S5 pickup item 1) |
| `506fd848` | care: three read fixes; entity block on `/services/[slug]` |
| `44490175` | contractors: template no longer lowercases the title into headings (`phrase` field); checklist post keeps its outside-IR35 frame; pension summary states both taper limbs |
| `b322546e` | charities: entity block on `/services/[slug]`; three closers thinned; duplicated H2 renamed |
| `524b5290` | Property: fixed headings on the audience template; MTD stat label; four labels shortened |
| `ec807430` | Medical: duplicate Organization node removed from about, services, contact, locations |
| `ba52e930` | Medical: Organization description = entity sentence |
| `3501f645` | care: Organization plain, no priceRange, entity description; "standalone engagement" gone; 24 hours |
| `91645ae4` | charities: Organization plain; about page no longer "a specialist accountancy practice" |
| `8721c585` | Property: AccountingService node deleted; "100+ landlords since 2020", "one qualified accountant", "clear recommendations" gone from about and services |
| `3f6ee5ce` | web-shared: StatsCounter literal `value` |
| `2f6cc669` | Property: "100+ landlords" out of the stat strip, homepage metas and trust badges (now "200+ Landlord enquiries") |
| `7ec4dd0f` | contractors: Organization plain; nine "we review your contract" rows and the hero moved to the referral voice |
| `f6052eb9` | Medical: stat tiles as text; one mid-article form |
| `21bff5e8` | contractors: entity block below the lead panel; table wraps at 390; grids follow count; remaining review and client-base claims |
| `c8e43895` | Medical: homepage CTA, closings varied, Class 4 band, two FAQs restored, VAT prevalence clause, deriveTopic, guides links |
| `ea785848` | care: service pages render HTML fields as HTML |
| `2ddf46bd` | charities: lead form on audience and service pages |
| `3a25f3ea` | care: lead form on audience and service pages |
| `35797eeb` | care: about page closes on a lead panel; acquisition card no longer advises |
| `d8c9a52e` | charities: footer claim; ground alternation; stat grid; about padding |

Plus the docs commit that carries this review, the five per-site reads, the STATE entries and the
plan doc status block.

## 4. Decisions for the owner

Plain language, one line each, recommendation in brackets.

1. **Terms pages.** None of the five says enquiries go to a partner firm; every other surface now
   does. Add one shared paragraph to section 1 of all five terms pages? (Yes. Wording already
   exists as the consent sentence. Legal page, so your call.)
2. **"Regulated firm."** The estate says "a regulated firm from our specialist partner network"
   in privacy policies, consent, nurture emails and about 60 page strings. Keep it only if the
   partner firms are body-regulated; otherwise "a firm from our specialist partner network".
   Not touched today because it is estate-wide and consented wording. (Check with the partner,
   then one sweep.)
3. **Headline identity strings.** Homepage h1s and metas still say "Accountants for UK care
   providers", "Specialist accountants for UK charities", audience h1s "Accountants for IT
   contractors", and the Medical and contractors taglines feed the Organization `slogan`. All
   are the ranking call you reserved on 2026-09-12. (Leave for the deploy, revisit with the
   month-1 read; dropping `tagline` from the two Organization nodes is one line each if you want
   the schema clean now.)
4. **Couples page FAQ 4 (Property).** It caps the no-gain-no-loss treatment after separation at
   three years for court-order transfers; s.58(1D) has no time limit for those. Track A chose
   the conservative reading. (Apply the reader's wording; it is the statute.)
5. **Returning-visitor panel at 390 (Property).** Every page shows a "Welcome back, pick up where
   you left off" panel to a returning visitor; on a phone its text breaks one word per line and
   its button sits under the chat pill, over the entity block on /about and the stat strip on
   every audience page. Live surface, not Wave 1. (Fix the layout in its own change after the
   deploy; do not remove it, it is on the 28% path.) Same family: the "Ask a specialist" widget
   auto-opens after about 8 seconds on /about on contractors and Medical and its panel covers the
   entity block, the first thing the page says; and its pill sits over a stat value on audience
   pages at 1280 on Property and contractors. You ruled auto-open stays on calculator pages
   (decision 9, 09-27); /about was not in that ruling. (Delay or suppress auto-open on /about
   only; one flag on the shared widget.)
6. **Orphan segment pages.** Property's 15 `/for` pages are reachable only from the sitemap and
   llms.txt; Medical's five are now on the guides hub only. Enough for the assistant lever, not
   for Google or a human. (Approve one "other situations" list on the template foot and one
   list on `/services/property-accountant`; new block, so asked first.)
7. **Two hub intros written to a reader.** `/for-nhs-doctors` and `/for/it-contractors`, the two
   pages the baseline named. (Two Opus rewrites plus Track A, about 6 runs, before or after
   deploy.)
8. **Care heading-class "advice" strings.** Blog CTA h2, the `/services` "Advisory" tier and
   two card titles, left because headings are the SEO surface. (Same bucket as decision 3.)
9. **Property llms-full.txt is 17.0 MB**, static, 2 MB under the 19.07 MB ISR ceiling that
   broke the estate in August, and it grows with every post. (Cap it at the newest N posts or
   split by year before Wave 2 adds to Property.)
10. **Go.** Say "deploy" and the order is decision 10 in the plan: push, dependency-closure
    check, clean worktree at the pushed SHA, Property first, then Medical, contractors, care,
    charities, Dentists and generalist for the s.464ZA patches, `calc_pdf_offer` off in prod
    the same day, live checks, then the T6 baseline rerun. IndexNow only if asked.

## 5. Follow-ups that do not block go-live

- care: "a specialist reviews" closer on nine of thirteen posts; vary five (Opus, 1 run).
- charities: endowment figures (£25,000, 60 days, 25%, 20 years) trace to Charities Act 2011
  ss.281-284D only; add house position 29.
- Property: entity `serves` line says "landlords and property investors" on three pages aimed at
  executors and families; add "and families passing property on".
- Shared `EntityBlock`: the `niche.entity ? ... : null` guard silently drops all four required
  statements if a site lacks the key; make it a build-time assertion before the other ten sites
  get the block. Also the eyebrow sits about 34 px right of the headings beneath it.
- Response-time policy: 24 hours on Property and care, none stated on Medical, contractors,
  charities. Pick one posture.
- `T4_QUERY_PRESERVATION_2026-09-27.md` summary says seven missing queries; the tables total six.
- Medical `/for-gps` does not yet link to `/for-salaried-gps` and `/for-gp-partners`.
- Property: chat pill over the fourth stat value at 1280 on audience pages (estate widget).
- contractors: the four-stat band stacks to one column at 390 because `sm:grid-cols-2` starts at
  640; use `grid-cols-2` as Property does if two-up is wanted on phones.
- contractors: chat "Close" pill clipping the third stat label on ten audience pages (same widget).
- Live posts flagged by the care sweep: `fnc-chc-la-fee-mix-accounting` ("seek advice"),
  `cqc-registration-costs-and-finance-guide` overlaps the new set-up post.
- Two site-wide checks worth adding to `check_audience_pages.py`: a rendered-page check that
  every audience and service page carries one `<form>` and one entity block, and a template
  grep for `title.toLowerCase()` inside JSX text. Both would have caught today's biggest finds.

## 6. Agents used

36 agents today, 16 Opus and 20 Sonnet, plus about 21 manager-run typechecks and commits. No
paid API spend. No CI run, no deploy, no email, no monitor.

| Stage | Agents | Model |
|---|---:|---|
| Step 1: Property Organization port | 1 | Sonnet |
| Step 1: full build and render pass, five sites | 5 | Sonnet |
| Step 1: re-verify builds after fixes (Medical, contractors, care, charities) | 4 | Sonnet |
| Step 2a: visual reviews, five sites | 5 | Opus |
| Step 2b: sceptical content reads, five sites | 5 | Opus |
| Step 2c: cross-cutting philosophy and positioning | 1 | Opus |
| Fixers from the reads and reviews | 15 | 10 Sonnet, 5 Opus |

The fixers were not in the morning's plan. They came from the review finding more than expected,
and each was launched after its site's reader or reviewer reported, one site per fixer, never two
on one site. Scratch files deleted at close; render evidence not kept.
