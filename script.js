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
    initializeMobileMenu();

    // Initial check for reveal elements
    reveal();

    // Lazy-load lucide if there are icons on the page
    loadLucideIfNeeded();
    // Initialize pricing tabs
    try { initPricingTabs(); } catch (e) { /* ignore if not present */ }
});

function loadLucideIfNeeded() {
    if (!document.querySelector('[data-lucide]')) return;

    // avoid loading multiple times
    if (window.__lucideLoading) return;
    window.__lucideLoading = true;

    var script = document.createElement('script');
    script.src = 'https://unpkg.com/lucide@latest';
    script.async = true;
    script.onload = function () {
        try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch (e) { /* ignore */ }
    };
    document.head.appendChild(script);
}

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

function initializeMobileMenu() {
    var menuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');
    var openIcon = document.getElementById('menu-icon-open');
    var closeIcon = document.getElementById('menu-icon-close');

    if (!menuButton || !mobileMenu || !openIcon || !closeIcon) {
        return;
    }

    function setMenuState(isOpen) {
        mobileMenu.classList.toggle('hidden', !isOpen);
        openIcon.classList.toggle('hidden', isOpen);
        closeIcon.classList.toggle('hidden', !isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
    }

    menuButton.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.contains('hidden');
        setMenuState(isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            setMenuState(false);
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            setMenuState(false);
        }
    });
}

/* Pricing tabs: simple, accessible tab switcher with animation */
function initPricingTabs() {
    var tabs = document.querySelectorAll('.pricing-tab');
    if (!tabs || !tabs.length) return;

    function showTab(name) {
        // buttons
        tabs.forEach(function (btn) {
            var is = btn.getAttribute('data-tab') === name;
            btn.setAttribute('aria-selected', String(is));
        });

        // contents
        var contents = document.querySelectorAll('.tab-content');
        contents.forEach(function (c) {
            if (c.id === 'tab-' + name) {
                c.classList.remove('hidden');
                // small timeout to allow transition
                requestAnimationFrame(function () { c.classList.add('active'); });
            } else {
                c.classList.remove('active');
                // hide after transition (matches CSS transition duration)
                setTimeout(function () { c.classList.add('hidden'); }, 420);
            }
        });
    }

    tabs.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var name = btn.getAttribute('data-tab');
            showTab(name);
        });
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                var idx = Array.prototype.indexOf.call(tabs, btn);
                var next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
                tabs[next].focus();
            }
        });
    });

    // show default tab
    var defaultTab = document.querySelector('.pricing-tab[aria-selected="true"]') || tabs[0];
    if (defaultTab) showTab(defaultTab.getAttribute('data-tab'));
}
