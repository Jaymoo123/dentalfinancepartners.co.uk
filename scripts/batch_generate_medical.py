"""
Batch generate Medical blog posts.
"""
import subprocess
import time

# Number of posts to generate
BATCH_SIZE = 24

print(f'Starting batch generation of {BATCH_SIZE} Medical blog posts...')
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
print('Batch generation complete!')
