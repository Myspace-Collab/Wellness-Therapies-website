# Security Setup Guide

## ⚠️ IMPORTANT: API Keys Exposed

If GitHub notified you that API keys are exposed, you need to:

1. **Revoke the exposed keys immediately**
2. **Create new API keys**
3. **Set up the secure configuration**

---

## Step 1: Revoke Exposed API Keys

### EmailJS Public Key
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Navigate to **Account** → **General**
3. Find your public key and **revoke/regenerate** it
4. Get your new public key

### Google Calendar API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find the exposed API key (`AIzaSyBBzfo877j_O-6O80Ggp4E3mNFv_VEKWS8`)
4. Click on it and **Delete** or **Restrict** it
5. Create a new API key if needed

---

## Step 2: Set Up Secure Configuration

### Option A: Local Development (Recommended)

1. **Copy the example config file:**
   ```bash
   cp config.example.js config.js
   ```

2. **Edit `config.js` and add your API keys:**
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'your-new-emailjs-key-here';
   const GOOGLE_CALENDAR_API_KEY = 'your-new-google-api-key-here';
   ```

3. **Verify `config.js` is in `.gitignore`:**
   - The file should NOT be committed to GitHub
   - Check that `.gitignore` contains `config.js`

### Option B: GitHub Pages / Static Hosting

For static hosting (GitHub Pages, Netlify, etc.), you have two options:

#### Option B1: Environment Variables (if supported)
- Some hosts support environment variables
- Check your hosting provider's documentation

#### Option B2: Use Public Keys (EmailJS only)
- EmailJS public keys are safe to expose (they're meant to be public)
- Google Calendar API keys should be restricted to your domain
- Restrict the Google API key to only allow requests from your domain

---

## Step 3: Verify Setup

1. **Check that `config.js` exists locally** (with your keys)
2. **Verify `config.js` is NOT in GitHub:**
   - Go to your GitHub repository
   - Search for `config.js`
   - It should NOT appear in the repository
3. **Test the website:**
   - Contact form should send emails
   - Booking form should work
   - Check browser console for any errors

---

## File Structure

```
Wellness-Therapies-website/
├── config.example.js      ← Template (safe to commit)
├── config.js              ← Your actual keys (NOT committed)
├── .gitignore            ← Ensures config.js is ignored
├── script.js             ← Uses keys from config.js
└── calendar-integration.js ← Uses keys from config.js
```

---

## Security Best Practices

✅ **DO:**
- Keep `config.js` in `.gitignore`
- Use `config.example.js` as a template
- Restrict Google API keys to your domain
- Regularly rotate API keys
- Monitor API usage in dashboards

❌ **DON'T:**
- Commit `config.js` to GitHub
- Share API keys in emails/messages
- Use production keys in development
- Leave API keys unrestricted

---

## Troubleshooting

### "EmailJS not initialized"
- Check that `config.js` exists and has `EMAILJS_PUBLIC_KEY` set
- Verify `config.js` is loaded before `script.js` in `index.html`

### "Google Calendar API key not configured"
- Check that `config.js` exists and has `GOOGLE_CALENDAR_API_KEY` set
- Verify the API key is correct and not revoked

### "config.js not found"
- Create `config.js` from `config.example.js`
- Make sure it's in the same directory as `index.html`

---

## Need Help?

If you're still having issues:
1. Check browser console (F12) for errors
2. Verify all files are in the correct locations
3. Ensure `config.js` is loaded before other scripts


