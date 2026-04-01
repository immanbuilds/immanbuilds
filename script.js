// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#3b82f6',
                'primary-container': '#1d4ed8',
                secondary: '#0f172a',
                tertiary: '#10b981',
                'on-surface': '#0f172a',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                headline: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                label: ['Inter', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
        }
    }
}

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initial check for reveal elements
    reveal();
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
