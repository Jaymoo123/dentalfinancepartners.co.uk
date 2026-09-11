# Solicitors — program state (living heartbeat)

The single living state doc for the Solicitors site (Accounts for Lawyers). The
methodology lives in the shared engines (`docs/_engines/NETNEW_PROGRAM.md`,
`REWRITE_PROGRAM.md`, `ENGINE_MAP_AND_ONBOARDING.md`); this doc holds only the
site-specific WHAT and the heartbeat. Ground-truth facts live in
`docs/solicitors/house_positions.md`, never here.

Last updated: 2026-09-10.

## PICKUP: START HERE if you are a fresh agent on this port

**Where it stands, 2026-09-11.** Phases 0 and 1 are DONE, committed and tagged
(`port-solicitors-phase0`, `port-solicitors-phase1`). Phases 2 to 6 are not started.
NOTHING IS DEPLOYED and production still serves `18b4f25f`, the old design. Your next
action is Phase 2, the blog subsystem.

**Read in this order before acting:**
1. `docs/_engines/DESIGN_PORT_PLAYBOOK.md` in full. Section 12 is your job description
   (you orchestrate, you do not write page code), section 13 is the concurrency protocol,
   sections 6 and 14 are the 27 named traps.
2. `docs/_engines/PORT_FIELD_NOTES.md`. What the other ports have already learned. Add to
   it before you finish.
3. `docs/solicitors/DESIGN_DELTA.md`. The APPROVED brand contract for this site.
   Deviating from it is a defect.
4. `docs/solicitors/_port/DISPOSITION_SLICE1-3.md`. Nearly 1,500 lines of file-by-file
   spec covering every surface, written in Phase 0. Slice 2 owns calculators, services,
   locations and the audience pages; slice 3 owns contact, post-submit, about, research,
   resources, legal and the interruptive stack. **Treat them as a starting hypothesis, not
   a specification: re-derive anything you rely on.**
5. `docs/solicitors/house_positions.md`. Ground truth for every published figure.
6. This file, top to bottom.

**The reference is `Property/web`, always.** Where the shared kit, the generalist port and
Property disagree, Property wins. The kit at `packages/web-shared/design/` is a de-branded
extraction FROM Property, so consuming the kit is consuming Property, with the known
exceptions listed in the field notes.

**Other agents are working in this same checkout right now**, on the Medical port and on a
content-expansion programme. Their uncommitted files WILL appear in your `git status`.
Never run a repository-wide git command, never `git add -A` at the root, and stage explicit
paths only. Full protocol in playbook section 13.

**The verification contract, re-run after every change and not once:**

```
python scripts/check_dependency_closure.py
cd Solicitors/web && npx tsc --noEmit
cd Solicitors/web && npm test
cd packages/web-shared && npm test          # if you touched the kit
cd Solicitors/web && npx next build         # serialised, nothing else building
cd Solicitors/web && npx next start -p <port>   # then crawl it
node docs/_engines/instruments/sweep.mjs --site=Solicitors --base=http://localhost:<port> --sample=9999 --out=<path>
```

**Numbers to hold or beat** (the Phase 1 close, all re-derived that day):

| Gate | Value |
|---|---|
| Build | exit 0, 294 prerendered pages |
| Link floor | 0 breaches across 274 routes |
| Unique internal links | 10,510 (pre-port baseline was 5,343) |
| `data-cta` | 774, zero regressions |
| Visible em-dashes | 330, zero regressions |
| Solicitors tests | 15 files / 204 tests |
| web-shared tests | 19 files / 406 tests |
| Dependency closure | OK across 19 sites |

A drop in any of these is a blocker, not a nit. The link floor is the whole safety net:
`docs/solicitors/_port/link_baseline.json` is the authority and carries the production SHA
and its deriving command.

**Read the bound port out of the server log and assert the served page title before you
trust any crawl.** Three wrong-site measurements happened in one session because another
agent's server held the port and the instrument crawled a different site entirely.

**Phase order from here:** 2 blog subsystem, 3 article templates and hubs, 4 calculators
(including the approved ResultGate), 5 homepage and pillars and locations, 6 contact,
post-submit, research, resources, legal, interruptive restyle and the rule-based content
sweep. Each phase: plan, build in parallel work packages, manager-verify, INDEPENDENT
adversarial review against the rendered DOM, gap-fix, re-review, tag, commit. A review that
finds nothing has failed; both Phase 1 reviews found real defects and the second found a
defect the first fix had introduced.

**Owner decisions already taken, do not re-ask:** crimson `#c41e3a` stays primary with the
button ground pinned to the brand hex; the warning ladder is W1 (amber-700, orange-700,
fuchsia-700, violet-700), off red; Cormorant Garamond is dropped; our own published pricing
is removed across all ~15 instances; a skippable calculator ResultGate ships on the generic
fleet; the footer sister-site block is removed.

**Owner questions still OPEN, bundle them, do not drip:**
1. Should the designer credit appear on sibling sites the studio did not design? It is
   currently off for Solicitors and generalist.
2. The header shows two reds: the wordmark icon and rule at rose-600 `#ec003f` (the kit
   hardcodes `text-primary-600`) against the brand crimson on the button. Both clear
   contrast; the delta asked for the icon to be the brand. Match them?
3. The homepage hero loads an external Unsplash image, a live third-party dependency on the
   main lead page, where the standard ships zero photography. Replace with the motif?

**Known live defects still to fix, recorded in full below:** our pricing in ~15 places,
`/resources` 404 linked from 8 pages, the five `/services/[slug]` pages missing from the
sitemap, 10 dead internal links, four turnaround promises on `/contact`, three WCAG
failures on the research pages, charts removed from the accessibility tree, an ungated
duplicate calculator on `/embed`, a stale "6 calculators" claim, and an unsourced lock-up
figure on the homepage.

**Transitional state you must not mistake for a bug:** `font-serif` is mapped to the sans
stack in `globals.css` as a documented no-op, because dropping Cormorant left 193 classes
across 39 page files that later phases own. Each phase deletes its own; the mapping line
goes when the count reaches zero.

---

## 2026-09-10 - DESIGN PORT PHASE 0 (Property standard). Nothing deployed.

