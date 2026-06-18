## Summary
Restores two parity gaps the user spotted after Property's console deletion: (1) the RICH experiments tab (per-experiment cards: hypothesis, control-vs-treatment arms, exposure-scoped funnel with significance, personalisation conversion cards, graceful unknown-id fallback) recovered from git history into the unified console + shared adminData (additive getExperimentArms/getExperimentFunnel); (2) the INTERACTIVE recharts TrendChart (hover tooltips, cursor tracking, 8-chart layout incl. hourly view) on the trends page; sparklines stay on overview cards. recharts scoped to console/web only.

## Verification
- web-shared 267 + console 27 tests green; console next build green; merged current main cleanly

🤖 Generated with [Claude Code](https://claude.com/claude-code)
