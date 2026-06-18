## Summary
GAP-3 operator console (Phase B, final cluster): shared console module in packages/web-shared/console/ (typed query layer over vw_* views, dashboard panels, OB-01 cookie auth designed once) + generalist mount at /admin/analytics. Includes GAP-3 preconditions: live vw_* audit + 2 view migrations (channel internal-classification via sites registry, visits-to-conversion attribution fix) already applied to prod.

## Verification
- 192/192 tests; next build green (679 pages)
- OB-01 verified at runtime (redirect/error/cookie flags/noindex/authenticated render)
- OB-02 verified by grep (no table names outside adminData.ts)
- Property channel-view output proven byte-identical via same-instant EXCEPT diff
- OB-03..06 deferred to post-deploy live data (logged in spec)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
