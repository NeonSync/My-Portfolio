// ========================================
// 🚀 MAIN JAVASCRIPT - Portfolio Enhancements
// ========================================

// ========================================
// NAVIGATION SCROLL EFFECT & LOGIC
// ========================================
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// ========================================
// MOBILE MENU TOGGLE
// ========================================
if (menuToggle && navLinks) {
    const toggleMenu = (state) => {
        const isOpen = state !== undefined ? state : !navLinks.classList.contains('active');
        navLinks.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        
        // Animate hamburger
        const spans = menuToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !nav.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close menu on link click (important for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

// ========================================
// TYPEWRITER EFFECT
// ========================================
function typewriterEffect(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
    if (!element) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            charIndex = Math.max(0, charIndex - 1);
        } else {
            charIndex = Math.min(currentText.length, charIndex + 1);
        }

        element.textContent = currentText.substring(0, charIndex);

        let typeSpeed = isDeleting ? deleteSpeed : speed;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Initialize typewriter on home page
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    const texts = [
        'Full Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    typewriterEffect(typewriterElement, texts);
}

// ========================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all sections and cards
const animateElements = () => {
    document.querySelectorAll('.section, .card, .project-card, .skill-category, .service-card').forEach(el => {
        if (!el.classList.contains('fade-init')) {
            el.classList.add('fade-init');
            observer.observe(el);
        }
    });
};

animateElements();

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// PARALLAX EFFECT (Optimized)
// ========================================
const hero = document.querySelector('.hero');
if (hero) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled < 1000) { // Only run while visible
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    hero.style.opacity = 1 - (scrolled / 800);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
const createBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top glass';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

createBackToTop();

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================
document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

console.log('🎨 Portfolio Enhanced - All systems ready!');
