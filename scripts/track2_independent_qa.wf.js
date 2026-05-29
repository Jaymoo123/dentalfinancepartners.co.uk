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
  required: ['slug', 'signoff', 'issues', 'strengths', 'expert_plausible'],
  properties: {
    slug: { type: 'string' },
    signoff: { type: 'string', enum: ['sign-off', 'minor-issues', 'blocking-issues'],
      description: 'sign-off = a UK property accountant would publish this as-is; minor-issues = publish but tidy; blocking-issues = do not leave live' },
    issues: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['severity', 'type', 'detail'],
      properties: {
        severity: { type: 'string', enum: ['blocking', 'minor'] },
        type: { type: 'string', description: 'factual / statute / pricing / stale / cannibalisation / writing / structure / other' },
        detail: { type: 'string' } } } },
    strengths: { type: 'string', description: 'what is genuinely good' },
    expert_plausible: { type: 'boolean', description: 'Would a qualified UK property tax accountant find nothing embarrassing or wrong here?' },
  },
}

const results = await parallel(slugs.map(slug => () =>
  agent(
    `You are an INDEPENDENT senior UK property tax accountant (ATT/CTA level) doing a final sign-off review of a live page on a client lead-gen site, before deciding whether it can stay published. You did NOT write it and you are skeptical: your job is to find anything wrong, not to confirm it is fine. This is a DIFFERENT lens from the original drafting QA, do not assume prior checks were correct, re-derive.

Read Property/web/content/blog/${slug}.md (frontmatter + body). Then judge it as a publishing reviewer:
1. FACTUAL/STATUTE: Is every tax claim correct for 2026/27 UK? Independently check any statute/section/rate against legislation.gov.uk or gov.uk (WebFetch). Watch for: wrong Act attribution, wrong rates, MTD/Section 24/FHL/CGT/2027-rate errors, Scotland/Wales devolution mistakes (Scottish income tax rates set by Holyrood; Welsh LTT/Rent Smart Wales). Flag anything a real accountant would catch.
2. PRICING/COMPLIANCE: ANY firm fee figures, fee ranges, hourly rates, or percentage-of-rent fees = blocking (lead-gen model bans on-site pricing). Legitimate tax figures (£3,000 AEA, SDLT bands, MTD thresholds) are fine.
3. WRITING QUALITY: Does it read as expert, specific, and human (not generic AI filler or keyword-stuffed)? Any em-dashes? Any leaked markup or broken HTML? Does the local/city/topic specificity ring true or is it vague boilerplate?
4. CANNIBALISATION/LINKS: Does it duplicate a stronger sibling? Do internal links resolve?
5. OVERALL: Would you, as the reviewing accountant, be comfortable with this live on a client's site, or would something embarrass you?

Return the structured verdict. Be specific and cite what you checked. Default to flagging if unsure.`,
    { label: `qa:${slug}`, phase: 'QA', schema: SCHEMA }
  ).then(r => r).catch(() => null)
))

const ok = results.filter(Boolean)
const c = (v) => ok.filter(r => r.signoff === v).length
const blocking = ok.flatMap(r => (r.issues||[]).filter(i => i.severity === 'blocking').map(i => `${r.slug}: ${i.type} - ${i.detail}`))
log(`QA: ${c('sign-off')} sign-off, ${c('minor-issues')} minor, ${c('blocking-issues')} blocking | ${blocking.length} blocking issues total`)
return { summary: { signoff: { signoff: c('sign-off'), minor: c('minor-issues'), blocking: c('blocking-issues') }, blocking_issues: blocking }, pages: ok }
