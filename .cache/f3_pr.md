## Summary
Phase F cluster F3 (final): Property nurture re-pointed to the shared engine. Audit found 5 latent defects in the old fork, all dead by construction: PF-07 SITE_KEY literal, EN-06 hardcoded from-identity fallbacks, SEC-05 plain === on webhook AND cron secrets, unsigned unsubscribe tokens, and an LD-09 consent-text mismatch (stored text differed from the rendered label - now byte-identical and test-pinned). Sequence content carried verbatim (delay semantics unchanged). Dormant posture preserved (no CRON_SECRET). Lead pipeline/schema/homepage/content untouched.

## Verification
- Manager reproduced: 95/95 Property tests (5 config + 71 goldens + 19 nurture), web-shared 254, next build green (767 pages)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
