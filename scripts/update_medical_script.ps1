# Update the fetch_unused_topic function to use correct field names and sorting
(Get-Content Medical/generate_blog_supabase.py) -replace 'used.*eq\.false', 'status=eq.pending' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace 'publish_priority\.desc\.nullslast,keyword_difficulty\.asc\.nullslast', 'priority.asc,difficulty.asc.nullslast' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace 'topic_row\["topic"\]', 'topic_row["keyword"]' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace 'topic = topic_data\["topic"\]', 'topic = topic_data["keyword"]' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace 'primary_keyword = topic_data\.get\("primary_keyword", topic\)', 'primary_keyword = topic_data.get("keyword", topic)' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace 'secondary_keywords = topic_data\.get\("secondary_keywords", \[\]\)', 'secondary_keywords = []' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace 'user_intent = topic_data\.get\("user_intent", "informational"\)', 'user_intent = topic_data.get("intent", "informational")' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace 'search_volume = topic_data\.get\("target_search_volume", "unknown"\)', 'search_volume = topic_data.get("search_volume", "unknown")' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace 'content_tier = topic_data\.get\("content_tier", "cluster"\)', 'content_tier = "foundational" if topic_data.get("priority", 50) <= 3 else "cluster"' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace '"used": True', '"status": "published"' | Set-Content Medical/generate_blog_supabase.py
(Get-Content Medical/generate_blog_supabase.py) -replace '"used_at":', '"published_at":' | Set-Content Medical/generate_blog_supabase.py