The Property-standard design port has started. Method:
`docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Programme artefacts: `docs/solicitors/_port/`.
Production still serves the OLD design throughout; cutover is one owner-triggered deploy
at the end.

**Corrections to this document, made in the same session that found them:**
- Production SHA is `18b4f25f39cd0c4aa084e582d69a87c8a10710ac` (Vercel `targets.production`,
  readyState READY, read 2026-09-10). The `435cc12e` recorded below on 2026-08-25 is STALE;
  the estate has deployed since. Date any before/after read from the 18b4f25f deploy.
- Corpus counts below said "149 blog posts, 6 solicitor-guides". Both wrong on disk today:
  **196 blog posts, 10 solicitor-guides**, 8 resources, 5 `/services/[slug]` sub-pages,
  13 generic calculators + 5 premium, 5 locations, 17 distinct blog categories (7 with
  hand-built landing pages, 10 derived). Build at 18b4f25f emits 294 prerendered HTML files;
  the sitemap yields 274 sweepable public URLs.

**Phase 0 captured (no code):**
- `git log 18b4f25f..origin/main -- 'Solicitors/'` = 0. Nothing Solicitors-owned is
  committed-but-undeployed.
- `git log 18b4f25f..origin/main -- 'packages/web-shared/'` = 10 commits, all from the
  generalist port, all riding this site's next deploy. Two touch modules Solicitors imports
  (`components/ServiceTiers.tsx`, `tools/components/Calculator.tsx`); both verified strictly
  additive with behaviour-preserving defaults, so the site renders byte-identically today.
  `Calculator.resultWrapper` (identity default) is the exact hook the calculator ResultGate
  needs, already built. Name all ten in the cutover annotation.
- Link-floor baseline at `docs/solicitors/_port/link_baseline.json`: 274 routes, 5,343
  unique internal links, 774 `data-cta`, **330 rendered em-dashes**. Captured from
  `next start` in an isolated worktree at the production SHA, before the first port commit,
  full sweep (`--sample=9999`, all 196 articles, not a 30-article sample).
- Armed `monitored_pages`, both predicates stated because they disagree and the difference
  matters: `monitor_until > now()` = **41 rows** (windows 2026-10-06 and 2026-10-07);
  `monitor_until >= current_date` = **76 rows**, the extra 35 being windows that expire
  TODAY, 2026-09-10. 76 is every row this site has. The estate-canonical predicate
  (corrected 2026-08-26) is `monitor_until > now()` with NO status predicate: 16 of the 41
  are status `'flagged'`, which the old `status='active'` filter silently excused, and
  `'flagged'` marks an OPEN regression, not a cleared one. Frozen set includes `__home`,
  `services`, `contact` and `blog`. By cutover the 35 expiring today will have closed, so
  the cutover knowingly re-baselines roughly 41; re-derive on the day rather than reusing
  this number.
- Kit design consumption before the port: ZERO. This port is the shared kit's second
  consumer after generalist.

**Owner decisions taken 2026-09-10:** crimson `#c41e3a` stays primary (ramp snaps to rose,
button ground rose-700) and the warning/duty/penalty ramp moves OFF red; the Cormorant
Garamond second typeface is dropped; our own published pricing is removed; a skippable
calculator ResultGate ships on the generic fleet; the footer sister-site cross-links are
removed and the footer takes the kit/Property shape.

**Live defects found in Phase 0, none of them design work:**
- `/services` publishes our own prices (`services/page.tsx:110,122` and
  `services/[slug]/data.ts:115`: from GBP180/month, from GBP450/month, GBP4,000-GBP12,000).
  Breaches the standing no-pricing rule. Removed by owner decision.
- `/resources` is a hard 404: linked from all 8 resource pages
  (`resources/[topic]/page.tsx:56`), no route, no redirect in `next.config.ts`, absent from
  the sitemap.
- `src/config/site.ts:8` reads `niche.company.registered_office` unguarded where Property
  guards it, after 7 production `client_error` rows from partial chunk loads.
- `role="img"` collapses four chart subtrees (`research/LegalIncorporationCharts.tsx` x3,
  `tools/premium/PremiumBarChart.tsx`), making every data value unreachable to a screen
  reader.
- `src/app/page.tsx:488` claims "6 calculators"; the registry holds 13 generic + 5 premium.
- "26.2% of SRA firm closures" is published on 4 pages and is not in `house_positions.md`.
- `globals.css` duplicates the layout and button recipes as CSS classes with ZERO consumers.
- **The five `/services/[slug]` pages are absent from the sitemap.** All five render 200
  (`/services/{solicitor-accountants,sra-accounts-rules,llp-accounts,practice-valuation,
  cofa-compliance-support}`) and are linked from `/services`, but the sitemap's 274 entries
  contain `/services` once and no sub-page. The site's main commercial cluster is not being
  declared to search engines. Verified independently of the disposition pass by curling both
  the sitemap and each route.
- `/embed/law-firm-sale-cgt` serves a second, UNGATED copy of a calculator that also exists
  as a bespoke route and as the 13th registry config. Matters once the ResultGate ships.
- `partner-tax-reserve.related` links to two slugs that 404.
- Every in-page anchor on all 80 browser-checked routes computes `scroll-margin-top: 0px`
  where the standard needs `scroll-mt-24`, so with a sticky header every `#` jump on the
  site hides its own heading. 8 React #418 hydration mismatches also logged.
- **Our own pricing is published in roughly 15 places, not two.** Beyond
  `services/page.tsx:110,122` it includes `services/[slug]/data.ts:93,113-115` (a full fee
  structure), `specialist-vs-generalist-accountant:57` (GBP180-GBP1,800/month plus a
  comparative fee claim, live in the copy AND in FAQPage structured data), `/contact:50,106`,
  and `config/service-tiers.ts:47` "Fixed monthly fee from GBP180/mo", which feeds the
  HOMEPAGE and is invisible in `page.tsx` itself. Verified rendering live. Removing only the
  `/services` prices would move the problem rather than fix it.
- `/contact` carries four TURNAROUND PROMISES ("within 24 hours"), including in its
  metadata. Banned by the locked content rules.
- Three live WCAG failures on the research data pages: crimson eyebrows on `bg-neutral-900`
  at ~3.05:1, and `text-neutral-400` at 2.52:1 on the research hub and incorporation tables.
- The 10 derived blog hubs exclude all 7 hand-built categories from their sibling chip rail
  (`blog/[category]/page.tsx:82`), so the three largest categories are unreachable from
  those hubs.
