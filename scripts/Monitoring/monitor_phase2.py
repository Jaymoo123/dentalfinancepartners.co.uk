"""
Monitor Phase 2 generation progress for both sites
"""
import time
from datetime import datetime
import os
from pathlib import Path

base_dir = r'c:\Users\user\Documents\Accounting'
property_blog_dir = os.path.join(base_dir, 'Property', 'web', 'content', 'blog')
dentists_blog_dir = os.path.join(base_dir, 'Dentists', 'web', 'content', 'blog')

print("="*100)
print("PHASE 2 GENERATION MONITOR")
print("="*100)
print(f"\nStarted monitoring at: {datetime.now().strftime('%H:%M:%S')}")
print("\nThis will check progress every 5 minutes...")
print("Press Ctrl+C to stop monitoring")
print()

initial_property_count = len(list(Path(property_blog_dir).glob('*.md')))
initial_dentists_count = len(list(Path(dentists_blog_dir).glob('*.md')))

print(f"Initial counts:")
print(f"  Property: {initial_property_count} posts")
print(f"  Dentists: {initial_dentists_count} posts")
print()

target_property = initial_property_count + 130
target_dentists = initial_dentists_count + 12

try:
    while True:
        time.sleep(300)  # 5 minutes
        
        current_property = len(list(Path(property_blog_dir).glob('*.md')))
        current_dentists = len(list(Path(dentists_blog_dir).glob('*.md')))
        
        property_progress = current_property - initial_property_count
        dentists_progress = current_dentists - initial_dentists_count
        
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Progress Update:")
        print(f"  Property: {property_progress}/130 posts ({property_progress/130*100:.1f}%)")
        print(f"  Dentists: {dentists_progress}/12 posts ({dentists_progress/12*100:.1f}%)")
        print(f"  Total: {property_progress + dentists_progress}/142 posts")
        
        if current_property >= target_property and current_dentists >= target_dentists:
            print("\n" + "="*100)
            print("PHASE 2 GENERATION COMPLETE!")
            print("="*100)
            print(f"\nProperty: {current_property} posts (target: {target_property})")
            print(f"Dentists: {current_dentists} posts (target: {target_dentists})")
            break

except KeyboardInterrupt:
    print("\n\nMonitoring stopped by user")
    current_property = len(list(Path(property_blog_dir).glob('*.md')))
    current_dentists = len(list(Path(dentists_blog_dir).glob('*.md')))
    print(f"\nCurrent progress:")
    print(f"  Property: {current_property - initial_property_count}/130")
    print(f"  Dentists: {current_dentists - initial_dentists_count}/12")
