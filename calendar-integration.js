// Google Calendar Integration for Appointment Booking
// This file handles calendar availability checking and appointment creation

// Google Calendar API Configuration
const CALENDAR_ID = 'therapieswellness@gmail.com'; // Your calendar ID
// IMPORTANT: Replace with your actual API key from Google Cloud Console
const API_KEY = 'AIzaSyBBzfo877j_O-6O80Ggp4E3mNFv_VEKWS8'; // Get from Google Cloud Console

// Make functions globally available
window.CALENDAR_ID = CALENDAR_ID;
window.API_KEY = API_KEY;

// Check if a time slot is available
async function checkAvailability(date, time) {
    try {
        // Convert date and time to ISO format for Google Calendar
        const dateTime = new Date(`${date}T${time}:00`);
        const endTime = new Date(dateTime.getTime() + 60 * 60 * 1000); // 1 hour session
        
        // Google Calendar API endpoint
        const url = `https://www.googleapis.com/calendar/v3/freeBusy?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timeMin: dateTime.toISOString(),
                timeMax: endTime.toISOString(),
                items: [{ id: CALENDAR_ID }]
            })
        });
        
        const data = await response.json();
        
        // Check if calendar is busy during this time
        if (data.calendars && data.calendars[CALENDAR_ID]) {
            const busy = data.calendars[CALENDAR_ID].busy;
            return busy.length === 0; // Available if no busy periods
        }
        
        return true; // Assume available if check fails
    } catch (error) {
        console.error('Error checking availability:', error);
        return true; // Assume available on error (fallback)
    }
}

// Create appointment in Google Calendar
async function createCalendarEvent(bookingData) {
    try {
        const { name, email, phone, therapy, date, time, message } = bookingData;
        
        // Format date and time
        const startDateTime = new Date(`${date}T${time}:00`);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour
        
        const event = {
            summary: `Wellness Therapy - ${therapy} - ${name}`,
            description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone}\nTherapy: ${therapy}\nNotes: ${message || 'None'}`,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: 'Europe/London', // Adjust to your timezone
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: 'Europe/London',
            },
            attendees: [
                { email: email },
                { email: 'therapieswellness@gmail.com' }
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 60 } // 1 hour before
                ]
            }
        };
        
        // Google Calendar API endpoint
        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        });
        
        const data = await response.json();
        
        if (data.id) {
            console.log('✅ Appointment created in Google Calendar:', data.id);
            return { success: true, eventId: data.id, eventLink: data.htmlLink };
        } else {
            console.error('❌ Failed to create calendar event:', data);
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error('Error creating calendar event:', error);
        return { success: false, error: error.message };
    }
}

// Get available time slots for a specific date
async function getAvailableSlots(date) {
    const slots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30'
    ];
    
    const availableSlots = [];
    
    for (const slot of slots) {
        const isAvailable = await checkAvailability(date, slot);
        if (isAvailable) {
            availableSlots.push(slot);
        }
    }
    
    return availableSlots;
}

// Export functions for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkAvailability, createCalendarEvent, getAvailableSlots };
}

