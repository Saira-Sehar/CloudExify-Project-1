// =============================================
// DOM ELEMENTS
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const typedEl = document.getElementById('typedText');
const backToTop = document.getElementById('backToTop');

// =============================================
// THEME SWITCHER
// =============================================
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// =============================================
// HAMBURGER MENU
// =============================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// =============================================
// NAVBAR SCROLL
// =============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// TYPEWRITER EFFECT
// =============================================
const phrases = [
    'a Web Developer',
    'a MERN Stack Developer',
    'a Problem Solver',
    'a CS Student'
];
let pIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeLoop() {
    if (isWaiting) return;
    
    const current = phrases[pIndex];
    
    if (!isDeleting) {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === current.length) {
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
                typeLoop();
            }, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            pIndex = (pIndex + 1) % phrases.length;
        }
    }
    
    const speed = isDeleting ? 35 : 65;
    setTimeout(typeLoop, speed);
}

typeLoop();

// =============================================
// SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================================
// COUNTER ANIMATION
// =============================================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            const duration = 1800;
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOut);
                
                counter.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// =============================================
// SKILL BARS ANIMATION
// =============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skill = entry.target;
            const fill = skill.querySelector('.skill-fill');
            const percent = skill.dataset.percent;
            fill.style.width = percent + '%';
            skillObserver.unobserve(skill);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-item').forEach(el => skillObserver.observe(el));

// =============================================
// PROJECT FILTER
// =============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            const tags = card.dataset.tags.split(',');
            card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
        });
    });
});

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
});

// =============================================
// CONTACT FORM VALIDATION
// =============================================
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    formFeedback.textContent = '';
    formFeedback.className = 'form-feedback';
    
    if (name === '') {
        showFormError('Please enter your name.');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showFormError('Please enter a valid email address.');
        return;
    }
    
    if (message === '') {
        showFormError('Please enter your message.');
        return;
    }
    
    if (message.length < 10) {
        showFormError('Message must be at least 10 characters.');
        return;
    }
    
    showFormSuccess('Message sent successfully! I\'ll get back to you soon.');
    contactForm.reset();
    
    setTimeout(() => {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
    }, 5000);
});

function showFormError(msg) {
    formFeedback.textContent = msg;
    formFeedback.className = 'form-feedback error';
}

function showFormSuccess(msg) {
    formFeedback.textContent = msg;
    formFeedback.className = 'form-feedback success';
}

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
