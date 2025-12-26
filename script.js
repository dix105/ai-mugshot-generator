document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Change icon
            menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        document.querySelectorAll('header nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    /* =========================================
       GLITCH TEXT EFFECT (THEME)
       ========================================= */
    const glitchTexts = document.querySelectorAll('.glitch-text');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&[]';
    
    glitchTexts.forEach(text => {
        const originalText = text.getAttribute('data-text');
        
        text.addEventListener('mouseover', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                text.innerText = text.innerText.split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    });

    /* =========================================
       FAQ ACCORDION
       ========================================= */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Toggle current
            const isOpen = question.classList.contains('active');
            
            // Close all others
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });
            
            if (!isOpen) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* =========================================
       MODALS (PRIVACY & TERMS)
       ========================================= */
    function openModal(modalId) {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore body scroll
        }
    }

    // Open triggers
    document.querySelectorAll('[data-modal-target]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    // Close triggers
    document.querySelectorAll('[data-modal-close]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-close');
            closeModal(modalId);
        });
    });

    // Close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    });

    /* =========================================
       SCROLL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================= */
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.step-card, .gallery-item, .testimonial-card').forEach(el => {
        // Initial opacity should be handled in CSS to prevent FOUC
        observer.observe(el);
    });

});