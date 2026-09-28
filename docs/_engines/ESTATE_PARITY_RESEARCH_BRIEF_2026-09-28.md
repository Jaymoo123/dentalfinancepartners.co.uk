# Estate parity research: brief for the research agents (2026-09-28)

Owner, 2026-09-28: "before we go into plan mode we go full research mode, including porting etc,
just everything, completely and utterly comprehensive, from Lead, GEO, AI, readability, design,
everything from every perspective, where are we with each site, including the new estate and
divorce sites. What needs to be done."

This is research, not a build. Nothing is fixed, nothing is deployed, nothing is pushed, nothing
is committed by an agent. The output is one report per site plus one estate report, in the repo,
so the owner can read it and then we plan.

## 0. Rules (non-negotiable)

1. Read-only on the repo. Never `git checkout`, `git restore`, `git stash`, `git clean`,
   `git reset`, `git commit`, `git push`. Never `npm install`, never `npm run build`, never
   start a dev server. Seventeen agents share one working tree and one machine.
2. Scratch goes in `C:\Users\user\.claude\jobs\933e5962\tmp\<site>\` (create it), never the
   repo. Delete it when you finish.
3. The only repo file you write is your own report at the path given in your prompt.
4. Live sites may be read with GET requests (curl, or `puppeteer-core` from the repo root for
   rendered pages). Never submit a form on a live site. Never POST anything.
5. Every claim carries a file path with a line number, or a URL, or a command you ran. "Should
   be" is not evidence. A surface is live because something renders it, not because a comment
   says so. Missing data is a question, not a finding.
6. British English, no em-dashes in your report, plain words. The owner reads these reports.
7. The 390 px trap: Edge or Chrome headless `--window-size=390,844` does NOT emulate a mobile
   viewport; it lays out about 440 px and crops, and four agents on 2026-09-28 reported fake
   clipping from it. Use `puppeteer-core` with `page.emulate` / `isMobile: true` /
   `deviceScaleFactor` and check `document.documentElement.scrollWidth === 390`. Take a
   control screenshot of `https://www.gov.uk` with the same code before trusting any 390 finding.
8. The positioning ruling of 2026-09-28 evening supersedes 2026-09-12: **the brand IS the firm**
   on every prospect-facing and lead-facing surface. "We do the work" voice is correct.
   "Partner network", "referral network", "not an accountancy practice", "a specialist reviews"
   caveats and entity blocks in front of a prospect are now DEFECTS. The consent sentence,
   privacy, terms and the post-submit Aswatax message are unchanged by owner decision and are
   NOT defects.

## 1. The reference: what Property has

Property (`Property/web`, `www.propertytaxpartners.co.uk`) is the standard. Every other site is
graded against it. Its kit, with the file that proves each piece exists:

