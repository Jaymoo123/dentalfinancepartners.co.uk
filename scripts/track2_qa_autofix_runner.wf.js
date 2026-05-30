export const meta = {
  name: 'track2-qa-autofix-runner',
  description: 'Rolling per-page QA-autofix orchestrator for already-rewritten Track 2 pages: independent QA -> classify failing items (fixable vs escalate) -> auto-apply routine fixes (re-verifying statutes at legislation.gov.uk) -> re-QA, bounded by maxRounds. Writes per-slug verdicts to disk; returns a COMPACT manifest only. Does NOT commit/deploy.',
  phases: [
    { title: 'QA', detail: 'independent expert sign-off review per page (verbatim from track2_independent_qa)' },
    { title: 'Fix', detail: 'surgical auto-fix of QA-prescribed routine corrections, statutes re-verified at source' },
    { title: 'Record', detail: 'persist each full verdict object to optimisation_engine/.cache/qa_runner/<batch>/<slug>.json' },
  ],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const slugs = A.slugs || []
const batch = A.batch || 'unnamed'
const maxRounds = (typeof A.maxRounds === 'number' && A.maxRounds >= 0) ? A.maxRounds : 2
if (!slugs.length) { log('No slugs in args.slugs'); return { batch, total: 0, all_clear: 0, escalated: 0, pages: [] } }
log(`QA-autofix runner: ${slugs.length} page(s), batch=${batch}, maxRounds=${maxRounds}`)

// ---------------------------------------------------------------------------
// QA SCHEMA - COPIED VERBATIM from scripts/track2_independent_qa.wf.js.
// (Same dimensions: query_coverage / meta_quality / eeat_present / schema_valid /
//  arithmetic_recomputed / statute_checks / links_resolve / all_clear.)
// ---------------------------------------------------------------------------
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'signoff', 'issues', 'strengths', 'expert_plausible',
             'arithmetic_recomputed', 'statute_checks', 'links_resolve',
             'query_coverage', 'meta_quality', 'eeat_present', 'schema_valid', 'all_clear'],
  properties: {
    slug: { type: 'string' },
    signoff: { type: 'string', enum: ['sign-off', 'minor-issues', 'blocking-issues'],
      description: 'sign-off = a UK property accountant would publish this as-is; minor-issues = publish but tidy; blocking-issues = do not leave live' },
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
          citation: { type: 'string', description: 'e.g. "ITTOIA 2005 s.272A" or "Finance Act 2026 s.7"' },
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
    expert_plausible: { type: 'boolean', description: 'Would a qualified UK property tax accountant find nothing embarrassing or wrong here?' },
    all_clear: { type: 'boolean', description: 'THE DEPLOY-GATE SIGNAL. TRUE only if ALL hold: no blocking issues AND every arithmetic_recomputed.agrees===true AND every statute_checks entry has exists && content_supports_claim && royal_assent_ok AND links_resolve===true. If any fails, all_clear MUST be false.' },
  },
}

