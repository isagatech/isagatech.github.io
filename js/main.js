// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Generate random geometric pattern
function generatePattern() {
    const patternContainer = document.querySelector('.pattern-overlay');
    if (!patternContainer) return;

    const shapes = ['circle', 'triangle', 'square', 'x'];
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'pattern-svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    const patternDef = document.createElementNS(svgNS, 'defs');
    const pattern = document.createElementNS(svgNS, 'pattern');
    pattern.setAttribute('id', 'geometricPattern');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', '100');
    pattern.setAttribute('height', '100');

    // Add random shapes to pattern
    for (let i = 0; i < 8; i++) {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const x = Math.random() * 90 + 5;
        const y = Math.random() * 90 + 5;

        let shape;

        switch (shapeType) {
            case 'circle':
                shape = document.createElementNS(svgNS, 'circle');
                shape.setAttribute('cx', x);
                shape.setAttribute('cy', y);
                shape.setAttribute('r', '4');
                shape.setAttribute('fill', 'none');
                shape.setAttribute('stroke', '#fff');
                shape.setAttribute('stroke-width', '1');
                break;

            case 'triangle':
                shape = document.createElementNS(svgNS, 'polygon');
                const size = 8;
                shape.setAttribute('points', `${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`);
                shape.setAttribute('fill', 'none');
                shape.setAttribute('stroke', '#fff');
                shape.setAttribute('stroke-width', '1');
                break;

            case 'square':
                shape = document.createElementNS(svgNS, 'rect');
                shape.setAttribute('x', x - 4);
                shape.setAttribute('y', y - 4);
                shape.setAttribute('width', '8');
                shape.setAttribute('height', '8');
                shape.setAttribute('fill', 'none');
                shape.setAttribute('stroke', '#fff');
                shape.setAttribute('stroke-width', '1');
                break;

            case 'x':
                shape = document.createElementNS(svgNS, 'g');
                const line1 = document.createElementNS(svgNS, 'line');
                line1.setAttribute('x1', x - 4);
                line1.setAttribute('y1', y - 4);
                line1.setAttribute('x2', x + 4);
                line1.setAttribute('y2', y + 4);
                line1.setAttribute('stroke', '#fff');
                line1.setAttribute('stroke-width', '1');

                const line2 = document.createElementNS(svgNS, 'line');
                line2.setAttribute('x1', x + 4);
                line2.setAttribute('y1', y - 4);
                line2.setAttribute('x2', x - 4);
                line2.setAttribute('y2', y + 4);
                line2.setAttribute('stroke', '#fff');
                line2.setAttribute('stroke-width', '1');

                shape.appendChild(line1);
                shape.appendChild(line2);
                break;
        }

        if (shape) {
            pattern.appendChild(shape);
        }
    }

    patternDef.appendChild(pattern);
    svg.appendChild(patternDef);

    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'url(#geometricPattern)');
    svg.appendChild(rect);

    patternContainer.appendChild(svg);
}

// Header scroll effect - sticky after grass-divider with section-based colors
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const grassDivider = document.querySelector('.grass-divider');

    if (grassDivider) {
        const grassDividerBottom = grassDivider.getBoundingClientRect().top + window.scrollY + grassDivider.offsetHeight;

        if (window.scrollY > grassDividerBottom) {
            header.classList.add('sticky');
            updateHeaderColor();
        } else {
            header.classList.remove('sticky');
            removeHeaderColors();
        }
    }
});

// Section color mapping
const sectionColors = {
    'about': 'header-about',
    'haft-seen': 'header-haftseen',
    'chaharshanbe': 'header-chaharshanbe',
    'yalda': 'header-yalda',
    'people': 'header-people',
    'faq': 'header-faq',
    'instagram': 'header-instagram',
    'contact': 'header-contact'
};

// Remove all header color classes
function removeHeaderColors() {
    const header = document.querySelector('.header');
    Object.values(sectionColors).forEach(colorClass => {
        header.classList.remove(colorClass);
    });
}

// Update header color based on current section
function updateHeaderColor() {
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 50;

    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    let currentSection = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.id;
        }
    });

    // Remove all color classes first
    removeHeaderColors();

    // Add the appropriate color class
    if (currentSection && sectionColors[currentSection]) {
        header.classList.add(sectionColors[currentSection]);
    }
}

// Countdown timer for Nowruz - March 21, 2026
function updateCountdown() {
    const targetDate = new Date('March 21, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!slides.length) return;

    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    startAutoSlide();
}

// FAQ accordion functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't already active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Toggle Nowruz text between English and Farsi with animation
function initNowruzToggle() {
    const nowruzText = document.getElementById('nowruz-text');
    if (!nowruzText) return;

    const texts = ['Nowruz', 'نوروز'];
    let currentIndex = 0;

    // Set up initial structure
    nowruzText.innerHTML = `<span class="text-current">${texts[currentIndex]}</span><span class="text-next"></span>`;

    setInterval(() => {
        const nextIndex = (currentIndex + 1) % texts.length;
        const textNext = nowruzText.querySelector('.text-next');
        textNext.textContent = texts[nextIndex];

        // Trigger animation
        nowruzText.classList.add('switching');

        // After animation completes, reset
        setTimeout(() => {
            nowruzText.classList.remove('switching');
            const textCurrent = nowruzText.querySelector('.text-current');
            textCurrent.textContent = texts[nextIndex];
            textNext.textContent = '';
            currentIndex = nextIndex;
        }, 500);
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    if (!hamburger || !mobileMenuOverlay) return;

    function openMenu() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    mobileMenuClose.addEventListener('click', closeMenu);
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMenu();
        }
    });

    // Close menu when clicking a nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    generatePattern();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initSlideshow();
    initFAQ();
    initNowruzToggle();
    initMobileMenu();
});
