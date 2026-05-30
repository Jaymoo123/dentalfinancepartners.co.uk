export const meta = {
  name: 'track2-independent-qa',
  description: 'Independent second-opinion QA on already-live Track 2 pages: a skeptical senior UK property-tax reviewer doing final sign-off, fresh angle from the writers own verify',
  phases: [{ title: 'QA', detail: 'independent expert sign-off review per page' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const slugs = A.slugs || []
if (!slugs.length) { log('No slugs'); return [] }
log(`Independent QA on ${slugs.length} live pages`)

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['slug', 'signoff', 'issues', 'strengths', 'expert_plausible',
             'arithmetic_recomputed', 'statute_checks', 'links_resolve', 'all_clear'],
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
    strengths: { type: 'string', description: 'what is genuinely good' },
    expert_plausible: { type: 'boolean', description: 'Would a qualified UK property tax accountant find nothing embarrassing or wrong here?' },
    all_clear: { type: 'boolean', description: 'THE DEPLOY-GATE SIGNAL. TRUE only if ALL hold: no blocking issues AND every arithmetic_recomputed.agrees===true AND every statute_checks entry has exists && content_supports_claim && royal_assent_ok AND links_resolve===true. If any fails, all_clear MUST be false.' },
  },
}

const results = await parallel(slugs.map(slug => () =>
  agent(
    `You are an INDEPENDENT senior UK property tax accountant (ATT/CTA level) doing a final sign-off review of a live page on a client lead-gen site, before deciding whether it can stay published. You did NOT write it and you are skeptical: your job is to find anything wrong, not to confirm it is fine. This is a DIFFERENT lens from the original drafting QA, do not assume prior checks were correct, re-derive.

Read Property/web/content/blog/${slug}.md (frontmatter + body). Then judge it as a publishing reviewer. TWO of these are NON-NEGOTIABLE and must be done by RE-DERIVATION, not by reading-and-nodding (this is exactly where the previous QA failed: it judged plausibility and let backwards arithmetic and unenacted-statute framing ship):

1. ARITHMETIC (re-derive, do NOT trust the page): find EVERY worked example and numeric claim. Recompute each one yourself from first principles and record it in arithmetic_recomputed[] with the page's figure, your figure, and whether they agree. Watch the known trap: the April-2027 Section 24 reducer RISES to 22% in step (FA 2026 Sch 1), so a basic-rate landlord gets NO new wedge and the higher/additional wedge is 20pp/25pp - the "credit stays at 20%, wedge widens" framing is BACKWARDS. The 2027/28 reducer = 22% x (lower of finance costs / profit-before-finance-costs / income above PA).
2. STATUTE (WebFetch each, verify substance + Royal Assent): for EVERY statute/section/Finance Act cited, WebFetch legislation.gov.uk and record it in statute_checks[]: does the section exist, does its operative wording actually support the page's claim (not just that the URL loads - F-8: TCGA 1992 s.4 was gutted by amendment while the URL stayed live), and for any Finance Act is the Royal Assent date verified and consistent with the framing (FA 2026 received RA 18 March 2026 - "draft / awaiting Royal Assent" is now STALE). Section 24 lives in ITTOIA 2005 ss.272A/274A (NOT ITA 2007). Catch Scotland/Wales devolution mistakes (the 2027 property rates are England + NI only). SECONDARY-SOURCE RULE (mandatory for any figure/rate changed in the last ~18 months - anything tied to FA 2025/FA 2026 or dated 2025/2026, e.g. the 14% main-pool WDA, the 40% FYA, the 2027 property rates, APR/BPR caps, dividend rates): legislation.gov.uk's "Latest available (revised)" view can LAG in applying an enacted amendment and silently serve the OLD text (sometimes with a "changes not yet applied" note). So you MUST corroborate every recently-changed figure against a SECOND source - the GOV.UK measure/policy paper or the relevant HMRC manual - and only set content_supports_claim=true if BOTH agree; note the secondary source in the citation string. A single-source legislation.gov.uk PASS on a recently-changed figure is NOT sufficient.
3. PRICING/COMPLIANCE: ANY firm fee figures, fee ranges, hourly rates, or percentage-of-rent fees = blocking (lead-gen model bans on-site pricing). Legitimate tax figures (£3,000 AEA, SDLT bands, MTD thresholds) are fine.
4. LINKS: confirm every internal /blog link resolves (set links_resolve). The deterministic auditor is scripts/track2_link_audit.py - a correct slug under the wrong category 404s.
5. WRITING QUALITY: expert, specific, human (not generic AI filler)? Any em-dashes? Leaked markup / broken HTML? Does local/topic specificity ring true?
6. CANNIBALISATION: does it duplicate a stronger sibling?

Then set all_clear per its definition: TRUE only if no blocking issue AND every arithmetic example agrees AND every statute check passes (exists + content_supports_claim + royal_assent_ok) AND links_resolve. Any failure => all_clear:false and the relevant issue logged as severity "blocking". Be specific and cite what you checked. Default to flagging if unsure.`,
    { label: `qa:${slug}`, phase: 'QA', schema: SCHEMA }
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
