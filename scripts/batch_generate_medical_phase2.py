"""
Batch generate remaining Medical blog posts (Phase 2 specialized content).
"""
import subprocess
import time

# Generate all remaining pending posts
BATCH_SIZE = 27

print(f'Starting Phase 2 batch generation of {BATCH_SIZE} specialized Medical blog posts...')
print('=' * 60)

for i in range(BATCH_SIZE):
    print(f'\n[{i+1}/{BATCH_SIZE}] Generating post...')
    
    try:
        result = subprocess.run(
            ['python', 'Medical/generate_blog_supabase.py'],
            cwd='.',
            capture_output=False,
            text=True,
            timeout=120
        )
        
        if result.returncode == 0:
            print(f'[{i+1}/{BATCH_SIZE}] SUCCESS')
        else:
            print(f'[{i+1}/{BATCH_SIZE}] FAILED with return code {result.returncode}')
            break
            
    except subprocess.TimeoutExpired:
        print(f'[{i+1}/{BATCH_SIZE}] TIMEOUT - skipping')
        continue
    except Exception as e:
        print(f'[{i+1}/{BATCH_SIZE}] ERROR: {e}')
        break
    
    # Small delay between posts
    time.sleep(2)

print('\n' + '=' * 60)
print('Phase 2 batch generation complete!')
print('Run: Get-ChildItem Medical/web/content/blog -Filter *.md | Measure-Object')
