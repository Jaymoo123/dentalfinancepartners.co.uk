export const meta = {
  name: 'voice-rewrite',
  description: 'Humanise Engine core: per page, snapshot -> Opus editorial voice rewrite -> five checks (safety-diff, query-coverage, voice re-scan, factual-fidelity, voice-quality) -> revert+retry on any fail -> self-commit each verified page. One page at a time; resumable via the tracker + git.',
  phases: [
    { title: 'Humanise', detail: 'snapshot + Opus editorial voice rewrite (facts frozen)' },
    { title: 'Verify', detail: 'safety-diff + coverage + voice re-scan + fidelity + voice-quality' },
    { title: 'Commit', detail: 'commit + push verified page, update tracker (or escalate)' },
  ],
}

// ------------------------------------------------------------------ args ---- #
const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const slugs = A.slugs || []
const site = A.site || 'property'
// Absolute worktree root - the .wf.js runtime has no fs, and the agents' cwd is
// the main tree, so EVERY path below is absolute into the humanise worktree.
const WT = A.worktree || 'C:/Users/user/Documents/Accounting-wt-property-humanise'
const maxAttempts = A.attempts || 3
const doPush = A.push !== false

// Per-site config (mirrors sites/<site>.json; no fs in this runtime).
const SITES = {
  property: {
    blogDir: 'Property/web/content/blog',
    hp: 'docs/property/house_positions.md',
    adviser: 'UK property tax accountant',
    tracker: 'docs/property/humanise_tracker.md',
    branch: 'property-humanise',
  },
}
const cfg = SITES[site]
if (!cfg) throw new Error(`voice_rewrite: unknown site '${site}'. Add a SITES entry.`)
if (!slugs.length) { log('No slugs in args.slugs'); return [] }
log(`Humanise: ${slugs.length} page(s), site=${site}, attempts<=${maxAttempts}, push=${doPush}`)

const COAUTHOR = 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>'

// --------------------------------------------------------------- schemas ---- #
const PRE_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['slug', 'robot_before', 'band_before'],
  properties: { slug: { type: 'string' }, robot_before: { type: 'number' },
    band_before: { type: 'string' } } }

const HUMANISE_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['slug', 'done', 'words_before', 'words_after'],
  properties: { slug: { type: 'string' }, done: { type: 'boolean' },
    words_before: { type: 'number' }, words_after: { type: 'number' },
    note: { type: 'string' } } }

const DET_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['slug', 'safety_passed', 'safety_detail', 'coverage_passed',
             'coverage_missing', 'robot_after', 'band_after', 'americanisms'],
  properties: {
    slug: { type: 'string' },
    safety_passed: { type: 'boolean', description: 'voice_safety_diff check exit 0' },
    safety_detail: { type: 'string', description: 'one-line of any removed/added figures/citations/links/frontmatter, else "clean"' },
    coverage_passed: { type: 'boolean', description: 'track2_query_coverage "passed" field' },
    coverage_missing: { type: 'array', items: { type: 'string' }, description: 'any missing_queries' },
    robot_after: { type: 'number', description: 'voice_scan robot_score after' },
    band_after: { type: 'string', description: 'voice_scan band after' },
    americanisms: { type: 'number', description: 'voice_scan S7 americanisms count (must be 0 for British-English lock)' },
    html_ok: { type: 'boolean', description: 'voice_html_check "passed" (frontmatter parses + HTML balanced + no leaked markdown)' },
    html_detail: { type: 'string', description: 'one-line of any build-safety errors, else "clean"' },
  } }

const FIDELITY_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['slug', 'facts_faithful', 'issues'],
  properties: { slug: { type: 'string' },
    facts_faithful: { type: 'boolean', description: 'true if NO factual claim changed meaning (obligation/condition/negation/scope/who-does-what/dates-in-words) between before and after' },
    issues: { type: 'array', items: { type: 'string' } } } }