// The independent-QA reviewer prompt - COPIED VERBATIM from
// scripts/track2_independent_qa.wf.js (only the literal slug interpolation differs,
// which is identical templating). Returns the prompt for a given slug.
const qaPrompt = (slug) =>
  `You are an INDEPENDENT senior UK property tax accountant (ATT/CTA level) doing a final sign-off review of a live page on a client lead-gen site, before deciding whether it can stay published. You did NOT write it and you are skeptical: your job is to find anything wrong, not to confirm it is fine. This is a DIFFERENT lens from the original drafting QA, do not assume prior checks were correct, re-derive.

Read Property/web/content/blog/${slug}.md (frontmatter + body). Then judge it as a publishing reviewer. TWO of these are NON-NEGOTIABLE and must be done by RE-DERIVATION, not by reading-and-nodding (this is exactly where the previous QA failed: it judged plausibility and let backwards arithmetic and unenacted-statute framing ship):

1. ARITHMETIC (re-derive, do NOT trust the page): find EVERY worked example and numeric claim. Recompute each one yourself from first principles and record it in arithmetic_recomputed[] with the page's figure, your figure, and whether they agree. Watch the known trap: the April-2027 Section 24 reducer RISES to 22% in step (FA 2026 Sch 1), so a basic-rate landlord gets NO new wedge and the higher/additional wedge is 20pp/25pp - the "credit stays at 20%, wedge widens" framing is BACKWARDS. The 2027/28 reducer = 22% x (lower of finance costs / profit-before-finance-costs / income above PA).
2. STATUTE (WebFetch each, verify substance + Royal Assent): for EVERY statute/section/Finance Act cited, WebFetch legislation.gov.uk and record it in statute_checks[]: does the section exist, does its operative wording actually support the page's claim (not just that the URL loads - F-8: TCGA 1992 s.4 was gutted by amendment while the URL stayed live), and for any Finance Act is the Royal Assent date verified and consistent with the framing (FA 2026 received RA 18 March 2026 - "draft / awaiting Royal Assent" is now STALE). Section 24 lives in ITTOIA 2005 ss.272A/274A (NOT ITA 2007). Catch Scotland devolution mistakes: the 2027 property rates (22/42/47) apply to England, Wales AND Northern Ireland - ONLY Scotland is carved out for 2027-28 (the FA 2026 s.8/Sch 2 Welsh power is a FUTURE enabling power, not in force for 2027-28). So "England + NI only" / "excluding Wales" is STALE and WRONG; flag a page that carves Wales out of the 2027 rates, and do NOT flag a page that correctly includes Wales. SECONDARY-SOURCE RULE (mandatory for any figure/rate changed in the last ~18 months - anything tied to FA 2025/FA 2026 or dated 2025/2026, e.g. the 14% main-pool WDA, the 40% FYA, the 2027 property rates, APR/BPR caps, dividend rates): legislation.gov.uk's "Latest available (revised)" view can LAG in applying an enacted amendment and silently serve the OLD text (sometimes with a "changes not yet applied" note). So you MUST corroborate every recently-changed figure against a SECOND source - the GOV.UK measure/policy paper or the relevant HMRC manual - and only set content_supports_claim=true if BOTH agree; note the secondary source in the citation string. A single-source legislation.gov.uk PASS on a recently-changed figure is NOT sufficient.
3. PRICING/COMPLIANCE: ANY firm fee figures, fee ranges, hourly rates, or percentage-of-rent fees = blocking (lead-gen model bans on-site pricing). Legitimate tax figures (£3,000 AEA, SDLT bands, MTD thresholds) are fine.
4. LINKS: confirm every internal /blog link resolves (set links_resolve). The deterministic auditor is scripts/track2_link_audit.py - a correct slug under the wrong category 404s.
5. WRITING QUALITY: expert, specific, human (not generic AI filler)? Any em-dashes? Leaked markup / broken HTML? Does local/topic specificity ring true?
6. CANNIBALISATION: does it duplicate a stronger sibling?
7. QUERY COVERAGE: run \`python scripts/track2_query_coverage.py --slug ${slug} --json\`. TRUST its numbers - record high_demand_covered_pct from it and set uncovered_high_demand to its missing_queries[] entries where impr>=50 ("GSC/Bing queries with impr>=gate NOT served"). You ONLY judge query_coverage.natural: set natural=false if target queries are stuffed (repeated to game a checker) or dumped as a bare list rather than woven into prose/headings/FAQs.
8. META: count metaTitle and metaDescription characters into meta_quality.title_len / desc_len; set meta_quality.ok = (title_len<=60 AND desc_len<=155).
9. E-E-A-T: set eeat_present = (reviewedBy AND reviewerCredentials AND reviewedAt are all present in frontmatter).
10. SCHEMA: set schema_valid = the rendered JSON-LD is valid AND complete - FAQPage present iff faqs exist, HowTo present iff howToSteps exist.
Note for the gate (qa_verdict derives it, do not fold into your prose all_clear beyond this): uncovered high-demand queries (step 7) and meta overflow (step 8) are BLOCKING; eeat_present / schema_valid are quality signals only.

Then set all_clear per its definition: TRUE only if no blocking issue AND every arithmetic example agrees AND every statute check passes (exists + content_supports_claim + royal_assent_ok) AND links_resolve. Any failure => all_clear:false and the relevant issue logged as severity "blocking". Be specific and cite what you checked. Default to flagging if unsure.`

