/* ============================================
   CHUBBY BANH MI & BUBBLE TEA
   JavaScript Functionality
============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // MENU CATEGORY FILTER
    // ============================================
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            // Filter menu cards
            menuCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {
        window.addEventListener('scroll', toggleBackToTop);

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.menu-card, .boba-category, .testimonial-card, .gallery-item, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // NEWSLETTER FORM HANDLER
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Show success message (in production, this would send to a server)
            const btn = this.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Subscribed!';
            btn.style.background = '#16A34A';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // ============================================
    // TESTIMONIALS AUTO-SCROLL (Optional)
    // ============================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function highlightTestimonial() {
        testimonialCards.forEach((card, index) => {
            if (index === currentTestimonial) {
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 20px 60px rgba(232, 146, 62, 0.2)';
            } else {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '';
            }
        });

        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }

    // Only run on larger screens
    if (window.innerWidth > 768 && testimonialCards.length > 0) {
        setInterval(highlightTestimonial, 4000);
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO (Subtle)
    // ============================================
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < 600) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);
            }
        });
    }

    // ============================================
    // GALLERY LIGHTBOX (Simple)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In production, this would open a lightbox
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
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

    // Observe hero stats for counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const match = text.match(/(\d+)/);
                if (match) {
                    const num = parseInt(match[1]);
                    const suffix = text.replace(/\d+/, '');
                    animateCounter(target, num, 1500);
                    setTimeout(() => {
                        target.textContent = num + suffix;
                    }, 1600);
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ============================================
    // LOADING ANIMATION
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // ============================================
    // HOVER SOUND EFFECT (Optional - Uncomment if desired)
    // ============================================
    /*
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    hoverSound.volume = 0.1;

    const buttons = document.querySelectorAll('.btn, .menu-card, .order-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {});
        });
    });
    */

    console.log('🥖 Chubby Banh Mi & Bubble Tea - Website loaded successfully!');
    console.log('🧋 Made with love in Surrey, BC');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
