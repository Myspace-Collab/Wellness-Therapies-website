# Auto-push script for GitHub
# Run this script after making changes to automatically commit and push

Write-Host "=== Auto-Push to GitHub ===" -ForegroundColor Cyan

# Navigate to repository directory
$repoPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repoPath

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Error: Not a git repository. Please initialize git first." -ForegroundColor Red
    exit 1
}

# Get current branch
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $branch" -ForegroundColor Yellow

# Check for changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Green
    exit 0
}

# Show changes
Write-Host "`nChanges detected:" -ForegroundColor Yellow
git status --short

# Add all changes
Write-Host "`nAdding changes..." -ForegroundColor Cyan
git add .

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto-commit: $timestamp"
Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m $commitMessage

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Error pushing to GitHub. Please check your connection." -ForegroundColor Red
    exit 1
}

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
