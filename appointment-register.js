// Appointment Register System
// Stores appointments locally and can sync with Google Calendar

class AppointmentRegister {
    constructor() {
        this.storageKey = 'wellness_appointments';
        this.appointments = this.loadAppointments();
    }
    
    // Load appointments from localStorage
    loadAppointments() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading appointments:', error);
            return [];
        }
    }
    
    // Save appointments to localStorage
    saveAppointments() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.appointments));
            return true;
        } catch (error) {
            console.error('Error saving appointments:', error);
            return false;
        }
    }
    
    // Check if a time slot is booked
    isSlotBooked(date, time) {
        return this.appointments.some(apt => {
            return apt.date === date && apt.time === time;
        });
    }
    
    // Get all appointments for a specific date
    getAppointmentsByDate(date) {
        return this.appointments.filter(apt => apt.date === date);
    }
    
    // Get booked time slots for a date
    getBookedSlots(date) {
        const appointments = this.getAppointmentsByDate(date);
        return appointments.map(apt => apt.time);
    }
    
    // Get available time slots for a date
    getAvailableSlots(date) {
        const allSlots = [
            '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30'
        ];
        
        const bookedSlots = this.getBookedSlots(date);
        return allSlots.filter(slot => !bookedSlots.includes(slot));
    }
    
    // Add a new appointment
    addAppointment(appointmentData) {
        const appointment = {
            id: Date.now().toString(),
            ...appointmentData,
            createdAt: new Date().toISOString(),
            status: 'pending' // pending, confirmed, cancelled
        };
        
        // Check if slot is already booked
        if (this.isSlotBooked(appointment.date, appointment.time)) {
            return { success: false, error: 'This time slot is already booked. Please select another time.' };
        }
        
        this.appointments.push(appointment);
        if (this.saveAppointments()) {
            return { success: true, appointment: appointment };
        } else {
            return { success: false, error: 'Failed to save appointment.' };
        }
    }
    
    // Get all appointments
    getAllAppointments() {
        return this.appointments.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });
    }
    
    // Get upcoming appointments
    getUpcomingAppointments() {
        const now = new Date();
        return this.appointments.filter(apt => {
            const aptDate = new Date(`${apt.date}T${apt.time}`);
            return aptDate >= now;
        }).sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });
    }
    
    // Update appointment status
    updateAppointmentStatus(id, status) {
        const appointment = this.appointments.find(apt => apt.id === id);
        if (appointment) {
            appointment.status = status;
            this.saveAppointments();
            return true;
        }
        return false;
    }
    
    // Delete appointment
    deleteAppointment(id) {
        const index = this.appointments.findIndex(apt => apt.id === id);
        if (index !== -1) {
            this.appointments.splice(index, 1);
            this.saveAppointments();
            return true;
        }
        return false;
    }
    
    // Export appointments (for backup or sync)
    exportAppointments() {
        return JSON.stringify(this.appointments, null, 2);
    }
    
    // Import appointments (for restore or sync)
    importAppointments(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            if (Array.isArray(imported)) {
                this.appointments = imported;
                this.saveAppointments();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing appointments:', error);
            return false;
        }
    }
}

// Initialize appointment register
const appointmentRegister = new AppointmentRegister();

// Function to check availability before booking
function checkAppointmentAvailability(date, time) {
    return !appointmentRegister.isSlotBooked(date, time);
}

// Function to update available time slots in the dropdown
function updateAvailableTimeSlots(date) {
    const timeSelect = document.getElementById('bookingTime');
    if (!timeSelect) return;
    
    // Get available slots
    const availableSlots = appointmentRegister.getAvailableSlots(date);
    
    // Store current value
    const currentValue = timeSelect.value;
    
    // Clear and repopulate
    timeSelect.innerHTML = '<option value="">Select Time</option>';
    
    const timeLabels = {
        '10:00': '10:00 AM', '10:30': '10:30 AM',
        '11:00': '11:00 AM', '11:30': '11:30 AM',
        '12:00': '12:00 PM', '12:30': '12:30 PM',
        '13:00': '1:00 PM', '13:30': '1:30 PM',
        '14:00': '2:00 PM', '14:30': '2:30 PM',
        '15:00': '3:00 PM', '15:30': '3:30 PM'
    };
    
    availableSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = timeLabels[slot] || slot;
        if (slot === currentValue) {
            option.selected = true;
        }
        timeSelect.appendChild(option);
    });
    
    // If no slots available, show message
    if (availableSlots.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No available slots for this date';
        option.disabled = true;
        timeSelect.appendChild(option);
    }
}