- A second unsourced homepage figure beyond the 26.2%: "average lock-up of 128-139 days"
  (`page.tsx:45`).
- The charts defect is WORSE than `role="img"` alone: each chart wrapper already carries
  `aria-hidden="true"` (`LegalIncorporationCharts.tsx:36,98,177`), so the whole figure is
  removed from the accessibility tree and the `aria-label` is dead.
- `tw-animate-css` is absent from `Solicitors/web/package.json` but PRESENT in the hoisted
  root `node_modules` via 9 other sites, so an added import would resolve by accident today
  and fail on a clean install. Exactly the `check_dependency_closure.py` failure class;
  declare it in the same commit that imports it.

**TEN DEAD INTERNAL LINKS, all pre-existing (verified 404 on the untouched production
build at 18b4f25f as well as on the port branch, so none of them is ours):**
`/resources`; `/calculators/solicitor-take-home`; `/calculators/fee-share-vs-equity-partner`;
`/blog/legal-aid-laa-work-vat-and-cash-flow`;
`/blog/cofa-monthly-checklist-uk-law-firms`;
`/blog/billing-discipline-end-of-quarter-uk-law-firms`;
`/blog/client-account-handling-residential-conveyancing`;
`/blog/common-sra-accounts-rules-breaches-and-how-to-fix`;
`/blog/structure-incorporation/salaried-member-rules-uk-llps-explained`;
`/blog/structure-incorporation/llp-vs-traditional-partnership-uk-law-firms`.
Note that three of these slugs ARE armed `monitored_pages` rows, so the pages are being
measured while the links pointing at them 404. Also one 301 in the crawl:
`/blog/practice-finance-cash-flow/solicitor-accountant-cost` to `...-fees`. Definition of
done requires zero 404s on internal links, so these are port work, resolved by fixing the
link source or the target, never by deleting the link (DESIGN_SYSTEM 0.6).

**26.2% statistic: VERIFIED, keep with a correction.** The real figure is 11 of 42 firms
subject to closure in the SRA year to 30 September 2025 (26.2%), against 11 of 59 (18.6%)
the year before. Sourced to an analysis by Lubbock Fine working from SRA closure data,
reported 2026-03-25 and corroborated in two further trade titles; it is not an SRA headline
publication. Two published errors to fix: `sra-compliance:117` dates it "in 2024-25", which
is the wrong scope, and all four instances omit the denominator. The count of
accounting-breach closures did NOT rise; it was 11 both years. The share rose because total
closures fell from 59 to 42. Any page citing it must say so, or it misleads.

**Process note worth keeping.** The first baseline sweep was INVALID and was discarded: port
3111 was already serving the generalist site, our `next start` failed to bind with
EADDRINUSE, and the instrument happily measured Holloway Davies. Assert the served `<title>`
before trusting any sweep.

## 2026-09-10 - PHASE 1 COMPLETE (tokens + chrome), tagged `port-solicitors-phase1`

Commits: `a4d501cc` brand layer, `0f40699a` nav IA and guard tests, `75d9f48f` chrome,
`cb041c9d` fidelity gaps, `0f4de663` cta placement and goal on both kit consumers.
Nothing deployed; production still serves 18b4f25f.

**Verification at close** (re-run after every change, not once): build exit 0 at 294 pages,
identical to the pre-port baseline; tsc clean; Solicitors 15 files / 204 tests (from 9 /
183); web-shared 19 files / 406 tests; dependency closure OK across 19 sites; full crawl of
all 274 baseline routes showing 0 link-floor breaches, 0 data-cta regressions and 0 em-dash
regressions. Total unique internal links 5,343 to 10,510, nearly doubled by the nav IA with
nothing removed.

**Both reviews found real defects, as the playbook says they must.** Review 1
PASS-WITH-GAPS: one blocker (`data-cta-goal` flipped `contact` to `form` on all 274 routes,
splitting a live `vw_cta_performance` series), the Double Wired Creative designer credit
appearing as a followed outbound link on ~281 URLs where the site never had one, 7 uncovered
footnote anchors, 7 dead tokens. Review 2 (the re-review, which exists because a fix pass
can introduce a blocker) found the fix had reasoned about the wrong consumer set: the kit
chrome is imported by exactly TWO sites, generalist and Solicitors, and Property is NOT one
of them, so generalist still carried both defects, and a third of the same class
(`data-cta-placement` hardcoded `mobile_menu` against a pre-port `header_mobile`) had been
missed entirely because the drawer renders only when open and no SSR crawl sees it.

**Kit changes, all additive, all defaulting to Property's exact current behaviour:**
`ctaContactGoal`, `ctaMobilePlacement` on `SiteHeader`; `showBuilderCredit` on `SiteFooter`.
Property proven unaffected by ARCHITECTURE, not by the defaults: it imports none of the kit
chrome and keeps its own local copies.

**Found while verifying, not by either reviewer:** `check_dependency_closure.py` went red
because the new wordmark imports `lucide-react` and this site never declared it. That is the
SECOND dependency in this phase resolving only through root hoisting, after `tw-animate-css`;
both would have built here and failed on a clean install. The builder brief did not ask for
the closure check, which was a manager omission, and it is now in every builder brief.

**Deliberate calls recorded:**
- `font-serif` is mapped to the sans stack as a documented transitional no-op. Dropping
  Cormorant left 193 classes across 39 files that later phases own; without the mapping they
  fall back to Times for the duration of the port. The mapping line goes when the count
  reaches zero.
- The anchor offset was widened beyond the reported gap to cover article headings and
  footnote list items, because the pre-port browser check found ALL 428 anchor targets across
  80 routes computing `scroll-margin-top: 0`, so every in-page jump on the site hid its own
  heading under the sticky header.
- StickyCTA deliberately re-mounted on every route. The kit shell mounts none, so ~281 URLs
  would otherwise have silently lost a capture surface. Cadence unchanged.
- `data-cta` ids passed through unrenamed; the mixed hyphen/underscore convention is
  pre-existing and live.

**Process note.** THREE separate wrong-port incidents happened while verifying, each time
because another session's server already held the port and `next start` failed to bind while
the instrument happily measured a different site (generalist once, Medical twice). Two were
caught by asserting the served `<title>` before trusting a sweep. The durable fix, now
adopted: read the actual bound port out of the server log rather than assuming the requested
one. Three sessions share this working tree.

