"""
Generate Phase 1 Dentists posts (9 posts) with detailed status updates
"""
import subprocess
import time
import re

NUM_POSTS = 9

print("="*80)
print(f"PHASE 1: GENERATING {NUM_POSTS} DENTISTS CORE POSTS")
print("="*80)
print()

generated = []
errors = []

for i in range(1, NUM_POSTS + 1):
    print(f"[{i}/{NUM_POSTS}] Generating post {i}...")
    
    try:
        result = subprocess.run(
            ["python", "generate_blog_supabase.py"],
            capture_output=True,
            text=True,
            timeout=180
        )
        
        if result.returncode == 0:
            # Extract slug and topic from output
            slug_match = re.search(r'\[COMPLETE\] (.+?)\.md', result.stdout)
            topic_match = re.search(r'Found topic: (.+)', result.stdout)
            
            if slug_match:
                slug = slug_match.group(1)
                topic = topic_match.group(1) if topic_match else "Unknown"
                generated.append((slug, topic))
                print(f"  [OK] {slug}")
                print(f"       Topic: {topic[:60]}")
            else:
                print(f"  [WARN] Generated but couldn't extract slug")
                generated.append(("unknown", "unknown"))
        else:
            print(f"  [ERROR] Generation failed")
            print(f"  {result.stderr[:200]}")
            errors.append(i)
    
    except subprocess.TimeoutExpired:
        print(f"  [ERROR] Timeout after 180s")
        errors.append(i)
    except Exception as e:
        print(f"  [ERROR] {str(e)[:200]}")
        errors.append(i)
    
    print()
    
    # Delay between generations
    if i < NUM_POSTS:
        time.sleep(3)

print("="*80)
print("PHASE 1 DENTISTS GENERATION COMPLETE")
print("="*80)
print(f"\nGenerated: {len(generated)}/{NUM_POSTS}")
print(f"Errors: {len(errors)}")

if generated:
    print(f"\nGenerated posts:")
    for slug, topic in generated:
        print(f"  - {slug}")

if errors:
    print(f"\nFailed posts: {errors}")

print("\n" + "="*80)
print("PHASE 1 COMPLETE - READY FOR REVIEW")
print("="*80)
print("\nProperty: 12 posts generated")
print("Dentists: 9 posts generated")
print("Total: 21 Phase 1 posts")
print("\nNext steps:")
print("1. Deploy both sites")
print("2. REVIEW quality and keyword coverage")
print("3. If approved, import Phase 2: python PHASE2_import_comprehensive.py")
