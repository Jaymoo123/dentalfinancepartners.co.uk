export const meta = {
  name: 'track2-independent-qa',
  description: 'Independent second-opinion QA on already-live Track 2 pages (any site): a skeptical senior sector-specialist tax reviewer doing final sign-off, fresh angle from the writers own verify',
  phases: [{ title: 'QA', detail: 'independent expert sign-off review per page' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const slugs = A.slugs || []
const site = A.site || 'property'

// Per-site config (no fs access in the .wf.js runtime; mirrors sites/<site>.json).
// The site's house_positions doc is the authoritative ground-truth; there are NO
// hardcoded tax facts in this reviewer. Add an entry to onboard a new site.
const SITES = {
  property:   { blogDir: 'Property/web/content/blog',       hp: 'docs/property/house_positions.md',   adviser: 'UK property tax accountant' },
  dentists:   { blogDir: 'Dentists/web/content/blog',       hp: 'docs/dentists/house_positions.md',   adviser: 'UK dental practice and associate tax accountant' },
  solicitors: { blogDir: 'Solicitors/web/content/blog',     hp: 'docs/solicitors/house_positions.md', adviser: 'UK solicitor and law-firm accountant' },
  medical:    { blogDir: 'Medical/web/content/blog',        hp: 'docs/medical/house_positions.md',    adviser: 'UK medical professional and GP practice accountant', flatBlog: true },
  generalist: { blogDir: 'generalist/web/content/blog',     hp: 'docs/generalist/house_positions.md', adviser: 'UK general practice accountant for owner-managed businesses' },
  agency:     { blogDir: 'digital-agency/web/content/blog', hp: 'docs/agency/house_positions.md',     adviser: 'UK accountant for digital and creative agency founders' },
}
const cfg = SITES[site]
if (!cfg) throw new Error(`track2_independent_qa: unknown site '${site}'. Add a SITES entry (blogDir/hp/adviser from sites/${site}.json) first.`)

if (!slugs.length) { log('No slugs'); return [] }
log(`Independent QA on ${slugs.length} live ${site} pages`)

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'signoff', 'issues', 'strengths', 'expert_plausible',
             'arithmetic_recomputed', 'statute_checks', 'links_resolve',
             'query_coverage', 'meta_quality', 'eeat_present', 'schema_valid', 'all_clear'],
  properties: {
    slug: { type: 'string' },
    signoff: { type: 'string', enum: ['sign-off', 'minor-issues', 'blocking-issues'],
      description: 'sign-off = a qualified sector tax accountant would publish this as-is; minor-issues = publish but tidy; blocking-issues = do not leave live' },
    issues: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['severity', 'type', 'detail'],
      properties: {
        severity: { type: 'string', enum: ['blocking', 'minor'] },
        type: { type: 'string', description: 'factual / statute / arithmetic / pricing / stale / cannibalisation / writing / structure / links / other' },
        detail: { type: 'string' } } } },
    // DETERMINISTIC dimensions (WS-D D4 root-cause fix): the original QA reasoned
    // about plausibility and shipped backwards arithmetic + Bill-vs-enacted errors.
    // These force the reviewer to RE-DERIVE, not judge.
    arithmetic_recomputed: { type: 'array',
      description: 'EVERY worked example / numeric claim on the page, independently recomputed from first principles (do NOT trust the page numbers - redo the maths yourself). Empty array ONLY if the page genuinely contains no calculation.',
      items: { type: 'object', additionalProperties: false,
        required: ['example', 'page_result', 'your_result', 'agrees'],
        properties: {
          example: { type: 'string', description: 'what is computed, e.g. "S24 reducer on GBP12k finance costs, higher-rate, 2027/28"' },
          page_result: { type: 'string', description: 'the figure the page states' },
          your_result: { type: 'string', description: 'the figure you independently derived' },
          agrees: { type: 'boolean', description: 'do they match (within rounding)?' } } } },
    statute_checks: { type: 'array',
      description: 'EVERY statute / section / Finance Act cited, each WebFetched from legislation.gov.uk this session.',
      items: { type: 'object', additionalProperties: false,
        required: ['citation', 'exists', 'content_supports_claim', 'royal_assent_ok'],
        properties: {
          citation: { type: 'string', description: 'e.g. "CTA 2010 s.455" or "Finance Act 2026 s.4"' },
          exists: { type: 'boolean', description: 'the section/Act exists at legislation.gov.uk' },
          content_supports_claim: { type: 'boolean', description: 'its operative wording actually supports what the page asserts (not just that the URL resolves)' },
          royal_assent_ok: { type: 'boolean', description: 'for a Finance Act: RA date verified and consistent with the page framing (enacted vs draft). true (NA) for non-FA cites.' } } } },
    links_resolve: { type: 'boolean', description: 'every internal /blog link on the page resolves (no 404 / wrong-category). Run or trust scripts/track2_link_audit.py.' },
    query_coverage: { type: 'object', additionalProperties: false,
      required: ['high_demand_covered_pct', 'uncovered_high_demand', 'natural'],
      properties: {
        high_demand_covered_pct: { type: 'number', description: 'percent of high-demand (impr>=50) target queries served, from the coverage script' },
        uncovered_high_demand: { type: 'array', items: { type: 'string' },
          description: 'GSC/Bing queries with impr>=gate that are NOT served on the page (from the coverage script missing_queries)' },
        natural: { type: 'boolean', description: 'false if target queries are stuffed (repeated) or dumped as a bare list rather than woven naturally' } } },
    meta_quality: { type: 'object', additionalProperties: false, required: ['title_len', 'desc_len', 'ok'],
      properties: {
        title_len: { type: 'number', description: 'metaTitle character count' },
        desc_len: { type: 'number', description: 'metaDescription character count' },
        ok: { type: 'boolean', description: 'title_len<=60 AND desc_len<=155' } } },
    eeat_present: { type: 'boolean', description: 'reviewedBy + reviewerCredentials + reviewedAt all present in frontmatter' },
    schema_valid: { type: 'boolean', description: 'rendered JSON-LD valid + complete: FAQPage iff faqs, HowTo iff howToSteps' },
    strengths: { type: 'string', description: 'what is genuinely good' },
    expert_plausible: { type: 'boolean', description: 'Would a qualified UK tax accountant for this sector find nothing embarrassing or wrong here?' },
    all_clear: { type: 'boolean', description: 'THE DEPLOY-GATE SIGNAL. TRUE only if ALL hold: no blocking issues AND every arithmetic_recomputed.agrees===true AND every statute_checks entry has exists && content_supports_claim && royal_assent_ok AND links_resolve===true. If any fails, all_clear MUST be false.' },
  },
}

