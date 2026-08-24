// Smooth Scroll Navigation

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active Navigation Link on Scroll

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.opacity = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.opacity = '1';
                } else {
                    link.style.opacity = '0.7';
                }
            });
        }
    });

    // Handle hero section specially (when at top)
    if (window.scrollY < sections[1].offsetTop - 150) {
        navLinks.forEach(link => {
            link.style.opacity = '1';
        });
    }
}

window.addEventListener('scroll', updateActiveLink);

// Fade-in Animation on Scroll

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe the about grid for fade-in animation
const aboutGrid = document.querySelector('.about-grid');
if (aboutGrid) {
    fadeInObserver.observe(aboutGrid);
}

// Observe socials icons for fade-in animation
const socialsIcons = document.querySelector('.socials-icons');
if (socialsIcons) {
    fadeInObserver.observe(socialsIcons);
}

// Initialize on Load

window.addEventListener('load', () => {
    updateActiveLink();
});

// Keyboard Accessibility

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
