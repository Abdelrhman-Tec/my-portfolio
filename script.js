// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save theme preference
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    
    // Update navbar colors immediately
    if (typeof updateNavbarOnScroll === 'function') {
        updateNavbarOnScroll();
    }
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

function updateNavbarOnScroll() {
    const isLightMode = body.classList.contains('light-mode');
    
    if (window.scrollY > 100) {
        if (isLightMode) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.85)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        }
    } else {
        if (isLightMode) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    }
}

window.addEventListener('scroll', updateNavbarOnScroll);

// Animated Blobs Parallax Effect
const blobs = document.querySelectorAll('.blob');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    blobs.forEach((blob, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        const xPos = Math.sin(scrolled * 0.001 + index) * 30;
        
        blob.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections EXCEPT hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe all cards
document.querySelectorAll('.service-card, .project-card, .info-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Skills animation
const skillIcons = document.querySelectorAll('.skill-icon');
skillIcons.forEach((icon, index) => {
    icon.style.opacity = '0';
    icon.style.transform = 'scale(0.5)';
    icon.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(icon);
});

// Add active class to current nav link
const currentLocation = window.location.hash;
if (currentLocation) {
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Typing effect for hero title (optional enhancement)
// Commented out to prevent clearing the hero title text
/*
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Uncomment to enable typing effect
    // typeWriter();
}
*/

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'transparent';
    });
});

// Cursor trail effect (optional)
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '5px';
        dot.style.height = '5px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = 'var(--primary-color)';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.pointerEvents = 'none';
        dot.style.opacity = '0.5';
        dot.style.transition = 'opacity 0.5s ease';
        
        document.body.appendChild(dot);
        
        setTimeout(() => {
            dot.style.opacity = '0';
            setTimeout(() => dot.remove(), 500);
        }, 100);
    });
};

// Uncomment to enable cursor trail
// createCursorTrail();

console.log('Portfolio loaded successfully! 🚀');