**OPEN OWNER QUESTIONS carried to the phase 2 bundle:**
1. The designer credit is now off for Solicitors and generalist. Should it appear on sibling
   sites the studio did not design at all?
2. The header shows two reds side by side: the wordmark icon and rule at rose-600 `#ec003f`
   (the kit hardcodes `text-primary-600`) against the brand crimson `#c41e3a` on the button.
   Both cleared contrast; the delta asked for the icon to be the brand. Match them?

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **41 commits** were on
the branch and not in `origin/main`.

**All 41 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'Solicitors/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'Solicitors/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## 2026-07-19 — Corepage B1 (DEPLOYED; heading corrected 2026-08-25)
- Corepage rewrite of `/services` committed (b8ae2269): /services owns the head query family; /contact + /blog link-ups; /contact→/services query migration owner-APPROVED.
- **CORRECTION 2026-08-25: this is LIVE, not "awaiting deploy word".** `b8ae2269` is an ancestor of the production SHA `435cc12e` (`git merge-base --is-ancestor b8ae2269 435cc12e` = 0) and it is also already in `origin/main`. It went live with the estate deploy of 2026-08-24 20:25 UTC. Date any before/after read from 2026-08-24, not 2026-07-19.
- CRO detector headline: 977 engaged sessions → 15 calculator uses → 1 lead (worst funnel in estate).
- Log: `docs/_engines/logs/SESSION_2026-07-19_GROWTH_DAY1.md`.

## Site facts
- Brand: Accounts for Lawyers · domain `www.accountsforlawyers.co.uk`
- Vercel: project `prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9` (org `team_XF9WAygZX7SGk9Fo4tOAnihH`), `projectName: solicitors`, project.json at `Solicitors/.vercel/project.json`, rootDirectory `Solicitors/web`
- GA4: `G-N6ZPRB3DSQ`
- GSC property: `sc-domain:accountsforlawyers.co.uk` (canonical; see Onboarding below)
- Audience: UK solicitors, law firm partners, sole practitioners, practice managers/COFAs, multi-partner firms
- Existing corpus: 149 blog posts, 6 solicitor-guides, dynamic `/blog/[category]/[slug]` route with 7 curated category landing pages (`sra-compliance-trust-accounting`, `sole-practitioner-tax`, `partnership-llp-accounting`, `vat-compliance`, `practice-finance-cash-flow`, `practice-succession-sale`, `structure-incorporation`)
- Page schema: frontmatter (title/slug/canonical/date/author/category/metaTitle/metaDescription/altText/image/h1/summary/schema/faqs[]) + raw-HTML body. Internal links `/blog/<category-slug>/<slug>`, `/solicitor-guides/<slug>`, `/services/<slug>`, `/calculators/<slug>`.

## Onboarding status (engine-readiness) — 2026-06-03

**Done**
- GSC: the OAuth account owns `sc-domain:accountsforlawyers.co.uk` (verified by listing accessible properties). The dead `sc-domain:solicitoraccountants.co.uk` was the stale entry in the hardcoded code map and is NOT owned. The Supabase `public.sites` row was ALREADY correct (`gsc_property_url='sc-domain:accountsforlawyers.co.uk'`); only `gsc_page_client._SITE_URL_MAP['solicitors']` was stale and is now fixed. Re-ingested 90d: 218 rows / 39 queries / 527 impressions / 1 click (window 2026-04-02..2026-06-01).
- `sites/solicitors.json` wave-runner config present + validated (Get-SiteConfig loads; all paths resolve; buildDir + Vercel project.json exist). Includes projectId/orgId.
- `docs/solicitors/house_positions.md` authored as the seed-of-truth (sub-agent, every statute/rate verified at primary source; wave-relevant sections locked at the HP-lock gate; non-wave sections carry VERIFY flags where unconfirmed).
- Discovery: `sites/solicitors.discovery.json` created (legal topic tokens + 21 topic buckets + news/evergreen patterns). Competitor universe SERP-derived from the head queries then conductor-curated to genuine UK legal-accountancy/compliance specialists (the raw SERP list mixed in the regulator, legal-practice software, a US CPA and a law firm). `topic_gap_finder` + `topic_gap_filter` produced `docs/solicitors/topic_gaps_first_cut.md`: 1,069 filtered gap topics across 20 buckets.

**Deferred / not on the net-new critical path**
- Bing: not ingested for solicitors. Needed for the rewrite ROI worklist later, not for net-new (which feeds off competitor crawls). Set up before running the rewrite engine here.
- Several competitor sitemaps failed to fetch in the first crawl (pkf-francisclark, hawsons, rpartners, jonathonbray, ilfm) — re-attempt on the next discovery refresh; the pool is already deep without them.
- `SITE_RULES[solicitors]` (competitor/brief_for_opus.py) + `CORE_PAGES[solicitors]` (corepage/config.py): add when first running the rewrite / core-page engines for solicitors.
- Formal `/run-netnew-wave <site> <wave>` conductor command: driving Wave 1 manually as conductor for now.
- OUT-OF-SCOPE note (not actioned): `_SITE_URL_MAP['medical']` maps to `sc-domain:medicalaccountants.co.uk` but the owned property is `sc-domain:medicalaccounts.co.uk` (same dead-map bug class as solicitors had). Flagged for the medical onboarding, not touched here.

## Signal read (why net-new first)
Solicitors is indexed and earning impressions for its head family ("accounting for solicitors" 258 impr / pos ~69, "accountant for lawyers" 63 impr / pos 15.5, "accountants for lawyers" 58 impr / pos 23.5, "accounting services for law firms" 38 impr / pos 67) but earns ~1 click across 527 impressions in 60 days of live data, ranking mostly page 2-7. Own-site organic is too thin for the rewrite/core-page engines to bite yet; net-new (gap pool derived from competitor crawls + cannibal-checked against the 149 indexed posts) is the right lead engine to build topical depth. The captured head-keyword family also seeds the core-page engine later. This mirrors the Dentists profile when net-new was chosen there.