const results = await parallel(slugs.map(slug => () =>
  agent(
    `You are an INDEPENDENT senior ${cfg.adviser} (ATT/CTA level) doing a final sign-off review of a live page on a client lead-gen site, before deciding whether it can stay published. You did NOT write it and you are skeptical: your job is to find anything wrong, not to confirm it is fine. This is a DIFFERENT lens from the original drafting QA, do not assume prior checks were correct, re-derive.

Read ${cfg.blogDir}/${slug}.md (frontmatter + body). The AUTHORITATIVE ground-truth for every rate, threshold, statute and framing on this site is ${cfg.hp}; cross-check the page against it and flag any contradiction. Then judge it as a publishing reviewer. TWO of these are NON-NEGOTIABLE and must be done by RE-DERIVATION, not by reading-and-nodding (this is exactly where the previous QA failed: it judged plausibility and let backwards arithmetic and unenacted-statute framing ship):

1. ARITHMETIC (re-derive, do NOT trust the page): find EVERY worked example and numeric claim. Recompute each one yourself from first principles and record it in arithmetic_recomputed[] with the page's figure, your figure, and whether they agree. Do NOT trust the page's figure OR your own training prior for any recently-changed rate (the model defaults to the OLD value for anything changed post-cutoff or by a recent Finance Act); confirm against ${cfg.hp} or primary source.
2. STATUTE (WebFetch each, verify substance + Royal Assent): for EVERY statute/section/Finance Act cited, WebFetch legislation.gov.uk and record it in statute_checks[]: does the section exist, does its operative wording actually support the page's claim (not just that the URL loads, a section can be gutted by a later amendment while the URL stays live), and for any Finance Act is the Royal Assent date verified and consistent with the framing (enacted vs draft). CROSS-CHECK every rate/threshold/figure and every statutory citation against ${cfg.hp} (this site's locked ground-truth) and flag any page figure or citation that contradicts it. SECONDARY-SOURCE RULE (mandatory for any figure/rate changed in the last ~18 months, anything tied to a recent Finance Act or dated 2025/2026): legislation.gov.uk's "Latest available (revised)" view can LAG in applying an enacted amendment and silently serve the OLD text (sometimes with a "changes not yet applied" note). So you MUST corroborate every recently-changed figure against a SECOND source, the GOV.UK measure/policy paper or the relevant HMRC manual, and only set content_supports_claim=true if BOTH agree; note the secondary source in the citation string. A single-source legislation.gov.uk PASS on a recently-changed figure is NOT sufficient.
3. PRICING/COMPLIANCE: ANY firm fee figures, fee ranges, hourly rates, or percentage-of-rent fees = blocking (lead-gen model bans on-site pricing). Legitimate tax figures (£3,000 AEA, SDLT bands, MTD thresholds) are fine.
4. LINKS: confirm every internal /blog link resolves (set links_resolve). ${cfg.flatBlog
    ? 'FLAT routing: links must be /blog/<slug> (two segments). Any /blog/<category>/<slug> three-segment link is a HARD 404. Use scripts/medical_flat_link_audit.py (or scripts/track2_link_audit.py --site ' + site + ' with awareness that it models nested routing — prefer the flat auditor for medical).'
    : 'The deterministic auditor is scripts/track2_link_audit.py - a correct slug under the wrong category 404s.'}
5. WRITING QUALITY: expert, specific, human (not generic AI filler)? Any em-dashes? Leaked markup / broken HTML? Does local/topic specificity ring true?
6. CANNIBALISATION: does it duplicate a stronger sibling?
7. QUERY COVERAGE: run \`python scripts/track2_query_coverage.py --slug ${slug} --site ${site} --json\`. TRUST its numbers - record high_demand_covered_pct from it and set uncovered_high_demand to its missing_queries[] entries where impr>=50 ("GSC/Bing queries with impr>=gate NOT served"). You ONLY judge query_coverage.natural: set natural=false if target queries are stuffed (repeated to game a checker) or dumped as a bare list rather than woven into prose/headings/FAQs.
8. META: count metaTitle and metaDescription characters into meta_quality.title_len / desc_len; set meta_quality.ok = (title_len<=60 AND desc_len<=155).
9. E-E-A-T: set eeat_present = (reviewedBy AND reviewerCredentials AND reviewedAt are all present in frontmatter).
10. SCHEMA: set schema_valid = the rendered JSON-LD is valid AND complete - FAQPage present iff faqs exist, HowTo present iff howToSteps exist.
Note for the gate (qa_verdict derives it, do not fold into your prose all_clear beyond this): uncovered high-demand queries (step 7) and meta overflow (step 8) are BLOCKING; eeat_present / schema_valid are quality signals only.

Then set all_clear per its definition: TRUE only if no blocking issue AND every arithmetic example agrees AND every statute check passes (exists + content_supports_claim + royal_assent_ok) AND links_resolve. Any failure => all_clear:false and the relevant issue logged as severity "blocking". Be specific and cite what you checked. Default to flagging if unsure.`,
    { label: `qa:${slug}`, phase: 'QA', schema: SCHEMA, model: 'opus' }
  ).then(r => r).catch(() => null)
))

