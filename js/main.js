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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    generatePattern();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
