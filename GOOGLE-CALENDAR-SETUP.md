# Google Calendar Integration Setup Guide

This guide will help you integrate Google Calendar with your booking system to automatically check availability and create appointments.

## Prerequisites

- Google account (therapieswellness@gmail.com)
- Google Calendar access
- Basic understanding of APIs

## Step 1: Enable Google Calendar API

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account (therapieswellness@gmail.com)

2. **Create a New Project**
   - Click "Select a project" → "New Project"
   - Name: "Wellness Therapies Booking"
   - Click "Create"

3. **Enable Google Calendar API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Calendar API"
   - Click on it and press "Enable"

## Step 2: Create API Credentials

1. **Go to Credentials**
   - Navigate to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"

2. **Restrict API Key (Recommended)**
   - Click on your newly created API key
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Calendar API"
   - Under "Application restrictions", you can restrict by HTTP referrer (your website URL)
   - Click "Save"

3. **Copy Your API Key**
   - Copy the API key (looks like: `AIzaSy...`)

## Step 3: Configure Calendar Sharing

1. **Open Google Calendar**
   - Go to https://calendar.google.com/

2. **Share Your Calendar**
   - Click the three dots next to your calendar → "Settings and sharing"
   - Under "Share with specific people", add your email
   - Set permission to "Make changes to events"
   - Under "Access permissions", check "Make available to public" (for free/busy info)

## Step 4: Update Your Code

1. **Update `calendar-integration.js`**
   - Replace `YOUR_GOOGLE_CALENDAR_API_KEY` with your actual API key
   - Replace timezone if needed (currently set to 'America/New_York')

2. **Add to HTML**
   ```html
   <script src="calendar-integration.js"></script>
   ```

## Step 5: Update Booking Form

The booking form will now:
- Check availability before allowing booking
- Create calendar events automatically
- Send calendar invites to both you and the client

## Alternative: Use OAuth 2.0 (More Secure)

For production use, consider OAuth 2.0 instead of API keys:

1. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Authorized JavaScript origins: Your website URL
   - Authorized redirect URIs: Your website URL

2. **Update Code**
   - Use OAuth 2.0 flow for authentication
   - More secure but requires user consent

## Testing

1. Test availability checking
2. Test calendar event creation
3. Verify events appear in your Google Calendar
4. Check that email invites are sent

## Troubleshooting

- **"API key not valid"**: Check that API key is correct and Calendar API is enabled
- **"Calendar not found"**: Verify calendar ID is correct
- **"Permission denied"**: Check calendar sharing settings
- **CORS errors**: Use a backend proxy or enable CORS in Google Cloud Console

## Security Notes

- Never commit API keys to GitHub
- Use environment variables for API keys
- Restrict API keys to specific domains
- Consider using OAuth 2.0 for production

## Next Steps

1. Set up the API key
2. Test the integration
3. Deploy to your website
4. Monitor calendar events

For questions or issues, refer to Google Calendar API documentation: https://developers.google.com/calendar/api

