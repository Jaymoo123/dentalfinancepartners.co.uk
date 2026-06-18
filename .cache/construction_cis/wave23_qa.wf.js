export const meta = {
  name: 'construction-cis-wave23-qa',
  description: 'QA chain for construction-cis wave-2+3 (41 posts): judge panel + fact-audit in parallel per post, then apply fixes',
  phases: [
    { title: 'Review', detail: 'judge (Sonnet cluster / Opus pillar) + Opus fact-audit, concurrent per post' },
    { title: 'Apply', detail: 'one writer per post applies judge repairs + fact corrections + meta trims' },
  ],
}

const ROOT = 'C:/Users/user/Documents/Accounting'
const HP = ROOT + '/docs/construction-cis/house_positions.md'
const BLOG = ROOT + '/construction-cis/web/content/blog'

const pillars = new Set([
  'best-cis-accounting-software',
  'cis-april-2026-rule-changes',
  'cis-back-years-refund-guide',
  'cis-self-assessment-complete-guide',
  'cis-vs-paye-complete-comparison',
  'gross-payment-status-cash-flow-guide',
])
const posts = [
  'best-cis-accounting-software', 'cis-and-mortgages', 'cis-april-2026-rule-changes',
  'cis-back-years-refund-guide', 'cis-contractor-registration-guide', 'cis-deadline-calendar-2026-27',
  'cis-employment-status-self-employed-test', 'cis-for-contractors-monthly-responsibilities',
  'cis-for-housebuilders', 'cis-for-labour-agencies', 'cis-for-limited-companies-eps-reclaim',
  'cis-for-partnerships', 'cis-for-property-developers', 'cis-invoice-splitting-labour-materials',
  'cis-limited-company-directors-guide', 'cis-mistakes-that-cost-subcontractors',
  'cis-national-insurance-guide', 'cis-payment-deduction-statements-guide', 'cis-payroll-software-guide',
  'cis-penalties-and-appeals', 'cis-plant-hire-guide', 'cis-record-keeping-guide',
  'cis-retention-payments-guide', 'cis-self-assessment-complete-guide',
  'cis-supply-chain-compliance-due-diligence', 'cis-vs-paye-complete-comparison',
  'citb-levy-explained', 'deemed-contractors-explained', 'freeagent-cis-guide',
  'free-cis-payroll-software', 'gross-payment-status-cash-flow-guide', 'how-long-does-cis-refund-take',
  'how-much-cis-refund-will-i-get', 'quickbooks-cis-guide', 'sage-cis-guide',
  'spreadsheets-vs-accounting-software-cis', 'switching-cis-accountant-guide',
  'vat-reverse-charge-for-cis-contractors', 'vat-reverse-charge-for-cis-subcontractors',
  'what-construction-work-is-not-cis', 'xero-cis-guide',
]

const JUDGE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    verdict: { enum: ['SHIP', 'REPAIR'] },
    summary: { type: 'string' },
    meta_title_ok: { type: 'boolean' },
    meta_desc_ok: { type: 'boolean' },
    repairs: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          location: { type: 'string' },
          problem: { type: 'string' },
          fix: { type: 'string' },
          severity: { enum: ['blocker', 'minor'] },
        },
        required: ['location', 'problem', 'fix', 'severity'],
      },
    },
  },
  required: ['verdict', 'summary', 'meta_title_ok', 'meta_desc_ok', 'repairs'],
}

const FACT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    clean: { type: 'boolean' },
    corrections: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          location: { type: 'string' },
          current_text: { type: 'string' },
          problem: { type: 'string' },
          correct_value: { type: 'string' },
          confidence: { enum: ['high', 'medium', 'low'] },
        },
        required: ['location', 'current_text', 'problem', 'correct_value', 'confidence'],
      },
    },
  },
  required: ['clean', 'corrections'],
}

const APPLY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    changed: { type: 'boolean' },
    edits_made: { type: 'array', items: { type: 'string' } },
    flagged_for_manager: { type: 'array', items: { type: 'string' } },
    final_meta_title_len: { type: 'number' },
    final_meta_desc_len: { type: 'number' },
  },
  required: ['changed', 'edits_made', 'flagged_for_manager', 'final_meta_title_len', 'final_meta_desc_len'],
}

