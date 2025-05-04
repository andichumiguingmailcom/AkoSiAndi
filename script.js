// Mobile menu toggle
function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('mobile-active');
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Activate current page in navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add active class to section for animations
    const mainSection = document.querySelector('.section');
    if (mainSection) {
        setTimeout(() => {
            mainSection.classList.add('active');
        }, 100);
    }
    
    // Skills page functionality
    if (currentPage === 'skills.html') {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const skillsContainers = document.querySelectorAll('.skills-container');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all skills containers
                skillsContainers.forEach(container => {
                    container.classList.remove('active');
                });
                
                // Show selected skills container
                const filter = this.getAttribute('data-filter');
                document.querySelector(`.${filter}-skills`).classList.add('active');
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Normally, we would send the form data to a server
            // For demonstration, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Add smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    // Check if the clicked element is an anchor link
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});