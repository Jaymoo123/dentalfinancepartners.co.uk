# Medical site completeness audit, 2026-07-06

Site: https://www.medicalaccounts.co.uk
Deploy audited: dpl_HHomcnfjnDbC9bRB9A3878r7HdST (commit 6d0c1930, sitemap 117 URLs, 78 posts)
Method: 6 adversarial lanes (live error sweep, UX journey walk, estate-parity vs the 71-capability standard, AI/GEO vs the AI_SEARCH_GEO program spec, Google-readiness, consolidated crawl) plus independent Opus spot-checks of the load-bearing defects against source. Read-only. Raw artifacts in .cache/medical_diag/audit_*.json.

Overall verdict: MINOR-GAPS. The site is live, structurally sound, and the mandatory conversion path works end to end. It is not error-free: there are two genuinely visible defects (garbled currency symbols on all three calculators, and a doubled brand suffix plus three duplicate page titles), one silently disabled conversion prompt across all 78 blog posts, and a set of cheap AI and hygiene gaps. None of these is a hard outage. The one thing that actually gates growth (Google seeing the site at all) is not a code problem and cannot be fixed on-site.

---

## The four owner questions, answered

### 1. Is the site error-free? No. Close on hard errors, not clean on quality.

Clean where it counts: all 117 sitemap URLs return HTTP 200, every page has exactly one H1, a self-referencing canonical, a title and a meta description, and valid parseable JSON-LD. No broken internal links in the sampled set. The XML sitemap and feed are valid. There are no phantom-domain references left in any live file (llms.txt, llms-full.txt, feed, canonicals all clean). Redirects resolve. So there is no crash, no dead route, no broken link surface.

Confirmed real defects, in severity order:

- HIGH. Calculator text is corrupted on all 3 live calculators. 24 double-encoded UTF-8 strings render as mojibake: users see "Â£60,000" instead of "£60,000", "Â·" instead of the middle dot, and "â€"" instead of a dash, in the intro text and the live result panel. Confirmed by direct DOM inspection and by reading source bytes: nhs-pension-calculator.ts line 17 ("Â£60,000"), line 80 ("Â·"), line 86 ("â€""). Counts: nhs-pension 10 lines, locum-tax 4, incorporation 10.
- HIGH. Three pairs of pages carry identical titles (cannibalisation): /locations/london and /blog/gp-accountant-london, and the same for Birmingham and Bristol. Two indexable pages competing for one query each.
- MEDIUM. 23 pages render a doubled brand suffix: "... | Medical Accountants UK | Medical Accountants UK". The page-level title already ends in the brand, and the layout title template appends it a second time.
- MEDIUM. The deep-scroll lead modal and the in-body NextStepOffer never fire on any of the 78 blog posts (architectural, see question 2).
- MEDIUM. 29 of 117 pages have no og:image, weakening social and some AI rich-result signals (15 core/utility pages, 8 blog category pages, 6 medical-guides pages).
- MEDIUM. The embed gallery still carries a stale wrong brand name, "Medical Finance Partners", in its metadata and iframe title (embed/page.tsx lines 8 and 20). The gallery is noindex, but the wrong name propagates to any partner who copies the embed snippet.
- MEDIUM (Google). The apex domain redirects to www with a 307 Temporary redirect instead of a 301/308 Permanent, which leaks any PageRank from apex backlinks.
- LOW. favicon.ico returns 404 on every single page load. No favicon.ico and no src/app/icon file exists.
- LOW. Three blog category page titles contain an em-dash, which violates the locked no-em-dash rule (gp-tax-and-accounts, gp-practice-management, gp-accountant-services).
- LOW. Nine pages emit two BreadcrumbList JSON-LD blocks (one inside the @graph, one standalone). Redundant, not invalid.
- LOW. The OG image route and the admin panel each carry a config-hygiene bug (see the parity section).

Two things that look like errors but are NOT, recorded so nobody chases them:
- The raw crawl lane flagged "undefined" and "null," appearing 234 times across pages. This is a FALSE POSITIVE. The careful error lane confirmed these strings live only inside Next.js JavaScript bundles (framework and RSC payload), never in visible HTML or data attributes. Not a defect.
- One probe reported "expected 404 got error" on a nonsense URL. This is a probe artifact, not a routing bug. The top-level check confirms hard 404s return 404, and unknown blog slugs 404 correctly because the [slug] route sets dynamicParams to false. Worth one manual recheck, not a confirmed defect.

