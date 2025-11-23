@echo off
REM Auto-push batch script for GitHub
REM Double-click this file to automatically commit and push changes

echo === Auto-Push to GitHub ===

cd /d "%~dp0"

REM Check if git is available
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Git is not installed or not in PATH
    pause
    exit /b 1
)

REM Check for changes
git status --porcelain >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo No changes to commit.
    pause
    exit /b 0
)

echo.
echo Changes detected. Committing and pushing...
echo.

REM Add all changes
git add .

REM Commit with timestamp
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set timestamp=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2% %datetime:~8,2%:%datetime:~10,2%:%datetime:~12,2%
git commit -m "Auto-commit: %timestamp%"

REM Push to GitHub
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Successfully pushed to GitHub!
) else (
    echo.
    echo Error pushing to GitHub. Please check your connection.
)

pause

