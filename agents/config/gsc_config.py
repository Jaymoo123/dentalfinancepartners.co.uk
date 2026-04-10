"""
GSC Smart Content Optimization - Configuration
Multi-site support with per-niche settings

Add new sites by adding entries to GSC_CONFIG.
Each site is completely isolated in database and execution.
"""

GSC_CONFIG = {
    "property": {
        # GSC settings
        "site_url": "sc-domain:propertytaxpartners.co.uk",
        "property_type": "domain",  # 'domain' or 'url-prefix'
        
        # Database
        "blog_topics_table": "blog_topics_property",
        
        # File paths
        "content_dir": "Property/web/content/blog",
        "git_repo_path": "Property/web",
        
        # Site-specific thresholds (based on current traffic: 71 impressions/week = 10.1/day)
        "min_impressions_baseline": 20,  # Minimum weekly impressions for optimization
        "verdict_thresholds": {
            "week1": {
                "impressions_per_day": 10,  # +10 impressions/day = significant
                "position_improvement": 3,   # +3 positions = page 3 → page 2
                "clicks_per_day": 1,         # +1 click/day = meaningful engagement
            },
            "cumulative": {
                "impressions_per_day": 7,   # More conservative with more data
                "position_improvement": 2,
                "clicks_per_day": 0.5,
            },
        },
        
        # Active status
        "enabled": True,
        "start_date": "2026-03-29",  # When site went live
    },
    
    "dentists": {
        # GSC settings
        "site_url": "https://www.dentalfinancepartners.co.uk/",
        "property_type": "url-prefix",
        
        # Database
        "blog_topics_table": "blog_topics_dentists",
        
        # File paths
        "content_dir": "Dentists/web/content/blog",
        "git_repo_path": "Dentists/web",
        
        # Site-specific thresholds (same as property for now)
        "min_impressions_baseline": 20,
        "verdict_thresholds": {
            "week1": {
                "impressions_per_day": 10,
                "position_improvement": 3,
                "clicks_per_day": 1,
            },
            "cumulative": {
                "impressions_per_day": 7,
                "position_improvement": 2,
                "clicks_per_day": 0.5,
            },
        },
        
        # Active status
        "enabled": True,
        "start_date": "2026-03-28",
    },
    
    "medical": {
        # GSC settings
        "site_url": "sc-domain:medicalaccountantsuk.co.uk",
        "property_type": "domain",
        
        # Database
        "blog_topics_table": "blog_topics_medical",
        
        # File paths
        "content_dir": "Medical/web/src/content/blog",
        "git_repo_path": "Medical/web",
        
        # Site-specific thresholds (lower for new site with less traffic)
        "min_impressions_baseline": 10,
        "verdict_thresholds": {
            "week1": {
                "impressions_per_day": 5,   # More aggressive for new site
                "position_improvement": 3,
                "clicks_per_day": 0.5,
            },
            "cumulative": {
                "impressions_per_day": 3,
                "position_improvement": 2,
                "clicks_per_day": 0.3,
            },
        },
        
        # Active status
        "enabled": False,  # Not live yet
        "start_date": None,
    },
    
    "solicitors": {
        # GSC settings
        "site_url": "sc-domain:accountsforlawyers.co.uk",
        "property_type": "domain",
        
        # Database
        "blog_topics_table": "blog_topics_solicitors",
        
        # File paths
        "content_dir": "Solicitors/web/content/blog",
        "git_repo_path": "Solicitors/web",
        
        # Site-specific thresholds (lower for new site with less traffic)
        "min_impressions_baseline": 5,
        "verdict_thresholds": {
            "week1": {
                "impressions_per_day": 5,
                "position_improvement": 3,
                "clicks_per_day": 0.5,
            },
            "cumulative": {
                "impressions_per_day": 3,
                "position_improvement": 2,
                "clicks_per_day": 0.3,
            },
        },
        
        # Active status
        "enabled": False,  # Enable after GSC verification and domain setup
        "start_date": None,
    },
}

