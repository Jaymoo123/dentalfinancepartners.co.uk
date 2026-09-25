# ecommerce port, phase 0 package list

Written BEFORE launch (playbook T39: a package is not complete because you remember
launching it). Tick each off at close with a receipt.

Pre-port build: `ecommerce/web/.next` built from the working tree this session, exit 0.
Server: `next start -p 3191`, identity asserted
(`<title>Ecommerce and marketplace seller accountants UK</title>`), age = built from the
current tree this session. Production SHA for the baseline: `153e5017`
(`git rev-parse --short origin/main`).

Site facts derived before launch: 24 public `page.tsx`; 14 posts in 6 categories; 4
calculators each with a unit test; `locations: []`; brand `#c9861b`; `@source` and
`prose-standard.css` already imported; chrome EXISTS (`components/ui/SiteNav.tsx`), so
phase 1 is a REPLACEMENT, not net-new construction.

| pkg | scope | output | status |
|---|---|---|---|
| P0-A | claims and ground-truth audit, repo source, whole site, by rule | `P0A_CLAIMS_LEDGER.md` | DONE |
| P0-B | rendered-HTML sweep against the served build (config-injected copy, JSON-LD parse, FAQ pairs, canonical per family, index crawlability, dead classes) | `P0B_RENDERED_SWEEP.md` | DONE |
| P0-C | CSS, token and contrast audit (character-stream `utf-8-sig` unlayered walk, bare `var()` reads, composed-override byte order, brand mapping on every ground) | `P0C_CSS_TOKEN_AUDIT.md` | DONE |
| P0-D | instrument baseline capture (`sweep.mjs`, `browser_check.mjs`, `cta_snapshot.mjs`) | `P0D_BASELINE.md`, `link_baseline.json`, `browser_baseline.json`, `cta_baseline.json` | DONE |
| P0-E | structural live-defect and disposition inventory (chrome contract, six kit props, `<main>`/skip-link census, dead links, anchors, FAQ mechanism, a11y, interruptions) | `P0E_STRUCTURAL_INVENTORY.md` | DONE |
| P0-F | serious-tier FIX wave, derived from A+B+C+D+E after the owner gate | commit | DONE |
| P0-G | rule-based re-sweep proving zero hits per rule, after P0-F | receipt | DONE |

Phase 0 closes when: every ledger row is graded, the serious tier is fixed and committed,
and the owner gate on the ledger is cleared. Phase 1 does not start before that.
