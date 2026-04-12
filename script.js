/**
 * Personal Portfolio Interactivity
 * Handles: Scroll Reveal, Mouse Parallax, and Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll Reveal Animation ---
    // Uses Intersection Observer to trigger CSS transitions when elements enter view
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Once visible, we can stop observing this element
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Select all project cards for reveal
    const projectCards = document.querySelectorAll('.card');
    projectCards.forEach(card => {
        revealObserver.observe(card);
    });


    // --- 2. Interactive Mouse Parallax ---
    // Moves the background "blobs" slightly based on cursor position for depth
    const backgroundWrapper = document.querySelector('.bg-gradient-wrapper');
    const blobs = document.querySelectorAll('.blob');

    if (window.innerWidth > 768) { // Only enable on desktop for performance
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;

            // Calculate distance from center (normalized -1 to 1)
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            blobs.forEach((blob, index) => {
                // index 0 moves one way, index 1 moves the other for parallax effect
                const intensity = index === 0 ? 30 : -40;
                const xShift = moveX * intensity;
                const yShift = moveY * intensity;

                blob.style.transform = `translate(${xShift}px, ${yShift}px)`;
            });
        });
    }


    // --- 3. Smooth Section Scrolling ---
    // Overrides default jump behavior for a premium feel
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll past the section's top padding so the heading is visible
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight + 80;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. Navbar Transparency on Scroll ---
    // Adds a background blur/color when user scrolls down
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(3, 3, 3, 0.85)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(3, 3, 3, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

});