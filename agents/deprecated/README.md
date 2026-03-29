# Deprecated Agent Components

This folder contains agent code that has been replaced by more efficient systems.

## Files

### `deduplication_checker.py`
**Deprecated**: 2026-03-29  
**Replaced by**: Keyword-driven topic tree with pre-filtering  
**Reason**: 
- Was checking every generated topic for duplicates using expensive Claude API calls ($0.005 each)
- Resulted in 154 skipped generations in one week (100% waste in last run)
- New system pre-filters topics during monthly keyword tree building
- Cost reduction: $1.50/month → $0.00

**Original functionality:**
- Semantic similarity checking between topics
- Recent topic usage verification
- Content hash duplicate detection

### `research_sources.py`
**Deprecated**: 2026-03-29  
**Replaced by**: CSV-based keyword research files  
**Reason**:
- Daily reactive research was generating duplicate topics
- No keyword strategy or search volume data
- New system uses curated keyword research with search volumes, difficulty scores, and intent

**Original functionality:**
- Google Trends configuration
- Reddit subreddit lists
- SERP analysis settings
- News feed URLs

## Migration Notes

These files are kept for reference only. Do not import or use in new code.

If you need to restore functionality:
- Deduplication: Use keyword tree builder's pre-filtering instead
- Research sources: Update keyword CSV files in niche directories

---

Last updated: 2026-03-29
