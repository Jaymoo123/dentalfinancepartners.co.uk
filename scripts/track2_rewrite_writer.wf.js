export const meta = {
  name: 'track2-rewrite-writer',
  description: 'Execute Track 2 legacy rewrites: per page pull GSC+GA4+competitors, rewrite the .md in place (de-leak, de-stale, depth), then adversarially verify statutes/pricing/facts/cannibalisation/HTML',
  phases: [
    { title: 'Rewrite', detail: 'data-grounded in-place rewrite of the page .md' },
    { title: 'Normalise', detail: 'deterministic internal-link canonicalisation (slug_resolver)' },
    { title: 'Coverage', detail: 'deterministic query-coverage check + bounded weave-repair' },
    { title: 'Verify', detail: 'adversarial statute/pricing/facts/cannibalisation/HTML check' },
  ],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const slugs = A.slugs || []
const depth = A.depth || 'full'   // 'full' = gold-reference depth; 'refresh' = de-leak/de-stale/local-depth, lighter
const cluster = A.cluster || 'CityService'
const briefDir = A.briefDir || ''   // if set, the writer reads <briefDir>/<slug>.md + .corrections.md as its plan
const site = A.site || 'property'

// WRITER_MODEL must match the model this workflow is dispatched with.
// Update this constant whenever the workflow's model changes so that the
// generator frontmatter field stays accurate.
const WRITER_MODEL = 'sonnet-4.6'

// Per-site config. The .wf.js runtime has NO filesystem access, so this is an
// explicit map mirroring sites/<site>.json (blogContentDir / vercel.productionDomain
// / paths.housePositions). The site's house_positions doc is the AUTHORITATIVE
// ground-truth for every rate/statute/framing - there are NO hardcoded tax facts
// in this workflow (that was the property-only leak). To onboard a new site, add an
// entry here from its sites/<site>.json + house_positions path.
const SITES = {
  property:   { blogDir: 'Property/web/content/blog',       domain: 'propertytaxpartners.co.uk',
                hp: 'docs/property/house_positions.md',      adviser: 'UK property tax accountant' },
  dentists:   { blogDir: 'Dentists/web/content/blog',       domain: 'www.dentalfinancepartners.co.uk',
                hp: 'docs/dentists/house_positions.md',      adviser: 'UK dental practice and associate tax accountant' },
  solicitors: { blogDir: 'Solicitors/web/content/blog',     domain: 'www.accountsforlawyers.co.uk',
                hp: 'docs/solicitors/house_positions.md',    adviser: 'UK solicitor and law-firm accountant' },
  medical:    { blogDir: 'Medical/web/content/blog',        domain: 'www.medicalaccountantsuk.co.uk',
                hp: 'docs/medical/house_positions.md',       adviser: 'UK medical professional and GP practice accountant',
                flatBlog: true },
  generalist: { blogDir: 'generalist/web/content/blog',     domain: 'www.hollowaydavies.co.uk',
                hp: 'docs/generalist/house_positions.md',    adviser: 'UK general practice accountant for owner-managed businesses' },
  agency:     { blogDir: 'digital-agency/web/content/blog', domain: 'www.agencyfounderfinance.co.uk',
                hp: 'docs/agency/house_positions.md',        adviser: 'UK accountant for digital and creative agency founders' },
}
const cfg = SITES[site]
if (!cfg) throw new Error(`track2_rewrite_writer: unknown site '${site}'. Add a SITES entry (blogDir/domain/hp/adviser from sites/${site}.json) before running the rewrite engine for it.`)

if (!slugs.length) { log('No slugs in args.slugs'); return [] }
log(`Rewrite-writer: ${slugs.length} page(s), site=${site}, depth=${depth}, cluster=${cluster}`)

const HARD = `
HARD RULES (non-negotiable):
- Blog BODY is RAW HTML (<h2>,<h3>,<p>,<ul><li>,<table>). NEVER markdown (## or - render literally). FAQs go in frontmatter faqs: [{question,answer}]. Preserve the frontmatter slug, category, and structure; you may improve metaTitle (~60 chars) / metaDescription (~155) / h1 / summary.
- MODEL PROVENANCE: the rewritten file's frontmatter MUST set or update the field: generator: ${WRITER_MODEL}/track2-rewrite. If the field exists, overwrite its value. If it is absent, insert it after the date: line (or at the end of the frontmatter block). Never alter the body based on this field — it is metadata only.
- NO pricing, fees, fee-ranges, hourly rates, "save thousands", percentages-of-rent-as-fee, service-fee figures. The site is a lead-gen handoff: no pricing anywhere. Strip any that exist.
- NO em-dashes (use commas, parentheses, full stops, middle dots).
- GROUND TRUTH: ${cfg.hp} is the AUTHORITATIVE source for EVERY rate, threshold, statute citation and framing on this site. Cite it by section (§N / §N.A). Every tax figure, rate, threshold and statutory citation on the page MUST match ${cfg.hp}; if the existing page contradicts a locked position, FLAG it in your return (do NOT silently re-frame, and do NOT edit ${cfg.hp}).
- VERIFY AT SOURCE, distrust your prior: WebFetch legislation.gov.uk for EVERY statute/section/Finance Act you cite and confirm its operative wording supports the claim (URL liveness alone is insufficient) and, for a Finance Act, its Royal Assent. CRITICAL: do NOT rely on your training prior for any rate/threshold that may have changed recently (post-cutoff or a recent Finance Act); that is exactly where the model defaults to the OLD value. Confirm every such figure against ${cfg.hp} or primary source, and for anything changed in the last ~18 months corroborate against a second source (the GOV.UK measure/policy paper or the relevant HMRC manual), not legislation.gov.uk alone (its revised view can lag).
- Anonymised social proof only; no real client names; no invented statistics or fabricated local/sector figures.
- EDITORIAL STANDARD: write like a genuine senior adviser, not generic AI. NO filler ('in today's ever-changing landscape', 'it is important to note'), NO empty throat-clearing intros or restate-only conclusions, NO listicle-in-prose ('three things. First... Second...') as a crutch, NO hedging that says nothing, and do NOT recycle the same phrase across sections. Lead with specifics and a clear point of view; every sentence must earn its place.
- GOLD PATTERNS (docs/_engines/rewrite_gold_patterns.md; distilled from pages with verified position lifts): (1) if the H1 poses a yes/no question, the first sentence answers it (yes/no plus the key distinguishing condition) before any context; (2) every rate or threshold is written with its operative date band ('14% from 1 April 2026, reduced from 18%'), never as a bare number, naming the Finance Act + section where enacted; (3) every statute citation appears as a live hyperlink to legislation.gov.uk or gov.uk in the body AT THE POINT the claim is made, not only in a sources list; (4) worked examples show EVERY arithmetic step in body prose (intermediate totals, band-stacking splits, final figure in plain English), a formula without a numeric walkthrough does not count; (5) each FAQ answer fully resolves its question with the relevant rate/statute/deadline in the answer itself, never 'see above'; (6) the final section is NOT a summary: it poses the reader's most likely follow-on question and links the sibling page that answers it, or names a concrete next step.
- ANTI-PATTERNS (the structural signatures of pre-rewrite underperformers; all prohibited): keyword-stuffed bold repeats of the primary query phrase across sections; source-driven digressions (leading with historical or legislative background before the current rule); generic listicle framing ('N things to know about X').
- ${cfg.flatBlog
    ? `Add 2-4 genuine internal links to relevant live pages in ${cfg.blogDir}. FLAT routing: links MUST use /blog/<slug> (two segments only). NEVER add a category segment (/blog/<category>/<slug> does not exist on this site and will 404). Verify the target slug exists by reading the target file's frontmatter slug field.`
    : `Add 2-4 genuine internal links to relevant live pages in ${cfg.blogDir} (verify each target's /blog/<category>/ by reading the target file's frontmatter category; a wrong category 404s because routes use dynamicParams=false).`} Keep the lead-capture intent (the LeadForm auto-injects; do not add fake CTAs with pricing).
