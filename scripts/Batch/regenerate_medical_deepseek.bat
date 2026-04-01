@echo off
REM Regenerate Medical niche with DeepSeek API
REM This script sets environment variables and runs the generator

echo ================================================================================
echo MEDICAL NICHE REGENERATION - DeepSeek API
echo ================================================================================
echo.
echo This will:
echo 1. Remove existing Medical folder
echo 2. Generate fresh Medical niche using DeepSeek
echo 3. Run 9-gate verification pipeline
echo 4. Cost: ~$0.10-0.15 (vs $1.80 with Claude)
echo.
echo Press Ctrl+C to cancel, or
pause

REM Set environment variables
set DEEPSEEK_API_KEY=sk-4a3a56e8f95f4aeb92585a67ec9b6388
set PYTHONIOENCODING=utf-8

REM Remove existing Medical folder
echo.
echo [1/3] Removing existing Medical folder...
if exist Medical (
    rmdir /s /q Medical
    echo [OK] Medical folder removed
) else (
    echo [SKIP] Medical folder does not exist
)

REM Generate Medical niche with DeepSeek
echo.
echo [2/3] Generating Medical niche with DeepSeek...
python agents/generate_niche.py --niche-id medical --display-name "Medical Accountants UK" --target-keyword "gp accountant" --template templates/niches/medical/template.json --model deepseek

REM Check exit code
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [OK] Medical niche generated successfully
    echo.
    echo [3/3] Next steps:
    echo   1. Review medical_generation_report.json
    echo   2. Test locally: cd Medical/web ^&^& npm install ^&^& npm run dev
    echo   3. Verify quality vs Claude baseline
    echo   4. If satisfied, commit changes
) else (
    echo.
    echo [FAILED] Medical niche generation failed
    echo Check output above for errors
)

echo.
pause