## Net-new program heartbeat
- Wave 1 (proving wave): 9 pages WRITTEN + VERIFIED 2026-06-03, awaiting user deploy approval. Build GREEN (npm run build exit 0, all 9 prerender as static HTML). Six-check floor passed (0 em-dashes, 0 class=, 10-14 FAQs each, metaTitle <=57, metaDescription <=158, bodies 2,835-3,288 words). Internal-link floor: 0 broken links from the 9 new pages in production (verified vs the `.next` prerender). Clusters: A incorporation/ABS & corporate structures post-FA-2026 (3), B VAT beyond the basics: partial exemption / tax point / option-to-tax + CGS (3), C partner promotion, capital accounts & tax reserving (3). HP extended/locked at the gates: §2.B mixed-membership (ITTOIA s.850C-E), §6.C partial exemption + interest-as-exempt, §6.D time of supply, §6.E option to tax + CGS, §9 related-party goodwill tightening, §4 transition-spreading VERIFY RESOLVED. Detail in `wave1_page_tracker.md`. Not committed/deployed.
- Wave 2 (first FULL wave): 24 pages WRITTEN + VERIFIED 2026-06-03, awaiting user deploy approval. Build GREEN (exit 0, all 24 prerender; corpus now 183 posts). Six-check floor passed (0 em-dashes, 0 class=, 14 FAQs each, metaTitle <=60, metaDescription <=158, bodies ~2,685-3,074 words). Internal-link floor: 0 broken links from the 24 new pages (verified vs `.next`). Frontmatter HARD gate: all valid. Cannib GREEN (24 net-new, curated from a 30-pick proposal, 6 likely-twins dropped). 6 clusters: A probate/private-client (5), B legal aid & costs (5), C conveyancing edges (4), D TPMA/mixed-money/SRA mechanics (4), E tax-bill funding/levies/PII finance (4), F demerger + service-company structure (2). 16 new HP sub-sections locked at the gates (every anchor brief-verified at source; conductor re-verified the most novel: residual £500, TPMA Rule 11, DBA caps incl-VAT, corporate SDLT 17%, apprenticeship levy 0.5/£15k/£3m): §5.A-G, §4.A, §6.F-J, §7.A-B, §3.A. Detail in `wave2_page_tracker.md`. Not committed/deployed.
- Pages live (net-new): **33 LIVE** (9 Wave 1 + 24 Wave 2), DEPLOYED to production 2026-06-03. Committed `c6b058b8` (waves + onboarding + de-stale + link-audit fix) + `d3a960ff` (IndexNow key). `vercel deploy --prod` GREEN via deploy-and-index.ps1 (gate PASS 0 HARD after the auditor `&`-slugify fix); production https://www.accountsforlawyers.co.uk (build solicitors-95g9ezjdg). All 33 verified live (HTTP 200, one per category) + sitemap live. IndexNow: solicitors key provisioned (b5e67f1...) + key file hosted at the domain root (verified live); 33 URLs submitted (HTTP 202). Pool remaining ~1,036 of 1,069.
- Pipeline PROVEN end-to-end for solicitors: GSC fix -> discovery (10,458 raw URLs -> 1,069 filtered pool, 20 buckets) -> picks + cannib GREEN (with 2 reasoning-driven replacements for semantic twins the token-Jaccard missed) -> 3-cluster briefs -> conductor HP-lock gates (every anchor verified at primary source) -> 9 pages -> six-check + .next link floor + green build. Ready to scale to full ~30-page waves after deploy.
- ENGINE BUG surfaced (HIGH, for the human): `scripts/track2_link_audit.py` `slugify_category` does `&`->`and` but the route (`Solicitors/web/src/lib/blog.ts`) does `&`->`""`, so `predeploy_gate` mis-reports link 404s for any "&" category (it false-passed broken `-and-` links and false-flags correct route-form ones). Affects solicitors + dentists ("VAT & compliance"). Recommended fix: auditor `&`->`""`. Until then verify links against `.next`, not the gate's count. The existing corpus carries a MIX of both link forms (legacy `-and-` nested links are broken in production) -> rewrite/link-sweep track.

---

## Rewrite program heartbeat (Track-2 legacy-page de-stale, rewrite session, 2026-06-03)

Separate session from net-new above. Owns EXISTING-page de-stale; net-new owns new pages. Working in the main tree, nothing committed/branched/deployed (human is the single committer).

**Data refresh (fresh 2026-06-03).** GSC re-ingested (218 rows / 13 pages / 39 queries). **Bing NOW ingested** (correcting the "Bing: not ingested" deferred note above): `bing_query_client solicitors` collected 412 (page,query) rows -> **203 unique / 10 pages / 196 queries** (452 impr, 23 clicks). Bing is the live demand signal (Google is thin, deep-ranked). Bing upsert needed a local workaround (`.cache/solicitors_onboard/bing_load.py`): the shared `bing_query_client._upsert` 400s because it uses 500-row chunks AND does not dedupe the (site_key,page_url,query,date) conflict key, so intra-statement dup keys break ON CONFLICT DO UPDATE. The `gsc_page_client._SITE_URL_MAP['solicitors']` stale-map noted above is now fixed (confirmed `sc-domain:accountsforlawyers.co.uk`).

**house_positions HP-lock eyeball + CORRECTION.** Before any rewrite ran, every volatile rate/threshold anchor in `house_positions.md` was re-verified at primary source. One ground-truth CORRECTION: **§7 SDLT** carried the temporary £250,000 nil-rate band + £425,000/£625,000 FTB thresholds that ENDED 31 Mar 2025; corrected to the figures in force from 1 Apr 2025 (nil-rate **£125,000**, FTB **£300,000** to £500,000). **§9 standard CGT** VERIFY resolved + locked (18%/24% all assets from 30 Oct 2024, AEA £3,000). EXISTING_PAGE_STALE note for the SDLT calc page also corrected. See the doc's "Rewrite-session HP-lock eyeball" verification-log block.

**Rewrite program steps:** STEP 0 onboard + STEP 1 HP-lock + STEP 2 worklist/hit-list = DONE (`docs/solicitors/rewrite_worklist_and_hitlist.md`). STEP 3 batched in-place rewrites = IN PROGRESS.

