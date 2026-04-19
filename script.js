/* ============================================
   LEO CARTER PORTFOLIO - JAVASCRIPT v2
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initNavbar();
    initParticles();
    initRevealAnimations();
    initSkillBars();
    initContactForm();
    initTutoringSection();
});

/* --- Scroll Progress Bar --- */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');

    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
}

/* --- Navbar Scroll Effect --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/* --- Particle Background --- */
function initParticles() {
    const particlesContainer = document.getElementById('particles');

    if (!particlesContainer) return;

    const particleCount = 25;
    const colors = ['#6366F1', '#22D3EE', '#F59E0B'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        particle.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;

        particlesContainer.appendChild(particle);
    }
}

/* --- Reveal Animations on Scroll --- */
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));
}

/* --- Skill Bars Animation --- */
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');

                setTimeout(() => {
                    fill.style.width = `${width}%`;
                }, 300);

                skillObserver.unobserve(fill);
            }
        });
    }, observerOptions);

    skillFills.forEach(fill => skillObserver.observe(fill));
}

/* --- Contact Form --- */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" stroke-dasharray="30 60"/>
            </svg>
        `;
        submitBtn.disabled = true;

        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

/* --- Notification System --- */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const icon = type === 'success'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>';

    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add styles if not already in document
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 9999;
                animation: slideInRight 0.3s ease;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                font-weight: 500;
            }
            .notification-success .notification-content {
                background: #10B981;
                color: white;
            }
            .notification-error .notification-content {
                background: #EF4444;
                color: white;
            }
            .notification-icon {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* --- Smooth Scroll for Anchor Links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = targetElement.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* --- Parallax Effect for Hero Orbs --- */
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.gradient-orb');

    if (orbs.length > 0) {
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.08;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}, { passive: true });

/* --- Cursor Glow Effect (Desktop Only) --- */
if (window.matchMedia('(min-width: 1024px)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = `
        .cursor-glow {
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        }
        body:not(:hover) .cursor-glow {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
}


