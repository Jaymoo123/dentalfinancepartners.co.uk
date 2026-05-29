export const meta = {
  name: 'track2-rewrite-engine',
  description: 'Track 2 legacy-rewrite engine: per page diagnose (rewrite vs collapse) -> draft gold-reference brief -> adversarially verify statutes + cannibalisation + pricing-leak',
  phases: [
    { title: 'Diagnose', detail: 'data pull + rewrite-vs-collapse decision + cannibalisation scan' },
    { title: 'Brief', detail: 'draft gold-reference rewrite brief to disk' },
    { title: 'Verify', detail: 'adversarial statute + cannibalisation + pricing-leak check' },
  ],
}

// args = { slugs: ["..."], cluster: "CityService" }  (tolerate string-encoded args)
const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const slugs = A.slugs || []
const cluster = A.cluster || 'unknown'
if (!slugs.length) { log('No slugs passed in args.slugs'); return [] }
log(`Track 2 rewrite engine: ${slugs.length} page(s) in cluster ${cluster}`)

const REQUIRED_READING = `
REQUIRED READING (read these before drafting — they are the durable context, do not restate them in output):
- docs/property/TRACK2_PROGRAM.md  (§4 brief template (15 sections), §7 cannibalisation protocol, §13/§14 rules pointers, §15 quality gates)
- docs/property/house_positions.md  (LOCKED house positions §1-§28; cite §N.M, never invent)
- docs/competitor_rewrite_playbook.md  (rewrite methodology + 19-step workflow)
- briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md  (GOLD-REFERENCE depth match-target)
- briefs/property/track2/trial/birmingham-property-accountant.md  (city-page REWRITE reference template + F-1 pricing-leak fix)
HARD RULES (memory-locked):
- Lead-gen handoff model: NO pricing/fees on-page, NO real client names, anonymised social proof only. (Decision E: even soft "£800-£1,500 general-market" fee comparisons are a pricing-leak — flag/strip.)
- NO em-dashes in user-facing copy (use commas, parentheses, full stops, middle dots).
- Every statute citation must be verified against legislation.gov.uk at write time, including Royal Assent date of any cited Finance Act (the F-37 Bill-vs-enacted pattern).
`

const DIAGNOSE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'decision', 'gap_modes', 'primary_query', 'current_word_count', 'target_word_count', 'cannibalisation', 'competitor_targets', 'risk_notes'],
  properties: {
    slug: { type: 'string' },
    decision: { type: 'string', enum: ['rewrite', 'redirect-collapse'] },
    redirect_canonical: { type: 'string', description: 'If redirect-collapse: the canonical slug to collapse into. Empty for rewrite.' },
    gap_modes: { type: 'array', items: { type: 'string' }, description: 'e.g. STALE_FACTS, THIN_DEPTH, STRUCTURE, INVISIBLE, CTR_FAIL, PRICING_LEAK' },
    primary_query: { type: 'string' },
    current_word_count: { type: 'number' },
    target_word_count: { type: 'number', description: 'Recommended rewrite length, benchmarked to top competitors (gold-ref briefs run ~3000-5800 words)' },
    cannibalisation: { type: 'string', description: 'Which existing live pages overlap this slug and how the rewrite stays distinct OR why it should collapse into one of them' },
    competitor_targets: { type: 'array', items: { type: 'string' }, description: 'Top competitor URLs found for the primary query (fetched + live)' },
    risk_notes: { type: 'string', description: 'Stale facts / statute risks / pricing-leak found in the current page' },
  },
}

const VERIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'statutes_ok', 'cannibalisation_ok', 'pricing_leak_clean', 'em_dash_clean', 'verdict', 'flags'],
  properties: {
    slug: { type: 'string' },
    statutes_ok: { type: 'boolean', description: 'Every statute/section cited in the brief verified against legislation.gov.uk incl. Royal Assent dates' },
    cannibalisation_ok: { type: 'boolean', description: 'The rewrite-vs-collapse decision and the distinctiveness claim hold against the live corpus' },
    pricing_leak_clean: { type: 'boolean', description: 'No fees/pricing leaked into the brief (Decision E strict)' },
    em_dash_clean: { type: 'boolean' },
    verdict: { type: 'string', enum: ['pass', 'pass-with-fixes', 'fail'] },
    flags: { type: 'array', items: { type: 'string' }, description: 'Specific drift/issues found, with the F-pattern family where relevant. Empty if clean.' },
  },
}

