@echo off
cd /d "C:\Users\user\Documents\Accounting"
C:\Python313\python.exe -m optimisation_engine.weekly_run --skip-dataforseo --skip-detect --skip-apply --skip-review >> .cache\daily_run.log 2>&1
