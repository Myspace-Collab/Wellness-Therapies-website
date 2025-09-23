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
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    if (typeof emailjs !== 'undefined') {
        emailjs.init("m4srsWKr-0feuYu9N");
        console.log('EmailJS initialized with key: m4srsWKr-0feuYu9N');
    } else {
        console.error('EmailJS not loaded! Check if the script tag is correct.');
    }
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
    
    // Send auto-reply to customer using template_zj4pg7k
    emailjs.send("service_1u51w01", "template_zj4pg7k", {
        from_name: "Wellness Therapies",
        from_email: "therapieswellness@gmail.com",
        to_name: name,
        to_email: email,
        customer_name: name,
        customer_email: email,
        therapy_interest: therapy,
        message: message,
        reply_to: "therapieswellness@gmail.com"
    }).then(function (response) {
        console.log('Auto-reply sent successfully!', response.status, response.text);
        
        // Send notification email to you with customer details
        emailjs.send("service_1u51w01", "template_zj4pg7k", {
            from_name: name,
            from_email: email,
            to_name: "Wellness Therapies",
            to_email: "therapieswellness@gmail.com",
            name: name,
            email: email,
            therapy: therapy,
            message: message,
            reply_to: email
        }).then(function (response) {
            console.log('Notification email sent successfully!', response.status, response.text);
            showMessage('Thank you for your message! We have sent you a confirmation email and will get back to you soon.', 'success');
        }, function (error) {
            console.log('Notification failed, but auto-reply sent:', error);
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
        });
        
    }, function (error) {
        console.log('FAILED...', error);
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
