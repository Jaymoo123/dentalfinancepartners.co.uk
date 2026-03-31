@echo off
chcp 65001 >nul
for /f "tokens=2 delims==" %%a in ('findstr /b "ANTHROPIC_API_KEY=" .env') do set ANTHROPIC_API_KEY=%%a
set PYTHONIOENCODING=utf-8
python agents\generate_niche.py --niche-id medical --display-name "Medical Accountants UK" --target-keyword "gp accountant" --template templates\niches\medical\template.json
