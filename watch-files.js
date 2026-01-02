// File watcher for auto-commit and push
// Install: npm install chokidar
// Run: node watch-files.js

const { exec } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');

console.log('🔍 Watching for file changes...');
console.log('Press Ctrl+C to stop\n');

// Watch for changes in these file types
const watcher = chokidar.watch([
    '*.html',
    '*.css',
    '*.js',
    '*.json'
], {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
});

let timeout;
const DEBOUNCE_TIME = 5000; // Wait 5 seconds after last change before committing

watcher.on('change', (filePath) => {
    console.log(`📝 File changed: ${filePath}`);
    
    // Clear previous timeout
    clearTimeout(timeout);
    
    // Set new timeout to commit after no changes for 5 seconds
    timeout = setTimeout(() => {
        console.log('\n⏳ Committing changes...');
        
        exec('git add .', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error adding files: ${error}`);
                return;
            }
            
            const timestamp = new Date().toLocaleString();
            const commitMessage = `Auto-commit: ${timestamp}`;
            
            exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error committing: ${error}`);
                    return;
                }
                
                console.log('✅ Committed!');
                console.log('📤 Pushing to GitHub...');
                
                exec('git push origin main', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`❌ Error pushing: ${error}`);
                        return;
                    }
                    
                    console.log('✅ Successfully pushed to GitHub!\n');
                });
            });
        });
    }, DEBOUNCE_TIME);
});

watcher.on('error', error => console.error('Watcher error:', error));

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