// ---------------------------------------------------------------------------
// derived_all_clear - MIRRORS qa_verdict.py _derive_all_clear EXACTLY, in JS,
// AND-ed with the agent's self-reported all_clear (never trust the agent alone).
// Same dimensions and same "empty array / absent => PASS that dimension" defaults.
// ---------------------------------------------------------------------------
function deriveAllClear(v) {
  const issues = v.issues || []
  const no_blocking = !issues.some(i => i && i.severity === 'blocking')
  const arithmetic_ok = (v.arithmetic_recomputed || []).every(a => a.agrees === true)
  const statutes_ok = (v.statute_checks || []).every(s =>
    s.exists === true && s.content_supports_claim === true &&
    (s.royal_assent_ok === undefined ? true : s.royal_assent_ok === true))
  const links_ok = (v.links_resolve === undefined ? true : !!v.links_resolve)
  const qc = v.query_coverage || {}
  const coverage_ok = !((qc.uncovered_high_demand || []).length)
  const meta = v.meta_quality || {}
  const meta_ok = (meta.ok === undefined ? true : meta.ok !== false)
  const derived = no_blocking && arithmetic_ok && statutes_ok && links_ok && coverage_ok && meta_ok
  const reported = (v.all_clear === undefined ? derived : !!v.all_clear) // absent -> use derivation
  return derived && reported
}

// Collect the failing items from a QA verdict as a flat, classifiable list.
// Each item: { kind, text, prescribed } where `prescribed` is the QA-stated
// concrete correct value/citation to apply (null/'' if none was given).
function collectFailing(v) {
  const out = []
  // Always collect blocking issues; ALSO collect MINOR issues of a substantive
  // type, because a failing statute_check / arithmetic mismatch is often explained
  // (with the correct citation/value) only in a MINOR issue's detail - dropping it
  // would leave the fix agent to re-diagnose from the broken cite alone. Minor
  // writing/structure/other polish is deliberately excluded to avoid churn (it
  // never blocks all_clear anyway, so collectFailing only runs when something else
  // already blocks).
  const SUBSTANTIVE_MINOR = new Set(['statute', 'arithmetic', 'factual', 'stale', 'pricing', 'cannibalisation'])
  for (const i of (v.issues || [])) {
    if (!i) continue
    if (i.severity === 'blocking' || (i.severity === 'minor' && SUBSTANTIVE_MINOR.has(i.type))) {
      out.push({ kind: 'issue', subtype: (i.type || 'other'), text: i.detail || '', prescribed: i.detail || '' })
    }
  }
  for (const s of (v.statute_checks || [])) {
    const passes = s.exists === true && s.content_supports_claim === true &&
      (s.royal_assent_ok === undefined ? true : s.royal_assent_ok === true)
    if (!passes) {
      out.push({ kind: 'statute', subtype: 'statute', text: `statute fail: ${s.citation}`, prescribed: s.citation || '' })
    }
  }
  for (const a of (v.arithmetic_recomputed || [])) {
    if (a.agrees === false) {
      out.push({ kind: 'arithmetic', subtype: 'arithmetic',
        text: `arithmetic: ${a.example} (page ${a.page_result} vs recomputed ${a.your_result})`,
        prescribed: a.your_result || '' })
    }
  }
  const qc = v.query_coverage || {}
  for (const q of (qc.uncovered_high_demand || [])) {
    out.push({ kind: 'coverage', subtype: 'coverage', text: `uncovered high-demand query: ${q}`, prescribed: q })
  }
  const meta = v.meta_quality || {}
  if (meta.ok === false) {
    out.push({ kind: 'meta', subtype: 'meta',
      text: `meta overflow: title_len=${meta.title_len} desc_len=${meta.desc_len} (limits 60/155)`,
      prescribed: 'shorten metaTitle<=60 and metaDescription<=155' })
  }
  return out
}

