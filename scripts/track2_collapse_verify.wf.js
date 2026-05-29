export const meta = {
  name: 'track2-collapse-verify',
  description: 'Verify proposed redirect-collapses as MERGES: the canonical must cover the source page queries (or we lift them in first); resolve chains to the terminal canonical; reject if intents genuinely differ',
  phases: [{ title: 'VerifyCollapse', detail: 'per proposed collapse: query-coverage merge check, chain resolution, equity check' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const pairs = A.pairs || []      // [{source, target}]
if (!pairs.length) { log('No pairs in args.pairs'); return [] }
const collapseSources = pairs.map(p => p.source)
log(`Verifying ${pairs.length} proposed collapses as MERGES (query-coverage decisive, chain-aware)`)

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['source', 'verdict', 'final_canonical', 'source_queries', 'canonical_covers_them', 'queries_to_lift', 'chain_note', 'reason'],
  properties: {
    source: { type: 'string' },
    verdict: {
      type: 'string',
      enum: ['confirm', 'confirm-with-lift', 'retarget', 'reject'],
      description: 'confirm=canonical already covers source queries, safe to 301; confirm-with-lift=collapse is right but canonical must absorb the source queries/content FIRST (see queries_to_lift); retarget=collapse but to a different/terminal canonical; reject=intents genuinely differ, should be a rewrite/keep not a collapse',
    },
    final_canonical: { type: 'string', description: 'TERMINAL canonical slug (full path if non-blog) to 301 into. Empty for reject.' },
    source_queries: { type: 'array', items: { type: 'string' }, description: 'The queries/intent the SOURCE page targets or earns impressions for (from its GSC + its title/h1/headings).' },
    canonical_covers_them: { type: 'boolean', description: 'Does the canonical already substantively target/cover ALL of the source_queries?' },
    queries_to_lift: { type: 'array', items: { type: 'string' }, description: 'Source queries/sub-topics the canonical does NOT yet cover and must absorb before the 301 (empty if canonical already covers everything). For confirm-with-lift, name what content to add.' },
    chain_note: { type: 'string', description: 'If the proposed target is itself being collapsed, the resolved terminal canonical and the chain.' },
    reason: { type: 'string' },
  },
}

const results = await parallel(pairs.map(p => () =>
  agent(
    `You are the Track 2 COLLAPSE-VERIFY stage for the proposed redirect "${p.source}" -> "${p.target}" on propertytaxpartners.co.uk. A redirect-collapse is a MERGE, not a blind 301. The core test: the canonical must target/cover the queries the source page is for. A 301 passes link equity but does NOT make the canonical rank for a query it doesn't address, so if we redirect a page away from its query without the canonical covering that query, we LOSE that ranking surface. Default skeptical.
Full set of slugs being collapsed this batch (for CHAIN detection): ${JSON.stringify(collapseSources)}.

Do this:
1. SOURCE QUERIES: Read Property/web/content/blog/${p.source}.md (title, h1, headings, intent) and pull its GSC footprint: run \`python scripts/_sb_query.py "SELECT query, SUM(impressions) impr, SUM(clicks) clk, ROUND(AVG(position)::numeric,1) pos FROM gsc_query_data WHERE site_key='property' AND page_url LIKE '%/${p.source}' GROUP BY query ORDER BY impr DESC LIMIT 20;"\`. Determine the queries/intent this page TARGETS (combine GSC reality + on-page intent; an invisible page still targets queries via its title/headings).
2. CANONICAL EXISTS + COVERS: Find the canonical's live file (blog: Property/web/content/blog/<slug>.md; non-blog like "locations/manchester": Grep/Glob under Property/web/src/app/ to confirm it exists). Read it and pull its GSC. Decide: does the canonical ALREADY substantively target/cover ALL the source's queries?
   - If YES, and canonical is genuinely stronger/deeper -> verdict=confirm.
   - If the canonical is the right home but MISSING some of the source's query coverage -> verdict=confirm-with-lift, and list exactly which queries/sub-topics must be added to the canonical BEFORE the 301 (queries_to_lift), with what content to add.
   - If the source's intent is genuinely DISTINCT and the canonical cannot reasonably absorb it (different search intent / would bloat or dilute the canonical) -> verdict=reject (this page should be a rewrite or keep, NOT collapsed).
   - If the target is wrong/weaker/missing but a different genuinely-stronger canonical exists -> verdict=retarget to that one.
3. CHAIN RESOLUTION: If "${p.target}" is itself in the collapse set above, resolve to the TERMINAL canonical (follow to a page NOT being collapsed). The source must 301 directly to the terminal (no 301 chains). Record the chain.
4. Return the structured verdict. Be concrete: list the actual source_queries and exactly what (if anything) must be lifted into the canonical to make the merge lossless.`,
    { label: `collapse-verify:${p.source}`, phase: 'VerifyCollapse', schema: SCHEMA }
  ).then(r => r).catch(() => null)
))

const ok = results.filter(Boolean)
const c = (v) => ok.filter(r => r.verdict === v).length
log(`Collapse-verify: ${c('confirm')} confirm, ${c('confirm-with-lift')} confirm-with-lift, ${c('retarget')} retarget, ${c('reject')} reject`)
return ok