**Batch 1 (SRA accounts cluster, 12 pages) = DONE, gate-clean, NOT committed (2026-06-03).** Pages: sra-accounts-rules-explained-for-uk-solicitors, what-counts-as-client-money-uk-solicitors, sra-client-account-reconciliation-frequency, handling-client-money-interest-sra-rules, sra-accountants-report-exemption-thresholds, cofa-responsibilities-uk-law-firms, when-is-an-sra-accountants-report-required, how-to-prepare-for-sra-accountants-report, sra-accountants-report, common-sra-accounts-rules-breaches-and-how-to-fix, colp-and-cofa-roles-explained-uk-law-firms, llp-accounts-and-filing-requirements-uk. Headline fix: the SRA Rule 12.2 report-exemption test corrected from the wrong "£10,000 max / average £250" to the verified "average £10,000 / maximum £250,000" (or LAA-only), incl. rebuilt worked examples (the old £274-average example now correctly QUALIFIES). Gate verdicts: 0 residual wrong-£250 (audited), 0 em-dashes + 0 pricing in the 12, link categories canonicalised (corpus-correct slug_resolver), 1 fabricated link (llp-sa800) repointed; `npm run build` EXIT 0 (206/206 static pages).

**Deterministic-floor tooling notes for this site (important for later batches + deploy):**
- `slug_resolver.py` CLI hardcodes Property paths (`_DEFAULT_BLOG`/`_DEFAULT_MW`); run it corpus-correctly via `.cache/solicitors_onboard/resolve_links.py [apply] <files>` (calls the engine's `fix_files(blog_dir=Solicitors/web/content/blog, middleware_path=Solicitors/web/src/middleware.ts)`), NOT the bare CLI.
- `track2_link_audit` / `predeploy_gate` FALSE-POSITIVE on links to the 7 curated `/blog/<category>` landing pages (e.g. `/blog/practice-finance-cash-flow`): the audit only models `.md` flat-slugs, not the curated `/blog/<category>/page.tsx` routes (which exist + serve). ~49 such PRE-EXISTING corpus links make `predeploy_gate --site solicitors` report FAIL even though they resolve live. Real broken links from a batch show as `NO-FILE`. Before the eventual deploy, either teach the audit about the curated category pages or repoint those links; do NOT treat the category-link FAIL as a batch blocker.

**Batch 2 (conveyancing taxes + VAT, 9 pages) = DONE, gate-clean, NOT committed (2026-06-03).** Pages: sdlt-calculation-uk-conveyancing-solicitors, ltt-vs-sdlt-comparison-welsh-conveyancing, lbtt-rates-scottish-conveyancing-firms, disbursements-vat-treatment-uk-law-firms, conveyancing-vat-rules-uk-2025-26, vat-on-legal-services, counsel-fees-vat-guide-uk-law-firms, making-tax-digital-solicitors, solicitor-self-assessment-uk-tax-guide. Headline fixes: SDLT nil-band £250k->£125k + FTB £425k->£300k (from 1 Apr 2025, worked examples rebuilt); SDLT additional-dwelling surcharge stated 5% (not 3%); LTT + LBTT corrected from "slab" to progressive/marginal; LBTT ADS 6%->8% (5 Dec 2024); Welsh higher-rate tables open 5% (11 Dec 2024); VAT threshold £85k->£90k; disbursements rebuilt on the eight conditions + Brabners + R&C Brief 6 (2020) search-fee carve-out; counsel's fees = supply-to-firm by default; MTD for VAT = all VAT-registered (no £85k trigger), ITSA £50k/£30k/£20k. Verdicts: stale-token audit clean (all residual slab/3%/6%/£85k mentions are corrective/historical), 0 em-dashes/pricing in the 9, links canonicalised, 0 NO-FILE genuine broken links introduced, `npm run build` EXIT 0 (206/206).

**Batch 3 (sale / CGT / BADR, 7 pages) = DONE, gate-clean, NOT committed (2026-06-03).** Pages: law-firm-goodwill-valuation, goodwill-tax-treatment-law-firm-sale, solicitor-practice-sale-guide, law-firm-profit-extraction, asset-sale-vs-share-sale-uk-law-firm, wip-treatment-on-law-firm-sale, how-llp-members-are-taxed-uk-2025-26. Headline fixes: BADR 10%->14%/18% by date band; standard CGT 10%/20%->18%/24% (30 Oct 2024) + AEA £3,000; goodwill = capital, WIP/debtors = income (ss.182-185) (the WIP page had a MATERIAL error treating WIP as a capital/CGT receipt, corrected); buyer goodwill relief 6.5% post-1-Apr-2019 + IP/related-party conditions; s.162; dividend forward-rate added on profit-extraction. Verdicts: 0 residual 10%/20% rate staleness, hourly-rate pricing removed from wip page, resolver 7/7 with 0 invented links, 0 NO-FILE from my batch, `npm run build` EXIT 0 (208/208). NOTE: 2 NO-FILE links the audit shows belong to the CONCURRENT NET-NEW session's new VAT pages (option-to-tax..., vat-tax-point...), not mine. Corpus grew 150->154 (net-new added 4 pages live), no collision.

**Batch 4 (structure / NIC / dividend, 11 pages) = DONE, gate-clean, NOT committed (2026-06-03).** Pages: law-firm-partnership-tax-guide, llp-member-taxation-guide-uk-law-firms, llp-vs-partnership-tax, sole-practitioner-solicitor-tax-guide, law-firm-drawings-vs-profit, solicitor-expenses-claims-tax-relief-guide, can-a-non-lawyer-buy-a-uk-law-firm-abs-explained, consultant-solicitor-structures-uk, merging-two-uk-law-firms-tax-and-sra, llp-employer-ni-2026, partner-profit-allocation-uk-law-firms. Headline fixes: Class 2 NIC "£3.45/week payable" -> removed-from-6-Apr-2024 framing across all the partnership/LLP/sole-practitioner pages; dividend 8.75/33.75 given the 6-Apr-2026 FA-2026 forward rate (10.75/35.75) on the ABS/consultant/merger pages; the speculative "LLP employer NI from 2026" debunked + reframed to the salaried-member rules (llp-employer-ni-2026 + partner-profit-allocation + expenses-guide + llp-vs-partnership-tax). Verdicts: residual £3.45/employer-NI-2026 mentions are all corrective/debunk, 0 em-dashes in the 11, 1 invented link (regulatory-compliance/sra-accounts-rules-client-money-guide) repointed; whole-corpus NO-FILE genuine broken links = 0; `npm run build` EXIT 0 (209/209). 5 of the 11 hit transient API 500s on first dispatch and were re-run successfully.

**Batch 5 (PII / basis-period / agency-pricing / top-demand lift, 6 pages) = DONE, gate-clean, NOT committed (2026-06-03).** Pages: professional-indemnity-insurance-tax-treatment-uk, basis-period-reform-law-firms, solicitor-accountant-fees, solicitor-accountant-cost, sra-accounts-rules-compliance-guide, solicitor-trust-accounting-guide. Headline fixes: PII MTC un-reversed (£3m LLPs/companies/ABSs, £2m sole-practitioners/partnerships, 6yr run-off) + cash-basis £150k line corrected; basis-period meta fixed to tax-year basis from 2024/25 (was "2026/27"); ALL agency fee/hourly-rate pricing removed from solicitor-accountant-fees + solicitor-accountant-cost (reframed to cost-drivers + request-a-quote); top-demand sra-accounts-rules-compliance-guide + solicitor-trust-accounting-guide lifted to ranking-grade + current §5. (solicitor-accountant-cost had been deleted in a prior consolidation commit; restored at canonical path with original frontmatter from git history.) Verdicts: PII order correct, 0 pound figures in fees/cost pages, 0 em-dashes in the 6, 0 NO-FILE corpus-wide, `npm run build` EXIT 0 (210/210).

## BLOG TEMPLATE UPGRADE (2026-06-03, after the rewrite) — NONE committed
Ported the richer generalist/digital-agency blog template to solicitors (they share one `BlogPostRenderer`; generalist + agency are the same template, themed differently). Phase A (GLOBAL, one component, upgrades ALL ~159 blog pages at once): `src/types/blog.ts` + `src/lib/blog.ts` extended with `keyTakeaways[]`, `updatedDate`, `imageCredit` (parse-through, gray-matter); new dependency-free `src/components/blog/AuthorByline.tsx` (editorial-team monogram + dates linking /about; NO /team route, NO fabricated ICAEW reviewer per the no-invented-reviewer rule); `src/components/blog/BlogPostRenderer.tsx` rewritten to the rich version (crimson-themed hero with gradient fallback, breadcrumb variant=light, AuthorByline, Key Takeaways block falling back to the TL;DR summary, updatedDate + imageCredit, related, sticky TOC). Newsletter `InlinePrompt` OMITTED (no newsletter backend). Build EXIT 0; verified in `.next`: hero/byline/TL;DR/related on all 159. Phase B (corpus-wide content): added `keyTakeaways` (3-5 page-specific bullets, correct figures, 0 em-dashes, 0 agency pricing) to my 150 existing pages via 12 batched Opus sub-agents; frontmatter valid on all 159, build EXIT 0 (213/213), "Key takeaways" renders on 150 pages (9 show TL;DR fallback).
- **9 net-new pages NOT given keyTakeaways (deferred to the net-new agent):** converting-law-firm-to-limited-company-abs-tax, corporate-member-llp-law-firm-mixed-membership-rules, fixed-share-to-equity-partner-promotion-tax-law-firm, law-firm-partial-exemption-vat-client-account-interest, law-firm-partner-capital-accounts-tax-treatment, law-firm-partner-tax-reserving-payments-on-account, option-to-tax-law-firm-premises-capital-goods-scheme, should-a-law-firm-incorporate-2026-dividend-rise, vat-tax-point-time-of-supply-law-firm-billing. They render fine (TL;DR fallback). When the net-new agent is restarted "to use the updated blog": the layout is automatic; to populate Key Takeaways it adds `keyTakeaways: [3-5 bullets]` to each new page's frontmatter (the type already supports it). Optional `updatedDate` / `imageCredit` also available.

## STEP 3 COMPLETE: 45 pages rewritten across Batches 1-5 (2026-06-03), NONE committed/deployed
All substantive staleness-hit-list items (B1-B11 + B12-clear) done: SRA £250 exemption (12), SDLT/LTT/LBTT conveyancing (3), VAT disbursements/Brabners/threshold/MTD (6), BADR/CGT/goodwill/WIP (7), Class 2/dividend/employer-NI (11), PII/basis-period/pricing/top-demand (6). Every batch: build EXIT 0, 0 NO-FILE genuine broken links introduced, em-dashes + agency-pricing removed from rewritten pages.

### Pending (handed to the human, NOT done by design)
- **Em-dash tail:** ~25 of 154 blog files still contain U+2014 (down from 32). These are NON-batch pages (legacy tail + some net-new-session pages). Non-blocking warning; sweep opportunistically or before enabling `predeploy_gate --strict`.
- **Informational-pricing judgment call (13 matches):** pages about SOLICITORS' OWN fees (how-much-do-uk-solicitors-charge-per-hour, how-much-do-uk-conveyancing-solicitors-charge, how-to-set-fee-earner-targets, fee-structure-for-uk-residential-conveyancing-firms, spouse-employment-in-law-firm-tax) quote hourly rates for the CLIENT's business, not the agency's. Decide: keep as informational SEO content, or strip. (The agency's-own-fee pricing was removed.)
- **Pre-deploy link cleanup:** `predeploy_gate --site solicitors` reports HARD FAIL (80) entirely from the auditor not modelling curated `/blog/<category>` landing pages + pre-existing flat `/blog/<slug>` links in non-batch pages. ALL valid live; NO-FILE genuine = 0. Before deploy: run `.cache/solicitors_onboard/resolve_links.py apply` (no args = whole corpus) to canonicalise flat links, and teach the audit about category pages (or repoint hub links). Gate on NO-FILE=0 per batch, not the category-hub count.