function judgePrompt(slug) {
  return `You are an A*-standard content judge for the construction-cis site (Trade Tax Specialists), a UK CIS / construction-accounting lead-generation site for sole traders and limited-company directors in construction trades.

Read these two files first:
1. Ground truth (every figure must match this): ${HP}
2. The post under review: ${BLOG}/${slug}.md

Judge the post against a gold-standard bar: it must be genuinely authoritative, never thin, never AI-scammy, never something an examiner would flag as generic. Check, specifically:
- DEPTH & STRUCTURE: clear H2 sections, worked examples with real numbers where the topic warrants, 6+ genuine FAQs, logical flow.
- HP CONSISTENCY: every tax rate, threshold, deadline and statutory reference matches ${HP}. Flag ANY divergence.
- BRAND RULES (house_positions): faceless brand (no named experts/quotes; no self-ranking us in "best" lists); CIS refund framed as an entry/advisory service, not a DIY rebate factory; no pricing of our own services, no client names.
- STYLE: British English; ZERO em-dashes or en-dashes (the characters U+2014 and U+2013); body must be raw HTML (<p>, <h2>, <table>...), never markdown syntax; no AI tells ("In today's fast-paced world", "It's worth noting", "Whether you're...").
- INTERNAL LINKS: present, relevant, and plausibly resolving.
- META LENGTHS: set meta_title_ok = ((length of the frontmatter metaTitle string) + 24) <= 65  (24 = the " | Trade Tax Specialists" suffix appended at render). Set meta_desc_ok = (length of metaDescription) <= 160.

Return verdict SHIP if it is publishable as-is, or REPAIR with a specific, surgical repair list (each: exact location, the problem, the precise fix to make, severity). Be a tough but fair judge: only REPAIR for genuine defects, not stylistic preference. Do NOT edit any file; diagnose only.`
}

function factPrompt(slug) {
  return `You are an Opus fact-auditor for the construction-cis site (UK Construction Industry Scheme / construction accounting). Accuracy is everything.

Read ${HP} (house positions = pinned ground truth) and the post ${BLOG}/${slug}.md.

Your ONLY job: verify every concrete factual claim in the post — tax rates, thresholds, deadlines, GBP amounts, percentages, accounting-software prices, worked-example arithmetic, statutory/regulation references — against (a) house_positions.md and (b) current 2026/27 UK reality. Use web search to verify anything NOT pinned by house_positions (e.g. current Xero / QuickBooks / Sage / FreeAgent plan prices and whether CIS is included, CITB levy rates and thresholds, specific statutory section numbers, HMRC penalty figures). Keep searches focused and efficient.

Pinned 2026/27 ground truth (block anything that contradicts these):
- AMAP mileage 55p/mile first 10k miles from 6 Apr 2026 (block 45p as a current rate).
- Dividend rates 10.75% / 35.75% / 39.35% from 6 Apr 2026 (block 8.75% / 33.75% as current).
- Employer NIC 15% above a 5,000 secondary threshold (block 13.8% / 9,100 as current).
- Class 4 NIC 6% main / 2% above UPL (block 9%).
- Class 2 NIC: 0 payable above the 7,105 small-profits threshold for 2026/27 (block a flat weekly Class 2 charge).
- SSP 123.25/week; Personal Allowance 12,570.
- CIS deductions: 20% registered, 30% unverified, 0% gross payment status.
- MTD for ITSA: 50,000 gross-income threshold from Apr 2026; quarterly update deadlines on the 7th.
Re-check every worked example line by line for arithmetic errors.

Return clean=true ONLY if every figure is correct. Otherwise list each correction: the exact current text, the problem, the correct value, and your confidence. Do NOT edit the file.`
}

