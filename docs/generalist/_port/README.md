# Generalist design port — programme artefacts

Owner decision 2026-09-09 (PROPERTY_STANDARD_ROLLOUT.md §8.3): generalist ports to the
Property standard. Orange #f97316 stays as brand primary; warning/duty semantics move off
amber/orange; Geist stays; all content, URLs and forms stay.

Files here:
- `DISPOSITION_SLICE1.md` — chrome, homepage, blog subsystem (section-by-section, exact classes)
- `DISPOSITION_SLICE2.md` — calculators, pillars, locations (+ ResultGate port decision, CalculatorTabs map)
- `DISPOSITION_SLICE3.md` — contact/post-submit, about/team, research, magnets/resources, newsletter,
  legal, interruptive stack, brand layer + measured contrast, instrumentation + guard tests
- `link_baseline.json` — per-route unique-internal-link floor, captured from `next start` at the
  production SHA before the first port commit (sha + deriving command embedded)

The approved phase plan, consolidated owner-gate bundle and verification contract live in the
session plan (mirrored into this folder's slices) and in `docs/generalist/STATE.md`.

Phase-0 facts (2026-09-09):
- Production SHA (Vercel `targets.production`, project holloway-davies): `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, readyState READY.
  Deriving command: GET https://api.vercel.com/v9/projects?teamId=team_XF9WAygZX7SGk9Fo4tOAnihH ->
  project with rootDirectory generalist/web -> targets.production.meta.githubCommitSha.
- `git log 18b4f25f..origin/main -- generalist/ packages/web-shared/` = 0 commits: no
  committed-but-undeployed changes ride the cutover for this site.
- Armed monitored_pages: 79 active rows, windows 2026-09-10 to 2026-10-07. Cutover re-baselines
  them; the cutover annotation must say so.
- Funnel evidence (post bot-gate, 2026-08-23 onward): blog-landing conversion 0.10% vs Property
  0.52%; homepage 3.3% vs 8.8%; form starts/pageview 3.7x lower; form completion fine once started.