// CLASSIFY each failing item FIXABLE vs ESCALATE.
// ESCALATE (never auto-fix) if ANY of:
//   - the issue text/detail indicates a statute or figure that CONTRADICTS the
//     locked ground truth in docs/property/house_positions.md (a manager judgment call);
//   - the QA gave no concrete correct value/citation to apply;
//   - it is the SAME unresolved issue a prior round already tried to fix (no progress);
//   - round === maxRounds (out of rounds).
// FIXABLE otherwise: a statute PINPOINT cite where the QA gave the correct section,
//   an arithmetic figure the QA re-derived, metaTitle/metaDescription length, a missing
//   comparison table, an em-dash, a pricing leak, or a stale fact where the QA stated
//   the verified-correct current value.
const HOUSE_POSITION_CUES = [
  'house_positions', 'house position', 'contradicts', 'contradict', 'disagree with house',
  'judgment call', 'judgement call', 'house view', 'against house', 'inconsistent with the house',
]
function classifyItem(item, round, priorAttempted) {
  // Out of rounds: nothing more can be auto-fixed this run.
  if (round === maxRounds) return { decision: 'escalate', reason: 'out of rounds (round===maxRounds)' }
  // No progress: the same issue was already attempted in a prior round.
  if (priorAttempted.has(item.text)) return { decision: 'escalate', reason: 'no progress (same issue tried last round)' }
  // No concrete correction to apply -> manager must decide what is correct.
  const prescribed = (item.prescribed || '').trim()
  if (!prescribed) return { decision: 'escalate', reason: 'QA gave no concrete correct value/citation' }
  // Contradiction with locked ground truth -> a judgment call, not a routine fix.
  const hay = (item.text + ' ' + prescribed).toLowerCase()
  if (HOUSE_POSITION_CUES.some(cue => hay.includes(cue))) {
    return { decision: 'escalate', reason: 'contradicts locked house_positions ground truth (manager judgment)' }
  }
  // Everything else is a routine, mechanically-applicable correction.
  return { decision: 'fixable', reason: 'routine prescribed correction' }
}

// The auto-fix agent prompt: apply ONLY the QA-prescribed corrections, surgically,
// re-verifying every statute fix at legislation.gov.uk before applying.
const fixPrompt = (slug, fixable) =>
  `You are the Track 2 QA-AUTOFIX stage for the already-rewritten page Property/web/content/blog/${slug}.md on propertytaxpartners.co.uk. An independent QA reviewer flagged the issues below and prescribed a correction for each. Apply ONLY these corrections, surgically. Do NOT rewrite the page and MUST NOT change anything the QA did not flag.

QA-FLAGGED ISSUES + PRESCRIBED CORRECTIONS (apply each, nothing else):
${fixable.map((f, i) => `  ${i + 1}. [${f.subtype}] ${f.text}\n     prescribed fix: ${f.prescribed}`).join('\n')}

RULES:
- House style: RAW HTML body (<h2>/<h3>/<p>/<ul><li>/<table>), NO markdown; NO em-dashes (use commas, parentheses, full stops, middle dots); NO pricing/fees/fee-ranges/hourly-rates/percentage-of-rent (strip any flagged pricing leak entirely); FAQs in frontmatter faqs:[]. Preserve the frontmatter slug, category and existing structure.
- STATUTE FIXES - re-verify at SOURCE before applying: for any statute/section/Finance Act correction, WebFetch legislation.gov.uk (and, for any figure/rate changed in the last ~18 months, corroborate against a GOV.UK measure/policy paper or HMRC manual) and confirm the section exists, its operative wording supports the corrected claim, and (for a Finance Act) the Royal Assent framing. TRUST legislation.gov.uk over the QA's issue text if they differ. If on verification the QA's prescribed fix is itself WRONG, do NOT guess and do NOT apply it - record it in could_not_apply with a one-line reason so the page escalates to the manager.
- ARITHMETIC FIXES: replace the page figure with the QA's independently re-derived figure only after you have re-checked the maths yourself; if your re-derivation disagrees with the QA's figure, do NOT apply - put it in could_not_apply.
- COVERAGE FIXES: weave each uncovered high-demand query naturally ONCE into the indicated slot (metaTitle/metaDescription/H2/FAQ/body); never repeat or list-dump.
- META FIXES: trim metaTitle to <=60 chars and metaDescription to <=155 chars while keeping the primary query intent.
- TABLE FIX: if a missing comparison table was flagged on a comparison page, add one plain-HTML side-by-side <table> (thead+tbody), no inline styles, no pricing.
After applying the edits, run EXACTLY these two deterministic commands IN ORDER (do NOT hand-edit what they fix):
  1. python scripts/frontmatter_lint.py --fix Property/web/content/blog/${slug}.md
  2. python optimisation_engine/blog_generator/slug_resolver.py --fix Property/web/content/blog/${slug}.md
Then return ONLY {slug, applied:[short strings of what you changed], could_not_apply:[short strings of any prescribed fix you could NOT safely apply, each with why]}. Keep it tiny.`