### 2. Is A to B seamless? Yes for the mandatory path. The assistive nudge layer is broken on the blog.

The core path a real doctor walks is seamless. Homepage, /services, the four /for-* pages, /contact, /free-practice-health-check, the blog index, a blog post, and all three calculators return 200 with real content on both desktop (1366x768) and mobile (390x844). The contact LeadForm has all fields wired: full name, email, phone, a 6-option role select, message, consent checkbox, and a working submit. The health-check wizard renders step 1 with all 5 role options and a progress indicator. Mobile navigation opens and closes cleanly. TTFB is 79 to 157 ms across sampled pages. The honeypot is the improved "enquiry_ref" field (tabIndex -1, parent aria-hidden true), not the old company_url silent-drop trap.

Two seams break the assistive layer, not the mandatory path:
- The deep-scroll modal and the in-body NextStepOffer are dead on all 78 flat blog posts. Root cause: TopicOverrideProvider (which sets the post topic) is mounted inside BlogPostRenderer, which is a descendant of IntentProvider in the React tree. React context flows downward only, so IntentProvider reads the topic override as null on every flat /blog/ route. The engine sees pageTopic null and returns null, so the modal stays closed. This matters because Bing sends 96 engaged reader sessions to exactly these blog posts and 0 of them convert. The SpecialistWidget still appears via an entryTopic fallback, so coverage is partial, not zero.
- Calculators show corrupted currency symbols mid-journey. The maths computes correctly, but a garbled "Â£" on a money tool is a trust ding at the decision moment.

Verdict: the enquiry and health-check paths are seamless and safe. The nudge and calculator surfaces have visible defects that suppress conversion without blocking it.

### 3. Is it missing anything the estate standard has? Minor gaps only.

Against the 71-capability Property standard: 52 present and wired, 7 partial (the partials mirror the Property baseline itself, so they are not Medical-specific regressions), 8 absent by design and correct for a low-traffic non-Property site (lead-intent AI enrichment, A/B experiments, the whole newsletter and nurture stack), and 1 genuinely missing:

- OB-06 real-user Web Vitals. Medical is the ONLY estate site with no WebVitals capture: no @vercel/speed-insights, no web_vital event flowing. Performance regressions are invisible in the site's own data. This is a SHOULD, not a MUST, and it is cheap to add.

Also outside the pure-parity matrix:
- EN-03. Resource email delivery is intentionally off (on-page delivery works). But the api/resources/deliver route does NOT exist. If the email flag is ever flipped before that route is built, the gate will call it and get a 404. The route must be created before enabling.
- WS8 content. The keyTakeaways surface is built and renders gracefully, but 0 of 78 posts populate it. Parked and owner-pre-approved.
- Three config-hygiene bugs: the embed brand name (medium), the OG route hardcoding brand color and name instead of reading config (low), and the admin panel wrongly labelling Personalisation as "Not operated" when it is in fact running (low).

### 4. Is it AI-optimised to the practical maximum? No. The floor is at parity; the 10x levers are not built.

What shipped today genuinely is at AI parity: robots.txt allows about 50 named crawlers (the full gold-standard AI allowlist), llms.txt and llms-full.txt are live, phantom-free, and fresh, FAQPage markup covers all 78 blog posts (556 Q&A, about 7 per post) plus the four /for-* pages and three calculators, the feed uses flat canonical URLs, the sitemap lastmod is pinned (no per-build churn), and the calculator embed carries a backlink. For a young site this is a strong extraction surface.

What remains, ordered by AI-channel impact, with on-site vs not:

