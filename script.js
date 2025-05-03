// Navigation functionality
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('.section');

// Set active navigation link
function setActiveLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Animate sections when in viewport
function animateSections() {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPosition > sectionTop - windowHeight + 200) {
            section.classList.add('active');
        }
    });
}

// Mobile menu toggle
function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('mobile-active');
}

// Initialize
window.addEventListener('load', function() {
    setActiveLink();
    animateSections();
});

window.addEventListener('scroll', function() {
    setActiveLink();
    animateSections();
});