const ok = results.filter(Boolean)
const c = (v) => ok.filter(r => r.signoff === v).length
const blocking = ok.flatMap(r => (r.issues||[]).filter(i => i.severity === 'blocking').map(i => `${r.slug}: ${i.type} - ${i.detail}`))
const arithFails = ok.flatMap(r => (r.arithmetic_recomputed||[]).filter(a => !a.agrees).map(a => `${r.slug}: ${a.example} (page ${a.page_result} vs recomputed ${a.your_result})`))
const statuteFails = ok.flatMap(r => (r.statute_checks||[]).filter(s => !(s.exists && s.content_supports_claim && s.royal_assent_ok)).map(s => `${r.slug}: ${s.citation}`))
const clear = ok.filter(r => r.all_clear).length
log(`QA: ${clear}/${ok.length} all_clear | ${c('sign-off')} sign-off, ${c('minor-issues')} minor, ${c('blocking-issues')} blocking | ${blocking.length} blocking, ${arithFails.length} arithmetic mismatch, ${statuteFails.length} statute fail`)
return { summary: { all_clear: clear, total: ok.length, signoff: { signoff: c('sign-off'), minor: c('minor-issues'), blocking: c('blocking-issues') },
  blocking_issues: blocking, arithmetic_mismatches: arithFails, statute_failures: statuteFails }, pages: ok }
