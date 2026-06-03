# Medical Wave 1 (proving wave) — page tracker

Live diagnostic for the medical net-new proving wave. One row per pick. Status:
todo / brief / in-progress / done / blocked. Edit in `main` via absolute path.

Wave 1 = 9 pages, 3 clusters. Cannib GREEN (9 net-new, 0 partial, 0 covered).
Link convention is FLAT (medical): post `/blog/<slug>`, category index
`/blog/<category-slug>`, canonical `https://www.medicalaccounts.co.uk/blog/<slug>`.

| id | slug | category | HP anchor | status | body words | FAQs | note |
|----|------|----------|-----------|--------|-----------|------|------|
| A1 | mccloud-remedy-nhs-pension-doctors-explained | NHS Pension Planning | §2.A | done | 3003 | 14 | mT44 mD155 0 em-dash, 0 HARD |
| A2 | nhs-pension-scheme-pays-doctors-deadlines | NHS Pension Planning | §2.D, §2.B | done | 2868 | 14 | mT46 mD157 0 em-dash, 0 HARD |
| A3 | nhs-pension-partial-retirement-doctors-guide | NHS Pension Planning | §2.E | done | 2938 | 14 | mT48 mD149 0 em-dash, 0 HARD |
| B1 | gp-surgery-notional-rent-vs-cost-rent-explained | GP Practice Management | §4 premises | done | 2817 | 14 | Premises Costs Directions 2024 locked; 0 em-dash, 0 HARD |
| B2 | gp-partnership-last-man-standing-premises-risk | GP Practice Management | §4 premises | done | 3425 | 14 | 0 em-dash, 0 HARD |
| B3 | gp-surgery-premises-own-vs-rent-tax-guide | GP Practice Management | §4 premises, §7 | done | 2982 | 14 | SDLT/s.198 verified; 0 em-dash, 0 HARD |
| C1 | can-gp-practice-goodwill-be-sold-nhs-rules | GP Tax & Accounts | §4 sale | done | 3227 | 14 | SI 2019/251 verified; 0 em-dash, 0 HARD |
| C2 | selling-private-medical-practice-cgt-badr | Private Practice | §4 sale, §5 | done | 3377 | 14 | BADR bands + s.28 timing; 0 em-dash, 0 HARD |
| C3 | incorporation-relief-private-medical-practice-s162 | Incorporation & Company Structures | §4, §5 | done | 2961 | 14 | FA 2026 s.39 claim change locked; 0 em-dash, 0 HARD (manager-direct write after sub-agent 500s) |

## HP-lock gate log
- Cluster C (pre-verified 2026-06-03): SI 2019/251 reg 4(1) prohibition + reg 6(1) revokes SI 2004/906 (legislation.gov.uk); FA 2026 s.39 makes TCGA s.162 a CLAIMED relief (not automatic) + omits s.162A, for transfers on/after 6 Apr 2026. HP §4 updated.
- Cluster A (PASSED 2026-06-03): anchors §2.A (PSPJOA 2022, McCloud), §2.D (FA 2004 s.237B/s.237BA, Scheme Pays), §2.B (AA figures), §2.E (partial retirement 1 Oct 2023). Brief agent re-verified at source; no figure conflict; no HP gap to lock.

## Six-check floor (per page): 0 em-dashes; semantic HTML (no class=); 10-14 FAQs; metaTitle ≤62; metaDescription ≤158; every internal link resolves (flat); body 2,800-3,500 words; raw HTML body.

## Wave 1 close summary (2026-06-03)
- 9 pages WRITTEN + VERIFIED. All 9 pass the six-check: body 2,817-3,425 words, 14 FAQs each, metaTitle 44-53, metaDescription 149-158, 0 em-dashes, 0 class/id/style.
- Flat-link audit (scripts/medical_flat_link_audit.py): 0 HARD 404 across the full 55-post corpus, 0 NEW from the wave. Frontmatter lint: 55/55 valid.
- predeploy_gate.py --site medical: frontmatter OK, QA clean. Its LINK sub-check uses the nested-routing auditor (track2_link_audit.py) and reports false-positive HARD 404s on medical's FLAT routing (do not use it for medical; use medical_flat_link_audit.py). Em-dash (55) + pricing (1) warns are LEGACY-only, none in the 9 new pages.
- Build: npm run build in Medical/web (node_modules installed fresh) = EXIT 0 (GREEN). All 9 new pages statically generated under /blog/[slug] (built HTML present in .next).
- NOT committed, NOT deployed (per scope). Human commits + deploys.

## EXISTING_PAGE_STALE / rewrite hit-list (for a future medical Track-2 rewrite batch)
- gp-vat-registration: states the old £85,000 VAT threshold (now £90,000) and wrongly implies private medical services are standard-rated by default (genuine private medical care is exempt; only cosmetic/medico-legal carve-outs are standard-rated). HP §6.
- becoming-gp-partner-financial-implications: uses the old Class 4 9% main rate (now 6%). HP §5/§8.
- Several legacy posts cite the GMC fee as £425 (frame deductibility, not a fixed fee). HP §8/§10.
- Legacy em-dashes: ~55 occurrences across the 46 legacy posts (sweep before predeploy --strict).
- Pricing on a lead-gen site: gp-accountant-cost contains "£100 per hour" (lead-gen sites carry no firm pricing) — review.
