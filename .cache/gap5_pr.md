## Summary
GAP-5 (Phase C, final build cluster): ONE shared nurture engine in packages/web-shared/nurture/ (claim-before-send idempotency, double opt-in HMAC tokens, Svix-verified Resend webhook, EN-04 dormancy, RFC 8058, UTM CTAs, zero hardcoded identity) + generalist adoption (5 routes re-pointed, 7 fork files deleted, dormant posture). Schema + data migrations reviewed/amended/applied to prod by manager (1 real subscriber migrated, probe row deleted).

## Verification
- 229/229 tests; 6-site tsc clean; generalist next build green (5 nurture routes)
- PF-07/EN-06 greps independently re-run: clean
- Live data verified post-migration (pending status, accurate consent text, paused nurture state)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
