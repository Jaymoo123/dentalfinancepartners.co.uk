---
slug: for-locum-pharmacists
tier: content
route: /for/locum-pharmacists
intent: CONTENT-ONLY authority hub (DIY-informational / operator-problem). NO LEAD FORM at launch (LAUNCH_CORE intent split confirmed). Serves topical authority breadth, the take-home comparator tool, and the internal-link bridge into owner pages (today's locum is tomorrow's buyer). Pharmacist-specific, deduped from the medical site and the contractors-ir35 corpus.
---
# Content hub: locum pharmacist tax and status (the site)

> Seed brief (Stage 1). Working brand agnostic; all copy references "the site" / "the firm". CTA and brand copy flow from site config at write time. No em-dashes anywhere. Faceless authority only (no named experts, no credential claims; owner is not an accountant, authority via cited HMRC sources).
>
> **NO LEAD-CAPTURE FORM ON THIS HUB AT LAUNCH.** Per LAUNCH_CORE.md intent split, locum pharmacists are a content-only audience at v1. This page carries no lead form and no owner segment fields. The only conversion surfaces are the locum take-home comparator tool and the internal-link bridge into /for/buying-a-pharmacy. Do NOT add a capture form at write time.

## Target queries (evidence: LAUNCH_CORE.md, DataForSEO UK 2026-07-11, gl=GB)

- "accountants for locum pharmacists" 30/mo, KD 5, CPC £7.79 (the whole hire signal; content-only per LAUNCH_CORE, no funnel)
- "locum pharmacist tax ..." family ~10/mo per variant (below the money threshold)
- Autocomplete question cluster (real, below Ads floor): "are locum pharmacists self employed", "locum pharmacist ir35", "locum pharmacist limited company", "locum pharmacist how to pay tax"
- Dedup note: "locum pharmacist tax calculator" (+ "... uk") flagged at 0.784 against the medical site's locum tax calculator (kept, but write pharmacist-specific). Generic locum-doctor/GP terms belong to the medical site, not here.

## Search-intent class + play

DIY-informational and operator-problem authority hub (intent class 3/4), NOT a lead page. Three jobs per LAUNCH_CORE: (1) topical authority breadth for the niche, (2) surface the locum take-home comparator tool, (3) internal-link bridge into the owner funnel, because today's locum is tomorrow's buyer. The wedge that keeps this clear of the contractors-ir35 site's generic PSC/locum turf and the medical site's locum-doctor turf: everything here is pharmacist-specific (ESM4270, GPhC registration, pharmacy day-rate norms, FP34-adjacent context). Answer honestly and neutrally; the only "conversion" is the bridge to buying a pharmacy, never a capture form.

## Dedup discipline (mandatory, page-level verify at write time)

- Against medicalaccounts.co.uk: it owns generic locum ground and its `locum-limited-company-vs-umbrella` guide already ranks in this niche's SERPs. Anything here must be pharmacist-framed (ESM4270 not generic status, GPhC not GMC, pharmacy day rates) and page-level deduped before writing.
- Against the contractors-ir35 corpus: do not restate the generic IR35/PSC explainer. Cite HP 21 (IR35 + CEST) at pharmacist-context depth only, and link out conceptually rather than duplicating the generic turf.
- Per the gap-discovery lesson (47% cumulative dupe rate), verify against the live estate at write time.

## Required structure

H2 skeleton:
1. Hero: locum pharmacist tax, status and take-home (informational, NO capture CTA; the CTA is the comparator tool)
2. Are locum pharmacists self-employed? (HMRC's Employment Status Manual has a locum-pharmacist-specific page, ESM4270; status is fact-based and HMRC's stated position on locum pharmacists is restrictive; "everyone does it self-employed" is not a defence; HP 20)
3. The self-employed status tests (control, substitution, financial risk decide the sole-trader question; HP 22)
4. Working through your own company and IR35 (off-payroll working applies where you work through a limited company and the client is in scope; CEST is the check tool of record; HP 21)
5. Limited company vs umbrella vs sole trader for a locum pharmacist (pharmacist-specific, deduped from medical + contractors-ir35; trade-offs at pharmacy day-rate levels, not a generic table)
6. How a locum pharmacist pays tax (Self Assessment, cash basis default for the unincorporated; HP 24)
7. Making Tax Digital for Income Tax (hits sole-trader locums from April 2026 at £50,000+ qualifying income, then £30,000 from April 2027; HP 23)
8. From locum to owner (the bridge: buying your first pharmacy; what changes when you own the contract; route to /for/buying-a-pharmacy and /for/pharmacy-owners)
9. Free tool (locum take-home comparator; states its simplifications, ends at "speak to us")

