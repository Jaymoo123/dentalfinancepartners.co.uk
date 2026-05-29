export const meta = {
  name: 'track2-rewrite-writer',
  description: 'Execute Track 2 legacy rewrites: per page pull GSC+GA4+competitors, rewrite the .md in place (de-leak, de-stale, depth), then adversarially verify statutes/pricing/facts/cannibalisation/HTML',
  phases: [
    { title: 'Rewrite', detail: 'data-grounded in-place rewrite of the page .md' },
    { title: 'Verify', detail: 'adversarial statute/pricing/facts/cannibalisation/HTML check' },
  ],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const slugs = A.slugs || []
const depth = A.depth || 'full'   // 'full' = gold-reference depth; 'refresh' = de-leak/de-stale/local-depth, lighter
const cluster = A.cluster || 'CityService'
if (!slugs.length) { log('No slugs in args.slugs'); return [] }
log(`Rewrite-writer: ${slugs.length} page(s), depth=${depth}, cluster=${cluster}`)

const HARD = `
HARD RULES (non-negotiable):
- Blog BODY is RAW HTML (<h2>,<h3>,<p>,<ul><li>,<table>). NEVER markdown (## or - render literally). FAQs go in frontmatter faqs: [{question,answer}]. Preserve the frontmatter slug, category, and structure; you may improve metaTitle (~60 chars) / metaDescription (~155) / h1 / summary.
- NO pricing, fees, fee-ranges, hourly rates, "save thousands", percentages-of-rent-as-fee. The site is a lead-gen handoff: no pricing anywhere. Strip any that exist.
- NO em-dashes (use commas, parentheses, full stops, middle dots).
- CURRENT FACTS ONLY: MTD-for-ITSA is LIVE (6 Apr 2026 at GBP50k, 6 Apr 2027 at GBP30k, 6 Apr 2028 at GBP20k). Section 24 is fully in force (20% basic-rate credit). FHL regime ABOLISHED 6 Apr 2025. CGT residential 18%/24% (FA 2024, unified s.1H). FA 2026 enacted the 2027 separate property-income rates (22/42/47) - state as enacted, not speculative. CGT AEA GBP3,000. Verify any statute you cite against legislation.gov.uk at write time (Bill-vs-enacted discipline).
- Anonymised social proof only; no real client names; no invented statistics. Local/city specifics must be verifiable (e.g. Scotland = LBTT + ADS; Wales = LTT; Article 4 HMO directions exist in named areas) - do NOT fabricate local figures.
- Add 2-4 genuine internal links to relevant live pages. Keep the lead-capture intent (the LeadForm auto-injects; do not add fake CTAs with pricing).
REQUIRED READING (durable context; do not restate): docs/property/house_positions.md (cite §N.M only if real), docs/competitor_rewrite_playbook.md, briefs/property/track2/trial/birmingham-property-accountant.md (city REWRITE reference + F-1 pricing-fix), briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md (gold-reference depth).
`

const DEPTH_NOTE = depth === 'full'
  ? `DEPTH = FULL gold-reference rewrite. For a city page: ~2,200-3,200 words, genuine local specificity (named sub-markets/boroughs, regional tax nuances, local landlord context), a Section 24 worked example, an SDLT/LBTT/LTT additional-dwelling note, CGT-on-disposal, MTD readiness, 10-14 FAQs, internal links. For an info/topic page: comprehensive, intent-matched, deeper than the strongest competitor on the primary query.`
  : `DEPTH = REFRESH (lighter). The page is currently invisible/low-traffic; do NOT bloat to gold-reference length. Priorities, in order: (1) STRIP all pricing/fees, (2) FIX every stale fact (MTD/Section 24/FHL/CGT rates/2027 rates per the hard rules), (3) add genuine local/topic specificity where the page is generic boilerplate, (4) tighten structure + metaTitle/description for CTR, (5) ensure 2-4 internal links and 6-10 FAQs. Aim ~1,400-2,000 words.`

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

const VERIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'statutes_ok', 'pricing_clean', 'em_dash_clean', 'facts_current', 'cannibalisation_ok', 'html_valid', 'verdict', 'flags'],
  properties: {
    slug: { type: 'string' },
    statutes_ok: { type: 'boolean' },
    pricing_clean: { type: 'boolean' },
    em_dash_clean: { type: 'boolean' },
    facts_current: { type: 'boolean', description: 'MTD/Section 24/FHL/CGT/2027 all stated correctly' },
    cannibalisation_ok: { type: 'boolean', description: 'Still distinct from sibling/canonical pages (no new cannibalisation introduced)' },
    html_valid: { type: 'boolean' },
    verdict: { type: 'string', enum: ['pass', 'pass-with-fixes', 'fail'] },
    flags: { type: 'array', items: { type: 'string' } },
  },
}

