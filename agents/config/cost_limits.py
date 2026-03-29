"""
Cost limits and rate controls for AI agents.
Adjust these values to control spending and generation rates.
"""

# ============================================================================
# RATE LIMITS (Operations per day)
# ============================================================================
RATE_LIMITS = {
    "daily_blog_posts_per_niche": 1,  # Max 1 blog per niche per day
    "daily_content_research_calls": 5,  # Max 5 topic research calls per day
    "daily_optimization_updates": 3,  # Max 3 content optimizations per day
    "max_parallel_operations": 1,  # Sequential execution only
}

# ============================================================================
# BUDGET LIMITS
# ============================================================================
BUDGET_LIMITS = {
    "monthly_budget_usd": 200,  # Hard stop if exceeded
    "daily_budget_usd": 10,  # Daily spending limit
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
# COST PER OPERATION (USD)
# ============================================================================
COST_PER_OPERATION = {
    "blog_generation": 0.03,  # Claude Sonnet 4 ~4k tokens
    "topic_research": 0.035,  # Increased: includes 5 duplicate checks (~$0.025)
    "content_optimization": 0.02,  # Medium prompt
    "similarity_check": 0.005,  # Very small prompt
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
