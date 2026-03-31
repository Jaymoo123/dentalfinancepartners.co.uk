"""
Cost limits and rate controls for AI agents.
Adjust these values to control spending and generation rates.

UPDATED 2026-03-30: Migrated to DeepSeek API for 15x cost reduction.
"""

# ============================================================================
# RATE LIMITS (Operations per day)
# ============================================================================
RATE_LIMITS = {
    "daily_blog_posts_per_niche": 1,  # Max 1 blog per niche per day
    "daily_content_research_calls": 0,  # Disabled - use monthly keyword refresh
    "monthly_keyword_refresh": 1,  # Max 1 keyword tree rebuild per month
    "daily_optimization_updates": 3,  # Max 3 content optimizations per day
    "max_parallel_operations": 1,  # Sequential execution only
}

# ============================================================================
# BUDGET LIMITS (Updated for DeepSeek)
# ============================================================================
# With DeepSeek: $200/month = 40,000 blog posts or 1,300 niche generations
# Can easily support 100+ niches with daily content generation

BUDGET_LIMITS = {
    "monthly_budget_usd": 200,  # Hard stop if exceeded
    "daily_budget_usd": 10,  # Daily spending limit (66,000 blog posts at DeepSeek rates!)
    "budget_warning_threshold": 0.80,  # Alert at 80% of budget
}

# ============================================================================
# API LIMITS
# ============================================================================
API_LIMITS = {
    "anthropic_max_tokens_per_request": 4096,
    "anthropic_max_requests_per_minute": 10,
}

# ============================================================================
# COST PER OPERATION (USD) - DeepSeek Pricing
# ============================================================================
# DeepSeek: $0.14/M input, $0.28/M output (15x cheaper than Claude)
# Claude: $3.00/M input, $15.00/M output (with caching)

COST_PER_OPERATION = {
    # DeepSeek costs (default)
    "blog_generation": 0.003,  # DeepSeek: ~2K input + 2K output = $0.003
    "keyword_tree_build": 0.010,  # DeepSeek: ~10K input + 15K output = $0.01
    "content_optimization": 0.002,  # DeepSeek: ~1K input + 1K output = $0.002
    "niche_generation": 0.15,  # DeepSeek: ~150K total tokens = $0.10-0.15
    
    # Claude costs (if using --model claude)
    "blog_generation_claude": 0.06,  # Claude with caching
    "keyword_tree_build_claude": 0.15,  # Claude
    "niche_generation_claude": 1.80,  # Claude
    
    # Deprecated
    "topic_research": 0.00,  # Deprecated - use keyword_tree_build
    "similarity_check": 0.00,  # No longer needed
}

# ============================================================================
# QUALITY THRESHOLDS
# ============================================================================
QUALITY_THRESHOLDS = {
    "min_word_count": 1000,
    "max_keyword_density": 0.03,  # 3%
    "duplicate_similarity_threshold": 0.92,  # 92% = duplicate (allows related topics)
    "content_similarity_threshold": 0.80,  # 80% = too similar
    "recent_topic_days": 90,  # Don't reuse topics within 90 days
}