| Layer | Property implementation |
|---|---|
| Foot lead form | `Property/web/src/components/forms/LeadForm.tsx` inside shared `packages/web-shared/design/marketing/LeadCTAPanel.tsx` on home, /services, every `/for/[slug]`, blog post foot |
| Mini captures | shared `packages/web-shared/leads/MiniCapture.tsx`, `CalcResultCta.tsx`, `MobileToolSlot.tsx`; `components/forms/MiniCapture.tsx`; `components/blog/InlineMiniLeadForm.tsx` |
| Calculator result form | `components/calculators/ResultCaptureForm.tsx`, `ResultGate.tsx` (gate removed 09-27, one form under the result, no PDF offer) |
| Calculators | 6 route dirs under `src/app/calculators/` plus premium tools and `/embed` |
| Chat widget | `components/support/SpecialistWidget.tsx` |
| Intent engine | `components/intent/IntentProvider.tsx`, `ReturningBar.tsx`, `DeepScrollModal.tsx`; `lib/intent/` |
| Sticky CTA | `components/ui/StickyCTA.tsx` (homepage); hero CTA copy from `niche.config.json` `cta` |
| Post-submit | `/thank-you`, `/complete`, `/book` (`components/forms/BookingPicker.tsx`, `DetailsForm.tsx`); Aswatax intro message |
| Nurture | `src/config/lead-nurture.ts`, `delayHours` = GAPS between sends, Property `0,0,4,20,24,48,72,96` is the correct source; SMS ack via `src/app/api/leads/*` |
| Blog capture | `components/blog/BlogCategoryHub.tsx`, `BlogPostRenderer.tsx` with `CTA_BY_CATEGORY`, `BlogSidebarCta.tsx`, `InlineMiniLeadForm.tsx` |
| Segment pages | `src/app/for/[slug]/page.tsx` from `data/audiences.ts` (15 live pages), Service + FAQPage + BreadcrumbList schema |
| Organization schema | `lib/organization-schema.ts` on the shared builder `packages/web-shared/schema/organization.ts` (AccountingService, firm-first description, `sameAs`, `parentOrganization` Ashfield Trading Ltd 16358723, `knowsAbout`) |
| FAQPage schema | `lib/faq-page-schema.ts` wherever FAQ copy renders |
| llms.txt | `public/llms.txt` firm-first, every link tagged `utm_source=chatgpt&utm_medium=llms` |
| llms-full.txt | `src/app/llms-full.txt` on `packages/web-shared/content/llmsFull.ts` (`buildLlmsFullRoute`), lists all 806 posts |
| robots | `src/app/robots.ts` AI-crawler allowlist |
| Sitemap | `src/app/sitemap.ts`, `lastModified` real or omitted, hreflang |
| Analytics | `components/analytics/*` (consent, GA4, WebVitals), CSP allows `region1.google-analytics.com` |
| Research pages | `src/app/research/*` data assets with cite-this lines |
| Content | 806 posts, `docs/property/house_positions.md`, `docs/property/COVERAGE_MAP_2026-09.md`, `docs/property/STATE.md` |
| Design | Property is the design standard the kit was cut from; the port playbook is `docs/_engines/DESIGN_PORT_PLAYBOOK.md` (read its STOP block and section 9.1), `docs/_engines/HANDOFF_NEXT_PORT.md` |
| Plumbing | `agents/config/gsc_config.py` entry, `Property/pipeline/submit_indexnow.py` + key file in `web/public/`, Bing Webmaster ingestion, monitored_pages |

Known Property defects still open (do not re-report them for Property, DO check whether the same
site you are on shares them): footer "Book a consultation" points at an untokened `/book` that
renders zero forms; the 24-hour promise appears about 115 times and no nurture email backs it;
all 15 segment pages share one three-line close; `llms-full.txt` is 17 MB against a 19.07 MB
ISR ceiling.

## 2. Dimensions and the fixed row IDs

Every per-site report uses these row IDs so the estate report can be built by grep. For each
row give: what Property has (one phrase), what THIS site has (with evidence), gap size
(NONE / XS / S / M / L / N/A), and a one-line note. Put "?" where you could not determine it and
say what you tried.

**P. Positioning and voice** (the 2026-09-28 ruling, see rule 8)
- P1 `niche.config.json` `entity` key present and what it says
- P2 count of files under `web/src` + `niche.config.json` + `web/public` containing "not an accountancy practice", "partner network", "referral network", "a specialist reviews", "we are not accountants" or similar caveats, and WHICH prospect-facing surfaces they render on (home, about, services, contact, footer, blog CTA, thank-you, nurture, SMS, llms.txt, schema description)
- P3 "free consultation" / "free first call" / "free review" count and where
- P4 "within 24 hours" / "same working day" promise count, and whether any nurture email says it
- P5 Organization JSON-LD description and `@type` (AccountingService with firm-first wording is the standard)
- P6 `public/llms.txt` opening lines: firm-first or caveated