**Internal-link slugify bug — DISCOVERED + FIXED for the rewrite set (2026-06-03):** the shared `slug_resolver.py` (and `track2_link_audit.py`) slugify categories with `& -> and`, but the solicitors route `Solicitors/web/src/lib/blog.ts slugifyCategory` uses `& -> ""` (e.g. "VAT & Compliance" -> route `vat-compliance`, resolver `vat-and-compliance`). So the `resolve_links.py` (resolver-backed) runs I did during Batches 1-5 rewrote internal links for the six `&` categories into the BROKEN `-and-` form (404 on the live route). DO NOT use `resolve_links.py` for solicitors. FIXED by re-canonicalising with a route-exact mirror: `.cache/solicitors_onboard/fix_links_routeform.py apply <files>` (no args = whole corpus), which slugifies `& -> ""` exactly like blog.ts. Applied to the 45 rewritten files + 4 non-batch flat-link pages. VERIFIED against the actually-generated routes (not the gate): **0 broken internal /blog links corpus-wide**; `npm run build` EXIT 0 (213/213). The `predeploy_gate`/`track2_link_audit` HARD count remains non-zero ONLY because of the same `&` bug in the auditor (it expects the `-and-` form) plus its not modelling curated `/blog/<category>` pages, so it FALSE-FAILS on the now-correct route-form links. Trust the route-vs-`.next` verification, not the gate, until the auditor's `& -> ""` fix lands (engine bug, see the net-new heartbeat above). Before deploy: re-run `fix_links_routeform.py apply` (no args) once more to catch any links added since.

