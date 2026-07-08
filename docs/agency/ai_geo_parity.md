# Agency AI/GEO Parity Audit

**Date:** 2026-07-08
**Site:** www.agencyfounderfinance.co.uk (`digital-agency/web/`)
**Method:** Read-only source audit + spec comparison. No live fetches (llms-full.txt is dynamic route, not static file).
**Spec reference:** `docs/_engines/AI_SEARCH_GEO_PROGRAM.md`
**Sibling reference:** medical (COMPLETENESS_AUDIT_2026-07-06.md, AI/GEO section)

---

## Capability table

| Capability | Spec requirement | Agency | Medical | Generalist | Notes |
|---|---|---|---|---|---|
| **llms.txt** | Rich, correct domain, key facts | HAS | HAS | PARTIAL (wrong domain in source — `ukbusinessaccountants.co.uk`; spec item C.8) | Agency: 126 URLs/sections, 2025/26 figures in header (stale — 3 occurrences of "2025/26") |
| **llms-full.txt** | Dynamic full content dump | HAS (dynamic route via `buildLlmsFullRoute`) | HAS | HAS | Agency header still says "2025/26 UK rates" — factual staleness signal to AI verifiers |
| **robots.txt AI allowlist** | 40+ named crawlers | HAS (~42 named crawlers, matches generalist) | HAS (~50 named crawlers) | HAS (~42) | Agency is at parity with generalist; medical is marginally richer (separate training/retrieval blocks mentioned in spec as ideal) |
| **FAQPage JSON-LD on blog posts** | All posts | HAS (all 306 posts have `faqs:` frontmatter, avg ~4 Q&A each; est. ~1,200+ Q&A pairs total) | HAS (78 posts, 556 Q&A, ~7/post) | UNKNOWN (not audited) | Agency FAQPage coverage is estate-best in raw count; Q&A density slightly lower than medical |
| **FAQPage on core/for-* pages** | Key landing pages | HAS (39+ pages: agencies/*, for-*, relocation pages, comparisons all call `buildFaqPage`) | HAS (4 /for-* pages + calculators) | UNKNOWN | Agency breadth is very strong |
| **Dataset JSON-LD (research asset)** | At least one flagship data page | PARTIAL (`/uk-tax-rates` has `buildDataset` with DataDownload; NO `/research` route, no original proprietary data) | MISSING (0 /research, 0 Dataset) | MISSING | Property has the full landlord-tax-index with Companies House + Land Registry original data. Agency's `/uk-tax-rates` is a compiled reference, not original data — AI citation value is low vs a true research dataset |
| **WebSite + SearchAction** | Root entity | UNKNOWN — not found in quick source scan | MISSING (medical audit confirmed) | UNKNOWN | Needs verification on homepage JSON-LD graph |
| **Organization sameAs** | Companies House + LinkedIn | HAS (Companies House URL in `buildOrganization()`; LinkedIn not listed — comment says "no LinkedIn company page exists for this brand") | MISSING (medical audit gap item) | UNKNOWN | Strong — already done |
| **Speakable** | Shared component | MISSING (no speakable builder found in agency schema lib) | MISSING | MISSING | Estate-wide gap |
| **DefinedTerm / glossary schema** | Glossary pages | HAS (`digital-agency/web/src/app/glossary/[slug]/page.tsx` uses `DefinedTerm`, 3 occurrences confirmed) | MISSING | UNKNOWN | Agency ahead of medical here |
| **HowTo schema** | Procedural posts | PARTIAL (`src/lib/schema/howto.ts` exists; but `buildHowTo` is NOT called from any `src/app` page — 0 matches in app/) | MISSING | UNKNOWN | Builder exists, not wired up |
| **BLUF answer-box (directAnswer frontmatter)** | Every post | MISSING (`keyTakeaways` field typed in `blog.ts`, 0 posts populate it; no `directAnswer` field; no answer-box renderer found) | MISSING (0/78 posts) | MISSING | Estate-wide gap; renderer not built for agency |
| **keyTakeaways populated** | Every post | MISSING (0/306 posts) | MISSING (0/78 posts) | UNKNOWN | |
| **AI referrer analytics (vw_probable_ai_direct)** | Estate-wide | HAS (migration `20260617000003_vw_probable_ai_direct.sql` is estate-wide Supabase view — applies to agency session data automatically) | HAS | HAS | Estate-wide — all sites included |
| **IndexNow pipeline** | Auto-on-deploy | HAS (`digital-agency/pipeline/submit_indexnow.py`) | UNKNOWN | UNKNOWN | Agency has the script; auto-fire on deploy unclear |
| **Factual currency in llms.txt** | 2026/27 figures | PARTIAL (llms.txt header says "2025/26" in 3 places; body has correct FA 2026 rates inline) | PARTIAL (45/78 posts carry 2025/26 date-bands) | MISSING (wrong domain is the bigger issue) | |
| **Data-PR / research flagship asset** | Original cited data per site | MISSING | MISSING | MISSING | Property-only; spec C.4/D.4; all sites below par |
| **dateModified in schema** | Freshness signal | PARTIAL (blog-posting builder exists; need to check if frontmatter dateModified is parsed vs defaulting to datePublished) | MISSING (confirmed bug: dateModified = datePublished on all 78 posts) | UNKNOWN | Risk: same lib/blog.ts bug may exist in agency |
| **SSG rendering (AI gets full HTML)** | All pages SSG | HAS (`dynamicParams=false` pattern used; calculators and blog are static) | HAS | HAS | |

---

## Gap list ranked by impact

### P1 — Highest AI-citation leverage

1. **BLUF answer-box / directAnswer (MISSING, estate-wide)**
   Spec ranks this #3 (move C.3). 44% of ChatGPT citations come from the first 30% of a page; no other lever improves extraction across all engines simultaneously. Agency has 306 posts and 0 answer boxes. Spec estimates medium effort (shared renderer + backfill). **Safe to ship now** — purely additive, no redirect risk, no Google signal dependency.

2. **llms.txt + llms-full.txt year-label staleness (PARTIAL)**
   Header says "2025/26" in 3 places. Spec item C.8 calls these "active factual errors in live AI-consumed surfaces — cheapest fix, outsized downside if left." A single string replace in `public/llms.txt` and the header string in `src/app/llms-full.txt/route.ts`. **Safe to ship now.**

3. **HowTo schema — builder exists, not wired up (PARTIAL)**
   `src/lib/schema/howto.ts` is built but never imported in any `src/app/` page. Procedural posts (setup guides, IR35 checklists, Dubai relocation how-tos) are natural HowTo candidates. Wiring this for 10-20 posts is low-effort. **Safe to ship now.**

4. **dateModified freshness signal (PARTIAL → likely MISSING)**
   Medical audit confirmed `lib/blog.ts` never parses `dateModified` frontmatter, so all posts signal as never-updated. Agency uses the same shared blog infrastructure — high probability of the same bug. Check `digital-agency/web/src/lib/blog.ts` and compare `dateModified` handling. Fix is 1 line (parse + pass to schema). **Safe to ship now.**

5. **WebSite + SearchAction root entity (UNKNOWN → likely MISSING)**
   Homepage JSON-LD graph not confirmed in this audit. Medical audit found it absent. Spec item D.6 says shared root-layout Organization + WebSite + sameAs builders "exist but are not imported." Agency's `buildOrganization()` is solid with sameAs; unclear if `WebSite` + `SearchAction` is emitted. Cheap to add. **Safe to ship now.**

### P2 — Medium impact, ship-alone-safe

6. **Speakable (MISSING, estate-wide)** — no builder exists anywhere in the estate; would need to build. Lower priority than above.
7. **keyTakeaways backfill (MISSING)** — renderer may need building first; content-lane work for 306 posts is significant.
8. **robots.txt training/retrieval split** — agency has 42 named bots (parity with generalist, slightly below medical's ~50). Adding the remaining crawlers and splitting into training/retrieval blocks per spec D.6. Low effort.

### P3 — Gated (wait for ~2026-07-22 Google signal window or owner sign-off)

9. **Data-PR / research flagship (MISSING)** — spec's #1 AI-citation moat. Agency's `/uk-tax-rates` with Dataset JSON-LD is a starting point, but original-data research (Agency Finance Benchmark report with real billing/margin data) is the real lever. Requires owner data source sign-off + heavy build. **Not ship-alone-safe — owner gate.**
10. **IndexNow auto-on-write** — spec item C.6/D.5: wire `enqueue()` into writers so meta-only edits auto-notify Bing. Infrastructure work across the shared engine. Not agency-specific.

---

## Ship-alone-safe vs gated summary

| Gap | Safe to ship now? |
|---|---|
| llms.txt/llms-full.txt year-label fix | YES — 2 string replacements |
| BLUF answer-box renderer + frontmatter field | YES — additive, no routing |
| HowTo schema wiring on procedural posts | YES — import + deploy |
| dateModified parse fix in lib/blog.ts | YES — 1-line fix, verify first |
| WebSite + SearchAction on homepage | YES — additive JSON-LD |
| Speakable builder | YES (no Google signal risk) |
| Data-PR flagship (Agency Finance Benchmark) | NO — owner sign-off needed |
| IndexNow-on-write shared engine | NO — cross-site infra change |

---

## Verdict

**Agency is ABOVE medical, AT parity with generalist, and BELOW the full Property standard.**

Agency's strongest differentiators vs siblings: 306 posts all with FAQPage (estate-best raw Q&A count), DefinedTerm on glossary, sameAs already wired, Dataset builder used on `/uk-tax-rates`, dynamic llms-full.txt route, and 42-bot robots allowlist. These represent genuine best-practice execution on the extraction-surface fundamentals.

The estate-wide gaps apply equally to agency: zero BLUF answer boxes (the single biggest extraction lever), zero data-PR flagship, zero Speakable, zero HowTo wired up despite the builder existing. The year-label staleness in llms.txt is the cheapest and most urgent fix — it actively undermines the freshness signal medical also has.

The Google signal window (~2026-07-22) is irrelevant for the P1 gaps: all five are Bing/AI engine facing, purely additive, and carry zero redirect or canonicalisation risk.