**L. Lead kit** (one row per layer in section 1)
- L1 foot lead form: which page types mount it (home, about, services, segment, service, blog post, calculators, contact); which do NOT
- L2 mini captures: which of the shared ids exist (`inline_mini`, `mobile_tool`, `calc_result_form`, `calc_result`, `resource_block`, `calc_page_footer`, `blog_short_resource`)
- L3 calculator result form: exactly one form under the result, no gate, no popup, no PDF offer
- L4 calculators: count, list, and whether each has FAQPage and cite-this
- L5 chat widget present and on which pages; auto-open behaviour
- L6 intent engine present (provider, returning bar, deep-scroll modal)
- L7 sticky CTA and hero CTA: mounted where, copy source
- L8 post-submit: thank-you, complete, /book with tokened form, Aswatax message present
- L9 nurture: file present, `delayHours` literal and whether it is gaps or cumulative, email count, voice (firm or caveated), SMS ack present
- L10 blog CTAs: mechanism, category-driven or fixed, dead code (e.g. `categorySlug` passed and unused)
- L11 consent text from `config/site.ts` `leadConsentText` verbatim estate-wide (diff against Property's)
- L12 lead source identifier in `/api/leads/submit` and whether the DB CHECK constraint accepts it (memory: leads CHECK = dentists/property/medical/solicitors/general/agency; if this site's source is not in that list, say what the code sends and where it lands)

**G. GEO and machine layer**
- G1 robots allowlist: count of AI crawlers, disallow list, host line
- G2 Organization schema: shared builder or hand-rolled, `sameAs`, `parentOrganization`, `knowsAbout`, rendered on which pages, one node per page
- G3 Service + FAQPage + BreadcrumbList on segment and service pages
- G4 BlogPosting on posts with `author` as Organization or Person, `dateModified` real
- G5 llms.txt: route or static, firm-first, UTM tags, lists audiences/services/calculators, hand-kept or derived
- G6 llms-full.txt: `buildLlmsFullRoute` or static, post count listed, size
- G7 sitemap: `lastModified` real / build-time `now` / omitted, hreflang rule, new routes included
- G8 canonical: self-referencing on hub pages, the canonical-hub defect (`git log --since=2026-09-26 --grep=canonical --stat` shows the fix shape; say whether this site carries it)
- G9 noindex anywhere it should not be; `/embed` rule
- G10 `agents/config/gsc_config.py` entry; `pipeline/submit_indexnow.py` and key; Bing Webmaster verified (say if unknown)
- G11 AI-assistant naming: does the 2026-09-27 baseline (`docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8 / T6) cover this site; if not, N/A

**C. Content**
- C1 posts total, posts with `date` >= 2026-07-30, newest post date
- C2 `docs/<site>/house_positions.md` exists, date of last edit, section count
- C3 `docs/<site>/COVERAGE_MAP_2026-09.md` (or any coverage map) exists
- C4 segment pages: route shape (`/for/[slug]` dynamic, static `for-*`, none), count, whether they follow Property's template (Service + FAQPage + breadcrumb + one form + stat tiles)
- C5 decision-stage and service pages: list of `/services/*` and money pages
- C6 validator: run `python scripts/validate_blog_content.py --site <site>` if the script supports the site (read-only); report pass/fail counts, or that the site is unsupported
- C7 known stale-fact classes: grep for "s.464C" without "s.464ZA", "£1,000,000 BADR" style old figures is NOT required; instead report whether the site's posts carry `dateModified` and `reviewedAt` at all
- C8 authors: byline model (Person / Editorial Team / Organization), named people anywhere
- C9 internal link health: run whatever link audit the site has (`scripts/` or `pipeline/`), read-only; report HARD 404 count or "no audit tool"

**D. Design**
- D1 port state: `git tag -l 'port-<site>-*'` result; `web-shared/design` import count (`grep -rl "web-shared/design" web/src | wc -l`); uplift commit if any
- D2 `packages/site-styles/prose-standard.css` imported from `globals.css`
- D3 header CTA hides below 1024 (rendered DOM check on the live site if launched, else source)
- D4 favicon set, `og:image` (SVG is a defect), `metadataBase`
- D5 fonts: which, loaded how
- D6 StatsCounter or stat tiles: literal-value support for dates and ranges (Medical rendered "0" for dates on 09-28)
- D7 390 px: `scrollWidth` at 390 with real emulation on home, one segment page, one post, one calculator (launched sites only); attach the gov.uk control result
- D8 playbook section 9.1 kit-adoption gate: run the block as written in `docs/_engines/DESIGN_PORT_PLAYBOOK.md` section 9.1, report the numbers

**I. Infra and ops**
- I1 live: `curl -sI https://<domain>/` status; `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` statuses; if NXDOMAIN or not launched, say so and grade D3/D7 from source
- I2 Vercel project id and last deploy date from `docs/<site>/STATE.md` or memory; whether HEAD contains commits after that date touching this site (`git log --since=<date> --oneline -- <site>/ | wc -l`)
- I3 tests: `web/src/**/*.test.ts(x)` count; CI workflow that covers this site (`.github/workflows/*.yml` grep for the site dir)
- I4 analytics: GA4 component present, CSP header includes `region1.google-analytics.com`, consent banner present
- I5 env and flags: which `site_flags` or env flags the code reads (grep `getFlag|site_flags|process.env.NEXT_PUBLIC_`), so the ops agent can check prod
- I6 monitored_pages: does the site have rows (say "unknown from repo" if you cannot read Supabase)
- I7 `docs/<site>/STATE.md` exists, date of its newest entry, and whether it contradicts the tags or the code anywhere you noticed

## 3. Report template (per site)

Path: `docs/<site>/PARITY_RESEARCH_2026-09-28.md`. Under 400 lines. Structure:

```
# <Site display name> parity research (2026-09-28)
Domain, Vercel project, launched yes/no, live status.

## Verdict in three lines
(where this site is against Property, in plain words; the three biggest gaps)

## Gap table
| ID | Property | This site | Gap | Note (evidence) |
(every row from section 2, in order)

## Unique to this site
(things Property does not have, or defects Property does not have; facts only)

## Shares Property's open defects
(/book dead-end, 24h promise, identical closers, others)

## Questions (missing data, not findings)

## Commands and files read
```

Gap sizes: XS = one file, one sitting; S = one agent, one session; M = a per-site package (build
+ review); L = a programme (design port, content wave, segment-page chain).

## 4. What the readers add (wave 2, Opus, after the inventories)

A second wave of Opus readers takes four sites each and reads the RENDERED pages (live where
launched, source otherwise) for: writing quality (em-dashes, US spellings, AI tells, sameness
within page, within site, across sites), positioning voice per rule 8 on every prospect-facing
sentence, readability (answer-first, one idea per paragraph, jargon), design at 1280 and 390
with real emulation, and accessibility basics (contrast, focus, labels). They append a
`## Reader findings` section to the same per-site report. They do not repeat the inventory.

## 5. What the data and ops agents add

- `docs/_engines/ESTATE_DATA_READ_2026-09-28.md`: per site, fresh (never stored snapshots) Google
  Search Console 28d and 90d clicks and impressions, Bing 28d and 90d, UK human sessions 90d,
  leads 90d, leads per 1,000 UK humans, AI-referred sessions and leads 90d, data-through date.
- `docs/_engines/ESTATE_OPS_READ_2026-09-28.md`: live status of all 17 domains, deployed commit
  per Vercel project against HEAD, CI state for the last 20 runs, prod flags that matter
  (`calc_pdf_offer`, `LEAD_NURTURE_ENABLED`), GA4 CSP on every live site, dependency closure.

## 6. The estate report

`docs/_engines/ESTATE_PARITY_RESEARCH_2026-09-28.md`, written last by one Opus synthesiser from
the 17 site reports plus the data and ops reads: verdict in three lines, a sites x dimensions
heat table, the ranked gap list by leverage (leads per 1,000 times traffic times gap size),
what is mechanical versus what is a programme, the agent count used, and the decisions the
owner needs to make, in plain everyday language, no file paths in the decision block.