- SERP META BATCH 1 (2026-06-12): 35 pages re-titled/re-described from fresh 90d GSC + Bing query data, deployed + IndexNow'd; 90-day regression watch in monitored_pages (to 2026-09-10); engine + methodology in docs/_engines/SERP_META_PROGRAM.md; content-gap follow-ups in docs/solicitors/opportunity_register_meta_2026-06-12.md.
- SERP META BATCH 2 (2026-07-08): 19 pages (fresh worklist minus batch-1 cooldown pages), Opus copy + Sonnet adversarial QA + validator apply, DEPLOYED + IndexNow'd same day; monitored to 2026-10-06. Highest-stakes page do-uk-solicitors-charge-vat (517 imp, pos 1) kept its direct-answer title format to protect the ranking. Body flag pending: difference-between-llp-and-partnership-uk-solicitors FAQ says GBP4,000-12,000 but prose says GBP4,000-10,000 twice (meta uses the prose figure); one-line body reconcile needed. Estate readouts: docs/_engines/meta_batch1_verdicts_2026-07.md + OPPORTUNITY_READOUT_2026-07.md. Big untouched opportunity: TSX core pages (/contact 482 imp, /services 447, HP 236, /blog 199 - 90d, 0 clicks) sit outside the md meta engine; needs a core-page metadata pass.

## Wave 3 (gap-discovery batch) - WRITTEN + QA CLEAN 2026-07-09, AWAITING DEPLOY WORD

- Source: gap discovery 2026-07 curated batch (11 pending topics; A1/A7/A10/A11 STRUCK at page-level collision verify as duplicates - sra-consent, abortive-VAT+WIP, debt-management, benchmarking pages already own those intents; rejected in blog_topics, routed to improve/meta track).
- 7 pages written (single lane, batchSize 1, parallel worktree writers): finance-training-fee-earners-law-firm-uk, law-firm-financial-distress-restructuring-uk, forensic-accounting-litigation-law-firms-uk, what-does-a-legal-cashier-do-sra-requirements, outsourced-legal-cashiering-guide-uk-law-firms, business-valuation-for-family-lawyers-uk, accountant-for-barristers-chambers-uk.
- HP locks (Stage 1b, commit 8af14f71): SS6.K expert-fee VAT (party-appointed vs SJE), SS9.A matrimonial CGT s.58 FA 2023 window, SS11 distress/insolvency/intervention (s.214A verbatim-verified), SS12 barristers (cash-basis default FA 2024, reg 92); SS12 chambers-VAT un-hedged at 2b (Notice 700/44 three methods verified).
- QA: 4 independent agents + tone/GEO review. Real catches fixed manager-direct: A4 promotional section claimed forensic-expert capability (replaced - faceless rule), A2 planning-note FAQ leaked to frontmatter, A8 Conclusion h2 + CGT timing ambiguity, A9 Title-Case h2s, A5 comment artefact, 4 over-length metaDescriptions, 24 wrong-category links (writers guessed slugs; auto-fixed from route-aware audit). QA link "blockers" adjudicated FALSE POSITIVE: legacy pages' canonical FIELDS mismatch true slugifyCategory routes - logged estate-wide as F-ESTATE-1 (backlog sweep).
- Verdicts recorded 7/7 all_clear (qa_verdict wave3), pending clear; link floor 0/0; build GREEN x2; monitored_pages registered (net_new, to 2026-10-07); blog_topics flipped to written/used.
- >> NEXT: deploy on explicit owner word: ./scripts/deploy-and-index.ps1 -Site solicitors, then IndexNow the 7 URLs. Sol-1 consolidation stays EXCLUDED (data-gated track); F-ESTATE-1 canonical sweep = separate maintenance batch.

## Blog audit + rewrite program (2026-06-12)

- Provenance: 39 deepseek / 27 claude / 117 rewritten+wave (183 posts total).
- Blind quality audit verdict: weakest cell in the estate. The April-2026 claude launch corpus grades WORSE than the May-2026 deepseek batches; era factors flattened to 1.3/1.3 in rewrite_worklist.py (no weighting advantage for either era on this site).
- Manager-direct back-patches committed (commits 3de1e575 + 733a5ccf): fabricated SRA Rule 8.5 removed; legal aid corrected to standard-rated; Brabners + R&C Brief 6 (2020) added to search-fee guidance; goodwill-as-income inversion fixed (CGT/BADR default); fabricated 5th-working-day reconciliation deadline removed (Rule 8.3 is five-weekly); fake Rule 7 GBP500/8-week interest formula replaced with the fair-sum standard; s.162 misapplication to LLP conversion fixed (TCGA 1992 s.59A transparency); CGT 10%/20% corrected to 18%/24% + BADR bands; abolished lifetime allowance replaced with LSA/LSDBA; stale current-year-basis framing fixed on 2 pages; accountant-fee pricing stripped from 7 pages. 6 of 22 audited pages were clean.
- NOT yet deployed (deploy gate pending, awaiting user sign-off).
- Rewrite worklist: `docs/solicitors/rewrite_worklist_2026-06-12.md`. Tier A+B = 2 pages (both Bing-dominant, both in SERP meta cooldown until 2026-06-26). Tier C = 38 deferred.
- generator: frontmatter field now stamped on all posts and written by all pipelines going forward (see docs/_engines/ENGINE_MAP_AND_ONBOARDING.md section 5).
- Methodology: docs/deepseek_quality_audit_2026-06-12.md + docs/provenance_summary_2026-06-12.md + docs/_engines/rewrite_gold_patterns.md.