const results = await pipeline(
  slugs,
  (slug) => agent(
    `You are the Track 2 REWRITE-WRITER for the legacy page "${slug}" (cluster ${cluster}) on propertytaxpartners.co.uk. Rewrite the live page in place.
${HARD}
${DEPTH_NOTE}
Steps:
1. Run \`python -m optimisation_engine.track2.pull_page_data --slug ${slug}\` for GSC queries (what it should target), GA4 engagement (where users engage/bounce, if any), competitor signals, and the parsed content map.
2. Read Property/web/content/blog/${slug}.md in full (frontmatter + body).
3. Rewrite the .md IN PLACE per the depth note and every hard rule: target the primary + secondary queries the GSC data shows, fix all stale facts, strip all pricing, add genuine specificity, proper HTML body, internal links, FAQs in frontmatter. Use the Write/Edit tools on Property/web/content/blog/${slug}.md.
IMPORTANT: after you have SAVED the file, your final action is to return ONLY {slug, words_after, done:true}. Keep this return tiny so it is never truncated; the verify stage reads the saved file for the real audit. If you could not finish the rewrite, return done:false with a one-line note.`,
    { label: `rewrite:${slug}`, phase: 'Rewrite', schema: REWRITE_SCHEMA }
  ).then(rw => ({ slug, rewrite: rw })),

  (prev) => agent(
    `You are the adversarial VERIFY stage for the rewritten page Property/web/content/blog/${prev.slug}.md. Default skeptical.
Read the file (post-rewrite). Check:
1. STATUTES: every statute/section cited - WebFetch legislation.gov.uk to confirm it exists, says what the page claims, and (for any Finance Act) its Royal Assent (Bill-vs-enacted).
2. PRICING: NO fees/fee-ranges/hourly rates/percentage-of-rent fees anywhere (legitimate tax figures like the GBP3,000 CGT allowance or SDLT bands are fine).
3. EM-DASHES: none.
4. FACTS CURRENT: MTD live (Apr 2026 GBP50k / 2027 GBP30k / 2028 GBP20k), Section 24 in force, FHL abolished Apr 2025, CGT 18/24 unified, FA 2026 2027 rates stated as enacted. Flag any stale framing.
5. CANNIBALISATION: Grep Property/web/content/blog - the rewrite must not duplicate a stronger sibling/canonical's intent (no new cannibalisation).
6. HTML valid (no leaked markdown, frontmatter intact).
Return the structured verdict. pass only if statutes_ok AND pricing_clean AND em_dash_clean AND facts_current AND cannibalisation_ok AND html_valid.`,
    { label: `verify:${prev.slug}`, phase: 'Verify', schema: VERIFY_SCHEMA }
  ).then(v => ({ slug: prev.slug, rewrite: prev.rewrite, verify: v }))
)

const ok = results.filter(Boolean)
const c = (x) => ok.filter(r => r.verify && r.verify.verdict === x).length
log(`Rewrite-writer done: ${c('pass')} pass, ${c('pass-with-fixes')} pass-with-fixes, ${c('fail')} fail`)
return ok.map(r => ({ slug: r.slug, verdict: r.verify && r.verify.verdict, flags: (r.verify && r.verify.flags) || [],
  words_after: r.rewrite && r.rewrite.words_after, done: r.rewrite && r.rewrite.done }))