- Biggest lever, NOT on-site. There is no data-PR or Dataset flagship: 0 /research route, 0 Dataset JSON-LD, no medical equivalent of Property's landlord-tax-index. Original cited data is what earns AI citations at 3 to 10 times a standard post. This is the primary 10x move and it needs a heavy build plus a data-source sign-off gate.
- Cheap and on-site, high impact. sameAs is 0 across the entire site. Adding a sameAs array (the Companies House record for 16358723, LinkedIn) to the Organization schema links the firm to its authoritative record for knowledge-graph resolution. One file, high citation upside.
- Cheap and on-site, medium-high impact. The freshness signal is broken: JSON-LD dateModified equals datePublished on all 78 posts, and the sitemap post lastmod equals the publish date, because lib/blog.ts never parses the dateModified frontmatter field. The site is actively maintained (posts carry real dateModified values, e.g. 2026-06-12, and were swept for the 55p mileage change) but signals to AI verifiers as a static, never-updated corpus reading 2026-04-01.
- Cheap and on-site. The homepage, the exact page all 3 ChatGPT-sourced leads landed on, emits only a bare Organization block. No FAQPage (its visible FAQ is unschema'd), no Service, no WebSite plus SearchAction. This is gated by the MED-F7 homepage freeze, but schema is non-visual and arguably freeze-compatible. /services and medical-guides are similarly thin, and there is no root WebSite entity site-wide.
- On-site, lower. BLUF answer boxes and keyTakeaways are populated on 0 of 78 posts (the renderer already exists), 0 Speakable, 0 DefinedTerm, 0 HowTo on procedural step-by-step posts.
- Audit item. The llms.txt header claims all figures are 2026/27, but 45 of 78 posts carry 2025/26 date-bands and llms-full.txt contains 120 instances of "2025/26". Many are legitimately correct, but the header-versus-body mismatch is a verifier-facing signal that needs a targeted year-label check, not a blanket rewrite.

Important context: none of the AI work is blocked by the Google discovery wall (103 of 112 URLs unknown to Google). AI answer engines retrieve from Bing, which knows at least 38 URLs, so the AI levers above can move independently of the Google fix.

---

## FIX-NOW list (cheap, medical-only, ordered, precise)

1. Calculator encoding corruption (HIGH). In the 3 config files fix all 24 mojibake strings: replace "Â£" with "£", "Â·" with the middle dot "·", and "â€"" with a comma or middle dot (do NOT decode it back to an em-dash, that breaks the no-em-dash rule). Files and counts: src/lib/tools/configs/nhs-pension-calculator.ts (10), locum-tax-calculator.ts (4), incorporation-calculator.ts (10). Save UTF-8. Verify the live result panel reads "£60,000".

2. Title double-suffix and 3 duplicate titles (HIGH). Root cause: page-level title strings already end in " | Medical Accountants UK" and the layout template `%s | ${siteConfig.name}` appends it again. Strip the trailing " | Medical Accountants UK" from the 23 offending page titles so the template adds it exactly once. Separately, differentiate the titles of /locations/london, /locations/birmingham, /locations/bristol from /blog/gp-accountant-{same-city} so the two indexable pages stop competing (for example give the location page a "GP Accountant {City}" hub title and the blog post a distinct guide title).

3. Em-dash in 3 category titles (LOW, bundle with item 2). Replace the em-dash with a comma or colon in the titles of the gp-tax-and-accounts, gp-practice-management, and gp-accountant-services category pages.

4. Deep-scroll modal and NextStepOffer dead on 78 posts (MEDIUM). Make the post topic reachable by IntentProvider. Minimal reversible fix: in the deep_scroll_modal and next_step_offer branches of the intent engine, fall back to entryTopic when pageTopic is null. Cleaner fix: lift the topic override so IntentProvider can read it (mount TopicOverrideProvider above IntentProvider, or pass the post topic into IntentProvider as a server-set initialTopic prop from the blog [slug] page). Verify the modal fires near 85 percent scroll on a /blog/<slug>.

5. 29 pages missing og:image (MEDIUM). The dynamic /api/og route already exists. Add openGraph.images to the 29 pages (or a layout-level default that calls /api/og with the page title): 15 core/utility, 8 blog category, 6 medical-guides.

6. favicon 404 (LOW). Add src/app/icon.png (or public/favicon.ico) so every page load stops returning a 404 for the favicon.

7. Embed brand name (MEDIUM, BUG-1). In src/app/embed/page.tsx lines 8 and 20 replace "Medical Finance Partners" with siteConfig.name.

8. Organization sameAs (AI, LOW effort, HIGH value). Add a sameAs array to buildOrganizationJsonLd in src/lib/organization-schema.ts: the Companies House record https://find-and-update.company-information.service.gov.uk/company/16358723 and the firm LinkedIn URL. This lands estate-wide-pattern on every Organization-emitting page.

9. Freshness signal (AI, LOW effort). Parse the dateModified frontmatter field in lib/blog.ts and feed it to schema.ts (BlogPosting dateModified) and to sitemap.ts (post lastmod). The posts already carry the field.

10. Apex redirect 307 to 308 (Google, LOW). Add an apex-to-www permanent (308 or 301) redirect in Medical/web/vercel.json or next.config.ts. It is currently the Vercel default 307 Temporary.

11. OB-06 Web Vitals (parity, LOW). Add @vercel/speed-insights to Medical/web/package.json and mount a WebVitals component in layout.tsx, matching the other estate sites. The web_vital event is already in the shared allowlist.

12. Config-hygiene bugs (LOW). BUG-2: in src/app/api/og/route.tsx read brand color and name from the niche loader instead of the hardcoded literals. BUG-3: in the admin analytics page replace or relabel the Personalisation "Not operated" panel, which is factually wrong (IntentProvider, StickyCTA, DeepScrollModal, ReturningBar and SpecialistWidget are all running).

13. Duplicate BreadcrumbList JSON-LD on 9 pages (LOW). Emit only one BreadcrumbList per page (drop either the standalone block or the one inside the @graph).

14. keyTakeaways backfill 0/78 (AI/content, larger). The renderer is ready. Backfill 3 to 5 self-contained takeaway bullets per post. This is content-lane work, not a code fix, and can run as a backlog sweep.

Note: before any resource-email flag flip, the api/resources/deliver route must be created (it does not exist and would 404). This is gated on the not-on-site Resend item below.

---

## NOT-ONSITE list (authority, time, owner)

1. GSC Request Indexing (the actual discovery blocker). Owner-in-browser only, the API scope is read-only. About 10 URLs per day. 8 URLs still need it, in priority order: /blog/locum-doctor-self-assessment-filing-guide (URGENT, phantom userCanonical still cached, crawled but not indexed), then /contact, /nhs-pension, /services, /about, /for-gps, /for-consultants, /blog, plus /blog/gp-accounting-guide for a cache flush. The sitemap re-submission was already done by the owner today (2026-07-06 18:42 UTC, downloaded 2 seconds later, 0 errors).

2. Data-PR / Dataset flagship. The single biggest AI-citation moat and the primary 10x lever. Needs a heavy build (for example an NHS Pension Annual Allowance burden report) plus an HMRC self-assessment or ONS data-source sign-off gate. No medical equivalent of Property's landlord-tax-index exists. Owner authority and time.

3. Off-site faceless authority. The root cause of near-zero Google crawl budget on a young low-trust domain. Must be faceless per the owner constraint (data-PR, tools, citations, GEO), never named-expert PR. Slow, owner and time.

4. Discovery maturation watch. The 14-day (about 2026-07-20) and 28-day (about 2026-08-03) coverage re-sweeps that confirm whether indexed count moves from 6 toward 15 to 40. The MedicalCoverageWatch scheduled task already runs Mondays. Time only.

5. Resend from-domain for medicalaccounts.co.uk. Required before resource email delivery can be enabled, after which the api/resources/deliver route must be built. Owner and infra.

6. Serper credit top-up. Off the critical path. Unblocks live Google SERP composition probes. Owner spend.

7. 2025/26 vs 2026/27 factual currency audit. A targeted year-label judgment check across the 45 posts and llms-full.txt, overlapping the factual-sweep lane. Per the locked rule this stays manager-direct, not a sub-agent sweep.

8. Deferred content wave (about 5 posts, MED-F11). Gated: do not commission until Google discovery is proven to work, because the 73 already-published specialist posts currently earn 0 Google clicks across 2,187 lifetime impressions. Adding content to a site Google is not indexing pours it into a hole.

---

## Evidence index

- Live error and special-URL sweep: .cache/medical_diag/audit_errors.json
- UX journey walk (desktop + mobile, calculator DOM probe, modal probe): .cache/medical_diag/audit_ux.json
- Estate parity vs 71 capabilities: .cache/medical_diag/audit_parity.json
- AI / GEO vs program spec: .cache/medical_diag/audit_ai.json
- Google-readiness (sitemap, canonicals, URL inspection, redirects): .cache/medical_diag/audit_google.json
- Consolidated crawl (per-URL): .cache/medical_diag/audit_findings.json
- Diagnosis and root-cause context (do not edit): docs/medical/DIAGNOSIS_2026-07.md
