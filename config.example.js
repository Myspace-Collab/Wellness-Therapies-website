// Configuration file template
// Copy this file to config.js and fill in your actual API keys
// DO NOT commit config.js to GitHub - it's in .gitignore

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY_HERE'; // Get from EmailJS dashboard

// Google Calendar API Configuration
const GOOGLE_CALENDAR_API_KEY = 'YOUR_GOOGLE_CALENDAR_API_KEY_HERE'; // Get from Google Cloud Console
const GOOGLE_CALENDAR_ID = 'therapieswellness@gmail.com'; // Your calendar email

// Make configuration available globally
window.EMAILJS_PUBLIC_KEY = EMAILJS_PUBLIC_KEY;
window.GOOGLE_CALENDAR_API_KEY = GOOGLE_CALENDAR_API_KEY;
window.GOOGLE_CALENDAR_ID = GOOGLE_CALENDAR_ID;


