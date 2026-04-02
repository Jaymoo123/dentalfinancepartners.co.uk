import shutil

# Copy the Property version
shutil.copy('Property/generate_blog_supabase.py', 'Medical/generate_blog_supabase.py')

# Read the file
with open('Medical/generate_blog_supabase.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Simple replacements
replacements = [
    ('blog_topics_property', 'blog_topics_medical'),
    ('UK landlords and property investors', 'UK medical professionals (GPs, consultants, and locum doctors)'),
    ('"used": "eq.false"', '"status": "eq.pending"'),
    ('"order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc"', '"order": "priority.asc,difficulty.asc.nullslast,created_at.asc"'),
    ('topic["topic"]', 'topic["keyword"]'),
    ('topic_data["topic"]', 'topic_data["keyword"]'),
    ('topic_data.get("primary_keyword", topic)', 'topic_data.get("keyword", topic)'),
    ('topic_data.get("secondary_keywords", [])', '[]'),
    ('topic_data.get("user_intent", "informational")', 'topic_data.get("intent", "informational")'),
    ('topic_data.get("target_search_volume", "unknown")', 'topic_data.get("search_volume", "unknown")'),
    ('topic_data.get("content_tier", "cluster")', '"foundational" if topic_data.get("priority", 50) <= 3 else "cluster"'),
    ('"used": True', '"status": "published"'),
    ('"used_at":', '"published_at":'),
    ('topic.get("publish_priority", "N/A")', 'topic.get("priority", "N/A")'),
    ('topic.get("keyword_difficulty", "N/A")', 'topic.get("difficulty", "N/A")'),
    ('topic_row.get("publish_priority", "N/A")', 'topic_row.get("priority", "N/A")'),
    ('topic_row.get("keyword_difficulty", "N/A")', 'topic_row.get("difficulty", "N/A")'),
    ('topic_row["topic"]', 'topic_row["keyword"]'),
    ('topic_row.get("primary_keyword")', 'topic_row.get("keyword")'),
]

for old, new in replacements:
    content = content.replace(old, new)

# Write back
with open('Medical/generate_blog_supabase.py', 'w', encoding='utf-8') as f:
    f.write(content)

print('Medical generation script created successfully')
