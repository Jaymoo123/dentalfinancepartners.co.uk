# crypto port, phase 0 package list

Written BEFORE launch (playbook T39: a package is not complete because you remember
launching it). Tick each off at close with a receipt.

Pre-port build: `crypto/web/.next` built from the working tree at `e25412d7`, exit 0.
Server: `next start -p 3171`, identity asserted
(`<title>Crypto Tax Partners | Specialist UK Crypto Tax Accountants</title>`), age = built
from the current tree this session. Production SHA for the baseline: `7b5c0ce8`
(`git rev-parse --short origin/main`).

| pkg | scope | output | status |
|---|---|---|---|
| P0-A | claims and ground-truth audit, repo source, whole site, by rule | `P0A_CLAIMS_LEDGER.md` | launched |
| P0-B | rendered-HTML claims sweep against the served build (config-injected copy, JSON-LD parse, FAQ pairs, canonical, index crawlability, dead classes) | `P0B_RENDERED_SWEEP.md` | launched |
| P0-C | CSS, token and contrast audit (BOM-safe character-stream unlayered walk, bare `var()` reads, composed-override byte order, brand mapping) | `P0C_CSS_TOKEN_AUDIT.md` | launched |
| P0-D | instrument baseline capture (`sweep.mjs`, `browser_check.mjs`, `cta_snapshot.mjs`) | `P0D_BASELINE.md`, `link_baseline.json`, `browser_baseline.json` | launched |
| P0-E | structural live-defect and disposition inventory (chrome contract, six kit props, dead links, anchors, FAQ mechanism, a11y, interruptions) | `P0E_STRUCTURAL_INVENTORY.md` | launched |
| P0-F | serious-tier FIX wave, derived from A+B+C+D+E after the gate | commit | not launched |

Phase 0 closes when: every ledger row is graded, the serious tier is fixed and committed,
and the owner gate on the ledger is cleared. Phase 1 does not start before that.
