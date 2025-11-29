# Google Calendar Integration - Quick Setup Guide

## 📋 Step-by-Step Instructions

### **Step 1: Get Google Calendar API Key** (5 minutes)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with: `therapieswellness@gmail.com`

2. **Create Project**
   - Click "Select a project" (top bar)
   - Click "New Project"
   - Name: `Wellness Therapies Booking`
   - Click "Create"
   - Wait for project to be created, then select it

3. **Enable Calendar API**
   - Click "APIs & Services" (left menu)
   - Click "Library"
   - Search: `Google Calendar API`
   - Click on "Google Calendar API"
   - Click "Enable" button
   - Wait for it to enable

4. **Create API Key**
   - Click "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - **Copy the API key** (starts with `AIzaSy...`)
   - Click "Restrict Key" (recommended)
     - Under "API restrictions": Select "Restrict key" → Choose "Google Calendar API"
     - Click "Save"

### **Step 2: Configure Calendar** (2 minutes)

1. **Open Google Calendar**
   - Go to: https://calendar.google.com/
   - Make sure you're signed in as `therapieswellness@gmail.com`

2. **Share Calendar**
   - Find your calendar on the left sidebar
   - Click the three dots (⋮) next to it
   - Click "Settings and sharing"
   - Scroll to "Access permissions"
   - Check ✅ "Make available to public" 
   - OR share with specific people if you prefer

### **Step 3: Update Your Code** (2 minutes)

1. **Open `calendar-integration.js`**
   - Find this line: `const API_KEY = 'YOUR_GOOGLE_CALENDAR_API_KEY';`
   - Replace `YOUR_GOOGLE_CALENDAR_API_KEY` with your actual API key
   - Example: `const API_KEY = 'AIzaSyAbCdEf1234567890';`

2. **Check Calendar ID**
   - Line should be: `const CALENDAR_ID = 'therapieswellness@gmail.com';`
   - If your calendar uses a different ID, update it

3. **Update Timezone (if needed)**
   - Find lines with `timeZone: 'America/New_York'`
   - Change to your timezone (e.g., `'America/Los_Angeles'`, `'Europe/London'`)

### **Step 4: Test It** (5 minutes)

1. **Open your website**
2. **Try booking an appointment**
3. **Check your Google Calendar** - you should see the event created
4. **Check your email** - you should receive a calendar invite

## ✅ What You'll Get

- ✅ Automatic calendar event creation
- ✅ Calendar invites sent to you and client
- ✅ Real-time availability checking
- ✅ Prevents double-booking
- ✅ All appointments in your Google Calendar

## 🔒 Security Notes

- **Never share your API key publicly**
- **Don't commit API key to GitHub** (use environment variables for production)
- **Restrict your API key** to your website domain only

## 🐛 Troubleshooting

### "API key not valid"
- Check that you copied the full API key
- Make sure Calendar API is enabled
- Wait a few minutes after creating the key

### "Calendar not found"
- Verify calendar ID is correct (usually your email)
- Check calendar sharing settings

### "Permission denied"
- Make sure calendar is shared (Step 2)
- Check API key restrictions

### Events not appearing
- Check timezone settings
- Verify calendar ID is correct
- Check browser console for errors

## 📞 Need Help?

- Google Calendar API Docs: https://developers.google.com/calendar/api
- Check browser console (F12) for error messages
- Verify all steps were completed

## 🎯 Quick Checklist

- [ ] Created Google Cloud project
- [ ] Enabled Calendar API
- [ ] Created and copied API key
- [ ] Shared calendar (made public or shared)
- [ ] Updated `calendar-integration.js` with API key
- [ ] Updated timezone if needed
- [ ] Tested booking an appointment
- [ ] Verified event appears in Google Calendar

Once all checked, your Google Calendar integration is complete! 🎉

