// Mobile Navigation Toggle - wrapped in DOMContentLoaded to ensure DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
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
    }
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
    // Set minimum date to today
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
        const today = new Date().toISOString().split('T')[0];
        bookingDateInput.setAttribute('min', today);
    }
});

// NOTE: Booking form submission handler is defined later in the file (around line 1092)
// This duplicate handler has been removed to prevent conflicts

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

// Initialize typing effect when page loads - DISABLED to prevent duplicate text
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero h1');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 50);
//         }, 500);
//     }
// });

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
            const selectedDate = new Date(bookingDateInput.value + 'T00:00:00');
            const minAllowed = getNextAvailableWeekday();
            minAllowed.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);
            const dayOfWeek = selectedDate.getDay();
            
            console.warn('Invalid date detected, clearing:', bookingDateInput.value);
            
            // Add error class for red styling
            bookingDateInput.classList.add('date-invalid');
            
            // Show appropriate error message IMMEDIATELY
            let errorMsg = '';
            if (selectedDate < minAllowed) {
                errorMsg = 'Past dates and today are not allowed. Please select a future weekday (Monday-Friday).';
            } else if (dayOfWeek === 0 || dayOfWeek === 6) {
                errorMsg = 'Weekends are not allowed. Please select a weekday (Monday-Friday).';
            } else {
                errorMsg = 'Invalid date selected. Please select a future weekday (Monday-Friday).';
            }
            
            // Set HTML5 validation message for native browser validation
            bookingDateInput.setCustomValidity(errorMsg);
            
            // Show error message BEFORE clearing the value
            showBookingMessage(errorMsg, 'error');
            
            // Report validity to show browser tooltip
            setTimeout(() => {
                bookingDateInput.reportValidity();
            }, 50);
            
            // Clear the invalid date after showing message (give user time to see it)
            setTimeout(() => {
                bookingDateInput.value = '';
                bookingDateInput.setCustomValidity('');
                bookingDateInput.classList.remove('date-invalid'); // Remove error class when cleared
            }, 3000); // Keep date visible for 3 seconds so user can see the error
            
            if (bookingTimeSelect) {
                bookingTimeSelect.innerHTML = '<option value="">Select Time</option>';
            }
        } else if (bookingDateInput.value && isValidDate(bookingDateInput.value)) {
            // Clear custom validity if date is valid
            bookingDateInput.setCustomValidity('');
            bookingDateInput.classList.remove('date-invalid'); // Remove error class when valid
        } else if (!bookingDateInput.value) {
            // Remove error class when field is empty
            bookingDateInput.classList.remove('date-invalid');
        }
    }
    
    // Set minimum date IMMEDIATELY
    const minDate = getNextAvailableWeekday();
    const minDateString = minDate.toISOString().split('T')[0];
    
    // Set min attribute using multiple methods to ensure it sticks
    bookingDateInput.min = minDateString;
    bookingDateInput.setAttribute('min', minDateString);
    bookingDateInput.value = ''; // Clear any existing value
    bookingDateInput.classList.remove('date-invalid'); // Remove error class on initialization
    
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
    const validateEvents = ['change', 'input', 'blur'];
    validateEvents.forEach(eventType => {
        bookingDateInput.addEventListener(eventType, function() {
            // Always ensure min is set
            const currentMin = getNextAvailableWeekday().toISOString().split('T')[0];
            if (this.min !== currentMin) {
                this.min = currentMin;
                this.setAttribute('min', currentMin);
            }
            
            // Validate current value immediately
            if (this.value) {
                // Small delay to ensure value is set before validation
                setTimeout(() => {
                    // Check if date is valid
                    if (!isValidDate(this.value)) {
                        // Set HTML5 validation error (same as therapy field)
                        this.setCustomValidity('Invalid date');
                        this.reportValidity(); // Show native browser error
                        this.classList.add('date-invalid');
                    } else {
                        // Clear validation error if valid
                        this.setCustomValidity('');
                        this.classList.remove('date-invalid');
                    }
                }, 10);
            } else {
                // Clear error when date is cleared
                this.setCustomValidity('');
                this.classList.remove('date-invalid');
                const formMessage = document.getElementById('bookingFormMessage');
                if (formMessage && formMessage.classList.contains('error')) {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }
            }
        }, true);
    });
    
    // Also validate on invalid event (HTML5 validation)
    bookingDateInput.addEventListener('invalid', function(e) {
        e.preventDefault();
        if (this.value) {
            enforceValidDate();
        } else {
            const errorMsg = 'Please select a valid future weekday (Monday-Friday).';
            this.setCustomValidity(errorMsg);
            showBookingMessage(errorMsg, 'error');
        }
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
                
                // Validate immediately when value changes
                enforceValidDate();
            } else {
                // Clear error message when date is cleared
                const formMessage = document.getElementById('bookingFormMessage');
                if (formMessage && formMessage.classList.contains('error')) {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }
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
                // Show error message immediately
                setTimeout(() => {
                    enforceValidDate();
                }, 0);
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
    
    // Booking form submission - attach inside DOMContentLoaded to ensure form exists
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) {
        console.error('❌ Booking form not found! Cannot attach submit handler.');
        return;
    }
    
    console.log('✅ Booking form found, attaching submit handler...');
    
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('📋 Form submission started...');
        
        try {
            // Get form data - CRITICAL: Get date value FIRST before any validation clears it
            const bookingDateInput = this.querySelector('#bookingDate');
            const date = bookingDateInput ? bookingDateInput.value : '';
            const name = this.querySelector('#bookingName').value.trim();
            const email = this.querySelector('#bookingEmail').value.trim();
            const phone = this.querySelector('#bookingPhone').value.trim();
            const therapy = this.querySelector('#bookingTherapy').value;
            const time = this.querySelector('#bookingTime').value;
            const message = this.querySelector('#bookingNotes').value.trim();
            const submitBtn = this.querySelector('.submit-btn');
            const formMessage = document.getElementById('bookingFormMessage');
            
            console.log('📋 Form data:', { name, email, phone, therapy, date, time });
            console.log('📋 Date input value:', bookingDateInput ? bookingDateInput.value : 'dateInput not found');
            console.log('📋 Date variable:', date);
            
            // Store original button text for error cases (will be used later)
            let originalText = submitBtn ? submitBtn.textContent : 'Book Appointment';
            
            // Clear previous messages
            if (formMessage) {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }
            
            // Validate submitBtn exists
            if (!submitBtn) {
                console.error('❌ Submit button not found!');
                showBookingMessage('Form error: Submit button not found. Please refresh the page.', 'error');
                return;
            }
            
            // Basic required field validation
            if (!name) {
                showBookingMessage('Please enter your name.', 'error');
                this.querySelector('#bookingName').focus();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                return;
            }
            
            if (!email) {
                showBookingMessage('Please enter your email address.', 'error');
                this.querySelector('#bookingEmail').focus();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showBookingMessage('Please enter a valid email address.', 'error');
                this.querySelector('#bookingEmail').focus();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                return;
            }
            
            if (!phone) {
                showBookingMessage('Please enter your phone number.', 'error');
                this.querySelector('#bookingPhone').focus();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                return;
            }
            
            if (!therapy) {
                showBookingMessage('Please select a therapy type.', 'error');
                this.querySelector('#bookingTherapy').focus();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                return;
            }
            
            // Date validation - check if date is in the past (STRICT VALIDATION)
            // Use the dateInput we already got
            const dateInput = bookingDateInput || this.querySelector('#bookingDate') || document.getElementById('bookingDate');
            
            console.log('🔍 Date validation check - date value:', date);
            console.log('🔍 Date input element:', dateInput);
            console.log('🔍 Date input current value:', dateInput ? dateInput.value : 'N/A');
            
            if (!date || date === '') {
                // Show error message in form message area
                showBookingMessage('Please select a date.', 'error');
                // Set HTML5 validation message (same as therapy type validation)
                if (dateInput) {
                    dateInput.setCustomValidity('Please select a date.');
                    dateInput.reportValidity(); // This shows the native browser error
                    dateInput.focus();
                }
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                return;
            }
            
            if (!time) {
                showBookingMessage('Please select a time.', 'error');
                this.querySelector('#bookingTime').focus();
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                return;
            }
            
            // Use the same validation function as defined in the date restriction code
            // Get next available weekday function (same as above)
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
            
            // Check if date is valid (future weekday)
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
            
            // Validate the date - CRITICAL: Show error message in form message area
            console.log('🔍 Validating date:', date);
            const isValid = isValidDate(date);
            console.log('🔍 Date validation result:', isValid);
            
            if (!isValid) {
        const selectedDate = new Date(date + 'T00:00:00');
        const minAllowed = getNextAvailableWeekday();
        minAllowed.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        const dayOfWeek = selectedDate.getDay();
        
        // Determine specific error message
        let errorMessage = 'Invalid date';
        if (selectedDate < minAllowed) {
            errorMessage = 'Invalid date: Past dates and today are not allowed. Please select a future weekday (Monday-Friday).';
        } else if (dayOfWeek === 0 || dayOfWeek === 6) {
            errorMessage = 'Invalid date: Weekends are not allowed. Please select a weekday (Monday-Friday).';
        }
        
        // Log for debugging
        console.log('❌ Invalid date detected:', date);
        console.log('Selected date:', selectedDate);
        console.log('Min allowed:', minAllowed);
        console.log('Day of week:', dayOfWeek);
        console.log('Error message:', errorMessage);
        
        // CRITICAL: Show error message in form message area FIRST
        console.log('📢 Calling showBookingMessage with:', errorMessage);
        showBookingMessage(errorMessage, 'error');
        
        // Set HTML5 validation message (same way as therapy type)
        dateInput.setCustomValidity('Invalid date');
        
        // Call reportValidity() to show native browser error (like therapy field)
        dateInput.reportValidity();
        
        // Focus on the date input
        dateInput.focus();
        
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
        // Force message to be visible immediately
        const formMessage = document.getElementById('bookingFormMessage');
        if (formMessage) {
            console.log('📢 Verifying message is displayed:', formMessage.textContent);
            console.log('📢 Message classes:', formMessage.className);
            console.log('📢 Message display:', window.getComputedStyle(formMessage).display);
            // Force visibility again
            formMessage.style.display = 'block';
            formMessage.style.visibility = 'visible';
            formMessage.style.opacity = '1';
            
            // Prevent scroll to top - scroll to message instead
            setTimeout(() => {
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
                // Prevent any default scroll behavior
                window.scrollTo({ top: window.scrollY, behavior: 'auto' });
            }, 50);
        }
        
        // CRITICAL: Stop form submission - prevent any default behavior
        console.log('🛑 Stopping form submission due to invalid date');
        // Explicitly prevent default and stop propagation again
        if (e && e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation(); // Stop any other handlers
        }
        // CRITICAL: Return early to stop all further execution
        return; // Stop here - don't continue with form submission
    }
    
    // Clear any custom validity if date is valid
    dateInput.setCustomValidity('');
    
    // Validate time is within business hours (10:00 AM - 3:30 PM)
    if (!time) {
        showBookingMessage('Please select a time.', 'error');
        return;
    }
    
    try {
        const timeValue = time.split(':');
        if (timeValue.length !== 2) {
            showBookingMessage('Invalid time format. Please select a time from the dropdown.', 'error');
            return;
        }
        
        const hours = parseInt(timeValue[0]);
        const minutes = parseInt(timeValue[1]);
        
        if (isNaN(hours) || isNaN(minutes)) {
            showBookingMessage('Invalid time format. Please select a time from the dropdown.', 'error');
            return;
        }
        
        const totalMinutes = hours * 60 + minutes;
        const minMinutes = 10 * 60; // 10:00 AM
        const maxMinutes = 15 * 60 + 30; // 3:30 PM
        
        if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
            showBookingMessage('Appointments are only available between 10:00 AM and 3:30 PM.', 'error');
            return;
        }
    } catch (error) {
        console.error('Error validating time:', error);
        showBookingMessage('Invalid time selected. Please select a time from the dropdown.', 'error');
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
    originalText = submitBtn.textContent; // Use the variable already declared above
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
        console.log('📢 Showing success message after booking notification sent');
        showBookingMessage('✅ Appointment booked successfully! We have received your appointment request and will send you a confirmation email shortly.', 'success');
        
        // Ensure message is visible by scrolling to it
        setTimeout(() => {
            const formMessage = document.getElementById('bookingFormMessage');
            if (formMessage) {
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
        
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
            const successMsg = '✅ Appointment booked successfully! A confirmation email has been sent to ' + email + '. We will contact you shortly to confirm your appointment.';
            console.log('📢 Showing final success message:', successMsg);
            showBookingMessage(successMsg, 'success');
            
            // Ensure message is visible
            setTimeout(() => {
                const formMessage = document.getElementById('bookingFormMessage');
                if (formMessage) {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }, function (error) {
            console.log('⚠️ Confirmation email failed, but booking notification sent:', error);
            console.error('Confirmation email error details:', error);
            // Keep the success message since the booking notification was sent
            const successMsg = '✅ Appointment booked successfully! We have received your appointment request and will contact you shortly. (Note: Confirmation email could not be sent, but we have your booking details.)';
            console.log('📢 Showing success message (confirmation email failed):', successMsg);
            showBookingMessage(successMsg, 'success');
            
            // Ensure message is visible
            setTimeout(() => {
                const formMessage = document.getElementById('bookingFormMessage');
                if (formMessage) {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        });
        
        // Reset form after successful booking (with delay to show message)
        // Don't reset too quickly - let user see the success message for at least 5 seconds
        setTimeout(() => {
            const formMessage = document.getElementById('bookingFormMessage');
            // Only reset if success message is still showing
            if (formMessage && formMessage.classList.contains('success')) {
                document.getElementById('bookingForm').reset();
                // Clear the date min/max attributes will be reset by the date restriction code
            }
        }, 5000); // Wait 5 seconds before resetting so user can see success message
        
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
    }).catch(function(error) {
        // This catch handles any errors in the emailjs.send promise chain
        console.error('❌ Error in emailjs.send promise chain:', error);
        showBookingMessage('An error occurred while sending your booking request. Please try again or contact us directly.', 'error');
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
    
    } catch (error) {
        // This catch handles any synchronous errors in the form submission handler
        console.error('❌ Error in form submission handler:', error);
        console.error('Error stack:', error.stack);
        const formMessage = document.getElementById('bookingFormMessage');
        if (formMessage) {
            showBookingMessage('An unexpected error occurred: ' + (error.message || 'Unknown error') + '. Please try again or contact us directly.', 'error');
        } else {
            alert('An unexpected error occurred. Please try again or contact us directly.');
        }
        const submitBtn = document.querySelector('#bookingForm .submit-btn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    }
    }); // End of bookingForm.addEventListener
}); // End of DOMContentLoaded

// Function to show booking form messages
function showBookingMessage(text, type) {
    console.log('📢 showBookingMessage called:', text, 'Type:', type);
    const formMessage = document.getElementById('bookingFormMessage');
    
    if (!formMessage) {
        console.error('❌ Message element not found! ID: bookingFormMessage');
        alert(text); // Fallback to alert if element not found
        return;
    }
    
    console.log('✅ Message element found, displaying message...');
    
    // Clear previous content
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    formMessage.removeAttribute('style'); // Clear any previous inline styles
    
    // Set message content and type
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Force visibility with inline styles (important to override any CSS)
    formMessage.style.display = 'block';
    formMessage.style.visibility = 'visible';
    formMessage.style.opacity = '1';
    formMessage.style.minHeight = '20px';
    formMessage.style.padding = '12px 16px';
    formMessage.style.marginTop = '1rem';
    formMessage.style.width = '100%';
    formMessage.style.boxSizing = 'border-box';
    
    // Force reflow to ensure visibility
    void formMessage.offsetHeight;
    
    // Scroll to message immediately
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    
    console.log('✅ Booking message displayed:', text, 'Type:', type);
    console.log('Message element classes:', formMessage.className);
    console.log('Message element text:', formMessage.textContent);
    console.log('Message element display:', window.getComputedStyle(formMessage).display);
    console.log('Message element visibility:', window.getComputedStyle(formMessage).visibility);
    console.log('Message element opacity:', window.getComputedStyle(formMessage).opacity);
    
    // Auto-hide error messages after 10 seconds (but keep success messages visible longer)
    if (type === 'error') {
        setTimeout(() => {
            if (formMessage.textContent === text) { // Only clear if message hasn't changed
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }
        }, 10000);
    } else if (type === 'success') {
        // Keep success messages visible for 15 seconds
        setTimeout(() => {
            if (formMessage.textContent === text) { // Only clear if message hasn't changed
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }
        }, 15000);
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

// Initialize typing effect when page loads - DISABLED to prevent duplicate text
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero h1');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         setTimeout(() => {
//             typeWriter(heroTitle, originalText, 50);
//         }, 500);
//     }
// });

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

// Duplicate CSS block removed - already defined above
