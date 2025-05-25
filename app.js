document.addEventListener('DOMContentLoaded', function() {

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active Nav Link Highlighter
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    // Get the base URL path, removing any query strings or hash fragments
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';


    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname.split('/').pop() || 'index.html';

        // Remove active class from any other link that might have it
        if (link.classList.contains('active')) {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }

        // Add active class to the current link
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
    // Ensure "Home" is active if no other link matches (e.g., on root path)
    if (currentPath === 'index.html' && !document.querySelector('.navbar-nav .nav-link.active')) {
        const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
            homeLink.setAttribute('aria-current', 'page');
        }
    }


    // Basic Form Submission Handler for Reservation Form
    const reservationForm = document.getElementById('bookingForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            // Bootstrap validation will handle prevention if invalid
            if (!reservationForm.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            reservationForm.classList.add('was-validated');

            if (reservationForm.checkValidity()) { // Proceed only if form is valid
                event.preventDefault(); // Prevent actual submission for this demo
                const name = document.getElementById('guestName').value;
                const numGuests = document.getElementById('numGuests').value;
                const resDate = document.getElementById('resDate').value;
                const resTime = document.getElementById('resTime').value;
                const confirmationMessageDiv = document.getElementById('confirmationMessage');

                confirmationMessageDiv.innerHTML = `<div class="alert alert-success" role="alert">Thank you, ${name}! Your reservation request for ${numGuests} guest(s) on ${resDate} at ${resTime} has been received. We will contact you shortly to confirm.</div>`;
                confirmationMessageDiv.style.display = 'block';
                reservationForm.reset();
                reservationForm.classList.remove('was-validated'); // Reset validation state
                setTimeout(() => { confirmationMessageDiv.style.display = 'none'; }, 7000);
            }
        });
    }

    // Basic Form Submission Handler for Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!contactForm.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            contactForm.classList.add('was-validated');

            if (contactForm.checkValidity()) {
                event.preventDefault(); // Prevent actual submission for this demo
                const name = document.getElementById('contactName').value;
                const reasonSelect = document.getElementById('contactReason');
                const reasonText = reasonSelect.options[reasonSelect.selectedIndex].text;
                const confirmationDiv = document.getElementById('contactConfirmation');

                confirmationDiv.innerHTML = `<div class="alert alert-success" role="alert">Thank you, ${name}! Your message regarding "${reasonText}" has been sent. We'll get back to you soon.</div>`;
                confirmationDiv.style.display = 'block';
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                setTimeout(() => { confirmationDiv.style.display = 'none'; }, 7000);
            }
        });
    }

    // Scroll Animation Trigger
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: stop observing once animated
            }
            // Optional: remove 'is-visible' when element scrolls out of view to re-trigger animation
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        // Use CSS variable for delay if set via inline style
        // The style="--animation-delay: 0.Xs;" is directly read by CSS
        observer.observe(el);
    });

    // Gallery Lightbox
    const imageModalElement = document.getElementById('imageModal');
    if (imageModalElement) {
        const galleryImages = document.querySelectorAll('.gallery-img-wrapper');
        const imageModal = new bootstrap.Modal(imageModalElement, {});
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');

        galleryImages.forEach(wrapper => {
            wrapper.addEventListener('click', function() {
                const imgElement = this.querySelector('img');
                if (imgElement) {
                    const imgSrc = imgElement.src;
                    const imgAlt = imgElement.alt;
                    if (modalImage) modalImage.src = imgSrc;
                    if (modalImage) modalImage.alt = imgAlt;
                    if (modalCaption) modalCaption.textContent = imgAlt; // Use alt text as caption
                    imageModal.show();
                }
            });
        });
    }

    // Bootstrap Form Validation Styling Trigger
    // (This is the IIFE from Bootstrap's docs, now correctly placed here)
    (function () {
      'use strict'
      var forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          // We are adding submit listeners above for our custom logic,
          // so we only need to ensure 'was-validated' is added for styling
          // if not already handled by our specific form handlers.
          // However, the specific handlers for reservationForm and contactForm
          // already add 'was-validated'. This generic one can be a fallback
          // or removed if all forms are handled specifically.
          // For now, let's keep it but be mindful of potential double event listeners
          // if not careful. The specific handlers above already call `form.classList.add('was-validated');`
          // so this might be redundant for those specific forms.
          // A better approach for those specific forms is to let them handle their own 'was-validated'
          // as they do. This IIFE is good for generic forms not handled elsewhere.

          // Let's refine this: The Bootstrap validation styling should trigger on submit.
          // Our custom handlers already do this. So, this generic IIFE is fine as is
          // for any *other* forms that might use `.needs-validation` and don't have custom JS.
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              // event.preventDefault(); // Already handled by specific handlers if they exist
              // event.stopPropagation(); // Already handled by specific handlers if they exist
            }
            // form.classList.add('was-validated'); // Already handled by specific handlers
          }, false)
        })
    })()

    // Set min date for reservation date input to today
    const resDateInput = document.getElementById("resDate");
    if (resDateInput) {
        var today = new Date().toISOString().split('T')[0];
        resDateInput.setAttribute('min', today);
    }

});