// Mail Integration
emailjs.init("cVUsxGH5QF7Y3O5QM");

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");
    const btnText = submitBtn.querySelector("span");

    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    btnText.innerHTML = 'Sending<span class="btn-spinner"></span>';

    // Add loading animation styles if not exists
    if (!document.getElementById('btn-loading-styles')) {
        const loadingStyles = document.createElement('style');
        loadingStyles.id = 'btn-loading-styles';
        loadingStyles.textContent = `
            .btn-loading {
                position: relative;
                pointer-events: none;
            }
            .btn-loading .btn-spinner {
                display: inline-block;
                width: 18px;
                height: 18px;
                margin-left: 8px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                vertical-align: middle;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(loadingStyles);
    }

    emailjs.send("service_ftbvmse", "template_9g4tz8q", formData)
        .then(function (response) {
            showNotification("Message sent successfully! I'll get back to you soon.", "success");
            contactForm.reset();
        })
        .catch(function (error) {
            showNotification("Failed to send message. Please try again.", "error");
            console.error("EmailJS Error:", error);
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            btnText.textContent = "Send Message";
        });
});

/* --- Tutoring Section Interactive --- */
function initTutoringSection() {
    const knowMoreBtns = document.querySelectorAll('.know-more-btn');
    const tutoringGrid = document.getElementById('tutoringGrid');
    const courseDetailContainer = document.getElementById('courseDetailContainer');
    const courseDetailContent = document.getElementById('courseDetailContent');
    const enrollmentPopup = document.getElementById('enrollmentPopup');
    const enrollmentPopupOverlay = document.getElementById('enrollmentPopupOverlay');
    const enrollmentPopupClose = document.getElementById('enrollmentPopupClose');
    const enrollmentForm = document.getElementById('enrollmentForm');
    const successNotification = document.getElementById('successNotification');

    // Course data
    const courseData = {
        python: {
            title: 'Python Programming',
            displayTitle: 'Python Mastery',
            badge: 'Beginner Friendly',
            badgeClass: 'python',
            icon: `<svg fill="white" width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M535.8 264.5C528.1 233.6 513.5 210.3 482.4 210.3L442.3 210.3L442.3 257.7C442.3 294.5 411.1 325.5 375.5 325.5L268.7 325.5C239.5 325.5 215.3 350.5 215.3 379.8L215.3 481.6C215.3 510.6 240.5 527.6 268.7 535.9C302.5 545.8 335 547.6 375.5 535.9C402.4 528.1 428.9 512.4 428.9 481.6L428.9 440.9L322.2 440.9L322.2 427.3L482.4 427.3C513.5 427.3 525 405.6 535.8 373.1C547 339.6 546.5 307.4 535.8 264.5zM382.2 508.7C374.6 509.2 367.3 505.5 363.3 499C359.4 492.4 359.4 484.3 363.3 477.7C367.3 471.2 374.6 467.5 382.2 468C389.8 467.5 397.1 471.2 401.1 477.7C405 484.3 405 492.4 401.1 499C397.1 505.5 389.8 509.2 382.2 508.7zM263.8 312.1L370.6 312.1C400.3 312.1 424 287.6 424 257.8L424 155.9C424 126.9 399.6 105.2 370.6 100.3C334.8 94.4 295.9 94.7 263.8 100.4C218.6 108.4 210.4 125.1 210.4 156L210.4 196.7L317.3 196.7L317.3 210.3L170.3 210.3C139.2 210.3 112 229 103.5 264.5C93.7 305.2 93.3 330.6 103.5 373.1C111.1 404.7 129.2 427.3 160.3 427.3L197 427.3L197 378.5C197 343.2 227.5 312.1 263.8 312.1zM257.2 128.7C268.5 128.7 277.6 137.8 277.6 149.1C277.6 160.4 268.5 169.5 257.2 169.5C245.9 169.5 236.8 160.4 236.8 149.1C236.8 137.8 245.9 128.7 257.2 128.7z"/></svg>`,
            price: '₹4,999',
            duration: '4 Weeks',
            mode: 'One-on-One Live Tutoring',
            topics: ['Python basics', 'Variables', 'Conditions', 'Loops', 'Functions', 'OOP', 'File handling', 'Exception handling', 'Mini projects'],
            roadmap: ['Week 1: Python Basics & Variables', 'Week 2: Conditions, Loops & Functions', 'Week 3: OOP Concepts', 'Week 4: Projects & File Handling']
        },
        javascript: {
            title: 'JavaScript Mastery',
            displayTitle: 'JavaScript Mastery',
            badge: 'Most Popular',
            badgeClass: 'javascript',
            icon: `<svg fill="white" width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 96L96 544L544 544L544 96L96 96zM339.8 445.4C339.8 489 314.2 508.9 276.9 508.9C243.2 508.9 223.7 491.5 213.7 470.4L248 449.7C254.6 461.4 260.6 471.3 275.1 471.3C288.9 471.3 297.7 465.9 297.7 444.8L297.7 301.7L339.8 301.7L339.8 445.4zM439.4 508.9C400.3 508.9 375 490.3 362.7 465.9L397 446.1C406 460.8 417.8 471.7 438.5 471.7C455.9 471.7 467.1 463 467.1 450.9C467.1 436.5 455.7 431.4 436.4 422.9L425.9 418.4C395.5 405.5 375.4 389.2 375.4 354.9C375.4 323.3 399.5 299.3 437 299.3C463.8 299.3 483 308.6 496.8 333L464 354C456.8 341.1 449 336 436.9 336C424.6 336 416.8 343.8 416.8 354C416.8 366.6 424.6 371.7 442.7 379.6L453.2 384.1C489 399.4 509.1 415.1 509.1 450.3C509.1 488.1 479.3 508.9 439.4 508.9z"/></svg>`,
            price: '₹5,999',
            duration: '5 Weeks',
            mode: 'One-on-One Live Tutoring',
            topics: ['JavaScript fundamentals', 'DOM', 'Events', 'Arrays', 'Objects', 'ES6+', 'Promises', 'Async/Await', 'APIs', 'Local storage', 'Real projects'],
            roadmap: ['Week 1: JS Fundamentals & DOM', 'Week 2: Events & ES6+ Features', 'Week 3: Async Programming', 'Week 4: APIs & Projects', 'Week 5: Portfolio Building']
        },
        frontend: {
            title: 'Frontend Mastery',
            displayTitle: 'Frontend Mastery',
            badge: 'Career Focused',
            badgeClass: 'frontend',
            icon: `<svg fill="white" width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M482.2 241.2C476.8 239.4 471.4 237.7 466 236.1C466.9 232.4 467.7 228.7 468.5 225C480.8 165.4 472.7 117.5 445.4 101.7C419.1 86.6 376.2 102.3 332.8 140.1C328.5 143.8 324.3 147.7 320.3 151.6C317.6 149 314.8 146.4 312 143.9C266.5 103.5 220.9 86.5 193.6 102.4C167.4 117.6 159.6 162.7 170.6 219.1C171.7 224.7 172.9 230.2 174.3 235.8C167.9 237.6 161.6 239.6 155.7 241.7C102.3 260.2 64 289.4 64 319.6C64 350.8 104.8 382.1 160.3 401.1C164.8 402.6 169.3 404.1 173.9 405.4C172.4 411.4 171.1 417.3 169.9 423.4C159.4 478.9 167.6 522.9 193.8 538C220.8 553.6 266.2 537.6 310.4 498.9C313.9 495.8 317.4 492.6 320.9 489.2C325.3 493.5 329.9 497.6 334.5 501.6C377.3 538.4 419.6 553.3 445.7 538.2C472.7 522.6 481.5 475.3 470.1 417.7C469.2 413.3 468.2 408.8 467.1 404.2C470.3 403.3 473.4 402.3 476.5 401.3C534.2 382.2 576 351.3 576 319.6C576 289.3 536.6 259.9 482.2 241.2zM346.9 156.3C384.1 123.9 418.8 111.2 434.6 120.3C451.5 130 458 169.2 447.4 220.7C446.7 224.1 446 227.4 445.1 230.7C422.9 225.7 400.4 222.1 377.8 220.1C364.8 201.5 350.6 183.7 335.2 167C339.1 163.3 342.9 159.8 346.9 156.3zM231.2 371.5C236.3 380.2 241.5 388.9 247 397.4C231.4 395.7 215.9 393.2 200.6 389.9C205 375.5 210.5 360.6 216.9 345.4C221.5 354.2 226.2 362.9 231.2 371.5zM200.9 251.2C215.3 248 230.6 245.4 246.5 243.4C241.2 251.7 236 260.2 231.1 268.8C226.2 277.3 221.4 286 216.9 294.8C210.6 279.9 205.3 265.3 200.9 251.2zM228.3 320.1C234.9 306.3 242.1 292.8 249.7 279.5C257.3 266.2 265.5 253.3 274.1 240.6C289.1 239.5 304.4 238.9 320 238.9C335.6 238.9 351 239.5 365.9 240.6C374.4 253.2 382.5 266.1 390.2 279.3C397.9 292.5 405.1 306 411.9 319.7C405.2 333.5 398 347.1 390.3 360.5C382.7 373.8 374.6 386.7 366.1 399.5C351.2 400.6 335.7 401.1 320 401.1C304.3 401.1 289.1 400.6 274.4 399.7C265.7 387 257.5 374 249.8 360.7C242.1 347.4 235 333.9 228.3 320.1zM408.9 371.3C414 362.5 418.8 353.6 423.5 344.6C429.9 359.1 435.5 373.8 440.4 388.9C424.9 392.4 409.2 395.1 393.4 396.9C398.8 388.5 403.9 379.9 408.9 371.3zM423.3 294.8C418.6 286 413.8 277.2 408.8 268.6C403.9 260.1 398.8 251.7 393.5 243.4C409.6 245.4 425 248.1 439.4 251.4C434.8 266.2 429.4 280.6 423.3 294.8zM320.2 182.3C330.7 193.7 340.6 205.7 349.8 218.1C330 217.2 310.1 217.2 290.3 218.1C300.1 205.2 310.2 193.2 320.2 182.3zM204.2 121C221 111.2 258.3 125.2 297.6 160C300.1 162.2 302.6 164.6 305.2 167C289.7 183.7 275.4 201.5 262.3 220.1C239.7 222.1 217.3 225.6 195.1 230.5C193.8 225.4 192.7 220.2 191.6 215C182.2 166.6 188.4 130.1 204.2 121zM179.7 384.6C175.5 383.4 171.4 382.1 167.3 380.7C146 374 121.8 363.4 104.3 349.5C94.2 342.5 87.4 331.7 85.5 319.6C85.5 301.3 117.1 277.9 162.7 262C168.4 260 174.2 258.2 180 256.5C186.8 278.2 195 299.5 204.5 320.1C194.9 341 186.6 362.6 179.7 384.6zM296.3 482.6C279.8 497.7 260.7 509.7 239.9 517.9C228.8 523.2 216 523.7 204.6 519.2C188.7 510 182.1 474.7 191.1 427.2C192.2 421.6 193.4 416 194.8 410.5C217.2 415.3 239.8 418.6 262.7 420.3C275.9 439 290.4 456.9 305.9 473.7C302.7 476.8 299.5 479.8 296.3 482.6zM320.8 458.3C310.6 447.3 300.4 435.1 290.5 422C300.1 422.4 310 422.6 320 422.6C330.3 422.6 340.4 422.4 350.4 421.9C341.2 434.6 331.3 446.7 320.8 458.3zM451.5 488.3C450.6 500.5 444.6 511.9 435 519.6C419.1 528.8 385.2 516.8 348.6 485.4C344.4 481.8 340.2 477.9 335.9 473.9C351.2 457 365.3 439.1 378.1 420.3C401 418.4 423.8 414.9 446.3 409.8C447.3 413.9 448.2 418 449 422C453.9 443.6 454.7 466.1 451.5 488.3zM469.7 380.8C466.9 381.7 464.1 382.6 461.2 383.4C454.2 361.6 445.6 340.3 435.7 319.6C445.3 299.2 453.4 278.2 460.2 256.7C465.4 258.2 470.4 259.8 475.2 261.4C521.8 277.4 554.5 301.2 554.5 319.4C554.5 339 519.6 364.3 469.7 380.8zM320 365.8C345.3 365.8 365.8 345.3 365.8 320C365.8 294.7 345.3 274.2 320 274.2C294.7 274.2 274.2 294.7 274.2 320C274.2 345.3 294.7 365.8 320 365.8z"/></svg>`,
            price: '₹7,999',
            duration: '6 Weeks',
            mode: 'One-on-One Live Tutoring',
            topics: ['HTML', 'CSS', 'Flexbox', 'Grid', 'Responsive design', 'Tailwind CSS', 'JavaScript integration', 'React basics', 'Components', 'Hooks', 'Routing', 'Deployment'],
            roadmap: ['Week 1: HTML & CSS Fundamentals', 'Week 2: Flexbox, Grid & Responsive', 'Week 3: Tailwind CSS', 'Week 4: JavaScript Integration', 'Week 5: React Basics & Components', 'Week 6: Hooks, Routing & Deployment']
        }
    };

    // Common benefits with meaningful icons
    const commonBenefits = [
        {
            text: 'One-on-One Personal Mentoring',
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
        },
        {
            text: 'Live Support',
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>`
        },
        {
            text: 'Lifetime Recorded Sessions',
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`
        },
        {
            text: 'Private GitHub Repository',
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
        },
        {
            text: 'Flexible Learning',
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
        },
        {
            text: 'Practical Projects',
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
        },
        {
            text: 'Personal Guidance',
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"/><path d="M2 12h20"/></svg>`
        },
        {
            text: 'Career Support',
            icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`
        }
    ];

    let currentCourse = null;

    // Helper function to create SVG check icon
    const checkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>`;

    // Helper function to create star icon
    const starIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

    // Know More button click handlers
    knowMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const course = btn.getAttribute('data-course');
            if (course && courseData[course]) {
                showCourseDetail(course);
            }
        });
    });

    // Show course detail
    function showCourseDetail(courseKey) {
        currentCourse = courseKey;
        const course = courseData[courseKey];

        // Fade out cards
        const cards = tutoringGrid.querySelectorAll('.tutoring-card');
        cards.forEach(card => {
            card.classList.add('fade-out');
        });

        // After fade out, show detail
        setTimeout(() => {
            tutoringGrid.classList.add('hidden');

            // Build course detail HTML
            const detailHTML = buildCourseDetailHTML(course, courseKey);
            courseDetailContent.innerHTML = detailHTML;

            // Show detail container
            courseDetailContainer.classList.add('active');

            // Add event listeners for the new content
            attachDetailEventListeners(courseKey);
        }, 400);
    }

    // Build course detail HTML
    function buildCourseDetailHTML(course, courseKey) {
        const benefitsHTML = commonBenefits.map(benefit => `
            <div class="benefit-item">
                <div class="benefit-icon">${benefit.icon}</div>
                <span class="benefit-text">${benefit.text}</span>
            </div>
        `).join('');

        const syllabusHTML = course.topics.map(topic => `
            <div class="syllabus-item">
                <div class="syllabus-item-icon">${checkIcon}</div>
                <span>${topic}</span>
            </div>
        `).join('');

        const roadmapHTML = course.roadmap.map((step, index) => `
            <div class="roadmap-item">
                <div class="roadmap-number">${index + 1}</div>
                <span class="roadmap-text">${step}</span>
            </div>
        `).join('');

        return `
            <button class="btn-back" id="backBtn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Courses
            </button>
            <div class="course-detail-card">
                <div class="course-header">
                    <span class="course-badge ${course.badgeClass}">${course.badge}</span>
                    <div class="course-icon-large">${course.icon}</div>
                    <h3 class="course-title-large">${course.displayTitle}</h3>
                    <p class="course-subtitle">Master the skills that matter in the real world</p>
                </div>

                <div class="course-meta-grid">
                    <div class="course-meta-item">
                        <div class="course-meta-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                        </div>
                        <p class="course-meta-label">Duration</p>
                        <p class="course-meta-value">${course.duration}</p>
                    </div>
                    <div class="course-meta-item">
                        <div class="course-meta-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <p class="course-meta-label">Mode</p>
                        <p class="course-meta-value">${course.mode}</p>
                    </div>
                    <div class="course-meta-item">
                        <div class="course-meta-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                            </svg>
                        </div>
                        <p class="course-meta-label">Price</p>
                        <p class="course-meta-value price">${course.price}</p>
                    </div>
                </div>

                <div class="course-sections">
                    <div class="course-section">
                        <h4 class="course-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                            </svg>
                            Complete Syllabus
                        </h4>
                        <div class="syllabus-list">${syllabusHTML}</div>
                    </div>
                    <div class="course-section">
                        <h4 class="course-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            Benefits Included
                        </h4>
                        <div class="benefits-grid">${benefitsHTML}</div>
                    </div>
                    <div class="course-section">
                        <h4 class="course-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                                <path d="M22 4L12 14.01l-3-3"/>
                            </svg>
                            Your Roadmap
                        </h4>
                        <div class="roadmap-list">${roadmapHTML}</div>
                    </div>
                    <div class="course-section">
                        <h4 class="course-section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                            </svg>
                            What You'll Achieve
                        </h4>
                        <div class="roadmap-list">
                            <div class="roadmap-item">
                                <div class="roadmap-number">${starIcon}</div>
                                <span class="roadmap-text">Build real-world projects</span>
                            </div>
                            <div class="roadmap-item">
                                <div class="roadmap-number">${starIcon}</div>
                                <span class="roadmap-text">Portfolio-ready skills</span>
                            </div>
                            <div class="roadmap-item">
                                <div class="roadmap-number">${starIcon}</div>
                                <span class="roadmap-text">Industry best practices</span>
                            </div>
                            <div class="roadmap-item">
                                <div class="roadmap-number">${starIcon}</div>
                                <span class="roadmap-text">Career guidance & support</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="course-enroll-section">
                    <button class="btn-enroll-now" id="enrollNowBtn" data-course="${courseKey}">
                        <span>Enroll Now</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    // Attach event listeners to detail content
    function attachDetailEventListeners(courseKey) {
        const backBtn = document.getElementById('backBtn');
        const enrollNowBtn = document.getElementById('enrollNowBtn');

        if (backBtn) {
            backBtn.addEventListener('click', hideCourseDetail);
        }

        if (enrollNowBtn) {
            enrollNowBtn.addEventListener('click', () => {
                openEnrollmentPopup(courseKey);
            });
        }
    }

    // Hide course detail and show cards
    function hideCourseDetail() {
        courseDetailContainer.classList.remove('active');

        setTimeout(() => {
            tutoringGrid.classList.remove('hidden');
            const cards = tutoringGrid.querySelectorAll('.tutoring-card');
            cards.forEach(card => {
                card.classList.remove('fade-out');
            });
        }, 100);
    }

    // Open enrollment popup
    function openEnrollmentPopup(courseKey) {
        const course = courseData[courseKey];
        const enrollCourseInput = document.getElementById('enrollCourse');

        if (enrollCourseInput && course) {
            enrollCourseInput.value = course.title;
        }

        enrollmentPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close enrollment popup
    function closeEnrollmentPopup() {
        enrollmentPopup.classList.remove('active');
        document.body.style.overflow = '';
        enrollmentForm.reset();
    }

    // Popup close handlers
    if (enrollmentPopupOverlay) {
        enrollmentPopupOverlay.addEventListener('click', closeEnrollmentPopup);
    }

    if (enrollmentPopupClose) {
        enrollmentPopupClose.addEventListener('click', closeEnrollmentPopup);
    }

    // Enrollment form submission
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('enrollName').value.trim(),
                email: document.getElementById('enrollEmail').value.trim(),
                phone: document.getElementById('enrollPhone').value.trim(),
                course: document.getElementById('enrollCourse').value.trim(),
                message: document.getElementById('enrollMessage').value.trim()
            };

            // Validate
            if (!formData.name || !formData.email || !formData.phone) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = `
                <span>Sending...</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="30 60"/>
                </svg>
            `;
            submitBtn.disabled = true;

            // Send email using EmailJS
            emailjs.send('service_ftbvmse', 'template_59cfdk7', formData)
                .then(function() {
                    closeEnrollmentPopup();
                    showSuccessNotification();
                })
                .catch(function(error) {
                    showNotification('Failed to submit. Please try again.', 'error');
                    console.error('EmailJS Error:', error);
                })
                .finally(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Show success notification
    function showSuccessNotification() {
        successNotification.classList.add('active');

        setTimeout(() => {
            successNotification.classList.remove('active');
        }, 4000);
    }

    // Close popup on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (enrollmentPopup.classList.contains('active')) {
                closeEnrollmentPopup();
            }
            if (successNotification.classList.contains('active')) {
                successNotification.classList.remove('active');
            }
        }
    });
}