FAQ candidates (questions only):
- Are locum pharmacists self-employed? (HP 20, ESM4270; restrictive HMRC position)
- Does IR35 apply to a locum pharmacist with a limited company? (HP 21)
- Should a locum pharmacist use a limited company, an umbrella, or go sole trader? (pharmacist-specific, deduped)
- How does a locum pharmacist pay tax? (HP 24)
- Do I need to follow Making Tax Digital as a locum? (HP 23)
- Can a locum pharmacist buy their own pharmacy? (route to /for/buying-a-pharmacy)

Table/chart opportunities: a status-tests strip (control / substitution / financial risk, each citing HP 22); an MTD threshold line (£50,000 from April 2026, £30,000 from April 2027; HP 23). Every figure links its source. No day-rate figure asserted (see gap flag). A limited-vs-umbrella-vs-sole-trader comparison must be pharmacist-specific, not a generic contractors-ir35 clone.

Calculator embeds: locum take-home comparator inline or linked. Must state its simplifications and end at "speak to us", never a filing-ready figure. This is the hub's only conversion surface alongside the buying bridge.

Internal links (launch core): homepage, /for/buying-a-pharmacy (the bridge, prominent), /for/pharmacy-owners (what ownership changes), the locum take-home comparator calculator, the ESM4270/status and locum-limited-company-vs-umbrella blog posts. NO lead form and no owner segment fields on this hub.

Lead form: NONE at launch. Confirmed content-only per LAUNCH_CORE intent split. Do not add a form or owner segment fields at write time.

## House positions touched (docs/pharmacies/house_positions.md; gov.uk URLs below)

- HP 20: HMRC Employment Status Manual has a locum-pharmacist-specific page (ESM4270); HMRC's position is restrictive; self-employment is not automatic. https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm4270
- HP 21: off-payroll working (IR35) applies where a locum works through their own company and the client is in scope; CEST is the check tool. https://www.gov.uk/guidance/understanding-off-payroll-working-ir35 and https://www.gov.uk/guidance/check-employment-status-for-tax
- HP 22: self-employed status tests (control, substitution, financial risk). https://www.gov.uk/employment-status/selfemployed-contractor
- HP 23: MTD for Income Tax hits sole-trader locums from April 2026 at £50,000+ qualifying income, then £30,000 from April 2027. https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax
- HP 24: cash basis is the default for unincorporated businesses (relevant to locums). https://www.gov.uk/simpler-income-tax-cash-basis

Consistency rules: UK default. Every figure links its source. Pharmacist-specific throughout (ESM4270, GPhC, pharmacy day-rate context). NO lead form. Bridge to owner pages, never generic locum-doctor content.

## Hallucination danger zones

- HMRC's position on locum pharmacists is restrictive (ESM4270, HP 20); do not present self-employment as the safe default. "Everyone does it self-employed" is explicitly not a defence.
- MTD thresholds: £50,000 from April 2026, then £30,000 from April 2027 (HP 23); do not conflate the two dates or use the £30,000 figure as the April 2026 trigger.
- Do not duplicate the medical site's generic locum guide or the contractors-ir35 generic IR35 explainer; pharmacist-specific and deduped only.
- Do NOT add a lead-capture form or owner segment fields; this hub is content-only at launch.
- Do not assert a specific locum day rate or umbrella-margin figure (no house position; see gap flag).
- Nothing clinical or GPhC-professional beyond status/registration context; ownership and tax mechanics only (positioning wall).
- No credential claims, no named expert. No em-dashes.

## Gap flag (house_positions / figures)

- Pharmacy locum day-rate norms are referenced as a framing ("pharmacist day-rate norms", LAUNCH_CORE) but there is NO house position or cited figure for a specific day rate. Do NOT state a numeric day rate; keep it qualitative or route to the comparator tool, which the user supplies inputs to. Flagging the absence, not inventing a figure.
- All tax figures used (MTD thresholds, status tests, IR35, cash basis) map to HP 20-24. No missing tax-figure gap.

## Stage 2 TODO

- Page-level dedup verify against medicalaccounts.co.uk `locum-limited-company-vs-umbrella` and the contractors-ir35 corpus before writing (mandatory).
- Confirm the locum take-home comparator slug and its stated simplifications against CALCULATORS.md.
- Re-verify MTD thresholds and ESM4270 wording at source at write time.
- Confirm the build renders this hub with NO lead form (the intent-split decision must survive into the template).
