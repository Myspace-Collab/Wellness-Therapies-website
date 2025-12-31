// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Therapy card interactions
document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.therapy-card');
        const isActive = card.classList.contains('active');
        
        // Close all other cards
        document.querySelectorAll('.therapy-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Toggle current card
        if (!isActive) {
            card.classList.add('active');
            this.textContent = 'Show Less';
        } else {
            this.textContent = 'Learn More';
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission with improved validation and feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const formData = new FormData(this);
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const therapy = this.querySelector('select[name="therapy"]').value;
    const message = this.querySelector('textarea[name="message"]').value.trim();
    const submitBtn = this.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');
    
    // Clear previous messages
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    // Enhanced validation
    if (!name || !email || !therapy || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Name validation (at least 2 characters)
    if (name.length < 2) {
        showMessage('Please enter a valid name (at least 2 characters).', 'error');
        return;
    }
    
    // Message validation (at least 10 characters)
    if (message.length < 10) {
        showMessage('Please enter a more detailed message (at least 10 characters).', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate form submission (replace with actual email service)
    setTimeout(() => {
        // Here you would typically send the data to your backend or email service
        // For now, we'll simulate a successful submission
        
        // Log form data (in production, this would be sent to your server)
        console.log('Form submitted with data:', {
            name: name,
            email: email,
            therapy: therapy,
            message: message,
            timestamp: new Date().toISOString()
        });
        
        // Send email using EmailJS
        console.log('About to call sendEmailNotification function...');
        sendEmailNotification(name, email, therapy, message);
        console.log('sendEmailNotification function called');
        
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
    }, 2000);
});

// Function to show form messages
function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== EMAILJS INITIALIZATION ===');
    console.log('EmailJS library available:', typeof emailjs !== 'undefined');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not loaded! Check if the script tag is correct in index.html');
        window.EMAILJS_INITIALIZED = false;
        return;
    }
    
    // Wait a bit for config.js to load
    setTimeout(function() {
        const emailjsKey = window.EMAILJS_PUBLIC_KEY || '';
        console.log('EmailJS Public Key found:', emailjsKey ? 'Yes (length: ' + emailjsKey.length + ')' : 'No');
        
        if (emailjsKey && emailjsKey !== 'YOUR_EMAILJS_PUBLIC_KEY_HERE' && emailjsKey.length > 0) {
            try {
                emailjs.init(emailjsKey);
                console.log('✅ EmailJS initialized successfully');
                window.EMAILJS_INITIALIZED = true;
            } catch (error) {
                console.error('❌ Error initializing EmailJS:', error);
                window.EMAILJS_INITIALIZED = false;
            }
        } else {
            console.warn('⚠️ EmailJS public key not configured. Please create config.js from config.example.js and add your EmailJS public key.');
            window.EMAILJS_INITIALIZED = false;
        }
    }, 100); // Small delay to ensure config.js is loaded
});