const results = await pipeline(
  slugs,

  // Stage 1 — Diagnose
  (slug) => agent(
    `You are the Track 2 DIAGNOSE stage for the legacy page slug "${slug}" (cluster: ${cluster}) on the UK property-accountant lead-gen site propertytaxpartners.co.uk.
${REQUIRED_READING}
Do this:
1. Read the current live page at Property/web/content/blog/${slug}.md (frontmatter + body). Count its body words.
2. Pull GSC performance: run \`python scripts/_sb_query.py "SELECT query, SUM(impressions) impr, SUM(clicks) clk, ROUND(AVG(position)::numeric,1) pos FROM gsc_query_data WHERE site_key='property' AND page_url LIKE '%/${slug}' GROUP BY query ORDER BY impr DESC LIMIT 15;"\` to see what it ranks for. (Empty = INVISIBLE page.)
3. Cannibalisation scan: Grep Property/web/content/blog for other pages targeting the same intent (for a city page, other pages for the same city/region; for a topic page, sibling topics). Decide: is this a REWRITE (distinct intent, worth lifting) or a REDIRECT-COLLAPSE (a stronger canonical already owns the intent)?
4. Find the top 2-4 competitor URLs ranking for the primary query (WebFetch a Google/Bing search or known specialist competitor sites; confirm each URL is live).
5. Identify stale facts / statute risks / pricing-leak in the current page.
Return the structured diagnosis. Be decisive on rewrite vs redirect-collapse and give a competitor-benchmarked target word count.`,
    { label: `diagnose:${slug}`, phase: 'Diagnose', schema: DIAGNOSE_SCHEMA }
  ).then(d => ({ slug, diagnosis: d })),

  // Stage 2 — Brief (writes to disk; returns a pointer + citations)
  (prev) => {
    const d = prev.diagnosis
    if (d.decision === 'redirect-collapse') {
      log(`${prev.slug}: redirect-collapse -> ${d.redirect_canonical} (no brief drafted)`)
      return { ...prev, brief_path: null, note: `redirect-collapse to ${d.redirect_canonical}` }
    }
    return agent(
      `You are the Track 2 BRIEF stage for "${prev.slug}". The diagnosis decided REWRITE.
${REQUIRED_READING}
Diagnosis to build on: ${JSON.stringify(d)}
Draft a complete gold-reference rewrite brief matching the depth and 15-section structure of the gold-reference and birmingham city templates above. The brief must include: gap-mode diagnosis, the primary + secondary query targets, the cannibalisation/distinctiveness statement, the section-by-section content plan to ~${d.target_word_count} words, the statute spine (every section number with its Act, to be verified), the competitor depth benchmark, internal-link targets within the live corpus, and the metaTitle/metaDescription/h1 plan. Obey every HARD RULE (no pricing, no em-dashes, anonymised proof).
WRITE the brief to briefs/property/track2/batch3/${prev.slug}.md (create the directory if needed via the Write tool path).
Return a JSON object with: { "brief_path": "briefs/property/track2/batch3/${prev.slug}.md", "statute_citations": ["TCGA 1992 s.222", ...], "word_target": <number>, "summary": "<3-sentence summary of the rewrite approach>" }.`,
      { label: `brief:${prev.slug}`, phase: 'Brief',
        schema: { type: 'object', additionalProperties: false, required: ['brief_path', 'statute_citations', 'word_target', 'summary'],
          properties: { brief_path: { type: 'string' }, statute_citations: { type: 'array', items: { type: 'string' } }, word_target: { type: 'number' }, summary: { type: 'string' } } } }
    ).then(b => ({ ...prev, brief: b, brief_path: b.brief_path }))
  },

  // Stage 3 — Adversarial verify
  (prev) => {
    if (!prev.brief_path) {
      // redirect-collapse: verify the collapse decision only
      return agent(
        `You are the Track 2 VERIFY stage for "${prev.slug}", which DIAGNOSE marked as redirect-collapse into "${prev.diagnosis.redirect_canonical}".
Adversarially check: does a genuinely stronger canonical exist for this intent in Property/web/content/blog? Grep to confirm the canonical exists and is stronger (more impressions / better position / deeper). Confirm collapsing loses no unique ranking equity. Return the verdict.`,
        { label: `verify:${prev.slug}`, phase: 'Verify', schema: VERIFY_SCHEMA }
      ).then(v => ({ ...prev, verify: v }))
    }
    return agent(
      `You are the Track 2 VERIFY stage (adversarial) for the rewrite brief at ${prev.brief_path} (slug "${prev.slug}").
Your job is to REFUTE, default to skeptical:
1. STATUTES: For every statute/section cited in the brief (${(prev.brief && prev.brief.statute_citations || []).join(', ')}), WebFetch legislation.gov.uk and confirm (a) the section exists, (b) its operative wording matches the brief's claim, (c) for any Finance Act, the Royal Assent date (catch the F-37 Bill-vs-enacted pattern). Read the brief file to see every citation.
2. CANNIBALISATION: Grep the live corpus (Property/web/content/blog) and confirm the rewrite's distinctiveness claim holds, no stronger existing page makes this a should-have-been-collapse.
3. PRICING-LEAK (Decision E strict): scan the brief for any fee/price figures or fee comparisons. Any => fail that check.
4. EM-DASHES: scan for em-dashes in proposed copy.
Return the structured verdict with specific flags. Be precise and cite what you checked.`,
      { label: `verify:${prev.slug}`, phase: 'Verify', schema: VERIFY_SCHEMA }
    ).then(v => ({ ...prev, verify: v }))
  }
)

return results.filter(Boolean).map(r => ({
  slug: r.slug,
  decision: r.diagnosis && r.diagnosis.decision,
  brief_path: r.brief_path || null,
  verdict: r.verify && r.verify.verdict,
  flags: (r.verify && r.verify.flags) || [],
  target_words: r.diagnosis && r.diagnosis.target_word_count,
  primary_query: r.diagnosis && r.diagnosis.primary_query,
}))
