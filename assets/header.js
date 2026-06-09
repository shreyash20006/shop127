/* ==========================================================================
   ESCAPE CLOTHING 👣 - HEADER JS
   Sticky behaviour, scroll directional show/hide, mobile slide-in menu
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  const scrollThreshold = 80;

  // Scroll Behavior
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Blur + Background color change after 80px
    if (currentScrollY > scrollThreshold) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Scroll Down - Hide, Scroll Up - Show (Headroom effect)
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  });

  // Mobile Hamburger Menu
  const mobileToggle = document.getElementById('MobileMenuToggle');
  const mobileMenu = document.getElementById('MobileMenuOverlay');
  const mobileClose = document.getElementById('MobileMenuClose');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
      animateMobileLinks();
    });

    const closeOverlay = () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = ''; // Unlock background scroll
      resetMobileLinks();
    };

    if (mobileClose) {
      mobileClose.addEventListener('click', closeOverlay);
    }

    // Close on overlay backdrop click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeOverlay();
      }
    });
  }

  function animateMobileLinks() {
    const links = document.querySelectorAll('.mobile-nav__item');
    links.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add('visible');
      }, index * 50); // 50ms stagger delay
    });
  }

  function resetMobileLinks() {
    const links = document.querySelectorAll('.mobile-nav__item');
    links.forEach(link => {
      link.classList.remove('visible');
    });
  }
});
