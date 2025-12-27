document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scroll for Navigation
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

    // 3. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // 4. Form Validation & Modal
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    if (form) {
        form.addEventListener('submit', (e) => {
            // e.preventDefault();
            
            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            let isValid = true;

            // Inputs
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');

            // Name Validation
            if (!name.value.trim()) {
                showError(name, 'Full name is required');
                isValid = false;
            }

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            // Phone Validation
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }

            if (isValid) {
                // Simulate API call
                // const btn = form.querySelector('.btn-submit');
                // const originalText = btn.innerText;
                // btn.innerText = 'Processing...';
                // btn.disabled = true;
                form.submit();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    form.reset();
                    showModal();
                }, 1500);
            }
        });
    }

    function showError(input, message) {
        const group = input.parentElement;
        const errorDisplay = group.querySelector('.error-msg');
        errorDisplay.innerText = message;
        errorDisplay.style.display = 'block';
        input.focus();
    }

    function showModal() {
        modal.classList.add('active');
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Add lift effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});