const FIX_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'applied', 'could_not_apply'],
  properties: {
    slug: { type: 'string' },
    applied: { type: 'array', items: { type: 'string' }, description: 'short description of each correction actually applied' },
    could_not_apply: { type: 'array', items: { type: 'string' },
      description: 'each prescribed fix that could NOT be safely applied (e.g. legislation.gov.uk contradicted the QA, or arithmetic re-derivation disagreed), with a one-line reason - these escalate' },
  },
}

const RECORD_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'written', 'path'],
  properties: {
    slug: { type: 'string' },
    written: { type: 'boolean' },
    path: { type: 'string' },
  },
}

// ---------------------------------------------------------------------------
// Per-page rolling chain. Each page is its own independent QA -> classify ->
// fix -> re-QA loop, bounded by maxRounds. Returns a per-page result object and,
// as its FINAL action, persists the full QA verdict object to disk via a tiny
// record agent (Write tool). We chose the dedicated record-agent approach (the
// QA/Fix agents do NOT write the cache file) - it is the simplest reliable way to
// guarantee exactly one canonical verdict JSON per slug regardless of how many
// rounds ran, and keeps the verbatim QA prompt unmodified.
// ---------------------------------------------------------------------------
async function processPage(slug) {
  const cachePath = `optimisation_engine/.cache/qa_runner/${batch}/${slug}.json`
  let verdict = null
  let result = null
  const priorAttempted = new Set() // texts of items a prior round already tried to fix

  for (let round = 0; round <= maxRounds; round++) {
    // (1) QA agent - verbatim independent-QA reviewer prompt + SCHEMA.
    verdict = await agent(
      qaPrompt(slug),
      { label: round === 0 ? `qa:${slug}` : `reqa:${slug}`, phase: 'QA', schema: SCHEMA }
    ).catch(() => null)
    if (!verdict) { // QA itself failed -> escalate, nothing to record reliably
      result = { slug, all_clear: false, rounds: round, signoff: 'blocking-issues',
        unresolved: ['QA agent failed/returned nothing'], verdict: { slug, qa_failed: true } }
      break
    }

    // (2) Derive all_clear in JS (mirror of qa_verdict.py), AND-ed with reported flag.
    if (deriveAllClear(verdict)) {
      result = { slug, all_clear: true, rounds: round, signoff: verdict.signoff, unresolved: [], verdict }
      break
    }

    // (3) Collect failing items and CLASSIFY each fixable vs escalate.
    const failing = collectFailing(verdict)
    const classified = failing.map(item => ({ item, ...classifyItem(item, round, priorAttempted) }))
    const escalated = classified.filter(c => c.decision === 'escalate')
    const fixable = classified.filter(c => c.decision === 'fixable')

    // If ANY item must escalate -> STOP the loop (the page needs the manager).
    if (escalated.length) {
      const unresolved = escalated.map(c => `${c.item.text} [escalate: ${c.reason}]`)
      result = { slug, all_clear: false, rounds: round, signoff: verdict.signoff, unresolved, verdict }
      break
    }

    // (4) All failing items FIXABLE and round < maxRounds -> Fix agent.
    const fixList = fixable.map(c => c.item)
    const fixRes = await agent(
      fixPrompt(slug, fixList),
      { label: `fix:${slug}`, phase: 'Fix', schema: FIX_SCHEMA }
    ).catch(() => null)

    // Items we attempted this round are recorded so a later round that sees them
    // STILL failing classifies them as "no progress" -> escalate.
    for (const f of fixList) priorAttempted.add(f.text)

    // Any prescribed fix the agent could not safely apply (e.g. legislation.gov.uk
    // contradicted it) -> treat as escalate now; do not loop pointlessly.
    const couldNot = (fixRes && fixRes.could_not_apply) || (fixRes ? [] : ['fix agent failed/returned nothing'])
    if (couldNot.length) {
      const unresolved = couldNot.map(s => `${s} [escalate: fix could not be applied at source]`)
      result = { slug, all_clear: false, rounds: round, signoff: verdict.signoff, unresolved, verdict }
      break
    }
    // else loop to round+1 and RE-QA the now-edited page.
  }

  // (5) Safety net: if the loop exhausted maxRounds without all_clear and without
  // an explicit escalate/stop above (last round did a fix then ran out), fall back
  // to the residual failing items from the final verdict.
  if (!result) {
    const residual = collectFailing(verdict || {}).map(i => `${i.text} [escalate: maxRounds reached, still failing]`)
    result = { slug, all_clear: false, rounds: maxRounds,
      signoff: (verdict && verdict.signoff) || 'blocking-issues', unresolved: residual, verdict: verdict || { slug } }
  }

  // FINAL per-page action: persist the full verdict object to disk via a tiny
  // record agent (Write tool). This leaves the data ready for the manager to run
  // qa_verdict.py record + coverage afterwards. We do NOT commit/deploy.
  await agent(
    `Write the following JSON EXACTLY (verbatim, no edits) to the file ${cachePath} on disk, creating the optimisation_engine/.cache/qa_runner/${batch}/ directory first if it does not exist (e.g. \`mkdir -p optimisation_engine/.cache/qa_runner/${batch}\` then Write the file). This is the full independent-QA verdict object for slug "${slug}"; the manager reads it later with scripts/qa_verdict.py. Do NOT run git, do NOT commit, do NOT deploy. After writing, return {slug:"${slug}", written:true, path:"${cachePath}"}.

JSON to write:
${JSON.stringify(result.verdict, null, 2)}`,
    { label: `record:${slug}`, phase: 'Record', schema: RECORD_SCHEMA }
  ).catch(() => null)

  return result
}

// Each page is an independent rolling chain; parallel() auto-caps concurrency and
// barriers. A throwing thunk yields null, which we filter out below.
const results = await parallel(slugs.map(slug => () => processPage(slug)))

const ok = results.filter(Boolean)
const clearCount = ok.filter(r => r.all_clear).length
const escalatedPages = ok.filter(r => !r.all_clear)
const escalatedSlugs = escalatedPages.map(r => r.slug)
log(`QA-autofix: ${clearCount}/${ok.length} all_clear, ${escalatedPages.length} escalated${escalatedSlugs.length ? ' (' + escalatedSlugs.join(', ') + ')' : ''}`)

// COMPACT manifest - this is all the manager reads (per-slug full verdicts live on disk).
return {
  batch,
  total: ok.length,
  all_clear: clearCount,
  escalated: escalatedPages.length,
  pages: ok.map(r => ({ slug: r.slug, all_clear: r.all_clear, rounds: r.rounds, signoff: r.signoff, unresolved: r.unresolved })),
  note: `verdicts written to optimisation_engine/.cache/qa_runner/${batch}/<slug>.json; manager runs qa_verdict.py record+coverage, gate, build, commit`,
}