function applyPrompt(slug, judge, facts) {
  return `You are a careful, senior content editor for the construction-cis site (Trade Tax Specialists). Apply fixes to EXACTLY ONE file and no other: ${BLOG}/${slug}.md

Apply ONLY the following changes, surgically, using the Edit tool:

1. META LENGTHS:
   - Ensure the frontmatter metaTitle is short enough that (len(metaTitle) + 24) <= 65 — i.e. metaTitle <= 41 characters. The render appends " | Trade Tax Specialists" automatically, so do NOT add it yourself. If it is too long, rewrite metaTitle to <= 41 chars while keeping the primary keyword. Aim for a rendered length of 55-63.
   - Ensure metaDescription is <= 160 characters (aim 140-158), compelling, and keyword-bearing. Trim, do not gut.

2. JUDGE REPAIRS (apply each):
${JSON.stringify(judge ? judge.repairs : [], null, 2)}

3. FACT CORRECTIONS (apply each high/medium-confidence one; for low confidence apply only if clearly correct, otherwise flag it):
${JSON.stringify(facts ? facts.corrections : [], null, 2)}

HARD CONSTRAINTS — never violate:
- NO em-dashes or en-dashes (U+2014, U+2013). Use commas, parentheses, full stops or middle dots.
- Body stays raw HTML; never introduce markdown syntax.
- Do NOT reduce overall depth or word count; do NOT delete FAQs or internal links.
- Every tax figure must match ${HP} and the fact corrections above.
- British English throughout.

After editing, report: changed (true/false), the list of edits you made, the final metaTitle character length and final metaDescription character length, and flag for manager review anything large/structural or ambiguous you could not safely resolve. If a repair would require risky restructuring, make the best conservative fix and flag it rather than degrade quality.`
}

const results = await pipeline(
  posts,
  // Stage 1: Review — judge + fact-audit concurrently
  async (slug) => {
    const isPillar = pillars.has(slug)
    const [judge, facts] = await Promise.all([
      agent(judgePrompt(slug), {
        label: `judge:${slug}`,
        phase: 'Review',
        schema: JUDGE_SCHEMA,
        agentType: 'general-purpose',
        ...(isPillar ? {} : { model: 'sonnet' }),
      }),
      agent(factPrompt(slug), {
        label: `fact:${slug}`,
        phase: 'Review',
        schema: FACT_SCHEMA,
        agentType: 'general-purpose',
      }),
    ])
    return { slug, isPillar, judge, facts }
  },
  // Stage 2: Apply — only if something needs fixing
  async (rev) => {
    const { slug, isPillar, judge, facts } = rev
    const needsApply =
      !judge || !facts ||
      judge.verdict === 'REPAIR' ||
      facts.clean === false ||
      judge.meta_title_ok === false ||
      judge.meta_desc_ok === false
    if (!needsApply) {
      return { slug, applied: false, judge, facts, apply: null }
    }
    const apply = await agent(applyPrompt(slug, judge, facts), {
      label: `apply:${slug}`,
      phase: 'Apply',
      schema: APPLY_SCHEMA,
      agentType: 'general-purpose',
      ...(isPillar ? {} : { model: 'sonnet' }),
    })
    return { slug, applied: true, judge, facts, apply }
  }
)

const clean = results.filter((r) => r && !r.applied)
const repaired = results.filter((r) => r && r.applied)
const flagged = repaired.filter((r) => r.apply && r.apply.flagged_for_manager && r.apply.flagged_for_manager.length)
log(`Review+Apply done. ${clean.length} ship-clean, ${repaired.length} repaired, ${flagged.length} with manager flags.`)

return {
  total: results.length,
  ship_clean: clean.map((r) => r.slug),
  repaired: repaired.map((r) => ({
    slug: r.slug,
    verdict: r.judge ? r.judge.verdict : 'JUDGE_FAILED',
    fact_clean: r.facts ? r.facts.clean : null,
    n_repairs: r.judge ? r.judge.repairs.length : 0,
    n_corrections: r.facts ? r.facts.corrections.length : 0,
    edits: r.apply ? r.apply.edits_made : null,
    flagged: r.apply ? r.apply.flagged_for_manager : ['APPLY_FAILED'],
    meta_title_len: r.apply ? r.apply.final_meta_title_len : null,
    meta_desc_len: r.apply ? r.apply.final_meta_desc_len : null,
  })),
  manager_flags: flagged.map((r) => ({ slug: r.slug, flags: r.apply.flagged_for_manager })),
}
