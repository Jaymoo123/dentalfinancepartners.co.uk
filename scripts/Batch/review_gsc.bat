@echo off
REM GSC Optimization Review - Windows Batch Script
REM Interactive review of optimization opportunities

echo ================================================================================
echo GSC OPTIMIZATION REVIEW
echo ================================================================================
echo.

REM Check if specific site or flag provided
if "%1"=="--rollbacks" (
    echo Reviewing ROLLBACK CANDIDATES only...
    python agents\review_gsc_opportunities.py --rollbacks
) else if "%1"=="" (
    echo Reviewing ALL sites...
    python agents\review_gsc_opportunities.py
) else (
    echo Reviewing %1 site...
    python agents\review_gsc_opportunities.py %1
)

echo.
pause
