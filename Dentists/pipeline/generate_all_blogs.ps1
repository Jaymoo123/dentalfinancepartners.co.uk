# Generate all blog posts from Supabase topics
# Run this script to generate all unused topics
# Set ANTHROPIC_API_KEY environment variable before running

if (-not $env:ANTHROPIC_API_KEY) {
    Write-Host "ERROR: ANTHROPIC_API_KEY environment variable not set" -ForegroundColor Red
    exit 1
}

$totalToGenerate = 40
$generated = 0
$errors = 0

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Generating $totalToGenerate blog posts from Supabase" -ForegroundColor Cyan
Write-Host "============================================================`n" -ForegroundColor Cyan

for ($i = 1; $i -le $totalToGenerate; $i++) {
    Write-Host "[$i/$totalToGenerate] Generating post..." -ForegroundColor Yellow
    
    try {
        python generate_blog_supabase.py
        if ($LASTEXITCODE -eq 0) {
            $generated++
            Write-Host "[OK] Post $i generated successfully`n" -ForegroundColor Green
        } else {
            $errors++
            Write-Host "[ERROR] Post $i failed`n" -ForegroundColor Red
        }
    } catch {
        $errors++
        Write-Host "[ERROR] Post $i failed: $_`n" -ForegroundColor Red
    }
    
    # Small delay to avoid rate limits
    if ($i -lt $totalToGenerate) {
        Start-Sleep -Seconds 2
    }
}

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "Generation complete!" -ForegroundColor Cyan
Write-Host "Generated: $generated" -ForegroundColor Green
Write-Host "Errors: $errors" -ForegroundColor Red
Write-Host "============================================================" -ForegroundColor Cyan
