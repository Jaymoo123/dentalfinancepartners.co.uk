export const meta = {
  name: 'track2-apply-lifts',
  description: 'Merge step: lift missing query coverage from collapse-source pages into their canonical (GSC + GA4 grounded, SEO-correct, no pricing/em-dash), then adversarially verify coverage before redirect',
  phases: [
    { title: 'Lift', detail: 'edit each canonical to absorb the source queries/content it lacks' },
    { title: 'VerifyLift', detail: 'confirm the canonical now covers every source query; no pricing/stuffing' },
  ],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const canonicals = A.canonicals || []
if (!canonicals.length) { log('No canonicals in args.canonicals'); return [] }
log(`Apply-lifts to ${canonicals.length} canonical page(s)`)

const HARD = `
HARD RULES (non-negotiable):
- Blog body is RAW HTML (<h2>, <h3>, <p>, <ul><li>). NEVER markdown headings/lists in the body (## or - will render as literal text). FAQs live in the frontmatter faqs: array (question/answer) - add there if adding FAQs.
- NO pricing / fees / fee-ranges / "save thousands" anywhere. If a source's content you are lifting contains fee figures, lift the substance but STRIP the pricing (lead-gen model: no pricing on-site).
- NO em-dashes. Use commas, parentheses, full stops, or middle dots.
- SEO: match each addition to real search intent (do not keyword-stuff; weave noun-phrases naturally). Add an internal link from the new content to a relevant existing page where natural. Keep the page coherent (additions must read as part of the page, not bolted on). Preserve all existing content; you are ADDING/broadening, not deleting (except stale facts or pricing).
- Keep frontmatter valid (metaTitle/metaDescription may be lightly broadened to reflect absorbed intent, but stay within ~60/155 chars).
`

const LIFT_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['canonical', 'words_before', 'words_after', 'queries_now_targeted', 'additions', 'pricing_stripped', 'em_dash_clean'],
  properties: {
    canonical: { type: 'string' },
    words_before: { type: 'number' },
    words_after: { type: 'number' },
    queries_now_targeted: { type: 'array', items: { type: 'string' }, description: 'The full query set the canonical now targets (its own + absorbed from sources)' },
    additions: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['heading', 'targets_queries', 'merged_from', 'ga4_rationale', 'placement'],
        properties: {
          heading: { type: 'string', description: 'The new/broadened section heading or FAQ question added' },
          targets_queries: { type: 'array', items: { type: 'string' } },
          merged_from: { type: 'string', description: 'Which source slug this content came from' },
          ga4_rationale: { type: 'string', description: 'What GA4 behaviour (engagement/bounce/duration on canonical or source) informed this, or "no GA4 signal" if none' },
          placement: { type: 'string', description: 'Where in the page it was inserted (after which existing section / frontmatter FAQ)' },
        },
      },
    },
    pricing_stripped: { type: 'array', items: { type: 'string' }, description: 'Any fee/pricing figures removed from lifted content (empty if none encountered)' },
    em_dash_clean: { type: 'boolean' },
  },
}

const VERIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['canonical', 'all_source_queries_covered', 'uncovered_queries', 'pricing_leak_clean', 'em_dash_clean', 'keyword_stuffing_clean', 'html_valid', 'verdict', 'notes'],
  properties: {
    canonical: { type: 'string' },
    all_source_queries_covered: { type: 'boolean' },
    uncovered_queries: { type: 'array', items: { type: 'string' }, description: 'Source queries still not substantively covered after the lift (empty = fully covered)' },
    pricing_leak_clean: { type: 'boolean' },
    em_dash_clean: { type: 'boolean' },
    keyword_stuffing_clean: { type: 'boolean' },
    html_valid: { type: 'boolean', description: 'Body is valid HTML, no leaked markdown headings/lists, frontmatter intact' },
    verdict: { type: 'string', enum: ['pass', 'pass-with-fixes', 'fail'] },
    notes: { type: 'array', items: { type: 'string' } },
  },
}

const results = await pipeline(
  canonicals,

  (c) => agent(
    `You are the MERGE-LIFT stage for canonical page "${c.slug}" (live at ${c.path}) on propertytaxpartners.co.uk. Several weaker pages are about to be 301'd into this canonical; your job is to make the merge LOSSLESS by absorbing the search intent those pages serve, so no query surface is lost when they redirect.
${HARD}
Data to gather (this is a DATA-DRIVEN optimisation, ground every addition in evidence):
1. Run \`python -m optimisation_engine.track2.pull_page_data --slug ${c.slug}\` to get the canonical's GSC queries + GA4 engagement (sessions, engaged_sessions, bounce, avg duration, conversions) + competitor signals + content map. Note where users currently engage/bounce.
2. For EACH merge-source, run \`python -m optimisation_engine.track2.pull_page_data --slug <source>\` and read Property/web/content/blog/<source>.md to see the exact content/intent to absorb. Merge-sources: ${JSON.stringify(c.merge_sources)}.
3. Read the canonical Property/web/content/blog/${c.slug}.md in full.
Lift specification (what the verify stage said the canonical is MISSING and must absorb):
${c.lifts.map((l, i) => `  ${i + 1}. ${l}`).join('\n')}
Now EDIT Property/web/content/blog/${c.slug}.md to absorb that coverage: add coherent HTML sections / broaden existing ones / add frontmatter FAQs, so the canonical genuinely targets the source queries. Ground each addition in the GSC intent + GA4 behaviour you pulled. Obey every HARD RULE (HTML body, no pricing, no em-dashes, no stuffing, internal links, preserve existing content). Also fix any obviously stale facts you encounter in the canonical (MTD now live April 2026, Section 24 long enacted, FHL abolished April 2025, FA 2026 2027 rates enacted) while you are in the file.
Return the structured audit: every addition, the queries it targets, which source it came from, the GA4 rationale, and where it was placed. Report words before/after and any pricing you stripped.`,
    { label: `lift:${c.slug}`, phase: 'Lift', schema: LIFT_SCHEMA }
  ).then(lift => ({ c, lift })),

  (prev) => agent(
    `You are the adversarial VERIFY-LIFT stage for canonical "${prev.c.slug}" after a merge-lift. The pages ${JSON.stringify(prev.c.merge_sources)} are about to 301 into it, so it MUST now cover their query intent.
Read Property/web/content/blog/${prev.c.slug}.md (current state, post-edit). For each merge-source, re-derive its target queries (read Property/web/content/blog/<source>.md + you may pull GSC) and confirm the canonical now substantively covers EACH. List any still-uncovered queries.
Also check, skeptically: (a) NO pricing/fee figures anywhere in the page, (b) NO em-dashes, (c) NO keyword stuffing (additions read naturally), (d) body is valid HTML with no leaked markdown headings/lists and frontmatter intact.
Return the structured verdict. verdict=pass only if all source queries are covered AND all four cleanliness checks pass.`,
    { label: `verify-lift:${prev.c.slug}`, phase: 'VerifyLift', schema: VERIFY_SCHEMA }
  ).then(v => ({ canonical: prev.c.slug, lift: prev.lift, verify: v }))
)

return results.filter(Boolean)
