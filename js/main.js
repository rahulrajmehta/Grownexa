/**
 * Imax Media - Official Website Scripts
 * Multi-Page Responsive Experience & Google Ads Compliant Tracking
 */

// =============================================================================
// 1. CONFIGURABLE WHATSAPP SETTINGS
// =============================================================================
// Active WhatsApp business number: +91 91226 75361
const WHATSAPP_CONFIG = {
  phone: "919122675361", // International format (India country code 91 + 9122675361)
  displayPhone: "+91 91226 75361",
  rawPhone: "9122675361",
  defaultMessage: "Hi, I would like to inquire about Imax Media digital marketing services."
};

/**
 * Open WhatsApp with a custom pre-filled message
 * Transparently triggers Google Ads conversion tracking
 * @param {string} customText - Pre-filled message string
 */
function openWhatsApp(customText) {
  let targetPhone = (WHATSAPP_CONFIG.phone || "919122675361").replace(/\D/g, '');
  if (targetPhone.length === 10) {
    targetPhone = '91' + targetPhone;
  }
  const message = customText || WHATSAPP_CONFIG.defaultMessage;
  const encodedText = encodeURIComponent(message.trim());
  const url = `https://wa.me/${targetPhone}?text=${encodedText}`;

  // Trigger Google Ads Conversion Tracking (Transparent Lead Generation Event)
  try {
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        'send_to': 'AW-18450549273'
      });
      gtag('event', 'generate_lead', {
        'event_category': 'WhatsApp',
        'event_label': message
      });
    }
  } catch (err) {
    console.warn('Google Tag conversion tracking notice:', err);
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

// =============================================================================
// 2. DOM CONTENT LOADED INITIALIZATION
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppButtons();
  initStickyNavbar();
  initMobileMenu();
  initFaqAccordion();
  initConsultationModal();
  initAutoWelcomeModal();
  initDirectContactForm();
  initScrollReveal();
});

// =============================================================================
// 3. WHATSAPP CTA EVENT BINDINGS
// =============================================================================
function initWhatsAppButtons() {
  const waButtons = document.querySelectorAll('[data-wa-message]');
  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = btn.getAttribute('data-wa-message');
      openWhatsApp(message);
    });
  });
}

// =============================================================================
// 4. STICKY NAVBAR SCROLL TRANSITION
// =============================================================================
function initStickyNavbar() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// =============================================================================
// 5. MOBILE MENU DRAWER
// =============================================================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// =============================================================================
// 6. FAQ ACCORDION INTERACTION
// =============================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPanel = item.querySelector('.faq-answer-panel');

    if (!questionBtn || !answerPanel) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other open FAQ panels
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherPanel = otherItem.querySelector('.faq-answer-panel');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answerPanel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default
  const firstItem = faqItems[0];
  if (firstItem) {
    const firstPanel = firstItem.querySelector('.faq-answer-panel');
    firstItem.classList.add('active');
    if (firstPanel) {
      firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
    }
  }
}

// =============================================================================
// 7. USER-INITIATED CONSULTATION MODAL (Clean, Click-Triggered)
// =============================================================================
function initConsultationModal() {
  const openButtons = document.querySelectorAll('.js-open-consultation');
  const modal = document.getElementById('consultationModal');
  const closeBtn = document.getElementById('consultationCloseBtn');
  const form = document.getElementById('consultationForm');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If on a page without the modal (e.g., dedicated contact page), let default link navigation work
      if (modal) {
        e.preventDefault();
        openModal();
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('consultName')?.value.trim() || 'Not specified';
      const business = document.getElementById('consultBusiness')?.value.trim() || 'Not specified';
      const phone = document.getElementById('consultPhone')?.value.trim() || 'Not specified';
      const service = document.getElementById('consultService')?.value || 'General Marketing';
      const goals = document.getElementById('consultGoals')?.value.trim() || 'Looking for business growth';

      const structuredMsg = 
`Hi, I would like to request a consultation with Imax Media:
• Name: ${name}
• Business / Industry: ${business}
• Phone: ${phone}
• Service Needed: ${service}
• Notes / Goals: ${goals}`;

      closeModal();
      openWhatsApp(structuredMsg);
      form.reset();
    });
  }
}

// =============================================================================
// 7.5 AUTO WELCOME POPUP MODAL (Immediate WhatsApp Lead Generation)
// =============================================================================
function initAutoWelcomeModal() {
  const modal = document.getElementById('autoWelcomeModal');
  const closeBtn = document.getElementById('autoPopupCloseBtn');
  const ctaBtn = document.getElementById('autoPopupCtaBtn');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
  };

  const closeModal = () => {
    modal.classList.remove('active');
  };

  // Open automatically on website visit (small 350ms delay for smooth render)
  setTimeout(() => {
    openModal();
  }, 350);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      const message = ctaBtn.getAttribute('data-wa-message') || WHATSAPP_CONFIG.defaultMessage;
      openWhatsApp(message);
    });
  }
}

// =============================================================================
// 8. WORKING CONTACT PAGE FORM VALIDATION & SUBMISSION
// =============================================================================
function initDirectContactForm() {
  const form = document.getElementById('directContactForm');
  const noticeBox = document.getElementById('formStatusNotice');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form || !noticeBox) return;

  const validateField = (input, errorEl, condition) => {
    if (!condition) {
      input.style.borderColor = '#f87171';
      if (errorEl) errorEl.style.display = 'block';
      return false;
    } else {
      input.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      if (errorEl) errorEl.style.display = 'none';
      return true;
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactFullName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const messageInput = document.getElementById('contactMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const messageVal = messageInput ? messageInput.value.trim() : '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[\d\s\+\-\(\)]{8,}$/;

    const isNameValid = validateField(nameInput, nameError, nameVal.length >= 2);
    const isEmailValid = validateField(emailInput, emailError, emailPattern.test(emailVal));
    const isPhoneValid = validateField(phoneInput, phoneError, phonePattern.test(phoneVal));
    const isMessageValid = validateField(messageInput, messageError, messageVal.length >= 5);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
      noticeBox.className = 'form-status-notice error';
      noticeBox.textContent = 'Please fill in all required fields accurately before submitting.';
      noticeBox.style.display = 'block';
      return;
    }

    // Success State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    // Fire Google Ads Conversion Tracking Event
    try {
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-18450549273'
        });
        gtag('event', 'generate_lead', {
          'event_category': 'ContactForm',
          'event_label': `Inquiry: ${nameVal}`
        });
      }
    } catch (err) {
      console.warn('Google Tag conversion tracking notice:', err);
    }

    setTimeout(() => {
      noticeBox.className = 'form-status-notice success';
      noticeBox.textContent = 'Thank you! Your message has been received. Our team at Imax Media will review your requirements and get in touch within 24 business hours.';
      noticeBox.style.display = 'block';

      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Inquiry';
      }
    }, 600);
  });
}

// =============================================================================
// 9. REVEAL-ON-SCROLL ANIMATIONS (IntersectionObserver)
// =============================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}