REQUIRED READING (durable context; do not restate): ${cfg.hp} (the locked ground-truth; cite §N only if real). If a briefDir is supplied, prefer its per-page brief + corrections, but re-verify every statute at source regardless.
`

const DEPTH_NOTE = depth === 'full'
  ? `DEPTH = FULL gold-reference rewrite: comprehensive, intent-matched, deeper than the strongest competitor on the primary query. ~2,000-3,000 words where the topic warrants it, with worked examples (every figure grounded in ${cfg.hp}), at least one comparison <table> where options/rates/bands are compared, 8-14 FAQs reusing the proven query demand, and genuine internal links. Add real local/sector specificity only where verifiable; never fabricate figures.`
  : `DEPTH = REFRESH (lighter de-stale). The page is currently invisible/low-traffic; do NOT bloat. Priorities in order: (1) STRIP all pricing/fees, (2) FIX every stale fact against ${cfg.hp} and primary source (rates, thresholds, statute citations, year-tags), (3) add genuine specificity where the page is generic boilerplate, (4) tighten structure + metaTitle/description for CTR, (5) ensure 2-4 internal links and 6-10 FAQs. Aim ~1,400-2,200 words.`

// Minimal return on purpose: the rewrite agent does a large in-place edit, so forcing a
// big structured audit afterwards causes "completed without calling StructuredOutput".
// The separate VERIFY stage reads the saved file and is the real gate.
const REWRITE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'words_after', 'done'],
  properties: {
    slug: { type: 'string' },
    words_after: { type: 'number' },
    done: { type: 'boolean', description: 'true if the .md was fully rewritten and saved' },
    note: { type: 'string', description: 'optional one-line note' },
  },
}

const NORMALISE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'canonicalised', 'unresolved'],
  properties: {
    slug: { type: 'string' },
    canonicalised: { type: 'boolean', description: 'true if the resolver reported it rewrote one or more internal-link categories' },
    unresolved: { type: 'array', items: { type: 'string' },
      description: 'exact hrefs the resolver printed as UNRESOLVED - the writer linked to a page that does not exist; needs repointing. Empty if none.' },
  },
}

const COVERAGE_SCHEMA = { type:'object', additionalProperties:false, required:['slug','passed','coverage_score','missing','repaired'],
  properties:{ slug:{type:'string'}, passed:{type:'boolean'}, coverage_score:{type:'number'}, missing:{type:'array',items:{type:'string'}}, repaired:{type:'boolean'} } }

const VERIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'statutes_ok', 'pricing_clean', 'em_dash_clean', 'facts_current', 'cannibalisation_ok', 'html_valid', 'query_coverage', 'meta_ok', 'eeat_ok', 'schema_ok', 'verdict', 'flags'],
  properties: {
    slug: { type: 'string' },
    statutes_ok: { type: 'boolean' },
    pricing_clean: { type: 'boolean' },
    em_dash_clean: { type: 'boolean' },
    facts_current: { type: 'boolean', description: 'every rate/threshold/year-tag/statute matches the site house_positions and primary source (no stale figures)' },
    cannibalisation_ok: { type: 'boolean', description: 'Still distinct from sibling/canonical pages (no new cannibalisation introduced)' },
    html_valid: { type: 'boolean' },
    query_coverage: { type: 'object', additionalProperties: false, required: ['covered_pct', 'missing', 'natural'],
      properties: {
        covered_pct: { type: 'number', description: 'percent of target_queries[] served (from the Coverage stage result)' },
        missing: { type: 'array', items: { type: 'string' }, description: 'proven-demand queries still not served' },
        natural: { type: 'boolean', description: 'false if queries are stuffed (repeated to game a checker) or dumped as a bare list rather than woven into prose/headings/FAQs' },
      } },
    meta_ok: { type: 'boolean', description: 'metaTitle<=60 chars AND metaDescription<=155 chars AND h1 query-aligned to the primary intent' },
    eeat_ok: { type: 'boolean', description: 'reviewedBy + reviewerCredentials + reviewedAt + dateModified all present in frontmatter' },
    schema_ok: { type: 'boolean', description: 'richest valid schema emitted: FAQPage present iff faqs exist, HowTo present iff howToSteps exist' },
    verdict: { type: 'string', enum: ['pass', 'pass-with-fixes', 'fail'] },
    flags: { type: 'array', items: { type: 'string' } },
  },
}

const results = await pipeline(
  slugs,
  (slug) => agent(
    `You are the Track 2 REWRITE-WRITER for the legacy page "${slug}" (cluster ${cluster}) on ${cfg.domain}. Rewrite the live page in place.