# Global settings (apply to all sites unless overridden)
GLOBAL_CONFIG = {
    "analysis": {
        "min_impressions": 5,  # Ignore pages with <5 impressions in analysis window
        "lookback_days": 28,   # Analyze last 28 days of data
        "trend_days": 56,      # Use 56 days for trend analysis (8 weeks)
        "priority_thresholds": {
            "high": 70,    # Priority 70-100
            "medium": 40,  # Priority 40-69
            "low": 1,      # Priority 1-39
        },
    },
    
    "optimization": {
        "max_sections_per_post": 3,  # Don't add more than 3 sections at once
        "measurement_window_days": 7,  # Measure impact after 7 days (aggressive)
        "min_days_between_optimizations": 7,  # Wait 7 days before re-optimizing
        "require_approval": True,  # Always require manual approval
        "enable_rollback": True,  # Allow rolling back failed optimizations
    },
    
    "monitoring": {
        "daily_url_inspection_limit": 10,  # Check 10 URLs per site per day
        "weekly_full_scan": True,  # Run full scan weekly
        "alert_on_high_severity": True,  # Alert on high-severity issues
    },
    
    "api": {
        "gsc_credentials_file": "secrets/gsc_credentials.json",
        "gsc_token_file": "secrets/gsc_token.pickle",
        "gsc_scopes": [
            "https://www.googleapis.com/auth/webmasters",  # Full access for URL Inspection
        ],
    },
}


def get_niche_config(niche: str) -> dict:
    """
    Get configuration for a specific niche.
    
    Args:
        niche: Niche identifier (property, dentists, medical, etc.)
    
    Returns:
        dict: Niche configuration merged with global settings
    
    Raises:
        ValueError: If niche doesn't exist
    """
    if niche not in GSC_CONFIG:
        available = list(GSC_CONFIG.keys())
        raise ValueError(
            f"Unknown niche: '{niche}'. Available niches: {', '.join(available)}"
        )
    
    config = GSC_CONFIG[niche].copy()
    config['global'] = GLOBAL_CONFIG
    config['niche'] = niche
    
    return config


def get_enabled_niches() -> list:
    """
    Get list of enabled niches.
    
    Returns:
        list: Niche identifiers that have enabled=True
    """
    return [
        niche 
        for niche, config in GSC_CONFIG.items() 
        if config.get('enabled', False)
    ]


def get_all_niches() -> list:
    """
    Get list of all configured niches (enabled or not).
    
    Returns:
        list: All niche identifiers
    """
    return list(GSC_CONFIG.keys())


def add_niche(niche_name: str, config: dict):
    """
    Add a new niche dynamically (for future expansion).
    
    Args:
        niche_name: Identifier for the new niche (e.g., 'legal')
        config: Configuration dict with required keys:
            - site_url: GSC property URL
            - blog_topics_table: Supabase table name
            - content_dir: Path to blog content
            - git_repo_path: Path to git repo
            - enabled: Boolean
            - start_date: When site went live
    
    Example:
        add_niche('legal', {
            'site_url': 'sc-domain:legalfinancepartners.co.uk',
            'blog_topics_table': 'blog_topics_legal',
            'content_dir': 'Legal/web/src/content/blog',
            'git_repo_path': 'Legal/web',
            'enabled': True,
            'start_date': '2026-05-01',
        })
    """
    required_keys = ['site_url', 'blog_topics_table', 'content_dir', 'git_repo_path']
    
    for key in required_keys:
        if key not in config:
            raise ValueError(f"Missing required config key: {key}")
    
    GSC_CONFIG[niche_name] = config
    print(f"[CONFIG] Added niche: {niche_name}")
    print(f"[CONFIG] Site URL: {config['site_url']}")
    print(f"[CONFIG] Enabled: {config.get('enabled', False)}")


def validate_config():
    """
    Validate all niche configurations.
    
    Returns:
        tuple: (is_valid, errors)
    """
    errors = []
    
    for niche, config in GSC_CONFIG.items():
        # Check required keys
        required = ['site_url', 'blog_topics_table', 'content_dir', 'git_repo_path']
        for key in required:
            if key not in config:
                errors.append(f"{niche}: Missing required key '{key}'")
        
        # Check verdict thresholds
        if 'verdict_thresholds' in config:
            if 'week1' not in config['verdict_thresholds']:
                errors.append(f"{niche}: Missing 'week1' thresholds")
            if 'cumulative' not in config['verdict_thresholds']:
                errors.append(f"{niche}: Missing 'cumulative' thresholds")
    
    return (len(errors) == 0, errors)


if __name__ == "__main__":
    # Validate configuration
    is_valid, errors = validate_config()
    
    if is_valid:
        print("[OK] Configuration is valid")
        print(f"\nConfigured niches: {', '.join(get_all_niches())}")
        print(f"Enabled niches: {', '.join(get_enabled_niches())}")
    else:
        print("[ERROR] Configuration validation failed:")
        for error in errors:
            print(f"  - {error}")
