// --- Dark Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
} else {
    // Default to dark mode if user prefers dark color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}


// --- Typing Effect ---
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Curious learner", "Aspiring Developer", "Tech Enthusiast", "Creative Thinker"];
const typingDelay = 100;
const erasingDelay = 60;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});


// --- Scroll Reveal Animation ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-hidden').forEach((section) => {
    observer.observe(section);
});


// --- Navbar Scroll Effect ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// --- Contact Form ---
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple visual feedback
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully.');
            form.reset();
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 1500);
    });
}