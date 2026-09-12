# F3 — promises and evidence claims, contractors-ir35

Swept by rule over `contractors-ir35/web/src`, `content/` (body + frontmatter), `niche.config.json`
and the shared modules this site mounts. All paths relative to `contractors-ir35/web/`.
`npx tsc --noEmit` clean; `npx vitest run` 405/405 pass.

## Changes made

| file:line (after) | before | after | rule breached | how found |
|---|---|---|---|---|
| `src/config/service-tiers.ts:64` | `{ icon: "⏱️", value: "24h", label: "Response guarantee" }` | `{ icon: "📚", value: "7", label: "Guide categories" }` | Timed turnaround promise, and "guarantee" on a promise nothing enforces. Renders on `/` and `/services` via `<StatsBar stats={siteStats} />` | rule sweep `within (24\|one\|two\|48)…\|24h\|working day\|same day\|right away\|guarantee` over `src` + config; the config-file shape the brief warned about |
| `src/config/service-tiers.ts:62` | `value: "58", label: "Contractor guides"` | `value: "62"` | Stale count. `ls content/blog/*.md` = 62, `grep -rl "^draft: true"` = 0 | counted files myself |
| `src/config/service-tiers.ts:56-58` | comments "58 guides: 58 .md files", "24h response: stated in page.tsx keyStats + contact section" | "62 guides … (0 drafts)", "7 guide categories: distinct `category:` values", plus "No response-time stat: timed turnaround promises are banned by standing rule." | Stale provenance that would mislead the next editor (the note claimed 2 surfaces where 4 existed) | read the block around the edited stat |
| `src/app/page.tsx:40` | `{ value: "24h", label: "Our response guarantee" }` | `{ value: "45 days", label: "Clients must answer an SDS disagreement" }` | Timed promise, second independent copy on the same page as the StatsBar one. Replaced rather than deleted because the bar is `grid-cols-2 md:grid-cols-4` and the other three entries are third-party/statutory facts; the replacement is ITEPA 2003 s.61T, already cited across the glossary and locations copy | rule sweep |
| `src/app/page.tsx:458` | `{ title: "24-hour response time", sub: "Usually the same day" }` | `{ title: "A specialist picks it up", sub: "Not a call-centre queue" }` | Timed promise, and the sub-line escalated below the stated 24h with no basis | rule sweep |
| `src/app/page.tsx:231-233` | label "Real outcomes" / h2 "What we have done for contractors" | label "Composite snapshots" / h2 "The situations contractors bring us" | Heading asserted these were real client work, contradicted by the disclaimer at `:236` three lines below. Disclaimer and the six testimonials untouched | brief item 3, confirmed by reading the section |
| `src/app/about/page.tsx:33` | "We see the practical application of those rules across **a large contractor client base every week**" | "We work with those rules as they are applied in practice, contract by contract" | Claim to an existing large book of clients, stated as present fact. Contradicts `src/app/terms/page.tsx:50` ("No accountant-client relationship is created by your use of this Site or submission of an enquiry form") on a lead-gen handoff site | brief item 2; terms page read first |
| `src/app/about/page.tsx:30` | "**Every client we work with** operates through a PSC or is considering doing so." | "The work we take on involves a PSC, or someone considering one." | Same client-scale claim in softer form; leaving it would half-fix the paragraph above it | re-read of the whole surrounding passage |
| `src/app/about/page.tsx:39` | "You know what you are paying before we start. **You hear back within one working day.** You deal with specialist accountants, not a call centre." | sentence removed, rest of the run intact | Timed promise, and it conflicted with the 24h promises elsewhere (a Friday enquiry is not the same window) | rule sweep |
| `src/app/contact/page.tsx:8` | metaDescription "… You will hear back within one working day." | "… No obligation." | Timed promise in **page metadata** — never in body text, but it reaches users in search results. The metadata shape the brief warned about | rule sweep included `metadata` objects, not just JSX text |
| `src/app/contact/page.tsx:40` | step 02 title "You hear back within 24 hours" | "A specialist gets in touch" | The promise was the step TITLE. Body of the step already reads correctly untimed, so only the title changed; numbered list structure untouched | rule sweep |
| `src/app/for/[slug]/page.tsx:208` | `"24-hour response guarantee"` | `"A contractor specialist reviews your enquiry"` | Timed promise + "guarantee"; one literal renders once per contractor-type page across the whole `/for/` estate | rule sweep |
| `src/components/blog/InlineMiniLeadForm.tsx:18` | "A specialist will reply **within 24 hours**, with no obligation." | "A specialist will come back to you, with no obligation." | Timed promise, mounted across the 62-post blog corpus | rule sweep |
| `src/components/calculators/CalcResultCta.tsx:20` | "No obligation, and **we reply within one working day**." | "No obligation, and no hard sell." | Timed promise on every generic calculator result panel | rule sweep |
| `src/components/calculators/premium/ResultGateModal.tsx:128` | successText "Thanks, we will be in touch **within one working day**. Your result is below." | "Thanks, we will be in touch. Your result is below." | Timed promise; separate component from CalcResultCta, so fixing one left this live | rule sweep |
| `src/components/forms/LeadForm.tsx:389` | "Thanks. You will hear back **within 24 hours**." (inline success branch) | "Thanks. A specialist will be in touch." | Timed promise on the main lead form, mounted on ~10 route families | rule sweep |
| `src/components/forms/LeadForm.tsx:407` | "You will hear back **within 24 hours**. Your details are stored securely." (redirect branch) | "A specialist will be in touch. Your details are stored securely." | Second copy in the same file, different branch | rule sweep (two hits in one file) |
| `src/components/support/SpecialistWidget.tsx:375` | "A specialist replies **within one working day**" | "A contractor specialist replies personally" | Timed promise in the site-wide floating widget header | rule sweep |
| `src/lib/support/faq.ts:28-29` | q "**How quickly will a specialist reply?**" / a "**Within one working day, and usually sooner.** Leave your email and a one-line question and a contractor tax specialist will come back to you personally." | q "Who answers my question?" / a "A contractor tax specialist, personally. Leave your email and a one-line question and we will come back to you." | The promise was the QUESTION, so the answer could not be de-timed alone. Question replaced, answer rewritten to keep the same job (who + what to leave). "usually sooner" was a second escalation | brief item 1 / rule sweep |
| `src/tests/assistant-journey-opener.test.ts:779-785` | `it("GENERIC Q&A 1 is about response speed") { expect(GENERIC[0].q).toMatch(/quickly\|how.*reply\|reply/i) }` | asserts the Q&A is about **who** answers, and that neither q nor a matches a turnaround-time regex | The test PINNED the banned promise — it would have failed the fix and re-invited the promise back. Now it guards against it | `npx vitest run` after the faq.ts edit |