const VOICE_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['slug', 'human_ok', 'nothing_lost', 'issues'],
  properties: { slug: { type: 'string' },
    human_ok: { type: 'boolean', description: 'reads like a genuine senior adviser wrote it for a human (no abstract-noun voice, no meta-commentary, no structural/SEO talk, no signposting, no em-dashes)' },
    nothing_lost: { type: 'boolean', description: 'no substance, nuance or worked-example detail was dropped vs the original (only voice changed)' },
    issues: { type: 'array', items: { type: 'string' } } } }

const COMMIT_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['slug', 'committed'], properties: {
    slug: { type: 'string' }, committed: { type: 'boolean' },
    commit_sha: { type: 'string' }, note: { type: 'string' } } }

const REVERT_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['slug', 'reverted'], properties: {
    slug: { type: 'string' }, reverted: { type: 'boolean' } } }

// --------------------------------------------------------------- prompts ---- #
const VOICE_RULES = `VOICE STANDARD (authoritative file: ${WT}/docs/_engines/VOICE_STANDARD.md - READ IT FIRST). Rewrite ONLY the voice:
1. Second person by default ("you"/"your"), not "the landlord/taxpayer/investor/individual/operator/recipient/owner". KEEP the noun only where it is: a named worked-example persona/company (Mr Quayle, Crosby Properties Ltd), a genuine industry term in context (serviced-accommodation/FHL "operator", IHT "donor/donee", a transaction "buyer/seller/vendor", trust "settlor/trustee/beneficiary"), the OTHER party to the reader's transaction (the tenant, the seller), or a statutory definition.
2. Delete ALL meta-commentary ("this guide/page covers/walks", "in this guide", "we cover", "in the sections that follow", "the page's first concrete artefact", "this is the ... playbook"). State the substance directly.
3. Delete ALL structural/SEO talk ("pillar", "cluster", "child/parent guide", "sibling page", "bucket sibling page C5", "forward-link", "see our pillar"). Internal orchestration words (bucket/lane/wave/batch ids) must never appear.
4. Delete signposting ("Moreover/Furthermore/In addition/It is worth noting/Notably/Crucially/delve into/when it comes to").
5. No em-dashes (U+2014). Use commas, parentheses, full stops, middle dots.
6. Cut genuine padding (restatement, throat-clearing intros, restate-only conclusions). Never pad to a length. Keep the real depth (worked examples, tables, statutory detail).
7. BRITISH ENGLISH for a UK audience: -ise / -isation spellings (organise, optimise, analyse, recognise, realise), UK terms and idiom (HMRC, a tax return, Self Assessment, £, VAT, "property" not "real estate", "maths" not "math", "whilst", "licence" the noun). NO American spellings or idiom (color, center, favor, behavior, defense, fulfill, enrollment, organize, optimize, analyze, "real estate", "math", "gotten").
8. AUTHORITATIVE AND GENUINELY ENGAGING (never clickbait): open with the reader's STAKE (the cost, risk or opportunity to YOU, not a textbook definition); hold a clear, confident senior-adviser point of view (cut endless hedging); make it scannable (short paragraphs, H2s phrased as the reader's real question, key figures in <strong> where it helps a skimmer); close so the next step is obvious (a natural, non-salesy lead into getting expert help, the lead form follows the body). NO hype, NO "save thousands", NO fake urgency. Enticing = clear, specific, confident, backed by real substance. This REFRAMES existing facts to engage; it adds NO new claim or figure (the guard reverts that) and does NOT touch metaTitle / metaDescription / h1.`

