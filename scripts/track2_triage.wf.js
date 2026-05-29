export const meta = {
  name: 'track2-triage',
  description: 'Lean Track 2 triage: per residual page decide rewrite / redirect-collapse / keep against the live corpus (cannibalisation-aware), no brief drafting',
  phases: [{ title: 'Triage', detail: 'diagnose rewrite-vs-collapse-vs-keep per page' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const slugs = A.slugs || []
const cluster = A.cluster || 'unknown'
if (!slugs.length) { log('No slugs in args.slugs'); return [] }
log(`Triage ${slugs.length} pages in cluster ${cluster}`)

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'decision', 'current_words', 'gsc_impr', 'gsc_pos', 'gap_modes', 'reason'],
  properties: {
    slug: { type: 'string' },
    decision: { type: 'string', enum: ['rewrite', 'redirect-collapse', 'keep'] },
    redirect_canonical: { type: 'string', description: 'If redirect-collapse: the existing canonical slug to 301 into. Empty otherwise.' },
    current_words: { type: 'number' },
    gsc_impr: { type: 'number', description: '90d total impressions for this page' },
    gsc_pos: { type: 'number', description: '90d avg position (0 if no GSC footprint)' },
    gap_modes: { type: 'array', items: { type: 'string' }, description: 'STALE_FACTS / THIN_DEPTH / STRUCTURE / INVISIBLE / CTR_FAIL / PRICING_LEAK / CANNIBAL' },
    reason: { type: 'string', description: 'One-sentence justification, naming the stronger canonical if collapse' },
  },
}

const results = await parallel(slugs.map(slug => () =>
  agent(
    `You are the Track 2 TRIAGE stage for residual legacy page "${slug}" (cluster ${cluster}) on the UK property-accountant lead-gen site propertytaxpartners.co.uk. Decide ONE of: rewrite, redirect-collapse, or keep. Be fast and decisive; do NOT draft a brief.
Steps:
1. Read Property/web/content/blog/${slug}.md (count body words; note obvious stale facts, e.g. FHL still described as live (abolished Apr 2025), Section 24 framed as upcoming, old CGT/SDLT rates, any fee/pricing figures).
2. GSC: run \`python scripts/_sb_query.py "SELECT COALESCE(SUM(impressions),0) impr, COALESCE(SUM(clicks),0) clk, ROUND(AVG(position)::numeric,1) pos FROM gsc_query_data WHERE site_key='property' AND page_url LIKE '%/${slug}';"\`  (impr 0 = INVISIBLE).
3. CANNIBALISATION (the key call): Grep Property/web/content/blog for an existing STRONGER canonical on the same search intent. For a specific-city page, a same-city sibling that is deeper/better-positioned. For a generic service/info page (e.g. "property-accountant-services", "how-to-choose"), a stronger pillar. Use the title/h1/category + word depth as the strength signal.
Decision rules:
- redirect-collapse: a genuinely stronger live canonical already owns this intent (name it in redirect_canonical). Weak duplicate / invisible / same-intent-as-canonical.
- rewrite: distinct valuable intent (e.g. a unique city with real local demand, or a topic with no stronger canonical) but the current page is stale/thin/poorly-structured and worth lifting.
- keep: already adequate (rare for residual; only if genuinely fine and distinct).
Return the structured decision.`,
    { label: `triage:${slug}`, phase: 'Triage', schema: SCHEMA }
  ).then(r => r).catch(() => null)
))

const ok = results.filter(Boolean)
const by = (d) => ok.filter(r => r.decision === d)
log(`Triage done: ${by('rewrite').length} rewrite, ${by('redirect-collapse').length} collapse, ${by('keep').length} keep`)
return ok
