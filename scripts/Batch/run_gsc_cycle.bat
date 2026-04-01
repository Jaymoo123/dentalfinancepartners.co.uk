@echo off
REM GSC Optimization Cycle - Windows Batch Script
REM Run daily to fetch data, analyze opportunities, and track performance

echo ================================================================================
echo GSC SMART CONTENT OPTIMIZATION CYCLE
echo ================================================================================
echo.

REM Check if specific site provided
if "%1"=="" (
    echo Running for ALL enabled sites...
    python agents\run_gsc_optimization_cycle.py
) else (
    echo Running for %1 site...
    python agents\run_gsc_optimization_cycle.py %1
)

echo.
echo ================================================================================
echo CYCLE COMPLETE
echo ================================================================================
echo.
echo Next steps:
echo   1. Review opportunities: python agents\review_gsc_opportunities.py
echo   2. Check rollbacks: python agents\review_gsc_opportunities.py --rollbacks
echo.

pause