${HARD}
${DEPTH_NOTE}
Steps:
${briefDir ? `0. PLAN (read FIRST if present): \`${briefDir}/${slug}.md\` is your verified rewrite brief - follow its gap-mode diagnosis, section-by-section content plan, target word count, statute spine, competitor depth benchmark, and internal-link targets. ALSO read \`${briefDir}/${slug}.corrections.md\` if present and PREFER its statute corrections over anything in the brief (the brief's statute spine may carry adversarially-flagged miscites). If neither file exists, proceed from the data pull below. Regardless: independently re-verify EVERY statute you cite at legislation.gov.uk at write time and trust legislation.gov.uk over the brief.` : `0. NO BRIEF: treat target_queries[] from the data pull (step 1) as your authoritative coverage target set and the competitor_depth[] word/section/faq counts as your depth benchmark. Enumerate and weave every target_queries[] item with the same rigor a brief would demand.`}
1. Run \`python -m optimisation_engine.track2.pull_page_data --slug ${slug} --site ${site} --json\` for GSC queries (what it should target), GA4 engagement (where users engage/bounce, if any), competitor signals, and the parsed content map. This prints \`target_queries[]\` (EVERY proven GSC+Bing demand query, deduped and sorted by impressions descending) and an \`adjacent[]\` opportunity list - these are your coverage targets.
2. Read ${cfg.blogDir}/${slug}.md in full (frontmatter + body).
3. Rewrite the .md IN PLACE per the depth note and every hard rule: target the primary + secondary queries the GSC data shows, fix all stale facts, strip all pricing, add genuine specificity, proper HTML body, internal links, FAQs in frontmatter. Use the Write/Edit tools on ${cfg.blogDir}/${slug}.md.
4. ON-PAGE SEO (best-practice; REWRITE-ONLY, never collapse): weave EVERY target_queries[] item naturally and ONCE, prioritised by impressions - highest-impression queries belong in the metaTitle / h1 / an early H2; mid-impression in H2s and FAQs; long-tail in FAQs and body prose. NEVER repeat a query to satisfy a checker: a separate stage judges naturalness and stuffing (repeated or list-dumped queries) FAILS it. metaTitle <=60 chars, leading with the primary (highest-impression) query plus a CTR hook; metaDescription <=155 chars; h1 query-aligned to the primary intent; phrase H2s as the user's actual question/intent where natural; 8-14 FAQs that reuse the long-tail target_queries[] (and competitor PAA from the data pull) VERBATIM where natural. E-E-A-T + freshness: set reviewedBy + reviewerCredentials + reviewedAt and dateModified BOTH to TODAY'S date in YYYY-MM-DD (run \`date +%Y-%m-%d\` first to get it; do NOT hardcode a date) in frontmatter, but PRESERVE the original \`date\` field; use a REAL reviewer per ${cfg.hp} - never invent a name or credentials. If the page is step-by-step / "how to", add a \`howToSteps: [{name, text}]\` list to frontmatter (this auto-emits HowTo schema). ${cfg.flatBlog
    ? 'Add 3-6 internal links to REAL sibling slugs using FLAT /blog/<slug> only (no category segment).'
    : 'Add 3-6 internal links to REAL sibling slugs using nested /blog/<category>/<slug>.'}

   TABLES (important): if the page compares options (anything "vs", "or", "which is better", structures/wrappers/regimes, or a decision between routes) it MUST include at least one clear side-by-side comparison \`<table>\` (thead + tbody); pages built around rates/bands/thresholds/deadlines or several worked figures should use a \`<table>\` where it makes the data scannable. The site styles \`.prose-blog table/th/td\`, so tables render cleanly, and a well-structured comparison table is the format Google lifts into featured snippets. Use a table only where it genuinely structures side-by-side or reference data (never as filler), keep it plain HTML (no inline styles/classes), and put no pricing/fees in it.
IMPORTANT: after you have SAVED the file, your final action is to return ONLY {slug, words_after, done:true}. Keep this return tiny so it is never truncated; the verify stage reads the saved file for the real audit. If you could not finish the rewrite, return done:false with a one-line note.`,
    { label: `rewrite:${slug}`, phase: 'Rewrite', schema: REWRITE_SCHEMA, model: 'sonnet' }
  ).then(rw => ({ slug, rewrite: rw })),

  // Stage 2 - deterministic link canonicalisation (NOT an LLM judgement). The
  // slug_resolver fixes the one thing the writer reliably gets wrong: the
  // /blog/<category>/ prefix (a slug has exactly one real category). It LEAVES
  // links to nonexistent pages and prints them as UNRESOLVED for repointing.
  // This is the WS-D root-cause fix wired into the legacy-rewrite path (the
  // net-new generator already does this in content_pipeline).
  (prev) => agent(
    `Deterministic normalisation for the just-rewritten page ${cfg.blogDir}/${prev.slug}.md.
Run EXACTLY these two commands IN ORDER (both are deterministic; do NOT hand-edit):
  1. python scripts/frontmatter_lint.py --fix ${cfg.blogDir}/${prev.slug}.md
     (quotes free-text frontmatter values so an unquoted colon-space e.g. "rates 2026/27: main pool" cannot break the YAML build - this is a systematic writer defect; ALWAYS run it)
  2. python optimisation_engine/blog_generator/slug_resolver.py --fix ${cfg.blogDir}/${prev.slug}.md
     (rewrites every internal /blog link to the one real category for the slug the writer chose, collapses known 301 hops, and LEAVES any link to a nonexistent page - printing it as UNRESOLVED)
The scripts are the source of truth. Then report what it printed: canonicalised = true if it said it canonicalised the file, and unresolved = the exact list of any "UNRESOLVED" hrefs (empty array if none). Any UNRESOLVED entry means the writer linked to a page that does not exist - it must be repointed, so report each verbatim.`,
    { label: `normalise:${prev.slug}`, phase: 'Normalise', schema: NORMALISE_SCHEMA, model: 'sonnet' }
  ).then(nz => ({ slug: prev.slug, rewrite: prev.rewrite, normalise: nz })),

  // Stage 3 - DETERMINISTIC query-coverage check + bounded weave-repair. The
  // coverage script (target_queries[] from the data pull, deduped/sorted by
  // impressions) is authoritative on WHICH proven-demand queries are served;
  // the agent only weaves any missing high-demand query into the indicated
  // field, never repeats, and re-runs the deterministic check. This is the
  // ranking-grade gate the verify stage reports against.
  (prev) => agent(
    `Deterministic query-coverage check for the just-rewritten page ${cfg.blogDir}/${prev.slug}.md.
Run \`python scripts/track2_query_coverage.py --slug ${prev.slug} --site ${site} --json\`.
- If it returns passed:true -> return {slug:"${prev.slug}", passed:true, repaired:false, coverage_score:<its coverage_score>, missing:[]}.
- If it returns passed:false -> it lists missing_queries[] (proven GSC+Bing demand NOT served) and, per query, a \`where\` hint (meta / H2 / FAQ / body) for where it should go. WEAVE-REPAIR, MAX TWICE:
    a. Edit ${cfg.blogDir}/${prev.slug}.md to place EACH missing query naturally in the indicated field (metaTitle/metaDescription/H2/FAQ/body), ONCE each. Break NO HARD RULE (no pricing, no em-dashes, current facts, valid HTML, real reviewer). Do NOT repeat a query or dump a bare list - a separate stage fails stuffing.
    b. After editing, run \`python scripts/frontmatter_lint.py --fix ${cfg.blogDir}/${prev.slug}.md\` then RE-RUN \`python scripts/track2_query_coverage.py --slug ${prev.slug} --site ${site} --json\`.
    c. Repeat (a)-(b) at most twice total. After at most 2 repairs, return the FINAL deterministic result.
Return {slug:"${prev.slug}", passed:<final passed>, repaired:<true if you edited the file>, coverage_score:<final coverage_score>, missing:<final missing_queries as a list of query strings>}.`,
    { label: `coverage:${prev.slug}`, phase: 'Coverage', schema: COVERAGE_SCHEMA, model: 'sonnet' }
  ).then(cv => ({ slug: prev.slug, rewrite: prev.rewrite, normalise: prev.normalise, coverage: cv })),

  (prev) => agent(
    `You are the adversarial VERIFY stage for the rewritten page ${cfg.blogDir}/${prev.slug}.md. Default skeptical.
The deterministic Normalise stage reported these UNRESOLVED (invented) links that still need repointing: [${(prev.normalise && prev.normalise.unresolved || []).join(', ') || 'none'}]. If that list is non-empty, set html_valid:false and add each to flags.
The deterministic Coverage stage returned: passed=${prev.coverage && prev.coverage.passed}, coverage_score=${prev.coverage && prev.coverage.coverage_score}, missing=[${(prev.coverage && prev.coverage.missing || []).join(', ') || 'none'}]. TRUST those numbers - do not recompute coverage. Populate query_coverage from them: covered_pct = the coverage_score (as a percentage), missing = that missing list; you ONLY judge query_coverage.natural - set it false if any target query is STUFFED (repeated to game a checker) or dumped as a bare list rather than woven into prose/headings/FAQs.
Read the file (post-rewrite). Check:
1. STATUTES: every statute/section cited - WebFetch legislation.gov.uk to confirm it exists, says what the page claims, and (for any Finance Act) its Royal Assent (Bill-vs-enacted).
2. PRICING: NO fees/fee-ranges/hourly rates/percentage-of-rent fees anywhere (legitimate tax figures like the GBP3,000 CGT allowance or SDLT bands are fine).
3. EM-DASHES: none.
4. FACTS CURRENT: every rate, threshold, year-tag and statute on the page matches ${cfg.hp} (the locked ground-truth) and primary source. Flag any figure that contradicts ${cfg.hp}, any stale framing, or any recently-changed rate you could not confirm at primary source (do not trust the page's prior figure or your own training prior).
5. CANNIBALISATION: Grep ${cfg.blogDir} - the rewrite must not duplicate a stronger sibling/canonical's intent (no new cannibalisation).
6. HTML valid (no leaked markdown, frontmatter intact).
7. META: set meta_ok = (metaTitle is <=60 chars) AND (metaDescription is <=155 chars) AND (h1 is aligned to the primary query intent). Count the characters.
8. E-E-A-T: set eeat_ok = (reviewedBy AND reviewerCredentials AND reviewedAt AND dateModified are all present in frontmatter).
9. SCHEMA: set schema_ok = the page emits the richest VALID schema - FAQPage present iff faqs exist, HowTo present iff howToSteps exist (no schema asserting content the page lacks, and none missing where the content exists).
10. TABLES (structure backstop): if this page compares options (vs / or / which-is-better / structures / wrappers / regimes / routes) and contains NO <table>, add a flag "MISSING COMPARISON TABLE - add a side-by-side comparison table" (non-blocking, surfaced for the manager to act on).
Return the structured verdict. verdict = pass ONLY if statutes_ok AND pricing_clean AND em_dash_clean AND facts_current AND cannibalisation_ok AND html_valid. The meta_ok / eeat_ok / schema_ok / query_coverage fields are REPORTED for the deterministic gate to act on; they do NOT themselves flip verdict to fail (the deterministic coverage gate, not this stage, blocks on coverage).`,
    { label: `verify:${prev.slug}`, phase: 'Verify', schema: VERIFY_SCHEMA, model: 'sonnet' }
  ).then(v => ({ slug: prev.slug, rewrite: prev.rewrite, normalise: prev.normalise, coverage: prev.coverage, verify: v }))
)

const ok = results.filter(Boolean)
const c = (x) => ok.filter(r => r.verify && r.verify.verdict === x).length
const unresolvedTotal = ok.reduce((n, r) => n + ((r.normalise && r.normalise.unresolved || []).length), 0)
log(`Rewrite-writer done: ${c('pass')} pass, ${c('pass-with-fixes')} pass-with-fixes, ${c('fail')} fail | ${unresolvedTotal} unresolved (invented) link(s) to repoint`)
return ok.map(r => ({ slug: r.slug, verdict: r.verify && r.verify.verdict, flags: (r.verify && r.verify.flags) || [],
  words_after: r.rewrite && r.rewrite.words_after, done: r.rewrite && r.rewrite.done,
  coverage_passed: r.coverage && r.coverage.passed, coverage_score: r.coverage && r.coverage.coverage_score,
  coverage_missing: (r.coverage && r.coverage.missing) || [],
  unresolved_links: (r.normalise && r.normalise.unresolved) || [] }))
