"""
Cost limits and rate controls for AI agents.
Adjust these values to control spending and generation rates.
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
    "blog_generation": 0.06,  # Claude Sonnet 4 with prompt caching (corrected from 0.03)
    "topic_research": 0.00,  # Deprecated - use keyword_tree_build
    "keyword_tree_build": 0.15,  # Monthly keyword tree generation (larger prompt)
    "content_optimization": 0.02,  # Medium prompt
    "similarity_check": 0.00,  # No longer needed (topics pre-filtered)
    "niche_generation": 2.00,  # One-time niche setup cost
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