// Function to send email notification
function sendEmailNotification(name, email, therapy, message) {
    console.log('Attempting to send email with EmailJS...');
    console.log('Service ID:', 'service_1u51w01');
    console.log('Template ID:', 'template_zj4pg7k');
    
    // Check if emailjs is available
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded!');
        showMessage('Email service not available. Please try again later.', 'error');
        return;
    }
    
    // Check if emailjs is initialized
    if (!emailjs.init) {
        console.error('EmailJS is not properly initialized!');
        showMessage('Email service not properly initialized. Please refresh the page.', 'error');
        return;
    }
    
    console.log('EmailJS is available and ready to send...');
    
    // Send auto-reply to customer first
    console.log('=== EMAIL SEND DEBUG ===');
    console.log('Sending auto-reply to customer:', email);
    
    emailjs.send("service_1u51w01", "template_xz10eyk", {
        from_name: "Wellness Therapies",
        from_email: "therapieswellness@gmail.com",
        to_name: name,
        to_email: email,
        name: name,
        email: email,
        therapy: therapy,
        message: message,
        reply_to: "therapieswellness@gmail.com"
    }).then(function (response) {
        console.log('✅ Auto-reply sent successfully to customer!');
        console.log('Response status:', response.status);
        
        // Send notification to wellness therapies
        console.log('Sending notification to wellness therapies');
        emailjs.send("service_1u51w01", "template_zj4pg7k", {
            from_name: name,
            from_email: email,
            to_name: "Wellness Therapies",
            to_email: "therapieswellness@gmail.com",
            name: name,
            email: email,
            therapy: therapy,
            message: "CONTACT FORM SUBMISSION:\n\nName: " + name + "\nEmail: " + email + "\nTherapy Interest: " + therapy + "\nMessage: " + message + "\n\nReply to: " + email,
            title: "New Contact Form Submission",
            type: "contact",
            reply_to: email
        }).then(function (response) {
            console.log('✅ Notification sent successfully to wellness therapies!');
            console.log('Response status:', response.status);
            showMessage('Thank you for your message! We have sent you a confirmation email and will get back to you soon.', 'success');
        }, function (error) {
            console.log('❌ Notification failed:', error);
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
        });
        
    }, function (error) {
        console.log('❌ Auto-reply FAILED...', error);
        console.log('Error details:', error);
        showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    });
    // Example using EmailJS (you would need to set up an account and get API keys)
    // emailjs.send('your_service_id', 'your_template_id', {
    //     from_name: name,
    //     from_email: email,
    //     therapy_interest: therapy,
    //     message: message,
    //     to_email: 'therapieswellness@gmail.com'
    // });
    
    // Example using Formspree (you would need to set up an account)
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name: name,
    //         email: email,
    //         therapy: therapy,
    //         message: message
    //     })
    // });
}

// NOTE: Intersection Observer code is already defined above (lines 267-292)
// Duplicate code removed to prevent redeclaration errors

// Add floating animation to hero elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
});

// Add hover effects to therapy cards
document.querySelectorAll('.therapy-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add counter animation for statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .therapy-card.active {
        transform: translateY(-10px) !important;
    }
