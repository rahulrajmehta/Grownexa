/**
 * GrowNexa Media - Official Website Scripts
 * Single-Page Responsive Landing Experience
 */

// =============================================================================
// 1. CONFIGURABLE WHATSAPP SETTINGS
// =============================================================================
// Active WhatsApp business number: 9122675361 (+91 91226 75361)
const WHATSAPP_CONFIG = {
  phone: "919122675361", // International format (India country code 91 + 9122675361)
  displayPhone: "+91 91226 75361",
  rawPhone: "9122675361",
  defaultMessage: "Hi GrowNexa Media, I'd like to know more about your social media marketing services."
};

/**
 * Open WhatsApp with a custom pre-filled message
 * @param {string} customText - Pre-filled message string
 */
function openWhatsApp(customText) {
  let targetPhone = (WHATSAPP_CONFIG.phone || "919122675361").replace(/\D/g, '');
  // Auto-prefix India country code '91' if 10 digits provided
  if (targetPhone.length === 10) {
    targetPhone = '91' + targetPhone;
  }
  const message = customText || WHATSAPP_CONFIG.defaultMessage;
  const encodedText = encodeURIComponent(message.trim());
  const url = `https://wa.me/${targetPhone}?text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// =============================================================================
// 2. DOM CONTENT LOADED INITIALIZATION
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppButtons();
  initStickyNavbar();
  initMobileMenu();
  initScrollSpy();
  initFaqAccordion();
  initConsultationModal();
  initLegalModals();
  initScrollReveal();
});

// =============================================================================
// 3. WHATSAPP CTA EVENT BINDINGS
// =============================================================================
function initWhatsAppButtons() {
  // Bind all elements with [data-wa-message] attribute
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
  handleScroll(); // initial check
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
// 6. SCROLL SPY ACTIVE NAV LINK
// =============================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// =============================================================================
// 7. FAQ ACCORDION
// =============================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all open items for clean single-item view
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherPanel = otherItem.querySelector('.faq-answer-panel');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default for inviting interaction
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstPanel = firstItem.querySelector('.faq-answer-panel');
    firstItem.classList.add('active');
    if (firstPanel) {
      firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
    }
  }
}

// =============================================================================
// 8. INTERACTIVE CONSULTATION MODAL (Pre-formats WhatsApp Message)
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
      e.preventDefault();
      openModal();
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

  // Handle Form Submission -> Generates Structured WhatsApp Greeting
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('consultName')?.value.trim() || 'Not specified';
      const business = document.getElementById('consultBusiness')?.value.trim() || 'Not specified';
      const service = document.getElementById('consultService')?.value || 'General Marketing';
      const goals = document.getElementById('consultGoals')?.value.trim() || 'Looking for business growth';

      const structuredMsg = 
`Hi GrowNexa Media! I would like to request a free consultation:
• Name: ${name}
• Business / Industry: ${business}
• Service Needed: ${service}
• Key Goals: ${goals}`;

      closeModal();
      openWhatsApp(structuredMsg);
      form.reset();
    });
  }
}

// =============================================================================
// 9. LEGAL MODALS (Privacy & Terms)
// =============================================================================
function initLegalModals() {
  const privacyTrigger = document.getElementById('openPrivacyModal');
  const termsTrigger = document.getElementById('openTermsModal');
  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');
  const closeBtns = document.querySelectorAll('.js-legal-close');

  const openModal = (targetModal) => {
    if (!targetModal) return;
    targetModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (targetModal) => {
    if (!targetModal) return;
    targetModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (privacyTrigger && privacyModal) {
    privacyTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(privacyModal);
    });
  }

  if (termsTrigger && termsModal) {
    termsTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(termsModal);
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(privacyModal);
      closeModal(termsModal);
    });
  });

  [privacyModal, termsModal].forEach(m => {
    if (!m) return;
    m.addEventListener('click', (e) => {
      if (e.target === m) closeModal(m);
    });
  });
}

// =============================================================================
// 10. REVEAL-ON-SCROLL ANIMATIONS (IntersectionObserver)
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
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}
