# Source Manifest — NHS Pension AA Burden Index (P1 gate: PASS 2026-07-06)

Index over the two verified section manifests (P1, workflow `wf_ca7e7b95-330`, both agents downloaded and parsed the real files):

- **[SOURCE_MANIFEST_HMRC.md](SOURCE_MANIFEST_HMRC.md)** — verdict PASS. The recurring £ spine: HMRC "Private pension statistics", Table 7 (annual allowance), `Tables_7_and_8.ods` + tidy CSV, OGL v3.0, annual each July, latest year 2023/24 [provisional]. Full parse recipe inside.
- **[SOURCE_MANIFEST_NHSBSA.md](SOURCE_MANIFEST_NHSBSA.md)** — verdict PARTIAL. NHS-specific layer: Annual Report §3.3 member counts (hand-key, 3 years) + FOI-02228 AA/Scheme Pays counts (safe window 2015/16 to 2021/22 ONLY) + FOI-02711 2019/20 role split. Constraints inside.

Binding gate constraints and the P1 traps list live in `docs/medical/RESEARCH_ASSET_STATE.md` (§2 findings + §3 decision log). Raw downloads: `.cache/medical_research/` (uncommitted).