`;
document.head.appendChild(style);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Therapy card interactions
document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.therapy-card');
        const isActive = card.classList.contains('active');
        
        // Close all other cards
        document.querySelectorAll('.therapy-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Toggle current card
        if (!isActive) {
            card.classList.add('active');
            this.textContent = 'Show Less';
        } else {
            this.textContent = 'Learn More';
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission with improved validation and feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const formData = new FormData(this);
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const therapy = this.querySelector('select[name="therapy"]').value;
    const message = this.querySelector('textarea[name="message"]').value.trim();
    const submitBtn = this.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');
    
    // Clear previous messages
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    // Enhanced validation
    if (!name || !email || !therapy || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Name validation (at least 2 characters)
    if (name.length < 2) {
        showMessage('Please enter a valid name (at least 2 characters).', 'error');
        return;
    }
    
    // Message validation (at least 10 characters)
    if (message.length < 10) {
        showMessage('Please enter a more detailed message (at least 10 characters).', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate form submission (replace with actual email service)
    setTimeout(() => {
        // Here you would typically send the data to your backend or email service
        // For now, we'll simulate a successful submission
        
        // Log form data (in production, this would be sent to your server)
        console.log('Form submitted with data:', {
            name: name,
            email: email,
            therapy: therapy,
            message: message,
            timestamp: new Date().toISOString()
        });
        
        // Send email using EmailJS
        console.log('About to call sendEmailNotification function...');
        sendEmailNotification(name, email, therapy, message);
        console.log('sendEmailNotification function called');
        
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
    }, 2000);
});

// Function to show form messages
function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== EMAILJS INITIALIZATION ===');
    console.log('EmailJS library available:', typeof emailjs !== 'undefined');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not loaded! Check if the script tag is correct in index.html');
        window.EMAILJS_INITIALIZED = false;
        return;
    }
    
    // Wait a bit for config.js to load
    setTimeout(function() {
        const emailjsKey = window.EMAILJS_PUBLIC_KEY || '';
        console.log('EmailJS Public Key found:', emailjsKey ? 'Yes (length: ' + emailjsKey.length + ')' : 'No');
        
        if (emailjsKey && emailjsKey !== 'YOUR_EMAILJS_PUBLIC_KEY_HERE' && emailjsKey.length > 0) {
            try {
                emailjs.init(emailjsKey);
                console.log('✅ EmailJS initialized successfully');
                window.EMAILJS_INITIALIZED = true;
            } catch (error) {
                console.error('❌ Error initializing EmailJS:', error);
                window.EMAILJS_INITIALIZED = false;
            }
        } else {
            console.warn('⚠️ EmailJS public key not configured. Please create config.js from config.example.js and add your EmailJS public key.');
            window.EMAILJS_INITIALIZED = false;
        }
    }, 100); // Small delay to ensure config.js is loaded
});

// Function to send email notification
function sendEmailNotification(name, email, therapy, message) {
    console.log('Attempting to send email with EmailJS...');
    console.log('Service ID:', 'service_1u51w01');
    console.log('Template ID:', 'template_zj4pg7k');
    
    // Check if emailjs is available
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded!');
        showMessage('Email service not available. Please try again later.', 'error');
        return;
    }
    
    // Check if emailjs is initialized
    if (!emailjs.init) {
        console.error('EmailJS is not properly initialized!');
        showMessage('Email service not properly initialized. Please refresh the page.', 'error');
        return;
    }
    
    console.log('EmailJS is available and ready to send...');
    
    // Send auto-reply to customer first
    console.log('=== EMAIL SEND DEBUG ===');
    console.log('Sending auto-reply to customer:', email);
    
    emailjs.send("service_1u51w01", "template_xz10eyk", {
        from_name: "Wellness Therapies",
        from_email: "therapieswellness@gmail.com",
        to_name: name,
        to_email: email,
        name: name,
        email: email,
        therapy: therapy,
        message: message,
        reply_to: "therapieswellness@gmail.com"
    }).then(function (response) {
        console.log('✅ Auto-reply sent successfully to customer!');
        console.log('Response status:', response.status);
        
        // Send notification to wellness therapies
        console.log('Sending notification to wellness therapies');
        emailjs.send("service_1u51w01", "template_zj4pg7k", {
            from_name: name,
            from_email: email,
            to_name: "Wellness Therapies",
            to_email: "therapieswellness@gmail.com",
            name: name,
            email: email,
            therapy: therapy,
            message: "CONTACT FORM SUBMISSION:\n\nName: " + name + "\nEmail: " + email + "\nTherapy Interest: " + therapy + "\nMessage: " + message + "\n\nReply to: " + email,
            title: "New Contact Form Submission",
            type: "contact",
            reply_to: email
        }).then(function (response) {
            console.log('✅ Notification sent successfully to wellness therapies!');
            console.log('Response status:', response.status);
            showMessage('Thank you for your message! We have sent you a confirmation email and will get back to you soon.', 'success');
        }, function (error) {
            console.log('❌ Notification failed:', error);
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
        });
        
    }, function (error) {
        console.log('❌ Auto-reply FAILED...', error);
        console.log('Error details:', error);
        showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    });

// Booking Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today and restrict to weekdays only
    const bookingDateInput = document.getElementById('bookingDate');
    const bookingTimeSelect = document.getElementById('bookingTime');
    
    if (!bookingDateInput) {
        console.error('Booking date input not found!');
        return;
    }
    
    // CRITICAL: Function to get next available weekday (Monday-Friday)
    function getNextAvailableWeekday() {
        const today = new Date();
        let nextDate = new Date(today);
        nextDate.setDate(today.getDate() + 1); // Start from tomorrow
        
        // Find next weekday (Monday = 1, Friday = 5)
        while (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
            nextDate.setDate(nextDate.getDate() + 1);
        }
        
        return nextDate;
    }
    
    // Function to check if a date is valid (future weekday)
    function isValidDate(dateString) {
        if (!dateString) return false;
        
        const selectedDate = new Date(dateString + 'T00:00:00');
        const minAllowed = getNextAvailableWeekday();
        minAllowed.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        const dayOfWeek = selectedDate.getDay();
        
        // Must be future date and weekday
        return selectedDate >= minAllowed && dayOfWeek !== 0 && dayOfWeek !== 6;
    }
    
    // Function to enforce valid date - clears if invalid
    function enforceValidDate() {
        if (bookingDateInput.value && !isValidDate(bookingDateInput.value)) {
            console.warn('Invalid date detected, clearing:', bookingDateInput.value);
            bookingDateInput.value = '';
            showBookingMessage('Past dates and weekends are not allowed. Please select a future weekday.', 'error');
            if (bookingTimeSelect) {
                bookingTimeSelect.innerHTML = '<option value="">Select Time</option>';
            }
        }
    }
    
    // Set minimum date IMMEDIATELY
    const minDate = getNextAvailableWeekday();
    const minDateString = minDate.toISOString().split('T')[0];
    
    // Set min attribute using multiple methods to ensure it sticks
    bookingDateInput.min = minDateString;
    bookingDateInput.setAttribute('min', minDateString);
    bookingDateInput.value = ''; // Clear any existing value
    
    // Set max date
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    bookingDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    
    // COMPLETELY BLOCK manual typing - make it read-only but allow calendar
    bookingDateInput.addEventListener('keydown', function(e) {
        // Only allow Tab, Escape, and arrow keys for navigation
        const allowedKeys = ['Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
        if (allowedKeys.includes(e.key)) {
            return true;
        }
        // Block everything else
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true); // Use capture phase
    
    // Block all text input
    bookingDateInput.addEventListener('keypress', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    // Block paste
    bookingDateInput.addEventListener('paste', function(e) {
        e.preventDefault();
        e.stopPropagation();
        enforceValidDate();
        return false;
    }, true);
    
    // Block drop
    bookingDateInput.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    // Block context menu
    bookingDateInput.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // CRITICAL: Validate on EVERY possible event
    const validateEvents = ['change', 'input', 'blur', 'focus', 'click'];
    validateEvents.forEach(eventType => {
        bookingDateInput.addEventListener(eventType, function() {
            // Always ensure min is set
            const currentMin = getNextAvailableWeekday().toISOString().split('T')[0];
            if (this.min !== currentMin) {
                this.min = currentMin;
                this.setAttribute('min', currentMin);
            }
            
            // Validate current value
            if (this.value) {
                enforceValidDate();
            }
        }, true);
    });
    
    // Watch for value changes using MutationObserver
    const valueObserver = new MutationObserver(function() {
        enforceValidDate();
    });
    
    // Also watch the input property directly
    let lastValue = '';
    const checkValue = setInterval(function() {
        if (bookingDateInput.value !== lastValue) {
            lastValue = bookingDateInput.value;
            if (bookingDateInput.value) {
                // Ensure min is always set
                const currentMin = getNextAvailableWeekday().toISOString().split('T')[0];
                bookingDateInput.min = currentMin;
                bookingDateInput.setAttribute('min', currentMin);
                
                // Validate
                enforceValidDate();
            }
        }
    }, 100); // Check every 100ms
    
    // Intercept value setter
    const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    Object.defineProperty(bookingDateInput, 'value', {
        get: function() {
            return originalDescriptor.get.call(this);
        },
        set: function(newValue) {
            if (newValue && !isValidDate(newValue)) {
                console.warn('Blocked attempt to set invalid date:', newValue);
                originalDescriptor.set.call(this, '');
                enforceValidDate();
                return;
            }
            originalDescriptor.set.call(this, newValue);
        },
        configurable: true
    });
    
    // Watch for min attribute changes
    const minObserver = new MutationObserver(function() {
        const currentMin = getNextAvailableWeekday().toISOString().split('T')[0];
        if (bookingDateInput.getAttribute('min') !== currentMin) {
            bookingDateInput.min = currentMin;
            bookingDateInput.setAttribute('min', currentMin);
        }
    });
    minObserver.observe(bookingDateInput, { attributes: true, attributeFilter: ['min'] });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(checkValue);
    });
    
    // Function to validate date (for form submission)
    function validateDate(input) {
        if (!input || !input.value) {
            if (bookingTimeSelect) {
                bookingTimeSelect.innerHTML = '<option value="">Select Time</option>';
            }
            return false;
        }
        
        if (!isValidDate(input.value)) {
            showBookingMessage('Please select a future weekday. Past dates and weekends are not allowed.', 'error');
            input.value = '';
            if (bookingTimeSelect) {
                bookingTimeSelect.innerHTML = '<option value="">Select Time</option>';
            }
            return false;
        }
        
        // Clear any previous error messages if date is valid
        const formMessage = document.getElementById('bookingFormMessage');
        if (formMessage && formMessage.classList.contains('error')) {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }
        
        // Update available time slots based on existing appointments
        if (typeof updateAvailableTimeSlots === 'function') {
            updateAvailableTimeSlots(input.value);
        }
        
        return true;
    }
    
    // Add validateDate to the bookingDateInput for form submission validation
    bookingDateInput.validateDate = function() {
        return validateDate(this);
    };
    
    // NOTE: All date restrictions are handled in the new implementation above (lines 636-813)
    // The validateDate function above is used for form submission validation
});

// Booking form submission
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('#bookingName').value.trim();
    const email = this.querySelector('#bookingEmail').value.trim();
    const phone = this.querySelector('#bookingPhone').value.trim();
    const therapy = this.querySelector('#bookingTherapy').value;
    const date = this.querySelector('#bookingDate').value;
    const time = this.querySelector('#bookingTime').value;
    const message = this.querySelector('#bookingNotes').value.trim();
    const submitBtn = this.querySelector('.submit-btn');
    const formMessage = document.getElementById('bookingFormMessage');
    
    // Clear previous messages
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    // Validation
    if (!name || !email || !phone || !therapy || !date || !time) {
        showBookingMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showBookingMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Date validation - check if date is in the past (STRICT VALIDATION)
    const selectedDate = new Date(date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    // Check if date is today or in the past
    if (selectedDate <= today) {
        showBookingMessage('Please select a future date. Past dates and today are not allowed.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        // Clear the date input
        this.querySelector('#bookingDate').value = '';
        return;
    }
    
    // Note: We don't allow today's date, so no need to check for past times on today
    
    // Validate weekday (Monday-Friday only)
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        showBookingMessage('Appointments are only available Monday through Friday. Please select a weekday.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        // Clear the date input
        this.querySelector('#bookingDate').value = '';
        return;
    }
    
    // Validate time is within business hours (10:00 AM - 3:30 PM)
    const timeValue = time.split(':');
    const hours = parseInt(timeValue[0]);
    const minutes = parseInt(timeValue[1]);
    const totalMinutes = hours * 60 + minutes;
    const minMinutes = 10 * 60; // 10:00 AM
    const maxMinutes = 15 * 60 + 30; // 3:30 PM
    
    if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
        showBookingMessage('Appointments are only available between 10:00 AM and 3:30 PM.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        return;
    }
    
    // Check if time slot is already booked (local storage)
    if (!checkAppointmentAvailability(date, time)) {
        showBookingMessage('This time slot is already booked. Please select another time.', 'error');
        return;
    }
    
    // Check Google Calendar availability (if API key is set)
    if (typeof checkAvailability === 'function' && window.GOOGLE_CALENDAR_API_KEY && window.GOOGLE_CALENDAR_API_KEY !== 'YOUR_GOOGLE_CALENDAR_API_KEY_HERE') {
        showBookingMessage('Checking calendar availability...', 'success');
        const isAvailable = await checkAvailability(date, time);
        if (!isAvailable) {
            showBookingMessage('This time slot is already booked in the calendar. Please select another time.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            return;
        }
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Show processing message
    showBookingMessage('Processing your booking request...', 'success');
    
    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Format time for display
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', timeOptions);
    
    // Add appointment to register
    const appointmentResult = appointmentRegister.addAppointment({
        name: name,
        email: email,
        phone: phone,
        therapy: therapy,
        date: date,
        time: time,
        message: message
    });
    
    if (!appointmentResult.success) {
        showBookingMessage(appointmentResult.error, 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        return;
    }
    
    // Check if EmailJS is available and initialized
    console.log('=== CHECKING EMAILJS STATUS ===');
    console.log('EmailJS library available:', typeof emailjs !== 'undefined');
    console.log('EmailJS initialized:', window.EMAILJS_INITIALIZED);
    console.log('EmailJS public key:', window.EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not loaded!');
        showBookingMessage('Email service not available. Please refresh the page and try again.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        return;
    }
    
    // Check if EmailJS is initialized
    const emailjsKey = window.EMAILJS_PUBLIC_KEY || '';
    
    // If not initialized, try to initialize now
    if (!window.EMAILJS_INITIALIZED) {
        if (!emailjsKey || emailjsKey === 'YOUR_EMAILJS_PUBLIC_KEY_HERE' || emailjsKey.length === 0) {
            console.error('❌ EmailJS public key not configured!');
            console.error('Public Key:', emailjsKey || 'MISSING');
            showBookingMessage('Email service not properly configured. Please check your config.js file and ensure EMAILJS_PUBLIC_KEY is set.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            return;
        }
        
        try {
            emailjs.init(emailjsKey);
            window.EMAILJS_INITIALIZED = true;
            console.log('✅ EmailJS initialized on the fly');
        } catch (error) {
            console.error('❌ Failed to initialize EmailJS:', error);
            showBookingMessage('Email service initialization failed. Please refresh the page.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            return;
        }
    }
    
    // Double-check initialization
    if (!window.EMAILJS_INITIALIZED) {
        console.error('❌ EmailJS still not initialized after attempt!');
        showBookingMessage('Email service initialization failed. Please refresh the page and try again.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        return;
    }
    
    // Send booking request via EmailJS (using same template as contact form)
    console.log('=== SENDING BOOKING NOTIFICATION ===');
    console.log('Service ID: service_1u51w01');
    console.log('Template ID: template_zj4pg7k');
    console.log('To Email: therapieswellness@gmail.com');
    console.log('From Name:', name);
    console.log('From Email:', email);
    
    emailjs.send("service_1u51w01", "template_zj4pg7k", {
        from_name: name,
        from_email: email,
        to_name: "Wellness Therapies",
        to_email: "therapieswellness@gmail.com",
        name: name,
        email: email,
        phone: phone,
        therapy: therapy,
        date: formattedDate,
        time: formattedTime,
        message: "APPOINTMENT BOOKING REQUEST:\n\nName: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nTherapy: " + therapy + "\nPreferred Date: " + formattedDate + "\nPreferred Time: " + formattedTime + "\n\nAdditional Notes: " + (message || "None") + "\n\nReply to: " + email,
        title: "New Appointment Booking",
        type: "booking",
        reply_to: email
    }).then(async function (response) {
        console.log('✅ Booking notification sent successfully!');
        console.log('Response status:', response.status);
        console.log('Response text:', response.text);
        console.log('Full response:', response);
        
        // Show success message immediately after notification email is sent
        showBookingMessage('✅ Thanks for your booking! We have received your appointment request and will send you a confirmation email shortly.', 'success');
        
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
        // Create calendar event (if Google Calendar is set up)
        if (typeof createCalendarEvent === 'function' && window.GOOGLE_CALENDAR_API_KEY && window.GOOGLE_CALENDAR_API_KEY !== 'YOUR_GOOGLE_CALENDAR_API_KEY_HERE') {
            try {
                const calendarResult = await createCalendarEvent({
                    name: name,
                    email: email,
                    phone: phone,
                    therapy: therapy,
                    date: date,
                    time: time,
                    message: message
                });
                
                if (calendarResult.success) {
                    console.log('✅ Calendar event created:', calendarResult.eventLink);
                } else {
                    console.log('⚠️ Calendar event creation failed:', calendarResult.error);
                }
            } catch (error) {
                console.log('⚠️ Calendar event creation error:', error);
            }
        }
        
        // Send confirmation to customer (using same template as contact auto-reply)
        emailjs.send("service_1u51w01", "template_xz10eyk", {
            from_name: "Wellness Therapies",
            from_email: "therapieswellness@gmail.com",
            to_name: name,
            to_email: email,
            name: name,
            email: email,
            therapy: therapy,
            message: "Hi " + name + ",\n\nThank you for booking an appointment with Wellness Therapies!\n\nYour Appointment Details:\nTherapy: " + therapy + "\nDate: " + formattedDate + "\nTime: " + formattedTime + "\n\nWe will confirm your appointment shortly. If you need to make any changes, please contact us.\n\nBest regards,\nThe Wellness Therapies Team",
            type: "booking_confirmation",
            reply_to: "therapieswellness@gmail.com"
        }).then(function (response) {
            console.log('✅ Confirmation email sent to customer!', response.status);
            // Update message to indicate confirmation email was sent
            showBookingMessage('✅ Thanks for your booking! A confirmation email has been sent to ' + email + '. We will contact you shortly to confirm your appointment.', 'success');
        }, function (error) {
            console.log('⚠️ Confirmation email failed, but booking notification sent:', error);
            console.error('Confirmation email error details:', error);
            // Keep the success message since the booking notification was sent
            showBookingMessage('✅ Thanks for your booking! We have received your appointment request and will contact you shortly. (Note: Confirmation email could not be sent, but we have your booking details.)', 'success');
        });
        
        // Reset form after successful booking
        document.getElementById('bookingForm').reset();
        
    }, function (error) {
        console.error('❌ Booking request FAILED...');
        console.error('Error object:', error);
        console.error('Error status:', error.status);
        console.error('Error text:', error.text);
        console.error('Error message:', error.message);
        
        let errorMessage = 'Sorry, there was an error submitting your booking request. ';
        if (error.text) {
            errorMessage += 'Error: ' + error.text;
        } else if (error.message) {
            errorMessage += 'Error: ' + error.message;
        } else {
            errorMessage += 'Please check your EmailJS configuration and try again.';
        }
        errorMessage += ' If the problem persists, please contact us directly.';
        
        showBookingMessage(errorMessage, 'error');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    });
});

// Function to show booking form messages
function showBookingMessage(text, type) {
    const formMessage = document.getElementById('bookingFormMessage');
    
    if (!formMessage) {
        console.error('Message element not found!');
        alert(text); // Fallback to alert if element not found
        return;
    }
    
    // Clear previous content
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    // Set message content and type
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    formMessage.style.visibility = 'visible';
    formMessage.style.opacity = '1';
    formMessage.style.minHeight = 'auto';
    
    // Force reflow to ensure visibility
    void formMessage.offsetHeight;
    
    // Scroll to message immediately
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    
    console.log('📢 Booking message displayed:', text, 'Type:', type);
    
    // Auto-hide error messages after 8 seconds (but keep success messages)
    if (type === 'error') {
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
}

    // Example using EmailJS (you would need to set up an account and get API keys)
    // emailjs.send('your_service_id', 'your_template_id', {
    //     from_name: name,
    //     from_email: email,
    //     therapy_interest: therapy,
    //     message: message,
    //     to_email: 'therapieswellness@gmail.com'
    // });
    
    // Example using Formspree (you would need to set up an account)
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name: name,
    //         email: email,
    //         therapy: therapy,
    //         message: message
    //     })
    // });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.therapy-card, .about-text, .contact-info, .contact-form');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add floating animation to hero elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
});

// Add hover effects to therapy cards
document.querySelectorAll('.therapy-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add counter animation for statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .therapy-card.active {
        transform: translateY(-10px) !important;
    }
`;
document.head.appendChild(style);
