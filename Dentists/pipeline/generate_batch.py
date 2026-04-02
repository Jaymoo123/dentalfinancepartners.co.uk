"""
Generate multiple blog posts in one run.
Marks topics as used via direct SQL execution (workaround for anon key permissions).
"""
import os
import sys
import subprocess
import time

# Number of posts to generate
NUM_POSTS = 20

print("=" * 60)
print(f"Generating {NUM_POSTS} blog posts")
print("=" * 60)

generated_slugs = []
generated_ids = []

for i in range(1, NUM_POSTS + 1):
    print(f"\n[{i}/{NUM_POSTS}] Generating post...")
    
    try:
        # Run the generation script
        # Assumes ANTHROPIC_API_KEY is set in environment
        result = subprocess.run(
            ["python", "generate_blog_supabase.py"],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print(f"[OK] Post {i} generated")
            
            # Extract slug from output
            for line in result.stdout.split('\n'):
                if '[COMPLETE]' in line:
                    slug = line.split('[COMPLETE]')[1].strip().replace('.md', '')
                    generated_slugs.append(slug)
                    print(f"    Slug: {slug}")
                    break
        else:
            print(f"[ERROR] Post {i} failed:")
            print(result.stderr)
            
    except Exception as e:
        print(f"[ERROR] Post {i} exception: {e}")
    
    # Small delay to avoid rate limits
    if i < NUM_POSTS:
        time.sleep(2)

print("\n" + "=" * 60)
print(f"Generation complete!")
print(f"Generated {len(generated_slugs)} posts")
print("=" * 60)

if generated_slugs:
    print("\nGenerated posts:")
    for slug in generated_slugs:
        print(f"  - {slug}")
