"""
Configuration for content research sources.
"""

# ============================================================================
# GOOGLE TRENDS
# ============================================================================
GOOGLE_TRENDS_CONFIG = {
    "enabled": True,
    "regions": ["GB"],  # UK only
    "timeframe": "today 3-m",  # Last 3 months
}

# ============================================================================
# REDDIT
# ============================================================================
REDDIT_CONFIG = {
    "enabled": True,
    "subreddits": {
        "Dentists": [
            "Dentistry",
            "DentalSchool",
            "UKDentistry",
            "UKPersonalFinance",
        ],
        "Property": [
            "LandlordUK",
            "UKLandlords",
            "UKPersonalFinance",
            "UKProperty",
        ],
    },
    "min_upvotes": 10,
    "max_posts_per_subreddit": 20,
}

# ============================================================================
# SERP ANALYSIS
# ============================================================================
SERP_CONFIG = {
    "enabled": True,
    "search_engine": "google",
    "region": "uk",
    "max_results": 10,
    "analyze_competitors": True,
}

# ============================================================================
# NEWS FEEDS
# ============================================================================
NEWS_FEEDS = {
    "Dentists": [
        "https://www.bda.org/news",
        "https://www.dentalprotection.org/uk/articles",
    ],
    "Property": [
        "https://www.landlordzone.co.uk/news",
        "https://www.propertyindustryeye.com/",
    ],
}