const PRESERVE = `PRESERVATION CONTRACT (a deterministic guard verifies this; breaking it reverts the page):
- Change NO figure (rate, %, £ amount, threshold, date, year, year-tag, number+unit), NO statute/section/Finance Act/treaty Article/Schedule/Part/paragraph citation, NO internal /blog link (if you delete the meta-commentary around a link, RE-HOME the link into natural prose; never lose it).
- Do NOT change protected frontmatter: slug, category, metaTitle, metaDescription, h1, canonical, date, dateModified, reviewedBy, reviewerCredentials, reviewedAt, author, image, altText. Do NOT change any FAQ QUESTION (they are query-bearing) or the FAQ count or howToSteps count. You MAY voice-edit FAQ ANSWERS and the summary, but every figure/citation inside them stays.
- Preserve every target query/keyword the page serves (a coverage check verifies this). Keep query-bearing H2 phrasing; reword for voice without dropping the query terms.
- Body stays raw HTML (<h2>,<h3>,<p>,<ul><li>,<table>); never markdown. Keep all <table> and <aside> blocks.`

// ------------------------------------------------------------------ loop ---- #
const results = []
for (const slug of slugs) {
  const blogPath = `${WT}/${cfg.blogDir}/${slug}.md`

  // Snapshot the original bytes + capture the pre-edit robot score (ONCE).
  const pre = await agent(
    `Single page setup for "${slug}" (${site}). Run BOTH commands and report:
1) python ${WT}/scripts/voice_safety_diff.py snapshot --slug ${slug} --site ${site}
2) python ${WT}/scripts/voice_scan.py --slug ${slug} --site ${site} --json
Return {slug:"${slug}", robot_before: the robot_score from (2), band_before: the band from (2)}.`,
    { label: `pre:${slug}`, phase: 'Humanise', schema: PRE_SCHEMA })
  const robotBefore = pre.robot_before

  let attempt = 0, passed = false, fails = [], robotAfter = null, wordsBefore = null, wordsAfter = null

  while (attempt < maxAttempts && !passed) {
    attempt++
    const retryNote = fails.length
      ? `\n\nThis is RETRY ${attempt}. The previous attempt FAILED these checks - fix them, do not repeat the mistake:\n- ${fails.join('\n- ')}`
      : ''

    const hum = await agent(
      `You are a senior ${cfg.adviser} and editor. Humanise the VOICE of the live page ${blogPath} in place. The page is factually correct and already ranks; you are ONLY making it read like a real human expert wrote it, not a robot.
${VOICE_RULES}
${PRESERVE}
Steps: read ${blogPath} in full; read ${WT}/docs/_engines/VOICE_STANDARD.md; rewrite the body prose (and summary / FAQ answers) in place with the Edit/Write tools applying the rules above; keep every fact, citation, link and protected frontmatter field exactly. Do not pad. When done, return {slug:"${slug}", done:true, words_before, words_after}.${retryNote}`,
      { label: `humanise:${slug}#${attempt}`, phase: 'Humanise', schema: HUMANISE_SCHEMA })
    wordsBefore = hum.words_before; wordsAfter = hum.words_after

    // Deterministic checks C1-C3 (one agent runs the three tools, reports JSON).
    const det = await agent(
      `Run these FOUR deterministic checks for ${slug} and report their output faithfully (do not judge, just run and copy the numbers):
1) python ${WT}/scripts/voice_safety_diff.py check --slug ${slug} --site ${site} --json
   -> safety_passed = (its "passed" is true); safety_detail = a one-line summary of any removed/added figures, citations, links, or frontmatter_mismatches (or "clean").
2) python ${WT}/scripts/track2_query_coverage.py --slug ${slug} --json
   -> coverage_passed = its "passed"; coverage_missing = its missing_queries (query strings), or [].
3) python ${WT}/scripts/voice_scan.py --slug ${slug} --site ${site} --json
   -> robot_after = its robot_score; band_after = its band; americanisms = its s7_americanisms.count.
4) python ${WT}/scripts/voice_html_check.py --slug ${slug} --site ${site} --json
   -> html_ok = its "passed"; html_detail = a one-line of its errors (or "clean").
Return the structured result.`,
      { label: `checks:${slug}#${attempt}`, phase: 'Verify', schema: DET_SCHEMA })

    robotAfter = det.robot_after
    const voiceImproved = (det.robot_after < robotBefore) &&
      (det.band_after === 'clean' || det.band_after === 'minor')
    const britishOk = (det.americanisms === 0)
    const htmlOk = (det.html_ok !== false)

    if (!(det.safety_passed && det.coverage_passed && voiceImproved && britishOk && htmlOk)) {
      fails = []
      if (!det.safety_passed) fails.push(`SAFETY-DIFF failed (a fact/citation/link/frontmatter changed): ${det.safety_detail}. You MUST preserve every figure, citation, internal link and protected frontmatter field.`)
      if (!det.coverage_passed) fails.push(`QUERY-COVERAGE failed: these queries are no longer served: ${(det.coverage_missing || []).join('; ')}. Restore the query-bearing phrasing in an H2/FAQ/body.`)
      if (!voiceImproved) fails.push(`VOICE not improved enough: robot_score ${det.robot_after} (band ${det.band_after}) vs before ${robotBefore}. Remove more abstract-noun voice / meta-commentary / structural talk / signposting.`)
      if (!britishOk) fails.push(`BRITISH ENGLISH failed: ${det.americanisms} American spelling(s)/idiom found (voice_scan S7). Rewrite in British English throughout (-ise spellings, UK terms; no color/center/organize/optimize/analyze/"real estate"/"math"/"gotten").`)
      if (!htmlOk) fails.push(`BUILD-SAFETY failed: ${det.html_detail}. Fix the body HTML (balanced tags, valid frontmatter YAML, no leaked markdown like "## " or "- " lines).`)
      await agent(
        `Revert ${slug}: run python ${WT}/scripts/voice_safety_diff.py restore --slug ${slug} --site ${site}. Confirm it reverted the page to the pre-edit bytes. Return {slug:"${slug}", reverted:true}.`,
        { label: `revert:${slug}#${attempt}`, phase: 'Verify', schema: REVERT_SCHEMA })
      continue
    }

    // C4 factual fidelity (Opus: meaning preserved beyond the frozen tokens).
    const before = `${WT}/optimisation_engine/.cache/humanise/${site}/${slug}.before.md`
    const fid = await agent(
      `Factual-fidelity review for ${slug}. The deterministic guard already proved every NUMBER and CITATION is byte-identical; your job is the SEMANTIC layer it cannot see. Read the ORIGINAL ${before} and the REWRITE ${blogPath}. For every factual claim, confirm the rewrite did NOT change its meaning: obligations (must vs should vs may), conditions/eligibility, negations, scope/limits, who-does-what, deadlines and numbers expressed in WORDS, and the direction of any comparison. Set facts_faithful=false and list each drift in issues[] if anything changed meaning. Default to false if unsure. Return the structured verdict.`,
      { label: `fidelity:${slug}#${attempt}`, phase: 'Verify', schema: FIDELITY_SCHEMA })
    if (!fid.facts_faithful) {
      fails = [`FACTUAL FIDELITY failed: ${(fid.issues || []).join('; ')}. Reword for voice WITHOUT changing the meaning of any claim.`]
      await agent(`Revert ${slug}: python ${WT}/scripts/voice_safety_diff.py restore --slug ${slug} --site ${site}. Return {slug:"${slug}", reverted:true}.`,
        { label: `revert:${slug}#${attempt}`, phase: 'Verify', schema: REVERT_SCHEMA })
      continue
    }

    // C5 voice quality + completeness (Opus, fresh lens).
    const vq = await agent(
      `Voice-quality sign-off for ${slug}. Read the ORIGINAL ${before} and the REWRITE ${blogPath}. Judge TWO things: (a) human_ok = does the rewrite read like a genuine senior ${cfg.adviser} wrote it for a human - second person where the reader is meant, NO abstract-noun voice, NO meta-commentary, NO pillar/cluster/structural talk, NO signposting, NO em-dashes? (b) nothing_lost = was NO substance, nuance, worked-example detail, table or useful explanation dropped (only voice changed, depth preserved)? Set either false with specifics in issues[] if not met. Return the structured verdict.`,
      { label: `voiceread:${slug}#${attempt}`, phase: 'Verify', schema: VOICE_SCHEMA })
    if (!(vq.human_ok && vq.nothing_lost)) {
      fails = []
      if (!vq.human_ok) fails.push(`VOICE QUALITY: still not human enough: ${(vq.issues || []).join('; ')}`)
      if (!vq.nothing_lost) fails.push(`COMPLETENESS: substance was dropped: ${(vq.issues || []).join('; ')}. Preserve all depth; only change voice.`)
      await agent(`Revert ${slug}: python ${WT}/scripts/voice_safety_diff.py restore --slug ${slug} --site ${site}. Return {slug:"${slug}", reverted:true}.`,
        { label: `revert:${slug}#${attempt}`, phase: 'Verify', schema: REVERT_SCHEMA })
      continue
    }

    passed = true
  }

  if (passed) {
    const row = `| ${slug} | done | ${pre.band_before} | ${robotBefore} | ${robotAfter} | ${attempt} | (this commit) | 2026-06-06 | voice-only, all 5 checks passed |`
    const commit = await agent(
      `Commit the verified humanised page ${slug} in the worktree ${WT}. Steps IN ORDER:
1) Edit ${WT}/${cfg.tracker}: insert this row immediately BEFORE the line "<!-- conductor appends one row per processed page below this line -->":
${row}
2) git -C ${WT} add ${cfg.blogDir}/${slug}.md ${cfg.tracker}
3) git -C ${WT} commit -m "Humanise: ${slug} (robot ${robotBefore} -> ${robotAfter})" -m "${COAUTHOR}"
${doPush ? `4) git -C ${WT} push` : '4) (skip push)'}
Return {slug:"${slug}", committed:true, commit_sha: the short sha from the commit output}.`,
      { label: `commit:${slug}`, phase: 'Commit', schema: COMMIT_SCHEMA })
    results.push({ slug, status: 'done', robot_before: robotBefore, robot_after: robotAfter,
      words_before: wordsBefore, words_after: wordsAfter, attempts: attempt, commit_sha: commit.commit_sha })
    log(`done: ${slug} (robot ${robotBefore} -> ${robotAfter}, ${attempt} attempt(s))`)
  } else {
    const reasons = fails.join(' | ').replace(/\|/g, '/')
    const row = `| ${slug} | escalate | ${pre.band_before} | ${robotBefore} | ${robotAfter || ''} | ${attempt} | - | 2026-06-06 | ${reasons.slice(0, 160)} |`
    await agent(
      `Escalate ${slug} (could not pass within ${maxAttempts} attempts). Steps:
1) Ensure the original is intact: python ${WT}/scripts/voice_safety_diff.py restore --slug ${slug} --site ${site}
2) Edit ${WT}/${cfg.tracker}: insert this row before the "<!-- conductor appends" marker:
${row}
3) git -C ${WT} add ${cfg.tracker} && git -C ${WT} commit -m "Humanise: escalate ${slug} (needs manual)" -m "${COAUTHOR}"${doPush ? ' && git -C ' + WT + ' push' : ''}
Return {slug:"${slug}", committed:false, note:"escalated"}.`,
      { label: `escalate:${slug}`, phase: 'Commit', schema: COMMIT_SCHEMA })
    results.push({ slug, status: 'escalate', robot_before: robotBefore, attempts: attempt, fails })
    log(`escalate: ${slug} after ${attempt} attempt(s): ${reasons.slice(0, 120)}`)
  }
}

const done = results.filter(r => r.status === 'done').length
const esc = results.filter(r => r.status === 'escalate').length
log(`Humanise batch complete: ${done} done, ${esc} escalate of ${results.length}`)
return results
