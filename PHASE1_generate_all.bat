@echo off
echo ====================================================================================================
echo PHASE 1: GENERATING CORE FOUNDATIONAL POSTS
echo ====================================================================================================
echo.
echo Property: 12 posts (~1 hour)
echo Dentists: 9 posts (~45 min)
echo Total: 21 posts
echo.
echo Press any key to start Property generation...
pause >nul

echo.
echo ====================================================================================================
echo GENERATING PROPERTY POSTS (12 posts)
echo ====================================================================================================
echo.

cd Property
python generate_all_automated.py
cd ..

echo.
echo ====================================================================================================
echo Property generation complete! Check output above.
echo ====================================================================================================
echo.
echo Press any key to start Dentists generation...
pause >nul

echo.
echo ====================================================================================================
echo GENERATING DENTISTS POSTS (9 posts)
echo ====================================================================================================
echo.

cd Dentists
python generate_all_automated.py
cd ..

echo.
echo ====================================================================================================
echo PHASE 1 GENERATION COMPLETE
echo ====================================================================================================
echo.
echo Next steps:
echo 1. Deploy Property: cd Property/web ^&^& vercel --prod ^&^& cd ../..
echo 2. Deploy Dentists: cd Dentists/web ^&^& vercel --prod ^&^& cd ../..
echo 3. REVIEW quality before Phase 2
echo 4. Run Phase 2: python PHASE2_import_comprehensive.py
echo.
echo ====================================================================================================
pause
