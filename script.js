// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-icon') && !e.target.closest('.nav-links')) {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        }
    });
    
    // Animate skill bars
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    if (skillProgresses.length > 0) {
        // Add intersection observer for skill bars
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = progress;
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillProgresses.forEach(progress => {
            observer.observe(progress);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            if (!name.value.trim()) {
                highlightError(name);
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                highlightError(email);
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                highlightError(message);
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Submit form - in a real application, this would send data to a server
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate sending (would be replaced with actual AJAX request)
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = 'Message Sent!';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Add page transition effects
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) return;
            
            e.preventDefault();
            const target = this.getAttribute('href');
            
            document.body.classList.add('page-transition');
            
            setTimeout(() => {
                window.location.href = target;
            }, 300);
        });
    });
});

// Helper functions
function highlightError(element) {
    element.classList.add('error');
    element.style.borderColor = '#dc2626';
}

function removeError(element) {
    element.classList.remove('error');
    element.style.borderColor = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.personal-content, .skill-item, .hobby-card, .project-card, .social-card, .timeline-item');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate');
        }, 100 * index);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .page-transition {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .personal-content, .skill-item, .hobby-card, .project-card, .social-card, .timeline-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .personal-content.animate, .skill-item.animate, .hobby-card.animate, .project-card.animate, .social-card.animate, .timeline-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .menu-icon.active span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }
    
    .menu-icon.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-icon.active span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }
`;
document.head.appendChild(style);