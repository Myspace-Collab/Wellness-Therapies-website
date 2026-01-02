# Automated GitHub Upload Guide

This guide explains how to automatically upload changes to GitHub.

## Method 1: PowerShell Script (Recommended for Windows)

### Setup:
1. The `auto-push.ps1` script is already created
2. Right-click the script → Properties → Unblock (if needed)

### Usage:
**Option A: Run manually**
- Right-click `auto-push.ps1` → "Run with PowerShell"
- Or open PowerShell in the folder and run: `.\auto-push.ps1`

**Option B: Create a shortcut**
1. Right-click `auto-push.ps1` → Create Shortcut
2. Place shortcut on desktop
3. Double-click whenever you want to push changes

**Option C: Run from command line**
```powershell
cd "C:\Users\User\OneDrive\Wellness\Wellness-Therapies-website"
.\auto-push.ps1
```

## Method 2: Batch File (Easier for Windows)

### Usage:
- Simply double-click `auto-push.bat`
- It will automatically commit and push all changes

## Method 3: Watch Script (Auto-detect changes)

### Setup:
1. Install Node.js (if not already installed)
2. Create `package.json` with watch script
3. Run: `npm run watch`

This will automatically detect file changes and push them.

## Method 4: GitHub Desktop (Manual but Easy)

1. Open GitHub Desktop
2. Make your changes
3. Write commit message
4. Click "Commit to main"
5. Click "Push origin"

## Method 5: Git Hooks (Advanced)

### Setup post-commit hook:
1. Navigate to `.git/hooks/` folder
2. Create `post-commit` file (no extension)
3. Add: `git push origin main`
4. Make it executable

**Note:** This automatically pushes after every commit.

## Recommended Workflow:

1. **Make changes** to your files
2. **Run auto-push script** (double-click `auto-push.bat` or `auto-push.ps1`)
3. **Done!** Changes are automatically committed and pushed

## Troubleshooting:

- **"Git not found"**: Install Git or add to PATH
- **"Not a git repository"**: Initialize git first: `git init`
- **"Permission denied"**: Check GitHub credentials
- **"Nothing to commit"**: No changes detected

## Security Note:

The auto-push scripts commit ALL changes. Make sure you only want to commit the files you've modified.

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