## `packages/web-shared/` — REPORT ONLY, not edited (trap 12, 18 sites)

| file:line | what is published | why it matters here |
|---|---|---|
| `packages/web-shared/leads/MiniCapture.tsx:707` | "You'll get a text and email from us **right away**. A quick reply locks in your callback." | Single-step branch = this site's default. Renders under all six MiniCapture mounts on this site (`ResourceGate`, `InlineMiniLeadForm`, `CalcResultCta`, `MobileToolSlot`, `ResultGateModal`, `ExitIntentModal`). After this package, it is the **only** remaining timed promise reaching users on this site. Also promises an SMS that is env-gated behind `LEAD_NURTURE_SMS_ENABLED` (`src/lib/leads/channels.ts:31`). |
| `packages/web-shared/leads/MiniCapture.tsx:627` | Same sentence, multi-step branch behind `NEXT_PUBLIC_MINIFORMS_MULTISTEP=1` | Live only if that env var is set on this Vercel project; cannot be settled from the repo. |

Both need an estate-level decision, not a per-site edit.

## Needs an owner decision

1. **`packages/web-shared/leads/MiniCapture.tsx:627,707`** — the two above. A timed promise survives on this site until the shared component changes.
2. **"regulated firms in our specialist partner network"** — three renders, all about THIRD PARTIES, not about us: `contractors-ir35/niche.config.json` (`partner.name`) and `src/app/privacy-policy/page.tsx:89,105,122` (the privacy page is owned by another agent this pass). Per the 2026-09-12 positioning ruling this string was left exactly as it is; it asserts every receiving firm is regulated, which nothing in this repo evidences. Owner call, not an edit.
3. **`src/app/page.tsx:37`** — keyStat "£10k+ / Typical annual saving outside IR35 vs umbrella". An outcome figure with no derivation on the page, and the homepage FAQ at `:144` gives £5,000–£15,000 for the same comparison. Out of this package's four scoped items; left alone, flagged.
4. **The six testimonials themselves** (`src/app/page.tsx:45-55`, `src/data/contractor-types.ts:86,158,230`). The brief says they stay and the disclaimers stay. Only the heading was changed.

## Found and not changed, with why

- **`src/app/privacy-policy/page.tsx:149`** — "takes it up within 48 hours" / "after seven days". A timed pool-model statement, but the privacy page is owned by a fourth agent this pass and the timing is executed estate-side, outside this repo.
- **`src/app/privacy-policy/page.tsx:199`** — "We will respond within one month." Statutory UK GDPR response window, not a marketing promise. Also another agent's page.
- **~30 `content/blog/**` and `src/app/glossary|locations/[slug]/data.ts` hits** on "within 24 hours" (Companies House incorporation), "respond within 45 days" (ITEPA s.61T), "same day rate" — third-party/statutory timescales or the phrase "same day **rate**", not our promises. The regex catches them; the value check clears them.
- **`src/lib/leads/reply-ack.ts:48`, `src/app/complete/page.tsx`, `src/app/thank-you/page.tsx`, `src/config/lead-nurture.ts`** — "will be in touch", "will call you shortly". Untimed already; this is the pattern the fixed lines were rewritten to.
- **`src/config/service-tiers.ts:60` "10 Free calculators"** — re-counted: `src/lib/calculators/registry.ts` exports 10 generic tools, 0 bespoke. Correct.
- **`src/config/service-tiers.ts:63` "6 Core services covered"** — re-counted: `src/app/services/page.tsx` defines 6 service cards. Correct.
- **No other published count exists.** Swept `\b[0-9]{1,3}\+? (guides|calculators|tools|pages|articles|resources|services|posts|locations)\b` over `src`, `content` and `niche.config.json`: every other hit is a code comment, not user-facing copy. No "trusted by N", no client count, no `aggregateRating`.
- **First-person "we do the work" voice** — left entirely alone per the positioning ruling, including "specialist accountants, not a call centre".
