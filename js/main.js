/**
 * Viajes Travel Website - Main JavaScript File
 * Handles navbar scroll effects, smooth scrolling, mobile menu,
 * tour filtering, scroll animations, language selection, contact form validation,
 * and scroll indicator visibility.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     0. PAGE LOAD ANIMATION
     ========================================== */
  window.addEventListener('load', () => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  });

  // Fallback: remove loading class after 2 seconds max
  setTimeout(() => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  }, 2000);


  /* ==========================================
     1. NAVBAR SCROLL EFFECT + ACTIVE LINK
     ========================================== */
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');

  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Highlight active nav link based on scroll position
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute('id');
        }
      });

      document.querySelectorAll('.navbar-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check on load
  }


  /* ==========================================
     2. SMOOTH SCROLL
     ========================================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const NAVBAR_HEIGHT = 72; // Navbar offset in pixels

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Ignore empty hash or default hash
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - NAVBAR_HEIGHT;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ==========================================
     3. MOBILE MENU
     ========================================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    // Toggle mobile menu and icon on hamburger click
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      hamburger.classList.toggle('active');

      // Toggle FontAwesome icon
      const icon = hamburger.querySelector('i');
      if (icon) {
        if (hamburger.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile nav when clicking any link inside it
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');

        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }


  /* ==========================================
     4. TOUR FILTERING
     ========================================== */
  const tourTabs = document.querySelectorAll('.tour-tab');
  const tourCards = document.querySelectorAll('.tour-card');

  if (tourTabs.length > 0 && tourCards.length > 0) {
    tourTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');

        // Update active class on tab buttons
        tourTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter tour cards with fade transition
        tourCards.forEach(card => {
          const destination = card.getAttribute('data-destination');
          const shouldShow = filter === 'all' || destination === filter;

          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

          if (shouldShow) {
            card.classList.remove('hidden');
            // Reset state for smooth fade-in
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';

            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';

            setTimeout(() => {
              card.classList.add('hidden');
            }, 300);
          }
        });
      });
    });
  }


  /* ==========================================
     5. SCROLL ANIMATIONS (IntersectionObserver)
     ========================================== */
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));
  }


  /* ==========================================
     6. LANGUAGE SELECTOR
     ========================================== */
  const langSelector = document.querySelector('.lang-selector');

  if (langSelector) {
    const langCurrent = langSelector.querySelector('.lang-current') || langSelector.querySelector('span');
    const langOptions = langSelector.querySelectorAll('.lang-option, [data-lang]');

    // Toggle dropdown visibility
    langSelector.addEventListener('click', (e) => {
      // If clicking directly on an option, option listener will handle it
      if (e.target.closest('.lang-option') || e.target.hasAttribute('data-lang')) {
        return;
      }
      langSelector.classList.toggle('active');
    });

    // Update text when an option is selected
    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');
        const flag = option.textContent.trim().split(' ')[0]; // Get emoji flag
        if (langCurrent) {
          langCurrent.innerHTML = `<i class="fas fa-globe"></i> ${lang} <i class="fas fa-chevron-down" style="font-size:10px"></i>`;
        }
        langSelector.classList.remove('active');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!langSelector.contains(e.target)) {
        langSelector.classList.remove('active');
      }
    });
  }


  /* ==========================================
     7. CONTACT FORM — WhatsApp Redirect
     ========================================== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const WHATSAPP_NUMBER = '525551652314';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather field values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const destination = document.getElementById('destination').value;
      const message = document.getElementById('message').value.trim();

      // Validate
      let isValid = true;
      const formFields = contactForm.querySelectorAll('input, select, textarea');

      formFields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!isValid) return;

      // Build WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `Hola, soy ${name}.\n` +
        `📧 Email: ${email}\n` +
        `📍 Destino de interés: ${destination}\n` +
        `💬 Mensaje: ${message}`
      );

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

      // Show success message
      if (formSuccess) {
        formSuccess.style.display = 'flex';
      }

      // Redirect to WhatsApp after a brief delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        contactForm.reset();
        if (formSuccess) {
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 3000);
        }
      }, 800);
    });

    // Remove error class on input
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
      });
    });
  }


  /* ==========================================
     8. SCROLL DOWN INDICATOR
     ========================================== */
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (scrollIndicator) {
    const handleScrollIndicator = () => {
      if (window.scrollY > 200) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    };

    window.addEventListener('scroll', handleScrollIndicator);
    handleScrollIndicator(); // Initial check on load
  }


  /* ==========================================
     9. COUNTER ANIMATION (About Section Stats)
     ========================================== */
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          el.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target + suffix;
        }
      };

      updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }


  /* ==========================================
     10. TOUR DETAIL MODAL
     ========================================== */
  const tourModal = document.getElementById('tourModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalDescription = document.getElementById('modalDescription');
  const modalIncludes = document.getElementById('modalIncludes');
  const modalPrice = document.getElementById('modalPrice');
  const modalWhatsapp = document.getElementById('modalWhatsapp');
  const detailButtons = document.querySelectorAll('.btn-details');

  if (tourModal && detailButtons.length > 0) {

    detailButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.tour-card');
        if (!card) return;

        // Extract data from the card
        const imgSrc = card.querySelector('.tour-card-image img').src;
        const imgAlt = card.querySelector('.tour-card-image img').alt;
        const badge = card.querySelector('.tour-card-badge').textContent;
        const title = card.querySelector('.tour-card-content h3').textContent;
        const metaSpans = card.querySelectorAll('.tour-card-meta span');
        const fullDesc = card.getAttribute('data-full-description') || card.querySelector('.tour-card-description').textContent;
        const includes = card.getAttribute('data-includes') || '';
        const priceHTML = card.querySelector('.tour-card-price').innerHTML;
        const whatsappLink = card.querySelector('.btn-whatsapp').href;

        // Populate modal
        modalImage.src = imgSrc;
        modalImage.alt = imgAlt;
        modalBadge.textContent = badge;
        modalTitle.textContent = title;

        // Meta info
        let metaHTML = '';
        metaSpans.forEach(span => {
          metaHTML += `<span>${span.innerHTML}</span>`;
        });
        modalMeta.innerHTML = metaHTML;

        modalDescription.textContent = fullDesc;

        // Includes list
        modalIncludes.innerHTML = '';
        if (includes) {
          includes.split(',').forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.trim();
            modalIncludes.appendChild(li);
          });
        }

        modalPrice.innerHTML = priceHTML;
        modalWhatsapp.href = whatsappLink;

        // Show modal
        tourModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal
    const closeModal = () => {
      tourModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);

    // Close on overlay click (outside the modal box)
    tourModal.addEventListener('click', (e) => {
      if (e.target === tourModal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && tourModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

});
